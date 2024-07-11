type StardardEnum<T> = {
    [id: string]: T | string;
    [nu: number]: string;
};

type EnumAttributes = "keys" | "values";

function extractEnumAttributes<T>(enumDef: StardardEnum<T>, attribsToExtract: EnumAttributes = "values"): string[] {
    const attributeSwitcher = {
        ["keys"]: Object.keys,
        ["values"]: Object.values,
    };

    const objCallable = attributeSwitcher[attribsToExtract];

    if (!objCallable) {
        throw new Error(`It is not possible to extract ${attribsToExtract} from an enum object`);
    }

    return objCallable(enumDef).filter((v) => isNaN(Number(v)));
}

export { extractEnumAttributes };
