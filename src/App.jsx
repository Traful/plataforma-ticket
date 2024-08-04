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
import MisInscripciones from './components/evento/MisIncripciones';
import FalloPago from './components/menu/FalloPago';
import PendientePago from './components/menu/PendientePago';
import Loading from './components/ui/Loading';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user.id === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/token/:token" element={<Bienvenida />} />
      <Route path="/registro-exitoso" element={<RegistroExitoso />} />
      <Route path="/fallo-pago" element={<FalloPago />} />
      <Route path="/pendiente-pago" element={<PendientePago />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
        <Route index element={<Evento />} />
        <Route path="registrar_compra" element={<Registrar_compra />} />
        <Route path="mis_inscripciones" element={<MisInscripciones />} />
      </Route>
    </Routes>
  );
}

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