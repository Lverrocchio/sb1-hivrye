import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { UserProfile } from './UserProfile';
import { UserStats } from './UserStats';
import { UserBookings } from './UserBookings';
import { RecentActivity } from './RecentActivity';
import { UserMessages } from './UserMessages';
import { useUserData } from '../../hooks/useUserData';
import { Loader } from 'lucide-react';

export function DashboardHome() {
  const { stats, messages, bookings, loading, error } = useUserData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <UserProfile />
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
          <UserStats stats={stats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <RecentActivity />
            <UserMessages messages={messages} />
          </div>
          <UserBookings bookings={bookings} />
        </div>
      </div>
    </DashboardLayout>
  );
}