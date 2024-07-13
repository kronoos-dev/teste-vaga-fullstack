// eslint-disable-next-line @typescript-eslint/no-var-requires
const { basePath } = require("./common");

module.exports = {
    application: {
        environment: process.env.NODE_ENV || "development",
    },
    csv: {
        processing: {
            inputBasePath: process.env.INPUT_CSV_BASE_PATH || basePath("input"),
            outputBasePath: process.env.OUTPUT_CSV_BASE_PATH || basePath("output"),
        },
    },
};
