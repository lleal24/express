let urlCiudades = 'https://fpaq.azurewebsites.net/api/ciudades';
window.onload = callService;

function callService() {
    getCiudades();
}
async function getCiudades() {
    try {
        sessionStorage.setItem('appDataCon', '25')
        let req = await fetch(urlCiudades);
        if (req.status === 200) {
            let data = await req.json();
            localStorage.setItem("ciudades", JSON.stringify(data));
            obtenerPaises(data);
        }

    } catch (error) {
        console.log("Se ha producido un error");
    }
}

function obtenerPaises(data) {
    let paises = [];
    let elementos = document.querySelectorAll('#pais');
    data.forEach(element => {
        if (paises.indexOf(element.Pais) == -1) {
            paises.push(element.Pais);
        }
    });
    paises.forEach(element => {  
        elementos.forEach(elemento => {
            let option = document.createElement('option');
            option.value = element;
            option.text = element;
            elemento.add(option);
        });
    });
}

function cargaDept() {
    let tempArray = []
    let departamentos = [];
    let data = JSON.parse(localStorage.getItem("ciudades"));
    let pais = document.querySelectorAll('#pais');
    pais.forEach(elemento => {
        let paisValue = elemento.value;
        data.forEach(element => {
            if(element.Pais == paisValue){
                tempArray.push(element.Estado);
            }
        });
        tempArray.forEach(element => {
            if (departamentos.indexOf(element) == -1) {
                departamentos.push(element);
            }
        });
    });
    let elementos = document.querySelectorAll('#estado');
    elementos.forEach(elemento => {
        elemento.options.length = 1;
        departamentos.forEach(departamento => {
            let option = document.createElement('option');
            option.text = departamento;
            option.value = departamento;
            elemento.add(option);
        });
    });
}

function cargaCiudades() {
    let ciudades = [];
    let data = JSON.parse(localStorage.getItem("ciudades"));
    let estado = document.querySelectorAll('#estado');
    estado.forEach(elemento => {
        let estadoValue = elemento.value;
        data.forEach(element => {
            if (element.Estado == estadoValue) {
                ciudades.push(element.Ciudad);
            }
        });
    });
    let elementos = document.querySelectorAll('#ciudad');
    elementos.forEach(elemento =>{
        elemento.options.length = 1;
        ciudades.forEach(ciudad => {
            let option = document.createElement('option');
            option.value = ciudad;
            option.text = ciudad;
            elemento.add(option);
        });
    })
}

function getIdLocation() {
    let datosCiudad = [];
    let datosEstado = [];
    let datosPais = [];
    let data = JSON.parse(localStorage.getItem("ciudades"));
    let ciudades = document.querySelectorAll('#ciudad');
    let estados = document.querySelectorAll('#estado');
    let paises = document.querySelectorAll('#pais');
    ciudades.forEach(ciudad =>{
        datosCiudad.push(ciudad.value);
    });
    estados.forEach(estado =>{
        datosEstado.push(estado.value);
    });
    paises.forEach(pais =>{
        datosPais.push(pais.value);
    });

    data.forEach(element =>{
        if(datosCiudad[1] == element.Ciudad && datosEstado[1] == element.Estado && datosPais[1] == element.Pais){
            document.getElementById('ciudadIdRegistro').value = element.CiudadId;
            // alert(element.CiudadId);
        }
    });
    
    // data.forEach(element => {
    //     if(ciudad[1] == element.Ciudad && estado[1] == element.Estado && pais[1] == element.Pais){
    //         document.getElementById('ciudadIdRegistro').value = element.CiudadId;
    //         console.log(element.CiudadId);
    //     }
    // });

    // let ciudad = document.getElementById('ciudadRegistro').value;
    // let estado = document.getElementById('estadoRegistro').value;
    // let pais = document.getElementById('paisRegistro').value;
    // data.forEach(element => {
    //     if (ciudad == element.Ciudad && estado == element.Estado && pais == element.Pais) {
    //         document.getElementById('ciudadIdRegistro').value = element.CiudadId;
    //         //console.log(element.CiudadId);
    //     }
    // });
}