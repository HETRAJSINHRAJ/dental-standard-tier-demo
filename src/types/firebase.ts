import { Timestamp } from 'firebase/firestore';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Provider {
  id: string;
  name: string;
  title: string; // e.g., "DDS", "DMD"
  specialty: string;
  bio: string;
  imageUrl: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  serviceIds: string[]; // services this provider offers
  
  // Enhanced fields for production-ready profiles
  rating?: number; // Average rating (0-5)
  totalReviews?: number; // Total number of reviews
  education?: string[]; // e.g., ["Harvard School of Dental Medicine", "UCLA"]
  certifications?: string[]; // e.g., ["Board Certified Orthodontist"]
  languages?: string[]; // e.g., ["English", "Spanish", "French"]
  specializations?: string[]; // Detailed specializations
  acceptingNewPatients?: boolean;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProviderSchedule {
  id: string;
  providerId: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:mm format (e.g., "09:00")
  endTime: string; // HH:mm format (e.g., "17:00")
  breakStartTime?: string;
  breakEndTime?: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  appointmentDate: Timestamp;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BookingData {
  service?: Service;
  provider?: Provider;
  date?: Date;
  time?: string;
  notes?: string;
}