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

    // VARIABLES (support var + let)
    .replace(/(var|let)\s+(\w+)\s*=\s*(.+)/g, 'let $2 = $3')

    // PRINT (English)
    .replace(/print\s+"([^"]*)"/g, 'console.log("$1")')

    // HELU (smart print)
    .replace(/helu\s+(.+)/g, (match, value) => {
      value = value.trim();

      // case: helu (a)
      if (value.startsWith("(") && value.endsWith(")")) {
        return `console.log${value}`;
      }

      // case: helu "text" or 'text'
      if (value.startsWith('"') || value.startsWith("'")) {
        return `console.log(${value})`;
      }

      // case: helu number
      if (!isNaN(value)) {
        return `console.log(${value})`;
      }

      // case: helu variable
      return `console.log(${value})`;
    });
}

// execute
const jsCode = KannadaScript(content);

// debug (optional)
// console.log(jsCode);

eval(jsCode);