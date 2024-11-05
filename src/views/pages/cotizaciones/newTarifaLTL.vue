<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";
import Multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";
import $ from 'jquery'


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

      options_radio: [
        { text: 'Interestatal', value: 'Servicio Interestatal' },
        { text: 'Importación', value: 'Servicio Importación' },
        { text: 'Exportación', value: 'Servicio Exportación' },
      ],

      otions_radio_mercancia: [
        {text: 'General', value: 'Carga General'},
        {text: 'IMO', value: 'Carga IMO'},
        {text: 'Refrigerada', value: 'Carga Refrigerada'},
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
      listaRangoCargas: [],

      tarifaMinima: 0,
      tipoTarifaVal: 'Servicio Interestatal',
      tipo_merc: 'Carga General',

      /* TERMINA SECCION DE LTL */
      /* INICIA SECCION DE LTL */

      unidades: [],
      options_unit: [],

      origenes_ftl: [],
      options_origen_ftl: [],
      datosOrigenesFTLOcupar: [],
      
      destinos_ftl: [],
      options_destinos_ftl: [],
      datosDestinosFTLOcupar: [],
      /* TERMINA SECCION DE LTL */

      /* INICIA SECCION UNIDADES */
        datosUnidaddesFtlOcupar: [],

      /* TERMINA SECCION UNIDADES */

      agregarTarifa: [],

      rangos: [],

      dates_search_proser: [],
      dates_search_unidad: [],

      mostrarTarifario: false,

      fields_table: [],
      items_table: [],

      datos_zona_select: [],

      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

      idModulo: 38,
    };
  },

  created() {
    this.dataSess();
    this.cargaUnidades();
    this.cargaEstados();
    this.obtenerPorcentajes();
    this.getRangoCarga();
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

    getRangoCarga(){
      axios({
        method: "get",
        url: "/api/v1/get-rangos-cargas/",
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        this.listaRangoCargas = response.data
      }).catch((error) => {
        console.log(error);
      });
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


        let dt = response.data.datos
        
        this.options_origen_ftl = dt;
        this.options_destinos_ftl = dt;
        
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
    },

    async generarTarifaLTL(){
      this.itemsTarifarioFTL = []
      this.datosOrigenesFTLOcupar = []
      this.datosDestinosFTLOcupar = []
      this.datosUnidaddesFtlOcupar = []
      this.rangos = []
      let tarifa = parseFloat(this.tarifaMinima)
      
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

      if(tarifa == 0 || tarifa == ''){
        Swal.fire({
          title: "La tarifa minima no puede ser 0 ó sin valor.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      /*if(this.unidades.length == 0){
        Swal.fire({
          title: "Debes seleccionar al menos una Unidad.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }*/

      for (let i = 0; i < this.origenes_ftl.length; i++) {
        let org =  await axios({
          method: "get",
          url: "/api/v1/get-datos-geocercas-info/",
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
          url: "/api/v1/get-datos-geocercas-info/",
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
          let dato = {"pais_o":this.datosOrigenesFTLOcupar[o].pais,"estado_o":this.datosOrigenesFTLOcupar[o].estado,"ciudad_o":this.datosOrigenesFTLOcupar[o].ciudad, "colonia_o":this.datosOrigenesFTLOcupar[o].colonia, "cp_o":this.datosOrigenesFTLOcupar[o].codigoPostal, "pais_d":this.datosDestinosFTLOcupar[d].pais,"estado_d":this.datosDestinosFTLOcupar[d].estado,"ciudad_d":this.datosDestinosFTLOcupar[d].ciudad, "colonia_d":this.datosDestinosFTLOcupar[d].colonia, "cp_d":this.datosDestinosFTLOcupar[d].codigoPostal}
          this.listOD.push(dato)
        }
      }
      
      await axios({
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
      await this.generaTabla();
      

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

    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async getInfoCollapse(dato, rango, origen, destino, base){

      let result = ($('#collapse-' + origen.idGeocerca + destino.idGeocerca + dato.id + rango.max).css('display') == 'block')? true : false; //SE VALIDA QUE EL DIV TENGA EL ESTILO

      if (!result) {
        //SI EL DIV NO TIENE EL ESTILO

        let porcentajeIncremento = 0
        let porcentajeDecremento = 0
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
      let tipozona = ''
      let tipozonatext = ''
      let tipozonaclass = ''
      for (let i = 0; i < this.listTipoZona.length; i++) {
        let origenValor = origen.pais+', '+origen.estado+', '+origen.ciudad;
        let destinoValor = destino.pais+', '+destino.estado+', '+destino.ciudad;
        if(this.listTipoZona[i].origen == origenValor && this.listTipoZona[i].destino == destinoValor){
          tipozona = this.listTipoZona[i].tipoZona
          km = parseFloat(this.listTipoZona[i].km)
          tipozonaclass = this.listTipoZona[i].tipoZonaClass
          tipozonatext = this.listTipoZona[i].tipoZonaText

          let datos = {"tipoZona":tipozona, "tipoZonaText":tipozonatext, "tipoZonaClass":tipozonaclass, "km":km}
          return (datos)
        }
      }
    },

    async generaTabla(){
      this.fields_table = []
      this.items_table = []
      let data = {}
      let text_val = ''
      let factor = 350
      let km = 0
      let tipoZona = ''
      let tipoZonaText = ''
      let tipoZonaClass = ''

      //data = {key: 'check-dinamic', label: 'Selecciona'}
      //this.fields_table.push(data)
      data = {key: 'origen', label: 'Origen'}
      this.fields_table.push(data)
      data = {key: 'km', label: 'Kilometros'}
      //this.fields_table.push(data)
      //data = {key: 'dias', label: 'dias_transito'}
      this.fields_table.push(data)
      data = {key: 'destino', label: 'Destino'}
      this.fields_table.push(data)
      data = {key: 'factor', label: 'Factor: 1m3 = 350kg y/o 350kg = 1m3'}
      this.fields_table.push(data)

      //data = {key: 'tarifa_min', label: 'Tarifa minima 1m3'}
      //this.fields_table.push(data)


      for (let un = 0; un < this.listaRangoCargas.length; un++) {
        let datokey = 'key-' + this.listaRangoCargas[un].max
        let datoLabel = this.listaRangoCargas[un].min + 'm3 - ' + this.listaRangoCargas[un].max + 'm3'
        data = {key: datokey, label: datoLabel}
        this.fields_table.push(data)
      }

      for (let org = 0; org < this.datosOrigenesFTLOcupar.length; org++) {
        for (let des = 0; des < this.datosDestinosFTLOcupar.length; des++) {
          let datos = this.get_km(this.datosOrigenesFTLOcupar[org], this.datosDestinosFTLOcupar[des]);
          km = datos.km
          tipoZona = datos.tipoZona
          tipoZonaText = datos.tipoZonaText
          tipoZonaClass = datos.tipoZonaClass

          for (let rang = 0; rang < this.listaRangoCargas.length; rang++) {
            //console.log(this.listaRangoCargas[rang]);
            text_val += ', "'+'key-' + this.listaRangoCargas[rang].max+'": "'+this.generarValorCelda(this.listaRangoCargas[rang].porcentaje,this.tarifaMinima,tipoZonaText)+'"'
            
          }

          let text = ''
          let origen = ''
          let destino = ''

          if (this.datosOrigenesFTLOcupar[org].nombre_corto != ''){
            origen = this.datosOrigenesFTLOcupar[org].nombre_corto
          }else{
            origen = this.datosOrigenesFTLOcupar[org].estado+' - '+this.datosOrigenesFTLOcupar[org].ciudad
          }

          if(this.datosDestinosFTLOcupar[des].nombre_corto != ''){
            destino = this.datosDestinosFTLOcupar[des].nombre_corto
          }else{
            destino = this.datosDestinosFTLOcupar[des].estado+' - '+this.datosDestinosFTLOcupar[des].ciudad
          }          
          
          text = '{"origen": "' + origen + '", "km":"'+km+' km <br/> <span class=\\"badge badge-'+tipoZonaClass+'\\">'+tipoZonaText+'</span>", "destino": "' + destino + '", "factor": "'+factor+'"'+ text_val +'}';
          this.items_table.push(JSON.parse(text))
        }
      }

    },

    generarValorCelda(porc, tar, zona){

      let total = 0
      let des = 0
      let por = parseFloat(porc)
      let ta = parseFloat(tar)
      let tipoTarifa = 0
      let tarifaNu = 0
      let tarifaN = 0
      let tipoMercancia = 0
      let tarifaNuMer = 0
      let tarifaNM = 0
      let tipoZona = 0
      let tarifaZona = 0
      let tarifaZ = 0

      for (let porc = 0; porc < this.listPorcentajes.length; porc++) {
        if(this.listPorcentajes[porc].mercancia == this.tipoTarifaVal){
          tipoTarifa = parseFloat(this.listPorcentajes[porc].porcentaje)
        }
      }
      
      for (let porc = 0; porc < this.listPorcentajes.length; porc++) {
        if(this.listPorcentajes[porc].mercancia == this.tipo_merc && this.listPorcentajes[porc].tipo == 'i'){
          tipoMercancia = parseFloat(this.listPorcentajes[porc].porcentaje)
        }
      }
      
      for (let porc = 0; porc < this.listPorcentajes.length; porc++) {
        if(this.listPorcentajes[porc].mercancia == zona && this.listPorcentajes[porc].tipo == 'i'){
          //console.log(this.listPorcentajes[porc].mercancia);
          tipoZona = parseFloat(this.listPorcentajes[porc].porcentaje)
        }
      }

      if(por > 0){
        des = ta * (por / 100)
        ta = ta - des
      }

      if (tipoMercancia > 0) {
        tarifaNuMer = ta * (tipoMercancia / 100)
      }

      if (tipoZona > 0) {
        tarifaZona = ta * (tipoZona / 100)
      }

      if(tipoTarifa > 0){
        tarifaNu = ta * (tipoTarifa / 100) 

      }
      //console.log(ta, 'tar', des, 'des', tarifaNuMer, 'tarifaNuMer', tarifaZona, 'tarifaZona', tarifaNu, 'tarifaNu');
      
      total = this.formatMoney(ta + tarifaNuMer + tarifaZona + tarifaNu)
      return(total)
    },

    validaTarifa(){
      let tarifa = parseFloat(this.tarifaMinima)

      if(tarifa < 0 ){
        this.tarifaMinima = 0
        return false;
      }else{
        this.generarTarifaLTL();
      }
    },

    getInfoDataBase(){
      const auth = { username: "admin", password: "123", }
        
      axios({
        method: "get",
        url: "/api/v1/obtener-datos-tabla-zonas-select/",
          data: {},
          auth: auth,
      }).then((response) => {
        this.datos_zona_select = response.data.info
      }).catch((error) => {
        console.log(error);
      });
    },

    importaInfo(val){
      axios({
        method: "post",
        url: `/api/v1/procesa-datos-zona-geocercas/`,
        data: {
          tz: val
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {

        /*if(response.data[0].insert){
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              
            }
          })
        }else{
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }*/
        
      });
    },

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
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-2" nav-class="nav-tabs nav-bordered">
                <b-tab title="LTL Automático">
                  <b-container fluid>
                    <b-row>
                      <b-col md="6">
                        <label>Selecciona Origen/es</label>
                        <multiselect v-model="origenes_ftl" tag-placeholder="Selecciona un origen" placeholder="Selecciona un origen" label="name" track-by="idGeocerca" :options="options_origen_ftl" :multiple="true" :taggable="true" :close-on-select="false" @tag="addOrigenes"></multiselect>
                      </b-col>
                      <b-col md="6">
                        <label>Selecciona Destino/s</label>
                        <multiselect v-model="destinos_ftl" tag-placeholder="Selecciona un destino" placeholder="Selecciona un destino" label="name" track-by="idGeocerca" :options="options_destinos_ftl" :multiple="true" :taggable="true" :close-on-select="false" @tag="addDestinos"></multiselect>
                      </b-col>
                  </b-row>
                  <b-row>
                      <b-col md="4">
                        <label>Tarifa Minima</label>
                        <b-form-input type="text" v-model="tarifaMinima" @change="validaTarifa"></b-form-input>
                      </b-col>
                      <b-col md="4">
                        <label><b>Tipo de Tarifa</b></label>
                        <b-form-group>
                          <b-form-radio-group
                            id="btn-radios-tipo_tarifa"
                            v-model="tipoTarifaVal"
                            :options="options_radio"
                            button-variant="outline-primary"
                            size="md"
                            name="radio-btn-outline"
                            buttons
                            @change="validaTarifa"
                          ></b-form-radio-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4">
                        <label><b>Tipo de Mercancia</b></label>
                        <b-form-group>
                          <b-form-radio-group
                            id="btn-radios-mercancias"
                            v-model="tipo_merc"
                            :options="otions_radio_mercancia"
                            button-variant="outline-primary"
                            size="md"
                            name="radio-btn-outline"
                            buttons
                            @change="validaTarifa"
                          ></b-form-radio-group>
                        </b-form-group>
                      </b-col>
                  </b-row>
                  </b-container>
                  <b-row>
                    <b-col md="12">
                      <br>
                      <template>
                        <div >
                          <b-table striped hover :items="items_table" :fields="fields_table" select-mode="multi" responsive ref="selectableTable"  thead-class="bg-primary text-white">
                            <template #cell(km)="data">
                              <span v-html="data.item.km"></span>
                            </template>
                                             
                          </b-table>
                          <b-col md="9" sm="12">&nbsp;</b-col>
                          <b-col md="3" sm="12">
                          </b-col>
                        </div>
                      </template>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab v-if="this.username == 'admin'" title="Info Admin" @click="getInfoDataBase()">
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <pre> {{ this.datos_zona_select }} </pre>
                      </b-col>
                    </b-row>
                  </b-container>
                    
                </b-tab>
                <b-tab v-if="this.username == 'admin'" title="Importa Datos Select Zona - Geocercas">
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <b-button-group>
                          <b-button variant="primary" @click="importaInfo(1)">Comercial</b-button>
                          <b-button variant="primary" @click="importaInfo(2)">No Comercial</b-button>
                          <b-button variant="primary" @click="importaInfo(3)">Peligrosa</b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>
                  </b-container>
                    
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
