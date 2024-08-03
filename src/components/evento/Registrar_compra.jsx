import { useState, useRef } from 'react';
import { Button, Checkbox, FileInput, Label, Select, TextInput, Card, Spinner } from 'flowbite-react';

import { HiOutlineTicket, HiOutlineUser, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineStar, HiOutlineExclamationCircle } from 'react-icons/hi';
import Logo from "../../assets/img/logonegro.png";
//import MercadoPagoLogo from "../../assets/img/mercadopago.png";
import axios from "axios";
import { useAuth } from '../../context/AuthContext'; // Importa el hook useAuth
import Mp from "../Mp/Mp";
import useMpContext from '../Mp/storemp/useMpContext';

const Registrar_compra = () => {
    const { state } = useMpContext();
    const [idPreferencia, setIdPreferencia] = useState(null);
    const archivo = useRef(null);
    const { user } = useAuth(); // Usa el hook useAuth para obtener la información del usuario
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        //usuario_id: '',
        //dni: '',
        //nombre: '',
        //apellido: '',
        //fecha_nacimiento: '',
        //genero: '',
        //email: '',
        //telefono: '',
        //domicilio: '',
        //ciudad: '',
        //provincia: '',
        //pais: '',
        //codigo_postal: '',
        //contacto_emergencia_nombre: '',
        //contacto_emergencia_apellido: '',
        //contacto_emergencia_telefono: '',
        //talle_remera: '',
        //team_agrupacion: '',
        //categoria_edad: '',
        //codigo_descuento: '',
        //acepta_promocion: false
        
        usuario_id: '',
        dni: '18827252',
        nombre: 'Hans',
        apellido: 'Araujo',
        fecha_nacimiento: '1978-03-14',
        genero: 'Masculino',
        email: 'hansjal@gmail.com',
        telefono: '2657229947',
        domicilio: 'Ate II Mz: 4 Dto: 273',
        ciudad: 'Villa Mercedes',
        provincia: 'San Luis',
        pais: 'Argentina',
        codigo_postal: '5730',
        contacto_emergencia_nombre: 'Pepe',
        contacto_emergencia_apellido: 'Soriano',
        contacto_emergencia_telefono: '2657229947',
        talle_remera: 'XXL',
        team_agrupacion: 'Comando culo de Mandril',
        categoria_edad: '40-49',
        codigo_descuento: 'desc',
        acepta_promocion: true
    });
    const apiUrl = import.meta.env.VITE_API_URL;


    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'certificado_medico') {
                formDataToSend.append(key, formData[key]);
            }
        });
        formDataToSend.append("idItem", state.itemSelected.id); //Envío al back el item en el cual se inscribe
        formDataToSend.append("certificado_medico", archivo.current.files[0]);
        try {
            const response = await fetch(`${apiUrl}/registrar/evento`, {
                headers: {
                    'Authorization': user.jwt,
                },
                method: 'POST',
                body: formDataToSend
            });
            const data = await response.json();
            if(!data.ok) {
                alert(data.msg);
            } else {
                setIdPreferencia(data.data.idPreferencia);
            }
        } catch (error) {
            console.error('Error al procesar la inscripción:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="mb-8">
                    <div className="flex justify-center mb-4">
                        <img src={Logo} alt="Event Logo" className="h-16" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-[#00263b]">Inscripción - San Francisco 10K</h1>
                    {user && <p className="text-center text-[#4baccc]">Bienvenido, {user.firstname}</p>}
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-xl font-semibold mb-4 text-[#00263b] flex items-center">
                                    <HiOutlineUser className="mr-2" /> Datos Personales
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="dni" value="DNI" />
                                        <TextInput id="dni" type="text" placeholder="Tu DNI" required value={formData.dni} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="nombre" value="Nombre" />
                                        <TextInput id="nombre" type="text" placeholder="Tu nombre" required value={formData.nombre} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="apellido" value="Apellido" />
                                        <TextInput id="apellido" type="text" placeholder="Tu apellido" required value={formData.apellido} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="fecha_nacimiento" value="Fecha de Nacimiento" />
                                        <TextInput id="fecha_nacimiento" type="date" required value={formData.fecha_nacimiento} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="genero" value="Género" />
                                        <Select id="genero" required value={formData.genero} onChange={handleInputChange}>
                                            <option value="">Selecciona</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Otro">Otro</option>
                                        </Select>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4 text-[#00263b] flex items-center">
                                    <HiOutlinePhone className="mr-2" /> Contacto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="email" value="Email" />
                                        <TextInput id="email" type="email" placeholder="tu@email.com" required value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefono" value="Teléfono" />
                                        <TextInput id="telefono" type="tel" placeholder="Tu teléfono" required value={formData.telefono} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4 text-[#00263b] flex items-center">
                                    <HiOutlineLocationMarker className="mr-2" /> Dirección
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="domicilio" value="Domicilio" />
                                        <TextInput id="domicilio" type="text" placeholder="Tu domicilio" required value={formData.domicilio} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="ciudad" value="Ciudad" />
                                        <TextInput id="ciudad" type="text" placeholder="Tu ciudad" required value={formData.ciudad} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="provincia" value="Provincia" />
                                        <TextInput id="provincia" type="text" placeholder="Tu provincia" required value={formData.provincia} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="pais" value="País" />
                                        <TextInput id="pais" type="text" placeholder="Tu país" required value={formData.pais} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="codigo_postal" value="Código Postal" />
                                        <TextInput id="codigo_postal" type="text" placeholder="Tu código postal" required value={formData.codigo_postal} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4 text-[#00263b] flex items-center">
                                    <HiOutlineExclamationCircle className="mr-2" /> Contacto de Emergencia
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contacto_emergencia_nombre" value="Nombre" />
                                        <TextInput id="contacto_emergencia_nombre" type="text" placeholder="Nombre" required value={formData.contacto_emergencia_nombre} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="contacto_emergencia_apellido" value="Apellido" />
                                        <TextInput id="contacto_emergencia_apellido" type="text" placeholder="Apellido" required value={formData.contacto_emergencia_apellido} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="contacto_emergencia_telefono" value="Teléfono" />
                                        <TextInput id="contacto_emergencia_telefono" type="tel" placeholder="Teléfono" required value={formData.contacto_emergencia_telefono} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4 text-[#00263b] flex items-center">
                                    <HiOutlineStar className="mr-2" /> Información Adicional
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="talle_remera" value="Talle de Remera" />
                                        <Select id="talle_remera" required value={formData.talle_remera} onChange={handleInputChange}>
                                            <option value="">Selecciona</option>
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="team_agrupacion" value="Team o Agrupación" />
                                        <TextInput id="team_agrupacion" type="text" placeholder="Tu team o agrupación" value={formData.team_agrupacion} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="categoria_edad" value="Categoría de Edad" />
                                        <Select id="categoria_edad" required value={formData.categoria_edad} onChange={handleInputChange}>
                                            <option value="">Selecciona</option>
                                            <option value="18-29">18-29</option>
                                            <option value="30-39">30-39</option>
                                            <option value="40-49">40-49</option>
                                            <option value="50-59">50-59</option>
                                            <option value="60+">60+</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="codigo_descuento" value="Código de Descuento" />
                                        <TextInput id="codigo_descuento" type="text" placeholder="Código de descuento" value={formData.codigo_descuento} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="certificado_medico" value="Certificado Médico" />
                                    <FileInput id="certificado_medico" ref={archivo} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox id="acepta_promocion" checked={formData.acepta_promocion} onChange={handleInputChange} />
                                    <Label htmlFor="acepta_promocion">
                                        Acepto que mi imagen pueda ser utilizada para fines promocionales del evento.
                                    </Label>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" color="warning" disabled={idPreferencia}>
                                        {loading ? <Spinner size="sm" /> : "Registrar y Proceder al Pago"}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <h2 className="text-xl font-bold mb-4 text-[#00263b] flex items-center">
                                <HiOutlineTicket className="mr-2" /> Resumen de Pago
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">Categoría:</span>
                                    <span>{state.itemSelected.titulo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Cantidad:</span>
                                    <span>{state.itemSelected.cantidad}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>{`$${state.itemSelected.precio}`}</span>
                                </div>
                            </div>
                            <Mp idPreferencia={idPreferencia} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registrar_compra;