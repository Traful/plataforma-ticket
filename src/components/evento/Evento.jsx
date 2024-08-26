import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/corredor.jpg";
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import useMpContext from "../Mp/storemp/useMpContext";
import { VITE_BACK_END_URL } from "../../../config";
import { useAuth } from "../../context/AuthContext";
import SkeletonLoader from '../ui/Skeletor';

const Evento = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await fetch(`${VITE_BACK_END_URL}mp/items`, {
                    headers: {
                        'Authorization': user?.jwt || '',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setItems(json.data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.jwt) {
            getItems();
        } else {
            setLoading(false);
            setError('User not authenticated');
        }
    }, [user]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
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
                        <EventInfo icon={HiOutlineCalendar} title="Fecha y Hora" info="8 de Septiembre de 2024 - 10:00hs." />
                        <EventInfo icon={HiOutlineLocationMarker} title="Ubicación" info="Dique las palmeras, San Francisco, Provincia de San Luis." />
                        <EventInfo icon={HiOutlineClock} title="Cierre de Inscripciones" info="30 de Agosto de 2024 - 10:00hs." />
                    </div>

                    <hr className="border-gray-300 my-8" />
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-[#00263b]">Inscribite ahora</h2>
                        <p className="text-gray-700 mb-6">Incluye: Remera del evento, número de corredor.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-6">
                        {loading ? (
                            [1, 2].map((_, index) => <SkeletonLoader key={index} className="w-full sm:w-auto" />)
                        ) : items.length > 0 ? (
                            items.map(i => <TicketOption key={`i-${i.id}`} data={i} />)
                        ) : (
                            <div>No hay tickets disponibles</div>
                        )}
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

function formatearMoneda(cadena) {
    const numero = parseFloat(cadena);
    const formato = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
    return formato;
}

const TicketOption = ({ data }) => {
    const navigate = useNavigate();
    const { dispatch, options } = useMpContext();

    const irComprar = () => {
        dispatch({
            type: options.MP_SET_ITEM_SELECTED, payload: data
        })
        navigate("/registrar_compra");
    }

    return (
        <div className="border border-gray-200 text-center rounded-lg p-6 hover:shadow-xl transition-shadow w-full sm:w-96 mb-4 sm:mb-0">
            <h3 className="font-bold text-lg text-[#00263b] mb-2">{data.titulo}</h3>
            <p className="text-[#e7ac2a] font-semibold mb-4">Desde {formatearMoneda(data.precio)}</p>
            <button onClick={irComprar} className="w-full px-4 py-2 bg-[#4baccc] text-white rounded-md hover:bg-[#00263b] transition-colors">
                Inscribirme
            </button>
        </div>
    )
};

export default Evento;