const orbitInitFunc = (options) => {
    // Variable Set
    gOrbit.options.DEBUG = options.debug;
    gOrbit.options.BASE_CLASS = options.base_class;
    gOrbit.options.BASE_RADIUS = options.base_radius;
    gOrbit.options.BASE_AMOUNT = options.base_amount;
    gOrbit.options.UPDATE_INTERVAL = options.update_interval;
    gOrbit.options.USE_FETCH = options.use_fetch;
    gOrbit.options.FETCH_HREF = options.fetch_href;
    gOrbit.options.FETCH_METHOD = options.fetch_method;
    gOrbit.options.ON_CLICK = options.on_click;
    gOrbit.options.CLASS_MAP = options.class_map;

    // Create DOM Elements
    gOrbit.elements.orbit = document.querySelector(
        `.${gOrbit.options.BASE_CLASS}`
    );

    gOrbit.elements.placer = document.createElement("div");
    gOrbit.class.placer = `${gOrbit.options.BASE_CLASS}-placer`;
    gOrbit.elements.placer.classList.add(gOrbit.class.placer);

    gOrbit.elements.radius = document.createElement("div");
    gOrbit.class.radius = `${gOrbit.options.BASE_CLASS}-radius`;
    gOrbit.elements.radius.classList.add(gOrbit.class.radius);

    gOrbit.elements.item = document.createElement("div");
    gOrbit.class.item = `${gOrbit.options.BASE_CLASS}-item`;
    gOrbit.elements.item.classList.add(gOrbit.class.item);
    gOrbit.elements.item.classList.add("placing");

    gOrbit.elements.frame = document.createElement("div");
    gOrbit.class.frame = `${gOrbit.options.BASE_CLASS}-frame`;
    gOrbit.elements.frame.classList.add(gOrbit.class.frame);

    gOrbit.elements.body = document.createElement("div");
    gOrbit.class.body = `${gOrbit.options.BASE_CLASS}-body`;
    gOrbit.elements.body.classList.add(gOrbit.class.body);

    gOrbit.elements.name = document.createElement("span");
    gOrbit.class.name = `${gOrbit.options.BASE_CLASS}-name`;
    gOrbit.elements.name.classList.add(gOrbit.class.name);

    gOrbit.elements.status = document.createElement("div");
    gOrbit.class.status = `${gOrbit.options.BASE_CLASS}-status`;
    gOrbit.elements.status.classList.add(gOrbit.class.status);

    gOrbit.elements.layer = document.createElement("div");
    gOrbit.class.layer = `${gOrbit.options.BASE_CLASS}-layer`;
    gOrbit.elements.layer.classList.add(gOrbit.class.layer);

    gOrbit.elements.body.appendChild(gOrbit.elements.name);
    gOrbit.elements.item.appendChild(gOrbit.elements.frame);
    gOrbit.elements.item.appendChild(gOrbit.elements.body);
    gOrbit.elements.item.appendChild(gOrbit.elements.status);
    gOrbit.elements.radius.appendChild(gOrbit.elements.item);
    gOrbit.elements.placer.appendChild(gOrbit.elements.radius);

    // Initialize
    const orbitInitData = async () => {
        gOrbit.dataList = orbitSortData(
            await orbitGetData(
                gOrbit.options.USE_FETCH,
                gOrbit.options.FETCH_HREF
            )
        );
        for (const element of gOrbit.dataList) {
            orbitPlaceItems(element, "init");
        }
        orbitSetPosition(orbitSetDepth());
    };

    orbitInitData();

    if (gOrbit.options.USE_FETCH == true) {
        setInterval(gOrbit.update, gOrbit.options.UPDATE_INTERVAL);
    }
};

const orbitGetData = () => {
    if (
        gOrbit.options.USE_FETCH == true &&
        gOrbit.options.FETCH_METHOD == "post"
    ) {
        const response = fetch(gOrbit.options.FETCH_HREF, { method: "POST" });
        return response.then((res) => res.json());
    } else if (gOrbit.options.USE_FETCH == true) {
        const response = fetch(gOrbit.options.FETCH_HREF);
        return response.then((res) => res.json());
    } else {
        return gOrbit.data;
    }
};

