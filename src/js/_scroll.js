export const orbitScroll = () => {
    const { orbit } = gOrbit.dom;

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
        pos = {
            left: orbit.scrollLeft,
            top: orbit.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        orbit.addEventListener("mousemove", mouseMoveHandler);
        orbit.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
        const deltaX = e.clientX - pos.x;
        const deltaY = e.clientY - pos.y;

        orbit.scrollTop = pos.top - deltaY;
        orbit.scrollLeft = pos.left - deltaX;

        orbit.style.userSelect = "none";
    };

    const mouseUpHandler = () => {
        orbit.removeEventListener("mousemove", mouseMoveHandler);
        orbit.removeEventListener("mouseup", mouseUpHandler);

        orbit.style.removeProperty("user-select");
    };

    orbit.addEventListener("mousedown", mouseDownHandler);
};
