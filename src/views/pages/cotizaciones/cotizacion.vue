<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import ItemTemplateProvServ from "@/components/ItemTemplateProvServ";

import Vue from "vue";
import $ from 'jquery';
import { BPopover } from "bootstrap-vue";
import Multiselect from "vue-multiselect";
import { log } from 'three/webgpu';
import { each } from "jquery";

Vue.component("b-popover", BPopover);

export default {
  page: {
    title: "Nueva Cotizacion",
    meta: [{ name: "newCotizacion", content: appConfig.description }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {

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

        /* V Fechas */
        dateNow: "",
        terfecha: "",
        fechaCoincidencia: "",

        /*V ID Cotizacion */
        idConsecutivo: 0,
        numConsecutivo: 0,
        controlConse: "",
        fechaConsecutivo: "",
        fConse: "",
        idCotizacion: 0,
        estatusCotiza: 0,

        /* V Unidades */
        units: [],
        unidadesSeleccion: [],
        options_unit: [],
        valUnidadMerc: 0,
        units_resp:[],

        /* V Embalajes */
        embalajes: [],

        /* V Porcentajes */
        listPorcentajes: [],

        /* V Datos de Contacto */
        ladas: [],
        contacName: "",
        contacEmail: "",
        contacLada: 1,
        contacTelefono: "",
        contacProductName: "",
        contacDescription: "",
        rfcClienteInterland: '',

        /* V Tipo Transporte */
        opcion:0,
        tipoOpcion: "",
        fondoBusqueda: "",
        fondoEtiquetas: "",

        /* V Tipo Envio */
        tipoEnvio: "", // Nacional, Expo, Impo
        tipoEnvioCheckNac: false,
        tipoEnvioCheckInt: false,
        tipoEnvioDetalleSi: false,
        tipoEnvioDetalleNo: false,
        tipoEnvioDetalle: '',

         /* V Modalidad */

         optionsItemModalidad: [
            {
                value: "LTL",
                text: "LTL - Carga Consolidada",
                src: "/img/ltl.png",
            },
            {
                value: "FTL",
                text: "FTL - Camión Completo",
                src: "/img/ftl.png",
            },
            {
                value: "FCL",
                text: "FCL - Contenedor Completo",
                src: "/img/fcl.png",
            },
        ],
        selected: "",
        termodalidad: "",
        termodalidadText: "",
        termodalidadImg: "",

        /* Origenes y Destinos */
        dates_search_address: [],
        arrayOrigen: [],
        arrayOrigenR: [],
        origen: "",
        destino: "",
        arrayDestino: [],
        arrayDestinoR: [],
        calleOrigen: '',
        numExtOrigen: '',
        numIntOrigen: '',
        calleDestino: '',
        numExtDestino: '',
        numIntDestino: '',
        isLoadingO: false,
        isLoadingD: false,

        /* V Tipo Comercio */
        comercio: "",

        /* V Tipo Comercio Ubicacion */
        comercioUbicacion: "",

        /* Stops */
        stops: false,
        routes: [],
        valStops: 0,
        routes_resp: [],

        /* V Mapa Origen Destino */
        mostrarMapa: false,
        mostrarMapaConfirma: false,

        /* V Mercancias */
        isLoadingM: false,
        embalajes: [],
        agregarMercancias: [],
        terembalaje: "",
        terDescEmbalaje: "",
        terestibable: "",
        tertipocarga: "",
        tertipocargaDescrip: "",
        checkPeligrosa: false,
        checkRefrigerada: false,
        carga: "",
        idclasifica: 0,
        clasifica: "",
        clasificaText: "",
        clasificaTextDet: [],
        descripMerc: "",
        dates_search_proser: [],
        templateProvServ: ItemTemplateProvServ,
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
        unidaPesoMerc: "kg",
        pesoTotal: 0,
        pesoVol: 0,
        pesoVolTot: 0,
        upeso: '',
        altoMercReal: 0,
        leyendaPeso: '',
        leyendaVolumen: '',
        aplicaAumentoLargo: false,
        aplicaAumentoAncho: false,
        aplicaAumentoAlto: false,
        aplicaAumentoPeso: false,
        aplicaPosicionLargo: false,
        aplicaPosicionAncho: false,
        aplicaPosicionAlto: false,
        aplicaPosicionPeso: false,
        valorMercancia: 0,
        valorMercanciaMoneda: 0,

        /* V Servicios */
        selectServices: [],
        services: [],
        confirmarServices: [],
        serviciosResumen: [],
        confirmarServices2: [],
        adicionales:[],

        /* Variables Tarifarios*/
        tarifarios: [],
        factorConversion: 0,
        recoleccion_tres_y_media: 0.0,
        recoleccion_rabon: 0.0,
        recoleccion_torton: 0.0,
        entrega_puerto_nissan: 0.0,
        entrega_puerto_tres_y_media: 0.0,
        entrega_rabon: 0.0,
        entrega_torton: 0.0,
        flete_nacional: 0.0,
        kilometraje: 0,

        /* Variables Generales Precios */
        totalPrecio: 0,
        fields_table: [],
        items_table: [],

        /* Variables Cards */
        cards: [],

        /* V General */
        dateNow: '',
        terfecha: '',
        fechaFormato: '',
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
        
        /* V Planes */
        pricingData: [],

        /* V Resumen */
        rFinal: [],

        /* V Totales */
        totalGlobal: 0,
        totalIvaGlobal: 0,
        totalSubtotalGlobal: 0,
        totalRetencionGlobal: 0,

        /* V Contacto Agente */
        motivoContacto: '',
    }
  },
  created() {
    this.getFolioCon();
    this.dataSess();
    this.getEmbalaje();
    this.obtenerPorcentajes();
    this.fechaHoy();
    this.getFechaActual();
    this.getLada();
    
  },
  mounted() {
    this.inicio();
  },
  watch: {

  },
  methods: {
    getFolioCon() {
        axios({
                method: "post",
                url: "/api/v1/consecutivo/",
                data: {
                id: 1,
            },
        }).then((response) => {
            this.idConsecutivo = response.data[0].id;
            this.numConsecutivo = response.data[0].numero;
            this.controlConse = response.data[0].control;
            this.fechaConsecutivo = response.data[0].fecha;

            let date = new Date(this.fechaConsecutivo);
            let date2 = moment(String(this.fechaConsecutivo)).format("YYYY/MM/DD");
            let date3 = new Date();

            this.fechaConsecutivo = date3.getUTCFullYear().toString().substr(-2);
            this.fechaConsecutivo = this.fechaConsecutivo + (date3.getUTCMonth() + 1).toString();
            this.fConse = date2;
        }).catch((error) => {
            console.log(error);
        });
    },

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
            this.admin = data[i].admin;
        }
    },

    getUnidadBox(tipo, modalidad) {
        this.units = [];
        this.options_unit = [];
        
        axios({
            method: "post",
            url: "/api/v1/list-box/",
            data: {
                data: tipo,
                modalidad: modalidad,
            },
        }).then((response) => {
            this.units = response.data;
            for (let i = 0; i < response.data.length; i++) {
                const data = {nombreUnidad:response.data[i].name,idUnidad:response.data[i].id}    
                this.options_unit.push(data);
            }
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

    getLada() {
        axios.get(`/api/v1/list-ladas/`).then((response) => {
            this.ladas = response.data;
        }).catch((error) => {
            console.log(error);
        });
    },

    getServicios() {

        axios({
                method: "post",
                url: `/api/v1/services-lista/`,
                data: {
                    aplica: this.termodalidad,
                },
        }).then((response) => {
            this.services = response.data;
        }).catch((error) => {
            console.log(error);
        });
    },

    inicio() {
        this.$bvModal.show("inicio-transporte");
        //this.$bvModal.show("inicio-mercancias");
        //this.$bvModal.show("resumen-modal");
        //this.$bvModal.show("validaConfirmacionOD");
    },

    async validaTransporte(val){
        await this.showOpcion(val);
        this.$bvModal.hide("inicio-transporte");
        this.$bvModal.show("inicio-tipo-envio");
    },

    regresarTransporte(){
        this.$bvModal.hide("inicio-tipo-envio");
        this.$bvModal.show("inicio-transporte");
    },

    async showOpcion(valor) {
        this.opcion = 0;

        let val = valor;

        if (val == 1) {
            this.tipoOpcion = "Maritimo";
            this.fondoBusqueda = "primary";
            this.fondoEtiquetas = "primary";
            this.opcion = 1;

            this.$refs.uno.style.background = "#2aab5c";
            this.$refs.fondoB1.style.background = "#2aab5c";
            this.$refs.fondoB1.style.color = "#ffffff";
            this.$refs.textB1.style.color = "#ffffff";

            this.$refs.dos.style.background = "#ffffff";
            this.$refs.fondoB2.style.background = "#ffffff";
            this.$refs.fondoB2.style.color = "#5a6268";
            this.$refs.textB2.style.color = "#9fb1c1";

            this.$refs.tres.style.background = "#ffffff";
            this.$refs.fondoB3.style.background = "#ffffff";
            this.$refs.fondoB3.style.color = "#5a6268";
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
            this.$refs.fondoB1.style.color = "#5a6268";
            this.$refs.textB1.style.color = "#9fb1c1";

            this.$refs.dos.style.background = "#2aab5c";
            this.$refs.fondoB2.style.background = "#2aab5c";
            this.$refs.fondoB2.style.color = "#ffffff";
            this.$refs.textB2.style.color = "#ffffff";

            this.$refs.tres.style.background = "#ffffff";
            this.$refs.fondoB3.style.background = "#ffffff";
            this.$refs.fondoB3.style.color = "#5a6268";
            this.$refs.textB3.style.color = "#9fb1c1";
        } else if (val == 3) {
            this.tipoOpcion = "Aereo";
            this.fondoBusqueda = "info";
            this.fondoEtiquetas = "info";
            this.opcion = 3;

            this.$refs.uno.style.background = "#ffffff";
            this.$refs.fondoB1.style.background = "#ffffff";
            this.$refs.fondoB1.style.color = "#5a6268";
            this.$refs.textB1.style.color = "#9fb1c1";

            this.$refs.dos.style.background = "#ffffff";
            this.$refs.fondoB2.style.background = "#ffffff";
            this.$refs.fondoB2.style.color = "#5a6268";
            this.$refs.textB2.style.color = "#9fb1c1";

            this.$refs.tres.style.background = "#2aab5c";
            this.$refs.fondoB3.style.background = "#2aab5c";
            this.$refs.fondoB3.style.color = "#ffffff";
            this.$refs.textB3.style.color = "#ffffff";
        }
        await this.insertConsecutivo();
    },

    insertConsecutivo(){
        const fecConse = this.fConse;
        let fechaHoy = Date.now();
        fechaHoy = moment(new Date(fechaHoy)).format("YYYY/MM/DD");
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
    },

    validaTipoEnvio(val){

        if(val == 1){
            this.tipoEnvioCheckNac = true
            this.tipoEnvioCheckInt = false
            this.tipoEnvio = 'Nacional'
        } 

        if(val == 2){
            this.tipoEnvioCheckNac = false
            this.tipoEnvioCheckInt = true
            this.tipoEnvio = 'Internacional'
        }

        this.$bvModal.hide("inicio-tipo-envio");
        this.$bvModal.show("inicio-detalle-envio");
    },

    clickDetalleEnvio(val){ 
        if(val == 1){
            this.tipoEnvioDetalleSi = true
            this.tipoEnvioDetalleNo = false
        }else if (val == 2){
            this.tipoEnvioDetalleSi = false
            this.tipoEnvioDetalleNo = true

            let indice = this.arrayDestino.map((busqueda) => busqueda.estatus_quitar).indexOf(0);
            this.arrayDestino.splice(indice, 1);

            if(this.tipoEnvioCheckNac){
                this.$bvModal.hide("inicio-detalle-envio");
                this.$bvModal.show("inicio-modalidad");
            }else if(this.tipoEnvioCheckInt){
                this.$bvModal.hide("inicio-detalle-envio");
                this.$bvModal.show("inicio-comercio");
            }
        }
    },

    async validaDetalleEnvio(val){
        let params = {}
        this.tipoEnvioDetalle = val
        let destino_geo = ''
        let idEstado = 0
        let cp = ''
        let cd = ''
        let pais = ''
        let estado = ''
        let datosDireccion = null

        if(val == 'Aduana Aeropuerto Internacional de la Ciudad de México (AICM)'){
            params = {nombre_corto: 'Aduana Aeropuerto Internacional de la Ciudad de México (AICM)'}
            cd = 'México (Lic. Benito Juárez)'
        }else if(val == 'Aduana Aeropuerto Internacional Felipe Angeles (AIFA)'){
            params = {nombre_corto: 'Aduana Aeropuerto Internacional Felipe Angeles (AIFA)'}
            cd = 'Santa Lucia'
        }else if(val == 'Aduana Aeropuerto Internacional de Toluca (AIT)'){
            params = {nombre_corto: 'Aduana Aeropuerto Internacional de Toluca (AIT)'}
            cd = 'San Pedro Totoltepec'
        }else if(val == 'Aduana Aeropuerto Internacional de Querétaro (AIQ)'){
            params = {nombre_corto: 'Aduana Aeropuerto Internacional de Querétaro (AIQ)'}
            cd = 'Querétaro (Ing. Fernando Espinoza Gtz)'
        }else if(val == 'Puerto de Veracruz'){
            params = {nombre_corto: 'Puerto de Veracruz'}
            cd = 'Veracruz'
        }else if(val == 'Puerto de Manzanillo'){
            params = {nombre_corto: 'Puerto de Manzanillo'}
            cd = 'Parque industrial FONDEPORT'
        }else if(val == 'Puerto Lázaro Cárdenas'){
            params = {nombre_corto: 'Puerto Lázaro Cárdenas'}
            cd = 'Centro'
        }
            
        const auth = { username: "admin", password: "123", }
        const geoDetallesPuertos = await axios.get("/api/v1/detalles-geocerca-puertos/", {
            params,
            auth
        });

        pais = geoDetallesPuertos.data.geocerca[0].pais
        estado = geoDetallesPuertos.data.geocerca[0].estado
        cp = geoDetallesPuertos.data.geocerca[0].codigoPostal

        destino_geo = pais + ', '+estado 

        axios({
            method: "post",
            url: "/api/v1/search-address-detalles/",
            data: {
                data: destino_geo,
                cp: cp,
                cd: cd,
            },
        }).then((response) => {
            datosDireccion = response.data[0]

            if(this.arrayDestino.length > 0 && this.arrayDestino.map((busqueda) => busqueda.estatus_quitar).indexOf(0) >= 0 ){
                this.destino = pais + ", " + estado + ", " + cd + ", " + cp;
                let indice = this.arrayDestino.map((busqueda) => busqueda.estatus_quitar).indexOf(0);
                this.arrayDestino.splice(indice, 1);

                let des = {
                    idpais: datosDireccion.pais_id,
                    pais: datosDireccion.pais_name,
                    idestado: datosDireccion.estado_id,
                    estado: datosDireccion.estado_name,
                    ciudad: datosDireccion.municipio,
                    colonia: datosDireccion.asentamiento,
                    cp: datosDireccion.codigo_postal,
                    text_largo: this.destino,
                    idDestino: parseInt(this.arrayDestino.length) + 1,
                    lat: geoDetallesPuertos.data.geocerca[0].lat,
                    lng: geoDetallesPuertos.data.geocerca[0].lng,
                    lat_centro: geoDetallesPuertos.data.geocerca[0].lat_centro,
                    lng_centro: geoDetallesPuertos.data.geocerca[0].lng_centro,
                    idGeocerca: geoDetallesPuertos.data.geocerca[0].idGeocerca,
                    nombre_corto: geoDetallesPuertos.data.geocerca[0].nombre_corto,
                    kilometros_redonda: geoDetallesPuertos.data.geocerca[0].kilometros_redonda,
                    estatus_quitar: 0,
                };
                this.arrayDestino.push(des)
                this.destino = ''
            }else{

                this.destino = pais + ", " + estado + ", " + cd + ", " + cp;

                let des = {
                    idpais: datosDireccion.pais_id,
                    pais: datosDireccion.pais_name,
                    idestado: datosDireccion.estado_id,
                    estado: datosDireccion.estado_name,
                    ciudad: datosDireccion.municipio,
                    colonia: datosDireccion.asentamiento,
                    cp: datosDireccion.codigo_postal,
                    text_largo: this.destino,
                    idDestino: parseInt(this.arrayDestino.length) + 1,
                    lat: geoDetallesPuertos.data.geocerca[0].lat,
                    lng: geoDetallesPuertos.data.geocerca[0].lng,
                    lat_centro: geoDetallesPuertos.data.geocerca[0].lat_centro,
                    lng_centro: geoDetallesPuertos.data.geocerca[0].lng_centro,
                    idGeocerca: geoDetallesPuertos.data.geocerca[0].idGeocerca,
                    nombre_corto: geoDetallesPuertos.data.geocerca[0].nombre_corto,
                    kilometros_redonda: geoDetallesPuertos.data.geocerca[0].kilometros_redonda,
                    estatus_quitar: 0,
                };

                this.arrayDestino.push(des)
                this.destino = ''

            }
        }).catch((error) => {
            console.log(error);
        });

        if(this.tipoEnvioCheckNac){
            this.$bvModal.hide("inicio-detalle-envio");
            this.$bvModal.show("inicio-modalidad");
        }else if(this.tipoEnvioCheckInt){
            this.$bvModal.hide("inicio-detalle-envio");
            this.$bvModal.show("inicio-comercio");
        }

    },

    regresarDetalleEnvio(){
        this.$bvModal.hide("inicio-detalle-envio");
        this.$bvModal.show("inicio-tipo-envio");
    },

    validaComercio(val){
        
        if(val == 1){
            this.comercio = 'Impo'
        }else if( val == 2){
            this.comercio = 'Expo'
        }else if(val == 3){
            this.comercio = 'FNE'
        }
        
        this.$bvModal.hide("inicio-comercio");
        this.$bvModal.show("inicio-ubicacion");
    },

    regresarComercio(){
        this.$bvModal.hide("inicio-comercio");
        this.$bvModal.show("inicio-tipo-envio");
    },

    async validaModalidad(mod, modalidad){
        await this.selectModalidad(mod, modalidad)

        if(this.termodalidad == 'LTL'){
            this.$bvModal.hide("inicio-modalidad");
            this.$bvModal.show("inicio-origen-destino");
        }else{
            this.$bvModal.hide("inicio-modalidad");
            this.$bvModal.show("inicio-unidades");
        }

        await this.getServicios();
    },

    abreOrigenesModal(){
        this.$bvModal.show("inicio-origen-destino");
        //this.muestraMapaRutas(1);
    },

    regresarModalidad(){

        if(this.tipoEnvio == 'Nacional'){
            this.$bvModal.hide("inicio-modalidad");
            this.$bvModal.show("inicio-detalle-envio");
        }

        if(this.tipoEnvio == 'Internacional'){
            this.$bvModal.hide("inicio-modalidad");
            this.$bvModal.show("inicio-ubicacion");
        }


    },

    selectModalidad(option) {

        this.routes = []
        this.routes_resp = []
        this.unidadesSeleccion = []
        this.units_resp = []
        this.agregarMercancias = []

        this.selected = option;
        let index_modalidad = this.optionsItemModalidad.findIndex((x) => x.value === option);
        this.termodalidad = this.optionsItemModalidad[index_modalidad].value;
        this.termodalidadText = this.optionsItemModalidad[index_modalidad].text;
        this.termodalidadImg = this.optionsItemModalidad[index_modalidad].src;

        this.getUnidadBox('g',option);
    },

    validaUbicacion(val){
        
        if(val == 1){
            this.comercioUbicacion = 'USA'
        }else if( val == 2){
            this.comercioUbicacion = 'CENAM'
        }

        this.$bvModal.hide("inicio-ubicacion");
        this.$bvModal.show("inicio-modalidad");
            
    },
            
    regresarUbicacion(){
        this.$bvModal.hide("inicio-ubicacion");
        this.$bvModal.show("inicio-comercio");
    },

    buscaDireccion(text) {
        let input = text;

        if (input.length >= 5) {
            this.isLoadingO = true
            axios({
                method: "post",
                url: "/api/v1/search-address/",
                data: {
                    data: input,
                },
            }).then((response) => {
                this.dates_search_address = response.data.data;
                this.isLoadingO = false
            }).catch((error) => {
                console.log(error);
            });
        }
    },

    regresarOD(){

        if(this.termodalidad == 'LTL'){
            this.$bvModal.hide("inicio-origen-destino");
            this.$bvModal.show("inicio-modalidad");
        }else{
            this.$bvModal.show("inicio-unidades");
            this.$bvModal.hide("inicio-origen-destino");

            setTimeout(() => {
                this.recargaUnidadesSeleccionadas();
            }, 100);
        }
    },

    abreModalidadModal(){
        this.$bvModal.show("inicio-modalidad");
    },

    async getLabelAddressO(item) {
        
        if (item != null && item != "") {

            let ciudad = item.ciudad
            let cp = item.codigoPostal
            let colonia = item.colonia
            let direccion = item.direccion
            let idestado = item.idestado
            let estado = item.estado
            let estatus = item.estatus
            let estatus_geocerca = item.estatus_geocerca
            let idGeocerca = item.idGeocerca
            let kilometros_redonda = item.kilometros_redonda
            let lat = item.lat
            let lat_centro = item.lat_centro
            let lng = item.lng
            let lng_centro = item.lng_centro
            let nombre_corto = item.nombre_corto
            let orden = item.orden
            let pais = item.pais
            let idpais = item.idpais
            let poligono = item.poligono
            let porcentaje_incremento = item.porcentaje_incremento
            let ori = {}

            if (pais != undefined && pais != null && pais != "") {

                if(estado == 'Edo. Mexico'){
                    estado = 'Estado de Mexico'
                }

                this.terorigen = pais + ", " + cp + ", " + estado + ", " + ciudad + ", " + colonia;
                this.origen = pais + ", " + estado + ", " + ciudad + ", " + cp;
                    
                if(this.arrayOrigen.length > 0 && this.arrayOrigen.map((busqueda) => busqueda.text_largo).indexOf(this.origen) >= 0 ){
                    await this.notificaciones('error', 'El Origen ya esta agregado, intenta con otro.');
                    this.origen = ""
                }else{
                        
                    if(idGeocerca > 0){
                            
                        ori = {
                            idpais: idpais,
                            pais: pais,
                            idestado: idestado,
                            estado: estado,
                            ciudad: ciudad,
                            colonia: colonia,
                            cp: cp,
                            text_largo: this.origen,
                            idOrigen: parseInt(this.arrayOrigen.length) + 1,
                            lat: lat,
                            lng: lng,
                            lat_centro: lat_centro,
                            lng_centro: lng_centro,
                            idGeocerca: idGeocerca,
                            nombre_corto: nombre_corto,
                            kilometros_redonda: kilometros_redonda,
                            estatus_quitar: 1,
                        };
                    }else{
                        ori = {
                            idpais: idpais,
                            pais: pais,
                            idestado: idestado,
                            estado: estado,
                            ciudad: ciudad,
                            colonia: colonia,
                            cp: cp,
                            text_largo: this.origen,
                            idOrigen: parseInt(this.arrayOrigen.length) + 1,
                            lat: 0,
                            lng: 0,
                            lat_centro: 0,
                            lng_centro: 0,
                            idGeocerca: 0,
                            nombre_corto: '',
                            kilometros_redonda: 0,
                            estatus_quitar: 1,
                        };
                    }
                    if(this.termodalidad == 'LTL' && this.arrayOrigen.length == 0){
                        this.arrayOrigen.push(ori);
                        this.arrayOrigenR.push(ori)
                        await this.notificaciones('success', 'El Origen se agregó correctamente.');
                    }else if(this.termodalidad == 'LTL' && this.arrayOrigen.length > 0){
                        await this.notificaciones('info', 'No se puede agregar mas de un origen en modalidad LTL');
                    }

                    if(this.termodalidad == 'FTL' && this.stops){
                        if(this.arrayOrigen.length > 0){
                            await this.notificaciones('info', 'No se puede agregar mas de un origen al activar Stops.');
                        }else{
                            this.arrayOrigen.push(ori);
                            this.arrayOrigenR.push(ori)
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');    
                        }
                            
                    }else if(this.termodalidad == 'FTL'){
                        this.arrayOrigen.push(ori);
                            this.arrayOrigenR.push(ori)
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');    
                    }
                    
                    if(this.termodalidad == 'FCL' && this.stops){
                        if(this.arrayOrigen.length > 0){
                            await this.notificaciones('info', 'No se puede agregar mas de un origen al activar Stops.');
                        }else{
                            this.arrayOrigen.push(ori);
                            this.arrayOrigenR.push(ori)
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');    
                        }
                    }
                        
                    //this.origen = ""
                }

                if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                    await this.muestraMapaRutas(1);
                }
            }
        }
    },

    async getLabelAddressD(item) {
        if (item != null && item != "") {
            let ciudad = item.ciudad
            let cp = item.codigoPostal
            let colonia = item.colonia
            let direccion = item.direccion
            let idestado = item.idestado
            let estado = item.estado
            let estatus = item.estatus
            let estatus_geocerca = item.estatus_geocerca
            let idGeocerca = item.idGeocerca
            let kilometros_redonda = item.kilometros_redonda
            let lat = item.lat
            let lat_centro = item.lat_centro
            let lng = item.lng
            let lng_centro = item.lng_centro
            let nombre_corto = item.nombre_corto
            let orden = item.orden
            let pais = item.pais
            let idpais = item.idpais
            let poligono = item.poligono
            let porcentaje_incremento = item.porcentaje_incremento
            let distancia_stops = 0;
            let des = {}

            if (pais != undefined && pais != null && pais != "") {

                if(estado == 'Edo. Mexico'){
                    estado = 'Estado de Mexico'
                }

                this.terdestino = pais + ", " + cp + ", " + estado + ", " + ciudad + ", " + colonia;
                this.destino = pais + ", " + estado + ", " + ciudad + ", " + cp;

                if(this.arrayDestino.length > 0 && this.arrayDestino.map((busqueda) => busqueda.text_largo).indexOf(this.destino) >= 0 ){

                    await this.notificaciones('error', 'El Destino ya esta agregado, intenta con otro.');
                    this.destino = ''

                }else{
                        
                    if(idGeocerca > 0){
                            
                        des = {
                            idpais: idpais,
                            pais: pais,
                            idestado: idestado,
                            estado: estado,
                            ciudad: ciudad,
                            colonia: colonia,
                            cp: cp,
                            text_largo: this.destino,
                            idOrigen: parseInt(this.arrayDestino.length) + 1,
                            lat: lat,
                            lng: lng,
                            lat_centro: lat_centro,
                            lng_centro: lng_centro,
                            idGeocerca: idGeocerca,
                            nombre_corto: nombre_corto,
                            kilometros_redonda: kilometros_redonda,
                            estatus_quitar: 1,
                        };
                    }else{
                        des = {
                            idpais: idpais,
                            pais: pais,
                            idestado: idestado,
                            estado: estado,
                            ciudad: ciudad,
                            colonia: colonia,
                            cp: cp,
                            text_largo: this.destino,
                            idDestino: parseInt(this.arrayDestino.length) + 1,
                            lat: 0,
                            lng: 0,
                            lat_centro: 0,
                            lng_centro: 0,
                            idGeocerca: 0,
                            nombre_corto: '',
                            kilometros_redonda: 0,
                            estatus_quitar: 1,
                        };
                    }

                    if(this.stops && this.arrayDestino.length >= 1){
                        
                        await axios({
                            method: "post",
                            url: "/api/v1/get-distancias-maps-cordenadas/",
                            data: {
                                org: this.arrayDestino[this.arrayDestino.length - 1].lat + ', ' +this.arrayDestino[this.arrayDestino.length - 1].lng,
                                des: lat+ ', ' +lng,
                            },
                        }).then((response) => {
                            distancia_stops = response.data
                            distancia_stops = parseFloat(distancia_stops.replace(' km',''));
                            
                        }).catch((error) => {
                            console.log(error);
                        });
                    }

                    if(this.termodalidad == 'LTL' && this.arrayDestino.length == 0){
                        this.arrayDestino.push(des);
                        this.arrayDestinoR.push(des);
                        await this.notificaciones('success', 'El Destino se agregó correctamente.');
                    }else if(this.termodalidad == 'LTL' && this.arrayDestino.length > 0){
                        await this.notificaciones('info', 'Solo de puede agregar un destino en modalidad LTL');
                    }

                    if(this.termodalidad == 'FTL' && this.stops){
                        if(distancia_stops > 30.0){
                            await this.notificaciones('error', 'Asegurate que la sitancia entre stops sea menor o igual a 30 km de distancia.');
                            return false;
                        }else{
                            this.arrayDestino.push(des);
                            this.arrayDestinoR.push(des)
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');    
                        }
                        
                    }else if(this.termodalidad == 'FTL'){
                        this.arrayDestino.push(des);
                        this.arrayDestinoR.push(des)
                        await this.notificaciones('success', 'El Destino se agregó correctamente.');
                    }
                     
                    if(this.termodalidad == 'FCL'){
                        this.arrayDestino.push(des);
                        this.arrayDestinoR.push(des)
                        await this.notificaciones('success', 'El Destino se agregó correctamente.');
                    }
                    //this.destino = ''

                }
                if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                    await this.muestraMapaRutas(1);
                }
            }
        }
    },

    async eliminaOrigenArray(val, sec){

        let indice = this.arrayOrigen.map((busqueda) => busqueda.idOrigen).indexOf(val);
        this.arrayOrigen.splice(indice, 1);

        if(sec == 1){
            await this.muestraMapaRutas(1);
        }else if(sec == 2){
            await this.muestraMapaRutas(2);
        }

        await this.notificaciones('success', 'El Origen se eliminó correctamente.');

    },

    async eliminaDestinoArray(val, sec){

        let indice = this.arrayDestino.map((busqueda) => busqueda.idDestino).indexOf(val);
        this.arrayDestino.splice(indice, 1);

        if(sec == 1){
            await this.muestraMapaRutas(1);
        }else if(sec == 2){
            await this.muestraMapaRutas(2);
        }

        await this.notificaciones('success','El Destino se eliminó correctamente.');
    },

    notificaciones(icon, texto){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
                        
        Toast.fire({
            icon: icon,
            title: texto,
        });
    },

    muestraMapaRutas(val){
        let lat_c = 0
        let lng_c = 0
        this.mostrarMapa = false
        this.mostrarMapaConfirma = false
        this.routes = []
        let map
            
        for (let c = 0; c < this.arrayOrigen.length; c++) {
            if(this.arrayOrigen[c].lat_centro != 0 && this.arrayOrigen[c].lng_centro != 0 ){
                lat_c = this.arrayOrigen[c].lat_centro
                lng_c = this.arrayOrigen[c].lng_centro
                break;
            }
        }

        // Crea un nuevo mapa
        if(val == 1){
            map = new google.maps.Map(document.getElementById('mapaRutas'), {
                zoom: 12, // Nivel de zoom
                center: { lat: parseFloat(lat_c), lng: parseFloat(lng_c) } // Centro del mapa (coordenadas)
            });
        }else if( val == 2){
            map = new google.maps.Map(document.getElementById('mapaRutasConfirma'), {
                zoom: 12, // Nivel de zoom
                center: { lat: parseFloat(lat_c), lng: parseFloat(lng_c) } // Centro del mapa (coordenadas)
            });
        }
    
        /*var routes = [
            { origin: {lat: 40.7128, lng: -74.0060}, destination: {lat: 34.0522, lng: -118.2437} }, // Ruta 1: Nueva York a Los Ángeles
            { origin: {lat: 41.8781, lng: -87.6298}, destination: {lat: 29.7604, lng: -95.3698} }    // Ruta 2: Chicago a Houston
        ];*/
    
        let ruta = {}

        if(this.arrayOrigen.length === this.arrayDestino.length && this.stops == false){
            for (let i = 0; i < this.arrayOrigen.length; i++) {
                ruta = {
                    origin:{
                        lat: parseFloat(this.arrayOrigen[i].lat),
                        lng: parseFloat(this.arrayOrigen[i].lng)
                    },
                    destination: {
                        lat:parseFloat(this.arrayDestino[i].lat), 
                        lng: parseFloat(this.arrayDestino[i].lng)
                    }, 
                    ciudad_o: this.arrayOrigen[i].ciudad,
                    colonia_o: this.arrayOrigen[i].colonia,
                    cp_o: this.arrayOrigen[i].cp,
                    estado_o: this.arrayOrigen[i].estado,
                    estatus_quitar_o: this.arrayOrigen[i].estatus_quitar,
                    idGeocerca_o: this.arrayOrigen[i].idGeocerca,
                    idOrigen_o: this.arrayOrigen[i].idOrigen,
                    idestado_o: this.arrayOrigen[i].idestado,
                    idpais_o: this.arrayOrigen[i].idpais,
                    kilometros_redonda_o: this.arrayOrigen[i].kilometros_redonda,
                    nombre_corto_o: this.arrayOrigen[i].nombre_corto,
                    pais_o: this.arrayOrigen[i].pais,
                    text_largo_o: this.arrayOrigen[i].text_largo,
                    id_ruta:this.routes.length+1,
                    ver:0,
                    ciudad_d: this.arrayDestino[i].ciudad,
                    colonia_d: this.arrayDestino[i].colonia,
                    cp_d: this.arrayDestino[i].cp,
                    estado_d: this.arrayDestino[i].estado,
                    estatus_quitar_d: this.arrayDestino[i].estatus_quitar,
                    idGeocerca_d: this.arrayDestino[i].idGeocerca,
                    idOrigen_d: this.arrayDestino[i].idOrigen,
                    idestado_d: this.arrayDestino[i].idestado,
                    idpais_d: this.arrayDestino[i].idpais,
                    kilometros_redonda_d: this.arrayDestino[i].kilometros_redonda,
                    nombre_corto_d: this.arrayDestino[i].nombre_corto,
                    pais_d: this.arrayDestino[i].pais,
                    text_largo_d: this.arrayDestino[i].text_largo,
                    calle_o: '',
                    calle_d: '',
                    n_exterior_o: '',
                    n_exterior_d: '',
                    n_interior_o: '',
                    n_interior_d: '',
                    identificador: this.arrayOrigen[i].ciudad+'-'+this.arrayDestino[i].ciudad,
                }
                this.routes.push(ruta)
                
            }
        }else if(this.arrayOrigen.length == 1 && this.arrayDestino.length >= 1 && this.stops){
            let destino_anterior = {}
            let ciudad_o = ""
            let colonia_o = ""
            let cp_o = ""
            let estado_o = ""
            let estatus_quitar_o = ""
            let idGeocerca_o = ""
            let idOrigen_o = ""
            let idestado_o = ""
            let idpais_o = ""
            let kilometros_redonda_o = ""
            let nombre_corto_o = ""
            let pais_o = ""
            let text_largo_o = ""
            let routes_resp = []
            let ruta = {}

            for (let d = 0; d < this.arrayDestino.length; d++) {
                if(routes_resp.length == 0){
                    ruta = {
                        origin:{
                            lat:parseFloat(this.arrayOrigen[d].lat),
                            lng: parseFloat(this.arrayOrigen[d].lng)
                        },
                        destination: {
                            lat:parseFloat(this.arrayDestino[d].lat), 
                            lng: parseFloat(this.arrayDestino[d].lng)
                        }, 
                        ciudad_o: this.arrayOrigen[d].ciudad,
                        colonia_o: this.arrayOrigen[d].colonia,
                        cp_o: this.arrayOrigen[d].cp,
                        estado_o: this.arrayOrigen[d].estado,
                        estatus_quitar_o: this.arrayOrigen[d].estatus_quitar,
                        idGeocerca_o: this.arrayOrigen[d].idGeocerca,
                        idOrigen_o: this.arrayOrigen[d].idOrigen,
                        idestado_o: this.arrayOrigen[d].idestado,
                        idpais_o: this.arrayOrigen[d].idpais,
                        kilometros_redonda_o: this.arrayOrigen[d].kilometros_redonda,
                        nombre_corto_o: this.arrayOrigen[d].nombre_corto,
                        pais_o: this.arrayOrigen[d].pais,
                        text_largo_o: this.arrayOrigen[d].text_largo,
                        id_ruta:this.routes.length+1,
                        ver:0,
                        ciudad_d: this.arrayDestino[d].ciudad,
                        colonia_d: this.arrayDestino[d].colonia,
                        cp_d: this.arrayDestino[d].cp,
                        estado_d: this.arrayDestino[d].estado,
                        estatus_quitar_d: this.arrayDestino[d].estatus_quitar,
                        idGeocerca_d: this.arrayDestino[d].idGeocerca,
                        idOrigen_d: this.arrayDestino[d].idDestino,
                        idestado_d: this.arrayDestino[d].idestado,
                        idpais_d: this.arrayDestino[d].idpais,
                        kilometros_redonda_d: this.arrayDestino[d].kilometros_redonda,
                        nombre_corto_d: this.arrayDestino[d].nombre_corto,
                        pais_d: this.arrayDestino[d].pais,
                        text_largo_d: this.arrayDestino[d].text_largo,
                        calle_o: '',
                        calle_d: '',
                        n_exterior_o: '',
                        n_exterior_d: '',
                        n_interior_o: '',
                        n_interior_d: '',
                        identificador: this.arrayOrigen[d].ciudad+'-'+this.arrayDestino[d].ciudad,
                    }
                    routes_resp.push(ruta)
                    destino_anterior = ruta.destination

                    ciudad_o = this.arrayDestino[d].ciudad,
                    colonia_o = this.arrayDestino[d].colonia,
                    cp_o = this.arrayDestino[d].cp,
                    estado_o = this.arrayDestino[d].estado,
                    estatus_quitar_o = this.arrayDestino[d].estatus_quitar,
                    idGeocerca_o = this.arrayDestino[d].idGeocerca,
                    idOrigen_o = this.arrayDestino[d].idDestino,
                    idestado_o = this.arrayDestino[d].idestado,
                    idpais_o = this.arrayDestino[d].idpais,
                    kilometros_redonda_o = this.arrayDestino[d].kilometros_redonda,
                    nombre_corto_o = this.arrayDestino[d].nombre_corto,
                    pais_o = this.arrayDestino[d].pais,
                    text_largo_o = this.arrayDestino[d].text_largo
                }else{
                    ruta = {
                        origin:{
                            lat: parseFloat(destino_anterior.lat),
                            lng: parseFloat(destino_anterior.lng)
                        },
                        destination:{
                            lat: parseFloat(this.arrayDestino[d].lat),
                            lng: parseFloat(this.arrayDestino[d].lng)
                        },
                        ciudad_o: ciudad_o,
                        colonia_o: colonia_o,
                        cp_o: cp_o,
                        estado_o: estado_o,
                        estatus_quitar_o: estatus_quitar_o,
                        idGeocerca_o: idGeocerca_o,
                        idOrigen_o: idOrigen_o,
                        idestado_o: idestado_o,
                        idpais_o: idpais_o,
                        kilometros_redonda_o: kilometros_redonda_o,
                        nombre_corto_o: nombre_corto_o,
                        pais_o: pais_o,
                        text_largo_o: text_largo_o,
                        ciudad_d: this.arrayDestino[d].ciudad,
                        colonia_d: this.arrayDestino[d].colonia,
                        cp_d: this.arrayDestino[d].cp,
                        estado_d: this.arrayDestino[d].estado,
                        estatus_quitar_d: this.arrayDestino[d].estatus_quitar,
                        idGeocerca_d: this.arrayDestino[d].idGeocerca,
                        idOrigen_d: this.arrayDestino[d].idDestino,
                        idestado_d: this.arrayDestino[d].idestado,
                        idpais_d: this.arrayDestino[d].idpais,
                        kilometros_redonda_d: this.arrayDestino[d].kilometros_redonda,
                        nombre_corto_d: this.arrayDestino[d].nombre_corto,
                        pais_d: this.arrayDestino[d].pais,
                        text_largo_d: this.arrayDestino[d].text_largo,
                        id_ruta: routes_resp.length+1,
                        ver:0,
                        calle_o: '',
                        calle_d: '',
                        n_exterior_o: '',
                        n_exterior_d: '',
                        n_interior_o: '',
                        n_interior_d: '',
                        identificador: ciudad_o+'-'+this.arrayDestino[d].ciudad,
                    }
                    routes_resp.push(ruta)
                    destino_anterior = ruta.destination
                }
            }
            this.routes = routes_resp
            routes_resp = []
        }
        const directionsServices = [];
        const directionsRenderers = [];
            
        this.routes.forEach((route, index) => {
            directionsServices[index] = new google.maps.DirectionsService();
            directionsRenderers[index] = new google.maps.DirectionsRenderer({ map });
            this.calculateAndDisplayRoute(directionsServices[index], directionsRenderers[index], route, val);
        });
    },
    
    calculateAndDisplayRoute(directionsService, directionsRenderer, route, val) {
        directionsService.route({
            origin: route.origin,
            destination: route.destination,
            travelMode: 'DRIVING'
        }, (response, status) => {
        
            if (status === 'OK') {
                if(val == 1){
                    this.mostrarMapa = true
                }else if(val == 2){
                    this.mostrarMapaConfirma = true
                }
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },

    async validaO(val){
        const auth = { username: "admin", password: "123", }
        let datosTarifa = []
        let datosZona = []
        this.tarifarios = []

        if(this.arrayOrigen.length == 0){
            this.notificaciones('error','Debes ingresar al menos un Origen, verifícalo por favor.')
            return false;
        }

        if(this.arrayDestino.length == 0){
            this.notificaciones('error','Debes ingresar al menos un Destino, verifícalo por favor.')
            return false;
        }    

        for (let i = 0; i < this.routes.length; i++) {
            await axios({
                method: "post",
                url: "/api/v1/get-distancias-maps-cordenadas/",
                data: {
                    org: this.routes[i].origin.lat + ', ' +this.routes[i].origin.lng,
                    des: this.routes[i].destination.lat + ', ' +this.routes[i].destination.lng,
                },
            }).then((response) => {
                this.$set(this.routes[i], 'km', response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        if(this.stops){
            

            for (let r = 0; r < this.routes.length; r++) {
                await axios({
                    method: "post",
                    url: "/api/v1/getTarifario/",
                    data: {
                        pais_origen: this.routes[r].pais_o,
                        estado_origen: this.routes[r].estado_o,
                        ciudad_origen: this.routes[r].ciudad_o,
                        pais_destino: this.routes[r].pais_d,
                        estado_destino: this.routes[r].estado_d,
                        ciudad_destino: this.routes[r].ciudad_d,
                        modalidad: this.termodalidad,
                    },
                }).then((response) => {
                    datosTarifa = response.data;
                    let listOD = []

                    let dato = {"pais_o":this.routes[r].pais_o,"estado_o":this.routes[r].estado_o,"ciudad_o":this.routes[r].ciudad_o, "colonia_o": this.routes[r].colonia_o, "cp_o":this.routes[r].cp_o, "pais_d":this.routes[r].pais_d,"estado_d":this.routes[r].estado_d,"ciudad_d":this.routes[r].ciudad_d, "colonia_d": this.routes[r].colonia_d, "cp_d":this.routes[r].cp_d}
                    listOD.push(dato);

                    axios({
                        method: "post",
                        url: "/api/v1/valida-tipo-zona/",
                        data: {data:listOD},
                        auth: auth,
                    }).then((response) => {
                        datosZona = response.data
                        
                        
                        let tarif = {}

                        if(datosZona.length == 0){
                            datosZona[0].tipoZona = 'Comercial'
                            datosZona[0].km = 0
                        }

                        tarif = {
                            idTarifa: this.tarifarios.length + 1,
                            factorConversion: parseFloat(datosTarifa[0].factor_conversion),
                            recoleccion_tres_y_media: parseFloat(datosTarifa[0].recoleccion_tres_y_media),
                            recoleccion_rabon: parseFloat(datosTarifa[0].recoleccion_rabon),
                            recoleccion_torton: parseFloat(datosTarifa[0].recoleccion_torton),
                            recoleccion_nissan: parseFloat(datosTarifa[0].recoleccion_nissan),
                            recoleccion_trailer: parseFloat(datosTarifa[0].recoleccion_trailer),
                            entrega_nissan: parseFloat(datosTarifa[0].entrega_puerto_nissan),
                            entrega_tres_y_media: parseFloat(datosTarifa[0].entrega_puerto_tres_y_media),
                            entrega_rabon: parseFloat(datosTarifa[0].entrega_rabon),
                            entrega_torton: parseFloat(datosTarifa[0].entrega_rabon),
                            entrega_trailer: parseFloat(datosTarifa[0].entrega_trailer),
                            flete_nacional: parseFloat(datosTarifa[0].flete_nacional),
                            identificador: this.routes[r].ciudad_o+'-'+this.routes[r].ciudad_d,
                            tipo_zona_text: response.data[0].tipoZonaText,
                            tipo_zona: response.data[0].tipoZona,
                            km: parseFloat(response.data[0].km),
                        };
                                    
                        this.tarifarios.push(tarif)

                    }).catch((error) => {
                        console.log(error);
                    });
                    
                }).catch((error) => {
                    console.log(error);
                });
                
            }
        }else{

            if (this.arrayOrigen.length === this.arrayDestino.length) {
                for (let i = 0; i < this.arrayOrigen.length; i++) {
                    await axios({
                        method: "post",
                        url: "/api/v1/getTarifario/",
                        data: {
                            pais_origen: this.arrayOrigen[i].pais,
                            estado_origen: this.arrayOrigen[i].estado,
                            ciudad_origen: this.arrayOrigen[i].ciudad,
                            pais_destino: this.arrayDestino[i].pais,
                            estado_destino: this.arrayDestino[i].estado,
                            ciudad_destino: this.arrayDestino[i].ciudad,
                            modalidad: this.termodalidad,
                        },
                    }).then((response) => {
                        datosTarifa = response.data;
                        let listOD = []

                        let dato = {"pais_o":this.arrayOrigen[i].pais,"estado_o":this.arrayOrigen[i].estado,"ciudad_o":this.arrayOrigen[i].ciudad, "colonia_o": this.arrayOrigen[i].colonia, "cp_o":this.arrayOrigen[i].cp, "pais_d":this.arrayDestino[i].pais,"estado_d":this.arrayDestino[i].estado,"ciudad_d":this.arrayDestino[i].ciudad, "colonia_d": this.arrayDestino[i].colonia, "cp_d":this.arrayDestino[i].cp}
                        listOD.push(dato);

                        axios({
                            method: "post",
                            url: "/api/v1/valida-tipo-zona/",
                            data: {data:listOD},
                            auth: auth,
                        }).then((response) => {
                            datosZona = response.data
                            console.log(datosZona, 'datosZona' );
                            let tarif = {}

                            if(datosZona.length == 0){
                                datosZona[0].tipoZona = 'Comercial'
                                datosZona[0].km = 0
                            }

                            tarif = {
                                idTarifa: this.tarifarios.length + 1,
                                factorConversion: parseFloat(datosTarifa[0].factor_conversion),
                                recoleccion_tres_y_media: parseFloat(datosTarifa[0].recoleccion_tres_y_media),
                                recoleccion_rabon: parseFloat(datosTarifa[0].recoleccion_rabon),
                                recoleccion_torton: parseFloat(datosTarifa[0].recoleccion_torton),
                                recoleccion_nissan: parseFloat(datosTarifa[0].recoleccion_nissan),
                                recoleccion_trailer: parseFloat(datosTarifa[0].recoleccion_trailer),
                                entrega_nissan: parseFloat(datosTarifa[0].entrega_puerto_nissan),
                                entrega_tres_y_media: parseFloat(datosTarifa[0].entrega_puerto_tres_y_media),
                                entrega_rabon: parseFloat(datosTarifa[0].entrega_rabon),
                                entrega_torton: parseFloat(datosTarifa[0].entrega_rabon),
                                entrega_trailer: parseFloat(datosTarifa[0].entrega_trailer),
                                flete_nacional: parseFloat(datosTarifa[0].flete_nacional),
                                identificador: this.arrayOrigen[i].ciudad+'-'+this.arrayDestino[i].ciudad,
                                tipo_zona: response.data[0].tipoZona,
                                tipo_zona_text: response.data[0].tipoZonaText,
                                km: parseFloat(response.data[0].km),
                            };
                                
                            this.tarifarios.push(tarif)
                        });
                        
                    });
                    
                }

            }

        }

        if(val == 1){
            this.$bvModal.hide("inicio-origen-destino");
            this.$bvModal.show("inicio-mercancias");
        }
    },

    async validaUnidades(id, nombre){

        let data = {idUnidad: id, nombreUnidad: nombre, ver:0}
        let cadena = 'select_card_view_'+id

        if(this.stops){

            if(this.unidadesSeleccion.length == 0){
                data = {idUnidad: id, nombreUnidad: nombre, ver:0}
                this.unidadesSeleccion.push(data);
                $("#"+cadena).css({'display':'block'}); 
            }else{
                const index = this.unidadesSeleccion.findIndex(objeto => objeto.idUnidad === data.idUnidad && objeto.nombreUnidad === data.nombreUnidad);
                if (index !== -1) {
                    this.unidadesSeleccion.splice(index, 1);
                    $("#"+cadena).css({'display':'none'});
                }else{
                    this.notificaciones('error', 'Con la opcion activada de Stops, solo puedes seleccionar una unidad')
                }
            }
        }else{
            if(this.unidadesSeleccion.length > 0){
                
                const index = this.unidadesSeleccion.findIndex(objeto => objeto.idUnidad === data.idUnidad && objeto.nombreUnidad === data.nombreUnidad);
                if (index !== -1) {
                    this.unidadesSeleccion.splice(index, 1);
                    $("#"+cadena).css({'display':'none'});
                }else{
                    this.unidadesSeleccion.push(data);
                    $("#"+cadena).css({'display':'block'});
                }

            }else{
                data = {idUnidad: id, nombreUnidad: nombre, ver:0}
                this.unidadesSeleccion.push(data);
                $("#"+cadena).css({'display':'block'}); 
            }
        }
    },

    async regresarUnidades(){
        this.unidadesSeleccion = []
        this.$bvModal.hide("inicio-unidades");
        this.$bvModal.show("inicio-modalidad");
        
    },

    recargaUnidadesSeleccionadas(){
        for (let uni = 0; uni < this.unidadesSeleccion.length; uni++) {
            let cadena = 'select_card_view_'+this.unidadesSeleccion[uni].idUnidad
            cadena = cadena.toString();
            console.log(cadena)
            $("#"+cadena).css({'display':'block'});
        }
    },

    async validaU(){
        if(this.unidadesSeleccion.length == 0){
            await this.notificaciones('error', 'Selecciona una o mas unidades');
            return false;
        }

        this.$bvModal.hide("inicio-unidades");
        this.$bvModal.show("inicio-origen-destino");
        //this.muestraMapaRutas(1);
        //this.$bvModal.show("inicio-origen-destino");
    },

    async activaStops(){

        let cadena = ''

        for (let u = 0; u < this.unidadesSeleccion.length; u++) {
            cadena = 'select_card_view_'+this.unidadesSeleccion[u].idUnidad;
            $("#"+cadena).css({'display':'none'});
        }
            this.unidadesSeleccion = [];

        this.arrayOrigen = []
        this.routes = []
        //await this.muestraMapaRutas(1);
    },

    getLabelProd(item) {
        
        this.clasifica = item.descripcion;
        this.idclasifica = item.clave_prodserv;
        this.isSusceptibleRobo = item.susceptibleRobo;
        this.porcentajeRobo = parseFloat(item.porcentajeRobo);
        //this.clasificaText = "[" + item.clave_prodserv + "] - " + item.descripcion;
        this.clasificaText = item.descripcion;
        //this.tertipocarga = item.tipoMercancia;
        this.tertipocargaDescrip = item.tipoMercancia;
        //this.clasificaTextDet.push({descripcion:this.clasifica,clave_prodserv:this.idclasifica, isSusceptibleRobo:this.isSusceptibleRobo,porcentajeRobo:this.porcentajeRobo,clasificaText:this.clasificaText,tertipocarga:this.tertipocarga})
        
        if(this.tertipocarga === 'Mercancía General'){
            this.tertipocarga = 'g'
        }

        if(this.tertipocarga === 'HAZMAT'){
            this.tertipocarga = 'h'
        }
        
        if(this.tertipocarga === 'REFRIGERADA'){
            this.tertipocarga = 'r'
        }
        
        
    },

    limpaVarMercancias(){
        /*this.clasifica = '';
        this.idclasifica = '';
        this.isSusceptibleRobo = false;
        this.porcentajeRobo = 0;
        this.clasificaText = '';
        this.tertipocargaDescrip = []
        this.tertipocarga = ''
        this.descripMerc = ''
        this.unidaMedidaMerc = ''
        this.embalajeId = 0
        this.embalajeNombre = ''
        this.terDescEmbalaje = ''
        this.embalajeAlto = 0
        this.embalajeAncho = 0
        this.embalajeLargo = 0
        this.embalajeCapacidadMaxima = 0
        this.terestibable = ''*/
        this.cantMerc = 0
        this.largoMerc = 0
        this.anchoMerc = 0
        this.altoMerc = 0
        this.pesTMerc = 0
        this.pesoTotal = 0
        this.unMerc = ''
        this.classMerc = ''
        this.gradosMerc = ''
        this.tUnidadMerc = ''
        this.volMerc = 0
        this.volMercTot = 0
        this.pesoVol = 0
        this.pesoVolTot = 0
        //this.unidaPesoMerc
        this.valStops = 0
        this.valUnidadMerc = 0
        this.aplicaAumentoAlto = false
        this.aplicaAumentoAncho = false
        this.aplicaAumentoLargo = false
        this.aplicaAumentoPeso = false
    },

    clasificaciones(text) {
        let input = text;
        if (input.length >= 3) {
            this.isLoadingM = true
            axios({
                method: "post",
                    url: "/api/v1/search-proser/",
                    data: {
                    data: input,
                },
            }).then((response) => {
                this.dates_search_proser = response.data;
                this.isLoadingM = false
            }).catch((error) => {
                console.log(error);
            });
        }
    },

    selectUniMedMerc() {
        let unidadMedida = this.unidaMedidaMerc;
    },

    selectEstibable() {

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            if(this.valUnidadMerc > 0){
                this.selectUnidadMerc();
            }
        }else{
            if (this.terestibable == "no") {
            this.altoMerc = parseFloat(this.embalajeAlto);
            }

            if (this.terestibable == "si") {
                this.altoMerc = 0;
            }
        }
        

    },

    getEmbalaje() {
        axios.get(`embalajes/`).then((response) => {
            this.embalajes = response.data;
        }).catch((error) => {
            console.log(error);
        });
    },

    selectEmbalaje(evento) {
        let tipoEmbalaje = evento;

        if (this.embalajes.findIndex((x) => x.idEmbalaje === tipoEmbalaje) >= 0) {
            let index_embalaje = this.embalajes.findIndex((x) => x.idEmbalaje === tipoEmbalaje);
            this.embalajeId = parseInt(this.embalajes[index_embalaje].idEmbalaje);
            this.embalajeNombre = this.embalajes[index_embalaje].nombre;
            this.terDescEmbalaje = this.embalajeNombre.toUpperCase();
            this.embalajeAlto = parseFloat(this.embalajes[index_embalaje].alto);
            this.embalajeAncho = parseFloat(this.embalajes[index_embalaje].ancho);
            this.embalajeLargo = parseFloat(this.embalajes[index_embalaje].largo);
            this.embalajeCapacidadMaxima = parseInt(this.embalajes[index_embalaje].cantidadMaxima);
        }
    },

    validaCantidad() {
        let cant = parseInt(this.cantMerc);
        let cantUnidad = 0
        let idUnidadSel = this.valUnidadMerc;
        let embalaje = this.embalajeNombre;

        if (cant < 0 ) {
            this.notificaciones('error','La cantidad no puede ser menor a cero')
            this.cantMerc = 0;
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);
            cantUnidad = parseInt(this.units[index_unidad].capacidadMaxima)
            if(this.units[index_unidad].aplica_estiba == 'si' && this.terestibable == 'no'){
                cantUnidad = cantUnidad / 2
            }

            if(cant > cantUnidad ){
                this.notificaciones('error','La cantidad de '+embalaje+' para la unidad '+this.units[index_unidad].name + ' es de maximo '+cantUnidad+' cuando la mercancia es '+this.terestibable+' estibable, verificalo por favor.')
                this.cantMerc = 0;
                return false
            }
        }else{
            if (cant > 12 ) {
                this.cantMerc = 12;
            }
        }

        
        this.getPesoVolumetrico();
    },

    async validaAlto() {
        this.altoMerc = parseFloat(this.altoMerc)
        let alto = this.altoMerc;
        let idUnidadSel = this.valUnidadMerc;
        let embalaje = this.embalajeNombre;

        if(alto < 0){
            this.notificaciones('error','La medida de Alto no puede ser menor a cero')
            this.altoMerc = 0;
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);            
            if(alto > parseFloat(this.units[index_unidad].high) ){
                this.notificaciones('error','La altura de los '+embalaje+' para la unidad '+this.units[index_unidad].name + ' es de maximo '+this.units[index_unidad].high+' metros, verificalo por favor.')
                this.altoMerc = 0;
                return false
            }
            
        }else{
            if(this.altoMerc > 1.48){
                this.altoMerc = this.altoMerc
                await this.notificaciones('error','La medida ingresada en la altura sobrepasa el limite para considerarse Estibable.');
                this.aplicaAumento = false;
                this.terestibable = "no"
                this.selectEstibable();
            }

            if(this.altoMerc < 0) {
                this.altoMerc = 0;
            } else {
                if(this.altoMerc > 2){
                    this.altoMerc = this.altoMerc
                    this.aplicaAumentoAlto = false;
                }else if(this.altoMerc > 1.21 && this.altoMerc < 1.48){
                    this.aplicaAumentoAlto = true;
                }else if(this.altoMerc > 1.48){
                    this.altoMercReal = 2.4
                    this.aplicaAumentoAlto = false;
                }else if(this.altoMerc > 2.4){
                    this.altoMercReal = 2.4
                    this.aplicaAumentoAlto = false;
                }
            }
        }

        if(this.altoMerc > 0 && this.anchoMerc > 0 && this.largoMerc > 0){
            this.calculaVolumen();
        }
        
        this.getPesoVolumetrico();
    },

    async validaAncho() {

        this.anchoMerc = parseFloat(this.anchoMerc)
        let ancho = this.anchoMerc
        let idUnidadSel = this.valUnidadMerc;
        let embalaje = this.embalajeNombre;

        if(ancho < 0){
            this.notificaciones('error','La medida del Ancho no puede ser menor a cero')
            this.anchoMerc = 0;
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);
            if(ancho > parseFloat(this.units[index_unidad].width) ){
                this.notificaciones('error','El ancho de los '+embalaje+' para la unidad '+this.units[index_unidad].name + ' es de maximo '+this.units[index_unidad].width+' metros, verificalo por favor.')
                this.anchooMerc = 0;
                return false
            }
        }else{
            if(this.anchoMerc > 2.48){
                await this.notificaciones('error','El ancho ingresado supera el limite de la unidad, verifícalo');
                this.anchoMerc = 0
            }

            if(this.anchoMerc >= 1.21 && this.anchoMerc < 1.28){
                this.aplicaAumentoAncho = true;
            }else if(this.anchoMerc > 1.28 && this.anchoMerc < 1.48){
                this.anchoMerc = 2.4
            }else if(this.anchoMerc > 1.48 && this.anchoMerc <= 2.48){
                this.aplicaAumentoAncho = false;
                this.aplicaPosicionAncho = true;
            }
        }

        if(this.altoMerc > 0 && this.anchoMerc > 0 && this.largoMerc > 0){
            this.calculaVolumen();
        }

        this.getPesoVolumetrico();
    },

    async validaLargo() {

        this.largoMerc = parseFloat(this.largoMerc)

        let largo = this.largoMerc
        let idUnidadSel = this.valUnidadMerc;
        let embalaje = this.embalajeNombre;

        if(largo < 0){
            this.notificaciones('error','La medida del Largo no puede ser menor a cero')
            this.largoMerc = 0;
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);
            if(largo > parseFloat(this.units[index_unidad].long) ){
                this.notificaciones('error','El Largo de los '+embalaje+' para la unidad '+this.units[index_unidad].name + ' es de maximo '+this.units[index_unidad].long+' metros, verificalo por favor.')
                this.largoMerc = 0;
                return false
            }
        }else{
            if(this.largoMerc > 13){
                await this.notificaciones('error','El largo ingresado supera el limite de la unidad, verifícalo');
                this.largoMerc = 0
            }

            if(this.largoMerc >= 1.21 && this.largoMerc < 1.48){
                this.aplicaAumentoLargo = true;
            }else if(this.largoMerc > 1.48 && this.largoMerc <= 2.4){
                this.largoMerc = 2.4
            }else if(this.largoMerc > 2.4 && this.largoMerc <= 2.68){
                this.aplicaAumentoLargo = true;
            }else if(this.largoMerc > 2.68 && this.largoMerc <= 3.6){ 
                this.largoMerc = 3.6
            }else if(this.largoMerc > 3.6 && this.largoMerc <=  4.8){
                this.largoMerc = 4.8
            }else if(this.largoMerc > 4.8 && this.largoMerc <=  6.0){
                this.largoMerc = 6.0
            }else if(this.largoMerc > 6.0 && this.largoMerc <= 7.2){
                this.largoMerc = 7.2
            }else if(this.largoMerc > 7.2 && this.largoMerc <= 8.4){
                this.largoMerc = 8.4
            }else if(this.largoMerc > 8.4 && this.largoMerc <= 9.6){
                this.largoMerc = 9.6
            }else if(this.largoMerc > 9.6 && this.largoMerc <= 10.8){
                this.largoMerc = 10.8
            }else if(this.largoMerc > 10.8 && this.largoMerc <= 12){
                this.largoMerc = 12
            }else if(this.largoMerc > 12.0 && this.largoMerc <= 13.2){
                this.largoMerc = 13.2
            }
        }

        if(this.altoMerc > 0 && this.anchoMerc > 0 && this.largoMerc > 0){
            this.calculaVolumen();
        }

    },

    validaPeso() {
        let cant = parseFloat(this.cantMerc);
        let peso = parseFloat(this.pesTMerc);
        let idUnidadSel = this.valUnidadMerc;
        let embalaje = this.embalajeNombre;

        if(peso < 0){
            this.notificaciones('error','La medida del Largo no puede ser menor a cero')
            this.pesTMerc = 0;
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);
            if(peso > parseFloat(this.units[index_unidad].peso_bruto_total) ){
                this.notificaciones('error','El Peso de los '+embalaje+' para la unidad '+this.units[index_unidad].name + ' es de maximo '+this.units[index_unidad].peso_bruto_total+' Kg, verificalo por favor.')
                this.pesTMerc = 0;
                return false
            }
        }

        this.pesoTotal = cant * peso;

        this.getPesoVolumetrico();
    },

    getPesoVolumetrico(){

        let factor = 0
        for (let ta = 0; ta < this.tarifarios.length; ta++) {
            factor = this.tarifarios[ta].factorConversion   
        }
        if(this.terestibable != '' && this.largoMerc > 0 && this.anchoMerc > 0 && this.altoMerc > 0){
            if(this.terestibable == 'si'){
                this.pesoVol = this.largoMerc * this.altoMerc * this.anchoMerc * factor
                this.pesoVolTot = this.pesoVol * this.cantMerc
                
                this.pesoVol = this.pesoVol.toFixed(2)
                this.pesoVolTot = this.pesoVolTot.toFixed(2)
            }else if(this.terestibable == 'no'){
                this.pesoVol = ((this.largoMerc * this.anchoMerc) / 2.073732) * factor
                this.pesoVolTot = this.pesoVol * this.cantMerc
                this.pesoVol = this.pesoVol.toFixed(2)
                this.pesoVolTot = this.pesoVolTot.toFixed(2)
            
            }
        }
    },

    async addMercancia (newTag) {
        await this.notificaciones('error','No se reconoce la mercancia: '+newTag+' dentro del catálogo del SAT, verifícalo porfavor.');
        return false;
    },

    async agregaPaquetes() {

        let clasifica = this.clasifica;
        let idclasifica = this.idclasifica;
        let isSusceptibleRobo = this.isSusceptibleRobo;
        let porcentajeRobo = this.porcentajeRobo;
        let clasificaText = this.clasificaText;
        let tertipocargaDescrip = this.tertipocargaDescrip;
        let iconCarga = 'fas fa-box';
        let tertipocarga = 'General';
        let descripMerc = this.descripMerc;
        let unidaMedidaMerc = this.unidaMedidaMerc;
        let embalajeId = this.embalajeId;
        let embalajeNombre = this.embalajeNombre;
        let terDescEmbalaje = this.terDescEmbalaje;
        let embalajeAlto = this.embalajeAlto;
        let embalajeAncho = this.embalajeAncho;
        let embalajeLargo = this.embalajeLargo;
        let embalajeCapacidadMaxima = this.embalajeCapacidadMaxima;
        let unMerc = this.unMerc;
        let classMerc = this.classMerc;
        let gradosMerc = this.gradosMerc;
        let tUnidadMerc = this.tUnidadMerc;

        let estibable = this.terestibable;
        let cant = parseFloat(this.cantMerc);
        let peso = parseFloat(this.pesTMerc);
        let pesoT = parseFloat(this.pesoTotal);
        let alto = parseFloat(this.altoMerc);
        let ancho = parseFloat(this.anchoMerc);
        let largo = parseFloat(this.largoMerc);
        let volumen = parseFloat(this.volMerc);
        let volumenTotal = parseFloat(this.volMercTot);
        let pesoVol = parseFloat(this.pesoVol);
        let pesoVolTot = parseFloat(this.pesoVolTot);
        let unidadM = this.unidaMedidaMerc;
        let embalaje = this.terDescEmbalaje.toUpperCase();
        let unidadP = this.unidaPesoMerc;
        let id_ruta = this.valStops;
        let idUnidadSel = this.valUnidadMerc

        let ruta = '';
        let id_unidad = 0;
        let unidad = '';

        let idPaq = this.agregarMercancias.length + 1;
        let precioTotal = 0;
        
        if (clasificaText = '') {
            await this.notificaciones('error','Ingresa una clasificación del catalogo del SAT.');
            return false;
        }

        if (descripMerc = '') {
            await this.notificaciones('error','Ingresa una descripcion para la mercancia seleccionada.');
            return false;
        }

        if (unidaMedidaMerc = '') {
            await this.notificaciones('error','Selecciona una unidad de medida de la lista.');
            return false;
        }

        if (embalajeNombre = '') {
            await this.notificaciones('error','Selecciona un tipo de Embalaje.');
            return false;
        }

        if(this.checkPeligrosa){
            if(unMerc == ''){
                this.notificaciones('error','Ingresa el UN de la mercancía.');
                return false;
            }

            if(classMerc == ''){
                this.notificaciones('error','Ingresa el CLASS de la mercancía.');
                return false;
            }
        }

        if(this.checkRefrigerada){
            if(gradosMerc == ''){
                this.notificaciones('error','Ingresa los grados de refrigeración de la mercancía.');
                return false;
            }

            if (tUnidadMerc == '') {
                this.notificaciones('error','Ingresa especificaciones adicionales de la mercancía.');
                return false;
            }
        }

        if (cant <= 0) {
            await this.notificaciones('error','Ingresa una cantidad mayor a 0.');
            return false;
        }

        if (largo <= 0) {
            await this.notificaciones('error','Ingresa un largo mayor a 0.');    
            return false;
        }

        if (ancho <= 0) {
            await this.notificaciones('error','Ingresa un ancho mayor a 0.');
            return false;
        }

        if (alto <= 0) {
            await this.notificaciones('error','Ingresa un ancho mayor a 0.');
            return false;
        }
        
        if (peso <= 0) {
            await this.notificaciones('error','Ingresa un peso mayor a 0.');
            return false;
        }

        if (pesoT <= 0) {
            await this.notificaciones('error','El peso calculado debe ser mayor a 0.');    
            return false;
        }

        if (volumen <= 0) {
            await this.notificaciones('error','El volumen calculado debe ser mayor a 0.');
            return false;
        }

        if (unidadP == "") {
            await this.notificaciones('error','Selecciona una unidad de peso.');
            return false;
        }

        if (estibable == "") {
            await this.notificaciones('error','Selecciona un embalaje');
            return false;
        }

        if(this.stops){
            if (id_ruta == "" || id_ruta == 0) {
                await this.notificaciones('error','Selecciona una ruta');
                return false;
            }
        }   

        if(this.stops){
            let index_service = this.routes.findIndex((x) => x.id_ruta === id_ruta);
            this.routes_resp.push(this.routes[index_service])
            this.routes[index_service].ver = 1;
            ruta = this.routes[index_service].estado_o + ' - ' + this.routes[index_service].estado_d

            
        }

        if(this.termodalidad != 'LTL'){
            let index_unidad = this.units.findIndex((x) => x.id === idUnidadSel);
            id_unidad = this.units[index_unidad].id
            unidad = this.units[index_unidad].name
        }
        

        if(this.checkPeligrosa){
            tertipocarga = 'Peligrosa';
            iconCarga = 'fas fa-exclamation-triangle';
        }

        if(this.checkRefrigerada){
            tertipocarga = 'Refrigerada';
            iconCarga = 'fas fa-temperature-low';
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
            precio: precioTotal,
            id_ruta: id_ruta,
            ruta: ruta,
            id_unidad: id_unidad,
            unidad: unidad,
            id_clasifica: idclasifica,
            clasificacion: clasifica,
            descripcionMercancia: this.descripMerc,
            tertipocargaDescrip: tertipocargaDescrip,
            tertipocarga: tertipocarga,
            iconoCarga: iconCarga,
            embalajeId: embalajeId,
            embalajeNombre: embalajeNombre,
            aumentoAlto: this.aumentoAlto,
            aumentoAncho: this.aumentoAncho,
            aumentoLargo: this.aumentoLargo,
            aumentoPeso: this.aumentoPeso,
            mercancia: tertipocarga,
            un: unMerc,
            classP: classMerc,
            grados:gradosMerc,
            descripRef: tUnidadMerc,
            es_peligrosa: this.checkPeligrosa,
            es_refrigerada: this.checkRefrigerada,

        };

        if(this.termodalidad == 'FTL' && !this.stops){
            let index_unidad_select = this.unidadesSeleccion.findIndex((y) => y.idUnidad === idUnidadSel)
            this.unidadesSeleccion[index_unidad_select].ver = 1;
        }

        this.agregarMercancias.push(agrega);

        this.limpaVarMercancias();

        this.getPesoVolumetrico();
        
        this.definePesoXVol = true;
        this.detallesMercancias();

        if(this.termodalidad == 'LTL'){
            await this.buscaUnidadLTL();
        }
            
    },

    async regresarMercancias(){
        this.$bvModal.hide("inicio-mercancias");
        this.$bvModal.show("inicio-origen-destino");
        await this.muestraMapaRutas(1);
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

    async eliminaPaquete(idPaq) {

        let indice = this.agregarMercancias.map((busqueda) => busqueda.idPaq).indexOf(idPaq);

        if(this.stops){
            let id_ruta = this.agregarMercancias[indice].id_ruta

            let index_route = this.routes.findIndex((x) => x.id_ruta === id_ruta);
            this.routes[index_route].ver = 0;
            
            let index_route_resp = this.routes_resp.findIndex((x) => x.id_ruta === id_ruta);
            this.routes_resp.splice(index_route_resp, 1)
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            let idU = parseInt(this.agregarMercancias[indice].id_unidad)
        
            let index_unidad_select = this.unidadesSeleccion.findIndex((y) => y.idUnidad === idU)
            this.unidadesSeleccion[index_unidad_select].ver = 0;

            let index_unidad_resp = this.units_resp.findIndex((z) => z.idUnidad === idU)
            this.units_resp.splice(index_unidad_resp, 1);
        }

        this.agregarMercancias.splice(indice, 1);
        if(this.termodalidad == 'LTL'){
            await this.buscaUnidadLTL();
        }
        this.notificaciones('success','Mercancia eliminada correctamente');
    },

    selectUnidadMerc(){
        let idUnidad = this.valUnidadMerc;

        if(idUnidad != undefined && idUnidad > 0){
            let embalaje = this.embalajeNombre;
            let index_unidad = this.units.findIndex((x) => x.id === idUnidad);
            //console.log(this.unidadesSeleccion);
            
            let index_unidad_sel = this.unidadesSeleccion.findIndex((x) => x.idUnidad === idUnidad);
            let info = {idUnidad:this.unidadesSeleccion[index_unidad_sel].idUnidad, nombreUnidad:this.unidadesSeleccion[index_unidad_sel].nombreUnidad, ver:this.unidadesSeleccion[index_unidad_sel].ver};
            this.units_resp.push(info)
            if(this.terestibable == 'no'){
                this.notificaciones('info','La altura de los '+embalaje+' para la unidad '+this.units[index_unidad].name + ' se ajusto a '+this.units[index_unidad].high+' metros, que es el maximo permitido para la unidad.')
                this.altoMerc = parseFloat(this.units[index_unidad].high);
            }else{
                this.altoMerc = 0;
            }
        }
        

    },
    
    formatMoney(value) {
        let val = (value / 1).toFixed(2).replace(",", ".");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    validaValorPeligrosa(){
        if(!this.checkPeligrosa){
            this.unMerc = ''
            this.classMerc = ''
        }
    },

    validaValorRefrigerada(){
        if (!this.checkRefrigerada) {
            this.gradosMerc = ''
            this.tUnidadMerc = ''
        }
    },

    async validaMercancias(){

        if (this.agregarMercancias.length == 0 ) {
            this.notificaciones('error','Debe de haber al menos 1 mercancía ingresada para poder realizar la cotización.');
            return false
        }

        if(this.stops){
            if(this.routes_resp.length < this.routes.length){
                this.notificaciones('error','Antes de cotizar, asegurate de haber asignado una ruta a tus mercancias.');
                return false
            }
        }

        if(this.termodalidad == 'FTL' || this.termodalidad == 'FCL'){
            if(this.units_resp.length < this.unidadesSeleccion.length){
                this.notificaciones('error','Antes de cotizar, asegurate de haber asignado todas las unidades a tus mercancias.');
                return false
            }
            
        }

        await this.generateCotizacion(1);

        this.$bvModal.hide("inicio-mercancias");
    },

    buscaUnidadLTL() {

        this.unidadesSeleccion = [];

        this.units.some((unidad) => {
            let puedeTransportar = true;
            let pesoTotalMercancias = 0;
            let volumenTotalMercancias = 0;
            let capacidadMaxima = 0;

            this.agregarMercancias.forEach((mercancia) => {
                // Sumar el peso y volumen totales de las mercancías
                pesoTotalMercancias += parseFloat(mercancia.pesoTotal);
                volumenTotalMercancias += parseFloat(mercancia.volumenTotal);
                capacidadMaxima += parseInt(mercancia.cantidad);

                // Validar las dimensiones de cada mercancía
                if (parseFloat(mercancia.peso) > parseFloat(unidad.peso_bruto_total) || parseFloat(mercancia.alto) > parseFloat(unidad.high) || parseFloat(mercancia.ancho) > parseFloat(unidad.width) || parseFloat(mercancia.largo) > parseFloat(unidad.long) || parseFloat(mercancia.volumenTotal) > parseFloat(unidad.capacidad_vol)) {
                    puedeTransportar = false;
                }
            });

            // Validar el peso y volumen totales
            if (pesoTotalMercancias > parseFloat(unidad.peso_bruto_total) || volumenTotalMercancias > parseFloat(unidad.capacidad_vol) || capacidadMaxima > parseFloat(unidad.capacidadMaxima)) {
                puedeTransportar = false;
            }

            // Si la unidad puede transportar las mercancías, asignarla
            if (puedeTransportar) {
                let data = {idUnidad: parseInt(unidad.id), nombreUnidad: unidad.name, ver:0}
                this.unidadesSeleccion.push(data);

                for (let m = 0; m < this.agregarMercancias.length; m++) {
                    this.agregarMercancias[m].id_unidad = parseInt(unidad.id);
                    this.agregarMercancias[m].unidad = unidad.name;   
                }
                
                return true;
            }
            return false;
        });

        //Validacion para hacer una sola mercancia y mostrar una sola card cuando la modaldiad es LTL
        if(this.termodalidad == 'LTL' && this.agregarMercancias.length > 1){
            let totalPeso = 0;
            let totalVolumen = 0;
            let totalPesoVolumetrico = 0;
            let leyenda = '';
            let leyendaAnt = '';
            let precioTotal = 0;
            let catidadTotal = 0;
            let vAlto = false;
            let vAncho = false;
            let vLargo = false;
            let vPeso = false;
            let alto = 0;
            let ancho = 0;
            let largo = 0;
            let peso = 0;
            let referencias = [];
            let idUnidad = 0;
            let unidad = '';
            let factor = 0;
            let fleteNacional = 0;
            let km = 0;

            for (let ta = 0; ta < this.tarifarios.length; ta++) {
                factor = this.tarifarios[ta].factorConversion
                fleteNacional = this.tarifarios[ta].flete_nacional
                km = parseFloat(this.tarifarios[ta].km)
            }

            for (let m = 0; m < this.agregarMercancias.length; m++) {
                totalPeso += parseFloat(this.agregarMercancias[m].pesoTotal);
                totalVolumen += parseFloat(this.agregarMercancias[m].volumenTotal);
                totalPesoVolumetrico += parseFloat(this.agregarMercancias[m].pesoVolumetricoTotal);
                catidadTotal += parseInt(this.agregarMercancias[m].cantidad);
                vAlto = this.agregarMercancias[m].aumentoAlto;
                vAncho = this.agregarMercancias[m].aumentoAncho;
                vLargo = this.agregarMercancias[m].aumentoLargo;
                vPeso = this.agregarMercancias[m].aumentoPeso;
                alto += parseFloat(this.agregarMercancias[m].alto);
                ancho += parseFloat(this.agregarMercancias[m].ancho);
                largo += parseFloat(this.agregarMercancias[m].largo);
                peso += parseFloat(this.agregarMercancias[m].peso);
                if(leyenda == ''){
                    leyenda = this.agregarMercancias[m].clasificacion
                    leyendaAnt = this.agregarMercancias[m].clasificacion
                }else{
                    if(leyendaAnt != this.agregarMercancias[m].clasificacion){
                        leyenda = leyenda + ', ' + this.agregarMercancias[m].clasificacion
                    }
                    
                }
                referencias.push(this.agregarMercancias[m]);
                idUnidad = this.agregarMercancias[m].id_unidad;
                unidad = this.agregarMercancias[m].unidad;
            }

            if(totalPesoVolumetrico > totalPeso){
                precioTotal = ((fleteNacional / factor) * totalPesoVolumetrico )
            }else{
                precioTotal = ((totalPeso / factor) * fleteNacional )
            }
            if(vAlto || vAncho || vLargo || vPeso){
                precioTotal = precioTotal * 1.35
            }
                
            this.cifraOriginal = parseFloat(precioTotal.toFixed(2))
            precioTotal = this.cifraOriginal

            let merc = {
                "idPaq": 1,
                "cantidad": catidadTotal,
                "peso": peso,
                "pesoTotal": totalPeso,
                "alto": alto,
                "ancho": ancho,
                "largo": largo,
                "medida": "mt",
                "embalaje": "PALLETS",
                "upeso": "kg",
                "volumen": 0,
                "volumenTotal": totalVolumen,
                "estibable": "si",
                "pesoVolumetrico": 0,
                "pesoVolumetricoTotal": totalPesoVolumetrico,
                "precio": precioTotal,
                "id_ruta": 0,
                "ruta": "",
                "id_unidad": idUnidad,
                "unidad": unidad,
                "id_clasifica": "55101525",
                "clasificacion": leyenda,
                "tertipocargaDescrip": "Mercancía General",
                "tertipocarga": "",
                "embalajeId": 1,
                "embalajeNombre": "",
                "referencias": referencias,
            }
            this.agregarMercancias = []
            this.agregarMercancias.push(merc)
            console.log(this.agregarMercancias, 'LTL, 2 merc');
            
        }
    },

    async generateCotizacion(val){

        let precioTotal = 0
        let factor = 0
        let fleteNacional = 0
        let pesoVolTot = 0
        let pesoT = 0

        let km = 0;
        let tarifaU = 0;
        let tipo_zona_text = ''
        let identificador = ''

        let porcentajePeligrosa = 0;
        let totalPeligrosa = 0;
        let porcentajeRefrigerada = 0;
        let totalRefrigerada = 0;
        let porcentajeZona = 0;
        let totalZona = 0;

        this.tercotizacion = val;

        if(this.termodalidad == 'LTL'){
            for (let m = 0; m < this.agregarMercancias.length; m++) {

                pesoVolTot = parseFloat(this.agregarMercancias[m].pesoVolumetricoTotal);
                pesoT = parseFloat(this.agregarMercancias[m].pesoTotal)

                console.log(this.tarifarios[0]);
                tipo_zona_text = this.tarifarios[0].tipo_zona_text
                factor = this.tarifarios[0].factorConversion
                fleteNacional = this.tarifarios[0].flete_nacional
                km = parseFloat(this.tarifarios[0].km)
                identificador = this.tarifarios[0].identificador
                //Incremento por peligrosa
                if(this.checkPeligrosa){
                    let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga IMO');
                    porcentajePeligrosa = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                    totalPeligrosa = (fleteNacional * (porcentajePeligrosa / 100))
                    
                }
                //Incremento por refrigerada
                if(this.checkPeligrosa){
                    let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga Refrigerada');
                    porcentajeRefrigerada = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                    totalRefrigerada = (fleteNacional * (porcentajeRefrigerada / 100))
                }
                for (let p = 0; p < this.listPorcentajes.length; p++) {
                    if(this.listPorcentajes[p].mercancia === tipo_zona_text){
                        porcentajeZona = parseFloat(this.listPorcentajes[p].porcentaje);
                        totalZona = (fleteNacional * (porcentajeZona / 100));
                        break;
                    }
                    
                }
                fleteNacional = fleteNacional + totalPeligrosa + totalRefrigerada + totalZona
                if(pesoVolTot > pesoT){
                    precioTotal = ((fleteNacional / factor) * pesoVolTot )                
                    this.leyendaPeso = ''
                    this.leyendaVolumen = '(Volumen Tasable)'
                }else{
                    precioTotal = ((pesoT / factor) * fleteNacional )
                    this.leyendaPeso = '(Peso Tasable)'
                    this.leyendaVolumen = ''
                }
                if(this.aplicaAumentoAlto || this.aplicaAumentoAncho || this.aplicaAumentoLargo || this.aplicaAumentoPeso){
                    precioTotal = precioTotal * 1.35
                }
                    
                this.cifraOriginal = parseFloat(precioTotal.toFixed(2))
                precioTotal = this.cifraOriginal
                this.$set(this.agregarMercancias[m], 'precio', precioTotal);
                this.$set(this.agregarMercancias[m], 'ruta', identificador);
            }
        }

        if((this.termodalidad == 'FTL' || this.termodalidad == 'FCL') && this.stops){
            for (let m = 0; m < this.agregarMercancias.length; m++) {
                
                let index_tar = this.tarifarios.findIndex((x) => x.idTarifa === this.agregarMercancias[m].id_ruta);
                tipo_zona_text = this.tarifarios[index_tar].tipo_zona_text
                km = parseFloat(this.tarifarios[index_tar].km)
                identificador = this.tarifarios[index_tar].identificador

                let index_unidad = this.units.findIndex((x) => x.id === this.agregarMercancias[m].id_unidad);
                tarifaU = parseFloat(this.units[index_unidad].precio_kilometraje)

                if(km > 150 && km < 500){
                    tarifaU = (tarifaU * 0.35) + tarifaU
                }else if(km > 500 && km < 800){
                    tarifaU = (tarifaU * 0.35) - tarifaU
                }else if(km > 800){
                    tarifaU = (tarifaU * 0.45) - tarifaU
                }
                
                //Incremento por peligrosa
                if(this.checkPeligrosa){
                    let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga IMO');
                    porcentajePeligrosa = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                    totalPeligrosa = (tarifaU * (porcentajePeligrosa / 100))
                    
                }

                //Incremento por refrigerada
                if(this.checkPeligrosa){
                    let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga Refrigerada');
                    porcentajeRefrigerada = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                    totalRefrigerada = (tarifaU * (porcentajeRefrigerada / 100))
                }

                //Incremento tipo zona
                for (let p = 0; p < this.listPorcentajes.length; p++) {
                    if(this.listPorcentajes[p].mercancia === tipo_zona_text){
                        porcentajeZona = parseFloat(this.listPorcentajes[p].porcentaje);
                        totalZona = (tarifaU * (porcentajeZona / 100));
                        break;
                    }
                    
                }

                tarifaU = tarifaU + totalPeligrosa + totalRefrigerada + totalZona

                precioTotal = tarifaU * km;
                this.cifraOriginal = parseFloat(precioTotal.toFixed(2))
                precioTotal = this.cifraOriginal

                this.$set(this.agregarMercancias[m], 'precio', precioTotal);
                this.$set(this.agregarMercancias[m], 'ruta', identificador);
            }
                
        }

        if((this.termodalidad == 'FTL' || this.termodalidad == 'FCL') && !this.stops){

            let aMerc = this.agregarMercancias;
            this.agregarMercancias = []
            let newMercanciaArray = [];

            aMerc.forEach((item) => {
                this.tarifarios.forEach((tarifa) => {
                    let newItem = { ...item };

                    let index_unidad = this.units.findIndex((x) => x.id === item.id_unidad);
                    tarifaU = parseFloat(this.units[index_unidad].precio_kilometraje)

                    tipo_zona_text = tarifa.tipo_zona_text
                    km = parseFloat(tarifa.km)
                    identificador = tarifa.identificador

                    if(km > 150 && km < 500){
                        tarifaU = (tarifaU * 0.35) + tarifaU
                    }else if(km > 500 && km < 800){
                        tarifaU = (tarifaU * 0.35) - tarifaU
                    }else if(km > 800){
                        tarifaU = (tarifaU * 0.45) - tarifaU
                    }

                    //Incremento por peligrosa
                    if(this.checkPeligrosa){
                        let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga IMO');
                        porcentajePeligrosa = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                        totalPeligrosa = (tarifaU * (porcentajePeligrosa / 100))
                        
                    }

                    //Incremento por refrigerada
                    if(this.checkRefrigerada){
                        let index_imo = this.listPorcentajes.findIndex((x) => x.mercancia === 'Carga Refrigerada');
                        porcentajeRefrigerada = parseFloat(this.listPorcentajes[index_imo].porcentaje)
                        totalRefrigerada = (tarifaU * (porcentajeRefrigerada / 100))
                    }

                    //Incremento tipo zona
                    for (let p = 0; p < this.listPorcentajes.length; p++) {
                        if(this.listPorcentajes[p].mercancia === tipo_zona_text){
                            porcentajeZona = parseFloat(this.listPorcentajes[p].porcentaje);
                            totalZona = (tarifaU * (porcentajeZona / 100));
                            break;
                        }
                        
                    }

                    tarifaU = tarifaU + totalPeligrosa + totalRefrigerada + totalZona

                    precioTotal = tarifaU * km;
                    this.cifraOriginal = parseFloat(precioTotal.toFixed(2))
                    precioTotal = this.cifraOriginal

                    // Asignar la ruta y precio
                    newItem.ruta = identificador;
                    newItem.precio = precioTotal;
                    
                    // Agregar la copia al nuevo array
                    newMercanciaArray.push(newItem);
                });
            })
            
            this.agregarMercancias = newMercanciaArray
            
        }

        await this.generaCards();

    },

    generaCards(){

        let idServicio = 0
        let nombreServicio = ''
        let objServ = {}
        let objAdd = {}
        let objRuta = {}
        let objMerc= {}
        
        //Se agregan servicios default

        this.selectServices.push(1); //FLETE NACIONAL

        if(this.termodalidad == 'LTL'){
            if(this.tipoEnvioDetalleSi){
                this.selectServices.push(9); //INGRESO ADUANAL
            }else{
                this.selectServices.push(11); //ENTREGA
            }
            this.selectServices.push(10); //RECOLECCION
        }

        //Genera card LTL
        this.cards = [];

        if(this.termodalidad == 'LTL'){

            this.agregarMercancias.forEach((merc) => {
                let index_unidad = this.units.findIndex((x) => x.id === merc.id_unidad);
                let unidad = this.units[index_unidad]

                let total = parseFloat(merc.precio);
                let volumen = parseFloat(merc.volumenTotal)
                let peso = parseFloat(merc.pesoTotal)
                let cantidad = parseInt(merc.cantidad)
                
                objServ = {servicios:this.selectServices}
                objAdd = {id_unidad:this.units[index_unidad].id,precioTotalFinal:total, volumenTotalFinal:volumen, pesoTotalFinal:peso, cantidadTotalFinal:cantidad, folio_cotizacion: '', id_cotizacion:0, id_card:this.cards.length + 1}
                            
                let crd = Object.assign({}, this.routes[0], unidad, merc,objServ,objAdd);
                this.cards.push(crd)
            });
        }

        if((this.termodalidad == 'FTL' || this.termodalidad == 'FCL') && this.stops){
            let total = 0
            let volumen = 0
            let peso = 0
            let cantidad = 0
            let id_unidad = 0
            let unidad_name = ''
            let origen  = ''
            let destino  = ''
            let ruta = []
            let merch = []
            let mercancia = ''
            let mercanciaAnt = ''
            let iconMerc = ''
            let clasificacion = ''
            let clasificacionAnt = ''
            let descripcionMercancia = ''
            let descripcionMercanciaAnt = ''
            let embalajes = ''
            let embalajesAnt = ''

            this.agregarMercancias.forEach((merc) => {
                console.log(merc);
                total = total + parseFloat(merc.precio);
                volumen = volumen + parseFloat(merc.volumenTotal)
                peso = peso + parseFloat(merc.pesoTotal)
                cantidad = cantidad + parseInt(merc.cantidad)
                id_unidad = merc.id_unidad

                mercanciaAnt = merc.mercancia

                if(mercancia == ''){
                    mercancia = merc.mercancia
                }else{
                    if(merc.mercancia != mercanciaAnt){
                        mercancia = mercancia + ', '+ merc.mercancia
                    }
                    
                }

                clasificacionAnt = merc.clasificacion

                if(clasificacion == ''){
                    clasificacion = merc.clasificacion
                }else{
                    if(merc.clasificacion != clasificacionAnt){
                        clasificacion = clasificacion + ', ' + merc.clasificacion
                    }
                }

                descripcionMercanciaAnt = merc.descripcionMercancia

                if(descripcionMercancia == ''){
                    descripcionMercancia = merc.descripcionMercancia
                }else{
                    if(descripcionMercanciaAnt != merc.descripcionMercancia){
                        descripcionMercancia = descripcionMercancia + ', '+merc.descripcionMercancia
                    }
                }

                embalajesAnt = merc.embalaje

                if(embalajes == ''){
                    embalajes = merc.embalaje
                }else{
                    if(embalajesAnt != merc.embalaje){
                        embalajes = embalajes + ', '+merc.embalaje
                    }
                }

                iconMerc = merc.iconoCarga

                merch.push(merc)
            });

            this.routes.forEach((item) => {
                ruta.push(item)
            });

            origen = this.routes[0].text_largo_o
            destino = this.routes[this.routes.length-1].text_largo_d
            
            let index_unidad = this.units.findIndex((x) => x.id === id_unidad);
            let unidad = this.units[index_unidad]
            unidad_name = this.units[index_unidad].name

            objMerc = {mercancias:merch}
            objRuta = {route:ruta}

            objServ = {servicios:this.selectServices}
            objAdd = {id_unidad:this.units[index_unidad].id,embalaje:embalajes,unidad:unidad_name, descripcionMercancia: descripcionMercancia, clasificacion: clasificacion, iconoCarga: iconMerc, tertipocarga: mercancia, text_largo_o:origen, text_largo_d:destino,precioTotalFinal:total, volumenTotalFinal:volumen, pesoTotalFinal:peso, cantidadTotalFinal:cantidad, folio_cotizacion: '', id_cotizacion:0, id_card:this.cards.length + 1}
            let crd = Object.assign({}, objRuta, unidad, objMerc,objServ,objAdd);
            this.cards.push(crd)

            console.log(this.cards)
        }

        if((this.termodalidad == 'FTL' || this.termodalidad == 'FCL') && !this.stops){
            this.agregarMercancias.forEach((merc) => {
                let index_unidad = this.units.findIndex((x) => x.id === merc.id_unidad);
                let unidad = this.units[index_unidad]
                
                let index_route = this.routes.findIndex((x) => x.identificador === merc.ruta);
                let ruta = this.routes[index_route]

                let total = parseFloat(merc.precio);
                let volumen = parseFloat(merc.volumenTotal)
                let peso = parseFloat(merc.pesoTotal)
                let cantidad = parseInt(merc.cantidad)

                objServ = {servicios:this.selectServices}
                objAdd = {id_unidad:this.units[index_unidad].id, precioTotalFinal:total, volumenTotalFinal:volumen, pesoTotalFinal:peso, cantidadTotalFinal:cantidad, folio_cotizacion: '', id_cotizacion:0, id_card:this.cards.length + 1}
                            
                let crd = Object.assign({}, ruta, unidad, merc,objServ,objAdd);
                this.cards.push(crd)
            });
        }
    },

    limpiaVariablesGlobales(){
        /*console.log(this.arrayOrigen,'Origen')
        console.log(this.arrayDestino,'Destino')
        console.log(this.tarifarios, 'Tarifario')
        console.log(this.unidadesSeleccion, 'Unidades');
        console.log(this.agregarMercancias, 'Mercancias')
        console.log(this.confirmarServices, 'Servicios')*/

        this.unidadesSeleccion = []
        this.unida
        this.agregarMercancias = []
    },

    async servicioSelecciona(idServicio){
        let comprobacion = document.getElementById(idServicio + "cheServicios").checked;

        if(comprobacion){

            /*if(){
                this.tipoEnvioDetalleSi = true
                this.tipoEnvioDetalleNo = false
            }*/

            this.selectServices.push(idServicio)
            document.getElementById(idServicio + "cheServicios").checked = true;

            if(idServicio == 2){
                if (parseFloat(this.valorMercancia) == 0) {
                    this.$bvModal.show("valorDeclaradoMercancia");
                    this.$bvModal.show("valorDeclaradoMercanciaInfo");
                }else{
                    this.$bvModal.show("valorDeclaradoMercancia");
                }
            }
        }else{
            let idx_servSel = this.selectServices.indexOf(idServicio);
            this.selectServices.splice(idx_servSel, 1);
            document.getElementById(idServicio + "cheServicios").checked = false;

            let idx_serv = this.confirmarServices.findIndex((s) => s.idService === idServicio);
            this.confirmarServices.splice(idx_serv, 1);
        }

        //console.log(this.selectServices);
        
    },

    async addServicios() {
        this.confirmarServices = []
        let idServicio = 0;
        let nombreServicio = '';
        let subtotal = 0;
        let iva = 16;
        let total = 0
        let porcIva = 0;

        for (let s = 0; s < this.selectServices.length; s++) {
            let idx_serv = this.services.findIndex((is) => is.id === this.selectServices[s]);
            idServicio = parseInt(this.services[idx_serv].id)
            nombreServicio = this.services[idx_serv].nameproduct
            //1 -> FLETE NACIONAL
            //2 -> SEGURO
            //3 -> FUMIGACION"
            //4 -> MANIOBRAS DE CARGA Y DESCARGA
            //5 -> DESCARGA
            //6 -> ESTADIA POR HORA
            //7 -> CUSTODIA
            //8 -> ESTADIA POR DÍA
            //9 -> INGRESO ADUANAL
            //10 -> RECOLECCION
            //11 -> ENTREGA
            //12 -> EGRESO ADUANAL

            if(this.selectServices[s] == 2){
                this.valorMercancia = parseFloat(this.valorMercancia)

                subtotal = this.valorMercancia * 0.085 //(85 / 100);
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }

            }else if(this.selectServices[s] == 9 || this.selectServices[s] == 11){
                let precioIngreso = 0
                let identificadorTarifa = this.rFinal.ciudad_o+'-'+this.rFinal.ciudad_d
                let idx_tar = this.tarifarios.findIndex((tar) => tar.identificador === identificadorTarifa);
                let tarifa = this.tarifarios[idx_tar];
                
                //this.rFinal.name
                if(this.rFinal.name == 'Nissan'){
                    precioIngreso = parseFloat(tarifa.entrega_nissan)
                }else if(this.rFinal.name == 'Camioneta 3.5'){
                    precioIngreso = parseFloat(tarifa.entrega_tres_y_media)
                }else if(this.rFinal.name == 'Rabon'){
                    precioIngreso = parseFloat(tarifa.entrega_rabon)
                }else if(this.rFinal.name == 'Caja Cerrada de 48'){
                    precioIngreso = parseFloat(tarifa.entrega_trailer)
                }else if(this.rFinal.name == 'Caja Cerrada de 53'){
                    precioIngreso = parseFloat(tarifa.entrega_trailer)
                }else if(this.rFinal.name == 'Torton'){
                    precioIngreso = parseFloat(tarifa.entrega_torton)
                }
                
                subtotal = precioIngreso
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }

            }else if(this.selectServices[s] == 10 || this.selectServices[s] == 12){
                let precioRecoleccion = 0
                let identificadorTarifa = this.rFinal.ciudad_o+'-'+this.rFinal.ciudad_d
                let idx_tar = this.tarifarios.findIndex((tar) => tar.identificador === identificadorTarifa);
                let tarifa = this.tarifarios[idx_tar];
                
                //this.rFinal.name
                if(this.rFinal.name == 'Nissan'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_nissan)
                }else if(this.rFinal.name == 'Camioneta 3.5'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_tres_y_media)
                }else if(this.rFinal.name == 'Rabon'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_rabon)
                }else if(this.rFinal.name == 'Caja Cerrada de 48'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_trailer)
                }else if(this.rFinal.name == 'Caja Cerrada de 53'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_trailer)
                }else if(this.rFinal.name == 'Torton'){
                    precioRecoleccion = parseFloat(tarifa.recoleccion_torton)
                }
                
                subtotal = precioRecoleccion
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
            }else if(this.selectServices[s] == 8){
                
                let precioEstadiaDia = parseFloat(this.rFinal.estadia_dia);
                
                subtotal = precioEstadiaDia
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
            }else if(this.selectServices[s] == 6){
                
                let precioEstadiaHora = parseFloat(this.rFinal.horas);
                
                subtotal = precioEstadiaHora
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
            }else if(this.selectServices[s] == 4){
                
                let precioManiobras = parseFloat(this.rFinal.maniobras);
                
                subtotal = precioManiobras
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }

            }else if(this.selectServices[s] != 1){
                let precio = 1000;
                
                subtotal = precio;
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;

                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
            }else if(this.selectServices[s] == 1){
                let precioFlete = 0
                if(this.stops){
                    precioFlete = parseFloat(this.rFinal.precioTotalFinal);
                }else{
                    precioFlete = parseFloat(this.rFinal.precio);
                }
                subtotal = precioFlete;
                subtotal = parseFloat(subtotal.toFixed(2));
                porcIva = subtotal * (iva / 100);
                total = subtotal + porcIva;
                
                let agrega = {
                    idService: idServicio,
                    nombreSer: nombreServicio,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    porcIva: porcIva.toFixed(2),
                    total: total.toFixed(2),
                };
                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
            }

        }
        await this.total();
        
    },
    
    detallesMercancias() {

        this.totalCantidad = 0
        this.totalVolumen = 0
        this.totalPesoReal = 0
        this.totalPesoFaturado = 0

        let embalajes = [];
        let estibable = [];
        let cantidad = 0;
        let volumen = 0;
        let pesoTotal = 0;

        for (let i = 0; i < this.agregarMercancias.length; i++) {
            this.totalCantidad = this.totalCantidad + this.agregarMercancias[i].cantidad
            this.totalVolumen = this.totalVolumen + this.agregarMercancias[i].volumenTotal
            this.totalPesoReal = this.totalPesoReal + this.agregarMercancias[i].pesoTotal
            this.totalPesoFaturado = this.totalPesoFaturado + this.agregarMercancias[i].pesoVolumetricoTotal
        }
    },

    async verDetalleCotizacion(id_card){
        console.log(this.cards, 'cards', id_card, 'Valor Card Selecct');
        await this.limpiaVariablesResumen();

        let idx_card = this.cards.findIndex((c) => c.id_card === id_card);
        this.rFinal = this.cards[idx_card]
        console.log(this.rFinal, 'Objeto Final');

        await this.addServicios();

        if(this.stops){
            await this.planes(parseFloat(this.rFinal.precioTotalFinal))
        }else{
            await this.planes(parseFloat(this.rFinal.precio))
        }
        
        
        this.$bvModal.show("resumen-modal");
    },

    hideResumen() {
        this.$bvModal.hide("resumen-modal");
    },

    limpiaVariablesResumen(){
        this.rFinal = []
    },

    planes(precio){
        this.pricingData = []
        const noPlan = 2
        const icon = 'fe-truck'
        let precioBase = parseFloat(precio.toFixed(2));
        let subt = 0;
        let divisaText = 'MXN'

        /*if (this.divisa == 1) {
            divisaText = 'USD'
            this.priceSale = this.priceSale / this.valorDolar
        }*/
      
        let listServicios = ''
        let datos = null
        let aumento = 0

        for (let i = 0; i < this.confirmarServices.length; i++) {
            listServicios = listServicios + ', ' + this.confirmarServices[i].nombreSer
            subt += parseFloat(this.confirmarServices[i].subtotal)
            //Aqui suma
        }
        listServicios = listServicios.substring(2)
      
        for (let j = 0; j <= noPlan ; j++) {        
            switch (j) {
                case 0:
                    if(subt > precioBase){
                        datos = {
                            idPlan: 1,
                            title: "Servicio Normal",
                            icon: icon,
                            price: precioBase,
                            services: 'FLETE NACIONAL',
                            bandwidth: "",
                            domain: "",
                            user: "",
                            seleccionado: 0,
                            ribbon: "",
                            divisa: divisaText,
                        }

                        this.pricingData.push(datos)
                    }
                break;
                case 1:
                    if(subt > precioBase){
                        precioBase = subt
                    }
                    datos = {
                        idPlan: 1,
                        title: "Servicio Óptimo",
                        icon: icon,
                        price: precioBase,
                        services: listServicios,
                        bandwidth: "",
                        domain: "",
                        user: "",
                        seleccionado: 1,
                        ribbon: "Más Vendido",
                        divisa: divisaText,
                    }

                    this.pricingData.push(datos)
                break;
                /*case 1:
                    aumento = precioBase * 1.12
                    aumento = aumento.toFixed(2)
                    datos = {
                        idPlan: 2,
                        title: "Servicio Express",
                        icon: icon,
                        price: aumento,
                        services: listServicios,
                        bandwidth: "4 Horas Adicionales en Carga y Entrega",
                        domain: "",
                        user: "",
                        ribbon: "Más Vendido",
                        seleccionado: 0,
                    }
                    this.pricingData.push(datos)
                    break;
                    case 2:
                        aumento = precioBase * 1.24
                        aumento = aumento.toFixed(2)
                        datos = {
                            idPlan: 3,
                            title: "Servicio Premium",
                            icon: icon,
                            price: aumento,
                            services: listServicios,
                            bandwidth: "4 Horas Adicionales en Carga y Entrega",
                            domain: "",
                            user: "",
                            seleccionado: 0,
                            ribbon: "",
                        }
                        this.pricingData.push(datos)
                    break;*/
        
                }
        
            }

    },
    
    elegirPaquete(idPlan){
        let id = parseInt(idPlan)

        for (let i = 0; i < this.pricingData.length; i++) {
            if(parseInt(this.pricingData[i].idPlan) == id){
                this.pricingData[i].seleccionado = 1
            }else{
                this.pricingData[i].seleccionado = 0
            }   
        
        }
    },

    async validaValorMercancia() {
        let val = parseFloat(this.valorMercancia)
        if (val < 0) {
            this.valorMercancia = 0;
            await this.notificaciones('error','El valor de la mercancia no debe ser menor a 0, verifícalo por favor.');
        }
    },

    cierraModalSeguroValor(){
        this.$bvModal.hide("valorDeclaradoMercancia");
    },

    cierraModal(idServ) {
        var indice = this.selectServices.indexOf(idServ);

        if (indice != -1) this.selectServices.splice(indice, 1);

        this.$bvModal.hide("valorDeclaradoMercancia");
    },

    cierraModalSeguro() {
        this.$bvModal.hide("valorDeclaradoMercanciaInfo");
    },

    total(){
        this.totalGlobal = 0
        this.totalIvaGlobal = 0
        this.totalSubtotalGlobal = 0
        this.totalRetencionGlobal = 0

        for (let s = 0; s < this.confirmarServices.length; s++) {
            this.totalGlobal += parseFloat(this.confirmarServices[s].total)
            this.totalIvaGlobal += parseFloat(this.confirmarServices[s].porcIva)
            this.totalSubtotalGlobal += parseFloat(this.confirmarServices[s].subtotal)
        }
            
    },

    async validaInfoConfirma(){

        this.calleOrigen = this.rFinal.calle_o;
        this.calleDestino = this.rFinal.calle_d;

        this.numExtOrigen = this.rFinal.n_exterior_o;
        this.numExtDestino = this.rFinal.n_exterior_d;

        this.numIntOrigen = this.rFinal.n_interior_o;
        this.numExtDestino = this.rFinal.n_exterior_d;
    
        this.$bvModal.hide("resumen-modal");
        this.$bvModal.show("validaConfirmacionOD");
        
    },

    async validacionConfirmacionOD(){
        let vcalleOrigen = ''
        let vnumExtOrigen = ''
        let vcalleDestino = ''
        let vnumExtDestino = ''
        let vnumIntOrigen = ''
        let vnumIntDestino = ''
        
        if(this.stops){

            for (let r = 0; r < this.rFinal.route.length; r++) {

                vcalleOrigen = document.getElementById("calle_o_"+this.rFinal.route[r].identificador).value;
                vnumExtOrigen = document.getElementById("numero_ext_o_"+this.rFinal.route[r].identificador).value;
                vcalleDestino = document.getElementById("calle_d_"+this.rFinal.route[r].identificador).value;
                vnumExtDestino = document.getElementById("numero_ext_d_"+this.rFinal.route[r].identificador).value;
                vnumIntOrigen = document.getElementById("numero_int_o_"+this.rFinal.route[r].identificador).value;
                vnumIntDestino = document.getElementById("numero_int_d_"+this.rFinal.route[r].identificador).value;

                console.log(vcalleOrigen,vnumExtOrigen,vnumIntOrigen,vcalleDestino,vnumExtDestino,vnumIntDestino);

                if(vcalleOrigen == ''){
                    this.notificaciones('error',`Ingresa el nombre de la calle del Origen ${r + 1}`);
                    return false;
                }
                if(vnumExtOrigen == ''){
                    this.notificaciones('error',`Ingresa el número Exterior del Origen ${r + 1}`);
                    return false;
                }
                if(vcalleDestino == ''){
                    this.notificaciones('error',`Ingresa el nombre de la calle del Destino ${r + 1}`);
                    return false;
                }
                if(vnumExtDestino == ''){
                    this.notificaciones('error',`Ingresa el número Exterior del Destino ${r + 1}`);
                    return false;
                }

                this.rFinal.route[r].calle_o = vcalleOrigen
                this.rFinal.route[r].calle_d = vcalleDestino
                this.rFinal.route[r].n_exterior_o = vnumExtOrigen
                this.rFinal.route[r].n_exterior_d = vnumExtDestino
                this.rFinal.route[r].n_interior_o = vnumIntOrigen
                this.rFinal.route[r].n_interior_d = vnumIntDestino
                
            }
            
            console.log(this.rFinal.route)

        }else{

            vcalleOrigen = this.calleOrigen;
            vnumExtOrigen = this.numExtOrigen;
            vcalleDestino = this.calleDestino;
            vnumExtDestino = this.numExtDestino;
            vnumIntOrigen = this.numIntOrigen;
            vnumIntDestino = this.numIntDestino;

            if(vcalleOrigen == ''){
                await this.notificaciones('error','Ingresa el nombre de la calle del Origen');
                return false;
            }
            if(vnumExtOrigen == ''){
                await this.notificaciones('error','Ingresa el número Exterior del Origen');
                return false;
            }
            if(vcalleDestino == ''){
                await this.notificaciones('error','Ingresa el nombre de la calle del Destino');
                return false;
            }
            if(vnumExtDestino == ''){
                await this.notificaciones('error','Ingresa el número Exterior del Destino');
                return false;
            }

            this.rFinal.calle_o = vcalleOrigen
            this.rFinal.calle_d = vcalleDestino
            this.rFinal.n_exterior_o = vnumExtOrigen
            this.rFinal.n_exterior_d = vnumExtDestino
            this.rFinal.n_interior_o = vnumIntOrigen
            this.rFinal.n_interior_d = vnumIntDestino
        }

        this.$bvModal.hide("validaConfirmacionOD");
        this.$bvModal.show("datosContacto");
        
    },

    regresarVOD(){

            this.$bvModal.hide("validaConfirmacionOD");
            this.$bvModal.show("resumen-modal");
        
    },

    cerrarConfirmacionContacto(){
        this.$bvModal.hide("validaConfirmacionCliente");
        this.$bvModal.show("validaConfirmacionOD");
    },

    async validaConfirmacionContacto(){
        let nombre = this.contacName;
        let email = this.contacEmail;
        let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let EmailValido = expReg.test(email);
        let lada = this.contacLada;
        let telefono = this.contacTelefono;
        let producto = this.contacProductName;
        let descripcion = this.contacDescription;

        if (nombre == "" || nombre == null) {
            await this.notificaciones('error','Ingresa Nombre de contacto');
            return false;
        } else if (email == "" || email == null) {
            await this.notificaciones('error','Ingresa Correo Electrónico de contacto');
            return false;
        } else if (!EmailValido) {
            await this.notificaciones('error','El correo electrónico no es valido');
            return false;
        }
        
        if (lada == "" || lada == null) {
            await this.notificaciones('error','Selecciona una Lada');
            return false;
        } else if (telefono == "" || telefono == null) {
            await this.notificaciones('error','Ingresa un número telefónico');
            return false;
        } else if (telefono.length < 10) {
            await this.notificaciones('error','El número telefónico debe tener como minimo 10 digitos');
            return false;
        } else if (telefono.length > 16) {
            await this.notificaciones('error','El número telefónico debe tener como maximo 16 digitos');
            return false;
        }

        this.$bvModal.hide("datosContacto");
        this.$bvModal.show("validaConfirmacionCliente");
    },

    cerrarConfirmacionCliente(){
        this.$bvModal.hide("validaConfirmacionCliente");
        this.$bvModal.show("datosContacto");
    },

    async validaRFCUsuario(){

        if(this.rfcClienteInterland != ''){
            Swal.fire({
                title: "Validando RFC...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            var rfc = this.rfcClienteInterland.trim().toUpperCase(),
            resultado = document.getElementById("resultadoRFC"),
            valido;
                
            var rfcCorrecto = this.rfcValido(rfc);   //Acá se comprueba

            if (rfcCorrecto) {

                rfc = btoa(rfc)
                const response = await axios.get(`https://trafixu.mx-interland.com/wsCotizador/consultasCotizador.php?action=revisarCreditoClienteCotizador&rfcCliente=${rfc}`);

                this.datosCliente = response.data[0];
                
                if(this.datosCliente.clientCheck){

                    this.nomCliente = this.datosCliente.nomCliente
                    this.idCliente = this.datosCliente.idCliente
                    this.nombreAgente = this.datosCliente.usuarioFirstname
                    this.correoAgente = this.datosCliente.usuarioEmail
                    this.creditoUSD = parseFloat(this.datosCliente.saldoOriginalUSD)
                    this.creditoMXN = parseFloat(this.datosCliente.saldoOriginalMXN)
                    this.creditoOcupadoUSD = parseFloat(this.datosCliente.saldoOcupadoUSD)
                    this.creditoOcupadoMXN = parseFloat(this.datosCliente.saldoOcupadoMXN)

                    let saldoRealUSD = 0
                    let saldoRealMXN = 0
                    let priceSale = parseFloat(this.totalGlobal)

                    if(this.creditoUSD > 0 || this.creditoMXN > 0){
                        //PARA CREDITO EN USD
                        if(this.creditoUSD > 0){

                            if(this.divisa == '1' || this.divisa == 1){
                        
                                saldoRealUSD = this.creditoUSD - this.creditoOcupadoUSD

                                this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                this.contactaAgente = true;

                                if(priceSale > saldoRealUSD){
                                    Swal.close();
                                    await this.notificaciones('info','Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');

                                }else{
                                    Swal.close();
                                    this.Save();
                                }
                            }else if(this.divisa == '2' || this.divisa == 2){
                                let conversion = 0;

                                saldoRealUSD = this.creditoUSD - this.creditoOcupadoUSD

                                conversion = saldoRealUSD * this.valorDolar

                                this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                this.contactaAgente = true;

                                if(priceSale > conversion){
                                    Swal.close();
                                    await this.notificaciones('info','Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');
                                }else{
                                    Swal.close();
                                    this.Save();
                                }
                        
                            }
                        }

                        //PARA CREDITO EN MXN
                        if(this.creditoMXN > 0){

                            if(this.divisa == '2' || this.divisa == 2){

                                saldoRealMXN = this.creditoMXN - this.creditoOcupadoMXN
                                this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                this.contactaAgente = true;

                                if(priceSale > saldoRealMXN){
                                    Swal.close();
                                    await this.notificaciones('info','Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');
                                }else{
                                    Swal.close();
                                    this.Save();
                                }

                            }else if(this.divisa == '1' || this.divisa == 1){
                                let conversion = 0;

                                saldoRealMXN = this.creditoMXN - this.creditoOcupadoMXN

                                conversion = saldoRealMXN / this.valorDolar
                                this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                this.contactaAgente = true;

                                if(priceSale > conversion){
                                    Swal.close();
                                    await this.notificaciones('info','Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');
                                }else{
                                    Swal.close();
                                    this.Save();
                                }
                            }
                        }
                    }else{
                        Swal.close();
                        await this.notificaciones('info','Tu solicitud no se puede procesar, en breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');
                        this.motivoContacto = 'el cliente es cliente Interland pero no tiene una linea de crédito'
                        this.contactaAgente = true;
                        this.Save();
                    }

                }else{
                    Swal.close();
                    await this.notificaciones('info','No estas registrado como cliente en Interland, en breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.');
                    this.motivoContacto = 'el cliente no esta registrado como cliente Interland'
                    this.contactaAgente = true;
                    this.Save();
                }
            } else {
                await this.notificaciones('error','El RFC ingresado es incorrecto, verifícalo');
                return false;
            }
        }else{
            await this.notificaciones('error','Ingresa tu RFC porfavor');
            //this.Save();
        }

    },

    rfcValido(rfc, aceptarGenerico = false) {
            let _rfc_pattern_pm = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
            let _rfc_pattern_pf = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
                    "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
            return rfc.match(_rfc_pattern_pm) || rfc.match(_rfc_pattern_pf);
    },

    async Save(){
        this.$bvModal.hide("validaConfirmacionCliente");
        let idCotiza = parseInt(this.rFinal.id_cotizacion); 
        let folCot = this.rFinal.folio_cotizacion;

        if(idCotiza == 0){

            let estatusCotiza = 0;

            const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title: "Generar Cotizacion",
                text: "Al Confirmar no se podrán realizar cambios en la cotización",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.getFolioCon();
                    if (this.confirmarServices.length > 0) {
                        estatusCotiza = 4;
                    }

                    axios({
                        method: "post",
                        url: "servicioCotizaciones/",
                        data: {
                            tipoServicio: this.tipoOpcion,
                            tipoEnvio: this.tipoEnvio,
                            modoEnvio: this.modoEnvio,
                            
                            fechaCarga: this.terfecha,
                            tipoOperacion: this.termodalidad,
                            tipoCarga: this.tertipocarga,
                            tipoUnidad: this.tipoUnidad,
                            precioTotalInicial: 0, //sumaInicial,
                            precioTotalFinal: 0, //sumaInicial,
                            divisaFinal: 2,
                            serie: "DOC",
                            velocidadEnvio: this.velocidadEnvio,
                            idVenta: 1,
                            estatus: this.estatusCotiza, // Sin Completar
                            diasTransito: this.diasTransito,
                            nametipoUnidad: this.nombreTipoUnidad,
                            folioConsecutivo: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0"),
                            usuarioGenera: this.username,
                            servicio_stops: this.stops,
                            id_unidad:this.rFinal.id_unidad,
                        },
                        auth: {
                            username: "admin",
                            password: "123",
                        },
                        }).then((response) => {
                            console.log(response, 'response cotizacion');
                            
                            this.rFinal.folio_cotizacion = this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0");
                            this.rFinal.id_cotizacion = parseInt(response.data.id);

                            let idx_paq = this.cards.findIndex((c) => c.id_card === this.rFinal.id_card);
                            this.cards[idx_paq].folio_cotizacion = this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0");
                            this.cards[idx_paq].id_cotizacion = parseInt(response.data.id)
                            
                            this.agregaDireccion();
                            this.getFolios(parseInt(response.data.id));
                            this.updateConsecutivo();
                            this.agregaServices();
                            this.agregaMerch();
                            this.addContact();
                            this.agregaPlanes();
                            this.notificaAgente();

                            if(this.username == 'Invitado'){
                                window.location.href = "/logout";
                            }

                            this.$bvModal.show("resumen-modal");
                            this.notificaciones('success','La cotización con folio: '+this.rFinal.folio_cotizacion+' se generó correctamente! 🥳🥳🥳');

                            /*if (this.confirmarServices.length > 0) {
                                this.enviaCorreoPricing(this.idCotizacion, this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0"));
                            }*/

                        }).catch((error) => {
                            this.notificaciones('error','Se detecto un error mientras se generaba la cotizacion: ' + error);
                        });
                }else{
                    this.notificaciones('info','Vuelve a revisar la cotización');
                }
            });

        }else{
            this.notificaciones('error','Ya existe una cotización con la misma información, verificalo por favor.')
        }
        
    },

    getFolios(val) {
        axios.get(`/api/v1/consultar-folio/`).then((response) => {
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
                url: `servicioCotizaciones/${val}/`,
                data: {
                    folio: cont,
                },
                auth: {
                    username: "admin",
                    password: "123",
                },
            }).then((response) => {
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
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
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });
    },

    agregaDireccion(){
        let idCotiza = parseInt(this.rFinal.id_cotizacion)
        if (idCotiza > 0) {

            console.log(this.rFinal);

            if(this.stops){
                for (let r = 0; r < this.rFinal.route.length; r++) {
                    axios({
                        method: "post",
                        url: "direccionCotizaciones/",
                        data: {
                            idcotizacion: idCotiza,
                            paisOrigen: this.rFinal.route[r].pais_o,
                            idpaisOrigen: this.rFinal.route[r].idpais_o,
                            cpOrigen: this.rFinal.route[r].cp_o,
                            estadoOrigen: this.rFinal.route[r].estado_o,
                            idestadoOrigen: this.rFinal.route[r].idestado_o,
                            ciudadOrigen: this.rFinal.route[r].ciudad_o,
                            coloniaOrigen: this.rFinal.route[r].colonia_o,
                            calleOrigen: this.rFinal.route[r].calle_o,
                            numExtOrigen: this.rFinal.route[r].n_exterior_o,
                            numIntOrigen: this.rFinal.route[r].n_interior_o,
                            paisDestino: this.rFinal.route[r].pais_d,
                            idpaisDestino: this.rFinal.route[r].idpais_d,
                            cpDestino: this.rFinal.route[r].cp_d,
                            estadoDestino: this.rFinal.route[r].estado_d,
                            idestadoDestino: this.rFinal.route[r].idestado_d,
                            ciudadDestino: this.rFinal.route[r].ciudad_d,
                            coloniaDestino: this.rFinal.route[r].colonia_d,
                            calleDestino: this.rFinal.route[r].calle_d,
                            numExtDestino: this.rFinal.route[r].n_exterior_d,
                            numIntDestino: this.rFinal.route[r].n_interior_d,
                            km: this.rFinal.route[r].km,
                            usuarioGenera: this.username,
                            identificador: this.rFinal.route[r].identificador,
                        },
                        auth: {
                            username: "admin",
                            password: "123",
                        },
                    }).then((response) => {

                    }).catch((error) => {
                        console.log(error);
                        this.notificaciones('info','Se detecto un error mientras se guardaban los servicios: ' + error);
                    });
                    
                }

            }else{
                axios({
                    method: "post",
                    url: "direccionCotizaciones/",
                    data: {
                        idcotizacion: idCotiza,
                        paisOrigen: this.rFinal.pais_o,
                        idpaisOrigen: this.rFinal.idpais_o,
                        cpOrigen: this.rFinal.cp_o,
                        estadoOrigen: this.rFinal.estado_o,
                        idestadoOrigen: this.rFinal.idestado_o,
                        ciudadOrigen: this.rFinal.ciudad_o,
                        coloniaOrigen: this.rFinal.colonia_o,
                        calleOrigen: this.rFinal.calle_o,
                        numExtOrigen: this.rFinal.n_exterior_o,
                        numIntOrigen: this.rFinal.n_interior_o,
                        paisDestino: this.rFinal.pais_d,
                        idpaisDestino: this.rFinal.idpais_d,
                        cpDestino: this.rFinal.cp_d,
                        estadoDestino: this.rFinal.estado_d,
                        idestadoDestino: this.rFinal.idestado_d,
                        ciudadDestino: this.rFinal.ciudad_d,
                        coloniaDestino: this.rFinal.colonia_d,
                        calleDestino: this.rFinal.calle_d,
                        numExtDestino: this.rFinal.n_exterior_d,
                        numIntDestino: this.rFinal.n_interior_d,
                        km: this.rFinal.km,
                        usuarioGenera: this.username,
                        identificador: this.rFinal.identificador,
                    },
                    auth: {
                        username: "admin",
                        password: "123",
                    },
                }).then((response) => {

                }).catch((error) => {
                    console.log(error);
                    this.notificaciones('info','Se detecto un error mientras se guardaban los servicios: ' + error);
                });
            }
        }
    },

    agregaServices() {
        let idCotiza = parseInt(this.rFinal.id_cotizacion)
        if (idCotiza > 0) {
            for (let s = 0; s < this.confirmarServices.length; s++) {
                axios({
                    method: "post",
                    url: "servicioAgregados/",
                    data: {
                        idcotizacion: idCotiza,
                        idService: this.confirmarServices[s].idService,
                        nameService: this.confirmarServices[s].nombreSer,
                        priceService: this.confirmarServices[s].subtotal,
                        divisa: this.divisa,
                        total: this.confirmarServices[s].total,
                        subtotal: this.confirmarServices[s].subtotal,
                        iva: this.confirmarServices[s].iva,
                        porcIva: this.confirmarServices[s].porcIva,
                        totalServicio: this.confirmarServices[s].total,
                    },
                    auth: {
                        username: "admin",
                        password: "123",
                    },
                }).then((response) => {

                }).catch((error) => {
                    console.log(error);
                    this.notificaciones('info','Se detecto un error mientras se guardaban los servicios: ' + error);
                });
                
            }
            
        }
    },

    agregaMerch() {
        let idCotiza = parseInt(this.rFinal.id_cotizacion)

        if (idCotiza > 0) {

            if(this.stops){
                for (let m = 0; m < this.rFinal.mercancias.length; m++) {
                    axios({
                        method: "post",
                        url: "mercanciasCotizaciones/",
                        data: {
                            idCotizacion: idCotiza,
                            embalaje: this.rFinal.mercancias[m].embalaje,
                            cantidad: this.rFinal.mercancias[m].cantidad,
                            peso: this.rFinal.mercancias[m].peso,
                            pesoTotal: this.rFinal.mercancias[m].pesoTotal,
                            alto: this.rFinal.mercancias[m].alto,
                            ancho: this.rFinal.mercancias[m].ancho,
                            largo: this.rFinal.mercancias[m].largo,
                            medida: this.rFinal.mercancias[m].medida,
                            upeso: this.rFinal.mercancias[m].upeso,
                            volumen: this.rFinal.mercancias[m].volumen,
                            volumenTotal: this.rFinal.mercancias[m].volumenTotal,
                            estibable: this.rFinal.mercancias[m].estibable,
                            pesoVolumetrico: this.rFinal.mercancias[m].pesoVolumetrico,
                            pesoVolumetricoTotal: this.rFinal.mercancias[m].pesoVolumetricoTotal,
                            precioVolumen: this.rFinal.mercancias[m].precio,
                            factor_conversion: 350,
                            mercancia: this.rFinal.mercancias[m].mercancia,
                            un: this.rFinal.mercancias[m].un,
                            classP: this.rFinal.mercancias[m].classP,
                            grados: this.rFinal.mercancias[m].grados,
                            descripRef: this.rFinal.mercancias[m].descripRef,
                            usuarioAlta: this.username,
                            es_peligrosa: this.rFinal.mercancias[m].es_peligrosa,
                            es_refrigerada: this.rFinal.mercancias[m].es_refrigerada,
                            idclasificacion: this.rFinal.mercancias[m].id_clasifica,
                            ruta: this.rFinal.mercancias[m].ruta,
                            descripcion_mercancia: this.rFinal.mercancias[m].descripcionMercancia,
                            orden: this.rFinal.mercancias[m].idPaq,
                            clasificacion: this.rFinal.mercancias[m].clasificacion,

                        },
                        auth: {
                            username: "admin",
                            password: "123",
                        },
                    }).then((response) => {

                    }).catch((error) => {
                        this.notificaciones('info','Se detecto un error mientras se cargaban las mercancias: ' +error);
                    });
                }
            }else{
                axios({
                    method: "post",
                    url: "mercanciasCotizaciones/",
                    data: {
                        idCotizacion: idCotiza,
                        embalaje: this.rFinal.embalaje,
                        cantidad: this.rFinal.cantidad,
                        peso: this.rFinal.peso,
                        pesoTotal: this.rFinal.pesoTotal,
                        alto: this.rFinal.alto,
                        ancho: this.rFinal.ancho,
                        largo: this.rFinal.largo,
                        medida: this.rFinal.medida,
                        upeso: this.rFinal.upeso,
                        volumen: this.rFinal.volumen,
                        volumenTotal: this.rFinal.volumenTotal,
                        estibable: this.rFinal.estibable,
                        pesoVolumetrico: this.rFinal.pesoVolumetrico,
                        pesoVolumetricoTotal: this.rFinal.pesoVolumetricoTotal,
                        precioVolumen: this.rFinal.precio,
                        factor_conversion: 350,
                        mercancia: this.rFinal.mercancia,
                        un: this.rFinal.un,
                        classP: this.rFinal.classP,
                        grados: this.rFinal.grados,
                        descripRef: this.rFinal.descripRef,
                        usuarioAlta: this.username,
                        es_peligrosa: this.rFinal.es_peligrosa,
                        es_refrigerada: this.rFinal.es_refrigerada,
                        idclasificacion: this.rFinal.id_clasifica,
                        ruta: this.rFinal.ruta,
                        descripcion_mercancia: this.rFinal.descripcionMercancia,
                        orden: this.rFinal.idPaq,
                        clasificacion: this.rFinal.clasificacion,
                    },
                    auth: {
                        username: "admin",
                        password: "123",
                    },
                }).then((response) => {

                }).catch((error) => {
                    this.notificaciones('info','Se detecto un error mientras se cargaban las mercancias: ' +error);
                });
            }
            /*let embalaje = ''
            let cantidad = 0
            let factor_conversion = 0
            let largo = 0
            let ancho = 0
            let alto = 0
            let volumen = 0
            let volumenTotal = 0
            let pesoVolumetrico = 0
            let pesoVolumetricoTotal = 0
            let peso = 0
            let pesoTotal = 0
            let estibable = ''
            let upeso = ''
            let umedi = ''
            let precioVolumen = 0

            for (let i = 0; i < this.agregarMercancias.length; i++) {
                embalaje = this.agregarMercancias[i].embalaje
                cantidad = this.agregarMercancias[i].cantidad
                peso = this.agregarMercancias[i].peso
                pesoTotal = this.agregarMercancias[i].pesoTotal
                alto = this.agregarMercancias[i].alto
                ancho = this.agregarMercancias[i].ancho
                largo = this.agregarMercancias[i].largo
                umedi = this.agregarMercancias[i].medida
                upeso = this.agregarMercancias[i].upeso
                volumen = this.agregarMercancias[i].volumen
                volumenTotal = this.agregarMercancias[i].volumenTotal
                estibable = this.agregarMercancias[i].estibable
                pesoVolumetrico = this.agregarMercancias[i].pesoVolumetrico
                pesoVolumetricoTotal = this.agregarMercancias[i].pesoVolumetricoTotal
                precioVolumen = this.agregarMercancias[i].precioVolumen
                if(estibable == 'si'){
                    factor_conversion = this.factorConversionEstiba
                }else{
                    factor_conversion = this.factorConversionNoEstiba
                }
            
                axios({
                    method: "post",
                    url: "mercanciasCotizaciones/",
                    data: {
                    idCotizacion: idCotiza,
                    embalaje: embalaje,
                    cantidad: cantidad,
                    peso: peso,
                    pesoTotal: pesoTotal,
                    alto: alto,
                    ancho: ancho,
                    largo: largo,
                    medida: umedi,
                    upeso: upeso,
                    volumen: volumen,
                    volumenTotal: volumenTotal,
                    estibable: estibable,
                    pesoVolumetrico: pesoVolumetrico,
                    pesoVolumetricoTotal: pesoVolumetricoTotal,
                    precioVolumen: precioVolumen,
                    factor_conversion: factor_conversion,
                    usuarioAlta: this.username,
                    },
                    auth: {
                        username: "admin",
                        password: "123",
                    },
                }).then((response) => {
                    
                }).catch((error) => {
                    Swal.fire({
                        title: "Mercancias agregadas error",
                        text: "Se detecto un error mientras se cargaban las mercancias: " +error,
                        icon: "success",
                        confirmButtonText: "Cerrar",
                    });
                });
            }*/
        }
    },

    async addContact() {
        let idCotiza = parseInt(this.rFinal.id_cotizacion)
        if (idCotiza > 0) {
            await axios({
                method: "post",
                url: "contactoCotizaciones/",
                data: {
                    idcotizacion: idCotiza,
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
            }).then((response) => {
                this.sendEmailCotiza();
            }).catch((error) => {
                this.notificaciones('info','Se detecto un error mientras se guardaban los datos de contacto: ' +error);
            });
        }
    },
    
    async sendEmailCotiza() {
        let idCotiza = parseInt(this.rFinal.id_cotizacion)
        await axios({
            method: "post",
            url: "api/v1/sendEmailCotiza/",
            data: {
                idcotizacion: idCotiza,
                name: this.contacName,
                lada: this.contacLada,
                phone: this.contacTelefono,
                email: this.contacEmail,
                productname: this.contacProductName,
                description: this.contacDescription,
            },
        }).then((response) => {
        }).catch((error) => {
            console.log("err" + error);
            this.notificaciones('info','Se detecto un error mientras se enviaba el correo de servicio al cliente: ' + error);
        });
    },

    agregaPlanes(){
      
        let idCotiza = parseInt(this.rFinal.id_cotizacion)
        if (idCotiza > 0) {
            
            for (let i = 0; i < this.pricingData.length; i++) {
                let idPlan = this.pricingData[i].idPlan
                let title = this.pricingData[i].title
                let icon = this.pricingData[i].icon
                let price = this.pricingData[i].price
                price = parseFloat(price.toFixed(2))
                let services = this.pricingData[i].services
                let bandwidth = this.pricingData[i].bandwidth
                let domain = this.pricingData[i].domain
                let user = this.pricingData[i].user
                let seleccionado = this.pricingData[i].seleccionado
                let ribbon = this.pricingData[i].ribbon

                axios({
                    method: "post",
                    url: "planesCotizaciones/",
                    data: {
                        idCotizacion: idCotiza,
                        orden: idPlan,
                        title: title,
                        icon: icon,
                        price: price,
                        services: services,
                        bandwidth: bandwidth,
                        domain: domain,
                        user: user,
                        seleccionado: seleccionado,
                        ribbon: ribbon,
                    },
                    auth: {
                        username: "admin",
                        password: "123",
                    },
                }).then((response) => {
                    console.log(response.data)
                }).catch((error) => {
                    this.notificaciones('info','Se detecto un error mientras se cargaban los planes: ' + error);
                });
          
            }
        }
      
    },

    notificaAgente(){

        let telefono = ''
        let idCotiza = parseInt(this.rFinal.id_cotizacion)

        for (let i = 0; i < this.ladas.length; i++) {
            this.ladas[i].code;
            if(parseInt(this.contacLada) == parseInt(this.ladas[i].id)){
                telefono = '+'+this.ladas[i].code+this.contacTelefono
            }
        }

        axios({
        method: "post",
        url: "/api/v1/agente-aviso/",
        data: {
            id: idCotiza,
            motivoAgente: this.motivoContacto,
            nombreCliente: this.contacName,
            emailCliente: this.contacEmail,
            telefonoCliente: telefono,
            nombreAgente: '',
            correoAgente: '',

        },
        auth: {
            username: "admin",
            password: "123",
        },
        }).then((response) => {
            
        }).catch((error) => {
            this.notificaciones('info','Se detecto un error mientras se avisaba al agente de ventas: ' + error);
        });

    },

    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
<template>
    <Layout>
        <PageHeader :title="title" :items="items" />

        <b-row>
            <b-col cols="12">
                <b-card style="border: none; box-shadow: none">
                    <b-card-text style="padding: 10px; background-color: #f5f6f8">

                    <!-- SECUENCIA INICIO -->

                    <!-- Valida Transporte -->

                    <b-modal id="inicio-transporte" hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Bienvenido!</b>
                        </template>
                        <div class="form-group text-center">
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Para inciar una cotización, porfavor selecciona una opción:</p>
                            <br>
                            <b-row class="text-center">
                                <b-col md="4">
                                    <div class="ocean" @click="validaTransporte(1)" style="cursor:pointer;">
                                        <i class="fas fa-ship"></i>
                                    </div>
                                    <h4 style="margin:0px;"><b-badge variant="success">Maritimo</b-badge></h4>
                                </b-col>
                                <b-col md="4">
                                    <div class="road" @click="validaTransporte(2)" style="cursor:pointer;">
                                        <div class="loop-wrapper">
                                            <div class="mountain"></div>
                                            <div class="hill"></div>
                                            <div class="tree"></div>
                                            <div class="tree"></div>
                                            <div class="tree"></div>
                                            <div class="rock"></div>
                                            <div class="truck"></div>
                                            <div class="wheels"></div>
                                        </div>
                                    </div>
                                    <h4 style="margin:0px;"><b-badge variant="success">Terrestre</b-badge></h4>
                                </b-col>
                                <b-col md="4">
                                    <div class="sky" @click="validaTransporte(3)" style="cursor:pointer;">
                                        <div class="clouds">
                                            <div class="cloud x1"></div>
                                            <div class="cloud x2"></div>
                                            <div class="cloud x3"></div>
                                        </div>
                                        <div class="airplane">
                                            <i class="fas fa-plane"></i>
                                        </div>
                                    </div>
                                    <h4 style="margin:0px;"><b-badge variant="success">Aereo</b-badge></h4>
                                </b-col>
                            </b-row>
                            <br />
                            <br />
                        </div>
                    </b-modal>

                    <!-- Valida Transporte Fin-->
                    <!-- Valida Tipo Envio -->

                    <b-modal id="inicio-tipo-envio" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Tipo de Envio</b>
                        </template>
                        <div class="form-group text-center">
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una opción:</p>
                            <b-row>    
                                <b-col md="3"></b-col>
                                <b-col md="3">
                                    <b-card @click="validaTipoEnvio(1)" style="cursor:pointer;">
                                    <b-card-text>
                                        <b><i class="fe-truck" style="color:#2aab5c; font-size: 30px !important;"></i> Nacional</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3">
                                    <b-card @click="validaTipoEnvio(2)" style="cursor:pointer;">
                                    <b-card-text>
                                        <b><i class="fe-globe" style="color:#2aab5c; font-size: 30px;"></i> Internacional</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3"></b-col>
                                    
                                </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarTransporte()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Tipo Envio Fin-->

                    <!-- Valida Detalle Envio -->

                    <b-modal id="inicio-detalle-envio" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Detalle de Envio</b>
                        </template>
                        <div class="form-group text-center">
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">¿Ingresa a un puerto o aeropuerto?</p>
                            <b-row>
                                <b-col md="3"></b-col>
                                <b-col md="3">
                                    <b-card @click="clickDetalleEnvio(1)" style="cursor:pointer;">
                                    <b-card-text>
                                        <b><i class="fe-check" style="color:#2aab5c; font-size: 30px;"></i> Si</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3">
                                    <b-card @click="clickDetalleEnvio(2)" style="cursor:pointer;">
                                    <b-card-text>
                                        <b><i class="fe-x" style="color:#2aab5c; font-size: 30px;"></i> No</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3"></b-col>
                            </b-row>
                            <b-row>
                                <b-col md="2"></b-col>
                                <b-col md="8">
                                    <div v-if="tipoEnvioDetalleSi">
                                    <b-dropdown id="dropdown-grouped" text="Selecciona una opción" class="m-2" menu-class="w-100" block size="sm" variant="primary">
                                        <b-dropdown-group id="dropdown-group-1" header="Aduana Aerea" style="font-weight: bold;">
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Aduana Aeropuerto Internacional de la Ciudad de México (AICM)')"><p class="text-wrap">Aduana Aeropuerto Internacional de la Ciudad de México (AICM)</p></b-dropdown-item-button>
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Aduana Aeropuerto Internacional Felipe Angeles (AIFA)')"><p class="text-wrap">Aduana Aeropuerto Internacional Felipe Angeles (AIFA)</p></b-dropdown-item-button>
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Aduana Aeropuerto Internacional de Toluca (AIT)')"><p class="text-wrap">Aduana Aeropuerto Internacional de Toluca (AIT)</p></b-dropdown-item-button>
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Aduana Aeropuerto Internacional de Querétaro (AIQ)')"><p class="text-wrap">Aduana Aeropuerto Internacional de Querétaro (AIQ)</p></b-dropdown-item-button>
                                        </b-dropdown-group>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-group id="dropdown-group-2" header="Puertos" style="font-weight: bold;">
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Puerto de Veracruz')"><p class="text-wrap">Puerto de Veracruz</p></b-dropdown-item-button>
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Puerto de Manzanillo')"><p class="text-wrap">Puerto de Manzanillo</p></b-dropdown-item-button>
                                        <b-dropdown-item-button @click="validaDetalleEnvio('Puerto Lázaro Cárdenas')"><p class="text-wrap">Puerto Lázaro Cárdenas</p></b-dropdown-item-button>
                                        </b-dropdown-group>
                                    </b-dropdown>
                                    </div>
                                </b-col>
                                <b-col md="2"></b-col>
                            </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarDetalleEnvio()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Detalle Envio Fin-->

                    <!-- Valida Comercio -->
                    
                    <b-modal id="inicio-comercio" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Comercio</b>
                        </template>
                        <div class="form-group text-center">  
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una opción:</p>
                            <b-row>
                                <b-col md="4">
                                    <b-card @click="validaComercio(1)" style="cursor:pointer;">
                                    <img src="../../../assets/images/import.svg">
                                    <b-card-text>
                                        <b>Impo</b>
                                        <br>
                                        <sub style="font-size: 9px;"><b>International Freight</b></sub>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="4">
                                    <b-card @click="validaComercio(2)" style="cursor:pointer;">
                                    <img src="../../../assets/images/export.svg">
                                    <b-card-text>
                                        <b>Expo</b>
                                        <br>
                                        <sub style="font-size: 9px;"><b>Exportación</b></sub>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="4">
                                    <b-card @click="validaComercio(3)" style="cursor:pointer;">
                                    <img src="../../../assets/images/road.svg">
                                    <b-card-text>
                                        <b>IF</b>
                                        <br>
                                        <sub style="font-size: 9px;"><b>International Freight</b></sub>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarComercio()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                        </div>
                    </b-modal>
                    
                    <!-- Valida Comercio Fin-->

                    <!-- Valida Modalidad -->

                    <b-modal id="inicio-modalidad" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Modalidad</b>
                        </template>
                        <div class="form-group text-center">
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una opción:</p>
                            <b-row>    
                                <b-col md="4" v-for="option in optionsItemModalidad" @click="validaModalidad(option.value)">
                                    <b-card style="cursor:pointer;">
                                    <b-card-img  style="width:50px" :src="option.src" alt="Image" bottom></b-card-img>
                                    <b-card-text>
                                        <b>{{ option.text }}</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <br />
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarModalidad()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Modalidad Fin-->

                    <!-- Valida Ubicacion Mercancia -->

                    <b-modal id="inicio-ubicacion" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Envio de Mercancía</b>
                        </template>
                        <div class="form-group text-center">  
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una opción:</p>
                            <b-row>
                                <b-col md="3"></b-col>
                                <b-col md="3">
                                    <b-card @click="validaUbicacion(1)" style="cursor:pointer;">
                                    <img src="../../../assets/images/norteamerica.png" style="width:100%;">
                                    <br>
                                    <b-card-text>
                                        <b>USA</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3">
                                    <b-card @click="validaUbicacion(2)" style="cursor:pointer;">
                                    <img src="../../../assets/images/cenam.png" style="width:100%;">
                                    <br>
                                    <b-card-text>
                                        <b>Centro América</b>
                                    </b-card-text>
                                    </b-card>
                                </b-col>
                                <b-col md="3"></b-col>
                            </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarUbicacion()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Ubicacion Mercancia Fin-->

                    <!-- Valida Origen Destino -->

                    <b-modal id="inicio-origen-destino" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">

                        <template #modal-title>
                            <b ><i class="fe-info"></i> Información de Origen y Destino</b>
                        </template>
                        <div class="form-group text-center">
                            <div class="primer-style" v-if="termodalidad != 'LTL' && stops">
                                <b-row>
                                    <b-col md="12">
                                        
                                        <b style="font-weight: bold"><i class="fe-info"></i> El servicio con Stops esta habilitado</b>
                                        
                                    </b-col>
                                </b-row>
                            </div>
                            <b-row>
                                <div class="card-body" :style="'padding: 10px;'">
                                    <div class="primer-style">
                                        <b-row>
                                            <b-col>
                                                <div class="segundo-style">
                                                    <div class="tercer-style">
                                                        <div class="tercer-label-style">
                                                            <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                <b :style="'color: red;'">*</b> Ingresa Origen
                                                            </div>
                                                        </div>
                                                        <div class="primer-input-style">
                                                            <template>
                                                                <multiselect
                                                                    v-model="origen"
                                                                    :options="dates_search_address"
                                                                    :loading="isLoadingO"
                                                                    :searchable="true"
                                                                    :clear-on-select="false"
                                                                    :close-on-select="true"
                                                                    label="direccion"
                                                                    track-by="idGeocerca"
                                                                    placeholder="Pais, Estado, Ciudad, CP"
                                                                    @search-change="buscaDireccion"
                                                                    @input="getLabelAddressO"
                                                                >
                                                                </multiselect>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div v-if="arrayOrigen.length == 0">
                                                        <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados <b-badge> ({{ arrayOrigen.length }})  </b-badge></b-button>
                                                        <b-collapse id="origenes" visible>
                                                            <b-list-group>
                                                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                                                    Aun no tienes origenes agregados.
                                                                </b-list-group-item>
                                                            </b-list-group>
                                                        </b-collapse>
                                                    </div>
                                                    <div v-else>
                                                        <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados <b-badge> ({{ arrayOrigen.length }})  </b-badge></b-button>
                                                        <b-collapse id="origenes" visible>
                                                            <table class="table table-striped bg-white"> 
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Origen</th>
                                                                        <th scope="col">Acción</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="origenes in arrayOrigen">
                                                                        <th class="text-wrap">
                                                                            <p v-if="origenes.nombre_corto != ''" class="text-wrap">{{ origenes.nombre_corto}}</p>
                                                                            <p v-else class="text-wrap">{{ origenes.text_largo}}</p>
                                                                        </th>
                                                                        <td class="text-wrap">
                                                                            <b-button v-if="origenes.estatus_quitar == 1" @click="eliminaOrigenArray(origenes.idOrigen,1)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
                                                                            <b-button v-else size="sm" variant="danger"> Sin Acción </b-button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                            </b-col>
                                            <b-col >
                                                <div class="segundo-style">
                                                    <div class="tercer-style">
                                                        <div class="tercer-label-style">
                                                            <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                <b :style="'color: red;'">*</b> Ingresa Destino
                                                            </div>
                                                        </div>
                                                        <div class="primer-input-style">
                                                            <template>
                                                                <multiselect
                                                                    v-model="destino"
                                                                    :options="dates_search_address"
                                                                    :loading="isLoadingD"
                                                                    :searchable="true"
                                                                    :clear-on-select="false"
                                                                    :close-on-select="true"
                                                                    label="direccion"
                                                                    track-by="idGeocerca"
                                                                    placeholder="Pais, Estado, Ciudad, CP"
                                                                    @search-change="buscaDireccion"
                                                                    @input="getLabelAddressD"
                                                                    input-class="segundo-input-istyle-input"
                                                                >
                                                                </multiselect>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div v-if="arrayDestino.length == 0">
                                                        <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados <b-badge> ({{ arrayDestino.length }}) </b-badge></b-button>
                                                        <b-collapse id="destinos" visible>
                                                            <b-list-group>
                                                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                                                    Aun no tienes destinos agregados.
                                                                </b-list-group-item>
                                                            </b-list-group>
                                                        </b-collapse>
                                                    </div>
                                                    <div v-else>
                                                        <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados <b-badge> ({{ arrayDestino.length }}) </b-badge></b-button>
                                                        <b-collapse id="destinos" visible>
                                                            <table class="table table-striped bg-white">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Destino</th>
                                                                        <th scope="col">Acción</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="destinos in arrayDestino">
                                                                        <th class="text-wrap">
                                                                            <p v-if="destinos.nombre_corto  != ''" class="text-wrap">{{ destinos.nombre_corto }}</p>
                                                                            <p v-else class="text-wrap">{{ destinos.text_largo}}</p>
                                                                        </th>
                                                                        <td class="text-wrap">
                                                                            <b-button v-if="destinos.estatus_quitar == 1" @click="eliminaDestinoArray(destinos.idOrigen,1)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
                                                                            <b-button v-else size="sm" variant="danger">Sin Acción</b-button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <br>
                                        <b-row>
                                            <b-col md="12" sm="12">
                                                <br>
                                                <div id="mapaRutas" v-show="mostrarMapa"></div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    
                                    <!--Fin Terrestre-->
                                </div>
                            </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarOD()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                            <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validaO(1)"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Origen Destino Fin-->

                    <!-- Valida Unidades Fin-->
                    
                    <b-modal id="inicio-unidades" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Unidades</b>
                        </template>
                        <div class="form-group text-center">
                            <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una unidad:</p>
                            <br>
                            <div class="primer-style" v-if="termodalidad != 'LTL'">
                                <b-row>
                                    <b-col md="12">
                                        <b-form-checkbox
                                            switch
                                            v-bind:id="'stopscheck'"
                                            v-model="stops"
                                            style="font-size: 12px"
                                            @change="activaStops()"
                                        >
                                            <b style="font-weight: bold" v-if="stops">Servicio con Stops</b>
                                            <b style="font-weight: bold" v-else>Servicio sin Stops </b>
                                        </b-form-checkbox>
                                    </b-col>
                                </b-row>
                            </div>
                            <br>
                            <b-row>
                                <b-col v-for="(unit, index) in units" md="4" v-bind:id="'card_unit_'+unit.id">
                                    <div class="card ribbon-box" @click="validaUnidades(unit.id, unit.name)" style="cursor:pointer;">
                                        <div class="card-body">
                                            <div v-bind:id="'select_card_view_'+unit.id" class="ribbon ribbon-success float-left" style="display:none;">
                                                <i class="fas fa-check"></i> Unidad Seleccionada
                                            </div>
                                            <div class="ribbon-content">
                                                <img src="../../../assets/images/unidades/tautliner.svg" style="width:100%;">
                                                <b>{{ unit.name }}</b>
                                                <div class="text-wrap" style="font-size: 10px;">Tonelada Max.: {{ (unit.peso_bruto_total / 1000) }}, Volumen Max.: {{ (unit.capacidad_vol) }}<sup>m3</sup></div>
                                                <div class="text-wrap" style="font-size: 10px;">Largo: {{ (unit.long) }}<sub>m</sub>, Ancho: {{ unit.width }}<sub>m</sub>, Alto: {{ unit.high }}<sub>m</sub></div>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarUnidades()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                            <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validaU()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
                        </div>
                    </b-modal>
                    
                    <!-- Valida Unidades Fin-->

                    <!-- Valida Mercancias -->

                    <b-modal id="inicio-mercancias" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="xl">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Mercancias</b>
                        </template>
                        <div class="form-group text-center">
                            <b-row>
                                <b-col>
                                    <label for="clasifica" class="form-label">
                                    <b :style="'color: red;'">*</b>Clasificación SAT<i class="fe-info" title="Esta clasificación es de acuerdo al catalogo de productos del SAT, si tiene el id o el nombre del producto ingreselo."></i></label>
                                    <template>
                                        <multiselect
                                            v-model="clasificaTextDet"
                                            label="descripcion"
                                            track-by="clave_prodserv"
                                            placeholder="Ingresa una clasificación"
                                            open-direction="bottom"
                                            :options="dates_search_proser"
                                            :multiple="false"
                                            :searchable="true"
                                            :loading="isLoadingM"
                                            :internal-search="false"
                                            :clear-on-select="false"
                                            :close-on-select="true"
                                            :show-no-results="false"
                                            :hide-selected="true"
                                            :taggable="true"
                                            @input="getLabelProd"
                                            @tag="addMercancia"
                                            @search-change="clasificaciones">
                                            <template #tag="{ option }"><span class="custom__tag"><span>{{ option.id }} {{ option.descripcion }}</span></span></template>
                                        </multiselect>
                                    </template>
                                </b-col>
                                <b-col>
                                    <label for="descripcion" class="form-label">
                                    <b :style="'color: red;'">*</b>Descripción Personalizada<i class="fe-info" title="Este apartado es para dar más detalles del prducto seleccionado del catalogo del SAT."></i></label>
                                    <textarea class="form-control form-control-sm" style="height: 33px" v-model.trim="descripMerc" type="text"/>
                                </b-col>
                                <b-col>
                                    <label for="estibable" class="form-label">
                                        <b :style="'color: red;'">*</b>Unidad de Medida
                                    </label>
                                    <b-form-select id="unidaMedidaMerc" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="unidaMedidaMerc" @change="selectUniMedMerc">
                                        <option value="cm">Centírmetros</option>
                                        <option value="mt">Metros</option>
                                        <option value="pl">Pulgadas</option>
                                    </b-form-select>
                                </b-col>
                                <b-col>
                                    <label for="embalaje" class="form-label"><b :style="'color: red;'">*</b>Embalaje</label>
                                    <b-form-select id="embalaje" class="rounded custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terembalaje" @change="selectEmbalaje($event)">
                                        <option v-for="emb in embalajes" :key="emb.idEmbalaje" v-bind:value="emb.idEmbalaje">
                                            {{ emb.nombre.toUpperCase() }}
                                        </option>
                                    </b-form-select>
                                </b-col>
                                <b-col>
                                    <label for="estibable" class="form-label"><b :style="'color: red;'">*</b>Estibable</label>
                                    <b-form-select id="estibable" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terestibable" @change="selectEstibable">
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                    </b-form-select>
                                </b-col>
                                <b-col>
                                    <label for="estibable" class="form-label">
                                        <b-form-checkbox v-model="checkPeligrosa" name="checkPeligrosa" switch @change="validaValorPeligrosa()">
                                        ¿Es Peligrosa?
                                    </b-form-checkbox>
                                    </label>
                                    <b-form-checkbox v-if="termodalidad != 'LTL'" v-model="checkRefrigerada" name="checkRefrigerada" switch @change="validaValorRefrigerada()">
                                        ¿Es Refrigerada?
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>
                            <b-row>
                                    <b-col md="6" v-if="this.checkPeligrosa">
                                    <label for="unMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>UN</label>
                                        <input class="form-control form-control-sm" v-model.trim="unMerc" type="text"/>
                                    </b-col>
                                    <b-col cols="6" v-if="this.checkPeligrosa">
                                        <label for="classMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>CLASS</label>
                                        <input class="form-control form-control-sm" v-model.trim="classMerc" type="text"/>
                                    </b-col>
                                    <b-col v-if="this.checkRefrigerada">
                                        <label for="gradosMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>Grados</label>
                                        <input class="form-control form-control-sm" v-model.trim="gradosMerc" type="text"/>
                                    </b-col>
                                    <b-col v-if="this.checkRefrigerada">
                                        <label for="tUnidadMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>Especificaciones</label>
                                        <input class="form-control form-control-sm" v-model.trim="tUnidadMerc" type="text"/>
                                    </b-col>
                            </b-row>
                            <br>
                            <div class="container-fluid">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead class="text-white" :style="'background-color: #2aab5c;'">
                                        <tr>
                                            <th scope="col" v-if="termodalidad == 'FTL' || termodalidad == 'FCL'">Unidad</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Largo</th>
                                            <th scope="col">Ancho</th>
                                            <th scope="col">Alto</th>
                                            <th scope="col">Peso</th>
                                            <th scope="col">Peso Real {{ leyendaPeso }}</th>
                                            <!--th scope="col">Unidad</th>
                                            <th scope="col">Volumen(m3)</th-->
                                            <th scope="col">Peso Volumetrico</th>
                                            <th scope="col">Volumen Real(m3)</th>
                                            <th scope="col" v-if="termodalidad == 'LTL'">Peso Facturado {{ leyendaVolumen }}</th>
                                            <th scope="col" v-if="stops">Selecciona Ruta</th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                        </thead>
                                        <tbody :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                            <tr v-for="(paq, i) in agregarMercancias">
                                                <td v-if="termodalidad == 'FTL' || termodalidad == 'FCL' ">{{ paq.unidad }}</td>
                                                <td>{{ paq.cantidad }}</td>
                                                <td>{{ paq.largo }}</td>
                                                <td>{{ paq.ancho }}</td>
                                                <td>{{ paq.alto }}</td>
                                                <td>{{ paq.peso }}<sub>kg</sub></td>
                                                <td>{{ paq.pesoTotal }}<sub>kg</sub></td>
                                                <!--td>{{ paq.upeso.toUpperCase() }}</td>
                                                <td>{{ paq.volumen }}</td-->
                                                <!--td>{{ paq.pesoVolumetrico }}<sub>kg</sub></td-->
                                                <td>{{ formatMoney(paq.pesoTotal / 350) }}<sub>kg</sub></td>
                                                <td>{{ paq.volumenTotal }}<sub>m<sup>3</sup></sub></td>
                                                <td v-if="termodalidad == 'LTL'">{{ paq.pesoVolumetricoTotal }}<sub>kg</sub></td>
                                                <td v-if="stops">{{ paq.ruta }}</td>
                                                <td>
                                                    <b-button class="btn btn-danger" title="Eliminar Paquete" @click="eliminaPaquete(paq.idPaq)"><i class="fas fa-trash"></i></b-button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'" v-if="termodalidad == 'FTL' || termodalidad == 'FCL'">
                                                    <b-form-select id="selectUnidadMerc" class="form-control custom-select-sm" v-model="valUnidadMerc" @change="selectUnidadMerc">
                                                        <option v-for="r in unidadesSeleccion" v-bind:value="r.idUnidad" v-if="r.ver==0">{{ r.nombreUnidad }}</option>
                                                    </b-form-select>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm" v-model.trim="cantMerc" type="number" @change="validaCantidad()"/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm" v-model="largoMerc" type="number" @change="validaLargo()"/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm" v-model="anchoMerc" type="number" @change="validaAncho()"/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input v-if="terestibable == 'si'" class="form-control form-control-sm" v-model="altoMerc" type="number" @change="validaAlto()"/>
                                                    <input v-else class="form-control form-control-sm" v-model="altoMerc" type="number" @change="validaAlto()" disabled/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm col" v-model.trim="pesTMerc" type="number" @change="validaPeso()"/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm col" v-model.trim="pesoTotal" type="number" disabled/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm" v-model="pesoVol" type="number" disabled/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <input class="form-control form-control-sm" v-model="volMercTot" type="number" disabled/>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'" v-if="termodalidad == 'LTL'">
                                                    <input class="form-control form-control-sm" v-model="volMercTot" type="number" disabled/>
                                                    </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'" v-if="stops">
                                                    <b-form-select id="selectStops" class="form-control custom-select-sm" v-model="valStops">
                                                        <option v-for="r in routes" v-bind:value="r.id_ruta" v-if="r.ver==0">{{ r.estado_o }}, {{r.ciudad_o}} - {{ r.estado_d }}, {{r.ciudad_d}}</option>
                                                    </b-form-select>
                                                </td>
                                                <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <b-button class="btn btn-sm" :style="'background-color: #2aab5c;'" title="Agregar Paquete" @click="agregaPaquetes()"><i class="fas fa-plus"></i></b-button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr>
                                </div>
                            </div>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarMercancias()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                            <b-button class="width-md ml-1" size="sm" @click="validaMercancias()" :style="'background-color: #2aab5c;'"><b><i class="bx bx-list-plus" style="font-size: 15px;"></i> Cotizar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- Valida Mercancias Fin-->
                    
                    <!-- SECUENCIA INICIO TERMINA -->

                    <!-- INICIA SUBDETALLE -->
                     <!--INICIO HEADER-->
                    <b-container fluid>
                        <b-row style="display: block;">
                            <div class="_1n4EOSyAk1BfVWnF_adPB9">
                                <div class="YkNOjSwN0S7IrLX5OK2Hc">
                                    <div class="_2tU2wKoG7YY564aace37OF">
                                        <b style="color: red">*</b>Transporte
                                    </div>
                                    <div class="GDwblpm-PHJsqhSUenve5" @click="inicio()">
                                        <div class="_3wHay473hXYPOlphbqvMW6 _1pk_-C20zpknwxqZLn_t9z" ref="uno">
                                            <button style=" display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" @click="inicio()" ref="fondoB1" title="Maritimo">
                                                <i class="bx bxs-ship fa-3x"></i>
                                            </button>
                                            <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB1">Maritimo</span>
                                        </div>
                                        <div class="_3wHay473hXYPOlphbqvMW6" ref="dos">
                                            <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" @click="inicio()" ref="fondoB2" title="Terrestre">
                                                <i class="bx bxs-truck fa-3x"></i>
                                            </button>
                                            <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB2">Terrestre</span>
                                        </div>
                                        <div class="_3wHay473hXYPOlphbqvMW6" ref="tres">
                                            <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" @click="inicio()" ref="fondoB3" title="Aereo">
                                                <i class="bx bxs-plane-alt fa-3x"></i>
                                            </button>
                                            <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB3">Aereo</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="_2FJfSi7htM3gHGbKFfAiX6">
                                    <div class="_2tU2wKoG7YY564aace37OF">
                                        <b style="color: red">*</b>Modalidad
                                    </div>
                                    <div class="_3vjMsFU0d1YJalV9Qbqq" tabindex="1">
                                        <div class="E5e3waHARVCVMF2JA93PS" @click="abreModalidadModal()">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <img v-if="termodalidadImg != ''" :src="termodalidadImg" width="25" height="25"/>
                                                    </span>
                                                </div>
                                                <b-form-select id="cargas" class="fecha" @click="abreModalidadModal()" v-model="termodalidad" >
                                                    <option v-for="option in optionsItemModalidad" :key="option.value" v-bind:value="option.value">
                                                        {{ option.text }}
                                                    </option>
                                                </b-form-select>
                                            </div>
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
                                        <div class="_3vCdC7UlpoMI8zyS9070Tm" @click="abreOrigenesModal()">
                                            <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c" @click="abreOrigenesModal()">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                                <template>
                                                    <b-form-input class="_1igQJzeY95hxUNao_yIXrr" v-model="origen" placeholder="Pais, Estado, Ciudad, CP" @click="abreOrigenesModal"></b-form-input>
                                                    
                                                </template>
                                            </div>
                                        </div>
                                        
                                        <div class="_3vCdC7UlpoMI8zyS9070Tm" @click="abreOrigenesModal()">
                                            <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c" @click="abreOrigenesModal()">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                                <template>
                                                    <b-form-input class="_1igQJzeY95hxUNao_yIXrr" v-model="destino" placeholder="Pais, Estado, Ciudad, CP" @click="abreOrigenesModal"></b-form-input>
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
                    
                                <div class="_3QlnruSL5VqOlp6mJEr4-Z">
                                    <b-button class="zTDkSCFjS5VtNrkEzKtJ5" v-b-tooltip.hover="{ variant: 'success' }" variant="secondary" @click="inicio()" style="height: 100%">
                                        <i class="fe-refresh-ccw"></i>
                                    </b-button>
                                </div>
                            </div>
                        </b-row>
                    </b-container>
                    <!--FIN HEADER-->
                    <br>
                    <b-row>
                        <b-col md="2">
                            <b-card>
                                <label for="" style="font-size: 12px; font-weight: bold">SERVICIOS</label>
                                <b-form-checkbox
                                    name="listadoServicios"
                                    v-bind:id="serv.id + 'cheServicios'"
                                    v-model="selectServices"
                                    v-for="serv in services"
                                    :key="serv.id"
                                    v-bind:value="serv.id"
                                    :disabled="serv.nameproduct == 'FLETE NACIONAL'"
                                    @change="servicioSelecciona(serv.id)"
                                    style="font-size: 12px"
                                    :checked="serv.nameproduct == 'RECOLECCION' || serv.nameproduct == 'ENTREGA' || serv.nameproduct == 'FLETE NACIONAL'"
                                >
                                <b style="font-weight: bold">{{ serv.nameproduct }}</b>
                                </b-form-checkbox>
                            </b-card>
                        </b-col>
                        <b-col>
                            <div class="card bg-white" v-for="c in cards">
                                <div class="card-body">
                                        <b-row >
                                            <div class="col-md-6">
                                                <div class="row align-items-center">
                                                    <div class="col-6 text-center">
                                                        <h1 class="display-4">
                                                            <template>
                                                                <img v-bind:src="c.imagen" v-bind:alt="c.unidad" style="width: 100%;">
                                                            </template>
                                                        </h1>
                                                    </div>
                                                    <div class="col-6">
                                                        <div >
                                                            <h2>
                                                                <i class="fas fa-shipping-fast text-primary"></i> <b>{{ c.unidad }}</b>
                                                            </h2>
                                                            <p><i class="fas fa-cube text-primary"></i> <b>Volumen Total: {{ formatMoney(c.volumenTotalFinal) }}<sub>m<sup>3</sup></sub></b></p>
                                                            <p><i class="fas fa-dolly-flatbed text-primary"></i> <b>Peso Total: {{ formatMoney(c.pesoTotalFinal) }}<sub>{{ c.upeso }}</sub></b></p>
                                                            <p><i :class="c.iconoCarga + ' text-primary'"></i> <b>Tipo de Mercancia: {{ c.tertipocarga }}</b></p>
                                                            <p><i class="fas fa-cubes text-primary"></i> <b>Mercancía: {{ c.clasificacion }}</b></p>
                                                            <p><i class="far fa-check-square text-primary"></i> <b>Detalle: {{ c.descripcionMercancia }}</b></p>
                                                            <p><i class="fas fa-boxes text-primary"></i> <b>Cantidad: {{ c.cantidadTotalFinal }} {{c.embalaje}}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End row -->
                                            </div>
                                            <div class="col-md-6">
                                                <b-row v-if="c.folio_cotizacion != ''" class="bg-light p-2 rounded">
                                                    <div class="col-6 text-center">
                                                        <h4 class=" mt-0"><b>Folio de Cotización: </b> </h4>
                                                    </div>
                                                    <div class="col-6 text-center">
                                                        <h4 class="text-primary mt-0"><b>{{ c.folio_cotizacion }} </b> </h4>
                                                    </div>
                                                </b-row>
                                                <div class="row">
                                                    <div class="container my-3 bg-light p-2 rounded">
                                                        <div class="row">
                                                            <div class="col-5">
                                                                <h5 class="card-title">Origen</h5>
                                                                <p class="card-text text-center"><i class="fas fa-map-marker-alt text-primary"></i> {{ c.text_largo_o }}</p>
                                                            </div>
                                                            <div class="col-2">
                                                                <h5 class="card-title">&nbsp;</h5>
                                                                <p class="card-text text-center"><i class="fas fa-shipping-fast text-primary fa-2x"></i></p>
                                                            </div>
                                                            <div class="col-5"> 
                                                                <h5 class="card-title">Destino</h5>
                                                                <p class="card-text text-center"><i class="fas fa-map-marker-alt text-primary"></i> {{ c.text_largo_d }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <b-row>
                                                    <div class="col-8 text-center">
                                                        <h4 class=" mt-0"><b>TOTAL: ${{ formatMoney(c.precioTotalFinal) }} MXN</b> </h4>
                                                    </div>
                                                    <div class="col-4 text-center">
                                                        <h4 class=" mt-0">
                                                            <b-button class="btn bg-primary" title="Detalle de Cotización" @click="verDetalleCotizacion(c.id_card)"><i class="fas fa-file-invoice-dollar"></i> Ver Detalle</b-button>    
                                                        </h4>
                                                    </div>
                                                </b-row>
                                                <!-- end row -->
                                            </div>
                                        </b-row>
                                </div>
                                <!-- end row -->
                            </div>
                        </b-col>
                    </b-row>

                    <!-- TERMINA SUBDETALLE -->

                    <!-- INICIO RESUMEN SERVICIO -->
                    <b-modal id="resumen-modal" hide-header hide-footer title="INFORMACION GENERAL" title-class="font-18" dialog-class="modal-xl" no-close-on-esc no-close-on-backdrop>
                        <b-container>
                            <b-row>
                                <b-col cols="12">
                                    <b-container>
                                        <b-row style=" border-color: #2aab5c; border-width: 1px; border-bottom-style: solid;">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="container my-3 bg-white p-2 rounded">
                                                        <div class="row">
                                                            <div class="col-3">
                                                                <div class="" style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                                                    <img src="../../../assets/images/logo_interland.png" alt="Logo Interland" style="width: 100%"/>
                                                                </div>
                                                            </div>
                                                            <div class="col">
                                                                <div style=" align-items: justify; ">
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
                                                            </div>
                                                            <div v-if="rFinal.folio_cotizacion != ''" class="d-flex justify-content-center align-items-center col-3" style="height: 100%;"> 
                                                                <div class="text-center">
                                                                    <h5 class="card-title text-primary mb-1">COTIZACIÓN</h5><br>
                                                                    <h5 class="card-title text-primary mb-1">FOLIO:</h5><br>
                                                                    <!--h5 class="card-title text-primary mb-1"><b style=" font-weight: bold; color: #000000;">{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6,"0") }}</b></h5-->
                                                                    <h5 class="card-title text-primary mb-1"><b style=" font-weight: bold; color: #000000;">{{ rFinal.folio_cotizacion }}</b></h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>
                                        </b-row>
                                        <br />
                                        <b-row class="p-1" style=" background-color: #056736; color: #ffffff;">
                                            <b-col class="text-left">
                                                <label :style="'color: #ffffff;'">INFORMACIÓN GENERAL</label>
                                            </b-col>
                                            <b-col class="text-right">Ciudad de México a {{ fechaFormato }}</b-col>
                                        </b-row>
                                        <b-row class="text-left " style="font-size: 12px;">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="container my-3 bg-white ">
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <div v-if="stops">
                                                                    <p v-for="(org, index) in rFinal.route"><label style="font-size: 11px">ORIGEN {{ index + 1 }}: </label>  {{ org.text_largo_o }}</p>
                                                                </div>
                                                                <div v-else>
                                                                    <p ><label style="font-size: 11px">ORIGEN: </label>  {{ rFinal.text_largo_o }}</p>
                                                                </div>
                                                                
                                                                <p><label style="font-size: 11px">TIPO DE OPERACION: </label> {{ termodalidad.toUpperCase() }}</p>
                                                                <p><label style="font-size: 11px">TIPO DE ENVIO: </label> {{ tipoEnvio }}</p>
                                                                <p>
                                                                    <label style="font-size: 11px">FRECUENCIAS: </label>
                                                                    <table style="width: 100%; border: 1px solid #EBEBEB;">
                                                                        <tbody>
                                                                            <tr style="border-style: double;">
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>LUN</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>MAR</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>MIE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>JUE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>VIE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>SAB</b></td>
                                                                            </tr>
                                                                            <tr style="border-style: double;">
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </p>
                                                                <p><label style="font-size: 11px">FECHA DE COTIZACIÓN: </label> {{ terfecha }}</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <div v-if="stops">
                                                                    <p v-for="(des, index) in rFinal.route"><label style="font-size: 11px">DESTINO {{ index + 1 }}: </label>  {{ des.text_largo_d }}</p>
                                                                </div>
                                                                <div v-else>
                                                                    <p><label style="font-size: 11px">DESTINO: </label>  {{ rFinal.text_largo_d }}</p>
                                                                </div>
                                                                
                                                                <p><label style="font-size: 11px">SERVICIO: </label> {{ tipoOpcion }}</p>
                                                                <p><label style="font-size: 11px">USUARIO QUE GENERA: </label> {{ username }}</p>
                                                                <p>
                                                                    <label style="font-size: 11px">FRECUENCIAS: </label>
                                                                    <table style="width: 100%; border: 1px solid #EBEBEB;">
                                                                        <tbody>
                                                                            <tr style="border-style: double;">
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>LUN</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>MAR</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>MIE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>JUE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>VIE</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>SAB</b></td>
                                                                            </tr>
                                                                            <tr style="border-style: double;">
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                                <td style="text-align: center; vertical-align: top; border: 1px solid #e7e7e7; border-spacing: 0;"><b>X</b></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </p>
                                                                <p>
                                                                    <div class="col-md-12 text-center">
                                                                        <!--b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" :style="'background-color: #2aab5c;'" size="sm">Divisa: USD</b-button-->
                                                                        <b-button title="Cambiar a Moneda USD" :style="'background-color: #2aab5c;'" size="sm">Divisa: MXN</b-button>
                                                                    </div>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>
                                        </b-row>
                                    
                                        <b-row class="p-1" :style="'background-color: #056736; color: #ffffff;'">
                                            <b-col class="text-left">
                                                <label :style="'color: #ffffff;'">MERCANCIAS</label>
                                            </b-col>
                                        </b-row>
                                        <div class="col-md-12" style="font-size: 12px;">
                                            <br>
                                            <b-card>
                                                <template #header>
                                                    <b-row>

                                                    </b-row>
                                                    <h4 class="mb-0">{{ 'Unidad Asignada: '+rFinal.name }} - Mercancia: {{rFinal.tertipocarga}}</h4>
                                                </template>
                                                <b-row>
                                                    <div class="container bg-white rounded">
                                                        <div class="row">
                                                            <div class="col-4">

                                                                <p><b>CANTIDAD DE {{ rFinal.embalaje }}: </b>{{ rFinal.cantidadTotalFinal }}</p>
                                                                <p><b>VOLUMEN TOTAL:</b> {{ rFinal.volumenTotalFinal }}<sub>m<sup>3</sup></sub></p>
                                                            </div>
                                                            <div class="col-4">
                                                                <p><b>PESO TOTAL:</b> {{ rFinal.pesoTotalFinal }}<sub>kg</sub></p>
                                                                <p><b>PESO FACTURADO:</b> {{ rFinal.pesoVolumetricoTotal }}<sub>kg</sub></p>
                                                            </div>
                                                            <div class="col-4">
                                                                <p><b>MERCANCIA: {{ rFinal.clasificacion }}</b></p>
                                                                <p><b>DESCRIPCION DE MERCANCIA: {{ rFinal.descripcionMercancia }}</b></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </b-row>
                                                <b-row v-if="rFinal.tertipocarga == 'Peligrosa'">
                                                    <div class="container bg-white rounded">
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <p><b>UN:</b> {{ rFinal.un }}<sub>m<sup>3</sup></sub></p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p><b>CLASS:</b> {{ rFinal.classP}}<sub>kg</sub></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </b-row>
                                                <b-row v-if="rFinal.tertipocarga == 'Refrigerada'">
                                                    <div class="container bg-white rounded">
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <p><b>Grados:</b> {{ rFinal.grados }}<sub>m<sup>3</sup></sub></p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p><b>CLASS:</b> {{ rFinal.descripRef}}<sub>kg</sub></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </b-row>
                                            </b-card>
                                        </div>
                                        <b-row class="p-1" style="background-color: #056736;color: #ffffff;">
                                            <b-col class="text-left">
                                                <label :style="'color: #ffffff;'">PAQUETES</label>
                                            </b-col>
                                            <b-col></b-col>
                                            <b-col></b-col>
                                        </b-row>
                                        <div class="row my-3" style="font-size: 12px;">
                                            <div v-for="price in pricingData" :key="price.title" class="col-xl-4 col-md-6">
                                                <div class="card card-pricing" :class="{ 'ribbon-box': `${price.ribbon}` === 'Más Vendido' }">
                                                    <div v-if="price.ribbon === 'Más Vendido'" class="ribbon-two ribbon-two-danger">
                                                        <span>Más Vendido</span>
                                                    </div>
                                                    <div class="card-body text-center">
                                                        <p class="card-pricing-plan-name font-weight-bold text-uppercase">
                                                            {{ price.title }}
                                                        </p>
                                                        <span class="card-pricing-icon" :class="{'bg-danger': `${price.ribbon}` === 'Más Vendido', 'text-secondary': `${price.ribbon}` !== 'Más Vendido', 'text-white': `${price.ribbon}` === 'Más Vendido',}">
                                                            <i :class="`${price.icon}`"></i>
                                                        </span>
                                                        <h2 class="card-pricing-price">
                                                            ${{ formatMoney(price.price.toFixed(2)) }}
                                                            <span>/ {{ price.divisa }}</span>
                                                        </h2>
                                                        <ul class="card-pricing-features">
                                                            <li>INCLUYE: {{ price.services }}</li>
                                                            <li>{{ price.bandwidth }}</li>
                                                            <li>{{ price.domain }}</li>
                                                            <li>{{ price.user }}</li>
                                                            <li>Monitoreo de unidades 24 horas, los 7 días de la semana.</li>
                                                        </ul>
                                                        <button v-if="price.seleccionado == 1" class="btn mt-4 btn-block btn-primary" :class="{ 'btn-danger': `${price.ribbon}` === 'Más Vendido' }">
                                                            <i class="fe-check"></i> Servicio Cotizado
                                                        </button>
                                                        <button v-else-if="rFinal.folio_cotizacion != '' && price.seleccionado == 0" class="btn mt-4 btn-block btn-primary" :class="{ 'btn-danger': `${price.ribbon}` === 'Más Vendido' }" @click="elegirPaquete(price.idPlan)">
                                                            Elegir Paquete
                                                        </button>
                                                    </div>
                                                </div>
                                                <!-- end Pricing_card -->
                                            </div>
                                            <!-- end col -->
                                        </div>
                                        <b-row class="p-1" style=" background-color: #056736; color: #ffffff;">
                                            <b-col class="text-left">
                                                <label :style="'color: #ffffff;'">SERVICIOS</label>
                                            </b-col>
                                            <b-col cols="5"></b-col>
                                            <b-col></b-col>
                                        </b-row>
                                        <div class="col-md-12" style="font-size: 12px;">
                                            <div class="form-group row mb-0">
                                                <div class="table-responsive">
                                                    <table class="table table-sm mb-0" width="100%" v-if="confirmarServices.length > 0">
                                                        <thead>
                                                            <tr>
                                                                <th>CONCEPTO</th>
                                                                <th>SUBTOTAL</th>
                                                                <th>IVA</th>
                                                                <th>TOTAL</th>
                                                                <!--th v-if="admin">AJUSTE DE VENTA</th-->
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="servicios in confirmarServices" v-bind:key="servicios.idService" >
                                                                <td style="text-right"> {{ servicios.nombreSer }} </td>
                                                                <td style="text-right"> ${{ formatMoney(servicios.subtotal) }}<sub>MXN</sub></td>
                                                                <td style="text-right"> ${{ formatMoney(servicios.porcIva) }}<sub>MXN</sub></td>
                                                                <td style="text-right"> ${{ formatMoney(servicios.total) }}<sub>MXN</sub></td>
                                                                <!--td align="center" v-if="servicios.subtotal != 0 && admin">
                                                                    <b-form-checkbox
                                                                        name="listadoServicios"
                                                                        v-bind:id="servicios.idService + 'check'"
                                                                        v-model="serviciosResumen"
                                                                        :key="servicios.idService"
                                                                        v-bind:value="servicios.idService"
                                                                        @change="mostrarImpuesto(servicios.idService)"
                                                                        :style="'font-size: 12px;'"
                                                                        >
                                                                    </b-form-checkbox>
                                                                </td>
                                                                <td align="center" v-else>
                                                                    <p>En Proceso de Cotización</p>
                                                                </td>
                                                                <td v-if="admin">
                                                                    <select hidden v-bind:id="servicios.idService + 'seleccionImpuesto'" class="form-control-sm" @change="sumaImpuesto($event,servicios.idService)">
                                                                        <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0">
                                                                        {{ opc.value }}%
                                                                        </option>
                                                                    </select>
                                                                    <input hidden value="0" v-bind:id=" servicios.idService + 'escondeImpuesto'"/>
                                                                </td>
                                                                <td v-if="admin">
                                                                    <input hidden placeholder="Total" class="form-control text-center" type="text" value="0" v-bind:id="servicios.idService + 'sumaTotal'" readonly/>
                                                                    <input hidden value="0" v-bind:id=" servicios.idService + 'impuestoOculto'"/>
                                                                    <input hidden value="0" v-bind:id="servicios.idService + 'ocultarSumaTotal'"/>
                                                                </td-->
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td colspan="2" :style="'text-align: right;'">
                                                                <p>
                                                                    <b>SUBTOTAL:</b>
                                                                    ${{ formatMoney(parseFloat(totalSubtotalGlobal)) }}<sub>MXN</sub>
                                                                </p>
                                                                <p>
                                                                    <b>I.V.A.:</b>
                                                                    ${{ formatMoney(parseFloat(totalIvaGlobal)) }}<sub>MXN</sub>
                                                                </p>
                                                                <p>
                                                                    <b>TOTAL:</b>
                                                                    ${{ formatMoney(parseFloat(totalGlobal)) }}<sub>MXN</sub>
                                                                </p>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                    <p v-else>Sin Servicios</p>
                                                </div>
                                            </div>
                                        </div>
                                    </b-container>
                                </b-col>
                            </b-row>
                            <div class="form-group text-right mt-3">
                                <b-button class="width-md ml-1" variant="secondary" @click="hideResumen()">Cerrar</b-button>
                                <b-button class="width-md ml-1" variant="primary" @click="validaInfoConfirma()" v-if="rFinal.folio_cotizacion == ''">Quiero el Servicio!</b-button>
                                <b-button variant="outline-success" @click="reloadPage" v-if="rFinal.folio_cotizacion != ''"><i class="fas fa-plus-circle"></i> Nueva Cotización</b-button>
                                <!--b-button v-else-if="existeCotizacion && termodalidad == 'FTL'" class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="contactoFTL()">Quiero el Servicio!</b-button-->
                            </div>
                        </b-container>
                    </b-modal>
                    <!-- FIN RESUMEN SERVICIO -->

                    <!-- INICIO VALIDA VALOR SEGURO -->

                    <b-modal id="valorDeclaradoMercancia" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                        <template #modal-title>
                            <b><i class="fe-info"></i> Aviso Mercancia</b>
                        </template>
                        <div class="form-group text-center">
                            <label for="gradosMerc" class="form-label">Valor declarado de la mercancía</label>
                            <input class="form-control form-control-sm" v-model="valorMercancia" type="number" @change="validaValorMercancia()"/>
                            <br />
                            <b-button class="width-md ml-1" variant="secondary" @click="cierraModal(2)"><b><i class="fe-x"></i>Cancelar</b></b-button>
                            <b-button class="width-md ml-1" variant="primary" @click="cierraModalSeguroValor"><b><i class="fe-check"></i> Guardar</b></b-button>
                        </div>
                    </b-modal>

                    <b-modal id="valorDeclaradoMercanciaInfo" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                        <template #modal-title>
                            <b><i class="fe-info"></i> Aviso Mercancia</b>
                        </template>
                        <div class="form-group text-center">
                            <label for="gradosMerc" class="form-label">Toma en cuenta que el valor declarado de la mercancia puede ser en USD o en MXN.</label>
                            <br />
                            <b-button class="width-md ml-1" variant="secondary" @click="cierraModalSeguro()"><b><i class="fe-x"></i>Cancelar</b></b-button>
                            <b-button class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="cierraModalSeguro()"><b><i class="fe-check"></i> Aceptar</b></b-button>
                        </div>
                    </b-modal>

                    <!-- FIN VALIDA VALOR SEGURO -->

                    <!-- INICIO ULTIMO FLUJO -->

                    <b-modal id="validaConfirmacionOD" hide-footer centered hide-close size="xl">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Confirma los datos de Origen</b>
                        </template>
                        <b-container fluid="lg">
                            <b-row>
                                <b-col cols="12">
                                    <b-container fluid="lg">
                                        <b-row >
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="container my-3 bg-white p-2 rounded" v-if="stops" v-for="(r, index) in rFinal.route">
                                                        <div class="row">
                                                            <div class="col-5">
                                                                <h5 class="card-title">Origen {{ index+1 }}</h5>
                                                                <p><i class="fas fa-map-marker-alt text-primary"></i> <b>{{ r.text_largo_o }}</b></p>
                                                            </div>
                                                            <div class="col-2">
                                                                <h5 class="card-title">&nbsp;</h5>
                                                                <p class="card-text text-center"><i class="fas fa-angle-double-right text-primary fa-2x"></i></p>
                                                            </div>
                                                            <div class="col-5"> 
                                                                <h5 class="card-title">Destino {{ index+1 }}</h5>
                                                                <p><i class="fas fa-map-marker-alt text-primary"></i> <b>{{ r.text_largo_d }}</b></p>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-6 bg-light">
                                                                <b-container>
                                                                    <b-row>
                                                                        <b-col md="12">
                                                                            <h5><b :style="'color: red;'">*</b> Calle</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-road text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Calle" :id="'calle_o_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row>
                                                                        <b-col md="6">
                                                                            <h5><b :style="'color: red;'">*</b> Número Exterior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Exterior" :id="'numero_ext_o_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                        <b-col md="6">
                                                                            <h5>Número Interior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Interior" :id="'numero_int_o_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                            <div class="col-6 bg-light"> 
                                                                <b-container>
                                                                    <b-row>
                                                                        <b-col md="12">
                                                                            <h5><b :style="'color: red;'">*</b> Calle</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-road text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Calle" :id="'calle_d_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row>
                                                                        <b-col md="6">
                                                                            <h5><b :style="'color: red;'">*</b> Número Exterior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Exterior" :id="'numero_ext_d_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                        <b-col md="6">
                                                                            <h5>Número Interior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Interior" :id="'numero_int_d_'+r.identificador"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                    </div>
                                                    <div class="container my-3 bg-white p-2 rounded" v-if="!stops">
                                                        <div class="row">
                                                            <div class="col-5">
                                                                <h5 class="card-title">Origen</h5>
                                                                <p><i class="fas fa-map-marker-alt text-primary"></i> <b>{{ rFinal.text_largo_o }}</b></p>
                                                            </div>
                                                            <div class="col-2">
                                                                <h5 class="card-title">&nbsp;</h5>
                                                                <p class="card-text text-center"><i class="fas fa-angle-double-right text-primary fa-2x"></i></p>
                                                            </div>
                                                            <div class="col-5"> 
                                                                <h5 class="card-title">Destino</h5>
                                                                <p><i class="fas fa-map-marker-alt text-primary"></i> <b>{{ rFinal.text_largo_d }}</b></p>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-6 bg-light">
                                                                <b-container>
                                                                    <b-row>
                                                                        <b-col md="12">
                                                                            <h5><b :style="'color: red;'">*</b> Calle</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-road text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Calle" v-model.trim="calleOrigen"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row>
                                                                        <b-col md="6">
                                                                            <h5><b :style="'color: red;'">*</b> Número Exterior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Exterior" v-model.trim="numExtOrigen"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                        <b-col md="6">
                                                                            <h5>Número Interior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Interior" v-model.trim="numIntOrigen"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                            <div class="col-6 bg-light"> 
                                                                <b-container>
                                                                    <b-row>
                                                                        <b-col md="12">
                                                                            <h5><b :style="'color: red;'">*</b> Calle</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-road text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Calle" v-model.trim="calleDestino"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row>
                                                                        <b-col md="6">
                                                                            <h5><b :style="'color: red;'">*</b> Número Exterior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Exterior" v-model.trim="numExtDestino"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                        <b-col md="6">
                                                                            <h5>Número Interior</h5>
                                                                            <b-input-group size="lg" class="mb-2">
                                                                                <b-input-group-prepend is-text>
                                                                                    <i class="fas fa-hashtag text-primary"></i>
                                                                                </b-input-group-prepend>
                                                                                <b-form-input type="text" placeholder="Número Interior" v-model.trim="numIntDestino"></b-form-input>
                                                                            </b-input-group>
                                                                        </b-col>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>
                                        </b-row>
                                    </b-container>
                                </b-col>
                            </b-row>
                            <div class="form-group text-right mt-3">
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarVOD()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validacionConfirmacionOD()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
                            </div>
                        </b-container>
                    </b-modal>

                    <b-modal id="datosContacto"  hide-footer centered hide-close size="lg">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Datos de Contacto</b>
                            </template>

                            <div class="form-group text-center">
                                <div class="card-body" style="'padding: 10px;'">
                                    <div class="primer-style">
                                        <b-row>
                                            <b-col md="6">
                                                <div class="tercer-label-style">
                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                        <b :style="'color: red;'">*</b> Nombre Completo
                                                    </div>
                                                </div>
                                                <div class="primer-input-style">
                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                        <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                            <i class="fas fa-user"></i>
                                                        </div>
                                                        <div class="segundo-input-input-style segundo-input-input-input-style">
                                                            <template>
                                                                <b-input class="segundo-input-istyle-input" v-model="contacName" placeholder="Daniel Romero"></b-input>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </b-col>
                                            <b-col md="6">
                                                <div class="tercer-label-style">
                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                        <b :style="'color: red;'">*</b> Correo Electrónico
                                                    </div>
                                                </div>
                                                <div class="primer-input-style">
                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                        <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                            <i class="far fa-envelope"></i>
                                                        </div>
                                                        <div class="segundo-input-input-style segundo-input-input-input-style">
                                                            <template>
                                                                <b-input class="segundo-input-istyle-input" v-model="contacEmail" placeholder="pablo@gmail.com"></b-input>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <br>
                                        <b-row>
                                            <b-col md="6">
                                                <div class="tercer-label-style">
                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                        <b :style="'color: red;'">*</b>Número de Teléfono
                                                    </div>
                                                </div>
                                                <div class="primer-input-style">
                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                        <div class="segundo-input-input-style segundo-input-input-input-style">
                                                            <select class="segundo-input-istyle-input col-md-4" id="lada" v-model="contacLada" :style="'padding: 0px;'">
                                                                <option v-for="marcado in ladas" :key="marcado.id" v-bind:value="marcado.id">
                                                                {{ marcado.alias }} + {{ marcado.code }}
                                                                </option>
                                                            </select>
                                                            <input class="segundo-input-istyle-input col-md-8" :style="'padding: 0px;'" type="number" v-model="contacTelefono" />
                                                        </div>
                                                    </div>
                                                </div>  
                                            </b-col>
                                            <b-col md="6">
                                                <div class="tercer-label-style">
                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                        <!--b :style="'color: red;'">*</b--> Notas
                                                    </div>
                                                </div>
                                                <div class="primer-input-style">
                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                        <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                            <i class="fas fa-sticky-note"></i>
                                                        </div>
                                                        <div class="segundo-input-input-style segundo-input-input-input-style">
                                                            <template>
                                                                <b-textarea class="segundo-input-istyle-input" v-model="contacDescription" placeholder="Notas Adicionales"></b-textarea>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                                <br />
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="cerrarConfirmacionContacto()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validaConfirmacionContacto()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
                            </div>
                    </b-modal>

                    <b-modal id="validaConfirmacionCliente"  hide-footer centered hide-close size="lg">
                        <template #modal-title>
                            <b><i class="fe-info"></i> Último paso</b>
                        </template>
                        <div class="form-group text-center">
                            <div class="card-body" :style="'padding: 10px;'">
                                <div class="primer-style">
                                    <b-row>
                                        <b-col md="12">
                                            <div class="tercer-label-style">
                                                <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                    <b :style="'color: red;'">*</b> ¿Cúal es tu RFC?
                                                </div>
                                            </div>
                                            <div class="primer-input-style">
                                                <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                        <i class="fas fa-user-check"></i>
                                                    </div>
                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                        <template>
                                                            <b-input class="segundo-input-istyle-input" v-model="rfcClienteInterland" @input="rfcClienteInterland = rfcClienteInterland.toUpperCase()"></b-input>
                                                            <!--sub>*Si eres Cliente registrado Interland, ingresa tu RFC.</sub-->
                                                            <div id="resultadoRFC"></div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <br>
                                </div>
                            </div>
                            <br />
                            <b-button class="width-md ml-1" size="sm" variant="secondary" @click="cerrarConfirmacionCliente()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                            <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validaRFCUsuario()"> <b>Cotizar Ahora!</b></b-button>
                        </div>
                    </b-modal>
                    <!-- FIN ULTIMO FLUJO -->

                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>
