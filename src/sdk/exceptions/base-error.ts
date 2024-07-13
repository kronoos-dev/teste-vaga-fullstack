import { IErrorPayload } from "./types";

export abstract class BaseError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, BaseError.prototype);
    }

    abstract serializeErrors(): IErrorPayload[];
}
