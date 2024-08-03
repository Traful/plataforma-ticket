import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, Button, Card, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Logo from "../assets/img/logo_blanco.png";
import useForm from './utils';

const Register = () => {
    const navigate = useNavigate();
    const [dataUser, cambiarValores] = useForm({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setIsLoading(true);

        if (dataUser.password !== dataUser.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setIsLoading(false);
            return;
        }

        const userDataToSend = {
            firstname: dataUser.firstname,
            lastname: dataUser.lastname,
            email: dataUser.email,
            password: dataUser.password
        };

        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToSend),
            });

            if (response.ok) {
                navigate('/registro-exitoso');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un error de conexión. Por favor, intenta más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-[#00263b]'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-[#e7ac2a]">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#00263b]">Crear una nueva cuenta</h2>
                {error && (
                    <Alert color="failure" icon={HiInformationCircle} className="mb-4">
                        <span className="font-medium">Error!</span> {error}
                    </Alert>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-[#00263b]">Datos Personales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-medium text-[#00263b] mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={dataUser.firstname}
                                    onChange={cambiarValores}
                                    className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                    placeholder="Nombre Completo"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-[#00263b] mb-1">Apellido</label>
                                <input
                                    type="tel"
                                    id="lastname"
                                    name='lastname'
                                    value={dataUser.lastname}
                                    onChange={cambiarValores}
                                    className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                    placeholder="Apellido"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="border-[#4baccc]" />
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-[#00263b]">Información de Cuenta</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-[#00263b] mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    value={dataUser.email}
                                    onChange={cambiarValores}
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
                                    name='password'
                                    value={dataUser.password}
                                    onChange={cambiarValores}
                                    className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#00263b] mb-1">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name='confirmPassword'
                                    value={dataUser.confirmPassword}
                                    onChange={cambiarValores}
                                    className="block w-full px-3 py-2 bg-white border border-[#4baccc] rounded-md shadow-sm focus:outline-none focus:ring-[#e7ac2a] focus:border-[#e7ac2a]"
                                    placeholder="Confirmar Contraseña"
                                    required
                                />
                            </div>
                        </div>
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
                                    <span className="ml-2">Registrando...</span>
                                </>
                            ) : (
                                'Registrarse'
                            )}
                        </Button>
                        <Link to="/login" className="text-sm font-medium text-[#4baccc] hover:text-[#e7ac2a]">
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;