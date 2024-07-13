import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
    constructor(public errors: string[]) {
        super("Errors were detected validating data");

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return {
                name: this.name,
                message: err,
            };
        });
    }
}
