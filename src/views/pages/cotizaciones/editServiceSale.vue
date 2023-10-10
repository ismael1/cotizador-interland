<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

//agregado 260621
import ItemTemplate from '@/components/ItemTemplateSearch'
import ItemTemplateService from '@/components/ItemTemplateService'
import ItemTemplateProveedor from '@/components/ItemTemplateProveedor'
import templateAduana from '@/components/ItemTemplateAduana'

/**
 * Basic Tables component
 */

export default {
  page: {
    title: "Editar Servicio Venta",
    meta: [{ name: "editServiceSale", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {
      dates_search: [],
      template: ItemTemplate,

      title: "Vista Cotizacion",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Servicios",
          href: "/cotizaciones/listVentas",
        },
        {
          text: "Editar",
          href: "/editServiceSale",
          active: true,
        },
      ],

      //280621
      activolabAduana: false,
      activolabAduana_man: false,

      activoAutoService: true,
      activoLabelService: false,
      dates_search_service: [],
      input_servicios: '',
      template_service: ItemTemplateService,

      dates_search_aduana: [],
      inputAduana: '',
      activoAutoAduana: true,
      activolabelAduana: false,
      input_aduana: '',
      id_input_aduana: 0,

      template_aduana: templateAduana,

      //para maniobras
      inputAduana_man: '',
      activoAutoAduana_man: true,
      activolabelAduana_man: false,
      input_aduana_man: '',
      id_input_aduana_man: 0,


      all_services: [
        { id: 1, name: "FLETE NACIONAL" },
        { id: 2, name: "INTERNATIONAL FREIGHT" },
        { id: 3, name: "FLETE DIRECTO" },
        { id: 10, name: "OTRO" },
      ],

      //
      all_modalidad: [
        { id: "FTL", name: "FTL" },
        { id: "LTL", name: "LTL" },
        { id: "FCL", name: "FCL" },
      ],

      all_unidades: [],

      options_tipo: [
        { item: "g", name: "General" },
        { item: "h", name: "Hazmat" },
        { item: "r", name: "Refrigerada" },
        { item: "e", name: "Especial" },
      ],
      all_divisa: [
        { item: "1", name: "USD" },
        { item: "2", name: "MXN" },
      ],
      all_iva: [
        { item: "0", name: "0 %" },
        { item: "8", name: "8 %" },
        { item: "16", name: "16 %" },
      ],
      all_retencion: [
        { item: "0", name: "0 %" },
        { item: "4", name: "4 %" },
      ],

      selected_tipo: "",

      activoServicios: false,
      activoOrigen: false,
      activoDestino: false,
      activoAduana: false,
      activoManiobra: false,
      servicioBuscar: "",

      activoOrigen_m: false,
      activoDestino_m: false,
      activoAduana_m: false,

      activoCommodity_m: false,

      activoUnidad: false,
      //   activoNota: false,
      activoDias: false,

      activoUN: false,
      // activoClass: false,

      opt_select_man: "",

      txt_origen_destino: "",
      dateNow: "",

      countrys: [],

      //origendestino
      paisOD: '',
      cpOD: '',
      estadoOD: '',
      estatesOD: [],
      cityOD: '',
      tipoOD: 0,
      show: false,

      label_origen: "",
      label_destino: "",
      arrayOrigen: [],
      arrayDestino: [],

      input_subtotal: 0,
      input_traslado: 0,
      input_retencion: 0,
      input_total: 0,
      input_origen: "",
      input_destino: "",
      input_servicio: '',

      input_fecha: '',
      input_vigencia: '',
      input_identificador: 0,

      servicioBuscar: '',
      input_aduana: 0,
      opt_select_man: '',
      input_origen_man: '',
      input_destino_man: '',
      input_aduana_man: '',
      selected_tipo: '',

      input_un: '',
      input_class: '',
      input_tipo_unidad: '',
      input_nota: '',
      input_dias_transito: 0,
      input_divisa: 1,

      id_servicio: 0,

      input_modalidad: "FTL",

      //Agregados David 200721
      proveedor: "",
      dates_search_proveedor: [],
      activoLabelProveedor: false,
      servicioBuscar2: "",
      template_proveedor: ItemTemplateProveedor,
      id_proveedor: 0,
      checkVentas: false,
      porcentajeVenta: 0,
      porcentajeExpress: 0,

      pVenta: [
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

      pExpress: [
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
      ],

      estatusCotizacion: 0,
      comprobarTotal: 0,

      listaCotizacion: [],
      listaServicios: [],
      idCotiza: 0,

      idVentaCotizacion: 0,
      clasificacionZonaO: "",
      clasificacionZonaD: "",
      resClasificaZona: "",
      notColorZona: "",
      notTextoZona: "",
      cpOZona: "",
      cpDZona: "",
      colorZonaOr: "",
      colorZonaDe: "",

    };
  },
  created() {
    this.getServicio()
    this.fechaHoy()
    this.getContry()
  },

  methods: {

    getLabel_aduana(item) {
      if (item) {
        this.id_input_aduana = item.id
        this.input_aduana = (item.origen + " - " + item.destino)
        return (item.origen + " - " + item.destino)
      } else {
        this.id_input_aduana = 0
        this.input_aduana = ''
      }
    },

    updateItems_aduana(text) {
      let input = text

      // if (input.length > 2) {        
      axios({
        method: "post",
        url: "/api/v1/search-aduana/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_aduana = response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },

    //maniobras
    getLabel_aduana_man(item) {
      if (item) {
        this.id_input_aduana_man = item.id
        this.input_aduana_man = (item.origen + " - " + item.destino)
        return (item.origen + " - " + item.destino)
      } else {
        this.id_input_aduana_man = 0
        this.input_aduana_man = ''
      }
    },

    updateItems_aduana_man(text) {
      let input = text

      // if (input.length > 2) {        
      axios({
        method: "post",
        url: "/api/v1/search-aduana/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_aduana = response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },

    getLabel_service(item) {
      if (item) {
        this.id_servicio = item.id
        this.servicioBuscar = item.nameproduct

        this.validarService()

        return item.nameproduct
      } else {
        this.id_servicio = 0
        this.servicioBuscar = ''

      }
    },

    //Agregado David 200721
    getLabel_proovedor(item) {
      if (item) {
        this.id_proveedor = item.id
        this.servicioBuscar2 = item.name
        return item.name
      } else {
        this.id_proveedor = 0
        this.servicioBuscar2 = ''
      }
    },

    updateItems_service(text) {
      let input = text

      // if (input.length > 2) {        
      axios({
        method: "post",
        url: "/api/v1/search-service/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_service = response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },

    updateItems_proveedor(text) {
      let input = text

      axios({
        method: "post",
        url: "/api/v1/search-proveedor/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_proveedor = response.data
          this.id_proveedor = response.data.id
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cambiarAutoService() {
      this.activoServicios = true
      this.activoAutoService = false
    },

    getLabel(item) {
      if (item) {
        this.estadoOD = item.estado_id
        this.cityOD = item.municipio

        this.cpOD = item.codigo_postal

        return item.codigo_postal
      } else {
        this.estadoOD = ''
        this.cityOD = ''
      }
    },

    updateItems(text) {
      let paisOD = this.paisOD
      let input = text

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
            this.dates_search = response.data
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getServicio() {

      this.idService = this.$route.params.pkService

      if (this.idService > 0) {

        axios
          .get(`/api/v1/servicioVenta/${this.idService}/`)
          .then((response) => {

            this.getUnidadBox(response.data.unidaModality)

            this.input_identificador = response.data.id
            this.input_fecha = response.data.dateInicio

            this.id_input_aduana = response.data.idAduana

            //agregado 300621
            if (response.data.idAduana > 0) {
              this.getNameAduana(response.data.idAduana)
            }

            this.input_modalidad = response.data.modality

            let opcion = response.data.tipoServicio

            if (response.data.tipoServicio == 10) {

              this.servicioBuscar = response.data.servicio
              this.activoServicios = true
              this.activoAutoService = false
              this.activoLabelService = false
            }

            if (response.data.tipoServicio == 1) {
              this.servicioBuscar = response.data.servicio

              this.activoOrigen = true
              this.activoDestino = true
              this.activoCommodity_m = true
              this.activoUnidad = true
              this.activoDias = true
            }

            this.input_servicio = response.data.tipoServicio
            this.input_tipo_unidad = response.data.tipoUnidad
            this.input_subtotal = response.data.subtotal
            this.input_traslado = response.data.iva
            this.input_retencion = response.data.retencion
            this.input_total = response.data.total
            this.input_divisa = response.data.divisa
            this.input_vigencia = response.data.dateFin
            this.input_dias_transito = response.data.diasTransito
            this.input_nota = response.data.nota
            this.selected_tipo = response.data.unidaModality
            this.input_un = response.data.unHazmat
            this.input_class = response.data.classHazmat

            this.arrayOrigen.length = 0
            let txt_pais_o = response.data.paisOrigen
            let cpOD_o = response.data.cpOrigen
            let txt_estado_o = response.data.estadoOrigen
            let cityOD_o = response.data.ciudadOrigen
            let paisOD_o = response.data.idpaisOrigen
            let estadoOD_o = response.data.idestadoOrigen

            this.input_origen = txt_pais_o + " " + cpOD_o + " " + txt_estado_o + " " + cityOD_o
            let origen = { 'idpaisOrigen': paisOD_o, 'paisOrigen': txt_pais_o, 'cpOrigen': cpOD_o, 'idestadoOrigen': estadoOD_o, 'estadoOrigen': txt_estado_o, 'ciudadOrigen': cityOD_o }
            this.arrayOrigen.push(origen)

            this.arrayDestino.length = 0
            let txt_pais_d = response.data.paisDestino
            let cpOD_d = response.data.cpDestino
            let txt_estado_d = response.data.estadoDestino
            let cityOD_d = response.data.ciudadDestino
            let paisOD_d = response.data.idpaisDestino
            let estadoOD_d = response.data.idestadoDestino

            this.id_proveedor = response.data.idProveedor // Agregado David 200721
            this.proveedor = response.data.proveedor // Agregado David 200721
            // this.checkVentas=response.data.checkVentas 
            if (response.data.checkVentas == "SI") { // Agregado David 200721
              this.checkVentas = true
            }
            this.porcentajeVenta = response.data.porcentajeVenta // Agregado David 200721
            this.porcentajeExpress = response.data.porcentajeXpress // Agregado David 200721
            this.velocidadEnvio = response.data.velocidadEnvio // Agregado David 200721
            this.estatusCotizacion = response.data.estatusCompleto // Agregado David 200721
            this.comprobarTotal = response.data.total // Agregado David 200721
            this.idCotiza = response.data.idCotizacion

            this.input_destino = txt_pais_d + " " + cpOD_d + " " + txt_estado_d + " " + cityOD_d
            let destino = { 'idpaisDestino': paisOD_d, 'paisDestino': txt_pais_d, 'cpDestino': cpOD_d, 'idestadoDestino': estadoOD_d, 'estadoDestino': txt_estado_d, 'ciudadDestino': cityOD_d }
            this.arrayDestino.push(destino)

            this.showinputtServicio(opcion, 10)
            // this.validarService()
            this.getCotizacionAdd()
            this.getServicesAdd()
            this.obtenerZona()
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    showinputtServicio(event, opt) {

      let opcionServicio = 0

      if (opt == 1) {
        // opcionServicio = event.target.value
        // opcionServicio = event
        this.input_servicios = ''
        this.servicioBuscar = ''
        this.id_servicio = 0

      } else {
        opcionServicio = event
      }

      this.activoAduana = false
      this.activoAutoAduana = false
      this.activolabAduana = false
      this.activoManiobra = false
      this.activoAduana_m = false
      this.activoAutoAduana_man = false
      this.activolabAduana_man = false

      this.id_input_aduana = 0
      this.input_aduana = ''
      this.inputAduana = ''

      //maniobras 
      this.id_input_aduana_man = 0
      this.input_aduana_man = ''
      this.inputAduana_man = ''




      this.activoCommodity_m = false
      this.activoUnidad = false
      this.activoDias = false

      this.activoServicios = false
      this.activoOrigen = false
      this.activoDestino = false
      this.activoAduana = false
      this.activoManiobra = false

      if (opcionServicio == 10) {
        this.activoServicios = true
        this.activoUN = false
        // this.activoClass=false   

        this.activoLabelService = true
      }

      //1 FLETE NACIONAL
      //2 INTERNATIONAL FREIGHT
      //3 FLETE DIRECTO
      //4 OTRO
      if (opcionServicio == 1 || opcionServicio == 2 || opcionServicio == 3) {

        this.activoOrigen = true
        this.activoDestino = true
        this.activoCommodity_m = true
        this.activoUnidad = true
        this.activoDias = true

        if (this.selected_tipo == "h") {
          this.activoUN = true
        }
      }

    },

    validarService() {

      this.id_input_aduana = 0
      this.input_aduana = ''
      this.inputAduana = ''

      //maniobras 
      this.id_input_aduana_man = 0
      this.input_aduana_man = ''
      this.inputAduana_man = ''

      // this.input_servicios='' 
      // this.servicioBuscar=''
      // this.id_servicio=0

      // this.activoServicios = true
      this.activoOrigen = false
      this.activoDestino = false
      this.activoAduana = false
      this.activoManiobra = false

      this.activoAduana = false
      this.activoAutoAduana = false
      this.activolabAduana = false
      this.activoManiobra = false
      this.activoAduana_m = false
      this.activoAutoAduana_man = false
      this.activolabAduana_man = false

      this.activoCommodity_m = false;
      this.activoUnidad = false;
      this.activoDias = false;


      let txtServiceSearch = this.servicioBuscar;

      let txtServiceSearch_may = txtServiceSearch.toUpperCase();
      let txtServiceSearch_min = txtServiceSearch.toLowerCase();

      this.activoOrigen = false;
      this.activoDestino = false;
      this.activoManiobra = false;
      this.activoAduana = false;

      this.activoCommodity_m = false;
      this.activoUnidad = false;
      this.activoDias = false;

      this.activoOrigen_m = false;
      this.activoDestino_m = false;
      this.activoAduana_m = false;


      if (txtServiceSearch_min == "cruce" || txtServiceSearch_may == "CRUCE") {
        this.activoOrigen = false;
        this.activoDestino = false;
        this.activoManiobra = false;

        this.activoAduana = true

        this.activoAutoAduana = true

        this.activoCommodity_m = true;
        this.activoUnidad = true;
        this.activoDias = true;

      } else {
        if (
          txtServiceSearch_min == "maniobras" ||
          txtServiceSearch_may == "MANIOBRAS"
        ) {
          // this.activoOrigen = false;
          // this.activoDestino = false;
          // this.activoAduana = false;
          // this.activoManiobra = true;
        } else {
          // this.activoOrigen = false;
          // this.activoDestino = false;
          // this.activoAduana = false;
          // this.activoManiobra = false;
        }
      }
    },

    optManiobra() {
      let optChManiobra = this.opt_select_man;

      this.activoOrigen_m = false;
      this.activoDestino_m = false;
      this.activoAduana_m = false;
      this.activoAutoAduana_man = false


      if (optChManiobra == "o") {
        this.activoOrigen_m = true;
      }
      if (optChManiobra == "f") {
        this.activoAduana_m = true;
        this.activoAutoAduana_man = true;
      }
      if (optChManiobra == "d") {
        this.activoDestino_m = true;
      }
    },

    selectTipoUnidad() {
      let tipoCajaS = this.selected_tipo
      // { item: 'h', name: 'Hazmat' },
      // { item: 'r', name: 'Refrigerada' },
      // { item: 'g', name: 'General' },
      // { item: 'e', name: 'Especial' },
      this.activoUN = false
      // this.activoClass=false

      if (tipoCajaS == "h") {
        this.getUnidadBox("h")

        this.activoUN = true
        // this.activoClass=true
      } else {
        this.input_un = ""
        this.input_class = ""
      }
      if (tipoCajaS == "r") {
        this.getUnidadBox("r")
      }
      if (tipoCajaS == "g") {
        this.getUnidadBox("g")
      }
      if (tipoCajaS == "e") {
        this.getUnidadBox("e")
      }
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
          this.all_unidades = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showOrigenDestino(valor) {

      this.tipoOD = ""
      this.paisOD = ""
      this.cpOD = ""
      this.estadoOD = ""
      this.cityOD = ""

      if (valor == 1) {
        this.txt_origen_destino = "Origen"
        this.tipoOD = 1
      } else if (valor == 2) {
        this.txt_origen_destino = "Destino"
        this.tipoOD = 2
      }
    },

    fechaHoy() {
      let hoy = new Date()
      let dd = hoy.getDate()
      let mm = hoy.getMonth() + 1
      let yyyy = hoy.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }
      hoy = yyyy + '-' + mm + '-' + dd
      // hoy = dd+'/'+mm+'/'+yyyy
      // YYYY-MM-DD
      // hoy = dd+'-'+mm+'-'+yyyy
      this.dateNow = hoy
      // this.input_fecha=hoy
    },

    getContry() {
      axios
        .get(`/api/v1/list-country/`)
        .then((response) => {
          // console.log(response)
          this.countrys = response.data
        })
        .catch((error) => {
          console.log(error)
        });
    },
    
    getEstadoOD(event) {

      let pkPais_d = 0;
      pkPais_d = event.target.value;

      axios
        .get(`/api/v1/list-estates/${pkPais_d}/`)
        .then((response) => {
          this.estatesOD = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveOrigenDestino() {

      let tipoOD_ = this.tipoOD
      //1 origen
      //2 destino
      let paisOD_ = this.paisOD
      // let cpOD_=this.cpOD
      // let cpOD_=document.getElementById('cpOD').value
      let cpOD_ = this.cpOD.codigo_postal

      let estadoOD_ = this.estadoOD
      let cityOD_ = this.cityOD

      if (paisOD_ == 0 || paisOD_ == "") {
        Swal.fire({
          title: 'Selecione un Pais',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false
      }
      if (estadoOD_ == 0 || estadoOD_ == "") {
        Swal.fire({
          title: 'Seleccione un Estado',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false
      }
      if (cityOD_ == 0 || cityOD_ == "") {
        Swal.fire({
          title: 'Ingrese Ciudad/Municipio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false
      }

      let index_pais = this.countrys.findIndex(x => x.id === paisOD_)
      let index_estado = this.estatesOD.findIndex(x => x.id === estadoOD_)

      let txt_pais_ = this.countrys[index_pais].name
      let txt_estado_ = this.estatesOD[index_estado].name

      if (tipoOD_ == 1) {

        this.arrayOrigen.length = 0

        this.input_origen = txt_pais_ + " " + cpOD_ + " " + txt_estado_ + " " + cityOD_

        let origen = { 'idpaisOrigen': paisOD_, 'paisOrigen': txt_pais_, 'cpOrigen': cpOD_, 'idestadoOrigen': estadoOD_, 'estadoOrigen': txt_estado_, 'ciudadOrigen': cityOD_ }
        this.arrayOrigen.push(origen)

      } else {
        this.arrayDestino.length = 0

        this.input_destino = txt_pais_ + " " + cpOD_ + " " + txt_estado_ + " " + cityOD_

        let destino = { 'idpaisDestino': paisOD_, 'paisDestino': txt_pais_, 'cpDestino': cpOD_, 'idestadoDestino': estadoOD_, 'estadoDestino': txt_estado_, 'ciudadDestino': cityOD_ }
        this.arrayDestino.push(destino)
      }

      this.show = false
    },

    imp_compra() {

      let subtotal = this.input_subtotal.replace(",", "")
      let resultado = 0
      let tot_iva = 0

      let input_traslado_ = this.input_traslado
      let input_retencion_ = this.input_retencion

      if (input_traslado_ == 0) {
      } else {
        if (input_traslado_ == 16) {
          if (subtotal == "" || subtotal == 0) {
            tot_iva = 0
          } else {
            tot_iva = (subtotal * 16) / 100
          }
        } else {
          if (input_traslado_ == 8) {
            if (subtotal == "" || subtotal == 0) {
              tot_iva = 0
            } else {
              tot_iva = (subtotal * 8) / 100
            }
          }
        }
      }

      let tot_r = 0
      if (input_retencion_ == 0) {
      } else {
        if (input_retencion_ == 4) {
          if (subtotal == "" || subtotal == 0) {
            tot_r = 0;
          } else {
            tot_r = (subtotal * 4) / 100
          }
        }
      }

      let total_c = parseFloat(subtotal) + parseFloat(tot_iva)
      total_c = total_c - tot_r;

      total_c = this.trunc(total_c, 2)

      this.input_total = total_c
    },
    
    trunc(x, posiciones = 0) {
      let s = x.toString()
      let l = s.length
      let decimalLength = s.indexOf('.') + 1

      if (l - decimalLength <= posiciones) {
        return x
      }
      // Parte decimal del número
      let isNeg = x < 0
      let decimal = x % 1
      let entera = isNeg ? Math.ceil(x) : Math.floor(x)
      // Parte decimal como número entero
      // Ejemplo: parte decimal = 0.77
      // decimalFormated = 0.77 * (10^posiciones)
      // si posiciones es 2 ==> 0.77 * 100
      // si posiciones es 3 ==> 0.77 * 1000
      let decimalFormated = Math.floor(
        Math.abs(decimal) * Math.pow(10, posiciones)
      )
      // Sustraemos del número original la parte decimal
      // y le sumamos la parte decimal que hemos formateado
      let finalNum = entera +
        ((decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1))

      return finalNum;
    },

    saveService() {
      //guardar el dato

      let id = 0
      id = this.input_identificador

      //arrayOrigen
      // arrayDestino
      let paisOrigen = ""
      let idpaisOrigen = ""
      let cpOrigen = ""
      let estadoOrigen = ""
      let idestadoOrigen = ""
      let ciudadOrigen = ""

      let paisDestino = ""
      let idpaisDestino = ""
      let cpDestino = ""
      let estadoDestino = ""
      let idestadoDestino = ""
      let ciudadDestino = ""

      if (this.arrayOrigen.length > 0) {
        for (let origen in this.arrayOrigen) {

          idpaisOrigen = this.arrayOrigen[origen].idpaisOrigen
          paisOrigen = this.arrayOrigen[origen].paisOrigen
          cpOrigen = this.arrayOrigen[origen].cpOrigen
          idestadoOrigen = this.arrayOrigen[origen].idestadoOrigen
          estadoOrigen = this.arrayOrigen[origen].estadoOrigen
          ciudadOrigen = this.arrayOrigen[origen].ciudadOrigen
        }
      }
      if (this.arrayDestino.length > 0) {
        for (const destino in this.arrayDestino) {

          idpaisDestino = this.arrayDestino[destino].idpaisDestino
          paisDestino = this.arrayDestino[destino].paisDestino
          cpDestino = this.arrayDestino[destino].cpDestino
          idestadoDestino = this.arrayDestino[destino].idestadoDestino
          estadoDestino = this.arrayDestino[destino].estadoDestino
          ciudadDestino = this.arrayDestino[destino].ciudadDestino
        }
      }

      let idaduana = this.input_aduana

      if (idaduana == "") {
        idaduana = 0
      }


      let servicio_txt = ""

      if (this.input_servicio == 1) {
        servicio_txt = "FLETE NACIONAL"

      }
      if (this.input_servicio == 2) {
        servicio_txt = "INTERNATIONAL FREIGHT"

      }
      if (this.input_servicio == 3) {
        servicio_txt = "FLETE DIRECTO"

      }
      if (this.input_servicio == 10) {
        servicio_txt = this.servicioBuscar
      }

      let aVenta = document.getElementById('checkVentas').checked
      let aVentaSpa = ""

      if (aVenta == false) {
        aVentaSpa = "NO"
      } else if (aVenta == true) {
        aVentaSpa = "SI"
      }

      if (id > 0) {

        axios({
          method: "put",
          url: `servicioVenta/${this.input_identificador}/`,
          data: {
            id: this.input_identificador,
            dateInicio: this.input_fecha,
            tipoOperacion: 2,
            tipoServicio: this.input_servicio,
            servicio: servicio_txt,
            idServicio: 0,
            modality: this.input_modalidad,
            tipoUnidad: this.input_tipo_unidad,
            subtotal: this.input_subtotal,
            iva: this.input_traslado,
            retencion: this.input_retencion,
            total: this.input_total,
            divisa: this.input_divisa,
            dateFin: this.input_vigencia,
            diasTransito: this.input_dias_transito,
            nota: this.input_nota,
            paisOrigen: paisOrigen,
            idpaisOrigen: idpaisOrigen,
            cpOrigen: cpOrigen,
            estadoOrigen: estadoOrigen,
            idestadoOrigen: idestadoOrigen,
            ciudadOrigen: ciudadOrigen,
            paisDestino: paisDestino,
            idpaisDestino: idpaisDestino,
            cpDestino: cpDestino,
            estadoDestino: estadoDestino,
            idestadoDestino: idestadoDestino,
            ciudadDestino: ciudadDestino,
            idAduana: idaduana,
            unidaModality: this.selected_tipo,
            unHazmat: this.input_un,
            classHazmat: this.input_class,

            idProveedor: this.id_proveedor,
            proveedor: this.servicioBuscar2,
            checkVentas: aVentaSpa,
            porcentajeVenta: this.porcentajeVenta,
            porcentajeXpress: this.porcentajeExpress,
            // estatusCompleto: this.estatusCotizacion,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {
          if (response) {
            this.input_identificador = response.data.id
            this.actualizaServicioCotizacion();
            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
          }
        }).catch((error) => {
          console.log(error);
        });

      }
    },

    saveService2() {

      let id = 0
      id = this.input_identificador

      let paisOrigen = ""
      let idpaisOrigen = ""
      let cpOrigen = ""
      let estadoOrigen = ""
      let idestadoOrigen = ""
      let ciudadOrigen = ""

      let paisDestino = ""
      let idpaisDestino = ""
      let cpDestino = ""
      let estadoDestino = ""
      let idestadoDestino = ""
      let ciudadDestino = ""

      if (this.arrayOrigen.length > 0) {
        for (let origen in this.arrayOrigen) {

          idpaisOrigen = this.arrayOrigen[origen].idpaisOrigen
          paisOrigen = this.arrayOrigen[origen].paisOrigen
          cpOrigen = this.arrayOrigen[origen].cpOrigen
          idestadoOrigen = this.arrayOrigen[origen].idestadoOrigen
          estadoOrigen = this.arrayOrigen[origen].estadoOrigen
          ciudadOrigen = this.arrayOrigen[origen].ciudadOrigen
        }
      }
      if (this.arrayDestino.length > 0) {
        for (const destino in this.arrayDestino) {

          idpaisDestino = this.arrayDestino[destino].idpaisDestino
          paisDestino = this.arrayDestino[destino].paisDestino
          cpDestino = this.arrayDestino[destino].cpDestino
          idestadoDestino = this.arrayDestino[destino].idestadoDestino
          estadoDestino = this.arrayDestino[destino].estadoDestino
          ciudadDestino = this.arrayDestino[destino].ciudadDestino
        }
      }

      let idaduana = this.input_aduana

      if (idaduana == "") {
        idaduana = 0
      }

      let servicio_txt = ""

      if (this.input_servicio == 1) {
        servicio_txt = "FLETE NACIONAL"

      }
      if (this.input_servicio == 2) {
        servicio_txt = "SEGURO"

      }
      if (this.input_servicio == 3) {
        servicio_txt = "FUMIGACION"

      }
      if (this.input_servicio == 4) {
        servicio_txt = "MANIOBRAS DE CARGA"

      }
      if (this.input_servicio == 5) {
        servicio_txt = "DESCARGA"

      }
      if (this.input_servicio == 6) {
        servicio_txt = "MANIOBRAS"

      }
      if (this.input_servicio == 7) {
        servicio_txt = "CUSTODIA"

      }
      if (this.input_servicio == 8) {
        servicio_txt = "HORAS LIBRES"

      }
      if (this.input_servicio == 9) {
        servicio_txt = "CRUCE"

      }
      if (this.input_servicio == 11) {
        servicio_txt = "INTERNATIONAL FREIGHT"

      }
      if (this.input_servicio == 12) {
        servicio_txt = "FLETE DIRECTO"

      }
      if (this.input_servicio == 10) {
        servicio_txt = this.servicioBuscar
      }


      let aVenta = document.getElementById('checkVentas').checked
      let aVentaSpa = ""

      if (aVenta == false) {
        aVentaSpa = "NO"
      } else if (aVenta == true) {
        aVentaSpa = "SI"
      }
      if (this.input_total > 0) {
        if (this.estatusCotizacion == 3) {
          this.estatusCotizacion = 0
        }
      }

      //Editar
      if (id > 0) {

        if (this.input_servicio == 1) {
          axios({
            method: "put",
            url: `servicioVenta/${this.input_identificador}/`,
            data: {
              id: this.input_identificador,
              dateInicio: this.input_fecha,
              tipoOperacion: 2,
              tipoServicio: this.input_servicio,
              servicio: servicio_txt,
              idServicio: 0,
              modality: this.input_modalidad,
              tipoUnidad: this.input_tipo_unidad,
              subtotal: this.input_subtotal,
              iva: this.input_traslado,
              retencion: this.input_retencion,
              total: this.input_total,
              divisa: this.input_divisa,
              dateFin: this.input_vigencia,
              diasTransito: this.input_dias_transito,
              nota: this.input_nota,
              paisOrigen: paisOrigen,
              idpaisOrigen: idpaisOrigen,
              cpOrigen: cpOrigen,
              estadoOrigen: estadoOrigen,
              idestadoOrigen: idestadoOrigen,
              ciudadOrigen: ciudadOrigen,
              paisDestino: paisDestino,
              idpaisDestino: idpaisDestino,
              cpDestino: cpDestino,
              estadoDestino: estadoDestino,
              idestadoDestino: idestadoDestino,
              ciudadDestino: ciudadDestino,
              idAduana: idaduana,
              unidaModality: this.selected_tipo,
              unHazmat: this.input_un,
              classHazmat: this.input_class,

              idProveedor: this.id_proveedor,
              proveedor: this.servicioBuscar2,
              checkVentas: aVentaSpa,
              porcentajeVenta: this.porcentajeVenta,
              porcentajeXpress: this.porcentajeExpress,
              estatusCompleto: this.estatusCotizacion,
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {

              if (response) {
                this.input_identificador = response.data.id

                Swal.fire({
                  title: 'Correcto',
                  text: '',
                  icon: 'success',
                  confirmButtonText: 'Cerrar',
                })
              }

              this.updateCotizacionAdd()
              this.updateServicesAdd()

            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          axios({
            method: "put",
            url: `servicioVenta/${this.input_identificador}/`,
            data: {
              id: this.input_identificador,
              dateInicio: this.input_fecha,
              tipoOperacion: 2,
              tipoServicio: this.input_servicio,
              servicio: servicio_txt,
              idServicio: 0,
              modality: this.input_modalidad,
              subtotal: this.input_subtotal,
              iva: this.input_traslado,
              retencion: this.input_retencion,
              total: this.input_total,
              divisa: this.input_divisa,
              dateFin: this.input_vigencia,
              nota: this.input_nota,
              paisOrigen: paisOrigen,
              idpaisOrigen: idpaisOrigen,
              cpOrigen: cpOrigen,
              estadoOrigen: estadoOrigen,
              idestadoOrigen: idestadoOrigen,
              ciudadOrigen: ciudadOrigen,
              paisDestino: paisDestino,
              idpaisDestino: idpaisDestino,
              cpDestino: cpDestino,
              estadoDestino: estadoDestino,
              idestadoDestino: idestadoDestino,
              ciudadDestino: ciudadDestino,
              idProveedor: this.id_proveedor,
              proveedor: this.servicioBuscar2,
              checkVentas: aVentaSpa,
              porcentajeVenta: this.porcentajeVenta,
              porcentajeXpress: this.porcentajeExpress,
              estatusCompleto: this.estatusCotizacion,
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {

              if (response) {
                this.input_identificador = response.data.id

                Swal.fire({
                  title: 'Correcto',
                  text: '',
                  icon: 'success',
                  confirmButtonText: 'Cerrar',
                })
              }
              this.updateCotizacionAdd()
              this.updateServicesAdd()
            })
            .catch((error) => {
              console.log(error);
            });
        }

      }
    },

    getCotizacionAdd() {

      let id = 0
      id = this.idCotiza

      axios({
        method: "post",
        url: "/api/v1/consultar-cotizaion-add/",
        data: {
          idVenta: id,
        },
      })
        .then((response) => {
          this.listaCotizacion = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getServicesAdd() {

      let id = 0
      id = this.idCotiza

      axios({
        method: "post",
        url: "/api/v1/consultar-servicios-add/",
        data: {
          idVenta: id,
        },
      })
        .then((response) => {
          this.listaServicios = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateCotizacionAdd() {

      let idCotiza = 0
      let precio = 0

      let agregaVenta = 0
      let precioFinal = 0

      for (let i = 0; i < this.listaCotizacion.length; i++) {
        idCotiza = this.listaCotizacion[i].id
        precio = this.listaCotizacion[i].precioTotalFinal
      }

      agregaVenta = parseFloat(this.porcentajeVenta) / 100
      agregaVenta = parseFloat(agregaVenta) * parseFloat(this.input_total)

      precioFinal = parseFloat(precio) + parseFloat(this.input_total) + parseFloat(agregaVenta)

      precioFinal = this.trunc(precioFinal, 2)

      axios({
        method: "put",
        url: `servicioCotizaciones/${idCotiza}/`,
        data: {
          estatus: 0,
          precioTotalFinal: precioFinal,
          diasTransito: this.input_dias_transito,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {

        })
        .catch((error) => {
          console.log(error);
        });

    },

    updateServicesAdd() {

      let idBuscar = 0
      let ajusteTotalBusca = 0
      let nameServiceBusca = 0
      let priceServiceBusca = 0

      let idServicio = 0
      let ajusteTotal = 0
      let priceService = 0

      let agregaVenta = 0

      let subtotal = 0
      let iva = 0
      let retencion = 0
      let total = 0
      let porcentajeXpress = 0
      let porcentajeVenta = 0

      agregaVenta = parseFloat(this.porcentajeVenta) / 100
      agregaVenta = parseFloat(agregaVenta) * parseFloat(this.input_total)
      console.log(this.listaServicios)
      for (let i = 0; i < this.listaServicios.length; i++) {

        idBuscar = this.listaServicios[i].id
        ajusteTotalBusca = this.listaServicios[i].ajusteTotal
        nameServiceBusca = this.listaServicios[i].nameService
        priceServiceBusca = this.listaServicios[i].priceService
        priceServiceBusca = this.trunc(priceServiceBusca, 2)

        if (nameServiceBusca == this.servicioBuscar) {
          idServicio = idBuscar
          ajusteTotal = parseFloat(ajusteTotalBusca) + parseFloat(this.input_total) + parseFloat(agregaVenta)
          ajusteTotal = this.trunc(ajusteTotal, 2)
          priceService = parseFloat(priceServiceBusca) + parseFloat(this.input_total) + parseFloat(agregaVenta)
          priceService = this.trunc(priceService, 2)
          subtotal = parseFloat(this.input_subtotal)
          iva = parseFloat(this.input_traslado)
          retencion = parseFloat(this.input_retencion)
          total = parseFloat(this.input_total)
          porcentajeXpress = parseFloat(this.porcentajeVenta)
          porcentajeVenta = parseFloat(this.porcentajeExpress)
        }

      }

      /*axios({
        method: "post",
        url: 'editar-servicio-cotiza',
        data: {
          id: idServicio,
          ajusteVenta: false,
          ajusteTotal: ajusteTotal,
          priceService: priceService,
          subtotal: subtotal,
          iva: iva,
          retencion: retencion,
          total: total,
          porcentajeXpress: porcentajeXpress,
          porcentajeVenta: porcentajeVenta,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });*/

    },

    listServices() {
      this.$router.push(`/cotizaciones/listVentas`)
    },

    modalCerrar() {

    },

    //agregado 300621
    getNameAduana(idAduana) {

      axios({
        method: "post",
        url: "/api/v1/get-aduana/",
        data: {
          data: idAduana,
        },
      })
        .then((response) => {
          this.input_aduana = response.data.origen + " - " + response.data.destino
        })
        .catch((error) => {
          console.log(error);
        });
      // }

    },

    obtenerZona() {

      let cpOrigen = "";
      let cpDestino = "";

      let txtOr = "";
      let txtDe = "";

      for (let index = 0; index < this.arrayOrigen.length; index++) {
        cpOrigen = this.arrayOrigen[index].cpOrigen
      }

      for (let index = 0; index < this.arrayDestino.length; index++) {
        cpDestino = this.arrayDestino[index].cpDestino
      }

      axios({
        method: "post",
        url: "/api/v1/buscaZonaCP/",
        data: {
          codPosO: cpOrigen,
          codPosD: cpDestino
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        if (response.data.origen == false) {
          txtOr = ""
        } else {
          txtOr = response.data.origen[0].clasificacion
        }

        if (response.data.destino == false) {
          txtDe = ""
        } else {
          txtDe = response.data.destino[0].clasificacion
        }


        this.defineZona(txtOr, txtDe)
      }).catch((error) => {
        console.log(error);
      });

    },

    defineZona(cp1, cp2) {
      if (this.input_servicio == 1) {
        if (cp1 == 'COMERCIAL' && cp2 == 'COMERCIAL') {
          this.resClasificaZona = 'COMERCIAL'
          this.notColorZona = 'success'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          this.rutaOrigen = 'COMERCIAL'
          this.cpOZona = 'Comercial'
          this.cpDZona = 'Comercial'
          this.colorZonaOr = 'success'
          this.colorZonaDe = 'success'
        } else if (cp1 == 'NO COMERCIAL' && cp2 == 'NO COMERCIAL') {
          this.resClasificaZona = 'NO COMERCIAL'
          this.notColorZona = 'warning'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          this.rutaOrigen = 'NO COMERCIAL'
          this.cpOZona = 'No Comercial'
          this.cpDZona = 'No Comercial'
          this.colorZonaOr = 'warning'
          this.colorZonaDe = 'warning'
        } else if (cp1 == 'PELIGROSA' && cp2 == 'PELIGROSA') {
          this.resClasificaZona = 'PELIGROSA'
          this.notColorZona = 'danger'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          this.rutaOrigen = 'PELIGROSA'
          this.cpOZona = 'Peligrosa'
          this.cpDZona = 'Peligrosa'
          this.colorZonaOr = 'danger'
          this.colorZonaDe = 'danger'
        } else if (cp1 == 'COMERCIAL' && cp2 == 'NO COMERCIAL' || cp1 == 'NO COMERCIAL' && cp2 == 'COMERCIAL') {
          this.resClasificaZona = 'NO COMERCIAL'
          this.notColorZona = 'warning'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          this.rutaOrigen = 'NO COMERCIAL'
          if (cp1 == 'COMERCIAL') {
            this.cpOZona = 'Comercial'
            this.colorZonaOr = 'success'
          } else {
            this.cpOZona = 'No Comercial'
            this.colorZonaDe = 'warning'
          }
          if (cp2 == 'NO COMERCIAL') {
            this.cpDZona = 'No Comercial'
            this.colorZonaDe = 'warning'
          } else {
            this.cpDZona = 'Comercial'
            this.colorZonaOr = 'success'
          }
        } else if (cp1 == 'COMERCIAL' && cp2 == 'PELIGROSA' || cp1 == 'PELIGROSA' && cp2 == 'COMERCIAL') {
          this.resClasificaZona = 'PELIGROSA'
          this.notColorZona = 'danger'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          this.rutaOrigen = 'PELIGROSA'
          if (cp1 == 'COMERCIAL') {
            this.cpOZona = 'Comercial'
            this.colorZonaOr = 'success'
          } else {
            this.cpOZona = 'Peligrosa'
            this.colorZonaDe = 'danger'
          }
          if (cp2 == 'PELIGROSA') {
            this.cpDZona = 'Peligrosa'
            this.colorZonaDe = 'danger'
          } else {
            this.cpDZona = 'Comercial'
            this.colorZonaOr = 'success'
          }
        } else if (cp1 == 'NO COMERCIAL' && cp2 == 'PELIGROSA' || cp1 == 'PELIGROSA' && cp2 == 'NO COMERCIAL') {
          this.resClasificaZona = 'PELIGROSA'
          this.notColorZona = 'danger'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          this.rutaOrigen = 'PELIGROSA'

          if (cp1 == 'NO COMERCIAL') {
            this.cpOZona = 'No Comercial'
            this.colorZonaOr = 'warning'
          } else {
            this.cpOZona = 'Peligrosa'
            this.colorZonaDe = 'danger'
          }
          if (cp2 == 'PELIGROSA') {
            this.cpDZona = 'Peligrosa'
            this.colorZonaDe = 'danger'
          } else {
            this.cpDZona = 'No Comercial'
            this.colorZonaOr = 'warning'
          }
        } else if (cp1 == 'COMERCIAL' && cp2 == '' || cp1 == '' && cp2 == 'COMERCIAL') {
          this.resClasificaZona = 'COMERCIAL'
          this.notColorZona = 'success'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          this.rutaOrigen = 'COMERCIAL'
          if (cp1 == 'COMERCIAL') {
            this.cpOZona = 'Comercial'
            this.colorZonaOr = 'success'
          } else {
            this.cpOZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          }
          if (cp2 == '') {
            this.cpDZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          } else {
            this.cpDZona = 'Comercial'
            this.colorZonaOr = 'success'
          }
        } else if (cp1 == 'NO COMERCIAL' && cp2 == '' || cp1 == '' && cp2 == 'NO COMERCIAL') {
          this.resClasificaZona = 'NO COMERCIAL'
          this.notColorZona = 'warning'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          this.rutaOrigen = 'NO COMERCIAL'
          if (cp1 == 'NO COMERCIAL') {
            this.cpOZona = 'No Comercial'
            this.colorZonaOr = 'warning'
          } else {
            this.cpOZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          }
          if (cp2 == '') {
            this.cpDZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          } else {
            this.cpDZona = 'No Comercial'
            this.colorZonaOr = 'warning'
          }
        } else if (cp1 == 'PELIGROSA' && cp2 == '' || cp1 == '' && cp2 == 'PELIGROSA') {
          this.resClasificaZona = 'PELIGROSA'
          this.notColorZona = 'danger'
          this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          this.rutaOrigen = 'PELIGROSA'
          if (cp1 == 'PELIGROSA') {
            this.cpOZona = 'Peligrosa'
            this.colorZonaOr = 'danger'
          } else {
            this.cpOZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          }
          if (cp2 == '') {
            this.cpDZona = 'Sin Zona Asignada'
            this.colorZonaDe = 'danger'
          } else {
            this.cpDZona = 'Peligrosa'
            this.colorZonaOr = 'danger'
          }
        } else if (cp1 == '' && cp2 == '' || cp1 == '' && cp2 == '') {
          this.resClasificaZona = 'NO ZONA'
          this.notColorZona = 'primary'
          this.notTextoZona = 'No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.'
          this.cpOZona = 'Sin Zona Asignada'
          this.cpDZona = 'Sin Zona Asignada'
          this.colorZonaDe = 'primary'
          this.colorZonaOr = 'primary'

        }
      }
    },

    modalCerrar() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "¿Deseas Cerrar el Servicio sin Cotizacion?",
        text: "Al Confirmar no se Podrán Realizar Cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {

          Swal.fire({
            title: 'Ingresa el motivo',
            input: 'textarea',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: (motivo) => {
              return axios({
                method: "post",
                url: "/api/v1/cerrar-servicio/",
                data: {
                  motivo: motivo,
                  id: this.$route.params.pkService,
                },
                auth: {
                  username: "admin",
                  password: "123",
                },
              })
                .then((response) => {
                  console.log(response)
                })
                .catch((error) => {
                  console.log(error);
                });
            },
            allowOutsideClick: false,
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
              Swal.fire({
                title: "Servicio Cerrado",
                text: "",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Cerrar",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/cotizaciones/listVentas";
                }
              })
            }
          })


          /*Swal.fire({
            title: "Servicio",
            text: "Servicio cerrado correctamente",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            
          })*/

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Servicio",
            "Confirmacion Cancelada",
            "error"
          );
        }
      });
    },

    actualizaServicioCotizacion(){
      let servicio_txt = ""

      if (this.input_servicio == 1) {
        servicio_txt = "FLETE NACIONAL"

      }
      if (this.input_servicio == 2) {
        servicio_txt = "INTERNATIONAL FREIGHT"

      }
      if (this.input_servicio == 3) {
        servicio_txt = "FLETE DIRECTO"

      }
      if (this.input_servicio == 10) {
        servicio_txt = this.servicioBuscar
      }

      axios({
          method: "post",
          url: 'api/v1/editar-servicio-cotiza/',
          data: {
            idCotizacion: this.idCotiza,
            nombreServ: servicio_txt,
            subtotal: this.input_subtotal,
            iva: this.input_traslado,
            retencion: this.input_retencion,
            total: this.input_total,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {
          if (response) {
            console.log(response)
          }
        }).catch((error) => {
          console.log(error);
        });
    }

  },

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">

        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h5 class="header-title">Informacion del Servicio</h5>
            <div v-if="resClasificaZona != '' && this.input_servicio == 1">
              <div class="col-sm-12">
                <b-alert show v-bind:variant="notColorZona">
                  <h4 class="alert-heading">Aviso de Ruta</h4>
                  <p v-html="notTextoZona"></p>
                </b-alert>
              </div>
            </div>

            <div class="row" style="margin-right: 15px; margin-left: 15px;">

              <div class="col-md-6" style="border-right: 1px solid #f1f1f1">
                <p></p>
                <form>

                  <div class="form-row">
                    <b-form-group class="col-md-6" label="Fecha" label-for="input_fecha">
                      <b-form-input type="text" id="input_fecha" v-model="input_fecha" readonly
                        class="text-center"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Fin Vigencia" label-for="input_vigencia">
                      <b-form-input type="date" id="input_vigencia" :min="dateNow" v-model="input_vigencia"
                        class="text-center"></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-2" label="Identificador" label-for="input_identificador"
                      style="display: none">
                      <b-form-input type="text" id="input_identificador" v-model="input_identificador"
                        class="text-center" readonly></b-form-input>
                    </b-form-group>
                  </div>
                  <!-- @change="showinputtServicio($event,1)" -->
                  <div class="form-row">
                    <b-form-group class="col-md-6" label="Servicio" label-for="input_servicio">
                      <select v-if="idCotiza == 0" id="input_servicio" class="form-control" v-model.trim="input_servicio"
                        @change="showinputtServicio()" disabled>
                        <option v-for="service in all_services" :key="service.id" v-bind:value="service.id">
                          {{ service.name }}
                        </option>
                      </select>

                      <select v-else id="input_servicio" class="form-control" v-model.trim="input_servicio"
                        @change="showinputtServicio()" disabled>
                        <option v-for="service in all_services" :key="service.id" v-bind:value="service.id">
                          {{ service.name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="Modalidad" label-for="input_modalidad">
                      <select v-if="idCotiza == 0" id="input_modalidad" class="form-control"
                        v-model.trim="input_modalidad" disabled>
                        <option v-for="modalidad in all_modalidad" :key="modalidad.id" v-bind:value="modalidad.id">
                          {{ modalidad.name }}
                        </option>
                      </select>

                      <select v-else disabled id="input_modalidad" class="form-control" v-model.trim="input_modalidad">
                        <option v-for="modalidad in all_modalidad" :key="modalidad.id" v-bind:value="modalidad.id">
                          {{ modalidad.name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="Proveedor" label-for="proveedor">

                      <v-autocomplete :items="dates_search_proveedor" v-model="proveedor"
                        :get-label="getLabel_proovedor" :component-item='template_proveedor'
                        @update-items="updateItems_proveedor" input-class="col-md-12 form-control"
                        placeholder="buscar..." item-text="proveedor" item-value="proveedor">
                      </v-autocomplete>

                      <div class="input-group" v-show="activoLabelProveedor == true">
                        <b-form-input placeholder="" v-model.trim="servicioBuscar2"
                          @input="servicioBuscar2 = servicioBuscar2.toUpperCase()"></b-form-input>
                      </div>

                      <b-form-input id="id_proveedor" v-model="id_proveedor" hidden></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="A Venta" label-for="input_venta">
                      <b-form-checkbox disabled id="checkVentas" class="col-md-6" v-model="checkVentas" value="true"
                        unchecked-value="false">
                      </b-form-checkbox>

                    </b-form-group>

                  </div>


                  <!-- #2 parte -->

                  <b-form-group label="Servicios" label-for="input_servicios" v-show="activoServicios == true" disabled>
                    <!-- <b-form-input type="search" id="input_servicios" @blur="validarService"  v-model="servicioBuscar"></b-form-input> -->
                    <!-- //modificad 290621 -->
                    <v-autocomplete disabled :items="dates_search_service" v-model="input_servicios"
                      :get-label="getLabel_service" :component-item='template_service'
                      @update-items="updateItems_service" input-class="col-md-12 form-control" placeholder="buscar..."
                      item-text="input_servicios" item-value="input_servicios" v-show="activoAutoService == true">
                    </v-autocomplete>
                    <!-- @blur="validarService"                       -->

                    <div class="input-group">
                      <b-form-input placeholder="" v-model.trim="servicioBuscar" @input="servicioBuscar = servicioBuscar.toUpperCase()" disabled></b-form-input>
                    </div>

                    <b-form-input id="id_servicio" v-model="id_servicio" hidden></b-form-input>
                  </b-form-group>

                  <b-form-group v-show="activoOrigen == true">
                    <label class="form-label">Origen</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_origen" v-model="input_origen" readonly />
                      <div class="input-group-append">
                        <b-button hidden v-b-modal.modal-origen-destino data-toggle="modal"
                          data-target="#modal-origen-destino" id="btn-add-origen"
                          v-b-tooltip.hover="{ variant: 'success' }" title="Agregar Origen" variant="secondary"
                          style="padding: 7px" class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino(1)"><i class="fas fa-plus-circle"></i></b-button>
                      </div>

                    </div>

                    <sub><b-alert show v-bind:variant="colorZonaOr">Detalle de Zona: <b>{{
                      cpOZona
                    }}</b></b-alert></sub>
                  </b-form-group>

                  <b-form-group v-show="activoDestino == true">
                    <label class="form-label">Destino</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_destino" v-model="input_destino" readonly />
                      <div class="input-group-append">
                        <b-button hidden v-b-modal.modal-origen-destino data-toggle="modal"
                          data-target="#modal-origen-destino" id="btn-add-destino"
                          v-b-tooltip.hover="{ variant: 'success' }" title="Agregar destino" variant="secondary"
                          style="padding: 7px" class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino(2)"><i class="fas fa-plus-circle"></i></b-button>
                      </div>

                    </div>
                    <sub><b-alert show v-bind:variant="colorZonaDe">Detalle de Zona: <b>{{
                      cpDZona
                    }}</b></b-alert></sub>
                  </b-form-group>

                  <b-form-group label="Aduana" label-for="input_aduana" v-show="activoAduana == true">
                    <b-form-input type="search" id="input_aduana" v-model="input_aduana"></b-form-input>
                  </b-form-group>

                  <b-form-group v-show="activoManiobra == true" class="text-center bg-light">
                    <b-form-radio-group v-model="opt_select_man" name="man_opt">
                      <b-form-radio value="o" @change="optManiobra">Origen</b-form-radio>
                      <b-form-radio value="f" @change="optManiobra">Frontera</b-form-radio>
                      <b-form-radio value="d" @change="optManiobra">Destino</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group v-show="activoOrigen_m == true">
                    <label class="form-label">Origen</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_origen_man" v-model="input_origen_man"
                        readonly />
                      <div class="input-group-append">
                        <b-button v-b-modal.modal-origen-destino data-toggle="modal" data-target="#modal-origen-destino"
                          id="btn-add-origen-m" v-b-tooltip.hover="{ variant: 'success' }" title="Agregar Origen"
                          variant="secondary" style="padding: 7px" class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino_m(1)"><i class="fas fa-plus-circle"></i></b-button>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label="Aduana" label-for="input_aduana_man" v-show="activoAduana_m == true">
                    <b-form-input type="search" id="input_aduana_man" v-model="input_aduana_man"></b-form-input>
                  </b-form-group>

                  <b-form-group v-show="activoDestino_m == true">
                    <label class="form-label">Destino</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_destino_man" v-model="input_destino_man"
                        readonly />
                      <div class="input-group-append">
                        <b-button v-b-modal.modal-origen-destino data-toggle="modal" data-target="#modal-origen-destino"
                          id="btn-add-destino-m" v-b-tooltip.hover="{ variant: 'success' }" title="Agregar destino"
                          variant="secondary" style="padding: 7px" class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino_m(2)"><i class="fas fa-plus-circle"></i></b-button>
                      </div>
                    </div>
                  </b-form-group>

                  <!-- #3parte -->

                  <b-form-group v-show="activoCommodity_m == true" class="text-center bg-light">
                    <b-form-radio-group v-if="idCotiza == 0" v-model="selected_tipo" :options="options_tipo"
                      value-field="item" text-field="name" @change="selectTipoUnidad"></b-form-radio-group>

                    <b-form-radio-group else disabled v-model="selected_tipo" :options="options_tipo" value-field="item"
                      text-field="name" @change="selectTipoUnidad"></b-form-radio-group>
                  </b-form-group>

                  <div class="form-row" v-show="activoUN == true">
                    <b-form-group class="col-md-6" label="UN" label-for="input_un">
                      <b-form-input type="text" v-model="input_un"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Class" label-for="input_class">
                      <b-form-input type="text" v-model="input_class"></b-form-input>
                    </b-form-group>
                  </div>

                  <div class="form-row">
                    <b-form-group class="col-md-6" label="Tipo Unidad" label-for="input_tipo_unidad"
                      v-show="activoUnidad == true">
                      <select v-if="idCotiza == 0" id="input_tipo_unidad" class="form-control"
                        v-model.trim="input_tipo_unidad">
                        <option v-for="truck in all_unidades" :key="truck.id" v-bind:value="truck.id">
                          {{ truck.code_name }}
                        </option>
                      </select>

                      <select v-else disabled id="input_tipo_unidad" class="form-control"
                        v-model.trim="input_tipo_unidad">
                        <option v-for="truck in all_unidades" :key="truck.id" v-bind:value="truck.id">
                          {{ truck.code_name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="Dias Transito" label-for="input_dias_transito"
                      v-show="activoDias == true">
                      <b-form-input type="number" id="input_dias_transito" min="0" max="10" :minlength="0"
                        :maxlength="3" v-model="input_dias_transito"></b-form-input>
                    </b-form-group>
                  </div>

                </form>
              </div>

              <div class="col-md-6">
                <p></p>

                <div class="form-row">

                  <b-form-group class="col-md-2" label="Divisa" label-for="input_divisa">
                    <select id="input_divisa" class="form-control" v-model="input_divisa" style="padding: 5px">
                      <option v-for="divisa in all_divisa" :key="divisa.item" v-bind:value="divisa.item">
                        {{ divisa.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Subtotal" label-for="input_subtotal">
                    <b-form-input type="number" id="input_subtotal" min="0" @change="imp_compra"
                      v-model="input_subtotal" style="padding: 5px"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-2" label="Tras." label-for="input_traslado">
                    <select class="form-control" v-model="input_traslado" @change="imp_compra" style="padding: 5px">
                      <option v-for="iva in all_iva" :key="iva.item" v-bind:value="iva.item">
                        {{ iva.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-2" label="Ret." label-for="input_retencion">
                    <select id="input_retencion" class="form-control" @change="imp_compra" v-model="input_retencion"
                      style="padding: 5px">
                      <option v-for="retencion in all_retencion" :key="retencion.item" v-bind:value="retencion.item">
                        {{ retencion.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Total" label-for="input_total">
                    <b-form-input type="number" id="input_total" min="0" v-model="input_total" readonly
                      style="padding: 5px"></b-form-input>
                  </b-form-group>
                </div>

                <div class="form-row">
                  <b-form-group class="col-md-6" label="Venta %" label-for="input_venta">
                    <b-form-select type="text" id="input_venta" v-model="porcentajeVenta" rows="3">
                      <option v-for="opc in pVenta" :key="opc.id" v-bind:value="opc.id" :selected="opc.value == 1">
                        {{ opc.value }}%</option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-6" label="Express %" label-for="input_express">
                    <b-form-select type="text" id="input_express" v-model="porcentajeExpress" rows="3">
                      <option v-for="opt in pExpress" :key="opt.id" v-bind:value="opt.id" :selected="opt.value == 1">
                        {{ opt.value }}% </option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <b-form-group label="Nota" label-for="input_nota">
                  <b-form-textarea type="text" id="input_nota" v-model="input_nota" rows="3"></b-form-textarea>
                </b-form-group>

                <div class="form-row  mt-2">
                  <div class="col-lg-12">
                    <div class="justify-content-center row">
                      <b-button variant="secondary" @click="listServices()">Regresar</b-button>

                      <b-button v-if="estatusCotizacion == 0" variant="primary"
                        @click="saveService()">Guardar</b-button>

                      <b-button v-else-if="estatusCotizacion != 4" variant="primary" @click="saveService2()">Guardar</b-button>

                      <b-button v-if="estatusCotizacion != 4" id="btn-cerrar-sin-cotizacion" v-b-tooltip.hover="{ variant: 'warning' }" title="Cerrar"
                        variant="warning" style="padding: 7px" class="btn btn-secondary waves-effect waves-light"
                        @click="modalCerrar()">Cerrar Sin Cotización</b-button>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>


    <!-- /modals -->
    <b-modal id="modal-origen-destino" hide-header hide-footer v-model="show">
      <div class="text-center mt-0 mb-2">
        <h4 id="origen-destino">{{ txt_origen_destino }}</h4>
      </div>

      <form class="px-3" action="#">
        <input hidden v-model="tipoOD" value="0">
        <div class="form-group">
          <label for="pais">Pais</label>
          <select class="form-control" v-model.trim="paisOD" @change="getEstadoOD($event)" ref="seleccionado_pais">
            <option v-for="paises in countrys" :key="paises.id" v-bind:value="paises.id">
              {{ paises.name }}
            </option>
          </select>
        </div>

        <div class="form-group row col-6">
          <label for="cp">C.P.</label>
          <!-- <autocomplete
                :search="getautocomplit"
                :get-result-value="getResultValue"
                :debounce-time="500"
                @submit="onSubmit"
                id="cpOD"
                :v-model="cpOD"
            ></autocomplete> -->
          <v-autocomplete :items="dates_search" v-model="cpOD" :get-label="getLabel" :component-item='template'
            @update-items="updateItems" input-class="form-control" placeholder="buscar..." item-text="cpOD"
            item-value="cpOD" return-object></v-autocomplete>

        </div>

        <div class="form-group">
          <label for="estado">Estado</label>
          <select id="estadoOD" class="form-control" v-model.trim="estadoOD" ref="seleccionado_estado">
            <option v-for="estate in estatesOD" :key="estate.id" v-bind:value="estate.id">
              {{ estate.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="city">Ciudad/Municipio</label>
          <b-form-input v-model.trim="cityOD" @input="cityOD = cityOD.toUpperCase()"></b-form-input>
        </div>

        <div class="form-group text-right">
          <b-button class="width-md ml-1" variant="secondary" @click="show = false">Cerrar</b-button>
          <b-button class="width-md ml-1" variant="primary" @click="saveOrigenDestino">Guardar</b-button>
        </div>
      </form>
    </b-modal>


  </Layout>
</template>

<style>
.autocomplete-input {
  padding: 10px 10px 10px 40px;
  font-size: 14px;
}
</style>