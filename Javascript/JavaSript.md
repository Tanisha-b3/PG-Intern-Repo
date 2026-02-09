# Week 2 — JavaScript Core + TypeScript Base + HTTP Fundamentals

---

## Goal

The goal of Week 2 is to build a **strong JavaScript foundation** required for frontend and full-stack development.  
By the end of this week, learners should be able to:

- Write **clean, readable, and maintainable JavaScript**
- Understand **how JavaScript behaves internally**
- Avoid common bugs related to **coercion, mutation, and async execution**
- Apply **immutability and functional programming patterns**
- Confidently implement common **utility functions**
- Be prepared to start **TypeScript** effectively

---

## Day 1–2 — JavaScript Core + ES6+

---

## 1. JavaScript Types and Coercion

### Primitive Types
JavaScript primitive types are immutable and stored by value:
- string
- number
- boolean
- null
- undefined
- symbol
- bigint

Example:
```js
let a = 10;
let b = a;
b = 20;
// a remains 10
```

Reference Types
Reference types are mutable and stored by reference:

Object

Array

Function

Example:
```js
const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 5;
// obj1.x is now 5
```
Type Coercion
JavaScript automatically converts values when required.

Implicit Coercion
```js
"5" + 1    // "51"
"5" - 1    // 4
true + 1   // 2
Explicit Coercion
Number("10");   // 10
String(20);     // "20"
Boolean(1);     // true
Equality Operators
== → allows type coercion

=== → strict comparison (recommended)

5 === "5"; // false
Truthy and Falsy Values
Falsy values in JavaScript:

false

0

""

null

undefined

NaN

Everything else is truthy.

Example:

if ("0") {
  // Executes because "0" is truthy
}
```
## 2. Arrays and Functional Programming
map()
Transforms each element and returns a new array.

const numbers = [1, 2, 3];
const squares = numbers.map(n => n * n);
filter()
Filters elements based on a condition.

const activeUsers = users.filter(user => user.isActive);
reduce()
Reduces array into a single value.

const sum = numbers.reduce((acc, n) => acc + n, 0);
Common use cases:

Sum

Grouping

Counting

Transforming arrays into objects

Immutability
Avoid mutating original data.

❌ Bad:

arr.push(5);
✅ Good:

const newArr = [...arr, 5];
Benefits of immutability:

Predictable behavior

Easier debugging

Better compatibility with React

Fewer side effects

## 3. Objects, Destructuring, Rest & Spread
Object Basics
```js
const user = {
  name: "Tanisha",
  role: "Developer"
};
Destructuring
const { name, role } = user;
Nested destructuring:

const user = { profile: { age: 21 } };
const { profile: { age } } = user;
Default values:

const { city = "Unknown" } = user;
Spread Operator
Used for copying and merging objects.

const copy = { ...user };
Rest Operator
Used to collect remaining properties.

const { name, ...rest } = user;
Shallow vs Deep Copy
Spread creates a shallow copy

Nested objects still share references

Deep copy requires custom logic (covered in assignment).
```
## 4. Functions, Scope, Hoisting, and Closures
Function Types
Function Declaration

Function Expression

Arrow Function

Arrow functions:

Shorter syntax

Lexical this

No arguments object

Scope
Types of scope:

Global scope

Function scope

Block scope (let, const)

Avoid using var.

Hoisting
console.log(a); // undefined
var a = 10;
let and const are hoisted but not initialized (Temporal Dead Zone).

Closures
A closure allows a function to access variables from its outer scope.

function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
Closures are used in:

Debounce

Throttle

Data privacy

Memoization

## 5. Error Handling Patterns
try / catch / finally
try {
  riskyOperation();
} catch (error) {
  console.error(error.message);
} finally {
  cleanup();
}
Custom Errors
throw new Error("Invalid input");
Defensive Coding
Validate inputs

Fail early

Avoid silent failures

Read / Reference
MDN Web Docs
Use MDN as a reference, not for memorization.

Focus on:

JavaScript fundamentals

Arrays and objects

Functions and closures

Error handling

## Assignment — JavaScript Utility Functions

1. debounce(fn, delay)
Delays execution until user stops triggering the function.

Use cases:

Search input

Resize events

2. throttle(fn, delay)
Ensures function runs at most once per interval.

Use cases:

Scroll events

Button spam prevention

3. deepClone(value)
Creates a deep copy of objects and arrays.

Requirements:

Handle nested objects

Handle arrays

No shared references

Bonus:

Mention limitations (functions, circular references)

4. groupBy(array, keyOrFn)
Groups array elements based on:

Property name

Callback function

Example:

groupBy(users, "role");
groupBy(users, user => user.age > 18 ? "adult" : "minor");