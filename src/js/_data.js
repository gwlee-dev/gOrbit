export const orbitGetData = async () => {
    const { USE_FETCH, FETCH_HREF, FETCH_METHOD } = gOrbit.options;
    if (USE_FETCH) {
        const response = await fetch(FETCH_HREF, { method: FETCH_METHOD });
        const json = await response.json();
        return json;
    } else {
        return gOrbit.dataList;
    }
};

export const orbitSortData = (data) => {
    const dataArray = data.serviceData;
    const sortedData = dataArray.sort((a, b) => {
        return b.execCnt - a.execCnt;
    });
    return sortedData;
};
