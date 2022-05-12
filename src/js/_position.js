import { orbitDrawCircle, orbitTransition } from "./_elements";

export const orbitSetPosition = async (max) => {
    const { DEBUG, BASE_CLASS, BASE_RADIUS } = gOrbit.options;
    const { orbit } = gOrbit.dom;
    const { placer, radius, item, body, status } = gOrbit.class;
    DEBUG && console.log("Setting Position..");
    for (let depth = 1; depth < max; ) {
        const elements = orbit.querySelectorAll(
            `.${placer}.${BASE_CLASS}-depth-${depth} .${radius}`
        );
        const eachAngle = 360 / elements.length;
        const height = BASE_RADIUS * depth;
        orbitDrawCircle(depth++, height);
        elements.forEach((x, idx) => {
            const angle = eachAngle * idx;
            setTimeout(orbitTransition, 0, x.querySelector(`.${item}`));
            x.style.height = `${height}rem`;
            x.style.transform = `rotate(${angle}deg)`;
            const bodyElement = x.querySelector(`.${body}`);
            const statusElement = x.querySelector(`.${status}`);
            bodyElement.style.transform = `rotate(-${angle}deg)`;
            statusElement.style.transform = `rotate(-${angle}deg)`;
        });
    }
    DEBUG && console.log(">> Setting Complete");
};