<style>

/* BARCO */

.ocean {
    height: 100%;
    width: 100%;
    background-color: #ffffff; /* Color del mar */
    display: flex;
    align-items: center;
    justify-content: center;
    animation: waveAnimation 4s ease-in-out infinite alternate;
}

/* CAMION */

.road {
    height: 100%;
    width: 100%;
    background-color: #ffffff; /* Color de la carretera */
    position: relative;
    overflow: hidden;
}

.loop-wrapper {
    margin: 0 auto;
    position: relative;
    display: block;
    width: 600px;
    height: 100%;
    overflow: hidden;
    border-bottom: 3px solid #5a6268;
    color: #5a6268;
}

.mountain {
    position: absolute;
    right: -900px;
    bottom: -20px;
    width: 2px;
    height: 2px;
    box-shadow: 
        0 0 0 50px #2aab5c,
        60px 50px 0 70px #2aab5c,
        90px 90px 0 50px #2aab5c,
        250px 250px 0 50px #2aab5c,
        290px 320px 0 50px #2aab5c,
        320px 400px 0 50px #2aab5c
        ;
    transform: rotate(130deg);
    animation: mtn 20s linear infinite;
}

.hill {
    position: absolute;
    right: -900px;
    bottom: -50px;
    width: 400px;
    border-radius: 50%;
    height: 20px;
    box-shadow: 
        0 0 0 50px #2aab5c,
        -20px 0 0 20px #2aab5c,
        -90px 0 0 50px #2aab5c,
        250px 0 0 50px #2aab5c,
        290px 0 0 50px #2aab5c,
        620px 0 0 50px #2aab5c;
    animation: hill 4s 2s linear infinite;
}

