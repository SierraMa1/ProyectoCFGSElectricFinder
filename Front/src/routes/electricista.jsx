import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header';
import StarRating from '../components/starRating';
import ValoracionModulo from '../components/valoracionModulo';
import ElectricistaModal from '../components/electricistaModal';


const Electricista = () => {

  const [ electricista, setElectricista ] = useState([])
  const [ valoraciones, setValoraciones ] = useState([])
  const { user } = useParams();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch(`http://localhost:3400/api/electricistas/${user}`)
      .then((response) => {
        return response.json()
      })
      .then((electricista) => {
        setElectricista(electricista.data)
        setValoraciones(electricista.valoraciones)
      })
  }, [user])

  if (!electricista) return null;

  return (
    <>
    <Header />
       <div className="container mx-auto mt-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Foto del electricista */}
              <div className="lg:w-1/3">
              {electricista.tieneFoto && electricista.typeFoto ? (
                <img src={`../images/electricista/${electricista.id}.${electricista.typeFoto}`} alt={`${electricista.nombre} ${electricista.apellido}`} className="w-full h-auto lg:h-64 object-cover" />
              ) : (
                <img src={'../../images/nofoto.png'} alt={`${electricista.nombre} ${electricista.apellido}`} className="w-full h-auto lg:h-64 object-cover" />

              )}
              </div>
              {/* Información del electricista */}
              <div className="lg:w-2/3 p-6">
                <h2 className="text-3xl font-bold mb-2">{electricista.nombre} {electricista.apellido}</h2>
                <p className="text-gray-700 mb-4">{electricista.ubicacion}</p>
                <p className="text-gray-700 mb-4">{electricista.servicios}</p>
                <div className="flex items-center">
                  <span className="text-lg text-gray-900 mr-2">Valoración Promedio:</span>
                  {electricista.promedio_puntuacion && <StarRating rating={electricista.promedio_puntuacion} />}
                </div>
                <p className="text-gray-700 mt-4">{electricista.descripcion}</p>
                <button onClick={openModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Contactar</button>
                
              </div>
            </div>
          </div>
        
      {/* Sección de valoraciones */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Valoraciones de Usuarios</h3>
        {valoraciones.map((valoracion, index) => (
          <ValoracionModulo valoracion={valoracion} />
        ))}
      </div>
    </div>
    <ElectricistaModal showModal={showModal} closeModal={closeModal} electricista={electricista} />
    </>
  );
};

export default Electricista;