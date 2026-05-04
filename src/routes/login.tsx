/**
 * Login Page — Mock auth for RBAC testing.
 *
 * TODO [PHP]: On submit, this calls authStore.login() which will POST
 * credentials to Laravel's /api/auth/login endpoint. On success the
 * JWT token is stored and the user is redirected to their role's home.
 */
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SmilePlus, LogIn, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [{ title: 'Sign In — SmileFlow' }],
  }),
  component: LoginPage,
});

/** Map roles to their default landing page after login */
const ROLE_HOME: Record<string, string> = {
  admin: '/',
  dentist: '/my-appointments',
  receptionist: '/check-in',
  patient: '/my-bookings',
};

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const user = useAuthStore.getState().user;
      navigate({ to: ROLE_HOME[user?.role || 'admin'] || '/' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <SmilePlus className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SmileFlow</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@smileflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo credentials */}
        <div className="rounded-xl border border-border bg-muted/50 p-4 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground text-sm mb-2">Demo Accounts</p>
          <p><span className="font-medium">Admin:</span> admin@smileflow.com / admin123</p>
          <p><span className="font-medium">Dentist:</span> dentist@smileflow.com / dentist123</p>
          <p><span className="font-medium">Receptionist:</span> reception@smileflow.com / reception123</p>
          <p><span className="font-medium">Patient:</span> patient@smileflow.com / patient123</p>
        </div>
      </div>
    </div>
  );
}