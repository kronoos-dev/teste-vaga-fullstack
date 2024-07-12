import { ZodIssue } from "zod";

import { csvOutputHeaders, TCSVLine, TCSVLineFieldValidationError } from "./definitions";
import { csvLineSchema } from "@src/csv/schema";

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
