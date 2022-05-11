export const createElement = () => {
    const { DEBUG } = gOrbit.options;

    DEBUG && console.log("Creating DOM Elements..");
    gOrbit.elements.orbit = document.querySelector(
        `.${gOrbit.options.BASE_CLASS}`
    );

    gOrbit.elements.placer = document.createElement("div");
    gOrbit.class.placer = `${gOrbit.options.BASE_CLASS}-placer`;
    gOrbit.elements.placer.classList.add(gOrbit.class.placer);

    gOrbit.elements.radius = document.createElement("div");
    gOrbit.class.radius = `${gOrbit.options.BASE_CLASS}-radius`;
    gOrbit.elements.radius.classList.add(gOrbit.class.radius);

    gOrbit.elements.item = document.createElement("div");
    gOrbit.class.item = `${gOrbit.options.BASE_CLASS}-item`;
    gOrbit.elements.item.classList.add(gOrbit.class.item);
    gOrbit.elements.item.classList.add("placing");

    gOrbit.elements.frame = document.createElement("div");
    gOrbit.class.frame = `${gOrbit.options.BASE_CLASS}-frame`;
    gOrbit.elements.frame.classList.add(gOrbit.class.frame);

    gOrbit.elements.body = document.createElement("div");
    gOrbit.class.body = `${gOrbit.options.BASE_CLASS}-body`;
    gOrbit.elements.body.classList.add(gOrbit.class.body);

    gOrbit.elements.name = document.createElement("span");
    gOrbit.class.name = `${gOrbit.options.BASE_CLASS}-name`;
    gOrbit.elements.name.classList.add(gOrbit.class.name);

    gOrbit.elements.status = document.createElement("div");
    gOrbit.class.status = `${gOrbit.options.BASE_CLASS}-status`;
    gOrbit.elements.status.classList.add(gOrbit.class.status);

    gOrbit.elements.layer = document.createElement("div");
    gOrbit.class.layer = `${gOrbit.options.BASE_CLASS}-layer`;
    gOrbit.elements.layer.classList.add(gOrbit.class.layer);

    gOrbit.elements.alert = document.createElement("div");
    gOrbit.class.alert = `${gOrbit.options.BASE_CLASS}-alert`;
    gOrbit.elements.alert.classList.add(gOrbit.class.alert);
    gOrbit.elements.alert.classList.add("placing");

    gOrbit.elements.body.appendChild(gOrbit.elements.name);
    gOrbit.elements.item.appendChild(gOrbit.elements.frame);
    gOrbit.elements.item.appendChild(gOrbit.elements.body);
    gOrbit.elements.item.appendChild(gOrbit.elements.status);
    gOrbit.elements.radius.appendChild(gOrbit.elements.item);
    gOrbit.elements.placer.appendChild(gOrbit.elements.radius);
    DEBUG && console.log(">> Creating Complete");
};

export const orbitDrawCircle = (depth, currentHeight) => {
    const { BASE_CLASS } = gOrbit.options;
    if (depth == 1) {
        const circles = gOrbit.elements.orbit.querySelectorAll(
            `.${gOrbit.class.layer}`
        );
        circles.forEach((element) => {
            element.parentNode.removeChild(element);
        });
    }
    const clone = gOrbit.elements.layer.cloneNode(true);
    const cloneIdString = `${BASE_CLASS}-${gOrbit.class.layer}-${depth}`;
    clone.id = cloneIdString;
    clone.style.width = `${currentHeight * 2}rem`;
    gOrbit.elements.orbit.appendChild(clone);
};

export const orbitTransition = (element) => {
    element.classList.remove("placing");
};
