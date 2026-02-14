import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import DetectionHistory from './pages/dashboard/History';
import Alerts from './pages/dashboard/Alerts';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';
import LiveDetection from './pages/dashboard/LiveDetection';
import AIInspection from './pages/dashboard/AIInspection';

function App() {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard/*" element={
                    <DashboardLayout>
                        <Routes>
                            <Route index element={<Overview />} />
                            <Route path="history" element={<DetectionHistory />} />
                            <Route path="alerts" element={<Alerts />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="live" element={<LiveDetection />} />
                            <Route path="inspection" element={<AIInspection />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </DashboardLayout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
