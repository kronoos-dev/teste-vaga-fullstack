import parsePhoneNumber, {
    PhoneNumber,
    CountryCode,
    NumberType,
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    validatePhoneNumberLength,
    getNumberType,
} from "libphonenumber-js";

type TPhoneValidator = {
    isPossible: (phoneNumber: string) => boolean;
    isNumberValid: (phoneNumber: string) => boolean;
    isLengthValid: (phoneNumber: string) => boolean;
    formatNational: (phoneNumber: string, humanReadable?: boolean) => string | undefined;
    getType: (phoneNumber: string) => NumberType;
    parse: (phoneNumber: string) => PhoneNumber | undefined;
};

const PhoneValidator = (countryCode: CountryCode = "BR"): TPhoneValidator => {
    const parse = (phoneNumber: string): PhoneNumber | undefined => {
        return parsePhoneNumber(phoneNumber, countryCode);
    };

    const formatNational = (phoneNumber: string, humanReadable = true): string | undefined => {
        const parsed = parse(phoneNumber);

        return parsed?.format("NATIONAL", {
            fromCountry: countryCode,
            humanReadable,
            nationalPrefix: true,
        });
    };

    const isPossible = (phoneNumber: string): boolean => {
        return isPossiblePhoneNumber(phoneNumber, countryCode);
    };

    const isNumberValid = (phoneNumber: string): boolean => {
        return isValidPhoneNumber(phoneNumber, countryCode);
    };

    const isLengthValid = (phoneNumber: string): boolean => {
        return validatePhoneNumberLength(phoneNumber, countryCode) === undefined;
    };

    const getType = (phoneNumber: string): NumberType => {
        return getNumberType(phoneNumber, countryCode);
    };

    return {
        isPossible,
        isNumberValid,
        isLengthValid,
        formatNational,
        getType,
        parse,
    };
};

export default PhoneValidator;
export { TPhoneValidator };
