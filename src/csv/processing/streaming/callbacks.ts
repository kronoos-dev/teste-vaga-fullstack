import { buildCsvOutputLine, buildCsvReportLine, processCsvLine } from "@csv/processing/actions";
import { csvOutputHeaders, csvReportHeaders } from "@csv/processing/definitions";
import { TCSVFileStreams, TCSVLineData, TCSVStatistics } from "@csv/processing/types";
import { Logging } from "@sdk/logging";
import { Rounding } from "@sdk/numeric";
import { parseHrtimeToSeconds } from "@sdk/parsing";

function writeStatistics(fileStreams: TCSVFileStreams, statsData: TCSVStatistics, logger: Logging): void {
    logger.info("CSV parsing completed. writing statistics to CSV file...", writeStatistics.name);

    const { fsStats } = fileStreams;

    const buildLine = (series: (string | number | bigint)[]): string => {
        return series.reduce((acc, rawItem, currIx, arr) => {
            const item = typeof rawItem === "number" || typeof rawItem === "bigint" ? rawItem.toString() : rawItem;
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

export function onEndingEventCallback(fileStreams: TCSVFileStreams, statsData: TCSVStatistics, logger: Logging): void {
    const { fsOutput, fsReport, fsStats } = fileStreams;
    const r = (v: number, p: number = 7): number => Rounding.roundToNearest(v, p);

    fsOutput.end();
    fsReport.end();

    statsData.finishTimeSecs = parseHrtimeToSeconds(process.hrtime());
    statsData.elapsedTimeSecs = r(statsData.finishTimeSecs - statsData.startTimeSecs!);

    if (fsStats) {
        statsData = {
            ...statsData,
            invalidLinesRatio: r(statsData.totalInvalidLines / statsData.totalLinesProcessed),
            validLinesRatio: r(statsData.totalValidLines / statsData.totalLinesProcessed),
        };

        writeStatistics(fileStreams, statsData, logger);
    }

    logger.info(
        `CSV analysis pipeline completed successfully! Time elapsed: ${statsData.elapsedTimeSecs} seconds.`,
        onEndingEventCallback.name,
    );
}
