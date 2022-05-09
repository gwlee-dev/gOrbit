const orbitInitFunc = (options) => {
    options.debug == true && console.log("[ Initializing ]");

    options.debug == true && console.log("Importing Options..");
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
    gOrbit.options.BINDING_SPECIFY = options.binding_specify;
    const { USE_FETCH, FETCH_HREF, UPDATE_INTERVAL, DEBUG } = gOrbit.options;

    DEBUG && console.log(">> Importing Complete");

    DEBUG && console.log("Creating DOM Elements..");
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

    gOrbit.elements.alert = document.createElement("div");
    gOrbit.class.alert = `${gOrbit.options.BASE_CLASS}-alert`;
    gOrbit.elements.alert.classList.add(gOrbit.class.alert);
    gOrbit.elements.alert.classList.add("placing");

    gOrbit.elements.body.appendChild(gOrbit.elements.name);
    gOrbit.elements.item.appendChild(gOrbit.elements.frame);
    gOrbit.elements.item.appendChild(gOrbit.elements.body);
    gOrbit.elements.item.appendChild(gOrbit.elements.status);
    gOrbit.elements.radius.appendChild(gOrbit.elements.item);
    gOrbit.elements.placer.appendChild(gOrbit.elements.radius);
    DEBUG && console.log(">> Creating Complete");

    // Initialize

    const orbitDebugPanel = () => {
        gOrbit.elements.debug = document.createElement("ul");
        gOrbit.elements.debug.setAttribute(
            "style",
            "position: absolute; top: 1rem; left: 0;"
        );

        gOrbit.elements.debugTitle = document.createElement("h5");
        gOrbit.elements.debugTitle.setAttribute(
            "style",
            "margin-left: -1.5rem; font-weight: bold; border-top: 1px solid #000; width: 10rem; padding-top: 0.5rem;"
        );
        gOrbit.elements.debugTitle.innerHTML = "DEBUG MODE";
        gOrbit.elements.debugMin = document.createElement("li");
        gOrbit.elements.debugMax = document.createElement("li");
        gOrbit.elements.debugLv1 = document.createElement("li");
        gOrbit.elements.debugLv2 = document.createElement("li");
        gOrbit.elements.debugLv3 = document.createElement("li");

        gOrbit.elements.debug.appendChild(gOrbit.elements.debugTitle);
        gOrbit.elements.debug.appendChild(gOrbit.elements.debugMin);
        gOrbit.elements.debug.appendChild(gOrbit.elements.debugMax);
        gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv1);
        gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv2);
        gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv3);

        gOrbit.elements.orbit.appendChild(gOrbit.elements.debug);
    };

    DEBUG && orbitDebugPanel();

    const orbitInitData = async () => {
        let newData;
        try {
            DEBUG && console.log("Fetching..");
            newData = await orbitGetData(USE_FETCH, FETCH_HREF);
            DEBUG && console.log(">> Fetching Complete");
        } catch (err) {
            DEBUG && console.log(">> Error occurred on Initial Fetching");
            orbitPrintError("init", err);
        }

        try {
            DEBUG && console.log("Sorting..");
            gOrbit.dataList = await orbitSortData(newData);
            DEBUG && console.log(">> Sorting Complete");
        } catch (err) {
            DEBUG && console.log(">> Error occurred on Initial Sorting");
            orbitPrintError("init", err);
        }
        for (const element of gOrbit.dataList) {
            orbitPlaceItems(element, "init");
        }
        orbitSetPosition(orbitSetDepth());
        DEBUG && console.log(">>>>> INITIALIZED\n\n\n");
    };

    orbitInitData();

    USE_FETCH && setInterval(gOrbit.update, UPDATE_INTERVAL);
};

const orbitGetData = async () => {
    const { USE_FETCH, FETCH_HREF, FETCH_METHOD } = gOrbit.options;
    if (USE_FETCH) {
        const response = await fetch(FETCH_HREF, { method: FETCH_METHOD });
        gOrbit.lastFetchStatus = await response.status;
        const json = await response.json();
        return json;
    } else {
        return gOrbit.data;
    }
};

