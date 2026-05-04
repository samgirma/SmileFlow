/**
 * =============================================================
 * SmileFlow API Service Layer
 * =============================================================
 *
 * PURPOSE: Centralized data-fetching service with JWT interceptor.
 * All components consume data through this service.
 *
 * PHP INTEGRATION NOTES:
 * 1. Replace BASE_URL with your Laravel API URL (e.g., "https://api.smileflow.com/v1")
 * 2. The JWT token is read from localStorage("sf_token")
 * 3. All responses follow { data, message, status } shape from Laravel
 * 4. Error handling maps Laravel validation errors to form-friendly format
 *
 * When connecting to PHP backend:
 * - Remove the mock data imports
 * - Uncomment the fetch() calls
 * - Ensure CORS is configured on the Laravel side
 * =============================================================
 *
 * AXIOS INTERCEPTOR SETUP (for PHP integration):
 * =============================================================
 *
 * When switching from fetch() to Axios, set up interceptors like this:
 *
 * import axios from 'axios';
 *
 * const api = axios.create({ baseURL: BASE_URL });
 *
 * // REQUEST INTERCEPTOR — auto-attach JWT Bearer token
 * api.interceptors.request.use((config) => {
 *   const token = localStorage.getItem('sf_token');
 *   if (token) {
 *     config.headers.Authorization = `Bearer ${token}`;
 *   }
 *   return config;
 * });
 *
 * // RESPONSE INTERCEPTOR — handle auth failures
 * // The PHP backend returns 401 when the JWT is expired/invalid,
 * // and 403 Forbidden when the token's role doesn't have permission
 * // for the requested resource (e.g., a 'patient' role calling
 * // DELETE /api/admin/users). The frontend should redirect accordingly.
 * api.interceptors.response.use(
 *   (response) => response,
 *   (error) => {
 *     if (error.response?.status === 401) {
 *       localStorage.removeItem('sf_token');
 *       window.location.href = '/login';
 *     }
 *     if (error.response?.status === 403) {
 *       window.location.href = '/unauthorized';
 *     }
 *     return Promise.reject(error);
 *   }
 * );
 *
 */

import { mockPatients, mockAppointments, mockWorkflowItems, mockTreatmentPlans } from './mock-data';

// TODO [PHP]: Replace with your Laravel API base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Get the stored JWT token.
 * PHP/Laravel will issue this token via /api/login endpoint.
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sf_token');
}

/**
 * Build headers with JWT Bearer token for authenticated requests.
 * Compatible with Laravel Sanctum / Passport token auth.
 */
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    // TODO [PHP]: This Bearer token is validated by Laravel auth:api middleware
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Generic fetch wrapper with error handling.
 * TODO [PHP]: Uncomment this when connecting to the Laravel backend.
 */
async function _apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  // Handle 401 - redirect to login (token expired)
  if (response.status === 401) {
    localStorage.removeItem('sf_token');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * Simulate network delay for mock data (remove when using real API)
 */
function mockDelay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// =============================================================
// API METHODS — Each maps to a Laravel route
// =============================================================

/**
 * GET /api/patients
 * TODO [PHP]: return _apiFetch('/patients');
 */
export async function fetchPatients() {
  return mockDelay(mockPatients);
}

/**
 * GET /api/patients/:id
 * TODO [PHP]: return _apiFetch(`/patients/${id}`);
 */
export async function fetchPatientById(id: string) {
  const patient = mockPatients.find(p => p.id === id);
  return mockDelay(patient || null);
}

/**
 * GET /api/appointments
 * TODO [PHP]: return _apiFetch('/appointments');
 */
export async function fetchAppointments() {
  return mockDelay(mockAppointments);
}

/**
 * POST /api/appointments
 * TODO [PHP]: return _apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) });
 */
export async function createAppointment(data: Record<string, unknown>) {
  console.log('[API] POST /appointments', data);
  return mockDelay({ id: crypto.randomUUID(), ...data });
}

/**
 * GET /api/workflow
 * TODO [PHP]: return _apiFetch('/workflow');
 */
export async function fetchWorkflowItems() {
  return mockDelay(mockWorkflowItems);
}

/**
 * PATCH /api/workflow/:id
 * TODO [PHP]: return _apiFetch(`/workflow/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
 */
export async function updateWorkflowStatus(id: string, status: string) {
  console.log(`[API] PATCH /workflow/${id}`, { status });
  return mockDelay({ id, status });
}

/**
 * GET /api/treatment-plans/:patientId
 * TODO [PHP]: return _apiFetch(`/treatment-plans/${patientId}`);
 */
export async function fetchTreatmentPlans(patientId?: string) {
  if (patientId) {
    return mockDelay(mockTreatmentPlans.filter(tp => tp.patientId === patientId));
  }
  return mockDelay(mockTreatmentPlans);
}

/**
 * POST /api/auth/login
 * TODO [PHP]: Uncomment and use real endpoint
 */
export async function login(email: string, _password: string) {
  // TODO [PHP]: const res = await _apiFetch('/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ email, password }),
  // });
  // localStorage.setItem('sf_token', res.token);
  // return res;
  console.log('[API] POST /auth/login', { email });
  const mockToken = 'mock-jwt-token-' + Date.now();
  localStorage.setItem('sf_token', mockToken);
  return mockDelay({ token: mockToken, user: { email, name: 'Dr. Smith' } });
}