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

            /*V ID Cotizacion */
            idConsecutivo: 0,
            numConsecutivo: 0,
            controlConse: "",
            fechaConsecutivo: "",
            fConse: "",

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

            /* V Mapa Origen Destino */
            mostrarMapa: false,

            /* V Tipo Comercio */
            comercio: "",

            /* V Tipo Comercio Ubicacion */
            comercioUbicacion: "",

            /* V Unidades */
            units: [],
            unidadesSeleccion: [],

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

            /* V Servicios */
            selectServices: [1],
            services: [],
            confirmarServices: [],
            
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
        }
    },
    created() {
        this.getFolioCon();
        this.dataSess();
        this.getUnidadBox("g");
        this.getEmbalaje();
        this.getServicios();

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

                /*this.$refs.uno.style.background = "#2aab5c";
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
                this.$refs.textB3.style.color = "#9fb1c1";*/
            } else if (val == 2) {
                this.tipoOpcion = "Terrestre";
                this.fondoBusqueda = "success";
                this.fondoEtiquetas = "success";
                this.opcion = 2;

                /*this.terstatusdir1 = 1;
                this.action = 1;
                this.terMostrar = 1;
                this.terstatusdir1 = "true";
                this.modoEnvio = "Directo";
                this.terstatusmul = "false";
                this.terstatusdir2 = "false";
                this.terstatustras1 = "false";
                this.terstatusdir3 = "false";
                this.terstatustras2 = "false";*/

                /*this.$refs.uno.style.background = "#ffffff";
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
                this.$refs.textB3.style.color = "#9fb1c1";*/
            } else if (val == 3) {
                this.tipoOpcion = "Aereo";
                this.fondoBusqueda = "info";
                this.fondoEtiquetas = "info";
                this.opcion = 3;

                /*this.$refs.uno.style.background = "#ffffff";
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
                this.$refs.textB3.style.color = "#ffffff";*/
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

            if(estado == 'Estado de Mexico'){
                estado = 'Edo. Mexico'
            }

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

            //this.destinos_ftl.push({ "name": geoDetallesPuertos.data.geocerca[0].nombre_corto, "idGeocerca": geoDetallesPuertos.data.geocerca[0].idGeocerca })
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
                        const params = {pais: pais, estado: estado, ciudad: ciudad,}

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
                        }else{
                            await this.notificaciones('info', 'No se puede agregar mas de un origen en modalidad LTL');
                        }
                        
                        this.origen = ""
                    }

                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas();
                    }
                }
            }
        },

        async getLabelAddressD(item) {
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
                        const params = {pais: pais, estado: estado, ciudad: ciudad,}

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
                        }else{
                            await this.notificaciones('info', 'Solo de puede agregar un destino en modalidad LTL');
                        }
                        
                        this.destino = ''

                    }
                    if(this.arrayOrigen.length > 0 && this.arrayDestino.length > 0){
                        await this.muestraMapaRutas();
                    }
                }
            }
        },

        async eliminaOrigenArray(val){

            let indice = this.arrayOrigen.map((busqueda) => busqueda.idOrigen).indexOf(val);
            this.arrayOrigen.splice(indice, 1);

            await this.muestraMapaRutas();

            await this.notificaciones('success', 'El Origen se eliminó correctamente.');

        },

        async eliminaDestinoArray(val){

            let indice = this.arrayDestino.map((busqueda) => busqueda.idDestino).indexOf(val);
            this.arrayDestino.splice(indice, 1);

            await this.muestraMapaRutas();

            await this.notificaciones('success','El Destino se eliminó correctamente.');
        },

        muestraMapaRutas(){
            let lat_c = 0
            let lng_c = 0
            this.mostrarMapa = false
            
            for (let c = 0; c < this.arrayOrigen.length; c++) {
                if(this.arrayOrigen[c].lat_centro != 0 && this.arrayOrigen[c].lng_centro != 0 ){
                    lat_c = this.arrayOrigen[c].lat_centro
                    lng_c = this.arrayOrigen[c].lng_centro
                    break;
                }
            }

            // Crea un nuevo mapa
            var map = new google.maps.Map(document.getElementById('mapaRutas'), {
                zoom: 12, // Nivel de zoom
                center: { lat: parseFloat(lat_c), lng: parseFloat(lng_c) } // Centro del mapa (coordenadas)
            });

            /*var routes = [
                { origin: {lat: 40.7128, lng: -74.0060}, destination: {lat: 34.0522, lng: -118.2437} }, // Ruta 1: Nueva York a Los Ángeles
                { origin: {lat: 41.8781, lng: -87.6298}, destination: {lat: 29.7604, lng: -95.3698} }    // Ruta 2: Chicago a Houston
            ];*/

            var routes = []

            for (let or = 0; or < this.arrayOrigen.length; or++) {
                for (let de = 0; de < this.arrayDestino.length; de++) {
                    let ruta = {origin:{lat:parseFloat(this.arrayOrigen[or].lat), lng: parseFloat(this.arrayOrigen[or].lng)}, destination: {lat:parseFloat(this.arrayDestino[de].lat), lng: parseFloat(this.arrayDestino[de].lng)}}
                    routes.push(ruta)
                }
            }

                const directionsServices = [];
                const directionsRenderers = [];
                routes.forEach((route, index) => {
                    directionsServices[index] = new google.maps.DirectionsService();
                    directionsRenderers[index] = new google.maps.DirectionsRenderer({ map });
                    this.calculateAndDisplayRoute(directionsServices[index], directionsRenderers[index], route);
                });
        },

        calculateAndDisplayRoute(directionsService, directionsRenderer, route) {
            directionsService.route({
                origin: route.origin,
                destination: route.destination,
                travelMode: 'DRIVING'
            }, (response, status) => {
                if (status === 'OK') {
                this.mostrarMapa = true
                directionsRenderer.setDirections(response);
                } else {
                window.alert('Directions request failed due to ' + status);
                }
            });
        },

        async validaO(){
            const auth = { username: "admin", password: "123", }
            let datosTarifa = []
      
            if(this.arrayOrigen.length == 0){
                Swal.fire({
                    title: "Debes ingresar al menos un Origen, verifícalo por favor.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(this.arrayDestino.length == 0){
                Swal.fire({
                    title: "Debes ingresar al menos un Destino, verifícalo por favor.",
                    text: "",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
                return false;
            }

            if(this.termodalidad == 'LTL'){
                let ori = ''
                let des = ''
                let clasificacionZona = 0

               for (let to = 0; to < this.arrayOrigen.length; to++) {
                    this.arrayOrigen[to];
                    for (let td = 0; td < this.arrayDestino.length; td++) {
                        this.arrayDestino[td];
                        ori = this.arrayOrigen[to].estado
                        des = this.arrayDestino[td].estado

                        if(this.arrayOrigen[to].estado == "Colima" && this.arrayOrigen[to].ciudad == "MANZANILLO"){
                            ori = "MANZANILLO"
                        }

                        if(this.arrayDestino[td].estado == 'Colima' && this.arrayDestino[td].ciudad  == "MANZANILLO"){
                            des = "MANZANILLO"
                        }

                        if(this.arrayOrigen[to].estado == "Ciudad de Mexico" || this.arrayOrigen[to].estado == 'Estado de Mexico'){
                            ori = "CDMX"
                        }

                        if(this.arrayDestino[td].estado == 'Ciudad de Mexico' || this.arrayDestino[td].estado == 'Estado de Mexico'){
                            des = "CDMX"
                        }

                        await axios({
                            method: "post",
                            url: "/api/v1/getTarifario/",
                            data: {
                                ori: ori,
                                des: des,
                                modalidad: this.termodalidad,
                            },
                        }).then((response) => {
                            datosTarifa = response.data
                            if(datosTarifa.length > 0){

                                let listOD = []

                                for (let o = 0; o < this.arrayOrigen.length; o++) {
                                    for (let d = 0; d < this.arrayDestino.length; d++) {
                                        let dato = {"pais_o":this.arrayOrigen[o].pais,"estado_o":this.arrayOrigen[o].estado,"ciudad_o":this.arrayOrigen[o].ciudad, "cp_o":this.arrayOrigen[o].cp, "pais_d":this.arrayDestino[d].pais,"estado_d":this.arrayDestino[d].estado,"ciudad_d":this.arrayDestino[d].ciudad, "cp_d":this.arrayDestino[d].cp}
                                        listOD.push(dato)
                                    }
                                }
                                
                                axios({
                                    method: "post",
                                    url: "/api/v1/valida-tipo-zona/",
                                    data: {data:listOD},
                                    auth: auth,
                                }).then((response) => {
                                    let tarif = {}

                                    if(response.data.length > 0){
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
                                            identificador: ori+'-'+des,
                                            tipo_zona: response.data[0].tipoZona,
                                            km: parseFloat(response.data[0].km),
                                        };
                                        this.kilometraje = parseFloat(response.data[0].km)
                                    }else{
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
                                            identificador: ori+'-'+des,
                                            tipo_zona: 'Comercial',
                                            km: 0,
                                        };
                                        this.kilometraje = 0
                                    }
                                    this.tarifarios_ltl.push(tarif)
                                }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
               }

            }else{

            }
            
            this.$bvModal.hide("inicio-origen-destino");
            this.$bvModal.show("inicio-mercancias");
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
            }).catch((error) => {
                console.log(error);
            });
        },

        async validaU(){
            if(this.unidadesSeleccion.length == 0){
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

            if(this.unidadesSeleccion.length > 0){
                for (let u = 0; u < this.unidadesSeleccion.length; u++) {
                    const index = this.unidadesSeleccion.findIndex(objeto => objeto.idUnidad === data.idUnidad && objeto.nombreUnidad === data.nombreUnidad);
                    if (index !== -1) {
                        this.unidadesSeleccion.splice(index, 1);
                        $("#"+cadena).css({'display':'none'});
                        break;
                    }else{
                        this.unidadesSeleccion.push(data);
                        $("#"+cadena).css({'display':'block'});
                        break;
                    }
                }
            }else{
                data = {idUnidad: id, nombreUnidad: nombre}
                this.unidadesSeleccion.push(data);
                $("#"+cadena).css({'display':'block'}); 
            }

        },

        recargaUnidadesSeleccionadas(){
            for (let uni = 0; uni < this.unidadesSeleccion.length; uni++) {
                let cadena = 'select_card_view_'+this.unidadesSeleccion[uni].idUnidad
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

            if(this.termodalidad == 'LTL'){
                await this.generateCotizacion(1)
            }else{
                //await this.generateCotizacionFTL(1)
            }

            this.$bvModal.hide("inicio-mercancias");
            //this.$bvModal.show("inicio-origen");
        },

        eliminaPaquete(idPaq) {

            let indice = this.agregarMercancias.map((busqueda) => busqueda.idPaq).indexOf(idPaq);
            this.agregarMercancias.splice(indice, 1);
            /*this.aplicaAumentoAlto = false
            this.aplicaAumentoAncho = false
            this.aplicaAumentoLargo = false
            this.aplicaAumentoPeso = false
            

            let totalKilos = 0;
            let totalVolumen = 0;
            let largo = 0.0 
            let ancho = 0.0
            let alto = 0.0
                
            for (let i = 0; i < this.agregarMercancias.length; i++) {

                totalKilos = totalKilos + parseFloat(this.agregarMercancias[i].pesoTotal);
                totalVolumen = totalVolumen + parseFloat(this.agregarMercancias[i].volumen);

                largo = parseFloat(this.agregarMercancias[i].largo);
                ancho = parseFloat(this.agregarMercancias[i].ancho);
                alto = parseFloat(this.agregarMercancias[i].alto);

                if(largo > 2){
                this.aplicaAumentoLargo = false;
                }else if(largo > 1.21 && largo < 1.48){
                    this.aplicaAumentoLargo = true;
                }else if(largo > 1.48){
                this.aplicaAumentoLargo = false;
                }

                if(ancho > 2){
                this.aplicaAumentoAncho = false;
                }else if(ancho > 1.21 && ancho < 1.48){
                    this.aplicaAumentoAncho = true;
                }else if(ancho > 1.48){
                this.aplicaAumentoAncho = false;
                }

                if(alto > 2){
                this.aplicaAumentoAlto = false;
                }else if(alto > 1.21 && alto < 1.48){
                    this.aplicaAumentoAlto = true;
                }else if(alto > 1.48){
                this.aplicaAumentoAlto = false;
                }

            }

            this.totalMetcub = totalVolumen; 

            this.totalKilo = totalKilos; 

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
            this.addServicios(idServicio, nombreServicio);*/
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

            console.log(this.arrayOrigen,'Origen')
            console.log(this.arrayDestino,'Destino')
            console.log(this.tarifarios_ltl, 'Tarifario')
            console.log(this.agregarMercancias, 'Mercancias')
            
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

            /*if(this.termodalidad == 'LTL'){
                this.validaServicios();
                this.validaServicios();
            }

            this.getTarifario();

            this.getCoincidencia();
            this.detallesMercancias();*/
                
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
                

                if (this.valorMercancia == 0) {
                    //this.$bvModal.show("valorDeclaradoMercancia");
                    this.$bvModal.show("valorDeclaradoMercanciaInfo");
                    this.$bvModal.show("valorDeclaradoMercancia");
                    
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
                comprobar = document.getElementById(idServicio + "cheServicios").checked;
                if (comprobar) {
                subtotal = 1500
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
                this.progresbarEntrega = true

                } else {
                let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                this.confirmarServices.splice(indice, 1);
                this.progresbarEntrega = false
                }

                

            }else if (nombreServicio == "MANIOBRAS DE CARGA" || nombreServicio == "MANIOBRAS") {
                
                this.$bvModal.show("maniobrasInfo");

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

                let tipoZona = ''
                comprobar = true;
                subtotal = parseFloat(this.totalPrecioVolumen.toFixed(2))
                porcIva = subtotal * (iva / 100);
                
                for (let tar = 0; tar < this.tarifarios_ltl.length; tar++) {
                    tipoZona = this.tarifarios_ltl[tar].tipo_zona
                }

                if (tipoZona == "Peligrosa") {
                    porcZPeligrosa = subtotal * (35 / 100);
                    //porcAdicional = 35
                }

                if (tipoZona == "No Comercial") {
                    porcNComercial = subtotal * (50/ 100);
                    //porcAdicional = 50
                }

                if (tipoZona == "Restringida") {
                    porcNComercial = subtotal * (15 / 100);
                    //porcAdicional = 15
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
                    totalServicio: subtotal + porcIva + porcZPeligrosa + porcNComercial + porcSobrepeso + porcSusceptible + porcVolMerc + precioVolumenTot,
                };
                let indice = this.confirmarServices.map((busqueda) => busqueda.idService).indexOf(idServicio);
                this.confirmarServices.splice(indice, 1);

                if (this.confirmarServices.findIndex((x) => x.idService === idServicio) < 0) {
                this.confirmarServices.push(agrega);
                }
                this.progresbarFlete = true
            }
            await this.sumaBoton();
            //await this.planes();
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
                                    <div class="card-body" style="padding: 10px; ">
                                        <div class="primer-style">
                                            <b-row>
                                                <b-col>
                                                    <div class="segundo-style">
                                                        <div class="tercer-style">
                                                            <div class="tercer-label-style">
                                                                <div class="tercer-label-style-label text-wrap" style="text-align:left; font-size:15px;">
                                                                <b style="color: red">*</b> Ingresa Origen
                                                                </div>
                                                            </div>
                                                            <div class="primer-input-style">
                                                                <div class="segundo-input-style" style="width: 100% !important; border-radius: 10px !important;">
                                                                    <div class="segundo-input-icon-style" style="color: #2aab5c">
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div v-if="arrayOrigen.length == 0">
                                                            <b-button v-b-toggle.origenes class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Origenes Agregados</b-button>
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
                                                                                <b-button v-if="origenes.estatus_quitar == 1" @click="eliminaOrigenArray(origenes.idOrigen)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
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
                                                                <div class="tercer-label-style-label text-wrap" style="text-align:left; font-size:15px;">
                                                                <b style="color: red">*</b> Ingresa Destino
                                                                </div>
                                                            </div>
                                                            <div class="primer-input-style">
                                                                <div class="segundo-input-style" style="width: 100% !important; border-radius: 10px !important;">
                                                                    <div class="segundo-input-icon-style" style="color: #2aab5c">
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
                                                                                @input="getLabelAddressD"
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
                                                            <b-button v-b-toggle.destinos class="m-1" size="sm" variant="primary"><i class="fas fa-search"></i> Ver Destinos Agregados</b-button>
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
                                                                                <b-button v-if="destinos.estatus_quitar == 1" @click="eliminaDestinoArray(destinos.idOrigen)" size="sm" variant="danger"><i class="fas fa-trash-alt"></i> </b-button>
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
                                            <br>
                                            <b-row>
                                                <b-col md="12">
                                                <div id="mapaOrigen" style="height: 100%; width:100%"></div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <!--Fin Terrestre-->
                                        
                                    </div>
                                </b-row>
                                <br />
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarOD()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" style="background-color: #2aab5c;" @click="validaO()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
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
                                <b-button class="width-md ml-1" size="sm" style="background-color: #2aab5c;" @click="validaU()"><b>Siguente <i class="fe-arrow-right"></i></b></b-button>
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
                                        <b style="color: red">*</b>Clasificación SAT<i class="fe-info" title="Esta clasificación es de acuerdo al catalogo de productos del SAT, si tiene el id o el nombre del producto ingreselo."></i></label>
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
                                        <b style="color: red">*</b>Descripción Personalizada<i class="fe-info" title="Este apartado es para dar más detalles del prducto seleccionado del catalogo del SAT."></i></label>
                                        <textarea class="form-control form-control-sm" style="height: 33px" v-model.trim="descripMerc" type="text"/>
                                    </b-col>
                                    <b-col>
                                    <label for="estibable" class="form-label">
                                        <b style="color: red">*</b>Unidad de Medida</label>
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
                                        <b style="color: red">*</b>Especificaciones</label>
                                        <input class="form-control form-control-sm" v-model.trim="tUnidadMerc" type="text"/>
                                    </b-col>
                                </b-row>
                                <br>
                                <div class="container-fluid">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead class="text-white" style="background-color: #2aab5c">
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
                                                <th scope="col">Peso Facturado {{ leyendaVolumen }}</th>
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
                                                    <td>{{ paq.peso }}<sub>kg</sub></td>
                                                    <td>{{ paq.pesoTotal }}<sub>kg</sub></td>
                                                    <!--td>{{ paq.upeso.toUpperCase() }}</td>
                                                    <td>{{ paq.volumen }}</td-->
                                                    <!--td>{{ paq.pesoVolumetrico }}<sub>kg</sub></td-->
                                                    <td>{{ formatMoney(paq.pesoTotal / 350) }}<sub>kg</sub></td>
                                                    <td>{{ paq.volumenTotal }}<sub>m<sup>3</sup></sub></td>
                                                    <td>{{ paq.pesoVolumetricoTotal }}<sub>kg</sub></td>
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
                                                    <input class="form-control form-control-sm" v-model.trim="cantMerc" type="number" @change="validaCantidad()"/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <b-form-select id="estibable" class="form-control custom-select-sm" v-b-tooltip.hover="{ variant: 'success' }" v-model.trim="terestibable" @change="selectEstibable">
                                                        <option value="si">Si</option>
                                                        <option value="no">No</option>
                                                    </b-form-select>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm" v-model="largoMerc" type="number" @change="validaLargo()"/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm" v-model="anchoMerc" type="number" @change="validaAncho()"/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input v-if="terestibable == 'si'" class="form-control form-control-sm" v-model="altoMerc" type="number" @change="validaAlto()"/>
                                                    <input v-else class="form-control form-control-sm" v-model="altoMerc" type="number" @change="validaAlto()" disabled/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm col" v-model.trim="pesTMerc" type="number" @change="validaPeso()"/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm col" v-model.trim="pesoTotal" type="number" disabled/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm" v-model="pesoVol" type="number" disabled/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm" v-model="volMercTot" type="number" disabled/>
                                                    </td>
                                                    <td style="border: 1px solid #edeff1; border-collapse: collapse;">
                                                    <input class="form-control form-control-sm" v-model="pesoVolTot" type="number" disabled/>
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
                                <br />
                                <b-button class="width-md ml-1" size="sm" variant="secondary" @click="regresarMercancias()"><b><i class="fe-arrow-left"></i> Regresar</b></b-button>
                                <b-button class="width-md ml-1" size="sm" @click="validaMercancias()" style="background-color: #2aab5c;"><b><i class="bx bx-list-plus" style="font-size: 15px;"></i> Cotizar</b></b-button>
                            </div>
                        </b-modal>
                        
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
                                                    
                                                    <b-button pill v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" style="background-color: #2aab5c" size="sm"><b><i class="fe-refresh-ccw"></i> Divisa: USD</b></b-button>
                                                    <b-button pill v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" style="background-color: #2aab5c" size="sm"><b><i class="fe-refresh-ccw"></i> Divisa: MXN</b></b-button>
                                                </div>
                                                <i class="fe-truck" style="color: #2aab5c; font-size: 38px"></i>
                                                <div class="form-inline">
                                                    <!--b-button pill style="background-color: #2aab5c" :disabled="isActive" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal"-->
                                                    <b-button pill style="background-color: #2aab5c" v-b-modal.resumen-modal title="Resumen General de Cotizacion" v-b-tooltip.hover="{ variant: 'success' }" data-toggle="modal" data-target="#resumen-modal" size="sm">
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
                                                            <label for="" class="text-center" v-if="kilometraje > 0">{{ kilometraje }}</label>
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
                                        <label style="color: #ffffff">INFORMACIÓN GENERAL</label>
                                    </b-col>
                                    <b-col class="text-right"
                                        >Ciudad de México a
                                        {{ fechaFormato }}</b-col
                                    >
                                    </b-row>
                                    <b-row class="text-left p-2" style="font-size: 12px;">
                                    <b-col md="6">
                                        <label style="font-size: 11px">ORIGEN: </label> {{ terorigen.toUpperCase() }}
                                    </b-col>
                                    <b-col md="6">
                                        <label style="font-size: 11px">DESTINO:</label> {{ terdestino.toUpperCase() }}
                                    </b-col>
                                    <b-col md="6" v-if="ocurreO">
                                        <label style="font-size: 11px">OFICINA ORIGEN: </label> {{ almacenO }}
                                    </b-col>
                                    <b-col md="6" v-if="ocurreD">
                                        <label style="font-size: 11px">OFICINA DESTINO:</label> {{ almacenD }}
                                    </b-col>
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
                                        <b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" style="background-color: #2aab5c" size="sm">Divisa: USD</b-button>
                                        <b-button v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" style="background-color: #2aab5c" size="sm">Divisa: MXN</b-button>
                                        </div>
                                    </b-col>
                                    </b-row>
                                    <!--b-row class="text-left p-2" style="font-size: 12px;">
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

                                        <div class="col-md-12 text-center">
                                        <b-button v-show="divisa == '1'" title="Cambiar a Moneda MXN" @click="selectDivisa(1)" style="background-color: #2aab5c" size="sm">Divisa: USD</b-button>
                                        <b-button v-show="divisa == '2'" title="Cambiar a Moneda USD" @click="selectDivisa(2)" style="background-color: #2aab5c" size="sm">Divisa: MXN</b-button>
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
                                    </b-row-->
                                    <b-row class="p-1" style="background-color: #056736; color: #ffffff;">
                                    <b-col class="text-left">
                                        <label style="color: #ffffff">MERCANCIAS</label>
                                    </b-col>
                                    </b-row>
                                    <div class="col-md-12" style="font-size: 12px;">
                                    <b-row class="alert alert-light">
                                        <b-col sm="3"><b>CANTIDAD PIEZAS:</b> {{ totalCantidad }}</b-col>
                                        <b-col sm="3"><b>VOLUMEN:</b> {{ totalVolumen }}<sub>m<sup>3</sup></sub></b-col>
                                        <b-col sm="3"><b>PESO REAL:</b> {{ totalPesoReal }}<sub>kg</sub></b-col>
                                        <b-col sm="3"><b>PESO FACTURADO:</b> {{ totalPesoFaturado }}<sub>kg</sub></b-col>
                                    </b-row>
                                    </div>
                                    <div class="col-md-12">
                                    <div class="form-group row mb-0">
                                        <div class="table-responsive">
                                        <table class="table table-sm mb-0" width="100%" v-if="agregarMercancias.length > 0">
                                            <thead>
                                            <tr>
                                                <th style="text-align: center;">CANTIDAD</th>
                                                <th style="text-align: center;">EMBALAJE</th>
                                                <!--th>ESTIBABLE</th-->
                                                <th style="text-align: center;">LARGO</th>
                                                <th style="text-align: center;">ANCHO</th>
                                                <th style="text-align: center;">ALTO</th>
                                                <th style="text-align: center;">PESO </th>
                                                <!--th>PESO REAL</th-->
                                                <!--th>VOLUMEN</th-->
                                                <!--th>PESO VOLUMETRICO</th>
                                                <th>VOLUMEN REAL </th>
                                                <th>PESO FACTURADO</th-->
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="merc in agregarMercancias" v-bind:key="merc.idPaq" >
                                                <td style="text-align: center;">
                                                {{ merc.cantidad }}
                                                </td>
                                                <td style="text-align: center;">
                                                {{ merc.embalaje }}
                                                </td>
                                                <!--td style="text-align: center;">
                                                {{ merc.estibable.toUpperCase() }}
                                                </td-->
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
                                                {{ merc.peso }}<sub>{{ merc.upeso }}</sub>
                                                </td>
                                                <!--td style="text-align: center;">
                                                {{ merc.pesoTotal }}<sub>{{ merc.upeso }}</sub>
                                                </td-->
                                                <!--td style="text-align: center;">
                                                {{ merc.volumen }}<sub>m<sup>3</sup></sub>
                                                </td-->
                                                <!--td style="text-align: center;">
                                                {{ merc.pesoVolumetrico }}<sub>{{ merc.upeso }}</sub>
                                                </td>
                                                <td style="text-align: center;">
                                                {{ merc.volumenTotal }}<sub>m<sup>3</sup></sub>
                                                </td>
                                                <td style="text-align: center;">
                                                {{ merc.pesoVolumetricoTotal }}<sub>{{ merc.upeso }}</sub>
                                                </td-->
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
                                    
                                    <b-row class="p-1" style="background-color: #056736;color: #ffffff;">
                                    <b-col class="text-left">
                                        <label style="color: #ffffff">PAQUETES</label>
                                    </b-col>
                                    <b-col></b-col>
                                    <b-col></b-col>
                                    </b-row>
                                    <div>
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
                                                <i class="fe-check"></i>
                                                Servicio Cotizado
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
                                        <label style="color: #ffffff">SERVICIOS</label>
                                    </b-col>
                                    <b-col cols="5"></b-col>
                                    <b-col></b-col>
                                    </b-row>
                                    <!-- Inicio else -->
                                    <div class="col-md-12" style="font-size: 12px;">
                                    <div class="form-group row mb-0">
                                        <div class="table-responsive">
                                        <table class="table table-sm mb-0" width="100%" v-if="confirmarServices.length > 0">
                                            <thead>
                                            <tr>
                                                <th>CONCEPTO</th>
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
                                                <th v-if="admin">AJUSTE DE VENTA</th>
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
                                                ${{ formatMoney(servicios.subtotal + servicios.porcAumento) }}<sub>MXN</sub>
                                                </td>
                                                <td style="text-right">
                                                ${{ formatMoney(servicios.porcIva) }}<sub>MXN</sub>
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
                                                ${{ formatMoney(servicios.totalServicio + servicios.porcAumento) }}<sub>MXN</sub>
                                                </td>
                                                <td align="center" v-if="servicios.subtotal != 0 && admin">
                                                <b-form-checkbox
                                                    name="listadoServicios"
                                                    v-bind:id="servicios.idService + 'check'"
                                                    v-model="serviciosResumen"
                                                    :key="servicios.idService"
                                                    v-bind:value="servicios.idService"
                                                    @change="mostrarImpuesto(servicios.idService)"
                                                    style="font-size: 12px;"
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
                                                <td style="text-right">
                                                {{ servicios.nombreSer }}
                                                </td>
                                                <!--td  style="text-right"> {{ formatMoney(servicios.kilometraje) }} </td>
                                                    <td  style="text-right"> {{ formatMoney(servicios.tarifaK) }} x kilometro</td-->
                                                <td style="text-right">
                                                ${{ formatMoney((servicios.subtotal + servicios.porcAumento) / valorDolar) }}<sub>USD</sub>
                                                </td>
                                                <td style="text-right">
                                                ${{ formatMoney(servicios.porcIva / valorDolar) }}<sub>USD</sub>
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
                                                ${{ formatMoney((servicios.totalServicio + servicios.porcAumento) / valorDolar) }}<sub>USD</sub>
                                                </td>
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
                                                <!--td></td>
                                                    <td></td-->
                                                <td v-if="admin"></td>
                                                <td v-if="admin"></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td colspan="2" style="text-align: right;">
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
                                    <!-- Fin else -->
                                </b-container>
                                <!--b-container>
                                    <b-row class="p-1" style="background-color: #056736;color: #ffffff;">
                                    <b-col class="text-left" style="font-size: 12px;">
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
                                    </b-col>
                                    </b-row>
                                </b-container>

                                <b-container>
                                    <b-row class="p-2">
                                    <div class="row mt-2" style="border-top: 1px #ccc">
                                        <p style="color: #2aab5c; font-weight: bold">
                                        La siguiente cotizacion se enviara para su
                                        validacion si desea continuar favor
                                        presione en Confirmar
                                        </p>
                                    </div>
                                    </b-row>
                                </b-container-->
                                </div>
                            </div>
                            </div>

                            <!--div class="form-group text-right mt-3">
                            <b-button class="width-md ml-1" variant="secondary" @click="hideResumen2()">Cerrar</b-button>
                            <b-button class="width-md ml-1" style="background-color: #2aab5c" @click="Save2()">Confirmar</b-button>
                            </div-->

                            <div class="form-group text-right mt-3">
                            <b-button class="width-md ml-1" variant="secondary" @click="hideResumen2()">Cerrar</b-button>
                            <b-button v-if="existeCotizacion" class="width-md ml-1" style="background-color: #2aab5c" @click="validaInfoConfirma()">Quiero el Servicio!</b-button>
                            </div>
                        </b-modal>

                        <!-- FIN RESUMEN SERVICIO -->

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


</style>