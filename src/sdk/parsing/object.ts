type O = Record<string | symbol | number, unknown>;

type TFlattenObjectKeys<T extends O, Key = keyof T> = Key extends string
    ? T[Key] extends O
        ? `${Key}.${TFlattenObjectKeys<T[Key]>}`
        : `${Key}`
    : never;

type TFlatKeys = TFlattenObjectKeys<O>;

const flattenObject = (oldObject: O): Record<TFlatKeys, unknown> => {
    const newObject: O = {};

    flattenHelper(oldObject, "");

    return newObject;

    function flattenHelper(currentObject: O, previousKeyName: string) {
        const setValue = (k: string, v: unknown) => {
            if (previousKeyName == null || previousKeyName == "") {
                newObject[k as string] = v;
            } else {
                if (k == null || k == "") {
                    newObject[previousKeyName] = v;
                } else {
                    newObject[previousKeyName + "." + k] = v;
                }
            }
        };

        for (const key in currentObject) {
            const value = currentObject[key];

            if (value === undefined || (value as O).constructor !== Object) {
                setValue(key, value);
            } else {
                if (previousKeyName == null || previousKeyName == "") {
                    flattenHelper(value as O, key);
                } else {
                    flattenHelper(value as O, previousKeyName + "." + key);
                }
            }
        }
    }
};

export { flattenObject, TFlattenObjectKeys };
