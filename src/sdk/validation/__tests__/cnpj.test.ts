import { CNPJ, CNPJDigitIndex, forbiddenCnpjs } from "@sdk/validation/cnpj";

describe("CNPJ Validator Unit Tests", () => {
    let testCases = [];

    it("should generate the array of forbidden CNPJs correctly", () => {
        const expected = [
            "00000000000000",
            "11111111111111",
            "22222222222222",
            "33333333333333",
            "44444444444444",
            "55555555555555",
            "66666666666666",
            "77777777777777",
            "88888888888888",
            "99999999999999",
        ];
        expect(forbiddenCnpjs()).toEqual(expected);
    });

    it("should parse the CNPJ string into an array of integers", () => {
        const expected = [5, 9, 5, 4, 1, 2, 6, 4, 0, 0, 0, 1, 0, 3];

        expect(CNPJ.parseCnpjToArray("59.541.264/0001-03")).toEqual(expected);
        expect(CNPJ.parseCnpjToArray("59541264000103")).toEqual(expected);
    });

    it("should verify if CNPJ is forbidden or not", () => {
        expect(CNPJ.isForbidden("12.345.678/0000-21")).toBeFalsy();
        expect(CNPJ.isForbidden("12345678000021")).toBeFalsy();
        expect(CNPJ.isForbidden("00000000000000")).toBeTruthy();
        expect(CNPJ.isForbidden("33.333.333/3333-33")).toBeTruthy();
    });

    it("should validate the digits of a valid CNPJ", () => {
        const validCnpj = "11.444.777/0001-61";
        const cnpjArray = CNPJ.parseCnpjToArray(validCnpj);

        const isFirstDigitValid = CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.FIRST);
        const isSecondDigitValid = CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.SECOND);

        expect(isFirstDigitValid).toBeTruthy();
        expect(isSecondDigitValid).toBeTruthy();
    });

    it("should validate the digits of an invalid CNPJ", () => {
        const validCnpj = "28036312000121";
        const cnpjArray = CNPJ.parseCnpjToArray(validCnpj);

        const isFirstDigitValid = CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.FIRST);
        const isSecondDigitValid = CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.SECOND);

        expect(isFirstDigitValid).toBeFalsy();
        expect(isSecondDigitValid).toBeFalsy();
    });

    it("should validate a CNPJ via the isValid function", () => {
        expect(CNPJ.isValid("05337875000105")).toBeTruthy();
        expect(CNPJ.isValid("28.036.312/000121")).toBeFalsy();
    });

    testCases = [
        { input: "59.541.264/0001-03", isValid: true, expectedMaskedCnpj: "59.541.264/0001-03" }, // Valid masked
        { input: "59541264000103", isValid: true, expectedMaskedCnpj: "59.541.264/0001-03" }, // Valid numeric string
        { input: 59541264000103, isValid: true, expectedMaskedCnpj: "59.541.264/0001-03" }, // Valid numeric
        { input: 5919306920, isValid: false, expectedMaskedCnpj: "" }, // Short numeric string
        { input: 5919306920, isValid: false, expectedMaskedCnpj: "" }, // Short numeric
        { input: 22222222222222, isValid: false, expectedMaskedCnpj: "" }, // Forbidden numeric
        { input: "00.000.000/0000-00", isValid: false, expectedMaskedCnpj: "" }, // Forbidden string
        { input: "123.345.6728/00001-21", isValid: false, expectedMaskedCnpj: "" }, // Too big
    ];

    test.each(testCases)(
        'should validate "$input", applying the mask only if the CPF is valid',
        ({ input, isValid, expectedMaskedCnpj }) => {
            expect(CNPJ.isValid(input)).toBe(isValid);
            expect(CNPJ.applyMask(input)).toBe(expectedMaskedCnpj);
        },
    );

    testCases = [
        {
            input: '5 -9+ aloto5ftextbetw41enthesed2igits  6$#!)()(40001)//$@"dede"...___=====0 = =3  ',
            expected: "59541264000103",
        },
        {
            input: '00{^}__. 0 0 0``"di0ejaidj0eoijd0oejoéá0deihi0fe++==++dedede   0_ 0verflu0chte Ro0tzbande!',
            expected: "00000000000000",
        },
    ];

    test.each(testCases)(
        'should sanitize "$input", extracting only the potential CPF numeric string',
        ({ input, expected }) => {
            expect(CNPJ.extractNumericSequence(input)).toBe(expected);
        },
    );
});
