<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

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

      form:{
        input_servicio:""
      },

      all_services:[
        {id: 1, name:"FLETE NACIONAL"},
        {id: 2, name:"INTERNATIONAL FREIGHT"},
        {id: 3, name:"FLETE DIRECTO"},
        {id: 10, name:"OTRO"}
      ],

      all_unidades:[
          {id: 1, name:"CAJA 53"},
          {id: 2, name:"CAJA 48"},
          {id: 3, name:"TORTON"},
          {id: 4, name:"RABON"},
      ],

      options_tipo: [
        { item: 'h', name: 'Hazmat' },
        { item: 'r', name: 'Refrigerada' },
        { item: 'g', name: 'General' },
        { item: 'e', name: 'Especial' },
      ],
      all_divisa:[
        { item: '1', name: 'USD' },
        { item: '2', name: 'MXN' },        
      ],
      all_iva:[
        { item: '0', name: '0 %' },
        { item: '8', name: '8 %' },
        { item: '16', name: '16 %' },
      ],
      all_retencion:[
        { item: '0', name: '0 %' },
        { item: '4', name: '4 %' },
      ],

      selected_tipo: '',

      activoServicios: false,
      activoOrigen: false,
      activoDestino: false,
      activoAduana: false,
      activoManiobra: false,
      servicioBuscar: "",

      activoOrigen_m: false,
      activoDestino_m: false,
      activoAduana_m: false,

      activoCommodity_m:false,

      activoUnidad: false,
    //   activoNota: false,
      activoDias: false,

      opt_select_man:"",

    }
  },
  created:{
  },
  methods: {
    showinputtServicio(event){


        this.activoCommodity_m=false
        this.activoUnidad=false
        this.activoDias=false


        this.activoServicios=false
        this.activoOrigen=false
        this.activoDestino=false
        this.activoAduana=false
        this.activoManiobra=false

        const opcionServicio = event.target.value

        if(opcionServicio==10){
            this.activoServicios=true
        }

        //1 FLETE NACIONAL
        //2 INTERNATIONAL FREIGHT
        //3 FLETE DIRECTO
        //4 OTRO
        if(opcionServicio==1 || opcionServicio==2 || opcionServicio==3){
            this.activoOrigen=true
            this.activoDestino=true

            this.activoCommodity_m=true
            this.activoUnidad=true
            this.activoDias=true
        }
    },
    validarService(){

        this.activoCommodity_m=false
        this.activoUnidad=false
        this.activoDias=false


        let txtServiceSearch = this.servicioBuscar

        let txtServiceSearch_may=txtServiceSearch.toUpperCase() 
        let txtServiceSearch_min=txtServiceSearch.toLowerCase()

        if(txtServiceSearch_min=="cruce" || txtServiceSearch_may=="CRUCE"){
            this.activoOrigen=false
            this.activoDestino=false
            this.activoManiobra=false
            this.activoAduana=true 
            
            this.activoCommodity_m=true
            this.activoUnidad=true
            this.activoDias=true

        }else{
            if(txtServiceSearch_min=="maniobras" || txtServiceSearch_may=="MANIOBRAS"){
                this.activoOrigen=false
                this.activoDestino=false
                this.activoAduana=false   
                this.activoManiobra=true
            }else{
                this.activoOrigen=false
                this.activoDestino=false
                this.activoAduana=false   
                this.activoManiobra=false
            }
        }
    },
    optManiobra(){

        let optChManiobra = this.opt_select_man
        
        this.activoOrigen_m=false
        this.activoDestino_m=false
        this.activoAduana_m=false

        if(optChManiobra=="o"){
            this.activoOrigen_m=true
        }
        if(optChManiobra=="f"){
            this.activoAduana_m=true
        }
        if(optChManiobra=="d"){
            this.activoDestino_m=true
        }
    },
    selectTipoUnidad(){
        
        let tipoCajaS = this.selected_tipo
        
        // { item: 'h', name: 'Hazmat' },
        // { item: 'r', name: 'Refrigerada' },
        // { item: 'g', name: 'General' },
        // { item: 'e', name: 'Especial' },

        if(tipoCajaS=="h"){

        }
        if(tipoCajaS=="r"){
            
        }
        if(tipoCajaS=="g"){
            
        }
        if(tipoCajaS=="e"){
            
        }
    }

  },
  

}

</script>

