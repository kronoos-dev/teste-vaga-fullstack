import { ParseArgsConfig, parseArgs } from "node:util";

export interface IArgumentOption {
    default?: boolean | string;
    description?: string;
    multiple?: boolean;
    required?: boolean;
    short?: string;
    type: "boolean" | "string";
}

export type TArgumentOptions = {
    [argname: string]: IArgumentOption;
};

export type TParsedResults = ReturnType<typeof parseArgs>;

export interface IParseArgsConfig extends ParseArgsConfig {
    options?: TArgumentOptions;
}

export type TParsedArgumentsResults = {
    parsedArgs?: TParsedResults;
    errors?: string[];
};
