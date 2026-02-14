// Node 18+ (has built-in fetch)
// If using older Node: npm install node-fetch

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];

// Retry helper (retries only on 5xx)
async function fetchWithRetry(url, retries = 3, delay = 500) {
  try {
    const res = await fetch(url);

    // Retry only for server errors (5xx)
    if (res.status >= 500 && res.status < 600) {
      throw new Error(`Server error: ${res.status}`);
    }

    if (!res.ok) {
      // 4xx errors should not retry usually
      throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${url}... Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2); // exponential backoff
    }
    throw error;
  }
}

// Concurrency limiter (pool pattern)
async function runWithConcurrency(tasks, limit = 2) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err) {
        results[currentIndex] = { error: err.message };
      }
    }
  }

  // Create workers equal to concurrency limit
  const workers = Array.from({ length: limit }, () => worker());

  await Promise.all(workers);
  return results;
}

// Main execution
async function main() {
  const tasks = urls.map((url) => {
    return () => fetchWithRetry(url, 3);
  });

  console.log("Fetching APIs with concurrency limit = 2...\n");

  const results = await runWithConcurrency(tasks, 2);

  console.log("Results:");
  console.dir(results, { depth: null });
}

main().catch(console.error);
