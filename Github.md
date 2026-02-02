# Day 3 — Git Fundamentals 

Git is the backbone of modern team-based software development.  
This day focuses on **real-world Git usage**, collaboration workflows, and
handling conflicts confidently.

---

## 1. What is Git & Why Teams Need It

Git is a **distributed version control system** that helps teams:
- Track code changes
- Collaborate without overwriting work
- Maintain a clean project history
- Review code before merging

**Why Git matters in teams:**
- Multiple developers work in parallel
- Easy rollback to stable versions
- Clear ownership and accountability
- Safer production deployments

---

## 2. Core Git Workflow

### 2.1 Clone a Repository
Creates a local copy of a remote repository.

```bash
git clone <repository-url>
Example:
git clone https://github.com/user/project.git
```
### 2.2 Check Repository Status
Shows current branch, staged files, and unstaged changes.
```bash
git status
```
### 2.3 Add Changes
Stages files for commit.
```bash
git add file.txt
git add .
```
### 2.4 Commit Changes
Creates a snapshot of staged changes.
```bash
git commit -m "feat: add user authentication"
```
### 2.5 Push & Pull
Push (upload local commits):
```bash
git push origin main
```
Pull (fetch + merge latest changes):
```bash
git pull origin main
```
## 3. Branching in Git
Branches allow developers to work independently.
### 3.1 Create & Switch Branch
```bash
git checkout -b feature/login
```
### 3.2 View Branches
```bash
git branch
```
### 3.3 Switch Branch
```bash
git checkout main
```
## 4. Merging vs Rebase (Basics)
### 4.1 Merge
Combines branches with a merge commit.
```bash
git merge feature/login
✔ Safe
✔ Preserves history
❌ Can create cluttered logs
```
4.2 Rebase
Moves commits on top of another branch.
```bash
git rebase main
✔ Clean history
❌ Dangerous on shared branches
```
📌 Rule:
👉 Rebase only local branches, never public ones.

## 5. Git Stash (Temporary Save)
Used when you need to switch context quickly.
```bash
git stash
git stash list
git stash pop
```
Use case:
Urgent bug fix
Switching branches without committing unfinished work

## 6. Cherry-Pick (Intro)
Applies a specific commit from another branch.
```bash
git cherry-pick <commit-hash>
```
## Use case:

- Hotfix from another branch

- Selective feature inclusion

## 7. Merge Conflict Resolution
- Conflicts occur when:
- Two branches modify the same lines
- Git cannot auto-merge

### 7.1 Conflict Markers
- Your changes
## 7.2 Steps to Resolve Conflict
- Open conflicted file

- Decide correct code

- Remove conflict markers

- Stage resolved file

## Commit
```bash
git add .
git commit -m "fix: resolve merge conflict"
💡 Tip: VS Code provides Accept Current / Incoming / Both options.
```
## 8. Commit Message Discipline
### 8.1 Why Good Commit Messages Matter
- Easy debugging

- Better reviews

- Clean project history

### 8.2 Standard Commit Format
- type(scope): short description
- Types:

- feat – new feature

- fix – bug fix

- refactor – code improvement

- docs – documentation

- chore – tooling/config

Examples:

- feat(auth): add JWT login
- fix(ui): resolve button overlap
- refactor(api): optimize error handling
## 9. Pull Request (PR) Workflow
### 9.1 Standard Team Workflow
- Create feature branch
- Write clean commits
- Push branch
- Open Pull Request
- Code review
- Fix review comments
- Merge to main

## 9.2 Best Practices
✔ Small PRs
✔ Clear description
✔ Screenshots for UI changes
✔ No unrelated commits

## Commands Example:
- git checkout -b branch-a
- git checkout -b branch-b
- git merge branch-a
## 11. Common Git Mistakes to Avoid
- Committing directly to main
- Large commits
- Poor commit messages
- Rebasing shared branches
- Ignoring conflicts

