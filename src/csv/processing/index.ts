import csv from "csv-parser";
import fs from "fs";

import { processCsvLine, buildCsvOutputLine, buildCsvReportLine } from "./actions";
import { csvOutputHeaders, csvReportHeaders, TCSVFilePaths, TCSVLineData } from "./definitions";
import { Logging } from "@sdk/logging";

export function processCsvFile(logger: Logging, csvPaths: TCSVFilePaths) {
    const { input, output, report } = csvPaths;
    const readStream = fs.createReadStream(input);
    const outWriteStream = fs.createWriteStream(output);
    const reportWriteStream = fs.createWriteStream(report);

    let lineNumber: number = 0,
        invalidLines: number = 0,
        validLines: number = 0;

    // Writes the headers' lines on each output file
    const writeCsvHeaders = (): void => {
        reportWriteStream.write(`${csvReportHeaders.join(",")}\n`);
        outWriteStream.write(`${csvOutputHeaders.join(",")}\n`);
    };

    // Callback for the "data" event listener
    const rsDataEventCallback = (data: TCSVLineData): void => {
        lineNumber += 1;
        logger.info(`Processing line #${lineNumber}...`, processCsvFile.name);

        const parsedLine = processCsvLine({ lineNumber, data });

        if (parsedLine.errors) {
            invalidLines += 1;
            reportWriteStream.write(buildCsvReportLine(parsedLine));
        } else {
            validLines += 1;
            outWriteStream.write(buildCsvOutputLine(parsedLine));
        }
    };

    // Callback for the "end" event listener
    const rsEndingEventCallback = (): void => {
        outWriteStream.end();
        reportWriteStream.end();

        logger.info(
            `CSV parsing completed. ${validLines} valid lines. Detected ${invalidLines} errors.`,
            processCsvFile.name,
        );
    };

    writeCsvHeaders();

    readStream.pipe(csv()).on("data", rsDataEventCallback).on("end", rsEndingEventCallback);
}
