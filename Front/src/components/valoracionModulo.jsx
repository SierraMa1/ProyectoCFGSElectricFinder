import React from 'react';
import StarRating from './starRating';
import { Link } from 'react-router-dom';

const ValoracionModulo = ( {valoracion} ) => {
    return (
        <Link to={`/electricista/${valoracion.id}`}className="flex flex-col items-start px-16  my-5 rounded-[35px] max-md:px-5 bg-gradient-to-r from-neutral-200 to-sky-200  hover: from-bg-sky-200 hover:to-blue-200">
            <div className="text-xl font-extrabold text-blue-500 max-md:max-w-full">  
                <div className="self-center mt-10 w-full max-w-[895px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                            <div className="flex overflow-hidden relative flex-col items-end px-16 pt-20 pb-4 aspect-[1.11] max-md:px-5 max-md:mt-5">
                                {valoracion.tieneFoto && valoracion.typeFoto ? (
                                    <img src={`images/usuario/${valoracion.usuario_id}.${valoracion.typeFoto}`} alt={`${valoracion.usuario}`} className="object-cover absolute inset-0 w-100 h-50" />

                                ) : (
                                    <img src={'../../images/nofoto.png'} alt={`${valoracion.usuario}`} className="object-cover absolute inset-0 size-full" />

                                )}
                                
                            </div>
                        </div>
                        <div className="flex flex-col grow items-start mt-4 max-md:mt-9 max-md:max-w-full">

                            <StarRating rating={valoracion.puntuacion}/>
                            <div className="mt-7 text-3xl text-black">{valoracion.puntuacion}/5</div>
                            <div className="self-stretch mt-6 text-xl text-black max-md:max-w-full">
                                {valoracion.comentario}
                            </div>
                            <div className="shrink-0 self-stretch mt-6 h-px bg-zinc-300 max-md:max-w-full" />
                            <div className="mt-7 text-xl font-bold text-black">
                                {valoracion.usuario}
                            </div>
                            <div className="mt-2 mb-3 text-xl text-gray-500">
                                {valoracion.ubicacion_usuario}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ValoracionModulo;