.tree, .tree:nth-child(2), .tree:nth-child(3) {
    position: absolute;
    height: 90px; 
    width: 100%;
    bottom: 0;
    background: url(../../../assets/images/tree.svg) no-repeat;
}

.rock {
    margin-top: -17%;
    height: 2%; 
    width: 2%;
    bottom: -2px;
    border-radius: 20px;
    position: absolute;
    background: #ddd;
}

.truck, .wheels {
    transition: all ease;
    width: 85px;
    margin-right: -60px;
    bottom: 0px;
    left: 13%;
    position: absolute;
    background: #eee;
}

.truck {
    background: url(../../../assets/images/truck.svg) no-repeat;
    background-size: contain;
    height: 60px;
}

.truck:before {
    content: " ";
    position: absolute;
    width: 25px;
    box-shadow:
        -30px 28px 0 1.5px #fff,
        -35px 18px 0 1.5px #fff;
}

.wheels {
    background: url(../../../assets/images/wheels.svg) no-repeat;
    height: 15px;
    margin-bottom: 0;
}

.tree  { animation: tree 3s 0.000s linear infinite; }
.tree:nth-child(2)  { animation: tree2 2s 0.150s linear infinite; }
.tree:nth-child(3)  { animation: tree3 8s 0.050s linear infinite; }
.rock  { animation: rock 4s   -0.530s linear infinite; }
.truck  { animation: truck 4s   0.080s ease infinite; }
.wheels  { animation: truck 4s   0.001s ease infinite; }
.truck:before { animation: wind 1.5s   0.000s ease infinite; }


