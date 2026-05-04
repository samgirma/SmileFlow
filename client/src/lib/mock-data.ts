/**
 * =============================================================
 * SmileFlow Mock Data
 * =============================================================
 *
 * PURPOSE: Provide realistic mock data for development.
 * Each array maps to a Laravel Eloquent model/resource.
 *
 * TODO [PHP]: Remove this file entirely once connected to the
 * Laravel API. All data will come from MySQL via Eloquent.
 * =============================================================
 */

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  lastVisit: string;
  nextAppointment: string | null;
  insuranceProvider: string;
  status: 'active' | 'inactive' | 'new';
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'cleaning' | 'filling' | 'extraction' | 'consultation' | 'root-canal' | 'crown';
  dentist: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface WorkflowItem {
  id: string;
  patientId: string;
  patientName: string;
  procedure: string;
  dentist: string;
  time: string;
  stage: 'waiting' | 'in-chair' | 'billing';
  priority: 'normal' | 'urgent';
  waitTime?: number; // minutes
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  procedures: {
    name: string;
    tooth: string;
    cost: number;
    status: 'pending' | 'approved' | 'completed';
    date?: string;
  }[];
  totalCost: number;
  insuranceCoverage: number;
  createdAt: string;
}

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1988-03-15',
    lastVisit: '2026-04-20',
    nextAppointment: '2026-05-10',
    insuranceProvider: 'Delta Dental',
    status: 'active',
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 876-5432',
    dateOfBirth: '1995-11-22',
    lastVisit: '2026-04-28',
    nextAppointment: '2026-05-04',
    insuranceProvider: 'Cigna',
    status: 'active',
  },
  {
    id: 'p3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1972-07-08',
    lastVisit: '2026-03-10',
    nextAppointment: null,
    insuranceProvider: 'Aetna',
    status: 'inactive',
  },
  {
    id: 'p4',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '2001-01-30',
    lastVisit: '2026-05-01',
    nextAppointment: '2026-05-04',
    insuranceProvider: 'MetLife',
    status: 'new',
  },
  {
    id: 'p5',
    name: 'Lisa Park',
    email: 'lpark@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1990-09-12',
    lastVisit: '2026-04-15',
    nextAppointment: '2026-05-08',
    insuranceProvider: 'Delta Dental',
    status: 'active',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    date: '2026-05-04',
    time: '09:00',
    duration: 60,
    type: 'cleaning',
    dentist: 'Dr. Martinez',
    status: 'confirmed',
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    date: '2026-05-04',
    time: '10:30',
    duration: 45,
    type: 'filling',
    dentist: 'Dr. Smith',
    status: 'scheduled',
  },
  {
    id: 'a3',
    patientId: 'p4',
    patientName: 'James Wilson',
    date: '2026-05-04',
    time: '11:00',
    duration: 30,
    type: 'consultation',
    dentist: 'Dr. Martinez',
    status: 'confirmed',
  },
  {
    id: 'a4',
    patientId: 'p5',
    patientName: 'Lisa Park',
    date: '2026-05-04',
    time: '14:00',
    duration: 90,
    type: 'root-canal',
    dentist: 'Dr. Smith',
    status: 'scheduled',
  },
  {
    id: 'a5',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    date: '2026-05-10',
    time: '09:30',
    duration: 60,
    type: 'crown',
    dentist: 'Dr. Martinez',
    status: 'scheduled',
  },
];

export const mockWorkflowItems: WorkflowItem[] = [
  {
    id: 'w1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    procedure: 'Routine Cleaning',
    dentist: 'Dr. Martinez',
    time: '09:00 AM',
    stage: 'in-chair',
    priority: 'normal',
  },
  {
    id: 'w2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    procedure: 'Composite Filling #14',
    dentist: 'Dr. Smith',
    time: '10:30 AM',
    stage: 'waiting',
    priority: 'normal',
    waitTime: 12,
  },
  {
    id: 'w3',
    patientId: 'p4',
    patientName: 'James Wilson',
    procedure: 'New Patient Consultation',
    dentist: 'Dr. Martinez',
    time: '11:00 AM',
    stage: 'waiting',
    priority: 'urgent',
    waitTime: 5,
  },
  {
    id: 'w4',
    patientId: 'p3',
    patientName: 'Emily Rodriguez',
    procedure: 'Root Canal #19',
    dentist: 'Dr. Smith',
    time: '08:30 AM',
    stage: 'billing',
    priority: 'normal',
  },
  {
    id: 'w5',
    patientId: 'p5',
    patientName: 'Lisa Park',
    procedure: 'Crown Prep #30',
    dentist: 'Dr. Martinez',
    time: '02:00 PM',
    stage: 'waiting',
    priority: 'normal',
    waitTime: 0,
  },
];

export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: 'tp1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    procedures: [
      { name: 'Porcelain Crown', tooth: '#14', cost: 1200, status: 'approved', date: '2026-05-10' },
      { name: 'Deep Cleaning', tooth: 'Full', cost: 350, status: 'completed', date: '2026-04-20' },
      { name: 'Composite Filling', tooth: '#18', cost: 250, status: 'pending' },
    ],
    totalCost: 1800,
    insuranceCoverage: 1100,
    createdAt: '2026-04-01',
  },
  {
    id: 'tp2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    procedures: [
      { name: 'Composite Filling', tooth: '#14', cost: 280, status: 'approved', date: '2026-05-04' },
      { name: 'Sealant Application', tooth: '#3, #14', cost: 150, status: 'pending' },
    ],
    totalCost: 430,
    insuranceCoverage: 320,
    createdAt: '2026-04-28',
  },
  {
    id: 'tp3',
    patientId: 'p4',
    patientName: 'James Wilson',
    procedures: [
      { name: 'Full Exam + X-Rays', tooth: 'Full', cost: 200, status: 'approved', date: '2026-05-04' },
      { name: 'Cleaning', tooth: 'Full', cost: 150, status: 'pending' },
      { name: 'Wisdom Tooth Extraction', tooth: '#1, #16', cost: 800, status: 'pending' },
    ],
    totalCost: 1150,
    insuranceCoverage: 700,
    createdAt: '2026-05-01',
  },
];