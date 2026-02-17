# Express.js (NPM & Yarn) Complete Tutorial

## 1. Introduction to Express.js
Express.js is a fast, minimal, and flexible Node.js web framework used to build APIs and web applications. It simplifies routing, middleware handling, and server creation.

---

## 2. Prerequisites
- Node.js (v16 or higher)
- npm or Yarn installed
- Basic knowledge of JavaScript & Node.js

Check versions:
```bash
node -v
npm -v
yarn -v
```

---

# PART A — Using NPM (Node Package Manager)

## 3. Create Express App with NPM

### Step 1: Create Project Folder
```bash
mkdir express-npm-app
cd express-npm-app
```

### Step 2: Initialize Project
```bash
npm init -y
```
This creates a `package.json` file.

### Step 3: Install Express
```bash
npm install express
```

### Project Structure
```
express-npm-app/
 ├── node_modules/
 ├── package.json
 └── server.js
```

### Step 4: Create Server File
Create `server.js`

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express using NPM!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 5: Run Server
```bash
node server.js
```

---

## 4. Install Development Tools (NPM)
### Install Nodemon (Auto Restart Server)
```bash
npm install --save-dev nodemon
```

Update `package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run in dev mode:
```bash
npm run dev
```

---

# PART B — Using Yarn (Alternative Package Manager)

## 5. Install Yarn (If Not Installed)
```bash
npm install -g yarn
```

Verify:
```bash
yarn -v
```

---

## 6. Create Express App with Yarn

### Step 1: Create Project
```bash
mkdir express-yarn-app
cd express-yarn-app
```

### Step 2: Initialize Yarn Project
```bash
yarn init -y
```

### Step 3: Install Express
```bash
yarn add express
```

### Step 4: Create `server.js`
```js
const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hello from Express using Yarn!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 5: Run Server
```bash
node server.js
```

---

## 7. Install Nodemon with Yarn
```bash
yarn add --dev nodemon
```

Add scripts in `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run dev server:
```bash
yarn dev
```

---

# 8. NPM vs Yarn (Quick Comparison)
| Feature | NPM | Yarn |
|--------|-----|------|
| Speed | Moderate | Faster (parallel installs) |
| Lock File | package-lock.json | yarn.lock |
| Commands | npm install | yarn add |
| Offline Cache | Limited | Strong |

---

# 9. Install Common Express Dependencies
Using NPM:
```bash
npm install cors dotenv morgan
```

Using Yarn:
```bash
yarn add cors dotenv morgan
```

Example Usage:
```js
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));
```

---

# 10. Basic Express API Example (CRUD)
```js
const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

// Create
app.post('/tasks', (req, res) => {
  tasks.push(req.body);
  res.json({ message: 'Task created', tasks });
});

// Read
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update
app.put('/tasks/:id', (req, res) => {
  tasks[req.params.id] = req.body;
  res.json({ message: 'Task updated', tasks });
});

// Delete
app.delete('/tasks/:id', (req, res) => {
  tasks.splice(req.params.id, 1);
  res.json({ message: 'Task deleted', tasks });
});

app.listen(3000, () => console.log('API running on port 3000'));
```

---

# 11. Useful NPM & Yarn Commands

## NPM
```bash
npm install <package>
npm uninstall <package>
npm run dev
npm list
```

## Yarn
```bash
yarn add <package>
yarn remove <package>
yarn dev
yarn list
```

---

# 12. Best Practices
- Use environment variables with dotenv
- Use nodemon for development
- Keep routes modular
- Use middleware for logging & security
- Follow consistent folder structure

---

# 13. Recommended Folder Structure (Production)
```
project/
 ├── src/
 │   ├── routes/
 │   ├── controllers/
 │   ├── middleware/
 │   └── app.js
 ├── package.json
 └── .env
```

---

# 14. Conclusion
Express.js can be installed and managed using both NPM and Yarn. NPM is default with Node.js, while Yarn offers faster and more efficient dependency management. Both are widely used in production for building scalable backend APIs and full-stack applications.

