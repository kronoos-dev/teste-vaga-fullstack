enum ERoundingMethod {
    UP = "up",
    DOWN = "down",
    TRUNCATE = "truncate",
    NEAREST = "nearest",
}

enum EOperator {
    ADDITION = "ADDITION",
    SUBTRACTION = "SUBTRACTION",
    DIVISION = "DIVISION",
    PRODUCT = "PRODUCT",
    LTE = "LTE",
    LT = "LT",
    GTE = "GTE",
    GT = "GT",
    RANGE = "RANGE",
    OPEN_RANGE = "OPEN_RANGE",
    CLOSED_RANGE = "CLOSED_RANGE",
    INCLUDE_LOWER_RANGE = "INCLUDE_LOWER_RANGE",
    INCLUDE_UPPER_RANGE = "INCLUDE_UPPER_RANGE",
}

type TNumericSeparator = "." | ",";
type TRoundingMethod = `${ERoundingMethod}`;
type TOperatorMap = Record<
    `${EOperator}`,
    (x: number, y: number, z: number, t?: boolean, p?: boolean) => number | boolean
>;

const isInRange = (
    value: number,
    lowerLimit: number,
    upperLimit: number,
    includeLower?: boolean,
    includeUpper?: boolean,
): boolean => {
    const lowerTest = includeLower ? lowerLimit <= value : lowerLimit < value;
    const upperTest = includeUpper ? upperLimit >= value : upperLimit > value;

    return lowerTest && upperTest;
};

const OPERATOR_MAP: TOperatorMap = {
    [EOperator.ADDITION]: (x: number, y: number): number => x + y,
    [EOperator.SUBTRACTION]: (x: number, y: number): number => x - y,
    [EOperator.DIVISION]: (x: number, y: number): number => x / y,
    [EOperator.PRODUCT]: (x: number, y: number): number => x * y,
    [EOperator.LTE]: (x: number, y: number): boolean => x <= y,
    [EOperator.LT]: (x: number, y: number): boolean => x < y,
    [EOperator.GTE]: (x: number, y: number): boolean => x >= y,
    [EOperator.GT]: (x: number, y: number): boolean => x > y,
    [EOperator.RANGE]: (
        value: number,
        lowerLimit: number,
        upperLimit: number,
        includeLower?: boolean,
        includeUpper?: boolean,
    ): boolean => isInRange(value, lowerLimit, upperLimit, includeLower, includeUpper),
    [EOperator.OPEN_RANGE]: (value: number, lowerLimit: number, upperLimit: number): boolean =>
        isInRange(value, lowerLimit, upperLimit),
    [EOperator.CLOSED_RANGE]: (value: number, lowerLimit: number, upperLimit: number): boolean =>
        isInRange(value, lowerLimit, upperLimit, true, true),
    [EOperator.INCLUDE_UPPER_RANGE]: (value: number, lowerLimit: number, upperLimit: number): boolean =>
        isInRange(value, lowerLimit, upperLimit, false, true),
    [EOperator.INCLUDE_LOWER_RANGE]: (value: number, lowerLimit: number, upperLimit: number): boolean =>
        isInRange(value, lowerLimit, upperLimit, true, false),
};

export { EOperator, ERoundingMethod, TNumericSeparator, TOperatorMap, TRoundingMethod, OPERATOR_MAP };
