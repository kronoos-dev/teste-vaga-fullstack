import Numeric from "../parsing";
import { ERoundingMethod, TRoundingMethod } from "../definitions";

describe("Unit testing for the numeric utility", () => {
    const isNumericTestCases = [
        { value: 0.1, expected: true },
        { value: "1", expected: true },
        { value: "-1", expected: true },
        { value: 1, expected: true },
        { value: -1, expected: true },
        { value: 0, expected: true },
        { value: -0, expected: true },
        { value: "0", expected: true },
        { value: "-0", expected: true },
        { value: 2e2, expected: true },
        { value: 1e23, expected: true },
        { value: 1.1, expected: true },
        { value: -0.1e-45, expected: true },
        { value: -0.12, expected: true },
        { value: "0.1", expected: true },
        { value: "2e2", expected: true },
        { value: "1e23", expected: true },
        { value: "-0.1", expected: true },
        { value: " 898", expected: true },
        { value: "080", expected: true },
        { value: "9BX46B6A", expected: false },
        { value: "+''", expected: false },
        { value: "", expected: false },
        { value: "-0,1", expected: false },
        { value: [], expected: false },
        { value: "123a", expected: false },
        { value: "a", expected: false },
        { value: "NaN", expected: false },
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        { value: 1e10000, expected: false },
        { value: undefined, expected: false },
        { value: null, expected: false },
        { value: NaN, expected: false },
        { value: Infinity, expected: false },
        { value: () => {}, expected: false },
    ];

    test.each(isNumericTestCases)("isNumeric($value) should return $expected", ({ value, expected }) => {
        expect(Numeric.isNumeric(value)).toStrictEqual(expected);
    });

    const numRangeTestCases = [
        { callable: Numeric.isPositive, value: "12.345", expected: true },
        { callable: Numeric.isNonNegative, value: "12.345", expected: true },
        { callable: Numeric.isNegative, value: "12.345", expected: false },
        { callable: Numeric.isNonPositive, value: "12.345", expected: false },

        { callable: Numeric.isPositive, value: "-0.7e-45", expected: false },
        { callable: Numeric.isNonNegative, value: "-0.7e-45", expected: false },
        { callable: Numeric.isNegative, value: "-0.7e-45", expected: true },
        { callable: Numeric.isNonPositive, value: "-0.7e-45", expected: true },

        { callable: Numeric.isPositive, value: "1e16", expected: true },
        { callable: Numeric.isNonNegative, value: "1e16", expected: true },
        { callable: Numeric.isNegative, value: "1e16", expected: false },
        { callable: Numeric.isNonPositive, value: "1e16", expected: false },

        { callable: Numeric.isPositive, value: "foobar", expected: false },
        { callable: Numeric.isNonNegative, value: "foobar", expected: false },
        { callable: Numeric.isNegative, value: "foobar", expected: false },
        { callable: Numeric.isNonPositive, value: "foobar", expected: false },

        { callable: Numeric.isPositive, value: "  what 23ever 56 ", expected: false },
        { callable: Numeric.isNonNegative, value: "  what 23ever 56 ", expected: false },
        { callable: Numeric.isNegative, value: "  what 23ever 56 ", expected: false },
        { callable: Numeric.isNonPositive, value: "  what 23ever 56 ", expected: false },
    ];

    test.each(numRangeTestCases)("$callable.name($value) should return $expected", ({ callable, value, expected }) => {
        expect.assertions(1);
        expect(callable(value)).toStrictEqual(expected);
    });

    const parseToNumberTestCases: {
        value: string;
        coerce?: boolean;
        decimalDigits?: number;
        toNumber?: boolean;
        roundingMethod?: TRoundingMethod;
        expected: string | number;
    }[] = [
        { value: "-12.7423", expected: -12.74 },
        { value: "-12,7423", decimalDigits: 3, expected: -12.742 },
        { value: "@-d10,343,011-.01<23  >", expected: NaN },
        { value: "2456356.345", decimalDigits: 3, expected: 2456356.345 },
        { value: "-2456356,345", decimalDigits: 3, expected: -2456356.345 },
        { value: "2,456,356.345", decimalDigits: 3, expected: 2456356.345 },
        { value: "-2.456.356,345", decimalDigits: 3, expected: -2456356.345 },
        {
            value: "1.036.435,45772",
            decimalDigits: 2,
            coerce: true,
            toNumber: false,
            roundingMethod: ERoundingMethod.UP,
            expected: "1036435.46",
        },
        { value: "۰.٩۰۹", decimalDigits: 1, expected: 0.9 },
        {
            value: "١٢٢,٣٩٤.۰٧۹٨",
            decimalDigits: 4,
            toNumber: false,
            roundingMethod: ERoundingMethod.TRUNCATE,
            expected: "122394.0798",
        },
    ];

    test.each(parseToNumberTestCases)(
        "parseFloatFromString('$value', $coerce, $decimalDigits, $toNumber, '$roundingMethod') should return $expected",
        ({ value, coerce, decimalDigits, toNumber, roundingMethod, expected }) => {
            expect.assertions(1);

            expect(Numeric.parseFloatFromString(value, coerce, decimalDigits, toNumber, roundingMethod)).toStrictEqual(
                expected,
            );
        },
    );

    const decimalDigitRangeTestCases: {
        value: string | number;
        minLength?: number;
        maxLength?: number;
        expected: boolean;
    }[] = [
        { value: "-2.1", minLength: 0, maxLength: 0, expected: false },
        { value: 12.3456, minLength: 0, maxLength: 5, expected: true },
        { value: "-785748.094521", minLength: 3, maxLength: 6, expected: false },
        { value: "-0.71", minLength: 2, maxLength: 2, expected: true },
        { value: "234,5632", minLength: 0, maxLength: 4, expected: true },
        { value: "-2.345.764,075", minLength: 0, maxLength: 5, expected: true },
        { value: "984", expected: true },
        { value: "-6.0", expected: true },
        { value: "-1", expected: true },
        { value: "", expected: true },
    ];

    test.each(decimalDigitRangeTestCases)(
        `checkLengthDecimalPart("$value", $minLength, $maxLength) should return $expected`,
        ({ value, minLength, maxLength, expected }) => {
            expect.assertions(1);

            expect(Numeric.checkLengthDecimalPart(value, minLength!, maxLength!)).toStrictEqual(expected);
        },
    );
});
