Day 3 — Asynchronous JavaScript (Deep Dive)
Introduction

JavaScript is a single-threaded, non-blocking, asynchronous language. This means that although JavaScript executes code on a single call stack, it can handle long-running operations—such as network requests, file I/O, and timers—without blocking the execution of other tasks. Understanding asynchronous JavaScript deeply is essential for building scalable web applications, high-performance backends, and responsive user interfaces.

This session covers:

Evolution from callbacks to promises to async/await

Advanced promise utilities such as Promise.all and Promise.allSettled

Retry mechanisms with exponential backoff

A clear mental model of the JavaScript event loop

Common async bugs and how to avoid them

A real-world assignment implementing concurrency limits and retries

1. Evolution of Asynchronous Patterns
1.1 Callbacks

A callback is a function passed as an argument to another function, executed after an asynchronous operation completes.

Example
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data received");
  }, 1000);
}

fetchData((err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

Problems with Callbacks

Callback Hell (Pyramid of Doom)

login(user, () => {
  fetchProfile(() => {
    fetchSettings(() => {
      updateUI(() => {
        // unreadable code
      });
    });
  });
});


Inconsistent error handling

Hard to compose and reuse

Difficult debugging and testing

Callbacks were powerful but did not scale well for complex applications.

1.2 Promises

Promises were introduced to solve callback hell and provide a standard abstraction for async values.

Promise States

pending

fulfilled

rejected

Basic Promise Example
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success"), 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

Promise Chaining
fetchUser()
  .then(user => fetchProfile(user.id))
  .then(profile => fetchPosts(profile.id))
  .catch(err => console.error(err));

Advantages

Linear flow

Centralized error handling

Better composability

Limitations

.then() nesting can still reduce readability

Debugging stack traces is harder than synchronous code

1.3 Async / Await

async/await is syntactic sugar over promises that allows writing asynchronous code in a synchronous style.

Basic Example
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

Key Rules

async functions always return a promise

await pauses execution only inside async functions

Errors are handled using try/catch

Why Async/Await Is Preferred

Cleaner syntax

Easier debugging

More readable logic

Better maintainability

2. Promise Utility Methods
2.1 Promise.all

Runs multiple promises in parallel and fails fast if any one fails.

const results = await Promise.all([
  fetch("/users"),
  fetch("/posts"),
  fetch("/comments")
]);

Characteristics

Executes concurrently

Rejects immediately on first failure

Ideal when all results are required

Use Cases

Page initial data loading

Dependent batch operations

2.2 Promise.allSettled

Waits for all promises to settle, regardless of success or failure.

const results = await Promise.allSettled([
  fetch("/api1"),
  fetch("/api2"),
  fetch("/api3")
]);

Output Structure
[
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... }
]

Use Cases

Dashboards

Analytics

Logging systems

Partial success scenarios

2.3 Promise.any & Promise.race (Brief)

Promise.any: resolves on first success

Promise.race: resolves/rejects on first settled promise

3. Retry Logic with Exponential Backoff
Why Retries Matter

Network failures are common due to:

Server overload

Temporary outages

Rate limiting

Network instability

Blind retries can overload servers, so retries must be controlled.

3.1 Exponential Backoff Strategy

Delays increase exponentially:

Attempt 1 → 500ms
Attempt 2 → 1000ms
Attempt 3 → 2000ms

Rules

Retry only for 5xx errors

Do not retry for 4xx errors

Set a max retry limit

Implementation
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3, delay = 500) {
  try {
    const res = await fetch(url);

    if (res.status >= 500) {
      throw new Error("Server error");
    }

    return await res.json();
  } catch (err) {
    if (retries === 0) throw err;
    await sleep(delay);
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}

4. JavaScript Event Loop (Mental Model)
Core Components

Call Stack

Web APIs

Microtask Queue

Macrotask Queue

Event Loop

Execution Priority

Call Stack

Microtasks (Promise.then, await)

Macrotasks (setTimeout, setInterval)

Example
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");

Output
start
end
promise
timeout

Key Insight

👉 Promises always execute before timers

5. Common Async JavaScript Bugs
5.1 Unhandled Promise Rejection
fetch(url); // ❌ no await or catch


Fix

await fetch(url);


or

fetch(url).catch(console.error);

5.2 Race Conditions

Occurs when multiple async operations modify shared state.

let balance = 100;

async function withdraw(amount) {
  const current = balance;
  await delay();
  balance = current - amount;
}


Two withdrawals can cause incorrect balance.

Fix

Mutex / queue

Sequential execution

Atomic updates

5.3 Over-parallelization
await Promise.all(1000FetchCalls); // ❌


Can crash servers or browsers.

Fix

Concurrency limits

6. Assignment: Real-World Async Script
Problem Statement

Build a script that:

Fetches 5 APIs

Uses concurrency limit = 2

Retries on 5xx errors

Implements exponential backoff

Conceptual Design

Use a worker pool

Each worker fetches one task at a time

Retry failures responsibly

Complete Implementation
const urls = [
  "https://api.example.com/1",
  "https://api.example.com/2",
  "https://api.example.com/3",
  "https://api.example.com/4",
  "https://api.example.com/5"
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchWithRetry(url, retries = 3, delay = 500) {
  try {
    const res = await fetch(url);

    if (res.status >= 500) {
      throw new Error("Server error");
    }

    return await res.json();
  } catch (err) {
    if (retries === 0) throw err;
    await sleep(delay);
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;
      results[currentIndex] = await fetchWithRetry(tasks[currentIndex]);
    }
  }

  const workers = Array.from({ length: limit }, worker);
  await Promise.all(workers);

  return results;
}

runWithConcurrency(urls, 2)
  .then(console.log)
  .catch(console.error);

7. What This Assignment Teaches

✅ Controlled concurrency
✅ Retry strategies
✅ Event loop behavior
✅ Production-grade async design
✅ Interview-level async mastery

8. Interview-Focused Key Takeaways

JavaScript is single-threaded but asynchronous

async/await improves readability, not performance

Promises use microtask queue

Always limit concurrency in real systems

Never retry blindly

Understand the event loop, not just syntax

Conclusion

Asynchronous JavaScript is the backbone of modern web development. Mastering callbacks, promises, async/await, concurrency control, retries, and the event loop enables developers to build scalable, reliable, and high-performance applications. This deep understanding separates average developers from strong full-stack engineers.