import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Spinner, TextInput, Label } from 'flowbite-react';
import {
    HiOutlineInformationCircle,
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineTicket,
    HiOutlineUserGroup,
    HiOutlineMusicNote
} from 'react-icons/hi';
import Logo from "../assets/img/logo_blanco.png";
import EventoBanner from "../assets/img/festival.jpg";
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

    const features = [
        { icon: HiOutlineTicket, text: "Comprá tus entradas", color: "text-cyan-600" },
        { icon: HiOutlineMusicNote, text: "Shows en vivo", color: "text-amber-500" },
        { icon: HiOutlineUserGroup, text: "Artesanos locales", color: "text-emerald-500" }
    ];

    return (
        <main className="flex-1">
            <div className="min-h-[calc(100vh-64px)] w-full relative bg-gray-100">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={EventoBanner}
                        alt="Festival Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/90 via-cyan-800/50 to-amber-700/20 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full h-full py-8 px-4 md:py-12">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                        {/* Left Section */}
                        <div className="w-full lg:w-1/2 text-white space-y-6 lg:space-y-8">
                            <div className="text-center lg:text-left">
                                <img 
                                    src={Logo} 
                                    alt="Logo" 
                                    className="h-16 md:h-24 mb-4 md:mb-6 mx-auto lg:mx-0" 
                                />
                                <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">
                                    36° Festival Provincial del Artesano
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
                                    Celebrando nuestra cultura y tradiciones
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all"
                                    >
                                        <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color} mb-3 md:mb-4`} />
                                        <p className="text-base md:text-lg font-medium">{feature.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full lg:w-1/2 max-w-md">
                            <Card className="backdrop-blur-xl bg-white/95 shadow-2xl border-none w-full">
                                <div className="space-y-6 md:space-y-8 p-4 md:p-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                                        Bienvenido
                                    </h2>

                                    {error && (
                                        <Alert color="failure" icon={HiOutlineInformationCircle}>
                                            {error}
                                        </Alert>
                                    )}

                                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email" value="Correo Electrónico" />
                                            </div>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                icon={HiOutlineMail}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="password" value="Contraseña" />
                                            </div>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                icon={HiOutlineLockClosed}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                                />
                                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                                    Recordarme
                                                </label>
                                            </div>
                                            <a href="#" className="text-sm text-cyan-600 hover:text-cyan-500">
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>

                                        <Button
                                            type="submit"
                                            gradientDuoTone="cyanToBlue"
                                            className="w-full"
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

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-zinc-100 text-gray-500">O continúa con</span>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <Button color="light" className="w-full">
                                            <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" />
                                            Google
                                        </Button>
                                    </div>

                                    <p className="text-center text-sm text-gray-600">
                                        ¿No tenés cuenta?{' '}
                                        <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
                                            Registrate aquí
                                        </Link>
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;