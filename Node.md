# Node.js Runtime, Package Managers & Project Structure

## Goal
Understand the Node.js runtime and dependency management as used in real-world production projects, and build a clean Node.js + TypeScript starter repository.

---

## 1. Node.js Runtime Fundamentals

### 1.1 What is Node.js?
Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows JavaScript to run outside the browser and is widely used for backend services, APIs, CLIs, and tooling.

Key characteristics:
- Event-driven, non-blocking I/O
- Single-threaded with async concurrency
- Fast execution via V8

---

### 1.2 Module System in Node.js

#### CommonJS (CJS)
Traditional Node.js module system.

```js
const express = require("express");
module.exports = app;
Synchronous loading

Used in older projects

Default before Node v12

ES Modules (ESM)
Modern JavaScript module system.
import express from "express";
export default app;
Asynchronous loading

Tree-shaking support

Enabled using "type": "module" in package.json

✅ Recommendation: Use ESM for all new projects.

```
### 1.3 Environment Variables & Configuration
Environment variables separate code from configuration.

Common practices:

.env file for local development

Never commit secrets

Validate env variables at startup

Example:
```bash
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://...
```
## 2. Package Management in Node.js
### 2.1 package.json Structure
```bash
{
  "name": "node-ts-starter",
  "version": "1.0.0",
  "type": "module",
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}
```
Important fields:

name – project identifier

version – follows semantic versioning

type – module system (module/commonjs)

scripts – automation commands

dependencies – runtime dependencies

devDependencies – build & tooling dependencies

### 2.2 npm Scripts
Scripts automate common tasks.

```bash
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "format": "prettier --write .",
  "test": "vitest"
}
```
Benefits:

Standardized commands

Easier onboarding

CI/CD friendly

### 2.3 Semantic Versioning (SemVer)
Format:

MAJOR.MINOR.PATCH
Examples:
```bash

1.0.0 → Initial release

1.1.0 → New feature (backward compatible)

2.0.0 → Breaking change

Version ranges:

^1.2.0 → Minor updates allowed

~1.2.0 → Patch updates only
```
### 2.4 Node Version Management (NVM)
NVM allows switching Node versions per project.

Common commands:
```bash
nvm install 20
nvm use 20
node -v
.nvmrc file:

20
```
Benefits:

Consistent runtime across teams

Avoids “works on my machine” issues

## 3. Project Structure (Production-Ready)

```bash
node-ts-starter/
│
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── index.ts
│   ├── logger/
│   │   └── logger.ts
│   ├── app.ts
│   └── index.ts
│
├── .env
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── package.json
├── .nvmrc
└── README.md
```
## 4. Config Layer (Env Validation)
src/config/env.ts
```bash
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
```
Purpose:

Fail fast on invalid config

Type-safe environment access

## 5. Logger Setup
```bash
src/logger/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
```
Why use a logger?

Structured logs

Better debugging

Production observability

## 6. ESLint & Prettier
ESLint
Enforces code quality

Prevents bugs

Prettier
Enforces consistent formatting

Reduces code review noise

Both together ensure clean, readable codebases.

## 7. TypeScript Configuration
```bash
tsconfig.json (core settings)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true
  }
}
```
Benefits:

Type safety

Better IDE support

Fewer runtime bugs

## 8. Deliverable Summary
```bash
✔ Node.js runtime understanding
✔ Module systems (CJS vs ESM)
✔ Environment configuration & validation
✔ Package.json & scripts
✔ Semantic versioning
✔ NVM usage
✔ Clean Node.js + TypeScript project structure
```
This setup mirrors real production Node.js projects used in startups and enterprises.