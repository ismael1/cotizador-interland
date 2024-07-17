<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";
import Multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";
import $ from 'jquery'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
// register globally

/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'
import templateAduana from '@/components/ItemTemplateAduana';


export default {
  page: {
    title: "Nueva Tarifa",
    meta: [{ name: "newTarifa", content: appConfig.description }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nueva Tarifa",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Tarifas",
          href: "/cotizaciones/listTarifarios",
        },
        {
          text: "Nueva Tarifa",
          href: "/newTarifa",
          active: true,
        },
      ],

      /* INICIA SECCION DE LTL */
      origen: '',
      destino: '',
      factor_conversion: 350,
      recoleccion_tres_y_media: 0.0,
      recoleccion_rabon: 0.0,
      recoleccion_torton: 0.0,
      flete_nacional: 0.0,
      entrega_puerto_nissan: 0.0,
      entrega_puerto_tres_y_media: 0.0,
      entrega_rabon: 0.0,
      entrega_torton: 0.0,

      listPorcentajes: [],
      listOD: [],
      listTipoZona: [],

      /* TERMINA SECCION DE LTL */
      /* INICIA SECCION DE FTL */

      unidades: [],
      options_unit: [],

      origenes_ftl: [],
      options_origen_ftl: [],
      datosOrigenesFTLOcupar: [],
      
      destinos_ftl: [],
      options_destinos_ftl: [],
      datosDestinosFTLOcupar: [],
      /* TERMINA SECCION DE FTL */

      /* INICIA SECCION UNIDADES */
        datosUnidaddesFtlOcupar: [],

      /* TERMINA SECCION UNIDADES */

      agregarTarifa: [],

      rangos: [],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

      mostrarTarifario: false,

      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

    };
  },

  created() {
    /*this.getId();
    this.getContry();*/
    this.dataSess();
    this.cargaUnidades();
    this.cargaEstados();
    this.obtenerPorcentajes();
  },

  methods: {
    dataSess(){
      let data = JSON.parse(localStorage.getItem('users'))
      
      for (let i = 0; i < data.length; i++) {
        this.idU = data[i].id;
        this.emailU = data[i].email;
        this.nombreU = data[i].nombre;
        this.username = data[i].username;
        this.tokenU = data[i].token;
        this.puestoU = data[i].puesto;
      }
    },
    
    Save() {

      if (this.origen == '' || this.origen == null) {
        Swal.fire({
          title: 'Ingresa un Origen valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.destino == '' || this.destino == null) {
        Swal.fire({
          title: "Ingresa un Destino Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.factor_conversion == 0 || this.factor_conversion == "") {
        Swal.fire({
          title: "El factor de conversión debe der mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      if (this.recoleccion_tres_y_media == 0 || this.recoleccion_tres_y_media <= 0 || this.recoleccion_tres_y_media == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad 3 1/2 debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.recoleccion_rabon == 0 || this.recoleccion_rabon <= 0 || this.recoleccion_rabon == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad Rabon debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.recoleccion_torton == 0 || this.recoleccion_torton <= 0 || this.recoleccion_torton == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad Torton debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.flete_nacional == 0 || this.flete_nacional <= 0 || this.flete_nacional == "") {
        Swal.fire({
          title: "El Costo del Flete Nacional debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_puerto_nissan == 0 || this.entrega_puerto_nissan <= 0 || this.entrega_puerto_nissan == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Nissan debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_puerto_tres_y_media == 0 || this.entrega_puerto_tres_y_media <= 0 || this.entrega_puerto_tres_y_media == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad 3 1/2 debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_rabon == 0 || this.entrega_rabon <= 0 || this.entrega_rabon == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Rabon debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_torton == 0 || this.entrega_torton <= 0 || this.entrega_torton == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Torton debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let tarifa = {
        origen: this.origen,
        destino: this.destino,
        factor_conversion: this.factor_conversion,
        recoleccion_tres_y_media: this.recoleccion_tres_y_media,
        recoleccion_rabon: this.recoleccion_rabon,
        recoleccion_torton: this.recoleccion_torton,
        flete_nacional: this.flete_nacional,
        entrega_puerto_nissan: this.entrega_puerto_nissan,
        entrega_puerto_tres_y_media: this.entrega_puerto_tres_y_media,
        entrega_rabon: this.entrega_rabon,
        entrega_torton: this.entrega_torton,
        usuario: this.username,
      };

      this.agregarTarifa.push(tarifa);

      axios({
        method: "post",
        url: `/api/v1/nueva-tarifa/`,
        data: {

          datos: this.agregarTarifa

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)

        if(response.data[0].insert){
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/new-tarifa";
            }
          })
        }else{
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
        
      })

    },

    getId() {
      axios({
        method: "post",
        url: `/api/v1/zonas-obtenerid/`,
        auth: {
          username: "admin",
          password: "123",
        },
        data: {
          id: 1,
        }
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.id = response.data[0].idZona;
          } else {
            this.id = 0
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    cargaLTLManual(){
      this.getId();
      this.getContry();
      this.dataSess();
    },
    
    getIdH() {
      axios({
        method: "post",
        url: `/api/v1/zonas-obteneridhijos/`,
        auth: {
          username: "admin",
          password: "123",
        },
        data: {
          id: 1,
        }
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.idH = response.data[0].idZonasHijo;
          } else {
            this.idH = 0
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getLabelProSer(item) {
      if (item) {
        this.nameProSer = item.descripcion
        this.claveProSer = item.clave_prodserv
        this.claveProSer2 = item.clave_prodserv
        return item.clave_prodserv
      } else {
        this.nameProSer = ''
      }
    },

    updateItemsProSer(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-proser/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_proser = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getLabelUnidad(item) {
      if (item) {
        this.claveUnit = item.claveUnidad + " - " + item.nombre
        this.claveUnit2 = item.claveUnidad
        return item.claveUnidad + " - " + item.nombre
      }
    },

    updateItemsUnidad(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-unidad/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_unidad = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getContry() {
      this.estado = ""
      this.estados = []
      this.municipio = []
      this.municipios = []
      this.cp = []
      this.cps = []
      axios.get(`/api/v1/list-country/`)
        .then((response) => {
          this.paises = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getEstado(event) {

      this.estado = ""
      this.estados = []
      this.municipio = []
      this.municipios = []
      this.cp = []
      this.cps = []

      let pkPais = event;
      axios.get(`/api/v1/list-estates/${pkPais}/`)
        .then((response) => {
          this.estados = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMunicipios() {

      this.municipio = []
      this.cp = []
      this.cps = []

      let pais = this.pais;
      let estado = this.estado;

      let nomEst = $("#" + estado + "est").attr("data-name");
      this.nomEst = nomEst

      if (pais != "") {
        axios({
          method: "post",
          url: "/api/v1/municipio/",
          data: {
            estado: estado,
            pais: pais,
          },
        })
          .then((response) => {
            this.municipios = response.data
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getCodigoPostal(idMun) {

      let comprobar = document.getElementById(idMun + "-mun").checked;
      
      if (comprobar) {
        this.municipio.push(idMun)
      }else{
        var idMu = this.municipio.indexOf(idMun);
        if (idMu != -1){
          this.municipio.splice(idMu, 1);
        }
      }
      if (this.pais != "" && this.estado != "" && this.municipio.length > 0) {
        axios({
          method: "post",
          url: "/api/v1/cp/",
          data: {
            estado: this.estado,
            pais: this.pais,
            municipio: this.municipio,
          },
        })
          .then((response) => {
            
            this.cps = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        this.cps = []
      }
    },

    codigosSelecciona(cp) {

      let comprobar = document.getElementById(cp + "-cp").checked;
      
      if (comprobar) {
        this.cp.push(cp)
      }else{
        var idMu = this.cp.indexOf(cp);
        if (idMu != -1){
          this.cp.splice(idMu, 1);
        }
      }
    },

    /* METODOS FTL */
    cargaEstados(){
      axios({
        method: "get",
        url: "/api/v1/get-estados-geocercas/",
        data: {},
      }).then((response) => {

        for (let i = 0; i < response.data.data.length; i++) {
          
          const data = {name: response.data.data[i].estado + ', ' + response.data.data[i].ciudad + ', C.P.:' + response.data.data[i].codigoPostal, idGeocerca:response.data.data[i].idGeocerca};
          
          this.options_origen_ftl.push(data);
          this.options_destinos_ftl.push(data);
        }

        const data = {name: "Zona Metropolitana", code:"Zona Metropolitana"};
          
        this.options_origen_ftl.push(data);
        this.options_destinos_ftl.push(data);
        
      }).catch((error) => {
        console.log(error);
      });
    },

    addUnidad (newTag) {
      
      Swal.fire({
        title: "La unidad: "+newTag+" no está dada de alta, verificalo porfavor.",
        text: "",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return false;
      /*const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.unidades.push(tag)*/
    },

    addOrigenes (newTag) {
      
      Swal.fire({
        title: "El origen: "+newTag+" no está dado de alta en las geocercas, verificalo porfavor.",
        text: "",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return false;

      /*const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.origenes_ftl.push(tag)*/
    },

    addDestinos (newTag) {
      
      Swal.fire({
        title: "El destino: "+newTag+" no está dado de alta en las geocercas, verificalo porfavor.",
        text: "",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return false;
      /*const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.destinos_ftl.push(tag)*/
    },

    cargaUnidades(){

      this.options_unit = [];
      let tipo = 'g';
      axios({
        method: "post",
        url: "/api/v1/list-box/",
        data: {
          data: tipo,
        },
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const data = {name:response.data[i].name,"id":response.data[i].id}
          
          this.options_unit.push(data);
        }
      }).catch((error) => {
        console.log(error);
      });

    },

    getDistacias(){

      let params = {
                    "destinations": destino,
                    "origins": origen,
                    "units": "metric",
                    "key": "AIzaSyADhOxfxQ9u-0_4FuHs8sVMHnyw0TnI11Y"
                } 
        
        response = axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {params:params})
        
        let data = json.loads(response.text)
        console.log(data);
    },

    async generarTarifaFTL(){
      this.itemsTarifarioFTL = []
      this.datosOrigenesFTLOcupar = []
      this.datosDestinosFTLOcupar = []
      this.datosUnidaddesFtlOcupar = []
      this.rangos = []
      
      const auth = { username: "admin", password: "123", }
      let ids = ''

      if (this.origenes_ftl.length == 0) {
        Swal.fire({
          title: "Debes seleccionar al menos un origen.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      if(this.destinos_ftl.length == 0){
        Swal.fire({
          title: "Debes seleccionar al menos un destino.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      if(this.unidades.length == 0){
        Swal.fire({
          title: "Debes seleccionar al menos una Unidad.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      for (let i = 0; i < this.origenes_ftl.length; i++) {
        let org =  await axios({
          method: "get",
          url: "/api/v1/get-datos-geocercas/",
          params: {
            idGeocerca: this.origenes_ftl[i].idGeocerca,
          },
          auth: auth,
        }).then((response) => {
          this.datosOrigenesFTLOcupar.push(response.data[0])
        }).catch((error) => {
          console.log(error);
        });
      }

      for (let i = 0; i < this.destinos_ftl.length; i++) {
        let dest =  await axios({
          method: "get",
          url: "/api/v1/get-datos-geocercas/",
          params: {
            idGeocerca: this.destinos_ftl[i].idGeocerca,
          },
          auth: auth,
        }).then((response) => {
          this.datosDestinosFTLOcupar.push(response.data[0])
        }).catch((error) => {
          console.log(error);
        });
      }

      for (let i = 0; i < this.unidades.length; i++) {
        let unit =  await axios({
          method: "get",
          url: "/api/v1/catalogo-getUnidad/"+this.unidades[i].id+"/",
          params: {},
          auth: auth,
        }).then((response) => {
          this.datosUnidaddesFtlOcupar.push(response.data)
        }).catch((error) => {
          console.log(error);
        });
      }

      let rangos =  await axios({
        method: "get",
        url: "/api/v1/getRangos/",
        params: {},
        auth: auth,
      }).then((response) => {          
        this.rangos = response.data.data
      }).catch((error) => {
        console.log(error);
      });

      this.listOD = []

      for (let o = 0; o < this.datosOrigenesFTLOcupar.length; o++) {
        for (let d = 0; d < this.datosDestinosFTLOcupar.length; d++) {
          let dato = {"pais_o":this.datosOrigenesFTLOcupar[o].pais,"estado_o":this.datosOrigenesFTLOcupar[o].estado,"ciudad_o":this.datosOrigenesFTLOcupar[o].ciudad, "cp_o":this.datosOrigenesFTLOcupar[o].codigoPostal, "pais_d":this.datosDestinosFTLOcupar[d].pais,"estado_d":this.datosDestinosFTLOcupar[d].estado,"ciudad_d":this.datosDestinosFTLOcupar[d].ciudad, "cp_d":this.datosDestinosFTLOcupar[d].codigoPostal}
          this.listOD.push(dato)
        }
      }
      
      axios({
        method: "post",
        url: "/api/v1/valida-tipo-zona/",
        data: {data:this.listOD},
        auth: auth,
      }).then((response) => {
        this.listTipoZona = response.data
      }).catch((error) => {
        console.log(error);
      });

      this.mostrarTarifario = true


      /* SE INICIA EL RECORRIDO DE UNIDADES Y RANGOS */
      
      /*for (let o = 0; o < this.datosUnidaddesFtlOcupar.length; o++) {
        let rangoTabla = '';
        let maxR = 0;
        let datos = {}
        console.log(this.datosUnidaddesFtlOcupar[o].code_name);

        for (let r = 0; r < this.rangos.length; r++) {
          this.rangos[r].min
          this.rangos[r].max
          rangoTabla =  this.rangos[r].min + '-'+ this.rangos[r].max
          maxR = parseFloat(this.rangos[r].max);
          
          
          
        }
        datos = {nombre: this.datosUnidaddesFtlOcupar[o].code_name, costo_kilometro: this.datosUnidaddesFtlOcupar[o].precio_kilometraje, "1-30": (parseFloat(this.datosUnidaddesFtlOcupar[o].precio_kilometraje) * maxR), "31-60": (parseFloat(this.datosUnidaddesFtlOcupar[o].precio_kilometraje) * maxR), "61-90": (parseFloat(this.datosUnidaddesFtlOcupar[o].precio_kilometraje) * maxR), "91-120": (parseFloat(this.datosUnidaddesFtlOcupar[o].precio_kilometraje) * maxR),}
        this.itemsTarifarioFTL.push(datos)
        
      }*/
      //console.log(this.itemsTarifarioFTL)
      /*this.itemsTarifarioFTL = [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', idGeocerca: '234'},
        { age: 21, first_name: 'Larsen', last_name: 'Shaw', idGeocerca: '235'},
        { age: 89, first_name: 'Geneva', last_name: 'Wilson', idGeocerca: '236'},
        { age: 38, first_name: 'Jami', last_name: 'Carney', idGeocerca: '237' }
      ],*/
      /*console.log(this.datosOrigenesFTLOcupar);
      console.log(this.datosDestinosFTLOcupar);
      console.log(this.datosUnidaddesFtlOcupar);*/
      
      /*console.log(this.origenes_ftl);
      console.log(this.destinos_ftl);
      console.log(this.unidades);*/
      

    },

    generarTituloColumna(rango, origen, destino) {
      let rango_text = '';
      let km = '';

      for (let i = 0; i < this.listTipoZona.length; i++) {
        let origenValor = origen.pais+', '+origen.estado+', '+origen.ciudad+', '+origen.codigoPostal;
        let destinoValor = destino.pais+', '+destino.estado+', '+destino.ciudad+', '+destino.codigoPostal;
        if(this.listTipoZona[i].origen == origenValor && this.listTipoZona[i].destino == destinoValor){
          km = parseFloat(this.listTipoZona[i].km)
          if(km > rango.min  && km < rango.max){
            rango_text = 'de '+`${rango.min} km a ${km}`+' km (Carga General)';
            return rango_text
                
          }else{
            if(rango.max <= km ){
              rango_text = 'de '+`${(rango.min)} km a ${rango.max}`+' km (Carga General)';
              return rango_text
            }
          }
        }
      }
      //return 'de '+`${rango.min} km a ${rango.max}`+' km (Carga General)';
    },

    obtenerPorcentajes(){
      const auth = { username: "admin", password: "123", }
      
      axios({
        method: "get",
        url: "/api/v1/obtener-porcentajes/",
        data: {},
        auth: auth,
      }).then((response) => {
        this.listPorcentajes = response.data.data
      }).catch((error) => {
        console.log(error);
      });
    },

    generarValorCelda(dato, rango, origen, destino) {

        //$('#btn-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).empty();
      
      let max = parseFloat(rango.max);
      let precio = parseFloat(dato.precio_kilometraje);
      let resBase = 0;
      let res = 0;
      let resDes = 0;
      let resInc = 0;
      let tipoCarga = 'Carga General';

      let porcentajeIncremento = 0
      let porcentajeIncrementoZona = 0
      let porcentajeDecremento = 0

      for (let i = 0; i < this.listTipoZona.length; i++) {
        let origenValor = origen.pais+', '+origen.estado+', '+origen.ciudad+', '+origen.codigoPostal;
        let destinoValor = destino.pais+', '+destino.estado+', '+destino.ciudad+', '+destino.codigoPostal;
        let destinoRuta = origen.estado+' - '+destino.estado
        if(this.listTipoZona[i].origen == origenValor && this.listTipoZona[i].destino == destinoValor){
          let tipozona = 'Zona '+this.listTipoZona[i].tipoZona
          let km = parseFloat(this.listTipoZona[i].km)
          
          for (let i = 0; i < this.listPorcentajes.length; i++) {
            if(this.listPorcentajes[i].mercancia == tipozona && this.listPorcentajes[i].tipo == 'i'){
              porcentajeIncrementoZona = porcentajeIncrementoZona + parseFloat(this.listPorcentajes[i].porcentaje)
            }
            
            if(this.listPorcentajes[i].mercancia == tipoCarga && this.listPorcentajes[i].tipo == 'i'){
              porcentajeIncremento = porcentajeIncremento + parseFloat(this.listPorcentajes[i].porcentaje)
            }

            if(this.listPorcentajes[i].mercancia == destinoRuta  && this.listPorcentajes[i].tipo == 'd'){
              porcentajeDecremento = porcentajeDecremento + parseFloat(this.listPorcentajes[i].porcentaje)
              
            }
          }

          if( km >= rango.min && km <= rango.max) {
            res = precio * km
            console.log(res, 'Precio Maxima')
          }else{
            res = precio * max
            console.log(res, 'Precio Normal')
          }

          if(porcentajeIncrementoZona > 0){
            //res = precio * max;
            resInc = (res * porcentajeIncrementoZona) / 100;

            res = res + resInc;
            console.log(res, 'Precio Incremento', resInc, 'Incremento Zona', porcentajeIncrementoZona, 'Porcentaje Acumulado')
          }else{
            console.log(res, 'Precio Normal')
          }
          resBase = res
          if(max > 30){
            resDes = (resBase * porcentajeIncremento) / 100;
            console.log(resDes, 'Incremento')
            res = resBase + resDes;
            console.log(res, 'Precio con Incremento')

            resDes = (resBase * porcentajeDecremento) / 100;
            console.log(resDes, 'Descuento')
            res = res - resDes;
            console.log(res, 'Precio con Descuento')
          }

          console.log('-----------------------------------------------------------')
          return(res)
        }
        
      }

      /*let tipozona = '';
      const datoTipoZona = this.obtenerTipoZona(origen, destino);
      console.log(datoTipoZona, 'datoTipoZona')

      for (let i = 0; i < this.listPorcentajes.length; i++) {
        if(this.listPorcentajes[i].mercancia == tipozona){
          porcentajeIncremento = porcentajeIncremento + parseFloat(this.listPorcentajes[i].porcentaje)
        }
      }

      if(porcentajeIncremento > 0){
        res = precio * max;
        resInc = (res * porcentajeIncremento) / 100;
        res = res + resInc;
      }else{
        res = precio * max;
      }*/
      
      

      //$('#btn-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).empty().append('$'+this.formatMoney(res));
      
      // Lógica para generar el valor de la celda para cada rango y dato
    },

    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async getInfoCollapse(dato, rango, origen, destino, base){

      let result = ($('#collapse-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).css('display') == 'block')? true : false; //SE VALIDA QUE EL DIV TENGA EL ESTILO

      if (!result) {
        //SI EL DIV NO TIENE EL ESTILO

        /*console.log(dato);
        console.log(rango);
        console.log(origen);
        console.log(destino);*/
        let porcentajeIncremento = 0
        let porcentajeDecremento = 0
        //let tamplate = '<span class="badge badge-secondary">New</span>'
        let template = ''

        for (let i = 0; i < this.listPorcentajes.length; i++) {
          if(this.listPorcentajes[i].mercancia == 'IMO'){
            porcentajeIncremento = porcentajeIncremento + parseFloat(this.listPorcentajes[i].porcentaje)
            if(porcentajeIncremento > 0){
              let resDes = (base * porcentajeIncremento) / 100;
              let res = base + resDes;
              template = template +'<h4><span class="badge badge-secondary">Precio por carga IMO: $'+this.formatMoney(res)+'</span></h4>';
            }else{
              template = template +'<h4><span class="badge badge-secondary">Precio por carga IMO: $'+this.formatMoney(base)+'</span></h4>';
            }
            porcentajeIncremento = 0
          }
          if(this.listPorcentajes[i].mercancia == 'Refrigerada'){
            porcentajeIncremento = porcentajeIncremento + parseFloat(this.listPorcentajes[i].porcentaje)
            if(porcentajeIncremento > 0){
              let resDes = (base * porcentajeIncremento) / 100;
              let res = base + resDes;
              template = template +'<h4><span class="badge badge-secondary">Precio por carga Refrigerada: $'+this.formatMoney(res)+'</span></h4>';
            }else{
              template = template +'<h4><span class="badge badge-secondary">Precio por carga Refrigerada: $'+this.formatMoney(base)+'</span></h4>';
            }
            porcentajeIncremento = 0
          }
          if(this.listPorcentajes[i].mercancia == '2 Operadores'){
            porcentajeIncremento = porcentajeIncremento + parseFloat(this.listPorcentajes[i].porcentaje)
            if(porcentajeIncremento > 0){
              let resDes = (base * porcentajeIncremento) / 100;
              let res = base + resDes;
              template = template +'<h4><span class="badge badge-secondary">Precio por 2 Operadores: $'+this.formatMoney(res)+'</span></h4>';
            }else{
              template = template +'<h4><span class="badge badge-secondary">Precio por 2 Operadores: $'+this.formatMoney(base)+'</span></h4>';
            }
            porcentajeIncremento = 0
          }
        }

        $('#content-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).empty().html(template);
        $('#collapse-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).show(500);
      } else {
          //SI EL DIV TIENE EL ESTILO
          
          $('#collapse-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).hide(500);
      }
      
      

      
      

    },

    generarPDF() {

      axios({
        method: "post",
        url: "/api/v1/pdfTarifarioLtl/",
        data: {
          origen: this.datosOrigenesFTLOcupar,
          destino: this.datosDestinosFTLOcupar,
          listaOD: this.listOD,
          unidades: this.datosUnidaddesFtlOcupar,
          rangos: this.rangos,
          tipoZona: this.listTipoZona,
          porcentajes: this.listPorcentajes,
        },
        responseType: 'arraybuffer',
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        // Crear una URL del blob del PDF
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        
        // Abrir el PDF en una nueva pestaña del navegador
        window.open(pdfUrl, '_blank');
      }).catch((error) => {
                   
      }); 

      /*const tabla = document.getElementById('tarifario');

      
      html2canvas(tabla).then(canvas => {
        
        const pdf = new jsPDF('landscape', 'mm', 'a4');

        
        const imgWidth = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

        
        pdf.save('tarifario.pdf');
        
      });*/
    },

    get_km(origen, destino){

      let km = 0;

      for (let i = 0; i < this.listTipoZona.length; i++) {
        let origenValor = origen.pais+', '+origen.estado+', '+origen.ciudad+', '+origen.codigoPostal;
        let destinoValor = destino.pais+', '+destino.estado+', '+destino.ciudad+', '+destino.codigoPostal;
        if(this.listTipoZona[i].origen == origenValor && this.listTipoZona[i].destino == destinoValor){
          let tipozona = this.listTipoZona[i].tipoZona
          return km = parseFloat(this.listTipoZona[i].km)
        }
      }
    }
    /* FIN METODOS FTL */

  }, // Fin Methods


};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <b-row>
      <b-container fluid>
        <b-card>
          <b-card-body>
            <b-row>
              <b-col md="4" sm="12">
                <h5 class="header-title">Información de la Tarifa</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="../../cotizaciones/listTarifarios"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-2" nav-class="nav-tabs nav-bordered">
                <!--b-tab title="LTL Automático" active>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab-->
                <!--b-tab title="LTL Manual" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Origen:" label-for="origen">
                        <b-form-input v-model="origen" id="origen"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Destino:" label-for="destino">
                        <b-form-input v-model="destino" id="destino"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Factor de Conversión:" label-for="factor" description="">
                        <b-form-input id="factor" v-model="factor_conversion" type="number" placeholder="Ingresa el Factor de Conversión" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Camioneta 3 1/2" label-for="servicio de recoleccion">
                        <b-form-input v-model="recoleccion_tres_y_media" id="recoleccion_tres_y_media" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Rabon" label-for="recoleccion_rabon">
                        <b-form-input v-model="recoleccion_rabon" id="recoleccion_rabon" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Torton" label-for="factor" description="">
                        <b-form-input id="recoleccion_torton" v-model="recoleccion_torton" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Flete Nacional" label-for="flete_nacional">
                        <b-form-input v-model="flete_nacional" id="flete_nacional" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Nissan" label-for="entrega_puerto_nissan">
                        <b-form-input v-model="entrega_puerto_nissan" id="entrega_puerto_nissan" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Camioneta 3 1/2" label-for="factor" description="">
                        <b-form-input id="entrega_puerto_tres_y_media" v-model="entrega_puerto_tres_y_media" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Rabon" label-for="entrega_rabon">
                        <b-form-input v-model="entrega_rabon" id="entrega_rabon" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Torton" label-for="entrega_torton">
                        <b-form-input v-model="entrega_torton" id="entrega_torton" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #00786c" @click="Save()"><b><i class="fe-check"></i> Guardar</b></b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab-->
                <b-tab title="FTL Automático">
                  <b-row>
                    <b-col md="3" sm="12">
                      <label>Selecciona Origen/es</label>
                      <multiselect v-model="origenes_ftl" tag-placeholder="Selecciona un origen" placeholder="Selecciona un origen" label="name" track-by="idGeocerca" :options="options_origen_ftl" :multiple="true" :taggable="true" :close-on-select="false" @tag="addOrigenes"></multiselect>
                    </b-col>
                    <b-col md="3" sm="12">
                      <label>Selecciona Destino/s</label>
                      <multiselect v-model="destinos_ftl" tag-placeholder="Selecciona un destino" placeholder="Selecciona un destino" label="name" track-by="idGeocerca" :options="options_destinos_ftl" :multiple="true" :taggable="true" :close-on-select="false" @tag="addDestinos"></multiselect>
                    </b-col>
                    <b-col md="3" sm="12">
                      <label>Selecciona Unidad/es</label>
                      <multiselect v-model="unidades" tag-placeholder="Selecciona una o mas unidades" placeholder="Selecciona una o mas unidades" label="name" track-by="id" :options="options_unit" :multiple="true" :taggable="true" :close-on-select="false" @tag="addUnidad">
                        
                      </multiselect>
                      
                    </b-col>
                    <b-col md="3" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="generarTarifaFTL()"><b><i class="fas fa-file-alt"></i> Generar Tarifario</b></b-button>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="12">
                      <br>
                      <template>
                        <div v-if="mostrarTarifario">
                          <template v-for="(origen, origenIndex) in datosOrigenesFTLOcupar" >
                            <template v-for="(destino, destinoIndex) in datosDestinosFTLOcupar" >
                            <div class="table-responsive">
                              <table class="table table-hover" id="tarifario">
                                <thead class="text-white" style="background-color: #2aab5c">
                                  <tr>
                                    <td style="text-align: center;"><b>Origen</b></td>
                                    <td style="text-align: center;"><b>Destino</b></td>
                                    <td style="text-align: center;"><b>Unidad</b></td>
                                    <td style="text-align: center;"><b>Costo Kilometraje</b></td>
                                    <td v-for="(rango, index) in rangos" v-if="get_km(origen,destino) > rango.min" :key="'rango_titulo' + index"><b>{{ generarTituloColumna(rango, origen, destino) }}</b></td>
                                  </tr>
                                </thead>
                                <tbody style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  
                                    <span :key="'origen'+origenIndex"></span>
                                      <span :key="'destino'+destinoIndex"></span>
                                      <tr v-for="(dato, dataIndex) in datosUnidaddesFtlOcupar" :key="'tr_' + origenIndex + '_' + destinoIndex + '_' + dataIndex">
                                        <td style="text-align: center;"><b>{{ origen.estado }} - {{ origen.ciudad }} </b><br> <span class="badge badge-soft-success" v-if="origen.estatus_geocerca === 1">Comercial</span> <span class="badge badge-soft-warning" v-if="origen.estatus_geocerca === 2">No Comercial</span> <span class="badge badge-soft-danger" v-if="origen.estatus_geocerca === 3">Peligrosa</span></td>
                                        <td style="text-align: center;"><b>{{ destino.estado }} - {{ destino.ciudad }} </b><br> <span class="badge badge-soft-success" v-if="destino.estatus_geocerca === 1">Comercial</span> <span class="badge badge-soft-warning" v-if="destino.estatus_geocerca === 2">No Comercial</span> <span class="badge badge-soft-danger" v-if="destino.estatus_geocerca === 3">Peligrosa</span></td>
                                        <td style="text-align: center;"><b>{{ dato.name }} </b></td>
                                        <td style="text-align: center;"><b>${{ formatMoney(dato.precio_kilometraje) }}</b></td>
                                        <td v-for="(rango, rangoIndex) in rangos" v-if="get_km(origen,destino) > rango.min" :key="'rango_' + rangoIndex" style="text-align:center;">
                                          <button class="btn btn-primary" type="button" @click="getInfoCollapse(dato, rango, origen, destino, generarValorCelda(dato, rango, origen, destino))">${{ formatMoney(generarValorCelda(dato, rango, origen, destino)) }}</button>
                                          <div >
                                            <div class="collapse collapse-horizontal" v-bind:id="'collapse-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max">
                                              <div class="card card-body" style="width: 300px;" v-bind:id="'content-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max">
                                                
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    
                                </tbody>
                              </table>
                            </div>
                            </template>
                          </template>
                          <b-col md="9" sm="12">&nbsp;</b-col>
                          <b-col md="3" sm="12">
                            <div class="text-center">
                              <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="generarPDF()"><b><i class="fas fa-file"></i> Generar PDF</b></b-button>
                            </div>
                          </b-col>
                        </div>
                      </template>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
            </div>
          </b-card-body>
        </b-card>
      </b-container>
    </b-row>
  </Layout>
</template>

<style>
.nav-bordered a.active {
  border-bottom: 2px solid #00786c !important;
}

#boton {
  margin: auto;
  width: 50%;
  padding: 5px;
  border: thin solid black;

}

.vr {
  border-right: 2px solid rgba(152, 166, 173, 0.2) !important
}

.scroll {
  position: relative;
  height: 150px;
  overflow-y: scroll;
  border: 1px solid #00786c;
  padding: 20px;
}
</style>
