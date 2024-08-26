import { useEffect, useState } from 'react';
import { useAuth } from "./../../context/AuthContext";
import { HiOutlineTicket, HiOutlineInformationCircle, HiOutlineMail } from "react-icons/hi";
import SkeletonLoader from '../ui/Skeletor';

const MisInscripciones = () => {
    const [loading, setLoading] = useState(true);
    const [inscripciones, setInscripciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const inscripcionesPerPage = 5; // Número de inscripciones por página
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

    // Calcular los elementos a mostrar en la página actual
    const indexOfLastInscripcion = currentPage * inscripcionesPerPage;
    const indexOfFirstInscripcion = indexOfLastInscripcion - inscripcionesPerPage;
    const currentInscripciones = inscripciones.slice(indexOfFirstInscripcion, indexOfLastInscripcion);

    // Cambiar la página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            ) : currentInscripciones.length > 0 ? (
                <>
                    <ul className="space-y-4">
                        {currentInscripciones.map((inscripcion) => (
                            <li key={inscripcion.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{inscripcion.nombre} {inscripcion.apellido}</h3>
                                    <p className="text-gray-600">DNI: <span className="font-medium">{inscripcion.dni}</span></p>
                                    <p className="text-gray-600">Categoría de Edad: <span className="font-medium">{inscripcion.categoria_edad}</span></p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Paginación */}
                    <div className="mt-4 flex justify-center space-x-2">
                        {Array.from({ length: Math.ceil(inscripciones.length / inscripcionesPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} transition duration-300`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                    <HiOutlineInformationCircle className="text-blue-500 w-16 h-16 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Aún no tienes inscripciones</h3>
                    <p className="text-gray-600 text-center">
                        Cuando te inscribas en un evento, tus inscripciones aparecerán aquí.
                    </p>
                </div>
            )}

            {/* Tarjeta de contacto */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md text-center border-t border-gray-200">
                <HiOutlineMail size={32} className="text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">¿Tienes algún problema?</h4>
                <p className="text-gray-600 mb-4">
                    Si encuentras algún problema con tus inscripciones o tienes alguna duda, no dudes en comunicarte con nosotros.
                </p>
                <a href="https://www.instagram.com/codeo.ar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    Contactar a Codeo.ar
                </a>
            </div>
        </div>
    );
};

export default MisInscripciones;
