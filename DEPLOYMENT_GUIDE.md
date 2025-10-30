# Deployment Guide: Dual Deployment Architecture

This guide explains how to deploy the Smile Dental booking system as **two separate applications** from a single codebase:

1. **Patient Booking System** - `www.smiledental.com`
2. **Admin Management Panel** - `admin.smiledental.com`

Both deployments share the same Firebase backend (Authentication + Firestore) but serve different routes and UI.

---

## 🏗️ Architecture Overview

### Single Codebase, Dual Deployments

```
┌─────────────────────────────────────────────────────────────┐
│                    Single Git Repository                     │
│                  (dental-booking-system)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│  Patient Deployment   │       │   Admin Deployment    │
│  www.smiledental.com  │       │ admin.smiledental.com │
├───────────────────────┤       ├───────────────────────┤
│ ENV: PATIENT          │       │ ENV: ADMIN            │
│                       │       │                       │
│ Routes:               │       │ Routes:               │
│ - /                   │       │ - /admin/*            │
│ - /about              │       │ - /auth/login         │
│ - /services           │       │                       │
│ - /booking/*          │       │ UI:                   │
│ - /gallery            │       │ - AdminSidebar        │
│ - /contact            │       │ - No Navbar/Footer    │
│ - /auth/*             │       │                       │
│                       │       │                       │
│ UI:                   │       │                       │
│ - Navbar + Footer     │       │                       │
│ - No Admin Links      │       │                       │
└───────────────────────┘       └───────────────────────┘
            │                               │
            └───────────────┬───────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Firebase Backend    │
                │  (Shared Database)    │
                ├───────────────────────┤
                │ - Authentication      │
                │ - Firestore Database  │
                │ - Storage             │
                └───────────────────────┘
```

### How It Works

1. **Environment Variable Control**: The `NEXT_PUBLIC_DEPLOYMENT_TYPE` environment variable determines which deployment type is active
2. **Middleware Route Isolation**: Routes are filtered based on deployment type - patient routes return 404 in admin deployment and vice versa
3. **Conditional UI Rendering**: Layouts conditionally render Navbar/Footer (patient) or AdminSidebar (admin)
4. **Shared Firebase Backend**: Both deployments connect to the same Firebase project

---

## 📋 Prerequisites

1. **Firebase Project**: Set up with Authentication and Firestore
2. **Vercel Account**: (or other hosting platform)
3. **Domain/Subdomain**: Configured for both deployments
4. **Git Repository**: Code pushed to GitHub/GitLab/Bitbucket

---

## 🚀 Deployment Steps

### Step 1: Configure Firebase for Multiple Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add both domains:
   - `www.smiledental.com` (or your patient domain)
   - `admin.smiledental.com` (or your admin domain)
   - `localhost` (for local development)

### Step 2: Deploy Patient Booking System

#### On Vercel:

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository
   - Name it: `smile-dental-patient`

2. **Configure Environment Variables**
   - In project settings, add these environment variables:
   
   ```env
   NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. **Configure Domain**
   - Go to project settings → Domains
   - Add your custom domain: `www.smiledental.com`
   - Follow DNS configuration instructions

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 3: Deploy Admin Management Panel

#### On Vercel:

1. **Import Same Project Again**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import the **same** Git repository
   - Name it: `smile-dental-admin`

2. **Configure Environment Variables**
   - In project settings, add these environment variables:
   
   ```env
   NEXT_PUBLIC_DEPLOYMENT_TYPE=ADMIN
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   FIREBASE_ADMIN_PROJECT_ID=your-project-id
   FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

3. **Configure Domain**
   - Go to project settings → Domains
   - Add your custom domain: `admin.smiledental.com`
   - Follow DNS configuration instructions

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

---

## 🧪 Local Development & Testing

### Testing Patient Deployment Locally

1. Create `.env.local` file:
   ```bash
   cp .env.patient.example .env.local
   ```

2. Update with your Firebase credentials

