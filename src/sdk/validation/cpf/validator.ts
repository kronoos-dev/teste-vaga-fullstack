import { CPFDigitIndex, CPFLength, CPF_REGEX, FORBIDDEN_CPFS } from "./definitions";

export default class CPF {
    static extractNumericSequence(cpfWithMask: string): string {
        const numberPattern = /[0-9]+/g;
        const rawCpf = cpfWithMask.match(numberPattern)?.join("");

        // If the resulting numeric string does not have
        // the same length as a raw CPF (without mask),
        // it's of no use to us
        return rawCpf?.length === CPFLength.RAW ? rawCpf : "";
    }

    static applyMask(unformattedCpf: string | number): string {
        const cpf: string = typeof unformattedCpf === "number" ? unformattedCpf.toString() : unformattedCpf;

        if (CPF_REGEX.test(cpf) && CPF.isValid(cpf)) return cpf;

        // e.g. 145.382.206-20
        return CPF.isValid(cpf)
            ? cpf.slice(0, CPFLength.BLOCK) +
                  "." +
                  cpf.slice(CPFLength.BLOCK, CPFLength.BLOCK + 3) +
                  "." +
                  cpf.slice(CPFLength.BLOCK + 3, CPFDigitIndex.FIRST) +
                  "-" +
                  cpf.slice(CPFDigitIndex.FIRST, CPFDigitIndex.SECOND + 1)
            : "";
    }

    static parseCpfToIntArray(cpf: string): Array<number> {
        const cpfWithoutMask = CPF.extractNumericSequence(cpf);
        const cpfArray = [...cpfWithoutMask].map((digit: string): number => parseInt(digit.trim(), 10));
        return cpfArray;
    }

    static isForbidden(cpf: string): boolean {
        return FORBIDDEN_CPFS.some((i) => i === CPF.extractNumericSequence(cpf));
    }

    static hasRightSize(cpf: string): boolean {
        return cpf.length === CPFLength.RAW || cpf.length === CPFLength.WITH_MASK;
    }

    static isDigitValid(cpfArray: Array<number>, digitIndex: CPFDigitIndex): boolean {
        // Algorithm adapted to TypeScript
        // Documentation and examples: https://www.geradorcpf.com/algoritmo_do_cpf.htm

        const verificationDigit: number = cpfArray[digitIndex];
        const verificationArray: Array<number> = cpfArray.slice(0, digitIndex);

        const weightedSum: number = verificationArray.reduce((acc, current, index) => {
            return acc + current * (digitIndex + 1 - index);
        }, 0);

        const remainder: number = weightedSum % CPFLength.RAW;
        const difference: number = CPFLength.RAW - remainder < 10 ? CPFLength.RAW - remainder : 0;

        return difference === verificationDigit;
    }

    static isValid(target: string | number): boolean {
        const cpf = typeof target === "number" ? target.toString() : target;

        if (CPF.hasRightSize(cpf)) {
            const cpfArray: Array<number> = CPF.parseCpfToIntArray(cpf);
            return (
                !CPF.isForbidden(cpf) &&
                CPF.isDigitValid(cpfArray, CPFDigitIndex.FIRST) &&
                CPF.isDigitValid(cpfArray, CPFDigitIndex.SECOND)
            );
        }
        return false;
    }
}
