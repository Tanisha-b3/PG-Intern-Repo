# Week 5 --- SQL + PostgreSQL Deep (PSQL)

## Goal

-   Write real-world production-level queries
-   Design relational tables properly
-   Understand constraints deeply
-   Master transactions and ACID
-   Think like a database engineer about indexing & performance

This module is structured like a serious backend training guide.

------------------------------------------------------------------------

## 1️⃣ Understanding SQL vs PostgreSQL (Foundation)

SQL (Structured Query Language) is the standard language used to
communicate with relational databases.

PostgreSQL is an advanced open-source relational database that
implements SQL and adds powerful features: - JSONB support - Advanced
indexing - Window functions - CTEs (Common Table Expressions) -
Full-text search - MVCC concurrency model

When you work in `psql`, you are using PostgreSQL's interactive
terminal.

------------------------------------------------------------------------

## 2️⃣ SQL Basics --- Deep Practical Understanding

### Users Table Design

``` sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### SELECT --- The Most Used Statement

``` sql
SELECT * FROM users;
```

⚠ In production, avoid `SELECT *` because: - Fetches unnecessary
columns - Increases network cost - Reduces performance clarity

Better:

``` sql
SELECT id, name, email FROM users;
```

### WHERE --- Filtering

``` sql
SELECT * FROM users WHERE age > 18;
```

Multiple conditions:

``` sql
SELECT * FROM users
WHERE age > 18 AND created_at > '2025-01-01';
```

Using IN:

``` sql
SELECT * FROM users WHERE id IN (1,2,3);
```

Using LIKE:

``` sql
SELECT * FROM users WHERE name LIKE 'T%';
```

### ORDER BY

``` sql
SELECT * FROM users ORDER BY created_at DESC;
```

Multiple sorting:

``` sql
ORDER BY age DESC, name ASC;
```

### LIMIT + OFFSET (Pagination)

``` sql
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20;
```

Used for page-based pagination.

------------------------------------------------------------------------

## 3️⃣ Joins --- The Heart of Relational Databases

### Orders Table

``` sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### INNER JOIN (Matching rows only)

``` sql
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o
ON u.id = o.user_id;
```

### LEFT JOIN (All users, even without orders)

``` sql
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id;
```

If no order → NULL (useful in reporting).

### Other Joins

-   RIGHT JOIN (less common)
-   FULL JOIN (all records from both tables)

------------------------------------------------------------------------

## 4️⃣ GROUP BY + Aggregates (Critical for Analytics)

Common aggregates: - COUNT() - SUM() - AVG() - MIN() - MAX()

### Count Orders per User

``` sql
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id;
```

### Total Revenue Per User

``` sql
SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.name;
```

### HAVING (Filter Aggregates)

``` sql
SELECT user_id, SUM(amount)
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 1000;
```

HAVING filters after grouping.

------------------------------------------------------------------------

## 5️⃣ Constraints --- Data Integrity

### PRIMARY KEY

-   Unique
-   Not Null
-   Automatically indexed

### FOREIGN KEY

``` sql
user_id INT REFERENCES users(id)
```

Enforces relational integrity.

### UNIQUE

``` sql
email VARCHAR(150) UNIQUE
```

Prevents duplicates.

### CHECK

``` sql
CHECK (amount > 0)
```

Prevents invalid values.

### NOT NULL

Prevents empty critical data.

#### Why Constraints Matter

-   Prevent corrupted data
-   Enforce business rules
-   Protect relationships
-   Reduce application bugs

Database-level validation \> App-level validation.

------------------------------------------------------------------------

## 6️⃣ Transactions --- Deep Understanding

Transactions guarantee ACID: - A --- Atomicity - C --- Consistency - I
--- Isolation - D --- Durability

### Example: Order Placement

``` sql
BEGIN;

INSERT INTO orders (user_id, amount)
VALUES (1, 500);

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

COMMIT;
```

If something fails:

``` sql
ROLLBACK;
```

### Isolation Levels in PostgreSQL

-   Read Committed (default)
-   Repeatable Read
-   Serializable

Higher isolation → More safety → Less concurrency.

------------------------------------------------------------------------

## 7️⃣ Indexes --- Performance Engineering

Without Index:

``` sql
SELECT * FROM users WHERE email = 'test@gmail.com';
```

Performs Sequential Scan.

With Index:

``` sql
CREATE INDEX idx_users_email ON users(email);
```

Now PostgreSQL uses Index Scan.

### When to Add Index

✔ Columns used in WHERE\
✔ Columns used in JOIN\
✔ Columns used in ORDER BY\
✔ Columns used in GROUP BY

### When NOT to Add

❌ Small tables\
❌ Rarely searched columns\
❌ Frequently updated columns

### Index Tradeoffs

  Operation   Effect of Index
  ----------- -----------------
  SELECT      Faster
  INSERT      Slower
  UPDATE      Slower
  DELETE      Slightly slower

Indexes also consume storage.

------------------------------------------------------------------------

## 8️⃣ Query Performance Thinking

Always ask: - How big is the table? - Is the column indexed? - Am I
using SELECT \*? - Am I filtering early? - Am I joining unnecessarily? -
Can I reduce data early?

### EXPLAIN ANALYZE

``` sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@gmail.com';
```

Shows: - Seq Scan / Index Scan - Cost - Actual execution time

------------------------------------------------------------------------

## 9️⃣ Real Production Scenarios

### Top 5 Spending Users

``` sql
SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.name
ORDER BY total_spent DESC
LIMIT 5;
```

### Monthly Revenue

``` sql
SELECT DATE_TRUNC('month', created_at) AS month,
SUM(amount)
FROM orders
GROUP BY month
ORDER BY month;
```

### Users With No Orders

``` sql
SELECT u.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

------------------------------------------------------------------------

## 🔟 Table Design Best Practices

-   Use proper data types
-   Use constraints
-   Normalize (avoid duplication)
-   Add indexes carefully
-   Use foreign keys
-   Avoid unnecessary TEXT columns

------------------------------------------------------------------------

## 1️⃣1️⃣ Normalization Concepts

-   1NF --- Atomic values
-   2NF --- No partial dependency
-   3NF --- No transitive dependency

Goal: Reduce redundancy and improve consistency.

------------------------------------------------------------------------

## 1️⃣2️⃣ PostgreSQL-Specific Strengths

-   JSONB support
-   GIN indexes
-   Partial indexes
-   CTEs
-   Window functions
-   MVCC concurrency model

PostgreSQL is enterprise-grade and production-ready.

------------------------------------------------------------------------

## 1️⃣3️⃣ Mental Model of a Database Engineer

Think in this order: 1. Schema first\
2. Data integrity first\
3. Performance second\
4. Scale third

Bad schema = permanent pain in large systems.
