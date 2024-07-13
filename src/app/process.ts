import { handleGracefulExit } from "@sdk/middlewares";
import { BaseError } from "@sdk/exceptions";
import { Logging } from "@sdk/logging";

const declareProcessListeners = (logger: Logging) => {
    process.on("unhandledRejection", (reason: Error | undefined) => {
        logger.warn(`Unhandled Rejection: ${reason?.message || reason}`, "unhandledRejection");

        throw new Error(reason?.message || reason?.toString());
    });

    process.on("uncaughtException", (error: Error) => {
        const isBaseError = error instanceof BaseError;

        logger.error(`${error.message}`, "uncaughtException");

        if (isBaseError) {
            const errorMsgs = (error as BaseError).serializeErrors();

            for (const err of errorMsgs) {
                logger.error(err.message, err.name);
            }
        }
    });

    process.on("SIGTERM", () => {
        logger.warn(`Process ${process.pid} received SIGTERM: Exiting with code 0...`, "SIGTERM");
        handleGracefulExit(logger, 0);
    });

    process.on("SIGINT", () => {
        logger.warn(`Process ${process.pid} received SIGINT: Exiting with code 0...`, "SIGINT");
        handleGracefulExit(logger, 0);
    });
};

export { declareProcessListeners };
