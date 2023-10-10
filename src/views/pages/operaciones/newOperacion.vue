<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'

export default {
  page: {
    title: "Nueva Operacion",
    meta: [{ name: "newOperacion", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {

      title: "Nueva Operacion",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Operaciones",
          href: "/operaciones/listOperaciones",
        },
        {
          text: "Nueva Operacion",
          href: "/newOperacion",
          active: true,
        },
      ],
      
      all_movimiento: [
        { id: 1, value: "FTL", text: "Caja Seca" },
        { id: 2, value: "FCL", text: "Plataforma" },
      ],
      all_envio: [          
        { id: 0, value: "Seleccione una Opcion" },
        { id: 1, value: "Nacional"},
        { id: 2, value: "Internacional"},
        { id: 3, value: "Mixed" },
      ],
      all_referencia_cliente: [          
        { id: "0", value: "Seleccione una Opcion" },
        { id: "PO", value: "PO"},
        { id: "OC", value: "OC"},
        { id: "OTHER", value: "OTHER" },
      ],      

      all_incoterms: [          
        { id: 0, value: "Seleccione una Opcion" },
        { id: 1, value: "CPT CARRIAGE PAID TO"},
        { id: 2, value: "FCA FREE CARRIER"},
        { id: 3, value: "CIP CARRIAGE PAID TO" },
        { id: 4, value: "CIP CARRIAGE AND INSURANCE PAID TO" },
        { id: 5, value: "DAT DELIVERED AT TERMINAL" },
        { id: 6, value: "DAP DELIVERED AT PLACE" },
        { id: 7, value: "DDP DELIVERED DUTY PAID" },
        { id: 8, value: "FAS FREE ALONGSIDE SHIP" },
        { id: 9, value: "FOB FREE ON BOARD" },
        { id: 10, value: "CFR COST AND FREIGHT" },
        { id: 11, value: "CIF COST, INSURANCE AND FREIGHT" },
        { id: 12, value: "EXW Ex Works" },
      ],   
      
       all_ppcc: [          
        { id: 0, value: "Seleccione una Opcion" },
        { id: "PP", value: "PP"},
        { id: "CC", value: "CC"},
      ],

      all_carga: [          
        { id: 0, value: "Seleccione una Opcion" },
        { id: "g", value: "General"},
        { id: "p", value: "Peligrosa"},
      ],

      all_unidades: [],

      //   all_selectunidad: [],

      all_selectunidad: [          
        { id: 0, num: 1, caja: "23", carga:"General" },
        { id: 1,carga:"General" },
        { id: 2, num: 3, caja: "45", carga:"General"},
      ],

      all_paquetes: [          
        { id: 0, value:"PALLETS" },
        { id: 1, value:"BULTO" },
        { id: 2, value:"ATADO" },
      ],

      all_contenedor: [          
        { id: 20, value:"20" },
        { id: 40, value:"40" },
      ],

      all_unidadcontainer: [          
        { id: "kg", value:"kg" },
        { id: "tn", value:"tn" },
      ],

      all_estibable: [          
        { id: "no", value:"No" },
        { id: "si", value:"Si" },
      ],      

      all_merchandice:[],      
     

      unidad:"kg",
      txt_cantidad:"",
      txt_largo:"",
      txt_ancho:"",
      txt_alto:"",
      peso:"",
      tot_peso:0,
      tot_volumen:0,
      txt_cbm:0,
      
      activoMercancia1:false,
      activoTablaMercancia:false,
      
      //variables para operaciones
      txt_referencia:"",
      txt_referencia2:"",
      txt_referencia3:"",
      idOperacion:"",
      fecha:"",
      tipo_movimiento:"FTL",
      tipo_envio:"1",

      cliente:"",
      idCliente:"",
      referencia_cliente:"0",
      ejecutivo_venta:"",

      bill:"",
      idBill:"",
      shipper:"",
      idShipper:"",
      direccion_shipper:"",
      consignee:"",
      idConsigne:"",
      direccion_consigne:"",

      notificante:"",
      idNotificante:"",
      incoterms:0,
      ppcc:"0",

      etd:"",
      eta:"",
      ejecutivo1:"",
      ejecutivo2:"",
      idEjecutivo1:"",
      idEjecutivo2:"",
      nota:"",

      activoRefPO:false,
      activoRefOC:false,
      activoRefOther:false,

      countrys: [],
      nota: "",      

    };
  },

  created() {
    // this.getContry();
    this.getUnidadBox('g');
    this.fecha_actual();

  },

  methods: {   

    //para las cajas
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

    saveUnidad(){

    },

    agregarMercanciaCaja(){
      this.activoAutoService=true
    },

    numeros(event){

        // if(window.event){//asignamos el valor de la tecla a keynum
        let keynum = event.charCode //IE
        // }else{
        //     keynum = event.charCode //FF
        // } 
        // console.log(keynum)

        //comprobamos si se encuentra en el rango numérico y que teclas no recibirá.
        if((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6 || keynum == 32 || keynum == 46  || keynum == 45 ||  keynum != 69){
            // return true;
           // this.txt_cantidad = String(this.txt_cantidad) + String(event.key)
        }else{
            // return false;
        }
    },

    camb_cant(){
      	// this.peso=0;
      	// this.tot_peso=0;
      	// this.txt_alto=0;
      	// this.txt_largo=0;
      	// this.txt_ancho=0;
      	// this.txt_cbm=0;
      	// this.tot_volumen=0; 
        this.oper1(); 
        this.oper_peso(); 
    },

    oper1(){

        // alert(event.target.value)

      	this.txt_cbm=0;
      	this.tot_volumen=0; 

      	let ba=0;

	    let txt_largo_=0;
	    let txt_ancho_=0;
	    let txt_alto_=0;

	    txt_largo_=this.txt_largo;
	    txt_ancho_=this.txt_ancho;
	    txt_alto_=this.txt_alto;

        let txt_c=0;
        let can=0;
        can= this.txt_cantidad;

        if(txt_largo_>0 && txt_ancho_>0 && txt_alto_>0 && can>0){

            let result_cbm=0;
            
            result_cbm=parseFloat(txt_largo_)*parseFloat(txt_ancho_)*parseFloat(txt_alto_);
            result_cbm=(parseFloat(result_cbm)/1000000);

            this.txt_cbm=result_cbm; 
            
            txt_c= this.txt_cbm;

            let op_v=0;

            op_v=parseFloat(can)*parseFloat(txt_c);

            op_v=this.trunc(op_v, 2);

            this.tot_volumen=op_v;

        }
	},

    oper_peso(){

        let cantidad=0;
        let peso_=0;

        cantidad=this.txt_cantidad;
        peso_=this.peso;

        let result_peso=0;

        if(cantidad > 0 && peso_>0){

            result_peso=parseFloat(cantidad)*parseFloat(peso_);   
            result_peso=this.trunc(result_peso, 2);

            this.tot_peso=result_peso;
        }
    },

    trunc (x, posiciones = 0) {

        let s = x.toString()
        let l = s.length
        let decimalLength = s.indexOf('.') + 1

        if (l - decimalLength <= posiciones){
            return x
        }

        let isNeg  = x < 0
        let decimal =  x % 1
        let entera  = isNeg ? Math.ceil(x) : Math.floor(x)
        let decimalFormated = Math.floor(
            Math.abs(decimal) * Math.pow(10, posiciones)
        )

        let finalNum = entera + 
            ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
        
        return finalNum;
    },

    save1(){

      axios({
        method: "post",
        url: `servicio/`,
        data: {

          claveProductoServicio: this.claveProSer2,

        },
        auth: {
            username: "admin",
            password: "123",
        },
      })
      .then((response) => {
        if(response){
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

    },

    fecha_actual(){

        let hoy = new Date();
        let dd = hoy.getDate();
        let mm = hoy.getMonth()+1; //hoy es 0!
        let yyyy = hoy.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 
        hoy = yyyy+'-'+mm+'-'+dd;

        this.fecha=hoy;
    },

    createCustomerReference(){
        let optRef=this.referencia_cliente;

        if(optRef=="PO"){ //po
            this.activoRefPO=true
        }else{
            if(optRef=="OC"){ //oc
                this.activoRefOC=true
            }else{
                if(optRef=="OTHER"){ //other
                    this.activoRefOther=true
                }else{
                    this.ref_po=''
                    this.activoRefPO=false
                    this.ref_oc=''
                    this.activoRefOC=false
                    this.ref_other=''
                    this.activoRefOther=false
                }			
            }
        }
    },

    cerrarRefPO(){
        this.ref_po=''
        this.activoRefPO=false
    },
    cerrarRefOC(){
        this.ref_oc=''
        this.activoRefOC=false
    },
    cerrarRefOther(){
        this.ref_other=''
        this.activoRefOther=false
    },

    getContry() {
      axios
        .get(`/api/v1/list-country/`)
        .then((response) => {
          this.countrys = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    nombrePais(pais){
      this.idPaisOrigen = pais
      if(pais == 1){
        this.namePais = "Estados Unidos"
      }else{
        this.namePais = "Mexico"
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
            <!-- <h5 class="header-title">Información de la Operacion</h5> -->

            <b-tabs nav-class="nav-tabs nav-bordered">
              <b-tab title="Información de la Operacion">

                <div class="row" style="margin-right: 15px; margin-left: 15px;">

                    <div class="card-body col-md-12 pt-0" style="border: 1px solid #f3f3f3;">
                        <!-- v-b-toggle.collapse-1 -->
                        <b-button squared  variant="secondary" class="text-left col-md-12 btn-sm"><b>Informacion General</b> <b style="float:right" id="txt_referencia"></b></b-button>
                        
                        <b-form-input id="idOperacion" v-model="idOperacion" hidden></b-form-input>
                        
                        <b-collapse id="collapse-1" class="mt-2 collapse show" style="display: block">

                            <div class="row">                           

                                <div class="col-md-12">                     

                                    <div class="row mb-0">
                                        <!-- <b-form-group class="col-md-6" label="UN" label-for="input_un" >
                                            <b-form-input type="text" v-model="input_un"></b-form-input>
                                        </b-form-group> -->
                                        <b-form-group class="col-md-2 mb-0" label="Fecha" label-for="Fecha" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="fecha" placeholder="" readonly id="fecha" size="sm" class="text-center"></b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-2 mb-0"></b-form-group>

                                        <b-form-group class="col-md-3 mb-0" label="Tipo Movimiento" label-for="Tipo Movimiento" label-size="sm" label-class="mb-0">
                                            <select id="tipo_movimiento" class="form-control form-control-sm" v-model.trim="tipo_movimiento">
                                                <option
                                                v-for="opcion in all_movimiento"
                                                :key="opcion.id"
                                                v-bind:value="opcion.value"
                                                >
                                                {{ opcion.text }}
                                                </option>
                                            </select>
                                        </b-form-group>


                                        <b-form-group class="col-md-3 mb-0" label="Tipo Envio" label-for="Tipo Envio" label-size="sm" label-class="mb-0">
                                            <select id="tipo_envio" class="form-control form-control-sm" v-model.trim="tipo_envio">
                                                <option
                                                v-for="opcion in all_envio"
                                                :key="opcion.id"
                                                v-bind:value="opcion.id"
                                                >
                                                {{ opcion.value }}
                                                </option>
                                            </select>
                                        </b-form-group>
                                    </div>

                                    <div class="row mb-1 mt-1"><div class="col-md-12"  style="border: 1px solid #f3f3f3"></div></div>
                                    
                                    <div class="row">
                                        <b-form-group class="col-md-4 mb-0" label="Cliente" label-for="cliente" label-size="sm" label-class="mb-0">
                                            <v-autocomplete 
                                            :items="dates_search_proser" 
                                            v-model="cliente" 
                                            :get-label="getLabelProSer" 
                                            :component-item='templateproser' 
                                            @update-items="updateItemsProSer"
                                            input-class="form-control form-control-sm"
                                            placeholder="buscar..."
                                            item-text="claveProSer"
                                            item-value="claveProSer"
                                            return-object> 
                                            </v-autocomplete>

                                            <b-form-input id="idCliente" v-model="idCliente" hidden></b-form-input>

                                        </b-form-group>  

                                        <b-form-group class="col-md-2 mb-0" label="Referencia Cliente" label-for="Referencia Cliente" label-size="sm" label-class="mb-0">
                                            <select id="referencia_cliente" class="form-control form-control-sm" v-model.trim="referencia_cliente" @change="createCustomerReference()">
                                                <option
                                                v-for="opcion in all_referencia_cliente"
                                                :key="opcion.id"
                                                v-bind:value="opcion.id"
                                                >
                                                {{ opcion.value }}
                                                </option>
                                            </select>
                                        </b-form-group>

                                        <!-- //opciones -->
                                        <b-form-group class="col-md-3 mb-0" label="-" label-for="-" label-size="sm" label-class="mb-0">
                                            <!-- <b-form-input v-model.trim="opt" placeholder="" readonly id="opt" size="sm"></b-form-input> -->
                                            <div class="row">
                                                <b-form-group class="col-md-12 mb-0 form-row form-group" label-size="sm" label-class="mb-0" v-show="activoRefPO == true">
                                                    <div class="input-group">
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" style="padding: 4px; font-size: 12px">PO</b-button>
                                                        </div>
                                                        <b-form-textarea type="text" id="ref_po" v-model="ref_po" rows="1" size="sm" style="height: 30px; "></b-form-textarea>
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" @click="cerrarRefPO" style="padding: 4px; font-size: 12px">X</b-button>
                                                        </div>
                                                    </div>
                                                </b-form-group>
                                                <b-form-group class="col-md-12 mb-0 form-row form-group" label-size="sm" label-class="mb-0" v-show="activoRefOC == true">
                                                    <div class="input-group">
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" style="padding: 5px; font-size: 12px">PC</b-button>
                                                        </div>
                                                        <b-form-textarea type="text" id="ref_oc" v-model="ref_oc" rows="1" size="sm" style="height: 30px;"></b-form-textarea>
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" @click="cerrarRefOC" style="padding: 4px; font-size: 12px">X</b-button>
                                                        </div>
                                                    </div>
                                                </b-form-group>
                                                <b-form-group class="col-md-12 mb-0 form-row form-group " label-size="sm" label-class="mb-0" v-show="activoRefOther == true">
                                                    <div class="input-group">
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" style="padding: 4px; font-size: 12px">OTHER</b-button>
                                                        </div>
                                                        <b-form-textarea type="text" id="ref_other" v-model="ref_other" rows="1" size="sm" style="height: 30px; "></b-form-textarea>
                                                        <div class="input-group-append">
                                                            <b-button variant="secondary" class="btn btn-primary btn-sm" size="sm" @click="cerrarRefOther" style="padding: 4px; font-size: 12px">X</b-button>
                                                        </div>
                                                    </div>
                                                </b-form-group>
                                            </div>

                                        </b-form-group>

                                        <b-form-group class="col-md-3 mb-0" label="Ejecutivo de Venta" label-for="Ejecutivo de Venta" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="ejecutivo_venta" placeholder="" readonly id="ejecutivo_venta" size="sm"></b-form-input>
                                        </b-form-group>

                                    </div>

                                    <div class="row">
                                        <b-form-checkbox class="col-md-12" v-model="statusweek" value="true" unchecked-value="false" @change="selectPayWeek(1)" style="padding-left: 35px;" > Bill to = Cliente</b-form-checkbox>

                                        <b-form-group class="col-md-4 mb-0"  label-size="sm" label-class="mb-0">
                                        
                                            <v-autocomplete 
                                            :items="dates_search_proser" 
                                            v-model="bill" 
                                            :get-label="getLabelProSer" 
                                            :component-item='templateproser' 
                                            @update-items="updateItemsProSer"
                                            input-class="form-control form-control-sm"
                                            placeholder="buscar..."
                                            item-text="claveProSer"
                                            item-value="claveProSer"
                                            return-object> 
                                            </v-autocomplete>
                                        </b-form-group>
                                        <b-form-input id="idBill" v-model="idBill" hidden></b-form-input>
                                    </div>

                                    <div class="row">
                                        <b-form-group class="col-md-4 mb-0" label="Shipper" label-for="Shipper" label-size="sm" label-class="mb-0">
                                            <v-autocomplete 
                                            :items="dates_search_proser" 
                                            v-model="shipper" 
                                            :get-label="getLabelProSer" 
                                            :component-item='templateproser' 
                                            @update-items="updateItemsProSer"
                                            input-class="form-control form-control-sm"
                                            placeholder="buscar..."
                                            item-text="claveProSer"
                                            item-value="claveProSer"
                                            return-object> 
                                            </v-autocomplete>
                                        </b-form-group>
                                        <b-form-input id="idShipper" v-model="idShipper" hidden></b-form-input>

                                        <b-form-group class="col-md-8 mb-0" label="Direccion" label-for="Direccion" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="direccion_shipper" placeholder="" readonly id="direccion_shipper" size="sm"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="row">

                                        <b-form-group class="col-md-4 mb-0" label="Consignee" label-for="Consignee" label-size="sm" label-class="mb-0">
                                            <v-autocomplete 
                                            :items="dates_search_proser" 
                                            v-model="consignee" 
                                            :get-label="getLabelProSer" 
                                            :component-item='templateproser' 
                                            @update-items="updateItemsProSer"
                                            input-class="form-control form-control-sm"
                                            placeholder="buscar..."
                                            item-text="claveProSer"
                                            item-value="claveProSer"
                                            return-object> 
                                            </v-autocomplete>
                                        </b-form-group>
                                        <b-form-input id="idConsigne" v-model="idConsigne" hidden></b-form-input>

                                        <b-form-group class="col-md-8 mb-0" label="Direccion" label-for="Direccion" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="direccion_consigne" placeholder="" readonly id="direccion_consigne" size="sm"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="row">
                                        <b-form-checkbox class="col-md-12" v-model="statusweek" value="true" unchecked-value="false" @change="selectPayWeek(1)" style="padding-left: 35px;" > Notificante = Consignee</b-form-checkbox>

                                        <b-form-group class="col-md-4 mb-0" size="sm" label-class="mb-0">
                                            <v-autocomplete 
                                            :items="dates_search_proser" 
                                            v-model="notificante" 
                                            :get-label="getLabelProSer" 
                                            :component-item='templateproser' 
                                            @update-items="updateItemsProSer"
                                            input-class="form-control form-control-sm"
                                            placeholder="buscar..."
                                            item-text="claveProSer"
                                            item-value="claveProSer"
                                            return-object> 
                                            </v-autocomplete>
                                        </b-form-group>
                                        <b-form-input id="idNotificante" v-model="idNotificante" hidden></b-form-input>

                                    </div>

                                    <div class="row mb-1 mt-1"><div class="col-md-12"  style="border: 1px solid #f3f3f3"></div></div>

                                    <div class="row">
                                        <b-form-group class="col-md-4 mb-0" label="Incoterms" label-for="Incoterms" label-size="sm" label-class="mb-0">
                                            <select id="incoterms" class="form-control form-control-sm" v-model.trim="incoterms">
                                                <option
                                                v-for="opcion in all_incoterms"
                                                :key="opcion.id"
                                                v-bind:value="opcion.id"
                                                >
                                                {{ opcion.value }}
                                                </option>
                                            </select>
                                        </b-form-group>

                                        <b-form-group class="col-md-2 mb-0" label="PP/CC" label-for="PPC/CC" label-size="sm" label-class="mb-0">
                                            <select id="ppcc" class="form-control form-control-sm" v-model.trim="ppcc">
                                                <option
                                                v-for="opcion in all_ppcc"
                                                :key="opcion.id"
                                                v-bind:value="opcion.id"
                                                >
                                                {{ opcion.value }}
                                                </option>
                                            </select>
                                        </b-form-group>

                                        <b-form-group class="col-md-3 mb-0" label="ETD" label-for="etd" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="etd" placeholder="" readonly id="etd" size="sm"></b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-3 mb-0" label="ETA" label-for="eta" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="eta" placeholder="" readonly id="eta" size="sm"></b-form-input>
                                        </b-form-group>

                                    </div>

                                    <div class="row">
                                        <b-form-group class="col-md-4 mb-0" label="Ejecutivo 1" label-for="Ejecutivo 1" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="ejecutivo1" placeholder="" id="ejecutivo1" size="sm"></b-form-input>
                                            <b-form-input id="idEjecutivo1" v-model="idEjecutivo1" hidden></b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-4 mb-0" label="Ejecutivo 2" label-for="Ejecutivo 2" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="ejecutivo2" placeholder="" id="ejecutivo2" size="sm"></b-form-input>
                                            <b-form-input id="idEjecutivo2" v-model="idEjecutivo2" hidden></b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-4 mb-0" label="Nota" label-for="Nota" label-size="sm" label-class="mb-0">
                                            <b-form-textarea type="text" id="nota" v-model="nota" rows="2" size="sm"></b-form-textarea>
                                        </b-form-group>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12 mt-2" style="">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="justify-content-center row">
                                                        <b-button variant="primary" @click="save1()" size="sm">Guardar</b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                                         
                                </div>

                            </div>
                        </b-collapse>                    
                    </div> 
                
                </div>

              </b-tab>
              

             <!-- //para la mercancia -->
              <b-tab title="Datos Mercancia">
                <div class="row" style="margin-right: 15px; margin-left: 15px;">                       

                    <div class="card-body col-md-12 pt-0" style="border: 1px solid #f3f3f3;">
                        <!-- v-b-toggle.collapse-2 -->
                        <b-button squared variant="secondary" class="text-left col-md-12 btn-sm"><b>Datos Mercancia</b> <b style="float:right" id="txt_referencia2"></b></b-button>

                        <b-collapse id="collapse-2" class="mt-2 collapse show" style="display: block">
                            <div class="row">
                                <div class="col-md-12">                    

                                    <div class="row mb-0">
                                        <div class="col-md-6">   
                                            <div class="row">
                                                <b-form-group class="col-md-8 mb-0" label="Tipo de Trailer - Caja" label-for="Tipo de Trailer - Caja" label-size="sm" label-class="mb-0">
                                                    <select id="tipo_caja" class="form-control form-control-sm" v-model.trim="tipo_caja">
                                                        <option
                                                        v-for="truck in all_unidades"
                                                        :key="truck.id"
                                                        v-bind:value="truck.id"
                                                        >
                                                        {{ truck.code_name }}
                                                        </option>
                                                    </select>
                                                </b-form-group>

                                                <b-form-group class="col-md-8 mb-0" label="Especificaciones Unidad" label-for="Especificaciones Unidad" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="especificaciones_unidad" placeholder="" id="especificaciones_unidad" size="sm"></b-form-input>
                                                </b-form-group>

                                                <b-form-group class="col-md-8 mb-0" label="Tipo de Carga" label-for="Tipo de Carga" label-size="sm" label-class="mb-0">
                                                    <select id="tipo_carga" class="form-control form-control-sm" v-model.trim="tipo_carga">
                                                        <option
                                                        v-for="opcion in all_carga"
                                                        :key="opcion.id"
                                                        v-bind:value="opcion.id"
                                                        >
                                                        {{ opcion.value }}
                                                        </option>
                                                    </select>
                                                </b-form-group>

                                                <b-form-group class="col-md-2 mb-0" label="-" label-for="-" label-size="sm" label-class="mb-0">
                                                    <b-button class="btn-sm" variant="success" @click="saveUnidad()">Agregar</b-button>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div class="col-md-6"> 

                                            <table class="table table-sm mb-0 mt-1" v-if="all_selectunidad.length > 0">
                                                <thead>
                                                    <tr style="background-color: #e4e4e4; font-size: 12px;">
                                                    <th style="padding: 5px;">#</th>
                                                    <th style="padding: 5px;">Tipo de Trailer - Caja</th>
                                                    <th style="padding: 5px;">Tipo de Carga</th>
                                                    <th style="padding: 5px;">Act</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="unidad in all_selectunidad" v-bind:key="unidad.id">
                                                        <td style="padding: 4px;">{{ unidad.num }}</td>   
                                                        <td style="padding: 4px;">{{ unidad.caja }}</td>                                                        
                                                        <td style="padding: 4px;">{{ unidad.carga }}</td>
                                                        <td style="padding: 4px;"> 
                                                            <i class="fas fa-plus-circle" title="Agregar Mercancia" @click="agregarMercanciaCaja(unidad.id)" style="cursor: pointer"></i>&nbsp;&nbsp;                
                                                            <i class="fas fa-list" title="Ver Informacion" @click="mostrar_m(unidad.id)" style="cursor: pointer"></i>&nbsp;&nbsp; 
                                                            <i class="fas fa-trash" title="Eliminar Caja" @click="deleteCaja(unidad.id)" style="cursor: pointer"></i>                                                          

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    
                                    <!-- //- -->
                                    <!-- mb-0 -->
                                    <div class="row mt-2" v-show="activoMercancia1 == false">
                                        
                                        <div class="col-md-12" style="border-top: 2px solid #f3f3f3"></div>

                                        <b-form-group class="col-md-2" label="Tipo Paquete" label-for="Tipo Paquete" label-size="sm" label-class="mb-0">
                                            <select id="tipo_paquete" class="form-control form-control-sm" v-model.trim="tipo_paquete">
                                                <option
                                                v-for="paquete in all_paquetes"
                                                :key="paquete.id"
                                                v-bind:value="paquete.id"
                                                >
                                                {{ paquete.value }}
                                                </option>
                                            </select>
                                        </b-form-group>

                                        <b-form-group class="col-md-2" label="Estibable" label-for="Estibable" label-size="sm" label-class="mb-0">
                                            <select id="estibable" class="form-control form-control-sm" v-model.trim="estibable">
                                                <option
                                                v-for="dat in all_estibable"
                                                :key="dat.id"
                                                v-bind:value="dat.id"
                                                >
                                                {{ dat.value }}
                                                </option>
                                            </select>
                                        </b-form-group>

                                        <b-form-group class="col-md-2" label="Tipo Mercancia" label-for="Tipo Mercancia" label-size="sm" label-class="mb-0">
                                            <select id="tipo_mercancia" class="form-control form-control-sm" v-model.trim="tipo_mercancia">
                                                <option
                                                v-for="paquete in all_paquetes"
                                                :key="paquete.id"
                                                v-bind:value="paquete.id"
                                                >
                                                {{ paquete.value }}
                                                </option>
                                            </select>
                                        </b-form-group>                                        

                                        <b-form-group class="col-md-4 mb-0" label="Descripcion Mercancia" label-for="Descripcion Mercancia" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="descripcion_mercancia" placeholder="" id="descripcion_mercancia" size="sm"></b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-2 mb-0" label="No Pedimento" label-for="No Pedimento" label-size="sm" label-class="mb-0">
                                            <b-form-input v-model.trim="no_pedimento" placeholder="" id="no_pedimento" size="sm"></b-form-input>
                                        </b-form-group>

                                        <!-- //otra parte -->

                                        <!-- para el material peligroso -->
                                        <div class="col-md-12 mb-1" style="border: 1px solid #f3f3f3">
                                            <div class="row">
                                                <b-form-group class="col-md-3 mb-0" label="Informacion Adicional" label-for="Informacion Adicional" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="informacion_adicional_p" placeholder="" id="informacion_adicional_p" size="sm"></b-form-input>
                                                </b-form-group>
                                                <b-form-group class="col-md-2 mb-0" label="UN" label-for="UN" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="un_p" placeholder="" id="un_p" size="sm"></b-form-input>
                                                </b-form-group>
                                                <b-form-group class="col-md-2 mb-0" label="Class" label-for="Class" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="classe_p" placeholder="" id="classe_p" size="sm"></b-form-input>
                                                </b-form-group>
                                                <b-form-group class="col-md-3 mb-0" label="Contacto" label-for="Contacto" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="contacto_p" placeholder="" id="contacto_p" size="sm"></b-form-input>
                                                </b-form-group>
                                                <b-form-group class="col-md-2 mb-0" label="Telefono" label-for="Telefono" label-size="sm" label-class="mb-0">
                                                    <b-form-input v-model.trim="telefono_p" placeholder="" id="telefono_p" size="sm"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>


                                        <div class="col-md-12" style="border-top: 1px solid #f3f3f3">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <table class="table table-sm" border="0">
                                                        <thead>
                                                            <tr style="background: #363636; font-size: 12px; color:#eee">
                                                                <th style="text-align: center;">Medicion</th>
                                                                <th style="text-align: center;">Paquetes/Cantidad</th>
                                                                <th style="text-align: center;">Largo</th>
                                                                <th style="text-align: center;">Ancho</th>
                                                                <th style="text-align: center;">Alto</th>
                                                                <th style="text-align: center;">PesoXPieza</th>
                                                                <th style="text-align: center;">Peso Total</th>
                                                                <th style="text-align: center;">Volumen(m3)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td style="padding: 1px;"><select class="form-control form-control-sm" id="unidad" name="unidad" v-model="unidad" style="padding: 1px;">
                                                                <option value="kg" title="Centimetro/Kilogramo">cm/kg</option>
                                                                <option value="lb" title="Pulgada/Libra">in/lb</option>
                                                            </select></td>
                                                            <!-- @keypress.stop.prevent="numeros($event)"   -->
                                                            <!-- @keypres="numeros(event);" -->
                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" value="" v-model="txt_cantidad" id="txt_cantidad" name="txt_cantidad" placeholder=""  @change="camb_cant()" style="padding: 1px;"></td>

                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="txt_largo" id="txt_largo" value="" name="txt_largo" placeholder=""   @change="oper1()" style="padding: 1px;"></td>
                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="txt_ancho" id="txt_ancho" value="" name="txt_ancho" placeholder=""  @change="oper1()" style="padding: 1px;"></td>
                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="txt_alto" id="txt_alto" value="" name="txt_alto" placeholder=""  @change="oper1()" style="padding: 1px;"></td>

                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="peso" id="peso" name="peso" value="" placeholder="" style=""  @change="oper_peso()"></td>                                                  
                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="tot_peso" id="tot_peso" name="tot_peso" value="" placeholder="" style="" readonly="readonly"></td>
                                                            <td style="padding: 1px;"><input type="number" class="form-control form-control-sm" v-model="tot_volumen" id="tot_volumen" name="tot_volumen" value="" placeholder="" readonly="readonly" style="padding: 1px;"></td>                  

                                                            <input type="text" class="form-control" id="txt_cbm" value="0" v-model="txt_cbm" name="txt_cbm" placeholder="" readonly="readonly" style="display: none;">
                                                        </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div> 
                                        </div>

                                        <!-- //para  los contenedores -->
                                        <div class="col-md-12" style="border-top: 1px solid #f3f3f3">
                                            <div class="row">
                                                <div class="col-md-6" style="border: 1px solid #efefef">
                                                    <div class="row">
                                                        <div class="col-md-12" style="font-size: 15px"><b-badge>Contenedor 1</b-badge></div>

                                                        <b-form-group class="col-md-3" label="Tamaño" label-for="Tamaño" label-size="sm" label-class="mb-0">
                                                            <select id="tamano_1" class="form-control form-control-sm" v-model.trim="tamano_1">
                                                                <option
                                                                v-for="contener in all_contenedor"
                                                                :key="contener.id"
                                                                v-bind:value="contener.id"
                                                                >
                                                                {{ contener.value }}
                                                                </option>
                                                            </select>
                                                        </b-form-group>

                                                        <b-form-group class="col-md-3 mb-0" label="Peso" label-for="Peso" label-size="sm" label-class="mb-0">
                                                            <b-form-input v-model.trim="peso_1" placeholder="" id="peso_1" size="sm"></b-form-input>
                                                        </b-form-group>
                                                        
                                                        <b-form-group class="col-md-2" label="Unidad" label-for="Unidad" label-size="sm" label-class="mb-0">
                                                            <select id="unidad_1" class="form-control form-control-sm" v-model.trim="unidad_1" style="padding: 5px;">
                                                                <option
                                                                v-for="contener in all_unidadcontainer"
                                                                :key="contener.id"
                                                                v-bind:value="contener.id"
                                                                >
                                                                {{ contener.value }}
                                                                </option>
                                                            </select>
                                                        </b-form-group>

                                                        <b-form-group class="col-md-4 mb-0" label="# Contenedor" label-for="# Contenedor" label-size="sm" label-class="mb-0">
                                                            <b-form-input v-model.trim="no_contenedor1" placeholder="" id="no_contenedor1" size="sm"></b-form-input>
                                                        </b-form-group>
                                                    </div>
                                                </div>

                                                <div class="col-md-6" style="border: 1px solid #efefef">
                                                    <div class="row">
                                                        <div class="col-md-12" style="font-size: 15px"><b-badge>Contenedor 2</b-badge></div>

                                                        <b-form-group class="col-md-3" label="Tamaño" label-for="Tamaño" label-size="sm" label-class="mb-0">
                                                            <select id="tamano_2" class="form-control form-control-sm" v-model.trim="tamano_2">
                                                                <option
                                                                v-for="contener in all_contenedor"
                                                                :key="contener.id"
                                                                v-bind:value="contener.id"
                                                                >
                                                                {{ contener.value }}
                                                                </option>
                                                            </select>
                                                        </b-form-group>

                                                        <b-form-group class="col-md-3 mb-0" label="Peso" label-for="Peso" label-size="sm" label-class="mb-0">
                                                            <b-form-input v-model.trim="peso_2" placeholder="" id="peso_2" size="sm"></b-form-input>
                                                        </b-form-group>
                                                        
                                                        <b-form-group class="col-md-2" label="Unidad" label-for="Unidad" label-size="sm" label-class="mb-0">
                                                            <select id="unidad_2" class="form-control form-control-sm" v-model.trim="unidad_2" style="padding: 5px;">
                                                                <option
                                                                v-for="contener in all_unidadcontainer"
                                                                :key="contener.id"
                                                                v-bind:value="contener.id"
                                                                >
                                                                {{ contener.value }}
                                                                </option>
                                                            </select>
                                                        </b-form-group>

                                                        <b-form-group class="col-md-4 mb-0" label="# Contenedor" label-for="# Contenedor" label-size="sm" label-class="mb-0">
                                                            <b-form-input v-model.trim="no_contenedor2" placeholder="" id="no_contenedor1" size="sm"></b-form-input>
                                                        </b-form-group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mt-2" style="">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="justify-content-center row">
                                                        <b-button variant="primary" @click="saveMerchandice()" size="sm">Guardar</b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <!-- para el listado de mercancias -->
                                    <div class="row mt-2" v-show="activoTablaMercancia == false">
                                        <div class="col-md-12" style="border-top: 1px solid #f3f3f3">
                                            <div class="row">
                                                <div class="col-md-12">

                                                    <table class="table table-sm mb-0 mt-1" v-if="all_merchandice.length > 0">
                                                        <thead>
                                                            <tr style="background: #f1f2f4; font-size: 12px; color:#1d1c1c">
                                                                <th style="text-align: center;">Medicion</th>
                                                                <th style="text-align: center;">Paquetes/Cantidad</th>
                                                                <th style="text-align: center;">Largo</th>
                                                                <th style="text-align: center;">Ancho</th>
                                                                <th style="text-align: center;">Alto</th>
                                                                <th style="text-align: center;">PesoXPieza</th>
                                                                <th style="text-align: center;">Peso Total</th>
                                                                <th style="text-align: center;">Volumen(m3)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="unidad in all_merchandice" v-bind:key="unidad.id">
                                                                <td style="padding: 1px;">{{ unidad.num }}</td>   
                                                                <td style="padding: 1px;">{{ unidad.caja }}</td>                                                        
                                                                <td style="padding: 1px;">{{ unidad.carga }}</td>
                                                                <td style="padding: 1px;"> 
                                                                    <i class="fas fa-plus-circle" title="Agregar Mercancia" @click="agregarMercanciaCaja(unidad.id)" style="cursor: pointer"></i>&nbsp;&nbsp;                
                                                                    <i class="fas fa-list" title="Ver Informacion" @click="mostrar_m(unidad.id)" style="cursor: pointer"></i>&nbsp;&nbsp; 
                                                                    <i class="fas fa-trash" title="Eliminar Caja" @click="deleteCaja(unidad.id)" style="cursor: pointer"></i> 
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div> 
                                        </div>
                                    </div>

                                
                                </div>
                            
                            </div>
                        </b-collapse>                    


                    </div> 
                        
                       

                </div>

              </b-tab>


              <b-tab title="Profit">
                
                <div class="row" style="margin-right: 15px; margin-left: 15px;">

                    <div class="card-body col-md-12 pt-0" style="border: 1px solid #f3f3f3;">
                        <div class="row">                           

                            <div class="col-md-12">
                            </div>
                        
                        </div>
                    </div>

                </div>          

              </b-tab>
              <!-- Fin Precios -->

            </b-tabs>
            <!-- Fin Tabs -->

          </div>
          <!-- Fin Car-dBody -->
        </div>

      </div>     
    </div>

  </Layout>
</template>

<style>

</style>
