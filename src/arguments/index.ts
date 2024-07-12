import { parseArgs, ParseArgsConfig } from "node:util";

export interface IArgumentOption {
    type: "boolean" | "string";
    short?: string;
    multiple?: boolean;
    default?: boolean | string;
}

export type TArgumentOptions = {
    [argname: string]: IArgumentOption;
};

export function parseArguments() {
    const options: TArgumentOptions = {
        inputcsv: {
            type: "string",
            short: "i",
            default: "data.csv",
        },
        outputcsv: {
            type: "string",
            short: "o",
            default: "output.csv",
        },
        reportcsv: {
            type: "string",
            short: "r",
            default: "report.csv",
        },
    };

    const argsParserConfig: ParseArgsConfig = {
        options,
        allowPositionals: true,
    };

    const parsedArgs = parseArgs(argsParserConfig);

    return parsedArgs;
}