const orbitSortData = (data) => {
    const dataArray = data.serviceData;
    const sortedData = dataArray.sort((a, b) => {
        return b.execCnt - a.execCnt;
    });
    return sortedData;
};

const orbitPlaceItems = (element) => {
    const clone = gOrbit.elements.placer.cloneNode(true);
    clone.id = `${gOrbit.options.BASE_CLASS}-${element.name}`;
    const inner = clone.querySelector(`.${gOrbit.class.body}`);
    const name = inner.querySelector(`.${gOrbit.class.name}`);
    name.innerHTML = element.name;
    inner.setAttribute("onclick", gOrbit.options.ON_CLICK);
    inner.name = `${element.name}`;
    gOrbit.options.ON_CLICK &&
        inner.setAttribute("onclick", gOrbit.options.ON_CLICK);
    gOrbit.elements.orbit.appendChild(clone);
};

const orbitUpdate = async () => {
    const newData = orbitSortData(
        await orbitGetData(gOrbit.options.USE_FETCH, gOrbit.options.FETCH_HREF)
    );
    gOrbit.options.DEBUG == true && console.log(newData);
    let newDataKeys = [];
    for (const element of newData) {
        newDataKeys.push(element.name);
    }
    let oldDataKeys = [];
    for (const element of gOrbit.dataList) {
        oldDataKeys.push(element.name);
    }
    gOrbit.dataList = newData;

    let addedItems = newDataKeys.filter((x) => !oldDataKeys.includes(x));
    let removedItems = oldDataKeys.filter((x) => !newDataKeys.includes(x));
    gOrbit.options.DEBUG == true &&
        console.log(
            `Added ${addedItems.length} / Removed ${removedItems.length}`
        );
    await addedItems.forEach((element) => {
        const currentItem = newData.find((x) => x.name === element);
        orbitPlaceItems(currentItem, "add");
    });
    await removedItems.forEach((element) => {
        const target = gOrbit.elements.orbit.querySelector(
            `#${gOrbit.options.BASE_CLASS}-${element}`
        );
        target.parentNode.removeChild(target);
    });

    orbitSetPosition(gOrbit.set.depth());
};

const orbitSetPosition = async (max) => {
    for (let depth = 1; depth < max; ) {
        const elements = gOrbit.elements.orbit.querySelectorAll(
            `.${gOrbit.class.placer}.${gOrbit.options.BASE_CLASS}-depth-${depth} .${gOrbit.class.radius}`
        );
        const elementAmount = elements.length;
        const eachAngle = 360 / elementAmount;
        const currentHeight = gOrbit.options.BASE_RADIUS * depth + depth;
        orbitDrawCircle(depth++, currentHeight);
        let currentAngle = 0;
        for (const element of elements) {
            setTimeout(orbitTransition.placing, 0, element);
            element.style.height = `${currentHeight}rem`;
            element.style.transform = `rotate(${currentAngle}deg)`;
            const bodyElement = element.querySelector(`.${gOrbit.class.body}`);
            const statusElement = element.querySelector(
                `.${gOrbit.class.status}`
            );
            bodyElement.style.transform = `rotate(-${currentAngle}deg)`;
            statusElement.style.transform = `rotate(-${currentAngle}deg)`;
            currentAngle += eachAngle;
        }
    }
};

const orbitDrawCircle = (depth, currentHeight) => {
    if (depth == 1) {
        const circles = gOrbit.elements.orbit.querySelectorAll(
            `.${gOrbit.class.layer}`
        );
        circles.forEach((element) => {
            element.parentNode.removeChild(element);
        });
    }
    const clone = gOrbit.elements.layer.cloneNode(true);
    const cloneIdString = `${gOrbit.options.BASE_CLASS}-${gOrbit.class.layer}-${depth}`;
    clone.id = cloneIdString;
    clone.style.width = `${currentHeight * 2}rem`;
    gOrbit.elements.orbit.appendChild(clone);
};

