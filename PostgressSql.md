# Week 5 — SQL + PostgreSQL Deep (PSQL)

Goal:

Write real-world production-level queries

Design relational tables properly

Understand constraints deeply

Master transactions and ACID

Think like a database engineer about indexing & performance

This is a deep-dive explanation structured like a serious backend training module.

1️⃣ Understanding SQL vs PostgreSQL (Foundation)

SQL (Structured Query Language) is a standard language used to communicate with relational databases.

PostgreSQL is an advanced open-source relational database system that implements SQL and adds powerful features like:

JSONB support

Advanced indexing

Window functions

CTEs

Full-text search

MVCC concurrency model

When you work in psql, you are using PostgreSQL’s interactive terminal.

2️⃣ SQL Basics — Deep Practical Understanding

Let’s design a realistic system:

Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT — The Most Used Statement
Basic selection
SELECT * FROM users;


⚠ In production, avoid SELECT * because:

It fetches unnecessary columns

It increases network cost

It reduces performance clarity

Better:

SELECT id, name, email FROM users;

WHERE — Filtering
SELECT * FROM users WHERE age > 18;


Multiple conditions:

SELECT * FROM users 
WHERE age > 18 AND created_at > '2025-01-01';


Using IN:

SELECT * FROM users WHERE id IN (1,2,3);


Using LIKE:

SELECT * FROM users WHERE name LIKE 'T%';

ORDER BY
SELECT * FROM users ORDER BY created_at DESC;


Multiple sorting:

ORDER BY age DESC, name ASC;

LIMIT + OFFSET (Pagination)
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20;


Used for page-based pagination.

3️⃣ Joins — The Heart of Relational Databases

Relational databases shine because of relationships.

Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INNER JOIN

Returns matching rows only.

SELECT u.name, o.amount
FROM users u
INNER JOIN orders o
ON u.id = o.user_id;


Used when relationship must exist.

LEFT JOIN

Returns all users even if no orders.

SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id;


If no order → NULL.

Used in reporting systems.

RIGHT JOIN (Less Common)

Returns all rows from right table.

FULL JOIN

Returns all records from both tables.

4️⃣ GROUP BY + Aggregates (Critical for Analytics)

Aggregates:

COUNT()

SUM()

AVG()

MIN()

MAX()

Count Orders per User
SELECT user_id, COUNT(*) 
FROM orders
GROUP BY user_id;

Total Revenue Per User
SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.name;

Using HAVING (Filter Aggregates)
SELECT user_id, SUM(amount)
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 1000;


HAVING filters after grouping.

5️⃣ Constraints — Data Integrity

Without constraints, databases become unreliable.

PRIMARY KEY

Unique

Not Null

Automatically indexed

FOREIGN KEY
user_id INT REFERENCES users(id)


Enforces relational integrity.

UNIQUE
email VARCHAR(150) UNIQUE


Prevents duplicates.

CHECK
CHECK (amount > 0)


Prevents invalid values.

NOT NULL

Prevents empty critical data.

Why Constraints Matter?

Prevent corrupted data

Enforce business rules

Protect relationships

Reduce application bugs

Database-level validation > app-level validation.

6️⃣ Transactions — Deep Understanding

Transactions guarantee ACID:

A — Atomicity

All or nothing.

C — Consistency

Database moves from valid state → valid state.

I — Isolation

Transactions don’t interfere incorrectly.

D — Durability

Committed data persists.

Example: Order Placement
BEGIN;

INSERT INTO orders (user_id, amount)
VALUES (1, 500);

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

COMMIT;


If something fails:

ROLLBACK;

Isolation Levels in PostgreSQL

Read Committed (default)

Repeatable Read

Serializable

Higher isolation → more safety → less concurrency.

7️⃣ Indexes — Performance Engineering

Indexes allow faster lookups.

Without Index
SELECT * FROM users WHERE email = 'test@gmail.com';


PostgreSQL does a Sequential Scan (scans entire table).

With Index
CREATE INDEX idx_users_email ON users(email);


Now PostgreSQL uses Index Scan.

When to Add Index?

✔ Column used in WHERE
✔ Column used in JOIN
✔ Column used in ORDER BY
✔ Column used in GROUP BY

When NOT to Add?

❌ Small tables
❌ Columns rarely searched
❌ Frequently updated columns

Index Tradeoffs
Operation	Effect of Index
SELECT	Faster
INSERT	Slower
UPDATE	Slower
DELETE	Slightly slower

Indexes consume storage.

8️⃣ Query Performance Thinking

Always ask:

How big is the table?

Is the column indexed?

Am I using SELECT *?

Am I filtering early?

Am I joining unnecessarily?

Can I reduce data early?

EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@gmail.com';


It shows:

Seq Scan

Index Scan

Cost

Actual time

You should learn to read query plans.

9️⃣ Real Production Scenarios
Top 5 Spending Users
SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.name
ORDER BY total_spent DESC
LIMIT 5;

Monthly Revenue
SELECT DATE_TRUNC('month', created_at) AS month,
SUM(amount)
FROM orders
GROUP BY month
ORDER BY month;

Users With No Orders
SELECT u.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

1️⃣0️⃣ Table Design Best Practices

✔ Use proper data types
✔ Use constraints
✔ Normalize (avoid duplication)
✔ Add indexes carefully
✔ Use foreign keys
✔ Avoid unnecessary TEXT columns

1️⃣1️⃣ Normalization Concepts

1NF — Atomic values
2NF — No partial dependency
3NF — No transitive dependency

Goal: Reduce redundancy.

1️⃣2️⃣ PostgreSQL-Specific Strengths

JSONB

GIN indexes

Partial indexes

CTEs

Window functions

MVCC concurrency model

PostgreSQL is production-ready and enterprise-grade.

1️⃣3️⃣ Mental Model of Database Engineer

Think like this:

Schema first

Data integrity first

Performance second

Scale third

Bad schema = permanent pain.