import { useEffect, useState } from 'react';
import { HiOutlinePrinter, HiOutlineTrash } from "react-icons/hi";
import { useAuth } from "./../../context/AuthContext";

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

    const handleReimprimir = (id) => {
        // Lógica para reimprimir la credencial
        alert(`Reimprimiendo credencial para la inscripción ${id}`);
    };

    const handleEliminar = (id) => {
        // Lógica para eliminar la inscripción
        alert(`Eliminando inscripción ${id}`);
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-6 text-center text-gray-800">Mis Inscripciones</h4>
            <hr className='mb-6 border-gray-300' />
            <ul className="space-y-4">
                {inscripciones.map((inscripcion) => (
                    <li key={inscripcion.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{inscripcion.nombre} {inscripcion.apellido}</h3>
                            <p className="text-gray-600">DNI: <span className="font-medium">{inscripcion.dni}</span></p>
                            <p className="text-gray-600">Categoría de Edad: <span className="font-medium">{inscripcion.categoria_edad}</span></p>
                        </div>
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                            <button
                                onClick={() => handleReimprimir(inscripcion.id)}
                                className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
                                aria-label="Reimprimir"
                            >
                                <HiOutlinePrinter size={24} />
                            </button>
                            <button
                                onClick={() => handleEliminar(inscripcion.id)}
                                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
                                aria-label="Eliminar"
                            >
                                <HiOutlineTrash size={24} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MisInscripciones;