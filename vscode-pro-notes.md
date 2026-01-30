# Day 2 – VS Code Setup Like a Pro

A complete, practical guide to mastering VS Code for real-world development.

---

## 1️⃣ VS Code Navigation (Speed Matters)

### 🔹 Command Palette
- Shortcut: `Ctrl + Shift + P`
- Access **any VS Code feature** instantly
- Examples:
  - Reload Window
  - Change Theme
  - Install Extensions
  - Run Tasks

### 🔹 Quick File Navigation
- `Ctrl + P` → open files instantly
- `Ctrl + Tab` → switch recent files
- `Ctrl + G` → go to specific line

### 🔹 Symbols & Definitions
- `Ctrl + Shift + O` → file symbols
- `F12` → go to definition
- `Alt + F12` → peek definition

---

## 2️⃣ Editing Like a Power User

### 🔹 Multi-Cursor Editing
- `Alt + Click` → add multiple cursors
- `Ctrl + D` → select next matching word
- `Ctrl + Shift + L` → select all matches
- `Esc` → exit multi-cursor mode

### 🔹 Line Operations
- Move line: `Alt + ↑ / ↓`
- Duplicate line: `Shift + Alt + ↓`
- Delete line: `Ctrl + Shift + K`
- Comment line: `Ctrl + /`

---

## 3️⃣ Formatting & Code Quality

### 🔹 Formatting
- Format file: `Shift + Alt + F`
- Format selection: `Ctrl + K` then `Ctrl + F`

### 🔹 Quick Fixes
- `Ctrl + .` → auto-fix errors & suggestions
- Rename variable/function: `F2`

---

## 4️⃣ Debugger Basics (Very Important)

### 🔹 Breakpoints
- Toggle breakpoint: `F9`
- Conditional breakpoint: Right-click breakpoint → Add condition

### 🔹 Debug Controls
- Start / Continue: `F5`
- Step Over: `F10`
- Step Into: `F11`
- Stop Debugging: `Shift + F5`

### 🔹 Debug Panels
- **Variables** → current state
- **Watch** → track custom expressions
- **Call Stack** → execution flow

---

## 5️⃣ Node.js Debugging Workflow

### 🔹 Simple Node Debug
1. Open JS file
2. Add breakpoints
3. Click **Run and Debug**
4. Choose **Node.js**

### 🔹 Inspect
- Hover variables
- Use Debug Console
- Watch expressions live

---

## 6️⃣ TypeScript Debugging (Real-World Setup)

### 🔹 tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "sourceMap": true
  }
}
```
### Why Source Maps?

### Debug TypeScript directly

### Maps .js execution → .ts source

Essential for backend & full-stack apps

7️⃣ Must-Have Extensions (Professional Stack)
🔹 Formatting & Linting

Prettier – consistent formatting

ESLint – code standards

### Debug & Git

GitLens – commit history & blame

Error Lens – inline error messages

### Productivity

Path Intellisense

Code Spell Checker

IntelliCode

### Top 15 VS Code Shortcuts (Cheat Sheet)

Command Palette — Ctrl + Shift + P

Quick File Open — Ctrl + P

Toggle Terminal — `Ctrl + ``

Multi-Cursor — Alt + Click

Select Next Match — Ctrl + D

Select All Matches — Ctrl + Shift + L

Move Line — Alt + ↑ / ↓

Duplicate Line — Shift + Alt + ↓

Delete Line — Ctrl + Shift + K

Format Document — Shift + Alt + F

Quick Fix — Ctrl + .

Rename Symbol — F2

Toggle Breakpoint — F9

Start Debugging — F5

Step Over — F10

## Assignment – Hands-On Debugging
### Task

#### Debug a Node.js script using VS Code debugger.

📄 app.js
```bash
function multiply(a, b) {
  return a * b;
}

const result = multiply(4, 5);
console.log(result);
```
### Steps

- Add breakpoint inside multiply

- Start debugging

- Inspect a, b, result

- Observe call stack

### Outcome

- Understand execution flow

- Master debugging basics