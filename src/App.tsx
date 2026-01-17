import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// Profile Pages
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Feature Pages
import { InvestorsPage } from './pages/investors/InvestorsPage';
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';
import { DealsPage } from './pages/deals/DealsPage';

// Chat Pages
import { ChatPage } from './pages/chat/ChatPage';
import MeetingScheduler from "./pages/meeting/MeetingScheduler";

import VideoDashboard from './pages/video/VideoDashboard';
import { DocumentChamberPage } from './pages/documents/DocumentChamberPage';
import { PaymentsPage } from './pages/payments/PaymentsPage';
import { PaymentsWrapper } from './pages/payments/PaymentsWrapper';
import RoleGuard from './components/RoleGuard';


// Meetings Pages



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Entrepreneur */}
          <Route
            path="/dashboard/entrepreneur"
            element={
              <RoleGuard role="entrepreneur">
                <DashboardLayout />
              </RoleGuard>
            }
          >
            <Route index element={<EntrepreneurDashboard />} />
          </Route>


          {/* Investor */}
          <Route
            path="/dashboard/investor"
            element={
              <RoleGuard role="investor">
                <DashboardLayout />
              </RoleGuard>
            }
          >
            <Route index element={<InvestorDashboard />} />
          </Route>

          {/* KEEP existing routes working */}
          {/* Investor Profile */}
          <Route
            path="/profile/investor/:id"
            element={
              <RoleGuard role="investor">
                <DashboardLayout />
              </RoleGuard>
            }
          >
            <Route index element={<InvestorProfile />} />
          </Route>

          {/* Entrepreneur Profile */}
          <Route
            path="/profile/entrepreneur/:id"
            element={
              <RoleGuard role="entrepreneur">
                <DashboardLayout />
              </RoleGuard>
            }
          >
            <Route index element={<EntrepreneurProfile />} />
          </Route>













          <Route path="/messages" element={<DashboardLayout />}>
            <Route index element={<MessagesPage />} />
          </Route>
          <Route path="/notifications" element={<DashboardLayout />}>
            <Route index element={<NotificationsPage />} />
          </Route>
          <Route path="/documents" element={<DashboardLayout />}>
            <Route index element={<DocumentsPage />} />
          </Route>

          <Route path="/documents/documentChamber" element={<DashboardLayout />}>
            <Route index element={<DocumentChamberPage />} /> </Route>



          <Route path="/chat/:userId?" element={<DashboardLayout />}>
            <Route index element={<ChatPage />} />
          </Route>
          <Route path="/payments" element={<DashboardLayout />}>
            <Route index element={<PaymentsWrapper />} />
          </Route>
          <Route path="/settings" element={<DashboardLayout />}>
            <Route index element={<SettingsPage />} />
          </Route>
          <Route path="/meeting" element={<DashboardLayout />}>
            <Route index element={<MeetingScheduler />} />
          </Route>
          <Route path="/video" element={<DashboardLayout />}>
            <Route index element={<VideoDashboard />} />
          </Route>
          <Route path="/investors" element={<DashboardLayout />}>
            <Route index element={<InvestorsPage />} />
          </Route>
          <Route path="/entrepreneurs" element={<DashboardLayout />}>
            <Route index element={<EntrepreneursPage />} />
          </Route>
          <Route path="/deals" element={<DashboardLayout />}>
            <Route index element={<DealsPage />} />
          </Route>
          <Route path="/help" element={<DashboardLayout />}>
            <Route index element={<HelpPage />} />
          </Route>
          <Route path="/payments" element={<DashboardLayout />}>
            <Route index element={<PaymentsWrapper />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;