import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FaRunning, FaWater, FaTshirt, FaApple } from 'react-icons/fa';
import Logo from "../../assets/img/logo_blanco.png";

const InscripcionExitosa = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#e7ac2a] to-[#4baccc] p-4'>
            <div className="w-full max-w-screen-md p-6 mb-8">
                <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />
            </div>
            <Card className="w-full max-w-screen-md border-t-4 border-[#e7ac2a] shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#00263b]">¡Inscripción Realizada con Éxito!</h2>
                <div className="flex flex-col items-center space-y-4">
                    <FaRunning className="w-20 h-20 text-[#4baccc]" />
                    <p className="font-normal text-[#00263b] text-center text-xl">
                        Felicitaciones, has sido inscripto con éxito.
                    </p>
                    <p className="font-semibold text-[#00263b] text-center text-lg">
                        Te esperamos:
                    </p>
                    <div className="flex items-center space-x-2">
                        <HiOutlineClock className="w-6 h-6 text-[#4baccc]" />
                        <p className="font-bold text-[#4baccc] text-center text-xl">
                            1 de Agosto de 2024 - 08:00hs
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <HiOutlineLocationMarker className="w-6 h-6 text-[#4baccc]" />
                        <p className="font-bold text-[#4baccc] text-center text-xl">
                            Dique las palmeras, San Francisco, Provincia de San Luis
                        </p>
                    </div>
                </div>
                <div className="mt-6 bg-[#4baccc] bg-opacity-10 border border-[#4baccc] text-sm text-[#00263b] rounded-lg p-4" role="alert">
                    <div className="flex items-center mb-2">
                        <HiOutlineExclamationCircle className="w-5 h-5 mr-2 text-[#4baccc]" />
                        <span className="font-semibold">Recomendaciones importantes:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-center">
                            <FaWater className="w-4 h-4 mr-2 text-[#4baccc]" />
                            Mantente hidratado antes, durante y después de la carrera.
                        </li>
                        <li className="flex items-center">
                            <FaTshirt className="w-4 h-4 mr-2 text-[#4baccc]" />
                            Usa ropa cómoda y adecuada para correr.
                        </li>
                        <li className="flex items-center">
                            <FaApple className="w-4 h-4 mr-2 text-[#4baccc]" />
                            Consume un desayuno ligero al menos 2 horas antes de la carrera.
                        </li>
                        <li className="flex items-center">
                            <HiOutlineExclamationCircle className="w-4 h-4 mr-2 text-[#4baccc]" />
                            No olvides llevar tu identificación el día del evento.
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/">
                        <Button
                            className="bg-[#e7ac2a] hover:bg-[#c29525] text-[#00263b] font-bold px-6 py-3 text-lg"
                        >
                            Ir al Inicio
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default InscripcionExitosa;