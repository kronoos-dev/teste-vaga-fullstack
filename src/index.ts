"use strict";

import { join } from "node:path";
import registerModuleAliases from "./modules";

registerModuleAliases();

import { parseArguments } from "./arguments";
import { Logging } from "./sdk/logging";
import { processCsvFile } from "./csv/processing";

function main(logger: Logging) {
    const dataFile = (fileName: string) => join(__dirname, `../../${fileName}`);

    const {
        values: { csvfile },
    } = parseArguments();

    if (typeof csvfile === "string") processCsvFile(logger, dataFile(csvfile));
}

(() => {
    const logger = new Logging(`fscc-kronoos`);

    logger.info("Initiating CSV Validator...", main.name);
    main(logger);
})();
