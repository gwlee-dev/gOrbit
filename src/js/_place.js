export const orbitPlaceItems = (element) => {
    const { BASE_CLASS, ON_CLICK } = gOrbit.options;
    const clone = gOrbit.dom.placer.cloneNode(true);
    clone.id = `${BASE_CLASS}-${element.name}`;
    const inner = clone.querySelector(`.${gOrbit.class.body}`);
    const name = inner.querySelector(`.${gOrbit.class.name}`);
    name.innerHTML = element.name;
    inner.setAttribute("onclick", ON_CLICK);
    inner.name = `${element.name}`;
    ON_CLICK && inner.setAttribute("onclick", ON_CLICK);
    gOrbit.dom.inner.appendChild(clone);
};
