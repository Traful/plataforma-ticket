import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Evento from './components/evento/Evento';
import Registrar_compra from './components/evento/Registrar_compra';
import Home from './components/menu/Home';
import Bienvenida from './components/menu/Bienvenida';
import RegistroExitoso from './components/menu/RegistroExistoso';
import Footer from './components/Footer';
import "./App.css";
import MpData from './components/Mp/storemp/MpData';

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user.id === null) {
    // Redirige al login si no hay usuario autenticado
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/token/:token" element={<Bienvenida />} />
      <Route path="/registro-exitoso" element={<RegistroExitoso />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/evento" element={<ProtectedRoute><Evento /></ProtectedRoute>} />
      <Route path="/registrar_compra" element={<ProtectedRoute><Registrar_compra /></ProtectedRoute>} />
    </Routes>
  );
}

//<Router basename="/ticket">

function App() {
  return (
    <AuthProvider>
      <Router>
        <MpData>
          <AppRoutes />
        </MpData>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;