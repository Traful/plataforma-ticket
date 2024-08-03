import { useEffect, useState } from 'react';
import { HiOutlinePrinter, HiOutlineTrash } from "react-icons/hi";

const MisInscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);

    useEffect(() => {
        // Obtener userId del localStorage
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const apiUrl = import.meta.env.VITE_API_URL;

        const fetchInscripciones = async () => {
            try {
                const response = await fetch(`${apiUrl}/inscripcionesUsuario.php?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las inscripciones del usuario');
                }
                const data = await response.json();
                setInscripciones(data.inscripciones);
            } catch (error) {
                console.error('Error:', error);
                // Manejar el error como sea necesario
            }
        };

        if (userId) {
            fetchInscripciones();
        }
    }, []);

    const handleReimprimir = (id) => {
        // Lógica para reimprimir la credencial
        alert(`Reimprimiendo credencial para la inscripción ${id}`);
    };

    const handleEliminar = (id) => {
        // Lógica para eliminar la inscripción
        alert(`Eliminando inscripción ${id}`);
    };

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