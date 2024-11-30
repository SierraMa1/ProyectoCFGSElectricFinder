import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ElectricistaModal = ({ showModal, closeModal, electricista }) => {
  if (!showModal) return null;

  const { telefono, email, ubicacion } = electricista;
  const whatsappLink = `https://wa.me/${telefono}`;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl relative max-w-md w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Datos del Electricista</h3>
            <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-500" />
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {telefono}
              </a>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <p>{email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ubicación:</label>
            <p>{ubicacion}</p>
          </div>
          <div className="flex justify-end">
            <button onClick={closeModal} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricistaModal;