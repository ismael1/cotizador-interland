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
import $ from 'jquery';
import { BPopover } from "bootstrap-vue";
import Multiselect from "vue-multiselect";

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

            /* V Sesion */
            idU: 0,
            emailU: "",
            nombreU: "",
            username: "",
            tokenU: "",
            puestoU: "",
            admin: false,
            permisos: [],
            menuItems: [],

            /* V General */
            templateAddress: ItemTemplateAddres,
            dateNow: '',
            terfecha: '',
            listTipoZona: [],
            tercotizacion: 0,
            details: 0,
            avisos: [],
            fechaFormato: '',
            existeCotizacion: true,
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

            /*V ID Cotizacion */
            idConsecutivo: 0,
            numConsecutivo: 0,
            controlConse: "",
            fechaConsecutivo: "",
            fConse: "",
            idCotizacion: 0,
            estatusCotiza: 0,

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

            /* V Mapa Origen Destino */
            mostrarMapa: false,
            mostrarMapaConfirma: false,

            /* V Tipo Comercio */
            comercio: "",

            /* V Tipo Comercio Ubicacion */
            comercioUbicacion: "",

            /* V Unidades */
            units: [],
            unidadesSeleccion: [],
            options_unit: [],
            unidades_ftl: [],

            /* Variables LTL */
            tarifarios_ltl: [],
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

            /* Variables FTL */
            tarifarios_ftl: [],
            colspan:0,
            datosOrigenesFTLOcupar: [],
            datosDestinosFTLOcupar: [],
            datosUnidaddesFtlOcupar: [],
            listOD: [],
            listTipoZona: [],
            listPorcentajes: [],
            rangos: [],
            options_unit:[],
            colspan:0,

            adicionalesFTL:[],
            filasSeleccionadas:[],
            fields_table: [],
            items_table: [],
            select_cotizaciones:[],

            /* V Mercancias */
            embalajes: [],
            agregarMercancias: [],
            terembalaje: "",
            terDescEmbalaje: "",
            terestibable: "",
            tertipocarga: "",
            carga: "",
            idclasifica: 0,
            clasifica: "",
            clasificaText: "",
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

            /* V Total Mercancias */
            totalCantidad: 0,
            totalVolumen: 0,
            totalPesoReal: 0,
            totalPesoFaturado: 0,

            /* V Servicios */
            selectServices: [1],
            services: [],
            confirmarServices: [],
            serviciosResumen: [],
            confirmarServices2: [],
            
            /* V Embalaje */
            embalajeId: 0,
            embalajeNombre: "",
            embalajeAlto: 0.0,
            embalajeAncho: 0.0,
            embalajeLargo: 0.0,
            embalajeCapacidadMaxima: 0,

            /* V Progress Bar */
            progresbarRecoleccion: false,
            progresbarFlete: false,
            progresbarEntrega: false,
            progresbarIngreso: false,

            /* V Divisa */
            divisa: 2,
            valorDolar: 19.8532,

            /* V Totales */
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

            /* V Cotizacion */
            estadoCotiza: false,

            /* V Planes */
            pricingData: [],

            /* V Porcentajes de Descuento e Incremento */
            listPorcentajes: [],

            /* V Ajuste Venta */
            arrayResp: [],

            /* V Datos de Contacto */
            ladas: [],
            contacName: "",
            contacEmail: "",
            contacLada: 1,
            contacTelefono: "",
            contacProductName: "",
            contacDescription: "",
            rfcClienteInterland: '',

            /* Stops */
            stops: false,
            routes: [],
            valStops: 0,
            routes_resp: [],

            /* Variables Cards */
        }
    },
    created() {
        this.getFolioCon();
        this.dataSess();
        this.getUnidadBox("g");
        this.getEmbalaje();
        this.getServicios();
        this.obtenerPorcentajes();
        this.fechaHoy();
        this.getLada();

    },
    mounted() {
        this.inicio();
    },
    watch: {

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
                this.admin = data[i].admin;
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
        },

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

                var date = new Date(this.fechaConsecutivo);
                var date2 = moment(String(this.fechaConsecutivo)).format("YYYY/MM/DD");

                this.fechaConsecutivo = date.getUTCFullYear().toString().substr(-2);
                this.fConse = date2;
            }).catch((error) => {
                console.log(error);
            });
        },

        getServicios() {
            axios.get(`services/`).then((response) => {
                this.services = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

        inicio() {
            this.$bvModal.show("inicio-transporte");
        },

        async validaTransporte(val){
            await this.showOpcion(val);
            this.$bvModal.hide("inicio-transporte");
            this.$bvModal.show("inicio-tipo-envio");
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

        regresarTransporte(){
            this.$bvModal.hide("inicio-tipo-envio");
            this.$bvModal.show("inicio-transporte");
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

            //this.arrayDestino.push({ "name": geoDetallesPuertos.data.geocerca[0].nombre_corto, "idGeocerca": geoDetallesPuertos.data.geocerca[0].idGeocerca })
            //this.destinos_ltl.push({ "name": geoDetallesPuertos.data.geocerca[0].nombre_corto, "idGeocerca": geoDetallesPuertos.data.geocerca[0].idGeocerca })

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

        selectModalidad(option) {
      
            this.selected = option;
            
            let index_modalidad = this.optionsItemModalidad.findIndex(
                (x) => x.value === option
            );
            this.termodalidad = this.optionsItemModalidad[index_modalidad].value;
            this.termodalidadText = this.optionsItemModalidad[index_modalidad].text;
            this.termodalidadImg = this.optionsItemModalidad[index_modalidad].src;
            
        },

        async validaModalidad(mod){
            await this.selectModalidad(mod)

            if(this.termodalidad == 'LTL'){
                this.$bvModal.hide("inicio-modalidad");
                this.$bvModal.show("inicio-origen-destino");
            }else{
                this.$bvModal.hide("inicio-modalidad");
                this.$bvModal.show("inicio-unidades");
            }
            
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
                this.$bvModal.hide("inicio-origen-destino");
                this.$bvModal.show("inicio-unidades");
            }
        },

        async getLabelAddressO(item) {
            if (item != null && item != "") {

                let ciudad = item.ciudad
                let cp = item.codigoPostal
                let colonia = item.colonia
                let direccion = item.direccion
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
                                pais: pais,
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
                                //idpais: idpais,
                                pais: pais,
                                //idestado: idestado,
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
                        
                        this.origen = ""
                    }

                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas(1);
                    }
                }
            }
        },

        async getLabelAddressOFTL(item) {
            if (item != null && item != "") {
                let idpais = parseInt(item.pais_id);
                let pais = item.pais_name;
                let idestado = parseInt(item.estado_id);
                let estado = item.estado_name;
                let ciudad = item.municipio;
                let colonia = item.asentamiento;
                let cp = item.codigo_postal;
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
                        const auth = { username: "admin", password: "123", }
                        let params = {}
                        if(estado.toUpperCase() == ciudad.toUpperCase()){
                            params = {pais: pais, estado: estado, ciudad: colonia,}
                        }else{
                            params = {pais: pais, estado: estado, ciudad: ciudad,}
                        }
                        

                        const geoDetalles = await axios.get("/api/v1/geocerca-detalles/", {
                            params,
                            auth
                        });

                        if(geoDetalles.data.geocerca.length > 0){
                            
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
                                lat: geoDetalles.data.geocerca[0].lat,
                                lng: geoDetalles.data.geocerca[0].lng,
                                lat_centro: geoDetalles.data.geocerca[0].lat_centro,
                                lng_centro: geoDetalles.data.geocerca[0].lng_centro,
                                idGeocerca: geoDetalles.data.geocerca[0].idGeocerca,
                                nombre_corto: geoDetalles.data.geocerca[0].nombre_corto,
                                kilometros_redonda: geoDetalles.data.geocerca[0].kilometros_redonda,
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

                        if(this.termodalidad == 'FTL'){
                            this.arrayOrigen.push(ori);
                            this.arrayOrigenR.push(ori)
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');
                        }
                        
                        this.origen = ""
                    }
                }
            }
        },

        async getLabelAddressOCon(item) {
            if (item != null && item != "") {
                let idpais = parseInt(item.pais_id);
                let pais = item.pais_name;
                let idestado = parseInt(item.estado_id);
                let estado = item.estado_name;
                let ciudad = item.municipio;
                let colonia = item.asentamiento;
                let cp = item.codigo_postal;
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
                        const auth = { username: "admin", password: "123", }
                        let params = {}
                        if(estado.toUpperCase() == ciudad.toUpperCase()){
                            params = {pais: pais, estado: estado, ciudad: colonia,}
                        }else{
                            params = {pais: pais, estado: estado, ciudad: ciudad,}
                        }

                        const geoDetalles = await axios.get("/api/v1/geocerca-detalles/", {
                            params,
                            auth
                        });

                        if(geoDetalles.data.geocerca.length > 0){
                            
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
                                lat: geoDetalles.data.geocerca[0].lat,
                                lng: geoDetalles.data.geocerca[0].lng,
                                lat_centro: geoDetalles.data.geocerca[0].lat_centro,
                                lng_centro: geoDetalles.data.geocerca[0].lng_centro,
                                idGeocerca: geoDetalles.data.geocerca[0].idGeocerca,
                                nombre_corto: geoDetalles.data.geocerca[0].nombre_corto,
                                kilometros_redonda: geoDetalles.data.geocerca[0].kilometros_redonda,
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
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');
                        }else if(this.termodalidad == 'LTL' && this.arrayOrigen.length > 0){
                            await this.notificaciones('info', 'No se puede agregar mas de un origen en modalidad LTL');
                        }

                        if(this.termodalidad == 'FTL'){
                            this.arrayOrigen.push(ori);
                            await this.notificaciones('success', 'El Origen se agregó correctamente.');
                        }
                        
                        this.origen = ""
                    }

                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas(2);
                    }
                }
            }

            if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                this.tarifarios_ftl = []
                await this.validaO(2);
            }
        },

        async getLabelAddressD(item) {
            if (item != null && item != "") {
                let ciudad = item.ciudad
                let cp = item.codigoPostal
                let colonia = item.colonia
                let direccion = item.direccion
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
                let poligono = item.poligono
                let porcentaje_incremento = item.porcentaje_incremento
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
                                pais: pais,
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
                                pais: pais,
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

                        if(this.termodalidad == 'LTL' && this.arrayDestino.length == 0){
                            this.arrayDestino.push(des);
                            this.arrayDestinoR.push(des);
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }else if(this.termodalidad == 'LTL' && this.arrayDestino.length > 0){
                            await this.notificaciones('info', 'Solo de puede agregar un destino en modalidad LTL');
                        }

                        if(this.termodalidad == 'FTL'){
                            this.arrayDestino.push(des);
                            this.arrayDestinoR.push(des)
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }
                        
                        this.destino = ''

                    }
                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas(1);
                    }
                }
            }
        },

        async getLabelAddressDFTL(item) {
            if (item != null && item != "") {
                let idpais = parseInt(item.pais_id);
                let pais = item.pais_name;
                let idestado = parseInt(item.estado_id);
                let estado = item.estado_name;
                let ciudad = item.municipio;
                let colonia = item.asentamiento;
                let cp = item.codigo_postal;
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

                        const auth = { username: "admin", password: "123", }
                        let params = {}
                        if(estado.toUpperCase() == ciudad.toUpperCase()){
                            params = {pais: pais, estado: estado, ciudad: colonia,}
                        }else{
                            params = {pais: pais, estado: estado, ciudad: ciudad,}
                        }

                        const geoDetalles = await axios.get("/api/v1/geocerca-detalles/", {
                            params,
                            auth
                        });

                        if(geoDetalles.data.geocerca.length > 0){
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
                                lat: geoDetalles.data.geocerca[0].lat,
                                lng: geoDetalles.data.geocerca[0].lng,
                                lat_centro: geoDetalles.data.geocerca[0].lat_centro,
                                lng_centro: geoDetalles.data.geocerca[0].lng_centro,
                                idGeocerca: geoDetalles.data.geocerca[0].idGeocerca,
                                nombre_corto: geoDetalles.data.geocerca[0].nombre_corto,
                                kilometros_redonda: geoDetalles.data.geocerca[0].kilometros_redonda,
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

                        if(this.termodalidad == 'LTL' && this.arrayDestino.length == 0){
                            this.arrayDestino.push(des);
                            this.arrayDestinoR.push(des);
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }else if(this.termodalidad == 'LTL' && this.arrayDestino.length > 0){
                            await this.notificaciones('info', 'Solo de puede agregar un destino en modalidad LTL');
                        }

                        if(this.termodalidad == 'FTL'){
                            this.arrayDestino.push(des);
                            this.arrayDestinoR.push(des)
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }
                        
                        this.destino = ''

                    }
                }
            }
        },

        async getLabelAddressDCon(item) {
            if (item != null && item != "") {
                let idpais = parseInt(item.pais_id);
                let pais = item.pais_name;
                let idestado = parseInt(item.estado_id);
                let estado = item.estado_name;
                let ciudad = item.municipio;
                let colonia = item.asentamiento;
                let cp = item.codigo_postal;
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

                        const auth = { username: "admin", password: "123", }
                        let params = {}
                        if(estado.toUpperCase() == ciudad.toUpperCase()){
                            params = {pais: pais, estado: estado, ciudad: colonia,}
                        }else{
                            params = {pais: pais, estado: estado, ciudad: ciudad,}
                        }

                        const geoDetalles = await axios.get("/api/v1/geocerca-detalles/", {
                            params,
                            auth
                        });

                        if(geoDetalles.data.geocerca.length > 0){
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
                                lat: geoDetalles.data.geocerca[0].lat,
                                lng: geoDetalles.data.geocerca[0].lng,
                                lat_centro: geoDetalles.data.geocerca[0].lat_centro,
                                lng_centro: geoDetalles.data.geocerca[0].lng_centro,
                                idGeocerca: geoDetalles.data.geocerca[0].idGeocerca,
                                nombre_corto: geoDetalles.data.geocerca[0].nombre_corto,
                                kilometros_redonda: geoDetalles.data.geocerca[0].kilometros_redonda,
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
                    
                        if(this.termodalidad == 'LTL' && this.arrayDestino.length == 0){
                            this.arrayDestino.push(des);
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }else if(this.termodalidad == 'LTL' && this.arrayDestino.length > 0){
                            await this.notificaciones('info', 'Solo de puede agregar un destino en modalidad LTL');
                        }

                        if(this.termodalidad == 'FTL'){
                            this.arrayDestino.push(des);
                            await this.notificaciones('success', 'El Destino se agregó correctamente.');
                        }
                        
                        this.destino = ''

                    }
                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas(1);
                    }
                }
            }

            if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                this.tarifarios_ftl = []
                await this.validaO(2);
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

        muestraMapaRutas(val){
            let lat_c = 0
            let lng_c = 0
            this.mostrarMapa = false
            this.mostrarMapaConfirma = false
            this.routes = []
            var map
            
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

            for (let or = 0; or < this.arrayOrigen.length; or++) {
                for (let de = 0; de < this.arrayDestino.length; de++) {
                    let ruta = {
                        origin:{
                            lat:parseFloat(this.arrayOrigen[or].lat),
                            lng: parseFloat(this.arrayOrigen[or].lng)
                        },
                        destination: {
                            lat:parseFloat(this.arrayDestino[de].lat), 
                            lng: parseFloat(this.arrayDestino[de].lng)
                        }, 
                        ciudad_o: this.arrayOrigen[or].ciudad,
                        colonia_o: this.arrayOrigen[or].colonia,
                        cp_o: this.arrayOrigen[or].cp,
                        estado_o: this.arrayOrigen[or].estado,
                        estatus_quitar_o: this.arrayOrigen[or].estatus_quitar,
                        idGeocerca_o: this.arrayOrigen[or].idGeocerca,
                        idOrigen_o: this.arrayOrigen[or].idOrigen,
                        idestado_o: this.arrayOrigen[or].idestado,
                        idpais_o: this.arrayOrigen[or].idpais,
                        kilometros_redonda_o: this.arrayOrigen[or].kilometros_redonda,
                        nombre_corto_o: this.arrayOrigen[or].nombre_corto,
                        pais_o: this.arrayOrigen[or].pais,
                        text_largo_o: this.arrayOrigen[or].text_largo,
                        id_ruta:this.routes.length+1,
                        ver:0,
                        ciudad_d: this.arrayDestino[de].ciudad,
                        colonia_d: this.arrayDestino[de].colonia,
                        cp_d: this.arrayDestino[de].cp,
                        estado_d: this.arrayDestino[de].estado,
                        estatus_quitar_d: this.arrayDestino[de].estatus_quitar,
                        idGeocerca_d: this.arrayDestino[de].idGeocerca,
                        idOrigen_d: this.arrayDestino[de].idOrigen,
                        idestado_d: this.arrayDestino[de].idestado,
                        idpais_d: this.arrayDestino[de].idpais,
                        kilometros_redonda_d: this.arrayDestino[de].kilometros_redonda,
                        nombre_corto_d: this.arrayDestino[de].nombre_corto,
                        pais_d: this.arrayDestino[de].pais,
                        text_largo_d: this.arrayDestino[de].text_largo,
                    }
                    this.routes.push(ruta)
                }
            }
            
            if(this.stops){
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
                var routes_resp = []
                let data = {}
                for (let s = 0; s < this.routes.length; s++) {
                    if(routes_resp.length == 0){
                        routes_resp.push(this.routes[s])
                        destino_anterior = this.routes[s].destination
                        ciudad_o = this.routes[s].ciudad_d
                        colonia_o = this.routes[s].colonia_d
                        cp_o = this.routes[s].cp_d
                        estado_o = this.routes[s].estado_d
                        estatus_quitar_o = this.routes[s].estatus_quitar_d
                        idGeocerca_o = this.routes[s].idGeocerca_d
                        idOrigen_o = this.routes[s].idOrigen_d
                        idestado_o = this.routes[s].idestado_d
                        idpais_o = this.routes[s].idpais_d
                        kilometros_redonda_o = this.routes[s].kilometros_redonda_d
                        nombre_corto_o = this.routes[s].nombre_corto_d
                        pais_o = this.routes[s].pais_d
                        text_largo_o = this.routes[s].text_largo_d
                    }else{
                        data = this.routes[s]
                        data = {
                            origin:{
                                lat:destino_anterior.lat,
                                lng:destino_anterior.lng
                            },
                            destination:{
                                lat: data.destination.lat,
                                lng:data.destination.lng
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
                            ciudad_d: data.ciudad_d,
                            colonia_d: data.colonia_d,
                            cp_d: data.cp_d,
                            estado_d: data.estado_d,
                            estatus_quitar_d: data.estatus_quitar_d,
                            idGeocerca_d: data.idGeocerca_d,
                            idOrigen_d: data.idOrigen_d,
                            idestado_d: data.idestado_d,
                            idpais_d: data.idpais_d,
                            kilometros_redonda_d: data.kilometros_redonda_d,
                            nombre_corto_d:data.nombre_corto_d,
                            pais_d: data.pais_d,
                            text_largo_d: data.text_largo_d,
                            id_ruta: routes_resp.length+1,
                            ver:0
                        }

                        routes_resp.push(data)
                        destino_anterior = data.destination
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
            this.tarifarios_ltl = []

            if(this.arrayOrigen.length == 0){
                this.notificaciones('error','Debes ingresar al menos un Origen, verifícalo por favor.');
                return false;
            }

            if(this.arrayDestino.length == 0){
                this.notificaciones('error','Debes ingresar al menos un Destino, verifícalo por favor.');
                return false;
            }

            

            if(this.stops){
                //console.log(this.routes)
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

                await axios({
                    method: "post",
                    url: "/api/v1/getTarifario/",
                    data: {
                        pais_origen: this.routes[0].pais_o,
                        estado_origen: this.routes[0].estado_o,
                        ciudad_origen: this.routes[0].ciudad_o,
                        pais_destino: this.routes[this.routes.length - 1].pais_d,
                        estado_destino: this.routes[this.routes.length - 1].estado_d,
                        ciudad_destino: this.routes[this.routes.length - 1].ciudad_d,
                        modalidad: this.termodalidad,
                    },
                }).then((response) => {
                    datosTarifa = response.data;

                    let listOD = []

                    let dato = {"pais_o":this.routes[0].pais_o,"estado_o":this.routes[0].estado_o,"ciudad_o":this.routes[0].ciudad_o, "colonia_o": this.routes[0].colonia_o, "cp_o":this.routes[0].cp_o, "pais_d":this.routes[this.routes.length - 1].pais_d,"estado_d":this.routes[this.routes.length - 1].estado_d,"ciudad_d":this.routes[this.routes.length - 1].ciudad_d, "colonia_d": this.routes[this.routes.length - 1].colonia_d, "cp_d":this.routes[this.routes.length - 1].cp_d}
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
                            idTarifa: this.tarifarios_ltl.length + 1,
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
                            identificador: this.routes[0].ciudad_o+'-'+this.routes[this.routes.length - 1].ciudad_d,
                            tipo_zona: response.data[0].tipoZona,
                            km: parseFloat(response.data[0].km),
                        };
                                
                        this.tarifarios_ltl.push(tarif)

                    }).catch((error) => {
                        console.log(error);
                    });

                }).catch((error) => {
                    console.log(error);
                });


                console.log(this.tarifarios_ltl)
            }else{
                for (let to = 0; to < this.arrayOrigen.length; to++) {
                    for (let td = 0; td < this.arrayDestino.length; td++) {

                        await axios({
                            method: "post",
                            url: "/api/v1/getTarifario/",
                            data: {
                                pais_origen: this.arrayOrigen[to].pais,
                                estado_origen: this.arrayOrigen[to].estado,
                                ciudad_origen: this.arrayOrigen[to].ciudad,
                                pais_destino: this.arrayDestino[td].pais,
                                estado_destino: this.arrayDestino[td].estado,
                                ciudad_destino: this.arrayDestino[td].ciudad,
                                modalidad: this.termodalidad,
                            },
                        }).then((response) => {
                            datosTarifa = response.data;
                            let listOD = []

                            let dato = {"pais_o":this.arrayOrigen[to].pais,"estado_o":this.arrayOrigen[to].estado,"ciudad_o":this.arrayOrigen[to].ciudad, "colonia_o": this.arrayOrigen[to].colonia, "cp_o":this.arrayOrigen[to].cp, "pais_d":this.arrayDestino[td].pais,"estado_d":this.arrayDestino[td].estado,"ciudad_d":this.arrayDestino[td].ciudad, "colonia_d": this.arrayDestino[td].colonia, "cp_d":this.arrayDestino[td].cp}
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
                                    idTarifa: this.tarifarios_ltl.length + 1,
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
                                    identificador: this.arrayOrigen[to].ciudad+'-'+this.arrayDestino[td].ciudad,
                                    tipo_zona: response.data[0].tipoZona,
                                    km: parseFloat(response.data[0].km),
                                };
                                
                                this.tarifarios_ltl.push(tarif)

                            }).catch((error) => {
                                console.log(error);
                            });

                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            }

            if(this.stops){
                for (let r = 0; r < this.routes.length; r++) {
                    if(this.routes[r].km > 150 && r > 1){
                        Swal.fire({
                            title: "La ruta "+this.routes[r].estado_o+" - "+this.routes[r].estado_d+ " tiene mas de 150 km, no podemos procesar tu solicitud",
                            text: "",
                            icon: "error",
                            confirmButtonText: "Cerrar",
                        });
                        return false;
                        exit;
                    }
                    
                }
            }

            if(val == 1){
                this.$bvModal.hide("inicio-origen-destino");
                this.$bvModal.show("inicio-mercancias");
            }
        },

        getUnidadBox(tipo) {
            this.units = [];
            this.options_unit = [];
            axios({
                method: "post",
                url: "/api/v1/list-box/",
                data: {
                data: tipo,
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

        async validaU(){
            if(this.unidades_ftl.length == 0){
                Swal.fire({
                    title: "Selecciona una o mas unidades",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            this.$bvModal.hide("inicio-unidades");
            this.$bvModal.show("inicio-origen-destino");
            //this.$bvModal.show("inicio-origen-destino");
        },

        regresarUnidades(){
            this.$bvModal.hide("inicio-unidades");
            this.$bvModal.show("inicio-modalidad");
        },

        async validaUnidades(id, nombre){

            this.nombreTipoUnidad = nombre;
            this.tipoUnidad = id;
            let data = {idUnidad: id, nombreUnidad: nombre}
            let cadena = 'select_card_view_'+id

            if(this.unidades_ftl.length > 0){
                for (let u = 0; u < this.unidades_ftl.length; u++) {
                    const index = this.unidades_ftl.findIndex(objeto => objeto.idUnidad === data.idUnidad && objeto.nombreUnidad === data.nombreUnidad);
                    if (index !== -1) {
                        this.unidades_ftl.splice(index, 1);
                        $("#"+cadena).css({'display':'none'});
                        break;
                    }else{
                        this.unidades_ftl.push(data);
                        $("#"+cadena).css({'display':'block'});
                        break;
                    }
                }
            }else{
                data = {idUnidad: id, nombreUnidad: nombre}
                this.unidades_ftl.push(data);
                $("#"+cadena).css({'display':'block'}); 
            }

        },

        recargaUnidadesSeleccionadas(){
            for (let uni = 0; uni < this.unidades_ftl.length; uni++) {
                let cadena = 'select_card_view_'+this.unidades_ftl[uni].idUnidad
                cadena = cadena.toString();
                console.log(cadena)
                $("#"+cadena).css({'display':'none'});
                $("#"+cadena).css({'display':'block'});
            }
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
                let tertipocarga = item.tipoMercancia

                if (id != undefined && id != null && id != "") {
                    this.clasifica = descripcion;
                    this.idclasifica = clave_prodserv;
                    this.isSusceptibleRobo = susceptibleRobo;
                    this.porcentajeRobo = parseFloat(porcentajeRobo);
                    //this.clasificaText = "[" + item.clave_prodserv + "] - " + item.descripcion;
                    this.clasificaText = descripcion;
                    this.tertipocarga = tertipocarga

                    if(this.tertipocarga === 'Mercancía General'){
                        this.tertipocarga = 'g'
                    }

                    if(this.tertipocarga === 'HAZMAT'){
                        this.tertipocarga = 'h'
                    }

                    if(this.tertipocarga === 'REFRIGERADA'){
                        this.tertipocarga = 'r'
                    }
                }
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
            }).then((response) => {
                this.dates_search_proser = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

        selectUniMedMerc() {
            let unidadMedida = this.unidaMedidaMerc;
        },

        selectEstibable() {
            if (this.terestibable == "no") {
                this.altoMerc = parseFloat(this.embalajeAlto);
            }

            if (this.terestibable == "si") {
                this.altoMerc = 0;
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

        validaCantidad() {
            let cant = parseInt(this.cantMerc);

            if (cant < 0 ) {
                this.cantMerc = 0;
            }

            if(this.termodalidad == 'LTL'){
                if (cant > 8 ) {
                this.cantMerc = 8;
                }
            }
            
            if(this.termodalidad == 'FTL'){
                if (cant > 12 ) {
                this.cantMerc = 12;
                }
            }

            if(this.termodalidad == 'FCL'){
                if (cant > 24 ) {
                this.cantMerc = 24;
                }
            }
            
            this.getPesoVolumetrico();
        },

        validaAlto() {
            this.altoMerc = parseFloat(this.altoMerc)
            if(this.altoMerc > 1.48){
                this.altoMerc = this.altoMerc
                Swal.fire({
                    title: "Aviso",
                    text: "La medida ingresada en la altura sobrepasa el limite para considerarse Estibable.",
                    icon: "info",
                    confirmButtonText: "Cerrar",
                });

                this.aplicaAumento = false;
                this.terestibable = "no"
                this.selectEstibable();
            }

            if(this.altoMerc < 0) {
                this.altoMerc = 0;
            } else {
                this.calculaVolumen();

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
            
            this.getPesoVolumetrico();
        },

        validaAncho() {

            this.anchoMerc = parseFloat(this.anchoMerc)

            if(this.anchoMerc > 2.48){
                Swal.fire({
                title: "El ancho ingresado supera el limite de la unidad, verifícalo",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
                });
                this.anchoMerc = 0
            }else{
                this.calculaVolumen();
            }

            if (this.anchoMerc < 0) {
                this.anchoMerc = 0;
            } else {
                this.calculaVolumen();
                
                if(this.anchoMerc >= 1.21 && this.anchoMerc < 1.28){
                    this.aplicaAumentoAncho = true;
                }else if(this.anchoMerc > 1.28 && this.anchoMerc < 1.48){
                this.anchoMerc = 2.4
                }else if(this.anchoMerc > 1.48 && this.anchoMerc <= 2.48){
                /* 1 posicion  */
                //this.anchoMerc = 2
                this.aplicaAumentoAncho = false;
                this.aplicaPosicionAncho = true;
                }
            } /* PREGUNTAR  */

            this.getPesoVolumetrico();
        },

        validaLargo() {

            this.largoMerc = parseFloat(this.largoMerc)
            if(this.largoMerc > 13){
                Swal.fire({
                title: "El largo ingresado supera el limite de la unidad, verifícalo",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
                });
                this.largoMerc = 0
            }else{
                this.calculaVolumen();
            }

            if (this.largoMerc < 0) {
                this.largoMerc = 0;
            } else {
                this.calculaVolumen();
            }

            if(this.largoMerc >= 1.21 && this.largoMerc < 1.48){
                this.aplicaAumentoLargo = true;
            }else if(this.largoMerc > 1.48 && this.largoMerc <= 2.4){
                this.largoMerc = 2.4
            }else if(this.largoMerc > 2.4 && this.largoMerc <= 2.68){
                this.aplicaAumentoLargo = true;
            }else if(this.largoMerc > 2.68 && this.largoMerc <= 3.6){ /* */
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
        },

        getPesoVolumetrico(){

            let factor = 0

            for (let ta = 0; ta < this.tarifarios_ltl.length; ta++) {
                factor = this.tarifarios_ltl[ta].factorConversion   
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

        regresarMercancias(){

            if(this.tipoEnvioDetalleSi){
            this.$bvModal.hide("inicio-mercancias");
            this.$bvModal.show("inicio-origen-destino");

            }else{
            if(this.termodalidad == 'LTL'){
                this.$bvModal.hide("inicio-mercancias");
                this.$bvModal.show("inicio-origen-destino");
            }else{
                this.$bvModal.hide("inicio-mercancias");
                this.$bvModal.show("inicio-origen-destino-ltl");
            }
            }

            /*this.$bvModal.hide("inicio-mercancias");
            this.$bvModal.show("inicio-origen-destino");*/
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

            this.getPesoVolumetrico();
        },

        async agregaPaquetes(){
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


        },

        async agregaPaquetesLTL() {
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
            let ruta = '';

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

            if(this.stops){
                if (id_ruta == "" || id_ruta == 0) {
                    Swal.fire({
                        title: "Selecciona una ruta",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false;
                }
            }
            

            let idPaq = this.agregarMercancias.length + 1;
            let precioTotal = 0
            let factor = 0
            let fleteNacional = 0

            for (let ta = 0; ta < this.tarifarios_ltl.length; ta++) {
                factor = this.tarifarios_ltl[ta].factorConversion
                fleteNacional = this.tarifarios_ltl[ta].flete_nacional   
            }

            if(estibable == 'si'){

                if(pesoVolTot > pesoT){
                    precioTotal =  ((fleteNacional / factor) * pesoVolTot )
                    
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
                
            }else if(estibable == 'no'){
                
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
            }

            if(this.stops){
                let index_service = this.routes.findIndex((x) => x.id_ruta === id_ruta);
                this.routes_resp.push(this.routes[index_service])
                this.routes[index_service].ver = 1;
                ruta = this.routes[index_service].estado_o + ' - ' + this.routes[index_service].estado_d
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
                id_ruta: id_ruta,
                ruta: ruta,
            };

            this.agregarMercancias.push(agrega);
            this.buscaUnidadLTL();

            this.cantMerc = 0;
            this.pesTMerc = 0;
            this.pesoTotal = 0;
            this.altoMerc = 0;
            this.anchoMerc = 0;
            this.largoMerc = 0;
            this.volMerc = 0;
            this.volMercTot = 0;
            this.pesoVol = 0;
            this.pesoVolTot = 0;
            this.unidaPesoMerc = "kg";
            this.terestibable = "";
            this.valStops = '';

            let totalPrecioVolumen = 0;
            for (let i = 0; i < this.agregarMercancias.length; i++) {
                totalPrecioVolumen = totalPrecioVolumen + parseFloat(this.agregarMercancias[i].precioVolumen);
            }

            this.totalPrecioVolumen = totalPrecioVolumen;
            //this.totalKilo = totalKilos;
            this.definePesoXVol = true;
            this.detallesMercancias();
            
        },

        formatMoney(value) {
            let val = (value / 1).toFixed(2).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

                        //if(canTotMerc <= canTotUnit && canTotMercTot <= canTotUnit){
                        if(volTotMerc <= volTotUnit && volTotMercTot <= volTotUnit){
                            if(pesTotMerc <= pesTotUnit && pesTotMercTot <= pesTotUnit){
                                if(lonTotMerc <= lonTotUnit && lonTotMercTot <= lonTotUnit){
                                    if(widTotMerc <= widTotUnit && widTotMercTot <= widTotUnit){
                                        if(higTotMerc <= higTotUnit && higTotMercTot <= higTotUnit){
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
                    
                    }
                }else{
                    break;
                }
            }

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

        async validaMercancias(){

            if (this.clasificaText == '' ) {
                Swal.fire({
                    title: "Ingresa una Clasificación",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if (this.unidaMedidaMerc == '' ) {
                Swal.fire({
                    title: "Selecciona una unidad de medida",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if (this.descripMerc == '' ) {
                Swal.fire({
                    title: "Ingresa la descripción de la mercancia",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if (this.agregarMercancias.length == 0 ) {
                Swal.fire({
                    title: "Debe de haber al menos 1 mercancía ingresada para poder realizar la cotización.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if(this.tertipocarga == 'h' && this.unMerc == ''){
                Swal.fire({
                    title: "Para cotizar, debes ingresar la clave UN.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if(this.tertipocarga == 'h' && this.classMerc == ''){
                Swal.fire({
                    title: "Para cotizar, debes ingresar la clave CLASS.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if(this.tertipocarga == 'r' && this.gradosMerc == ''){
                Swal.fire({
                    title: "Para cotizar, debes ingresar los grados de refrigeración.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if(this.tertipocarga == 'r' && this.tUnidadMerc == ''){
                Swal.fire({
                    title: "Para cotizar, debes especificaciones de refrigeración.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false
            }

            if(this.stops){
                if(this.routes_resp.length < this.routes.length){
                    Swal.fire({
                        title: "Antes de cotizar, asegurate de haber asignado una ruta a tus mercancias.",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false
                }
            }

            if(this.termodalidad == 'LTL'){
                await this.generateCotizacion(1);
            }else{
                await this.generateCotizacionFTL(1);
            }

            this.$bvModal.hide("inicio-mercancias");
        },

        eliminaPaquete(idPaq) {

            let indice = this.agregarMercancias.map((busqueda) => busqueda.idPaq).indexOf(idPaq);

            if(this.stops){
                let id_ruta = this.agregarMercancias[indice].id_ruta

                let index_route = this.routes.findIndex((x) => x.id_ruta === id_ruta);
                this.routes[index_route].ver = 0;
                
                let index_route_resp = this.routes_resp.findIndex((x) => x.id_ruta === id_ruta);
                this.routes_resp.splice(index_route_resp, 1)
            }


            this.agregarMercancias.splice(indice, 1);
        },

        regresarMercancias(){

            this.$bvModal.hide("inicio-mercancias");
            this.$bvModal.show("inicio-origen-destino");
        },

        async generateCotizacion(val) {

            let modalidad = this.termodalidad;
            let tipocarga = this.tertipocarga;
            let clasifica = this.clasifica;
            let descripMerc = this.descripMerc;
            let unidaMedidaMerc = this.unidaMedidaMerc;
            let unMerc = this.unMerc;
            let classMerc = this.classMerc;
            let gradosMerc = this.gradosMerc;
            let tUnidadMerc = this.tUnidadMerc;
            let idServicio = 0
            let nombreServicio = ''

            console.log(this.arrayOrigen,'Origen')
            console.log(this.arrayDestino,'Destino')
            console.log(this.tarifarios_ltl, 'Tarifario')
            console.log(this.agregarMercancias, 'Mercancias')
            console.log(this.confirmarServices, 'Servicios')
            
            if (clasifica == "" || clasifica == null) {
                    Swal.fire({
                    title: "Ingresa una clasificación",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                    });
                    return false;
            }

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
                
            this.tercotizacion = val;
            await this.addServicios(1,'FLETE NACIONAL');

            if(this.tipoEnvioDetalleSi){
                document.getElementById("9cheServicios").checked = true;
                idServicio = 9
                nombreServicio = "INGRESO ADUANAL"
                await this.addServicios(idServicio, nombreServicio);
            }else{
                document.getElementById("11cheServicios").checked = true;
                idServicio = 11
                nombreServicio = "ENTREGA"
                await this.addServicios(idServicio, nombreServicio);
            }

            document.getElementById("10cheServicios").checked = true;
            idServicio = 10
            nombreServicio = "RECOLECCION"
            await this.addServicios(idServicio, nombreServicio);
                
        },

        async addServicios(idServicio, nombreServicio) {
      
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
            let valorMerc = 0
            this.getServicioExiste = [];

            let descuento = 0;
            let extraeDescuento = 0;

            let porcAdicional = 0;

            if (nombreServicio == "SEGURO") {
                comprobar = document.getElementById(idServicio + "cheServicios").checked;
                if (comprobar) {

                    if(this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio) > 0){
                        let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                        this.confirmarServices.splice(indice, 1);

                        let indice1 = this.selectServices.indexOf(idServicio);
                        if (indice1 !== -1) {
                            this.selectServices.splice(indice1, 1);
                        }
                    }
                

                    if (parseFloat(this.valorMercancia) == 0) {
                        this.$bvModal.show("valorDeclaradoMercancia");
                        this.$bvModal.show("valorDeclaradoMercanciaInfo");
                    }else{
                        this.$bvModal.show("valorDeclaradoMercancia");
                    } 

                    this.valorMercancia = parseFloat(this.valorMercancia)

                    subtotal = this.valorMercancia * 0.085 //(85 / 100);
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

                    this.selectServices.push(idServicio)
                } else {
                    let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                    this.confirmarServices.splice(indice, 1);

                    let indice1 = this.selectServices.indexOf(idServicio);
                    if (indice1 !== -1) {
                        this.selectServices.splice(indice1, 1);
                    }
                }
            }else if (nombreServicio == "INGRESO ADUANAL") {

                let precioIngreso = 0

                comprobar = document.getElementById(idServicio + "cheServicios").checked;
                if (comprobar) {

                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                        if(this.nomUnidadModalidad == 'Nissan'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_nissan)
                            break;
                        }else if(this.nomUnidadModalidad == 'Camioneta 3.5'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_tres_y_media)
                            break;
                        }else if(this.nomUnidadModalidad == 'Rabon'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_rabon)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 48'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 53'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Torton'){
                            precioIngreso = parseFloat(this.tarifarios_ltl[tar].entrega_torton)
                            break;
                        }
                    }

                    subtotal = precioIngreso
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
                    
                    this.progresbarIngreso = true
                
                } else {
                    let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                    this.confirmarServices.splice(indice, 1);

                    let indice1 = this.selectServices.indexOf(idServicio);
                    if (indice1 !== -1) {
                        this.selectServices.splice(indice1, 1);
                    }
                    this.progresbarIngreso = false
                }
                
                
            }else if (nombreServicio == "RECOLECCION") {
                let precioRecoleccion = 0

                comprobar = document.getElementById(idServicio + "cheServicios").checked;
                if (comprobar) {

                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                        if(this.nomUnidadModalidad == 'Nissan'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_nissan)
                            break;
                        }else if(this.nomUnidadModalidad == 'Camioneta 3.5'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_tres_y_media)
                            break;
                        }else if(this.nomUnidadModalidad == 'Rabon'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_rabon)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 48'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 53'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Torton'){
                            precioRecoleccion = parseFloat(this.tarifarios_ltl[tar].recoleccion_torton)
                            break;
                        }
                    }

                    subtotal = precioRecoleccion
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
                    this.progresbarRecoleccion = true
                } else {
                    let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                    this.confirmarServices.splice(indice, 1);

                    let indice1 = this.selectServices.indexOf(idServicio);
                    if (indice1 !== -1) {
                        this.selectServices.splice(indice1, 1);
                    }
                    this.progresbarRecoleccion = false
                }
                
                
            }else if (nombreServicio == "ENTREGA") {
                let precioEntrega = 0;
                comprobar = document.getElementById(idServicio + "cheServicios").checked;

                if (comprobar) {

                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                        if(this.nomUnidadModalidad == 'Nissan'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_nissan)
                            break;
                        }else if(this.nomUnidadModalidad == 'Camioneta 3.5'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_tres_y_media)
                            break;
                        }else if(this.nomUnidadModalidad == 'Rabon'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_rabon)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 48'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Caja Cerrada de 53'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                            break;
                        }else if(this.nomUnidadModalidad == 'Torton'){
                            precioEntrega = parseFloat(this.tarifarios_ltl[tar].entrega_torton)
                            break;
                        }
                    }

                    subtotal = precioEntrega
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
                this.progresbarEntrega = true

                } else {
                let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                this.confirmarServices.splice(indice, 1);
                this.progresbarEntrega = false
                }

                

            }/*else if (nombreServicio == "MANIOBRAS DE CARGA" || nombreServicio == "MANIOBRAS" || nombreServicio == "MANIOBRAS DE CARGA Y DESCARGA") {
                
                this.$bvModal.show("maniobrasInfo");

            }*/else if (nombreServicio != "FLETE NACIONAL") {
                let precioServ = 0
                comprobar = document.getElementById(idServicio + "cheServicios").checked;

                if (comprobar) {

                    if(this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio) > 0){
                        let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                        this.confirmarServices.splice(indice, 1);

                        let indice1 = this.selectServices.indexOf(idServicio);
                        if (indice1 !== -1) {
                            this.selectServices.splice(indice1, 1);
                        }
                        
                    }

                    if(this.nomUnidadModalidad == 'Nissan'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 3200
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 530
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 610
                        }
                            
                    }else if(this.nomUnidadModalidad == 'Camioneta 3.5'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 3630
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 605
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 1265
                        }
                            
                    }else if(this.nomUnidadModalidad == 'Rabon'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 4290
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 720
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 2310
                        }
                            
                    }else if(this.nomUnidadModalidad == 'Caja Cerrada de 48'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 6270
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 1050
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 3780
                        }
                            
                    }else if(this.nomUnidadModalidad == 'Caja Cerrada de 53'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 6270
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 1050
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 3780
                        }
                            
                    }else if(this.nomUnidadModalidad == 'Torton'){
                        if(nombreServicio == 'ESTADIA POR DÍA'){
                            precioServ = 4950
                        }

                        if(nombreServicio == 'ESTADIA POR HORA'){
                            precioServ = 820
                        }

                        if(nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                            precioServ = 2640
                        }
                            
                    }
                
                    subtotal = precioServ;

                    porcIva = subtotal * (iva / 100);

                    let agrega = {
                        ajusteVenta: ajusteVenta,
                        idService: idServicio,
                        nombreSer: nombreServicio,
                        kilometraje: 0,
                        tarifaK: 0,
                        subtotal: subtotal,
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
                    let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                    this.confirmarServices.splice(indice, 1);

                    let indice1 = this.selectServices.indexOf(idServicio);
                    if (indice1 !== -1) {
                        this.selectServices.splice(indice1, 1);
                    }
                }
            } else {

                let tipoZona = ''
                comprobar = true;
                subtotal = parseFloat(this.totalPrecioVolumen.toFixed(2))
                porcIva = subtotal * (iva / 100);
                
                for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                    tipoZona = this.tarifarios_ltl[tar].tipo_zona
                }

                let tipoZonaIncre = 'Zona '+ tipoZona
                for (let lp = 0; lp < this.listPorcentajes.length; lp++) {
                    if(this.listPorcentajes[lp].mercancia == tipoZonaIncre && this.listPorcentajes[lp].tipo == 'i'){
                        porcAdicional = subtotal * (parseFloat(this.listPorcentajes[lp].porcentaje) / 100); 
                    }
                    
                }

                if (this.isSusceptibleRobo) {
                    //porcSusceptible = subtotal * (this.porcentajeRobo / 100);
                }


                if (this.sobrePeso) {
                    //porcSobrepeso = subtotal * (this.porcSobrePeso / 100);
                }

                let agrega = {
                    ajusteVenta: false,
                    idService: idServicio,
                    nombreSer: nombreServicio,
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
                    totalServicio: subtotal + porcIva + porcAdicional + porcSobrepeso + porcSusceptible + porcVolMerc + precioVolumenTot,
                };
                let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                this.confirmarServices.splice(indice, 1);

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                    this.confirmarServices.push(agrega);
                }
                this.progresbarFlete = true
            }
            await this.sumaBoton();
            await this.planes();
        },

        reloadPage() {
            window.location.reload();
        },

        showDetails() {
            if (this.details == 0) {
                this.details = 1;
            } else if (this.details == 1) {
                this.details = 0;
            }
        },

        sumaBoton() {
            let aumentos = 0;
            this.priceSale = 0;
            
            for (let i = 0; i < this.confirmarServices.length; i++) {
                if (this.confirmarServices[i].totalServicio > 0) {
                this.priceSale = this.priceSale + this.confirmarServices[i].totalServicio;
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

        selectDivisa(valor) {
            if (valor == 1) {
                // USD Formula mxn/dolar
                this.divisa = 2;
                this.sumaBoton();
                this.planes();
            }

            if (valor == 2) {
                // MXN Formula dolar*mxn
                this.divisa = 1;
                this.sumaBoton();
                this.planes();
            }
        },

        planes(){
            this.pricingData = []
            const noPlan = 2
            const icon = 'fe-truck'
            const precioBase = parseFloat(this.totalSubtotalGlobal.toFixed(2));
            let divisaText = 'MXN'

              if (this.divisa == 1) {
                divisaText = 'USD'
                this.priceSale = this.priceSale / this.valorDolar
              }
      
            let listServicios = ''
            let datos = null
            let aumento = 0

            for (let i = 0; i < this.confirmarServices.length; i++) {
                listServicios = listServicios + ', ' + this.confirmarServices[i].nombreSer
            }
            listServicios = listServicios.substring(2)
      
            for (let j = 0; j <= noPlan ; j++) {
        
                switch (j) {
                    case 0:

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
                            ribbon: "",
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

        agregaPlanes(){
      
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
                
                let idPlan = 0
                let title = ''
                let icon = ''
                let price = 0.0
                let services = ''
                let bandwidth = ''
                let domain = ''
                let user = ''
                let ribbon = ''
                let seleccionado = 0
                
                for (let i = 0; i < this.pricingData.length; i++) {
                idPlan = this.pricingData[i].idPlan
                title = this.pricingData[i].title
                icon = this.pricingData[i].icon
                price = this.pricingData[i].price
                services = this.pricingData[i].services
                bandwidth = this.pricingData[i].bandwidth
                domain = this.pricingData[i].domain
                user = this.pricingData[i].user
                seleccionado = this.pricingData[i].seleccionado
                ribbon = this.pricingData[i].ribbon

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
                    Swal.fire({
                    title: "Mercancias agregadas error",
                    text:
                    "Se detecto un error mientras se cargaban las mercancias: " +
                    error,
                    icon: "success",
                    confirmButtonText: "Cerrar",
                    });
                });
                
                }
            }
            
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

        hideResumen() {
            this.$bvModal.hide("resumen-modal");
        },

        validaValorMercancia(val) {
            if (val.target.value < 0) {
                this.valorMercancia = 0;
            }
        },

        cierraModalSeguro() {
            this.$bvModal.hide("valorDeclaradoMercanciaInfo");
        },

        cierraModalManiobras(){
          this.$bvModal.hide("maniobrasInfo");
        },

        mostrarImpuesto(valor2) {
            let porcentaje = document.getElementById(
                valor2 + "escondeImpuesto"
            ).value;
            let total = document.getElementById(valor2 + "ocultarSumaTotal").value;

            let obtenido = parseInt(valor2);

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

                let index_service = this.confirmarServices.findIndex((x) => x.idService === valor2);
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

                let index_service = this.confirmarServices.findIndex((x) => x.idService === valor2);
                this.confirmarServices[index_service].ajusteVenta = false;
            }
        },

        sumaImpuesto(event, id) {
      
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
                    } else {
                        this.totalSugerido = this.totalSugerido + agregado;
                        
                    }
                }
            }
        },

        async validaInfoConfirma(){
            this.$bvModal.show("validaConfirmacionOD");
            await this.muestraMapaRutas(2);
        },

        getLada() {
            axios.get(`/api/v1/list-ladas/`).then((response) => {
                    this.ladas = response.data;
                }).catch((error) => {
                    console.log(error);
                });
        },

        async validacionConfirmacionOD(){
            let vcalleOrigen = this.calleOrigen;
            let vnumExtOrigen = this.numExtOrigen;
            let vcalleDestino = this.calleDestino;
            let vnumExtDestino = this.numExtDestino;

            if (this.arrayOrigen.length == 0) {
                Swal.fire({
                    title: "Debes ingresar al menos un origen.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if (this.arrayDestino.length == 0) {
                Swal.fire({
                    title: "Debes ingresar al menos un destino.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(vcalleOrigen == ''){
                Swal.fire({
                    title: "Ingresa el nombre de la calle del Origen",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(vnumExtOrigen == ''){
                Swal.fire({
                    title: "Ingresa el número Exterior del Origen",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(vcalleDestino == ''){
                Swal.fire({
                    title: "Ingresa el nombre de la calle del Destino",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(vnumExtDestino == ''){
                Swal.fire({
                    title: "Ingresa el número Exterior del Destino",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            await this.recalculaCotizacion();
            this.$bvModal.hide("validaConfirmacionOD");
            this.$bvModal.show("datosContacto");
        },

        async recalculaCotizacion(){
            let validaCambioOrigen = false
            let validaCambioDestino = false

            /* SE VALIDA SI HAY CAMBIOS EN LOS ARAYS DE ORIGEN Y DESTINO */
            for (let i = 0; i < this.arrayOrigen.length; i++) {
                if (this.arrayOrigen[i] !== this.arrayOrigenR[i]) {
                    validaCambioOrigen = true;
                }
            }

            for (let i = 0; i < this.arrayDestino.length; i++) {
                if (this.arrayDestino[i] !== this.arrayDestinoR[i]) {
                    validaCambioDestino = true;
                }
            }

            if(validaCambioOrigen || validaCambioDestino){
                await this.recalculaAgregaPaquetesLTL();
            }

            await this.generateCotizacion(1)
        },

        async recalculaAgregaPaquetesLTL(){
            let estibable = ''
            let cant = 0
            let peso = 0
            let pesoT = 0
            let alto = 0
            let ancho = 0
            let largo = 0
            let volumen = 0
            let volumenTotal = 0
            let pesoVol = 0
            let pesoVolTot = 0
            let unidadM = ''
            let embalaje = ''
            let unidadP = ''

            let idPaq = 0
            let precioTotal = 0
            let factor = 0
            let fleteNacional = 0

            for (let i = 0; i < this.agregarMercancias.length; i++) {
                alto = this.agregarMercancias[i].alto;
                ancho = this.agregarMercancias[i].ancho;
                cant = this.agregarMercancias[i].cantidad;
                embalaje = this.agregarMercancias[i].embalaje;
                estibable = this.agregarMercancias[i].estibable;
                idPaq = this.agregarMercancias[i].idPaq;
                largo = this.agregarMercancias[i].largo;
                unidadM = this.agregarMercancias[i].medida;
                peso = this.agregarMercancias[i].peso;
                pesoT = this.agregarMercancias[i].pesoTotal;
                pesoVol = this.agregarMercancias[i].pesoVolumetrico;
                pesoVolTot = this.agregarMercancias[i].pesoVolumetricoTotal;
                unidadP = this.agregarMercancias[i].upeso;
                volumen = this.agregarMercancias[i].volumen;
                volumenTotal = this.agregarMercancias[i].volumenTotal;

                for (let ta = 0; ta < this.tarifarios_ltl.length; ta++) {
                    factor = this.tarifarios_ltl[ta].factorConversion
                    fleteNacional = this.tarifarios_ltl[ta].flete_nacional   
                }

                if(estibable == 'si'){

                    if(pesoVolTot > pesoT){
                        precioTotal =  ((fleteNacional / factor) * pesoVolTot )
                        
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

                }else if(estibable == 'no'){

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
                }

                this.agregarMercancias[i].alto = alto;
                this.agregarMercancias[i].ancho = ancho;
                this.agregarMercancias[i].cantidad = cant;
                this.agregarMercancias[i].embalaje = embalaje;
                this.agregarMercancias[i].estibable = estibable;
                this.agregarMercancias[i].largo = largo;
                this.agregarMercancias[i].medida = unidadM;
                this.agregarMercancias[i].peso = peso;
                this.agregarMercancias[i].pesoTotal = pesoT;
                this.agregarMercancias[i].pesoVolumetrico = pesoVol;
                this.agregarMercancias[i].pesoVolumetricoTotal = pesoVolTot;
                this.agregarMercancias[i].precioVolumen = precioTotal;
                this.agregarMercancias[i].upeso = unidadP;
                this.agregarMercancias[i].volumen = volumen;
                this.agregarMercancias[i].volumenTotal = volumenTotal;
                await this.buscaUnidadLTL();

                this.cantMerc = 0;
                this.pesTMerc = 0;
                this.pesoTotal = 0;
                this.altoMerc = 0;
                this.anchoMerc = 0;
                this.largoMerc = 0;
                this.volMerc = 0;
                this.volMercTot = 0;
                this.pesoVol = 0;
                this.pesoVolTot = 0;
                this.unidaPesoMerc = "kg";
                this.terestibable = "";

                let totalPrecioVolumen = 0;
                for (let i = 0; i < this.agregarMercancias.length; i++) {
                    totalPrecioVolumen = totalPrecioVolumen + parseFloat(this.agregarMercancias[i].precioVolumen);
                }

                this.totalPrecioVolumen = totalPrecioVolumen;
                //this.totalKilo = totalKilos;
                this.definePesoXVol = true;

            }

            await this.detallesMercancias();
        },

        cerrarConfirmacionContacto(){
            this.$bvModal.hide("datosContacto");
            this.$bvModal.show("validaConfirmacionOD");
        },

        validaConfirmacionContacto(){
            let nombre = this.contacName;

            let email = this.contacEmail;
            let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
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
            }

            if(this.termodalidad == 'LTL'){
                this.$bvModal.hide("datosContacto");
                this.$bvModal.show("validaConfirmacionCliente");
            }

            if(this.termodalidad == 'FTL'){
                this.SaveFTL();
            }
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
                                        Swal.fire({
                                            title: "Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                                            text: "",
                                            icon: "info",
                                            confirmButtonText: "Cerrar",
                                        });

                                    }else{
                                        Swal.close();
                                        this.SaveLTL();
                                    }
                                }else if(this.divisa == '2' || this.divisa == 2){
                                    let conversion = 0;

                                    saldoRealUSD = this.creditoUSD - this.creditoOcupadoUSD

                                    conversion = saldoRealUSD * this.valorDolar

                                    this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                    this.contactaAgente = true;

                                    if(priceSale > conversion){
                                        Swal.close();
                                        Swal.fire({
                                            title: "Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                                            text: "",
                                            icon: "info",
                                            confirmButtonText: "Cerrar",
                                        });
                                    }else{
                                        Swal.close();
                                        this.SaveLTL();
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
                                        Swal.fire({
                                            title: "Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                                            text: "",
                                            icon: "info",
                                            confirmButtonText: "Cerrar",
                                        });
                                    }else{
                                        Swal.close();
                                        this.SaveLTL();
                                    }

                                }else if(this.divisa == '1' || this.divisa == 1){
                                    let conversion = 0;

                                    saldoRealMXN = this.creditoMXN - this.creditoOcupadoMXN

                                    conversion = saldoRealMXN / this.valorDolar
                                    this.motivoContacto = "su crédito con nosotros no puede cubrir este servicio"
                                    this.contactaAgente = true;

                                    if(priceSale > conversion){
                                        Swal.close();
                                        Swal.fire({
                                            title: "Lo sentimos, tu crédito con nosotros no puede cubrir este servicio. En breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                                            text: "",
                                            icon: "info",
                                            confirmButtonText: "Cerrar",
                                        });
                                    }else{
                                        Swal.close();
                                        this.SaveLTL();
                                    }
                                }
                            }
                        }else{
                            Swal.close();
                            Swal.fire({
                                title: "Tu solicitud no se puede procesar, en breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                                text: "",
                                icon: "info",
                                confirmButtonText: "Cerrar",
                            });

                            this.motivoContacto = 'el cliente es cliente Interland pero no tiene una linea de crédito'
                            this.contactaAgente = true;
                            this.SaveLTL();
                        }

                    }else{
                        Swal.close();
                        Swal.fire({
                            title: "No estas registrado como cliente en Interland, en breve se pondrá en contacto contigo un agente para dar seguimiento a tu solicitud.",
                            text: "",
                            icon: "info",
                            confirmButtonText: "Cerrar",
                        });
                        this.motivoContacto = 'el cliente no esta registrado como cliente Interland'
                        this.contactaAgente = true;
                        this.SaveLTL();
                        //return false;
                    }
                } else {
                    //valido = "No válido"
                    //resultado.classList.remove("ok");
                
                    Swal.fire({
                        title: "El RFC ingresado es incorrecto, verifícalo",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false;
                }
            }else{
                this.SaveLTL();
            }
            
        },

        rfcValido(rfc, aceptarGenerico = true) {
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

        async SaveLTL(){
            this.$bvModal.hide("validaConfirmacionCliente");
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
                }
                
                if (email == "" || email == null) {
                    Swal.fire({
                        title: "Ingresa Email",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false;
                }
                
                if (!EmailValido) {
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
                }

                if (telefono == "" || telefono == null) {
                    Swal.fire({
                        title: "Ingresa Telefono",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false;
                }

                if (telefono.length < 10) {
                    Swal.fire({
                        title: "Ingrese 10 Digitos Minimos",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    return false;
                }
                
                if (telefono.length > 16) {
                    Swal.fire({
                        title: "Ingrese 16 Digitos Maximo",
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
                let calleOrigen = "";
                let numExtOrigen = "";
                let numIntOrigen = "";

                let idPaisDestino = "";
                let nombrePaisDestino = "";
                let cpDestino = "";
                let idEstadoDestino = "";
                let nombreEstadoDestino = "";
                let nombreCiudadDestino = "";
                let calleDestino = "";
                let numExtDestino = "";
                let numIntDestino = "";

                for (let i = 0; i < this.arrayOrigen.length; i++) {
                    idPaisOrigen = this.arrayOrigen[i].idpais;
                    nombrePaisOrigen = this.arrayOrigen[i].pais;
                    cpOrigen = this.arrayOrigen[i].cp;
                    idEstadoOrigen = this.arrayOrigen[i].idestado;
                    nombreEstadoOrigen = this.arrayOrigen[i].estado;
                    nombreCiudadOrigen = this.arrayOrigen[i].ciudad;
                }

                for (let j = 0; j < this.arrayDestino.length; j++) {
                    idPaisDestino = this.arrayDestino[j].idpais;
                    nombrePaisDestino = this.arrayDestino[j].pais;
                    cpDestino = this.arrayDestino[j].cp;
                    idEstadoDestino = this.arrayDestino[j].idestado;
                    nombreEstadoDestino = this.arrayDestino[j].estado;
                    nombreCiudadDestino = this.arrayDestino[j].ciudad;
                }

                calleOrigen = this.calleOrigen;
                calleDestino = this.calleDestino;
                numExtOrigen = this.numExtOrigen;
                numExtDestino = this.numExtDestino;
                numIntOrigen = this.numIntOrigen;
                numIntDestino = this.numIntDestino;

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

                        if (this.confirmarServices.length > 0) {
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
                                calleOrigen: calleOrigen,
                                numExtOrigen: numExtOrigen,
                                numIntOrigen: numIntOrigen,

                                paisDestino: nombrePaisDestino,
                                idpaisDestino: idPaisDestino,
                                cpDestino: cpDestino,
                                estadoDestino: nombreEstadoDestino,
                                idestadoDestino: idEstadoDestino,
                                ciudadDestino: nombreCiudadDestino,
                                calleDestino: calleDestino,
                                numExtDestino: numExtDestino,
                                numIntDestino: numIntDestino,

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
                                folioConsecutivo: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0"),
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
                            }).then((response) => {
                                this.estadoCotiza = true;
                                this.idCotizacion = response.data.id;
                                this.getFolios();
                                this.agregaMerch();
                                this.agregaServices();
                                this.updateConsecutivo();
                                this.addContact();
                                this.agregaPlanes();

                                if(this.contactaAgente){
                                    this.notificaAgente();
                                }

                                if (this.confirmarServices.length > 0) {
                                    this.enviaCorreoPricing(this.idCotizacion, this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6, "0"));
                                }
                                
                                this.existeCotizacion = false

                                Swal.fire({
                                    title: "Cotizacion Generada correctamente",
                                    text: "",
                                    icon: "success",
                                    confirmButtonText: "Cerrar",
                                    allowOutsideClick: false,                      
                                }).then((result) => {
                                if (result.isConfirmed) {
                                    if(this.username == 'Invitado'){
                                        window.location.href = "/logout";
                                    }
                                }
                                })
                            }).catch((error) => {
                                Swal.fire({
                                    title: "Error Cotizacion",
                                    text: "Se detecto un error mientras se generaba la cotizacion: " + error,
                                    icon: "error",
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

            }else{
                Swal.fire({
                    title:"Ya existe una cotización con la misma información, verificalo por favor.",
                    text: "",
                    icon: "info",
                    confirmButtonText: "Cerrar",
                });
            }

        },

        getFolios() {
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
                    url: `servicioCotizaciones/${this.idCotizacion}/`,
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

        agregaMerch() {
            let idCotiza = this.idCotizacion;

            if (idCotiza == 0) {
                Swal.fire({
                title: "Genere una Cotizacion",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
                });
                return false;
            } else if (idCotiza > 0) {
                
                let embalaje = ''
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
                }
            }
        },

        agregaServices() {
            let idCotiza = this.idCotizacion;

            if (idCotiza == 0) {
                Swal.fire({
                title: "Genere una Cotizacion",
                text: "",
                icon: "error",
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
                    }).then((response) => {
                        if (response.data.nameService == "FLETE NACIONAL") {
                        this.idNuevoServ = response.data.id;
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                if (this.confirmarServices.length > 0) {
                    this.addOther();
                }
            }
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

        async addContact() {
            let idCotiza = this.idCotizacion;

            if (idCotiza == 0) {
                Swal.fire({
                title: "Genere una Cotizacion",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
                });
                return false;
            } else if (idCotiza > 0) {
                await axios({
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

        agregaPlanes() {
      
            let idCotiza = this.idCotizacion;

            if (idCotiza == 0) {
                Swal.fire({
                title: "Genere una Cotizacion",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
                });
                return false;
            } else if (idCotiza > 0) {
                
                let idPlan = 0
                let title = ''
                let icon = ''
                let price = 0.0
                let services = ''
                let bandwidth = ''
                let domain = ''
                let user = ''
                let ribbon = ''
                let seleccionado = 0
                
                for (let i = 0; i < this.pricingData.length; i++) {
                    idPlan = this.pricingData[i].idPlan
                    title = this.pricingData[i].title
                    icon = this.pricingData[i].icon
                    price = this.pricingData[i].price
                    services = this.pricingData[i].services
                    bandwidth = this.pricingData[i].bandwidth
                    domain = this.pricingData[i].domain
                    user = this.pricingData[i].user
                    seleccionado = this.pricingData[i].seleccionado
                    ribbon = this.pricingData[i].ribbon

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
                        Swal.fire({
                            title: "Mercancias agregadas error",
                            text: "Se detecto un error mientras se cargaban las mercancias: " + error,
                            icon: "success",
                            confirmButtonText: "Cerrar",
                        });
                    });
                
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

        async sendEmailCotiza() {
            let idCotiza = this.idCotizacion;

            await axios({
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
                console.log("err" + error);
            });
        },

        notificaAgente(){

            let telefono = ''
            let idCotiza = this.idCotizacion;

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
                nombreAgente: this.nombreAgente,
                correoAgente: this.correoAgente,

            },
            auth: {
                username: "admin",
                password: "123",
            },
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                        
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
            }).then((response) => {

            }).catch((error) => {
                console.log("err" + error);
            });
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

            for (let a = 0; a < this.confirmarServices.length; a++) {
                nprecio = this.confirmarServices[a].subtotal;

                if (nprecio == 0) {
                nid = this.confirmarServices[a].idService;
                nservice = this.confirmarServices[a].nombreSer;
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

        generarTituloColumna(unidades) {
            let rango_text = '';
            let km = '';
            return unidades.name;
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

        generarValorCelda(unidad, origen, destino) {
            let datosUnidad = this.units.find(objeto => objeto.id === unidad.id)
            
            let precio = parseFloat(datosUnidad.precio_kilometraje);
            let resBase = 0;
            let res = 0;
            let resDes = 0;
            let resInc = 0;
            let tipoCarga = 'Carga General';
            let resHaz = 0;
            let resRef = 0;
            let resSuc = 0;
            let resSeg = 0;

            let porcentajeIMO = 35;
            let porcentajeRef = 10;
            let porcentajeSuc = 15;
            let porcentajeSeg = 85;
            let porcentajeIncremento = 0
            let porcentajeIncrementoZona = 0
            let porcentajeDecremento = 0
            let identificadorTarifa = ''

            let km = 0
            let km_tot = 0
            let tipozona = ''
            let origenValor = origen.pais+', '+origen.estado+', '+origen.ciudad;
            let destinoValor = destino.pais+', '+destino.estado+', '+destino.ciudad;
            let destinoRuta = origen.estado+' - '+destino.estado

            identificadorTarifa = origen.ciudad+'-'+destino.ciudad

            for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                
                if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                    console.log(this.tarifarios_ltl[tar].identificador, ' == ', identificadorTarifa);    

                    tipozona = 'Zona '+this.tarifarios_ltl[tar].tipo_zona
                    km = parseFloat(this.tarifarios_ltl[tar].km)

                    if(this.stops){
                        for (let ru = 0; ru < this.routes.length; ru++) {
                            console.log(this.routes[ru])
                            km_tot = km_tot + parseFloat(this.routes[ru].km)
                        }
                        km = km_tot
                    }
                
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

                    res = precio * km
                    console.log(res, 'Precio Normal: Precio ', precio, ' * km ', km)

                    if(porcentajeIncrementoZona > 0){
                        resInc = (res * porcentajeIncrementoZona) / 100;

                        res = res + resInc;
                        console.log('Incremento de Zona: ', resInc, 'Porcentaje Aplicado: ', porcentajeIncrementoZona, 'Resultado con procentaje aplicado: ',res)
                    }else{
                        console.log(res, 'Precio Normal')
                    }
                    
                    resBase = res
                    console.log(resBase, 'Precio Base')

                    if(this.tertipocarga == 'h'){
                        resHaz = (resBase * porcentajeIMO) / 100;
                        res = resBase + resHaz;
                        console.log('Incremento por Carga IMO/Peigrosa: ', resHaz, 'Porcentaje Aplicado: ',porcentajeIMO, 'Resultado con porcentaje aplicado: ', res)
                    }

                    if(this.tertipocarga == 'r'){
                        resRef = (resBase * porcentajeRef) / 100;
                        res = resBase + resRef;
                        console.log('Incremento por Carga Refrigerada: ', resRef, 'Porcentaje Aplicado: ',porcentajeRef, 'Resultado con porcentaje aplicado: ', res)
                    }

                    if(this.tertipocarga == 'sr'){
                        resSuc = (resBase * porcentajeSuc) / 100;
                        res = resBase + resSuc;
                        console.log('Incremento por Carga Suceptible a Robo: ', resSuc, 'Porcentaje Aplicado: ',porcentajeSuc, 'Resultado con porcentaje aplicado: ', res)
                    }

                    if(porcentajeIncremento > 0){
                        resInc = (resBase * porcentajeIncremento) / 100;
                        res = resBase + resInc;
                        console.log('Incremento Aplicable: ', resInc, 'Porcentaje Aplicado: ',porcentajeIncremento, 'Resultado con porcentaje aplicado: ', res)
                    }
                    
                    if (porcentajeDecremento > 0) {
                        resDes = (resBase * porcentajeDecremento) / 100;
                        res = resBase - resDes
                        console.log('Decremento Aplicable: ', resDes, 'Porcentaje Aplicado: ',porcentajeDecremento, 'Resultado con porcentaje aplicado: ', res)   
                    }

                    console.log(this.adicionalesFTL);
                    for (let ad = 0; ad < this.adicionalesFTL.length; ad++) {
                        switch (unidad.id) {
                            case 1: //Nissan
                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    console.log(this.tarifarios_ltl);
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_nissan)
                                            res = res + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_nissan)
                                            res = res + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    res = res + 3200
                                    console.log('Incremento por Servicio: ', 3200, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res  + 3200
                                    console.log('Incremento por Servicio: ', 3200, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res  + 530
                                    console.log('Incremento por Servicio: ', 530, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res  + 610
                                    console.log('Incremento por Servicio: ', 610, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res  + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                            break;
                            case 2: //3 1/2

                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_tres_y_media)
                                            res = res + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_tres_y_media)
                                            res = res + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res + 3630
                                    console.log('Incremento por Servicio: ', 3630, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res + 605
                                    console.log('Incremento por Servicio: ', 605, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res + 1265
                                    console.log('Incremento por Servicio: ', 1265, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                                
                            break;
                            case 3: //rabon

                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_rabon)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_tres_y_media)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }
                            
                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res  + 4290
                                    console.log('Incremento por Servicio: ', 4290, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res  + 720
                                    console.log('Incremento por Servicio: ', 720, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res  + 2310
                                    console.log('Incremento por Servicio: ', 2310, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res  + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                            break;
                            case 4: //caja 48

                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_trailer)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }    

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res  + 6270
                                    console.log('Incremento por Servicio: ', 6270, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res  + 1050
                                    console.log('Incremento por Servicio: ', 1050, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res  + 3780
                                    console.log('Incremento por Servicio: ', 3780, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res  + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                            break;
                            case 5: //caja 53

                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_trailer)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_trailer)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res  + 6270
                                    console.log('Incremento por Servicio: ', 6270, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res  + 1050
                                    console.log('Incremento por Servicio: ', 1050, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res  + 3780
                                    console.log('Incremento por Servicio: ', 3780, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                                
                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res  + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                            break;
                            case 13: //torton

                                if(this.adicionalesFTL[ad].nombreServicio == 'ENTREGA' || this.adicionalesFTL[ad].nombreServicio == 'INGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].entrega_torton)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'RECOLECCION' || this.adicionalesFTL[ad].nombreServicio == 'EGRESO ADUANAL'){
                                    let varloTar = 0
                                    for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                                        if(this.tarifarios_ltl[tar].identificador == identificadorTarifa){
                                            varloTar = parseFloat(this.tarifarios_ltl[tar].recoleccion_torton)
                                            res = res  + varloTar
                                            console.log('Incremento por Servicio: ', varloTar, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                        }
                                        
                                    }
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR DÍA'){
                                    res = res  + 4950
                                    console.log('Incremento por Servicio: ', 4950, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'ESTADIA POR HORA'){
                                    res = res  + 820
                                    console.log('Incremento por Servicio: ', 820, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'MANIOBRAS DE CARGA Y DESCARGA'){
                                    res = res  + 2640
                                    console.log('Incremento por Servicio: ', 2640, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }

                                if(this.adicionalesFTL[ad].nombreServicio == 'SEGURO' && parseFloat(this.valorMercancia) > 0){
                                    resSeg = (resBase * porcentajeSeg) / 100;
                                    res = res  + resSeg
                                    console.log('Incremento por Servicio: ', resSeg, 'Servicio:', this.adicionalesFTL[ad].nombreServicio ,'Resultado con incremento aplicado: ',res)
                                }
                            break;
                        }
                    }

                    /* FIN SECCION ADICIONALES */

                    if(km > 500 && km < 800 && origen.estado == 'Ciudad de Mexico'){
                        //resDes = (resBase * 30) / 100; //SE RESTA 30% POR EXCEDER 500 KM
                        //res = resBase - resDes;
                        resDes = (res * 30) / 100; //SE RESTA 30% POR EXCEDER 500 KM
                        res = res - resDes;
                        console.log('Decremento Por exceder 500 km y menos 800: ', resDes, 'Porcentaje Aplicado: ',30, 'Resultado con porcentaje aplicado: ', res)
                    }

                    if(km > 800 && origen.estado == 'Ciudad de Mexico'){
                        //resDes = (resBase * 45) / 100; //SE RESTA 45% POR EXCEDER 500 KM
                        //res = resBase - resDes;
                        resDes = (res * 45) / 100; //SE RESTA 45% POR EXCEDER 500 KM
                        res = res - resDes;
                        console.log('Decremento Por exceder 800 km: ', resDes, 'Porcentaje Aplicado: ',45, 'Resultado con porcentaje aplicado: ', res)
                    }

                    console.log('Precio Final: ', res)
                    console.log('-----------------------------------------------------------')
                }
                
            }
            
            return(res)
        },

        colspanDinamico(){
            this.colspan = this.unidades_ftl.length
        },

        addUnidadLTLTag (newTag) {
            
            Swal.fire({
                title: "La unidad: "+newTag+" no está dada de alta, verificalo porfavor.",
                text: "",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
            return false;
        },

        verResumenFTL(){

            if(this.select_cotizaciones.length == 0){
                Swal.fire({
                    title: "Debes seleccionar al menos un registro de las cotizaciones mostradas en la tabla.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;

            }

            this.$bvModal.show("resumen-modal");
        },

        async generateCotizacionFTL(val){

            this.datosOrigenesFTLOcupar = []
            this.datosDestinosFTLOcupar = []
            this.datosUnidaddesFtlOcupar = []
            this.listTipoZona = []
            this.rangos = []
            let idServicio = 0
            let nombreServicio = ''
            let data = {}

            const auth = { username: "admin", password: "123", }
            let ids = ''

            if (this.arrayOrigen.length == 0) {
                Swal.fire({
                    title: "Debes seleccionar al menos un origen.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(this.arrayDestino.length == 0){
                Swal.fire({
                    title: "Debes seleccionar al menos un destino.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(this.unidades_ftl.length == 0){
                Swal.fire({
                    title: "Debes seleccionar al menos una Unidad.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            for (let i = 0; i < this.arrayOrigen.length; i++) {
                let org =  await axios({
                    method: "get",
                    url: "/api/v1/get-datos-geocercas-cotizacion/",
                    params: {
                        idGeocerca: this.arrayOrigen[i].idGeocerca,
                    },
                    auth: auth,
                }).then((response) => {
                    this.datosOrigenesFTLOcupar.push(response.data[0])
                }).catch((error) => {
                    console.log(error);
                });
            }

            for (let i = 0; i < this.arrayDestino.length; i++) {
                let dest =  await axios({
                    method: "get",
                    url: "/api/v1/get-datos-geocercas-cotizacion/",
                    params: {
                        idGeocerca: this.arrayDestino[i].idGeocerca,
                    },
                    auth: auth,
                }).then((response) => {
                    this.datosDestinosFTLOcupar.push(response.data[0])
                }).catch((error) => {
                    console.log(error);
                });
            }

            for (let i = 0; i < this.unidades_ftl.length; i++) {
                let unit =  await axios({
                    method: "get",
                    url: "/api/v1/catalogo-getUnidad/"+this.unidades_ftl[i].idUnidad+"/",
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

            await this.obtenerPorcentajes();

            await this.colspanDinamico();

            await this.filasCotizacionFTL();

        },

        async addServiciosFTL(idServicio, nombreServicio) {

            let comprobar =  document.getElementById(idServicio + "cheServiciosFTL").checked;

            if(nombreServicio == 'SEGURO' && comprobar){
                this.$bvModal.show("valorDeclaradoMercancia");
            }else{
                this.$bvModal.hide("valorDeclaradoMercancia");
            }

            let data = {idServicio: idServicio, nombreServicio: nombreServicio}

            if(this.adicionalesFTL.length > 0){
                for (let u = 0; u < this.adicionalesFTL.length; u++) {
                    const index = this.adicionalesFTL.findIndex(objeto => objeto.idServicio === idServicio && objeto.nombreServicio === nombreServicio);
                    if (index !== -1) {
                        this.adicionalesFTL.splice(index, 1);
                        await this.generateCotizacionFTL(1)
                        //console.log(this.adicionalesFTL, 'Quita Servicio');
                        break;
                    }else{
                        this.adicionalesFTL.push(data);
                        await this.generateCotizacionFTL(1)
                        //console.log(this.adicionalesFTL, 'Agrega Servicio 1')
                        break;
                    }
                }
            }else{
                this.adicionalesFTL.push(data);
                await this.generateCotizacionFTL(1)
                //console.log(this.adicionalesFTL, 'Agrega Servicio 2')
            }
        },

        cierraModal(idServ) {
            var indice = this.selectServices.indexOf(idServ);

            if (indice != -1) this.selectServices.splice(indice, 1);

            this.$bvModal.hide("valorDeclaradoMercancia");
        },

        contactoFTL(){
            this.$bvModal.show("datosContacto");
        },

        SaveFTL(){

            let idCotiza = this.idCotizacion;

            if (idCotiza == 0) {

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
                    this.generarPDFLTL();
                    } else {
                    Swal.fire({
                        title: "Cotización cancelada",
                        text: "",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                    }
                });
            }
        },

        generarPDFLTL() {

            axios({
            method: "post",
            url: "/api/v1/pdfTarifarioLtl2/",
            data: {
                origen: this.datosOrigenesFTLOcupar,
                destino: this.datosDestinosFTLOcupar,
                listaOD: this.listOD,
                unidades: this.datosUnidaddesFtlOcupar,
                rangos: this.rangos,
                tipoZona: this.listTipoZona,
                porcentajes: this.listPorcentajes,
                tipoMercancia: this.tertipocarga,
                serviciosAdicionales: this.adicionalesFTL,
                mercancias: this.agregarMercancias,
                termodalidad: this.termodalidad,
                tiposervicio: this.tipoOpcion,
                usuario: this.username,
                contacName: this.contacName,
                contacEmail: this.contacEmail,
                contacTelefono: this.contacLada + this.contacTelefono,
                contacDescription: this.contacDescription,
                tarifas: this.tarifarios_ltl,
                idCotizacion: this.controlConse + this.fechaConsecutivo + String(this.numConsecutivo + 1).padStart(6,"0"),
            },
            responseType: 'arraybuffer',
            auth: {
                username: "admin",
                password: "123",
            },
            }).then((response) => {
            // Crear una URL del blob del PDF
            //const blob = new Blob([response.data], { type: 'application/pdf' });
            //const pdfUrl = URL.createObjectURL(blob);
            
            // Abrir el PDF en una nueva pestaña del navegador
            //window.open(pdfUrl, '_blank');

            // Crear una URL del blob del PDF
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = window.URL.createObjectURL(blob);

            // Crear un enlace <a> invisible
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.style.display = 'none'; // Ocultar el enlace

            // Establecer el nombre del archivo
            link.download = 'Tarifario FTL 2024.pdf'; // Cambia 'nombre_personalizado.pdf' por el nombre que desees

            // Agregar el enlace al DOM
            document.body.appendChild(link);

            // Simular un clic en el enlace para iniciar la descarga
            link.click();

            // Limpiar la URL del blob después de un cierto tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(pdfUrl);
                document.body.removeChild(link);
            }, 100);
            }).catch((error) => {
                        
            }); 
        },

        filasCotizacionFTL(val){
            this.fields_table = []
            this.items_table = []
            let data = {}
            let text_val = ''

            data = {key: 'check-dinamic', label: 'Selecciona'}
            this.fields_table.push(data)
            data = {key: 'origen', label: 'Origen'}
            this.fields_table.push(data)
            data = {key: 'destino', label: 'Destino'}
            this.fields_table.push(data)

            for (let un = 0; un < this.datosUnidaddesFtlOcupar.length; un++) {
                data = {key: this.datosUnidaddesFtlOcupar[un].code_name, label:this.datosUnidaddesFtlOcupar[un].name, formatter: (value, key, item) => { return '$' + this.formatMoney(value)}}
                this.fields_table.push(data)
            }

            if(this.stops){
                
                let ori = {
                    idpais: this.routes[0].idpais_o,
                    pais: this.routes[0].pais_o,
                    idestado: this.routes[0].idestado_o,
                    estado: this.routes[0].estado_o,
                    ciudad: this.routes[0].ciudad_o,
                    colonia: this.routes[0].colonia_o,
                    cp: this.routes[0].cp_o,
                    text_largo: '',
                    idOrigen: 1,
                    lat: this.routes[0].origin.lat,
                    lng: this.routes[0].origin.lng,
                    lat_centro: this.routes[0].origin.lat,
                    lng_centro: this.routes[0].origin.lng,
                    idGeocerca: this.routes[0].idGeocerca_o,
                    nombre_corto: this.routes[0].nombre_corto_o,
                    kilometros_redonda: this.routes[0].kilometros_redonda_o,
                    estatus_quitar: 0,
                };

                let des = {
                    idpais: this.routes[this.routes.length - 1].idpais_d,
                    pais: this.routes[this.routes.length - 1].pais_d,
                    idestado: this.routes[this.routes.length - 1].idestado_d,
                    estado: this.routes[this.routes.length - 1].estado_d,
                    ciudad: this.routes[this.routes.length - 1].ciudad_d,
                    colonia: this.routes[this.routes.length - 1].colonia_d,
                    cp: this.routes[this.routes.length - 1].cp_d,
                    text_largo: '',
                    idOrigen: 1,
                    lat: this.routes[this.routes.length - 1].destination.lat,
                    lng: this.routes[this.routes.length - 1].destination.lng,
                    lat_centro: this.routes[this.routes.length - 1].destination.lat,
                    lng_centro: this.routes[this.routes.length - 1].destination.lng,
                    idGeocerca: this.routes[this.routes.length - 1].idGeocerca_d,
                    nombre_corto: this.routes[this.routes.length - 1].nombre_corto_d,
                    kilometros_redonda: this.routes[this.routes.length - 1].kilometros_redonda_d,
                    estatus_quitar: 0,
                };

                for (let unt = 0; unt < this.datosUnidaddesFtlOcupar.length; unt++) {
                    this.datosUnidaddesFtlOcupar[unt];
                    text_val += ', "'+this.datosUnidaddesFtlOcupar[unt].code_name+'": "'+this.generarValorCelda(this.datosUnidaddesFtlOcupar[unt],ori, des)+'"'
                }

                let text = ''
                let origen = ''
                let destino = ''

                if (this.routes[0].nombre_corto_o != ''){
                    origen = this.routes[0].nombre_corto_o
                }else{
                    origen = this.routes[0].estado_o+' - '+this.routes[0].ciudad_o
                }

                if(this.routes[this.routes.length - 1].nombre_corto_d != ''){
                    destino = this.routes[this.routes.length - 1].nombre_corto_d
                }else{
                    destino = this.routes[this.routes.length - 1].estado_d+' - '+this.routes[this.routes.length - 1].ciudad_d
                }
                text = '{"check-dinamic": "","origen": "' + origen + '", "destino": "' + destino + '"' + text_val + '}';
                this.items_table.push(JSON.parse(text))
            }else{
                for (let org = 0; org < this.datosOrigenesFTLOcupar.length; org++) {
                    this.datosOrigenesFTLOcupar[org];
                    for (let des = 0; des < this.datosDestinosFTLOcupar.length; des++) {
                        this.datosDestinosFTLOcupar[des];
                        for (let unt = 0; unt < this.datosUnidaddesFtlOcupar.length; unt++) {
                            this.datosUnidaddesFtlOcupar[unt];
                            text_val += ', "'+this.datosUnidaddesFtlOcupar[unt].code_name+'": "'+this.generarValorCelda(this.datosUnidaddesFtlOcupar[unt],this.datosOrigenesFTLOcupar[org], this.datosDestinosFTLOcupar[des])+'"'
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
                        text = '{"check-dinamic": "","origen": "' + origen + '", "destino": "' + destino + '"' + text_val + '}';
                        this.items_table.push(JSON.parse(text))
                        
                    }
                }
            }
        },

        selecciona_registro_cotizacion(items) {
            this.select_cotizaciones = items
        },

        selecciona_todas_cotizaciones() {
            this.$refs.selectableTable.selectAllRows()
        },

        limpiar_todas_cotizaciones() {
            this.$refs.selectableTable.clearSelected()
        },

        async activaStops(){
            this.arrayOrigen = []
            this.routes = []
            await this.muestraMapaRutas(1);
        },

        selectRutaMercancia(){
            let valSelect = document.getElementById("selectStops").checked;
        },

        limitText (count) {
            return `and ${count} other countries`
        },

        clearAll () {
            this.dates_search_address = []
        }

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

                        <b-modal id="inicio-transporte" hide-footer centered hide-close size="lg">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Bienvenido!</b>
                            </template>
                            <div class="form-group text-center">
                                <p for="gradosMerc" class="form-label" style="font-size: x-large;">Para inciar una cotización, porfavor selecciona una opción:</p>
                                <br>
                                <b-row class="text-center">
                                    <!--b-col md="4" style="border: 2px solid #e7eaed;"-->
                                    <b-col md="4">
                                        <div class="ocean" @click="validaTransporte(1)" style="cursor:pointer;">
                                            <i class="fas fa-ship"></i>
                                        </div>
                                        <h4 style="margin:0px;"><b-badge variant="success">Maritimo</b-badge></h4>
                                    </b-col>
                                    <!--b-col md="4" style="border: 2px solid #e7eaed;"-->
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
                                    <!--b-col md="4" style="border: 2px solid #e7eaed;"-->
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
                                    <!--b-col md="12">
                                        <b-button class="width-md ml-1" size="sm" variant="secondary" @click="pruebaCotizacionTel()"><b><i class="fe-x"></i>prueb</b></b-button>
                                    </b-col-->
                                </b-row>
                                <br />
                                <br />
                            </div>
                        </b-modal>

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

                        <b-modal id="inicio-origen-destino" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg">
                            <template #modal-title>
                                <b ><i class="fe-info"></i> Información de Origen y Destino</b>
                            </template>
                            <div class="form-group text-center">  
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
                                                                        :close-on-select="false"
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
                                                            <b-collapse id="origenes">
                                                                <b-list-group>
                                                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                                                        Aun no tienes origenes agregados.
                                                                    </b-list-group-item>
                                                                </b-list-group>
                                                            </b-collapse>
                                                        </div>
                                                        <div v-else>
                                                            <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados <b-badge> ({{ arrayOrigen.length }})  </b-badge></b-button>
                                                            <b-collapse id="origenes">
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
                                                                                <p v-if="origenes.nombre_corto != ''" class="text-wrap">{{ origenes.text_largo}}</p>
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
                                                                                :close-on-select="false"
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
                                                            <b-collapse id="destinos">
                                                                <b-list-group>
                                                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                                                        Aun no tienes destinos agregados.
                                                                    </b-list-group-item>
                                                                </b-list-group>
                                                            </b-collapse>
                                                        </div>
                                                        <div v-else>
                                                            <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados <b-badge> ({{ arrayDestino.length }}) </b-badge></b-button>
                                                            <b-collapse id="destinos">
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
                                        <br>
                                        <div class="primer-style" v-if="termodalidad != 'LTL'">
                                            <b-row>
                                                <b-col md="12">
                                                    <b-form-checkbox
                                                        v-bind:id="'stopscheck'"
                                                        v-model="stops"
                                                        style="font-size: 12px"
                                                        @change="activaStops()"
                                                    >
                                                        <b style="font-weight: bold" v-if="stops">Desactivar Multiparadas</b>
                                                        <b style="font-weight: bold" v-else>Activar Multiparadas</b>
                                                    </b-form-checkbox>
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

                        <b-modal id="inicio-unidades" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="lg" @show="recargaUnidadesSeleccionadas">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Unidades</b>
                            </template>
                            <div class="form-group text-center">
                                <p for="gradosMerc" class="form-label" style="font-size: x-large;">Selecciona una unidad:</p>
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

                        <b-modal id="inicio-mercancias" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close size="xl">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Mercancias</b>
                            </template>
                            <div class="form-group text-center">
                                <b-row>
                                    <b-col>
                                        <label for="clasifica" class="form-label">
                                        <b :style="'color: red;'">*</b>Clasificación SAT<i class="fe-info" title="Esta clasificación es de acuerdo al catalogo de productos del SAT, si tiene el id o el nombre del producto ingreselo."></i></label>
                                        <b-form-group id="clasifica" v-model.trim="clasifica">
                                            <v-autocomplete
                                            :input-attrs="{autocomplete: 'off', placeholder: 'Ingresa una clasificación', id: 'clasificacion',}"
                                            input-class="form-control form-control-sm"
                                            :items="dates_search_proser"
                                            :v-model="clasificaText"
                                            :value="clasificaText"
                                            @input="getLabelProd"
                                            :component-item="templateProvServ"
                                            @update-items="clasificaciones"
                                            :auto-select-one-item="false"                              
                                            return-object
                                            >
                                            </v-autocomplete>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <label for="descripcion" class="form-label">
                                        <b :style="'color: red;'">*</b>Descripción Personalizada<i class="fe-info" title="Este apartado es para dar más detalles del prducto seleccionado del catalogo del SAT."></i></label>
                                        <textarea class="form-control form-control-sm" style="height: 33px" v-model.trim="descripMerc" type="text"/>
                                    </b-col>
                                    <b-col>
                                    <label for="estibable" class="form-label">
                                        <b :style="'color: red;'">*</b>Unidad de Medida</label>
                                        <b-form-select id="unidaMedidaMerc" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="unidaMedidaMerc" @change="selectUniMedMerc">
                                            <option value="cm">Centírmetros</option>
                                            <option value="mt">Metros</option>
                                            <option value="pl">Pulgadas</option>
                                        </b-form-select>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="6" v-if="this.tertipocarga === 'h'">
                                    <label for="unMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>UN</label>
                                        <input class="form-control form-control-sm" v-model.trim="unMerc" type="text"/>
                                    </b-col>
                                    <b-col cols="6" v-if="this.tertipocarga === 'h'">
                                        <label for="classMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>CLASS</label>
                                        <input class="form-control form-control-sm" v-model.trim="classMerc" type="text"/>
                                    </b-col>
                                    <b-col v-if="this.tertipocarga === 'r'">
                                        <label for="gradosMerc" class="form-label">
                                        <b :style="'color: red;'">*</b>Grados</label>
                                        <input class="form-control form-control-sm" v-model.trim="gradosMerc" type="text"/>
                                    </b-col>
                                    <b-col v-if="this.tertipocarga === 'r'">
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
                                                <th scope="col">#</th>
                                                <th scope="col">Embalaje</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Estibable</th>
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
                                                    <th scope="row">{{ i + 1 }}</th>
                                                    <td>{{ paq.embalaje }}</td>
                                                    <td>{{ paq.cantidad }}</td>
                                                    <td>{{ paq.estibable }}</td>
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
                                                    <th :style="'border: 1px solid #edeff1; border-collapse: collapse;'">-</th>
                                                    <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                    <b-form-select id="embalaje" class="rounded custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terembalaje" @change="selectEmbalaje($event)">
                                                        <option v-for="emb in embalajes" :key="emb.idEmbalaje" v-bind:value="emb.idEmbalaje">
                                                        {{ emb.nombre.toUpperCase() }}
                                                        </option>
                                                    </b-form-select>
                                                    </td>
                                                    <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                        <input class="form-control form-control-sm" v-model.trim="cantMerc" type="number" @change="validaCantidad()"/>
                                                    </td>
                                                    <td :style="'border: 1px solid #edeff1; border-collapse: collapse;'">
                                                        <b-form-select id="estibable" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terestibable" @change="selectEstibable">
                                                            <option value="si">Si</option>
                                                            <option value="no">No</option>
                                                        </b-form-select>
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
                                                        <b-button v-if="termodalidad != 'LTL'" class="btn btn-sm" title="Agregar Paquete" @click="agregaPaquetesLTL()"><i class="fas fa-plus"></i></b-button>
                                                        <b-button v-else class="btn btn-sm" title="Agregar Paquete" @click="agregaPaquetesLTL()"><i class="fas fa-plus"></i></b-button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br />
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarMercancias()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" @click="validaMercancias()" :style="'background-color: #2aab5c;'"><b><i class="bx bx-list-plus" style="font-size: 15px;"></i> Cotizar</b></b-button>
                            </div>
                        </b-modal>
                        
                        <!--INICA HEADER LTL-->

                        <div class="_1n4EOSyAk1BfVWnF_adPB9" v-show="termodalidad == 'LTL'">
                            <div class="YkNOjSwN0S7IrLX5OK2Hc">
                                <div class="_2tU2wKoG7YY564aace37OF">
                                    <b style="color: red">*</b>Transporte
                                </div>
                                <div class="GDwblpm-PHJsqhSUenve5">
                                    <div class="_3wHay473hXYPOlphbqvMW6 _1pk_-C20zpknwxqZLn_t9z" ref="uno">
                                        <button style=" display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB1" @click="showOpcion(1)" title="Maritimo" disabled>
                                            <i class="bx bxs-ship fa-3x"></i>
                                        </button>
                                        <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB1">Maritimo</span>
                                    </div>
                                    <div class="_3wHay473hXYPOlphbqvMW6" ref="dos">
                                        <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB2" @click="showOpcion(2)" title="Terrestre">
                                            <i class="bx bxs-truck fa-3x"></i>
                                        </button>
                                        <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB2">Terrestre</span>
                                    </div>
                                    <div class="_3wHay473hXYPOlphbqvMW6" ref="tres">
                                        <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB3" @click="showOpcion(3)" title="Aereo" disabled>
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
                                    <div class="E5e3waHARVCVMF2JA93PS">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">
                                                    <img v-if="termodalidadImg != ''" :src="termodalidadImg" width="25" height="25"/>
                                                </span>
                                            </div>
                                            <b-form-select id="cargas" class="fecha" @change="selectModalidad($event)" v-model="termodalidad" disabled>
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
                                    <div class="_3vCdC7UlpoMI8zyS9070Tm">
                                        <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                            <i class="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                            <template>
                                            <v-autocomplete
                                                :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional', disabled:true}"
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
                                    
                                    <div class="_3vCdC7UlpoMI8zyS9070Tm">
                                        <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                            <i class="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                            <template>
                                            <v-autocomplete
                                                :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'destinoAdicional',  disabled:true}"
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
                
                            <div class="_3QlnruSL5VqOlp6mJEr4-Z">
                                <b-button class="zTDkSCFjS5VtNrkEzKtJ5" v-b-tooltip.hover="{ variant: 'success' }" variant="secondary" @click="inicio()" style="height: 100%">
                                    <i class="fe-refresh-ccw"></i>
                                </b-button>
                            </div>
                        </div>
              
                        <!--TERMINA HEADER LTL-->

                        <!--INICIO HEADER FTL-->

                        <div class="_1n4EOSyAk1BfVWnF_adPB9" v-show="termodalidad == 'FTL'">
                            <div class="YkNOjSwN0S7IrLX5OK2Hc">
                                <div class="_2tU2wKoG7YY564aace37OF">
                                    <b style="color: red">*</b>Transporte
                                </div>
                                <div class="GDwblpm-PHJsqhSUenve5">
                                    <div class="_3wHay473hXYPOlphbqvMW6 _1pk_-C20zpknwxqZLn_t9z" ref="uno">
                                    <button style=" display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB1" title="Maritimo" disabled>
                                        <i class="bx bxs-ship fa-3x"></i>
                                    </button>
                                    <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB1">Maritimo</span>
                                    </div>
                                    <div class="_3wHay473hXYPOlphbqvMW6" ref="dos">
                                    <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB2" title="Terrestre">
                                        <i class="bx bxs-truck fa-3x"></i>
                                    </button>
                                    <span class="BzbyxjDnil5GvbUe8_1qF" ref="textB2">Terrestre</span>
                                    </div>
                                    <div class="_3wHay473hXYPOlphbqvMW6" ref="tres">
                                    <button style="display: inline-block; background-color: #ffffff; color: #5a6268; height: 100%; border: 1px solid rgba(0, 0, 0, 0);" ref="fondoB3" title="Aereo" disabled>
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
                                    <div class="E5e3waHARVCVMF2JA93PS">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <img v-if="termodalidadImg != ''" :src="termodalidadImg" width="25" height="25"/>
                                        </span>
                                        </div>
                                        <b-form-select id="cargas" class="fecha" @change="selectModalidad($event)" v-model="termodalidad" disabled>
                                        <option v-for="option in optionsItemModalidad" :key="option.value" v-bind:value="option.value">
                                            {{ option.text }}
                                        </option>
                                        </b-form-select>
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
                        
                        <br>

                        <!--TERMINA HEADER FTL-->

                        <!-- SECUENCIA FIN -->
                        <!-- INICIO DESGLOSE LTL -->
                        <div v-if="termodalidad =='LTL'">
                        
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
                                            @change="addServicios(serv.id, serv.nameproduct)"
                                            style="font-size: 12px"
                                            :checked="serv.nameproduct == 'RECOLECCION' || serv.nameproduct == 'ENTREGA'"
                                        >
                                            <b style="font-weight: bold">{{ serv.nameproduct }}</b>
                                        </b-form-checkbox>
                                    </b-card>
                                </b-col>
                                <b-col>
                                    <b-card>
                                        <nav class="navbar navbar-light bg-white justify-content-between" style="border-bottom: 2px solid rgb(245, 244, 244); margin-top: -12px;">
                                            <div class="container">
                                                <div class="form-inline">
                                                    
                                                    <b-button pill v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" :style="'background-color: #2aab5c;'" size="sm"><b><i class="fe-refresh-ccw"></i> Divisa: USD</b></b-button>
                                                    <b-button pill v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" :style="'background-color: #2aab5c;'" size="sm"><b><i class="fe-refresh-ccw"></i> Divisa: MXN</b></b-button>
                                                </div>
                                                <i class="fe-truck" style="color: #2aab5c; font-size: 38px"></i>
                                                <div class="form-inline">
                                                    <!--b-button pill :style="'background-color: #2aab5c;'" :disabled="isActive" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal"-->
                                                    <b-button pill :style="'background-color: #2aab5c;'" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal" size="sm">
                                                        <b v-show="divisa == '1'">
                                                            <u>
                                                                <i class="fas fa-shopping-cart"></i> ${{ formatMoney(parseFloat(totalGlobal)) }} USD
                                                            </u>
                                                        </b>
                                                        <b v-show="divisa == '2'">
                                                            <u>
                                                                <i class="fas fa-shopping-cart"></i> ${{ formatMoney(parseFloat(totalGlobal)) }} MXN
                                                            </u>
                                                        </b>
                                                    </b-button>
                                                </div>
                                            </div>
                                        </nav>

                                        <b-row>
                                            <div class="col-md-12 cards">
                                                <div class="">
                                                    <div class="row py-2" style="margin-bottom: -20px" v-if=" arrayOrigen.length > 0 && arrayDestino.length > 0">
                                                        <div class="col-md-4">
                                                            <p class="text-left" style="font-size: 12px; font-weight: bold">
                                                                {{ arrayOrigen[0].estado.toUpperCase() }},
                                                                {{ arrayOrigen[0].ciudad.toUpperCase() }}
                                                            </p>
                                                        </div>
                                                        <div class="col-md-4"></div>
                                                        <div class="col-md-4">
                                                            <p class="text-right" style="font-size: 12px; font-weight: bold">
                                                                {{ arrayDestino[0].estado.toUpperCase() }},
                                                                {{ arrayDestino[0].ciudad.toUpperCase() }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!-- Dias de Transito -->
                                                    <div class="row mb-2">
                                                        <div class="col-md-12 text-center">
                                                            <label for="" class="text-center" v-if="kilometraje > 0">{{ kilometraje }} km</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-between top">
                                                    <!--div class="row d-flex icon-content">
                                                        <img class="icon" src="https://i.imgur.com/9nnc9Et.png">
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold">Order<br>Processed</p>
                                                        </div>
                                                    </div-->
                                                    <div v-if="progresbarRecoleccion" class="row d-flex icon-content">
                                                        <img class="icon" src="/img/activoRecoleccion.png">
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold">Recolección de <br>Mercancías</p>
                                                        </div>
                                                    </div>
                                                    <div v-else class="row d-flex icon-content">
                                                        <img class="icon" src="/img/noActivoRecoleccion.png">
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold">Recolección de <br>Mercancías</p>
                                                        </div>
                                                    </div>
                                                    <div v-if="progresbarFlete" class="row d-flex icon-content">
                                                        <img class="icon" src="/img/activoFlete.png">
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold">Flete<br>Nacional</p>
                                                        </div>
                                                    </div>
                                                    <div v-else class="row d-flex icon-content">
                                                        <img class="icon" src="/img/noActivoFlete.png">
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold">Flete<br>Nacional</p>
                                                        </div>
                                                    </div>
                                                    <div v-if="tipoEnvioDetalleSi">
                                                        <div v-if="progresbarIngreso " class="row d-flex icon-content">
                                                            <img class="icon" src="/img/activoEntrega.png">
                                                            <div class="d-flex flex-column">
                                                                <p class="font-weight-bold">Ingreso a <br>Aduana</p>
                                                            </div>
                                                        </div>
                                                        <div v-else class="row d-flex icon-content">
                                                            <img class="icon" src="/img/noActivoEntrega.png">
                                                            <div class="d-flex flex-column">
                                                                <p class="font-weight-bold">Ingreso a <br>Aduana</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="progresbarEntrega " class="row d-flex icon-content">
                                                            <img class="icon" src="/img/activoEntrega.png">
                                                            <div class="d-flex flex-column">
                                                                <p class="font-weight-bold">Entrega de <br>Mercancías</p>
                                                            </div>
                                                        </div>
                                                        <div v-else class="row d-flex icon-content">
                                                            <img class="icon" src="/img/noActivoEntrega.png">
                                                            <div class="d-flex flex-column">
                                                                <p class="font-weight-bold">Entrega de <br>Mercancías</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Add class 'active' to progress -->
                                                <div class="row d-flex justify-content-center">
                                                    <div class="col-12">
                                                        <ul id="progressbar" class="text-center">
                                                            <!--li class="active step0"></li>
                                                            <li class="active step0"></li>
                                                            <li class="active step0"></li>
                                                            <li class="step0"></li>
                                                            <li v-if="progresbarRecoleccion" class="active step0"></li>
                                                            <li v-else class="step0"></li-->

                                                            <li v-if="progresbarRecoleccion" class="active step0"></li>
                                                            <li v-else class="step0"></li>
                                                            <li v-if="progresbarFlete" class="active step0"></li>
                                                            <li v-else class="step0"></li>
                                                            <li v-if="tipoEnvioDetalleSi && progresbarIngreso || tipoEnvioDetalleNo && progresbarEntrega" class="active step0"></li>
                                                            <li v-else-if="!tipoEnvioDetalleSi && !progresbarIngreso || !tipoEnvioDetalleNo && !progresbarEntrega" class="step0"></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-row>
                                        <b-row>
                                            <b-col md="12">
                                                <div class="justify-content-center row">
                                                    <b-button variant="link" size="sm" @click="showDetails()"><b>Detalles</b></b-button>
                                                </div>
                                                <div class="row mb-1" style="border-top: 2px solid #f5f4f4" v-show="details == 1" v-for="servic in confirmarServices" :key="servic.idService" v-bind:value="servic.idService">
                                                    <div class="col-md-6 text-left">
                                                        {{ servic.nombreSer }}
                                                    </div>
                                                    <div class="col-md-6 text-right" v-if="divisa == 2">
                                                        <b>
                                                        $ {{ formatMoney(servic.totalServicio) }} MXN 
                                                        </b>
                                                    </div>
                                                    <div class="col-md-6 text-right" v-else>
                                                        <b>$ {{formatMoney(servic.totalServicio / valorDolar)}} USD</b>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>

                                    </b-card>
                                </b-col>
                                <b-col md="2" v-show="avisos.length > 0">
                                    

                                </b-col>

                            </b-row>
                        </div>
                        <!-- FIN DESGLOSE LTL -->

                        <!-- INICIO DESGLOSE FTL -->
                        <div  class="col-md-12" v-if="termodalidad =='FTL'">
                            <b-card class="rounded">
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
                                                        <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                            <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                <i class="fas fa-map-marker-alt"></i>
                                                            </div>
                                                            <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                <template>
                                                                    <v-autocomplete
                                                                        :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional',}"
                                                                        input-class="segundo-input-istyle-input"
                                                                        :items="dates_search_address"
                                                                        :v-model="origen"
                                                                        :value="origen"
                                                                        @input="getLabelAddressOFTL"
                                                                        :component-item="templateAddress"
                                                                        @update-items="buscaDireccion"
                                                                        :auto-select-one-item="false"
                                                                        return-object
                                                                    >
                                                                    </v-autocomplete>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <div v-if="arrayOrigen.length == 0">
                                                    <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados <b-badge> ({{ arrayOrigen.length }})  </b-badge></b-button>
                                                    <b-collapse id="origenes">
                                                        <b-list-group>
                                                            <b-list-group-item class="d-flex justify-content-between align-items-center"> Aun no tienes origenes agregados. </b-list-group-item>
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
                                                                <tr v-for="origenes in arrayOrigen" class="text-center">
                                                                    <th class="text-wrap">
                                                                        <p v-if="origenes.nombre_corto != ''" class="text-wrap">{{ origenes.text_largo}}</p>
                                                                        <p v-else class="text-wrap">{{ origenes.text_largo}}</p>
                                                                    </th>
                                                                    <td class="text-wrap">
                                                                        <b-button v-if="origenes.estatus_quitar == 1" @click="eliminaOrigenArray(origenes.idOrigen,3)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
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
                                                        <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                            <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                <i class="fas fa-map-marker-alt"></i>
                                                            </div>
                                                            <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                <template>
                                                                    <v-autocomplete
                                                                        :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'destinoAdicional',}"
                                                                        input-class="segundo-input-istyle-input"
                                                                        :items="dates_search_address"
                                                                        :v-model="destino"
                                                                        :value="destino"
                                                                        @input="getLabelAddressDFTL"
                                                                        :component-item="templateAddress"
                                                                        @update-items="buscaDireccion"
                                                                        :auto-select-one-item="false"
                                                                        return-object
                                                                    >
                                                                    </v-autocomplete>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <div v-if="arrayDestino.length == 0">
                                                    <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados <b-badge> ({{ arrayDestino.length }}) </b-badge></b-button>
                                                    <b-collapse id="destinos">
                                                        <b-list-group>
                                                            <b-list-group-item class="d-flex justify-content-between align-items-center">Aun no tienes destinos agregados.</b-list-group-item>
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
                                                                        <b-button v-if="destinos.estatus_quitar == 1" @click="eliminaDestinoArray(destinos.idOrigen,3)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
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
                                </div>
                                <b-row>
                                    <b-col md="10">
                                        <br>
                                        <b-table hover :items="items_table" :fields="fields_table" select-mode="multi" responsive ref="selectableTable" selectable @row-selected="selecciona_registro_cotizacion" thead-class="bg-primary text-white">
                                            <template #thead-top="data">
                                                <b-tr>
                                                    <b-th></b-th>
                                                    <b-th colspan="2" :style="'text-align:center;'" >Ruta</b-th>
                                                    <b-th :colspan="colspan" :style="'text-align:center;'">Detalles del Servicio</b-th>
                                                </b-tr>
                                            </template>
                                            <template #cell(check-dinamic)="{ rowSelected }">
                                                <template v-if="rowSelected">
                                                    <i class="fas fa-check-square text-primary"></i>
                                                </template>

                                            </template>
                                            <template v-for="un in fields_table" v-slot:[`cell(${un.code_name})`]="data" >                                               
                                                <span v-if="un.key === 'nissan'">{{ parseFloat(data.item.nissan) }}</span>
                                                <span v-else-if="un.key === 'camioneta_3_5'">{{ parseFloat(data.item.camioneta_3_5) }}</span>
                                                <span v-else-if="un.key === 'rabon'">{{ parseFloat(data.item.rabon) }}</span>
                                                <span v-else-if="un.key === 'torton'">{{ parseFloat(data.item.torton) }}</span>
                                                <span v-else-if="un.key === 'caja_48'">{{ parseFloat(data.item.caja_48) }}</span>
                                                <span v-else-if="un.key === 'caja_53'">{{ parseFloat(data.item.caja_53) }}</span>
                                            </template>
                                             
                                        </b-table>
                                        <p>
                                            <b-button size="sm" variant="primary" @click="selecciona_todas_cotizaciones">Seleccionar Todo</b-button>
                                            <b-button size="sm" variant="primary" @click="limpiar_todas_cotizaciones">Limpiar Todo</b-button>
                                        </p>
                                        <!--p>
                                            Cotizacion Seleccionada:<br>
                                            {{ select_cotizaciones }}
                                        </p-->
                                    </b-col>
                                    <b-col md="2" class="text-center">
                                        <label>Selecciona Unidad/es</label>
                                        <multiselect v-model="unidades_ftl" tag-placeholder="Selecciona una o mas unidades" placeholder="Selecciona una o mas unidades" label="nombreUnidad" track-by="idUnidad" :options="options_unit" :multiple="true" :taggable="true" :close-on-select="false" @tag="addUnidadLTLTag" @input="generateCotizacionFTL(1)"></multiselect>
                                        <br>
                                        <div class="col-sm-12">
                                        <label for="" style="font-size: 12px; font-weight: bold">SERVICIOS</label>
                                        <b-form-checkbox
                                            name="listadoServiciosFTL"
                                            v-bind:id="serv.id + 'cheServiciosFTL'"
                                            v-model="selectServices"
                                            v-for="serv in services"
                                            :key="serv.id"
                                            v-bind:value="serv.id"
                                            :disabled="serv.nameproduct == 'FLETE NACIONAL'"
                                            @change="addServiciosFTL(serv.id, serv.nameproduct)"
                                            style="font-size: 12px; text-align: left;"
                                            :checked="serv.nameproduct == 'RECOLECCION' || serv.nameproduct == 'ENTREGA'"
                                            >
                                            <b style="font-weight: bold">{{ serv.nameproduct }}</b>
                                        </b-form-checkbox>
                                        </div>
                                        <br>
                                        <b-button class="width-md ml-1" size="sm" variant="primary" @click="verResumenFTL"><b><i class="fas fa-file"></i> Ver Resumen</b></b-button>
                                        <!--b-button class="width-md ml-1" size="sm" variant="primary" @click="generarPDFLTL()"><b><i class="fas fa-file"></i> PDF</b></b-button-->
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>

                        <!-- FIN DESGLOSE LTL -->

                        <!-- INICIO RESUMEN SERVICIO -->

                        <b-modal id="resumen-modal" hide-header hide-footer title="INFORMACION GENERAL" title-class="font-18" dialog-class="modal-xl" no-close-on-esc no-close-on-backdrop>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <b-container class="bv-example-row" style="background-color: #ffffff">
                                            <b-row style=" border-color: #2aab5c; border-width: 1px; border-bottom-style: solid;">
                                                <b-col cols="2" style="border-color: #2aab5c; border-width: 3px; border-bottom-style: solid;">
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
                                                        <b style="font-weight: bold; color: #2aab5c;">COTIZACIÓN</b>
                                                        <br />
                                                        <b style="font-weight: bold; color: #000000;">FOLIO ID:</b>
                                                        <br />
                                                        <b style=" font-weight: bold; color: #000000;">{{ controlConse + fechaConsecutivo + String(numConsecutivo + 1).padStart(6,"0") }}</b>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <br />
                                            <b-row class="p-1" style=" background-color: #056736; color: #ffffff;">
                                                <b-col class="text-left">
                                                    <label :style="'color: #ffffff;'">INFORMACIÓN GENERAL</label>
                                                </b-col>
                                                <b-col class="text-right">Ciudad de México a {{ fechaFormato }}</b-col>
                                            </b-row>
                                            <b-row class="text-left p-2" style="font-size: 12px;">
                                                <b-col md="6">
                                                    <label style="font-size: 11px">ORIGEN: </label> <p  v-for="or in arrayOrigen"> {{ or.pais.toUpperCase() }}, {{ or.estado.toUpperCase() }}, {{ or.ciudad.toUpperCase() }},{{ or.colonia.toUpperCase() }}, {{ or.cp }} </p>
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">DESTINO:</label> <p v-for="de in arrayDestino"> {{ de.pais.toUpperCase() }}, {{ de.estado.toUpperCase() }}, {{ de.ciudad.toUpperCase() }},{{ de.colonia.toUpperCase() }}, {{ de.cp }}</p>
                                                </b-col>
                                                <!--b-col md="6" v-if="ocurreO">
                                                    <label style="font-size: 11px">OFICINA ORIGEN: </label> {{ almacenO }}
                                                </b-col>
                                                <b-col md="6" v-if="ocurreD">
                                                    <label style="font-size: 11px">OFICINA DESTINO:</label> {{ almacenD }}
                                                </b-col-->
                                                <b-col md="6">
                                                    <label style="font-size: 11px">TIPO DE SERVICIO: </label> RECOLECCIÓN
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">TIPO DE SERVICIO: </label> ENTREGRA
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">TIPO DE OPERACION: </label> {{ termodalidad.toUpperCase() }}
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">SERVICIO: </label> {{ tipoOpcion }}
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">TIPO DE ENVIO: </label> {{ tipoEnvio }}
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">USUARIO QUE GENERA: </label> {{ username }}
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">FRECUENCIAS: </label>
                                                    <table style="width: 50%; border: 1px solid #EBEBEB;">
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
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">FRECUENCIAS: </label>
                                                    <table style="width: 50%; border: 1px solid #EBEBEB;">
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
                                                </b-col>
                                                <b-col md="6">
                                                    <label style="font-size: 11px">FECHA DE COTIZACIÓN: </label> {{ terfecha }}
                                                </b-col>
                                                <b-col md="6">
                                                    <div class="col-md-12 text-center">
                                                        <b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" :style="'background-color: #2aab5c;'" size="sm">Divisa: USD</b-button>
                                                        <b-button v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" :style="'background-color: #2aab5c;'" size="sm">Divisa: MXN</b-button>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                    
                                            <b-row class="p-1" :style="'background-color: #056736; color: #ffffff;'">
                                                <b-col class="text-left">
                                                    <label :style="'color: #ffffff;'">MERCANCIAS</label>
                                                </b-col>
                                            </b-row>
                                            <div class="col-md-12" style="font-size: 12px;">
                                                <b-row class="alert alert-light">
                                                    <b-col sm="2"><b>CANTIDAD PIEZAS:</b> {{ totalCantidad }}</b-col>
                                                    <b-col sm="2"><b>VOLUMEN:</b> {{ formatMoney(totalVolumen) }}<sub>m<sup>3</sup></sub></b-col>
                                                    <b-col sm="2"><b>PESO REAL:</b> {{ formatMoney(totalPesoReal) }}<sub>kg</sub></b-col>
                                                    <b-col sm="2"><b>PESO FACTURADO:</b> {{ formatMoney(totalPesoFaturado) }}<sub>kg</sub></b-col>
                                                    <b-col sm="2"><b>MERCANCIAS:</b> {{ clasifica }}</b-col>
                                                    <b-col sm="2"><b>DESCRIPCION DE MERCANCIAS:</b> {{ descripMerc }}</b-col>
                                                </b-row>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group row mb-0">
                                                    <div class="table-responsive">
                                                        <table class="table table-sm mb-0" width="100%" v-if="agregarMercancias.length > 0">
                                                            <thead>
                                                                <tr>
                                                                    <th :style="'text-align: center;'">CANTIDAD</th>
                                                                    <th :style="'text-align: center;'">EMBALAJE</th>
                                                                    <th :style="'text-align: center;'">LARGO</th>
                                                                    <th :style="'text-align: center;'">ANCHO</th>
                                                                    <th :style="'text-align: center;'">ALTO</th>
                                                                    <th :style="'text-align: center;'">PESO </th>
                                                                    <th :style="'text-align: center;'" v-if="stops">RUTA ASIGNADA</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="merc in agregarMercancias" v-bind:key="merc.idPaq" >
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.cantidad }}
                                                                    </td>
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.embalaje }}
                                                                    </td>
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.largo }}
                                                                    </td>
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.ancho }}
                                                                    </td>
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.alto }}
                                                                    </td>
                                                                    <td :style="'text-align: center;'">
                                                                        {{ merc.peso }}<sub>{{ merc.upeso }}</sub>
                                                                    </td>
                                                                    <td v-if="stops">{{ merc.ruta }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <p v-else>Sin Mercancias</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <b-row class="p-1" style="background-color: #056736;color: #ffffff;" v-if="termodalidad == 'LTL'">
                                                <b-col class="text-left">
                                                    <label :style="'color: #ffffff;'">PAQUETES</label>
                                                </b-col>
                                                <b-col></b-col>
                                                <b-col></b-col>
                                            </b-row>
                                            <div v-if="termodalidad == 'LTL'">
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
                                                                    {{ price.price.toFixed(2) }}
                                                                    <span>/ {{ price.divisa }}</span>
                                                                </h2>
                                                                <ul class="card-pricing-features">
                                                                    <li>INCLUYE: {{ price.services }}</li>
                                                                    <li>{{ price.bandwidth }}</li>
                                                                    <li>{{ price.domain }}</li>
                                                                    <li>{{ price.user }}</li>
                                                                    <li>Soporte vía Correo</li>
                                                                    <li>Monitoreo de unidades 24 horas, los 7 días de la semana.</li>
                                                                </ul>
                                                                <button v-if="price.seleccionado == 1" class="btn mt-4 btn-block btn-secondary" :class="{ 'btn-danger': `${price.ribbon}` === 'Más Vendido' }">
                                                                    <i class="fe-check"></i> Servicio Cotizado
                                                                </button>
                                                                <button v-else class="btn mt-4 btn-block btn-secondary" :class="{ 'btn-danger': `${price.ribbon}` === 'Más Vendido' }" @click="elegirPaquete(price.idPlan)">
                                                                    Elegir Paquete
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <!-- end Pricing_card -->
                                                    </div>
                                                    <!-- end col -->
                                                </div>
                                            </div>
                                
                                            <b-row class="p-1" style=" background-color: #056736; color: #ffffff;">
                                                <b-col class="text-left">
                                                    <label :style="'color: #ffffff;'">SERVICIOS</label>
                                                </b-col>
                                                <b-col cols="5"></b-col>
                                                <b-col></b-col>
                                            </b-row>
                                            <!-- Inicio else -->
                                            <div class="col-md-12" style="font-size: 12px;" v-if="termodalidad == 'LTL'">
                                                <div class="form-group row mb-0">
                                                    <div class="table-responsive">
                                                        <table class="table table-sm mb-0" width="100%" v-if="confirmarServices.length > 0">
                                                            <thead>
                                                                <tr>
                                                                    <th>CONCEPTO</th>
                                                                    <th>SUBTOTAL</th>
                                                                    <th>IVA</th>
                                                                    <th>TOTAL</th>
                                                                    <th v-if="admin">AJUSTE DE VENTA</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody v-if="divisa == 2">
                                                                <tr v-for="servicios in confirmarServices" v-bind:key="servicios.idService" >
                                                                    <td style="text-right"> {{ servicios.nombreSer }} </td>
                                                                    <td style="text-right"> ${{ formatMoney(servicios.subtotal + servicios.porcAumento) }}<sub>MXN</sub></td>
                                                                    <td style="text-right"> ${{ formatMoney(servicios.porcIva) }}<sub>MXN</sub></td>
                                                                    <td style="text-right"> ${{ formatMoney(servicios.totalServicio + servicios.porcAumento) }}<sub>MXN</sub></td>
                                                                    <td align="center" v-if="servicios.subtotal != 0 && admin">
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
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <tbody v-else>
                                                                <tr v-for="servicios in confirmarServices" v-bind:key="servicios.idService">
                                                                    <td style="text-right"> {{ servicios.nombreSer }} </td>
                                                                    <td style="text-right"> ${{ formatMoney((servicios.subtotal + servicios.porcAumento) / valorDolar) }}<sub>USD</sub> </td>
                                                                    <td style="text-right"> ${{ formatMoney(servicios.porcIva / valorDolar) }}<sub>USD</sub> </td>
                                                                    <td style="text-right"> ${{ formatMoney((servicios.totalServicio + servicios.porcAumento) / valorDolar) }}<sub>USD</sub> </td>
                                                                    <td align="center" v-if="servicios.subtotal != 0 && admin">
                                                                        <input class="form-control-input" type="checkbox" v-bind:id="servicios.idService + 'check'" :key="servicios.idService" v-model="serviciosResumen" v-bind:value="servicios.idService" @change="mostrarImpuesto(servicios.idService)"/>
                                                                    </td>
                                                                    <td align="center" v-else>
                                                                        <p>En Proceso de Cotización</p>
                                                                    </td>
                                                                    <td v-if="admin">
                                                                        <select hidden v-bind:id="servicios.idService + 'seleccionImpuesto'" class="form-control-sm" @change="sumaImpuesto($event, servicios.idService)">
                                                                            <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.id === 0">
                                                                                {{ opc.value }}%
                                                                            </option>
                                                                        </select>
                                                                        <input hidden value="0" v-bind:id="servicios.idService + 'escondeImpuesto'"/>
                                                                    </td>
                                                                    <td v-if="admin">
                                                                        <input hidden placeholder="Total" class="form-control text-center" type="text" value="0" v-bind:id="servicios.idService + 'sumaTotal'" readonly/>
                                                                        <input hidden value="0" v-bind:id="servicios.idService + 'impuestoOculto'"/>
                                                                        <input hidden value="0" v-bind:id="servicios.idService + 'ocultarSumaTotal'"/>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td></td>
                                                                    <td v-if="admin"></td>
                                                                    <td v-if="admin"></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td colspan="2" :style="'text-align: right;'">
                                                                    <p v-if="divisa == 2">
                                                                        <b>SUBTOTAL:</b>
                                                                        ${{ formatMoney(parseFloat(totalSubtotalGlobal)) }}<sub>MXN</sub>
                                                                    </p>
                                                                    <p v-else>
                                                                        <b>SUBTOTAL:</b>
                                                                        ${{ formatMoney(parseFloat(totalSubtotalGlobal)) }}<sub>USD</sub>
                                                                    </p>
                                                                    <p v-if="divisa == 2">
                                                                        <b>I.V.A.:</b>
                                                                        ${{ formatMoney(parseFloat(totalIvaGlobal)) }}<sub>MXN</sub>
                                                                    </p>
                                                                    <p v-else>
                                                                        <b>I.V.A.:</b>
                                                                        ${{ formatMoney(parseFloat(totalIvaGlobal)) }}<sub>USD</sub>
                                                                    </p>
                                                                    <p v-if="divisa == 2">
                                                                        <b>TOTAL:</b>
                                                                        ${{ formatMoney(parseFloat(totalGlobal)) }}<sub>MXN</sub>
                                                                    </p>
                                                                    <p v-else>
                                                                        <b>TOTAL:</b>
                                                                        ${{ formatMoney(parseFloat(totalGlobal)) }}<sub>USD</sub>
                                                                    </p>
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                        <p v-else>Sin Servicios</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12" :style="'font-size: 12px;'" v-else>
                                                <div class="form-group row mb-0">
                                                    <b-table :items="items_table" :fields="fields_table" responsive thead-class="bg-primary text-white">
                                                        <template #thead-top="data">
                                                            <b-tr>
                                                                <b-th colspan="2" :style="'text-align:center;'" >Ruta</b-th>
                                                                <b-th :colspan="colspan" :style="'text-align:center;'">Detalles del Servicio</b-th>
                                                            </b-tr>
                                                        </template>
                                                    </b-table>
                                                </div>
                                            </div>
                                            <b-row class="p-1" :style="'background-color: #056736; color: #ffffff;'" v-if="termodalidad == 'FTL'">
                                                <b-col class="text-left">
                                                    <label :style="'color: #ffffff;'">SERVICIOS ADICIONALES</label>
                                                </b-col>
                                                <b-col cols="5"></b-col>
                                                <b-col></b-col>
                                            </b-row>
                                            <b-row v-if="termodalidad == 'FTL'">
                                                <b-col md="12">
                                                    <table class="table table-sm mb-0" width="100%" v-if="adicionalesFTL.length > 0">
                                                        <thead>
                                                            <tr>
                                                            <th :style="'text-align: center;'">Servicio</th>
                                                            <th :style="'text-align: center;'">Detalle</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="serv in adicionalesFTL" v-bind:key="serv.idServicio" >
                                                            <td :style="'text-align: center;'">
                                                                {{ serv.nombreServicio }}
                                                            </td>
                                                            <td :style="'text-align: center;'">
                                                                El precio del servicio adicional ya va incluido en precio mostrado en la seccion de Servicios.
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p v-else>Sin servicios adicionales</p>
                                                </b-col>
                                            </b-row>
                                        </b-container>    
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-right mt-3">
                                <b-button class="width-md ml-1" variant="secondary" @click="hideResumen()">Cerrar</b-button>
                                <b-button v-if="existeCotizacion && termodalidad == 'LTL'" class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="validaInfoConfirma()">Quiero el Servicio!</b-button>
                                <b-button v-else-if="existeCotizacion && termodalidad == 'FTL'" class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="contactoFTL()">Quiero el Servicio!</b-button>
                            </div>
                        </b-modal>

                        <!-- FIN RESUMEN SERVICIO -->

                        <!-- INICIO MODAL SEGURO -->

                        <b-modal id="valorDeclaradoMercancia" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                            <template #modal-title>
                                <b><i class="fe-info"></i> Aviso Mercancia</b>
                            </template>
                            <div class="form-group text-center">
                                <label for="gradosMerc" class="form-label">Valor declarado de la mercancía</label>
                                <input class="form-control form-control-sm" v-model.trim="valorMercancia" type="number" @change="validaValorMercancia($event)"/>
                                <br />
                                <b-button class="width-md ml-1" variant="secondary" @click="cierraModal(2)"><b><i class="fe-x"></i>Cancelar</b></b-button>
                                <b-button v-if="termodalidad == 'LTL'" class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="addServicios(2, 'SEGURO')"><b><i class="fe-check"></i> Guardar</b></b-button>
                                <b-button v-if="termodalidad == 'FTL'" class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="addServiciosFTL(2, 'SEGURO')"><b><i class="fe-check"></i> Guardar</b></b-button>
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

                        <!-- FIN MODAL SEGURO -->

                        <!-- INICIO MODAL MANIOBRAS PENDIENTE DE USO-->

                        <b-modal id="maniobrasInfo" no-close-on-esc no-close-on-backdrop hide-footer centered hide-close>
                            <template #modal-title>
                                <b><i class="fe-info"></i> Aviso Maniobras</b>
                            </template>
                            <div class="form-group text-center">
                                <label for="gradosMerc" class="form-label">Este servicio requiere ser revisado por un agente, enseguida lo enlazamos.</label>
                                <br />
                                <b-button class="width-md ml-1" variant="secondary" @click="cierraModalManiobras()"><b><i class="fe-x"></i>Cancelar</b></b-button>
                                <b-button class="width-md ml-1" :style="'background-color: #2aab5c;'" @click="cierraModalManiobras()"><b><i class="fe-check"></i> Aceptar</b></b-button>
                            </div>
                        </b-modal>
                        <!-- FIN MODAL MANIOBRAS PENDIENTE DE USO-->

                        <!-- INICIO ULTIMO FLUJO -->

                        <b-modal id="validaConfirmacionOD"  hide-footer centered hide-close size="lg">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Confirma los datos de Origen</b>
                            </template>
                            <div class="form-group text-center">  
                                <b-row>
                                    <div class="card-body" :style="'padding: 10px;'">
                                        <div class="primer-style">
                                            <b-row>
                                                <b-col>
                                                    <div class="segundo-style">
                                                        <div class="tercer-style">
                                                            <div class="tercer-label-style">
                                                                <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                <b :style="'color: red;'">*</b> Origen
                                                                </div>
                                                            </div>
                                                            <div class="primer-input-style">
                                                                <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-map-marker-alt"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <v-autocomplete
                                                                                :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional',}"
                                                                                input-class="segundo-input-istyle-input"
                                                                                :items="dates_search_address"
                                                                                :v-model="origen"
                                                                                :value="origen"
                                                                                @input="getLabelAddressOCon"
                                                                                :component-item="templateAddress"
                                                                                @update-items="buscaDireccion"
                                                                                :auto-select-one-item="false"
                                                                                return-object
                                                                            >
                                                                            </v-autocomplete>
                                                                        </template>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div v-if="arrayOrigen.length == 0">
                                                            <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados <b-badge> ({{ arrayOrigen.length }})  </b-badge></b-button>
                                                            <b-collapse id="origenes">
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
                                                                                <p v-if="origenes.nombre_corto != ''" class="text-wrap">{{ origenes.text_largo}}</p>
                                                                                <p v-else class="text-wrap">{{ origenes.text_largo}}</p>
                                                                            </th>
                                                                            <td class="text-wrap">
                                                                                <b-button v-if="origenes.estatus_quitar == 1" @click="eliminaOrigenArrayConf(origenes.idOrigen)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
                                                                                <b-button v-else size="sm" variant="danger"> Sin Acción </b-button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </b-collapse>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <div>
                                                        <b-row>
                                                            <b-col sm="6">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    <b :style="'color: red;'">*</b> Calle
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-road"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <input class="segundo-input-istyle-input" v-model.trim="calleOrigen" type="text" placeholder="Calle"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </b-col>
                                                            <b-col sm="6">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    <b :style="'color: red;'">*</b> Número Exterior
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-hashtag"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                        <input class="segundo-input-istyle-input" v-model.trim="numExtOrigen" type="text" placeholder="Número Exterior"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </b-col>
                                                            <b-col md="12">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    Número Interior
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-hashtag"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                        <input class="segundo-input-istyle-input" v-model.trim="numIntOrigen" type="text" placeholder="Número Interior"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </b-col>
                                                        </b-row>
                                                    </div>
                                                </b-col>
                                                <b-col >
                                                    <div class="segundo-style">
                                                        <div class="tercer-style">
                                                            <div class="tercer-label-style">
                                                                <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                <b :style="'color: red;'">*</b> Destino
                                                                </div>
                                                            </div>
                                                            <div class="primer-input-style">
                                                                <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-map-marker-alt"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <v-autocomplete
                                                                                :input-attrs="{autocomplete: 'off', placeholder: 'Pais, Estado, Ciudad, CP', id: 'destinoAdicional',}"
                                                                                input-class="segundo-input-istyle-input"
                                                                                :items="dates_search_address"
                                                                                :v-model="destino"
                                                                                :value="destino"
                                                                                @input="getLabelAddressDCon"
                                                                                :component-item="templateAddress"
                                                                                @update-items="buscaDireccion"
                                                                                :auto-select-one-item="false"
                                                                                return-object
                                                                            >
                                                                            </v-autocomplete>
                                                                        </template>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div v-if="arrayDestino.length == 0">
                                                            <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados <b-badge> ({{ arrayDestino.length }}) </b-badge></b-button>
                                                            <b-collapse id="destinos">
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
                                                                                <b-button v-if="destinos.estatus_quitar == 1" @click="eliminaDestinoArrayConf(destinos.idOrigen)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
                                                                                <b-button v-else size="sm" variant="danger">Sin Acción</b-button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </b-collapse>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <div>
                                                        <b-row>
                                                            <b-col sm="6">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    <b :style="'color: red;'">*</b> Calle
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-road"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <input class="segundo-input-istyle-input" v-model.trim="calleDestino" type="text" placeholder="Calle"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </b-col>
                                                            <b-col sm="6">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    <b :style="'color: red;'">*</b> Número Exterior
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-hashtag"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <input class="segundo-input-istyle-input" v-model.trim="numExtDestino" type="text" placeholder="Número Exterior"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </b-col>
                                                            <b-col md="12">
                                                                <div class="tercer-label-style">
                                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                                    Número Interior
                                                                    </div>
                                                                </div>
                                                                <div class="primer-input-style">
                                                                    <div class="segundo-input-style" :style="'width: 100% !important; border-radius: 10px !important;'">
                                                                    <div class="segundo-input-icon-style" :style="'color: #2aab5c;'">
                                                                        <i class="fas fa-hashtag"></i>
                                                                    </div>
                                                                    <div class="segundo-input-input-style segundo-input-input-input-style">
                                                                        <template>
                                                                            <input class="segundo-input-istyle-input" v-model.trim="numIntDestino" type="text" placeholder="Número Interior"/>
                                                                        </template>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </b-col>
                                                        </b-row>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <br>
                                            <b-row>
                                                <b-col md="12" sm="12">
                                                    <br>
                                                    <div id="mapaRutasConfirma" v-show="mostrarMapaConfirma"></div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <!--Fin Terrestre-->
                                        
                                    </div>
                                </b-row>
                                <br />
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarOD()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" :style="'background-color: #2aab5c;'" @click="validacionConfirmacionOD()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
                            </div>
                        </b-modal>

                        <b-modal id="datosContacto"  hide-footer centered hide-close size="lg">
                            <template #modal-title>
                                <b><i class="fe-info"></i> Confirma los datos de Contacto</b>
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
                                                        <b :style="'color: red;'">*</b> E-mail
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
                                                        <b :style="'color: red;'">*</b> Teléfono
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
                                                                <b-textarea class="segundo-input-istyle-input" v-model="contacDescription" placeholder="DESCRIPCION DEL PRODUCTO"></b-textarea>
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
                                <b><i class="fe-info"></i> Cliente</b>
                            </template>

                            <div class="form-group text-center">
                                <div class="card-body" :style="'padding: 10px;'">
                                    <div class="primer-style">
                                        <b-row>
                                            <b-col md="12">
                                                <div class="tercer-label-style">
                                                    <div class="tercer-label-style-label text-wrap" :style="'text-align:left; font-size:15px;'">
                                                        <b :style="'color: red;'">*</b> ¿Eres cliente registrado?
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
                                                                <sub>*Si eres Cliente registrado Interland, ingresa tu RFC.</sub>
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
    .step-bar {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #f0f0f0;
        border-radius: 10px;
    }

    .step-section {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .step-origin {
        background-color: #4caf50; /* Color de la sección de origen */
    }

    .step-destination {
        background-color: #ff5722; /* Color de la sección de destino */
    }

    .step-label {
        font-size: 16px;
        color: white;
        font-weight: bold;
        text-align: center;
    }

    .progress-line {
        width: 5px;
        height: 100%;
        background-color: #000;
    }

    /* FIN ESTILOS BARSTEPS */
</style>