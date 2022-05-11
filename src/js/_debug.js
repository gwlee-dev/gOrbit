export const orbitDebugging = {
    start: () => {
        const { BASE_CLASS } = gOrbit.options;
        const panel = gOrbit.dom.orbit.querySelector(`.${BASE_CLASS}-debugger`);

        if (!panel) {
            gOrbit.dom.orbit.appendChild(gOrbit.dom.debug);
        }

        gOrbit.options.DEBUG = true;
    },
    end: () => {
        const { BASE_CLASS } = gOrbit.options;
        const panel = gOrbit.dom.orbit.querySelector(`.${BASE_CLASS}-debugger`);
        if (panel) {
            gOrbit.dom.orbit.removeChild(panel);
        }

        console.log("\n** Stop Logging **\n\n");
        gOrbit.options.DEBUG = false;
    },
};
