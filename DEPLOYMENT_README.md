# 🚀 Dual Deployment Setup - Quick Start

This project supports **two separate deployments** from a single codebase:

## 🎯 Deployments

| Deployment | Domain | Purpose | Environment Variable |
|------------|--------|---------|---------------------|
| **Patient System** | `www.smiledental.com` | Public booking website | `DEPLOYMENT_TYPE=PATIENT` |
| **Admin Panel** | `admin.smiledental.com` | Management dashboard | `DEPLOYMENT_TYPE=ADMIN` |

---

## 📚 Documentation

Choose your guide based on what you need:

### 🪟 [Windows Setup Guide](./WINDOWS_SETUP.md) **← START HERE IF ON WINDOWS**
**Windows-specific setup instructions**
- Cross-platform compatibility with cross-env
- PowerShell/Command Prompt/Git Bash usage
- Windows-specific troubleshooting
- npm scripts for Windows

### 🔥 [Firebase Setup Guide](./FIREBASE_SETUP.md)
**Start here if you haven't set up Firebase yet**
- Create Firebase project
- Configure authentication
- Set up Firestore database
- Deploy security rules
- Seed initial data

### 🚀 [Deployment Guide](./DEPLOYMENT_GUIDE.md)
**Complete deployment walkthrough**
- Architecture overview
- Step-by-step deployment instructions
- Local development setup
- Security considerations
- Troubleshooting

### ⚡ [Vercel Deployment Reference](./VERCEL_DEPLOYMENT.md)
**Quick reference for Vercel deployment**
- Environment variable configuration
- DNS setup
- Deployment commands
- Monitoring and optimization

---

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd dental-booking-system
npm install
```

### 2. Configure Environment

**For Patient Development:**
```bash
cp .env.patient.example .env.local
# Edit .env.local with your Firebase credentials
```

**For Admin Development:**
```bash
cp .env.admin.example .env.local
# Edit .env.local with your Firebase credentials
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🏗️ How It Works

### Single Codebase Architecture

```
Same Git Repository
        │
        ├─── Patient Deployment (DEPLOYMENT_TYPE=PATIENT)
        │    └─── Routes: /, /about, /services, /booking/*, etc.
        │
        └─── Admin Deployment (DEPLOYMENT_TYPE=ADMIN)
             └─── Routes: /admin/*, /auth/login
```

### Key Features

✅ **Route Isolation**: Middleware blocks unauthorized routes  
✅ **Conditional UI**: Different layouts for each deployment  
✅ **Shared Backend**: Same Firebase project for both  
✅ **Independent Deployments**: Deploy separately on different domains  
✅ **Automatic Updates**: Push once, both deployments update  

---

## 🔑 Environment Variables

### Required for Both Deployments

