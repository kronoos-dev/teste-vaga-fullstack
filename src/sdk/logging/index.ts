"use strict";

import { winston, levels, level, colors, TLogger } from "./definitions";

export class Logging {
    private _logger: TLogger;

    constructor(moduleName: string) {
        winston.addColors(colors);
        this._logger = Logging.buildLogger(moduleName);
    }

    private static buildLogger(moduleName: string): TLogger {
        const format = winston.format.combine(
            winston.format.label({ label: moduleName }),
            winston.format.colorize({ all: true }),
            winston.format.label({ label: moduleName }),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
            winston.format.printf((info) => {
                return `${info.timestamp} - ${info.label} - ${info.level} - ${info.message}`;
            }),
        );

        const transports = [new winston.transports.Console({})];

        return winston.createLogger({
            level: level(),
            levels,
            format,
            transports,
        });
    }

    public getInstance(): TLogger {
        return this._logger;
    }

    public warn(message: string, context?: string, callback?: winston.LogCallback): TLogger {
        return this._logger.warn(`@${context}: ${message}`, callback);
    }

    public info(message: string, context?: string, ...meta: unknown[]): TLogger {
        return this._logger.info(`@${context}: ${message}`, ...meta);
    }

    public debug(message: string, context?: string, ...meta: unknown[]): TLogger {
        return this._logger.debug(`@${context}: ${message}`, ...meta);
    }

    public error(message: string, context?: string, ...meta: unknown[]): TLogger {
        return this._logger.error(`@${context}: ${message}`, ...meta);
    }

    public http(message: string, context?: string, ...meta: unknown[]): TLogger {
        return this._logger.http(`@${context}: ${message}`, ...meta);
    }
}
