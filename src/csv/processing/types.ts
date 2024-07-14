import fs from "fs";

export type TCSVLineFieldValidationError = {
    header: string;
    code: string;
    message: string;
};

export type TCSVLineData = {
    [header: string]: string | number;
};

export type TCSVLine = {
    lineNumber: number;
    errors?: (TCSVLineFieldValidationError | never)[];
    data?: TCSVLineData;
};

export type TCSVFilePaths = {
    input: string;
    output: string;
    report: string;
    statistics?: string;
};

export type TCSVFileStreamType = "read" | "write";

export type TCSVFileStreams = {
    fsInput: fs.ReadStream;
    fsOutput: fs.WriteStream;
    fsReport: fs.WriteStream;
    fsStats?: fs.WriteStream;
};

export type TCSVProcessingParams = {
    debug?: boolean;
    statistics?: boolean;
};

export type TCSVStatistics = {
    startTimeSecs?: number;
    finishTimeSecs?: number;
    elapsedTimeSecs?: number;
    totalLinesProcessed: number;
    totalValidLines: number;
    totalInvalidLines: number;
    validLinesRatio?: number;
    invalidLinesRatio?: number;
};
