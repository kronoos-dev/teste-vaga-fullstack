import csv from "csv-parser";
import fs from "fs";
import { ZodIssue } from "zod";

import { csvLineSchema } from "../schema";
import { TCSVLine, TCSVLineData, TCSVLineFieldValidationError } from "./definitions";
import { Logging } from "@sdk/logging";

function mapValidationErrors(issues: ZodIssue[]): TCSVLineFieldValidationError[] {
    const errors: TCSVLineFieldValidationError[] = [];

    for (const issue of issues) {
        const { code, message, path } = issue;

        errors.push({ code, message, header: path[0] as string });
    }

    return errors;
}

function processCsvLine(csvLine: TCSVLine): TCSVLine {
    const { lineNumber, data } = csvLine;
    const result = csvLineSchema.safeParse(data);

    return {
        lineNumber,
        ...(result.success && { data: result.data }),
        ...(!result.success && { errors: mapValidationErrors(result.error.issues) }),
    };
}

export function processCsvFile(logger: Logging, csvFilePath: string = "") {
    let lineNumber: number = 0,
        invalidLines: number = 0,
        validLines: number = 0;

    const validLinesStream = fs.createWriteStream("valid-lines.txt");
    const validationReportStream = fs.createWriteStream("validation-report.txt");

    // Callback for the "data" event listener
    const rsDataEventCallback = (data: TCSVLineData): void => {
        lineNumber += 1;
        logger.info(`Processing line #${lineNumber}...`, processCsvFile.name);

        const parsedLine = processCsvLine({ lineNumber, data });

        if (parsedLine.errors) {
            invalidLines += 1;
            validationReportStream.write(JSON.stringify(parsedLine));
        } else {
            validLines += 1;
            validLinesStream.write(JSON.stringify(parsedLine));
        }
    };

    // Callback for the "end" event listener
    const rsEndingEventCallback = (): void => {
        validLinesStream.end();
        validationReportStream.end();

        logger.info(
            `CSV parsing completed. ${validLines} valid lines. Detected ${invalidLines} errors.`,
            processCsvFile.name,
        );
    };

    fs.createReadStream(csvFilePath).pipe(csv()).on("data", rsDataEventCallback).on("end", rsEndingEventCallback);
}
