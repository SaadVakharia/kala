import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, type ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, Lock, User } from 'lucide-react';
import logo from '@/assets/logo.png';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'otp' | 'password'>('otp');
  const [password, setPassword] = useState('');

  const { currentUser, appUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (currentUser && !authLoading) {
      if (appUser && appUser.passwordSet === false) {
        navigate('/setup-password', { replace: true });
      } else if (appUser) {
        navigate(from, { replace: true });
      }
    }
  }, [currentUser, appUser, authLoading, navigate, from]);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const formattedNumber = `+91${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP. Please try again.");
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        // Navigation is handled by useEffect after checking passwordSet
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const syntheticEmail = `+91${phoneNumber}@kala.local`;
      await signInWithEmailAndPassword(auth, syntheticEmail, password);
      // Navigation is handled by useEffect
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
         setError("Invalid credentials. If this is your first time, please use OTP Login to create a password.");
      } else {
         setError(err.message || "Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">

      {/* Left side - Branding (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-50 items-center justify-center overflow-hidden border-r border-gray-200">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 flex flex-col items-center px-12 text-center space-y-6">
          <div className="p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 backdrop-blur-sm">
            <img src={logo} alt="Kala Logo" className="w-48 h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 relative">
        {/* Mobile Logo */}
        <div className="flex lg:hidden justify-center mb-10">
          <img src={logo} alt="Kala Logo" className="w-32 h-auto object-contain" />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to your unified account</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl mb-10 border border-gray-200">
            <button
              onClick={() => setActiveTab('otp')}
              className={`flex-1 flex items-center justify-center py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'otp' ? 'bg-white text-primary shadow-sm border border-gray-200 scale-[1.02]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              OTP Login
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 flex items-center justify-center py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'password' ? 'bg-white text-primary shadow-sm border border-gray-200 scale-[1.02]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              <Lock className="w-4 h-4 mr-2" />
              Password Login
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100 shadow-inner">
              <User className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium border border-red-100 flex items-center justify-center">
              {error}
            </div>
          )}

          {/* Form Area */}
          {activeTab === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mobile Number</Label>
                <div className="relative flex items-center shadow-sm rounded-xl">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-4 bg-gray-50 border-r border-gray-200 rounded-l-xl text-sm font-bold text-gray-700">
                    +91
                  </div>
                  <Input 
                    type="tel"
                    placeholder="Enter mobile number" 
                    className="pl-[4.5rem] pr-12 py-7 bg-white border-gray-200 rounded-xl text-lg font-medium focus:border-primary focus:ring-primary transition-colors"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                  <Smartphone className="absolute right-4 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</Label>
                <div className="relative flex items-center shadow-sm rounded-xl">
                  <Input 
                    type="password"
                    placeholder="Enter your password" 
                    className="px-4 pr-12 py-7 bg-white border-gray-200 rounded-xl text-lg font-medium focus:border-primary focus:ring-primary transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute right-4 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:-translate-y-0.5" disabled={loading}>
                {loading ? 'Logging in...' : 'Login with Password'}
              </Button>
            </form>
          ) : !confirmationResult ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mobile Number</Label>
                <div className="relative flex items-center shadow-sm rounded-xl">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-4 bg-gray-50 border-r border-gray-200 rounded-l-xl text-sm font-bold text-gray-700">
                    +91
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    className="pl-[4.5rem] pr-12 py-7 bg-white border-gray-200 rounded-xl text-lg font-medium focus:border-primary focus:ring-primary transition-colors"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                  <Smartphone className="absolute right-4 text-gray-400 w-5 h-5" />
                </div>
                <p className="text-[11px] text-gray-500 font-medium px-1 pt-1">You will receive a 6-digit OTP for verification.</p>
              </div>

              <div id="recaptcha-container"></div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:-translate-y-0.5" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Enter OTP</Label>
                <Input
                  type="text"
                  placeholder="• • • • • •"
                  className="py-7 bg-white border-gray-200 rounded-xl text-2xl text-center tracking-[1em] font-bold shadow-sm focus:border-primary focus:ring-primary transition-colors"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                />
                <p className="text-[11px] text-gray-500 font-medium text-center pt-1">Code sent to +91 {phoneNumber}</p>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:-translate-y-0.5" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl py-6"
                onClick={() => {
                  setConfirmationResult(null);
                  setOtp('');
                  setError('');
                }}
                disabled={loading}
              >
                Change Phone Number
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
