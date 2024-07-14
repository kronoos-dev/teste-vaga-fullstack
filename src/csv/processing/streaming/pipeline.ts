import csv from "csv-parser";

import { Logging } from "@sdk/logging";
import { buildFileStreams } from "@csv/processing/actions";
import { defaultProcessingParams } from "@csv/processing/definitions";
import { TCSVFilePaths, TCSVProcessingParams, TCSVStatistics } from "@csv/processing/types";
import { onDataEventCallback, onEndingEventCallback, writeCsvHeaders } from "./callbacks";
import { parseHrtimeToSeconds } from "@src/sdk/parsing";

export function processCsvFilePipeline(
    logger: Logging,
    csvPaths: TCSVFilePaths,
    processingParams?: TCSVProcessingParams,
) {
    const finalProcessingParams = {
        ...defaultProcessingParams,
        ...(processingParams !== undefined && { ...processingParams }),
    };

    const { debug, statistics } = finalProcessingParams;
    const fileStreams = buildFileStreams(csvPaths, logger, statistics);

    const statsData: TCSVStatistics = {
        totalLinesProcessed: 0,
        totalInvalidLines: 0,
        totalValidLines: 0,
        startTimeSecs: parseHrtimeToSeconds(process.hrtime()),
    };

    if (!debug) logger.info("Processing CSV file. This might take some time...", processCsvFilePipeline.name);

    writeCsvHeaders(fileStreams);

    fileStreams.fsInput
        .pipe(csv())
        .on("data", (data) => onDataEventCallback(data, fileStreams, statsData, logger, debug))
        .on("end", () => onEndingEventCallback(fileStreams, statsData, logger));
}
