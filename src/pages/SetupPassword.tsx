import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import logo from '@/assets/logo.png';

const SetupPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, appUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!currentUser || !appUser) {
      setError('You must be logged in to set a password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const phone = currentUser.phoneNumber || `+91${appUser.phone}`;
      const syntheticEmail = `${phone}@kala.local`;

      // Update email if necessary
      if (!currentUser.email || currentUser.email !== syntheticEmail) {
        await updateEmail(currentUser, syntheticEmail);
      }
      
      // Set the password
      await updatePassword(currentUser, password);

      // Update Firestore to indicate password is set
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { passwordSet: true });

      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Error setting password:', err);
      // Firebase throws 'auth/requires-recent-login' if the session is too old,
      // but since they literally just logged in via OTP, it should be fine.
      setError(err.message || 'Failed to set password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-12 relative z-10">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Kala Logo" className="w-24 h-auto object-contain" />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Set Your Password</h2>
          <p className="text-sm text-gray-500 mt-2">Create a secure password for future logins.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">New Password</Label>
            <div className="relative flex items-center shadow-sm rounded-xl">
              <Input 
                type="password"
                placeholder="Enter new password" 
                className="px-4 pr-12 py-7 bg-white border-gray-200 rounded-xl text-lg font-medium focus:border-primary focus:ring-primary transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-4 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Confirm Password</Label>
            <div className="relative flex items-center shadow-sm rounded-xl">
              <Input 
                type="password"
                placeholder="Confirm new password" 
                className="px-4 pr-12 py-7 bg-white border-gray-200 rounded-xl text-lg font-medium focus:border-primary focus:ring-primary transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Lock className="absolute right-4 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5" disabled={loading}>
            {loading ? 'Saving...' : 'Save Password'}
          </Button>
        </form>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>
  );
};

export default SetupPassword;
