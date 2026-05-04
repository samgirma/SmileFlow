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
import { SmilePlus, LogIn, AlertCircle, Eye, EyeOff, Github, Chrome } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/src/assets/images/teeth_pic.webp" 
          alt="Dental care" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-500/60 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg mx-auto mb-6">
              <div className="text-4xl">🦷</div>
            </div>
            <h1 className="text-4xl font-bold mb-4">SmileFlow</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Your trusted dental care management system. Streamline appointments, patient records, and practice management.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
              <div className="text-3xl">🦷</div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">SmileFlow</h1>
              <p className="text-white/80 text-sm">Welcome back! Please sign in to continue</p>
            </div>
          </div>

          {/* Glass card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
            
            {/* Desktop Title */}
            <div className="hidden lg:block text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/80 text-sm">Sign in to your account to continue</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/20 p-3 text-sm text-white">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 text-sm font-medium">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-white/80 text-sm">
                  <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                  Remember me
                </label>
                <a href="#" className="text-white/80 text-sm hover:text-white">Forgot password?</a>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 rounded-xl shadow-lg transition-all duration-200" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-xs">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Social Login */}
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-white/80 text-sm">
                Don't have an account? <a href="#" className="text-white font-semibold hover:underline">Sign up</a>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-xs text-white/70 space-y-1">
              <p className="font-semibold text-white text-sm mb-2">Demo Accounts</p>
              <p><span className="font-medium">Admin:</span> admin@smileflow.com / admin123</p>
              <p><span className="font-medium">Dentist:</span> dentist@smileflow.com / dentist123</p>
              <p><span className="font-medium">Receptionist:</span> reception@smileflow.com / reception123</p>
              <p><span className="font-medium">Patient:</span> patient@smileflow.com / patient123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}