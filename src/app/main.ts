import { join } from "node:path";
import fs from "fs";

import config from "@app/config";
import { processCsvFilePipeline, TCSVFilePaths, TCSVProcessingParams } from "@csv/processing";
import { TParsedResults } from "@src/arguments";
import { Logging } from "@sdk/logging";
import { toBoolean } from "@sdk/parsing";

type TCSVFilePathType = "input" | "output";
type TCSVPipelineInputParams = {
    csvPaths: TCSVFilePaths;
    processingParams: TCSVProcessingParams;
};

function buildFilePath(fileName: string, type: TCSVFilePathType): string {
    const {
        csv: {
            processing: { inputBasePath, outputBasePath },
        },
    } = config;

    const pathTypeMap = {
        ["input"]: inputBasePath,
        ["output"]: outputBasePath,
    };

    return join(pathTypeMap[type]!, fileName);
}

function extractPipelineInputParams(parsedArgs: TParsedResults): TCSVPipelineInputParams {
    const {
        values: { inputcsv, outputcsv, reportcsv, statscsv, statistics, debug },
    } = parsedArgs;

    const csvPaths = {
        input: buildFilePath(inputcsv as string, "input"),
        output: buildFilePath(outputcsv as string, "output"),
        report: buildFilePath(reportcsv as string, "output"),
        ...(typeof statscsv === "string" && { statistics: buildFilePath(statscsv, "output") }),
    };

    const processingParams = {
        ...(typeof debug === "boolean" && { debug: toBoolean(debug) }),
        ...(typeof statistics === "boolean" && { statistics: toBoolean(statistics) }),
    };

    return { csvPaths, processingParams };
}

function checkCsvDirStructure(logger: Logging): void {
    const mkdirIfNotExists = (label: string, path: string) => {
        if (!fs.existsSync(path)) {
            logger.info(`Creating folder "${label}" at "${path}"...`, checkCsvDirStructure.name);
            fs.mkdirSync(path, { recursive: true });
        }
    };

    for (const [key, path] of Object.entries(config.csv.processing)) {
        mkdirIfNotExists(key, path);
    }
}

export function main(logger: Logging, parsedArgs: TParsedResults): void {
    checkCsvDirStructure(logger);

    const { csvPaths, processingParams } = extractPipelineInputParams(parsedArgs);

    if (!fs.existsSync(csvPaths.input)) {
        logger.warn(`Input CSV file ${csvPaths.input} does not exist. Check the input folder.`, main.name);
        return;
    }

    processCsvFilePipeline(logger, csvPaths, processingParams);
}
