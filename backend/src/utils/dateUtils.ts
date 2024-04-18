export function formatDate(dateString: string): Date {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4,6)) - 1; 
    const day = parseInt(dateString.substring(6, 8));
    return new Date(year, month, day);
}
