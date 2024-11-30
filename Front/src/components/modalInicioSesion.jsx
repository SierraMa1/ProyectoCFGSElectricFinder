import React, { useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import fetchInicio from '../Helper/login';
import storage from '../Utils/storage';
import { FaChevronDown } from 'react-icons/fa';



const ModalInicioSesion = ({ isOpen, onClose }) => {
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [verContraseña, setVerContraseña] = useState(false);
    const dataUser = {
        tipoUsuario: tipoUsuario,
        usuario: usuario,
        password: password,
    };
        
    const vercontraseña = ()=>{
        setVerContraseña (!verContraseña);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await fetchInicio(dataUser);
            alert('Bienvenido ' + data[0].nombre);
            storage.set('userName', data[0].nombre);
            storage.set('userId', data[0].id);
            storage.set('tipoUsuario', tipoUsuario);
            storage.set('isLogin', true);
            navigate(`/${tipoUsuario}/perfil/${data[0].id}`);

        } catch (error) {
            console.log(error);
            alert('Datos introducidos erroneos')
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className=" fixed z-50 inset-0 items-center flex justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
            <div className="relative w-full max-w-md mx-auto ">
                <div className="relative flex flex-col w-full border-gray-300 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between px-3.5 py-8 bg-gradient-to-r from-neutral-200 to-sky-200  hover: from-bg-sky-200 hover:to-blue-200 max-md:pr-5 rounded-2xl">
                        <div className="flex flex-col pt-8 pb-9 max-w-full bg-white rounded-[60px] w-[700px] max-md:mt-10">
                            <button className=" px-12 ml-auto bg-transparent border-0 opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={onClose} >
                                <span>&times;</span>
                            </button>
                            <div className="self-center text-4xl font-extrabold font-chillax">
                                Iniciar Sesión.
                            </div>

                            <div className="self-center mt-1.5 text-lg text-neutral-500 font-chillax">
                                Bienvenido! Ingresa tus credenciales por favor.
                            </div>

                            <div className="shrink-0 mt-7 h-px border border-solid bg-neutral-400 border-neutral-400" />
                            <div className="flex flex-col px-9 mt-5 text-xl max-md:px-5">
                                <form className="px-2 " onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="tipoUsuario" className="block text-gray-900 font-bold mb-2 font-switzer">Tipo de usuario</label>
                                        <div className="absolute flex items-center right-16 pt-4 pointer-events-none font-switzer">
                                            <FaChevronDown className="w-4 h-4 text-gray-700" />
                                        </div>
                                        <select
                                            id="tipoUsuario"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            value={tipoUsuario}
                                            onChange={(e) => setTipoUsuario(e.target.value)}
                                        >
                                             <option value="" disabled defaultValue >Selecciona una opción</option>
                                            <option value="electricista">Electricista</option>
                                            <option value="usuario">Usuario</option>
                                        </select>
                                       
                                    </div>
                                    <div className=" font-bold font-switzer pt-3">Usuario</div>
                                <input 
                                    type='text' 
                                    value={dataUser.usuario} 
                                    className="justify-center items-start px-4 mt-6 pb-2 rounded-xl  max-md:pr-5" 
                                    placeholder="Ingresa tu nombre de usuario.."
                                    onChange={(e) => setUsuario(e.target.value)} 
                                    />
                                
                                <div > 
                                    <label className="mb-3.5 flex items-center font-semibold font-switzer mt-3 ">Password</label>
                        
                                <div className=' flex flex-row'>
                                <img src="images/eye.svg" width="30px" alt='eye' className=' opacity-50 cursor-pointer  '
                            onClick={vercontraseña} /> 
                                    <input 

                                     type={!verContraseña ? "password": "text"}
                                    value={dataUser.password}
                                    id="password"
                                    className=" px-3.5 rounded-xl"
                                     placeholder="Ingresa tu contraseña.."
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                   
                                  </div>
                                </div>
                                <div className="mt-6 bg-clip-text cursor-pointer text-blue-800">
                                    ¿ Olvidaste tu contraseña?
                                    <forgotPassword/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-16 mt-7 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Iniciar Sesión.
                                    </button>
                                </div>
                        
                                </form>
                                
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default ModalInicioSesion;