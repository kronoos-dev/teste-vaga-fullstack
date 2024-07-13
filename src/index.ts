"use strict";

import registerModuleAliases from "./modules";

registerModuleAliases();

import { declareProcessListeners } from "@app/process";

import { main } from "./app";
import config, { buildEnvMessage, validateAppConfig } from "./app/config";
import { buildHelpMessage, parseArguments } from "./arguments";
import { Logging } from "./sdk/logging";
import { toBoolean } from "./sdk/parsing";
import { ValidationError } from "./sdk/exceptions";

const logger = new Logging(`fscc-kronoos`);

declareProcessListeners(logger);

function start() {
    const validationErrors = validateAppConfig(config);

    if (validationErrors.length) {
        throw new ValidationError(validationErrors);
    }

    const { parsedArgs, errors } = parseArguments();

    if (errors && !parsedArgs) throw new ValidationError(errors);

    if (toBoolean(parsedArgs?.values.help)) {
        logger.info(buildHelpMessage(), main.name);
        return;
    }

    logger.info(buildEnvMessage(config), main.name);
    logger.info("Initiating CSV Validator...", main.name);

    main(logger, parsedArgs!);
}

start();
