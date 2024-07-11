export enum CNPJLength {
    // e.g. 59.541.264/0001-03
    MINOR_BLOCK = 2,
    LARGER_BLOCK = 3,
    INSCRIPTION = MINOR_BLOCK + 2 * LARGER_BLOCK, // 59.541.264
    BRANCH_OR_HQ = 4, // 0001
    RAW = INSCRIPTION + BRANCH_OR_HQ + 2, // 59541264000103
    WITH_MASK = RAW + 4, // Two points, a slash and a dash
}

// Verification digits indexes
export enum CNPJDigitIndex {
    FIRST = 12,
    SECOND = 13,
}

export const CNPJ_MASK = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

export const forbiddenCnpjs = (): Array<string> => {
    // Generates an array of strings, containing the known
    // forbidden CNPJs, i.e., ['00000000000000', ..., '99999999999999']
    return [...Array(CNPJLength.RAW - 4)].map((_, i) => [...Array(CNPJLength.RAW)].map(() => `${i}`).join(""));
};

// Generate them only once
export const FORBIDDEN_CNPJS: Array<string> = forbiddenCnpjs();
