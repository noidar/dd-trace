module.exports = {
    // https://www.i18next.com/overview/configuration-options#logging
    // debug: process.env.NODE_ENV === "development",
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
        localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === "development",
};
