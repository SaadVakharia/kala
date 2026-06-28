import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, MapPin, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { appUser } = useAuth();

  // Mock data for MVP
  const stats = [
    { name: 'Total Employees', value: '142', icon: Users, color: 'bg-blue-500' },
    { name: 'Active Projects', value: '12', icon: Briefcase, color: 'bg-primary' },
    { name: 'Active Sites', value: '28', icon: MapPin, color: 'bg-green-500' },
    { name: 'Pending Approvals', value: '5', icon: CheckCircle, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {appUser?.fullName}! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className={`${stat.color} p-2 rounded-full text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Material Request #{1000 + i} approved
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Project Alpha - Site {i}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {i * 2}h ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {['Add New User', 'Create Project', 'Assign Site Supervisor', 'Generate Report'].map((action, i) => (
              <Button key={i} variant="outline" className="w-full justify-start h-12">
                {action}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
