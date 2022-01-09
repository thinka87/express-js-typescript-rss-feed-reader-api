import "reflect-metadata";
import { makeFileName } from "./FileHelper";

describe("FileHelper", () => {
  it("makeFileName should be a function", async () => {
    expect(typeof makeFileName).toBe("function");
  });
  it("File name length should be 10", async () => {
    const fileName = makeFileName(10);
    expect(fileName.length).toBe(10);
  });
});
