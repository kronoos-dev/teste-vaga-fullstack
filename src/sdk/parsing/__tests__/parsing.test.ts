import { flattenObject } from "../object";
import { toBoolean, ALLOWED_FALSE_SYMBOLS, ALLOWED_TRUE_SYMBOLS } from "../type";
import { isValidURL } from "../web";

describe("Parsing module unit testing", () => {
    test.each(ALLOWED_TRUE_SYMBOLS)('Test the boolean parsing fot the default true symbol "$input"', (input) => {
        expect(toBoolean(input)).toBe(true);
    });

    test.each(ALLOWED_FALSE_SYMBOLS)('Test the boolean parsing for the default false symbol "$input"', (input) => {
        expect(toBoolean(input)).toBe(false);
    });

    const testCases = [
        { input: class Foo {}, expected: undefined },
        { input: { what: "ever" }, expected: undefined },
        { input: /.{1,2}/g, expected: undefined },
        { input: [], expected: undefined },
        { input: {}, expected: undefined },
        { input: null, expected: undefined },
        { input: undefined, expected: undefined },
    ];

    test.each(testCases)('Test the boolean parsing for the non-parsable symbol "$input"', ({ input, expected }) => {
        expect(toBoolean(input)).toBe(expected);
    });

    it("Should flatten a deeply nested and fully defined object", () => {
        const testCase = {
            a: {
                b: "red",
                c: "green",
            },
            d: {
                e: "blue",
                f: "yellow",
            },
            g: "pink",
            h: {
                i: {
                    j: {
                        k: "gray",
                        l: "grey",
                    },
                },
            },
        };

        const expected = {
            "a.b": "red",
            "a.c": "green",
            "d.e": "blue",
            "d.f": "yellow",
            g: "pink",
            "h.i.j.k": "gray",
            "h.i.j.l": "grey",
        };

        expect(flattenObject(testCase)).toStrictEqual(expected);
    });

    it("Should flatten a partially defined nested object", () => {
        const testCase = {
            server: { environment: "production", port: undefined },
            foo: undefined,
            bar: {
                keycloak: {
                    clientId: undefined,
                    realmName: undefined,
                    service: { port: 8080 },
                    jwt: { algorithm: "RS256" },
                },
            },
        };

        const expected = {
            "server.environment": "production",
            "server.port": undefined,
            foo: undefined,
            "bar.keycloak.clientId": undefined,
            "bar.keycloak.realmName": undefined,
            "bar.keycloak.service.port": 8080,
            "bar.keycloak.jwt.algorithm": "RS256",
        };

        expect(flattenObject(testCase)).toStrictEqual(expected);
    });

    const urlTestCases = [
        { input: "", expected: false },
        { input: "http://en.wikipedia.org/wiki/Procter_&_Gamble", expected: true },
        { input: "https://sdfasd", expected: false },
        {
            input: "http://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&docid=nIv5rk2GyP3hXM&tbnid=isiOkMe3nCtexM:&ved=0CAUQjRw&url=http%3A%2F%2Fanimalcrossing.wikia.com%2Fwiki%2FLion&ei=ygZXU_2fGKbMsQTf4YLgAQ&bvm=bv.65177938,d.aWc&psig=AFQjCNEpBfKnal9kU7Zu4n7RnEt2nerN4g&ust=1398298682009707",
            expected: true,
        },
        { input: "https://stackoverflow.com/", expected: true },
        { input: "https://w", expected: false },
        { input: "aaa", expected: false },
        { input: "aaaa", expected: false },
        { input: "oh.my", expected: true },
        { input: "dfdsfdsfdfdsfsdfs", expected: false },
        { input: "google.co.uk", expected: true },
        { input: "test-domain.MUSEUM", expected: true },
        { input: "-hyphen-start.gov.tr", expected: false },
        { input: "hyphen-end-.com", expected: false },
        { input: "https://sdfasdp.international", expected: true },
        { input: "https://sdfasdp.pppppppp", expected: true },
        { input: "https://sdfasdp.ppppppppppppppppppp", expected: false },
        { input: "https://sdfasd", expected: false },
        { input: "https://sub1.1234.sub3.sub4.sub5.co.uk/?", expected: true },
        { input: "http://www.google-com.123", expected: false },
        { input: "http://my--testdomain.com", expected: true },
        { input: "http://my2nd--testdomain.com", expected: true },
        { input: "http://thingiverse.com/download:1894343", expected: true },
        { input: "https://medium.com/@techytimo", expected: true },
        { input: "http://localhost", expected: true },
        { input: "localhost", expected: true },
        { input: "localhost:8080", expected: true },
        { input: "localhost:65536", expected: true },
        { input: "localhost:80000", expected: true },
        { input: "magnet:?xt=urn:btih:123", expected: false },
    ];

    test.each(urlTestCases)('Test the URL validation for "$input"', ({ input, expected }) => {
        expect(isValidURL(input)).toStrictEqual(expected);
    });
});
