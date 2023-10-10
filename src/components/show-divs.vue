<script>

import axios from "axios";

export default {
  name:'show-divs',
  // el:'show-divs',
  components: {},
  props: {
    idService:Number,
    // idService: {
    //   type: Number,
    //   default: "",
    // },
    // items: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
  },
  data(){
    return{

      show_div: true,
      show_vi:true,

      all_data:[],
      all_ids:[],
      lastpage: 0,//previous page
      nextpage: 0,//Next page
      indice_actual:0,
      indice_index:0,
      
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
      input_aduana:0,
      opt_select_man:'',
      input_origen_man:'',
      input_destino_man:'',
      input_aduana_man:'',
      selected_tipo:'',

      input_un:'',
      input_class:'',
      input_tipo_unidad:'',
      input_nota:'',
      input_dias_transito:'',
      input_divisa:1,

      id_servicio:0,

      input_modalidad:"FTL",

    }
  },
  created: function () {
    console.log("Iniciando ...");
    this.get_Servicess()
    // this.getServiceDetaills(this.idService)
  },
  methods: {
    get_Servicess() {

      axios
        .get('/api/v1/list-services/')
        .then(res => {
          this.all_data = res.data
          for (const property in this.all_data) {
            this.all_ids.push(this.all_data[property].id)
          }          
          // console.log(this.all_data)
          this.get_ids()
        })
        .catch((error) => {
          console.log(error);
        });     
   
    },
    get_ids(){
      if(this.all_ids.length>0){

        // if(this.indice_index>0){
        //   this.lastpage= this.all_data[this.indice_index-1].id
        //   this.indice_actual= this.all_data[this.indice_index].id
        //   this.nextpage= this.all_data[this.indice_index+1].id
        //   this.indice_index=this.indice_index+1

        // }else{          
        this.lastpage = 0
        this.indice_actual= this.all_data[this.indice_index].id
        this.nextpage= this.all_data[this.indice_index+1].id
        // this.indice_index=this.indice_index+1
        // }
        console.log("Inidice inicial:" + this.indice_index)

        this.getServiceDetaills(this.indice_actual)

      }else{
        this.indice_index=0
        this.lastpage=0
        this.nextpage=0
        this.indice_actual=0
      }
    },
    getLastNext(ids, opt){

      //ocultar el div
     //mostrar animcaicon
     this.show_div = !this.show_div


      let size_all=0
      size_all=this.all_data.length
      if(this.indice_index+1 <= size_all){

        if(this.all_data.length>0){
          //anterior
          if(opt==1){
            if(this.indice_index==0){
              this.lastpage=0
              this.nextpage= this.all_data[this.indice_index+1].id
              this.indice_index=0
            }else{
              // 1 =0
              this.indice_index=this.indice_index-1  
              if(this.indice_index==0){
                this.lastpage=0
              } else{
                this.lastpage= this.all_data[this.indice_index-1].id
              } 
              this.nextpage= this.all_data[this.indice_index+1].id
            }
            this.indice_actual= ids
          }

          //siguiente
          if(opt==2){                              // 0
            this.indice_index=this.indice_index+1  // 1, 2,  3,
            if(this.indice_index <= size_all-2){
              this.lastpage= this.all_data[this.indice_index-1].id //0,  1,  2,  
              this.indice_actual= ids
              this.nextpage= this.all_data[this.indice_index+1].id  //2, 3, 4,
            }else{
              this.lastpage= this.all_data[this.indice_index-1].id 
              this.indice_actual= ids    
              this.nextpage=0          
            }            
          }

          this.getServiceDetaills(ids)

          //para ejecutar una funcion secundaria
          setTimeout(this.divMostrar, 500)

        }else{
          this.indice_index=0
          this.lastpage=0
          this.nextpage=0
          this.indice_actual=0
        }
      }

      //mostrar el div
      // this.show_div = true
    },
    divMostrar(){
      this.show_div = !this.show_div
    },

    getServiceDetaills(idService){
      if(idService>0){

          axios
          .get(`/api/v1/servicioVenta/${idService}/`)
          .then((response) => {   

              this.getUnidadBox(response.data.unidaModality)

              this.input_identificador=response.data.id
              this.input_fecha=response.data.dateInicio
              this.input_aduana=response.data.idAduana

              this.input_modalidad=response.data.modality

              if(response.data.tipoServicio==10){
                  this.servicioBuscar=response.data.servicio
              }
              
              this.input_servicio=response.data.tipoServicio
              this.input_tipo_unidad=response.data.tipoUnidad
              this.input_subtotal=response.data.subtotal
              this.input_traslado=response.data.iva
              this.input_retencion=response.data.retencion
              this.input_total=response.data.total
              this.input_divisa=response.data.divisa
              this.input_vigencia=response.data.dateFin
              this.input_dias_transito=response.data.diasTransito
              this.input_nota=response.data.nota
              this.selected_tipo=response.data.unidaModality
              this.input_un=response.data.unHazmat
              this.input_class=response.data.classHazmat

              this.arrayOrigen.length=0
              let txt_pais_o=response.data.paisOrigen
              let cpOD_o=response.data.cpOrigen
              let txt_estado_o=response.data.estadoOrigen
              let cityOD_o=response.data.ciudadOrigen
              let paisOD_o=response.data.idpaisOrigen 
              let estadoOD_o=response.data.idestadoOrigen

              this.input_origen=txt_pais_o+" "+cpOD_o+" "+txt_estado_o+" "+cityOD_o
              let origen={'idpaisOrigen':paisOD_o, 'paisOrigen':txt_pais_o, 'cpOrigen':cpOD_o, 'idestadoOrigen':estadoOD_o,'estadoOrigen':txt_estado_o,'ciudadOrigen':cityOD_o}
              this.arrayOrigen.push(origen)
              
              this.arrayDestino.length=0
              let txt_pais_d=response.data.paisDestino
              let cpOD_d=response.data.cpDestino
              let txt_estado_d=response.data.estadoDestino
              let cityOD_d=response.data.ciudadDestino
              let paisOD_d=response.data.idpaisDestino 
              let estadoOD_d=response.data.idestadoDestino

              this.input_destino=txt_pais_d+" "+cpOD_d+" "+txt_estado_d+" "+cityOD_d
              let destino={'idpaisDestino':paisOD_d, 'paisDestino':txt_pais_d, 'cpDestino':cpOD_d, 'idestadoDestino':estadoOD_d,'estadoDestino':txt_estado_d,'ciudadDestino':cityOD_d}
              this.arrayDestino.push(destino)

              this.showinputtServicio(this.input_servicio, 2) 

              // this.get_ids()

          })
          .catch((error) => {
              console.log(error);
          });
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
    showinputtServicio(event, opt) {
      
      let opcionServicio=0
      if (opt==1){
        opcionServicio = event.target.value
      }else{
        opcionServicio = event
      }
    
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
        this.activoUN=false
        // this.activoClass=false   
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

        if(this.selected_tipo=="h"){
          this.activoUN=true
          // this.activoClass=true
        }
      }      
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
    validarService() {
      this.activoCommodity_m = false;
      this.activoUnidad = false;
      this.activoDias = false;

      let txtServiceSearch = this.servicioBuscar;

      let txtServiceSearch_may = txtServiceSearch.toUpperCase();
      let txtServiceSearch_min = txtServiceSearch.toLowerCase();

      if (txtServiceSearch_min == "cruce" || txtServiceSearch_may == "CRUCE") {
        this.activoOrigen = false;
        this.activoDestino = false;
        this.activoManiobra = false;
        this.activoAduana = true;

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

      if (optChManiobra == "o") {
        this.activoOrigen_m = true;
      }
      if (optChManiobra == "f") {
        this.activoAduana_m = true;
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

          this.activoUN=true
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

    // showOrigenDestino(valor){

    //     this.tipoOD=""
    //     this.paisOD=""
    //     this.cpOD=""
    //     this.estadoOD=""
    //     this.cityOD=""

    //     if(valor == 1){
    //         this.txt_origen_destino = "Origen"
    //         this.tipoOD=1
    //     }else if(valor == 2){
    //         this.txt_origen_destino = "Destino"
    //         this.tipoOD=2
    //     }
    // },
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
        // let cpOD_=this.cpOD
        // let cpOD_=document.getElementById('cpOD').value
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

        if(tipoOD_==1){
            
            this.arrayOrigen.length=0

            this.input_origen=txt_pais_+" "+cpOD_+" "+txt_estado_+" "+cityOD_

            let origen={'idpaisOrigen':paisOD_, 'paisOrigen':txt_pais_, 'cpOrigen':cpOD_, 'idestadoOrigen':estadoOD_,'estadoOrigen':txt_estado_,'ciudadOrigen':cityOD_}
            this.arrayOrigen.push(origen)

        }else{
            this.arrayDestino.length=0

            this.input_destino=txt_pais_+" "+cpOD_+" "+txt_estado_+" "+cityOD_

            let destino={'idpaisDestino':paisOD_, 'paisDestino':txt_pais_, 'cpDestino':cpOD_, 'idestadoDestino':estadoOD_,'estadoDestino':txt_estado_,'ciudadDestino':cityOD_}
            this.arrayDestino.push(destino)
        }

        this.show=false
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
    
    listServices() {
      this.$router.push(`/cotizaciones/listVentas`)
    },
  },

};
</script>

<template class="div-template">
  <!-- start page title -->
  <div class="row">
    <!-- <div class="col-md-1"></div> -->
    <div class="col-12">

      <b-card no-body>

        <b-card-body class="py-2">

          <div class="row mt-0 mb-1"  style="border-bottom: 3px solid #f5f5f5;">
            <div class="col-md-1" style="text-align: center">
              <div v-show="lastpage" style="background-color: #1c95dc; border-radius: 16px;color: white; font-size: 14px; font-weight: bold; cursor:pointer;" v-b-tooltip.hover="{ variant: 'info' }"
                                    title="Anterior" @click="getLastNext(lastpage, 1)">
                <!-- <i class="mdi mdi-arrow-left-bold-circle" style="color:#1c95dc; font-size: 33px; cursor: pointer;" title="Anterior"  @click="get_Servicess(lastpage)">                -->
                <!-- </i> -->
                <i class="mdi mdi-arrow-left-bold"></i>
                {{lastpage}}
              </div>
            </div>            
            <div class="col-md-4 text-center"></div>
            <div class="col-md-2 text-center">
              <div v-show="indice_actual" style="background-color: #4caf50; border-radius: 16px;color: white; font-size: 14px; font-weight: bold;" v-b-tooltip.hover="{ variant: 'success' }"
                          title="Actual">
                <!-- <i class="mdi mdi-arrow-left-bold-circle" style="color:#1c95dc; font-size: 33px; cursor: pointer;" title="Anterior"  @click="get_Servicess(lastpage)">                -->
                <!-- </i> -->
                {{indice_actual}}
              </div>
            </div>
            <div class="col-md-4 text-center"></div>
            <div class="col-md-1" style="text-align: center">
              <div v-show="nextpage" style="background-color: #1c95dc; border-radius: 16px;color: white; font-size: 14px; font-weight: bold; cursor:pointer;" v-b-tooltip.hover="{ variant: 'info' }"
                          title="Siguiente" @click="getLastNext(nextpage, 2)">
                {{nextpage}}
                <i class="mdi mdi-arrow-right-bold"></i>
              </div>
            </div>
          </div>

          <transition name="slide-fade">
          <div class="row" v-if="show_div" >
            <div class="col-md-12" >

              <!-- <div class="card"> -->
                <!-- <div class="card-body" style="padding: 10px"> -->
                  
                  <h5 class="header-title">Informacion del Servicio</h5>

                  <div class="row" style="margin-right: 15px; margin-left: 15px;">

                    <div class="col-md-6" style="border-right: 1px solid #f1f1f1">
                      <p></p>
                      <form>

                        <div class="form-row">
                          <b-form-group class="col-md-6" label="Fecha" label-for="input_fecha">
                            <b-form-input type="text" id="input_fecha" v-model="input_fecha" readonly class="text-center"></b-form-input>
                          </b-form-group>
                          <b-form-group  class="col-md-6" label="Fin Vigencia" label-for="input_vigencia">
                            <b-form-input type="text" id="input_vigencia"  v-model="input_vigencia" class="text-center" readonly></b-form-input>
                          </b-form-group>

                          <b-form-group  class="col-md-2" label="Identificador" label-for="input_identificador" style="display: none">
                            <b-form-input type="text" id="input_identificador" v-model="input_identificador" class="text-center" readonly></b-form-input>
                          </b-form-group>
                        </div>

                        <div class="form-row">
                          <!-- @change="showinputtServicio($event,1) -->
                          <b-form-group class="col-md-6" label="Servicio" label-for="input_servicio">
                            <select id="input_servicio" class="form-control" v-model.trim="input_servicio">
                              <option
                                v-for="service in all_services"
                                :key="service.id"
                                v-bind:value="service.id"
                              >
                                {{ service.name }}
                              </option>
                            </select>
                          </b-form-group>
                          
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

                        </div>
                      

                        <!-- #2 parte -->
                        
                        <b-form-group label="Servicios" label-for="input_servicios" v-show="activoServicios == true">
                          <b-form-input type="search" id="input_servicios" @blur="validarService"  v-model="servicioBuscar"></b-form-input>
                          <b-form-input id="id_servicio" v-model="id_servicio" hidden></b-form-input>
                        </b-form-group>

                        <b-form-group v-show="activoOrigen == true">
                          <label class="form-label">Origen</label>
                          <div class="input-group">
                            <input type="text" class="form-control" id="input_origen" v-model="input_origen" readonly/>
                            <!-- <div class="input-group-append">
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
                            </div> -->
                          </div>
                        </b-form-group>

                        <b-form-group v-show="activoDestino == true">
                          <label class="form-label">Destino</label>
                          <div class="input-group">
                            <input type="text" class="form-control" id="input_destino" v-model="input_destino" readonly/>
                            <!-- <div class="input-group-append">
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
                            </div> -->
                          </div>
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
                          <b-form-input type="search" id="input_aduana_man" v-model="input_aduana_man"></b-form-input>
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
                                ><i class="fas fa-plus-circle"></i
                              ></b-button>
                            </div>
                          </div>
                        </b-form-group>

                        <!-- #3parte -->

                        <b-form-group v-show="activoCommodity_m == true" class="text-center bg-light">                    
                          <b-form-radio-group
                              v-model="selected_tipo"
                              :options="options_tipo"
                              value-field="item"
                              text-field="name"
                            ></b-form-radio-group>
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
                              <option
                                v-for="truck in all_unidades"
                                :key="truck.id"
                                v-bind:value="truck.id"
                              >
                                {{ truck.code_name }}
                              </option>
                            </select>
                          </b-form-group>

                          <b-form-group  class="col-md-6" label="Dias Transito" label-for="input_dias_transito" v-show="activoDias == true">
                            <b-form-input type="number" id="input_dias_transito"  min="0" max="10" :minlength="0" :maxlength="3" v-model="input_dias_transito" readonly></b-form-input>
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
                          <b-form-input type="number" id="input_subtotal" min="0" v-model="input_subtotal" style="padding: 5px" readonly></b-form-input>
                        </b-form-group>
                        
                        <b-form-group class="col-md-2" label="Tras." label-for="input_traslado">                      
                          <select class="form-control" v-model="input_traslado" style="padding: 5px">
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
                          <select id="input_retencion" class="form-control" v-model="input_retencion" style="padding: 5px"> 
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

                      <b-form-group label="Nota" label-for="input_nota">
                        <b-form-textarea type="text" id="input_nota" v-model="input_nota" rows="3" readonly></b-form-textarea>
                      </b-form-group>
                    
                    </div>

                  </div>

                <!-- </div> -->
              <!-- </div> -->

            </div>

            <div class="col-lg-12" style="border-top: 2px solid #f5f5f5">
              <div class="justify-content-center row  mt-2">
                <b-button variant="secondary" @click="listServices()"
                  >Regresar</b-button>                  
              </div>
            </div>

          </div>

          </transition>


        </b-card-body>

      </b-card>
        
    </div>
    <!-- <div class="col-md-1"></div> -->
  </div>
  <!-- end page title -->
</template>

<style scoped>

.div-template {
  border: none;
  background-color: #ffffff00;
  box-shadow: none;
}

/* Las animaciones de entrada y salida pueden usar */
/* funciones de espera y duración diferentes.      */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
