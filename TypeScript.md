

1️⃣ Why TypeScript?

JavaScript is dynamically typed.

That means this is valid:

function add(a, b) {
  return a + b;
}

add(10, "20"); // "1020"


No error. But logic is wrong.

TypeScript prevents this:

function add(a: number, b: number): number {
  return a + b;
}


Now:

add(10, "20"); ❌ Error

💡 TypeScript gives:

Compile-time safety

Better IDE autocomplete

Refactoring confidence

Cleaner architecture

Enterprise-level reliability

In large projects (like your streaming platform), TypeScript is not optional — it’s standard.

2️⃣ Types vs Interfaces (Very Important for Interviews)

Both define structure, but they differ in flexibility and extension.

🔹 Using type
type User = {
  id: string;
  name: string;
  email: string;
};

Type can also represent:
✔ Union Types
type Status = "success" | "error" | "loading";

✔ Primitive aliases
type ID = string | number;

✔ Function types
type Add = (a: number, b: number) => number;

🔹 Using interface
interface User {
  id: string;
  name: string;
  email: string;
}

Extending Interface
interface Admin extends User {
  role: "admin";
}

🔥 Key Differences
Feature	type	interface
Object shape	✅	✅
Union types	✅	❌
Declaration merging	❌	✅
Extend	Via intersection	Via extends
Preferred for API contracts	Sometimes	Yes
🔥 Declaration Merging (Interview Favorite)
interface User {
  name: string;
}

interface User {
  age: number;
}


Result:

{
  name: string;
  age: number;
}


This works only with interface.

🎯 Real-world recommendation

Use interface for object structures

Use type for unions, generics, complex compositions

3️⃣ Union Types

Union types allow multiple possible types.

type Role = "admin" | "user";


Now:

function assignRole(role: Role) {
  console.log(role);
}


If you pass "manager" → ❌ Error.

Union with different shapes
type SuccessResponse = {
  success: true;
  data: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;


Now TypeScript forces safe access.

4️⃣ Narrowing & Type Guards

When using union types, TypeScript needs help to determine actual type.

🔹 typeof Narrowing
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

🔹 in Operator
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user" };

function handleUser(user: Admin | User) {
  if ("permissions" in user) {
    console.log(user.permissions);
  }
}

🔹 Custom Type Guard (Advanced)
function isAdmin(user: Admin | User): user is Admin {
  return user.role === "admin";
}


Now:

if (isAdmin(user)) {
  user.permissions; // safe
}


Very useful in backend authentication logic.

5️⃣ Generics (Extremely Important)

Generics make reusable and scalable code.

Basic Generic Function
function identity<T>(value: T): T {
  return value;
}


Now:

identity<string>("Hello");
identity<number>(100);

Generic with Constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}


Now only values with length property allowed.

Generic Interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}


Usage:

const response: ApiResponse<string[]> = {
  success: true,
  data: ["A", "B"]
};

Generic in Real Projects (Your MERN Context)

Example: Fetch function

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}


Now you can reuse for:

Users

Videos

Comments

Contests

6️⃣ DTO Types for APIs

DTO = Data Transfer Object

Used to define what data is sent/received from APIs.

Example (Backend)
interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

Response DTO
interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}


Important:

Never send password

Never send internal DB fields

In Your Video Streaming App

You should define:

interface CreateVideoDTO {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

interface VideoResponseDTO {
  id: string;
  title: string;
  views: number;
  likes: number;
}


DTOs improve:

Security

Maintainability

Versioning

7️⃣ TS Config Basics (Strict Mode Mindset)

Open tsconfig.json

Important settings:

{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

🔥 strict: true

Enables:

strictNullChecks

noImplicitAny

strictFunctionTypes

strictBindCallApply

Always enable strict mode.

🔥 noImplicitAny

Prevents:

function add(a, b) { // ❌ implicit any
  return a + b;
}


Forces:

function add(a: number, b: number): number

🔥 strictNullChecks

Prevents:

let name: string = null; ❌


You must explicitly allow null:

let name: string | null;

8️⃣ unknown vs any (Interview Gold)
❌ any

Disables type checking.

let value: any = 10;
value.toUpperCase(); // No error


Dangerous.

✅ unknown

Safer alternative.

let value: unknown = 10;

if (typeof value === "number") {
  value.toFixed(2);
}


Must narrow before usage.

Always prefer unknown over any.

9️⃣ Enums
enum Role {
  Admin = "ADMIN",
  User = "USER"
}


Used for constants.

But modern practice → Use union types instead.

🔟 Utility Types (Advanced)
Partial
interface User {
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;


Now both fields optional.

Pick
type UserEmail = Pick<User, "email">;

Omit
type UserWithoutEmail = Omit<User, "email">;


Very important in DTO design.

1️⃣1️⃣ TypeScript with Express (Backend)
import { Request, Response } from "express";

app.get("/users", (req: Request, res: Response) => {
  res.json({ success: true });
});


Typing request body:

interface CreateUserDTO {
  name: string;
  email: string;
}

app.post("/users", (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
  const { name, email } = req.body;
});

1️⃣2️⃣ TypeScript with React
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

1️⃣3️⃣ Converting Week 1 Utilities Repo to TypeScript
Step 1
npm install typescript --save-dev
npx tsc --init

Step 2 – Rename files
utils.js → utils.ts

Step 3 – Add Types

Before:

function sum(a, b) {
  return a + b;
}


After:

function sum(a: number, b: number): number {
  return a + b;
}

Step 4 – Add ESLint
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

1️⃣4️⃣ Common TypeScript Bugs

Overusing any

Not enabling strict mode

Forgetting null checks

Wrong API typing

Type assertions misuse (as)

Example misuse:

const user = {} as User; // Dangerous


Avoid unless necessary.

1️⃣5️⃣ Real-World TypeScript Mindset

In large apps:

Define DTO layer

Define Domain layer

Use generics for reusable services

Avoid any

Use utility types

Keep strict mode on