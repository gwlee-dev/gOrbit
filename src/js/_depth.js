export const orbitSetDepth = () => {
    const { DEBUG, BASE_CLASS, CLASS_MAP, BINDING_SPECIFY, BASE_AMOUNT } =
        gOrbit.options;
    const { dmax, dmin, dlv1, dlv2, dlv3, orbit } = gOrbit.dom;
    DEBUG && console.log("Setting Depths..");

    let depth = 1;
    let idx = 1;

    const newDataWeights = gOrbit.dataList.map((x) => x.execCnt);
    const maxWeight = Math.max.apply(null, newDataWeights);
    const minWeight = Math.min.apply(null, newDataWeights);
    const weightAverage = (maxWeight - minWeight) / 4;
    const criteria = Array.from({ length: 3 }, () => 0).map(
        (x, idx) => weightAverage * (idx + 1)
    );

    if (DEBUG) {
        dmax.innerHTML = `Max execCnt: ${maxWeight}`;
        dmin.innerHTML = `Min execCnt: ${minWeight}`;
        dlv1.innerHTML = `Large Criteria: ${criteria[0]}`;
        dlv2.innerHTML = `Mid Criteria: ${criteria[1]}`;
        dlv3.innerHTML = `Small Criteria: ${criteria[2]}`;
    }

    gOrbit.dataList.forEach((element) => {
        const target = orbit.querySelector(`#${BASE_CLASS}-${element.name}`);
        const targetItem = target.querySelector(`.${gOrbit.class.item}`);
        const weight = element.execCnt;

        Array.from(targetItem.classList)
            .filter((x) => /^orbit-item-/.test(x))
            .map((x) => targetItem.classList.remove(x));

        if (weight <= criteria[0]) {
            targetItem.classList.add(`${gOrbit.class.item}-xs`);
        } else if (weight <= criteria[1]) {
            targetItem.classList.add(`${gOrbit.class.item}-sm`);
        } else if (weight <= criteria[2]) {
            targetItem.classList.add(`${gOrbit.class.item}-md`);
        } else {
            targetItem.classList.add(`${gOrbit.class.item}-lg`);
        }

        const item = target.querySelector(`.${gOrbit.class.status}`);
        const map = CLASS_MAP;

        Object.keys(map).forEach((key) => {
            let binding;
            let statusClassName;
            if (BINDING_SPECIFY[key]) {
                const bindingClass = `${BASE_CLASS}-${BINDING_SPECIFY[key]}`;
                binding = target.querySelector(`.${bindingClass}`);

                Array.from(binding.classList)
                    .filter((x) => /^orbit-specify-/.test(x))
                    .map((x) => binding.classList.remove(x));

                statusClassName = (key, stat) =>
                    `orbit-specify-${key}-${map[key][stat]}`;
            } else {
                const keyClassName = `${BASE_CLASS}-key-${key}`;
                binding = item.querySelector(`.${keyClassName}`);

                Array.from(item.classList)
                    .filter((x) => /^orbit-value-/.test(x))
                    .map((x) => item.classList.remove(x));

                if (!binding) {
                    binding = document.createElement("div");
                    binding.classList.add(keyClassName);
                    item.appendChild(binding);
                    binding = item.querySelector(`.${keyClassName}`);
                } else {
                    Array.from(binding.classList)
                        .filter((x) => /^orbit-value-/.test(x))
                        .map((x) => binding.classList.remove(x));
                }

                statusClassName = (key, stat) =>
                    `orbit-value-${map[key][stat]}`;
            }
            Object.keys(map[key])
                .filter((x) => element[key] == x)
                .forEach((stat) => {
                    binding.classList.add(statusClassName(key, stat));
                });
        });

        Array.from(target.classList)
            .filter((x) => /^orbit-depth-/.test(x))
            .map((x) => target.classList.remove(x));

        target.classList.add(`${BASE_CLASS}-depth-${depth}`);
        if (idx++ == depth * BASE_AMOUNT) {
            idx = 0;
            depth++;
        }
    });
    DEBUG && console.log(">> Setting Complete");

    return depth;
};