<template>
 <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h5 class="header-title">Informacion del Servicio</h5>
            
            <p></p>
            
            <div class="row" style="border-bottom: 1px solid #f1f1f1">
              <div class="col-lg-12">
                <div class="form-row">
                    <b-form-group class="col-md-3" label="Fecha" label-for="input-fecha">
                        <b-form-input size="sm" type="date" id="input-fecha"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-3" label="Fin Vigencia" label-for="input-vigencia">
                        <b-form-input size="sm" type="date" id="input-vigencia"></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-4">
                    </b-form-group>

                    <b-form-group class="col-md-2" label="Identificador" label-for="input-identificador" style="display:none">
                        <b-form-input size="sm" type="text" id="input-identificador" readonly></b-form-input>
                    </b-form-group>
                </div>

              </div>
            </div>

            <p></p>

            <div class="row"  style="border-bottom: 1px solid #f1f1f1">
              <div class="col-lg-12">

                <form>
                    <div class="form-row">
                        <b-form-group class="col-md-3" label="Servicio" label-for="input-servicio">
                            <select
                                  id="input-servicio"
                                  class="form-control form-control-sm"
                                  v-model.trim="form.input_servicio"
                                  @change="showinputtServicio($event)"
                                >
                                  <option
                                    v-for="service in all_services"
                                    :key="service.id"
                                    v-bind:value="service.id"
                                  >
                                    {{ service.name }}
                                  </option>
                            </select>
                        </b-form-group>

                        <b-form-group class="col-md-3" label="Servicios" label-for="input-servicios"  v-show="activoServicios == true">
                            <b-form-input size="sm" type="search" id="input-servicios" @blur="validarService" v-model="servicioBuscar" ></b-form-input>
                        </b-form-group>

                        <!-- #aqui van varias opciones -->

                        <!-- //apartado para origen y destino -->
                        <div class="form-group col-md-4" v-show="activoOrigen == true">
                            <label class="form-label">Origen</label>
                            <div class="">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" id="input-origen" readonly size="sm"/>
                                    <div class="input-group-append">
                                        <b-button id="btn-add-origen" size="sm" v-b-tooltip.hover="{ variant: 'success' }" title="Agregar Origen" variant="secondary"  lass="btn btn-secondary waves-effect waves-light"><i class="fas fa-plus-circle"></i></b-button>
                                        <!-- <b-tooltip target="btn-add-origen">Agregar Origen</b-tooltip> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-4" v-show="activoDestino == true">
                            <label class="form-label">Destino</label>
                            <div class="">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" id="input-destino" readonly size="sm"/>
                                    <div class="input-group-append">
                                        <b-button id="btn-add-destino" size="sm" v-b-tooltip.hover="{ variant: 'success' }"  title="Agregar Destino" variant="secondary"  lass="btn btn-secondary waves-effect waves-light"><i class="fas fa-plus-circle"></i></b-button>
                                        <!-- <b-tooltip target="btn-add-destino">Agregar Destino</b-tooltip> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- //apartado para las aduanas -->
                        <b-form-group class="col-md-6" label="Aduana" label-for="input-aduana"  v-show="activoAduana == true">
                            <b-form-input size="sm" type="search" id="input-aduana"></b-form-input>
                        </b-form-group>

                        <!-- //apartado para el de maniobras -->
                        <div class="form-group col-md-6" v-show="activoManiobra == true" style="border: 1px solid #f1f1f1">

                            <div class="row">
                                <div class="col-3">
                                    <div class="mt-2">
                                        <b-form-group >
                                            <b-form-radio v-model="opt_select_man" name="man_opt" value="o" @change="optManiobra">Origen</b-form-radio>
                                            <b-form-radio v-model="opt_select_man" name="man_opt" value="f" @change="optManiobra">Frontera</b-form-radio>
                                            <b-form-radio v-model="opt_select_man" name="man_opt" value="d" @change="optManiobra">Destino</b-form-radio>
                                        </b-form-group>
                                    </div>
                                </div>

                                <div class="col-9">

                                    <div class="row">

                                        <div class="form-group col-md-12" v-show="activoOrigen_m == true">
                                            <label class="form-label">Origen</label>
                                            <div class="">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="input-origen-man" readonly/>
                                                    <div class="input-group-append">
                                                        <b-button id="btn-add-origen-man" v-b-tooltip.hover="{ variant: 'success' }" title="Agregar Origen" variant="secondary" style="padding: 7px;" lass="btn btn-secondary waves-effect waves-light"><i class="fas fa-plus-circle"></i></b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12" v-show="activoDestino_m == true">
                                            <label class="form-label">Destino</label>
                                            <div class="">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="input-destino-man" readonly/>
                                                    <div class="input-group-append">
                                                        <b-button id="btn-add-destino-man" v-b-tooltip.hover="{ variant: 'success' }"  title="Agregar Destino" variant="secondary" style="padding: 7px;" lass="btn btn-secondary waves-effect waves-light"><i class="fas fa-plus-circle"></i></b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- //apartado para las aduanas -->
                                        <b-form-group class="col-md-12" label="Aduana" label-for="input-aduana-man"  v-show="activoAduana_m == true">
                                            <b-form-input size="sm" type="search" id="input-aduana-man"></b-form-input>
                                        </b-form-group>


                                    </div>                                    

                                </div>
                            </div>
                            
                        </div>


                    </div>

                </form>

              </div>
            </div>
            
            <p></p>

            <div class="row" style="border-bottom: 1px solid #f1f1f1">
              <div class="col-3 mt-3"  v-show="activoCommodity_m == true">

                   <b-form-radio-group
                    v-model="selected_tipo"
                    :options="options_tipo"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    @change="selectTipoUnidad"
                    size="sm"
                    ></b-form-radio-group>                 

              </div>
                
              <div class="col-md-2"></div>
              <!-- v-model.trim="form.input_servicio" -->
              
              <b-form-group size="sm" class="col-md-3" label="Tipo Unidad" label-for="input-tipo-unidad"  v-show="activoUnidad == true">
                <select
                        id="input-tipo-unidad"
                        class="form-control form-control-sm"
                    >
                        <option
                        v-for="truck in all_unidades"
                        :key="truck.id"
                        v-bind:value="truck.id"
                        >
                        {{ truck.name }}
                        </option>
                </select>
              </b-form-group>
              
              <b-form-group class="col-md-2" label="Nota" label-for="input-nota">
                <b-form-textarea type="text" id="input-nota" size="sm"></b-form-textarea>
              </b-form-group>
              
              <b-form-group class="col-md-2" label="Dias Transito" label-for="input-dias-transito"  v-show="activoDias == true">
                <b-form-input size="sm" type="number" id="input-dias-transito" min="0" max="10" :minlength="0" :maxlength="3"></b-form-input>
              </b-form-group>

            </div>

            <p></p>

            <div class="row">              
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div class="row" style="border: 1px solid #efefef">                    
                                <!-- v-model.trim="form.input_servicio" -->
                    <b-form-group class="col-md-2" label="Divisa" label-for="input-divisa">
                        <select
                        id="input-divisa"
                        class="form-control form-control-sm"
                        >
                            <option
                            v-for="divisa in all_divisa"
                            :key="divisa.id"
                            v-bind:value="divisa.id"
                            >
                            {{ divisa.name }}
                            </option>
                        </select>
                    </b-form-group>

                    <b-form-group class="col-md-3" label="Subtotal" label-for="input-subtotal">
                        <b-form-input size="sm" type="number" id="input-subtotal" min="0" ></b-form-input>
                    </b-form-group>

                    <b-form-group class="col-md-2" label="Traslado" label-for="input-traslado">
                        <select
                        id="input-traslado"
                        class="form-control form-control-sm"
                        >
                            <option
                            v-for="iva in all_iva"
                            :key="iva.id"
                            v-bind:value="iva.id"
                            >
                            {{ iva.name }}
                            </option>
                        </select>
                    </b-form-group>

                    <b-form-group class="col-md-2" label="Retencion" label-for="input-retencion">
                        <select
                        id="input-retencion"
                        class="form-control form-control-sm"
                        >
                            <option
                            v-for="retencion in all_retencion"
                            :key="retencion.id"
                            v-bind:value="retencion.id"
                            >
                            {{ retencion.name }}
                            </option>
                        </select>
                    </b-form-group>

                    <b-form-group class="col-md-3" label="Total" label-for="input-total">
                        <b-form-input size="sm" type="number" id="input-total" min="0" ></b-form-input>
                    </b-form-group>

                </div>
              </div>
              <div class="col-md-2"></div>
            </div>

            <div class="row mt-2">
              <div class="col-lg-12">
                <div class="form-group mb-0">
                    <div class="justify-content-center row">
                    <b-button variant="primary" @click="saveService()"
                        >Guardar</b-button
                    >
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
    




</Layout>
</template>

<style>
.autocomplete-input {
  padding: 10px 10px 10px 40px;
  font-size: 14px;
}
</style>