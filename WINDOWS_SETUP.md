# Windows Setup Guide

This guide provides Windows-specific instructions for setting up and running the dual deployment architecture.

---

## ✅ Cross-Platform Compatibility

This project uses **`cross-env`** to ensure npm scripts work on both Windows and Unix-based systems (macOS, Linux).

### What is cross-env?

`cross-env` is a package that allows you to set environment variables in npm scripts in a cross-platform way.

**Without cross-env (doesn't work on Windows):**
```json
"dev:patient": "NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT next dev"
```

**With cross-env (works everywhere):**
```json
"dev:patient": "cross-env NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT next dev"
```

---

## 🚀 Quick Start (Windows)

### 1. Install Dependencies

```powershell
npm install
```

This will automatically install `cross-env` as a dev dependency.

### 2. Configure Environment

**Option A: Use npm scripts (Recommended)**

The npm scripts automatically set the deployment type:

```powershell
# For patient deployment
npm run dev:patient

# For admin deployment
npm run dev:admin
```

**Option B: Set in .env.local**

If you prefer to use `npm run dev` directly, set the deployment type in `.env.local`:

```env
NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT  # or ADMIN
```

Then run:
```powershell
npm run dev
```

### 3. Test the Deployment

**Patient Deployment:**
```powershell
npm run dev:patient
```

Visit: http://localhost:3000

**Admin Deployment:**
```powershell
npm run dev:admin
```

Visit: http://localhost:3000

---

## 🔧 Available npm Scripts

All scripts work on Windows thanks to `cross-env`:

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | Default dev server | Uses deployment type from `.env.local` |
| `npm run dev:patient` | Patient dev server | Automatically sets `DEPLOYMENT_TYPE=PATIENT` |
| `npm run dev:admin` | Admin dev server | Automatically sets `DEPLOYMENT_TYPE=ADMIN` |
| `npm run build` | Production build | Uses deployment type from `.env.local` |
| `npm run build:patient` | Patient build | Automatically sets `DEPLOYMENT_TYPE=PATIENT` |
| `npm run build:admin` | Admin build | Automatically sets `DEPLOYMENT_TYPE=ADMIN` |
| `npm run start` | Start production | Runs built application |
| `npm run lint` | Run linter | Check code quality |
| `npm run test:deployment` | Test deployment | Validate route isolation |

---

## 🪟 Windows-Specific Notes

### PowerShell vs Command Prompt vs Git Bash

All three terminals work with the npm scripts:

**PowerShell (Recommended):**
```powershell
npm run dev:patient
```

**Command Prompt:**
```cmd
npm run dev:patient
```

**Git Bash (MINGW64):**
```bash
npm run dev:patient
```

### Setting Environment Variables Manually (Not Recommended)

If you need to set environment variables manually in different shells:

**PowerShell:**
```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TYPE="PATIENT"
npm run dev
```

**Command Prompt:**
```cmd
set NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
npm run dev
```

**Git Bash:**
```bash
export NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
npm run dev
```

**Note:** Using npm scripts with `cross-env` is much easier and more reliable!

---

## 🔍 Troubleshooting

### Issue: "cross-env is not recognized"

**Solution:** Install cross-env:
```powershell
npm install --save-dev cross-env
```

### Issue: "Port 3000 is already in use"

**Solution:** Kill the process using port 3000:

**PowerShell:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Or use a different port:**
```powershell
npm run dev:patient -- -p 3001
```

### Issue: Environment variables not working

**Solution:** 

1. Make sure you're using the npm scripts:
   ```powershell
   npm run dev:patient  # NOT: npm run dev
   ```

2. Check `.env.local` file exists and has correct values

3. Restart the development server

### Issue: "Cannot find module 'cross-env'"

**Solution:** Reinstall dependencies:
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

---

## 📝 .env.local Configuration

Your `.env.local` file should look like this:

```env
# Deployment Type (PATIENT or ADMIN)
# Note: When using npm scripts (dev:patient or dev:admin), this is set automatically
# Only set this manually if running 'npm run dev' directly
NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (Server-side only - needed for admin deployment)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# App URLs
NEXT_PUBLIC_PATIENT_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
```

---

## 🧪 Testing on Windows

### Test Patient Deployment

**Terminal 1:**
```powershell
npm run dev:patient
```

**Terminal 2:**
```powershell
npm run test:deployment
```

Expected output:
- ✅ Patient routes should work
- ❌ Admin routes should return 404

### Test Admin Deployment

**Terminal 1:**
```powershell
npm run dev:admin
```

**Terminal 2:**
```powershell
npm run test:deployment
```

Expected output:
- ✅ Admin routes should work
- ❌ Patient routes should return 404

---

## 🔄 Switching Between Deployments

### Method 1: Use Different npm Scripts (Recommended)

```powershell
# Stop current server (Ctrl+C)

# Start patient deployment
npm run dev:patient

# Or start admin deployment
npm run dev:admin
```

### Method 2: Edit .env.local

1. Open `.env.local`
2. Change `NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT` to `ADMIN` (or vice versa)
3. Restart server:
   ```powershell
   npm run dev
   ```

---

## 🏗️ Building for Production (Windows)

### Build Patient Deployment

```powershell
npm run build:patient
```

### Build Admin Deployment

```powershell
npm run build:admin
```

### Test Production Build

```powershell
# Build first
npm run build:patient

# Start production server
npm run start
```

---

## 📦 Deployment from Windows

### Deploy to Vercel

**Install Vercel CLI:**
```powershell
npm install -g vercel
```

**Login:**
```powershell
vercel login
```

**Deploy Patient:**
```powershell
vercel --prod
# In Vercel dashboard, set NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
```

**Deploy Admin:**
```powershell
vercel --prod
# In Vercel dashboard, set NEXT_PUBLIC_DEPLOYMENT_TYPE=ADMIN
```

---

## 🎯 Best Practices for Windows Development

### 1. Use PowerShell or Windows Terminal

Modern and better support for npm scripts.

### 2. Use npm Scripts

Always use `npm run dev:patient` or `npm run dev:admin` instead of setting environment variables manually.

### 3. Use .env.local for Secrets

Never commit `.env.local` to Git. It's already in `.gitignore`.

### 4. Use Git Bash for Git Commands

Git Bash provides better Git experience on Windows.

### 5. Keep Node.js Updated

Use the latest LTS version of Node.js for best compatibility.

---

## ✅ Windows Setup Checklist

- [ ] Node.js installed (v18 or higher)
- [ ] npm installed (comes with Node.js)
- [ ] Git installed (optional but recommended)
- [ ] Project dependencies installed (`npm install`)
- [ ] `cross-env` installed (should be automatic)
- [ ] `.env.local` file created and configured
- [ ] Firebase credentials added to `.env.local`
- [ ] Development server runs successfully
- [ ] Can switch between patient and admin deployments

---

## 🆘 Getting Help

### Check Logs

When something goes wrong, check the terminal output for error messages.

### Common Error Messages

**"NEXT_PUBLIC_DEPLOYMENT_TYPE is not recognized"**
→ Use npm scripts with `cross-env`

**"Port already in use"**
→ Kill the process or use a different port

**"Cannot find module"**
→ Run `npm install`

**"Firebase error"**
→ Check `.env.local` configuration

---

## 📚 Additional Resources

- [Node.js for Windows](https://nodejs.org/)
- [Git for Windows](https://git-scm.com/download/win)
- [Windows Terminal](https://aka.ms/terminal)
- [cross-env Documentation](https://www.npmjs.com/package/cross-env)
- [Next.js Documentation](https://nextjs.org/docs)

---

**You're all set for Windows development! 🎉**

Use `npm run dev:patient` or `npm run dev:admin` to get started.

