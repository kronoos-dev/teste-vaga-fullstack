import { ZodIssue } from "zod";
import fs from "fs";

import { csvLineSchema } from "@csv/schema";
import { Logging } from "@sdk/logging";
import { csvOutputHeaders } from "./definitions";
import { TCSVLine, TCSVLineFieldValidationError, TCSVFilePaths, TCSVFileStreams, TCSVFileStreamType } from "./types";

function mapValidationErrors(issues: ZodIssue[]): TCSVLineFieldValidationError[] {
    const errors: TCSVLineFieldValidationError[] = [];

    for (const issue of issues) {
        const { code, message, path } = issue;

        errors.push({ code, message, header: path[0] as string });
    }

    return errors;
}

export function processCsvLine(csvLine: TCSVLine): TCSVLine {
    const { lineNumber, data } = csvLine;
    const result = csvLineSchema.safeParse(data);

    return {
        lineNumber,
        ...(result.success && { data: result.data }),
        ...(!result.success && { errors: mapValidationErrors(result.error.issues) }),
    };
}

export function buildCsvReportLine(csvLine: TCSVLine) {
    const { lineNumber, errors } = csvLine;

    // Reducing all the errors in one line
    // to a single string with line breaks
    return errors!.reduce((acc, error) => {
        acc += `${lineNumber},${error.header},${error.code},${error.message}\n`;
        return acc;
    }, "");
}

export function buildCsvOutputLine(csvLine: TCSVLine) {
    const { data } = csvLine;

    // Extracting data from each header by
    // reducing the output csv headers array
    return csvOutputHeaders.reduce((acc, header, currIx, arr) => {
        acc += currIx < arr.length ? `${data![header]},` : `${data![header]}\n`;
        return acc;
    }, "\n");
}

export function buildFileStream<R extends fs.ReadStream | fs.WriteStream>(
    filePath: string,
    type: TCSVFileStreamType,
    logger: Logging,
): R {
    const fsCreatorTypeMap = {
        ["read"]: fs.createReadStream,
        ["write"]: fs.createWriteStream,
    };

    const fsCreator = fsCreatorTypeMap[type];

    return fsCreator(filePath).on("error", (error) => logger.error(error.message, `${buildFileStream.name}`)) as R;
}

export function buildFileStreams(
    csvPaths: TCSVFilePaths,
    logger: Logging,
    statistics: boolean = false,
): TCSVFileStreams {
    const addFsStats = statistics && csvPaths.statistics !== undefined;

    return {
        fsInput: buildFileStream(csvPaths.input, "read", logger),
        fsOutput: buildFileStream(csvPaths.output, "write", logger),
        fsReport: buildFileStream(csvPaths.report, "write", logger),
        ...(addFsStats && {
            fsStats: buildFileStream(csvPaths.statistics!, "write", logger) as fs.WriteStream,
        }),
    };
}