const orbitPrintError = (msg, err, code) => {
    let errMsg = "오류가 발생했습니다.";
    let errDetail = "";

    if (msg == "init") {
        errMsg = "Orbit을 초기화하는 동안 오류가 발생했습니다.";
    }
    if (msg == "new") {
        errMsg = "데이터를 갱신하는 동안 오류가 발생했습니다.";
    }

    if (err.message == "Unexpected end of JSON input") {
        errDetail = "파싱 오류";
    }
    if (err.message == "Cannot read properties of undefined (reading 'sort')") {
        errDetail = "데이터 오류";
    }
    if (
        err.message ==
        "Cannot read properties of undefined (reading 'serviceData')"
    ) {
        errDetail = "서버/데이터 오류";
    }

    let element = gOrbit.elements.orbit.querySelector(`.${gOrbit.class.alert}`);
    const errString = `${errMsg}&nbsp;&nbsp;( ${errDetail} )`;
    if (element) {
        element.innerHTML = errString;
    } else {
        const clone = gOrbit.elements.alert.cloneNode(true);
        clone.innerHTML = errString;
        gOrbit.elements.orbit.appendChild(clone);
        element = gOrbit.elements.orbit.querySelector(`.${gOrbit.class.alert}`);
    }
    setTimeout(orbitTransition.placing, 500, element);
};

const orbitRemoveError = () => {
    const element = gOrbit.elements.orbit.querySelector(
        `.${gOrbit.class.alert}`
    );
    element && gOrbit.elements.orbit.removeChild(element);
};

const orbitSortData = (data) => {
    const dataArray = data.serviceData;
    const sortedData = dataArray.sort((a, b) => {
        return b.execCnt - a.execCnt;
    });
    return sortedData;
};

const orbitPlaceItems = (element) => {
    const { BASE_CLASS, ON_CLICK } = gOrbit.options;
    const clone = gOrbit.elements.placer.cloneNode(true);
    clone.id = `${BASE_CLASS}-${element.name}`;
    const inner = clone.querySelector(`.${gOrbit.class.body}`);
    const name = inner.querySelector(`.${gOrbit.class.name}`);
    name.innerHTML = element.name;
    inner.setAttribute("onclick", ON_CLICK);
    inner.name = `${element.name}`;
    ON_CLICK && inner.setAttribute("onclick", ON_CLICK);
    gOrbit.elements.orbit.appendChild(clone);
};

const orbitUpdate = async () => {
    const { USE_FETCH, FETCH_HREF, DEBUG, BASE_CLASS } = gOrbit.options;
    DEBUG && console.log("[ Update Data ]");

    let fetchData;
    try {
        DEBUG && console.log("Fetching..");
        fetchData = await orbitGetData(USE_FETCH, FETCH_HREF);
        DEBUG && console.log(">> Fetching Complete");
        orbitRemoveError();
    } catch (err) {
        DEBUG && console.log(">> Error occurred on Fetching");
        orbitPrintError("new", err);
    }

    let sortData;
    try {
        DEBUG && console.log("Sorting..");
        sortData = await orbitSortData(fetchData);
        DEBUG && console.log(">> Sorting Complete");
        orbitRemoveError();
    } catch (err) {
        DEBUG && console.log(">> Error occurred on Sorting");
        orbitPrintError("new", err);
    }

    DEBUG && console.log("Comparing..");
    let newDataKeys = [];
    for (const element of sortData) {
        newDataKeys.push(element.name);
    }
    let oldDataKeys = [];
    for (const element of gOrbit.dataList) {
        oldDataKeys.push(element.name);
    }

    gOrbit.dataList = sortData;

    let addedItems = newDataKeys.filter((x) => !oldDataKeys.includes(x));
    let removedItems = oldDataKeys.filter((x) => !newDataKeys.includes(x));
    DEBUG &&
        console.log(
            `>> Comparing Complete: Added ${addedItems.length} / Removed ${removedItems.length}`
        );

    await addedItems.forEach((element) => {
        const currentItem = sortData.find((x) => x.name === element);
        orbitPlaceItems(currentItem, "add");
    });
    await removedItems.forEach((element) => {
        const target = gOrbit.elements.orbit.querySelector(
            `#${BASE_CLASS}-${element}`
        );
        target.parentNode.removeChild(target);
    });

    gOrbit.set.position(gOrbit.set.depth());

    DEBUG && console.log(">>>>> CYCLE END\n\n\n");
};

