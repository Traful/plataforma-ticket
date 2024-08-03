import { useEffect, useState } from 'react';
import { HiOutlinePrinter, HiOutlineTrash } from "react-icons/hi";
import {  useAuth } from "./../../context/AuthContext";

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
            fetchInscripciones().finally(setLoading(false));
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

    if(loading) return <div>Loading...</div>;

    return (
        <div className="p-4 bg-white rounded shadow ">
            <h4 className="text-xl font-bold mb-4 text-center">Mis inscripciones</h4>
            <hr className='mb-6' />
            <ul className="space-y-4">
                {inscripciones.map((inscripcion) => (
                    <li key={inscripcion.id} className="flex justify-between items-center p-4 border rounded">
                        <div>
                            <h3 className="text-lg font-semibold">{inscripcion.nombre} {inscripcion.apellido}</h3>
                            <p className="text-gray-500">DNI: {inscripcion.dni}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleReimprimir(inscripcion.id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <HiOutlinePrinter size={24} />
                            </button>
                            <button
                                onClick={() => handleEliminar(inscripcion.id)}
                                className="text-red-500 hover:text-red-700"
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