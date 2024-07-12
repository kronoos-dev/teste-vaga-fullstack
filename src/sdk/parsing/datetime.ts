export type TDateFormat = "DDMMYYYY" | "DDMYYYY" | "DMMYYYY" | "DMYYYY" | "YYYYMMDD" | "YYYYMMD" | "YYYYMDD" | "YYYYMD";
export interface IExtractedDate {
    year?: number;
    month?: number;
    day?: number;
}

export function createDateAsUTC(date: Date): Date {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ),
    );
}

export function convertDateToUTC(date: Date): Date {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
    );
}

function extractComponents(
    ds: string,
    ix1: number,
    ix2: number,
    ix3: number,
    reverse: boolean = false,
): IExtractedDate {
    const stoi = (s: string): number => parseInt(s, 10);
    const cmps = [stoi(ds.substring(0, ix1)), stoi(ds.substring(ix1, ix2)), stoi(ds.substring(ix2, ix3))];

    return reverse
        ? {
              year: cmps[0],
              month: cmps[1],
              day: cmps[2],
          }
        : {
              day: cmps[0],
              month: cmps[1],
              year: cmps[2],
          };
}

export function parseDateString(dateString: string, format: TDateFormat = "YYYYMMDD"): Date {
    const sanitized = dateString.trim();

    const formatExtractionMap: Record<TDateFormat, (s: string) => IExtractedDate> = {
        ["DDMMYYYY"]: (s) => extractComponents(s, 2, 4, 8),
        ["DDMYYYY"]: (s) => extractComponents(s, 2, 3, 7),
        ["DMMYYYY"]: (s) => extractComponents(s, 1, 3, 6),
        ["DMYYYY"]: (s) => extractComponents(s, 1, 2, 6),
        ["YYYYMMDD"]: (s) => extractComponents(s, 4, 6, 8, true),
        ["YYYYMMD"]: (s) => extractComponents(s, 4, 6, 8, true),
        ["YYYYMDD"]: (s) => extractComponents(s, 4, 5, 7, true),
        ["YYYYMD"]: (s) => extractComponents(s, 4, 5, 6, true),
    };

    const { year, month, day } = formatExtractionMap[format](sanitized);

    const isInRange = (v: number, min?: number, max?: number): boolean => {
        if (min && max) return v >= min && v <= max;
        if (min && !max) return v >= min;
        if (!min && max) return v <= max;

        return false;
    };

    const cmpsAreValid = isInRange(year!, 1900) && isInRange(month!, 1, 12) && isInRange(day!, 1, 31);

    return cmpsAreValid ? new Date(year!, month! - 1, day) : new Date(NaN);
}
