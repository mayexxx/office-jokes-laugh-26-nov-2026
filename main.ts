import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const text = "My keyboard's hardest-working keys are Ctrl, C, V, and the Escape key I press every time my manager walks past.";
const outputDirectoryUrl = new URL("/output/", import.meta.url);
const outputDirectory = fileURLToPath(outputDirectoryUrl);
const outputFile = fileURLToPath(new URL("entry.txt", outputDirectoryUrl));

if (text.length < 1 || text.length > 200 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

const expected = Buffer.from(text + "\n", "utf8");
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, expected);
if (!readFileSync(outputFile).equals(expected)) {
  throw new Error("Written entry does not match expected text");
}
