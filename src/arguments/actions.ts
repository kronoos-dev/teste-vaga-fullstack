import { parseArgs } from "node:util";

import { IParseArgsConfig, TArgumentOptions, TParsedResults, TParsedArgumentsResults } from "./types";
import { defaultConfig } from "./definitions";

export function checkParsedArgs(parsedArgs: TParsedResults, options: TArgumentOptions): (string | never)[] {
    const errors: string[] = [];

    for (const [name, { required }] of Object.entries(options)) {
        // Check if the required arguments were informed
        if (required && !(name in parsedArgs.values)) {
            errors.push(`--${name} must be provided`);
        }
    }

    return errors;
}

export function parseArguments(config?: IParseArgsConfig): TParsedArgumentsResults {
    const parseArgsConfig: IParseArgsConfig = {
        ...defaultConfig,
        ...(config !== undefined && { ...config }),
    };

    const parsedArgs = parseArgs(parseArgsConfig);
    const errors = checkParsedArgs(parsedArgs, parseArgsConfig.options!);

    return {
        parsedArgs,
        ...(errors.length && { errors }),
    };
}
