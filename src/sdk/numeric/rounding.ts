import { ERoundingMethod, TRoundingMethod } from "./definitions";

class Rounding {
    public static applyRoundingMethod(
        value: number,
        precision = 2,
        method: TRoundingMethod = ERoundingMethod.NEAREST,
    ): number {
        const methodSwitcher = {
            [ERoundingMethod.UP]: Math.ceil,
            [ERoundingMethod.DOWN]: Math.floor,
            [ERoundingMethod.NEAREST]: Math.round,
            [ERoundingMethod.TRUNCATE]: Math.trunc,
        };

        const methodCallable = methodSwitcher[method];

        if (methodCallable === undefined) {
            throw new Error(`Rounding method ${method.toUpperCase()} not supported`);
        }

        const multiplier = Math.pow(10, precision);

        return methodCallable(value * multiplier) / multiplier;
    }

    public static roundToNearest(value: number, precision = 2): number {
        return Rounding.applyRoundingMethod(value, precision, ERoundingMethod.NEAREST);
    }

    public static roundUp(value: number, precision = 2): number {
        return Rounding.applyRoundingMethod(value, precision, ERoundingMethod.UP);
    }

    public static roundDown(value: number, precision = 2): number {
        return Rounding.applyRoundingMethod(value, precision, ERoundingMethod.DOWN);
    }

    public static truncate(value: number, precision = 2): number {
        return Rounding.applyRoundingMethod(value, precision, ERoundingMethod.TRUNCATE);
    }
}

export default Rounding;
