// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require("node:path");

module.exports = {
    basePath: (targetDir) => join(__dirname, `../csv/${targetDir}`),
};
