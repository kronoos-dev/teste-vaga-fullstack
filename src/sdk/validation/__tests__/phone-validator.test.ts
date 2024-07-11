import { CountryCode } from "libphonenumber-js";
import PhoneValidator from "../phone-number";

type TTestCase = {
    phoneNumber: string;
    countryCode: CountryCode;
    expected: {
        nationalFormattedNumber: string;
        nationalNumber: string;
        callingCode: string;
        number: string;
    };
};

describe("Phone validation unit testing", () => {
    const testCases: TTestCase[] = [
        {
            phoneNumber: "32452834",
            countryCode: "BR",
            expected: {
                nationalFormattedNumber: "32452834",
                nationalNumber: "32452834",
                number: "+5532452834",
                callingCode: "55",
            },
        },
        {
            phoneNumber: "11 9873 2932",
            countryCode: "BR",
            expected: {
                nationalFormattedNumber: "1198732932",
                nationalNumber: "1198732932",
                number: "+551198732932",
                callingCode: "55",
            },
        },
        {
            phoneNumber: "+55 (48) 99626-2850",
            countryCode: "BR",
            expected: {
                nationalFormattedNumber: "(48) 99626-2850",
                nationalNumber: "48996262850",
                number: "+5548996262850",
                callingCode: "55",
            },
        },
        {
            phoneNumber: "+12133734253",
            countryCode: "US",
            expected: {
                nationalFormattedNumber: "(213) 373-4253",
                nationalNumber: "2133734253",
                number: "+12133734253",
                callingCode: "1",
            },
        },
        {
            phoneNumber: "51234567",
            countryCode: "EE",
            expected: {
                nationalFormattedNumber: "5123 4567",
                nationalNumber: "51234567",
                number: "+37251234567",
                callingCode: "372",
            },
        },
        {
            phoneNumber: "9150000000",
            countryCode: "RU",
            expected: {
                nationalFormattedNumber: "8 (915) 000-00-00",
                nationalNumber: "9150000000",
                number: "+79150000000",
                callingCode: "7",
            },
        },
    ];

    test.each(testCases)(
        'should parse "$phoneNumber", for the given country code "$countryCode"',
        ({ phoneNumber, countryCode, expected: { nationalNumber, number, callingCode } }) => {
            const validator = PhoneValidator(countryCode);
            const parsed = validator.parse(phoneNumber);

            expect(parsed).toBeDefined();
            expect(parsed?.nationalNumber).toStrictEqual(nationalNumber);
            expect(parsed?.number).toStrictEqual(number);
            expect(parsed?.countryCallingCode).toStrictEqual(callingCode);
        },
    );

    test.each(testCases)(
        'should validate length of "$phoneNumber", for the given country code "$countryCode"',
        ({ phoneNumber, countryCode }) => {
            const validator = PhoneValidator(countryCode);
            const isLengthValid = validator.isLengthValid(phoneNumber);

            expect(isLengthValid).toStrictEqual(true);
        },
    );

    test.each(testCases)(
        'should validate "$phoneNumber", for the given country code "$countryCode"',
        ({ phoneNumber, countryCode }) => {
            const validator = PhoneValidator(countryCode);
            const isValid = validator.isNumberValid(phoneNumber);

            expect(isValid).toStrictEqual(true);
        },
    );

    test.each(testCases)(
        'should parse "$phoneNumber" into the national format for the given country code "$countryCode"',
        ({ phoneNumber, countryCode, expected: { nationalFormattedNumber } }) => {
            const validator = PhoneValidator(countryCode);
            const formatted = validator.formatNational(phoneNumber);

            expect(formatted).toStrictEqual(nationalFormattedNumber);
        },
    );
});
