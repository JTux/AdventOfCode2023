import * as fs from "fs";
import { join } from "path";

export const getFile = (day: string) => fs.readFileSync(
  join(__dirname, "..", "src", day, "input.txt"),
  "utf8"
);