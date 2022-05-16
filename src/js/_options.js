export const defaultOptions = {
    DEBUG: false,
    BASE_CLASS: "orbit",
    BASE_RADIUS: 7,
    BASE_AMOUNT: 6,
    CATEGORIES: ["xs", "sm", "md", "lg"],
    UPDATE_INTERVAL: 1000,
    USE_FETCH: true,
    FETCH_HREF: "/api",
    FETCH_METHOD: "get",
    CLASS_MAP: {
        cpu: {
            NORMAL: "normal",
            WARN: "warning",
            CRITICAL: "critical",
        },
        memory: {
            NORMAL: "normal",
            WARN: "warning",
            CRITICAL: "critical",
        },
        disk: {
            NORMAL: "normal",
            WARN: "warning",
            CRITICAL: "critical",
        },
        server: {
            NORMAL: "normal",
            ABNORMAL: "abnormal",
        },
    },
    CONTENTS_FIELD: "name",
};

export const importOptions = (options) => {
    options.debug == true && console.log("Importing Options..");
    for (const opt in options) {
        gOrbit.options[opt.toUpperCase()] = options[opt];
    }
    options.debug && console.log(">> Importing Complete");
};
