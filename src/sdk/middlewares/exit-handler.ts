import { Logging } from "../logging";

const handleGracefulExit = async (logger: Logging, code: number, timeout = 5000): Promise<void> => {
    const context = handleGracefulExit.name;
    const info = (m: string) => logger.info(m, context);
    const error = (m: string) => logger.error(m, context);

    try {
        info(`Attempting a graceful shutdown with code ${code}`);

        setTimeout(() => {
            info(`Forcing a shutdown with code ${code}`);
            process.exit(code);
        }, timeout).unref();

        info(`Exiting gracefully with code ${code}...`);

        process.exit(code);
    } catch (exc) {
        error("Error while attempting to shut down gracefully");
        error(exc instanceof Error ? exc.message : (exc as string));
        error(`Forcing exit with code ${code}...`);

        process.exit(code);
    }
};

export { handleGracefulExit };
