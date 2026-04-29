# KannadaScript 🚀

**ಕನ್ನಡದಿಂದ ಕೋಡ್‌ವರೆಗೆ**

KannadaScript is a simple programming language that lets you write code using a mix of **Kannada + English syntax**.

---

## 📦 Installation

Make sure you have Node.js installed.

Install globally from npm:

```bash
npm install -g kannadascriptjs
```

---

## ▶️ Usage

Create a file with `.ks` extension.

Example:

```ks
start
print "Hello World"
helu "ನಮಸ್ಕಾರ"

var a = 10
helu a

helu 42
end
```

Run the file:

```bash
kannadascript example.ks
```

---

## 🖨️ Printing Statements

### English Print

```ks
print "Hello World"
```

### Kannada Print

```ks
helu "ನಮಸ್ಕಾರ"
```

---

## 📊 Variables

You can declare variables using `var` or `let`.

```ks
var a = 10
let b = 20

helu a
helu b
```

---

## 🔢 Supported Outputs

```ks
helu "text"   // string
helu a        // variable
helu (a)      // variable with brackets
helu 100      // number
```

---

## ✅ Example Output

```text
Hello World
ನಮಸ್ಕಾರ
10
42
```

---

## ⚠️ Rules

* Use `start` and `end` to wrap code
* Strings must be inside quotes `" "`
* Commands are case-sensitive

---

## 🚀 Features

* ✅ Print in English (`print`)
* ✅ Print in Kannada (`helu`)
* ✅ Variables (`var`, `let`)
* ✅ Supports numbers and expressions

---

## 🔜 Upcoming Features

* If / Else conditions
* Loops
* Input support (`kelu`)
* Functions

---

## 🛠️ Tech Stack

* Node.js
* JavaScript (Transpiler-based)

---

## 👨‍💻 Author

Rajesh N

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