const orbitSetDepth = () => {
    let depth = 1;
    let idx = 1;
    let newDataWeights = [];
    for (const element of gOrbit.dataList) {
        newDataWeights.push(element.execCnt);
    }
    const maxWeight = Math.max.apply(null, newDataWeights);
    const minWeight = Math.min.apply(null, newDataWeights);
    const weightAverage = (maxWeight - minWeight) / 4;
    const level1 = weightAverage * 1;
    const level2 = weightAverage * 2;
    const level3 = weightAverage * 3;

    gOrbit.dataList.forEach((element) => {
        const target = gOrbit.elements.orbit.querySelector(
            `#${gOrbit.options.BASE_CLASS}-${element.name}`
        );
        const targetItem = target.querySelector(`.${gOrbit.class.item}`);
        const weight = element.execCnt;
        if (weight <= level1) {
            targetItem.classList.add(`${gOrbit.class.item}-xs`);
        } else if (weight <= level2) {
            targetItem.classList.add(`${gOrbit.class.item}-sm`);
        } else if (weight <= level3) {
            targetItem.classList.add(`${gOrbit.class.item}-md`);
        } else {
            targetItem.classList.add(`${gOrbit.class.item}-lg`);
        }

        const item = target.querySelector(`.${gOrbit.class.status}`);
        const map = gOrbit.options.CLASS_MAP;
        Object.keys(map).forEach((key) => {
            const statusClassName = `${gOrbit.options.BASE_CLASS}-key-${key}`;
            let status = item.querySelector(`.${statusClassName}`);
            if (!status) {
                status = document.createElement("div");
                status.classList.add(statusClassName);
                item.appendChild(status);
                status = item.querySelector(`.${statusClassName}`);
            } else {
                status.classList.forEach((className) => {
                    if (/^orbit-value-/.test(className)) {
                        status.classList.remove(className);
                    }
                });
            }
            Object.keys(map[key]).forEach((stat) => {
                if (element[key] == stat) {
                    status.classList.add(
                        `${gOrbit.options.BASE_CLASS}-value-${map[key][stat]}`
                    );
                }
            });
        });

        target.classList.forEach((className) => {
            if (/^orbit-depth-/.test(className)) {
                target.classList.remove(className);
            }
        });
        target.classList.remove(`${gOrbit.options.BASE_CLASS}-depth-*`);

        target.classList.add(`${gOrbit.options.BASE_CLASS}-depth-${depth}`);
        if (idx++ == depth * gOrbit.options.BASE_AMOUNT) {
            idx = 0;
            depth++;
        }
    });
    return depth + 1;
};

const orbitTransition = {
    placing: (element) => {
        element
            .querySelector(`.${gOrbit.class.item}`)
            .classList.remove("placing");
    },
    removing: (element) => {
        element
            .querySelector(`.${gOrbit.class.item}`)
            .classList.remove("removing");
    },
};

const orbitListenFunc = (input) => {
    orbitDashboard.data = input;
    orbitUpdate();
};

const orbitDashboard = {
    init: orbitInitFunc,
    listen: orbitListenFunc,
    update: orbitUpdate,
    data: [],
    dataList: [],
    set: {
        depth: orbitSetDepth,
        position: orbitSetPosition,
    },
    options: {
        DEBUG: false,
        BASE_CLASS: "orbit",
        BASE_RADIUS: 5,
        BASE_AMOUNT: 6,
        UPDATE_INTERVAL: 1000,
        USE_FETCH: true,
        FETCH_HREF: "/api",
        FETCH_METHOD: "get",
        ON_CLICK: "",
        CLASS_MAP: {
            cpu: {
                NORMAL: "cpu-normal",
                WARN: "cpu-warning",
                CRITICAL: "cpu-critical",
            },
            memory: {
                NORMAL: "mem-normal",
                WARN: "mem-warning",
                CRITICAL: "mem-critical",
            },
            disk: {
                NORMAL: "disk-normal",
                WARN: "disk-warning",
                CRITICAL: "disk-critical",
            },
        },
    },
    elements: {
        orbit: "",
        placer: "",
        radius: "",
        item: "",
        frame: "",
        body: "",
        layer: "",
        name: "",
    },
    class: {
        orbit: "",
        placer: "",
        radius: "",
        item: "",
        frame: "",
        body: "",
        layer: "",
        name: "",
    },
    obj: "",
};

(function (window) {
    window.gOrbit = orbitDashboard;
})(window);
