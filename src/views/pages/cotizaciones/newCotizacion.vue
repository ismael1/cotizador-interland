<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';

/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplate from "@/components/ItemTemplateSearch";
import ItemTemplateProvServ from "@/components/ItemTemplateProvServ";

import Vue from 'vue'

import { BPopover } from 'bootstrap-vue'
Vue.component('b-popover', BPopover)

export default {
  page: {
    title: "Nueva Cotizacion",
    meta: [{ name: "newCotizacion", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      input1: '',
      input1state: null,
      input2: '',
      input2state: null,
      options: [{ text: '- Choose 1 -', value: '' }, 'Red', 'Green', 'Blue'],
      input1Return: '',
      input2Return: '',
      popoverShow: false,


      // cpOD: '',
      dates_search: [],
      dates_search_proser: [],
      numConsecutivo: 0,
      idConsecutivo: 0,
      controlConse: "",
      fechaConsecutivo: "",
      fConse: '',
      estadoCotiza: false,
      template: ItemTemplate,
      templateProvServ: ItemTemplateProvServ,
      isActive: false,
      title: "Nueva Cotizacion",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Cotizaciones",
          href: "/cotizaciones/listCotizacion",
        },
        {
          text: "Nueva Cotizacion",
          href: "/newCotizacion",
          active: true,
        },
      ],
      //Inicio Terrestre

      modoOperacion: "",
      tiposOperacion: "",

      opcion: 0,
      idCotizacion: 0, // id de la cotizacion al guardar registros base
      tipoOpcion: "", // Maritimo, Terrestre, Aereo
      tipoEnvio: "", // Nacional, Expo, Impo
      modoEnvio: "", // Directo, Multiparada, TrasBordo

      terOperation: 0,
      terMostrar: 0,
      statusnac: "false",
      statusimp: "false",
      statusexp: "false",

      action: 0,
      terstatusdir1: "false",
      terstatusmul: "false",

      terstatusdir2: "false",
      terstatustras1: "false",

      terstatusdir3: "false",
      terstatustras2: "false",

      origen_destino: "",
      mercancia: "",
      mercancias: "",

      terorigen: "",
      terdestino: "",
      terfecha: "",
      termodalidad: "",
      tertipocarga: "",
      carga: "",
      tercotizacion: 0,
      nomeda: "123456",

      terembalaje: "",
      terDescEmbalaje: "",
      terestibable: "",
      idclasifica: 0,
      clasifica: '',
      clasificaText: "",
      descripMerc: "",
      numcols: 12,
      cantMerc: "",
      volMerc: "",
      pesTMerc: "",
      unidaMedidaMerc: "",
      unMerc: "",
      classMerc: "",
      gradosMerc: "",
      tUnidadMerc: "",

      fechaFormato: "",
      tipoEnvio: "Optimo",

      claPro: "",
      desPro: "",
      clasificacionZonaO: "",
      clasificacionZonaD: "",
      resClasificaZona: "",
      notColorZona:"",
      notTextoZona:"",
      zonaValidaCo: 0,
      //Fin Terrestre

      //Inicio General
      fondoEtiquetas: "info",
      fondoBusqueda: "info",
      ribbonsData: [
        {
          title: "Nacional",
          color: "primary",
          icon: "mdi mdi-access-point",
          textalign: "left",
          titlealign: "right",
        },
        {
          title: "Expo",
          color: "success",
          icon: "mdi mdi-access-point",
          textalign: "left",
          titlealign: "right",
        },
        {
          title: "Impo",
          color: "info",
          icon: "mdi mdi-access-point",
          textalign: "left",
          titlealign: "right",
        },
      ],

      pais: "",
      cp: "",
      estado: "",
      ciudad: "",

      ciudadori: "",
      ciudaddes: "",

      dateNow: "",

      countrys: [],
      estates: [],
      units: [],
      selectServices: [1],
      services: [],
      folio: 0,

      tipoUnidad: 0,
      nombreTipoUnidad: "",
      estibable: "",

      arrayOrigen: [],
      arrayDestino: [],
      listVentas: [],

      cambioTerrestre: 0,
      priceSale: 0,
      confirmarServices: [],
      confirmarServices2: [],
      confirmarServices3: [],
      confirmarServices4: [],
      confirmarServices5:[], // SE USA CUANDO HAY AJUSTES DE PRECIOS EN EL DESGLOSE DE LA COTIZACION

      details: 0,
      ladas: [],

      contacName: "",
      contacEmail: "",
      contacLada: 1,
      contacTelefono: "",
      contacProductName: "",
      contacDescription: "",

      idBTN: 0,
      valorBTN: 0,
      nomBTN: "",

      cpRutaO: "",

      options: [
        { id: 0, value: 0 },
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 },
        { id: 6, value: 6 },
        { id: 7, value: 7 },
        { id: 8, value: 8 },
        { id: 9, value: 9 },
        { id: 10, value: 10 },
        { id: 11, value: 11 },
        { id: 12, value: 12 },
        { id: 13, value: 13 },
        { id: 14, value: 14 },
        { id: 15, value: 15 },
        { id: 16, value: 16 },
        { id: 17, value: 17 },
        { id: 18, value: 18 },
        { id: 19, value: 19 },
        { id: 20, value: 20 },
        { id: 21, value: 21 },
        { id: 22, value: 22 },
        { id: 23, value: 23 },
        { id: 24, value: 24 },
        { id: 25, value: 25 },
        { id: 26, value: 26 },
        { id: 27, value: 27 },
        { id: 28, value: 28 },
        { id: 29, value: 29 },
        { id: 30, value: 30 },
      ],

      impuestos: 0,
      arrayOcultar: 0, //Verifiar
      serviciosResumen: [],
      addResumen: [],
      addFinal: [],
      totalSugerido: 0,

      divisa: 2,
      valorDolar: 19.8532,
      vigencia: "",
      fechaCoincidencia: "",

      aumentoPorcentaje: 1, // 1 -> Optimo, 2 -> Express
      velocidadEnvio: "Optimo",
      idFail: 0,
      diasTransito: 0,
      idContador: 0,

      precioVentas: 0,
      precioExpres: 0,
      ivaExpress: 0,
      ivaOptimo: 0,
      totalRetOpt: 0,
      totalRetExp: 0,
      totalIvaOpt: 0,
      totalIvaExp: 0,
      totalPrecioOpt: 0,
      totalPrecioExp: 0,
      totalTotalOpt: 0,
      totalTotalExp: 0,
      idFleteNacional: 0,

      idServicioVenta: 0,

      estiba: [
        { id: 0, value: "NO" },
        { id: 1, value: "SI" },
      ],
      tipoModalidad: 0,

      arrayResp: [],
      idNuevoServ: 0,

      idU:0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',
      permisos: [],
    };
  },
  created() {
    this.fechaHoy();
    this.getContry();
    this.getServicios();
    this.getLada();
    this.getFechaActual();
    this.getFolioCon();
    setTimeout('',5000);
    this.dataSess();
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
        this.permisos = data[i].permisos;
      }
      this.modulosUsuario();
    },

    modulosUsuario(){
      let agregar = {}
      
      agregar = {
        id: 0,
        label: 'Módulos',
        isTitle: true
      }
      
      this.menuItems.push(agregar)
      for (let i = 0; i < this.permisos.length; i++) {
        if(this.permisos[i].modulos_isSubmenu == false && this.permisos[i].modulos_idMenu == 0){
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            link: this.permisos[i].modulos_link  
          }
          this.menuItems.push(agregar)

        }else if (this.permisos[i].modulos_isSubmenu == true) {
          let idItem =  this.permisos[i].modulos_id
          let subItem = []
          let agreg = {}

          for (let e = 0; e < this.permisos.length; e++) {
            if(this.permisos[e].modulos_idMenu == idItem){
              agreg = {
                id: this.permisos[e].modulos_id,
                label: this.permisos[e].modulos_nombre,
                link: this.permisos[e].modulos_link,
              }
              subItem.push(agreg)
            }              
          }
                    
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            isMenuCollapsed: false,
            subItems: subItem,
          }
          this.menuItems.push(agregar)
        }
      }
    },

    //INICIA SECCION DE POPOVER
    onClose() {
      this.popoverShow = false
    },
    onOk() {

      let tipocarga = this.tipoCarga
      let embalaje = this.terembalaje;
      let estibable = this.terestibable;
      let clasifica = this.clasifica;
      let descripMerc = this.descripMerc;
      let cantMerc = this.cantMerc;
      let volMerc = this.volMerc;
      let pesTMerc = this.pesTMerc;
      let unidaMedidaMerc = this.unidaMedidaMerc;
      let unMerc = this.unMerc;
      let classMerc = this.classMerc;
      let gradosMerc = this.gradosMerc;
      let tUnidadMerc = this.tUnidadMerc;

      if (embalaje == "" || embalaje == null) {
        Swal.fire({
          title: "Selecciona un Embalaje",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (estibable == "" || estibable == null) {
        Swal.fire({
          title: "Campo Estibable no Seleccionado",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (clasifica == "" || clasifica == null) {
        Swal.fire({
          title: "Ingresa una clasifiacación",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (descripMerc == "" || descripMerc == null) {
        Swal.fire({
          title: "El campo descripción esta vacío",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (cantMerc == "" || cantMerc == null) {
        Swal.fire({
          title: "Ingresa la Cantidad",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (volMerc == "" || volMerc == null) {
        Swal.fire({
          title: "Ingresa el Volúmen",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesTMerc == "" || pesTMerc == null) {
        Swal.fire({
          title: "Ingresa el Peso",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (unidaMedidaMerc == "" || unidaMedidaMerc == null) {
        Swal.fire({
          title: "Selecciona la Inidad de Medida",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (tipocarga == "h") {
        if (unMerc == "" || unMerc == null) {
          Swal.fire({
            title: "Campo UN esta vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (classMerc == "" || classMerc == null) {
          Swal.fire({
            title: "Campo CLASS vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      }

      if (tipocarga == "r") {
        if (gradosMerc == "" || gradosMerc == null) {
          Swal.fire({
            title: "Ingreda los Grados",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (tUnidadMerc == "" || tUnidadMerc == null) {
          Swal.fire({
            title: "Ingresa el tipo de unidad",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      } 

      this.onClose()
    },
    //TERMINA SECCION DE POPOVER

    reloadPage() {
      window.location.reload();
    },

    getFolioCon() {
      axios({
        method: "post",
        url: "/api/v1/consecutivo/",
        data: {
          id: 1,
        }

      }).then((response) => {
        this.idConsecutivo = response.data[0].id
        this.numConsecutivo = response.data[0].numero
        this.controlConse = response.data[0].control
        this.fechaConsecutivo = response.data[0].fecha

        var date = new Date(this.fechaConsecutivo);
        var date2 = moment(String(this.fechaConsecutivo)).format('YYYY/MM/DD');

        this.fechaConsecutivo = date.getUTCFullYear().toString().substr(-2);
        this.fConse = date2
      }).catch((error) => {
        console.log(error);
      });
    },

    insertConsecutivo() {

      const fecConse = this.fConse;
      let fechaHoy = moment(String(new Date())).format('YYYY/MM/DD');;
      //let anioComp = date.getUTCFullYear();
      axios({
        method: "post",
        url: `/api/v1/iconsecutivo/`,
        data: {
          idAnt: this.idConsecutivo,
          fecConse: fecConse,
          fechaHoy: fechaHoy,
        },
      }).then((response) => {
      }).catch((error) => {
        console.log(error);
      });

      this.getFolioCon();
    },

    updateConsecutivo() {
      let date = new Date();
      let anioComp = date.getUTCFullYear();
      axios({
        method: "put",
        url: `/api/v1/consecutivo/${this.idConsecutivo}/`,
        data: {
          id: this.idConsecutivo,
          numero: this.numConsecutivo + 1,
          anio: anioComp,
        },
      }).then((response) => {
      }).catch((error) => {
        console.log(error);
      });
    },
    //para el autocomplit del cp
    getFechaActual() {
      let hoy = new Date();
      let dd = hoy.getDate();
      let mm = hoy.getMonth() + 1;
      let yy = hoy.getFullYear();
      let mes = '';
      switch (mm) {
        case 1:
          mes = 'Enero';
          break;
        case 2:
          mes = 'Febrero';
          break;
        case 3:
          mes = 'Marzo';
          break;
        case 4:
          mes = 'Abril';
          break;
        case 5:
          mes = 'Mayo';
          break;
        case 6:
          mes = 'Junio';
          break;
        case 7:
          mes = 'Julio';
          break;
        case 8:
          mes = 'Agosto';
          break;
        case 9:
          mes = 'Septiembre';
          break;
        case 10:
          mes = 'Octubre';
          break;
        case 11:
          mes = 'Noviembre';
          break;
        case 12:
          mes = 'Diciembre';
          break;

        default:
          break;
      }

      return this.fechaFormato = dd + " de " + mes + " de " + yy

    },

    getLabel(item) {
      if (item) {
        this.estado = item.estado_id;
        this.ciudad = item.municipio;
        return item.codigo_postal;
      } else {
        this.estado = "";
        this.ciudad = "";
      }
    },

    getLabelProd(item) {
      if (item) {
        this.idclasifica = item.clave_prodserv;
        //this.clasificaText = "[" + item.clave_prodserv + "] - " + item.descripcion;
        this.clasificaText = item.descripcion;
        return item.descripcion;
      }
    },

    updateItems(text) {
      let paisOD = this.pais;
      let input = text;

      if (paisOD > 0) {
        axios({
          method: "post",
          url: "/api/v1/search-zipcode/",
          data: {
            data: input,
            pais: paisOD,
          },
        })
          .then((response) => {
            this.dates_search = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    clasificaciones(text) {
      let input = text;
      axios({
        method: "post",
        url: "/api/v1/search-proser/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_proser = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getLada() {
      axios.get(`/api/v1/list-ladas/`).then((response) => { this.ladas = response.data; }).catch((error) => { console.log(error); });
    },

    fechaHoy() {
      let hoy = new Date();
      let dd = hoy.getDate();
      let mm = hoy.getMonth() + 1;
      let yyyy = hoy.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      hoy = yyyy + "-" + mm + "-" + dd;
      this.dateNow = hoy;
      this.terfecha = hoy;
      this.fechaCoincidencia = hoy;
    },

    getContry() {
      axios
        .get(`/api/v1/list-country/`)
        .then((response) => {
          // console.log(response)
          this.countrys = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getEstado(event) {
      let pkPais = event;
      axios
        .get(`/api/v1/list-estates/${pkPais}/`)
        .then((response) => {
          this.estates = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectTipoUnidad() {

      let tipoCajaS = this.tertipocarga;

      if (tipoCajaS == "h") {
        this.getUnidadBox("h");
        this.activoUN = true;
        this.activoClass = true;
        this.tipoUnidad = 5;
        this.carga = "Peligrosa";
        this.mercancia = "h";
        this.numcols = 4;
      } else {
        // this.input_un=""
        // this.input_class=""
      }
      if (tipoCajaS == "r") {
        this.getUnidadBox("r");
        this.tipoUnidad = 8;
        this.carga = "Refrigerada";
        this.mercancia = "r";
        this.numcols = 4;
      }
      if (tipoCajaS == "g") {
        this.getUnidadBox("g");
        this.tipoUnidad = 5;
        this.carga = "General";
        this.mercancia = "g";
        this.numcols = 12;
      }

      this.getCoincidencia();
      this.showMercancias();

    },

    selectEmbalaje() {
      let tipoEmbalaje = this.terembalaje;

      switch (tipoEmbalaje) {
        case "1":
          this.terDescEmbalaje = "PALLETS";
          break;
        case "2":
          this.terDescEmbalaje = "SACOS";
          break;
        case "3":
          this.terDescEmbalaje = "BULTO";
          break;
        case "4":
          this.terDescEmbalaje = "TAMBOS";
          break;
        case "5":
          this.terDescEmbalaje = "ROLLOS";
          break;
        case "6":
          this.terDescEmbalaje = "CAJAS";
          break;
        case "7":
          this.terDescEmbalaje = "TUBOS";
          break;
        case "8":
          this.terDescEmbalaje = "CARGA SUELTA";
          break;
        case "9":
          this.terDescEmbalaje = "SUPER SACO";
          break;
        case "10":
          this.terDescEmbalaje = "OTRO";
          break;
        case "11":
          this.terDescEmbalaje = "BIDONES";
          break;
        case "12":
          this.terDescEmbalaje = "CUÑETES";
          break;

        default:
          break;
      }

      //Se deja en caso de aplicar datos con envento change
    },

    selectEstibable() {
      let tipoEstibable = this.terestibable;

      //Se deja en caso de aplicar datos con envento change
    },

    selectUniMedMerc() {
      let unidadMedida = this.unidaMedidaMerc;

      //Se deja en caso de aplicar datos con envento change
    },

    /*cambioUnidad(nombreUnidad) {
      
      this.nombreTipoUnidad = nombreUnidad;
      this.selectServices = [1];
      this.confirmarServices.length = 0;
      this.confirmarServices2.length = 0;
      this.confirmarServices3.length = 0;
      let agrega = {'ids': this.idFleteNacional, 'nombre': 'FLETE NACIONAL', 'precio': 0, 'id': 0}
      this.confirmarServices3.push(agrega)
      this.sumaBoton();
      this.generateCotizacion();
      this.tercotizacion = this.tipoModalidad;
    },*/

    cambioUnidad(nombreUnidad, idunidad) {

      this.nombreTipoUnidad = nombreUnidad;
      this.tipoUnidad = idunidad;

      this.selectServices = [1];
      this.confirmarServices.length = 0;
      this.confirmarServices2.length = 0;
      this.confirmarServices3.length = 0;
      let agrega = { 'ids': this.idFleteNacional, 'nombre': 'FLETE NACIONAL', 'precio': 0, 'id': 0 }
      this.confirmarServices3.push(agrega)
      this.sumaBoton();
      this.tercotizacion = this.tipoModalidad;
      this.generateCotizacion(this.tercotizacion);

    },

    getUnidadBox(tipo) {
      axios({
        method: "post",
        url: "/api/v1/list-box/",
        data: {
          data: tipo,
        },
      })
        .then((response) => {
          this.units = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCoincidencia() {
      let o;
      let d;

      let vpaisOrigen;
      let vcpOrigen;
      let vestadoOrigen;
      let vciudadOrigen;

      let vpaisDestino;
      let vcpDestino;
      let vestadoDestino;
      let vciudadDestino;

      for (o = 0; o < this.arrayOrigen.length; o++) {
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
      }

      this.obtenerZona(vcpOrigen,vcpDestino)

      axios({
        method: "post",
        url: "/api/v1/list-services-coincidencia/",
        data: {
          paisOrigen: vpaisOrigen,
          estadoOrigen: vestadoOrigen,
          ciudadOrigen: vciudadOrigen,
          paisDestino: vpaisDestino,
          estadoDestino: vestadoDestino,
          ciudadDestino: vciudadDestino,
          dateFin: this.fechaCoincidencia,
          unidaModality: this.tertipocarga,
          tipoUnidad_id: this.tipoUnidad,
        },
      }).then((response) => {
        this.listVentas = response.data;
        this.vigencia = response.data.dateFin;
        if (this.listVentas.length > 0) {
          this.zonaValidaCo = 3
          for (let s = 0; s < this.listVentas.length; s++) {
            for (let se = 0; se < this.services.length; se++) {
              if (this.services[se].nameproduct == this.listVentas[s].servicio) {
                  /*if (this.services[se].id == 1) {
                    this.selectServices.push(this.services[se].id)
                  }*/
                }
              }
            }
          }else{
            this.zonaValidaCo = 1
          }

          for (let adS = 0; adS < this.services.length; adS++) {
            for (let s = 0; s < this.selectServices.length; s++) {
              if (this.selectServices[s] == this.services[adS].id) {
                this.addServicios(this.services[adS].id, this.services[adS].nameproduct)
              }
            }
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
      
    },

    getServicios() {
      axios
        .get(`services/`)
        .then((response) => {
          this.services = response.data;

          let id = "";
          let nameServicio = "";

          for (let i = 0; i < response.data.length; i++) {
            id = response.data[i].id;
            nameServicio = response.data[i].nameproduct;

            if (nameServicio == "FLETE NACIONAL") {
              this.idFleteNacional = id;
              let cotiza = { ids: id, nombre: nameServicio, precio: 0, id: 0 };
              this.confirmarServices3.push(cotiza);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    obtenerZona(cpO,cpD){

      let v1 = cpO
      let v2 = cpD
      
      if(v1 != '' && v2 != ''){

        axios({
          method: "post",
          url: "/api/v1/buscaZonaCP/",
          data: {
            codPosO: v1,
            codPosD: v2,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {

          if(response.data.origen.length){
            this.clasificacionZonaO = response.data.origen[0].clasificacion
          }else{
            this.clasificacionZonaO = ""
          }

          if(response.data.destino.length){
            this.clasificacionZonaD = response.data.destino[0].clasificacion
          }else{
            this.clasificacionZonaD = ""
          }

          if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'COMERCIAL'
            this.notColorZona = 'success'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'PELIGROSA'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'NO COMERCIAL' || this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'PELIGROSA' || this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'PELIGROSA' || this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'COMERCIAL'
            this.notColorZona = 'success'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'PELIGROSA'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          }else if(this.clasificacionZonaO == '' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == ''){
            this.resClasificaZona = 'NO ZONA'
            this.notColorZona = 'primary'
            this.notTextoZona = 'No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.'
          }

        }).catch((error) => {
          console.log(error);
        });
      }
    },

    //Fin General

    //Inicio Terrestre

    showOpcion(valor) {
      this.opcion = 0;

      let val = valor;

      if (val == 1) {
        this.fondoBusqueda = "primary";
        this.fondoEtiquetas = "primary";
        this.opcion = 2;
        this.tipoOpcion = "Maritimo";
      } else if (val == 2) {
        this.fondoBusqueda = "success";
        this.fondoEtiquetas = "success";
        this.opcion = 2;
        this.tipoOpcion = "Terrestre";
      } else if (val == 3) {
        this.fondoBusqueda = "info";
        this.fondoEtiquetas = "info";
        this.opcion = 2;
        this.tipoOpcion = "Aereo";
      }
     
      setTimeout(this.insertConsecutivo(), 5000);
    },

    selectNacional(terOperation, statusnac) {
      let validar = terOperation;
      let estado = statusnac;
      this.terMostrar = 0;
      this.tercotizacion = 0;
      this.tipoModalidad = terOperation;

      if (validar == 1 || estado == false) {
        this.terOperation = 1;
        this.statusnac = "true";
        this.tipoEnvio = "Nacional";
        this.statusexp = "false";
        this.statusimp = "false";
      }
    },

    selectExpo(terOperation, statusexp) {
      let validar = terOperation;
      let estado = statusexp;
      this.terMostrar = 0;
      this.tercotizacion = 0;
      this.tipoModalidad = terOperation;

      if (validar == 2 || estado == false) {
        this.terOperation = 2;
        this.statusexp = "true";
        this.tipoEnvio = "Expo";
        this.statusnac = "false";
        this.statusimp = "false";
      }
    },

    selectImpo(terOperation, statusimp) {
      let validar = terOperation;
      let estado = statusimp;
      this.terMostrar = 0;
      this.tercotizacion = 0;
      this.tipoModalidad = terOperation;

      if (validar == 3 || estado == false) {
        this.terOperation = 3;
        this.statusimp = "true";
        this.tipoEnvio = "Impo";
        this.statusnac = "false";
        this.statusexp = "false";
      }
    },

    selectDirecto1(action, terstatusdir1) {
      let validar = action;
      let estado = terstatusdir1;
      this.terMostrar = 0;

      // thi.nombreOperacion =
      // thi.modoOperacion =
      // thi.tiposOperacion =

      if (validar == 1 || estado == false) {
        this.action = 1;
        this.terMostrar = 1;
        this.terstatusdir1 = "true";
        this.modoEnvio = "Directo";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";
      }
    },

    selectMulti(action, terstatusmul) {
      let validar = action;
      let estado = terstatusmul;
      this.terMostrar = 0;

      if (validar == 2 || estado == false) {
        this.action = 2;
        this.terMostrar = 1;
        this.terstatusdir1 = "false";
        this.terstatusmul = "true";
        this.modoEnvio = "Multiparada";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";
      }
    },

    selectDirecto2(action, terstatusdir2) {
      let validar = action;
      let estado = terstatusdir2;
      this.terMostrar = 0;

      if (validar == 1 || estado == false) {
        this.action = 1;
        this.terMostrar = 1;
        this.terstatusdir1 = "false";
        this.terstatusmul = "false";
        this.terstatusdir2 = "true";
        this.modoEnvio = "Directo";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";
      }
    },

    selectTras1(action, terstatustras1) {
      let validar = action;
      let estado = terstatustras1;
      this.terMostrar = 0;

      if (validar == 2 || estado == false) {
        this.action = 2;
        this.terMostrar = 1;
        this.terstatusdir1 = "false";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "true";
        this.modoEnvio = "Trasbordo";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";
      }
    },

    selectDirecto3(action, terstatusdir3) {
      let validar = action;
      let estado = terstatusdir3;
      this.terMostrar = 0;

      if (validar == 1 || estado == false) {
        this.action = 1;
        this.terMostrar = 1;
        this.terstatusdir1 = "false";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "true";
        this.modoEnvio = "Directo";
        this.terstatustras2 = "false";
      }
    },

    selectTras2(action, terstatustras2) {
      let validar = action;
      let estado = terstatustras2;
      this.terMostrar = 0;

      if (validar == 2 || estado == false) {
        this.action = 2;
        this.terMostrar = 1;
        this.terstatusdir1 = "false";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "true";
        this.modoEnvio = "Trasbordo";
      }
    },

    showOrigenDestino(valor) {
      let val = valor;
      if (val == 1) {
        this.origen_destino = "Origen";
      } else if (val == 2) {
        this.origen_destino = "Destino";
      }
    },

    showMercancias() {
      let val = this.tertipocarga;
      if (val == "g") {
        this.mercancias = "Mercancía General";
      } else if (val == "h") {
        this.mercancias = "Mercancía Peligrosa";
      } else if (val == "r") {
        this.mercancias = "Mercancía Refrigerada";
      }
    },

    addDirection() {
      let direction = this.origen_destino;
      // let vcp = document.getElementById('cpRutaO').value
      let vcp = this.cpRutaO.codigo_postal;

      let vciudad = this.ciudad;

      let index_pais = this.countrys.findIndex((x) => x.id === this.pais);
      let index_estado = this.estates.findIndex((x) => x.id === this.estado);

      let txt_pais = this.countrys[index_pais].name;
      let txt_estado = this.estates[index_estado].name;

      if (direction == "Origen") {
        this.terorigen =
          txt_pais + ", " + vcp + ", " + txt_estado + ", " + vciudad;

        let nompaiso = [];
        let nomciudado = [];

        let origen = {
          idpaiso: this.pais,
          paiso: txt_pais,
          cpo: vcp,
          idestadoo: this.estado,
          estadoo: txt_estado,
          ciudado: this.ciudad,
        };
        this.arrayOrigen.push(origen);

        let O;

        for (O = 0; O < this.arrayOrigen.length; O++) {
          nompaiso = this.arrayOrigen[O].paiso;
          nomciudado = this.arrayOrigen[O].ciudado;
        }

        this.pais = "";
        this.estado = "";
        this.ciudad = "";

        this.cpRutaO = "";

        this.ciudadori = vciudad;
      } else if (direction == "Destino") {
        this.terdestino =
          txt_pais + ", " + vcp + ", " + txt_estado + ", " + vciudad;

        let nompaisd = [];
        let nomciudadd = [];

        let destino = {
          idpaisd: this.pais,
          paisd: txt_pais,
          cpd: vcp,
          idestadod: this.estado,
          estadod: txt_estado,
          ciudadd: this.ciudad,
        };
        this.arrayDestino.push(destino);

        let D;

        for (D = 0; D < this.arrayDestino.length; D++) {
          nompaisd = this.arrayDestino[D].paisd;
          nomciudadd = this.arrayDestino[D].ciudadd;
        }

        this.pais = "";
        this.estado = "";
        this.ciudad = "";
        this.cpRutaO = "";
      }

      this.ciudaddes = vciudad;

      this.getCoincidencia();

      this.$bvModal.hide("signup-modal");
    },

    mercanciaDatos() {
      let merca = this.mercancia;
    },

    generateCotizacion(val) {

      this.getCoincidencia();

      // Validaciones

      let vorigen = this.terorigen;
      let vdestino = this.terdestino;
      let vfecha = this.terfecha;
      let modalidad = this.termodalidad;
      let tipocarga = this.tertipocarga;

      if (vorigen == "" || vorigen == null) {
        Swal.fire({
          title: "Ingresa Origen",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (vdestino == "" || vdestino == null) {
        Swal.fire({
          title: "Ingresa Destino",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (vfecha == "" || vfecha == null || vfecha == 0) {
        Swal.fire({
          title: "Ingresa Fecha Valida",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (modalidad == "" || modalidad == null || modalidad == 0) {
        Swal.fire({
          title: "Selecciona Tipo de Operacion",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (tipocarga == "" || tipocarga == null || tipocarga == 0) {
        Swal.fire({
          title: "Selecciona Tipo de Carga",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let valor = val;
      this.tercotizacion = valor;

    },

    getautocomplit_r1(input) {
      return new Promise((resolve) => {
        let idPaisO = this.pais;

        if (idPaisO > 0) {
          if (input.length < 3) {
            return resolve([]);
          }
          // event.preventDefault()
          axios({
            method: "post",
            url: "/api/v1/search-zipcode/",
            data: {
              data: input,
              pais: idPaisO,
            },
          })
            .then((response) => {
              const results = response.data.map((result, index) => {
                return { ...result, index };
              });
              resolve(results);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },

    getResultValue_r1(result) {
      return result.codigo_postal;
    },

    onSubmit_r1(result) {
      this.estado = result.estado_id;
      this.ciudad = result.municipio;
    },

    mostrarRutaDirecta(val) {
      let dimeVal = val;

      if (dimeVal == 0) {
        this.cambioTerrestre = 1;
      } else if (dimeVal == 1) {
        this.cambioTerrestre = 0;
      } else {
      }
    },

    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    addServiciosOptimo(idEnvioado, nombreEnviado) {
      let indice
      let comprobar = ""

      if (this.confirmarServices3.length > 0) {
        comprobar = document.getElementById(idEnvioado + 'cheServ').checked
        indice = this.confirmarServices3.map(busqueda => busqueda.ids).indexOf(idEnvioado)

        if (indice >= 0) {

          if (comprobar == false) {
            this.confirmarServices3.splice(indice, 1)
          }

        } else {

          if (comprobar == true) {

            axios({
              method: "post",
              url: `/api/v1/service-filtro/`,
              data: {
                servicio: nombreEnviado,
              },
            })
              .then((response) => {

                let resid = 0
                let resnombre = ""
                let resprecio = 0
                let addXpress = 0
                let addVenta = 0

                if (response.data.length > 0) {

                  for (let j = 0; j < response.data.length; j++) {
                    resid = response.data[j].id
                    resnombre = response.data[j].servicio
                    resprecio = response.data[j].total
                    addXpress = response.data[j].porcentajeXpress
                    addVenta = response.data[j].porcentajeVenta
                  }
                  if (this.aumentoPorcentaje == 1) {

                    if (addVenta > 0) {
                      resprecio = this.trunc(parseFloat(resprecio), 2)
                      addVenta = parseFloat(addVenta) / 100
                      addVenta = addVenta * parseFloat(resprecio)
                      this.precioVentas = parseFloat(resprecio) + parseFloat(addVenta)

                      let agrega = { 'ids': idEnvioado, 'nombre': resnombre, 'precio': this.precioVentas, 'id': resid }
                      this.confirmarServices3.push(agrega)
                    }

                  } else if (this.aumentoPorcentaje == 2) {

                    if (addVenta > 0) {
                      if (addVenta > 0) {
                        resprecio = this.trunc(parseFloat(resprecio), 2)
                        addVenta = parseFloat(addVenta) / 100
                        addVenta = addVenta * parseFloat(resprecio)
                        addXpress = parseFloat(addXpress) / 100
                        addXpress = addXpress * parseFloat(resprecio)
                        this.precioExpres = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress)
                        let agregado = { 'ids': idEnvioado, 'nombre': resnombre, 'precio': this.precioExpres, 'id': resid }
                        this.confirmarServices3.push(agregado)
                      }
                    }

                  }

                } else {
                  let agrega = { 'ids': idEnvioado, 'nombre': nombreEnviado, 'precio': 0, 'id': 0 }
                  this.confirmarServices3.push(agrega)
                }

              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        let agrega = { 'ids': this.idFleteNacional, 'nombre': 'FLETE NACIONAL', 'precio': 0, 'id': 0 }
        this.confirmarServices3.push(agrega)
      }
    },

    sumaBoton() {
      this.priceSale = 0;

      let nprecio = 0;
      let nexpress = 0;
      for (let a = 0; a < this.confirmarServices2.length; a++) {
        if(parseFloat(this.confirmarServices2[a].porcentajeExtra) > 0){
          if(this.divisa == 2){
            nprecio = this.confirmarServices2[a].totalOptExt;
            nexpress = this.confirmarServices2[a].totalExpExt;
          }else{
            nprecio = this.confirmarServices2[a].monedaOptExt;
            nexpress = this.confirmarServices2[a].monedaExpExt;
          }
        }else{
          if(this.divisa == 2){
            nprecio = this.confirmarServices2[a].optimoOriginal;
            nexpress = this.confirmarServices2[a].expressOriginal;
          }else{
            nprecio = this.confirmarServices2[a].optimoOriginal;
            nexpress = this.confirmarServices2[a].expressOriginal;
          }
        }
        

        if (this.aumentoPorcentaje == 1) {
          this.priceSale = this.priceSale + nprecio;
        } else if (this.aumentoPorcentaje == 2) {
          this.priceSale = this.priceSale + nexpress;
        }
      }
    },

    addServicios(idEnviado, nombreEnviado) {
      ///
      let indice;
      let comprobar = "";

      comprobar = document.getElementById(idEnviado + "cheServicios").checked;
      indice = this.confirmarServices.map((busqueda) => busqueda.ids).indexOf(idEnviado);
      indice = this.confirmarServices2.map((busqueda) => busqueda.ids).indexOf(idEnviado);

      if (indice >= 0) {
        if (comprobar == false) {
          this.confirmarServices.splice(indice, 1);
          this.confirmarServices2.splice(indice, 1);
          this.sumaBoton();
        }
      } else {
        if (comprobar == true) {
          axios({
            method: "post",
            url: `/api/v1/service-filtro/`,
            data: {
              servicio: nombreEnviado,
            },
          }).then((response) => {
            let resid = 0;
            let resnombre = "";
            let resprecio = 0;
            let addXpress = 0;
            let addVenta = 0;
            let iva = 0;
            let ret = 0;
            let subtotal = 0;
            let total = 0;
            let xpress = 0;
            let venta = 0;
            let porcIva = 0;
            let precioBaseSinIvaOpt = 0;
            let precioBaseSinIvaExp = 0;

            if (response.data.length > 0) {
              for (let j = 0; j < response.data.length; j++) {
                resid = response.data[j].id;
                resnombre = response.data[j].servicio;
                resprecio = response.data[j].total;
                addXpress = response.data[j].porcentajeXpress;
                addVenta = response.data[j].porcentajeVenta;
                iva =  isNaN(response.data[j].iva) ? 0 : parseFloat(response.data[j].iva);
                ret = isNaN(response.data[j].retencion)  ? 0 : response.data[j].retencion;
                subtotal =  isNaN(response.data[j].subtotal) ? 0 : response.data[j].subtotal;
                total = isNaN(response.data[j].total);
                xpress = response.data[j].porcentajeXpress;
                venta = response.data[j].porcentajeVenta;
              }

              if(resnombre == 'FLETE NACIONAL'){
                this.idNuevoServ = resid
              }

              if (addVenta > 0) {
                if (addXpress > 0) {
                  resprecio = this.trunc(parseFloat(resprecio), 2); //2320

                  porcIva = resprecio - (resprecio / 1.16); // 2320 - (2320 / 1.16) = 320
                  this.ivaOptimo =  porcIva //320
                  this.ivaExpress =  porcIva //320
                  addVenta = parseFloat(addVenta) / 100; // 10 (10 / 100 = 0.10)
                  addVenta = addVenta * parseFloat(resprecio); // 0.10 * 2320 = 232
                  precioBaseSinIvaOpt = parseFloat(subtotal) + parseFloat(addVenta)
                  this.precioVentas = parseFloat(resprecio) + parseFloat(addVenta); //2320 +  232 = 2552
                  let monedaop = parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
                  monedaop = this.trunc(monedaop);

                  addXpress = parseFloat(addXpress) / 100; // 10 / 100 = 0.10
                  addXpress = addXpress * parseFloat(resprecio); // 0.10 * 2320 = 232
                  precioBaseSinIvaExp = parseFloat(precioBaseSinIvaOpt) + parseFloat(addXpress)
                  this.precioExpres = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress); // 2320 + 232 + 232 = 2784
                  let monedaxp = parseFloat(this.precioExpres) / parseFloat(this.valorDolar); // 2784 / 19.8532 = 140.2292829367558
                  monedaxp = this.trunc(monedaxp);

                  let agregado = {
                    ids: idEnviado,
                    nombre: resnombre,
                    precio: this.precioVentas,
                    id: resid,
                    express: this.precioExpres,
                    monedaopt: monedaop,
                    monedaxpr: monedaxp,
                    optimoOriginal: this.precioVentas,
                    expressOriginal: this.precioExpres,
                    iva: iva,
                    porcIvaOptiomo: this.ivaOptimo,
                    porcIvaExpress: this.ivaExpress,
                    ret: ret,
                    baseVenta: precioBaseSinIvaExp,
                    subtotal: parseFloat(subtotal),
                    total: parseFloat(total),
                    baseVentaOpt: precioBaseSinIvaOpt,
                    baseVentaExp: precioBaseSinIvaExp,
                    adXpress: xpress,
                    adVenta: venta,
                    porcentajeBaseOptExt: 0,
                    basePorcOpt: 0,
                    porcentajeIvaOpt: 0,
                    monedaOptExt: 0,
                    precioBaseOptExt: 0,
                    totalOptExt: 0,
                    porcentajeBaseExpExt: 0,
                    basePorcExp: 0,
                    porcentajeIvaExp: 0,
                    monedaExpExt: 0,
                    precioBaseExpExt: 0,
                    totalExpExt: 0,
                    porcentajeExtra: 0,
                  };
                  this.confirmarServices.push(agregado);
                  this.confirmarServices2.push(agregado);

                  if(parseFloat(subtotal) > 0){
                    this.sumaBoton();
                  }
                } else {
                  resprecio = this.trunc(parseFloat(resprecio), 2); //2320
                  porcIva = resprecio - (resprecio / 1.16); // 2320 - (2320 / 1.16) = 320
                  this.ivaOptimo =  porcIva //320
                  this.ivaExpress =  porcIva //320
                  addVenta = parseFloat(addVenta) / 100; // 10 (10 / 100 = 0.10)
                  addVenta = addVenta * parseFloat(resprecio); // 0.10 * 2320 = 232
                  precioBaseSinIvaOpt = parseFloat(subtotal) + parseFloat(addVenta)
                  this.precioVentas = parseFloat(resprecio) + parseFloat(addVenta); // 2320 + 232 = 2552
                  let monedaop = parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
                  monedaop = this.trunc(monedaop);

                  let agregado = {
                    ids: idEnviado,
                    nombre: resnombre,
                    precio: this.precioVentas,
                    id: resid,
                    express: resprecio,
                    monedaopt: monedaop,
                    monedaxpr: 0,
                    optimoOriginal: this.precioVentas,
                    expressOriginal: resprecio,
                    iva: iva,
                    porcIvaOptiomo: this.ivaOptimo,
                    porcIvaExpress: this.ivaExpress,
                    ret: ret,
                    subtotal: parseFloat(subtotal),
                    total: parseFloat(total),
                    baseVentaOpt: precioBaseSinIvaOpt,
                    adXpress: xpress,
                    adVenta: venta,
                    porcentajeBaseOptExt: 0,
                    basePorcOpt: 0,
                    porcentajeIvaOpt: 0,
                    monedaOptExt: 0,
                    precioBaseOptExt: 0,
                    totalOptExt: 0,
                    porcentajeBaseExpExt: 0,
                    basePorcExp: 0,
                    porcentajeIvaExp: 0,
                    monedaExpExt: 0,
                    precioBaseExpExt: 0,
                    totalExpExt: 0,
                    porcentajeExtra: 0,
                  };
                  this.confirmarServices.push(agregado);
                  this.confirmarServices2.push(agregado);

                  if(parseFloat(subtotal) > 0){
                    this.sumaBoton();
                  }
                  
                }
              } else {
                if (addXpress > 0) {
                  resprecio = this.trunc(parseFloat(resprecio), 2); //2320

                  porcIva = resprecio - (resprecio / 1.16); // 2320 - (2320 / 1.16) = 320
                  this.ivaOptimo =  porcIva //320
                  this.ivaExpress =  porcIva //320
                  addVenta = parseFloat(addVenta) / 100; // 10 (10 / 100 = 0.10)
                  addVenta = addVenta * parseFloat(resprecio); // 0.10 * 2320 = 232
                  precioBaseSinIvaOpt = parseFloat(subtotal) + parseFloat(addVenta)
                  this.precioVentas = parseFloat(resprecio) + parseFloat(addVenta); //2320 +  232 = 2552
                  let monedaop = parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
                  monedaop = this.trunc(monedaop);

                  addXpress = parseFloat(addXpress) / 100; // 10 / 100 = 0.10
                  addXpress = addXpress * parseFloat(resprecio); // 0.10 * 2320 = 232
                  precioBaseSinIvaExp = parseFloat(precioBaseSinIvaOpt) + parseFloat(addXpress)
                  this.precioExpres = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress); // 2320 + 232 + 232 = 2784
                  let monedaxp = parseFloat(this.precioExpres) / parseFloat(this.valorDolar); // 2784 / 19.8532 = 140.2292829367558
                  monedaxp = this.trunc(monedaxp);

                  let agregado = {
                    ids: idEnviado,
                    nombre: resnombre,
                    precio: resprecio,
                    id: resid,
                    express: this.precioExpres,
                    monedaopt: 0,
                    monedaxpr: monedaxp,
                    optimoOriginal: resprecio,
                    expressOriginal: this.precioExpres,
                    iva: iva,
                    ret: ret,
                    subtotal: parseFloat(subtotal),
                    total: parseFloat(total),
                    baseVentaExp: precioBaseSinIvaExp,
                    baseVentaOpt: precioBaseSinIvaOpt,
                    adXpress: xpress,
                    adVenta: venta,

                    porcentajeBaseOptExt: 0,
                    basePorcOpt: 0,
                    porcentajeIvaOpt: 0,
                    monedaOptExt: 0,
                    precioBaseOptExt: 0,
                    totalOptExt: 0,
                    porcentajeBaseExpExt: 0,
                    basePorcExp: 0,
                    porcentajeIvaExp: 0,
                    monedaExpExt: 0,
                    precioBaseExpExt: 0,
                    totalExpExt: 0,
                    porcentajeExtra: 0,
                  }; //
                  
                  this.confirmarServices.push(agregado);
                  this.confirmarServices2.push(agregado);
                  if(parseFloat(subtotal) > 0){
                    this.sumaBoton();
                  }
                } else {
                  // let agregado = {'ids': idEnviado, 'nombre': resnombre, 'precio': resprecio, 'id': resid, 'express': this.precioExpres, 'monedaopt': 0, 'monedaxpr': monedaxp, 'optimoOriginal': resprecio, 'expressOriginal': this.precioExpres} //
                  
                  let agregado = {
                    ids: idEnviado,
                    nombre: resnombre,
                    precio: resprecio,
                    id: resid,
                    express: 0,
                    iva: (isNaN(iva) ? 0 : iva),
                    ret: ret,
                    subtotal: (isNaN(parseFloat(subtotal)) ? 0 : parseFloat(subtotal)),
                    total: (isNaN(parseFloat(total)) ? 0 : iva),
                    baseVentaOpt: precioBaseSinIvaOpt,
                    baseVentaExp: precioBaseSinIvaExp,
                    adXpress: xpress,
                    adVenta: venta,
                    porcentajeBaseOptExt: 0,
                    basePorcOpt: 0,
                    porcentajeIvaOpt: 0,
                    monedaOptExt: 0,
                    precioBaseOptExt: 0,
                    totalOptExt: 0,
                    porcentajeBaseExpExt: 0,
                    basePorcExp: 0,
                    porcentajeIvaExp: 0,
                    monedaExpExt: 0,
                    precioBaseExpExt: 0,
                    totalExpExt: 0,
                    porcentajeExtra: 0,
                  }; //
                  console.log(agregado)
                  this.confirmarServices.push(agregado);
                  this.confirmarServices2.push(agregado);
                  if(parseFloat(subtotal) > 0){
                    this.sumaBoton();
                  }
                }
              }
            } else {
              let agregado = {
                ids: idEnviado,
                nombre: nombreEnviado,
                precio: 0,
                id: 0,
                express: 0,
                monedaopt: 0,
                monedaxpr: 0,
                optimoOriginal: 0,
                expressOriginal: 0,
                iva: iva,
                porcIvaOptiomo: 0,
                porcIvaExpress: 0,
                ret: 0,
                subtotal: 0,
                total: 0,
                baseVentaOpt: 0,
                baseVentaExp: 0,
                adXpress: 0,
                adVenta: 0,
                porcentajeBaseOptExt: 0,
                basePorcOpt: 0,
                porcentajeIvaOpt: 0,
                monedaOptExt: 0,
                precioBaseOptExt: 0,
                totalOptExt: 0,
                porcentajeBaseExpExt: 0,
                basePorcExp: 0,
                porcentajeIvaExp: 0,
                monedaExpExt: 0,
                precioBaseExpExt: 0,
                totalExpExt: 0,
                porcentajeExtra: 0,
              };
              this.confirmarServices.push(agregado);
              this.confirmarServices2.push(agregado);
              }
             
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      
    },

    showDetails() {
      if (this.details == 0) {
        this.details = 1;
      } else if (this.details == 1) {
        this.details = 0;
      }
    },

    valorBoton(id, nombres, precios, diasTransito) {

      this.totalRetOpt = 0;
      this.totalRetExp = 0;
      this.totalIvaOpt = 0;
      this.totalIvaExp = 0;
      this.totalPrecioOpt = 0;
      this.totalPrecioExp = 0;
      this.totalTotalOpt = 0;
      this.totalTotalExp = 0;

      let vprecio = 0;

      this.diasTransito = diasTransito;

      if (this.divisa == 1) {
        vprecio = parseFloat(precios) / parseFloat(this.valorDolar);
        this.idBTN = id;
        this.nomBTN = nombres;
        this.valorBTN = vprecio;
      } else if (this.divisa == 2) {
        vprecio = parseFloat(precios);
        this.idBTN = id;
        this.nomBTN = nombres;
        this.valorBTN = vprecio;
      }
      this.impuestos = 0;
      this.arrayOcultar = 0;

      let i;
      let nombreCompara = "";

      /*for (i = 0; i < this.confirmarServices.length; i++) {
        nombreCompara = this.confirmarServices[i].nombre;

        if (nombreCompara == "FLETE NACIONAL") {
          this.confirmarServices.shift();
          this.sumaBoton();
        }
      }

      let agregado = {'ids': idEnviado, 'nombre': resnombre, 'precio': this.precioVentas, 'id': resid, 'express': this.precioExpres, 'monedaopt':monedaop, 'monedaxpr':monedaxp, 'optimoOriginal': this.precioVentas, 'expressOriginal': this.precioExpres}
      
      let agrega = {
        ids: id,
        nombre: nombres,
        precio: vprecio,
        id: id,
        express: vprecio,
        monedaopt: vprecio,
        monedaxpr: vprecio,
        optimoOriginal: vprecio,
        expressOriginal: vprecio,
      };
      this.confirmarServices.unshift(agrega);*/

      this.Total()

    },

    hideResumen(valor) {

      let num;

      let comprobar = "";
      let agregado = "";

      for (let i = 0; i < this.confirmarServices2.length; i++) {
        num = this.confirmarServices[i].ids;
        comprobar = document.getElementById(num + "check").checked;

        agregado = document.getElementById(num + "impuestoOculto").value;
        agregado = parseFloat(agregado);

        if (comprobar == true) {
          document.getElementById(num + "sumaTotal").value = 0;
          document.getElementById(num + "impuestoOculto").value = 0;
          document.getElementById(num + "seleccionImpuesto").value = 0;
          this.sumaFinal();
        }
      }

      if (valor == 2) {
        this.divisa = 2;

        ///
        let optimo = 0;
        let express = 0;

        for (let j = 0; j < this.confirmarServices2.length; j++) {
          optimo = this.confirmarServices[j].optimoOriginal;
          express = this.confirmarServices[j].expressOriginal;

          this.confirmarServices[j].precio = optimo;
          this.confirmarServices[j].express = express;
          this.sumaBoton();
        }
        ///
      }

      this.$bvModal.hide("resumen-modal");
    },

    hideResumen2() {
      
      this.$bvModal.hide("resumen-modal");
    },

    Save() {

      let tipocarga = this.tipoCarga
      let embalaje = this.terembalaje;
      let estibable = this.terestibable;
      let clasifica = this.clasifica;
      let descripMerc = this.descripMerc;
      let cantMerc = this.cantMerc;
      let volMerc = this.volMerc;
      let pesTMerc = this.pesTMerc;
      let unidaMedidaMerc = this.unidaMedidaMerc;
      let unMerc = this.unMerc;
      let classMerc = this.classMerc;
      let gradosMerc = this.gradosMerc;
      let tUnidadMerc = this.tUnidadMerc;

      if (embalaje == "" || embalaje == null) {
        Swal.fire({
          title: "Selecciona un Embalaje",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (estibable == "" || estibable == null) {
        Swal.fire({
          title: "Campo Estibable no Seleccionado",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (clasifica == "" || clasifica == null) {
        Swal.fire({
          title: "Ingresa una clasifiacación",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (descripMerc == "" || descripMerc == null) {
        Swal.fire({
          title: "El campo descripción esta vacío",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (cantMerc == "" || cantMerc == null) {
        Swal.fire({
          title: "Ingresa la Cantidad",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (volMerc == "" || volMerc == null) {
        Swal.fire({
          title: "Ingresa el Volúmen",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesTMerc == "" || pesTMerc == null) {
        Swal.fire({
          title: "Ingresa el Peso",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (unidaMedidaMerc == "" || unidaMedidaMerc == null) {
        Swal.fire({
          title: "Selecciona la Inidad de Medida",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (tipocarga == "h") {
        if (unMerc == "" || unMerc == null) {
          Swal.fire({
            title: "Campo UN esta vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (classMerc == "" || classMerc == null) {
          Swal.fire({
            title: "Campo CLASS vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      }

      if (tipocarga == "r") {
        if (gradosMerc == "" || gradosMerc == null) {
          Swal.fire({
            title: "Ingreda los Grados",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (tUnidadMerc == "" || tUnidadMerc == null) {
          Swal.fire({
            title: "Ingresa el tipo de unidad",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      }

      let sumaInicio = 0;
      let precioInicio = 0;

      if (this.divisa == 1) {
        sumaInicio = parseFloat(this.priceSale) + parseFloat(this.valorBTN);
        precioInicio = parseFloat(sumaInicio) * parseFloat(this.valorDolar);
        precioInicio = this.trunc(precioInicio);
      } else if (this.divisa == 2) {
        precioInicio = parseFloat(this.priceSale) + parseFloat(this.valorBTN);
        precioInicio = this.trunc(precioInicio);
      }

      let i;
      let vid = 0;
      let vnombre = "";
      let vprecioInicial = 0;
      let comprobar;
      let porcentaje;
      let totalFinal = 0;
      let agregado = 0;

      let subtotal = 0;
      let total = 0;
      let iva = 0;
      let ret = 0;
      let porcentajeVenta = 0;
      let porcentajeXpress = 0;

      let porcentajeBaseOptExt = 0;
      let basePorcOpt = 0;
      let porcentajeIvaOpt = 0;
      let monedaOptExt = 0;
      let precioBaseOptExt = 0;
      let totalOptExt = 0;
      let porcentajeBaseExpExt = 0;
      let basePorcExp = 0;
      let porcentajeIvaExp = 0;
      let monedaExpExt = 0;
      let precioBaseExpExt = 0;
      let totalExpExt = 0;
      let porcentajeExtra = 0;

      this.addFinal.length = 0;

      for (i = 0; i < this.confirmarServices.length; i++) {
        vid = this.confirmarServices[i].ids;
        vnombre = this.confirmarServices[i].nombre;
        vprecioInicial = this.confirmarServices[i].precio;

        subtotal = this.confirmarServices[i].subtotal;
        total = this.confirmarServices[i].total;
        iva = this.confirmarServices[i].iva;
        ret = this.confirmarServices[i].ret;
        porcentajeVenta = this.confirmarServices[i].basePorcExp;
        porcentajeXpress = this.confirmarServices[i].basePorcOpt;

        porcentajeBaseOptExt = this.confirmarServices[i].porcentajeBaseOptExt;
        basePorcOpt = this.confirmarServices[i].basePorcOpt;
        porcentajeIvaOpt = this.confirmarServices[i].porcentajeIvaOpt;
        monedaOptExt = this.confirmarServices[i].monedaOptExt;
        precioBaseOptExt = this.confirmarServices[i].precioBaseOptExt;
        totalOptExt = this.confirmarServices[i].totalOptExt;
        porcentajeBaseExpExt = this.confirmarServices[i].porcentajeBaseExpExt;
        basePorcExp = this.confirmarServices[i].basePorcExp;
        porcentajeIvaExp = this.confirmarServices[i].porcentajeIvaExp;
        monedaExpExt = this.confirmarServices[i].monedaExpExt;
        precioBaseExpExt = this.confirmarServices[i].precioBaseExpExt;
        totalExpExt = this.confirmarServices[i].totalExpExt;
        porcentajeExtra = this.confirmarServices[i].porcentajeExtra;

        comprobar = document.getElementById(vid + "check").checked;
        porcentaje = document.getElementById(vid + "seleccionImpuesto").value;
        agregado = document.getElementById(vid + "impuestoOculto").value;
        totalFinal = document.getElementById(vid + "sumaTotal").value;

        if (comprobar == true) {
          if (porcentaje == 0 || porcentaje == "") {
            Swal.fire({
              title: "Seleccione Porcentaje Mayor a 0",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          } else if (totalFinal == 0 || totalFinal == "") {
            Swal.fire({
              title: "Seleccione Porcentaje",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          } else {
            let agrega = {
              ids: vid,
              nombre: vnombre,
              precioInicial: vprecioInicial,
              estatus: comprobar,
              porcentaje: porcentaje,
              agregado: agregado,
              precioFinal: totalFinal,

              subtotal: subtotal,
              total: total,
              iva: iva,
              ret: ret,
              porcentajeVenta: porcentajeVenta,
              porcentajeXpress: porcentajeXpress,

              porcentajeBaseOptExt: porcentajeBaseOptExt,
              basePorcOpt: basePorcOpt,
              porcentajeIvaOpt: porcentajeIvaOpt,
              monedaOptExt: monedaOptExt,
              precioBaseOptExt: precioBaseOptExt,
              totalOptExt: totalOptExt,
              porcentajeBaseExpExt: porcentajeBaseExpExt,
              basePorcExp: basePorcExp,
              porcentajeIvaExp: porcentajeIvaExp,
              monedaExpExt: monedaExpExt,
              precioBaseExpExt: precioBaseExpExt,
              totalExpExt: totalExpExt,
              porcentajeExtra: porcentajeExtra,

            };
            this.addFinal.push(agrega);
          }
        } else if (comprobar == false) {
          porcentaje = 0.0;
          totalFinal = 0.0;
          agregado = 0.0;
          let agrega = {
            ids: vid,
            nombre: vnombre,
            precioInicial: vprecioInicial,
            estatus: comprobar,
            porcentaje: porcentaje,
            agregado: agregado,
            precioFinal: totalFinal,

            subtotal: subtotal,
            total: total,
            iva: iva,
            ret: ret,
            porcentajeVenta: porcentajeVenta,
            porcentajeXpress: porcentajeXpress,

            porcentajeBaseOptExt: porcentajeBaseOptExt,
            basePorcOpt: basePorcOpt,
            porcentajeIvaOpt: porcentajeIvaOpt,
            monedaOptExt: monedaOptExt,
            precioBaseOptExt: precioBaseOptExt,
            totalOptExt: totalOptExt,
            porcentajeBaseExpExt: porcentajeBaseExpExt,
            basePorcExp: basePorcExp,
            porcentajeIvaExp: porcentajeIvaExp,
            monedaExpExt: monedaExpExt,
            precioBaseExpExt: precioBaseExpExt,
            totalExpExt: totalExpExt,
            porcentajeExtra: porcentajeExtra,
          };
          this.addFinal.push(agrega);
        }
      }

      let idCotiza = this.idCotizacion;

      let nombre = this.contacName;

      let email = this.contacEmail;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(email);

      let lada = this.contacLada;
      let telefono = this.contacTelefono;
      let producto = this.contacProductName;
      let descripcion = this.contacDescription;

      if (nombre == "" || nombre == null) {
        Swal.fire({
          title: "Ingresa Nombre",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (email == "" || email == null) {
        Swal.fire({
          title: "Ingresa Email",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (EmailValido == true) {
      } else {
        Swal.fire({
          title: "Email no Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      if (lada == "" || lada == null) {
        Swal.fire({
          title: "Seleccione Lada",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono == "" || telefono == null) {
        Swal.fire({
          title: "Ingresa Telefono",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono.length < 10) {
        Swal.fire({
          title: "Ingrese 10 Digitos Minimos",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono.length > 16) {
        Swal.fire({
          title: "Ingrese 16 Digitos Maximo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (descripcion == "" || descripcion == null) {
        Swal.fire({
          title: "Ingresa Descripcion",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let precioTotal = 0;
      precioTotal = this.priceSale + parseFloat(this.valorBTN) + parseFloat(this.totalSugerido);
      precioTotal = this.trunc(precioTotal);

      let o;
      let d;

      let idpaisOrigen;
      let vpaisOrigen;
      let vcpOrigen;
      let idEstadoOrigen;
      let vestadoOrigen;
      let vciudadOrigen;

      let idpaisDestino;
      let vpaisDestino;
      let vcpDestino;
      let idEstadoDestino;
      let vestadoDestino;
      let vciudadDestino;

      for (o = 0; o < this.arrayOrigen.length; o++) {
        idpaisOrigen = this.arrayOrigen[o].idpaiso;
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        idEstadoOrigen = this.arrayOrigen[o].idestadoo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        idpaisDestino = this.arrayDestino[d].idpaisd;
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        idEstadoDestino = this.arrayDestino[d].idestadod;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
      }

      if (idCotiza == 0) {
        //Inicio Alerta
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Generar Cotizacion",
            text: "Al Confirmar no se Podra Realizar Cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // Inicia Axio
              axios({
                method: "post",
                url: "servicioCotizaciones/",
                data: {
                  tipoServicio: this.tipoOpcion,
                  tipoEnvio: this.tipoEnvio,
                  modoEnvio: this.modoEnvio,

                  paisOrigen: vpaisOrigen,
                  idpaisOrigen: idpaisOrigen,
                  cpOrigen: vcpOrigen,
                  estadoOrigen: vestadoOrigen,
                  idestadoOrigen: idEstadoOrigen,
                  ciudadOrigen: vciudadOrigen,

                  paisDestino: vpaisDestino,
                  idpaisDestino: idpaisDestino,
                  cpDestino: vcpDestino,
                  estadoDestino: vestadoDestino,
                  idestadoDestino: idEstadoDestino,
                  ciudadDestino: vciudadDestino,

                  fechaCarga: this.terfecha,
                  tipoOperacion: this.termodalidad,
                  tipoCarga: this.tertipocarga,
                  tipoUnidad: this.tipoUnidad,
                  precioTotalInicial: precioInicio,
                  precioTotalFinal: precioTotal,
                  divisaFinal: this.divisa,
                  serie: "DOC",
                  diasTransito: this.diasTransito,
                  nametipoUnidad: this.nombreTipoUnidad,
                  folioConsecutivo: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'),
                  estibable: this.terestibable,
                  gradosRef: this.gradosMerc,
                  tipoUnidadRef: this.tipoUnidadRef,
                  unHaz: this.unMerc,
                  classHaz: this.classMerc,
                  embalaje: this.terembalaje,
                  idclasificacion: this.idclasifica,
                  cantidad: this.cantMerc,
                  volumen: this.volMerc,
                  pesoTotal: this.pesTMerc,
                  unidadMedida: this.unidaMedidaMerc,
                  descrip: this.descripMerc,
                  velocidadEnvio: this.velocidadEnvio,
                  zona: this.resClasificaZona,
                  usuarioGenera: this.username
                },
                auth: {
                  username: "admin",
                  password: "123",
                },
              })
                .then((response) => {
                  this.idCotizacion = response.data.id;
                  this.getFolios();
                  this.agregaServices();
                  this.addContact();
                  this.updateConsecutivo();
                })
                .catch((error) => {
                  console.log(error);
                });
              // Fin Axios

              Swal.fire({
                title: "Cotizacion",
                text: "Generada Exitosamente",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Cerrar",
              }).then((result) => {
                this.estadoCotiza = true
              })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Cotizacion",
                "Confirmacion Cancelada",
                "error"
              );
            }
          });
        // Fin Alerta
      } else if (idCotiza > 0) {
        Swal.fire({
          title: "Cotizacion Generada Anteriormente",
          text: "",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      }
    },

    SavePrueba() {

      let tipocarga = this.tipoCarga
      let embalaje = this.terembalaje;
      let estibable = this.terestibable;
      let clasifica = this.clasifica;
      let descripMerc = this.descripMerc;
      let cantMerc = this.cantMerc;
      let volMerc = this.volMerc;
      let pesTMerc = this.pesTMerc;
      let unidaMedidaMerc = this.unidaMedidaMerc;
      let unMerc = this.unMerc;
      let classMerc = this.classMerc;
      let gradosMerc = this.gradosMerc;
      let tUnidadMerc = this.tUnidadMerc;

      let sumaInicio = 0;
      let precioInicio = 0;

      if (this.divisa == 1) {
        sumaInicio = parseFloat(this.priceSale) + parseFloat(this.valorBTN);
        precioInicio = parseFloat(sumaInicio) * parseFloat(this.valorDolar);
        precioInicio = this.trunc(precioInicio);
      } else if (this.divisa == 2) {
        precioInicio = parseFloat(this.priceSale) + parseFloat(this.valorBTN);
        precioInicio = this.trunc(precioInicio);
      }

      let i;
      let vid = 0;
      let vnombre = "";
      let vprecioInicial = 0;
      let comprobar;
      let porcentaje;
      let totalFinal = 0;
      let agregado = 0;

      this.addFinal.length = 0;

      for (i = 0; i < this.confirmarServices.length; i++) {
        vid = this.confirmarServices[i].ids;
        vnombre = this.confirmarServices[i].nombre;
        vprecioInicial = this.confirmarServices[i].precio;

        comprobar = document.getElementById(vid + "check").checked;
        porcentaje = document.getElementById(vid + "seleccionImpuesto").value;
        agregado = document.getElementById(vid + "impuestoOculto").value;
        totalFinal = document.getElementById(vid + "sumaTotal").value;

        if (comprobar == true) {
          if (porcentaje == 0 || porcentaje == "") {
            Swal.fire({
              title: "Seleccione Porcentaje Mayor a 0",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          } else if (totalFinal == 0 || totalFinal == "") {
            Swal.fire({
              title: "Seleccione Porcentaje",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          } else {
            let agrega = {
              ids: vid,
              nombre: vnombre,
              precioInicial: vprecioInicial,
              estatus: comprobar,
              porcentaje: porcentaje,
              agregado: agregado,
              precioFinal: totalFinal,
            };
            this.addFinal.push(agrega);
          }
        } else if (comprobar == false) {
          porcentaje = 0.0;
          totalFinal = 0.0;
          agregado = 0.0;
          let agrega = {
            ids: vid,
            nombre: vnombre,
            precioInicial: vprecioInicial,
            estatus: comprobar,
            porcentaje: porcentaje,
            agregado: agregado,
            precioFinal: totalFinal,
          };
          this.addFinal.push(agrega);
        }
      }

      this.agregaServicesPrueba();

      /*let idCotiza = this.idCotizacion;

      let nombre = this.contacName;

      let email = this.contacEmail;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(email);

      let lada = this.contacLada;
      let telefono = this.contacTelefono;
      let producto = this.contacProductName;
      let descripcion = this.contacDescription;

      let precioTotal = 0;
      precioTotal = this.priceSale + parseFloat(this.valorBTN) + parseFloat(this.totalSugerido);
      precioTotal = this.trunc(precioTotal);

      let o;
      let d;

      let idpaisOrigen;
      let vpaisOrigen;
      let vcpOrigen;
      let idEstadoOrigen;
      let vestadoOrigen;
      let vciudadOrigen;

      let idpaisDestino;
      let vpaisDestino;
      let vcpDestino;
      let idEstadoDestino;
      let vestadoDestino;
      let vciudadDestino;

      for (o = 0; o < this.arrayOrigen.length; o++) {
        idpaisOrigen = this.arrayOrigen[o].idpaiso;
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        idEstadoOrigen = this.arrayOrigen[o].idestadoo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        idpaisDestino = this.arrayDestino[d].idpaisd;
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        idEstadoDestino = this.arrayDestino[d].idestadod;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
      }

      if (idCotiza == 0) {
        //Inicio Alerta
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Generar Cotizacion",
            text: "Al Confirmar no se Podra Realizar Cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // Inicia Axio
              axios({
                method: "post",
                url: "servicioCotizaciones/",
                data: {
                  tipoServicio: this.tipoOpcion,
                  tipoEnvio: this.tipoEnvio,
                  modoEnvio: this.modoEnvio,

                  paisOrigen: vpaisOrigen,
                  idpaisOrigen: idpaisOrigen,
                  cpOrigen: vcpOrigen,
                  estadoOrigen: vestadoOrigen,
                  idestadoOrigen: idEstadoOrigen,
                  ciudadOrigen: vciudadOrigen,

                  paisDestino: vpaisDestino,
                  idpaisDestino: idpaisDestino,
                  cpDestino: vcpDestino,
                  estadoDestino: vestadoDestino,
                  idestadoDestino: idEstadoDestino,
                  ciudadDestino: vciudadDestino,

                  fechaCarga: this.terfecha,
                  tipoOperacion: this.termodalidad,
                  tipoCarga: this.tertipocarga,
                  tipoUnidad: this.tipoUnidad,
                  precioTotalInicial: precioInicio,
                  precioTotalFinal: precioTotal,
                  divisaFinal: this.divisa,
                  serie: "DOC",
                  diasTransito: this.diasTransito,
                  nametipoUnidad: this.nombreTipoUnidad,
                  folioConsecutivo: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'),
                  estibable: this.terestibable,
                  gradosRef: this.gradosMerc,
                  tipoUnidadRef: this.tipoUnidadRef,
                  unHaz: this.unMerc,
                  classHaz: this.classMerc,
                  embalaje: this.terembalaje,
                  idclasificacion: this.idclasifica,
                  cantidad: this.cantMerc,
                  volumen: this.volMerc,
                  pesoTotal: this.pesTMerc,
                  unidadMedida: this.unidaMedidaMerc,
                  descrip: this.descripMerc,
                  velocidadEnvio: this.velocidadEnvio,
                  zona: this.resClasificaZona,
                },
                auth: {
                  username: "admin",
                  password: "123",
                },
              })
                .then((response) => {
                  this.idCotizacion = response.data.id;
                  this.getFolios();
                  this.agregaServices();
                  this.addContact();
                  this.updateConsecutivo();
                })
                .catch((error) => {
                  console.log(error);
                });
              // Fin Axios

              Swal.fire({
                title: "Cotizacion",
                text: "Generada Exitosamente",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Cerrar",
              }).then((result) => {
                this.estadoCotiza = true
              })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Cotizacion",
                "Confirmacion Cancelada",
                "error"
              );
            }
          });
        // Fin Alerta
      } else if (idCotiza > 0) {
        Swal.fire({
          title: "Cotizacion Generada Anteriormente",
          text: "",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      }*/
    },
    
    addOther() {
      let nid = 0;
      let nservice = "";
      let nprecio = 0;

      let idPaisOrigen = "";
      let nombrePaisOrigen = "";
      let cpOrigen = "";
      let idEstadoOrigen = "";
      let nombreEstadoOrigen = "";
      let nombreCiudadOrigen = "";

      let idPaisDestino = "";
      let nombrePaisDestino = "";
      let cpDestino = "";
      let idEstadoDestino = "";
      let nombreEstadoDestino = "";
      let nombreCiudadDestino = "";

      for (let i = 0; i < this.arrayOrigen.length; i++) {
        idPaisOrigen = this.arrayOrigen[i].idpaiso;
        nombrePaisOrigen = this.arrayOrigen[i].paiso;
        cpOrigen = this.arrayOrigen[i].cpo;
        idEstadoOrigen = this.arrayOrigen[i].idestadoo;
        nombreEstadoOrigen = this.arrayOrigen[i].estadoo;
        nombreCiudadOrigen = this.arrayOrigen[i].ciudado;
      }

      for (let j = 0; j < this.arrayDestino.length; j++) {
        idPaisDestino = this.arrayDestino[j].idpaisd;
        nombrePaisDestino = this.arrayDestino[j].paisd;
        cpDestino = this.arrayDestino[j].cpd;
        idEstadoDestino = this.arrayDestino[j].idestadod;
        nombreEstadoDestino = this.arrayDestino[j].estadod;
        nombreCiudadDestino = this.arrayDestino[j].ciudadd;
      }

      for (let a = 0; a < this.confirmarServices3.length; a++) {
        nprecio = this.confirmarServices3[a].precio;

        if (nprecio == 0) {
          nid = this.confirmarServices3[a].ids;
          nservice = this.confirmarServices3[a].nombre;
          if (nservice != "FLETE NACIONAL") {
            let tipoServicio = 10

            axios({
              method: "post",
              url: "servicioVenta/",
              data: {

                idCotizacion: this.idFail,
                tipoOperacion: 2,
                tipoServicio: tipoServicio, //Poner el id del servicio
                servicio: nservice,
                idServicio: nid, //Colocar el id del Servicio
                idVenta: this.idNuevoServ,
                paisOrigen: nombrePaisOrigen,
                cpOrigen: cpOrigen,
                estadoOrigen: nombreEstadoOrigen,
                ciudadOrigen: nombreCiudadOrigen,
                paisDestino: nombrePaisDestino,
                cpDestino: cpDestino,
                estadoDestino: nombreEstadoDestino,
                ciudadDestino: nombreCiudadDestino,
                estatusCompleto: 3,
                unidaModality: this.tertipocarga,
                tipoUnidad: this.tipoUnidad,
                idestadoDestino_id: idEstadoDestino,
                idestadoOrigen_id: idEstadoOrigen,
                idpaisOrigen_id: idPaisOrigen,
                idpaisDestino_id: idPaisDestino,
                dateInicio: this.fechaCoincidencia,
                modality: this.termodalidad,
                checkVentas: "SI",
                velocidadEnvio: this.velocidadEnvio,
                total: 0.0,
                ruta: this.resClasificaZona,

              },
              auth: {
                username: "admin",
                password: "123",
              },
            })
              .then((response) => { })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
    },

    Save2() {

      let tipocarga = this.tipoCarga
      let embalaje = this.terembalaje;
      let estibable = this.terestibable;
      let clasifica = this.clasifica;
      let descripMerc = this.descripMerc;
      let cantMerc = this.cantMerc;
      let volMerc = this.volMerc;
      let pesTMerc = this.pesTMerc;
      let unidaMedidaMerc = this.unidaMedidaMerc;
      let unMerc = this.unMerc;
      let classMerc = this.classMerc;
      let gradosMerc = this.gradosMerc;
      let tUnidadMerc = this.tUnidadMerc;

      if (embalaje == "" || embalaje == null) {
        Swal.fire({
          title: "Selecciona un Embalaje",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (estibable == "" || estibable == null) {
        Swal.fire({
          title: "Campo Estibable no Seleccionado",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (clasifica == "" || clasifica == null) {
        Swal.fire({
          title: "Ingresa una clasifiacación",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (descripMerc == "" || descripMerc == null) {
        Swal.fire({
          title: "El campo descripción esta vacío",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (cantMerc == "" || cantMerc == null) {
        Swal.fire({
          title: "Ingresa la Cantidad",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (volMerc == "" || volMerc == null) {
        Swal.fire({
          title: "Ingresa el Volúmen",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesTMerc == "" || pesTMerc == null) {
        Swal.fire({
          title: "Ingresa el Peso",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (unidaMedidaMerc == "" || unidaMedidaMerc == null) {
        Swal.fire({
          title: "Selecciona la Inidad de Medida",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (tipocarga == "h") {
        if (unMerc == "" || unMerc == null) {
          Swal.fire({
            title: "Campo UN esta vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (classMerc == "" || classMerc == null) {
          Swal.fire({
            title: "Campo CLASS vacío",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      }

      if (tipocarga == "r") {
        if (gradosMerc == "" || gradosMerc == null) {
          Swal.fire({
            title: "Ingreda los Grados",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (tUnidadMerc == "" || tUnidadMerc == null) {
          Swal.fire({
            title: "Ingresa el tipo de unidad",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }
      }

      let idPaisOrigen = "";
      let nombrePaisOrigen = "";
      let cpOrigen = "";
      let idEstadoOrigen = "";
      let nombreEstadoOrigen = "";
      let nombreCiudadOrigen = "";

      let idPaisDestino = "";
      let nombrePaisDestino = "";
      let cpDestino = "";
      let idEstadoDestino = "";
      let nombreEstadoDestino = "";
      let nombreCiudadDestino = "";

      for (let i = 0; i < this.arrayOrigen.length; i++) {
        idPaisOrigen = this.arrayOrigen[i].idpaiso;
        nombrePaisOrigen = this.arrayOrigen[i].paiso;
        cpOrigen = this.arrayOrigen[i].cpo;
        idEstadoOrigen = this.arrayOrigen[i].idestadoo;
        nombreEstadoOrigen = this.arrayOrigen[i].estadoo;
        nombreCiudadOrigen = this.arrayOrigen[i].ciudado;
      }

      for (let j = 0; j < this.arrayDestino.length; j++) {
        idPaisDestino = this.arrayDestino[j].idpaisd;
        nombrePaisDestino = this.arrayDestino[j].paisd;
        cpDestino = this.arrayDestino[j].cpd;
        idEstadoDestino = this.arrayDestino[j].idestadod;
        nombreEstadoDestino = this.arrayDestino[j].estadod;
        nombreCiudadDestino = this.arrayDestino[j].ciudadd;
      }

      // let agregado = {'ids': idEnvioado, 'nombre': resnombre, 'precio': this.precioExpres, 'id': resid}
      // let agrega = {'ids': idEnvioado, 'nombre': resnombre, 'precio': this.precioVentas, 'id': resid}

      let nid = 0;
      let nservice = "";
      let nprecio = 0;

      for (let a = 0; a < this.confirmarServices3.length; a++) {
        nprecio = this.confirmarServices3[a].precio;

        if (nprecio == 0) {
          nid = this.confirmarServices3[a].ids;
          nservice = this.confirmarServices3[a].nombre;

          if (nservice == "FLETE NACIONAL") {
            axios({
              method: "post",
              url: "servicioVenta/",
              data: {
                tipoOperacion: 2,
                tipoServicio: 1, //Poner el id del servicio
                servicio: nservice,
                idServicio: nid, //Colocar el id del Servicio
                paisOrigen: nombrePaisOrigen,
                cpOrigen: cpOrigen,
                estadoOrigen: nombreEstadoOrigen,
                ciudadOrigen: nombreCiudadOrigen,
                paisDestino: nombrePaisDestino,
                cpDestino: cpDestino,
                estadoDestino: nombreEstadoDestino,
                ciudadDestino: nombreCiudadDestino,
                estatusCompleto: 3,
                unidaModality: this.tertipocarga,
                tipoUnidad: this.tipoUnidad,
                idestadoDestino_id: idEstadoDestino,
                idestadoOrigen_id: idEstadoOrigen,
                idpaisOrigen_id: idPaisOrigen,
                idpaisDestino_id: idPaisDestino,
                dateInicio: this.fechaCoincidencia,
                modality: this.termodalidad,
                checkVentas: "SI",
                velocidadEnvio: this.velocidadEnvio,
                total: 0.0,
                ruta: this.resClasificaZona,
                usuarioGenera: this.username
              },
              auth: {
                username: "admin",
                password: "123",
              },
            })
              .then((response) => {
                
                this.idFail = response.data.id;

                Swal.fire({
                  title: "Correcto",
                  text: "",
                  icon: "success",
                  confirmButtonText: "Cerrar",
                });

                this.$bvModal.hide("resumen-modal");
                //alert("Dentro de FLETE NACIONAL " + this.idFail);
                this.addId();
                this.addOther();
                this.Save3();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
    },

    Save3() {
      let verificaid = this.idFail;
      // let verificaid = 1

      let idCotiza = this.idCotizacion;

      let nombre = this.contacName;

      let email = this.contacEmail;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(email);

      let lada = this.contacLada;
      let telefono = this.contacTelefono;
      let producto = this.contacProductName;
      let descripcion = this.contacDescription;

      if (nombre == "" || nombre == null) {
        Swal.fire({
          title: "Ingresa Nombre",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (email == "" || email == null) {
        Swal.fire({
          title: "Ingresa Email",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (EmailValido == true) {
      } else {
        Swal.fire({
          title: "Email no Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      if (lada == "" || lada == null) {
        Swal.fire({
          title: "Seleccione Lada",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono == "" || telefono == null) {
        Swal.fire({
          title: "Ingresa Telefono",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono.length < 10) {
        Swal.fire({
          title: "Ingrese 10 Digitos Minimos",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (telefono.length > 16) {
        Swal.fire({
          title: "Ingrese 16 Digitos Maximo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (descripcion == "" || descripcion == null) {
        Swal.fire({
          title: "Ingresa Descripcion",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (verificaid == 0) {
        Swal.fire({
          title: "Genere Cotizacion",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (verificaid > 0) {
        let servicePrice = 0;
        let sumaInicial = 0;

        for (let i = 0; i < this.confirmarServices3.length; i++) {
          servicePrice = this.confirmarServices3[i].precio;
          sumaInicial = parseFloat(sumaInicial) + parseFloat(servicePrice);
          sumaInicial = this.trunc(sumaInicial);
        }

        let idPaisOrigen = "";
        let nombrePaisOrigen = "";
        let cpOrigen = "";
        let idEstadoOrigen = "";
        let nombreEstadoOrigen = "";
        let nombreCiudadOrigen = "";

        let idPaisDestino = "";
        let nombrePaisDestino = "";
        let cpDestino = "";
        let idEstadoDestino = "";
        let nombreEstadoDestino = "";
        let nombreCiudadDestino = "";

        for (let i = 0; i < this.arrayOrigen.length; i++) {
          idPaisOrigen = this.arrayOrigen[i].idpaiso;
          nombrePaisOrigen = this.arrayOrigen[i].paiso;
          cpOrigen = this.arrayOrigen[i].cpo;
          idEstadoOrigen = this.arrayOrigen[i].idestadoo;
          nombreEstadoOrigen = this.arrayOrigen[i].estadoo;
          nombreCiudadOrigen = this.arrayOrigen[i].ciudado;
        }

        for (let j = 0; j < this.arrayDestino.length; j++) {
          idPaisDestino = this.arrayDestino[j].idpaisd;
          nombrePaisDestino = this.arrayDestino[j].paisd;
          cpDestino = this.arrayDestino[j].cpd;
          idEstadoDestino = this.arrayDestino[j].idestadod;
          nombreEstadoDestino = this.arrayDestino[j].estadod;
          nombreCiudadDestino = this.arrayDestino[j].ciudadd;
        }

        //Inica AXIOS

        this.getFolioCon();

        axios({
          method: "post",
          url: "servicioCotizaciones/",
          data: {
            tipoServicio: this.tipoOpcion,
            tipoEnvio: this.tipoEnvio,
            modoEnvio: this.modoEnvio,

            paisOrigen: nombrePaisOrigen,
            idpaisOrigen: idPaisOrigen,
            cpOrigen: cpOrigen,
            estadoOrigen: nombreEstadoOrigen,
            idestadoOrigen: idEstadoOrigen,
            ciudadOrigen: nombreCiudadOrigen,

            paisDestino: nombrePaisDestino,
            idpaisDestino: idPaisDestino,
            cpDestino: cpDestino,
            estadoDestino: nombreEstadoDestino,
            idestadoDestino: idEstadoDestino,
            ciudadDestino: nombreCiudadDestino,

            fechaCarga: this.terfecha,
            tipoOperacion: this.termodalidad,
            tipoCarga: this.tertipocarga,
            tipoUnidad: this.tipoUnidad,
            precioTotalInicial: sumaInicial,
            precioTotalFinal: sumaInicial,
            divisaFinal: this.divisa,
            serie: "DOC",
            velocidadEnvio: this.velocidadEnvio,
            idVenta: verificaid,
            estatus: 4, // Sin Completar
            diasTransito: this.diasTransito,
            nametipoUnidad: this.nombreTipoUnidad,
            folioConsecutivo: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'),
            estibable: this.terestibable,
            gradosRef: this.gradosMerc,
            tipoUnidadRef: this.tipoUnidadRef,
            unHaz: this.unMerc,
            classHaz: this.classMerc,
            embalaje: this.terembalaje,
            idclasificacion: this.idclasifica,
            cantidad: this.cantMerc,
            volumen: this.volMerc,
            pesoTotal: this.pesTMerc,
            unidadMedida: this.unidaMedidaMerc,
            descrip: this.descripMerc,
            zona: this.resClasificaZona,
            usuarioGenera: this.username
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.estadoCotiza = true;
            this.isActive = true;
            this.idCotizacion = response.data.id;
            this.getFolios();
            this.agregaServices2();
            this.updateConsecutivo();
            this.addContact()

            if(this.listVentas.length == 0){
              this.enviaCorreoPricing(this.idCotizacion,this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'));
            }
          })
          .catch((error) => {
            console.log(error);
          });
        //Fin AXIOS
      }
    },

    addId() {
      axios({
        method: "put",
        url: `servicioVenta/${this.idFail}/`,
        data: {
          idCotizacion: this.idFail,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => { })
        .catch((error) => {
          console.log(error);
        });
    },

    agregaServices() {
      let idCotiza = this.idCotizacion;

      if (idCotiza == 0) {
        Swal.fire({
          title: "Genere Cotizacion",
          text: "",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (idCotiza > 0) {
        let m;
        let serviceIds;
        let serviceNombre;
        let servicePrice;

        let serviceStatus;
        let servicePorcentaje;
        let serviceAgregado;
        let servicePriceFinal;
        let ajustaTotal = 0;

        let subtotal = 0;
        let total = 0;
        let iva = 0;
        let ret = 0;
        let porcentajeVenta = 0;
        let porcentajeXpress = 0;

        let porcentajeBaseOptExt = 0;
        let basePorcOpt = 0;
        let porcentajeIvaOpt = 0;
        let monedaOptExt = 0;
        let precioBaseOptExt = 0;
        let totalOptExt = 0;
        let porcentajeBaseExpExt = 0;
        let basePorcExp = 0;
        let porcentajeIvaExp = 0;
        let monedaExpExt = 0;
        let precioBaseExpExt = 0;
        let totalExpExt = 0;
        let porcentajeExtra = 0;
        let validaCeroTotal = 0;

        for (m = 0; m < this.addFinal.length; m++) {
          // Inicia el for de llenado
          serviceIds = this.addFinal[m].ids;
          serviceNombre = this.addFinal[m].nombre;
          servicePrice = this.addFinal[m].precioInicial;
          servicePrice = parseFloat(servicePrice);
          servicePrice = this.trunc(servicePrice);

          serviceStatus = this.addFinal[m].estatus;
          servicePorcentaje = this.addFinal[m].porcentaje;
          serviceAgregado = this.addFinal[m].agregado;
          servicePriceFinal = this.addFinal[m].precioFinal;
          servicePriceFinal = parseFloat(servicePrice);
          servicePriceFinal = this.trunc(servicePrice);

          subtotal = this.trunc(parseFloat(this.addFinal[m].subtotal))
          total = this.trunc(parseFloat(this.addFinal[m].total))
          if(total == 0){
            validaCeroTotal = validaCeroTotal + 1
          }
          iva = this.trunc(parseFloat(this.addFinal[m].iva))
          ret = this.trunc(parseFloat(this.addFinal[m].ret))
          porcentajeVenta = this.trunc(parseFloat(this.addFinal[m].porcentajeVenta))
          porcentajeXpress = this.trunc(parseFloat(this.addFinal[m].porcentajeXpress))

          porcentajeBaseOptExt = this.trunc(parseFloat(this.addFinal[m].porcentajeBaseOptExt))
          basePorcOpt = this.trunc(parseFloat(this.addFinal[m].basePorcOpt))
          porcentajeIvaOpt = this.trunc(parseFloat(this.addFinal[m].porcentajeIvaOpt))
          monedaOptExt = this.trunc(parseFloat(this.addFinal[m].monedaOptExt))
          precioBaseOptExt = this.trunc(parseFloat(this.addFinal[m].precioBaseOptExt))
          totalOptExt = this.trunc(parseFloat(this.addFinal[m].totalOptExt))
          porcentajeBaseExpExt = this.trunc(parseFloat(this.addFinal[m].porcentajeBaseExpExt))
          basePorcExp = this.trunc(parseFloat(this.addFinal[m].basePorcExp))
          porcentajeIvaExp = this.trunc(parseFloat(this.addFinal[m].porcentajeIvaExp))
          monedaExpExt = this.trunc(parseFloat(this.addFinal[m].monedaExpExt))
          precioBaseExpExt = this.trunc(parseFloat(this.addFinal[m].precioBaseExpExt))
          totalExpExt = this.trunc(parseFloat(this.addFinal[m].totalExpExt))
          porcentajeExtra = this.trunc(parseFloat(this.addFinal[m].porcentajeExtra))

          if (servicePrice == 0) {
            servicePrice = 0.0;
          }

          if(subtotal == 0 || subtotal == "0"){
            let agregado = { 'ids': serviceIds, 'nombre': serviceNombre, 'precio': 0, 'id': this.idNuevoServ }
            this.confirmarServices3.push(agregado)
          }

          ajustaTotal = parseFloat(servicePriceFinal) + parseFloat(serviceAgregado);
          ajustaTotal = this.trunc(ajustaTotal);

          axios({
            method: "post",
            url: "servicioAgregados/",
            data: {
              idcotizacion: this.idCotizacion,
              idService: serviceIds,
              nameService: serviceNombre,
              priceService: servicePrice,
              divisa: this.divisa,
              ajusteVenta: serviceStatus,
              porcentaje: servicePorcentaje,
              agregado: serviceAgregado,
              ajusteTotal: ajustaTotal,
              
              total: total,
              subtotal: subtotal,
              total: total,
              iva: iva,
              porcentajeVenta: porcentajeVenta,
              porcentajeXpress: porcentajeXpress,

              porcentajeBaseOptExt: porcentajeBaseOptExt,
              basePorcOpt: basePorcOpt,
              porcentajeIvaOpt: porcentajeIvaOpt,
              monedaOptExt: monedaOptExt,
              precioBaseOptExt: precioBaseOptExt,
              totalOptExt: totalOptExt,
              porcentajeBaseExpExt: porcentajeBaseExpExt,
              basePorcExp: basePorcExp,
              porcentajeIvaExp: porcentajeIvaExp,
              monedaExpExt: monedaExpExt,
              precioBaseExpExt: precioBaseExpExt,
              totalExpExt: totalExpExt,
              porcentajeExtra: porcentajeExtra,

            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              
              if(response.data.nameService == 'FLETE NACIONAL'){
                this.idNuevoServ = response.data.id
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if(this.confirmarServices3.length > 0){
          this.addOther();
          if(validaCeroTotal > 0){
            this.enviaCorreoPricing(this.idCotizacion,this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'));  
          }
          
        }
      }
    },

    agregaServices2() {
      let verificaid = this.idFail;

      if (verificaid == 0) {
        Swal.fire({
          title: "Genere Cotizacion",
          text: "",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (verificaid > 0) {
        let serviceIds;
        let serviceNombre;
        let servicePrice;

        for (let i = 0; i < this.confirmarServices3.length; i++) {
          serviceIds = this.confirmarServices3[i].ids;
          serviceNombre = this.confirmarServices3[i].nombre;
          servicePrice = this.confirmarServices3[i].precio;
          servicePrice = parseFloat(servicePrice);
          servicePrice = this.trunc(servicePrice);

          axios({
            method: "post",
            url: "servicioAgregados/",
            data: {
              idcotizacion: this.idCotizacion,
              idVenta: this.idFail,
              idService: serviceIds,
              nameService: serviceNombre,
              priceService: servicePrice,
              divisa: this.divisa,
              ajusteTotal: servicePrice,
              ajusteVenta: false,

              ajusteVenta: false,
              porcentaje: 0,
              agregado: 0,
              ajusteTotal: 0,
              
              total: 0,
              subtotal: 0,
              total: 0,
              iva: 0,
              porcentajeVenta: 0,
              porcentajeXpress: 0,

              porcentajeBaseOptExt: 0,
              basePorcOpt: 0,
              porcentajeIvaOpt: 0,
              monedaOptExt: 0,
              precioBaseOptExt: 0,
              totalOptExt: 0,
              porcentajeBaseExpExt: 0,
              basePorcExp: 0,
              porcentajeIvaExp: 0,
              monedaExpExt: 0,
              precioBaseExpExt: 0,
              totalExpExt: 0,
              porcentajeExtra: 0,


            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => { })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    addContact() {
      let idCotiza = this.idCotizacion;

      if (idCotiza == 0) {
        Swal.fire({
          title: "Genere Cotizacion",
          text: "",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (idCotiza > 0) {
        axios({
          method: "post",
          url: "contactoCotizaciones/",
          data: {
            idcotizacion: this.idCotizacion,
            name: this.contacName,
            lada: this.contacLada,
            phone: this.contacTelefono,
            email: this.contacEmail,
            productname: this.contacProductName,
            description: this.contacDescription,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.sendEmailCotiza();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //Fin Terrestre
    getFolios() {
      axios
        .get(`/api/v1/consultar-folio/`)
        .then((response) => {
          let numfolios = 0;
          let cont = 0;
          numfolios = parseInt(response.data.folio);
          if (numfolios == 0) {
            cont = 1;
          } else {
            cont = parseInt(numfolios) + 1;
          }

          //funcion 300621
          axios({
            method: "put",
            url: `servicioCotizaciones/${this.idCotizacion}/`,
            data: {
              folio: cont,
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => { })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mostrarImpuesto(valor2) {
      //valor2 = id servicio seleccionado
      let porcentaje = document.getElementById(valor2 + "escondeImpuesto").value;
      let total = document.getElementById(valor2 + "ocultarSumaTotal").value;

      let obtenido = parseInt(valor2);

      // this.addResumen.length = 0

      if (porcentaje == 0 && total == 0) {
        this.impuestos = 1;
        document.getElementById(valor2 + "escondeImpuesto").value = 1;
        document.getElementById(valor2 + "ocultarSumaTotal").value = 1;
        document.getElementById(valor2 + "seleccionImpuesto").hidden = false;
        document.getElementById(valor2 + "sumaTotal").hidden = false;

        let comprobar = document.getElementById(valor2 + "check").checked;

        if (comprobar == true) {
          document.getElementById(valor2 + "seleccionImpuesto").value = 0;
        }else{
          this.restauraExtra(valor2);
        }

        this.arrayOcultar = this.arrayOcultar + obtenido;
        
      } else if (porcentaje == 1 && total == 1) {
        document.getElementById(valor2 + "escondeImpuesto").value = 0;
        document.getElementById(valor2 + "ocultarSumaTotal").value = 0;

        document.getElementById(valor2 + "seleccionImpuesto").hidden  = true;
        document.getElementById(valor2 + "sumaTotal").hidden = true;

        let comprobar = document.getElementById(valor2 + "check").checked;

        if (comprobar == false) {
          this.restauraExtra(valor2);
          document.getElementById(valor2 + "sumaTotal").value = 0;
          document.getElementById(valor2 + "impuestoOculto").value = 0;
          document.getElementById(valor2 + "seleccionImpuesto").value = 0;
          this.sumaFinal();
          
        }

        this.arrayOcultar = this.arrayOcultar - obtenido;

        if (this.arrayOcultar == 0) {
          this.impuestos = 0;
          this.addResumen.length = 0;
        }
      }
    },

    /*sumaImpuesto(event, id, precio) {

      console.log(event)
      console.log(id)
      console.log(precio)
      console.log(this.confirmarServices)

      let ids = id;
      let precios = precio;
      let porcentaje = 0;

      porcentaje = event.target.value;

      let precioInicial = 0;
      let precioFinal = 0;

      precioInicial = parseInt(porcentaje) / 100;
      precioInicial = precioInicial * parseFloat(precios);
      precioInicial = this.trunc(precioInicial, 2);

      precioFinal = parseFloat(precios) + parseFloat(precioInicial);
      precioFinal = this.trunc(precioFinal, 2);

      document.getElementById(ids + "sumaTotal").value = precioFinal;
      document.getElementById(ids + "impuestoOculto").value = precioInicial;

      this.sumaFinal();
    },*/

    sumaImpuesto(event, id, precio){

      //this.confirmarServices5 = []

      let ids = id;
      let precios = precio;
      let porcentaje = 0;

      let nombre = '';

      let precioInicial = 0;
      let precioFinal = 0;
      let subtotal = 0;
      let iva = 0;

      let porcentajeBaseOptExt = 0;
      let basePorcOpt = 0;
      let porcentajeIvaOpt = 0;
      let monedaOptExt = 0;
      let precioBaseOptExt = 0;
      let totalOptExt = 0;

      let porcentajeBaseExpExt = 0;
      let basePorcExp = 0;
      let porcentajeIvaExp = 0;
      let monedaExpExt = 0;
      let precioBaseExpExt = 0;
      let totalExpExt = 0;

      let comprobar  = false;

      porcentaje = parseFloat(event.target.value);

      for (let i = 0; i < this.confirmarServices.length; i++) {
        if(this.confirmarServices[i].ids == ids){
          nombre = this.confirmarServices[i].nombre
          subtotal = this.confirmarServices[i].subtotal
          basePorcOpt = this.confirmarServices[i].adVenta
          basePorcExp = this.confirmarServices[i].adXpress
          iva = this.confirmarServices[i].iva
          
        }
      }

      /*------------------------------------INICIA OPTIMO------------------------------------*/

      porcentajeBaseOptExt = subtotal * ((basePorcOpt + porcentaje) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseOptExt = subtotal + porcentajeBaseOptExt; // 2000 + 460 = 2460

      porcentajeIvaOpt = precioBaseOptExt * (iva / 100); // 2460 * (16 / 100) = 393.6

      totalOptExt = precioBaseOptExt + porcentajeIvaOpt;
      
      monedaOptExt = totalOptExt / parseFloat(this.valorDolar);

      /*------------------------------------TERMINA OPTIMO------------------------------------*/

      /*------------------------------------INICIA EXPRESS------------------------------------*/

      porcentajeBaseExpExt = subtotal * ((basePorcExp + porcentaje ) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseExpExt = subtotal + porcentajeBaseOptExt + porcentajeBaseExpExt; // 2000 + 460 + 460 = 2920

      porcentajeIvaExp = precioBaseExpExt * (iva / 100); // 2460 * (16 / 100) = 467.20

      totalExpExt = precioBaseExpExt + porcentajeIvaExp; // 2920 + 467.20

      monedaExpExt = totalExpExt / parseFloat(this.valorDolar);

      /*------------------------------------TERMINA EXPRESS------------------------------------*/

      if(this.velocidadEnvio.toUpperCase() == 'OPTIMO'){
        precioInicial = this.trunc(porcentajeBaseOptExt,2);
        precioFinal = this.trunc(totalOptExt,2);
      }else{
        precioInicial = this.trunc(porcentajeBaseExpExt,2);
        precioFinal = this.trunc(totalExpExt,2);
      }

      if(this.divisa == 2 ){
        document.getElementById(ids + "sumaTotal").value = precioFinal;
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      }else{
        precioFinal = precioFinal / this.valorDolar
        precioFinal = this.trunc(precioFinal,2)
        document.getElementById(ids + "sumaTotal").value = precioFinal;

        precioInicial = precioInicial / this.valorDolar
        precioInicial = this.trunc(precioInicial,2)
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      }
      
      this.confirmarServices5 = []

      for (let i = 0; i < this.confirmarServices.length; i++) {

        this.confirmarServices5.push(this.confirmarServices[i]) //SE RESPALDA LA INFORMACION DE confirmarServices

        if(this.confirmarServices[i].ids == id){
          let agregado = {
            ids: this.confirmarServices[i].ids,
            nombre: this.confirmarServices[i].nombre,
            precio: this.confirmarServices[i].precio,
            id: this.confirmarServices[i].id,
            express: this.confirmarServices[i].express,
            monedaopt: this.confirmarServices[i].monedaopt,
            monedaxpr: this.confirmarServices[i].monedaxpr,
            optimoOriginal: this.confirmarServices[i].optimoOriginal,
            expressOriginal: this.confirmarServices[i].expressOriginal,
            iva: this.confirmarServices[i].iva,
            porcIvaOptiomo: this.confirmarServices[i].porcIvaOptiomo,
            porcIvaExpress: this.confirmarServices[i].porcIvaExpress,
            ret: this.confirmarServices[i].ret,
            baseVenta: this.confirmarServices[i].baseVenta,
            subtotal: this.confirmarServices[i].subtotal,
            total: this.confirmarServices[i].total,
            baseVentaOpt: this.confirmarServices[i].baseVentaOpt,
            baseVentaExp: this.confirmarServices[i].baseVentaExp,
            adXpress: this.confirmarServices[i].adXpress,
            adVenta: this.confirmarServices[i].adVenta,

            porcentajeBaseOptExt: porcentajeBaseOptExt,
            basePorcOpt: basePorcOpt,
            porcentajeIvaOpt: porcentajeIvaOpt,
            monedaOptExt: monedaOptExt,
            precioBaseOptExt: precioBaseOptExt,
            totalOptExt: totalOptExt,

            porcentajeBaseExpExt: porcentajeBaseExpExt,
            basePorcExp: basePorcExp,
            porcentajeIvaExp: porcentajeIvaExp,
            monedaExpExt: monedaExpExt,
            precioBaseExpExt: precioBaseExpExt,
            totalExpExt: totalExpExt,

            porcentajeExtra: porcentaje,
          };
            
            this.arrayResp.push(agregado)

          }else{

            this.arrayResp.push(this.confirmarServices[i])

          }
          
        }

      this.confirmarServices = []

      this.confirmarServices = this.arrayResp

      this.arrayResp = []

      this.Total();
    },

    restauraExtra(id){
    
      for (let i = 0; i < this.confirmarServices.length; i++) {

        if(this.confirmarServices[i].ids == id){
          let agregado = {
            ids: this.confirmarServices[i].ids,
            nombre: this.confirmarServices[i].nombre,
            precio: this.confirmarServices[i].precio,
            id: this.confirmarServices[i].id,
            express: this.confirmarServices[i].express,
            monedaopt: this.confirmarServices[i].monedaopt,
            monedaxpr: this.confirmarServices[i].monedaxpr,
            optimoOriginal: this.confirmarServices[i].optimoOriginal,
            expressOriginal: this.confirmarServices[i].expressOriginal,
            iva: this.confirmarServices[i].iva,
            porcIvaOptiomo: this.confirmarServices[i].porcIvaOptiomo,
            porcIvaExpress: this.confirmarServices[i].porcIvaExpress,
            ret: this.confirmarServices[i].ret,
            baseVenta: this.confirmarServices[i].baseVenta,
            subtotal: this.confirmarServices[i].subtotal,
            total: this.confirmarServices[i].total,
            baseVentaOpt: this.confirmarServices[i].baseVentaOpt,
            baseVentaExp: this.confirmarServices[i].baseVentaExp,
            adXpress: this.confirmarServices[i].adXpress,
            adVenta: this.confirmarServices[i].adVenta,

            porcentajeBaseOptExt: 0,
            basePorcOpt: 0,
            porcentajeIvaOpt: 0,
            monedaOptExt: 0,
            precioBaseOptExt: 0,
            totalOptExt: 0,

            porcentajeBaseExpExt: 0,
            basePorcExp: 0,
            porcentajeIvaExp: 0,
            monedaExpExt: 0,
            precioBaseExpExt: 0,
            totalExpExt: 0,

            porcentajeExtra: 0,
          };
          
          this.arrayResp.push(agregado)

        }else{

          this.arrayResp.push(this.confirmarServices[i])

        }
      }

      this.confirmarServices = []

      this.confirmarServices = this.arrayResp

      this.arrayResp = []

      this.Total();
    },

    sumaFinal() {
      let i;

      let vid = 0;
      let agregado = 0;
      this.totalSugerido = 0;
      let comprobar;

      for (i = 0; i < this.confirmarServices.length; i++) {
        vid = this.confirmarServices[i].ids;

        comprobar = document.getElementById(vid + "check").checked;
        agregado = document.getElementById(vid + "impuestoOculto").value;
        agregado = parseFloat(agregado);

        if (comprobar == false) {
          this.totalSugerido = this.totalSugerido - agregado;
          /*if(this.velocidadEnvio.toUpperCase() == 'OPTIMO'){
            this.totalTotalOpt = this.totalTotalOpt - agregado
          }else{
            this.totalTotalExp = this.totalTotalExp - agregado
          }*/
          
        } else {
          this.totalSugerido = this.totalSugerido + agregado;
          /*if(this.velocidadEnvio.toUpperCase() == 'OPTIMO'){
            this.totalTotalOpt = this.totalTotalOpt + agregado
          }else{
            this.totalTotalExp = this.totalTotalExp + agregado
          }*/
        }
      }
    },

    trunc(x, posiciones = 0) {
      let s = x.toString();
      let l = s.length;
      let decimalLength = s.indexOf(".") + 1;

      if (l - decimalLength <= posiciones) {
        return x;
      }
      // Parte decimal del número
      let isNeg = x < 0;
      let decimal = x % 1;
      let entera = isNeg ? Math.ceil(x) : Math.floor(x);
      // Parte decimal como número entero
      // Ejemplo: parte decimal = 0.77
      // decimalFormated = 0.77 * (10^posiciones)
      // si posiciones es 2 ==> 0.77 * 100
      // si posiciones es 3 ==> 0.77 * 1000
      let decimalFormated = Math.floor(
        Math.abs(decimal) * Math.pow(10, posiciones)
      );
      // Sustraemos del número original la parte decimal
      // y le sumamos la parte decimal que hemos formateado
      let finalNum =
        entera +
        (decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1);

      return finalNum;
    },

    addServicios2(idEnviado, nombreEnviado) {
      ///
      let indice;
      let comprobar = "";

      comprobar = true
      indice = this.confirmarServices
        .map((busqueda) => busqueda.ids)
        .indexOf(idEnviado);
      indice = this.confirmarServices2
        .map((busqueda) => busqueda.ids)
        .indexOf(idEnviado);

      if (indice >= 0) {
        if (comprobar == false) {
          this.confirmarServices.splice(indice, 1);
          this.confirmarServices2.splice(indice, 1);
          this.sumaBoton();
        }
      } else {
        if (comprobar == true) {
          axios({
            method: "post",
            url: `/api/v1/service-filtro/`,
            data: {
              servicio: nombreEnviado,
            },
          })
            .then((response) => {
              let resid = 0;
              let resnombre = "";
              let resprecio = 0;
              let addXpress = 0;
              let addVenta = 0;

              if (response.data.length > 0) {
                for (let j = 0; j < response.data.length; j++) {
                  resid = response.data[j].id;
                  resnombre = response.data[j].servicio;
                  resprecio = response.data[j].total;
                  addXpress = response.data[j].porcentajeXpress;
                  addVenta = response.data[j].porcentajeVenta;
                }

                if (addVenta > 0) {
                  if (addXpress > 0) {
                    resprecio = this.trunc(parseFloat(resprecio), 2);
                    addVenta = parseFloat(addVenta) / 100;
                    addVenta = addVenta * parseFloat(resprecio);
                    this.precioVentas =
                      parseFloat(resprecio) + parseFloat(addVenta);
                    let monedaop =
                      parseFloat(this.precioVentas) /
                      parseFloat(this.valorDolar);
                    monedaop = this.trunc(monedaop);

                    addXpress = parseFloat(addXpress) / 100;
                    addXpress = addXpress * parseFloat(resprecio);
                    this.precioExpres =
                      parseFloat(resprecio) +
                      parseFloat(addVenta) +
                      parseFloat(addXpress);
                    let monedaxp =
                      parseFloat(this.precioExpres) /
                      parseFloat(this.valorDolar);
                    monedaxp = this.trunc(monedaxp);

                    let agregado = {
                      ids: idEnviado,
                      nombre: resnombre,
                      precio: this.precioVentas,
                      id: resid,
                      express: this.precioExpres,
                      monedaopt: monedaop,
                      monedaxpr: monedaxp,
                      optimoOriginal: this.precioVentas,
                      expressOriginal: this.precioExpres,
                    };
                    this.confirmarServices.push(agregado);
                    this.confirmarServices2.push(agregado);

                    this.sumaBoton();
                  } else {
                    resprecio = this.trunc(parseFloat(resprecio), 2);
                    addVenta = parseFloat(addVenta) / 100;
                    addVenta = addVenta * parseFloat(resprecio);
                    this.precioVentas =
                      parseFloat(resprecio) + parseFloat(addVenta);
                    let monedaop =
                      parseFloat(this.precioVentas) /
                      parseFloat(this.valorDolar);
                    monedaop = this.trunc(monedaop);

                    let agregado = {
                      ids: idEnviado,
                      nombre: resnombre,
                      precio: this.precioVentas,
                      id: resid,
                      express: resprecio,
                      monedaopt: monedaop,
                      monedaxpr: 0,
                      optimoOriginal: this.precioVentas,
                      expressOriginal: resprecio,
                    };
                    this.confirmarServices.push(agregado);
                    this.confirmarServices2.push(agregado);

                    this.sumaBoton();
                  }
                } else {
                  if (addXpress > 0) {
                    resprecio = this.trunc(parseFloat(resprecio), 2);
                    addXpress = parseFloat(addXpress) / 100;
                    addXpress = addXpress * parseFloat(resprecio);
                    this.precioExpres =
                      parseFloat(resprecio) + parseFloat(addXpress);
                    let monedaxp =
                      parseFloat(this.precioExpres) /
                      parseFloat(this.valorDolar);
                    monedaxp = this.trunc(monedaxp);

                    let agregado = {
                      ids: idEnviado,
                      nombre: resnombre,
                      precio: resprecio,
                      id: resid,
                      express: this.precioExpres,
                      monedaopt: 0,
                      monedaxpr: monedaxp,
                      optimoOriginal: resprecio,
                      expressOriginal: this.precioExpres,
                    }; //
                    this.confirmarServices.push(agregado);
                    this.confirmarServices2.push(agregado);
                    this.sumaBoton();
                  } else {
                    // let agregado = {'ids': idEnviado, 'nombre': resnombre, 'precio': resprecio, 'id': resid, 'express': this.precioExpres, 'monedaopt': 0, 'monedaxpr': monedaxp, 'optimoOriginal': resprecio, 'expressOriginal': this.precioExpres} //
                    let agregado = {
                      ids: idEnviado,
                      nombre: resnombre,
                      precio: resprecio,
                      id: resid,
                      express: 0,
                    }; //
                    this.confirmarServices.push(agregado);
                    this.confirmarServices2.push(agregado);
                    this.sumaBoton();
                  }
                }
              } else {
                let agregado = {
                  ids: idEnviado,
                  nombre: nombreEnviado,
                  precio: 0,
                  id: 0,
                  express: 0,
                  monedaopt: 0,
                  monedaxpr: 0,
                  optimoOriginal: 0,
                  expressOriginal: 0,
                };
                this.confirmarServices.push(agregado);
                this.confirmarServices2.push(agregado);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      
    },

    selectDivisa(valor) {
      if (valor == 1) {
        // USD Formula mxn/dolar
        this.hideResumen();
        this.divisa = 2;

        let id = this.idBTN;
        let nombres = this.nomBTN;
        let vprecio = this.valorBTN;
        let dias = this.diasTransito;
        vprecio = parseFloat(vprecio) * parseFloat(this.valorDolar);

        this.valorBoton(id, nombres, vprecio, dias);

        ////
        let optimo = 0;
        let express = 0;

        for (let j = 0; j < this.confirmarServices.length; j++) {
          optimo = this.confirmarServices[j].optimoOriginal;
          express = this.confirmarServices[j].expressOriginal;

          this.confirmarServices[j].precio = optimo;
          this.confirmarServices[j].express = express;
          this.sumaBoton();
        }
        ////
        this.$bvModal.show("resumen-modal");
      }

      if (valor == 2) {
        // MXN Formula dolar*mxn
        this.hideResumen();
        this.divisa = 1;

        let id = this.idBTN;
        let nombres = this.nomBTN;
        let vprecio = this.valorBTN;
        let dias = this.diasTransito;
        this.valorBoton(id, nombres, vprecio, dias);

        ////
        let nid = 0;
        let nprecio = 0;
        let dolarOptimo = 0;
        let dolarExpress = 0;

        for (let j = 0; j < this.confirmarServices.length; j++) {
          nid = this.confirmarServices[j].ids;
          nprecio = this.confirmarServices[j].precio;

          dolarOptimo = this.confirmarServices[j].monedaopt;
          dolarExpress = this.confirmarServices[j].monedaxpr;

          this.confirmarServices[j].precio = dolarOptimo;
          this.confirmarServices[j].express = dolarExpress;
          this.sumaBoton();
        }
        ////
        this.$bvModal.show("resumen-modal");
      }
    },

    aumentaOptimo(val) {
      if (val == 1) {
        this.aumentoPorcentaje = 1;
        this.sumaBoton();
        this.velocidadEnvio = "Optimo";
      } else if (val == 2) {
        this.aumentoPorcentaje = 1;
        this.velocidadEnvio = "Optimo";

        //
        let nid = 0;
        let nservicio = "";
        let nprecio = 0;

        if (this.confirmarServices3.length > 1) {
          for (let j = 0; j < this.confirmarServices3.length; j++) {
            nid = this.confirmarServices3[j].ids;
            nprecio = this.confirmarServices3[j].precio;

            if (nprecio > 0) {
              nservicio = this.confirmarServices3[j].nombre;

              axios({
                method: "post",
                url: `/api/v1/service-filtro/`,
                data: {
                  servicio: nservicio,
                },
              })
                .then((response) => {
                  let resnombre = "";
                  let resprecio = 0;
                  let addVenta = 0;
                  let ventaOptima = 0;

                  for (let n = 0; n < response.data.length; n++) {
                    // resid = response.data[n].id
                    resnombre = response.data[n].servicio;
                    resprecio = response.data[n].total;
                    addVenta = response.data[n].porcentajeVenta;
                  }

                  resprecio = this.trunc(parseFloat(resprecio), 2);
                  addVenta = parseFloat(addVenta) / 100;
                  addVenta = addVenta * parseFloat(resprecio);
                  ventaOptima = parseFloat(resprecio) + parseFloat(addVenta);
                  this.confirmarServices3[j].precio = ventaOptima;
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
        //
      }
    },

    aumentaExpress(val) {
      if (val == 1) {
        this.aumentoPorcentaje = 2;
        this.sumaBoton();
        this.velocidadEnvio = "Express";
      } else if (val == 2) {
        this.aumentoPorcentaje = 2;
        this.velocidadEnvio = "Express";

        let nid = 0;
        let nservicio = "";
        let nprecio = 0;

        if (this.confirmarServices3.length > 1) {
          for (let j = 0; j < this.confirmarServices3.length; j++) {
            nid = this.confirmarServices3[j].ids;
            nprecio = this.confirmarServices3[j].precio;

            if (nprecio > 0) {
              nservicio = this.confirmarServices3[j].nombre;

              axios({
                method: "post",
                url: `/api/v1/service-filtro/`,
                data: {
                  servicio: nservicio,
                },
              }).then((response) => {
                // let resid
                let resnombre;
                let resprecio;
                let addVenta;
                let addXpress;
                let ventaXpress;

                for (let n = 0; n < response.data.length; n++) {
                  // resid = response.data[n].id
                  resnombre = response.data[n].servicio;
                  resprecio = response.data[n].total;
                  addXpress = response.data[n].porcentajeXpress;
                  addVenta = response.data[n].porcentajeVenta;
                }

                resprecio = this.trunc(parseFloat(resprecio), 2);
                addVenta = parseFloat(addVenta) / 100;
                addVenta = addVenta * parseFloat(resprecio);
                addXpress = parseFloat(addXpress) / 100;
                addXpress = addXpress * parseFloat(resprecio);
                ventaXpress = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress);
                this.confirmarServices3[j].precio = ventaXpress;
              }).catch((error) => {
                console.log(error);
              });
            }
          }
        }
      }
    },

    sendEmailCotiza() {

      let idCotiza = this.idCotizacion;

      axios({
        method: "post",
        url: "api/v1/sendEmailCotiza/",
        data: {
          idcotizacion: this.idCotizacion,
          name: this.contacName,
          lada: this.contacLada,
          phone: this.contacTelefono,
          email: this.contacEmail,
          productname: this.contacProductName,
          description: this.contacDescription,
        },
      }).then((response) => {
      }).catch((error) => {
        console.log('err' + error);
      });
    },

    enviaCorreoPricing(idCotiza, folioCons){
      axios({
        method: "post",
        url: "api/v1/sendEmailNuevoServicio/",
        data: {
          idcotizacion: idCotiza,
          folio: folioCons,
        },
      }).then((response) => {
      }).catch((error) => {
        console.log('err' + error);
      });
    },

    realizaAjuste(){

      let resid = 0;
      let resnombre = "";
      let resprecio = 0;
      let addXpress = 0;
      let addVenta = 0;
      let iva = 0;
      let ret = 0;
      let subtotal = 0;
      let total = 0;
      let xpress = 0;
      let venta = 0;
      let porcIva = 0;
      let precioBaseSinIvaOpt = 0;
      let precioBaseSinIvaExp = 0;
      let porcExtra = 0;
      let ajustePorcentOpt = 0;
      let ajustePorcentExp = 0;
      let comprobar = false; 

      for (let i = 0; i < this.confirmarServices.length; i++) {
        comprobar = document.getElementById(this.confirmarServices[i].ids + "check").checked;
        if(comprobar){
          if(this.confirmarServices[i].porcentajeExtra > 0){

            iva = parseFloat(this.confirmarServices[i].iva) //16
            
            /* INICIA CALCULO PORCENTAJE EXTRA */

            addVenta = parseFloat(this.confirmarServices[i].adVenta) //10
            addXpress = parseFloat(this.confirmarServices[i].adXpress) //10
            porcExtra = parseFloat(this.confirmarServices[i].porc) //0

            ajustePorcentOpt = addVenta + porcExtra // 2 + 10 = 12
            ajustePorcentExp = addXpress + porcExtra // 2 + 10 = 12

            /* FIN CALCULO PORCENTAJE EXTRA */

            /* INICIO CALCULO PRECIO BASE SIN IVA CON NUEVO PORCENTAJE */

            precioBaseSinIvaOpt = parseFloat(this.confirmarServices[i].subtotal) + ((ajustePorcentOpt / 100 ) * parseFloat(this.confirmarServices[i].subtotal)) // 2000 + ((12 / 100) * 2000) = 2240

            porcIvaOptiomo = precioBaseSinIvaOpt * (iva / 100 ); // 2240 * (10 / 100) = 358.40
            
            this.precioVentas = parseFloat(precioBaseSinIvaOpt) + parseFloat(porcIvaOptiomo); //2320 +  232 = 2552
            
            total = parseFloat(this.confirmarServices[i].subtotal) + parseFloat(porcIvaOptiomo)

            let monedaop = parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
            monedaop = this.trunc(monedaop);

            /*------------------------EXPRESS------------------------*/

            addXpress = parseFloat(addXpress) / 100; // 10 / 100 = 0.10
            addXpress = addXpress * parseFloat(resprecio); // 0.10 * 2320 = 232
            precioBaseSinIvaExp = parseFloat(precioBaseSinIvaOpt) + parseFloat(addXpress)
            this.precioExpres = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress); // 2320 + 232 + 232 = 2784
            let monedaxp = parseFloat(this.precioExpres) / parseFloat(this.valorDolar); // 2784 / 19.8532 = 140.2292829367558
            monedaxp = this.trunc(monedaxp);

            /* FIN CALCULO PRECIO BASE SIN IVA CON NUEVO PORCENTAJE */

            let agregado = {
              ids: this.confirmarServices[i].ids,
              nombre: this.confirmarServices[i].nombre,
              precio: this.precioVentas,
              id: this.confirmarServices[i].id,
              express: this.precioExpres,/**/
              monedaopt: monedaop, /**/
              monedaxpr: monedaxp, /**/
              optimoOriginal: this.precioVentas,
              expressOriginal: this.precioExpres, /**/
              iva: iva,
              porcIvaOptiomo: porcIvaOptiomo,
              porcIvaExpress: this.ivaExpress, /**/
              ret: this.confirmarServices[i].ret,
              baseVenta: precioBaseSinIvaOpt,
              subtotal: this.confirmarServices[i].subtotal,
              total: total,
              baseVentaOpt: precioBaseSinIvaOpt,
              baseVentaExp: precioBaseSinIvaExp, /**/
              adXpress: addXpress,
              adVenta: addVenta,
              porcentajeExtra: porcExtra,
            };

          }else{

            this.arrayResp.push(this.confirmarServices[i])
          }
        }else{

          this.arrayResp.push(this.confirmarServices[i])
        }
        
      }

      /*resprecio = this.trunc(parseFloat(resprecio), 2); //2320

      porcIva = resprecio - (resprecio / 1.16); // 2320 - (2320 / 1.16) = 320
      this.ivaOptimo =  porcIva //320
      this.ivaExpress =  porcIva //320
      addVenta = parseFloat(addVenta) / 100; // 10 (10 / 100 = 0.10)
      addVenta = addVenta * parseFloat(resprecio); // 0.10 * 2320 = 232
      precioBaseSinIvaOpt = parseFloat(subtotal) + parseFloat(addVenta)
      this.precioVentas = parseFloat(resprecio) + parseFloat(addVenta); //2320 +  232 = 2552
      let monedaop = parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
      monedaop = this.trunc(monedaop);

      addXpress = parseFloat(addXpress) / 100; // 10 / 100 = 0.10
      addXpress = addXpress * parseFloat(resprecio); // 0.10 * 2320 = 232
      precioBaseSinIvaExp = parseFloat(precioBaseSinIvaOpt) + parseFloat(addXpress)
      this.precioExpres = parseFloat(resprecio) + parseFloat(addVenta) + parseFloat(addXpress); // 2320 + 232 + 232 = 2784
      let monedaxp = parseFloat(this.precioExpres) / parseFloat(this.valorDolar); // 2784 / 19.8532 = 140.2292829367558
      monedaxp = this.trunc(monedaxp);
      
      let agregado = {
        ids: idEnviado,
        nombre: resnombre,
        precio: this.precioVentas,
        id: resid,
        express: this.precioExpres,
        monedaopt: monedaop,
        monedaxpr: monedaxp,
        optimoOriginal: this.precioVentas,
        expressOriginal: this.precioExpres,
        iva: iva,
        porcIvaOptiomo: this.ivaOptimo,
        porcIvaExpress: this.ivaExpress,
        ret: ret,
        baseVenta: precioBaseSinIvaExp,
        subtotal: subtotal,
        total: total,
        baseVentaOpt: precioBaseSinIvaOpt,
        baseVentaExp: precioBaseSinIvaExp,
        adXpress: xpress,
        adVenta: venta,
        porcentajeExtra: 0,
      };
      this.confirmarServices.push(agregado);
      this.confirmarServices2.push(agregado);
      */

    },

    Total(){
      this.totalRetOpt = 0;
      this.totalRetExp = 0;
      this.totalIvaOpt = 0;
      this.totalIvaExp = 0;
      this.totalPrecioOpt = 0;
      this.totalPrecioExp = 0;
      this.totalTotalOpt = 0;
      this.totalTotalExp = 0;

      if(this.confirmarServices.length > 0){
        if(this.velocidadEnvio.toUpperCase() == 'OPTIMO'){
          for (let i = 0; i < this.confirmarServices.length; i++) {
            if(parseFloat(this.confirmarServices[i].porcentajeExtra) > 0){
              this.totalPrecioOpt = this.totalPrecioOpt + this.confirmarServices[i].precioBaseOptExt
              this.totalIvaOpt =  this.totalIvaOpt + this.confirmarServices[i].porcentajeIvaOpt
              this.totalRetOpt =  this.totalRetOpt + this.confirmarServices[i].ret
            }else{
              this.totalPrecioOpt = this.totalPrecioOpt + this.confirmarServices[i].baseVentaOpt
              this.totalIvaOpt =  this.totalIvaOpt + this.confirmarServices[i].porcIvaOptiomo
              this.totalRetOpt =  this.totalRetOpt + this.confirmarServices[i].ret
            }
            
          }
          
          this.totalTotalOpt = this.totalPrecioOpt + this.totalIvaOpt + this.totalRetOpt
          
        }else{
          for (let i = 0; i < this.confirmarServices.length; i++) {

            if(parseFloat(this.confirmarServices[i].porcentajeExtra) > 0){
              this.totalPrecioExp = this.totalPrecioExp + this.confirmarServices[i].precioBaseExpExt
              this.totalIvaExp =  this.totalIvaExp + this.confirmarServices[i].porcentajeIvaExp
              this.totalRetExp =  this.totalRetExp + this.confirmarServices[i].ret
            }else{
              this.totalPrecioExp = this.totalPrecioExp + this.confirmarServices[i].baseVentaExp
              this.totalIvaExp =  this.totalIvaExp + this.confirmarServices[i].porcIvaExpress
              this.totalRetExp =  this.totalRetExp + this.confirmarServices[i].ret
            }
          
          }
          this.totalTotalExp = this.totalPrecioExp + this.totalIvaExp + this.totalRetExp
        }
      }


    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-12">
        <div class="card" style="border: none; box-shadow: none">
          <div class="card-body" style="padding: 10px; background-color: #f5f6f8">
            <!-- <h4 class="header-title">Informacion</h4> -->

            <div class="row">
              <div class="col-lg-12">
                <div class="row mb-2">
                  <div class="col-4"></div>
                  <div class="col-4" style="text-align: center">
                    <h3>Selecciona una Opción</h3>
                    <div class="boton-circle btn-primary" style="display: inline-block" v-b-tooltip.hover="{ variant: 'secondary' }" @click="showOpcion(1)" title="Maritimo">
                      <i class="bx bxs-ship"></i>
                    </div>
                    <div class="boton-circle btn-success" style="display: inline-block" v-b-tooltip.hover="{ variant: 'secondary' }" @click="showOpcion(2)" title="Terrestre">
                      <i class="bx bxs-truck"></i>
                    </div>
                    <div class="boton-circle btn-info" style="display: inline-block" v-b-tooltip.hover="{ variant: 'secondary' }" @click="showOpcion(3)" title="Aereo">
                      <i class="bx bxs-plane-alt"></i>
                    </div>
                  </div>
                  <div class="col-4"> 
                    <b-button href="/new-cotizacion-advanced" size="md" style="background-color: #00786c;"><b><i class="fe-plus"></i> Generar una Cotización Avanzada</b></b-button>
                  </div>
                </div>

                <div id="terra" v-show="opcion == 2" style="padding-top: 10px">
                  <!--Inicio Terrestre-->

                  <div class="row mb-2">
                    <div class="col-lg-3"></div>

                    <div class="col-lg-2">
                      <div class="card ribbon-box">
                        <div class="card-body" style="padding: 10px">
                          <div :class="`ribbon ribbon-${fondoEtiquetas} float-let mb-0`" style="margin-left: -11px">
                            <b-form-checkbox v-model="statusnac" value="true" unchecked-value="false" @change="selectNacional(1, statusnac)" style="display: inline-block"><b style="color: white">Nacional</b></b-form-checkbox>&nbsp;
                          </div>

                          <div class="ribbon-content mb-0">
                            <b-form-group class="mb-0" label-cols-sm="2" label-cols-lg="2" label="" label-for="opc2" style="text-align: left">
                              <b-form-checkbox-group></b-form-checkbox-group>

                              <b-form-checkbox v-show="terOperation == 1" class="col-md-3" v-model="terstatusdir1" value="true" unchecked-value="false" @change="selectDirecto1(1, terstatusdir1)" style="display: inline-block">Directo</b-form-checkbox>

                              <b-form-checkbox-group></b-form-checkbox-group>

                              <!--b-form-checkbox v-show="terOperation == 1" class="col-md-3" v-model="terstatusmul" value="true" unchecked-value="false" @change="selectMulti(2, terstatusmul)"
                                style="display: inline-block">Multiparada</b-form-checkbox-->
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-2">
                      <div class="card ribbon-box">
                        <div class="card-body" style="padding: 10px">
                          <div :class="`ribbon ribbon-${fondoEtiquetas} float-let mb-0`" style="margin-left: -11px">
                            <b-form-checkbox v-model="statusexp" value="true" unchecked-value="false" name="expo" @change="selectExpo(2, statusexp)" style="display: inline-block"><b style="color: white">Expo</b></b-form-checkbox>
                          </div>

                          <div class="ribbon-content mb-0">
                            <b-form-group class="mb-0" label-cols-sm="2" label-cols-lg="2" label="" label-for="opc2" style="text-align: left">
                              <b-form-checkbox-group name="model1"></b-form-checkbox-group>

                              <b-form-checkbox v-show="terOperation == 2" class="col-md-3" v-model="terstatusdir2" value="true" unchecked-value="false" @change="selectDirecto2(1, terstatusdir2)" style="display: inline-block">Directo</b-form-checkbox>

                              <b-form-checkbox-group name="model2"></b-form-checkbox-group>

                              <!--b-form-checkbox v-show="terOperation == 2" class="col-md-3" v-model="terstatustras1" value="true" unchecked-value="false" name="expo" @change="selectTras1(2, terstatustras1)" style="display: inline-block">Trasbordo</b-form-checkbox-->
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-2">
                      <div class="card ribbon-box">
                        <div class="card-body" style="padding: 10px">
                          <div :class="`ribbon ribbon-${fondoEtiquetas} float-let mb-0`" style="margin-left: -11px">
                            <b-form-checkbox v-model="statusimp" value="true" unchecked-value="false" name="impo" @change="selectImpo(3, statusimp)" style="display: inline-block"><b style="color: white">Impo</b></b-form-checkbox>
                          </div>

                          <div class="ribbon-content mb-0">
                            <b-form-group id="terimpo" class="mb-0" label-cols-sm="2" label-cols-lg="2" label="" label-for="opc2" style="text-align: left">
                              <b-form-checkbox-group name="model1"></b-form-checkbox-group>

                              <b-form-checkbox class="col-md-3" v-show="terOperation == 3" value="true" v-model="terstatusdir3" unchecked-value="false" @change="selectDirecto3(1, terstatusdir3)" style="display: inline-block">Directo</b-form-checkbox>

                              <b-form-checkbox-group name="model2"></b-form-checkbox-group>

                              <!--b-form-checkbox class="col-md-3" v-show="terOperation == 3" value="true" v-model="terstatustras2" unchecked-value="false" name="expo" @change="selectTras2(2, terstatustras2)" style="display: inline-block">Trasbordo</b-form-checkbox-->
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3"></div>
                    <!-- end col -->
                  </div>

                  <div class="row" id="formOperaciones">
                    <div class="col-12" v-show="terMostrar == 1">
                      <div class="row">
                        <div class="col-12">
                          <b-card :bg-variant="fondoBusqueda">
                            <div class="input-group mb-1">
                              <input type="text" class="form-control col-4" placeholder="Origen..." title="Agregar Origen" readonly v-model.trim="terorigen" />
                              <div class="input-group-append">
                                <b-button class="btn btn-secondary waves-effect waves-light" variant="secondary" v-b-modal.signup-modal v-b-tooltip.hover="{ variant: 'success' }" title="Agregar Origen" @click="showOrigenDestino(1)" data-toggle="modal" data-target="#signup-modal" style="height: 38px"><i class="fas fa-plus-circle"></i></b-button>
                              </div>

                              <input class="form-control col-4" placeholder="Destino..." readonly type="text" v-model.trim="terdestino" />

                              <div class="input-group-append">
                                <b-button class="btn btn-secondary waves-effect waves-light" variant="secondary" v-b-modal.signup-modal title="Agregar Destino" v-b-tooltip.hover="{ variant: 'success' }" @click="showOrigenDestino(2)" data-toggle="modal" data-target="#signup-modal" style="height: 38px"><i class="fas fa-plus-circle"></i></b-button>
                              </div>

                              <b-form-input border-color="primary" class="rounded col-2" type="date" id="terfecha" title="Fecha de Carga" v-b-tooltip.hover="{ variant: 'success' }" :min="dateNow" :value="dateNow" v-model.trim="terfecha"></b-form-input>

                              <b-form-select id="modalidades" class="rounded form-control col-1" title="Tipo de Operacion" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="termodalidad">
                                <option value="FTL">FTL</option>
                                <option value="LTL">LTL</option>
                                <option value="FCL">FCL</option>
                              </b-form-select>

                              <b-form-select id="cargas" class="rounded form-control col-2" title="Tipo de Carga" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="tertipocarga" @change="selectTipoUnidad">
                                <option value="g">General</option>
                                <option value="h">Peligrosa</option>
                                <option value="r">Refrigerada</option>
                              </b-form-select>

                              <b-button class="btn btn-secondary waves-effect waves-light" title="Buscar" v-b-tooltip.hover="{ variant: 'success' }" variant="secondary" @click="generateCotizacion(1)" style="height: 38px">
                                <i class="fe-search"></i>
                              </b-button>
                            </div>
                            <b-col cols="12" v-if="mercancias != ''">
                              <b-popover target="cargas" triggers="hover" :show.sync="popoverShow" placement="bottom" container="my-container" ref="popover">
                                <template #title>
                                  <b-button @click="onClose" class="close" aria-label="Close">
                                    <span class="d-inline-block" aria-hidden="true">&times;</span>
                                  </b-button>
                                  {{ mercancias? mercancias: "" }}
                                </template>

                                <div>
                                  <div class="row">
                                    <div class="col-md-4">
                                      <label for="embalaje" class="form-label">
                                        Embalaje
                                      </label>
                                      <b-form-select id="embalaje" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success', }" v-model.trim="terembalaje" @change="selectEmbalaje">
                                        <option value="1">PALLETS</option>
                                        <option value="2">SACOS</option>
                                        <option value="3">BULTO</option>
                                        <option value="4">TAMBOS</option>
                                        <option value="5">ROLLOS</option>
                                        <option value="6">CAJAS</option>
                                        <option value="7">TUBOS</option>
                                        <option value="8">CARGA SUELTA</option>
                                        <option value="9">SUPER SACO</option>
                                        <option value="10">OTRO</option>
                                        <option value="11">BIDONES</option>
                                        <option value="12">CUÑETES</option>
                                      </b-form-select>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="estibable" class="form-label">
                                        Estibable
                                      </label>
                                      <b-form-select id="estibable" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success', }" v-model.trim="terestibable" @change="selectEstibable">
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                      </b-form-select>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="clasifica" class="form-label">
                                        Clasificación
                                      </label>
                                      <b-form-group id="clasifica" v-model.trim="clasifica">
                                        <v-autocomplete :items="dates_search_proser" v-model="clasifica" :get-label="getLabelProd" :component-item="templateProvServ" @update-items="clasificaciones" input-class="form-control form-control-sm" placeholder="buscar..." item-text="clasifica" item-value="clasifica" return-object>
                                        </v-autocomplete>
                                      </b-form-group>
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-md-4">
                                      <label for="cantMerc" class="form-label">
                                        Cantidad
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="cantMerc" type="number" />
                                    </div>
                                    <div class="col-md-4">
                                      <label for="volMerc" class="form-label">
                                        Volúmen (m3)
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="volMerc" type="number" />
                                    </div>
                                    <div class="col-md-4">
                                      <label class="form-label" for="gridCheck">
                                        Peso Total
                                      </label>
                                      <div class="row">
                                        <input class="form-control form-control-sm col-md-7" v-model.trim="pesTMerc" type="text" />
                                        <b-form-select id="unidaMedidaMerc" class="form-control custom-select-sm col-md-4" v-b-tooltip.hover="{ variant: 'success', }" v-model.trim="unidaMedidaMerc" @change="selectUniMedMerc">
                                          <option value="kg">Kg</option>
                                          <option value="lb">Lb</option>
                                        </b-form-select>
                                      </div>
                                    </div>

                                  </div>
                                  <div class="row">

                                    <b-col md="12" v-if="this.numcols == 12">
                                      <label for="descripcion" class="form-label">
                                        Descripción
                                      </label>
                                      <textarea class="form-control form-control-sm" v-model.trim="descripMerc"
                                        type="text" />
                                    </b-col>
                                    <b-col md="4" v-else>
                                      <label for="descripcion" class="form-label">
                                        Descripción
                                      </label>
                                      <textarea class="form-control form-control-sm" style="height: 33px;" v-model.trim="descripMerc" type="text" />
                                    </b-col>
                                    <b-col md="4" v-if="this.tertipocarga == 'h'">
                                      <label for="unMerc" class="form-label">
                                        UN
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="unMerc" type="text" />
                                    </b-col>
                                    <b-col cols="4" v-if="this.tertipocarga == 'h'">
                                      <label for="classMerc" class="form-label">
                                        CLASS
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="classMerc" type="text" />
                                    </b-col>
                                    <b-col v-if="this.tertipocarga == 'r'">
                                      <label for="gradosMerc" class="form-label">
                                        Grados
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="gradosMerc" type="text" />
                                    </b-col>
                                    <b-col v-if="this.tertipocarga == 'r'">
                                      <label for="tUnidadMerc" class="form-label">
                                        Tipo de Unidad
                                      </label>
                                      <input class="form-control form-control-sm" v-model.trim="tUnidadMerc" type="text" />
                                    </b-col>
                                  </div>
                                  <br/>
                                  <b-button @click="onClose" size="sm" variant="secondary" title="Cancelar"><b><i class="fe-slash"></i></b></b-button>
                                  <b-button @click="onOk" size="sm" style="background-color: #00786c;" title="Guardar"><b><i class="fe-save"></i></b></b-button>
                                </div>
                              </b-popover>
                            </b-col>
                          </b-card>
                        </div>
                      </div>
                    </div>

                    <template>
                      <b-modal id="signup-modal" hide-header hide-footer>
                        <div class="text-center mt-0 mb-2">
                          <h4 id="origen-destino">{{ this.origen_destino }}</h4>
                        </div>

                        <form class="px-3" action="#">
                          <div class="form-group">
                            <label for="pais">Pais</label>
                            <b-form-select id="pais" class="rounded form-control col-12" v-model.trim="pais" @change="getEstado($event)">
                              <option v-for="paises in countrys" :key="paises.id" v-bind:value="paises.id">
                                {{ paises.name }}
                              </option>
                            </b-form-select>
                          </div>

                          <div class="form-group">
                            <label for="cp">C.P.</label>
                            <b-form-group id="cp_txt" v-model.trim="cp">
                              <!-- <autocomplete
                                    :search="getautocomplit_r1"
                                    :get-result-value="getResultValue_r1"
                                    :debounce-time="500"
                                    @submit="onSubmit_r1"
                                    id="cpRutaO"
                                  ></autocomplete> -->
                              <v-autocomplete :items="dates_search" v-model="cpRutaO" :get-label="getLabel" :component-item="template" @update-items="updateItems" input-class="form-control" placeholder="buscar..." item-text="cpRutaO" item-value="cpRutaO" return-object></v-autocomplete>
                            </b-form-group>
                          </div>

                          <div class="form-group">
                            <label for="estado">Estado</label>
                            <select id="estado" disabled class="form-control" v-model.trim="estado">
                              <option v-for="estate in estates" :key="estate.id" v-bind:value="estate.id">
                                {{ estate.name }}
                              </option>
                            </select>
                          </div>

                          <div class="form-group">
                            <label for="city">Ciudad/Municipio</label>
                            <input readonly class="form-control" v-model.trim="ciudad" type="text" placeholder="Ciudad/Municipio" />
                          </div>

                          <div class="form-group text-right">
                            <b-button class="width-md ml-1" variant="secondary" @click="$bvModal.hide('signup-modal')">Cerrar</b-button>

                            <b-button class="width-md ml-1" variant="primary" @click="addDirection()">Guardar</b-button>
                          </div>
                        </form>
                      </b-modal>
                    </template>

                    <!-- <div class="text-center" v-show="tercotizacion == 0">
                          <b-spinner label="Text Centered"></b-spinner>
                        </div>                       -->

                    <div class="col-3" v-show="tercotizacion == 1 || tercotizacion == 2 || tercotizacion == 3">
                      <b-card class="rounded">
                        <div class="row">
                          <div class="col-sm-12">
                            <b-form-group>
                              <label for="" style="font-size: 12px; font-weight: bold">UNIDAD</label>
                              <b-form-radio v-model="tipoUnidad" v-for="unidad in units" :key="unidad.id" v-bind:value="unidad.id" @change="cambioUnidad(unidad.code_name, unidad.id)" style="font-size: 12px">{{ unidad.code_name }}
                              </b-form-radio>
                            </b-form-group>
                          </div>
                        </div>
                      </b-card>

                      <b-card class="rounded" v-show="listVentas.length > 0">
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="" style="font-size: 12px; font-weight: bold">SERVICIOS</label>
                            <b-form-checkbox name="listadoServicios" v-bind:id="serv.id + 'cheServicios'" v-model="selectServices" v-for="serv in services" :key="serv.id" v-bind:value="serv.id" :disabled="serv.nameproduct == 'FLETE NACIONAL'" @change="addServicios(serv.id, serv.nameproduct)" style="font-size: 12px"><b style="font-weight: bold">{{ serv.nameproduct }}</b></b-form-checkbox>
                          </div>
                        </div>
                      </b-card>

                      <b-card class="rounded" v-show="listVentas.length == 0">
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="" style="font-size: 12px; font-weight: bold">SERVICIOS</label>
                            <b-form-checkbox name="listadoServicios" v-bind:id="serv.id + 'cheServ'" v-model="selectServices" v-for="serv in services" :key="serv.id" v-bind:value="serv.id" :disabled="serv.nameproduct == 'FLETE NACIONAL'" @change="addServiciosOptimo(serv.id, serv.nameproduct)" style="font-size: 12px"><b style="font-weight: bold">{{ serv.nameproduct }}</b></b-form-checkbox>
                          </div>
                        </div>
                      </b-card>
                    </div>

                    <div class="col-6" v-show="tercotizacion == 1 || tercotizacion == 2 || tercotizacion == 3" style="margin-bottom: 6px">
                      <div class="row" v-if="listVentas.length > 0">
                        <div class="col-12">
                          <b-card class="rounded">
                            <b-tabs justified nav-class="nav-tabs nav-bordered" style="margin-top: -24px; margin-bottom: -36px">
                              <b-tab title="Optimo" active @click="aumentaOptimo(1)"></b-tab>
                              <b-tab title="Express" @click="aumentaExpress(1)">
                              </b-tab>
                            </b-tabs>
                          </b-card>
                        </div>

                        <div class="col-12" v-if="listVentas.length > 0">
                          <!--div v-for="data in listVentas[0]" v-bind:key="data.id"-->
                          <div v-bind:key="listVentas[0].id">
                            <b-card no-body>
                              <b-card-body class="py-2">
                                <div class="row" style="border-bottom: 2px solid #f5f4f4; margin-top: -12px;">
                                  <div class="col-md-4 text-left mt-2 mb-2">
                                    <i class="fe-truck" style="color: #00786c; font-size: 38px"></i>
                                  </div>

                                  <div class="col-md-8 text-right mt-2 mb-2">
                                    <b-button pill style="background-color:#00786c;" :disabled="isActive" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal" @click="valorBoton(listVentas[0].id, listVentas[0].servicio, listVentas[0].total, listVentas[0].diasTransito)">
                                      <!--b v-show="divisa == '1'">
                                        ${{ formatMoney(priceSale + parseFloat(data.total) / parseFloat(valorDolar))}}
                                      </b>
                                      <b v-show="divisa == '2'">
                                        ${{ formatMoney(priceSale + parseFloat(data.total))}}
                                      </b-->
                                      <b v-show="divisa == '1'">
                                        ${{ formatMoney(priceSale / parseFloat(valorDolar))}}
                                      </b>
                                      <b v-show="divisa == '2'">
                                        ${{ formatMoney(priceSale)}}
                                      </b>
                                    </b-button>
                                  </div>
                                </div>

                                <div class="row py-2" style="margin-bottom: -20px">
                                  <div class="col-md-6">
                                    <p class="text-left" style="font-size: 12px; font-weight: bold">
                                      {{ listVentas[0].estadoOrigen.toUpperCase() }},
                                      {{ listVentas[0].ciudadOrigen.toUpperCase() }}
                                    </p>
                                  </div>

                                  <div class="col-md-6">
                                    <p class="text-right" style="font-size: 12px; font-weight: bold">
                                      {{ listVentas[0].estadoDestino.toUpperCase() }},
                                      {{ listVentas[0].ciudadDestino.toUpperCase() }}
                                    </p>
                                  </div>
                                </div>

                                <!-- Dias de Transito -->

                                <div class="row mb-2">
                                  <div class="col-md-12 text-center">
                                    <label for="" class="text-center">{{ listVentas[0].diasTransito }} Dias</label>
                                  </div>
                                </div>

                                <!--Marcar Botones -->

                                <div class="row">
                                  <div class="col-md-1">
                                    <b-button variant="outline-success" class="btn btn-circle"
                                      @click="mostrarRutaDirecta()"></b-button>
                                  </div>

                                  <div class="col-md-10">
                                    <div class="row" style=" margin-top: -18px; margin-bottom: -20px;">
                                      <div class="col-md-12 text-center">
                                        <p>
                                          <i class="fe-truck" style="color: #00786c"></i>
                                        </p>
                                      </div>
                                    </div>

                                    <div class="row mt-2">
                                      <div class="col-md-12">
                                        <p v-if="cambioTerrestre == 0"
                                          style=" border-bottom: 2px solid #00786c; margin-left: -22px; margin-right: -20px;">
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-md-1">
                                    <b-button variant="outline-success" class="btn btn-circle"></b-button>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-12">
                                    <div class="justify-content-center row">
                                      <b-button variant="link" size="sm" @click="showDetails()"><b>Detalles</b></b-button>
                                    </div>

                                    <!--div class="row mb-1" style="border-top: 2px solid #f5f4f4" v-show="details == 1">
                                      <div class="col-md-6 text-left">
                                        {{ data.servicio }}
                                      </div>

                                      <div class="col-md-6 text-right">
                                        <b v-show="divisa == 1">
                                          $ {{ formatMoney(data.total) }}
                                        </b>
                                        <b v-show="divisa == 2">
                                          $ {{ formatMoney(data.total) }}
                                        </b>
                                      </div>
                                    </div-->

                                    <div class="row mb-1" style="border-top: 2px solid #f5f4f4" v-show="details == 1" v-for="servic in confirmarServices2" :key="servic.ids" v-bind:value="servic.ids">
                                        <div class="col-md-6 text-left">{{ servic.nombre }}</div>

                                        <div v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servic.porcentajeExtra > 0 && divisa == 2" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.totalExpExt) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servic.porcentajeExtra == 0 && divisa == 2" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.express) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servic.porcentajeExtra > 0 && divisa == 2" class="col-md-6 text-right"><b>$ {{ formatMoney(parseFloat(servic.totalOptExt)) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servic.porcentajeExtra == 0 && divisa == 2" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.precio)  }} </b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servic.porcentajeExtra > 0 && divisa == 1" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.totalExpExt / valorDolar) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servic.porcentajeExtra == 0 && divisa == 1" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.expressOriginal / valorDolar) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servic.porcentajeExtra > 0 && divisa == 1" class="col-md-6 text-right"><b>$ {{ formatMoney(parseFloat(servic.totalOptExt / valorDolar)) }}</b></div>
                                        <div v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servic.porcentajeExtra == 0 && divisa == 1" class="col-md-6 text-right"><b>$ {{ formatMoney(servic.optimoOriginal / valorDolar)  }} </b></div>
                                    
                                  </div>
                                </div>
                              </div>
                            </b-card-body>
                          </b-card>
                        </div>
                      </div>

                      <!--div class="col-12">
                        <b-card class="rounded">
                          <div class="row">
                            <div class="col-sm-12" style="text-align: center">
                              <h1>Mapa</h1>
                            </div>
                          </div>
                        </b-card>
                      </div-->
                    </div>

                      <!-- Inicia else -->
                      <div class="row" v-else>
                        <div class="col-12">
                          <b-card class="rounded">
                            <b-tabs justified nav-class="nav-tabs nav-bordered" style="margin-top: -24px; margin-bottom: -36px">
                              <b-tab title="Optimo" active @click="aumentaOptimo(2)"></b-tab>
                              <b-tab title="Express" @click="aumentaExpress(2)">
                              </b-tab>
                            </b-tabs>
                          </b-card>
                        </div>

                        <div class="col-12">
                          <b-card no-body>
                            <b-card-body class="py-2">
                              <div class="row" style="border-bottom: 2px solid #f5f4f4; margin-top: -12px;">
                                <div class="col-md-4 text-left mt-2 mb-2">
                                  <i class="fe-truck" style="color: #00786c; font-size: 38px"></i>
                                </div>

                                <div class="col-md-4 text-left mt-2 mb-2"></div>

                                <div class="col-md-4 text-right mt-2 mb-2">
                                  <b-button pill style="background-color:#00786c;" :disabled="isActive" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal"
                                    data-target="#resumen-modal">
                                    <b>En Proceso de Cotizacion</b>
                                  </b-button>
                                </div>
                              </div>

                              <div class="row py-2" style="margin-bottom: -20px">
                                <div class="col-md-6">
                                  <!-- <p class="text-left" style="font-size:12px; font-weight: bold;"> {{ data.estadoOrigen.toUpperCase() }}, {{ data.ciudadOrigen.toUpperCase() }} </p> -->
                                </div>

                                <div class="col-md-6">
                                  <!-- <p class="text-right" style="font-size:12px; font-weight: bold;"> {{ data.estadoDestino.toUpperCase() }}, {{ data.ciudadDestino.toUpperCase() }} </p> -->
                                </div>
                              </div>

                              <!-- Dias de Transito -->

                              <div class="row mb-2">
                                <div class="col-md-12 text-center">
                                  <!-- <label for="" class="text-center">{{ data.diasTransito }} Dias</label> -->
                                </div>
                              </div>

                              <!--Marcar Botones -->

                              <div class="row">
                                <div class="col-md-1">
                                  <b-button variant="outline-success" class="btn btn-circle"
                                    @click="mostrarRutaDirecta()"></b-button>
                                </div>

                                <div class="col-md-10">
                                  <div class="row" style="margin-top: -18px; margin-bottom: -20px;">
                                    <div class="col-md-12 text-center">
                                      <p>
                                        <i class="fe-truck" style="color: #00786c"></i>
                                      </p>
                                    </div>
                                  </div>

                                  <div class="row mt-2">
                                    <div class="col-md-12">
                                      <p v-if="cambioTerrestre == 0"
                                        style="border-bottom: 2px solid #00786c; margin-left: -22px; margin-right: -20px;">
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-1">
                                  <b-button variant="outline-success" class="btn btn-circle"></b-button>
                                </div>
                              </div>

                              <!--Optimo-->
                              <div class="row">
                                <div class="col-12">
                                  <div class="justify-content-center row">
                                    <b-button variant="link" size="sm" @click="showDetails()"><b>Detalles</b></b-button>
                                  </div>

                                  <div class="row mb-1" style="border-top: 2px solid #F5F4F4;" v-show="details == 1" v-for="servic in confirmarServices3" :key="servic.ids" v-bind:value="servic.ids">

                                    <div class="col-md-6 text-left">
                                      {{ servic.nombre }}
                                    </div>

                                    <div class="col-md-6 text-right">
                                      <b> $ {{ servic.precio }} </b>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </b-card-body>
                          </b-card>
                        </div>

                        <div class="col-12" hidden>
                          <b-card class="rounded">
                            <div class="row">
                              <div class="col-sm-12" style="text-align: center">
                                <h1>Mapa</h1>
                              </div>
                            </div>
                          </b-card>
                        </div>
                      </div>
                      <!-- Fin else -->

                      <!-- <p class="text-center" style="margin-top: 110px; font-size: 20px;" v-else>No hay resultados...</p> -->
                    </div>

                    <div class="col-3" v-show="tercotizacion == 1 || tercotizacion == 2 || tercotizacion == 3">
                      <b-card class="rounded" v-if="listVentas.length > 0">
                        <template>
                          <div class="row">
                            <div class="col-sm-12">
                              <div>
                                <label for="" style="font-size: 15px; font-weight: bold">NOTIFICACION</label>
                              </div>
                              <div class="row" v-if="resClasificaZona != '' && zonaValidaCo == 3">
                                <div class="col-sm-12">
                                  <b-alert show dismissible v-bind:variant="notColorZona">
                                    <h4 class="alert-heading">Aviso de Ruta</h4>
                                    <p v-html="notTextoZona"></p>
                                  </b-alert>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </b-card>

                      <b-card class="rounded" v-else>
                        <template>
                          <div class="row">
                            <div class="col-sm-12">
                              <div>
                                <label for="" style="font-size: 15px; font-weight: bold">NOTIFICACION</label>
                                <div class="row" v-if="resClasificaZona != '' && zonaValidaCo == 0">
                                  <div class="col-sm-12">
                                    <b-alert show dismissible v-bind:variant="notColorZona">
                                      <h4 class="alert-heading">Zona de Servicio</h4>
                                      <p v-html="notTextoZona"></p>
                                    </b-alert>
                                  </div>
                                </div>
                                <div class="row" v-else>
                                  <div class="col-sm-12">
                                    <b-alert show dismissible variant="secondary">
                                      <h4 class="alert-heading">Aviso de Ruta</h4>
                                      <p v-html="notTextoZona"></p>
                                    </b-alert>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </b-card>

                      <div v-show="estadoCotiza">
                        <b-card class="rounded">
                          <template>
                            <div class="row">
                              <div class="col-sm-12">
                                <b-alert show variant="success">
                                  <h4 class="alert-heading">Muy bien!</h4>
                                  <p>La cotización quedó registrada correctamente y se envio a validación, espere respuesta por correo.
                                  </p>
                                  <hr>
                                  <p class="mb-0 text-center">
                                    <b-button variant="outline-success" @click="reloadPage"><i class="fas fa-plus-circle"></i> Nueva Cotización</b-button>
                                  </p>
                                </b-alert>
                              </div>
                            </div>
                          </template>
                        </b-card>
                      </div>

                    </div>

                    <!--INICIA MODAL-->

                    <div class="row">
                      <div class="col-1"></div>

                      <div class="col-md-10">
                        <div class="row">
                          <b-modal id="resumen-modal" hide-header hide-footer title="INFORMACION GENERAL" title-class="font-18" dialog-class="modal-xl" no-close-on-esc no-close-on-backdrop>
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <b-container class="bv-example-row" style="background-color: #ffffff;">
                                    <b-row style="border-color: #00786c; border-width: 1px; border-bottom-style: solid;">
                                      <b-col cols="2" style="border-color: #00786c; border-width: 3px; border-bottom-style: solid;">
                                        <div class="justify-content-center align-items-center">
                                          <img src="../../../assets/images/logo_interland.png" alt="Logo Interland" style="width: 100%;" />
                                        </div>
                                      </b-col>
                                      <b-col cols="8">
                                        <div style="align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto;">
                                          <div style="color:#000000"><b>INTERLAND TRANSPORT SA DE CV</b></div>
                                          <div>Jaime  Balmes  11  Edificio  C  Piso  7  Of.  701B  Col.  Los  Morales Polanco  Del.  Miguel  Hidalgo,  Ciudad  de  Mexico,  C.P.  11510, Mexico.</div>
                                          <div>RFC: ITR071117UD1</div>
                                          <div>Regimen: 601 - General de Ley Personas Morales.</div>
                                        </div>
                                      </b-col>
                                      <b-col cols="2">
                                        <div style="border:2px solid #6c757d; width:150px; align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto; padding-top: 10px; margin-top: auto; padding-bottom: 10px; margin-bottom: auto; text-align: ;">
                                          <b style="font-weight: bold; color: #00786c;">COTIZACIÓN</b><br>
                                          <b style="font-weight: bold; color: #000000;">FOLIO ID:</b><br>
                                          <b style="font-weight: bold; color: #000000;">{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6, '0') }}</b>
                                      </div>
                                      </b-col>
                                    </b-row>
                                    <!--b-row class="text-center rounded-right" style="background-color: #00786c;">
                                      <b-col>
                                        <h2 style="text-align: center; color:white;">Detalle del Servicio</h2>
                                      </b-col>
                                    </b-row-->
                                    <br />
                                    <b-row class="p-1" style="background-color: #6c757d; color: #ffffff;">
                                      <b-col class="text-left"><label style="color: #ffffff;">INFORMACIÓN GENERAL</label></b-col>
                                      <b-col class="text-right">Ciudad de México a {{ fechaFormato }}</b-col>
                                    </b-row>
                                    <b-row class="text-left p-2">
                                      <b-col>
                                        <div role="group">
                                          <label style="font-size: 11px;">FOLIO DE COTIZACIÓN:</label>
                                          <br />
                                          <p>
                                            <b>{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6, '0') }}</b>
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">FECHA DE COTIZACIÓN:</label>
                                          <br />
                                          <p>
                                            {{ terfecha }}
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">TIPO DE SERVICIO:</label>
                                          <br />
                                          <p>
                                            {{ tipoOpcion }}
                                          </p>
                                        </div>
                                      </b-col>
                                      <b-col>
                                        <div role="group">
                                          <label style="font-size: 11px;">ORIGEN:</label>
                                          <br />
                                          <p class="" style="font-size: 12px;">
                                            {{ terorigen.toUpperCase() }}
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">TIPO DE OPERACIÓN:</label>
                                          <br />
                                          <p class="" style="font-size: 12px;">
                                            {{ termodalidad.toUpperCase() }}
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">TIPO DE ENVIO:</label>
                                          <br />
                                          <p>
                                            {{ tipoEnvio }}
                                          </p>
                                        </div>
                                      </b-col>
                                      <b-col>
                                        <div role="group">
                                          <label style="font-size: 11px;">DESTINO:</label>
                                          <br />
                                          <p class="" style="font-size: 12px;">
                                            {{ terdestino.toUpperCase() }}
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">TIPO DE CARGA:</label>
                                          <br />
                                          <p class="" style="font-size: 12px;">
                                            {{ carga.toUpperCase() }}
                                          </p>
                                        </div>
                                        <div role="group">
                                          <label style="font-size: 11px;">USUARIO QUE GENERA:</label>
                                          <br />
                                          <p>
                                            {{ username }}
                                          </p>
                                        </div>
                                      </b-col>
                                      <b-col cols="2 text-center">
                                        <!--img style="width: 80%;" src="../../../../public/logo_in.png" /-->
                                        <div class="col-md-12 text-center" v-show="listVentas.length > 0">
                                          <b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" style="background-color: #00786c;" size="sm">Divisa: USD</b-button>
                                          <b-button v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" style="background-color: #00786c;" size="sm">Divisa: MXN</b-button>
                                        </div>
                                      </b-col>
                                      <b-col cols="12">
                                        <div class="row" v-if="resClasificaZona != ''">
                                          <div class="col-sm-12">
                                            <b-alert show v-bind:variant="notColorZona">
                                              <h4 class="alert-heading">Aviso de Ruta</h4>
                                              <p v-html="notTextoZona"></p>
                                            </b-alert>
                                          </div>
                                        </div>
                                      </b-col>
                                    </b-row>
                                    <b-row class="p-1" style="background-color: #6c757d; color: #ffffff;">
                                      <b-col class="text-left">
                                        <label style="color:#ffffff;">MERCANCIAS</label>
                                      </b-col>
                                    </b-row>
                                    <div v-if="this.tertipocarga == 'r'">
                                      <b-row class="p-2">
                                        <b-col cols="6">
                                          <label style="font-size: 11px;">GRADOS:</label>
                                          <p style="font-size: 12px;">
                                            {{ gradosMerc.toUpperCase() }}
                                          </p>
                                        </b-col>
                                        <b-col cols="6">
                                          <label style="font-size: 11px;">TIPO DE UNIDAD:</label>
                                          <p style="font-size: 12px;">
                                            {{ tUnidadMerc.toUpperCase() }}
                                          </p>
                                        </b-col>
                                      </b-row>
                                    </div>
                                    <div v-if="this.tertipocarga == 'h'">
                                      <b-row class="p-2">
                                        <b-col cols="6">
                                          <label style="font-size: 11px;">UN:</label>
                                          <p style="font-size: 12px;">
                                            {{ unMerc.toUpperCase() }}
                                          </p>
                                        </b-col>
                                        <b-col cols="6">
                                          <label style="font-size: 11px;">CLASS:</label>
                                          <p style="font-size: 12px;">
                                            {{ classMerc.toUpperCase() }}
                                          </p>
                                        </b-col>
                                      </b-row>
                                    </div>
                                    <b-row class="p-2">
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">ENVIO:</label>
                                        <p style="font-size: 12px;">
                                          {{ velocidadEnvio.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">EMBALAJE:</label>
                                        <p style="font-size: 12px;">
                                          {{ /*terembalaje.toUpperCase()*/ terDescEmbalaje.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">ESTIBABLE:</label>
                                        <p style="font-size: 12px;">
                                          {{ terestibable.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">CLASIFICACIÓN:</label>
                                        <p style="font-size: 12px;">
                                          {{ (clasificaText ? clasificaText : '') }}
                                        </p>
                                      </b-col>
                                    </b-row>
                                    <b-row class="p-2">
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">CANTIDAD:</label>
                                        <p style="font-size: 12px;">
                                          {{ cantMerc.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">VOLUMEN (m3):</label>
                                        <p style="font-size: 12px;">
                                          {{ volMerc.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">PESO TOTAL:</label>
                                        <p style="font-size: 12px;">
                                          {{ pesTMerc.toUpperCase() + unidaMedidaMerc.toUpperCase() }}
                                        </p>
                                      </b-col>
                                      <b-col cols="3">
                                        <label style="font-size: 11px;">DESCRIPCIÓN:</label>
                                        <p style="font-size: 12px;">
                                          {{ descripMerc.trim() }}
                                        </p>
                                      </b-col>
                                    </b-row>
                                    <b-row class="p-1" style="background-color: #6c757d; color: #ffffff;">
                                      <b-col class="text-left"><label style="color:#ffffff">SERVICIOS</label></b-col>
                                      <b-col cols="5"></b-col>
                                      <b-col></b-col>
                                    </b-row>

                                    <div class="row" v-if="listVentas.length > 0">
                                      <div class="col-md-12">
                                        <div class="form-group row mb-0">
                                          <div class="table-responsive">
                                            <table class="table table-sm mb-0" width="100%" v-if="confirmarServices.length > 0">
                                              <thead>
                                                <tr>
                                                  <th>SERVICIOS</th>
                                                  <th>PRECIO</th>
                                                  <th>I.V.A.</th>
                                                  <th>RET.</th>
                                                  <th></th>
                                                  <th>TOTAL</th>
                                                  <th>AJUSTE DE VENTA</th>
                                                  <th v-show="impuestos == 1">PORCENTAJE</th>
                                                  <th v-show="impuestos == 1">TOTAL + AJUSTE</th>
                                                </tr>
                                              </thead>

                                              <tbody v-if="divisa == 2">
                                                <tr v-for="servicios in confirmarServices" v-bind:key="servicios.ids">
                                                  <td  style="text-right"> {{ servicios.nombre }} </td>

                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseExpExt))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.baseVentaExp))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseOptExt))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.baseVentaOpt))  }} </td>
                                                  
                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaExp))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcIvaExpress))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaOpt))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcIvaOptiomo))  }} </td>


                                                  <td  style="text-right"> {{ formatMoney(servicios.ret) }} </td>

                                                  <td v-if="servicios.precio == 0" align="right" style="font-size:10px; font-weight: bold;">En Proceso de Cotización</td>
                                                  <td v-else  align="right" style="font-size:10px; font-weight: bold;">Incluye Impuestos</td>

                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalExpExt))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(servicios.express) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalOptExt))  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(servicios.precio)  }} </td>

                                                  <td  align="center" v-if="servicios.precio != 0">
                                                    <input class="form-control-input" type="checkbox" v-bind:id="servicios.ids + 'check'" :key="servicios.ids" v-model="serviciosResumen" v-bind:value="servicios.ids" @change="mostrarImpuesto(servicios.ids)">
                                                  </td>
                                                  <td  align="center" v-else>
                                                    <input disabled hidden type="checkbox" v-bind:id="servicios.ids + 'check'" :key="servicios.ids" v-model="serviciosResumen" v-bind:value="servicios.ids">
                                                    <p>En Proceso de Cotización</p>
                                                  </td>
                                                  <td v-show="impuestos == 1">
                                                    <select v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'" hidden v-bind:id="servicios.ids + 'seleccionImpuesto'" class=" form-control-sm col-md-12" @change="sumaImpuesto($event, servicios.ids, servicios.optimoOriginal)">
                                                      <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0"> {{ opc.value }}% </option>
                                                    </select>
                                                    <select v-else hidden v-bind:id="servicios.ids + 'seleccionImpuesto'" class=" form-control-sm col-md-12" @change="sumaImpuesto($event, servicios.ids, servicios.expressOriginal)">
                                                      <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0"> {{ opc.value }}% </option>
                                                    </select>
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'escondeImpuesto'">
                                                  </td>

                                                  <td v-show="impuestos == 1">
                                                    <input hidden placeholder="Total" class="form-control form-control-sm col-md-6 text-center" type="text" value="0" v-bind:id="servicios.ids + 'sumaTotal'" readonly>
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'impuestoOculto'">
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'ocultarSumaTotal'">
                                                  </td>

                                                </tr>
                                              </tbody>
                                              <tbody v-else>
                                                <tr v-for="servicios in confirmarServices" v-bind:key="servicios.ids">
                                                  <td  style="text-right"> {{ servicios.nombre }} </td>

                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseExpExt) / valorDolar)  }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.baseVentaExp) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseOptExt) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.baseVentaOpt) / valorDolar) }} </td>
                                                  
                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaExp) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcIvaExpress) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaOpt) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcIvaOptiomo) / valorDolar) }} </td>


                                                  <td  style="text-right"> {{ formatMoney(servicios.ret) }} </td>

                                                  <td v-if="servicios.precio == 0" align="right" style="font-size:10px; font-weight: bold;">En Proceso de Cotización</td>
                                                  <td v-else  align="right" style="font-size:10px; font-weight: bold;">Incluye Impuestos</td>

                                                  <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalExpExt) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.expressOriginal) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalOptExt) / valorDolar) }} </td>
                                                  <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.optimoOriginal) / valorDolar) }} </td>

                                                  <td  align="center" v-if="servicios.precio != 0">
                                                    <input class="form-control-input" type="checkbox" v-bind:id="servicios.ids + 'check'" :key="servicios.ids" v-model="serviciosResumen" v-bind:value="servicios.ids" @change="mostrarImpuesto(servicios.ids)">
                                                  </td>
                                                  <td  align="center" v-else>
                                                    <input disabled hidden type="checkbox" v-bind:id="servicios.ids + 'check'" :key="servicios.ids" v-model="serviciosResumen" v-bind:value="servicios.ids">
                                                    <p>En Proceso de Cotización</p>
                                                  </td>
                                                  <td v-show="impuestos == 1">
                                                    <select v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'" hidden v-bind:id="servicios.ids + 'seleccionImpuesto'" class=" form-control-sm col-md-12" @change="sumaImpuesto($event, servicios.ids, servicios.optimoOriginal)">
                                                      <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0"> {{ opc.value }}% </option>
                                                    </select>
                                                    <select v-else hidden v-bind:id="servicios.ids + 'seleccionImpuesto'" class=" form-control-sm col-md-12" @change="sumaImpuesto($event, servicios.ids, servicios.expressOriginal)">
                                                      <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0"> {{ opc.value }}% </option>
                                                    </select>
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'escondeImpuesto'">
                                                  </td>

                                                  <td v-show="impuestos == 1">
                                                    <input hidden placeholder="Total" class="form-control form-control-sm col-md-6 text-center" type="text" value="0" v-bind:id="servicios.ids + 'sumaTotal'" readonly>
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'impuestoOculto'">
                                                    <input hidden value="0" v-bind:id="servicios.ids + 'ocultarSumaTotal'">
                                                  </td>

                                                </tr>
                                              </tbody>
                                              <tfoot v-if="divisa == 2">
                                                <tr>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td v-show="impuestos == 1"></td>
                                                  <td v-show="impuestos == 1"></td>
                                                  <td v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'">
                                                    <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(  totalPrecioOpt)) }}</p>
                                                    <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaOpt)) }}</p>
                                                    <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetOpt)) }}</p>
                                                    <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalOpt)) }}</p>
                                                  </td>
                                                  <td v-else>
                                                    <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioExp)) }}</p>
                                                    <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaExp)) }}</p>
                                                    <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetExp)) }}</p>
                                                    <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalExp)) }}</p>
                                                  </td>

                                                </tr>
                                              </tfoot>
                                              <tfoot v-else>
                                                <tr>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td v-show="impuestos == 1"></td>
                                                  <td v-show="impuestos == 1"></td>
                                                  <td v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'">
                                                    <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioOpt) / valorDolar)}}</p>
                                                    <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaOpt) / valorDolar) }}</p>
                                                    <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetOpt) / valorDolar) }}</p>
                                                    <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalOpt) / valorDolar) }}</p>
                                                  </td>
                                                  <td v-else>
                                                    <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioExp) / valorDolar) }}</p>
                                                    <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaExp) / valorDolar) }}</p>
                                                    <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetExp) / valorDolar) }}</p>
                                                    <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalExp) / valorDolar) }}</p>
                                                  </td>

                                                </tr>
                                              </tfoot>
                                            </table>
                                            <p v-else>Sin Servicios</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Inicio else -->
                                    <div class="col-md-12" v-else>
                                      <div class="form-group row mb-0">
                                        <div class="table-responsive">
                                          <table class="table table-sm mb-0" width="100%" v-if="confirmarServices3.length > 0">
                                            <thead>
                                              <tr>
                                                <th>SERVICIOS</th>
                                                <th></th>
                                                <th>PRECIOS</th>
                                              </tr>
                                            </thead>

                                            <tbody>

                                              <tr v-for="servicios in confirmarServices3" v-bind:key="servicios.ids">
                                                <td width="20%" style="text-right"> {{ servicios.nombre }} </td>
                                                <td width="20%" align="right" style="font-size:10px; font-weight: bold;">En Proceso de Cotización</td>
                                                <td> {{ formatMoney(parseFloat(servicios.precio))}} </td>
                                                <td> </td>

                                                <td v-show="impuestos == 1">
                                                  <input hidden placeholder="Total" class="form-control form-control-sm col-md-6 text-center" type="text" value="0" v-bind:id="servicios.ids + 'sumaTotal'" readonly>
                                                  <input hidden value="0" v-bind:id="servicios.ids + 'impuestoOculto'">
                                                  <input hidden value="0" v-bind:id="servicios.ids + 'ocultarSumaTotal'">
                                                </td>
                                              </tr>
                                            </tbody>

                                          </table>
                                          <p v-else>Sin Servicios</p>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Fin else -->
                                  </b-container>

                                  <!--b-container v-if="listVentas.length > 0"-->
                                  <b-container>
                                    <b-row class="p-1" style="background-color: #6c757d; color: #ffffff;">
                                      <b-col class="text-left"><label style="color:#ffffff">INFORMACIÓN DE CONTACTO</label></b-col>
                                      <b-col></b-col>
                                      <b-col></b-col>
                                    </b-row>
                                    <b-row class="p-2">
                                      <b-col md="6">
                                        <label for="" style="font-size: 12px; font-weight: bold;">NOMBRE COMPLETO</label>
                                        <b-input v-model="contacName" @input="contacName = contacName.toUpperCase()" placeholder="ESPINOSA UGALDE PABLO"></b-input>
                                      </b-col>
                                      <b-col md="6">
                                        <label for="" style="font-size: 12px; font-weight: bold;">E-MAIL</label>
                                        <b-input v-model="contacEmail" placeholder="pablo@gmail.com"></b-input>
                                      </b-col>
                                    </b-row>

                                    <b-row class="p-2">
                                      <b-col md="6">
                                        <label for="" style="font-size: 12px; font-weight: bold;">TELEFONO</label>
                                        <div class="input-group">
                                          <select id="lada" class="form-control col-md-3" v-model="contacLada">
                                            <option v-for="marcado in ladas" :key="marcado.id" v-bind:value="marcado.id">
                                              {{ marcado.alias }} + {{ marcado.code }}
                                            </option>
                                          </select>
                                          <b-form-input class="col-md-9" placeholder="" type="number" v-model="contacTelefono"></b-form-input>
                                        </div>
                                      </b-col>
                                      <b-col md="6">
                                        <label for="">NOTA</label>
                                        <b-textarea v-model="contacDescription" @input="contacDescription = contacDescription.toUpperCase()" placeholder="DESCRIPCION DEL PRODUCTO"></b-textarea>
                                        <!--label for="" style="font-size: 12px; font-weight: bold;">NOMBRE DEL PRODUCTO</label>
                                          <b-input v-model="contacProductName" @input="contacProductName = contacProductName.toUpperCase()" placeholder="TUBO DE ACERO"></b-input-->
                                      </b-col>
                                    </b-row>

                                  </b-container>

                                  <b-container>
                                    <b-row class="p-2">
                                      <div class="row mt-2" style="border-top: 1px #ccc">
                                        <p style="color: #00786c; font-weight: bold">
                                          La siguiente cotizacion se enviara para su validacion si desea continuar favor presione en Confirmar
                                        </p>
                                      </div>
                                    </b-row>
                                  </b-container>
                                </div>
                              </div>
                            </div>

                            <div class="form-group text-right mt-3">
                              <!--Parte Inferior Footer-->
                              <b-button v-if="listVentas.length > 0" class="width-md ml-1" variant="secondary" @click="hideResumen(2)">Cerrar</b-button>
                              <b-button v-else class="width-md ml-1" variant="secondary" @click="hideResumen2()">Cerrar</b-button>
                              <b-button v-if="listVentas.length > 0" class="width-md ml-1" style="background-color:#00786c;" @click="Save()">Confirmar</b-button>
                              <b-button v-else class="width-md ml-1" style="background-color:#00786c;" @click="Save2()">Confirmar</b-button>
                            </div>
                          </b-modal>
                        </div>
                      </div>

                      <div class="col-1"></div>
                    </div>

                  </div>
                  <!--Fin Formulario Terrestre-->
                </div>
                <!--Fin Terrestre-->
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!--- end row -->
  </Layout>
</template>

<style>
.boton-circle {
  width: 50px;
  height: 50px;
  margin: 10px;
  padding: 0px;
  border-radius: 50px;
  font-size: 27px;
  line-height: 51px;
  color: white;
  text-align: center;
}

.boton-circle :hover {
  opacity: 0.5;
  -moz-opacity: 0.5;
  filter: alpha (opacity=50);
}

.boton-circle a {
  color: #fff;
  text-decoration: none;
  padding: 5px 5px 5px 0;
}

.btn-circle {
  width: 14px;
  height: 12px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}

.popover {
  max-width: 100% !important;
}
</style>

