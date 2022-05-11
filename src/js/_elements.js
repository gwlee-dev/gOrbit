export const createElement = () => {
    const { DEBUG, BASE_CLASS } = gOrbit.options;

    DEBUG && console.log("Creating DOM Elements..");
    gOrbit.dom.orbit = document.querySelector(`.${BASE_CLASS}`);

    gOrbit.dom.placer = document.createElement("div");
    gOrbit.class.placer = `${BASE_CLASS}-placer`;
    gOrbit.dom.placer.classList.add(gOrbit.class.placer);

    gOrbit.dom.radius = document.createElement("div");
    gOrbit.class.radius = `${BASE_CLASS}-radius`;
    gOrbit.dom.radius.classList.add(gOrbit.class.radius);

    gOrbit.dom.item = document.createElement("div");
    gOrbit.class.item = `${BASE_CLASS}-item`;
    gOrbit.dom.item.classList.add(gOrbit.class.item);
    gOrbit.dom.item.classList.add("placing");

    gOrbit.dom.frame = document.createElement("div");
    gOrbit.class.frame = `${BASE_CLASS}-frame`;
    gOrbit.dom.frame.classList.add(gOrbit.class.frame);

    gOrbit.dom.body = document.createElement("div");
    gOrbit.class.body = `${BASE_CLASS}-body`;
    gOrbit.dom.body.classList.add(gOrbit.class.body);

    gOrbit.dom.badge = document.createElement("div");
    gOrbit.class.badge = `${BASE_CLASS}-badge`;
    gOrbit.dom.badge.classList.add(gOrbit.class.badge);

    gOrbit.dom.name = document.createElement("span");
    gOrbit.class.name = `${BASE_CLASS}-name`;
    gOrbit.dom.name.classList.add(gOrbit.class.name);

    gOrbit.dom.status = document.createElement("div");
    gOrbit.class.status = `${BASE_CLASS}-status`;
    gOrbit.dom.status.classList.add(gOrbit.class.status);

    gOrbit.dom.layer = document.createElement("div");
    gOrbit.class.layer = `${BASE_CLASS}-layer`;
    gOrbit.dom.layer.classList.add(gOrbit.class.layer);

    gOrbit.dom.alert = document.createElement("div");
    gOrbit.class.alert = `${BASE_CLASS}-alert`;
    gOrbit.dom.alert.classList.add(gOrbit.class.alert);
    gOrbit.dom.alert.classList.add("placing");

    gOrbit.dom.body.appendChild(gOrbit.dom.name);
    gOrbit.dom.body.appendChild(gOrbit.dom.name);
    gOrbit.dom.item.appendChild(gOrbit.dom.frame);
    gOrbit.dom.item.appendChild(gOrbit.dom.body);
    gOrbit.dom.item.appendChild(gOrbit.dom.status);
    gOrbit.dom.radius.appendChild(gOrbit.dom.item);
    gOrbit.dom.placer.appendChild(gOrbit.dom.radius);

    gOrbit.dom.debug = document.createElement("ul");
    gOrbit.dom.debug.setAttribute(
        "style",
        "position: absolute; top: 1rem; left: 0;"
    );
    gOrbit.dom.debug.id = `${BASE_CLASS}-debugger`;

    gOrbit.dom.debugTitle = document.createElement("h5");
    gOrbit.dom.debugTitle.setAttribute(
        "style",
        "margin-left: -1.5rem; font-weight: bold; border-top: 1px solid #000; width: 10rem; padding-top: 0.5rem;"
    );
    gOrbit.dom.debugTitle.innerHTML = "DEBUG MODE";
    gOrbit.dom.debugMin = document.createElement("li");
    gOrbit.dom.debugMax = document.createElement("li");
    gOrbit.dom.debugLv1 = document.createElement("li");
    gOrbit.dom.debugLv2 = document.createElement("li");
    gOrbit.dom.debugLv3 = document.createElement("li");
    gOrbit.dom.debugLength = document.createElement("li");

    gOrbit.dom.debug.appendChild(gOrbit.dom.debugTitle);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugMin);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugMax);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugLv1);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugLv2);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugLv3);
    gOrbit.dom.debug.appendChild(gOrbit.dom.debugLength);

    DEBUG && console.log(">> Creating Complete");
};

export const orbitDrawCircle = (depth, currentHeight) => {
    const { BASE_CLASS } = gOrbit.options;
    if (depth == 1) {
        const circles = gOrbit.dom.orbit.querySelectorAll(
            `.${gOrbit.class.layer}`
        );
        circles.forEach((element) => {
            element.parentNode.removeChild(element);
        });
    }
    const clone = gOrbit.dom.layer.cloneNode(true);
    const cloneIdString = `${BASE_CLASS}-${gOrbit.class.layer}-${depth}`;
    clone.id = cloneIdString;
    clone.style.width = `${currentHeight * 2}rem`;
    gOrbit.dom.orbit.appendChild(clone);
};

export const orbitTransition = (element) => {
    element.classList.remove("placing");
};
