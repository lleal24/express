const paqBaseUrlActuales = "https://fpaqtest.azurewebsites.net/api/packages/";
const paqBaseUrlHistorico = "https://fpaqtest.azurewebsites.net/api/packages/";
const paqBaseUrlAlertas = "https://fpaqtest.azurewebsites.net/api/PreAlerts/GetCurrentPrealertsByClient/";

window.onload = callData;

function callData() {
    var dataout = fivepaq.dataOut();
    $("#nomUsuario").html(dataout.U); //este es el campo del usuario
    $("#emailUsuario").html(dataout.E); //este es el campo del Email
    $("#numCasillero").html(dataout.N); //Este es campo del casillero
    $("#telefonoUsuario").html(dataout.Tel); //Este es campo del telefono
    var dataout = fivepaq.dataOut();

    if (dataout == null || dataout.L !== true) {
        location.href = "index.html";
    }
    fivepaq.cargarDireccionesCliente();
}

function cerrarsesion() {
    fivepaq.logOut();
    location.href = "index.html";
}

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
});

const vp = new Vue({
    el: '#appPaq',
    data: {
        results: []
    },
    mounted() {
        this.getPaqs();
    },
    methods: {
        getPaqs() {
            var dataout = JSON.parse(sessionStorage.getItem('appData'));
            let url = paqBaseUrlActuales + dataout.C;
            axios.get(url,
                {
                    headers: {
                        "Authorization": "Bearer " + dataout.T
                    }
                })
                .then((response) => {
                    // debugger;
                    this.loading = false;
                    this.results = response.data;
                    // debugger;
                }).catch((error) => { console.log(error); });
        }
    }
});

const vhis = new Vue({
    el: '#appHis',
    data: {
        results: []
    },
    mounted() {
        this.getPaqs();
    },
    methods: {
        getPaqs() {
            var dataout = JSON.parse(sessionStorage.getItem('appData'));
            let url = `${paqBaseUrlHistorico + dataout.C}/15`;
            axios.get(url,
                {
                    headers: {
                        "Authorization": "Bearer " + dataout.T
                    }
                })
                .then((response) => {
                    this.loading = false;
                    this.results = response.data;
                }).catch((error) => { console.log(error); });
        }
    }
});
const valert = new Vue({
    el: '#appAlert',
    data: {
        results: []
    },
    mounted() {
        this.getPaqs();
    },
    methods: {
        getPaqs() {
            var dataout = JSON.parse(sessionStorage.getItem('appData'));
            let url = `${paqBaseUrlAlertas + dataout.C}/20?ClienteId=${dataout.C}`;
            axios.get(url,
                {
                    headers: {
                        "Authorization": "Bearer " + dataout.T
                    }
                })
                .then((response) => {
                    debugger;
                    this.loading = false;
                    this.results = response.data;
                    debugger;
                }).catch((error) => { console.log(error); });
        }
    }
});



// async function mcActuales() {
//     try {
//         var dataout = JSON.parse(sessionStorage.getItem('appData'));
//         let response = await fetch(paqBaseUrlActuales + dataout.C, {
//             headers: {
//                 "Authorization": "Bearer " + dataout.T
//             }
//         });
//         let result = await response.json();
//         let element = getElementById('dataActuales').innerHTML = "";
//         element.html = `<tr>
//                             <td>${element}</td>
//                         </tr>
//         `

//         console.log(result);

//     } catch (error) {
//         console.log(error);
//     }


// }
