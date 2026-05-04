/**
 * =============================================================
 * SmileFlow Auth Store (Zustand)
 * =============================================================
 *
 * Manages global auth state: user, role, JWT token.
 *
 * PHP INTEGRATION NOTES:
 * 1. login() currently uses mock data — replace with real POST /api/auth/login
 * 2. The JWT is stored in localStorage under "sf_token"
 * 3. On app load, checkAuth() validates the stored token
 * 4. The PHP backend should return { user, token, role } on login
 *
 * TODO [PHP]: The backend must include the user's role in the JWT payload
 * or in the login response so the frontend can gate UI accordingly.
 * IMPORTANT: The frontend role check is for UX only — the PHP backend
 * MUST independently verify permissions on every API request.
 * =============================================================
 */

import { create } from 'zustand';
import config from './config/env';

/** Supported RBAC roles — must match PHP backend's Role enum */
export type UserRole = 'admin' | 'dentist' | 'receptionist' | 'patient';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isLoading: boolean;

  /**
   * Authenticate against the backend.
   * TODO [PHP]: POST /api/auth/login with { email, password }
   * Backend returns { user: AuthUser, token: string }
   */
  login: (email: string, password: string) => Promise<void>;

  /** Clear session and redirect to /login */
  logout: () => void;

  /** Restore session from stored JWT on app mount */
  checkAuth: () => void;
}

/**
 * Mock users for development — remove when connecting to PHP backend.
 * Each user demonstrates a different role for testing RBAC.
 */
const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  'admin@smileflow.com': {
    password: 'admin123',
    user: { id: '1', name: 'Dr. Admin', email: 'admin@smileflow.com', role: 'admin' },
  },
  'dentist@smileflow.com': {
    password: 'dentist123',
    user: { id: '2', name: 'Dr. Smith', email: 'dentist@smileflow.com', role: 'dentist' },
  },
  'reception@smileflow.com': {
    password: 'reception123',
    user: { id: '3', name: 'Jane Doe', email: 'reception@smileflow.com', role: 'receptionist' },
  },
  'patient@smileflow.com': {
    password: 'patient123',
    user: { id: '4', name: 'John Patient', email: 'patient@smileflow.com', role: 'patient' },
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  userRole: null,
  isLoading: true,

  login: async (email: string, password: string) => {
    /**
     * TODO [PHP]: Replace this mock block with:
     *
     * const response = await fetch(`${BASE_URL}/auth/login`, {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ email, password }),
     * });
     *
     * if (!response.ok) {
     *   const err = await response.json();
     *   throw new Error(err.message || 'Login failed');
     * }
     *
     * const { user, token } = await response.json();
     * localStorage.setItem('sf_token', token);
     * set({ user, isAuthenticated: true, userRole: user.role, isLoading: false });
     */

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const entry = MOCK_USERS[email];
    if (!entry || entry.password !== password) {
      throw new Error('Invalid email or password');
    }

    const mockToken = `mock-jwt-${entry.user.role}-${Date.now()}`;
    localStorage.setItem(config.auth.tokenStorageKey, mockToken);
    localStorage.setItem(config.auth.userStorageKey, JSON.stringify(entry.user));

    set({
      user: entry.user,
      isAuthenticated: true,
      userRole: entry.user.role,
      isLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem(config.auth.tokenStorageKey);
    localStorage.removeItem(config.auth.userStorageKey);
    set({ user: null, isAuthenticated: false, userRole: null, isLoading: false });
  },

  checkAuth: () => {
    /**
     * TODO [PHP]: Validate the stored token against the backend:
     *
     * const token = localStorage.getItem(config.auth.tokenStorageKey);
     * if (!token) { set({ isLoading: false }); return; }
     *
     * const res = await fetch(`${config.api.baseUrl}/auth/me`, {
     *   headers: { Authorization: `Bearer ${token}` },
     * });
     *
     * if (res.ok) {
     *   const { user } = await res.json();
     *   set({ user, isAuthenticated: true, userRole: user.role, isLoading: false });
     * } else {
     *   localStorage.removeItem(config.auth.tokenStorageKey);
     *   set({ isLoading: false });
     * }
     */
    const stored = localStorage.getItem(config.auth.userStorageKey);
    const token = localStorage.getItem(config.auth.tokenStorageKey);

    if (stored && token) {
      try {
        const user = JSON.parse(stored) as AuthUser;
        set({ user, isAuthenticated: true, userRole: user.role, isLoading: false });
      } catch {
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));