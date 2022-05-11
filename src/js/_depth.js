export const orbitSetDepth = () => {
    const { DEBUG, BASE_CLASS, CLASS_MAP, BINDING_SPECIFY, BASE_AMOUNT } =
        gOrbit.options;
    DEBUG && console.log("Setting Depths..");

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
        gOrbit.dom.debugMax.innerHTML = `Max execCnt: ${maxWeight}`;
        gOrbit.dom.debugMin.innerHTML = `Min execCnt: ${minWeight}`;
        gOrbit.dom.debugLv1.innerHTML = `Large Criteria: ${level1}`;
        gOrbit.dom.debugLv2.innerHTML = `Mid Criteria: ${level2}`;
        gOrbit.dom.debugLv3.innerHTML = `Small Criteria: ${level3}`;
    }

    gOrbit.dataList.forEach((element) => {
        const target = gOrbit.dom.orbit.querySelector(
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
                const statusClassName = `${BASE_CLASS}-key-${key}`;
                let status = item.querySelector(`.${statusClassName}`);
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
