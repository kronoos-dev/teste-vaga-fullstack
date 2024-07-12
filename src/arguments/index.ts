import { parseArgs, ParseArgsConfig } from "node:util";

export interface IArgumentOption {
    type: "boolean" | "string";
    short?: string;
    multiple?: boolean;
}

export type TArgumentOptions = {
    [argname: string]: IArgumentOption;
};

export function parseArguments() {
    const options: TArgumentOptions = {
        csvfile: {
            type: "string",
            short: "f",
        },
    };

    const argsParserConfig: ParseArgsConfig = {
        options,
        allowPositionals: true,
    };

    const parsedArgs = parseArgs(argsParserConfig);

    return parsedArgs;
}
