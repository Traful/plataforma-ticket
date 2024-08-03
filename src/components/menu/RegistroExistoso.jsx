import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { HiOutlineMail, HiOutlineExclamationCircle } from 'react-icons/hi';
import Logo from "../../assets/img/logo_blanco.png";

const RegistroExitoso = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-[#00263b]'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-[#e7ac2a]">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#00263b]">¡Registro Exitoso!</h2>
                <div className="flex flex-col items-center space-y-4">
                    <HiOutlineMail className="w-16 h-16 text-[#4baccc]" />
                    <p className="font-normal text-[#00263b] text-center">
                        Se ha enviado un enlace de verificación a su correo electrónico.
                    </p>
                    <p className="font-normal text-[#00263b] text-center">
                        Por favor, verifique su cuenta para poder ingresar al sistema.
                    </p>
                </div>
                <div className="mt-4 bg-[#4baccc] bg-opacity-10 border border-[#4baccc] text-sm text-[#00263b] rounded-lg p-4" role="alert">
                    <div className="flex items-center">
                        <HiOutlineExclamationCircle className="w-5 h-5 mr-2 text-[#4baccc]" />
                        <span>Si no recibe el correo en unos minutos, revise su carpeta de spam.</span>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Link to="/login">
                        <Button
                            className="bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold"
                        >
                            Ir a Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegistroExitoso;