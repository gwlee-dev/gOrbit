import { orbitClearClass } from "./_place";

export const orbitSetDepth = () => {
    const {
        CATEGORIES,
        DEBUG,
        BASE_CLASS,
        CLASS_MAP,
        BINDING_SPECIFY,
        BASE_AMOUNT,
    } = gOrbit.options;
    const { debug_max, debug_min, debug_criteria, debug_depth, orbit } =
        gOrbit.dom;
    DEBUG && console.log("Setting Depths..");

    let depth = 1;
    let idx = 1;

    const newDataWeights = gOrbit.dataList.map((x) => x.execCnt);
    const maxWeight = Math.max.apply(null, newDataWeights);
    const minWeight = Math.min.apply(null, newDataWeights);
    const weightAverage = (maxWeight - minWeight) / 4;
    const criteria = CATEGORIES.map((x, idx) => {
        if (idx == CATEGORIES.length - 1) return maxWeight;
        else return Math.ceil(weightAverage * (idx + 1));
    });

    if (DEBUG) {
        debug_max.innerHTML = `Max execCnt: ${maxWeight}`;
        debug_min.innerHTML = `Min execCnt: ${minWeight}`;
        debug_criteria.innerHTML = `Categorize Criteria: ${criteria.map(
            (x) => `${x}`
        )}`;
    }

    gOrbit.dataList.forEach((element) => {
        const target = orbit.querySelector(`#${BASE_CLASS}-${element.name}`);
        const targetItem = target.querySelector(`.${gOrbit.class.item}`);
        const weight = element.execCnt;
        orbitClearClass(targetItem, `${BASE_CLASS}-item-`);

        for (let [index, value] of criteria.entries()) {
            if (weight <= value) {
                targetItem.classList.add(
                    `${gOrbit.class.item}-${CATEGORIES[index]}`
                );
                break;
            }
        }

        const item = target.querySelector(`.${gOrbit.class.status}`);
        const map = CLASS_MAP;

        Object.keys(map).forEach((key) => {
            let binding;
            let statusClassName;
            if (BINDING_SPECIFY[key]) {
                const bindingClass = `${BASE_CLASS}-${BINDING_SPECIFY[key]}`;
                binding = target.querySelector(`.${bindingClass}`);
                orbitClearClass(binding, `${BASE_CLASS}-specify-`);
                statusClassName = (key, stat) =>
                    `${BASE_CLASS}-specify-${key}-${map[key][stat]}`;
            } else {
                const keyClassName = `${BASE_CLASS}-key-${key}`;
                orbitClearClass(item, `${BASE_CLASS}-value-`);
                binding = item.querySelector(`.${keyClassName}`);
                if (binding) {
                    orbitClearClass(binding, `${BASE_CLASS}-value-`);
                } else {
                    binding = document.createElement("div");
                    binding.classList.add(keyClassName);
                    item.appendChild(binding);
                    binding = item.querySelector(`.${keyClassName}`);
                }

                statusClassName = (key, stat) =>
                    `${BASE_CLASS}-value-${map[key][stat]}`;
            }
            Object.keys(map[key])
                .filter((x) => element[key] == x)
                .forEach((stat) => {
                    binding.classList.add(statusClassName(key, stat));
                });
        });

        orbitClearClass(target, `${BASE_CLASS}-depth-`);

        target.classList.add(`${BASE_CLASS}-depth-${depth}`);
        if (idx++ == depth * BASE_AMOUNT) {
            idx = 0;
            depth++;
        }
    });

    if (DEBUG) {
        console.log(">> Setting Complete");
        debug_depth.innerHTML = `Outermost Depth: ${depth}`;
    }

    return depth;
};
