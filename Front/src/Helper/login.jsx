async function fetchInicio(dataUser) {
        
    const urlApi = 'http://localhost:3400/api/login';
    const urlencoded = new URLSearchParams();
    
    urlencoded.append("usuario", dataUser.usuario);
    urlencoded.append("password", dataUser.password);
    urlencoded.append("tipoUsuario", dataUser.tipoUsuario);

    const response = await fetch(urlApi, {
        method: 'POST',
        body: urlencoded,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    });
  
    const data = await response.json();
    return data;
}

export default fetchInicio;