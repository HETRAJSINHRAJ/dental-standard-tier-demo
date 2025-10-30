# Firebase Setup for Dual Deployment

This guide walks you through setting up Firebase to support both patient and admin deployments.

---

## 🔥 Firebase Project Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `smile-dental-booking`
4. Enable Google Analytics (optional)
5. Click "Create project"

---

## 🔐 Authentication Setup

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

### Step 3: Add Authorized Domains

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for local development)
   - `www.smiledental.com` (patient deployment)
   - `admin.smiledental.com` (admin deployment)
   - `smile-dental-patient.vercel.app` (Vercel preview)
   - `smile-dental-admin.vercel.app` (Vercel preview)

**Important**: Both production domains MUST be added for authentication to work!

---

## 📊 Firestore Database Setup

### Step 4: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Select **Production mode** (we'll add security rules next)
4. Choose a location (e.g., `us-central1`)
5. Click "Enable"

### Step 5: Deploy Security Rules

The project includes comprehensive security rules in `firestore.rules`.

**Deploy via Firebase CLI:**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firestore (first time only)
firebase init firestore
# Select your project
# Use existing firestore.rules file
# Use existing firestore.indexes.json file

# Deploy security rules
firebase deploy --only firestore:rules
```

**Or manually copy rules:**

1. Go to **Firestore Database** → **Rules**
2. Copy content from `firestore.rules` file
3. Click "Publish"

### Step 6: Create Initial Collections

The database will auto-create collections when you seed data, but you can create them manually:

1. Go to **Firestore Database** → **Data**
2. Create these collections:
   - `users` - User profiles
   - `services` - Dental services
   - `providers` - Dentists/providers
   - `provider_schedules` - Provider availability
   - `appointments` - Appointment bookings

---

## 🔑 Get Firebase Configuration

### Step 7: Get Web App Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register app name: `Smile Dental Web`
5. Copy the Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "smile-dental-booking.firebaseapp.com",
  projectId: "smile-dental-booking",
  storageBucket: "smile-dental-booking.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. Use these values in your `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=smile-dental-booking.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=smile-dental-booking
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=smile-dental-booking.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 🔧 Firebase Admin SDK Setup (for Admin Deployment)

### Step 8: Generate Service Account Key

1. Go to **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Click "Generate key" (downloads JSON file)
4. **Keep this file secure!** Never commit to Git

### Step 9: Extract Admin SDK Credentials

From the downloaded JSON file, extract:

```json
{
  "project_id": "smile-dental-booking",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@smile-dental-booking.iam.gserviceaccount.com"
}
```

Add to your admin deployment environment variables:

```env
FIREBASE_ADMIN_PROJECT_ID=smile-dental-booking
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@smile-dental-booking.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Important**: The private key must include `\n` characters for line breaks!

---

## 🌱 Seed Initial Data

### Step 10: Create Admin User

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open browser console and run:
   ```javascript
   await window.seedAdminUser()
   ```

3. Default admin credentials:
   - Email: `admin@smiledental.com`
   - Password: `Admin@123456`

4. **Change password after first login!**

### Step 11: Seed Sample Data

1. In browser console, run:
   ```javascript
   await window.seedFirestoreData()
   ```

2. This creates:
   - Sample dental services
   - Sample providers (dentists)
   - Provider schedules

---

## 🔒 Security Rules Explained

### User Access Control

```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read: if request.auth.uid == userId || isAdmin();
  allow create: if request.auth.uid == userId;
  allow update: if request.auth.uid == userId;
  allow delete: if isAdmin();
}
```

### Admin Access Control

```javascript
// Helper function to check if user is admin
function isAdmin() {
  return isAuthenticated() && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

### Public Read, Admin Write

```javascript
// Services - anyone can read, only admins can modify
match /services/{serviceId} {
  allow read: if true;
  allow create, update, delete: if isAdmin();
}
```

### Appointment Security

```javascript
// Users can only see their own appointments
match /appointments/{appointmentId} {
  allow read: if request.auth.uid == resource.data.userId || isAdmin();
  allow create: if request.auth.uid == request.resource.data.userId;
  allow update: if request.auth.uid == resource.data.userId || isAdmin();
  allow delete: if isAdmin();
}
```

---

## 🧪 Testing Firebase Configuration

### Test Authentication

```javascript
// In browser console
import { auth } from '@/lib/firebase/config';
console.log('Firebase Auth initialized:', auth);
```

### Test Firestore Connection

```javascript
// In browser console
import { db } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const servicesSnapshot = await getDocs(collection(db, 'services'));
console.log('Services count:', servicesSnapshot.size);
```

### Test Security Rules

1. **As Patient**: Try to access admin-only data (should fail)
2. **As Admin**: Try to access all data (should succeed)
3. **Unauthenticated**: Try to create appointment (should fail)

---

## 📊 Firestore Indexes

Some queries require composite indexes. Create them as needed:

### Example: Appointments by User and Date

```javascript
// Firestore will prompt you to create this index when needed
// Or create manually in Firebase Console → Firestore → Indexes

Collection: appointments
Fields:
  - userId (Ascending)
  - appointmentDate (Descending)
```

---

## 🔄 Backup & Recovery

### Enable Automatic Backups

1. Go to **Firestore Database** → **Backups**
2. Click "Enable automatic backups"
3. Choose backup location
4. Set retention period (e.g., 7 days)

### Manual Backup

```bash
# Export all collections
firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d)
```

### Restore from Backup

```bash
# Import from backup
firebase firestore:import gs://your-bucket/backups/20240101
```

---

## 📈 Monitoring & Usage

### Firebase Console Monitoring

1. **Authentication**: Monitor sign-ups, sign-ins, errors
2. **Firestore**: Monitor reads, writes, deletes
3. **Usage**: Track quota usage and costs

### Set Up Alerts

1. Go to **Project Settings** → **Integrations**
2. Enable **Cloud Monitoring**
3. Set up alerts for:
   - High authentication failures
   - Unusual database activity
   - Quota approaching limits

---

## 💰 Cost Optimization

### Free Tier Limits (Spark Plan)

- **Authentication**: 10,000 verifications/month
- **Firestore**: 
  - 50,000 reads/day
  - 20,000 writes/day
  - 20,000 deletes/day
  - 1 GB storage

### Upgrade to Blaze Plan (Pay-as-you-go)

For production, upgrade to Blaze plan:
- No daily limits
- Pay only for what you use
- Set budget alerts

---

## ✅ Firebase Setup Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Authorized domains added (both patient and admin)
- [ ] Firestore database created
- [ ] Security rules deployed
- [ ] Web app configuration obtained
- [ ] Admin SDK service account created
- [ ] Admin user seeded
- [ ] Sample data seeded
- [ ] Security rules tested
- [ ] Backups enabled
- [ ] Monitoring configured
- [ ] Environment variables configured in Vercel

---

## 🐛 Troubleshooting

### Issue: "auth/unauthorized-domain"

**Solution**: Add domain to Firebase authorized domains

### Issue: "permission-denied" in Firestore

**Solution**: Check security rules and user role

### Issue: Admin SDK authentication fails

**Solution**: Verify private key format includes `\n` characters

### Issue: Can't create appointments

**Solution**: Ensure user is authenticated and has correct role

---

## 📞 Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Security Rules**: https://firebase.google.com/docs/firestore/security/get-started
- **Firebase CLI Reference**: https://firebase.google.com/docs/cli

---

**Next Steps**: After completing Firebase setup, proceed to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment instructions.

