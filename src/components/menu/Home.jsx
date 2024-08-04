import { Sidebar, Navbar } from "flowbite-react";
import { useState } from "react";
import { HiOutlineTicket, HiSearchCircle, HiOutlineUserCircle } from "react-icons/hi";
import Logo from "../../assets/img/logonegro.png";
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("tikets-token");
        user.logout();
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
                            <Link to="/" className="flex items-center w-full p-2 text-gray-700">
                                <HiOutlineTicket className="mr-2" /> Nueva Inscripción
                            </Link>
                            <Link to="/mis_inscripciones" className="flex items-center w-full p-2 text-gray-700">
                                <HiSearchCircle className="mr-2" /> Mis Inscripciones
                            </Link>
                            <button className="flex items-center w-full p-2 text-gray-700" onClick={handleLogout}>
                                <HiOutlineUserCircle className="mr-2" /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </Navbar>
            </div>
            <div className="hidden min-h-screen md:flex mt-1 ml-1">
                <Sidebar className="sticky top-0 w-72 mr-1">
                    <div className="flex items-center justify-center mb-5 ">
                        <img src={Logo} alt="Logo" className="w-90" />
                    </div>
                    <hr className="mb-4" />
                    <Sidebar.Items className="flex-1">
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={HiOutlineTicket} as={Link} to="/">
                                Nueva Inscripción
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiSearchCircle} as={Link} to="/mis_inscripciones">
                                Mis Inscripciones
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={HiOutlineUserCircle} as={Link}onClick={handleLogout}>
                                Cerrar Sesión
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Home;