import { useEffect, useState } from "react";
import React from 'react';
import Header from "../components/header";
import StarRating from "../components/starRating";
import ValoracionModulo from "../components/valoracionModulo";
import storage from "../Utils/storage";

const Valoraciones = () => {
    const [ electricista, setElectricista ] = useState([])
    const [ valoraciones, setValoraciones ] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const screen = 'Valoraciones';
    const [idStorage, setIdStorage] = useState(storage.get('userId') ?? null);

    const filteredValoraciones = valoraciones.filter((valoracion) =>
        valoracion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        valoracion.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        valoracion.usuario.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    useEffect(() => {
        fetch(`http://localhost:3400/api/valoraciones`)
        .then((response) => {
            return response.json()
        })
        .then((valoraciones) => {
            setValoraciones(valoraciones)
        })
    }, [])

    if (!valoraciones) return null;
    return (
        <>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} screen={screen}/>
        <div className="container mx-auto mt-8">
        <div className="max-w-4xl mx-auto">
        <div className="text-4xl font-extrabold text-blue-500 max-md:max-w-full">Testimonios </div> 
        <div className="mt-12 text-3xl font-extrabold text-blue-500 max-md:mt-10 max-md:max-w-full pb-10"> Nuestros clientes nos recomiendan.</div>  
            {filteredValoraciones.map((valoracion, index) => (
                <ValoracionModulo valoracion={valoracion} />
            ))}
        </div>
        </div>
        </>
    );
}

export default Valoraciones;

