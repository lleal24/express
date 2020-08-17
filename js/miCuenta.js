const paqBaseUrlActuales = "https://fpaq.azurewebsites.net/api/packages/";
const paqBaseUrlHistorico = "https://fpaq.azurewebsites.net/api/packages/";
const paqBaseUrlAlertas = "https://fpaq.azurewebsites.net/api/PreAlerts/GetCurrentPrealertsByClient/";



function cerrarsesion() {
    fivepaq.logOut();
    location.href = "index.html";
}

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).locale('es').format('LLL')
    }
});

Vue.filter("formatNumber", function (value) {
    return (value).toFixed();
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



