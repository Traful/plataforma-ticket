import LogoMuni from '../assets/img/vivi.png';
import LogoFas from "../assets/img/fas.png";
import LogoConfederacion from "../assets/img/confederacion.png";
import LogoCodeo from "../assets/img/codeo.png";

const Footer = () => {
    return (
        <footer className="bg-[#00263b] text-gray-300 py-4 mt-auto">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
                {/* Logos a la izquierda */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center mb-4 sm:mb-0">
                    <img src={LogoMuni} alt="Logo Muni" className="w-auto h-14 m-2" />
                    <img src={LogoFas} alt="Logo Fas" className="w-auto h-14 m-2" />
                    <img src={LogoConfederacion} alt="Logo Confederacion" className="w-auto h-14 m-2" />
                </div>
                {/* Texto y logo de Codeo a la derecha */}
                <a href="https://www.instagram.com/codeo.ar" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <p className="text-sm mr-2">Realizado por Codeo.ar</p>
                    <img src={LogoCodeo} alt="Logo Codeo" className="w-8 h-8" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
