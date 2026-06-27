import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Setup: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  
  const { currentUser, appUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSetupStatus = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      if (appUser) {
        // User already exists and has a role, redirect to dashboard
        navigate('/dashboard');
        return;
      }

      try {
        // Check if a company exists
        const companiesSnapshot = await getDocs(collection(db, 'companies'));
        if (!companiesSnapshot.empty) {
          // Company exists, but this user has no profile
          // This means they logged in, but their account hasn't been created by an admin
          auth.signOut();
          alert('Your account has not been set up yet. Please contact your administrator.');
          navigate('/login');
        } else {
          // First time setup!
          setChecking(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking setup status:", error);
        setChecking(false);
        setLoading(false);
      }
    };

    checkSetupStatus();
  }, [currentUser, appUser, navigate]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);

    try {
      // 1. Create company
      const companyId = "KG_COMP_01";
      await setDoc(doc(db, 'companies', companyId), {
        id: companyId,
        name: companyName,
        superAdminId: currentUser.uid,
        createdAt: Date.now()
      });

      // 2. Create Super Admin User profile
      const userProfile = {
        uid: currentUser.uid,
        employeeId: 'KG0001',
        fullName: fullName,
        phone: currentUser.phoneNumber,
        email: email,
        role: 'Super Admin',
        status: 'Active',
        assignedProjects: 'ALL',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastLogin: Date.now()
      };

      await setDoc(doc(db, 'users', currentUser.uid), userProfile);
      
      // Page will reload or AuthContext will trigger re-evaluation
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Error during setup:", error);
      alert('Failed to complete setup. Please try again.');
      setLoading(false);
    }
  };

  if (checking) {
    return <div className="h-screen w-full flex items-center justify-center">Checking system status...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">First Time Setup</CardTitle>
          <CardDescription>
            Welcome to Kala Group! Please set up your company and Super Admin account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                disabled={loading}
                placeholder="e.g. Kala Group"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Super Admin Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input 
                id="phone" 
                value={currentUser?.phoneNumber || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="admin@kalagroup.com"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;