@keyframes tree {
    0%   { transform: translate(1350px); }
    50% {}
    100% { transform: translate(-50px); }
}

@keyframes tree2 {
    0%   { transform: translate(650px); }
    50% {}
    100% { transform: translate(-50px); }
}

@keyframes tree3 {
    0%   { transform: translate(2750px); }
    50% {}
    100% { transform: translate(-50px); }
}

@keyframes rock {
    0%   { right: -200px; }
    100% { right: 2000px; }
}

@keyframes truck {
    0%   { }
    6%   { transform: translateY(0px); }
    7%   { transform: translateY(-6px); }
    9%   { transform: translateY(0px); }
    10%   { transform: translateY(-1px); }
    11%   { transform: translateY(0px); }
    100%   { }
}

@keyframes wind {
    0%   {  }
    50%   { transform: translateY(3px) }
    100%   { }
}

@keyframes mtn {
    100% {
        transform: translateX(-2000px) rotate(130deg);
    }
}

@keyframes hill {
    100% {
        transform: translateX(-2000px);
    }
}

@keyframes waveAnimation {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.fas.fa-ship {
    font-size: 50px;
    color: #5a6268; /* Color del barco */
    animation: swingAnimation 2s ease-in-out infinite alternate;
}

@keyframes swingAnimation {
    0%, 100% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(5deg);
    }
}

