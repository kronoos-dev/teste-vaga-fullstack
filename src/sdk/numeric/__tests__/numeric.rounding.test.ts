import { ERoundingMethod, TRoundingMethod } from "../definitions";
import Rounding from "../rounding";

interface ITestCase {
    value: number;
    precision: number;
    method?: TRoundingMethod;
    expected: number;
}

describe("Unit testing for the utility module", () => {
    const testCases: ITestCase[] = [
        { value: 1.1, precision: 0, method: ERoundingMethod.UP, expected: 2.0 },
        { value: 1.23, precision: 1, method: ERoundingMethod.UP, expected: 1.3 },
        { value: 1.543, precision: 2, method: ERoundingMethod.UP, expected: 1.55 },
        { value: 22.45, precision: -1, method: ERoundingMethod.UP, expected: 30.0 },
        { value: 1352, precision: -2, method: ERoundingMethod.UP, expected: 1400 },
        { value: 1.5, precision: 0, method: ERoundingMethod.DOWN, expected: 1.0 },
        { value: 1.37, precision: 1, method: ERoundingMethod.DOWN, expected: 1.3 },
        { value: -0.5, precision: 0, method: ERoundingMethod.DOWN, expected: -1.0 },
        { value: 231.35678, precision: 3, method: ERoundingMethod.TRUNCATE, expected: 231.356 },
    ];

    test.each(testCases)(
        "Rounding '$value' with method '$method' and precision '$precision'",
        ({ value, precision, method, expected }) => {
            expect(Rounding.applyRoundingMethod(value, precision, method)).toStrictEqual(expected);
        },
    );

    const roundingUpTestCases = testCases.filter((item) => item.method === ERoundingMethod.UP);

    test.each(roundingUpTestCases)(
        "Rounding up '$value' for precision '$precision'",
        ({ value, precision, expected }) => {
            expect(Rounding.roundUp(value, precision)).toStrictEqual(expected);
        },
    );

    const roundingDownTestCases = testCases.filter((item) => item.method === ERoundingMethod.DOWN);

    test.each(roundingDownTestCases)(
        "Rounding down '$value' for precision '$precision'",
        ({ value, precision, expected }) => {
            expect(Rounding.roundDown(value, precision)).toStrictEqual(expected);
        },
    );

    it("Throws an error if the informed rounding method is invalid", () => {
        expect.assertions(1);

        const target = () => {
            Rounding.applyRoundingMethod(1.234, 3, "foobar" as TRoundingMethod);
        };

        expect(target).toThrow("Rounding method FOOBAR not supported");
    });
});
