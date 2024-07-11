export enum CPFLength {
    BLOCK = 3,
    VERIFICATION_DIGITS = 2,
    RAW = 3 * BLOCK + VERIFICATION_DIGITS,
    WITH_MASK = RAW + 3, // Two points and a dash
}

export enum CPFDigitIndex {
    FIRST = 9,
    SECOND = 10,
}

export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

export const forbiddenCpfs = (): Array<string> => {
    // Generates an array of strings, containing the known
    // forbidden CPFs, i.e., ['00000000000', ..., '99999999999']
    return [...Array(CPFLength.RAW - 1)].map((_, i) => [...Array(CPFLength.RAW)].map(() => `${i}`).join(""));
};

// Generate them only once
export const FORBIDDEN_CPFS: Array<string> = forbiddenCpfs();
