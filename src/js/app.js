const orbitController = () => {
    // create DOM template - orbit

    const getNewData = async () => {
        const response = await fetch("/api");
        return response;
    };

    const getOldData = async () => {
        const elements = document.querySelectorAll(".orbit-radius");
    };

    const addLayer = (trackIdx, items) => {};

    const compareList = (trackIdx, items) => {};
};

orbitController();
