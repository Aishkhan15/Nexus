import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import Joyride, { Step } from 'react-joyride';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, is2FAVerified } = useAuth();
  const [runTour, setRunTour] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!is2FAVerified) return <Navigate to="/2fa" replace />;

  const steps: Step[] = [
    { target: '#sidebar-payments', content: 'Here you can manage all your payments.', placement: 'right' },
    { target: '#sidebar-video', content: 'Start or join video calls from here.', placement: 'right' },
    { target: '#sidebar-meeting', content: 'Schedule meetings with investors or entrepreneurs.', placement: 'right' },
    { target: '#sidebar-docs', content: 'Access your documents and files here.', placement: 'right' },
    { target: '#quick-access-card', content: 'Quick access to your main modules.', placement: 'top' },
  ];

  useEffect(() => {
    const tourDone = localStorage.getItem('dashboardTourDone');
    if (!tourDone) {
      setTimeout(() => setRunTour(true), 500); // wait for DOM to render
    }
  }, []);

  const handleJoyrideCallback = (data: any) => {
    if (data.status === 'finished' || data.status === 'skipped') {
      localStorage.setItem('dashboardTourDone', 'true');
      setRunTour(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{ options: { zIndex: 10000 } }}
      />
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
