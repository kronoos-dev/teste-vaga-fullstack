import { buildCsvOutputLine, buildCsvReportLine, processCsvLine } from "@csv/processing/actions";
import { csvOutputHeaders, csvReportHeaders } from "@csv/processing/definitions";
import { TCSVFilePaths, TCSVFileStreams, TCSVLineData, TCSVStatistics } from "@csv/processing/types";
import { Logging } from "@sdk/logging";

function writeStatistics(fileStreams: TCSVFileStreams, statsData: TCSVStatistics, logger: Logging): void {
    logger.info("CSV parsing completed. writing statistics to CSV file...", writeStatistics.name);

    const { fsStats } = fileStreams;

    const buildLine = (series: (string | number)[]): string => {
        return series.reduce((acc, rawItem, currIx, arr) => {
            const item = typeof rawItem === "number" ? rawItem.toString() : rawItem;
            acc += currIx < arr.length ? `${item},` : `${item}`;

            return acc;
        }, "") as string;
    };

    fsStats!.write(`${buildLine(Object.keys(statsData))}\n${buildLine(Object.values(statsData))}\n`);
    fsStats!.close();
}

export function writeCsvHeaders(fileStreams: TCSVFileStreams): void {
    const { fsReport, fsOutput } = fileStreams;

    fsReport.write(`${csvReportHeaders.join(",")}\n`);
    fsOutput.write(`${csvOutputHeaders.join(",")}\n`);
}

export function onDataEventCallback(
    data: TCSVLineData,
    fileStreams: TCSVFileStreams,
    statsData: TCSVStatistics,
    logger: Logging,
    showProcessLineNumber: boolean = false,
): void {
    const { fsReport, fsOutput } = fileStreams;

    statsData.totalLinesProcessed += 1;

    const parsedLine = processCsvLine({ lineNumber: statsData.totalLinesProcessed, data });

    if (parsedLine.errors) {
        statsData.totalInvalidLines += 1;
        fsReport.write(buildCsvReportLine(parsedLine));
    } else {
        statsData.totalValidLines += 1;
        fsOutput.write(buildCsvOutputLine(parsedLine));
    }

    if (showProcessLineNumber)
        logger.info(
            `lineNumber: ${statsData.totalLinesProcessed}` +
                `\ttotalInvalidLines: ${statsData.totalInvalidLines}` +
                `\ttotalValidLines: ${statsData.totalValidLines}`,
            onDataEventCallback.name,
        );
}

export function onEndingEventCallback(
    fileStreams: TCSVFileStreams,
    csvPaths: TCSVFilePaths,
    statsData: TCSVStatistics,
    logger: Logging,
): void {
    const { output, report, statistics } = csvPaths;
    const { fsOutput, fsReport, fsStats } = fileStreams;

    fsOutput.end();
    fsReport.end();

    if (fsStats) {
        statsData = {
            ...statsData,
            outputCsvPath: output,
            reportCsvPath: report,
            statsCsvPath: statistics,
        };

        writeStatistics(fileStreams, statsData, logger);
    }

    logger.info("CSV analysis pipeline completed successfully!", onEndingEventCallback.name);
}
