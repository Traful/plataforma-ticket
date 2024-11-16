import React from 'react';
import { HiOutlineMusicNote, HiOutlineUserGroup, HiOutlineStar, HiOutlineCalendar } from "react-icons/hi";

const artistasData = [
    {
        dia: "11 de Enero",
        color: "border-[#f9b603]",
        artistas: [
            {
                nombre: "Los Cantores del Alba",
                descripcion: "Este grupo, conocido por su compromiso con la música folclórica, llevará al público a un viaje musical lleno de emotividad y tradición.",
                horario: "21:00 hs",
                tipo: "Folclore Tradicional"
            },
            {
                nombre: "Chipote",
                descripcion: "Con su estilo fresco y enérgico, Chipote hará que nadie pueda resistirse a seguir en la pista de baile.",
                horario: "22:30 hs",
                tipo: "Cuarteto"
            },
            {
                nombre: "Juan Manuel \"El Ángel Tropical\"",
                descripcion: "Su carisma y su capacidad para conectar con el público serán el complemento perfecto para una noche inolvidable.",
                horario: "00:00 hs",
                tipo: "Tropical"
            }
        ]
    },
    {
        dia: "12 de Enero",
        color: "border-[#17b1be]",
        artistas: [
            {
                nombre: "Ceibo",
                descripcion: "Este grupo de folclore, consagrados en Cosquín 2024, con sus interpretaciones profundas y auténticas, se convertirá en el alma de la celebración.",
                horario: "21:00 hs",
                tipo: "Folclore"
            },
            {
                nombre: "Luis Soloa",
                descripcion: "Reconocido por su capacidad de transmitir emociones a través de su música, su actuación promete ser uno de los grandes momentos del festival.",
                horario: "22:30 hs",
                tipo: "Solista"
            },
            {
                nombre: "Euge Quevedo y La Banda de Carlitos",
                descripcion: "Con su ritmo contagioso, su talento escénico y su energía cerrarán con broche de oro este festival en un gran cierre.",
                horario: "00:00 hs",
                tipo: "Cuarteto"
            }
        ]
    }
];

const GrillaArtistas = () => {
    return (
        <div className="bg-gray-50/80 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-2 text-[#17b1be] mb-4">
                    <HiOutlineCalendar className="w-5 h-5" />
                    <span>Programación del Festival</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#00263b] mb-6">
                    Grilla de Artistas
                </h2>

                <div className="space-y-6">
                    {artistasData.map((dia, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-xl font-bold text-[#00263b] flex items-center gap-2">
                                {dia.dia}
                                <span className="text-xs font-medium text-[#17b1be] bg-[#17b1be]/10 px-2 py-1 rounded-full">
                                    Desde las 21:00hs
                                </span>
                            </h3>

                            <div className="grid gap-4">
                                {dia.artistas.map((artista, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className={`border-l-4 ${dia.color} px-6 py-5`}>
                                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-xl font-bold text-[#00263b]">
                                                            {artista.nombre}
                                                        </h4>
                                                        <span className="text-xs font-medium text-[#17b1be] bg-[#17b1be]/10 px-2 py-1 rounded-full">
                                                            {artista.tipo}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        {artista.descripcion}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-[#00263b]">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                                        <HiOutlineMusicNote className="w-5 h-5 text-[#17b1be]" />
                                                    </div>
                                                    <span className="font-medium">{artista.horario}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrillaArtistas;