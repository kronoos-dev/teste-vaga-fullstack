export type TDateSeparator = "/" | "-";

export interface ITimeDifference {
    daysDifference: number;
    hoursDifference: number;
    minutesDifference: number;
    secondsDifference: number;
}

export function getFormatteDateTime(currentDateTime: Date, dateSeparator: TDateSeparator = "/"): string {
    const _format = (value: number): string => (value < 10 ? `0${value}` : String(value));

    return (
        _format(currentDateTime.getDate()) +
        dateSeparator +
        _format(currentDateTime.getMonth() + 1) +
        dateSeparator +
        currentDateTime.getFullYear() +
        " " +
        _format(currentDateTime.getHours()) +
        ":" +
        _format(currentDateTime.getMinutes()) +
        ":" +
        _format(currentDateTime.getSeconds())
    );
}

export function getTimeDifference(initialDate: Date, finalDate: Date): ITimeDifference {
    let difference = finalDate.getTime() - initialDate.getTime();

    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    const secondsDifference = Math.floor(difference / 1000);

    return {
        daysDifference,
        hoursDifference,
        minutesDifference,
        secondsDifference,
    };
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
