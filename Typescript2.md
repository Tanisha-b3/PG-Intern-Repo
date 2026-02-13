Type Assertions (as) vs Type Casting

Type assertion tells TypeScript:

“Trust me, I know the type.”

const input = document.getElementById("name") as HTMLInputElement;
input.value = "Tanisha";


⚠️ Dangerous if used incorrectly:

const user = {} as User; // Compiles but runtime error possible


Best Practice:

Avoid excessive as

Prefer proper typing or guards

Use when:

DOM elements

Third-party libraries

Unknown data parsing

17️⃣ Optional & Readonly Properties
Optional Properties (?)
interface User {
  id: string;
  name: string;
  age?: number; // optional
}


Usage:

const user: User = {
  id: "1",
  name: "Tanisha"
};


Very useful in:

API responses

Update DTOs

Partial forms

Readonly Properties
interface Video {
  readonly id: string;
  title: string;
}


Now:

video.id = "2"; ❌ Error


Best for:

IDs

Immutable state

Database models

18️⃣ Tuple Types (Fixed-Length Arrays)

Tuple = array with fixed types & order.

let user: [string, number];
user = ["Tanisha", 22]; // ✅


Wrong:

user = [22, "Tanisha"]; ❌


Real-world use:

API responses [data, error]

React hooks return values

const [loading, error]: [boolean, string | null] = [false, null];

19️⃣ Literal Types (Advanced Type Safety)

Literal types restrict exact values.

type Theme = "light" | "dark";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";


In your dashboard (dark/light mode):

function setTheme(theme: Theme) {}


Passing "blue" → ❌ Compile error

This prevents UI bugs.

20️⃣ Type Inference (How TS Automatically Detects Types)

TypeScript automatically infers types.

let name = "Tanisha"; // inferred as string
let age = 22; // inferred as number


But problem:

let data; // inferred as any ❌


Best Practice:

Let TS infer simple types

Explicitly type complex variables

21️⃣ Modules & Export/Import (Very Important)
Named Export
// user.ts
export interface User {
  id: string;
}


Import:

import { User } from "./user";

Default Export
export default function login() {}


Import:

import login from "./login";


In large MERN apps:

DTOs in /types

Models in /models

Services in /services

22️⃣ Namespaces (Rare but Asked in Interviews)

Used to group related code.

namespace Auth {
  export function login() {}
  export function logout() {}
}

Auth.login();


Modern practice:
➡️ Prefer ES Modules instead of namespaces.

23️⃣ Decorators (VERY Important for NestJS – You saw @ApiProperty)

Since you asked earlier about:
@ApiProperty, @IsEmail

These are decorators.

class User {
  @IsEmail()
  email: string;
}


Decorators are used in:

NestJS

Angular

Validation libraries

Dependency Injection

Enable in tsconfig:

"experimentalDecorators": true

24️⃣ Advanced Generics (Real Enterprise Level)
Multiple Generics
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}


Usage:

pair<string, number>("id", 101);

Generic Repository Pattern (Backend)

Very useful for your streaming backend:

interface Repository<T> {
  findById(id: string): Promise<T>;
  create(data: T): Promise<T>;
}


Reusable for:

Users

Videos

Comments

Playlists

25️⃣ Mapped Types (Advanced & Powerful)

Transforms existing types.

type User = {
  name: string;
  email: string;
};

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};


Built-in mapped types:

Partial<T>

Required<T>

Readonly<T>

26️⃣ keyof & typeof (Interview Favorite)
keyof

Gets keys of a type.

type User = {
  name: string;
  email: string;
};

type UserKeys = keyof User; 
// "name" | "email"

typeof (Type Extraction)
const config = {
  apiUrl: "localhost"
};

type ConfigType = typeof config;


Very useful in config-driven apps.

27️⃣ Record Utility Type (Clean Object Typing)
type Roles = "admin" | "user";

const permissions: Record<Roles, string[]> = {
  admin: ["create", "delete"],
  user: ["read"]
};


Better than:

{ [key: string]: string[] }

28️⃣ Async/Await with TypeScript (Backend Must-Know)
async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}


Always type:

Promise responses

API calls

Database queries (Mongoose/Prisma)

29️⃣ Error Handling with Proper Types
try {
  // code
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}


Best practice:
✔ Use unknown instead of any in catch

30️⃣ Project Folder Type Structure (Real MERN Best Practice)

For your Video Streaming Platform, ideal TS structure:

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


This gives:

Scalable architecture

Clean codebase

Easy refactoring (very important in large apps)