import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Logo from "../assets/img/logo_blanco.png";
import EventoBanner from "../assets/img/corredor.jpg"; // Asegúrate de tener esta imagen
import { useAuth } from '../context/AuthContext';
import Loading from './ui/Loading';

const Login = () => {
    const [validating, setValidating] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const validateToken = async (valor) => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/user/token/validate/${valor}`);
                const json = await response.json();
                if (json.data) {
                    login(json.data);
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }
        };
        const valor = localStorage.getItem("tikets-token");
        if (valor) {
            validateToken(valor).finally(() => setValidating(false));
        } else {
            setValidating(false);
        }
    }, [login, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;

        const formData = { email, password };
        try {
            const response = await fetch(`${apiUrl}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.ok) {
                    localStorage.setItem("tikets-token", data.data.jwt);
                    login(data.data);
                    navigate('/');
                } else {
                    setError(data.msg || 'Error en el inicio de sesión. Por favor, verifica tus credenciales.');
                }
            } else {
                setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un error de conexión. Por favor, intenta más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    if (validating) return <Loading />;

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#00263b] to-[#004b7a]'>
            <div className="w-full max-w-6xl p-6 mb-2">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain mb-2" />
                <h1 className="text-4xl font-bold text-center text-white mb-2">10K del Maestro</h1>
                <p className="text-xl text-center text-[#e7ac2a] mb-2">¡Sumate a la carrera más esperada del año!</p>
            </div>
            
            <div className="w-full max-w-6xl flex flex-col mb-6 md:flex-row gap-8 px-4">
                <Card className="w-full md:w-1/2 border-t-4 border-[#e7ac2a] bg-white/90 mb-2">
                    <img src={EventoBanner} alt="10K del Maestro" className="w-full h-64 object-cover rounded-t-lg" />
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-[#00263b] mb-4">¿Listo para el desafío?</h2>
                        <p className="text-[#00263b] mb-4">
                            Para inscribirte en la carrera 10K del Maestro, necesitás crear una cuenta. 
                            Si ya tenés una, iniciá sesión para completar tu inscripción.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="w-full">
                                <Button className="w-full bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold">
                                    Crear Cuenta
                                </Button>
                            </Link>
                            <Button 
                                onClick={() => document.getElementById('email').focus()} 
                                className="w-full bg-[#4baccc] hover:bg-[#3a91ae] text-white font-bold"
                            >
                                Ya tengo cuenta
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className="w-full md:w-1/2 border-t-4 border-[#4baccc] bg-white/90 mb-2">
                    <h2 className="text-3xl font-bold text-center mb-6 text-[#00263b]">Iniciar Sesión</h2>
                    {error && (
                        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
                            <span className="font-medium">Error!</span> {error}
                        </Alert>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#00263b] mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#00263b] mb-1">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                placeholder="Tu contraseña"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size="sm" light={true} />
                                    <span className="ml-2">Iniciando sesión...</span>
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;