import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import GigList from './pages/GigList';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<GigList />} />
          <Route path="/gig/:id" element={<GigDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-gig" element={<ProtectedRoute><CreateGig /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
