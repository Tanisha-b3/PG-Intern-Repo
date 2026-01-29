# 🐧 Linux Notes

## 📂 File & Directory Commands

```bash
pwd                     # show current directory
ls                      # list files
ls -la                  # detailed list (hidden files too)
cd folder_name          # move into folder
cd ..                   # go back
mkdir test              # create folder
touch file.txt          # create file
rm file.txt             # delete file
rm -r folder            # delete folder
cp a.txt b.txt          # copy file
mv a.txt folder/        # move file
```

## 📄 File Viewing & Editing

```bash
cat file.txt            # show file content
less file.txt           # scrollable view
head file.txt           # first 10 lines
tail file.txt           # last 10 lines
nano file.txt           # edit file (simple editor)
vim file.txt            # advanced editor
```
### 📦 Package Management (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
sudo apt remove git
```


### 🔍 Search Commands
```bash
grep "error" log.txt
find . -name "*.js"
```
### 👤 User & Permission
```bash
whoami
chmod 755 script.sh
chown user:user file.txt
```

### 🌐 Networking
```bash
ping google.com
ifconfig
ip a
curl https://api.github.com
```

### 🔐 SSH Key Setup (GitHub / Server Access)

1. Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Press Enter for default location.

2. Start SSH Agent
```bash
eval "$(ssh-agent -s)"
```
3. Add Key to Agent
```bash
ssh-add ~/.ssh/id_ed25519
```
4. Copy Public Key
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy output → add to GitHub →
Settings → SSH and GPG keys → New SSH key

5. Test GitHub SSH
```bash
ssh -T git@github.com
```

Expected:

Hi username! You've successfully authenticated.

6. SSH into Server (Example)
```bash
ssh user@host
```

Example:

ssh ubuntu@192.168.1.10
ssh root@yourserver.com


If success, you’ll see:

Welcome to Ubuntu...

✅ Common SSH Errors Fix
```bash
chmod 600 ~/.ssh/id_ed25519
chmod 700 ~/.ssh
```
📌 Git SSH Clone Example
```bash 
git clone git@github.com:username/repo.git
```