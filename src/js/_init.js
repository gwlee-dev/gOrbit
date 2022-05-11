import { orbitDebugging } from "./_debug";
import { createElement } from "./_elements";
import { importOptions } from "./_options";
import { orbitUpdate } from "./_update";

export const orbitInitFunc = (options) => {
    options.debug == true && console.log("[ Initializing ]");
    importOptions(options);
    createElement();

    const { USE_FETCH, UPDATE_INTERVAL, DEBUG } = gOrbit.options;

    DEBUG && orbitDebugging.start();
    DEBUG && console.log(">>>>> INITIALIZED\n\n");

    orbitUpdate();
    USE_FETCH && setInterval(gOrbit.update, UPDATE_INTERVAL);
};
