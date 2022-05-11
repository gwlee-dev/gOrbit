export const orbitDebugPanel = () => {
    gOrbit.elements.debug = document.createElement("ul");
    gOrbit.elements.debug.setAttribute(
        "style",
        "position: absolute; top: 1rem; left: 0;"
    );

    gOrbit.elements.debugTitle = document.createElement("h5");
    gOrbit.elements.debugTitle.setAttribute(
        "style",
        "margin-left: -1.5rem; font-weight: bold; border-top: 1px solid #000; width: 10rem; padding-top: 0.5rem;"
    );
    gOrbit.elements.debugTitle.innerHTML = "DEBUG MODE";
    gOrbit.elements.debugMin = document.createElement("li");
    gOrbit.elements.debugMax = document.createElement("li");
    gOrbit.elements.debugLv1 = document.createElement("li");
    gOrbit.elements.debugLv2 = document.createElement("li");
    gOrbit.elements.debugLv3 = document.createElement("li");

    gOrbit.elements.debug.appendChild(gOrbit.elements.debugTitle);
    gOrbit.elements.debug.appendChild(gOrbit.elements.debugMin);
    gOrbit.elements.debug.appendChild(gOrbit.elements.debugMax);
    gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv1);
    gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv2);
    gOrbit.elements.debug.appendChild(gOrbit.elements.debugLv3);

    gOrbit.elements.orbit.appendChild(gOrbit.elements.debug);
};
