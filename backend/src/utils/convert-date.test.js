import { convertDate } from "./convert-date";

describe("convertDate", () => {
  it("should return a valid Date object for a valid date string", () => {
    const dateString = "20220101";
    const expectedDate = new Date(Date.UTC(2022, 0, 1));
    expect(convertDate(dateString)).toEqual(expectedDate);
  });

  it("should throw an error for an invalid date string", () => {
    const invalidDateString = "202201";
    expect(() => convertDate(invalidDateString)).toThrow("Invalid date string");
  });
});