/* AVION */

.sky {
    height: 100%;
    width: 100%;
    background-color: #fff; /* Color del cielo */
    position: relative;
    overflow: hidden;
}

.clouds{
        position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: 50px;
}

/*Time to finalise the cloud shape*/
.cloud {
    width: 200px; height: 60px;
    background: #e2dfdf;        
    border-radius: 200px;
    -moz-border-radius: 200px;
    -webkit-border-radius: 200px;
    position: relative; 
}

.cloud:before, .cloud:after {
    content: '';
    position: absolute; 
    background: #e2dfdf;
    width: 100px; height: 80px;
    position: absolute; top: -15px; left: 10px;    
    border-radius: 100px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;        
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -moz-transform: rotate(30deg);
}

.cloud:after {
    width: 120px; height: 120px;
    top: -55px; left: auto; right: 15px;
}

/*Time to animate*/
.x1 {
    animation: moveClouds 15s linear infinite;
    animation: moveClouds 15s linear infinite;
    animation: moveClouds 15s linear infinite;
}

/*variable speed, opacity, and position of clouds for realistic effect*/
.x2 {
    left: 200px;
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6; /*opacity proportional to the size*/
    /*Speed will also be proportional to the size and opacity*/
    /*More the speed. Less the time in 's' = seconds*/
    animation: moveClouds 25s linear infinite;
    animation: moveClouds 25s linear infinite;
    animation: moveClouds 25s linear infinite;
}

