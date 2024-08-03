import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Button } from 'flowbite-react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import Logo from "../../assets/img/logo_blanco.png";

const Bienvenida = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [cargando, setCargando] = useState(true);
    const [verificacionExitosa, setVerificacionExitosa] = useState(false);

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const response = await fetch(`${apiUrl}/user/register/temp/${token}`);
                if (response.ok) {
                    setVerificacionExitosa(true);
                }
            } catch (error) {
                console.error('Error al verificar el token:', error);
            } finally {
                setCargando(false);
            }
        };
        verificarToken();
    }, [apiUrl, token]);

    const irAInicioSesion = () => {
        navigate('/login');
    };

    if (cargando) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#00263b]">
                <Spinner size="xl" color="warning" />
                <p className="mt-4 text-[#e7ac2a]">Verificando su cuenta...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#00263b]">
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-md border-t-4 border-[#e7ac2a]">
                {verificacionExitosa ? (
                    <>
                        <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h2 className="text-3xl font-bold text-center mb-4 text-[#00263b]">¡Bienvenido!</h2>
                        <p className="text-center text-[#00263b] mb-6">
                            Su cuenta ha sido verificada exitosamente. Ahora puede iniciar sesión.
                        </p>
                    </>
                ) : (
                    <>
                        <HiXCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h2 className="text-3xl font-bold text-center mb-4 text-[#00263b]">Error de Verificación</h2>
                        <p className="text-center text-[#00263b] mb-6">
                            Hubo un problema al verificar su cuenta. Por favor, contacte a soporte.
                        </p>
                    </>
                )}
                <div className="flex justify-center">
                    <Button
                        className="bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold"
                        onClick={irAInicioSesion}
                    >
                        Ir a Iniciar Sesión
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Bienvenida;