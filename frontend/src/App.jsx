import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import GigList from './pages/GigList';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<GigList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
