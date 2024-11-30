import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import storage from '../Utils/storage';


const Perfil = ( { tipo } ) => {

    const { id } = useParams();
    const [tipoUsuario, setTipoUsuario] = useState(storage.get('tipoUsuario') ?? null);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userValoraciones, setUserValoraciones] = useState({});
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [idStorage, setIdStorage] = useState(storage.get('userId') ?? null);

    const [image, setImage] = useState('../../images/nofoto.png');
    const [file, setFile] = useState(null);

    const apiUpload = 'http://localhost:3400/api/uploadImage';

    const handleImageChange = async (e) => {
        const selectFile = e.target.files[0];
        if (selectFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectFile);
            setFile(selectFile)
            try {
                const formdata = new FormData();
                formdata.append("id", id);
                formdata.append("tipo", tipoUsuario);
                formdata.append("attachment", selectFile, "fullStar.png");

                const requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow"
                  };

                fetch(apiUpload, requestOptions)
                    .then( (response) =>  response.json())
                    .then((result) => {
                        console.log(result)
                        alert('Cambios guardados correctamente')
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('No se pudieron guardar los cambios')
                    });

            } catch (error) {
                console.log(error);
                alert('No se pudieron guardar los cambios');
            }
        }
    };


    const urlApi = tipo === 'electricista'
        ? `http://localhost:3400/api/electricistas/${id}`
        : `http://localhost:3400/api/usuarios/${id}`;

    useEffect(() => {

        if ( idStorage === null || parseInt(idStorage) !== parseInt(id) || tipo !== tipoUsuario ) {
            navigate('/'); 
        }

        fetch(urlApi)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setUserData(data.data)
                setUserValoraciones(data.valoraciones)
                setFormData(data.data)
                if ( data.data.tieneFoto ) {
                    setImage('../../images/' + tipoUsuario + '/' + data.data.id +'.' + data.data.typeFoto);
                }
            })
    }, [ idStorage ])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData(formData);
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("apellidos", formData.apellidos);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("telefono", formData.telefono);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("ubicacion", formData.ubicacion);
        formDataToSend.append("nombreEmpresa", formData.nombreEmpresa);
        formDataToSend.append("servicios", formData.servicios);
        formDataToSend.append("image", formData.file);
        console.log(formDataToSend)
        console.log(urlApi)
        try {
            const response = await fetch(urlApi, {
                method: 'PUT',
                body: formDataToSend,
                // headers: {
                //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // },
            });

            if (!response.ok) {
                throw new Error('Error al guardar el usuario');
            }

            setTimeout(() => {
                alert('Cambios guardados correctamente');
            }, 1000);
        } catch (error) {
            console.log(error);
            alert('No se pudieron guardar los cambios');
        }
        setEditing(false);
    };

    const eliminar = async () => {
        try {
            const response = await fetch(urlApi, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Error al guardar el usuario');
            }

            setTimeout(() => {
                alert('Usuario eliminado correctamente');
            }, 1000);
        } catch (error) {
            console.log(error);
            alert('No se pudo borrar usuario');
        }
    };

    const cerrarSesion = () => {
        storage.clear();
        setIdStorage(null);
    };

if (!userData) return null;

return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-lg font-bold mb-4">Información del Usuario</h2>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Agregar campos de formulario adicionales según el tipo de usuario */}
                    {tipoUsuario !== 'electricista' ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidos">
                                    Apellidos:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellidos"
                                    type="text"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ubicacion">
                                    Ubicación:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ubicacion"
                                    type="text"
                                    name="ubicacion"
                                    value={formData.ubicacion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valoraciones">
                                    Valoraciones:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="valoraciones"
                                    type="number"
                                    name="valoraciones"
                                    value={formData.valoraciones}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidos">
                                    Apellidos:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellidos"
                                    type="text"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreEmpresa">
                                    Nombre de la Empresa:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombreEmpresa"
                                    type="text"
                                    name="nombreEmpresa"
                                    value={formData.nombreEmpresa}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    Teléfono:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="telefono"
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicios">
                                    Servicios:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="servicios"
                                    type="text"
                                    name="servicios"
                                    value={formData.servicios}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Guardar
                    </button>
                    <a
                        onClick={() => { setEditing(false) }}><span
                            className="text-red-400 hover:bg-slate-100 cursor-pointer font-bold py-2 px-4"
                        >
                            Cancelar</span>
                    </a>
                    <button
                        onClick={cerrarSesion}
                        className="bg-grey-500 hover:bg-grey-700 font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    >
                        Cerrar Sesión
                    </button>
                </form>
            ) : (
                <>
                    <p className="mb-4"><span className="font-semibold">Nombre:</span> {userData.nombre}</p>
                    {tipo === 'usuario' ? (
                        <>
                            <p className="mb-4"><span className="font-semibold">Apellidos:</span> {userData.apellidos}</p>
                            <p className="mb-4"><span className="font-semibold">Ubicación:</span> {userData.ubicacion}</p>
                            <p className="mb-4"><span className="font-semibold">Valoraciones:</span> {userData.valoraciones}</p>
                        </>
                    ) : (
                        <>
                            <p className="mb-4"><span className="font-semibold">Apellidos:</span> {userData.apellidos}</p>
                            <p className="mb-4"><span className="font-semibold">Ubicación:</span> {userData.ubicacion}</p>
                            <p className="mb-4"><span className="font-semibold">Nombre de la Empresa:</span> {userData.nombreEmpresa}</p>
                            <p className="mb-4"><span className="font-semibold">Email:</span> {userData.email}</p>
                            <p className="mb-4"><span className="font-semibold">Teléfono:</span> {userData.telefono}</p>
                            <p className="mb-4"><span className="font-semibold">Servicios:</span> {userData.servicios}</p>
                        </>
                    )}
                     <div>
                        <label htmlFor="image-input">
                            <img src={image} alt="User" className='w-32 h-32 mx-auto rounded-full mb-4 cursor-pointer' />
                        </label>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    >
                        Editar
                    </button>
                    <button
                        onClick={cerrarSesion}
                        className="bg-grey-500 hover:bg-grey-700 font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    >
                        Cerrar Sesión
                    </button>
                    <button
                        onClick={eliminar}
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    >
                        Eliminar
                    </button>
                </>
            )}
        </div>
    </div>
    </>
);
};

export default Perfil;