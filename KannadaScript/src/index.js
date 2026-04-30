#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// get file path
const input = process.argv[2];

if (!input) {
  console.error("Usage: kannadascript <file.ks>");
  process.exit(1);
}

const file = path.resolve(input);

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
  const lines = content.split("\n");
  let output = [];

  for (let line of lines) {
    let code = line.trim();

    // skip empty lines
    if (!code) continue;

    // remove start/end
    if (code === "start" || code === "end") continue;

    // VARIABLES
    if (/^(var|let)\s+/.test(code)) {
      code = code.replace(
        /^(var|let)\s+(\w+)\s*=\s*(.+)/,
        "let $2 = $3"
      );
      output.push(code);
      continue;
    }

    // HELU (print anything safely)
    if (/^helu\s+/.test(code)) {
      const expr = code.replace(/^helu\s+/, "");
      output.push(`console.log(${expr})`);
      continue;
    }

    // PRINT (string only)
    if (/^print\s+/.test(code)) {
      code = code.replace(
        /^print\s+"([^"]*)"/,
        'console.log("$1")'
      );
      output.push(code);
      continue;
    }

    // IF
    if (/^if\s+/.test(code)) {
      const condition = code.replace(/^if\s+/, "");
      output.push(`if (${condition}) {`);
      continue;
    }

    // ELSE
    if (code === "else") {
      output.push("} else {");
      continue;
    }

    // ENDIF
    if (code === "endif") {
      output.push("}");
      continue;
    }

    // fallback (raw JS line)
    output.push(code);
  }

  return output.join("\n");
}

// transpile
const jsCode = KannadaScript(content);

// debug (optional)
// console.log(jsCode);

try {
  eval(jsCode);
} catch (err) {
  console.error("Execution Error:", err.message);
}