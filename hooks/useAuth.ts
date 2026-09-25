// hooks/useAuth.ts
import { useState, useEffect } from 'react';

export interface AuthSession {
  getToken: () => Promise<string | null>;
  isLoaded: boolean;
}

/**
 * Simple authentication hook to manage tokens without Clerk
 * Stores and retrieves tokens from localStorage
 */
export function useAuth(): { session: AuthSession | null } {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize session from localStorage
    const token = localStorage.getItem('auth_token');
    
    const authSession: AuthSession = {
      getToken: async () => {
        return localStorage.getItem('auth_token');
      },
      isLoaded: true,
    };

    setSession(authSession);
    setIsLoaded(true);
  }, []);

  return { session };
}

/**
 * Set the authentication token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Clear the authentication token
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

/**
 * Get the current stored token
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}
