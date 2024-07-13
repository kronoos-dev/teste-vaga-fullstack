"use strict";

import registerModuleAliases from "./modules";

registerModuleAliases();

import config, { buildEnvMessage, validateAppConfig } from "./app/config";
import { declareProcessListeners } from "@app/process";
import { Logging } from "@sdk/logging";
import { main } from "@src/app";
import { ValidationError } from "./sdk/exceptions";

const logger = new Logging(`fscc-kronoos`);

declareProcessListeners(logger);

(() => {
    const validationErrors = validateAppConfig(config);

    if (validationErrors.length) {
        throw new ValidationError(validationErrors);
    }

    logger.info(buildEnvMessage(config), main.name);
    logger.info("Initiating CSV Validator...", main.name);

    main(logger);
})();
