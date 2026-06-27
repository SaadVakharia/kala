import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { currentUser, appUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      if (appUser) {
        navigate((location.state as any)?.from?.pathname || '/dashboard', { replace: true });
      } else {
        // Check if it's the very first time (no company exists) or if they just need to wait for profile fetch
        // For MVP, if no appUser, we redirect to setup to check if they should be super admin
        navigate('/setup', { replace: true });
      }
    }
  }, [currentUser, appUser, navigate, location]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      setupRecaptcha();
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`; // Default to India code for MVP
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    
    setError('');
    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      // Auth context will automatically update and trigger the useEffect to redirect
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-primary-foreground">KG</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">Kala Group</CardTitle>
          <CardDescription>
            Workforce Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!confirmationResult ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center px-3 border border-r-0 border-input bg-muted rounded-l-md text-sm text-muted-foreground">
                    +91
                  </div>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter 10 digit number" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="rounded-l-none"
                    disabled={loading}
                  />
                </div>
              </div>
              
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              
              <div id="recaptcha-container"></div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="Enter 6 digit OTP" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  OTP sent to {phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`}
                </p>
              </div>
              
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
              </Button>
              
              <Button 
                type="button" 
                variant="link" 
                className="w-full text-sm"
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
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          Secure Access • Internal Use Only
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
