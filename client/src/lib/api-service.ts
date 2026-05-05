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

import config from './config/env';

/**
 * Get the stored JWT token.
 * PHP/Laravel will issue this token via /api/login endpoint.
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(config.auth.tokenStorageKey);
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
  // Log requests in development mode
  if (config.development.logRequests) {
    console.log(`📡 API Request: ${config.api.baseUrl}${endpoint}`, options);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

  try {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        ...getHeaders(),
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    // Log responses in development mode
    if (config.development.logRequests) {
      console.log(`📡 API Response: ${response.status} ${endpoint}`);
    }

    // Handle 401 - redirect to login (token expired)
    if (response.status === 401) {
      localStorage.removeItem(config.auth.tokenStorageKey);
      localStorage.removeItem(config.auth.userStorageKey);
      window.location.href = '/login';
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
}



// =============================================================
// API METHODS — Each maps to a Laravel route
// =============================================================

/**
 * GET /api/patients
 * TODO [PHP]: return _apiFetch('/patients');
 */
export async function fetchPatients() {
  return _apiFetch('/patients');
}

/**
 * GET /api/patients/:id
 * TODO [PHP]: return _apiFetch(`/patients/${id}`);
 */
export async function fetchPatientById(id: string) {
  return _apiFetch(`/patients/${id}`);
}

/**
 * GET /api/appointments
 * TODO [PHP]: return _apiFetch('/appointments');
 */
export async function fetchAppointments() {
  return _apiFetch('/appointments');
}

/**
 * POST /api/appointments
 * TODO [PHP]: return _apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) });
 */
export async function createAppointment(data: Record<string, unknown>) {
  return _apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) });
}

/**
 * GET /api/workflow
 * TODO [PHP]: return _apiFetch('/workflow');
 */
export async function fetchWorkflowItems() {
  return _apiFetch('/workflow');
}

/**
 * PATCH /api/workflow/:id
 * TODO [PHP]: return _apiFetch(`/workflow/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
 */
export async function updateWorkflowStatus(id: string, status: string) {
  return _apiFetch(`/workflow/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

/**
 * GET /api/treatment-plans/:patientId
 * TODO [PHP]: return _apiFetch(`/treatment-plans/${patientId}`);
 */
export async function fetchTreatmentPlans(patientId?: string) {
  const endpoint = patientId ? `/treatment-plans/${patientId}` : '/treatment-plans';
  return _apiFetch(endpoint);
}

/**
 * POST /api/auth/login
 * TODO [PHP]: Uncomment and use real endpoint
 */
export async function login(email: string, password: string) {
  const res: any = await _apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(config.auth.tokenStorageKey, res.token);
  return res;
}