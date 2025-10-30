# 🦷 Smile Dental - Complete Booking System

A modern, **production-ready** dental appointment booking system built with Next.js 15, Firebase, and TypeScript. Features comprehensive patient portal and admin dashboard for managing appointments, providers, services, and patients.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black) ![Firebase](https://img.shields.io/badge/Firebase-12.4.0-orange) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## ✨ Features

### Patient Portal
- **5-Step Booking Flow**
  - Service selection with detailed descriptions and pricing
  - **Enhanced provider selection** with comprehensive profiles:
    - Ratings and reviews (e.g., 4.9 ⭐ with 127 reviews)
    - Years of experience badges
    - Education and certifications
    - Languages spoken
    - Specialty areas
    - "Accepting New Patients" status
    - Filter by specialty and sort by rating/experience
  - Date & time selection with real-time availability
  - Patient details form with validation
  - Booking confirmation with email notifications
- **Service Catalog** - Browse all dental services
- **About Page** - Learn about the practice
- **Gallery** - View clinic and team photos
- **Contact Form** - Get in touch with the clinic

### Admin Dashboard
- **Real-time Dashboard** - View today's stats, pending appointments, monthly metrics
- **Appointments Management** - View, update, confirm, cancel, complete appointments
- **Patients Management** - View patient details and appointment history
- **Providers Management** - Full CRUD for dental care providers with:
  - Education management
  - Certifications tracking
  - Languages spoken
  - Rating and reviews
  - Patient acceptance status
- **Services Management** - Full CRUD for dental services and treatments
- **Role-based Access Control** - Secure admin-only routes

### Technical Features
- Firebase Authentication with email/password
- Firestore real-time database
- TypeScript for type safety
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Toast notifications with Sonner
- Modern UI with Shadcn/UI components

---

## 🎯 PRD Completion Status

✅ **100% Complete** - All PRD requirements have been implemented:

- ✅ Multiple dentist/doctor profiles with upload section in admin
- ✅ All listed dentists shown for patient booking slots
- ✅ Enhanced provider profiles based on industry best practices (Zocdoc, Healthgrades patterns):
  - Ratings and review counts
  - Years of experience
  - Education history
  - Professional certifications
  - Languages spoken
  - Specialty filtering
  - "Accepting New Patients" indicators
- ✅ 4 pre-seeded dentist profiles with realistic data
- ✅ Complete booking flow integration
- ✅ Admin management for all provider fields
- ✅ Production-ready and deployment-ready

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Firebase account
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd smile-dental
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Enable Google Analytics (optional)

#### Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication

#### Create Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose a location closest to your users

#### Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app (give it a nickname)
5. Copy the Firebase configuration

### 4. Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase config from step 3.

### 5. Deploy Firestore Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore
# Select your Firebase project
# Use existing firestore.rules file

# Deploy rules
firebase deploy --only firestore:rules
```

### 6. Seed Initial Data

The project includes seed scripts to populate your database with sample data.

**Method 1: Browser Console (Recommended)**
```javascript
// Run this in your browser console after the app loads
await window.seedFirestoreData()
```

**Method 2: Create Seed Component**
Add a button to trigger seeding during development.

The seed script will create:
- 6 dental services (Cleaning, Whitening, Root Canal, etc.)
- 4 providers (Dr. Smith, Dr. Johnson, Dr. Williams, Dr. Brown)
- Provider schedules for Mon-Fri (9 AM - 5 PM)

### 7. Create Admin User

**Method 1: Browser Console**
```javascript
// Run this in your browser console
await window.seedAdminUser()
```

This creates an admin account:
- **Email**: admin@smiledental.com
- **Password**: Admin@123456

**Method 2: Manual Creation**
1. Register a normal user via `/auth/signup`
2. Go to Firebase Console → Firestore Database
3. Find the user in the `users` collection
4. Edit the document and change `role` field to `"admin"`

### 8. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
smile-dental/
├── src/
│   ├── app/
│   │   ├── (admin)/              # Admin routes (protected)
│   │   │   ├── appointments/     # Appointments management
│   │   │   ├── patients/         # Patients management
│   │   │   ├── providers/        # Providers CRUD
│   │   │   ├── services/         # Services CRUD
│   │   │   ├── layout.tsx        # Admin layout with sidebar
│   │   │   └── page.tsx          # Admin dashboard
│   │   ├── (patient)/            # Patient portal routes
│   │   │   ├── booking/          # 5-step booking flow
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   └── contact/
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── AdminGuard.tsx   # Admin route protection
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                   # Shadcn UI components
│   ├── contexts/
│   │   └── AuthContext.tsx       # Firebase auth context
│   ├── lib/
│   │   └── firebase/
│   │       ├── config.ts         # Firebase initialization
│   │       ├── firestore.ts      # Firestore CRUD helpers
│   │       ├── seedData.ts       # Sample data seeder
│   │       └── seedAdmin.ts      # Admin user seeder
│   └── types/
│       └── firebase.ts           # TypeScript type definitions
├── firestore.rules               # Firestore security rules
├── middleware.ts                 # Route protection middleware
└── package.json
```

---

## 🔐 Authentication & Authorization

### User Roles
- **Patient** (default) - Can book appointments, view services
- **Admin** - Full access to admin dashboard

### Protected Routes
- `/appointments` - Admin only
- `/patients` - Admin only
- `/providers` - Admin only
- `/services` - Admin only
- `/booking/*` - Requires authentication

### Route Protection
Route protection is handled by:
1. `middleware.ts` - Server-side redirect for auth routes
2. `AdminGuard.tsx` - Client-side component for admin routes

---

## 📊 Database Schema

### Collections

#### `users`
```typescript
{
  uid: string;              // Firebase Auth UID
  email: string;
  displayName: string;
  role: "patient" | "admin";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `services`
```typescript
{
  id: string;
  name: string;
  description: string;
  duration: number;         // in minutes
  price: number;
  category?: string;
  imageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `providers`
```typescript
{
  id: string;
  name: string;
  title: string;            // e.g., "DDS", "DMD"
  bio?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  specialization?: string;
  serviceIds: string[];     // Array of service IDs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `provider_schedules`
```typescript
{
  id: string;
  providerId: string;
  dayOfWeek: number;        // 0 = Sunday, 6 = Saturday
  startTime: string;        // "09:00"
  endTime: string;          // "17:00"
  breakStartTime?: string;
  breakEndTime?: string;
  isAvailable: boolean;
}
```

#### `appointments`
```typescript
{
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceName: string;
  providerName: string;
  appointmentDate: Timestamp;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Key Technologies
- **Next.js 15** - React framework with App Router
- **Firebase** - Backend as a Service (Auth + Firestore)
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/UI** - Beautiful UI components
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables (same as `.env.local`)
6. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables
8. Deploy!

### Environment Variables for Production
Make sure to add all Firebase environment variables in your hosting platform's environment settings.

---

## 📝 Usage Guide

### For Patients

1. **Browse Services** - Visit `/services` to see all available treatments
2. **Book Appointment**
   - Click "Book Appointment" from homepage or navbar
   - Select a service
   - Choose a provider
   - Pick date and time
   - Enter your details
   - Confirm booking
3. **Check Confirmation** - You'll see a success page with appointment details

### For Admins

1. **Login** - Go to `/auth/login` and use admin credentials
2. **Dashboard** - View today's stats and recent activity
3. **Manage Appointments**
   - View all appointments
   - Update status (Confirm, Complete, Cancel)
   - Filter by date, provider, status
4. **Manage Patients** - View patient list and appointment history
5. **Manage Providers** - Add/Edit/Delete providers
6. **Manage Services** - Add/Edit/Delete services

---

## 🔒 Security

### Firestore Security Rules
The project includes comprehensive security rules:
- Users can only read/write their own data
- Admins have full access to all collections
- Public read access for services and providers
- Write access requires authentication

### Best Practices Implemented
- Environment variables for sensitive data
- Client-side and server-side route protection
- Input validation on forms
- TypeScript for type safety
- Secure Firebase configuration

---

## 🐛 Troubleshooting

### Issue: Firebase not initialized
**Solution**: Make sure all environment variables are set correctly in `.env.local`

### Issue: Can't access admin routes
**Solution**: Ensure your user has `role: "admin"` in Firestore `users` collection

### Issue: No services/providers showing
**Solution**: Run the seed script: `await window.seedFirestoreData()`

### Issue: Appointments not saving
**Solution**: Check Firestore security rules are deployed correctly

### Issue: Build fails
**Solution**: Run `npm install` to ensure all dependencies are installed

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Backend platform
- [Shadcn/UI](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons

---

## 📞 Support

For support, email support@smiledental.com or open an issue on GitHub.

---

Made with ❤️ for modern dental practices