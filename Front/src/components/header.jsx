import React, { useState } from 'react';
import ElectricFinderlogo from './../ElectricFinderlogo.png';
import Modal from './modal';
import Valoracion from './valoracion';
import { Link } from 'react-router-dom';
import ModalInicioSesion from './modalInicioSesion';
import storage from '../Utils/storage';
import { useNavigate } from 'react-router-dom';

const Header = ({searchTerm, setSearchTerm, screen}) => {

  const [electricistas, setElectricistas] = useState([]);

  const [isLogin, setIsLogin] = useState(storage.get('isLogin'));
  const [tipoUsuario, setTipoUsuario] = useState(storage.get('tipoUsuario') ?? null);
  const [idUsuario, setIdUsuario] = useState(storage.get('userId') ?? null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInicio, setIsOpenInicio] = useState(false);
  const [isOpenValoracion, setIsOpenValoracion] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeInicio = () => {
    setIsOpenInicio(false);
  };

  const openInicio = () => {
    setIsOpenInicio(true);
  };

  const closeValoracion = () => {
    setIsOpenValoracion(false);
  };

  const openValoracion = () => {
    setIsOpenValoracion(true);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <div className="h-16 max-w-[2500px] border px-[2rem] md:px-[6rem] shadow-md flex bg-neutral-100 items-center justify-between">

      {/* Logo con enlace a la página principal */}
      <Link to="/" className="flex-1">
        <img src={ElectricFinderlogo} alt="ElectricFinderlogo" className="h-14 w-auto" />
      </Link>

      {/* Barra de búsqueda */}
      <div className='py-1 px-4 md:w-[20rem] w-64'>
        <input
          className="border border-grey-300 rounded-lg w-full bg-slate-100 focus:outline-none px-2 py-1"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Botón de menú para dispositivos móviles */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-900  bg-blue-500 hover:bg-blue-700 font-bold text-xl focus:outline-none">
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">

        {!isLogin &&
          <button onClick={openModal} className=" bg-gradient-to-r from-blue-400 to-blue-500  hover: from-bg-sky-200 hover:to-blue-200 border border-blue-700 rounded-lg text-white font-bold py-2 px-4">{screen === 'Home' ? 'Ofrecer servicios' : 'Valorar experiencia'}</button>
        }

        {screen !== 'Valoraciones' && (
          <Link to="/valoraciones" className="text-gray-900 font-semibold text-lg hover:underline ">Valoraciones</Link>
        )}

        {/* {screen !== 'Home' && (
          <Link to="/" className="text-gray-900 font-semibold text-lg hover:underline">Electricistas</Link>
        )} */}

        {!isLogin && 
          <button onClick={openInicio} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Iniciar sesión</button>
        }

        {isLogin && tipoUsuario === 'usuario' &&
          <button onClick={ openValoracion } className="bg-blue-500 shadow-lg shadow-blue-500/50 border border-blue-900 rounded-lg text-white font-bold py-2 px-4">Valorar experiencia</button>
        }

        {isLogin && tipoUsuario === 'electricista' &&
          <button onClick={ () => { navigate(`/electricista/${idUsuario}`) } } className="bg-blue-500 shadow-lg shadow-blue-500/50 border border-blue-900 rounded-lg text-white font-bold py-2 px-4">Mis Valoraciones</button>
        }

        {isLogin && 
          <button onClick={ () => { navigate(`/${tipoUsuario}/perfil/${idUsuario}`) } } className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Mi perfil</button>
        }
      </div>

      {/* Menú desplegable para dispositivos móviles */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-white w-48 mt-2 shadow-lg rounded-lg">
          <Link to="/valoraciones" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Valoraciones</Link>
          <button onClick={openModal} className="block px-4 py-2 text-gray-900 hover:bg-gray-100">{screen === 'Home' ? 'Ofrecer servicios' : 'Valorar experiencia'}</button>
          <button onClick={openInicio} className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Iniciar sesión</button>
        </div>
      )}
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} screen={screen}/>
    <ModalInicioSesion isOpen={isOpenInicio} onClose={closeInicio}/>
    <Valoracion isOpen={isOpenValoracion} onClose={closeValoracion}/>
    </>
  );
};

export default Header;