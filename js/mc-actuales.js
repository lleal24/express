const paqBaseUrl = "https://fpaqtest.azurewebsites.net/api/packages/";

Vue.filter('formatDate', function(value) {
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
  mounted () {
    this.getPaqs();
  },
  methods: {
    getPaqs() {
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      let url = paqBaseUrl + dataout.C;
      axios.get(url,    
        {
            headers: {
                "Authorization" : "Bearer " +  dataout.T
            }
        })
      .then((response) => {
        this.loading = false;
        this.results = response.data;
      }).catch((error) => { console.log(error); });
    }
  }
});