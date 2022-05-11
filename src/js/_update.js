import { orbitPrintError, orbitRemoveError } from "./_alert";
import { orbitGetData, orbitSortData } from "./_data";
import { orbitSetDepth } from "./_depth";
import { orbitPlaceItems } from "./_place";
import { orbitSetPosition } from "./_position";

export const orbitUpdate = async () => {
    const { USE_FETCH, FETCH_HREF, DEBUG, BASE_CLASS, BASE_RADIUS } =
        gOrbit.options;
    DEBUG && console.log("[ Update Data ]");

    let fetchData;
    try {
        DEBUG && console.log("Fetching..");
        fetchData = await orbitGetData(USE_FETCH, FETCH_HREF);
        orbitRemoveError();
        DEBUG && console.log(">> Fetching Complete");
        gOrbit.dom.debugLength.innerHTML = `Amount: ${fetchData.serviceData.length}`;
    } catch (err) {
        orbitPrintError(err);
        DEBUG && console.log(">> Error occurred on Fetching\n\n");
        return;
    }

    let sortData;
    try {
        DEBUG && console.log("Sorting..");
        sortData = await orbitSortData(fetchData);
        DEBUG && console.log(">> Sorting Complete");
        orbitRemoveError();
    } catch (err) {
        DEBUG && console.log(">> Error occurred on Sorting\n\n");
        orbitPrintError(err);
        return;
    }

    if (!sortData) return;

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
        const target = gOrbit.dom.orbit.querySelector(
            `#${BASE_CLASS}-${element}`
        );
        target.parentNode.removeChild(target);
    });

    const maxDepth = await orbitSetDepth();
    await orbitSetPosition(maxDepth + 1);

    const innerSize = BASE_RADIUS * maxDepth * 2 + 5;
    gOrbit.dom.inner.setAttribute(
        "style",
        `min-width: ${innerSize}rem; min-height: ${innerSize}rem;`
    );

    DEBUG && console.log(">>>>> CYCLE END\n\n\n");
};
