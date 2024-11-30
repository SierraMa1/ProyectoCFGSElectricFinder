import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';


const Formulario = ({ onClose, screen }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [servicios, setServicios] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("apellidos", apellidos);
    urlencoded.append("password", password);
    urlencoded.append("telefono", telefono);
    urlencoded.append("email", email);
    urlencoded.append("ubicacion", ubicacion);
    urlencoded.append("nombreEmpresa", nombreEmpresa);
    urlencoded.append("servicios", servicios);
    urlencoded.append("tipoUsuario", tipoUsuario);

    const urlApi = tipoUsuario === 'electricista' 
                ? 'http://localhost:3400/api/electricistas'
                : 'http://localhost:3400/api/usuarios'

    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        body: urlencoded,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      setMensaje('Usuario guardado correctamente');
      setError('');
      setTimeout(() => {
        setNombre('');
        setApellidos('');
        setPassword('');
        setTelefono('');
        setEmail('');
        setUbicacion('');
        setNombreEmpresa('');
        setServicios('');
        setMensaje('');
        onClose();
      }, 3000);
    } catch (error) {
      console.log(error);
      setMensaje('');
      setError('Error al guardar el usuario');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 font-switzer">Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tipoUsuario" className="block text-gray-900 font-bold mb-2 font-switzer">Tipo de usuario</label>
          <div className="mb-2 text-gray-700">
          <div className="absolute flex items-center px-[400px] pt-3 pointer-events-none">
            <FaChevronDown className="w-4 h-4 text-gray-700" />
          </div>
            <select
            id="tipoUsuario"
            className=" font-switzer shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none  focus:shadow-outline"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            >
            <option value="" disabled defaultValue >Selecciona una opción</option>
            <option value="electricista">Electricista</option>
            <option value="usuario">Usuario</option>
            </select>
          </div>
          </div>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-900 font-bold mb-2 font-switzer">Nombre</label>
            <input
            type="text"
            id="nombre"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
           placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            />
          </div>
           <div className="mb-4">
          <label htmlFor="apellidos" className="block text-gray-900 font-bold mb-2 font-switzer">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tus apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
            />
          </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-900 font-bold mb-2 font-switzer">Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 font-bold mb-2 font-switzer">Email</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ubicacion" className="block text-gray-900 font-bold mb-2 font-switzer">Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>
        {tipoUsuario === 'electricista' && (
          <>
            <div className="mb-4">
              <label htmlFor="nombreempresa" className="block text-gray-900 font-bold mb-2 font-switzer">Nombre de la empresa</label>
              <input
                type="text"
                id="nombreempresa"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingresa el nombre de la empresa o sociedad"
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefono" className="block text-gray-900 font-bold mb-2 font-switzer">Teléfono</label>
              <input
                type="text"
                id="telefono"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingresa tu número de teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="servicios" className="block text-gray-900 font-bold mb-2 font-switzer">Servicios</label>
              <textarea
                id="servicios"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                placeholder="Detalla los servicios que puedes ofrecer a los clientes, además de los servicios que has realizado."
                value={servicios}
                onChange={(e) => setServicios(e.target.value)}
                required
              ></textarea>
            </div>
          </>
        )}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );

}

export default Formulario;