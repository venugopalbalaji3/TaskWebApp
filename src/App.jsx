import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
