# TypeScript Complete Notes (Interview + Real-World)

## 1️⃣ Why TypeScript?

JavaScript is dynamically typed.

That means this is valid:

``` js
function add(a, b) {
  return a + b;
}

add(10, "20"); // "1020"
```

No error, but logic is wrong.

TypeScript prevents this:

``` ts
function add(a: number, b: number): number {
  return a + b;
}

add(10, "20"); // ❌ Error
```

### Benefits of TypeScript

-   Compile-time safety
-   Better IDE autocomplete
-   Refactoring confidence
-   Cleaner architecture
-   Enterprise-level reliability

In large projects (like a MERN video streaming platform), TypeScript is
a standard.

------------------------------------------------------------------------

## 2️⃣ Types vs Interfaces (Very Important for Interviews)

Both define structure but differ in flexibility and extension.

### Using `type`

``` ts
type User = {
  id: string;
  name: string;
  email: string;
};
```

Type can also represent:

#### Union Types

``` ts
type Status = "success" | "error" | "loading";
```

#### Primitive Aliases

``` ts
type ID = string | number;
```

#### Function Types

``` ts
type Add = (a: number, b: number) => number;
```

### Using `interface`

``` ts
interface User {
  id: string;
  name: string;
  email: string;
}
```

### Extending Interface

``` ts
interface Admin extends User {
  role: "admin";
}
```

### Key Differences

  Feature                       type               interface
  ----------------------------- ------------------ -----------
  Object shape                  ✅                 ✅
  Union types                   ✅                 ❌
  Declaration merging           ❌                 ✅
  Extend                        Intersection (&)   extends
  Preferred for API contracts   Sometimes          Yes

### Declaration Merging (Interview Favorite)

``` ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

Result:

``` ts
{
  name: string;
  age: number;
}
```

Real-world recommendation: - Use `interface` for object structures - Use
`type` for unions, generics, complex compositions

------------------------------------------------------------------------

## 3️⃣ Union Types

Union types allow multiple possible types.

``` ts
type Role = "admin" | "user";

function assignRole(role: Role) {
  console.log(role);
}
```

If you pass `"manager"` → ❌ Error

### Union with Different Shapes

``` ts
type SuccessResponse = {
  success: true;
  data: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
```

------------------------------------------------------------------------

## 4️⃣ Narrowing & Type Guards

### typeof Narrowing

``` ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### `in` Operator

``` ts
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user" };

function handleUser(user: Admin | User) {
  if ("permissions" in user) {
    console.log(user.permissions);
  }
}
```

### Custom Type Guard (Advanced)

``` ts
function isAdmin(user: Admin | User): user is Admin {
  return user.role === "admin";
}
```

------------------------------------------------------------------------

## 5️⃣ Generics (Extremely Important)

### Basic Generic Function

``` ts
function identity<T>(value: T): T {
  return value;
}
```

### Generic with Constraints

``` ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
```

### Generic Interface

``` ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

### Real Project Example (MERN)

``` ts
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}
```

Reusable for: - Users - Videos - Comments - Contests

------------------------------------------------------------------------

## 6️⃣ DTO Types for APIs

DTO = Data Transfer Object

### Backend Example

``` ts
interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
```

### Response DTO

``` ts
interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
```

Important Rules: - Never send password - Never expose internal DB fields

### Video Streaming App DTO

``` ts
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
```

Benefits: - Security - Maintainability - Versioning

------------------------------------------------------------------------

## 7️⃣ TS Config Basics (Strict Mode Mindset)

Open `tsconfig.json`

``` json
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
```

### Important Options

-   `strict: true` → Enables all strict checks
-   `noImplicitAny` → Prevents implicit any
-   `strictNullChecks` → Forces null safety

------------------------------------------------------------------------

## 8️⃣ unknown vs any (Interview Gold)

### ❌ any (Dangerous)

``` ts
let value: any = 10;
value.toUpperCase(); // No error
```

### ✅ unknown (Safe)

``` ts
let value: unknown = 10;

if (typeof value === "number") {
  value.toFixed(2);
}
```

Always prefer `unknown` over `any`.

------------------------------------------------------------------------

## 9️⃣ Enums

``` ts
enum Role {
  Admin = "ADMIN",
  User = "USER"
}
```

Modern practice: Prefer union types instead of enums.

------------------------------------------------------------------------

## 🔟 Utility Types (Advanced)

### Partial

``` ts
interface User {
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;
```

### Pick

``` ts
type UserEmail = Pick<User, "email">;
```

### Omit

``` ts
type UserWithoutEmail = Omit<User, "email">;
```

Very important in DTO design.

------------------------------------------------------------------------

## 1️⃣1️⃣ TypeScript with Express (Backend)

``` ts
import { Request, Response } from "express";

app.get("/users", (req: Request, res: Response) => {
  res.json({ success: true });
});
```

### Typing Request Body

``` ts
interface CreateUserDTO {
  name: string;
  email: string;
}

app.post(
  "/users",
  (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
    const { name, email } = req.body;
  }
);
```

------------------------------------------------------------------------

## 1️⃣2️⃣ TypeScript with React

``` tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

------------------------------------------------------------------------

## 1️⃣3️⃣ Converting JavaScript Repo to TypeScript

### Step 1

``` bash
npm install typescript --save-dev
npx tsc --init
```

### Step 2 -- Rename Files

    utils.js → utils.ts

### Step 3 -- Add Types

Before:

``` js
function sum(a, b) {
  return a + b;
}
```

After:

``` ts
function sum(a: number, b: number): number {
  return a + b;
}
```

### Step 4 -- Add ESLint

``` bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

------------------------------------------------------------------------

## 1️⃣4️⃣ Common TypeScript Bugs

-   Overusing `any`
-   Not enabling strict mode
-   Forgetting null checks
-   Wrong API typing
-   Misusing type assertions (`as`)

Example misuse:

``` ts
const user = {} as User; // Dangerous
```

Avoid unless absolutely necessary.

------------------------------------------------------------------------

## 1️⃣5️⃣ Real-World TypeScript Mindset (Enterprise)

In large applications: - Define DTO layer - Define Domain layer - Use
generics for reusable services - Avoid `any` - Use utility types - Keep
strict mode ON - Maintain clean architecture

For Full Stack & MERN projects (like streaming platforms), TypeScript
ensures scalability, safety, and maintainability.
