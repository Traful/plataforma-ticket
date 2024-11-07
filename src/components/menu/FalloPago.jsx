import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Logo from "../../assets/img/logo_blanco.png";

const FalloPago = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-red-500 bg-white/90 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-red-700">¡Error en el Pago!</h2>
                <div className="flex flex-col items-center space-y-4">
                    <HiOutlineExclamationCircle className="w-16 h-16 text-red-500" />
                    <p className="font-normal text-red-700 text-center">
                        Hubo un error al efectuar el pago. Por favor, inténtelo nuevamente.
                    </p>
                    <p className="font-normal text-red-700 text-center">
                        Si el problema persiste, comuníquese con nuestro equipo de soporte.
                    </p>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="bg-red-100 border border-red-500 text-sm text-red-700 rounded-lg p-4 max-w-md">
                        <div className="flex items-center justify-center">
                            <HiOutlineExclamationCircle className="w-5 h-5 mr-2 text-red-500" />
                            <span>Para asistencia, <a href="https://instagram.com/codeo.ar" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">contáctanos aquí</a>.</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <Link to="/">
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold"
                        >
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default FalloPago;

