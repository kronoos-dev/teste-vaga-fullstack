import * as path from "path";
import moduleAlias from "module-alias";

import tsConfig from "../tsconfig.json";

const registerModuleAliases = (): void => {
    const { paths } = tsConfig.compilerOptions;
    const basePath = path.join(__dirname, "..");

    const buildPath = (moduleName: string, external = false): string => {
        // e.g. in dev mode, the test module is outside src/
        const pathToJoin = external ? moduleName : `src/${moduleName}`;

        return path.join(basePath, pathToJoin);
    };

    const mappedPaths: { [alias: string]: string } = {};

    for (const path of Object.keys(paths)) {
        const external = ["@src/*", "@test/*"].includes(path);
        const pathToMap = buildPath(path.replace("@", "").replace("/*", ""), external);

        mappedPaths[path.replace("/*", "")] = pathToMap;
    }

    moduleAlias.addAliases(mappedPaths);
};

export default registerModuleAliases;
