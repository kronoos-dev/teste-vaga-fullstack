"use strict";

import { join } from "node:path";
import registerModuleAliases from "./modules";

registerModuleAliases();

import { parseArguments } from "./arguments";
import { Logging } from "./sdk/logging";
import { processCsvFile } from "./csv/processing";

function main(logger: Logging) {
    const buildFilePath = (fileName: string) => join(__dirname, `../../${fileName}`);

    const {
        values: { inputcsv, outputcsv, reportcsv },
    } = parseArguments();

    const csvPaths = {
        input: buildFilePath(inputcsv as string),
        output: buildFilePath(outputcsv as string),
        report: buildFilePath(reportcsv as string),
    };

    processCsvFile(logger, csvPaths);
}

(() => {
    const logger = new Logging(`fscc-kronoos`);

    logger.info("Initiating CSV Validator...", main.name);
    main(logger);
})();
