import Logo from '../assets/img/vivi.png'; // Reemplaza con la ruta correcta de tu logo

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo a la izquierda */}
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="w-30 h-14 ml-10" />
                </div>
                {/* Texto a la derecha */}
                <div className='mr-10'>
                    <p className="text-sm">Realizado por Codeo.ar</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;