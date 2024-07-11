export function isValidURL(input: string): boolean {
    const pattern =
        "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+" + // sub-domain + domain name
        "[a-zA-Z]{2,13})" + // extension
        "|((\\d{1,3}\\.){3}\\d{1,3})" + // OR ip (v4) address
        "|localhost)" + // OR localhost
        "(\\:\\d{1,5})?" + // port
        "(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*" + // path
        "(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?" + // query string
        "(\\#[-a-zA-Z&\\d_]*)?$"; // fragment locator

    const regex = new RegExp(pattern);

    return regex.test(input);
}
