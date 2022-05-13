export const orbitPlaceItems = (element) => {
    const { BASE_CLASS, ON_CLICK, CONTENTS_FILED } = gOrbit.options;
    const { placer, inner } = gOrbit.dom;
    const clone = placer.cloneNode(true);
    clone.id = `${BASE_CLASS}-${element.name}`;
    const body = clone.querySelector(`.${gOrbit.class.body}`);
    const name = body.querySelector(`.${gOrbit.class.name}`);
    const contents = element[CONTENTS_FILED] || element.name;
    name.innerHTML = contents;
    body.name = `${element.name}`;
    ON_CLICK && body.setAttribute("onclick", ON_CLICK);
    inner.appendChild(clone);
};

export const orbitClearClass = (element, prefix) => {
    Array.from(element.classList)
        .filter((x) => x.startsWith(prefix))
        .map((x) => element.classList.remove(x));
};
