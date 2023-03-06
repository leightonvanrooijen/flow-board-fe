import { capitaliseFirstLetter } from "./capitaliseFirstLetter";

describe("capitaliseFirstLetter", () => {
  it("capitalises the first letter in a string", () => {
    expect(capitaliseFirstLetter("hi james")).toEqual("Hi james");
  });
});
