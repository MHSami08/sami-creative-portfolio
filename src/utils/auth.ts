// Enhanced authentication system
export class AuthManager {
  private static instance: AuthManager;
  private readonly ADMIN_PASSWORD = "MHSami@2025!"; // More secure password
  private readonly AUTH_KEY = 'mh_dev_auth';
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    try {
      const authData = localStorage.getItem(this.AUTH_KEY);
      if (!authData) return false;

      const { timestamp, authenticated } = JSON.parse(authData);
      const now = Date.now();

      // Check if session has expired
      if (now - timestamp > this.SESSION_DURATION) {
        this.logout();
        return false;
      }

      return authenticated === true;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }

  // Authenticate user
  authenticate(password: string): boolean {
    if (password === this.ADMIN_PASSWORD) {
      const authData = {
        authenticated: true,
        timestamp: Date.now()
      };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
      return true;
    }
    return false;
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  // Get remaining session time in minutes
  getSessionTimeRemaining(): number {
    try {
      const authData = localStorage.getItem(this.AUTH_KEY);
      if (!authData) return 0;

      const { timestamp } = JSON.parse(authData);
      const elapsed = Date.now() - timestamp;
      const remaining = this.SESSION_DURATION - elapsed;

      return Math.max(0, Math.floor(remaining / (60 * 1000)));
    } catch (error) {
      return 0;
    }
  }

  // Extend session
  extendSession(): void {
    if (this.isAuthenticated()) {
      const authData = {
        authenticated: true,
        timestamp: Date.now()
      };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
    }
  }
}

export const useAuth = () => {
  return AuthManager.getInstance();
};