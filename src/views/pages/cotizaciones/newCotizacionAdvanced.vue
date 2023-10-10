<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import ItemTemplate from "@/components/ItemTemplateSearch";
import ItemTemplateProvServ from "@/components/ItemTemplateProvServ";
import ItemTemplateAddres from "@/components/ItemTemplateAddress";

import Vue from "vue";

import { BPopover } from "bootstrap-vue";

Vue.component("b-popover", BPopover);

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
      input1: "",
      input1state: null,
      input2: "",
      input2state: null,
      options: [{ text: "- Choose 1 -", value: "" }, "Red", "Green", "Blue"],
      input1Return: "",
      input2Return: "",
      popoverShow: false,

      dates_search: [],
      dates_search_proser: [],
      dates_search_address: [],
      numConsecutivo: 0,
      idConsecutivo: 0,
      controlConse: "",
      fechaConsecutivo: "",
      fConse: "",
      estadoCotiza: false,
      template: ItemTemplate,
      templateProvServ: ItemTemplateProvServ,
      templateAddress: ItemTemplateAddres,
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
      termodalidadText: "",
      termodalidadImg: "",
      tertipocarga: "",
      carga: "",
      tercotizacion: 0,
      nomeda: "123456",

      terembalaje: "",
      terDescEmbalaje: "",
      terestibable: "",
      idclasifica: 0,
      clasifica: "",
      clasificaText: "",
      descripMerc: "",
      numcols: 12,
      cantMerc: "",
      volMerc: 0,
      volMercTot: 0,
      pesTMerc: 0,
      unidaMedidaMerc: "",
      unMerc: "",
      classMerc: "",
      gradosMerc: "",
      tUnidadMerc: "",
      altoMerc: 0,
      anchoMerc: 0,
      largoMerc: 0,
      unidaPesoMerc: "",
      pesoTotal: 0,

      fechaFormato: "",
      tipoEnvio: "Optimo",

      claPro: "",
      desPro: "",
      clasificacionZonaO: "",
      clasificacionZonaD: "",
      resClasificaZona: "",
      notColorZona: "",
      notTextoZona: "",
      zonaValidaCo: 0,
      //Fin Terrestre

      //Inicio General
      fondoEtiquetas: "white",
      fondoBusqueda: "white",
      fondoEtiquetas1: "",
      fondoBusqueda1: "",

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
      embalajes: [],
      selectServices: [1],
      services: [],
      folio: 0,

      tipoUnidad: 0,
      nombreTipoUnidad: "",
      estibable: "",

      arrayOrigen: [],
      arrayDestino: [],
      arrayOrigenR: [],
      arrayDestinoR: [],
      listVentas: [],

      cambioTerrestre: 0,
      priceSale: 0,
      confirmarServices: [],
      confirmarServices2: [],
      confirmarServices3: [],
      confirmarServices4: [],
      confirmarServices5: [], // SE USA CUANDO HAY AJUSTES DE PRECIOS EN EL DESGLOSE DE LA COTIZACION

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

      idU: 0,
      emailU: "",
      nombreU: "",
      username: "",
      tokenU: "",
      puestoU: "",
      permisos: [],
      menuItems: [],

      /*NIEVA SECCION TARIFAS AUTOMATICAS*/

      estatus: 0,
      idTarifa: 0,
      idTarifasDestino: 0,
      idTarifasOrigen: 0,
      tarifaKilometro: 0,

      idRuta: 0,
      kilometraje: 0,
      porcZonaNoCom: 0,
      porcZonaPelig: 0,
      tiempoEstimado: "",

      unidadId: 0,
      unidadNombre: "",
      unidadPesoBruto: 0.0,
      unidadCapacidad: 0.0,
      unidadHigh: 0.0,
      unidadLong: 0.0,
      unidadWidth: 0.0,
      unidadCapacidadMaxima: 0,
      unidadImagen: '',

      embalajeId: 0,
      embalajeNombre: "",
      embalajeAlto: 0.0,
      embalajeAncho: 0.0,
      embalajeLargo: 0.0,
      embalajeCapacidadMaxima: 0,
      

      volumenMax: 0,

      sobrePeso: false,
      porcSobrePeso: 0,

      definePesoXVol: false,
      pesoDef: 0,
      volDef: 0,

      isSusceptibleRobo: false,
      porcentajeRobo: 0,

      totalGlobal: 0,
      totalIvaGlobal: 0,
      totalSubtotalGlobal: 0,
      totalRetencionGlobal: 0,
      totalZonaPeligrosa: 0,
      totalZonaNoComercial: 0,
      totalSobrepesoGlobal: 0,
      totalRobosGlobal: 0,
      totalGlobalServicio: 0,
      totalVolMercancias: 0,

      estatusCotiza: 0,
      getServicioExiste: [],

      maxRange: 0,
      minRange: 0,
      nomUnidadModalidad: "",

      valorMercancia: 0,
      requiereRecoleccion: false,
      requiereEntrega: false,

      precioM3LTL: 960,
      valorTotalLTL: 0,

      selected: "",

      optionsItemModalidad: [
        {
          value: "LTL",
          text: "LTL - Carga Consolidada",
          src: "/img/ltl.png",
        },
        {
          value: "FTL",
          text: "FTL - Camión Completa",
          src: "/img/ftl.png",
        },
        {
          value: "FCL",
          text: "FCL - Contenedor Completo",
          src: "/img/fcl.png",
        },
      ],

      agregarMercancias: [],
      pesoTotal: 0,
      origen: "",
      destino: "",
      calleOrigen: "",
      numExtOrigen: "",
      numIntOrigen: "",
      calleDestino: "",
      numExtDestino: "",
      numIntDestino: "",

      detectaCambiosUbicaciones: 0,
      jsonObject: {},

      precioXMetCub: 333,
      totalPesoVolTot: 0,

      precioXKiloCub: 850,
      totalKilo: 0,

      totalPrecioVolumen: 0,

      cubos: [
        {
          estilos: {
            transform: 'translateZ(150px)',
            backgroundColor: '#fff',
          },
        },
        {
          estilos: {
            transform: 'translateZ(-150px)',
            backgroundColor: '#eee',
          },
        },
        {
          estilos: {
            transform: 'translateX(-150px) rotateY(90deg)',
            backgroundColor: '#ddd',
          },
        },
        {
          estilos: {
            transform: 'translateX(150px) rotateY(90deg)',
            backgroundColor: '#ccc',
          },
        },
        {
          estilos: {
            transform: 'translateY(-100px) rotateX(90deg)',
            backgroundColor: '#bbb',
          },
        },
        {
          estilos: {
            transform: 'translateY(100px) rotateX(90deg)',
            backgroundColor: '#aaa',
          },
        },
      ],

      arrayContenedorMercancias: [],

      factorConversionEstiba: 0,
      factorConversionNoEstiba: 1800,
      cifraOriginal: 0,
      cifraRedondeada: null,

      arrayDatosTarifario: [],
      recoleccion_tres_y_media: 0.0,
      recoleccion_rabon: 0.0,
      recoleccion_torton: 0.0,
      entrega_puerto_nissan: 0.0,
      entrega_puerto_tres_y_media: 0.0,
      entrega_rabon: 0.0,
      entrega_torton: 0.0,
      flete_nacional: 0.0,

      leyendaPeso: '',
      leyendaVolumen: '',
    };
  },
  created() {
    this.fechaHoy();
    this.getContry();
    this.getServicios();
    this.getLada();
    this.getFechaActual();
    this.getFolioCon();
    setTimeout("", 5000);
    this.dataSess();
    this.getUnidadBox("g");
    this.getEmbalaje();
  },
  mounted() {
    
  },
  watch: {
    arrayOrigen(newValue) {
      if (newValue.length > 0) {
        this.getTarifario();
      }
    },
    arrayDestino(newValue) {
      if (newValue.length > 0) {
        this.getTarifario();
      }
    }
  },

  methods: {
    dataSess() {
      let data = JSON.parse(localStorage.getItem("users"));
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

    modulosUsuario() {
      let agregar = {};

      agregar = {
        id: 0,
        label: "Módulos",
        isTitle: true,
      };

      this.menuItems.push(agregar);
      for (let i = 0; i < this.permisos.length; i++) {
        if (
          this.permisos[i].modulos_isSubmenu == false &&
          this.permisos[i].modulos_idMenu == 0
        ) {
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            link: this.permisos[i].modulos_link,
          };
          this.menuItems.push(agregar);
        } else if (this.permisos[i].modulos_isSubmenu == true) {
          let idItem = this.permisos[i].modulos_id;
          let subItem = [];
          let agreg = {};

          for (let e = 0; e < this.permisos.length; e++) {
            if (this.permisos[e].modulos_idMenu == idItem) {
              agreg = {
                id: this.permisos[e].modulos_id,
                label: this.permisos[e].modulos_nombre,
                link: this.permisos[e].modulos_link,
              };
              subItem.push(agreg);
            }
          }

          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            isMenuCollapsed: false,
            subItems: subItem,
          };
          this.menuItems.push(agregar);
        }
      }
    },

    //INICIA SECCION DE POPOVER
    onClose() {
      this.popoverShow = false;
    },

    onOk() {
      this.validaDatosMercancias();
      this.onClose();
    },
    //TERMINA SECCION DE POPOVER

    validaDatosMercancias() {
      let tipocarga = this.tipoCarga;
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

      if (volMerc == 0 || volMerc == null) {
        Swal.fire({
          title: "Ingresa el Volúmen",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesTMerc == 0 || pesTMerc == null) {
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
    },

    reloadPage() {
      window.location.reload();
    },

    getFolioCon() {
      axios({
        method: "post",
        url: "/api/v1/consecutivo/",
        data: {
          id: 1,
        },
      })
        .then((response) => {
          this.idConsecutivo = response.data[0].id;
          this.numConsecutivo = response.data[0].numero;
          this.controlConse = response.data[0].control;
          this.fechaConsecutivo = response.data[0].fecha;

          var date = new Date(this.fechaConsecutivo);
          var date2 = moment(String(this.fechaConsecutivo)).format(
            "YYYY/MM/DD"
          );

          this.fechaConsecutivo = date.getUTCFullYear().toString().substr(-2);
          this.fConse = date2;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    insertConsecutivo() {
      const fecConse = this.fConse;
      let fechaHoy = Date.now();
      fechaHoy = moment(new Date(fechaHoy)).format("YYYY/MM/DD");
      //let anioComp = date.getUTCFullYear();
      axios({
        method: "post",
        url: `/api/v1/iconsecutivo/`,
        data: {
          idAnt: this.idConsecutivo,
          fecConse: fecConse,
          fechaHoy: fechaHoy,
        },
      })
        .then((response) => {})
        .catch((error) => {
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
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    //para el autocomplit del cp
    getFechaActual() {
      let hoy = new Date();
      let dd = hoy.getDate();
      let mm = hoy.getMonth() + 1;
      let yy = hoy.getFullYear();
      let mes = "";
      switch (mm) {
        case 1:
          mes = "Enero";
          break;
        case 2:
          mes = "Febrero";
          break;
        case 3:
          mes = "Marzo";
          break;
        case 4:
          mes = "Abril";
          break;
        case 5:
          mes = "Mayo";
          break;
        case 6:
          mes = "Junio";
          break;
        case 7:
          mes = "Julio";
          break;
        case 8:
          mes = "Agosto";
          break;
        case 9:
          mes = "Septiembre";
          break;
        case 10:
          mes = "Octubre";
          break;
        case 11:
          mes = "Noviembre";
          break;
        case 12:
          mes = "Diciembre";
          break;

        default:
          break;
      }

      return (this.fechaFormato = dd + " de " + mes + " de " + yy);
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
      if (item != "" && item != null) {
        let clave_prodserv = item.clave_prodserv;
        let complementoIncluir = item.complementoIncluir;
        let dateCreate = item.dateCreate;
        let descripcion = item.descripcion;
        let estatus = item.estatus;
        let fechaFinVigencia = item.fechaFinVigencia;
        let fechaInicioVigencia = item.fechaInicioVigencia;
        let id = item.id;
        let iepsTraslado = item.iepsTraslado;
        let ivaTraslado = item.ivaTraslado;
        let porcentajeRobo = item.porcentajeRobo;
        let susceptibleRobo = item.susceptibleRobo;
        let tipoMercancia = item.tipoMercancia;
        let materialPeligroso = item.materialPeligroso;
        let sectorIndustrial = item.sectorIndustrial
        let palabrasSimilares = item.palabrasSimilares

        if (id != undefined && id != null && id != "") {
          this.clasifica = descripcion;
          this.idclasifica = clave_prodserv;
          this.isSusceptibleRobo = susceptibleRobo;
          this.porcentajeRobo = parseFloat(porcentajeRobo);
          //this.clasificaText = "[" + item.clave_prodserv + "] - " + item.descripcion;
          this.clasificaText = descripcion;

          if(this.termodalidad == "FTL"){
            let self = this

            setTimeout(function () {
              self.selectTipoUnidad(tipoMercancia, materialPeligroso); //aqui
            }, 900);
          }

        }
      }
    },

    getLabelAddressO(item) {
      if (item != null && item != "") {
        let idpais = parseInt(item.pais_id);
        let pais = item.pais_name;
        let idestado = parseInt(item.estado_id);
        let estado = item.estado_name;
        let ciudad = item.municipio;
        let colonia = item.asentamiento;
        let cp = item.codigo_postal;

        if (pais != undefined && pais != null && pais != "") {
          this.arrayOrigen = [];
          this.arrayOrigenR = [];
          this.origen = "";

          let ori = {
            idpaiso: idpais,
            paiso: pais,
            idestadoo: idestado,
            estadoo: estado,
            ciudado: ciudad,
            colonia: colonia,
            cpo: cp,
          };

          let ori1 = {
            idpais: idpais,
            pais: pais,
            idestado: idestado,
            estado: estado,
            ciudad: ciudad,
            colonia: colonia,
            cp: cp,
          };
          this.terorigen = pais + ", " + cp + ", " + estado + ", " + ciudad + ", " + colonia;
          this.arrayOrigen.push(ori);
          this.arrayOrigenR.push(ori1);
          this.origen = pais + ", " + estado + ", " + ciudad + ", " + cp;
        }
      }
    },

    getLabelAddressD(item) {
      if (item != null && item != "") {
        let idpais = parseInt(item.pais_id);
        let pais = item.pais_name;
        let idestado = parseInt(item.estado_id);
        let estado = item.estado_name;
        let ciudad = item.municipio;
        let colonia = item.asentamiento;
        let cp = item.codigo_postal;

        if (pais != undefined && pais != null && pais != "") {
          this.arrayDestino = [];
          this.arrayDestinoR = [];
          this.destino = "";

          let des = {
            idpaisd: idpais,
            paisd: pais,
            idestadod: idestado,
            estadod: estado,
            ciudadd: ciudad,
            colonia: colonia,
            cpd: cp,
          };

          let des1 = {
            idpais: idpais,
            pais: pais,
            idestado: idestado,
            estado: estado,
            ciudad: ciudad,
            colonia: colonia,
            cp: cp,
          };

          this.terdestino = pais + ", " + cp + ", " + estado + ", " + ciudad + ", " + colonia;

          this.arrayDestino.push(des);
          this.arrayDestinoR.push(des1);
          this.destino = pais + ", " + estado + ", " + ciudad + ", " + cp;
        }
      }
    },

    cambioDirecciones() {
      let idpaisd = this.arrayDestinoR[0].idpais;
      let paisd = this.arrayDestinoR[0].pais;
      let idestadod = this.arrayDestinoR[0].idestado;
      let estadod = this.arrayDestinoR[0].estado;
      let ciudadd = this.arrayDestinoR[0].ciudad;
      let coloniad = this.arrayDestinoR[0].colonia;
      let cpd = this.arrayDestinoR[0].cp;

      let idpaiso = this.arrayOrigenR[0].idpais;
      let paiso = this.arrayOrigenR[0].pais;
      let idestadoo = this.arrayOrigenR[0].idestado;
      let estadoo = this.arrayOrigenR[0].estado;
      let ciudado = this.arrayOrigenR[0].ciudad;
      let coloniao = this.arrayOrigenR[0].colonia;
      let cpo = this.arrayOrigenR[0].cp;

      let ori = {};
      let des = {};

      this.arrayOrigen = [];
      this.arrayDestino = [];

      let datOri = this.origen;
      let datDes = this.destino;

      if (this.detectaCambiosUbicaciones == 0) {
        ori = {
          idpaisd: idpaiso,
          paisd: paiso,
          idestadod: idestadoo,
          estadod: estadoo,
          ciudadd: ciudado,
          colonia: coloniao,
          cpd: cpo,
        };

        des = {
          idpaiso: idpaisd,
          paiso: paisd,
          idestadoo: idestadod,
          estadoo: estadod,
          ciudado: ciudadd,
          colonia: coloniad,
          cpo: cpd,
        };

        this.arrayOrigen.push(des);
        this.arrayDestino.push(ori);

        this.origen = datDes;
        this.destino = datOri;
        this.detectaCambiosUbicaciones = 1;
      } else {
        ori = {
          idpaiso: idpaisd,
          paiso: paisd,
          idestadoo: idestadod,
          estadoo: estadod,
          ciudado: ciudadd,
          colonia: coloniad,
          cpo: cpd,
        };

        des = {
          idpaisd: idpaiso,
          paisd: paiso,
          idestadod: idestadoo,
          estadod: estadoo,
          ciudadd: ciudado,
          colonia: coloniao,
          cpd: cpo,
        };

        this.arrayOrigen.push(ori);
        this.arrayDestino.push(des);

        this.origen = datOri;
        this.destino = datDes;
        this.detectaCambiosUbicaciones = 0;
      }

      console.log("------------------------");
      console.log(this.arrayOrigen);
      console.log(this.arrayDestino);
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
      axios
        .get(`/api/v1/list-ladas/`)
        .then((response) => {
          this.ladas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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

    selectTipoUnidad(tipCarga, peligroso) {

    let self = this

      if(peligroso.search('1') > 0 || tipCarga.trim() == 'HAZMAT'){
        setTimeout(function () {
          self.getUnidadBox("h");
        }, 900);
        this.activoUN = true;
        this.activoClass = true;
        this.tipoUnidad = 5;
        this.carga = "Peligrosa";
        this.mercancia = "h";
        this.numcols = 4;
        this.tertipocarga = 'h'
      }else if(tipCarga.trim() == 'Mercancía General'){

        setTimeout(function () {
          self.getUnidadBox("g");
        }, 900);
        
        this.tipoUnidad = 5;
        this.carga = "General";
        this.mercancia = "g";
        this.numcols = 12;
        this.tertipocarga = 'g'
      }



      /*this.tertipocarga = val;
      let tipoCajaS = this.tertipocarga;

      if (tipoCajaS == "h") {
        this.getUnidadBox("h");
        this.activoUN = true;
        this.activoClass = true;
        this.tipoUnidad = 5;
        this.carga = "Peligrosa";
        this.mercancia = "h";
        this.numcols = 4;
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
      }*/
      this.showMercancias();
      this.getCoincidencia();
    },

    selectEmbalaje(evento) {
      let tipoEmbalaje = evento;

      if (this.embalajes.findIndex((x) => x.idEmbalaje === tipoEmbalaje) >= 0) {
        let index_embalaje = this.embalajes.findIndex(
          (x) => x.idEmbalaje === tipoEmbalaje
        );
        this.embalajeId = parseInt(this.embalajes[index_embalaje].idEmbalaje);
        this.embalajeNombre = this.embalajes[index_embalaje].nombre;
        this.terDescEmbalaje = this.embalajeNombre.toUpperCase();
        this.embalajeAlto = parseFloat(this.embalajes[index_embalaje].alto);
        this.embalajeAncho = parseFloat(this.embalajes[index_embalaje].ancho);
        this.embalajeLargo = parseFloat(this.embalajes[index_embalaje].largo);
        this.embalajeCapacidadMaxima = parseInt(this.embalajes[index_embalaje].cantidadMaxima
        );
      }
    },

    selectEstibable() {
      if (this.terestibable == "no") {
        this.altoMerc = parseFloat(this.embalajeAlto);
      }

      if (this.terestibable == "si") {
        this.altoMerc = 0;
      }
      //Se deja en caso de aplicar datos con envento change
    },

    selectModalidad(option) {

      
      this.selected = option;

      var self = this;
      self.tertipocarga = "";
      self.tercotizacion = 0;
      self.nomUnidadModalidad = "";
      self.volumenMax = 0;
      this.confirmarServices = [];
      this.confirmarServices3 = [];
      this.valorMercancia = 0;
      this.selectServices = [1];
      this.valorTotalLTL = 0;


      this.clasifica = '';
      this.idclasifica = 0;
      this.isSusceptibleRobo = false;
      this.porcentajeRobo = 0.0;
      this.clasificaText = '';


      let index_modalidad = this.optionsItemModalidad.findIndex(
        (x) => x.value === option
      );
      this.termodalidad = this.optionsItemModalidad[index_modalidad].value;
      this.termodalidadText = this.optionsItemModalidad[index_modalidad].text;
      this.termodalidadImg = this.optionsItemModalidad[index_modalidad].src;
      this.mercancias = "";

      if (this.termodalidad == "LTL" || this.termodalidad == "FTL") {
        self.getUnidadBox("g");
      }
      if (this.termodalidad == "FCL") {
        self.getUnidadBox("e");
      }

      if (this.termodalidad == "LTL" || this.termodalidad == "FCL") {
        setTimeout(function () {
          self.getMinMax();
        }, 900);
      }

      if (this.termodalidad == "FTL") {
        this.mercancias = "Mercancía General";
      }
    },

    selectUniMedMerc() {
      let unidadMedida = this.unidaMedidaMerc;

      //Se deja en caso de aplicar datos con envento change
    },

    selectUniPesMerc() {
      let unidadPeso = this.unidaPesoMerc;

      //Se deja en caso de aplicar datos con envento change
    },

    validaAlto() {
      if(this.altoMerc > 1.2){
        Swal.fire({
          title: "Aviso",
          text: "La medida ingresada en la altura sobrepasa el limite para considerarse Estibable.",
          icon: "info",
          confirmButtonText: "Cerrar",
        });


        this.terestibable = "no"
        this.selectEstibable();
      }

      if(this.altoMerc < 0) {
        this.altoMerc = 0;
      } else {
        this.calculaVolumen();
      }
      /*if(this.altoMerc > parseFloat(this.embalajeAlto)){
        Swal.fire({
          title: "El alto ingresado supera el limite de la unidad, verifícalo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.altoMerc = 0
      }else{
        this.calculaVolumen();
      }*/
    },

    validaAncho() {
      if (this.anchoMerc < 0) {
        this.anchoMerc = 0;
      } else {
        this.calculaVolumen();
      }

      /*if(this.anchoMerc > parseFloat(this.embalajeAncho)){
        Swal.fire({
          title: "El ancho ingresado supera el limite de la unidad, verifícalo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.anchoMerc = 0
      }else{
        this.calculaVolumen();
      }*/
    },

    validaLargo() {
      /*if(this.largoMerc > parseFloat(this.embalajeLargo)){
        Swal.fire({
          title: "El largo ingresado supera el limite de la unidad, verifícalo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.largoMerc = 0
      }else{
        this.calculaVolumen();
      }*/

      if (this.largoMerc < 0) {
        this.largoMerc = 0;
      } else {
        this.calculaVolumen();
      }
    },

    validaCantidad() {
      let cant = parseInt(this.cantMerc);

      if (cant < 0 ) {
        this.cantMerc = 0;
      }

      if (cant > 8 ) {
        this.cantMerc = 8;
      }
      
      /*if(parseInt(this.cantMerc) <= parseInt(this.embalajeCapacidadMaxima) && parseInt(this.cantMerc) > 0){
        
        let total = 0
        this.calculaVolumen();
        total = this.cantMerc * this.volMerc;

        this.volMerc = total.toFixed(2);

        //SE CALCULA EL PRECIO POR METRO CUBICO

        this.valorTotalLTL = this.precioM3LTL * this.volMerc;

      }else{
        Swal.fire({
          title: "La cantidad supera el limite de carga",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.volMerc = 0
      }*/

      /*let total = 0
      this.calculaVolumen();
      total = this.cantMerc * this.volMerc

      this.volMerc = total.toFixed(2) 

      if(this.volMerc > parseFloat(this.unidadCapacidad)){
        Swal.fire({
          title: "El volúmen calculado supera el limite de la unidad, verifícalo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.volMerc = 0
      }*/
    },

    cambioUnidad(nombreUnidad, idunidad) {
      this.nombreTipoUnidad = nombreUnidad;
      this.tipoUnidad = idunidad;

      this.getDataUnidad();
      this.getCoincidencia();
    },

    calculaVolumen() {
      let total = 0;
      let totalTotal = 0;
      let alto = this.altoMerc;
      let ancho = this.anchoMerc;
      let largo = this.largoMerc;
      let cantidad = this.cantMerc

      total = alto * ancho * largo;
      totalTotal = alto * ancho * largo * cantidad
      this.volMerc = total.toFixed(2);
      this.volMercTot = totalTotal.toFixed(2);
    },

    getDataUnidad() {
      if (this.units.findIndex((x) => x.id === this.tipoUnidad) >= 0) {
        let index_unidad = this.units.findIndex(
          (x) => x.id === this.tipoUnidad
        );
        this.unidadId = parseInt(this.units[index_unidad].id);
        this.unidadNombre = this.units[index_unidad].name;
        this.nombreTipoUnidad = this.unidadNombre;
        this.unidadPesoBruto = parseFloat(this.units[index_unidad].peso_bruto_total);
        this.unidadCapacidad = parseFloat(this.units[index_unidad].capacidad_vol);
        this.unidadHigh = parseFloat(this.units[index_unidad].high);
        this.unidadLong = parseFloat(this.units[index_unidad].long);
        this.unidadWidth = parseFloat(this.units[index_unidad].width);
        this.unidadCapacidadMaxima = parseInt(this.units[index_unidad].capacidadMaxima)
        this.unidadImagen = this.units[index_unidad].imagen
      }
    },

    getUnidadBox(tipo) {
      this.units = [];
      axios({
        method: "post",
        url: "/api/v1/list-box/",
        data: {
          data: tipo,
        },
      }).then((response) => {
        this.units = response.data;
        let self = this;
        if (this.termodalidad == "LTL") {
          self.getDataUnidad();
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    /* METODO PARA OBTENER CONICIDENCIAS DE LA TABLA TARIFAS */
    getCoincidencia() {
      let o;
      let d;

      let vpaisOrigen;
      let vcpOrigen;
      let vestadoOrigen;
      let vciudadOrigen;
      let vcoloniaOrigen;

      let vpaisDestino;
      let vcpDestino;
      let vestadoDestino;
      let vciudadDestino;
      let vcoloniaDestino;

      for (o = 0; o < this.arrayOrigen.length; o++) {
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
        vcoloniaOrigen = this.arrayOrigen[o].colonia;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
        vcoloniaDestino = this.arrayDestino[d].colonia;
      }

      this.obtenerZona(vcpOrigen, vcpDestino);

      axios({
        method: "post",
        url: "/api/v1/list-tarifas-coincidencia/",
        data: {
          paisOrigen: vpaisOrigen,
          estadoOrigen: vestadoOrigen,
          ciudadOrigen: vciudadOrigen,
          cpOrigen: vcpOrigen,
          coloniaOrigen: vcoloniaOrigen,
          paisDestino: vpaisDestino,
          estadoDestino: vestadoDestino,
          ciudadDestino: vciudadDestino,
          cpDestino: vcpDestino,
          coloniaDestino: vcoloniaDestino,
          dateFin: this.fechaCoincidencia,
          unidaModality: this.tertipocarga,
          tipoUnidad_id: this.tipoUnidad,
          modalidad: this.termodalidad,
        },
      }).then((response) => {
        let cadena = JSON.stringify(response.data[0]);
        let termino = "idTarifa";
        let posicion = cadena.indexOf(termino);

        if (posicion > 0) {
          this.estatus = parseInt(response.data[0].estatus);
          this.idTarifa = parseInt(response.data[0].idTarifa);
          this.idTarifasDestino = parseInt(response.data[0].idTarifasDestino);
          this.idTarifasOrigen = parseInt(response.data[0].idTarifasOrigen);
          this.tarifaKilometro = parseFloat(response.data[0].tarifaKilometro);
        } else {
          this.estatus = 0;
          this.idTarifa = 0;
          this.idTarifasDestino = 0;
          this.idTarifasOrigen = 0;
          this.tarifaKilometro = 0;

          if (response.data[0].existeOrigen == false) {
            Swal.fire({
              title: "El Origen no está habilitado para realizar envios ",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }

          if (response.data[0].existeDestino == false) {
            Swal.fire({
              title: "El Destino no está habilitado para realizar envios ",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }
        }

        this.getKilometraje();
      }).catch((error) => {
        console.log(error);
      });
    },

    getKilometraje() {
      let o;
      let d;

      let vpaisOrigen;
      let vcpOrigen;
      let vestadoOrigen;
      let vciudadOrigen;
      let vcoloniaOrigen;

      let vpaisDestino;
      let vcpDestino;
      let vestadoDestino;
      let vciudadDestino;
      let vcoloniaDestino;

      for (o = 0; o < this.arrayOrigen.length; o++) {
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
        vcoloniaOrigen = this.arrayOrigen[o].colonia;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
        vcoloniaDestino = this.arrayDestino[d].colonia;
      }

      axios({
        method: "post",
        url: "/api/v1/list-kilometraje-coincidencia/",
        data: {
          paisOrigen: vpaisOrigen,
          estadoOrigen: vestadoOrigen,
          ciudadOrigen: vciudadOrigen,
          cpOrigen: vcpOrigen,
          coloniaOrigen: vcoloniaOrigen,
          paisDestino: vpaisDestino,
          estadoDestino: vestadoDestino,
          ciudadDestino: vciudadDestino,
          cpDestino: vcpDestino,
          coloniaDestino: vcoloniaDestino,
          dateFin: this.fechaCoincidencia,
          unidaModality: this.tertipocarga,
          tipoUnidad_id: this.tipoUnidad,
        },
      }).then((response) => {
        if (response.data.length > 0) {
          this.idRuta = response.data[0].idRuta;
          this.kilometraje = parseFloat(response.data[0].kilometraje);
          this.porcZonaNoCom = parseFloat(response.data[0].porcZonaNoCom);
          this.porcZonaPelig = parseFloat(response.data[0].porcZonaPelig);
          this.tiempoEstimado = response.data[0].tiempoEstimado;
        } else {
          this.idRuta = 0;
          this.kilometraje = 0;
          this.porcZonaNoCom = 0;
          this.porcZonaPelig = 0;
        }

        if (this.termodalidad == "FTL") {
          this.getGramaje();
        } else {
          let idServicio = 1;
          let nombreServicio = "FLETE NACIONAL";
          this.addServicios(idServicio, nombreServicio);
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    getGramaje() {
      if (this.unidadPesoBruto > 0) {
        /* CONVERSION DE GRAMAJE */

        if (this.unidaMedidaMerc == "kg") {
          let kgConvert = this.unidadPesoBruto * 1000;
          if (this.pesTMerc > kgConvert) {
            this.sobrePeso = true;
            this.porcSobrePeso = 15.0;
          } else {
            this.sobrePeso = false;
            this.porcSobrePeso = 0.0;
          }
        } else if (this.unidaMedidaMerc == "lb") {
          if (this.pesTMerc > this.unidadPesoBruto) {
            this.sobrePeso = false;
            this.porcSobrePeso = 15.0;
          } else {
            this.sobrePeso = false;
            this.porcSobrePeso = 0.0;
          }
        }
        let idServicio = 1;
        let nombreServicio = "FLETE NACIONAL";
        this.addServicios(idServicio, nombreServicio);
      }
    },

    addServicios(idServicio, nombreServicio) {
      /* INICIA PROCESO DE CALCULO */
      let indice;
      let comprobar = false;
      let subtotal = 0;
      let iva = 16;
      let porcIva = 0;
      let porcZPeligrosa = 0;
      let porcNComercial = 0;
      let porcSobrepeso = 0;
      let porcSusceptible = 0;
      let totalServicio = 0;
      let porcVolMerc = 0;
      let ajusteVenta = false;
      let precioVolumenTot = 0;

      this.getServicioExiste = [];

      if (nombreServicio == "SEGURO") {
        comprobar = document.getElementById(idServicio + "cheServicios").checked;
        if (comprobar) {
          if (this.valorMercancia == 0) {
            this.$bvModal.show("valorDeclaradoMercancia");
            return false;
          }
          subtotal = this.valorMercancia * (7 / 100);
          subtotal = parseFloat(subtotal.toFixed(2));
          porcIva = subtotal * (iva / 100);

          let agrega = {
            ajusteVenta: ajusteVenta,
            idService: idServicio,
            nombreSer: nombreServicio,
            kilometraje: 0,
            tarifaK: 0,
            subtotal: subtotal,
            iva: iva,
            porcIva: porcIva,
            porcZPeligrosa: 0,
            porcNComercial: 0,
            porcSobrepeso: 0,
            porcSusceptible: 0,
            aumento: 0,
            porcAumento: 0,
            porcVolMerc: 0,
            totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible,
          };

          if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
            this.confirmarServices.push(agrega);
          }

          if (this.valorMercancia > 0) {
            this.$bvModal.hide("valorDeclaradoMercancia");
          }
        } else {
          let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
          this.confirmarServices.splice(indice, 1);

          let indice1 = this.selectServices.indexOf(idServicio);
          if (indice1 !== -1) {
            this.selectServices.splice(indice1, 1);
          }
        }
      }else if (nombreServicio == "RECOLECCION") {
        comprobar = document.getElementById(idServicio + "cheServicios").checked;
        if (comprobar) {
          subtotal = this.recoleccion_tres_y_media
          subtotal = parseFloat(subtotal.toFixed(2));
          porcIva = subtotal * (iva / 100);

          let agrega = {
            ajusteVenta: ajusteVenta,
            idService: idServicio,
            nombreSer: nombreServicio,
            kilometraje: 0,
            tarifaK: 0,
            subtotal: subtotal,
            iva: iva,
            porcIva: porcIva,
            porcZPeligrosa: 0,
            porcNComercial: 0,
            porcSobrepeso: 0,
            porcSusceptible: 0,
            aumento: 0,
            porcAumento: 0,
            porcVolMerc: 0,
            totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible,
          };

          if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
            this.confirmarServices.push(agrega);
          }
        } else {
          let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
          this.confirmarServices.splice(indice, 1);

          let indice1 = this.selectServices.indexOf(idServicio);
          if (indice1 !== -1) {
            this.selectServices.splice(indice1, 1);
          }
        }
        
      }else if (nombreServicio == "ENTREGA") {
        comprobar = document.getElementById(idServicio + "cheServicios").checked;

        if (comprobar) {
          subtotal = this.entrega_puerto_tres_y_media
          subtotal = parseFloat(subtotal.toFixed(2));
          porcIva = subtotal * (iva / 100);

          let agrega = {
            ajusteVenta: ajusteVenta,
            idService: idServicio,
            nombreSer: nombreServicio,
            kilometraje: 0,
            tarifaK: 0,
            subtotal: subtotal,
            iva: iva,
            porcIva: porcIva,
            porcZPeligrosa: 0,
            porcNComercial: 0,
            porcSobrepeso: 0,
            porcSusceptible: 0,
            aumento: 0,
            porcAumento: 0,
            porcVolMerc: 0,
            totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible,
          };

          if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
            this.confirmarServices.push(agrega);
          }

        } else {
          let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
          this.confirmarServices.splice(indice, 1);
        }

      }else if (nombreServicio != "FLETE NACIONAL") {
        comprobar = document.getElementById(idServicio + "cheServicios").checked;

        if (comprobar) {
          axios({
            method: "post",
            url: "/api/v1/service-filtro/",
            data: {
              servicio: nombreServicio,
            },
          })
            .then((response) => {
              if (response.data.length > 0) {
                subtotal = parseFloat(response.data[0].subtotal);

                porcIva = subtotal * (iva / 100);

                let agrega = {
                  ajusteVenta: ajusteVenta,
                  idService: idServicio,
                  nombreSer: nombreServicio,
                  kilometraje: 0,
                  tarifaK: 0,
                  subtotal: parseFloat(response.data[0].subtotal),
                  iva: 16,
                  porcIva: porcIva,
                  porcZPeligrosa: 0,
                  porcNComercial: 0,
                  porcSobrepeso: 0,
                  porcSusceptible: 0,
                  aumento: 0,
                  porcAumento: 0,
                  porcVolMerc: 0,
                  totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible,
                };
                this.confirmarServices.push(agrega);
              } else {
                let agrega = {
                  ajusteVenta: ajusteVenta,
                  idService: idServicio,
                  nombreSer: nombreServicio,
                  kilometraje: 0,
                  tarifaK: 0,
                  subtotal: 0,
                  iva: 16,
                  porcIva: 0,
                  porcZPeligrosa: 0,
                  porcNComercial: 0,
                  porcSobrepeso: 0,
                  porcSusceptible: 0,
                  aumento: 0,
                  porcAumento: 0,
                  porcVolMerc: 0,
                  totalServicio: 0,
                };
                if (
                  this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                  this.confirmarServices.push(agrega);
                  this.confirmarServices3.push(agrega);
                }
              }
              this.sumaBoton();
            }).catch((error) => {
              console.log(error);
            });
        } else {
          let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
          let indice2 = this.confirmarServices3.map((busqueda) => busqueda.idService).indexOf(idServicio);

          this.confirmarServices.splice(indice, 1);
          this.confirmarServices3.splice(indice2, 1);
        }
      } else {
        comprobar = true;

        if(this.termodalidad == 'LTL'){
          subtotal = parseFloat(this.totalPrecioVolumen)
          porcIva = subtotal * (iva / 100);
        }else{
          subtotal = this.tarifaKilometro * this.kilometraje;
          porcIva = subtotal * (iva / 100);
        }
        
        if (this.clasificacionZonaO == "PELIGROSA" || this.clasificacionZonaD == "PELIGROSA") {
          //porcZPeligrosa = subtotal * (this.porcZonaPelig / 100);
        }

        if (this.clasificacionZonaD == "NO COMERCIAL") {
          //porcNComercial = subtotal * (this.porcZonaNoCom / 100);
        }

        if (this.isSusceptibleRobo) {
          //porcSusceptible = subtotal * (this.porcentajeRobo / 100);
        }

        if (this.valorTotalLTL > 0) {
          porcVolMerc = this.valorTotalLTL;
        }

        if (this.sobrePeso) {
          //porcSobrepeso = subtotal * (this.porcSobrePeso / 100);
        }

        if (this.definePesoXVol) {

          //precioVolumenTot = parseFloat(this.totalPrecioVolumen)

          /*let resVolCub = this.totalMetcub * 3.333;
          console.log(this.totalMetcub, 'this.totalMetcub')
          console.log(resVolCub, 'resVolCub')

          if (resVolCub > this.totalKilo) {
            console.log(this.totalKilo, 'this.totalKilo')
            this.volDef = resVolCub * this.precioXMetCub;
            console.log(this.precioXMetCub, 'this.precioXMetCub')
            console.log(resVolCub, 'this.volDef')
            console.log(this.volDef, 'this.volDef')
          } else {
            this.pesoDef = this.totalKilo * this.precioXKiloCub;
            console.log(this.precioXKiloCub, 'this.precioXKiloCub')
            console.log(this.totalKilo, 'this.totalKilo')
            console.log(this.pesoDef, 'this.pesoDef')
          }*/
          
        }

        let agrega = {
          ajusteVenta: false,
          idService: idServicio,
          nombreSer: nombreServicio,
          kilometraje: this.kilometraje,
          tarifaK: this.tarifaKilometro,
          subtotal: subtotal,
          iva: iva,
          porcIva: porcIva,
          porcZPeligrosa: porcZPeligrosa,
          porcNComercial: porcNComercial,
          porcSobrepeso: porcSobrepeso,
          porcSusceptible: porcSusceptible,
          porcVolMerc: porcVolMerc,
          aumento: 0,
          porcAumento: 0,
          totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible + porcVolMerc + precioVolumenTot,
        };
        let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
        this.confirmarServices.splice(indice, 1);

        if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
          this.confirmarServices.push(agrega);
        }
      }
      this.sumaBoton();
    },

    getServicios() {
      axios.get(`services/`).then((response) => {
        this.services = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },

    getEmbalaje() {
      axios.get(`embalajes/`).then((response) => {
        this.embalajes = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },

    obtenerZona(cpO, cpD) {
      let v1 = cpO;
      let v2 = cpD;

      if (v1 != "" && v2 != "") {
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
        })
          .then((response) => {
            if (response.data.origen.length > 0) {
              this.clasificacionZonaO = response.data.origen[0].clasificacion;
            } else {
              this.clasificacionZonaO = "";
            }

            if (response.data.destino.length > 0) {
              this.clasificacionZonaD = response.data.destino[0].clasificacion;
            } else {
              this.clasificacionZonaD = "";
            }

            if (
              this.clasificacionZonaO == "COMERCIAL" &&
              this.clasificacionZonaD == "COMERCIAL"
            ) {
              this.resClasificaZona = "COMERCIAL";
              this.notColorZona = "success";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>Comercial</b>.";
            } else if (
              this.clasificacionZonaO == "NO COMERCIAL" &&
              this.clasificacionZonaD == "NO COMERCIAL"
            ) {
              this.resClasificaZona = "NO COMERCIAL";
              this.notColorZona = "warning";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.";
            } else if (
              this.clasificacionZonaO == "PELIGROSA" &&
              this.clasificacionZonaD == "PELIGROSA"
            ) {
              this.resClasificaZona = "PELIGROSA";
              this.notColorZona = "danger";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.";
            } else if (
              (this.clasificacionZonaO == "COMERCIAL" &&
                this.clasificacionZonaD == "NO COMERCIAL") ||
              (this.clasificacionZonaO == "NO COMERCIAL" &&
                this.clasificacionZonaD == "COMERCIAL")
            ) {
              this.resClasificaZona = "NO COMERCIAL";
              this.notColorZona = "warning";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.";
            } else if (
              (this.clasificacionZonaO == "COMERCIAL" &&
                this.clasificacionZonaD == "PELIGROSA") ||
              (this.clasificacionZonaO == "PELIGROSA" &&
                this.clasificacionZonaD == "COMERCIAL")
            ) {
              this.resClasificaZona = "PELIGROSA";
              this.notColorZona = "danger";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.";
            } else if (
              (this.clasificacionZonaO == "NO COMERCIAL" &&
                this.clasificacionZonaD == "PELIGROSA") ||
              (this.clasificacionZonaO == "PELIGROSA" &&
                this.clasificacionZonaD == "NO COMERCIAL")
            ) {
              this.resClasificaZona = "PELIGROSA";
              this.notColorZona = "danger";
              this.notTextoZona =
                "Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.";
            } else if (
              (this.clasificacionZonaO == "COMERCIAL" &&
                this.clasificacionZonaD == "") ||
              (this.clasificacionZonaO == "" &&
                this.clasificacionZonaD == "COMERCIAL")
            ) {
              this.resClasificaZona = "NO ZONA";
              this.notColorZona = "primary";
              this.notTextoZona =
                "No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.";
            } else if (
              (this.clasificacionZonaO == "NO COMERCIAL" &&
                this.clasificacionZonaD == "") ||
              (this.clasificacionZonaO == "" &&
                this.clasificacionZonaD == "NO COMERCIAL")
            ) {
              this.resClasificaZona = "NO ZONA";
              this.notColorZona = "primary";
              this.notTextoZona =
                "No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.";
            } else if (
              (this.clasificacionZonaO == "PELIGROSA" &&
                this.clasificacionZonaD == "") ||
              (this.clasificacionZonaO == "" &&
                this.clasificacionZonaD == "PELIGROSA")
            ) {
              this.resClasificaZona = "NO ZONA";
              this.notColorZona = "primary";
              this.notTextoZona =
                "No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.";
            } else if (
              (this.clasificacionZonaO == "" &&
                this.clasificacionZonaD == "") ||
              (this.clasificacionZonaO == "" && this.clasificacionZonaD == "")
            ) {
              this.resClasificaZona = "NO ZONA";
              this.notColorZona = "primary";
              this.notTextoZona =
                "No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    showOpcion(valor) {
      this.opcion = 0;

      let val = valor;

      if (val == 1) {
        this.tipoOpcion = "Maritimo";
        this.fondoBusqueda = "primary";
        this.fondoEtiquetas = "primary";
        this.opcion = 1;

        this.$refs.uno.style.background = "#3bafda";
        this.$refs.fondoB1.style.background = "#3bafda";
        this.$refs.fondoB1.style.color = "#ffffff";
        this.$refs.textB1.style.color = "#ffffff";

        this.$refs.dos.style.background = "#ffffff";
        this.$refs.fondoB2.style.background = "#ffffff";
        this.$refs.fondoB2.style.color = "#1abc9c";
        this.$refs.textB2.style.color = "#9fb1c1";

        this.$refs.tres.style.background = "#ffffff";
        this.$refs.fondoB3.style.background = "#ffffff";
        this.$refs.fondoB3.style.color = "#37cde6";
        this.$refs.textB3.style.color = "#9fb1c1";
      } else if (val == 2) {
        this.tipoOpcion = "Terrestre";
        this.fondoBusqueda = "success";
        this.fondoEtiquetas = "success";
        this.opcion = 2;

        this.terstatusdir1 = 1;
        this.action = 1;
        this.terMostrar = 1;
        this.terstatusdir1 = "true";
        this.modoEnvio = "Directo";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";

        this.$refs.uno.style.background = "#ffffff";
        this.$refs.fondoB1.style.background = "#ffffff";
        this.$refs.fondoB1.style.color = "#3bafda";
        this.$refs.textB1.style.color = "#9fb1c1";

        this.$refs.dos.style.background = "#1abc9c";
        this.$refs.fondoB2.style.background = "#1abc9c";
        this.$refs.fondoB2.style.color = "#ffffff";
        this.$refs.textB2.style.color = "#ffffff";

        this.$refs.tres.style.background = "#ffffff";
        this.$refs.fondoB3.style.background = "#ffffff";
        this.$refs.fondoB3.style.color = "#37cde6";
        this.$refs.textB3.style.color = "#9fb1c1";
      } else if (val == 3) {
        this.tipoOpcion = "Aereo";
        this.fondoBusqueda = "info";
        this.fondoEtiquetas = "info";
        this.opcion = 3;

        this.$refs.uno.style.background = "#ffffff";
        this.$refs.fondoB1.style.background = "#ffffff";
        this.$refs.fondoB1.style.color = "#3bafda";
        this.$refs.textB1.style.color = "#9fb1c1";

        this.$refs.dos.style.background = "#ffffff";
        this.$refs.fondoB2.style.background = "#ffffff";
        this.$refs.fondoB2.style.color = "#1abc9c";
        this.$refs.textB2.style.color = "#9fb1c1";

        this.$refs.tres.style.background = "#37cde6";
        this.$refs.fondoB3.style.background = "#37cde6";
        this.$refs.fondoB3.style.color = "#ffffff";
        this.$refs.textB3.style.color = "#ffffff";
      }

      /*if (val == 1) {
        this.fondoBusqueda = "primary";
        this.fondoEtiquetas = "primary";
        this.opcion = 2;
        this.tipoOpcion = "Maritimo";
        
        this.$refs.uno.style.color = '#ffffff';
        this.$refs.uno.style.background = '#3bafda';

        this.$refs.dos.style.color = '#1abc9c';
        this.$refs.dos.style.background = '#ffffff';

        this.$refs.tres.style.color = '#37cde6';
        this.$refs.tres.style.background = '#ffffff';

      } else if (val == 2) {
        this.fondoBusqueda = "success";
        this.fondoEtiquetas = "success";
        this.opcion = 2;
        this.tipoOpcion = "Terrestre";
        
        this.terstatusdir1 = 1
        this.action = 1;
        this.terMostrar = 1;
        this.terstatusdir1 = "true";
        this.modoEnvio = "Directo";
        this.terstatusmul = "false";
        this.terstatusdir2 = "false";
        this.terstatustras1 = "false";
        this.terstatusdir3 = "false";
        this.terstatustras2 = "false";

        this.$refs.uno.style.color = '#3bafda';
        this.$refs.uno.style.background = '#ffffff';

        this.$refs.dos.style.color = '#ffffff';
        this.$refs.dos.style.background = '#1abc9c';

        this.$refs.tres.style.color = '#37cde6';
        this.$refs.tres.style.background = '#ffffff';

      } else if (val == 3) {
        this.fondoBusqueda = "info";
        this.fondoEtiquetas = "info";
        this.opcion = 2;
        this.tipoOpcion = "Aereo";

        this.$refs.uno.style.color = '#3bafda';
        this.$refs.uno.style.background = '#ffffff';

        this.$refs.dos.style.color = '#1abc9c';
        this.$refs.dos.style.background = '#ffffff';

        this.$refs.tres.style.color = '#ffffff';
        this.$refs.tres.style.background = '#37cde6';
        
      }*/

      setTimeout(this.insertConsecutivo(), 5000);
    },

    selectNacional(terOperation, statusnac) {
      let validar = terOperation;
      let estado = statusnac;
      this.terMostrar = 0;
      //this.tercotizacion = 0;
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
      //this.tercotizacion = 0;
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
      //this.tercotizacion = 0;
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
      let col = this.cpRutaO.asentamiento;

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
          colonia: col,
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
          colonia: col,
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
      let o;
      let d;

      let vpaisOrigen;
      let vcpOrigen;
      let vestadoOrigen;
      let vciudadOrigen;
      let vcoloniaOrigen;
      let vcalleOrigen = this.calleOrigen;
      let vnumExtOrigen = this.numExtOrigen;
      let vnumIntOrigen = this.numIntOrigen;

      let vpaisDestino;
      let vcpDestino;
      let vestadoDestino;
      let vciudadDestino;
      let vcoloniaDestino;
      let vcalleDestino = this.calleDestino;
      let vnumExtDestino = this.numExtDestino;
      let vnumIntDestino = this.numIntDestino;

      let vorigen = this.origen;
      let vdestino = this.destino;
      let vfecha = this.terfecha;
      let modalidad = this.termodalidad;
      let tipocarga = this.tertipocarga;

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

      for (o = 0; o < this.arrayOrigen.length; o++) {
        vpaisOrigen = this.arrayOrigen[o].paiso;
        vcpOrigen = this.arrayOrigen[o].cpo;
        vestadoOrigen = this.arrayOrigen[o].estadoo;
        vciudadOrigen = this.arrayOrigen[o].ciudado;
        vcoloniaOrigen = this.arrayOrigen[o].colonia;
      }

      for (d = 0; d < this.arrayDestino.length; d++) {
        vpaisDestino = this.arrayDestino[d].paisd;
        vcpDestino = this.arrayDestino[d].cpd;
        vestadoDestino = this.arrayDestino[d].estadod;
        vciudadDestino = this.arrayDestino[d].ciudadd;
        vcoloniaDestino = this.arrayDestino[d].colonia;
      }

      this.obtenerZona(vcpOrigen, vcpDestino);

      if (this.termodalidad == "FTL") {
        this.buscaUnidad();
        this.tertipocarga = "g";
      }

      if (this.opcion == 0) {
        Swal.fire({
          title: "Selecciona un tipo de Transporte",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.termodalidad == "") {
        Swal.fire({
          title: "Selecciona la modalidad",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.resClasificaZona != "NO ZONA") {
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

        if (vcalleOrigen == "" || vcalleOrigen == null) {
          Swal.fire({
            title: "Ingresa la calle del Origen",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (vnumExtOrigen == "" || vnumExtOrigen == null) {
          Swal.fire({
            title: "Ingresa el número exterior de Origen",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (vcalleDestino == "" || vcalleDestino == null) {
          Swal.fire({
            title: "Ingresa la calle de Destino",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        if (vnumExtDestino == "" || vnumExtDestino == null) {
          Swal.fire({
            title: "Ingresa el número de exterior de Destino",
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

        if (this.termodalidad == "LTL" || this.termodalidad == "FTL") {
          if (modalidad == "" || modalidad == null || modalidad == 0) {
            Swal.fire({
              title: "Selecciona Tipo de Operacion",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }

          /*if (tipocarga == "" || tipocarga == null || tipocarga == 0) {
            Swal.fire({
              title: "Selecciona Tipo de Carga",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }*/

          if (this.termodalidad == "LTL") {
            //if (embalaje == "" || embalaje == null) {
            if (this.agregarMercancias.length == 0) {
              Swal.fire({
                title: "Debes agregar al menos una mercancia.",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              return false;
            }
          }

          /*if (estibable == "" || estibable == null) {
            Swal.fire({
              title: "Campo Estibable no Seleccionado",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }*/

          if (clasifica == "" || clasifica == null) {
            Swal.fire({
              title: "Ingresa una clasificación",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }

          /*if (cantMerc == "" || cantMerc == null) {
            Swal.fire({
              title: "Ingresa la Cantidad",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }

          if (volMerc == 0 || volMerc == null) {
            Swal.fire({
              title: "Ingresa el Volúmen",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }

          if (pesTMerc == 0 || pesTMerc == null) {
            Swal.fire({
              title: "Ingresa el Peso",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }*/

          if (unidaMedidaMerc == "" || unidaMedidaMerc == null) {
            Swal.fire({
              title: "Selecciona la Unidad de Medida",
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
                title: "Ingresa los Grados",
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

          if (descripMerc == "" || descripMerc == null) {
            Swal.fire({
              title: "El campo descripción esta vacío",
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            return false;
          }
        }

        this.tercotizacion = val;

        let idServicio = 1;
        let nombreServicio = "FLETE NACIONAL";
        this.addServicios(idServicio, nombreServicio);

        this.getCoincidencia();

        if(this.termodalidad == 'LTL'){
          if (!this.requiereRecoleccion && !this.requiereEntrega) {
            this.$bvModal.show("recoleccion");
          }
        }
      } else {
        let msg,
          msg2 = "";

        if (this.clasificacionZonaO == "") {
          msg = "Origen";
          msg2 = "Carga de Mercancias";
        }
        if (this.clasificacionZonaD == "") {
          msg = "Destino";
          msg2 = "Recibir Mercancias";
        }

        Swal.fire({
          title: "El código postal de " + msg + " no esta disponible para " + msg2 + ".",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
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
          }).then((response) => {
            const results = response.data.map((result, index) => {
              return { ...result, index };
            });          
            resolve(results);
          }).catch((error) => {
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
      let indice;
      let comprobar = "";

      if (this.confirmarServices3.length > 0) {
        comprobar = document.getElementById(idEnvioado + "cheServ").checked;
        indice = this.confirmarServices3
          .map((busqueda) => busqueda.ids)
          .indexOf(idEnvioado);

        if (indice >= 0) {
          if (comprobar == false) {
            this.confirmarServices3.splice(indice, 1);
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
                  if (this.aumentoPorcentaje == 1) {
                    if (addVenta > 0) {
                      resprecio = this.trunc(parseFloat(resprecio), 2);
                      addVenta = parseFloat(addVenta) / 100;
                      addVenta = addVenta * parseFloat(resprecio);
                      this.precioVentas =
                        parseFloat(resprecio) + parseFloat(addVenta);

                      let agrega = {
                        ids: idEnvioado,
                        nombre: resnombre,
                        precio: this.precioVentas,
                        id: resid,
                      };
                      this.confirmarServices3.push(agrega);
                    }
                  } else if (this.aumentoPorcentaje == 2) {
                    if (addVenta > 0) {
                      if (addVenta > 0) {
                        resprecio = this.trunc(parseFloat(resprecio), 2);
                        addVenta = parseFloat(addVenta) / 100;
                        addVenta = addVenta * parseFloat(resprecio);
                        addXpress = parseFloat(addXpress) / 100;
                        addXpress = addXpress * parseFloat(resprecio);
                        this.precioExpres =
                          parseFloat(resprecio) +
                          parseFloat(addVenta) +
                          parseFloat(addXpress);
                        let agregado = {
                          ids: idEnvioado,
                          nombre: resnombre,
                          precio: this.precioExpres,
                          id: resid,
                        };
                        this.confirmarServices3.push(agregado);
                      }
                    }
                  }
                } else {
                  let agrega = {
                    ids: idEnvioado,
                    nombre: nombreEnviado,
                    precio: 0,
                    id: 0,
                  };
                  this.confirmarServices3.push(agrega);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        let agrega = {
          ids: this.idFleteNacional,
          nombre: "FLETE NACIONAL",
          precio: 0,
          id: 0,
        };
        this.confirmarServices3.push(agrega);
      }
    },

    sumaBoton() {
      let aumentos = 0;
      this.priceSale = 0;

      for (let i = 0; i < this.confirmarServices.length; i++) {
        if (this.confirmarServices[i].totalServicio > 0) {
          this.priceSale =
            this.priceSale + this.confirmarServices[i].totalServicio;
        }
        if (this.confirmarServices[i].porcAumento > 0) {
          aumentos = aumentos + this.confirmarServices[i].porcAumento;
        }
      }

      this.priceSale = this.priceSale + aumentos;

      if (this.divisa == 1) {
        this.priceSale = this.priceSale / this.valorDolar;
      }
      this.Total();
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

      this.Total();
    },

    hideResumen(valor) {
      this.$bvModal.hide("resumen-modal");
    },

    hideResumen2() {
      this.$bvModal.hide("resumen-modal");
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
        nprecio = this.confirmarServices3[a].subtotal;

        if (nprecio == 0) {
          nid = this.confirmarServices3[a].idService;
          nservice = this.confirmarServices3[a].nombreSer;
          if (nservice != "FLETE NACIONAL") {
            let tipoServicio = 10;

            axios({
              method: "post",
              url: "servicioVenta/",
              data: {
                idCotizacion: this.idCotizacion,
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
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
    },

    Save2() {
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

      this.Save3();
    },

    Save3() {
      let idCotiza = this.idCotizacion;

      if (idCotiza == 0) {
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

        let servicePrice = 0;
        let sumaInicial = 0;

        for (let i = 0; i < this.confirmarServices.length; i++) {
          servicePrice = this.confirmarServices[i].totalServicio;
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
              this.getFolioCon();

              if (this.confirmarServices3.length > 0) {
                this.estatusCotiza = 4;
              }
              if (this.termodalidad == "LTL") {
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
                    idVenta: 1,
                    estatus: this.estatusCotiza, // Sin Completar
                    diasTransito: this.diasTransito,
                    nametipoUnidad: this.nombreTipoUnidad,
                    folioConsecutivo:
                      this.controlConse +
                      this.fechaConsecutivo +
                      String(this.numConsecutivo + 1).padStart(6, "0"),
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
                    unidadPeso: this.unidaPesoMerc,
                    largo: this.largoMerc,
                    alto: this.altoMerc,
                    ancho: this.anchoMerc,
                    descrip: this.descripMerc,
                    zona: this.resClasificaZona,
                    valorDeclaradoMerc: this.valorMercancia,
                    usuarioGenera: this.username,
                  },
                  auth: {
                    username: "admin",
                    password: "123",
                  },
                })
                  .then((response) => {
                    this.estadoCotiza = true;
                    //this.isActive = true;
                    this.idCotizacion = response.data.id;
                    this.getFolios();
                    this.agregaServices();
                    this.updateConsecutivo();
                    this.addContact();

                    if (this.confirmarServices3.length > 0) {
                      this.enviaCorreoPricing(
                        this.idCotizacion,
                        this.controlConse +
                          this.fechaConsecutivo +
                          String(this.numConsecutivo + 1).padStart(6, "0")
                      );
                    }
                    Swal.fire({
                      title: "Cotizacion Generada correctamente",
                      text: "",
                      icon: "success",
                      confirmButtonText: "Cerrar",
                    });
                  })
                  .catch((error) => {
                    Swal.fire({
                      title: "Cotizacion Generada correctamente",
                      text:
                        "Se detecto un error mientras se genraba la cotizacion: " +
                        error,
                      icon: "success",
                      confirmButtonText: "Cerrar",
                    });
                  });
              } else if (this.termodalidad == "FTL" || this.termodalidad == "FCL") {
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
                    idVenta: 1,
                    estatus: this.estatusCotiza, // Sin Completar
                    diasTransito: this.diasTransito,
                    nametipoUnidad: this.nombreTipoUnidad,
                    folioConsecutivo:
                      this.controlConse +
                      this.fechaConsecutivo +
                      String(this.numConsecutivo + 1).padStart(6, "0"),
                    estibable: this.terestibable,
                    gradosRef: this.gradosMerc,
                    tipoUnidadRef: this.tipoUnidadRef,
                    unHaz: this.unMerc,
                    classHaz: this.classMerc,
                    embalaje: this.terembalaje,
                    idclasificacion: this.idclasifica,
                    volumen: this.volumenMax,
                    pesoTotal: this.pesTMerc,
                    cantidad: this.cantMerc,
                    unidadMedida: this.unidaMedidaMerc,
                    descrip: this.descripMerc,
                    valorDeclaradoMerc: this.valorMercancia,
                    zona: this.resClasificaZona,
                    usuarioGenera: this.username,
                  },
                  auth: {
                    username: "admin",
                    password: "123",
                  },
                })
                  .then((response) => {
                    this.estadoCotiza = true;
                    //this.isActive = true;
                    this.idCotizacion = response.data.id;
                    this.getFolios();
                    this.agregaServices();
                    this.updateConsecutivo();
                    this.addContact();

                    if (this.confirmarServices3.length > 0) {
                      this.enviaCorreoPricing(
                        this.idCotizacion,
                        this.controlConse +
                          this.fechaConsecutivo +
                          String(this.numConsecutivo + 1).padStart(6, "0")
                      );
                    }

                    Swal.fire({
                      title: "Cotizacion Generada correctamente",
                      text: "",
                      icon: "success",
                      confirmButtonText: "Cerrar",
                    });
                  })
                  .catch((error) => {
                    Swal.fire({
                      title: "Cotizacion Generada correctamente",
                      text:
                        "Se detecto un error mientras se genraba la cotizacion: " +
                        error,
                      icon: "success",
                      confirmButtonText: "Cerrar",
                    });
                  });
              }
            } else {
              Swal.fire({
                title: "Cotización cancelada",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
            }
          });
      } else {
        Swal.fire({
          title:
            "Ya existe una cotización con la misma información, verificalo por favor.",
          text: "",
          icon: "info",
          confirmButtonText: "Cerrar",
        });
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
        .then((response) => {})
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

        let ajusteVenta;
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

        let kilometraje = 0;
        let tarifaKilometraje = 0;
        let porcIva = 0;
        let porcZPeligrosa = 0;
        let porcNComercial = 0;
        let porcSobrepeso = 0;
        let porcSusceptible = 0;
        let totalServicio = 0;

        for (m = 0; m < this.confirmarServices.length; m++) {
          // Inicia el for de llenado
          serviceIds = this.confirmarServices[m].idService;
          serviceNombre = this.confirmarServices[m].nombreSer;
          subtotal = this.confirmarServices[m].subtotal;
          iva = this.confirmarServices[m].iva;
          ajusteVenta = this.confirmarServices[m].ajusteVenta;

          kilometraje = this.confirmarServices[m].kilometraje;
          tarifaKilometraje = this.confirmarServices[m].tarifaK;
          porcIva = this.confirmarServices[m].porcIva;
          porcZPeligrosa = this.confirmarServices[m].porcZPeligrosa;
          porcNComercial = this.confirmarServices[m].porcNComercial;
          porcSobrepeso = this.confirmarServices[m].porcSobrepeso;
          porcSusceptible = this.confirmarServices[m].porcSusceptible;
          totalServicio = this.confirmarServices[m].totalServicio;

          axios({
            method: "post",
            url: "servicioAgregados/",
            data: {
              idcotizacion: this.idCotizacion,
              idService: serviceIds,
              nameService: serviceNombre,
              priceService: servicePrice,
              divisa: this.divisa,
              ajusteVenta: ajusteVenta,
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

              kilometraje: kilometraje.toFixed(2),
              tarifaKilometraje: tarifaKilometraje.toFixed(2),
              porcIva: porcIva.toFixed(2),
              porcZPeligrosa: porcZPeligrosa.toFixed(2),
              porcNComercial: porcNComercial.toFixed(2),
              porcSobrepeso: porcSobrepeso.toFixed(2),
              porcSusceptible: porcSusceptible.toFixed(2),
              totalServicio: totalServicio.toFixed(2),
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              if (response.data.nameService == "FLETE NACIONAL") {
                this.idNuevoServ = response.data.id;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (this.confirmarServices3.length > 0) {
          this.addOther();
          //this.enviaCorreoPricing(this.idCotizacion,this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, '0'));
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
            .then((response) => {})
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
      let porcentaje = document.getElementById(
        valor2 + "escondeImpuesto"
      ).value;
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
        } else {
          this.restauraExtra(valor2);
        }

        this.arrayOcultar = this.arrayOcultar + obtenido;

        let index_service = this.confirmarServices.findIndex(
          (x) => x.idService === valor2
        );
        this.confirmarServices[index_service].ajusteVenta = true;
      } else if (porcentaje == 1 && total == 1) {
        document.getElementById(valor2 + "escondeImpuesto").value = 0;
        document.getElementById(valor2 + "ocultarSumaTotal").value = 0;

        document.getElementById(valor2 + "seleccionImpuesto").hidden = true;
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

        let index_service = this.confirmarServices.findIndex(
          (x) => x.idService === valor2
        );
        this.confirmarServices[index_service].ajusteVenta = false;
      }
    },

    sumaImpuesto(event, id) {
      //this.confirmarServices5 = []

      let ids = id;
      let porcentaje = 0;

      let nombre = "";
      let subtotal = 0;
      let porcAumento = 0;
      let nuevoTotal = 0;

      let comprobar = false;

      porcentaje = parseFloat(event.target.value);
      if (porcentaje > 0) {
      }
      let index_service = this.confirmarServices.findIndex(
        (x) => x.idService === ids
      );
      ids = parseInt(this.confirmarServices[index_service].idService);
      nombre = this.confirmarServices[index_service].nombreSer;
      subtotal = this.confirmarServices[index_service].subtotal;

      porcAumento = subtotal * (porcentaje / 100);

      for (let i = 0; i < this.confirmarServices.length; i++) {
        this.confirmarServices2.push(this.confirmarServices[i]); //SE RESPALDA LA INFORMACION DE confirmarServices

        if (this.confirmarServices[i].idService == ids) {
          let agregado = {
            ajusteVenta: this.confirmarServices[i].ajusteVenta,
            idService: this.confirmarServices[i].idService,
            nombreSer: this.confirmarServices[i].nombreSer,
            kilometraje: this.confirmarServices[i].kilometraje,
            tarifaK: this.confirmarServices[i].tarifaK,
            subtotal: this.confirmarServices[i].subtotal,
            iva: this.confirmarServices[i].iva,
            porcIva: this.confirmarServices[i].porcIva,
            porcZPeligrosa: this.confirmarServices[i].porcZPeligrosa,
            porcNComercial: this.confirmarServices[i].porcNComercial,
            porcSobrepeso: this.confirmarServices[i].porcSobrepeso,
            porcSusceptible: this.confirmarServices[i].porcSusceptible,
            aumento: porcentaje,
            porcAumento: porcAumento,
            totalServicio: this.confirmarServices[i].totalServicio,
          };
          this.arrayResp.push(agregado);
        } else {
          this.arrayResp.push(this.confirmarServices[i]);
        }
      }

      this.confirmarServices = [];

      this.confirmarServices = this.arrayResp;

      this.arrayResp = [];

      let precioFinal = subtotal + porcAumento;
      let precioInicial = subtotal;

      if (this.divisa == 2) {
        document.getElementById(ids + "sumaTotal").value = precioFinal;
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      } else {
        precioFinal = precioFinal / this.valorDolar;
        precioFinal = this.trunc(precioFinal, 2);
        document.getElementById(ids + "sumaTotal").value = precioFinal;

        precioInicial = precioInicial / this.valorDolar;
        precioInicial = this.trunc(precioInicial, 2);
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      }

      this.Total();
    },

    restauraExtra(id) {
      let nuevoTotal = 0;

      for (let i = 0; i < this.confirmarServices.length; i++) {
        if (this.confirmarServices[i].idService == id) {
          let agregado = {
            ajusteVenta: false,
            idService: this.confirmarServices[i].idService,
            nombreSer: this.confirmarServices[i].nombreSer,
            kilometraje: this.confirmarServices[i].kilometraje,
            tarifaK: this.confirmarServices[i].tarifaK,
            subtotal: this.confirmarServices[i].subtotal,
            iva: this.confirmarServices[i].iva,
            porcIva: this.confirmarServices[i].porcIva,
            porcZPeligrosa: this.confirmarServices[i].porcZPeligrosa,
            porcNComercial: this.confirmarServices[i].porcNComercial,
            porcSobrepeso: this.confirmarServices[i].porcSobrepeso,
            porcSusceptible: this.confirmarServices[i].porcSusceptible,
            aumento: 0,
            porcAumento: 0,
            totalServicio: this.confirmarServices[i].totalServicio,
          };

          this.arrayResp.push(agregado);
        } else {
          this.arrayResp.push(this.confirmarServices[i]);
        }
      }

      this.confirmarServices = [];

      this.confirmarServices = this.arrayResp;

      this.arrayResp = [];
      this.sumaBoton();
    },

    sumaFinal() {
      let i;

      let vid = 0;
      let agregado = 0;
      this.totalSugerido = 0;
      let comprobar;

      for (i = 0; i < this.confirmarServices.length; i++) {
        if (this.confirmarServices[i].subtotal > 0) {
          vid = this.confirmarServices[i].idService;

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

    selectDivisa(valor) {
      if (valor == 1) {
        // USD Formula mxn/dolar
        this.hideResumen();
        this.divisa = 2;

        this.sumaBoton();
        this.$bvModal.show("resumen-modal");
      }

      if (valor == 2) {
        // MXN Formula dolar*mxn
        this.hideResumen();
        this.divisa = 1;

        this.sumaBoton();

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
              })
                .then((response) => {
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
                  ventaXpress =
                    parseFloat(resprecio) +
                    parseFloat(addVenta) +
                    parseFloat(addXpress);
                  this.confirmarServices3[j].precio = ventaXpress;
                })
                .catch((error) => {
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
      })
        .then((response) => {})
        .catch((error) => {
          console.log("err" + error);
        });
    },

    enviaCorreoPricing(idCotiza, folioCons) {
      axios({
        method: "post",
        url: "api/v1/sendEmailNuevoServicio/",
        data: {
          idcotizacion: idCotiza,
          folio: folioCons,
        },
      })
        .then((response) => {})
        .catch((error) => {
          console.log("err" + error);
        });
    },

    realizaAjuste() {
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
        comprobar = document.getElementById(
          this.confirmarServices[i].ids + "check"
        ).checked;
        if (comprobar) {
          if (this.confirmarServices[i].porcentajeExtra > 0) {
            iva = parseFloat(this.confirmarServices[i].iva); //16

            /* INICIA CALCULO PORCENTAJE EXTRA */

            addVenta = parseFloat(this.confirmarServices[i].adVenta); //10
            addXpress = parseFloat(this.confirmarServices[i].adXpress); //10
            porcExtra = parseFloat(this.confirmarServices[i].porc); //0

            ajustePorcentOpt = addVenta + porcExtra; // 2 + 10 = 12
            ajustePorcentExp = addXpress + porcExtra; // 2 + 10 = 12

            /* FIN CALCULO PORCENTAJE EXTRA */

            /* INICIO CALCULO PRECIO BASE SIN IVA CON NUEVO PORCENTAJE */

            precioBaseSinIvaOpt =
              parseFloat(this.confirmarServices[i].subtotal) +
              (ajustePorcentOpt / 100) *
                parseFloat(this.confirmarServices[i].subtotal); // 2000 + ((12 / 100) * 2000) = 2240

            porcIvaOptiomo = precioBaseSinIvaOpt * (iva / 100); // 2240 * (10 / 100) = 358.40

            this.precioVentas =
              parseFloat(precioBaseSinIvaOpt) + parseFloat(porcIvaOptiomo); //2320 +  232 = 2552

            total =
              parseFloat(this.confirmarServices[i].subtotal) +
              parseFloat(porcIvaOptiomo);

            let monedaop =
              parseFloat(this.precioVentas) / parseFloat(this.valorDolar); // 2552 / 19.8532 = 128.5435093586928
            monedaop = this.trunc(monedaop);

            /*------------------------EXPRESS------------------------*/

            addXpress = parseFloat(addXpress) / 100; // 10 / 100 = 0.10
            addXpress = addXpress * parseFloat(resprecio); // 0.10 * 2320 = 232
            precioBaseSinIvaExp =
              parseFloat(precioBaseSinIvaOpt) + parseFloat(addXpress);
            this.precioExpres =
              parseFloat(resprecio) +
              parseFloat(addVenta) +
              parseFloat(addXpress); // 2320 + 232 + 232 = 2784
            let monedaxp =
              parseFloat(this.precioExpres) / parseFloat(this.valorDolar); // 2784 / 19.8532 = 140.2292829367558
            monedaxp = this.trunc(monedaxp);

            /* FIN CALCULO PRECIO BASE SIN IVA CON NUEVO PORCENTAJE */

            let agregado = {
              ids: this.confirmarServices[i].ids,
              nombre: this.confirmarServices[i].nombre,
              precio: this.precioVentas,
              id: this.confirmarServices[i].id,
              express: this.precioExpres /**/,
              monedaopt: monedaop /**/,
              monedaxpr: monedaxp /**/,
              optimoOriginal: this.precioVentas,
              expressOriginal: this.precioExpres /**/,
              iva: iva,
              porcIvaOptiomo: porcIvaOptiomo,
              porcIvaExpress: this.ivaExpress /**/,
              ret: this.confirmarServices[i].ret,
              baseVenta: precioBaseSinIvaOpt,
              subtotal: this.confirmarServices[i].subtotal,
              total: total,
              baseVentaOpt: precioBaseSinIvaOpt,
              baseVentaExp: precioBaseSinIvaExp /**/,
              adXpress: addXpress,
              adVenta: addVenta,
              porcentajeExtra: porcExtra,
            };
          } else {
            this.arrayResp.push(this.confirmarServices[i]);
          }
        } else {
          this.arrayResp.push(this.confirmarServices[i]);
        }
      }
    },

    Total() {
      this.totalIvaGlobal = 0;
      this.totalSubtotalGlobal = 0;
      this.totalRetencionGlobal = 0;
      this.totalZonaPeligrosa = 0;
      this.totalZonaNoComercial = 0;
      this.totalSobrepesoGlobal = 0;
      this.totalRobosGlobal = 0;
      this.totalGlobalServicio = 0;
      this.totalGlobal = 0;
      this.totalVolMercancias = 0;
      let aumentos = 0;

      if (this.confirmarServices.length > 0) {
        for (let i = 0; i < this.confirmarServices.length; i++) {
          if (this.confirmarServices[i].subtotal > 0) {
            aumentos = aumentos + this.confirmarServices[i].porcAumento;

            this.totalIvaGlobal = this.totalIvaGlobal + this.confirmarServices[i].porcIva;
            this.totalSubtotalGlobal = this.totalSubtotalGlobal + this.confirmarServices[i].subtotal + aumentos;
            this.totalZonaPeligrosa = this.totalZonaPeligrosa + this.confirmarServices[i].porcZPeligrosa;
            this.totalZonaNoComercial = this.totalZonaNoComercial + this.confirmarServices[i].porcNComercial;
            this.totalSobrepesoGlobal = this.totalSobrepesoGlobal + this.confirmarServices[i].porcSobrepeso;
            this.totalVolMercancias = this.totalVolMercancias + this.confirmarServices[i].porcVolMerc;
            this.totalRobosGlobal = this.totalRobosGlobal + this.confirmarServices[i].porcSusceptible;
            this.totalGlobalServicio = this.totalGlobalServicio + this.confirmarServices[i].totalGlobalServicio;
            this.totalGlobal = this.totalGlobal + this.confirmarServices[i].totalServicio + aumentos;
          }
        }

        if (this.divisa == 1) {
          this.totalIvaGlobal = this.totalIvaGlobal / this.valorDolar;
          this.totalSubtotalGlobal = this.totalSubtotalGlobal / this.valorDolar;
          this.totalZonaPeligrosa = this.totalZonaPeligrosa / this.valorDolar;
          this.totalZonaNoComercial = this.totalZonaNoComercial / this.valorDolar;
          this.totalVolMercancias = this.totalVolMercancias / this.valorDolar;
          this.totalSobrepesoGlobal = this.totalSobrepesoGlobal / this.valorDolar;
          this.totalRobosGlobal = this.totalRobosGlobal / this.valorDolar;
          this.totalGlobalServicio = this.totalGlobal / this.valorDolar;
          this.totalGlobal = this.totalGlobal / this.valorDolar;
        }
      }
    },

    buscaUnidad() {
      let datoUsr = parseFloat(this.volumenMax);
      let rangoInicial = 0;
      let res = 0;
      let idUnidad = 0;

      for (let i = 0; i < this.units.length; i++) {
        if (datoUsr >= rangoInicial && datoUsr <= parseFloat(this.units[i].capacidad_vol)) {
          idUnidad = this.units[i].id;
          this.nomUnidadModalidad = this.units[i].name;
          this.nombreTipoUnidad = this.units[i].name;
          break;
        } else {
          rangoInicial = parseFloat(this.units[i].capacidad_vol) + 0.01;
        }
      }
      this.tipoUnidad = idUnidad;
    },

    buscaUnidadLTL() {

      this.tipoUnidad = 0
      let idUnidad = 0;

      for (let i = 0; i < this.units.length; i++) {
        let volTotUnit = parseFloat(this.units[i].capacidad_vol)
        let canTotUnit = parseFloat(this.units[i].capacidadMaxima)
        let pesTotUnit = parseFloat(this.units[i].peso_bruto_total)
        let lonTotUnit = parseFloat(this.units[i].long) //Largo
        let widTotUnit = parseFloat(this.units[i].width) //Ancho
        let higTotUnit = parseFloat(this.units[i].high) //Alto
        
        if(this.tipoUnidad == 0){
          for (let j = 0; j < this.agregarMercancias.length; j++) {
            let volTotMerc = parseFloat(this.agregarMercancias[j].volumenTotal)
            let canTotMerc = parseFloat(this.agregarMercancias[j].cantidad)
            let pesTotMerc = parseFloat(this.agregarMercancias[j].pesoTotal)
            let lonTotMerc = parseFloat(this.agregarMercancias[j].largo) //Largo
            let widTotMerc = parseFloat(this.agregarMercancias[j].ancho) //Ancho
            let higTotMerc = parseFloat(this.agregarMercancias[j].alto) //Alto

            let volTotMercTot = 0
            let canTotMercTot = 0
            let pesTotMercTot = 0
            let lonTotMercTot = 0
            let widTotMercTot = 0
            let higTotMercTot = 0
            for (let k = 0; k < this.agregarMercancias.length; k++) {
              volTotMercTot = volTotMercTot + parseFloat(this.agregarMercancias[k].volumenTotal)
              canTotMercTot = canTotMercTot + parseFloat(this.agregarMercancias[k].cantidad)
              pesTotMercTot = pesTotMercTot + parseFloat(this.agregarMercancias[k].pesoTotal)
              lonTotMercTot = parseFloat(this.agregarMercancias[k].largo) //Largo
              widTotMercTot = parseFloat(this.agregarMercancias[k].ancho) //Ancho
              higTotMercTot = parseFloat(this.agregarMercancias[k].alto) //Alto
            }

            if(canTotMerc <= canTotUnit && canTotMercTot <= canTotUnit){
              //console.log(canTotMerc, '<=', canTotUnit, '&&', canTotMercTot, '<=', canTotUnit)
              if(volTotMerc <= volTotUnit && volTotMercTot <= volTotUnit){
                //console.log(volTotMerc, '<=', volTotUnit, '&&', volTotMercTot, '<=', volTotUnit)
                if(pesTotMerc <= pesTotUnit && pesTotMercTot <= pesTotUnit){
                  //console.log(pesTotMerc, '<=', pesTotUnit, '&&', pesTotMercTot, '<=', pesTotUnit)
                  if(lonTotMerc <= lonTotUnit && lonTotMercTot <= lonTotUnit){
                    //console.log(lonTotMerc, '<=', lonTotUnit, '&&', lonTotMercTot, '<=', lonTotUnit)
                    if(widTotMerc <= widTotUnit && widTotMercTot <= widTotUnit){
                      //console.log(widTotMerc, '<=', widTotUnit, '&&', widTotMercTot, '<=', widTotUnit)
                      if(higTotMerc <= higTotUnit && higTotMercTot <= higTotUnit){
                        //console.log(higTotMerc, '<=', higTotUnit, '&&', higTotMercTot, '<=', higTotUnit)
                        this.tipoUnidad = parseInt(this.units[i].id);
                        this.nomUnidadModalidad = this.units[i].name;
                        this.nombreTipoUnidad = this.units[i].name;
                        break;
                      }else{
                        break;
                      }
                    }else{
                      break;
                    }
                  }else{
                    break;
                  }
                }else{
                  break;
                }
              }else{
                break
              } 
            }else{
              break
            }
          }
        }else{
          break;
        }
      }
      
    },

    getMinMax() {
      let numeros = 0;
      numeros = this.units.map((dato) => dato.capacidad_vol);

      this.maxRange = Math.max(...numeros);
      this.minRange = Math.min(...numeros);
    },

    validaVolumen() {
      if (this.volumenMax < 0) {
        this.volumenMax = 0;
      }

      if (this.volumenMax > this.maxRange) {
        this.volumenMax = this.maxRange;
      }

      this.buscaUnidad();

      if (this.tercotizacion == 1) {
        this.generateCotizacion(1);
      }
    },

    validaPeso() {
      let cant = parseFloat(this.cantMerc);
      let peso = parseFloat(this.pesTMerc);

      if (peso < 0) {
        this.pesTMerc = 0;
      } else {
        this.pesoTotal = cant * peso;
      }
    },

    removeRanges() {
      window.getSelection().removeAllRanges();
    },

    cierraModal(idServ) {
      var indice = this.selectServices.indexOf(idServ);

      if (indice != -1) this.selectServices.splice(indice, 1);

      this.$bvModal.hide("valorDeclaradoMercancia");
    },

    validaValorMercancia(val) {
      if (val.target.value < 0) {
        this.valorMercancia = 0;
      }
    },

    agregaPaquetes() {
      let estibable = this.terestibable;
      let cant = parseFloat(this.cantMerc);
      let peso = parseFloat(this.pesTMerc);
      let pesoT = parseFloat(this.pesoTotal);
      let alto = parseFloat(this.altoMerc);
      let ancho = parseFloat(this.anchoMerc);
      let largo = parseFloat(this.largoMerc);
      let volumen = parseFloat(this.volMerc);
      let volumenTotal = parseFloat(this.volMercTot);
      let unidadM = this.unidaMedidaMerc;
      let embalaje = this.terDescEmbalaje.toUpperCase();
      let unidadP = this.unidaPesoMerc;

      if (cant == 0) {
        Swal.fire({
          title: "Ingresa una cantidad mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (largo == 0) {
        Swal.fire({
          title: "Ingresa un largo mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (ancho == 0) {
        Swal.fire({
          title: "Ingresa un ancho mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (alto == 0) {
        Swal.fire({
          title: "Ingresa un alto mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (peso == 0) {
        Swal.fire({
          title: "Ingresa un peso mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesoT == 0) {
        Swal.fire({
          title: "El peso calculado debe ser mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (volumen == 0) {
        Swal.fire({
          title: "El volumen calculado debe ser mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (unidadP == "") {
        return false;
      }

      if (estibable == "") {
        return false;
      }

      if (pesoT > this.unidadPesoBruto) {
        Swal.fire({
          title: "El peso supera el limite de carga",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (volumen > this.unidadCapacidad) {
        Swal.fire({
          title: "El volumen supera el limite de carga",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if(cant > this.unidadCapacidadMaxima){
        Swal.fire({
          title: "La cantidad de embalajes supera el limite permitido por la unidad.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }else {
        let idPaq = this.agregarMercancias.length + 1;
        let pesoVol = 0
        let pesoVolTot = 0

        if(estibable == 'si'){
          pesoVol = largo * alto * ancho * this.factorConversionEstiba
          pesoVolTot = pesoVol * cantidad
          this.cifraOriginal = pesoVolTot
          this.redondearCifra();
          this.leyendaPeso = '(Peso a Facturar)'
          this.leyendaVolumen = ''
        }else if(estibable == 'no'){
          pesoVol = ((largo * alto) / 1.9) * this.factorConversionNoEstiba
          pesoVolTot = pesoVol * cantidad
          this.cifraOriginal = pesoVolTot
          this.redondearCifra();
          this.leyendaVolumen = '(Volumen a Facturar)'
          this.leyendaPeso = ''

        }


        let agrega = {
          idPaq: idPaq,
          cantidad: cant,
          peso: peso,
          pesoTotal: pesoT,
          alto: alto,
          ancho: ancho,
          largo: largo,
          medida: unidadM,
          embalaje: embalaje,
          upeso: unidadP,
          volumen: volumen,
          volumenTotal: volumenTotal,
          estibable: estibable,
          pesoVolumetrico: pesoVol,
          pesoVolumetricoTotal: pesoVolTot,
        };

        this.agregarMercancias.push(agrega);

        if (this.agregarMercancias.length > 0) {
          this.validaDatosMercancias(idPaq);
        }

        this.cantMerc = 0;
        this.pesTMerc = 0;
        this.pesoTotal = 0;
        this.altoMerc = 0;
        this.anchoMerc = 0;
        this.largoMerc = 0;
        this.volMerc = 0;
        this.volMercTot = 0;
        this.unidaPesoMerc = "";
        this.terestibable = "";

        let totalKilos = 0;
        let totalPesoVolTot = 0;
        for (let i = 0; i < this.agregarMercancias.length; i++) {
          totalKilos = totalKilos + parseFloat(this.agregarMercancias[i].pesoTotal);
          console.log(totalKilos, 'totalKilos')
          totalPesoVolTot = totalVolumen + parseFloat(this.agregarMercancias[i].pesoVolumetricoTotal);
          console.log(totalPesoVolTot, 'totalPesoVolTot') 
        }

        this.totalPesoVolTot = totalPesoVolTot; 

        this.totalKilo = totalKilos; 

        this.definePesoXVol = true;

        if(this.termodalidad == 'LTL'){
          this.detectaUnidadLTL()
        }

        let idServicio = 1;
        let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
        this.confirmarServices.splice(indice, 1);

        let nombreServicio = "FLETE NACIONAL";
        this.addServicios(idServicio, nombreServicio);

      }
    },

    eliminaPaquete(idPaq) {
      let indice = this.agregarMercancias.map((busqueda) => busqueda.idPaq).indexOf(idPaq);
      this.agregarMercancias.splice(indice, 1);

      let totalKilos = 0;
      let totalVolumen = 0;
        
      for (let i = 0; i < this.agregarMercancias.length; i++) {
        totalKilos = totalKilos + parseFloat(this.agregarMercancias[i].pesoTotal);
        totalVolumen = totalVolumen + parseFloat(this.agregarMercancias[i].volumen);
      }

      this.totalMetcub = totalVolumen; //* this.precioXMetCub

      this.totalKilo = totalKilos; //* this.precioXKiloCub

      this.definePesoXVol = true;

      this.tercotizacion = 0

      let idServicio = 1;
      let indiceS = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
      this.confirmarServices.splice(indiceS, 1);

      if(this.agregarMercancias.length == 0){
        this.leyendaPeso = ''
      this.leyendaVolumen = ''
      }

      let nombreServicio = "FLETE NACIONAL";
      this.addServicios(idServicio, nombreServicio);
    },

    buscaDireccion(text) {
      let input = text;

      if (input.length >= 5) {
        axios({
          method: "post",
          url: "/api/v1/search-address/",
          data: {
            data: input,
          },
        }).then((response) => {
          this.dates_search_address = response.data;
        }).catch((error) => {
          console.log(error);
        });
      }
    },

    validaDatosMercancias(id) {
      let totalKilos = 0;
      let totalVolumen = 0;
      let totalCantidad = 0;

      if (this.agregarMercancias.length > 0) {
        for (let i = 0; i < this.agregarMercancias.length; i++) {
          totalKilos = totalKilos + parseFloat(this.agregarMercancias[i].pesoTotal);
          totalVolumen = totalVolumen + parseFloat(this.agregarMercancias[i].volumen);
          totalCantidad = totalCantidad + parseInt(this.agregarMercancias[i].cantidad)
        }

        if (totalKilos > this.unidadPesoBruto) {
          Swal.fire({
            title: "El peso total supera el limite de carga",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });

          const index = this.agregarMercancias.findIndex(
            (elemento) => elemento.idPaq === id
          );
          if (index !== -1) {
            this.agregarMercancias.splice(index, 1);
          }
          return false;
        }

        if (totalVolumen > this.unidadCapacidad) {
          Swal.fire({
            title: "El Volumen total supera el limite de carga",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });

          const index = this.agregarMercancias.findIndex(
            (elemento) => elemento.idPaq === id
          );
          if (index !== -1) {
            this.agregarMercancias.splice(index, 1);
          }

          return false;
        }

        if (totalCantidad > this.unidadCapacidadMaxima) {
          Swal.fire({
            title: "La cantidad total de embalajes supera el limite permitido por la unidad.",
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });

          const index = this.agregarMercancias.findIndex(
            (elemento) => elemento.idPaq === id
          );
          if (index !== -1) {
            this.agregarMercancias.splice(index, 1);
          }

          return false;
        }
      }
    },

    detallesMercancias() {
      let embalajes = [];
      let estibable = [];
      let cantidad = 0;
      let volumen = 0;
      let pesoTotal = 0;

      for (let i = 0; i < this.agregaPaquetes.length; i++) {
        console.log(this.agregaPaquetes[i]);
      }
    },

    rotarContenedor(event) {
      const contenedor = this.$el.querySelector('.contenedor');
      const mitadAncho = contenedor.offsetWidth / 2;
      const mitadAlto = contenedor.offsetHeight / 2;
      const rotarX = -(event.clientY - mitadAlto) / mitadAlto * 20;
      const rotarY = (event.clientX - mitadAncho) / mitadAncho * 20;

      contenedor.style.transform = `rotateX(${rotarX}deg) rotateY(${rotarY}deg)`;
    },

    validacionEspacioContenedor(){

      /* DATOS DE JSON ARRAY
        idPaq: idPaq,
        cantidad: cant,
        peso: peso,
        pesoTotal: pesoT,
        alto: alto,
        ancho: ancho,
        largo: largo,
        medida: unidadM,
        embalaje: embalaje,
        upeso: unidadP,
        volumen: volumen,
        estibable: estibable,
      */
      if(this.agregarMercancias.length > 0){
        let volumenTotal = this.unidadCapacidad;
        let pesoTotal = this.unidadPesoBruto;
        let metrosCuadradosTotal = this.unidadLong * this.unidadWidth
        let espaciosContenedor = this.unidadCapacidadMaxima

        let pesoPorPallet = pesoTotal / espaciosContenedor
        let volumenPorPallet = volumenTotal / espaciosContenedor
        let metrosCuadradosPorPallet = metrosCuadradosTotal / espaciosContenedor

        for (let i = 0; i < this.agregarMercancias.length; i++) {
          const cantidad = this.agregarMercancias[i].cantidad
          const peso = this.agregarMercancias[i].peso
          const largo = this.agregarMercancias[i].largo
          const alto = this.agregarMercancias[i].alto
          const ancho = this.agregarMercancias[i].ancho

          const volumen = largo * alto * ancho
          const metroCuadrado = largo * ancho
          const espaciosOcupados = 0
          const espaciosRestantes = espaciosContenedor

          if(cantidad == 1){
            const contador = 0;
            if(metroCuadrado > metrosCuadradosPorPallet){
              Swal.fire({
                title: "El espacio asignado para el embalaje 1 supera el espacio establecido, se ocuparan dos espacios.",
                text: "",
                icon: "info",
                confirmButtonText: "Cerrar",
              });

              while( metrosCuadradosPorPallet < metroCuadrado ){
                console.log( contador );
                contador++;
                console.log( 'Test' );
              }

            }
               
            }else{
              
            }
          
          
          /*if(cantidad > 1){
            
            for (let j = 0; j < cantidad; j++) {

              if(metroCuadrado > metrosCuadradosPorPallet){

              }else{
                
              }

              if(peso > pesoPorPallet){

              }else{
                if(volumen > volumenPorPallet){

                }else{
                  
                }
              }

              
            }
          }else{

          }*/
          //arrayContenedorMercancias

          const element = this.agregarMercancias[i];
          
        }

      }

    },

    detectaUnidadLTL(){

      let vol = 0;
      let cant = 0;
      let peso = 0;
        
      for (let i = 0; i < this.agregarMercancias.length; i++) {
        vol = vol + parseFloat(this.agregarMercancias[i].volumen);
        cant = cant + parseInt(this.agregarMercancias[i].cantidad);
        peso = peso + parseFloat(this.agregarMercancias[i].pesoTotal);
      }

    },

    agregaPaquetesLTL() {
      let estibable = this.terestibable;
      let cant = parseFloat(this.cantMerc);
      let peso = parseFloat(this.pesTMerc);
      let pesoT = parseFloat(this.pesoTotal);
      let alto = parseFloat(this.altoMerc);
      let ancho = parseFloat(this.anchoMerc);
      let largo = parseFloat(this.largoMerc);
      let volumen = parseFloat(this.volMerc);
      let volumenTotal = parseFloat(this.volMercTot);
      let unidadM = this.unidaMedidaMerc;
      let embalaje = this.terDescEmbalaje.toUpperCase();
      let unidadP = this.unidaPesoMerc;

      if (cant <= 0) {
        Swal.fire({
          title: "Ingresa una cantidad mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (largo <= 0) {
        Swal.fire({
          title: "Ingresa un largo mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (ancho <= 0) {
        Swal.fire({
          title: "Ingresa un ancho mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (alto <= 0) {
        Swal.fire({
          title: "Ingresa un alto mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (peso <= 0) {
        Swal.fire({
          title: "Ingresa un peso mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (pesoT <= 0) {
        Swal.fire({
          title: "El peso calculado debe ser mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (volumen <= 0) {
        Swal.fire({
          title: "El volumen calculado debe ser mayor a 0.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (unidadP == "") {
        Swal.fire({
          title: "Selecciona una unidad de peso.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (estibable == "") {
        Swal.fire({
          title: "Selecciona un embalaje",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let idPaq = this.agregarMercancias.length + 1;
      let pesoVol = 0
      let pesoVolTot = 0
      let precioTotal = 0

      if(estibable == 'si'){
        pesoVol = largo * alto * ancho * this.factorConversionEstiba
        pesoVolTot = pesoVol * cant
        
        if(pesoVolTot > pesoT){
          precioTotal = (pesoVolTot / 100) * this.flete_nacional
          this.leyendaPeso = ''
          this.leyendaVolumen = '(Volumen a Facturar)'
        }else{
          precioTotal = (pesoT / 100) * this.flete_nacional
          this.leyendaPeso = '(Peso a Facturar)'
          this.leyendaVolumen = ''
        }
        
        this.cifraOriginal = precioTotal
        this.redondearCifra()
        precioTotal = this.cifraOriginal
        

      }else if(estibable == 'no'){
        pesoVol = ((largo * ancho) / 1.9) * this.factorConversionNoEstiba 
        pesoVolTot = pesoVol * cant
        
        if(pesoVolTot > pesoT){
          precioTotal = (pesoVolTot / 100) * this.flete_nacional
          this.leyendaPeso = ''
          this.leyendaVolumen = '(Volumen a Facturar)'
        }else{
          precioTotal = (pesoT / 100) * this.flete_nacional
          this.leyendaPeso = '(Peso a Facturar)'
          this.leyendaVolumen = ''
        }

        this.cifraOriginal = precioTotal
        this.redondearCifra()
        precioTotal = this.cifraOriginal
      }

      let agrega = {
        idPaq: idPaq,
        cantidad: cant,
        peso: peso,
        pesoTotal: pesoT,
        alto: alto,
        ancho: ancho,
        largo: largo,
        medida: unidadM,
        embalaje: embalaje,
        upeso: unidadP,
        volumen: volumen,
        volumenTotal: volumenTotal,
        estibable: estibable,
        pesoVolumetrico: pesoVol,
        pesoVolumetricoTotal: pesoVolTot,
        precioVolumen: precioTotal,
      };

      this.agregarMercancias.push(agrega);

      this.cantMerc = 0;
      this.pesTMerc = 0;
      this.pesoTotal = 0;
      this.altoMerc = 0;
      this.anchoMerc = 0;
      this.largoMerc = 0;
      this.volMerc = 0;
      this.volMercTot = 0;
      this.unidaPesoMerc = "";
      this.terestibable = "";

      let totalPrecioVolumen = 0;
      for (let i = 0; i < this.agregarMercancias.length; i++) {
        totalPrecioVolumen = totalPrecioVolumen + parseFloat(this.agregarMercancias[i].precioVolumen);
      }

      this.totalPrecioVolumen = totalPrecioVolumen;
      //this.totalKilo = totalKilos;
      this.definePesoXVol = true;
      
    },

    redondearCifra() {

      const cadena = this.cifraOriginal.toString();
      const posicionPunto = cadena.indexOf('.');
      const digitosAntesDelPunto = cadena.substring(0, posicionPunto).length;

      let posicionUno = 0
      let posicionDos = 0

      switch (digitosAntesDelPunto) {
        case 3:
          if(this.cifraOriginal < 499){
            this.cifraOriginal = 499
          }else if(this.cifraOriginal < 999 && this.cifraOriginal > 499){
            this.cifraOriginal = 999
          }
        break;
        case 4:
          posicionUno = cadena.substring(0, 1);
          posicionDos = cadena.substring(1, 4);
          if(parseFloat(posicionDos) < 499){
            posicionDos = 499
          }else if(parseFloat(posicionDos) < 999 && parseFloat(posicionDos) > 499){
            posicionDos = 999
          }
          posicionDos = posicionDos.toString()
          this.cifraOriginal = parseFloat(posicionUno+posicionDos)
        break;
        case 5:
          posicionUno = cadena.substring(0, 2);
          posicionDos = cadena.substring(2, 5);
          if(parseFloat(posicionDos) < 499){
            posicionDos = 499
          }else if(parseFloat(posicionDos) < 999 && parseFloat(posicionDos) > 499){
            posicionDos = 999
          }
          posicionDos = posicionDos.toString()
          this.cifraOriginal = parseFloat(posicionUno+posicionDos)
        break;
        case 6:
          posicionUno = cadena.substring(0, 3);
          posicionDos = cadena.substring(3, 6);
          if(parseFloat(posicionDos) < 499){
            posicionDos = 499
          }else if(parseFloat(posicionDos) < 999 && parseFloat(posicionDos) > 499){
            posicionDos = 999
          }
          posicionDos = posicionDos.toString()
          this.cifraOriginal = parseFloat(posicionUno+posicionDos)
        break;
      case 7:
          posicionUno = cadena.substring(0, 4);
          posicionDos = cadena.substring(4, 7);
          if(parseFloat(posicionDos) < 499){
            posicionDos = 499
          }else if(parseFloat(posicionDos) < 999 && parseFloat(posicionDos) > 499){
            posicionDos = 999
          }
          posicionDos = posicionDos.toString()
          this.cifraOriginal = parseFloat(posicionUno+posicionDos)
        break;
      }
    },

    getTarifario(){

      let ori = this.arrayOrigen.length
      let des = this.arrayDestino.length

      if(ori > 0){
        if(des > 0){
          let ori = this.arrayOrigen[0].estadoo
          let des = this.arrayDestino[0].estadod
          axios({
            method: "post",
            url: "/api/v1/getTarifario/",
            data: {
              ori: ori,
              des: des,
            },
          }).then((response) => {
            this.arrayDatosTarifario = response.data;
            this.factorConversionEstiba = parseFloat(response.data[0].factor_conversion);
            this.recoleccion_tres_y_media = parseFloat(response.data[0].recoleccion_tres_y_media);
            this.recoleccion_rabon = parseFloat(response.data[0].recoleccion_rabon);
            this.recoleccion_torton = parseFloat(response.data[0].recoleccion_torton);
            this.entrega_puerto_nissan = parseFloat(response.data[0].entrega_puerto_nissan);
            this.entrega_puerto_tres_y_media = parseFloat(response.data[0].entrega_puerto_tres_y_media);
            this.entrega_rabon = parseFloat(response.data[0].entrega_rabon);
            this.entrega_torton = parseFloat(response.data[0].entrega_torton);
            this.flete_nacional = parseFloat(response.data[0].flete_nacional);
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    },

    validaServicios(){

      //this.getServicios();
      
      if(this.requiereRecoleccion){
        document.getElementById("10cheServicios").checked = true;
        this.addServicios(10, 'RECOLECCION');
      }

      if(this.requiereEntrega){
        document.getElementById("11cheServicios").checked = true;
        this.addServicios(11, 'ENTREGA');
      }

      let idServicio = 1;
      let nombreServicio = "FLETE NACIONAL";
      this.addServicios(idServicio, nombreServicio);

      this.$bvModal.hide("recoleccion");
    },

    closeValidaServicios(){
      this.$bvModal.hide("recoleccion");
    },

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
            <div class="_2ka8NZmhs89Mkk9ABZSXJM">
              <div class="_1n4EOSyAk1BfVWnF_adPB9">
                <div class="YkNOjSwN0S7IrLX5OK2Hc">
                  <div class="_2tU2wKoG7YY564aace37OF">
                    <b style="color: red">*</b>Transporte
                  </div>
                  <div class="GDwblpm-PHJsqhSUenve5">
                    <div class="_3wHay473hXYPOlphbqvMW6 _1pk_-C20zpknwxqZLn_t9z" ref="uno">
                      <button style=" display: inline-block; background-color: #ffffff; color: #3bafda; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB1" @click="showOpcion(1)" title="Maritimo">
                        <i class="bx bxs-ship fa-3x"></i>
                      </button>
                      <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB1">Maritimo</span>
                    </div>
                    <div class="_3wHay473hXYPOlphbqvMW6" ref="dos">
                      <button style="display: inline-block; background-color: #ffffff; color: #1abc9c; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB2" @click="showOpcion(2)" title="Terrestre">
                        <i class="bx bxs-truck fa-3x"></i>
                      </button>
                      <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB2">Terrestre</span>
                    </div>
                    <div class="_3wHay473hXYPOlphbqvMW6" ref="tres">
                      <button style="display: inline-block; background-color: #ffffff; color: #37cde6; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB3" @click="showOpcion(3)" title="Aereo">
                        <i class="bx bxs-plane-alt fa-3x"></i>
                      </button>
                      <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB3">Aereo</span>
                    </div>
                  </div>
                </div>
                <div class="_23ovY8N9sx2ExP0NvytcpI">
                  <div class="_1cwBgi06GP5eqlDlfhrE9A">
                    <div class="_2tU2wKoG7YY564aace37OF">
                      <b style="color: red">*</b>Origen
                    </div>
                    <div class="_2tU2wKoG7YY564aace37OF">
                      <b style="color: red">*</b>Destino
                    </div>
                  </div>
                  <div class="_12VTCAtCmgnF7JdGljsEap">
                    <div class="_3vCdC7UlpoMI8zyS9070Tm">
                      <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #056736">
                        <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                        <template>
                          <v-autocomplete
                            :input-attrs="{autocomplete: 'none', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional',}"
                            input-class="_1igQJzeY95hxUNao_yIXrr"
                            :items="dates_search_address"
                            :v-model="origen"
                            :value="origen"
                            @input="getLabelAddressO"
                            :component-item="templateAddress"
                            @update-items="buscaDireccion"
                            :auto-select-one-item="false"
                            return-object
                          >
                          </v-autocomplete>
                        </template>
                      </div>
                    </div>
                    <!--div class="XnAvZ8kiGXiCA_sHNJc-d" @click="cambioDirecciones()">
                      <svg class="_19dtdOQCfyXKmKkLtvaUkM _2zAD7s046Fl3mpYGfgpZjK" width="13" height="7" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4V6L0 3L3 0V2H13V4H3Z"></path>
                      </svg>
                      <svg class="_19dtdOQCfyXKmKkLtvaUkM zcj_unEFDHcra9DrUB7t7" width="13" height="7" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4V6L0 3L3 0V2H13V4H3Z"></path>
                      </svg>
                    </div-->
                    <div class="_3vCdC7UlpoMI8zyS9070Tm">
                      <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #056736">
                        <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                        <template>
                          <v-autocomplete
                            :input-attrs="{autocomplete: 'none', placeholder: 'Pais, Estado, Ciudad, CP', id: 'destinoAdicional',}"
                            input-class="_1igQJzeY95hxUNao_yIXrr"
                            :items="dates_search_address"
                            :v-model="destino"
                            :value="destino"
                            @input="getLabelAddressD"
                            :component-item="templateAddress"
                            @update-items="buscaDireccion"
                            :auto-select-one-item="false"
                            return-object
                          >
                            <i class="fas fa-map-marker-alt" />
                          </v-autocomplete>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_3Oe9vKBrFi5RVwWEswymkl">
                  <div class="_2tU2wKoG7YY564aace37OF">
                    <b style="color: red">*</b>Fecha estimada de Carga
                  </div>
                  <div class="_2Fk1Z0nKP1T6a1dr9C1FP_">
                    <b-form-input
                      border-color="primary"
                      class="fecha"
                      type="date"
                      id="terfecha"
                      v-b-tooltip.hover="{ variant: 'success' }"
                      :min="dateNow"
                      :value="dateNow"
                      v-model.trim="terfecha"
                    ></b-form-input>
                  </div>
                </div>
                <div class="_2FJfSi7htM3gHGbKFfAiX6">
                  <div class="_2tU2wKoG7YY564aace37OF">
                    <b style="color: red">*</b>Modalidad
                  </div>
                  <div class="_3vjMsFU0d1YJalV9Qbqq" tabindex="1">
                    <div class="E5e3waHARVCVMF2JA93PS">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <img v-if="termodalidadImg != ''" :src="termodalidadImg" width="25" height="25"/>
                          </span>
                        </div>
                        <b-form-select id="cargas" class="fecha" @change="selectModalidad($event)">
                          <option v-for="option in optionsItemModalidad" :key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                          </option>
                        </b-form-select>
                      </div>
                      <!--b-dropdown variant="white" class="fecha">
                      <template v-if="selected" #button-content class="fecha">
                        <div>
                          <img :src="termodalidadImg" width="25" height="25">
                          <b> {{termodalidadText}}</b>
                        </div>
                      </template>
                      <template v-else #button-content class="fecha">
                        <h5>Modalidad</h5>
                      </template>
                      <b-dropdown-item :disabled="option.disabled" @click="selectModalidad(option)" v-for="option in optionsItemModalidad" :key="option.value" :id="option.value" >
                        <div>
                          <img :src="option.src" width="25" height="25">
                          {{option.text}}
                        </div>
                      </b-dropdown-item>
                    </b-dropdown-->
                    </div>
                  </div>
                </div>
                <div class="_3QlnruSL5VqOlp6mJEr4-Z">
                  <!--button class="zTDkSCFjS5VtNrkEzKtJ5" style="background-color: #056736; box-shadow: rgba(4, 114, 235, 0.5) 0px 0px 3px;"></button-->
                  <b-button class="zTDkSCFjS5VtNrkEzKtJ5" v-b-tooltip.hover="{ variant: 'success' }" variant="secondary" @click="generateCotizacion(1)" style="height: 100%">
                    <i class="fe-search"></i>
                  </b-button>
                </div>
              </div>
            </div>

            <!--b-row style="text-align: center">
              <b-col>
                <h3>Selecciona una Opción</h3>
              </b-col>
            </b-row>
            <b-row style="text-align: center">
              <b-col class="text-right">
                <div class="boton-circle" style="display: inline-block; background-color: #ffffff; color: #3bafda;" @click="showOpcion(1)" title="Maritimo">
                  <i class="bx bxs-ship"></i>
                </div>
              </b-col>
              <b-col class="text-center">
                <div class="boton-circle" style="display: inline-block; background-color: #ffffff; color: #1abc9c;"  @click="showOpcion(2)" title="Terrestre">
                  <i class="bx bxs-truck"></i>
                </div>
              </b-col>
              <b-col class="text-left">
                <div class="boton-circle" style="display: inline-block; background-color: #ffffff; color: #37cde6;" @click="showOpcion(3)" title="Aereo">
                  <i class="bx bxs-plane-alt"></i>
                </div>
              </b-col>
            </b-row-->
            <div id="terra" v-show="opcion == 2" style="padding-top: 10px">
              <div class="row _2ka8NZmhs89Mkk9ABZSXJM" id="formOperaciones">
                <!--INICIA CODIGO PARA MOSTRAR POPUP DE ORIGEN-->
                <b-col cols="12" v-if="arrayOrigen.length > 0">
                  <b-popover custom-class="popover-add" target="origenAdicional" triggers="hover" placement="top">
                    <template #title class="bg-secondary">
                      <b-button @click="onClose" class="close" aria-label="Close">
                        <span class="d-inline-block text-white" aria-hidden="true">&times;</span>
                      </b-button>
                      Datos adicionales de dirección - Origen
                    </template>
                    <b-row>
                      <b-col md="4">
                        <label for="calleOrigen" class="form-label">
                          <b style="color: red">*</b>Calle</label>
                        <input class="form-control form-control-sm" v-model.trim="calleOrigen" type="text"/>
                      </b-col>
                      <b-col md="4">
                        <label for="numeroExtOrigen" class="form-label">
                          <b style="color: red">*</b>Numero Exterior</label>
                        <input class="form-control form-control-sm" v-model.trim="numExtOrigen" type="text"/>
                      </b-col>
                      <b-col md="4">
                        <label for="numIntOrigen" class="form-label">Numero Interior</label>
                        <input class="form-control form-control-sm" v-model.trim="numIntOrigen" type="text"/>
                      </b-col>
                    </b-row>
                  </b-popover>
                </b-col>
                <!--TERMINA CODIGO PARA MOSTRAR POPUP DE ORIGEN-->

                <!--INICIA CODIGO PARA MOSTRAR POPUP DE DESTINO-->
                <b-col cols="12" v-if="arrayDestino.length > 0">
                  <b-popover custom-class="popover-add" target="destinoAdicional" triggers="hover" placement="top">
                    <template #title>
                      <b-button @click="onClose" class="close" aria-label="Close">
                        <span class="d-inline-block text-white" aria-hidden="true">&times;</span>
                      </b-button>
                      Datos adicionales de dirección - Destino
                    </template>
                    <b-row>
                      <b-col md="4">
                        <label for="calleDestino" class="form-label">
                          <b style="color: red">*</b>Calle</label>
                        <input class="form-control form-control-sm" v-model.trim="calleDestino" type="text"/>
                      </b-col>
                      <b-col md="4">
                        <label for="numeroExtDestino" class="form-label">
                          <b style="color: red">*</b>Numero Exterior</label>
                        <input class="form-control form-control-sm" v-model.trim="numExtDestino" type="text"/>
                      </b-col>
                      <b-col md="4">
                        <label for="numIntDestino" class="form-label">Numero Interior</label>
                        <input class="form-control form-control-sm" v-model.trim="numIntDestino" type="text"/>
                      </b-col>
                    </b-row>
                  </b-popover>
                </b-col>
                <!--TERMINA CODIGO PARA MOSTRAR POPUP DE DESTINO-->

                <!--INICIA CODIGO PARA MOSTRAR POPUP DE FCL-->
                <b-col cols="12" v-if="termodalidad == 'FCL'">
                  <b-popover target="cargas" triggers="hover" placement="bottom">
                    <template #title>
                      <b-button @click="onClose" class="close" aria-label="Close">
                        <span class="d-inline-block text-white" aria-hidden="true">&times;</span>
                      </b-button>
                      Modalidad FCL
                    </template>

                    <div class="container">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="descripcion" class="form-label">
                              <b style="color: red">*</b>Ingresa Volumen Total <label style="font-size:20px;" v-if="nomUnidadModalidad != ''"> - <b-badge style="background-color:#056736;"> {{ nomUnidadModalidad }}</b-badge></label>
                            </label>
                            <div class="input-group">
                              
                              <input v-model="volumenMax" type="range" min="0" :max="maxRange" step="0.1" @change="validaVolumen()" class="form-control col-md-10" style="height: 33px"/>
                              <input v-model="volumenMax" type="number" @change="validaVolumen()" class="form-control col-md-2" style="height: 39px;"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-popover>
                </b-col>
                <!--TERMINA CODIGO PARA MOSTRAR POPUP DE FCL-->

                <!--INICIA CODIGO PARA MOSTRAR POPUP DE MERCANCIAS LTL-->
                <!--b-col cols="12" v-if="termodalidad == 'LTL' && mercancias != '' || termodalidad == 'FTL' && volumenMax > 0 "-->
                <b-col cols="12" v-if="termodalidad == 'LTL' || termodalidad == 'FTL'">
                  <b-popover target="cargas" triggers="hover" :show.sync="popoverShow" placement="bottom" container="my-container" ref="popover">
                    <template #title>
                      <b-row>
                        <b-col md="4">
                          {{ mercancias ? mercancias : "Mercancía" }}
                        </b-col>
                        <b-col md="7" class="text-right">
                          {{ nombreTipoUnidad ? "Unidad asignada: "+nombreTipoUnidad : "" }}
                        </b-col>
                        <b-col md="1">
                          <b-button @click="onClose" class="close" aria-label="Close">
                            <span class="d-inline-block" aria-hidden="true">&times;</span>
                          </b-button>
                        </b-col>
                      </b-row>
                    </template>
                    <div>
                      <b-row>
                        <!--b-col md="4">
                          <label class="form-label">
                            <b style="color: red">*</b>Tipo de Carga
                          </label>
                          <b-form-select v-model.trim="tertipocarga" id="cargas" class="rounded custom-select-sm" v-b-tooltip.hover="{ variant: 'success'}" @change="selectTipoUnidad($event)">
                            <option value="g">General</option>
                            <option value="h">Peligrosa</option>
                            <option value="r">Refrigerada</option>
                          </b-form-select>
                        </b-col-->
                        <b-col>
                          <label for="clasifica" class="form-label">
                            <b style="color: red">*</b>Clasificación</label>
                          <b-form-group id="clasifica" v-model.trim="clasifica">
                            <v-autocomplete
                              :input-attrs="{autocomplete: 'none', placeholder: 'Ingresa una clasificación', id: 'clasificacion',}"
                              input-class="form-control form-control-sm"
                              :items="dates_search_proser"
                              :v-model="clasificaText"
                              :value="clasificaText"
                              @input="getLabelProd"
                              :component-item="templateProvServ"
                              @update-items="clasificaciones"
                              :auto-select-one-item="false"
                              autocomplete="off"
                              return-object
                            >
                            </v-autocomplete>
                          </b-form-group>
                        </b-col>
                        <b-col>
                          <label for="estibable" class="form-label">
                            <b style="color: red">*</b>Unidad de Medida</label>
                          <b-form-select id="unidaMedidaMerc" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="unidaMedidaMerc" @change="selectUniMedMerc">
                            <option value="mt">Metros</option>
                            <option value="pl">Pulgadas</option>
                          </b-form-select>
                        </b-col>
                        <b-col>
                          <label for="descripcion" class="form-label">
                            <b style="color: red">*</b>Descripción</label>
                          <textarea class="form-control form-control-sm" style="height: 33px" v-model.trim="descripMerc" type="text"/>
                        </b-col>
                        <!--b-col v-if="termodalidad == 'LTL'">
                          <label for="descripcion" class="form-label">
                            <b style="color: red">*</b>Ingresa Volumen Total  <label style="font-size:20px;" v-if="nomUnidadModalidad != ''"> - <b-badge style="background-color:#056736;"> {{ nomUnidadModalidad }}</b-badge></label>
                          </label>
                          <div class="container row">
                            <input v-model="volumenMax" type="range" min="0" :max="maxRange" step="0.1" @change="validaVolumen()" class="form-control col-9" style="height: 33px"/>
                            <input v-model="volumenMax" type="number" @change="validaVolumen()" class="form-control form-control-sm col-3" style="height: 33px;"/>
                          </div>
                        </b-col-->
                      </b-row>
                      <div class="container-fluid">
                        <div class="table-responsive">
                          <table class="table">
                            <thead class="text-white" style="background-color: rgb(0, 120, 108)">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Embalaje</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Estibable</th>
                                <th scope="col">Largo</th>
                                <th scope="col">Ancho</th>
                                <th scope="col">Alto</th>
                                <th scope="col">Peso</th>
                                <th scope="col">Peso Total {{ leyendaPeso }}</th>
                                <th scope="col">Unidad</th>
                                <th scope="col">Volumen(m3)</th>
                                <th scope="col">Volumen Total(m3) {{ leyendaVolumen }}</th>
                                <th scope="col">Acción</th>
                              </tr>
                            </thead>
                            <tbody style="border: 1px solid #edeff1; border-collapse: collapse;">
                              <tr v-for="(paq, i) in agregarMercancias">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>{{ paq.embalaje }}</td>
                                <td>{{ paq.cantidad }}</td>
                                <td>{{ paq.estibable }}</td>
                                <td>{{ paq.largo }}</td>
                                <td>{{ paq.ancho }}</td>
                                <td>{{ paq.alto }}</td>
                                <td>{{ paq.peso }}</td>
                                <td>{{ paq.pesoTotal }}</td>
                                <td>{{ paq.upeso.toUpperCase() }}</td>
                                <td>{{ paq.volumen }}</td>
                                <td>{{ paq.volumenTotal }}</td>
                                <td>
                                  <b-button class="btn btn-danger" title="Eliminar Paquete" @click="eliminaPaquete(paq.idPaq)"><i class="fas fa-trash"></i></b-button>
                                </td>
                              </tr>
                              <tr>
                                <th style="border: 1px solid #edeff1; border-collapse: collapse;">-</th>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <b-form-select id="embalaje" class="rounded custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terembalaje" @change="selectEmbalaje($event)">
                                    <option v-for="emb in embalajes" :key="emb.idEmbalaje" v-bind:value="emb.idEmbalaje">
                                      {{ emb.nombre.toUpperCase() }}
                                    </option>
                                  </b-form-select>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm" v-model.trim="cantMerc" type="number" @input="validaCantidad()"/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <b-form-select id="estibable" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terestibable" @change="selectEstibable">
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                  </b-form-select>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm" v-model="largoMerc" type="number" @input="validaLargo()"/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm" v-model="anchoMerc" type="number" @input="validaAncho()"/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input v-if="terestibable == 'si'" class="form-control form-control-sm" v-model="altoMerc" type="number" @input="validaAlto()"/>
                                  <input v-else class="form-control form-control-sm" v-model="altoMerc" type="number" @input="validaAlto()" disabled/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm col" v-model.trim="pesTMerc" type="number" @input="validaPeso()"/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm col" v-model.trim="pesoTotal" type="number" disabled/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <b-form-select id="unidaPesoMerc" class="form-control custom-select-sm col" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="unidaPesoMerc" @change="selectUniPesMerc">
                                    <option value="kg">Kg</option>
                                    <option value="lb">Lb</option>
                                  </b-form-select>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm" v-model="volMerc" type="number" disabled/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <input class="form-control form-control-sm" v-model="volMercTot" type="number" disabled/>
                                </td>
                                <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                  <b-button v-if="termodalidad != 'LTL'" class="btn btn-sm" title="Agregar Paquete" @click="agregaPaquetes()"><i class="fas fa-plus"></i></b-button>
                                  <b-button v-else class="btn btn-sm" title="Agregar Paquete" @click="agregaPaquetesLTL()"><i class="fas fa-plus"></i></b-button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <b-row>
                        <b-col md="6" v-if="this.tertipocarga === 'h'">
                          <label for="unMerc" class="form-label">
                            <b style="color: red">*</b>UN</label>
                          <input class="form-control form-control-sm" v-model.trim="unMerc" type="text"/>
                        </b-col>
                        <b-col cols="6" v-if="this.tertipocarga === 'h'">
                          <label for="classMerc" class="form-label">
                            <b style="color: red">*</b>CLASS</label>
                          <input class="form-control form-control-sm" v-model.trim="classMerc" type="text"/>
                        </b-col>
                        <b-col v-if="this.tertipocarga === 'r'">
                          <label for="gradosMerc" class="form-label">
                            <b style="color: red">*</b>Grados</label>
                          <input class="form-control form-control-sm" v-model.trim="gradosMerc" type="text"/>
                        </b-col>
                        <b-col v-if="this.tertipocarga === 'r'">
                          <label for="tUnidadMerc" class="form-label">
                            <b style="color: red">*</b>Tipo de Unidad</label>
                          <input class="form-control form-control-sm" v-model.trim="tUnidadMerc" type="text"/>
                        </b-col>
                      </b-row>
                      <br />
                    </div>
                  </b-popover>
                </b-col>
                <!--TERMINA CODIGO PARA MOSTRAR POPUP DE MERCANCIAS LTL-->

                <!-- <div class="text-center" v-show="tercotizacion == 0">
                <b-spinner label="Text Centered"></b-spinner>
              </div>-->
                <div class="col-3" v-show="tercotizacion != 0">
                  <b-card class="rounded" v-if="termodalidad == 'FTL'">
                    <div class="row">   
                      <div class="col-sm-12">
                        <b-form-group>
                          <label for="" style="font-size: 12px; font-weight: bold">UNIDAD</label>
                          <b-form-radio v-model="tipoUnidad" v-for="unidad in units" :key="unidad.id" v-bind:value="unidad.id" @change="cambioUnidad(unidad.code_name, unidad.id)" style="font-size: 12px">
                            <label v-bind:id="'unidad-'+unidad.id" >
                              {{ unidad.code_name }}
                            </label>
                          </b-form-radio>
                        </b-form-group>
                      </div>
                      <div v-if="tertipocarga != ''">
                        <b-popover v-for="unidad in units" custom-class="popover-add" :target="'unidad-'+unidad.id" :title="unidad.code_name" triggers="hover" placement="righttop">
                          <template #title class="bg-secondary">
                            <b-button @click="onClose" class="close" aria-label="Close">
                              <span class="d-inline-block text-white" aria-hidden="true">&times;</span>
                            </b-button>
                            {{ unidad.code_name }}
                          </template>
                          <div>
                            <b-img center :src="unidad.imagen" alt="Center image"></b-img>
                          </div>
                        </b-popover>
                      </div>
                    </div>
                  </b-card>
                  <b-card class="rounded">
                    <div class="row">
                      <div class="col-sm-12">
                        <label for="" style="font-size: 12px; font-weight: bold">SERVICIOS</label>
                        <b-form-checkbox
                          name="listadoServicios"
                          v-bind:id="serv.id + 'cheServicios'"
                          v-model="selectServices"
                          v-for="serv in services"
                          :key="serv.id"
                          v-bind:value="serv.id"
                          :disabled="serv.nameproduct == 'FLETE NACIONAL'"
                          @change="addServicios(serv.id, serv.nameproduct)"
                          style="font-size: 12px"
                          :checked="serv.nameproduct == 'RECOLECCION' || serv.nameproduct == 'ENTREGA'"
                          >
                          <b style="font-weight: bold">{{ serv.nameproduct }}</b>
                        </b-form-checkbox>
                      </div>
                    </div>
                  </b-card>
                </div>
                <b-modal id="valorDeclaradoMercancia" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                  <template #modal-title>
                    <b><i class="fe-info"></i> Aviso Mercancia</b>
                  </template>
                  <div class="form-group text-center">
                    <label for="gradosMerc" class="form-label">Valor declarado de la mercancía</label>
                    <input class="form-control form-control-sm" v-model.trim="valorMercancia" type="number" @change="validaValorMercancia($event)"/>
                    <br />
                    <b-button class="width-md ml-1" variant="secondary" @click="cierraModal(2)"><b><i class="fe-x"></i>Cancelar</b></b-button>
                    <b-button class="width-md ml-1" style="background-color: #056736" @click="addServicios(2, 'SEGURO')"><b><i class="fe-check"></i> Guardar</b></b-button>
                  </div>
                </b-modal>
                <b-modal id="recoleccion" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                  <template #modal-title>
                    <b><i class="fe-info"></i> Aviso</b>
                  </template>
                  <div class="form-group text-center">
                    <label for="gradosMerc" class="form-label" style="font-size: x-large;">¿Deseas agregar algún servicio?</label>
                    <br>
                    <div class="form-check-inline">
                      <b-form-checkbox v-if="requiereRecoleccion" switch  v-bind:id="10+'-recoleccion'" v-model="requiereRecoleccion">
                        <h4 style="margin:0px;;"><b-badge variant="success">Recolección</b-badge></h4>
                      </b-form-checkbox>
                      <b-form-checkbox v-else switch v-bind:id="10+'-recoleccion'" v-model="requiereRecoleccion">
                        <h4 style="margin:0px;;"><b-badge variant="danger">Recolección</b-badge></h4>
                      </b-form-checkbox>
                    </div>
                    <div class="form-check-inline">
                      <b-form-checkbox v-if="requiereEntrega" switch v-bind:id="11+'-entrega'" v-model="requiereEntrega">
                        <h4 style="margin:0px;"><b-badge variant="success">Entrega</b-badge></h4>
                      </b-form-checkbox>
                      <b-form-checkbox v-else switch v-bind:id="11+'-entrega'" v-model="requiereEntrega">
                        <h4 style="margin:0px;;"><b-badge variant="danger">Entrega</b-badge></h4>
                      </b-form-checkbox>
                    </div>
                    <br />
                    <br />
                    <b-button class="width-md ml-1" size="sm" variant="secondary" @click="closeValidaServicios()"><b><i class="fe-x"></i>Omitir</b></b-button>
                    <b-button v-if="requiereRecoleccion || requiereEntrega" class="width-md ml-1" size="sm" style="background-color: #056736" @click="validaServicios()"><b><i class="fas fa-plus"></i> Agregar</b></b-button>
                    <b-button v-else disabled class="width-md ml-1" size="sm" style="background-color: #056736" @click="validaServicios()"><b><i class="fas fa-plus"></i> Agregar</b></b-button>
                  </div>
                </b-modal>
                
                <div class="col-6" v-show="tercotizacion != 0" style="margin-bottom: 6px">
                  <!-- Inicia else -->
                  <div class="row">
                    <!--div class="col-12">
                      <b-card class="rounded">
                        <b-tabs justified nav-class="nav-tabs nav-bordered" style="margin-top: -24px; margin-bottom: -36px">
                          <b-tab title="Optimo" active @click="aumentaOptimo(1)"></b-tab>
                          <b-tab title="Express" @click="aumentaExpress(1)"></b-tab>
                        </b-tabs>
                      </b-card>
                    </div-->
                    <div class="col-12">
                      <b-card no-body>
                        <b-card-body class="py-2">
                          <div class="row" style="border-bottom: 2px solid #f5f4f4; margin-top: -12px;">
                            <div class="col-md-4 text-left mt-2 mb-2">
                              <i class="fe-truck" style="color: #056736; font-size: 38px"></i>
                            </div>
                            <div class="col-md-4 text-left mt-2 mb-2"></div>
                            <div class="col-md-4 text-right mt-2 mb-2">
                              <b-button pill style="background-color: #056736" :disabled="isActive" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal" @click="detallesMercancias()">
                                <b v-show="divisa == '1'">
                                  ${{ formatMoney(priceSale) }}
                                </b>
                                <b v-show="divisa == '2'">
                                  ${{ formatMoney(priceSale) }}
                                </b>
                              </b-button>
                            </div>
                          </div>
                          <div class="row py-2" style="margin-bottom: -20px" v-if=" arrayOrigen.length > 0 && arrayDestino.length > 0">
                            <div class="col-md-4">
                              <p class="text-left" style="font-size: 12px; font-weight: bold">
                                {{ arrayOrigen[0].estadoo.toUpperCase() }},
                                {{ arrayOrigen[0].ciudado.toUpperCase() }}
                              </p>
                            </div>
                            <div class="col-md-4">
                              <p v-if="termodalidad != 'LTL'" class="text-center" style="font-size: 12px; font-weight: bold">
                                {{ tiempoEstimado }}
                              </p>
                            </div>
                            <div class="col-md-4">
                              <p class="text-right" style="font-size: 12px; font-weight: bold">
                                {{ arrayDestino[0].estadod.toUpperCase() }},
                                {{ arrayDestino[0].ciudadd.toUpperCase() }}
                              </p>
                            </div>
                          </div>
                          <!-- Dias de Transito -->
                          <div class="row mb-2">
                            <div class="col-md-12 text-center">
                              <label for="" class="text-center">{{ kilometraje }} km</label>
                            </div>
                          </div>
                          <!--Marcar Botones -->
                          <div class="row">
                            <div class="col-md-1">
                              <b-button variant="outline-success" class="btn btn-circle"></b-button>
                            </div>
                            <div class="col-md-10">
                              <div class="row" style="margin-top: -18px; margin-bottom: -20px">
                                <div class="col-md-12 text-center">
                                  <p>
                                    <i class="fe-truck" style="color: #056736"></i>
                                  </p>
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-md-12">
                                  <p style=" border-bottom: 2px solid #056736; margin-left: -22px; margin-right: -20px;"></p>
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
                              <div class="row mb-1" style="border-top: 2px solid #f5f4f4" v-show="details == 1" v-for="servic in confirmarServices" :key="servic.idService" v-bind:value="servic.idService">
                                <div class="col-md-6 text-left">
                                  {{ servic.nombreSer }}
                                </div>
                                <div class="col-md-6 text-right" v-if="divisa == 2">
                                  <b>
                                    $ {{ formatMoney(servic.totalServicio) }}
                                  </b>
                                </div>
                                <div class="col-md-6 text-right" v-else>
                                  <b>$ {{formatMoney(servic.totalServicio / valorDolar)}}</b>
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

                    <!--div class="col-12" hidden>
                      <b-card class="rounded">
                        <div class="row">
                          <div class="col-sm-12" style="text-align: center">
                            <template>
                              <div class="pagina">
                                <div class="contenedor" @mousemove="rotarContenedor">
                                  <div v-for="(cubo, index) in cubos" :key="index" class="cubo" :style="cubo.estilos"></div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </b-card>
                    </div-->

                    <div class="col-12" hidden>
                      <b-card class="rounded">
                        <div class="row">
                          <div class="col-sm-12" style="text-align: center;">
                          </div>
                        </div>
                      </b-card>
                    </div>
                  </div>
                  <!-- Fin else -->
                  <!-- <p class="text-center" style="margin-top: 110px; font-size: 20px;" v-else>No hay resultados...</p> -->
                </div>
                <div class="col-3" v-show="tercotizacion != 0">
                  <b-card class="rounded">
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
                              <p>
                                La cotización quedó registrada correctamente y
                                se envio a validación, espere respuesta por
                                correo.
                              </p>
                              <hr />
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
                              <b-container class="bv-example-row" style="background-color: #ffffff">
                                <b-row style=" border-color: #056736; border-width: 1px; border-bottom-style: solid;">
                                  <b-col cols="2" style="border-color: #056736; border-width: 3px; border-bottom-style: solid;">
                                    <div class="" style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                      <img src="../../../assets/images/logo_interland.png" alt="Logo Interland" style="width: 135%"/>
                                    </div>
                                  </b-col>
                                  <b-col cols="7">
                                    <div style=" align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto;">
                                      <div style="color: #000000">
                                        <b>INTERLAND TRANSPORT SA DE CV</b>
                                      </div>
                                      <div>
                                        Jaime Balmes 11 Edificio C Piso 7 Of.
                                        701B Col. Los Morales Polanco Del.
                                        Miguel Hidalgo, Ciudad de Mexico, C.P.
                                        11510, Mexico.
                                      </div>
                                      <div>RFC: ITR071117UD1</div>
                                      <div>
                                        Regimen: 601 - General de Ley Personas
                                        Morales.
                                      </div>
                                    </div>
                                  </b-col>
                                  <b-col cols="3">
                                    <div style="display: flow-root; height: 90%; border: 2px solid rgb(108, 117, 125);width: 150px;padding: 10px 20px;margin: auto;text-align: center;">
                                      <b style="font-weight: bold; color: #056736;">COTIZACIÓN</b>
                                      <br />
                                      <b style="font-weight: bold; color: #000000;">FOLIO ID:</b>
                                      <br />
                                      <b style=" font-weight: bold; color: #000000;">{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6,"0") }}</b>
                                    </div>
                                  </b-col>
                                </b-row>
                                <!--b-row class="text-center rounded-right" style="background-color: #056736;">
                                      <b-col>
                                        <h2 style="text-align: center; color:white;">Detalle del Servicio</h2>
                                      </b-col>
                                    </b-row-->
                                <br />
                                <b-row class="p-1" style=" background-color: #6c757d; color: #ffffff;">
                                  <b-col class="text-left">
                                    <label style="color: #ffffff">INFORMACIÓN GENERAL</label>
                                  </b-col>
                                  <b-col class="text-right"
                                    >Ciudad de México a
                                    {{ fechaFormato }}</b-col
                                  >
                                </b-row>
                                <b-row class="text-left p-2">
                                  <b-col>
                                    <div role="group">
                                      <label style="font-size: 11px">FOLIO DE COTIZACIÓN:</label>
                                      <br />
                                      <p><b>{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6,"0")}}</b></p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">FECHA DE COTIZACIÓN:</label>
                                      <br />
                                      <p> {{ terfecha }} </p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">TIPO DE SERVICIO:</label>
                                      <br />
                                      <p> {{ tipoOpcion }} </p>
                                    </div>
                                  </b-col>
                                  <b-col>
                                    <div role="group">
                                      <label style="font-size: 11px">ORIGEN:</label>
                                      <br />
                                      <p class="" style="font-size: 12px">
                                        {{ terorigen.toUpperCase() }}
                                      </p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">TIPO DE OPERACIÓN:</label>
                                      <br />
                                      <p class="" style="font-size: 12px">
                                        {{ termodalidad.toUpperCase() }}
                                      </p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">TIPO DE ENVIO:</label>
                                      <br />
                                      <p>{{ tipoEnvio }}</p>
                                    </div>
                                  </b-col>
                                  <b-col>
                                    <div role="group">
                                      <label style="font-size: 11px">DESTINO:</label>
                                      <br />
                                      <p class="" style="font-size: 12px">
                                        {{ terdestino.toUpperCase() }}
                                      </p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">TIPO DE CARGA:</label>
                                      <br />
                                      <p class="" style="font-size: 12px">
                                        {{ carga.toUpperCase() }}
                                      </p>
                                    </div>
                                    <div role="group">
                                      <label style="font-size: 11px">USUARIO QUE GENERA:</label>
                                      <br />
                                      <p>{{ username }}</p>
                                    </div>
                                  </b-col>
                                  <b-col cols="2 text-center">
                                    <!--img style="width: 80%;" src="../../../../public/logo_in.png" /-->
                                    <div class="col-md-12 text-center">
                                      <b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" style="background-color: #056736" size="sm">Divisa: USD</b-button>
                                      <b-button v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" style="background-color: #056736" size="sm">Divisa: MXN</b-button>
                                    </div>
                                  </b-col>
                                  <b-col cols="12">
                                    <div class="row" v-if="resClasificaZona != ''">
                                      <div class="col-sm-12">
                                        <b-alert show v-bind:variant="notColorZona">
                                          <h4 class="alert-heading">
                                            Aviso de Ruta
                                          </h4>
                                          <p v-html="notTextoZona"></p>
                                        </b-alert>
                                      </div>
                                    </div>
                                  </b-col>
                                </b-row>
                                <b-row class="p-1" style="background-color: #6c757d; color: #ffffff;">
                                  <b-col class="text-left">
                                    <label style="color: #ffffff">MERCANCIAS</label>
                                  </b-col>
                                </b-row>
                                <div class="col-md-12">
                                  <div class="form-group row mb-0">
                                    <div class="table-responsive">
                                      <table class="table table-sm mb-0" width="100%" v-if="agregarMercancias.length > 0">
                                        <thead>
                                          <tr>
                                            <th>EMBALAJE</th>
                                            <th>CANTIDAD</th>
                                            <th>ESTIBABLE</th>
                                            <th>LARGO</th>
                                            <th>ANCHO</th>
                                            <th>ALTO</th>
                                            <th>VOLUMEN</th>
                                            <th>VOLUMEN TOTAL {{ leyendaVolumen }}</th>
                                            <th>PESO</th>
                                            <th>PESO TOTAL {{ leyendaPeso }}</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr v-for="merc in agregarMercancias" v-bind:key="merc.idPaq" >
                                            <td style="text-align: center;">
                                              {{ merc.embalaje }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.cantidad }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.estibable.toUpperCase() }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.largo }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.ancho }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.alto }}
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.volumen }}<sub>m<sup>3</sup></sub>
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.volumenTotal }}<sub>m<sup>3</sup></sub>
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.peso }}<sub>{{ merc.upeso }}</sub>
                                            </td>
                                            <td style="text-align: center;">
                                              {{ merc.pesoTotal }}<sub>{{ merc.upeso }}</sub>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <p v-else>Sin Mercancias</p>
                                    </div>
                                  </div>
                                </div>

                                <!--div v-if="this.tertipocarga == 'r'">
                                  <b-row class="p-2">
                                    <b-col cols="6">
                                      <label style="font-size: 11px">GRADOS:</label>
                                      <p style="font-size: 12px">
                                        {{ gradosMerc.toUpperCase() }}
                                      </p>
                                    </b-col>
                                    <b-col cols="6">
                                      <label style="font-size: 11px">TIPO DE UNIDAD:</label>
                                      <p style="font-size: 12px">
                                        {{ tUnidadMerc.toUpperCase() }}
                                      </p>
                                    </b-col>
                                  </b-row>
                                </div>
                                <div v-if="this.tertipocarga == 'h'">
                                  <b-row class="p-2">
                                    <b-col cols="6">
                                      <label style="font-size: 11px">UN:</label>
                                      <p style="font-size: 12px">
                                        {{ unMerc.toUpperCase() }}
                                      </p>
                                    </b-col>
                                    <b-col cols="6">
                                      <label style="font-size: 11px">CLASS:</label>
                                      <p style="font-size: 12px">
                                        {{ classMerc.toUpperCase() }}
                                      </p>
                                    </b-col>
                                  </b-row>
                                </div>
                                <b-row class="p-2">
                                  <b-col cols="3">
                                    <label style="font-size: 11px">ENVIO:</label>
                                    <p style="font-size: 12px">
                                      {{ velocidadEnvio.toUpperCase() }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">EMBALAJE:</label>
                                    <p style="font-size: 12px">
                                      {{ /*terembalaje.toUpperCase()*/ terDescEmbalaje.toUpperCase() }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">ESTIBABLE:</label>
                                    <p style="font-size: 12px">
                                      {{ terestibable.toUpperCase() }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">CLASIFICACIÓN:</label>
                                    <p style="font-size: 12px">
                                      {{ clasificaText ? clasificaText : "" }}
                                    </p>
                                  </b-col>
                                </b-row>
                                <b-row class="p-2">
                                  <b-col cols="3">
                                    <label style="font-size: 11px">CANTIDAD:</label>
                                    <p style="font-size: 12px">
                                      {{ cantMerc }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">VOLUMEN (m3):</label>
                                    <p style="font-size: 12px">
                                      {{ volMerc }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">PESO TOTAL:</label>
                                    <p style="font-size: 12px">
                                      {{ pesTMerc + unidaPesoMerc.toUpperCase() }}
                                    </p>
                                  </b-col>
                                  <b-col cols="3">
                                    <label style="font-size: 11px">DESCRIPCIÓN:</label>
                                    <p style="font-size: 12px">
                                      {{ descripMerc.trim() }}
                                    </p>
                                  </b-col>
                                </b-row-->
                                <b-row class="p-1" style=" background-color: #6c757d; color: #ffffff;">
                                  <b-col class="text-left">
                                    <label style="color: #ffffff">SERVICIOS</label>
                                  </b-col>
                                  <b-col cols="5"></b-col>
                                  <b-col></b-col>
                                </b-row>
                                <!-- Inicio else -->
                                <div class="col-md-12">
                                  <div class="form-group row mb-0">
                                    <div class="table-responsive">
                                      <table class="table table-sm mb-0" width="100%" v-if="confirmarServices.length > 0">
                                        <thead>
                                          <tr>
                                            <th>SERVICIOS</th>
                                            <!--th>KILOMETROS</th>
                                                <th>TARIFA</th-->
                                            <th>SUBTOTAL</th>
                                            <th>IVA</th>
                                            <!--th v-if="totalPesoVolTot > totalKilo && termodalidad == 'LTL'">VOLUMEN FACTURADO</th>
                                            <th v-else>PESO FACTURAO</th-->
                                            <!--th>ZONA PELIGROSA</th>
                                            <th>ZONA NO COMERCIAL</th>
                                            <th>SOBREPESO</th>
                                            <th>SUSCEPTIBLE A ROBOS</th-->
                                            <th>TOTAL</th>
                                            <th>AJUSTE DE VENTA</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="divisa == 2">
                                          <tr v-for="servicios in confirmarServices" v-bind:key="servicios.idService" >
                                            <td style="text-right">
                                              {{ servicios.nombreSer }}
                                            </td>
                                            <!--td  style="text-right"> {{ formatMoney(servicios.kilometraje) }} </td>
                                                <td  style="text-right"> {{ formatMoney(servicios.tarifaK) }} x kilometro</td-->
                                            <td style="text-right">
                                              {{ formatMoney(servicios.subtotal + servicios.porcAumento) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcIva) }}
                                            </td>
                                            <!--td v-if="totalPesoVolTot > totalKilo && termodalidad == 'LTL'">
                                              {{ formatMoney(totalPesoVolTot) }}
                                            </td>
                                            <td v-else>
                                              {{ formatMoney(totalKilo) }}
                                            </td-->
                                            <!--td style="text-right">
                                              {{ formatMoney(servicios.porcZPeligrosa) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcNComercial) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcSobrepeso) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcSusceptible) }}
                                            </td-->
                                            <td style="text-right">
                                              {{ formatMoney(servicios.totalServicio + servicios.porcAumento) }}
                                            </td>
                                            <td align="center" v-if="servicios.subtotal != 0">
                                              <input class="form-control-input" type="checkbox" v-bind:id="servicios.idService + 'check'" key="servicios.idService" v-model="serviciosResumen" v-bind:value="servicios.idService" @change="mostrarImpuesto(servicios.idService)"/>
                                            </td>
                                            <td align="center" v-else>
                                              <p>En Proceso de Cotización</p>
                                            </td>
                                            <td>
                                              <select hidden v-bind:id="servicios.idService + 'seleccionImpuesto'" class="form-control-sm" @change="sumaImpuesto($event,servicios.idService)">
                                                <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0">
                                                  {{ opc.value }}%
                                                </option>
                                              </select>
                                              <input hidden value="0" v-bind:id=" servicios.idService + 'escondeImpuesto'"/>
                                            </td>
                                            <td>
                                              <input hidden placeholder="Total" class="form-control text-center" type="text" value="0" v-bind:id="servicios.idService + 'sumaTotal'" readonly/>
                                              <input hidden value="0" v-bind:id=" servicios.idService + 'impuestoOculto'"/>
                                              <input hidden value="0" v-bind:id="servicios.idService + 'ocultarSumaTotal'"/>
                                            </td>
                                          </tr>
                                        </tbody>
                                        <tbody v-else>
                                          <tr v-for="servicios in confirmarServices" v-bind:key="servicios.idService">
                                            <td style="text-right">
                                              {{ servicios.nombreSer }}
                                            </td>
                                            <!--td  style="text-right"> {{ formatMoney(servicios.kilometraje) }} </td>
                                                <td  style="text-right"> {{ formatMoney(servicios.tarifaK) }} x kilometro</td-->
                                            <td style="text-right">
                                              {{ formatMoney((servicios.subtotal + servicios.porcAumento) / valorDolar) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcIva / valorDolar) }}
                                            </td>
                                            <!--td style="text-right">
                                              {{ formatMoney(servicios.porcZPeligrosa / valorDolar) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcNComercial / valorDolar) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcSobrepeso / valorDolar) }}
                                            </td>
                                            <td style="text-right">
                                              {{ formatMoney(servicios.porcSusceptible / valorDolar) }}
                                            </td-->
                                            <td style="text-right">
                                              {{ formatMoney((servicios.totalServicio + servicios.porcAumento) / valorDolar) }}
                                            </td>
                                            <td align="center" v-if="servicios.subtotal != 0">
                                              <input class="form-control-input" type="checkbox" v-bind:id="servicios.idService + 'check'" :key="servicios.idService" v-model="serviciosResumen" v-bind:value="servicios.idService" @change="mostrarImpuesto(servicios.idService)"/>
                                            </td>
                                            <td align="center" v-else>
                                              <p>En Proceso de Cotización</p>
                                            </td>
                                            <td>
                                              <select hidden v-bind:id="servicios.idService + 'seleccionImpuesto'" class="form-control-sm" @change="sumaImpuesto($event, servicios.idService)">
                                                <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0">
                                                  {{ opc.value }}%
                                                </option>
                                              </select>
                                              <input hidden value="0" v-bind:id="servicios.idService + 'escondeImpuesto'"/>
                                            </td>
                                            <td>
                                              <input hidden placeholder="Total" class="form-control text-center" type="text" value="0" v-bind:id="servicios.idService + 'sumaTotal'" readonly/>
                                              <input hidden value="0" v-bind:id="servicios.idService + 'impuestoOculto'"/>
                                              <input hidden value="0" v-bind:id="servicios.idService + 'ocultarSumaTotal'"/>
                                            </td>
                                          </tr>
                                        </tbody>
                                        <tfoot>
                                          <tr>
                                            <td></td>
                                            <!--td></td>
                                                <td></td-->
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td colspan="2">
                                              <p>
                                                <b>SUBTOTAL:</b>
                                                {{ formatMoney(parseFloat(totalSubtotalGlobal)) }}
                                              </p>
                                              <p>
                                                <b>I.V.A.:</b>
                                                {{ formatMoney(parseFloat(totalIvaGlobal)) }}
                                              </p>
                                              <!--p>
                                                <b>ZONA PELIGROSA:</b>
                                                {{ formatMoney(parseFloat(totalZonaPeligrosa)) }}
                                              </p>
                                              <p>
                                                <b>ZONA NO COMERCIAL:</b>
                                                {{ formatMoney(parseFloat(totalZonaNoComercial)) }}
                                              </p>
                                              <p>
                                                <b>SOBREPESO:</b>
                                                {{ formatMoney(parseFloat(totalSobrepesoGlobal)) }}
                                              </p>
                                              <p>
                                                <b>SUSCEPTIBLE A ROBOS:</b>
                                                {{ formatMoney(parseFloat(totalRobosGlobal)) }}
                                              </p-->

                                              <!--p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetExp)) }}</p-->
                                              <p>
                                                <b>TOTAL:</b>
                                                {{ formatMoney(parseFloat(totalGlobal)) }}
                                              </p>
                                            </td>
                                          </tr>
                                        </tfoot>
                                      </table>
                                      <p v-else>Sin Servicios</p>
                                    </div>
                                  </div>
                                </div>
                                <!-- Fin else -->
                              </b-container>
                              <b-container>
                                <b-row class="p-1" style="background-color: #6c757d;color: #ffffff;">
                                  <b-col class="text-left">
                                    <label style="color: #ffffff">INFORMACIÓN DE CONTACTO</label>
                                  </b-col>
                                  <b-col></b-col>
                                  <b-col></b-col>
                                </b-row>
                                <b-row class="p-2">
                                  <b-col md="6">
                                    <label for="" style="font-size: 12px; font-weight: bold">NOMBRE COMPLETO</label>
                                    <b-input v-model="contacName" @input="contacName = contacName.toUpperCase()" placeholder="ESPINOSA UGALDE PABLO"></b-input>
                                  </b-col>
                                  <b-col md="6">
                                    <label for="" style="font-size: 12px; font-weight: bold">E-MAIL</label>
                                    <b-input v-model="contacEmail" placeholder="pablo@gmail.com"></b-input>
                                  </b-col>
                                </b-row>

                                <b-row class="p-2">
                                  <b-col md="6">
                                    <label for="" style="font-size: 12px; font-weight: bold">TELEFONO</label>
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
                                    <p style="color: #056736; font-weight: bold">
                                      La siguiente cotizacion se enviara para su
                                      validacion si desea continuar favor
                                      presione en Confirmar
                                    </p>
                                  </div>
                                </b-row>
                              </b-container>
                            </div>
                          </div>
                        </div>

                        <div class="form-group text-right mt-3">
                          <!--Parte Inferior Footer-->
                          <b-button class="width-md ml-1" variant="secondary" @click="hideResumen2()">Cerrar</b-button>
                          <b-button class="width-md ml-1" style="background-color: #056736" @click="Save2()">Confirmar</b-button>
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

    <!--- end row -->
  </Layout>
</template>

<style>
.toggle-label {
    display: inline-block;
    padding: 2px 0 0 4px;
    vertical-align: top;
    font-size: 24px;
    color: #777;
}

.pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.contenedor {
  perspective: 1000px;
  width: 300px;
  height: 200px;
  position: relative;
}

.cubo {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  background-color: #ccc;
  transform-style: preserve-3d;
}

.v-autocomplete-list {
  position: relative;
  overflow-y: scroll;
  border: 1px solid #ffffff;
  padding: 2px;
  height: calc(20px + 5vw);
}

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
  max-width: 90% !important;
  left: -4% !important;
  width: 100%;
}

.popover-add {
  max-width: 30% !important;
  left: 0% !important;
  width: 100%;
}

.popover-header {
  background-color: #6c757d;
  color: #ffffff;
}

@media only screen and (max-width: 991px) {
  .popover-add {
    max-width: 50% !important;
    left: 4% !important;
    width: 100%;
  }
}

.text-white {
  color: #fff;
}

input[type="range"] {
  display: block;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  background-color: #777;
  width: 20px;
  height: 20px;
  border: 3px solid #333;
  border-radius: 50%;
  margin-top: -9px;
}

input[type="range"]::-moz-range-thumb {
  background-color: #777;
  width: 15px;
  height: 15px;
  border: 3px solid #333;
  border-radius: 50%;
}

input[type="range"]::-ms-thumb {
  background-color: #777;
  width: 20px;
  height: 20px;
  border: 3px solid #333;
  border-radius: 50%;
}

input[type="range"]::-webkit-slider-runnable-track {
  background-color: #777;
  height: 3px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  outline: none;
}

input[type="range"]::-moz-range-track {
  background-color: #777;
  height: 3px;
}

input[type="range"]::-ms-track {
  background-color: #777;
  height: 3px;
}

input[type="range"]::-ms-fill-lower {
  background-color: HotPink;
}

input[type="range"]::-ms-fill-upper {
  background-color: black;
}

.modal-header .close {
  display: none;
}

/*ESTILO PRESTADOS */

body ._2ka8NZmhs89Mkk9ABZSXJM {
  margin: 0 auto;
  width: 100%;
  /*max-width: 1180px;*/
  border-radius: 10px;
  background-color: #e9f0f7;
  padding: 10px 20px 16px 20px;
  animation: _37voVng3nKHA4uc-Tzq1vG 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body ._2ka8NZmhs89Mkk9ABZSXJM {
    box-shadow: none;
    border-radius: 0;
  }
}

body ._1n4EOSyAk1BfVWnF_adPB9 {
  display: flex;
  align-items: flex-end;
}

@media only screen and (max-width: 991px) {
  body ._1n4EOSyAk1BfVWnF_adPB9 {
    flex-wrap: wrap;
  }
}

body .YkNOjSwN0S7IrLX5OK2Hc {
  width: 24%;
  max-width: 192px;
}

@media only screen and (max-width: 991px) {
  body .YkNOjSwN0S7IrLX5OK2Hc {
    width: 100%;
    max-width: 100%;
    margin-bottom: 8px;
    border-radius: 5px;
  }
}

body .YkNOjSwN0S7IrLX5OK2Hc svg {
  width: 41px;
  height: 41px;
}

body .YkNOjSwN0S7IrLX5OK2Hc svg path {
  transition: color 0.2s ease 0.08s;
}

body ._1cwBgi06GP5eqlDlfhrE9A ._2tU2wKoG7YY564aace37OF {
  flex: 1;
}

body ._2tU2wKoG7YY564aace37OF {
  font-size: 10px;
  line-height: 14px;
  color: #9fb1c1;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0 0 6px 0;
}

@media only screen and (max-width: 991px) {
  body ._2tU2wKoG7YY564aace37OF {
    display: none;
  }
}

body .GDwblpm-PHJsqhSUenve5 {
  display: flex;
  position: relative;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
}

@media only screen and (max-width: 991px) {
  body .GDwblpm-PHJsqhSUenve5 {
    border-radius: 5px;
    justify-content: center;
  }
}

body ._3wHay473hXYPOlphbqvMW6 {
  position: relative;
  display: flex;
  height: 60px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #9fb1c1;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1;
}

@media only screen and (max-width: 991px) {
  body ._3wHay473hXYPOlphbqvMW6:nth-child(3)::after {
    display: none;
  }
}

body ._3wHay473hXYPOlphbqvMW6::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -1px;
  width: 2px;
  border-radius: 10px;
  height: 80%;
  background-color: #e9f0f7;
  transform: translate3d(0, -50%, 0);
}

@media only screen and (max-width: 991px) {
  body ._3wHay473hXYPOlphbqvMW6::after::after {
    display: none;
  }
}

body ._3wHay473hXYPOlphbqvMW6._1pk_-C20zpknwxqZLn_t9z svg path {
  stroke: #fff;
  transition: stroke 0.2s ease 0.08s;
}

body ._3wHay473hXYPOlphbqvMW6._1pk_-C20zpknwxqZLn_t9z svg + span {
  color: #fff;
  transition: color 0.2s ease 0.08s;
}

body .BzbyxjDnil5GvbUe8_1qF {
  color: #9fb1c1;
  margin-top: -10px;
  transition: color 0.2s ease 0.08s;
}

body .v-KSWjML0QpV66JYLjTgR {
  position: absolute;
  top: 50%;
  left: 8%;
  width: 84.4%;
  height: 84%;
  border-radius: 5px;
  z-index: -1;
  transform: translate3d(0, -50%, 0);
  transition: all 0.18s ease;
}

@media only screen and (max-width: 991px) {
  body .v-KSWjML0QpV66JYLjTgR {
    left: 2%;
    width: 96%;
  }
}

@media only screen and (max-width: 560px) {
  body .v-KSWjML0QpV66JYLjTgR {
    left: 5%;
    width: 90%;
  }
}

body ._23ovY8N9sx2ExP0NvytcpI {
  flex-grow: 1;
  width: calc(50% - 10px);
}

@media only screen and (max-width: 991px) {
  body ._23ovY8N9sx2ExP0NvytcpI {
    width: 100%;
  }
}

body ._1cwBgi06GP5eqlDlfhrE9A {
  display: flex;
  flex-direction: row;
}

body ._12VTCAtCmgnF7JdGljsEap {
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEap {
    flex-wrap: wrap;
  }
}

body ._12VTCAtCmgnF7JdGljsEap::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  border-radius: 10px;
  height: 80%;
  background-color: #e9f0f7;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEap::after {
    display: none;
  }
}

body ._3vCdC7UlpoMI8zyS9070Tm {
  position: relative;
  width: 50%;
  height: 60px;
  background: #fff;
  padding: 4px 6px;
}

@media only screen and (max-width: 991px) {
  body ._3vCdC7UlpoMI8zyS9070Tm {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 4px;
  }
}

body ._2OKKnWa2I26FDFjQGrMlTi {
  position: absolute;
  top: 50%;
  left: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #0078e1;
  font-weight: 600;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  z-index: 2;
  transform: translate(0, -50%);
  pointer-events: none;
  transition: 0.2s ease;
}

._1AsJdz8ef0grzhKgIpVifh {
  position: relative;
}

body ._1igQJzeY95hxUNao_yIXrr {
  font-weight: 500;
  padding: 0 10px 0 45px;
  width: 100%;
  height: 50px;
  font-size: 18px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  color: #15354e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-shadow: none;
  outline: 0;
  transition: all 0.2s;
}

body ._1igQJzeY95hxUNao_yIXrr:focus {
  text-overflow: unset;
  padding-right: 0;
  box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
  transition: all 0.2s;
  z-index: 1;
}

body ._1igQJzeY95hxUNao_yIXrr::-moz-placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body ._1igQJzeY95hxUNao_yIXrr::placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body ._3Oe9vKBrFi5RVwWEswymkl {
  width: 14%;
  min-width: 150px;
  font-weight: 500;
}

@media only screen and (max-width: 991px) {
  body ._3Oe9vKBrFi5RVwWEswymkl {
    width: 50%;
    margin-bottom: 8px;
  }
}

body ._2Fk1Z0nKP1T6a1dr9C1FP_ {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #fff;
  font-weight: 500;
  font-size: 16px;
}

@media only screen and (max-width: 991px) {
  body ._2Fk1Z0nKP1T6a1dr9C1FP_ {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

body ._2Fk1Z0nKP1T6a1dr9C1FP_::after {
  left: -1px;
  right: auto;
}

@media only screen and (max-width: 991px) {
  body ._2Fk1Z0nKP1T6a1dr9C1FP_::after {
    display: none;
  }
}

body ._1Fv_I7ZFjrmFXYr-smGZqG {
  width: 25px;
  height: 18px;
  margin-left: 10px;
  margin-right: 5px;
}

body ._2FJfSi7htM3gHGbKFfAiX6 {
  width: 20%;
  min-width: 120px;
  max-width: 250px;
}

@media only screen and (max-width: 991px) {
  body ._2FJfSi7htM3gHGbKFfAiX6 {
    flex-grow: 1;
    margin-bottom: 8px;
    max-width: 100%;
  }
}

body ._3vjMsFU0d1YJalV9Qbqq {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 60px;
}

@media only screen and (max-width: 991px) {
  body ._3vjMsFU0d1YJalV9Qbqq {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

body ._3vjMsFU0d1YJalV9Qbqq::after {
  left: -1px;
  right: auto;
}

body .E5e3waHARVCVMF2JA93PS {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

body ._1N3bJ6D4JU95-nlvwuLuUG {
  margin-left: 10px;
  margin-right: 8px;
}

body ._3Asrt4xgZfhRSiH37EDtn4 {
  display: inline-block;
  font-size: 18px;
  text-transform: uppercase;
  color: #15354e;
  font-weight: 500;
}

body ._2-eTx56Mxj8udiynBFhn-1 {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-left: 2px solid #c7d3de;
  border-bottom: 2px solid #c7d3de;
  transform: translateY(-50%) rotate(-45deg);
}

body ._3QlnruSL5VqOlp6mJEr4-Z {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #fff;
  height: 60px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

@media only screen and (max-width: 991px) {
  body ._3QlnruSL5VqOlp6mJEr4-Z {
    border-radius: 5px;
    width: 100%;
  }
}

body .zTDkSCFjS5VtNrkEzKtJ5 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 100%;
  border-radius: 5px;
  border: none;
  background-color: #5a6268;
  box-shadow: none;
  background-image: url('data:image/svg+xml,%3Csvg fill="none" height="17" viewBox="0 0 17 17" width="17" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="m16.445 14.499-3.1979-3.1977c-.1444-.1443-.34-.2245-.5453-.2245h-.5228c.8852-1.13216 1.4113-2.5562 1.4113-4.10533 0-3.68518-2.9862-6.671177-6.67168-6.671177-3.68546 0-6.671672 2.985997-6.671672 6.671177 0 3.68523 2.986212 6.67123 6.671672 6.67123 1.54924 0 2.97338-.526 4.10568-1.4113v.5228c0 .2053.0801.4009.2245.5453l3.1979 3.1976c.3015.3015.789.3015 1.0873 0l.9078-.9076c.3015-.3015.3015-.789.0032-1.0905zm-9.52638-3.4222c-2.26773 0-4.10565-1.83456-4.10565-4.10533 0-2.26756 1.83471-4.10534 4.10565-4.10534 2.26772 0 4.10568 1.83458 4.10568 4.10534 0 2.26756-1.83475 4.10533-4.10568 4.10533z" fill="%23fff"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body .zTDkSCFjS5VtNrkEzKtJ5 {
    width: 100%;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 560px) {
  body .zTDkSCFjS5VtNrkEzKtJ5 {
    max-width: 100%;
  }
}

body .zTDkSCFjS5VtNrkEzKtJ5:active {
  box-shadow: 0 0 0 rgba(105, 126, 157, 0.3);
  transition: all 0.2s ease;
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .zTDkSCFjS5VtNrkEzKtJ5:hover {
    opacity: 0.9;
    transition: all 0.2s ease;
  }
}

body ._3GaS1vq0RCqjdAKKZ5HaLJ {
  height: 100%;
}

body .XnAvZ8kiGXiCA_sHNJc-d {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transform: translate3d(-50%, -50%, 0) scale(1);
  transition: all 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body .XnAvZ8kiGXiCA_sHNJc-d {
    position: absolute;
    right: 20px;
    left: auto;
    transform: translate3d(0%, -60%, 0) scale(1.5);
  }
}

@media only screen and (max-width: 560px) {
  body .XnAvZ8kiGXiCA_sHNJc-d {
    transform: translate3d(0%, -65%, 0) scale(1.5);
    right: 10px;
  }
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover {
    transform: translate3d(-50%, -50%, 0) scale(1.1);
    transition: all 0.2s ease;
  }
}

@media only screen and (hover: hover) and (max-width: 991px),
  only screen and (-ms-high-contrast: none) and (max-width: 991px),
  only screen and (-ms-high-contrast: active) and (max-width: 991px) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover {
    transform: translate3d(0%, -60%, 0) scale(1.6);
  }
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover ._19dtdOQCfyXKmKkLtvaUkM {
    transition: all 0.2s ease;
  }

  body .XnAvZ8kiGXiCA_sHNJc-d:hover ._2zAD7s046Fl3mpYGfgpZjK {
    transform: translateX(2px) scaleX(-1);
  }

  body .XnAvZ8kiGXiCA_sHNJc-d:hover .zcj_unEFDHcra9DrUB7t7 {
    transform: translateX(-2px) scale(1);
  }
}

body .fecha {
  font-weight: 500;
  width: 100%;
  height: 50px;
  font-size: 18px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  color: #15354e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-shadow: none;
  outline: 0;
  transition: all 0.2s;
}

body .fecha:focus {
  text-overflow: unset;
  padding-right: 0;
  box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
  transition: all 0.2s;
  z-index: 1;
}

body .fecha::-moz-placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body .fecha::placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.input-group-prepend .input-group-text {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}

body ._19dtdOQCfyXKmKkLtvaUkM {
  fill: #5a6268;
  width: 13px;
  transition: all 0.2s ease;
}

body ._2zAD7s046Fl3mpYGfgpZjK {
  transform: translateX(0) scaleX(-1);
}

body .zcj_unEFDHcra9DrUB7t7 {
  transform: translateX(0) scale(1);
}
</style>