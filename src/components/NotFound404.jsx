import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiOutlineArrowLeft } from 'react-icons/hi';
import Logo from "../assets/img/logo_blanco.png";

const NotFound = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-red-500">
                <h2 className="text-3xl font-bold text-center mb-6 text-red-700">Página No Encontrada</h2>
                <div className="flex flex-col items-center space-y-4">
                    <HiOutlineExclamationCircle className="w-16 h-16 text-red-500" />
                    <p className="font-normal text-red-700 text-center">
                        La página que está buscando no existe.
                    </p>
                    <p className="font-normal text-red-700 text-center">
                        Es posible que haya escrito mal la dirección o que la página se haya movido.
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Link to="/">
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold"
                        >
                            <HiOutlineArrowLeft className="w-5 h-5 mr-2" />
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default NotFound;