import React, { useState, useEffect } from 'react';
import storage from '../Utils/storage';

const Valoracion = ({ isOpen, onClose }) => {
  const [electricistaSeleccionado, setelectricistaSeleccionado] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [electricistas, setElectricistas] = useState('');
  const [idStorage, setIdStorage] = useState(storage.get('userId') ?? null);


  if (!electricistas) {
    fetch(`http://localhost:3400/api/electricistas`)
      .then((response) => {
          return response.json()
      })
      .then((result) => {
          setElectricistas(result)
          console.log(electricistas);
      })
    }

  const handleelectricistaChange = (e) => {
    setelectricistaSeleccionado(e.target.value);
  };

  const handlePuntuacionChange = (e) => {
    setPuntuacion(parseInt(e.target.value));
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleSubmit = () => {

    let time = new Date();
    let fecha = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    
    const urlencoded = new URLSearchParams();
   
    urlencoded.append('electricista_id', electricistaSeleccionado);
    urlencoded.append('id_usuario', idStorage);
    urlencoded.append('puntuacion', puntuacion);
    urlencoded.append('comentario', comentario);
    urlencoded.append('fecha', fecha);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow"
    };

    const apiSaveUser = 'http://localhost:3400/api/valoraciones';

    fetch(apiSaveUser, requestOptions)
        .then( (response) =>  response.json())
        .then((result) => {
            console.log(result)
            alert('Comentario guardado correctamente')
        })
        .catch((error) => {
            console.log(error)
            alert('No se pudieron guardar los cambios')
        });
     
      onClose(); // Cerrar el modal después de enviar la valoración
    };

  if (!electricistas) { return };
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl relative max-w-md w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Valorar electricista</h3>
            <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Seleccionar electricista:</label>
            <select
              value={electricistaSeleccionado}
              onChange={handleelectricistaChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccionar...</option>
              {electricistas.map(electricista => (
                <option key={electricista.id} value={electricista.id}>{electricista.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Puntuación:</label>
            <select
              value={puntuacion}
              onChange={handlePuntuacionChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="0">Seleccionar...</option>
              <option value="1">1 estrella</option>
              <option value="2">2 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="5">5 estrellas</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Comentario:</label>
            <textarea
              rows="3"
              value={comentario}
              onChange={handleComentarioChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!electricistaSeleccionado || puntuacion === 0}
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium ${
                !electricistaSeleccionado || puntuacion === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Enviar Valoración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valoracion;