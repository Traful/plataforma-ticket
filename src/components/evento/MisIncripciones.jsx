import { useEffect, useState } from 'react';
import { useAuth } from "./../../context/AuthContext";
import { HiOutlineTicket, HiSearchCircle, HiOutlineUserCircle } from "react-icons/hi";


const MisInscripciones = () => {
    const [loading, setLoading] = useState(true);
    const [inscripciones, setInscripciones] = useState([]);
    const { user } = useAuth(); // Usa el hook useAuth para obtener la información del usuario

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
            }
        };

        if (user.id) {
            fetchInscripciones().finally(() => setLoading(false));
        }
    }, [user.id]);

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <div className="p-6 mr-1 mb-1 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center space-x-2">
                <HiOutlineTicket size={24} />
                <span>Mis Inscripciones</span>
            </h4>            <hr className='mb-6 border-gray-300' />
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
        </div>
    );
};

export default MisInscripciones;