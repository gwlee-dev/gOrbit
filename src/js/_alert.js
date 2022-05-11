import { logger } from "./_debug";
import { orbitTransition } from "./_elements";

export const orbitPrintError = (msg, err) => {
    let errMsg = "오류가 발생했습니다.";
    let errDetail = "";

    if (msg == "new") {
        errMsg = "데이터를 갱신하는 동안 오류가 발생했습니다.";
    }

    if (err.message == "Unexpected end of JSON input") {
        errDetail = "파싱 오류";
    }
    if (err.message == "Cannot read properties of undefined (reading 'sort')") {
        errDetail = "데이터 오류";
    }
    if (
        err.message ==
        "Cannot read properties of undefined (reading 'serviceData')"
    ) {
        errDetail = "서버/데이터 오류";
    }

    let element = gOrbit.elements.orbit.querySelector(`.${gOrbit.class.alert}`);
    const errString = `${errMsg}&nbsp;&nbsp;( ${errDetail} )`;
    console.log(`%c ${errMsg}`, "color: red");
    if (element) {
        element.innerHTML = errString;
    } else {
        const clone = gOrbit.elements.alert.cloneNode(true);
        clone.innerHTML = errString;
        gOrbit.elements.orbit.appendChild(clone);
        element = gOrbit.elements.orbit.querySelector(`.${gOrbit.class.alert}`);
    }
    setTimeout(orbitTransition, 500, element);
};

export const orbitRemoveError = () => {
    const element = gOrbit.elements.orbit.querySelector(
        `.${gOrbit.class.alert}`
    );
    element && gOrbit.elements.orbit.removeChild(element);
};
