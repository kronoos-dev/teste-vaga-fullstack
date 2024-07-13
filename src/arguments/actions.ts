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

export function buildHelpMessage(): string {
    const { options } = defaultConfig;

    const helpMessageLines: string[] = [
        "\n\n---------------------------------------------------------------------\n",
        "FSCC KRONOOS - Program that performs an analysis of a given CSV file.\n",
        "---------------------------------------------------------------------\n\n",
        "USAGE (via Yarn):\n",
        "\tyarn start:prod [arguments] - Runs directly the transpiled app via Node.js, i.e. node ./build/src/index.js [arguments]\n",
        "\tyarn start:dev [arguments] - Runs the TypeScript code base with ts-node-dev, i.e. ts-node-dev ./src/index.ts [arguments]\n\n",
        "ARGUMENTS:\n",
    ];

    for (const [argName, argParams] of Object.entries(options!)) {
        const { short, description, type, required } = argParams;
        const line = `\t[-${short} | --${argName}]<${type}>: ${required !== undefined ? "Required" : "Optional"}. ${description}\n`;

        helpMessageLines.push(line);
    }

    return helpMessageLines.join("");
}
