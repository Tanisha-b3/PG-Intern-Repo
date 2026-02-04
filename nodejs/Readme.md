# Node.js + TypeScript Starter — What Everything Does

This project is a **basic but production-ready Node.js + TypeScript setup**.  
It includes environment validation, logging, linting, formatting, and proper project structure.

The goal is to **understand not just *what* exists, but *why* it exists**.

---

## 📁 Project Overview

This setup follows real-world backend practices used in professional teams.

Key features:
- TypeScript support
- Environment variable validation
- Centralized logging
- ESLint + Prettier
- Clean entry point
- Developer-friendly scripts

---

## 1️⃣ `src/index.ts`

### What it does
- Entry point of the application
- First file executed when the app starts

### Why it exists
- Node.js needs a single starting file
- Keeps startup logic in one predictable place
- Makes debugging and bootstrapping easier

---

## 2️⃣ `src/configs/env.ts`

### What it does
- Reads environment variables from `process.env`
- Validates them using **Zod**
- Exports a safe, typed `env` object

### Why it exists
- Environment variables can be missing or incorrect
- Prevents the app from running with invalid configuration
- Fails fast instead of crashing later

### Example
```ts
env.NODE_ENV   // always valid
env.PORT       // always a number
```

## 3️⃣ .env
### What it does

- Stores environment variables for local development

- Why it exists

- Keeps secrets and configuration out of source code

- Allows different values on different machines

- Used by

- dotenv (loaded before the app starts)

## 4️⃣ .env.example
### What it does

- Documents required environment variables

### Why it exists

- Helps other developers set up the project

- CI/CD pipelines know which variables to provide

- .env is never committed, .env.example is

## 5️⃣ dotenv
### What it does

- Loads variables from .env into process.env

### Why it exists

- Node.js does not read .env files by default

- Required for local configuration support

## 6️⃣ zod
### What it does

- Validates runtime data (here: environment variables)

### Why it exists

- TypeScript checks types only at compile time

- Zod validates actual values at runtime

- Prevents invalid configs in production

## 7️⃣ src/utils/logger.ts
### What it does

- Central place for logging

- Wraps console.log, console.error, etc.

- Why it exists

- Avoids scattered console.log calls

- Makes logging easy to upgrade later (Pino, Winston, etc.)

- Keeps logs consistent

## 8️⃣ tsx
### What it does

- Runs TypeScript files directly

- Watches files and restarts on change

### Why it exists

- Faster and simpler than ts-node

- No build step required during development

- Better DX (developer experience)

## 9️⃣ tsconfig.json
### What it does

- Tells TypeScript how to compile the project

- Controls

- Module system

- Strictness rules

- Output directory (dist/)

- Target JavaScript version

## 🔟 package.json
### What it does

- Lists project dependencies

- Defines scripts

- Describes project metadata

### Scripts Explained
### Script	What it does

```bash
dev	Runs app in watch mode
build	Compiles TypeScript → JavaScript
start	Runs compiled JavaScript
lint	Checks code quality
format	Formats code using Prettier

```
## 1️⃣1️⃣ ESLint
### What it does

- Finds bugs and unsafe patterns

- Enforces coding rules

- Why it exists

- Prevents common mistakes

- Keeps code quality high

- Makes large teams consistent

## 1️⃣2️⃣ Prettier
### What it does

- Formats code automatically

### Why it exists

- No debates about spacing or formatting

- Same style across the entire project

- Cleaner code reviews

## 1️⃣3️⃣ NODE_ENV
### What it does

- Tells the app which environment it’s running in

- Common values

- development

- test

- production

### Why it exists

- Enable/disable logs

- Change behavior per environment

- Optimize production performance

## 1️⃣4️⃣ Zod Error You Saw
- NODE_ENV: Required

### What it means

- NODE_ENV was not set

- Zod blocked app startup

- Why this is good

- App never runs in a broken state

- Errors appear early and clearly

## 1️⃣5️⃣ Why the App Updated Only After Refresh
Reason

- Backend saved data correctly

- Frontend state was not fully updated

- What refresh does

- Fetches fresh data from backend

### Meaning

- Backend logic ✅ correct

- State update logic ❌ incomplete

## 1️⃣6️⃣ Redux updateOrder Issue
updateOrder(state, action) {
  state.orders = state.orders.map(...)
}

Problem

If _id is missing → nothing updates

If partial object is passed → old fields remain

Why refresh works

Backend sends the full updated order

Redux state gets replaced correctly

## 1️⃣7️⃣ NestJS Swagger Error (Summary)
What happened

Swagger v11 requires NestJS v11

Project was using NestJS v10

Rule

All NestJS packages must share the same major version

Mixing versions causes runtime and build errors.