const orbitSetPosition = async (max) => {
    const { BASE_CLASS, BASE_RADIUS } = gOrbit.options;
    for (let depth = 1; depth < max; ) {
        const elements = gOrbit.elements.orbit.querySelectorAll(
            `.${gOrbit.class.placer}.${BASE_CLASS}-depth-${depth} .${gOrbit.class.radius}`
        );
        const elementAmount = elements.length;
        const eachAngle = 360 / elementAmount;
        const currentHeight = BASE_RADIUS * depth;
        orbitDrawCircle(depth++, currentHeight);
        let currentAngle = 0;
        for (const element of elements) {
            setTimeout(
                orbitTransition.placing,
                0,
                element.querySelector(`.${gOrbit.class.item}`)
            );
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
    const { BASE_CLASS } = gOrbit.options;
    if (depth == 1) {
        const circles = gOrbit.elements.orbit.querySelectorAll(
            `.${gOrbit.class.layer}`
        );
        circles.forEach((element) => {
            element.parentNode.removeChild(element);
        });
    }
    const clone = gOrbit.elements.layer.cloneNode(true);
    const cloneIdString = `${BASE_CLASS}-${gOrbit.class.layer}-${depth}`;
    clone.id = cloneIdString;
    clone.style.width = `${currentHeight * 2}rem`;
    gOrbit.elements.orbit.appendChild(clone);
};

const orbitSetDepth = () => {
    const { DEBUG, BASE_CLASS, CLASS_MAP, BINDING_SPECIFY, BASE_AMOUNT } =
        gOrbit.options;
    DEBUG && console.log("Setting Item Depths..");

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
    if (DEBUG) {
        gOrbit.elements.debugMax.innerHTML = `MAX: ${maxWeight}`;
        gOrbit.elements.debugMin.innerHTML = `MIN: ${minWeight}`;
        gOrbit.elements.debugLv1.innerHTML = `Lv1: ${level1}`;
        gOrbit.elements.debugLv2.innerHTML = `Lv2: ${level2}`;
        gOrbit.elements.debugLv3.innerHTML = `Lv3: ${level3}`;
    }

    gOrbit.dataList.forEach((element) => {
        const target = gOrbit.elements.orbit.querySelector(
            `#${BASE_CLASS}-${element.name}`
        );
        const targetItem = target.querySelector(`.${gOrbit.class.item}`);
        const weight = element.execCnt;
        targetItem.classList.forEach((className) => {
            if (/^orbit-item-/.test(className)) {
                targetItem.classList.remove(className);
            }
        });
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
        const map = CLASS_MAP;
        Object.keys(map).forEach((key) => {
            if (BINDING_SPECIFY[key]) {
                const bindingClass = `${BASE_CLASS}-${BINDING_SPECIFY[key]}`;
                const binding = target.querySelector(`.${bindingClass}`);
                binding.classList.forEach((className) => {
                    if (/^orbit-specify-/.test(className)) {
                        binding.classList.remove(className);
                    }
                });
                Object.keys(map[key]).forEach((stat) => {
                    if (element[key] == stat) {
                        const statusClassName = `orbit-specify-${key}-${map[key][stat]}`;
                        binding.classList.add(statusClassName);
                    }
                });
            } else {
                let status = item.querySelector(`.${statusClassName}`);
                const statusClassName = `${BASE_CLASS}-key-${key}`;
                item.classList.forEach((className) => {
                    if (/^orbit-value-/.test(className)) {
                        status.classList.remove(className);
                    }
                });
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
                        status.classList.add(`orbit-value-${map[key][stat]}`);
                    }
                });
            }
        });

        target.classList.forEach((className) => {
            if (/^orbit-depth-/.test(className)) {
                target.classList.remove(className);
            }
        });
        target.classList.remove(`${BASE_CLASS}-depth-*`);

        target.classList.add(`${BASE_CLASS}-depth-${depth}`);
        if (idx++ == depth * BASE_AMOUNT) {
            idx = 0;
            depth++;
        }
    });
    DEBUG && console.log(">> Setting Complete");

    return depth + 1;
};

const orbitTransition = {
    placing: (element) => element.classList.remove("placing"),
    removing: (element) => element.classList.remove("removing"),
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
    lastFetchStatus: "",
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
            server: {
                NORMAL: "server-normal",
                ABNORMAL: "server-abnormal",
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