```env
NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT  # or ADMIN
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Additional for Admin Deployment

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 🎨 What's Different in Each Deployment?

### Patient Deployment (`DEPLOYMENT_TYPE=PATIENT`)

**Routes Available:**
- `/` - Homepage
- `/about` - About page
- `/services` - Services listing
- `/booking/*` - Booking flow
- `/gallery` - Photo gallery
- `/contact` - Contact form
- `/auth/*` - Login/Signup

**UI Components:**
- ✅ Navbar with patient navigation
- ✅ Footer
- ❌ Admin sidebar
- ❌ Admin dashboard links

**Blocked Routes:**
- `/admin/*` → Returns 404

---

### Admin Deployment (`DEPLOYMENT_TYPE=ADMIN`)

**Routes Available:**
- `/admin/dashboard` - Admin dashboard
- `/admin/appointments` - Appointments management
- `/admin/patients` - Patients list
- `/admin/providers` - Providers CRUD
- `/admin/services` - Services CRUD
- `/auth/login` - Admin login

**UI Components:**
- ✅ Admin sidebar navigation
- ❌ Patient navbar
- ❌ Footer

**Blocked Routes:**
- `/`, `/about`, `/services`, etc. → Returns 404
- Root `/` → Redirects to `/admin/dashboard`

---

## 🔒 Security

### Route Protection

1. **Middleware Level**: Routes are blocked at server level
2. **Client Level**: AdminGuard component protects admin routes
3. **Database Level**: Firestore security rules enforce permissions

### Authentication Flow

**Patient:**
1. Sign up at `/auth/signup`
2. Login at `/auth/login`
3. Access booking system
4. Role: `patient`

**Admin:**
1. Login at `admin.smiledental.com/auth/login`
2. Access admin dashboard
3. Role: `admin` (set in Firestore)

---

## 📦 Deployment Platforms

### Vercel (Recommended)

**Advantages:**
- ✅ Easy Next.js deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Environment variables management

**Setup:**
1. Create two Vercel projects from same Git repo
2. Configure different environment variables
3. Deploy to different domains

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for details.

### Other Platforms

The same approach works on:
- **Netlify**: Use environment variables
- **AWS Amplify**: Configure build settings
- **Railway**: Set environment variables
- **Render**: Configure environment

---

## 🧪 Testing

### Test Patient Deployment

```bash
# Set environment
export NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT

# Run dev server
npm run dev

# Test routes
curl http://localhost:3000/              # ✅ Should work
curl http://localhost:3000/about         # ✅ Should work
curl http://localhost:3000/admin         # ❌ Should return 404
```

### Test Admin Deployment

```bash
# Set environment
export NEXT_PUBLIC_DEPLOYMENT_TYPE=ADMIN

# Run dev server
npm run dev

# Test routes
curl http://localhost:3000/              # ↪️ Should redirect to /admin/dashboard
curl http://localhost:3000/admin         # ✅ Should work
curl http://localhost:3000/about         # ❌ Should return 404
```

---

## 🔄 Deployment Workflow

### Development → Production

```bash
# 1. Make changes
git add .
git commit -m "Add new feature"

# 2. Push to repository
git push origin main

# 3. Automatic deployments trigger
# - Patient deployment rebuilds
# - Admin deployment rebuilds
# Both use same code, different configs
```

---

## 📊 File Structure

```
dental-booking-system/
├── src/
│   ├── app/
│   │   ├── (patient routes)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── booking/
│   │   │   └── ...
│   │   ├── admin/                    # Admin routes
│   │   │   ├── layout.tsx            # Admin layout
│   │   │   ├── dashboard/
│   │   │   ├── appointments/
│   │   │   └── ...
│   │   └── layout.tsx                # Root layout (conditional)
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx            # Patient navbar
│   │       ├── AdminSidebar.tsx      # Admin sidebar
│   │       └── AdminGuard.tsx        # Admin protection
│   ├── lib/
│   │   ├── deployment-config.ts      # 🆕 Deployment configuration
│   │   └── firebase/
│   └── contexts/
│       └── AuthContext.tsx
├── middleware.ts                      # 🆕 Route isolation
├── .env.patient.example               # 🆕 Patient env template
├── .env.admin.example                 # 🆕 Admin env template
├── DEPLOYMENT_GUIDE.md                # 🆕 Full deployment guide
├── VERCEL_DEPLOYMENT.md               # 🆕 Vercel quick reference
└── FIREBASE_SETUP.md                  # 🆕 Firebase setup guide
```

---

## ✅ Pre-Deployment Checklist

### Firebase Setup
- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Authorized domains added
- [ ] Firestore database created
- [ ] Security rules deployed
- [ ] Admin user created
- [ ] Sample data seeded

### Patient Deployment
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] `DEPLOYMENT_TYPE=PATIENT` configured
- [ ] Custom domain configured
- [ ] DNS records added
- [ ] SSL certificate active
- [ ] Deployment tested

### Admin Deployment
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] `DEPLOYMENT_TYPE=ADMIN` configured
- [ ] Admin SDK credentials added
- [ ] Custom domain configured
- [ ] DNS records added
- [ ] SSL certificate active
- [ ] Deployment tested

---

## 🆘 Need Help?

### Common Issues

**Q: Routes returning 404**  
A: Check `NEXT_PUBLIC_DEPLOYMENT_TYPE` environment variable

**Q: Firebase auth not working**  
A: Verify domains are added to Firebase authorized domains

**Q: Admin can't access dashboard**  
A: Check user's `role` field in Firestore is set to `'admin'`

### Documentation

- 📖 [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- 🔥 [Firebase Setup](./FIREBASE_SETUP.md)
- ⚡ [Vercel Reference](./VERCEL_DEPLOYMENT.md)

### Support

- Check existing documentation
- Review Firebase Console logs
- Check Vercel deployment logs
- Test locally with correct environment variables

---

## 🎉 Success!

Once deployed, you'll have:

✅ **Patient Website** at `www.smiledental.com`  
✅ **Admin Panel** at `admin.smiledental.com`  
✅ **Shared Firebase Backend** for seamless data sync  
✅ **Independent Deployments** for better security  
✅ **Single Codebase** for easier maintenance  

**Happy Deploying! 🚀**