.x3 {
    left: -250px; top: -200px;    
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8; /*opacity proportional to the size*/
    animation: moveClouds 20s linear infinite;
    animation: moveClouds 20s linear infinite;
    animation: moveClouds 20s linear infinite;
}

.airplane {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 10px;
    left: 90px;
    display: flex;
    align-items: center;
}

.fas.fa-plane {
    font-size: 50px;
    color: #5a6268; /* Color del avión */
}

@keyframes moveClouds {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}

@keyframes flyAirplane {
    0% {
        left: -60px;
        transform: rotate(0deg);
    }
    100% {
        left: 100%;
        transform: rotate(0deg);
    }
}

@media (max-width: 576px) {
    .sky {
        height: 90px;
        width: 100%;
        background-color: #fff;
        /* Color del cielo */
        position: relative;
        overflow: hidden;
    }

    .road {
        height: 90px;
        width: 100%;
        background-color: #ffffff;
        /* Color de la carretera */
        position: relative;
        overflow: hidden;
    }

    .ocean {
        height: 90px;
        width: 100%;
        background-color: #ffffff;
        /* Color del mar */
        display: flex;
        align-items: center;
        justify-content: center;
        animation: waveAnimation 4s ease-in-out infinite alternate;
    }
}
body .primer-style {
    margin: 0 auto;
    width: 100%;
    /*max-width: 1180px;*/
    border-radius: 10px;
    /*background-color: #e9f0f7;*/
    background-color: #eeeff3;
    padding: 10px 20px 16px 20px;
    animation: _37voVng3nKHA4uc-Tzq1vG 0.2s ease;
    }

    @media only screen and (max-width: 991px) {
    body .primer-style {
        box-shadow: none;
        border-radius: 0;
    }
    }

    body .segundo-style {
    display: flex;
    align-items: flex-end;
    justify-content: center !important;
    }

    @media only screen and (max-width: 991px) {
    body .segundo-style {
        flex-wrap: wrap;
    }
    }

    body .tercer-style {
    flex-grow: 1;
    width: calc(50% - 10px);
    }

    @media only screen and (max-width: 991px) {
    body .tercer-style {
        width: 100%;
    }
    }

    body .tercer-label-style {
    display: flex;
    flex-direction: row;
    }

    body .tercer-label-style .tercer-label-style-label {
    flex: 1;
    }

    body .tercer-label-style-label {
    font-size: 10px;
    line-height: 14px;
    color: #9fb1c1;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0 0 6px 0;
    }

    @media only screen and (max-width: 991px) {
    body .tercer-label-style-label {
        display: block;
    }
    }

    body .primer-input-style {
    position: relative;
    height: auto;
    display: flex;
    flex-direction: row;
    }

    @media only screen and (max-width: 991px) {
    body .primer-input-style {
        flex-wrap: wrap;
    }
    }

    body .primer-input-style::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    border-radius: 10px;
    height: 80%;
    background-color: transparent;
    transform: translate(-50%, -50%);
    }

    @media only screen and (max-width: 991px) {
    body .primer-input-style::after {
        display: none;
    }
    }

    body .segundo-input-style {
    position: relative;
    width: 50%;
    height: 60px;
    background: #fff;
    padding: 4px 6px;
    border-radius: 0px;
    }

    @media only screen and (max-width: 991px) {
    body .segundo-input-style {
        width: 100%;
        border-radius: 5px;
        margin-bottom: 8px;
        padding: 4px;
    }
    }

    body .segundo-input-icon-style {
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

    .segundo-input-input-style {
    position: relative;
    }

    body .segundo-input-input-input-style {
    height: 100%;
    }

    body .segundo-input-istyle-input {
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

    body .segundo-input-istyle-input:focus {
    text-overflow: unset;
    padding-right: 0;
    box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
    transition: all 0.2s;
    z-index: 1;
    }

    body .segundo-input-istyle-input::-moz-placeholder {
    color: #a0b1be;
    letter-spacing: 0.02em;
    font-weight: 500;
    }

    body .segundo-input-istyle-input::placeholder {
    color: #a0b1be;
    letter-spacing: 0.02em;
    font-weight: 500;
    }

    #mapaRutas {
    height: 400px;
    width: 100%;
    border-radius: 20px;
    }

    #mapaRutasConfirma {
    height: 400px;
    width: 100%;
    border-radius: 20px;
    }

    #inicio-mercancias .modal-dialog.modal-xl {
        max-width: 95%;
    }

    #validaConfirmacionOD .modal-dialog.modal-xl {
        max-width: 75%;
    }

    /* LINE PROCESS */

    .cards {
        z-index: 0;
        background-color: #ffffff;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 10px;
    }

    .top {
        padding-top: 40px;
        padding-left: 13% !important;
        padding-right: 13% !important;
    }

    /*Icon progressbar*/
    #progressbar {
        margin-bottom: 30px;
        overflow: hidden;
        color: #455A64;
        padding-left: 0px;
        margin-top: 30px;
        width: 135%;
    } 

    #progressbar li {
        list-style-type: none;
        font-size: 13px;
        width: 25%;
        float: left;
        position: relative;
        font-weight: 400;
    }

    #progressbar .step0:before {
        font-family: FontAwesome;
        content: "\f10c";
        color: #fff;
    }

    #progressbar li:before {
        width: 40px;
        height: 40px;
        line-height: 45px;
        display: block;
        font-size: 20px;
        background: #6C757D;
        border-radius: 50%;
        margin: auto;
        padding: 0px;
    }

    /*ProgressBar connectors*/
    #progressbar li:after {
        content: '';
        width: 100%;
        height: 12px;
        background: #6C757D;
        position: absolute;
        left: 0;
        top: 16px;
        z-index: -1;
    }

    #progressbar li:last-child:after {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        position: absolute;
        left: -50%;
    }

    #progressbar li:nth-child(2):after, #progressbar li:nth-child(3):after {
        left: -50%;
    }

    #progressbar li:first-child:after {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        position: absolute;
        left: 50%;
    }

    #progressbar li:last-child:after {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    #progressbar li:first-child:after {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    /*Color number of the step and the connector before it*/
    #progressbar li.active:before, #progressbar li.active:after {
        background: #056736;
    }

    #progressbar li.active:before {
        font-family: FontAwesome;
        content: "\f00c";
    }

    .icon {
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }

    .icon-content { 
        padding-bottom: 20px;
    }

    @media screen and (max-width: 992px) {
        .icon-content {
            width: 50%;
        }
    }

    /* INICIO ESTILOS HEADER RESUMEN */

    body ._2ka8NZmhs89Mkk9ABZSXJM {
        margin: 0 auto;
        width: 100%;
        /*max-width: 1180px;*/
        border-radius: 10px;
        /*background-color: #e9f0f7;*/
        background-color: #eeeff3;
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
        justify-content: center !important;
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

        /* SEGUNDO */

        body ._12VTCAtCmgnF7JdGljsEapdo {
        position: relative;
        height: auto;
        display: flex;
        flex-direction: row;
        }

        @media only screen and (max-width: 991px) {
        body ._12VTCAtCmgnF7JdGljsEapdo {
            flex-wrap: wrap;
        }
        }

        body ._12VTCAtCmgnF7JdGljsEapdo::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        border-radius: 10px;
        height: 80%;
        background-color: #ffffff;
        transform: translate(-50%, -50%);
        }

        @media only screen and (max-width: 991px) {
        body ._12VTCAtCmgnF7JdGljsEapdo::after {
            display: none;
        }
        }

        body ._3vCdC7UlpoMI8zyS9070Tm {
        position: relative;
        width: 50%;
        height: 60px;
        background: #fff;
        padding: 4px 6px;
        border-radius: 0px;
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

        @media (hover: hover), all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
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

        @media (hover: hover), all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        body .XnAvZ8kiGXiCA_sHNJc-d:hover {
            transform: translate3d(-50%, -50%, 0) scale(1.1);
            transition: all 0.2s ease;
        }
        }

        @media only screen and (hover: hover) and (max-width: 991px), only screen and (-ms-high-contrast: none) and (max-width: 991px), only screen and (-ms-high-contrast: active) and (max-width: 991px) {
        body .XnAvZ8kiGXiCA_sHNJc-d:hover {
            transform: translate3d(0%, -60%, 0) scale(1.6);
        }
        }

        @media (hover: hover), all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
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

    /* FIN ESTILOS HEADER RESUMEN */

/* INICIO ESTILOS BARSTEPS */
.icon-container {
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Iconos personalizados solo para Origen y Destino */
.map-icon {
  font-size: 18px;
}

.origin-icon {
  color: #4caf50; /* Color del ícono de Origen */
}

.destination-icon {
  color: #ff5722; /* Color del ícono de Destino */
}

/* Etiquetas de paso */
.step-label {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}

/* Etiqueta de Ruta centrada sobre la barra de progreso */
.route-label {
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Personalización adicional mínima para mantener el diseño compacto */
.step-bar {
  height: 60px;
}
/* FIN ESTILOS BARSTEPS */

/* INICIO ESTILOS HEADER RESUMEN */

body ._2ka8NZmhs89Mkk9ABZSXJM {
        margin: 0 auto;
        width: 100%;
        /*max-width: 1180px;*/
        border-radius: 10px;
        /*background-color: #e9f0f7;*/
        background-color: #eeeff3;
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
        justify-content: center !important;
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

</style>