import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { UserProfile } from '../../components/dashboard/UserProfile';
import { UserStats } from '../../components/dashboard/UserStats';
import { UserBookings } from '../../components/dashboard/UserBookings';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { UserMessages } from '../../components/dashboard/UserMessages';

export function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <UserProfile />
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
          <UserStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <RecentActivity />
            <UserMessages />
          </div>
          <UserBookings />
        </div>
      </div>
    </DashboardLayout>
  );
}