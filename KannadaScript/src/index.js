#!/usr/bin/env node

const fs = require("fs");

// get file
const file = process.argv[2];

if (!file) {
  console.error("Usage: kannadascript <file.ks>");
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

    // VARIABLES (var + let)
    .replace(/(var|let)\s+(\w+)\s*=\s*(.+)/g, 'let $2 = $3')

    // PRINT
    .replace(/print\s+"([^"]*)"/g, 'console.log("$1")')

    // 🔥 HELU FIXED (order matters)

    // 1. helu(a)
    .replace(/helu\s*\(\s*(\w+)\s*\)/g, 'console.log($1)')

    // 2. helu "text"
    .replace(/helu\s+"([^"]*)"/g, 'console.log("$1")')

    // 3. helu number
    .replace(/helu\s+(\d+)/g, 'console.log($1)')

    // 4. helu variable
    .replace(/helu\s+(\w+)/g, 'console.log($1)')

    // IF / ELSE
    .replace(/if\s+(.+)$/gm, 'if ($1) {')
    .replace(/else$/gm, '} else {')
    .replace(/endif$/gm, '}');
}

// execute
const jsCode = KannadaScript(content);

// debug (optional)
// console.log(jsCode);

eval(jsCode);