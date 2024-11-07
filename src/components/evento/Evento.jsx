import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/corredor.jpg";
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import SkeletonLoader from '../ui/Skeletor';

const Evento = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.jwt) {
            setLoading(false);
            setError('Usuario no autenticado.');
        }
    }, [user]);

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
                    <h2 className="text-2xl font-semibold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <p className="text-gray-700">Si consideras que hubo un error, por favor <a href="https://instagram.com/codeo.ar" className="text-blue-500 hover:text-blue-700 underline">contáctanos</a>.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-0 mr-1">
            <div className="mx-auto mb-2 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    <img src={Logo} alt="10k del Maestro" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white">10K Del Maestro</h1>
                </div>
            </div>
            <div className="mx-auto mb-1 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 text-center">
                    <p className="text-gray-700 mb-6">Prepárate para la nueva Edición del 10K Del Maestro, organizado por el Municipio de San Francisco.</p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <EventInfo icon={HiOutlineCalendar} title="Fecha y Hora" info="8 de Septiembre de 2024 - 09:00hs." />
                        <EventInfo icon={HiOutlineLocationMarker} title="Ubicación" info="Dique las palmeras, San Francisco, Provincia de San Luis." />
                        <EventInfo icon={HiOutlineClock} title="Cierre de Inscripciones" info="Miércoles 4 de Septiembre de 2024" />
                    </div>

                    <hr className="border-gray-300 my-8" />
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-[#00263b]">Inscripciones finalizadas</h2>
                        <p className="text-gray-700 mb-6">Por cualquier duda, por favor <a href="https://instagram.com/codeo.ar" className="text-blue-500 hover:text-blue-700 underline">contáctanos</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventInfo = ({ icon: Icon, title, info }) => (
    <div className="flex items-start">
        <Icon className="text-2xl text-[#4baccc] mr-3 mt-1" />
        <div>
            <h2 className="text-lg font-semibold text-[#00263b] mb-1">{title}</h2>
            <p className="text-gray-700">{info}</p>
        </div>
    </div>
);

export default Evento;
