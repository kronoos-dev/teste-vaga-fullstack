import { validateYear, TYearValidatorInput } from "../datetime";

type TTestCase = {
    input: TYearValidatorInput;
    expected: boolean;
};

describe("Datetime validation unit tests", () => {
    const testCases: TTestCase[] = [
        {
            input: { year: 1935 },
            expected: true,
        },
        {
            input: { year: "  1 94  4   " },
            expected: true,
        },
        {
            input: { year: "2012", lowerLimit: 2011 },
            expected: true,
        },
        {
            input: { year: 1984, lowerLimit: 1985, upperLimit: 1986 },
            expected: false,
        },
        {
            input: { year: "" },
            expected: false,
        },
    ];

    test.each(testCases)('should validate "$input", returning $expected', ({ input, expected }) => {
        expect(validateYear(input)).toStrictEqual(expected);
    });
});
