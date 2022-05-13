import { orbitTransition } from "./_elements";

export const orbitPrintError = (err) => {
    const { DEBUG } = gOrbit.options;
    const { orbit, alert } = gOrbit.dom;
    let errMsg = "데이터를 갱신하는 동안 오류가 발생했습니다.";
    let errDetail = "";

    switch (err.message) {
        case "Unexpected end of JSON input":
            errDetail = "파싱 오류";
            break;
        case "Cannot read properties of undefined (reading 'sort')":
            errDetail = "데이터 오류";
            break;
        case "Cannot read properties of undefined (reading 'serviceData')":
            errDetail = "서버 / 데이터 오류";
            break;
        default:
            errDetail = `서버 오류: ${err}`;
            break;
    }

    let element = orbit.querySelector(`.${gOrbit.class.alert}`);
    const errString = `${errMsg}&nbsp;&nbsp;( ${errDetail} )`;
    !DEBUG && console.log(`%c ${errMsg}`, "color: red");
    if (element) {
        element.innerHTML = errString;
    } else {
        alert.innerHTML = errString;
        orbit.appendChild(alert);
        element = orbit.querySelector(`.${gOrbit.class.alert}`);
    }
    setTimeout(orbitTransition, 500, element);
};

export const orbitRemoveError = () => {
    const { orbit } = gOrbit.dom;
    const element = orbit.querySelector(`.${gOrbit.class.alert}`);
    element && orbit.removeChild(element);
};
