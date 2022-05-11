import { orbitSetDepth } from "./_depth";
import { orbitInitFunc } from "./_init";
import { orbitListenFunc } from "./_listen";
import { defaultOptions } from "./_options";
import { orbitSetPosition } from "./_position";
import { orbitUpdate } from "./_update";

export const orbitDashboard = {
    init: orbitInitFunc,
    listen: orbitListenFunc,
    update: orbitUpdate,
    set: {
        depth: orbitSetDepth,
        position: orbitSetPosition,
    },
    dataList: [],
    options: defaultOptions,
    elements: {},
    class: {},
};
