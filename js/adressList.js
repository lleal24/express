Vue.component("v-select", VueSelect.VueSelect);

const paqBaseUrlLocation = " https://fpaq.azurewebsites.net/api/locations/";
const ciudadesUrl = " https://fpaq.azurewebsites.net/api/ciudades";
const locationUrl = " https://fpaq.azurewebsites.net/api/locations/CreateLocation";
// debugger;

const vl = new Vue({
  el: '#appDirecciones',
  data: {
    results: [],
    address: {
      UbicacionId: 0,
      ClienteId: '',
      Detalle: '',
      NombreDestinatario: '',
      Direccion: '',
      CodigoPostal: '',
      CiudadId: '',
      Principal: false,
      Lat: 0,
      Lon: 0
    },
    ciudades: []

    // showModal: false
  },
  mounted() {
    this.getLocs();
  },
  methods: {
    getLocs() {
      // debugger;
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      let url = paqBaseUrlLocation + dataout.C;
      // debugger;
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
        }).catch((error) => { console.log(error); });

      axios.get(ciudadesUrl)
        .then((response) => {
          // debugger;
          this.ciudades = response.data
        })
        .catch((error) => { console.log(error) });
    }

  }
});

const vmodal = new Vue({
  el: '#appModal',
  data: {
    UbicacionId: 0,
    ClienteId: '',
    DetalleValid: {
      input: '',
      mensaje: '',
      clase: '',
    },
    NombreDestinatarioValid: {
      input: '',
      mensaje: '',
      clase: '',
    },
    DireccionValid: {
      input: '',
      mensaje: '',
      clase: '',
    },
    CodigoPostalValid: {
      input: '',
      mensaje: '',
      clase: '',
    },
    CiudadIdValid:{
      input: '',
      mensaje: '',
      clase: '',
    },
    PrincipalValid: false,
    Lat: 0,
    Lon: 0,
    ciudadesValid: [],
    validar: "disabled",
  },
  mounted() {
    this.getLocs();
  },
  methods: {
    validarDatos: function (dataValid) {
      // debugger;
      if (dataValid.input == "") {
        dataValid.mensaje = "el campo es requerido";
        dataValid.clase = "warning";
      }
      else {
        // debugger;
        dataValid.mensaje = "";
        dataValid.clase = "success";
      }
      if (this.DetalleValid.clase != "success" || this.NombreDestinatarioValid.clase != "success"|| this.DireccionValid.clase != "success") { this.validar = "disabled"; }
      else { this.validar = ""; }
    },
    enviar: function () {
      
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      // debugger;
      var destino = vl.$data.address;

      destino.ClienteId = dataout.C;
      destino.UbicacionId = this.UbicacionId;
      destino.CiudadId = this.CiudadIdValid.CiudadId;
      destino.Detalle = this.DetalleValid.input;
      destino.NombreDestinatario = this.NombreDestinatarioValid.input;
      destino.Direccion = this.DireccionValid.input;
      // debugger;
      destino.CodigoPostal = this.CodigoPostalValid.input;
      destino.Principal = this.PrincipalValid;
      destino.Lat = this.Lat;
      destino.Lon = this.Lon;

      axios.post(locationUrl, destino,
        {
          headers: {
            "Authorization": "Bearer " + dataout.T
          }
        })
        .then(function (response) {
            debugger
          console.log(response);
          let modal = document.getElementById('show-modal');
      
          

          // this.limpiar();
          // limpiar();
          swal({
            title: 'Se Agrego Direccion',
            text: "",
            type: 'success',
            
          }).then((result) => {
            if (result.value) {
             
            }
          })
          

        })
        .catch(function (error) {
          console.log(error);
        });
      this.$forceUpdate();
      // this.Vue.delete(vmodal,data);
      
    },
    getLocs() {
      axios.get(ciudadesUrl)
        .then((response) => {
          // debugger;
          this.ciudadesValid = response.data
        })
        .catch((error) => { console.log(error) });

    },
    limpiar(){
      
      CiudadIdValid.input=""
      UbicacionId=""
      DetalleValid.input=""
      NombreDestinatarioValid.input=""
      DireccionValid.input=""
      CodigoPostalValid.input=""
    }
  }
});





