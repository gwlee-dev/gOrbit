import { orbitDebugging } from "./_debug";
import { createElement } from "./_elements";
import { importOptions } from "./_options";
import { orbitUpdate } from "./_update";

export const orbitInitFunc = async (options) => {
    options.debug == true && console.log("[ Initializing ]");
    await importOptions(options);
    createElement();

    const { DEBUG, BASE_CLASS, USE_FETCH, UPDATE_INTERVAL } = gOrbit.options;
    const { orbit } = gOrbit.dom;

    DEBUG && orbitDebugging.start();
    DEBUG && console.log(">>>>> INITIALIZED\n\n");

    await orbitUpdate();
    orbit
        .querySelector(`.${BASE_CLASS}-center-circle`)
        .scrollIntoView({ block: "center", inline: "center" });
    USE_FETCH && setInterval(gOrbit.update, UPDATE_INTERVAL);
};
