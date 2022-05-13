import { orbitScroll } from "./_scroll";

export const createElement = () => {
    const { DEBUG, BASE_CLASS } = gOrbit.options;

    DEBUG && console.log("Creating DOM Elements..");

    const elements = [
        { name: "placer" },
        { name: "radius", parent: "placer" },
        { name: "item", parent: "radius", class: "placing" },
        { name: "frame", parent: "item" },
        { name: "body", parent: "item" },
        { name: "badge", parent: "body" },
        { name: "name", parent: "body" },
        { name: "status", parent: "item" },
        { name: "layer" },
        { name: "alert", class: "placing" },
        { name: "debug", tag: "ul" },
        { name: "debug_title", tag: "h5", parent: "debug" },
        { name: "debug_min", tag: "li", parent: "debug" },
        { name: "debug_max", tag: "li", parent: "debug" },
        { name: "debug_criteria", tag: "li", parent: "debug" },
        { name: "debug_amount", tag: "li", parent: "debug" },
        { name: "debug_depth", tag: "li", parent: "debug" },
    ];

    elements.map((x) => {
        const className = (gOrbit.class[x.name] = `${BASE_CLASS}-${x.name}`);
        const dom = (gOrbit.dom[x.name] = document.createElement(
            x.tag || "div"
        ));
        dom.classList.add(className);
        x.class && dom.classList.add(x.class);
        x.parent && gOrbit.dom[x.parent].appendChild(dom);
    });

    gOrbit.dom.orbit = document.querySelector(`.${BASE_CLASS}`);
    gOrbit.class.inner = `${BASE_CLASS}-inner`;
    const innerClassQuery = `.${BASE_CLASS} .${gOrbit.class.inner}`;
    gOrbit.dom.inner = document.querySelector(innerClassQuery);
    gOrbit.dom.debug_title.innerHTML = "DEBUG MODE";

    orbitScroll();

    DEBUG && console.log(`>> Created ${elements.length} Elements`);
};

export const orbitDrawCircle = (depth, height) => {
    const { BASE_CLASS } = gOrbit.options;
    if (depth == 1) {
        const circles = gOrbit.dom.orbit.querySelectorAll(
            `.${gOrbit.class.layer}`
        );
        circles.forEach((x) => {
            x.parentNode.removeChild(x);
        });
    }
    const clone = gOrbit.dom.layer.cloneNode(true);
    const cloneIdString = `${BASE_CLASS}-${gOrbit.class.layer}-${depth}`;
    clone.id = cloneIdString;
    clone.style.width = `${height * 2}rem`;
    gOrbit.dom.inner.appendChild(clone);
};

export const orbitTransition = (x) => {
    x.classList.remove("placing");
};
