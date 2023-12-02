import * as fs from "fs";
import { join } from "path";

export const getInput = (day: string) => getFile(day, "input.txt");
export const getExample = (day: string) => getFile(day, "example.txt");

export const getFile = (day: string, file: string) => fs.readFileSync(
  join(__dirname, "..", "src", day, file), "utf8"
)