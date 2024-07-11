"use strict";

import registerModuleAliases from "./modules";

registerModuleAliases();

import { Logger } from "./sdk/logging";

const logger = Logger(`fscc-kronoos@${__filename}`);

(() => {
    logger.info("Initiating CSV Validator...");
})();
