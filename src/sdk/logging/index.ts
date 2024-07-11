"use strict";

import * as winston from "winston";

export const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

export const level = (): string => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";

    return isDevelopment ? "debug" : "warn";
};

export const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "gray",
};

winston.addColors(colors);

export const Logger = (moduleName: string): winston.Logger => {
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
};
