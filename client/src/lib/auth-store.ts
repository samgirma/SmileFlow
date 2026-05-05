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
import { login as apiLogin } from './api-service';

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

  /** Authenticate against the backend */
  login: (email: string, password: string) => Promise<void>;

  /** Clear session and redirect to /login */
  logout: () => void;

  /** Restore session from stored JWT on app mount */
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  userRole: null,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const res = await apiLogin(email, password);
      
      localStorage.setItem(config.auth.tokenStorageKey, res.token);
      localStorage.setItem(config.auth.userStorageKey, JSON.stringify(res.user));

      set({
        user: res.user,
        isAuthenticated: true,
        userRole: res.user.role,
        isLoading: false,
      });
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem(config.auth.tokenStorageKey);
    localStorage.removeItem(config.auth.userStorageKey);
    set({ user: null, isAuthenticated: false, userRole: null, isLoading: false });
    
    // Optionally hit the backend logout endpoint in the background
    fetch(`${config.api.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(config.auth.tokenStorageKey) || ''}`,
        'Accept': 'application/json'
      }
    }).catch(() => {});
  },

  checkAuth: async () => {
    const token = localStorage.getItem(config.auth.tokenStorageKey);
    
    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      // Validate token against backend
      const res = await fetch(`${config.api.baseUrl}/user`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem(config.auth.userStorageKey, JSON.stringify(user));
        set({ user, isAuthenticated: true, userRole: user.role, isLoading: false });
      } else {
        throw new Error('Invalid token');
      }
    } catch {
      localStorage.removeItem(config.auth.tokenStorageKey);
      localStorage.removeItem(config.auth.userStorageKey);
      set({ isLoading: false, isAuthenticated: false, user: null, userRole: null });
    }
  },
}));