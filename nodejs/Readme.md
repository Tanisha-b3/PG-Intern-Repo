# Node.js + TypeScript Starter — What Everything Does

This project is a basic Node.js + TypeScript setup with environment validation, logging, linting, and formatting.

### 1️⃣ src/index.ts

What it does

Entry point of the application

This is the first file that runs

Why it exists

Node needs one starting file

Keeps startup logic in one place

### 2️⃣ src/configs/env.ts

What it does

Reads environment variables

Validates them using Zod

Exports a safe env object

Why it exists

Environment variables can be missing or wrong

This file prevents the app from running with bad config

Example

env.NODE_ENV   // always valid
env.PORT       // always a number

### 3️⃣ .env

What it does

Stores environment variables for local development

Why it exists

Keeps secrets and config outside code

Different values for different machines

Used by

dotenv → loaded before app starts

### 4️⃣ .env.example

What it does

Shows which env variables are required

Why it exists

Other developers know what to set

CI/CD knows what to provide

### 5️⃣ dotenv

What it does

Loads .env into process.env

Why it exists

Node does NOT read .env files by default

### 6️⃣ zod

What it does

Validates runtime data (here: environment variables)

Why it exists

TypeScript checks only at compile time

Zod checks at runtime

### 7️⃣ src/utils/logger.ts

What it does

Central place for logging

Wraps console.log, console.error, etc.

Why it exists

Easy to change logging later

Prevents scattered console.log everywhere

### 8️⃣ tsx

What it does

Runs TypeScript directly

Watches files and reloads on change

Why it exists

Faster than ts-node

No build step needed during development

### 9️⃣ tsconfig.json

What it does

Tells TypeScript how to compile code

Controls

Module system

Strictness

Output directory

### 🔟 package.json

What it does

Lists dependencies

Defines scripts

Scripts explained
Script	What it does
dev	Runs app in watch mode
build	Converts TS → JS
start	Runs compiled JS
lint	Checks code quality
format	Formats code
### 1️⃣1️⃣ ESLint

What it does

Finds bugs

Enforces coding rules

Why it exists

Prevents common mistakes

Keeps code consistent

### 1️⃣2️⃣ Prettier

What it does

Formats code automatically

Why it exists

No arguments about spacing

Same style everywhere

### 1️⃣3️⃣ NODE_ENV

What it does

Tells app which environment it’s running in

Values

development

test

production

Why it exists

Enable/disable logs

Change behavior per environment

### 1️⃣4️⃣ Zod Error You Saw
NODE_ENV: Required


What it means

NODE_ENV was not set

App stopped intentionally

Why this is good

App never runs in broken state

### 1️⃣5️⃣ Why app updated only after refresh

Reason

Backend saved correctly

Frontend state was not fully updated

Refresh fetched fresh data from backend

Meaning

Backend logic = ✅

State update logic = ❌ incomplete

### 1️⃣6️⃣ Redux updateOrder issue

What it does

updateOrder(state, action) {
  state.orders = state.orders.map(...)
}


Problem

If _id is missing → nothing updates

If partial object passed → old data stays

Why refresh works

Full order comes from backend again

### 1️⃣7️⃣ NestJS Swagger error (summary)

What happened

Swagger v11 requires NestJS v11

Your project used NestJS v10

Rule

All NestJS packages must have the same major version