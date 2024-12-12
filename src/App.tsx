import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ItemDetail } from './pages/ItemDetail';
import { PropertyDetail } from './pages/PropertyDetail';
import { CategoryPage } from './pages/CategoryPage';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { LegalNotices } from './pages/LegalNotices';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { AddItem } from './pages/AddItem';
import { MyItems } from './pages/MyItems';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { useAuth } from './hooks/useAuth';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { initializePersistence } from './services/firebase/persistence';

function App() {
  const { loading, error } = useAuth();

  useEffect(() => {
    initializePersistence();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AuthMiddleware>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/legal" element={<LegalNotices />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/items/new"
              element={
                <PrivateRoute>
                  <AddItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-items"
              element={
                <PrivateRoute>
                  <MyItems />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthMiddleware>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;