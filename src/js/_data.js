export const orbitGetData = async () => {
    const { USE_FETCH, FETCH_HREF, FETCH_METHOD } = gOrbit.options;
    let data;
    if (USE_FETCH) {
        const response = await fetch(FETCH_HREF, { method: FETCH_METHOD });
        if (!response.ok) throw response.status;
        const json = await response.json();
        data = json;
    } else {
        data = gOrbit.dataList;
    }
    return data.serviceData.sort((a, b) => b.execCnt - a.execCnt);
};
