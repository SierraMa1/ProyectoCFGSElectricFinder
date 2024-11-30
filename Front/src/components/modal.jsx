import React, { useState } from 'react';
import Formulario from './formulario';

const Modal = ({ isOpen, onClose, screen }) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0   z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full h-full max-w-2xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-gradient-to-r from-sky-100 to-slate-300 hover:to-neutral-200 border-0 rounded-lg shadow-lg outline-none focus:outline-none" >
          <div className="flex items-start justify-between p-8 border-b border-solid border-gray-400 rounded-t">
            <h1 className="  text-2xl pl-24 font-switzer font-bold text-grey-neutral">{screen === 'Home' ? '¿Quieres ofrecer tus servicios?' : '¿Quieres valorar tu experiencia?'}</h1>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black">&times;</span>
            </button>
          </div>

          <div className="flex-auto overflow-y-auto p-10">
            <Formulario onClose={onClose} screen={screen}/>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className=" text-blue-950 font-switzer background-transparent font-bold uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;