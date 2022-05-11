import { orbitDrawCircle, orbitTransition } from "./_elements";

export const orbitSetPosition = async (max) => {
    const { DEBUG, BASE_CLASS, BASE_RADIUS } = gOrbit.options;
    DEBUG && console.log("Setting Position..");
    for (let depth = 1; depth < max; ) {
        const elements = gOrbit.dom.orbit.querySelectorAll(
            `.${gOrbit.class.placer}.${BASE_CLASS}-depth-${depth} .${gOrbit.class.radius}`
        );
        const elementAmount = elements.length;
        const eachAngle = 360 / elementAmount;
        const currentHeight = BASE_RADIUS * depth;
        orbitDrawCircle(depth++, currentHeight);
        let currentAngle = 0;
        for (const element of elements) {
            setTimeout(
                orbitTransition,
                0,
                element.querySelector(`.${gOrbit.class.item}`)
            );
            element.style.height = `${currentHeight}rem`;
            element.style.transform = `rotate(${currentAngle}deg)`;
            const bodyElement = element.querySelector(`.${gOrbit.class.body}`);
            const statusElement = element.querySelector(
                `.${gOrbit.class.status}`
            );
            bodyElement.style.transform = `rotate(-${currentAngle}deg)`;
            statusElement.style.transform = `rotate(-${currentAngle}deg)`;
            currentAngle += eachAngle;
        }
    }
    DEBUG && console.log(">> Setting Complete");
};
