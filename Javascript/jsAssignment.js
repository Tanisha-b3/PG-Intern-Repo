/* ================================
   debounce(fn, delay)
   ================================ */
function debounce(fn, delay) {
  let timerId = null;

  return function (...args) {
    const context = this;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

/* ================================
   throttle(fn, delay)
   ================================ */
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/* ================================
   deepClone(value)
   ================================ */
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  const cloned = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] = deepClone(value[key]);
    }
  }

  return cloned;
}

/* ================================
   groupBy(array, keyOrFn)
   ================================ */
function groupBy(array, keyOrFn) {
  return array.reduce((result, item) => {
    const key =
      typeof keyOrFn === "function"
        ? keyOrFn(item)
        : item[keyOrFn];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
    return result;
  }, {});
}

/* ================================
   Sample Tests
   ================================ */

// debounce
const debounced = debounce(val => console.log("Debounced:", val), 300);
debounced("a");
debounced("ab");
debounced("abc");

// throttle
const throttled = throttle(() => console.log("Throttled:", Date.now()), 1000);
throttled();
throttled();
throttled();

// deepClone
const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);
clone.b.c = 99;
console.log(obj.b.c); // 2

// groupBy
const users = [
  { name: "A", role: "admin", age: 22 },
  { name: "B", role: "user", age: 17 },
  { name: "C", role: "admin", age: 30 }
];

console.log(groupBy(users, "role"));
console.log(groupBy(users, u => (u.age >= 18 ? "adult" : "minor")));

// Answers
// Throttled: 1770643260690
// 2
// {
//   admin: [
//     { name: 'A', role: 'admin', age: 22 },
//     { name: 'C', role: 'admin', age: 30 }
//   ],
//   user: [ { name: 'B', role: 'user', age: 17 } ]
// }
// {
//   adult: [
//     { name: 'A', role: 'admin', age: 22 },
//     { name: 'C', role: 'admin', age: 30 }
//   ],
//   minor: [ { name: 'B', role: 'user', age: 17 } ]
// }
// Debounced: abc

// 1️Throttled: 1770643260690
// Throttled: 1770643260690

// What it means:

// This log comes from the throttle function

// 1770643260690 is a timestamp (Date.now())

// Why it printed only once:

// You called:

// throttled();
// throttled();
// throttled();


// But throttle allows execution only once per delay (1000ms).

// So:

// First call → ✅ executed

// Next calls (within 1 second) → ❌ ignored

// ✔️ Throttle is working correctly

// 2
// 2

// What it means:

// This comes from:

// console.log(obj.b.c);


// After:

// clone.b.c = 99;

// Why it printed 2:

// deepClone() created a true deep copy

// Modifying clone did NOT affect obj

// ✔️ Deep clone worked correctly (no shared reference)

// 3️ Grouped by role
// {
//   admin: [
//     { name: 'A', role: 'admin', age: 22 },
//     { name: 'C', role: 'admin', age: 30 }
//   ],
//   user: [
//     { name: 'B', role: 'user', age: 17 }
//   ]
// }

// What it means:

// You ran:

// groupBy(users, "role");

// Result:

// All users with role: "admin" are grouped together

// All users with role: "user" are grouped together

// groupBy using a property key is working

// 4️ Grouped by function (adult / minor)
// {
//   adult: [
//     { name: 'A', role: 'admin', age: 22 },
//     { name: 'C', role: 'admin', age: 30 }
//   ],
//   minor: [
//     { name: 'B', role: 'user', age: 17 }
//   ]
// }

// What it means:

// You ran:

// groupBy(users, u => (u.age >= 18 ? "adult" : "minor"));

// Result:

// Age ≥ 18 → "adult"

// Age < 18 → "minor"

// groupBy with callback logic is working

// 5️ Debounced: abc
// Debounced: abc

// This is the MOST IMPORTANT part 👇

// You called:

// debounced("a");
// debounced("ab");
// debounced("abc");

// What happened internally:

// "a" → timer set 
// "ab" → previous timer cancelled 
// "abc" → previous timer cancelled 
// After 300ms of no calls → "abc" executes 

// Why only "abc" printed:

// Debounce only runs the LAST call after the delay

//  Debounce is working perfectly

// One-Line Interview Explanation

// If interviewer asks:

// “What does this output tell you?”

// Say this:

// Throttle executed once because calls happened within the delay. 
// Deep clone prevented shared references. 
// GroupBy correctly categorized data. Debounce executed only the last call after the delay.