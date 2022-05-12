import { orbitPrintError, orbitRemoveError } from "./_alert";
import { orbitGetData, orbitSortData } from "./_data";
import { orbitSetDepth } from "./_depth";
import { orbitPlaceItems } from "./_place";
import { orbitSetPosition } from "./_position";

export const orbitUpdate = async () => {
    const { USE_FETCH, FETCH_HREF, DEBUG, BASE_CLASS, BASE_RADIUS } =
        gOrbit.options;
    const { damount, orbit, inner } = gOrbit.dom;
    DEBUG && console.log("[ Update Data ]");

    let fetchData;
    try {
        DEBUG && console.log("Fetching..");
        fetchData = await orbitGetData(USE_FETCH, FETCH_HREF);
        orbitRemoveError();
        DEBUG && console.log(">> Fetching Complete");
        damount.innerHTML = `Amount: ${fetchData.serviceData.length}`;
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

    DEBUG && console.log("Comparing..");
    let newDataKeys = sortData.map((el) => el.name);
    let oldDataKeys = gOrbit.dataList.map((el) => el.name);

    const removed = gOrbit.dataList
        .filter((x) => !newDataKeys.includes(x.name))
        .map((x) => {
            const target = orbit.querySelector(`#${BASE_CLASS}-${x.name}`);
            target.parentNode.removeChild(target);
        });

    const added = (gOrbit.dataList = sortData)
        .filter((x) => !oldDataKeys.includes(x.name))
        .map((x) => orbitPlaceItems(x, "add"));

    DEBUG &&
        console.log(
            `>> Comparing Complete: Added ${added.length} / Removed ${removed.length}`
        );

    const maxDepth = await orbitSetDepth();
    await orbitSetPosition(maxDepth + 1);

    const innerSize = BASE_RADIUS * maxDepth * 2 + 5;
    inner.setAttribute(
        "style",
        `min-width: ${innerSize}rem; min-height: ${innerSize}rem;`
    );

    DEBUG && console.log(">>>>> CYCLE END\n\n\n");
};
