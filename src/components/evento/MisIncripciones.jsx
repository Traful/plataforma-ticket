import { useEffect, useState } from 'react';
import { useAuth } from "./../../context/AuthContext";
import { HiOutlineTicket, HiOutlineInformationCircle } from "react-icons/hi";
import SkeletonLoader from '../ui/Skeletor';

const MisInscripciones = () => {
    const [loading, setLoading] = useState(true);
    const [inscripciones, setInscripciones] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/inscripciones/${user.id}`, {
                    headers: {
                        'Authorization': user.jwt,
                    }
                });
                const data = await response.json();
                setInscripciones(data.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user.id) {
            fetchInscripciones();
        }
    }, [user.id]);

    return (
        <div className="p-6 mr-1 mb-1 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center space-x-2">
                <HiOutlineTicket size={24} />
                <span>Mis Inscripciones</span>
            </h4>
            <hr className='mb-6 border-gray-300' />
            {loading ? (
                <ul className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50 shadow-sm">
                            <SkeletonLoader />
                        </li>
                    ))}
                </ul>
            ) : inscripciones.length > 0 ? (
                <ul className="space-y-4">
                    {inscripciones.map((inscripcion) => (
                        <li key={inscripcion.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{inscripcion.nombre} {inscripcion.apellido}</h3>
                                <p className="text-gray-600">DNI: <span className="font-medium">{inscripcion.dni}</span></p>
                                <p className="text-gray-600">Categoría de Edad: <span className="font-medium">{inscripcion.categoria_edad}</span></p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                    <HiOutlineInformationCircle className="text-blue-500 w-16 h-16 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Aún no tienes inscripciones</h3>
                    <p className="text-gray-600 text-center">
                        Cuando te inscribas en un evento, tus inscripciones aparecerán aquí.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MisInscripciones;