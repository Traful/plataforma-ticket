import { Sidebar, Navbar } from "flowbite-react";
import { useState } from "react";
import { HiOutlineTicket, HiSearchCircle, HiOutlineUserCircle } from "react-icons/hi";
import Logo from "../../assets/img/logonegro.png";
import Evento from "../evento/Evento";
import MisIncripciones from "../evento/MisIncripciones";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState("Inscripcion");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setIsOpen(false);
    };

    const renderComponent = () => {
        switch (activeTab) {
            case "Inscripcion":
                return <Evento />;
            case "MisInscripciones":
                return <MisIncripciones />;
            case "CerrarSesion":
                return alert("Cerrar sesión");
            default:
                return null;
        }
    };

    const handleLogout = () => {
        // Eliminar el userId del localStorage
        localStorage.removeItem('userId');
        
        localStorage.removeItem("tikets-token"); //agrega Hans 03/08/2024
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login');
    };

    return (
        <>
            <div className="block md:hidden">
                <Navbar fluid={true} rounded={true}>
                    <Navbar.Brand href="#">
                        <img src={Logo} alt="Logo" className="h-10" />
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
                    {isOpen && (
                        <div className="p-4 bg-white shadow-md w-full">
                            <button className="flex items-center w-full p-2 text-gray-700" onClick={() => handleTabChange("Inscripcion")}>
                                <HiOutlineTicket className="mr-2" /> Nueva Inscripción
                            </button>
                            <button className="flex items-center w-full p-2 text-gray-700" onClick={() => handleTabChange("MisInscripciones")}>
                                <HiSearchCircle className="mr-2" /> Mis Inscripciones
                            </button>
                            <button className="flex items-center w-full p-2 text-gray-700" onClick={() => handleTabChange("CerrarSesion")}>
                                <HiOutlineUserCircle className="mr-2" /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </Navbar>
                <div className="flex-1 p-4 bg-white">
                    {renderComponent()}
                </div>
            </div>
            <div className="hidden min-h-screen md:flex">
                <Sidebar className="sticky top-0 w-72 mr-1">
                    <div className="flex items-center justify-center mb-5 ">
                        <img src={Logo} alt="Logo" className="w-90" />
                    </div>
                    <hr className="mb-4" />
                    <Sidebar.Items className="flex-1">
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={HiOutlineTicket} onClick={() => handleTabChange("Inscripcion")}>
                                Nueva Inscripción
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiSearchCircle} onClick={() => handleTabChange("MisInscripciones")}>
                                Mis Inscripciones
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={HiOutlineUserCircle} onClick={() => handleLogout()}>
                                Cerrar Sesión
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="bg-gray-100  w-full">
                    {renderComponent()}
                </div>
            </div>
        </>
    );
};

export default Home;