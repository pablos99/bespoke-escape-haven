
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Welcome, {profile?.first_name} {profile?.last_name}
            </span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h3 className="text-xl font-medium mb-2">Properties</h3>
            <p className="text-3xl font-bold">12</p>
            <p className="text-muted-foreground">Total properties</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h3 className="text-xl font-medium mb-2">Users</h3>
            <p className="text-3xl font-bold">87</p>
            <p className="text-muted-foreground">Registered users</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h3 className="text-xl font-medium mb-2">Bookings</h3>
            <p className="text-3xl font-bold">34</p>
            <p className="text-muted-foreground">Active bookings</p>
          </div>
        </div>

        <div className="mt-8 bg-card text-card-foreground rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium">Recent Activity</h2>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
}
