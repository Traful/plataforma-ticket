import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Logo from "../assets/img/logo_blanco.png";
import { useAuth } from '../context/AuthContext';
import Loading from './ui/Loading';


const Login = () => {
    const [validating, setValidating] = useState(true);
    const [email, setEmail] = useState('federiconj@gmail.com'); //useState('');
    const [password, setPassword] = useState('fede'); //useState('');
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
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-md border-t-4 border-[#e7ac2a]">
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
                            placeholder="Correo Electrónico"
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
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-4 sm:space-y-0">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold"
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
                        <Link to="/register" className="text-sm font-medium text-[#4baccc] hover:text-[#e7ac2a]">
                            ¿No tienes una cuenta? Regístrate
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;