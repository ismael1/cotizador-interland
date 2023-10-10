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
import comingSoonVue from '../extras/coming-soon.vue';


/**
 * Basic Tables component
 */

export default {
  page: {
    title: "Nuevo Servicio Venta",
    meta: [{ name: "newServiceSale", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      dates_search: [],
      template: ItemTemplate,
    
      title: "Nuevo Servicio",
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
          text: "Nuevo",
          href: "/newServiceSale",
          active: true,
        },
      ],

      //280621
      activolabAduana: false,
      activolabAduana_man: false,

      activoAutoService:true,
      activoLabelService:false,
      dates_search_service: [],
      input_servicios:'',
      template_service: ItemTemplateService,

      dates_search_aduana: [],
      inputAduana:'',
      activoAutoAduana: true,
      activolabelAduana: false,
      input_aduana:'',
      id_input_aduana:0,

      template_aduana: templateAduana,

      //para maniobras
      inputAduana_man:'',
      activoAutoAduana_man: true,
      activolabelAduana_man: false,
      input_aduana_man:'',
      id_input_aduana_man:0,


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

      // selected_tipo: "",

      activoServicios: false,
      activoOrigen: false,
      activoDestino: false,
      activoAduana: false,
      // activolabelAduana: false,

      activoManiobra: false,

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

      txt_origen_destino:"",
      dateNow:"",

      countrys: [],

      //origendestino
      paisOD:'',
      cpOD:'',
      estadoOD:'',
      estatesOD:[],
      cityOD:'',
      tipoOD: 0,
      show: false,

      label_origen:"",
      label_destino:"",
      arrayOrigen:[],
      arrayDestino:[],

      input_subtotal:0,
      input_traslado:0,
      input_retencion:0,
      input_total:0,
      input_origen:"",
      input_destino:"",
      input_servicio:'',

      input_fecha:'',
      input_vigencia:'',
      input_identificador:0,
      servicioBuscar:'',

      // input_aduana:0,
      opt_select_man:'',
      input_origen_man:'',
      input_destino_man:'',
      input_aduana_man:'',
      selected_tipo:'',

      input_un:'',
      input_class:'',
      input_tipo_unidad:'',
      input_nota:'',
      input_dias_transito:0,
      input_divisa:1,

      id_servicio:0,

      input_modalidad:"FTL",

      //Agregados David 120721
      proveedor: "",
      dates_search_proveedor: [],
      activoLabelProveedor: false,
      servicioBuscar2: "",
      template_proveedor: ItemTemplateProveedor,
      id_proveedor: 0,
      checkVentas: true,
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

      activaRuta: false,
      zonaOrigen: [
        {id: 1, value: "COMERCIAL"},
        {id: 2, value: "PELIGROSA"},
        {id: 3, value: "NO COMERCIAL"},
      ],
      rutaOrigen: "COMERCIAL",
      arrayRuta:[],
      input_direccion: "",
      clasificacionZonaO: "",
      clasificacionZonaD: "",
      resClasificaZona:"",
      notColorZona:"",
      notTextoZona:"",
      cpOZona:"",
      cpDZona:"",
      cpOZona: "",
      cpDZona: "",

    };
  },
  created() {
    this.fechaHoy()
    this.getContry()
  },
  methods: {
    getLabel_aduana (item) {
      if(item){
        this.id_input_aduana= item.id
        this.input_aduana=(item.origen + " - "+ item.destino)        
        return (item.origen + " - "+ item.destino)        
      }else{
        this.id_input_aduana= 0
        this.input_aduana= ''
      }
    },
    updateItems_aduana (text) {
      let input= text

      // if (input.length > 2) {        
        axios({
          method: "post",
          url: "/api/v1/search-aduana/",
          data: {
            data: input,
          },
        })
        .then((response) => {
          this.dates_search_aduana=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },
    //maniobras
    getLabel_aduana_man (item) {
      if(item){
        this.id_input_aduana_man= item.id
        this.input_aduana_man=(item.origen + " - "+ item.destino)        
        return (item.origen + " - "+ item.destino)        
      }else{
        this.id_input_aduana_man= 0
        this.input_aduana_man= ''
      }
    },
    updateItems_aduana_man (text) {
        let input= text

      // if (input.length > 2) {        
        axios({
          method: "post",
          url: "/api/v1/search-aduana/",
          data: {
            data: input,
          },
        })
        .then((response) => {
          this.dates_search_aduana=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },    
    getLabel_service (item) {
      if(item){
        this.id_servicio= item.id
        this.servicioBuscar=item.nameproduct

        this.validarService()
        
        return item.nameproduct        
      }else{
        this.id_servicio = 0
        this.servicioBuscar= ''

      }
    },
    //Agregado David 120721
    getLabel_proovedor (item) {
      if(item){
        this.id_proveedor = item.id
        this.servicioBuscar2 = item.name
        return item.name        
      }else{
        this.id_proveedor = 0
        this.servicioBuscar2= ''
      }
    },
    updateItems_service (text) {
      let input= text

      // if (input.length > 2) {        
        axios({
          method: "post",
          url: "/api/v1/search-service/",
          data: {
            data: input,
          },
        })
        .then((response) => {
          this.dates_search_service=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },
    updateItems_proveedor (text) {
      let input= text
    
        axios({
          method: "post",
          url: "/api/v1/search-proveedor/",
          data: {
            data: input,
          },
        })
        .then((response) => {
          this.dates_search_proveedor=response.data
          this.id_proveedor = response.data.id
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cambiarAutoService(){
      this.activoServicios=true
      this.activoAutoService=false
    },
    getLabel (item) {
      if(item){
        this.estadoOD= item.estado_id
        this.cityOD = item.municipio

        this.cpOD=item.codigo_postal

        return item.codigo_postal        
      }else{
        this.estadoOD= ''
        this.cityOD = ''
      }
    },
    updateItems (text) {
      let paisOD = this.paisOD
      let input= text

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
          this.dates_search=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    showinputtServicio(event) {
      this.activoAduana= false
      this.activoAutoAduana= false
      this.activolabAduana= false
      this.activoManiobra= false
      this.activoAduana_m= false
      this.activoAutoAduana_man= false
      this.activolabAduana_man= false

      this.id_input_aduana= 0
      this.input_aduana= ''
      this.inputAduana= ''

      //maniobras 
      this.id_input_aduana_man= 0
      this.input_aduana_man= ''
      this.inputAduana_man= ''

      this.input_servicios='' 
      this.servicioBuscar=''
      this.servicioBuscar2=''
      this.id_servicio=0
    
      this.activoCommodity_m = false
      this.activoUnidad = false
      this.activoDias = false

      this.activoServicios = false
      this.activoOrigen = false
      this.activoDestino = false
      this.activoAduana = false
      this.activoManiobra = false    

      const opcionServicio = event.target.value

      if (opcionServicio == 10) {
        this.activoServicios = true     
        this.activoUN=false
        this.activaRuta = false
        // this.activoClass=false   
      }

      //1 FLETE NACIONAL
      //2 INTERNATIONAL FREIGHT
      //3 FLETE DIRECTO
      //4 OTRO
      if (opcionServicio == 1) {
        this.input_origen = ""

        this.activaRuta = true
        this.activoOrigen = true
        this.activoDestino = true

        this.activoCommodity_m = true
        this.activoUnidad = true
        this.activoDias = true        

      }else if(opcionServicio == 1 || opcionServicio == 2 || opcionServicio == 3){
        this.input_origen = ""

        this.activaRuta = false
        this.activoOrigen = true
        this.activoDestino = true

        this.activoCommodity_m = true
        this.activoUnidad = true
        this.activoDias = true        

        // if(this.selected_tipo=="h"){
        //   this.activoUN=true
        //   this.activoClass=true
        // }

      }     
    },
    validarService() {
         
      this.id_input_aduana= 0
      this.input_aduana= ''
      this.inputAduana= ''

      //maniobras 
      this.id_input_aduana_man= 0
      this.input_aduana_man= ''
      this.inputAduana_man= ''

      // this.input_servicios='' 
      
      // this.id_servicio=0
    
      // this.activoServicios = true
      this.activoOrigen = false
      this.activoDestino = false
      this.activoAduana = false
      this.activoManiobra = false  

      this.activoAduana= false
      this.activoAutoAduana= false
      this.activolabAduana= false
      this.activoManiobra= false
      this.activoAduana_m= false
      this.activoAutoAduana_man= false
      this.activolabAduana_man= false

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

        this.activoAutoAduana=true

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
      this.activoUN=false
      // this.activoClass=false

      if (tipoCajaS == "h") {
          this.getUnidadBox("h")

          // this.activoUN=true
          // this.activoClass=true
      }else{
          this.input_un=""
          this.input_class=""
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
                this.all_unidades=response.data
            })
            .catch((error) => {
                console.log(error);
            });
    },
    showOrigenDestino(valor){

        this.tipoOD=""
        this.paisOD=""
        this.cpOD=""
        this.estadoOD=""
        this.cityOD=""

        if(valor == 1){
            this.txt_origen_destino = "Origen"
            this.tipoOD=1
        }else if(valor == 2){
            this.txt_origen_destino = "Destino"
            this.tipoOD=2
        }else if(valor == 3){
            this.txt_origen_destino = "Ruta"
            this.tipoOD=3
        }

    },
    fechaHoy(){
        let hoy = new Date()
        let dd = hoy.getDate()
        let mm = hoy.getMonth()+1 
        let yyyy = hoy.getFullYear()

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 
        hoy = yyyy+'-'+mm+'-'+dd
        // hoy = dd+'/'+mm+'/'+yyyy
        // YYYY-MM-DD
        // hoy = dd+'-'+mm+'-'+yyyy
        this.dateNow=hoy
        this.input_fecha=hoy
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
    // getautocomplit(input) {
    //   return new Promise((resolve) => {
    //     let paisOD = this.paisOD;

    //     if (paisOD > 0) {
    //       if (input.length < 3) {
    //         return resolve([]);
    //       }
    //       axios({
    //         method: "post",
    //         url: "/api/v1/search-zipcode/",
    //         data: {
    //           data: input,
    //           pais: paisOD,
    //         },
    //       })
    //         .then((response) => {
    //           const results = response.data.map((result, index) => {
    //             return { ...result, index };
    //           });
    //           resolve(results);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
    //   });
    // },

    // getResultValue(result) {
    //   return result.codigo_postal;
    // },
    // onSubmit(result) {
    //   this.estadoOD= result.estado_id
    //   this.cityOD = result.municipio
    // },
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
    saveOrigenDestino(){

        let tipoOD_=this.tipoOD
        //1 origen
        //2 destino
        let paisOD_=this.paisOD
        
        //verificar esta funcionalidad
        let cpOD_=this.cpOD.codigo_postal

        let estadoOD_=this.estadoOD
        let cityOD_=this.cityOD

        if(paisOD_==0 || paisOD_ ==""){
            Swal.fire({
            title: 'Selecione un Pais',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            })
            return false
        }
        if(estadoOD_==0 || estadoOD_ ==""){
            Swal.fire({
            title: 'Seleccione un Estado',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            })
            return false
        }
        if(cityOD_==0 || cityOD_ ==""){
            Swal.fire({
            title: 'Ingrese Ciudad/Municipio',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            })
            return false
        }

        let index_pais=this.countrys.findIndex(x => x.id === paisOD_)
        let index_estado=this.estatesOD.findIndex(x => x.id === estadoOD_)

        let txt_pais_ = this.countrys[index_pais].name
        let txt_estado_ =  this.estatesOD[index_estado].name

        if(tipoOD_ == 1){
            
            this.arrayOrigen.length=0

            this.input_origen=txt_pais_+" "+cpOD_+" "+txt_estado_+" "+cityOD_

            let origen={'idpaisOrigen':paisOD_, 'paisOrigen':txt_pais_, 'cpOrigen':cpOD_, 'idestadoOrigen':estadoOD_,'estadoOrigen':txt_estado_,'ciudadOrigen':cityOD_}
            this.arrayOrigen.push(origen)

        }else if(tipoOD_ == 2){
            this.arrayDestino.length=0

            this.input_destino=txt_pais_+" "+cpOD_+" "+txt_estado_+" "+cityOD_

            let destino={'idpaisDestino':paisOD_, 'paisDestino':txt_pais_, 'cpDestino':cpOD_, 'idestadoDestino':estadoOD_,'estadoDestino':txt_estado_,'ciudadDestino':cityOD_}
            this.arrayDestino.push(destino)
        }else if(tipoOD_ == 3){
            this.arrayRuta.length=0

            this.input_origen=txt_pais_+" "+cpOD_+" "+txt_estado_+" "+cityOD_

            let ruta={'idpaisDestino':paisOD_, 'paisDestino':txt_pais_, 'cpDestino':cpOD_, 'idestadoDestino':estadoOD_,'estadoDestino':txt_estado_,'ciudadDestino':cityOD_}
            this.arrayOrigen.push(ruta)
            this.arrayRuta.push(ruta)
        }
        this.show=false
        if(this.arrayDestino.length > 0 && this.arrayOrigen.length > 0){
          this.obtenerZona()
        }
    },
    imp_compra(){

        let subtotal=this.input_subtotal.replace(",","")
        let resultado=0
        let tot_iva=0

        let input_traslado_=this.input_traslado
        let input_retencion_=this.input_retencion

        if(input_traslado_==0){
        }else{
            if(input_traslado_==16){
                if(subtotal=="" || subtotal==0){
                    tot_iva=0
                } else{
                    tot_iva=(subtotal*16)/100
                } 
            }else{
                if(input_traslado_==8){
                    if(subtotal=="" || subtotal==0){
                        tot_iva=0
                    } else{
                        tot_iva=(subtotal*8)/100
                    } 
                }
            }
        }

        let tot_r=0
        if(input_retencion_==0){
        }else{
            if(input_retencion_==4){
                if(subtotal=="" || subtotal==0){
                    tot_r=0;
                } else{
                    tot_r=(subtotal*4)/100
                }       
            }
        }
            
        let total_c= parseFloat(subtotal) + parseFloat(tot_iva)
        total_c=total_c-tot_r;

        total_c=this.trunc(total_c, 2)

        this.input_total=total_c
    },
    trunc (x, posiciones = 0) {
        let s = x.toString()
        let l = s.length
        let decimalLength = s.indexOf('.') + 1

        if (l - decimalLength <= posiciones){
            return x
        }
        // Parte decimal del número
        let isNeg  = x < 0
        let decimal =  x % 1
        let entera  = isNeg ? Math.ceil(x) : Math.floor(x)
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
            ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
        
        return finalNum;
    },
    saveService(){
        let id=0
        id=this.input_identificador

        let paisOrigen=""
        let idpaisOrigen=""
        let cpOrigen=""
        let estadoOrigen=""
        let idestadoOrigen=""
        let ciudadOrigen=""

        let paisDestino=""
        let idpaisDestino=""
        let cpDestino=""
        let estadoDestino=""
        let idestadoDestino=""
        let ciudadDestino=""

        if(this.arrayOrigen.length > 0){
            for (let origen in this.arrayOrigen) {
                idpaisOrigen= this.arrayOrigen[origen].idpaisOrigen
                paisOrigen=this.arrayOrigen[origen].paisOrigen
                cpOrigen= this.arrayOrigen[origen].cpOrigen
                idestadoOrigen= this.arrayOrigen[origen].idestadoOrigen
                estadoOrigen= this.arrayOrigen[origen].estadoOrigen
                ciudadOrigen= this.arrayOrigen[origen].ciudadOrigen
            }
        }
        if(this.arrayDestino.length >0){
            for (const destino in this.arrayDestino) {

                idpaisDestino= this.arrayDestino[destino].idpaisDestino
                paisDestino= this.arrayDestino[destino].paisDestino
                cpDestino= this.arrayDestino[destino].cpDestino
                idestadoDestino= this.arrayDestino[destino].idestadoDestino
                estadoDestino= this.arrayDestino[destino].estadoDestino
                ciudadDestino= this.arrayDestino[destino].ciudadDestino  
            }
        }

        let idaduana=this.id_input_aduana

        if(idaduana==""){
            idaduana=0
        }


        let servicio_txt=""

        //290621
        let idServicio_s=0

        if(this.input_servicio==1){
            servicio_txt="FLETE NACIONAL"
            idServicio_s=0
        }
        if(this.input_servicio==2){
            servicio_txt="INTERNATIONAL FREIGHT"
            idServicio_s=0
        }
        if(this.input_servicio==3){
            servicio_txt="FLETE DIRECTO"
            idServicio_s=0
        }
        if(this.input_servicio==10){
            servicio_txt=this.servicioBuscar
            idServicio_s=this.id_servicio //id servicio
        }
        /*if(this.proveedor == "" || this.proveedor == null){
          Swal.fire({
          title: 'Ingrese Proveedor',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          })
          return false;
        }*/
        
        let aVenta = document.getElementById('checkVentas').checked
        let aVentaSpa = ""

        if(aVenta == false){
          aVentaSpa = "NO"
        }else if(aVenta == true){
          aVentaSpa = "SI"
        }

        //Editar
        if(id>0){

            axios({
                method: "put",
                url: `servicioVenta/${this.input_identificador}/`,
                data: {
                    id:this.input_identificador,
                    // dateInicio:this.input_fecha,
                    tipoOperacion:2,
                    
                    // tipoServicio:this.input_servicio,
                    // servicio:servicio_txt,
                    // idServicio:idServicio_s,

                    modality:this.input_modalidad,
                    tipoUnidad:this.input_tipo_unidad,
                    subtotal:this.input_subtotal,
                    iva:this.input_traslado,
                    retencion:this.input_retencion,
                    total:this.input_total,
                    divisa:this.input_divisa,
                    dateFin:this.input_vigencia,
                    diasTransito:this.input_dias_transito,
                    nota:this.input_nota,

                    paisOrigen:paisOrigen,
                    idpaisOrigen:idpaisOrigen,
                    cpOrigen:cpOrigen,
                    estadoOrigen:estadoOrigen,
                    idestadoOrigen:idestadoOrigen,
                    ciudadOrigen:ciudadOrigen,
                    paisDestino:paisDestino,
                    idpaisDestino:idpaisDestino,
                    cpDestino:cpDestino,
                    estadoDestino:estadoDestino,
                    idestadoDestino:idestadoDestino,
                    ciudadDestino:ciudadDestino,

                    idAduana:idaduana,
                    
                    unidaModality:this.selected_tipo,
                    unHazmat:0,
                    classHazmat:0,

                    idProveedor: this.id_proveedor,
                    proveedor: this.servicioBuscar2,
                    checkVentas: aVentaSpa,
                    porcentajeVenta: this.porcentajeVenta,
                    porcentajeXpress: this.porcentajeExpress,
                    ruta: this.rutaOrigen,

                },
                auth: {
                    username: "admin",
                    password: "123",
                },
            })
            .then((response) => {
             
              if(response){
                this.input_identificador=response.data.id

                Swal.fire({
                    title: 'Correcto',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Cerrar',
                })
              }

            })
            .catch((error) => {
                console.log(error);
            });

        }else{

            // validaciones
            if (this.input_vigencia == "" || this.input_vigencia == null) {
              Swal.fire({
                title: 'Ingresa Fin Vigencia',
                text: '',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              })
              return false;
            }
            if (this.input_servicio == "" || this.input_servicio == null || this.input_servicio == 0) {
              Swal.fire({
                title: 'Seleccionar un Servicio',
                text: '',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              })
              return false;
            }

            if(this.input_servicio == 10){

              if (this.id_servicio == "" || this.id_servicio == null || this.id_servicio == 0) {
                Swal.fire({
                  title: 'Ingresar un Servicio',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }

              let txtServiceSearch = this.servicioBuscar;

              let txtServiceSearch_may = txtServiceSearch.toUpperCase();
              let txtServiceSearch_min = txtServiceSearch.toLowerCase();

              if (txtServiceSearch_min == "cruce" || txtServiceSearch_may == "CRUCE") {
                if (idaduana == "" || idaduana == null || idaduana == 0) {
                  Swal.fire({
                    title: 'Seleccionar una Aduana',
                    text: '',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                  })
                  return false;
                }
              }

            }

            if(this.input_servicio == 1){

              if(this.rutaOrigen == "" || this.rutaOrigen == null){
                Swal.fire({
                  title: 'Selecciona una Ruta',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;                
              }

              if (this.input_tipo_unidad == "" || this.input_tipo_unidad == null || this.input_tipo_unidad == 0) {
                Swal.fire({
                  title: 'Seleccionar un tipo de caja',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }

              if (this.arrayOrigen.length > 0) {                
              }else{
                Swal.fire({
                  title: 'Ingresar una Dirección',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }

            }else if(this.input_servicio == 2 || this.input_servicio == 3){

              if (this.input_tipo_unidad == "" || this.input_tipo_unidad == null || this.input_tipo_unidad == 0) {
                Swal.fire({
                  title: 'Seleccionar un tipo de caja',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }
              if (this.arrayOrigen.length > 0) {                
              }else{
                Swal.fire({
                  title: 'Ingresar un Origen',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }
              if (this.arrayDestino.length >0) {                
              }else{
                Swal.fire({
                  title: 'Ingresar Destino',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                })
                return false;
              }

            }

            //Nuevo
            axios({
                method: "post",
                url: `servicioVenta/`,
                data: {
                    tipoOperacion:2,
                    dateInicio:this.input_fecha,                    
                    
                    tipoServicio:this.input_servicio,
                    servicio:servicio_txt,
                    idServicio:idServicio_s,
                    
                    modality:this.input_modalidad,
                    tipoUnidad:this.input_tipo_unidad,
                    subtotal:this.input_subtotal,
                    iva:this.input_traslado,
                    retencion:this.input_retencion,
                    total:this.input_total,
                    divisa:this.input_divisa,
                    dateFin:this.input_vigencia,
                    diasTransito:this.input_dias_transito,
                    nota:this.input_nota,
                    paisOrigen:paisOrigen,
                    idpaisOrigen:idpaisOrigen,
                    cpOrigen:cpOrigen,
                    estadoOrigen:estadoOrigen,
                    idestadoOrigen:idestadoOrigen,
                    ciudadOrigen:ciudadOrigen,
                    paisDestino:paisDestino,
                    idpaisDestino:idpaisDestino,
                    cpDestino:cpDestino,
                    estadoDestino:estadoDestino,
                    idestadoDestino:idestadoDestino,
                    ciudadDestino:ciudadDestino,

                    idAduana:idaduana,
                    
                    unidaModality:this.selected_tipo,
                    // unHazmat:this.input_un,
                    // classHazmat:this.input_class,

                    idProveedor: this.id_proveedor,
                    proveedor: this.servicioBuscar2,
                    checkVentas: aVentaSpa,
                    porcentajeVenta: this.porcentajeVenta,
                    porcentajeXpress: this.porcentajeExpress,
                    ruta: this.rutaOrigen,

                },
                auth: {
                    username: "admin",
                    password: "123",
                },
            })
            .then((response) => {
              if(response){

                this.input_identificador=response.data.id

                Swal.fire({
                    title: 'Correcto',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Cerrar',
                })
              }

            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    listServices() {
      this.$router.push(`/cotizaciones/listVentas`)
    },
    obtenerZona(){

      let cpOrigen = "";
      let cpDestino = "";

      let txtOr = "";
      let txtDe = "";

      for (let i = 0; i < this.arrayOrigen.length; i++) {
        cpOrigen = this.arrayOrigen[i].cpOrigen;
      }

      for (let j = 0; j < this.arrayDestino.length; j++) {
        cpDestino = this.arrayDestino[j].cpDestino;
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
        if(response.data.origen == false){
          txtOr = ""
        }else{
          txtOr = response.data.origen[0].clasificacion
        }
        
        if(response.data.destino == false){
          txtDe = ""
        }else{
          txtDe = response.data.destino[0].clasificacion  
        }

        this.defineZona(txtOr,txtDe)
      }).catch((error) => {
        console.log(error);
      });

    },
    defineZona(cp1,cp2){
      if(cp1 == 'COMERCIAL' && cp2 == 'COMERCIAL'){
        this.resClasificaZona = 'COMERCIAL'
        this.notColorZona = 'success'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
        this.rutaOrigen = 'COMERCIAL'
        this.cpOZona = 'Comercial'
        this.cpDZona = 'Comercial'
      }else if(cp1 == 'NO COMERCIAL' && cp2 == 'NO COMERCIAL'){
        this.resClasificaZona = 'NO COMERCIAL'
        this.notColorZona = 'warning'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
        this.rutaOrigen = 'NO COMERCIAL'
        this.cpOZona = 'No Comercial'
        this.cpDZona = 'No Comercial'
      }else if(cp1 == 'PELIGROSA' && cp2 == 'PELIGROSA'){
        this.resClasificaZona = 'PELIGROSA'
        this.notColorZona = 'danger'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
        this.rutaOrigen = 'PELIGROSA'
        this.cpOZona = 'Peligrosa'
        this.cpDZona = 'Peligrosa'
      }else if(cp1 == 'COMERCIAL' && cp2 == 'NO COMERCIAL' || cp1 == 'NO COMERCIAL' && cp2 == 'COMERCIAL'){
        this.resClasificaZona = 'NO COMERCIAL'
        this.notColorZona = 'warning'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
        this.rutaOrigen = 'NO COMERCIAL'
        if(cp1 == 'COMERCIAL'){
          this.cpOZona = 'Comercial'
        }else{
          this.cpOZona = 'No Comercial'
        }
        if(cp2 == 'NO COMERCIAL'){
          this.cpDZona = 'No Comercial'
        }else{
          this.cpDZona = 'Comercial'
        }
      }else if(cp1 == 'COMERCIAL' && cp2 == 'PELIGROSA' || cp1 == 'PELIGROSA' && cp2 == 'COMERCIAL'){
        this.resClasificaZona = 'PELIGROSA'
        this.notColorZona = 'danger'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
        this.rutaOrigen = 'PELIGROSA'
        if(cp1 == 'COMERCIAL'){
          this.cpOZona = 'Comercial'
        }else{
          this.cpOZona = 'Peligrosa'
        }
        if(cp2 == 'PELIGROSA'){
          this.cpDZona = 'Peligrosa'
        }else{
          this.cpDZona = 'Comercial'
        }
      }else if(cp1 == 'NO COMERCIAL' && cp2 == 'PELIGROSA' || cp1 == 'PELIGROSA' && cp2 == 'NO COMERCIAL'){
        this.resClasificaZona = 'PELIGROSA'
        this.notColorZona = 'danger'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
        this.rutaOrigen = 'PELIGROSA'

        if(cp1 == 'NO COMERCIAL'){
          this.cpOZona = 'No Comercial'
        }else{
          this.cpOZona = 'Peligrosa'
        }
        if(cp2 == 'PELIGROSA'){
          this.cpDZona = 'Peligrosa'
        }else{
          this.cpDZona = 'No Comercial'
        }
      }else if(cp1 == 'COMERCIAL' && cp2 == '' || cp1 == '' && cp2 == 'COMERCIAL'){
        this.resClasificaZona = 'COMERCIAL'
        this.notColorZona = 'success'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
        this.rutaOrigen = 'COMERCIAL'
        if(cp1 == 'COMERCIAL'){
          this.cpOZona = 'Comercial'
        }else{
          this.cpOZona = 'Sin Zona Asignada'
        }
        if(cp2 == ''){
          this.cpDZona = 'Sin Zona Asignada'
        }else{
          this.cpDZona = 'Comercial'
        }
      }else if(cp1 == 'NO COMERCIAL' && cp2 == '' || cp1 == '' && cp2 == 'NO COMERCIAL'){
        this.resClasificaZona = 'NO COMERCIAL'
        this.notColorZona = 'warning'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
        this.rutaOrigen = 'NO COMERCIAL'
        if(cp1 == 'NO COMERCIAL'){
          this.cpOZona = 'No Comercial'
        }else{
          this.cpOZona = 'Sin Zona Asignada'
        }
        if(cp2 == ''){
          this.cpDZona = 'Sin Zona Asignada'
        }else{
          this.cpDZona = 'No Comercial'
        }
      }else if(cp1 == 'PELIGROSA' && cp2 == '' || cp1 == '' && cp2 == 'PELIGROSA'){
        this.resClasificaZona = 'PELIGROSA'
        this.notColorZona = 'danger'
        this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
        this.rutaOrigen = 'PELIGROSA'
        if(cp1 == 'PELIGROSA'){
          this.cpOZona = 'Peligrosa'
        }else{
          this.cpOZona = 'Sin Zona Asignada'
        }
        if(cp2 == ''){
          this.cpDZona = 'Sin Zona Asignada'
        }else{
          this.cpDZona = 'Peligrosa'
        }
      }else if(cp1 == '' && cp2 == '' || cp1 == '' && cp2 == ''){
        this.resClasificaZona = 'NO ZONA'
        this.notColorZona = 'primary'
        this.notTextoZona = 'No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.' 
        this.cpOZona = 'Sin Zona Asignada'
        this.cpDZona = 'Sin Zona Asignada'
        
      }
    },

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
              <div v-if="resClasificaZona != ''">
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
                    <b-form-group class="col-md-6" label="Fecha" label-for="input_fecha" hidden>
                      <b-form-input type="text" id="input_fecha" :value="dateNow" v-model="input_fecha" readonly class="text-center"></b-form-input>
                    </b-form-group>

                    <b-form-group  class="col-md-6" label="Fin Vigencia" label-for="input_vigencia">
                        <b-form-input type="date" id="input_vigencia" :min="dateNow" v-model="input_vigencia" class="text-center"></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="Servicio" label-for="input_servicio">
                      <select id="input_servicio" class="form-control" v-model.trim="input_servicio" @change="showinputtServicio($event)">
                        <option v-for="service in all_services" :key="service.id" v-bind:value="service.id">
                          {{ service.name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group  class="col-md-2" label="Identificador" label-for="input_identificador" style="display: none">
                        <b-form-input type="text" id="input_identificador" v-model="input_identificador" class="text-center" readonly></b-form-input>
                    </b-form-group>
                  </div>

                  <div class="form-row">
                    
                    
                    <b-form-group class="col-md-6" label="Modalidad" label-for="input_modalidad">
                      <select id="input_modalidad" class="form-control" v-model.trim="input_modalidad">
                        <option
                          v-for="modalidad in all_modalidad"
                          :key="modalidad.id"
                          v-bind:value="modalidad.id"
                        >
                          {{ modalidad.name }}
                        </option>
                      </select>
                    </b-form-group>                    

                    <b-form-group class="col-md-6" label="Proveedor" label-for="proveedor">

                      <v-autocomplete :items="dates_search_proveedor" v-model="proveedor" :get-label="getLabel_proovedor" :component-item='template_proveedor' @update-items="updateItems_proveedor" input-class="col-md-12 form-control" placeholder="buscar..." item-text="proveedor" item-value="proveedor"> 
                      </v-autocomplete>

                      <div class="input-group"  v-show="activoLabelProveedor == true">
                          <b-form-input placeholder="" v-model.trim="servicioBuscar2" @input="servicioBuscar2 = servicioBuscar2.toUpperCase()"></b-form-input>
                      </div>

                      <b-form-input id="id_proveedor" v-model="id_proveedor" hidden></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="A Venta" label-for="input_venta">
                      <b-form-checkbox
                        id="checkVentas"
                        class="col-md-6"
                        v-model="checkVentas"
                        value="true"
                        unchecked-value="false"
                        v-show="activoAutoService == true"
                        >
                    </b-form-checkbox>
                    
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Ruta" label-for="input_ruta" v-show="activaRuta == true">
                      <select id="origin" class="rounded form-control col-md-12" v-model.trim="rutaOrigen" disabled>
                          <option v-for="zonao in zonaOrigen" :key="zonao.id" v-bind:value="zonao.value">
                            {{ zonao.value }}
                          </option>
                        </select>
                    </b-form-group>
                  </div>

                  <!-- #2 parte -->
                  
                  <b-form-group label="Servicios" label-for="input_servicios" v-show="activoServicios == true">
                    
                    <!-- //modificad 290621 -->
                    <v-autocomplete 
                        :items="dates_search_service" 
                        v-model="input_servicios" 
                        :get-label="getLabel_service" 
                        :component-item='template_service' 
                        @update-items="updateItems_service"
                        input-class="col-md-12 form-control"
                        placeholder="buscar..."
                        item-text="input_servicios"
                        item-value="input_servicios"
                        v-show="activoAutoService == true"                        
                         > 
                    </v-autocomplete>        
                    <!-- @blur="validarService"                       -->

                    <div class="input-group" v-show="activoLabelService == true">
                        <b-form-input placeholder="" v-model.trim="servicioBuscar" @input="servicioBuscar = servicioBuscar.toUpperCase()"></b-form-input>
                        <!-- <div class="input-group-append">
                          <b-button
                            v-b-tooltip.hover="{ variant: 'success' }"
                            title="Cambiar"
                            variant="secondary"
                            style="padding: 7px"
                            class="btn btn-secondary waves-effect waves-light"
                            @click="cambiarAutoService"                              
                            ><i class="fe-refresh-ccw"></i
                          ></b-button>
                        </div> -->
                    </div>

                    <b-form-input id="id_servicio" v-model="id_servicio" hidden></b-form-input>
                  </b-form-group>                  

                  <b-form-group v-show="activoOrigen == true">
                    <label class="form-label">Origen</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_origen" v-model="input_origen" readonly/>
                      <div class="input-group-append">
                        <b-button
                          v-b-modal.modal-origen-destino
                          data-toggle="modal"
                          data-target="#modal-origen-destino"
                          id="btn-add-origen"
                          v-b-tooltip.hover="{ variant: 'success' }"
                          title="Agregar Origen"
                          variant="secondary"
                          style="padding: 7px"
                          class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino(1)"                              
                          ><i class="fas fa-plus-circle"></i
                        ></b-button>
                      </div>
                    </div>
                    <sub v-show="resClasificaZona"><b-alert show v-bind:variant="notColorZona">Detalle de Zona: <b>{{ cpOZona }}</b></b-alert></sub>
                  </b-form-group>

                  <b-form-group v-show="activoDestino == true">
                    <label class="form-label">Destino</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_destino" v-model="input_destino" readonly/>
                      <div class="input-group-append">
                        <b-button
                          v-b-modal.modal-origen-destino
                          data-toggle="modal"
                          data-target="#modal-origen-destino"
                          id="btn-add-destino"
                          v-b-tooltip.hover="{ variant: 'success' }"
                          title="Agregar destino"
                          variant="secondary"
                          style="padding: 7px"
                          class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino(2)"                              
                          ><i class="fas fa-plus-circle"></i
                        ></b-button>
                      </div>
                    </div>
                    <sub v-show="resClasificaZona"><b-alert show v-bind:variant="notColorZona">Detalle de Zona: <b>{{ cpDZona }}</b></b-alert></sub>
                  </b-form-group>

                  <!-- <b-form-group v-show="activaRuta == true">
                    <label class="form-label">Direccion</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_direccion" v-model="input_direccion" readonly/>
                      <div class="input-group-append">
                        <b-button
                          v-b-modal.modal-origen-destino
                          data-toggle="modal"
                          data-target="#modal-origen-destino"
                          id="btn-add-origen"
                          v-b-tooltip.hover="{ variant: 'success' }"
                          title="Agregar Ruta"
                          variant="secondary"
                          style="padding: 7px"
                          class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino(3)"                              
                          ><i class="fas fa-plus-circle"></i
                        ></b-button>
                      </div>
                    </div>
                  </b-form-group> -->

                  <b-form-group label="Aduana" label-for="input_aduana" v-show="activoAduana == true">

                    <v-autocomplete 
                        :items="dates_search_aduana" 
                        v-model="inputAduana" 
                        :get-label="getLabel_aduana" 
                        :component-item='template_aduana' 
                        @update-items="updateItems_aduana"
                        input-class="col-md-12 form-control"
                        placeholder="buscar..."
                        item-text="inputAduana"
                        item-value="inputAduana"
                        v-show="activoAutoAduana== true"
                         > 
                    </v-autocomplete>

                    <b-form-input type="search" id="input_aduana" v-model="input_aduana" v-show="activolabAduana == true"></b-form-input>
                    <b-form-input hidden id="id_input_aduana" v-model="id_input_aduana"></b-form-input>

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
                      <input type="text" class="form-control" id="input_origen_man" v-model="input_origen_man" readonly/>
                      <div class="input-group-append">
                        <b-button
                          v-b-modal.modal-origen-destino
                          data-toggle="modal"
                          data-target="#modal-origen-destino"
                          id="btn-add-origen-m"
                          v-b-tooltip.hover="{ variant: 'success' }"
                          title="Agregar Origen"
                          variant="secondary"
                          style="padding: 7px"
                          class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino_m(1)"                              
                          ><i class="fas fa-plus-circle"></i
                        ></b-button>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label="Aduana" label-for="input_aduana_man" v-show="activoAduana_m == true">
                    <!-- <b-form-input type="search" id="input_aduana_man" v-model="input_aduana_man"></b-form-input> -->

                     <v-autocomplete 
                        :items="dates_search_aduana" 
                        v-model="inputAduana_man" 
                        :get-label="getLabel_aduana_man" 
                        :component-item='template_aduana' 
                        @update-items="updateItems_aduana_man"
                        input-class="col-md-12 form-control"
                        placeholder="buscar..."
                        item-text="inputAduana_man"
                        item-value="inputAduana_man"
                        v-show="activoAutoAduana_man== true"
                         > 
                    </v-autocomplete>

                    <b-form-input type="search" id="input_aduana_man" v-model="input_aduana_man" v-show="activolabAduana_man == true"></b-form-input>
                    <b-form-input hidden id="id_input_aduana_man" v-model="id_input_aduana_man"></b-form-input>

                  </b-form-group>

                  <b-form-group v-show="activoDestino_m == true">
                    <label class="form-label">Destino</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_destino_man" v-model="input_destino_man" readonly/>
                      <div class="input-group-append">
                        <b-button
                          v-b-modal.modal-origen-destino
                          data-toggle="modal"
                          data-target="#modal-origen-destino"
                          id="btn-add-destino-m"
                          v-b-tooltip.hover="{ variant: 'success' }"
                          title="Agregar destino"
                          variant="secondary"
                          style="padding: 7px"
                          class="btn btn-secondary waves-effect waves-light"
                          @click="showOrigenDestino_m(2)"                              
                          ><i class="fas fa-plus-circle"></i>
                        </b-button>
                      </div>
                    </div>
                  </b-form-group>

                  <!-- #3parte -->

                  <b-form-group v-show="activoCommodity_m == true" class="text-center bg-light">                    
                     <b-form-radio-group v-model="selected_tipo" :options="options_tipo" value-field="item" text-field="name" @change="selectTipoUnidad"></b-form-radio-group>
                  </b-form-group>

                  <div class="form-row" v-show="activoUN == true">
                    <b-form-group class="col-md-6" label="UN" label-for="input_un" >
                      <b-form-input type="text" v-model="input_un"></b-form-input>
                    </b-form-group>
                    <b-form-group  class="col-md-6" label="Class" label-for="input_class">
                      <b-form-input type="text" v-model="input_class"></b-form-input>
                    </b-form-group>
                  </div>

                  <div class="form-row">
                    <b-form-group class="col-md-6" label="Tipo Unidad" label-for="input_tipo_unidad" v-show="activoUnidad == true">
                      <select id="input_tipo_unidad" class="form-control" v-model.trim="input_tipo_unidad">
                        <option v-for="truck in all_unidades" :key="truck.id" v-bind:value="truck.id">
                          {{ truck.code_name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group  class="col-md-6" label="Dias Transito" label-for="input_dias_transito" v-show="activoDias == true">
                      <b-form-input type="number" id="input_dias_transito"  min="0" max="10" :minlength="0" :maxlength="3" v-model="input_dias_transito"></b-form-input>
                    </b-form-group>
                  </div>                  

                </form>
              </div>

              <div class="col-md-6">
                <p></p>

                <div class="form-row">

                  <b-form-group class="col-md-2" label="Divisa" label-for="input_divisa">
                    <select id="input_divisa" class="form-control" v-model="input_divisa" style="padding: 5px">
                      <option
                        v-for="divisa in all_divisa"
                        :key="divisa.item"
                        v-bind:value="divisa.item"
                      >
                        {{ divisa.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Subtotal" label-for="input_subtotal">
                    <b-form-input type="number" id="input_subtotal" min="0" @change="imp_compra" v-model="input_subtotal" style="padding: 5px"></b-form-input>
                  </b-form-group>
                  
                  <b-form-group class="col-md-2" label="Tras." label-for="input_traslado">                      
                    <select class="form-control" v-model="input_traslado" @change="imp_compra" style="padding: 5px">
                      <option
                        v-for="iva in all_iva"
                        :key="iva.item"
                        v-bind:value="iva.item"
                      >
                        {{ iva.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-2" label="Ret." label-for="input_retencion">
                    <select id="input_retencion" class="form-control" @change="imp_compra" v-model="input_retencion" style="padding: 5px"> 
                      <option
                        v-for="retencion in all_retencion"
                        :key="retencion.item"
                        v-bind:value="retencion.item"
                      >
                        {{ retencion.name }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Total" label-for="input_total">                      
                    <b-form-input type="number" id="input_total" min="0" v-model="input_total" readonly style="padding: 5px"></b-form-input>
                  </b-form-group>

                </div>

                <div class="form-row">
                  <b-form-group class="col-md-6" label="Venta %" label-for="input_venta">
                    <b-form-select type="text" id="input_venta" v-model="porcentajeVenta" rows="3">
                      <option
                      v-for="opc in pVenta"
                      :key="opc.id"
                      v-bind:value="opc.id"
                      :selected="opc.value==1"
                      > {{opc.value}}%</option>                    
                    </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-6" label="Express %" label-for="input_express">
                    <b-form-select 
                    type="text"
                    id="input_express"
                    v-model="porcentajeExpress"
                    rows="3">
                      <option
                      v-for="opt in pExpress"
                      :key="opt.id"
                      v-bind:value="opt.id"
                      :selected="opt.value==1"
                      > {{opt.value}}% </option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <b-form-group label="Nota" label-for="input_nota">
                  <b-form-textarea type="text" id="input_nota" v-model="input_nota" rows="3"></b-form-textarea>
                </b-form-group>

                <div class="form-row  mt-2">
                  <div class="col-lg-12">
                    <div class="justify-content-center row">
                      <b-button variant="secondary" @click="listServices()"
                        >Regresar</b-button>

                      <b-button class="ml-1" variant="primary" @click="saveService()"
                        >Guardar</b-button>
                      
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
            <select
                class="form-control"
                v-model.trim="paisOD"
                @change="getEstadoOD($event)" 
                ref="seleccionado_pais"
            >
                <option
                v-for="paises in countrys"
                :key="paises.id"
                v-bind:value="paises.id"
                >
                {{ paises.name }}
                </option>
            </select>
        </div>

        <div class="form-group row col-6">
          
            <label for="cp">C.P.</label>

            <v-autocomplete 
            :items="dates_search" 
            v-model="cpOD" 
            :get-label="getLabel" 
            :component-item='template' 
            @update-items="updateItems"
            input-class="form-control"
            placeholder="buscar..."
            item-text="cpOD"
            item-value="cpOD"
            return-object> 
            </v-autocomplete>

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
          <b-form-input type="text" v-model.trim="cityOD" @input="cityOD=cityOD.toUpperCase()"></b-form-input>
        </div>

        <div class="form-group text-right">
          <b-button class="width-md ml-1" variant="secondary" @click="show=false">Cerrar</b-button>
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