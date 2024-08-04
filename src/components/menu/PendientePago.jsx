import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiOutlineSupport } from 'react-icons/hi';
import Logo from "../../assets/img/logo_blanco.png";

const PendientePago = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-yellow-500">
                <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">Pago Pendiente</h2>
                <div className="flex flex-col items-center space-y-4">
                    <HiOutlineExclamationCircle className="w-16 h-16 text-yellow-500" />
                    <p className="font-normal text-yellow-700 text-center">
                        Su pago está pendiente. Por favor, espere un momento mientras se procesa.
                    </p>
                    <p className="font-normal text-yellow-700 text-center">
                        Si el pago no se refleja en unos minutos, comuníquese con nuestro equipo de soporte.
                    </p>
                </div>
                <div className="mt-4 bg-yellow-100 border border-yellow-500 text-sm text-yellow-700 rounded-lg p-4" role="alert">
                    <div className="flex items-center">
                        <HiOutlineSupport className="w-5 h-5 mr-2 text-yellow-500" />
                        <span>Para asistencia, contáctenos al correo de soporte: soporte@vivisanfrancisco.com</span>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Link to="/">
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
                        >
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default PendientePago;