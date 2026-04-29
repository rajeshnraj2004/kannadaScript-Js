#!/usr/bin/env node

const fs = require("fs");

// get file
const file = process.argv[2];

if (!file) {
  console.error("Please provide a file path as an argument.");
  process.exit(1);
}

// read file
let content;
try {
  content = fs.readFileSync(file, "utf8");
} catch (error) {
  console.error(`Error reading file '${file}': ${error.message}`);
  process.exit(1);
}

// transpiler
function KannadaScript(content) {
  return content

    // remove start/end
    .replace(/\bstart\b/g, "")
    .replace(/\bend\b/g, "")

    // print with quotes
    .replace(/print\s+"([^"]*)"/g, 'console.log("$1")')

    // HELU (smart handling)
    .replace(/helu\s+(.+)/g, (match, value) => {
      value = value.trim();

      // if already string (" or ')
      if (
        value.startsWith('"') ||
        value.startsWith("'")
      ) {
        return `console.log(${value})`;
      }

      // if number
      if (!isNaN(value)) {
        return `console.log(${value})`;
      }

      // otherwise treat as string
      return `console.log("${value}")`;
    });
}

// execute
const jsCode = KannadaScript(content);
eval(jsCode);