import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isAdminDeployment } from "@/lib/deployment-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Deployment-specific metadata
const isAdmin = isAdminDeployment();

export const metadata: Metadata = {
  title: isAdmin
    ? "Smile Dental - Admin Panel"
    : "Smile Dental - Your Trusted Dental Care Partner",
  description: isAdmin
    ? "Admin management panel for Smile Dental booking system."
    : "Experience exceptional dental care with our expert team. From routine checkups to smile transformations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only show Navbar and Footer in patient deployment
  const showPatientLayout = !isAdmin;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {showPatientLayout && <Navbar />}
          <main className={showPatientLayout ? "min-h-screen" : ""}>
            {children}
          </main>
          {showPatientLayout && <Footer />}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}