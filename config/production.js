module.exports = {
    application: {
        environment: process.env.NODE_ENV,
    },
    csv: {
        processing: {
            inputBasePath: process.env.INPUT_CSV_BASE_PATH,
            outputBasePath: process.env.OUTPUT_CSV_BASE_PATH,
        },
    },
};
