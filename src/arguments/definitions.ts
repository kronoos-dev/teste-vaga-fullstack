import { IParseArgsConfig, TArgumentOptions } from "./types";

export const defaultArgOptions: TArgumentOptions = {
    debug: {
        type: "boolean",
        short: "d",
        default: false,
        description: "Optional. Enables debugging messages during the execution of the CSV analysis pipeline.",
    },
    statistics: {
        type: "boolean",
        short: "S",
        default: true,
        description: "Optional. Enables exporting of relevant statistical data concerning the CSV analysis.",
    },
    inputcsv: {
        type: "string",
        short: "i",
        required: true,
        description: "Name of the input CSV file, containing the data to be analyzed.",
    },
    outputcsv: {
        type: "string",
        short: "o",
        default: "output.csv",
        description: "Name of the output CSV file, containing the parsed and validated data.",
    },
    reportcsv: {
        type: "string",
        short: "r",
        default: "report.csv",
        description: "Name of the output CSV file, containing the validation report data.",
    },
    statscsv: {
        type: "string",
        short: "s",
        default: "statistics.csv",
        description: "Name of the output CSV file, containing relevant statistical data related to the analysis.",
    },
};

export const defaultConfig: IParseArgsConfig = {
    strict: true,
    allowPositionals: true,
    options: defaultArgOptions,
};
