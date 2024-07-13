import { IAppConfig } from "@app/config";
import { flattenObject } from "@sdk/parsing";

export function buildEnvMessage(config: IAppConfig): string {
    const {
        application: { environment },
    } = config;
    const condition = environment !== undefined && typeof environment === "string";

    return condition ? `Running on ${environment.toUpperCase()} environment` : "Environment not set. Things may crash!";
}

export function validateAppConfig(config: IAppConfig): string[] {
    const errorMsgs: string[] = [];
    const flattenedConfig = flattenObject(config as unknown as Record<string, unknown>);

    const checkObject = (object: object): void => {
        for (const [key, value] of Object.entries(object)) {
            if (value === undefined) {
                errorMsgs.push(`Parameter "${key}" must be defined`);
            }
        }
    };

    checkObject(flattenedConfig);

    return errorMsgs;
}