3. Run development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`
   - You should see the patient-facing website
   - Admin routes should return 404

### Testing Admin Deployment Locally

1. Update `.env.local` file:
   ```bash
   cp .env.admin.example .env.local
   ```

2. Update with your Firebase credentials

3. Run development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`
   - Root `/` should redirect to `/admin/dashboard`
   - Patient routes should return 404
   - Only admin routes should be accessible

---

## 🔒 Security Considerations

### 1. Route Isolation
- ✅ Middleware blocks unauthorized routes at the server level
- ✅ Returns 404 for routes that don't belong to the deployment
- ✅ No client-side route leakage

### 2. Authentication
- ✅ Admin routes require authentication (handled by middleware)
- ✅ Role verification happens client-side via AuthContext
- ✅ Firebase security rules enforce server-side permissions

### 3. UI Separation
- ✅ No admin links in patient deployment
- ✅ No patient navigation in admin deployment
- ✅ Separate layouts for each deployment

### 4. Firebase Security Rules
- ✅ Both deployments use the same Firestore security rules
- ✅ Rules enforce role-based access control
- ✅ Admin operations require `role === 'admin'` in user document

---

## 📊 Deployment Comparison

| Feature | Patient Deployment | Admin Deployment |
|---------|-------------------|------------------|
| **Domain** | www.smiledental.com | admin.smiledental.com |
| **Environment Variable** | `DEPLOYMENT_TYPE=PATIENT` | `DEPLOYMENT_TYPE=ADMIN` |
| **Routes** | `/`, `/about`, `/services`, `/booking/*`, `/gallery`, `/contact`, `/auth/*` | `/admin/*`, `/auth/login` |
| **Layout** | Navbar + Footer | AdminSidebar only |
| **Authentication** | Patient login/signup | Admin login only |
| **Home Page** | `/` (landing page) | `/admin/dashboard` |
| **Target Users** | Patients | Administrators |

---

## 🔄 Continuous Deployment

Both deployments will automatically redeploy when you push to your Git repository:

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **Vercel automatically triggers**:
   - Patient deployment rebuild
   - Admin deployment rebuild

3. **Both deployments update** with the same code but different configurations

---

## 🐛 Troubleshooting

### Issue: Routes returning 404 unexpectedly

**Solution**: Check `NEXT_PUBLIC_DEPLOYMENT_TYPE` environment variable is set correctly

### Issue: Firebase authentication not working

**Solution**: Ensure both domains are added to Firebase authorized domains

### Issue: Admin can't access admin panel

**Solution**: 
1. Check user's `role` field in Firestore is set to `'admin'`
2. Verify Firebase security rules allow admin access

### Issue: Styles/layout broken

**Solution**: Clear browser cache and rebuild:
```bash
npm run build
npm start
```

---

## 📝 Maintenance

### Adding New Routes

1. **Patient Route**: Add to `PATIENT_ROUTES` in `middleware.ts` and `src/lib/deployment-config.ts`
2. **Admin Route**: Add to `ADMIN_ROUTES` in `middleware.ts` and `src/lib/deployment-config.ts`

### Updating Environment Variables

1. Update in Vercel project settings
2. Trigger redeployment (or push new commit)

### Monitoring

- Monitor both deployments separately in Vercel dashboard
- Check Firebase usage for both domains
- Review Firebase Authentication logs for security

---

## ✅ Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Both domains added to Firebase authorized domains
- [ ] Patient deployment created on Vercel
- [ ] Patient environment variables configured
- [ ] Patient custom domain configured
- [ ] Admin deployment created on Vercel
- [ ] Admin environment variables configured
- [ ] Admin custom domain configured
- [ ] Test patient deployment (all routes work)
- [ ] Test admin deployment (all routes work)
- [ ] Verify Firebase authentication works on both domains
- [ ] Verify Firestore security rules work correctly
- [ ] Test admin user can access admin panel
- [ ] Test patient user cannot access admin panel
- [ ] Configure DNS records for both domains
- [ ] SSL certificates active for both domains

---

## 🎉 Success!

You now have two separate deployments from a single codebase:

- **Patient Booking System**: Beautiful, user-friendly booking experience
- **Admin Management Panel**: Powerful admin tools for managing appointments

Both sharing the same Firebase backend for seamless data synchronization!

