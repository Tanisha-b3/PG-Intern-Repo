# Advanced TypeScript Notes (Assertions to Project Structure)

## 16️⃣ Type Assertions (as) vs Type Casting

Type assertion tells TypeScript: "Trust me, I know the type."

``` ts
const input = document.getElementById("name") as HTMLInputElement;
input.value = "Tanisha";
```

⚠️ Dangerous if used incorrectly:

``` ts
const user = {} as User; // Compiles but runtime error possible
```

### Best Practices

-   Avoid excessive `as`
-   Prefer proper typing or type guards
-   Use mainly for:
    -   DOM elements
    -   Third-party libraries
    -   Unknown data parsing

------------------------------------------------------------------------

## 17️⃣ Optional & Readonly Properties

### Optional Properties (?)

``` ts
interface User {
  id: string;
  name: string;
  age?: number; // optional
}
```

Usage:

``` ts
const user: User = {
  id: "1",
  name: "Tanisha"
};
```

Useful in: - API responses - Update DTOs - Partial forms

### Readonly Properties

``` ts
interface Video {
  readonly id: string;
  title: string;
}
```

Now:

``` ts
video.id = "2"; // ❌ Error
```

Best for: - IDs - Immutable state - Database models

------------------------------------------------------------------------

## 18️⃣ Tuple Types (Fixed-Length Arrays)

Tuple = array with fixed types & order.

``` ts
let user: [string, number];
user = ["Tanisha", 22]; // ✅
```

Wrong:

``` ts
user = [22, "Tanisha"]; // ❌
```

Real-world use: - API responses `[data, error]` - React hooks return
values

``` ts
const [loading, error]: [boolean, string | null] = [false, null];
```

------------------------------------------------------------------------

## 19️⃣ Literal Types (Advanced Type Safety)

Literal types restrict exact values.

``` ts
type Theme = "light" | "dark";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

Example:

``` ts
function setTheme(theme: Theme) {}
```

Passing `"blue"` → ❌ Compile error

Prevents UI bugs in dashboards and themes.

------------------------------------------------------------------------

## 20️⃣ Type Inference

TypeScript automatically detects types.

``` ts
let name = "Tanisha"; // string
let age = 22; // number
```

Problem:

``` ts
let data; // inferred as any ❌
```

Best Practice: - Let TS infer simple types - Explicitly type complex
variables

------------------------------------------------------------------------

## 21️⃣ Modules & Export/Import (Very Important)

### Named Export

``` ts
// user.ts
export interface User {
  id: string;
}
```

Import:

``` ts
import { User } from "./user";
```

### Default Export

``` ts
export default function login() {}
```

Import:

``` ts
import login from "./login";
```

MERN Best Practice: - DTOs → /types - Models → /models - Services →
/services

------------------------------------------------------------------------

## 22️⃣ Namespaces (Interview Topic)

``` ts
namespace Auth {
  export function login() {}
  export function logout() {}
}

Auth.login();
```

Modern practice: ➡️ Prefer ES Modules over namespaces.

------------------------------------------------------------------------

## 23️⃣ Decorators (Important for NestJS)

Example:

``` ts
class User {
  @IsEmail()
  email: string;
}
```

Used in: - NestJS - Angular - Validation libraries - Dependency
Injection

Enable in tsconfig:

``` json
"experimentalDecorators": true
```

------------------------------------------------------------------------

## 24️⃣ Advanced Generics (Enterprise Level)

### Multiple Generics

``` ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
```

Usage:

``` ts
pair<string, number>("id", 101);
```

### Generic Repository Pattern

``` ts
interface Repository<T> {
  findById(id: string): Promise<T>;
  create(data: T): Promise<T>;
}
```

Reusable for: - Users - Videos - Comments - Playlists

------------------------------------------------------------------------

## 25️⃣ Mapped Types (Powerful)

``` ts
type User = {
  name: string;
  email: string;
};

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

Built-in mapped types: - Partial`<T>`{=html} - Required`<T>`{=html} -
Readonly`<T>`{=html}

------------------------------------------------------------------------

## 26️⃣ keyof & typeof (Interview Favorite)

### keyof

``` ts
type User = {
  name: string;
  email: string;
};

type UserKeys = keyof User;
// "name" | "email"
```

### typeof (Type Extraction)

``` ts
const config = {
  apiUrl: "localhost"
};

type ConfigType = typeof config;
```

Useful in config-driven applications.

------------------------------------------------------------------------

## 27️⃣ Record Utility Type

``` ts
type Roles = "admin" | "user";

const permissions: Record<Roles, string[]> = {
  admin: ["create", "delete"],
  user: ["read"]
};
```

Cleaner than:

``` ts
{ [key: string]: string[] }
```

------------------------------------------------------------------------

## 28️⃣ Async/Await with TypeScript

``` ts
async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}
```

Always type: - Promise responses - API calls - Database queries

------------------------------------------------------------------------

## 29️⃣ Error Handling with Proper Types

``` ts
try {
  // code
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

Best Practice: ✔ Use `unknown` instead of `any` in catch blocks

------------------------------------------------------------------------

## 30️⃣ Project Folder Type Structure (MERN Best Practice)

Ideal TypeScript structure for a Video Streaming Platform:

    src/
     ├── types/
     │    ├── user.types.ts
     │    ├── video.types.ts
     │    └── api.types.ts
     ├── dto/
     │    ├── createVideo.dto.ts
     │    └── updateUser.dto.ts
     ├── interfaces/
     ├── services/
     ├── controllers/

Benefits: - Scalable architecture - Clean codebase - Easy refactoring -
Enterprise-level maintainability
