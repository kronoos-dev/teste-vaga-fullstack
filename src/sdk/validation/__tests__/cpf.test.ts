import { CPF, CPFDigitIndex, forbiddenCpfs } from "@sdk/validation/cpf";

describe("CPF Validator Unit Test", () => {
    let testCases = [];

    it("should generate the array of forbidden CPFs correctly", () => {
        const expected = [
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999",
        ];
        expect(forbiddenCpfs()).toEqual(expected);
    });

    it("should parse the CPF string into an array of integers", () => {
        const expected = [1, 4, 5, 3, 8, 2, 2, 0, 6, 2, 0];

        expect(CPF.parseCpfToIntArray("145.382.206-20")).toEqual(expected);
        expect(CPF.parseCpfToIntArray("14538220620")).toEqual(expected);
    });

    it("should verify if CPF is forbidden or not", () => {
        expect(CPF.isForbidden("123.456.789-20")).toBeFalsy();
        expect(CPF.isForbidden("12345678920")).toBeFalsy();
        expect(CPF.isForbidden("00000000000")).toBeTruthy();
        expect(CPF.isForbidden("333.333.333-33")).toBeTruthy();
    });

    it("should validate the digits of a valid CPF", () => {
        const validCpf = "145.382.206-20";
        const cpfArray = CPF.parseCpfToIntArray(validCpf);

        const isFirstDigitValid = CPF.isDigitValid(cpfArray, CPFDigitIndex.FIRST);
        const isSecondDigitValid = CPF.isDigitValid(cpfArray, CPFDigitIndex.SECOND);

        expect(isFirstDigitValid === isSecondDigitValid).toBeTruthy();
    });

    it("should validate the digits of an invalid CPF", () => {
        const validCpf = "234.456.332-23";
        const cpfArray = CPF.parseCpfToIntArray(validCpf);

        const isFirstDigitValid = CPF.isDigitValid(cpfArray, CPFDigitIndex.FIRST);
        const isSecondDigitValid = CPF.isDigitValid(cpfArray, CPFDigitIndex.SECOND);

        expect(isFirstDigitValid).toBeFalsy();
        expect(isSecondDigitValid).toBeTruthy();
    });

    testCases = [
        { input: "145.382.206-20", isValid: true, expectedMaskedCpf: "145.382.206-20" }, // Valid masked
        { input: "05919306920", isValid: true, expectedMaskedCpf: "059.193.069-20" }, // Valid numeric string
        { input: 14538220620, isValid: true, expectedMaskedCpf: "145.382.206-20" }, // Valid numeric
        { input: 5919306920, isValid: false, expectedMaskedCpf: "" }, // Short numeric string
        { input: 5919306920, isValid: false, expectedMaskedCpf: "" }, // Short numeric
        { input: 99999999999, isValid: false, expectedMaskedCpf: "" }, // Forbidden numeric
        { input: "99999999999", isValid: false, expectedMaskedCpf: "" }, // Forbidden string
        { input: "234.456.332-23", isValid: false, expectedMaskedCpf: "" }, // Only second digit is valid
        { input: "0980.476.584-596", isValid: false, expectedMaskedCpf: "" }, // Wrong size
    ];

    test.each(testCases)(
        'should validate "$input", applying the mask only if the CPF is valid',
        ({ input, isValid, expectedMaskedCpf }) => {
            expect(CPF.isValid(input)).toBe(isValid);
            expect(CPF.applyMask(input)).toBe(expectedMaskedCpf);
        },
    );

    testCases = [
        {
            input: 'alotoftex14tbetweenthesedigits5   3$#!8)()()2//$@206"dede"2...___===0== = =',
            expected: "14538220620",
        },
        {
            input: '09{^}__80.   ``"4diejaidjeoijdoejoéá76deihife++==++584dedede596   _ verfluchte Scheisse!',
            expected: "",
        },
    ];

    test.each(testCases)(
        'should sanitize "$input", extracting only the potential CPF numeric string',
        ({ input, expected }) => {
            expect(CPF.extractNumericSequence(input)).toBe(expected);
        },
    );
});
