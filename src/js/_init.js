import { orbitDebugging } from "./_debug";
import { createElement } from "./_elements";
import { importOptions } from "./_options";
import { orbitUpdate } from "./_update";

export const orbitInitFunc = async (options) => {
    options.debug == true && console.log("[ Initializing ]");
    importOptions(options);
    createElement();

    const { USE_FETCH, UPDATE_INTERVAL, DEBUG } = gOrbit.options;

    DEBUG && orbitDebugging.start();
    DEBUG && console.log(">>>>> INITIALIZED\n\n");

    await orbitUpdate();
    const initPos = {
        width: gOrbit.dom.orbit.clientWidth / 2,
        height: gOrbit.dom.orbit.clientHeight / 2,
    };
    console.log(initPos);
    document
        .querySelector(".orbit-center-circle")
        .scrollIntoView({ block: "center", inline: "center" });
    USE_FETCH && setInterval(gOrbit.update, UPDATE_INTERVAL);
};
