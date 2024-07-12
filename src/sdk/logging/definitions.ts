import * as winston from "winston";

export type TLogger = winston.Logger;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = (): string => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";

    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "gray",
};

export { winston, levels, level, colors };
