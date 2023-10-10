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
import ItemTemplate from '@/components/ItemTemplateSearch'


export default {
  page: {
    title: "Nueva Ruta",
    meta: [{ name: "newRuta", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {
      // cpOD: '',
      dates_search: [],
      template: ItemTemplate,

      title: "Nueva Ruta",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Ajuste de Rutas",
          href: "/ajustesrutas/",
        },
        {
          text: "Nueva Ruta",
          href: "/newRuta",
          active: true,
        },
      ],

      //Inicio Variables

      zonaOrigen: [
        {id: 0, value: "Selecciona Opcion"},
        {id: 1, value: "Comercial"},
        {id: 2, value: "Peligrosa"},
        {id: 3, value: "No Comercial"},
      ],
      origen: 1,

      zonaDestino: [
        {id: 0, value: "Selecciona Opcion"},
        {id: 1, value: "Comercial"},
        {id: 2, value: "Peligrosa"},
        {id: 3, value: "No Comercial"},
      ],
      destino: 1,

      tipoUnidad: [],
      unidad: "",
      nombreUnidad: "",

      tipoMercancia: [
        {id: 0, value: "o", name: "Selecciona Opcion"},
        {id: 1, value: "g", name: "General"},
        {id: 2, value: "h", name: "Peligrosa"},
        {id: 3, value: "r", name: "Refrigerada"},
        {id: 4, value: "e", name: "Especial"},
      ],
      tipCarga: "0",

      tipoEnvio: [
        {id: 0, value: "Selecciona Opción"},
        {id: 1, value: "FTL"},
        {id: 2, value: "LTL"},
      ],
      envia: 1,

      priceKilometros: 0,

      modena:[
        {id: 0, value: "Selecciona Moneda"},
        {id: 1, value: "USD"},
        {id: 2, value: "MXN"},
      ],
      divisa: 2,
      //Fin Variables
     
    };
  },

  created() {

  },

  methods: {

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
        this.dateNow=hoy
        this.terfecha=hoy
        this.fechaCoincidencia = hoy
    },

    formatMoney(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

    selectTipoUnidad() {
      
      let tipoCajaS = this.tipCarga

      if (tipoCajaS == "h") {
          this.getUnidadBox("h")
          this.unidad = 5
          // this.carga = "Peligrosa"
      }else{
      }
      if (tipoCajaS == "r") {
          this.getUnidadBox("r")
          this.unidad = 8
          // this.carga = "Refrigerada"
      }
      if (tipoCajaS == "g") {
          this.getUnidadBox("g")
          this.unidad = 5
          // this.carga = "General"
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
                this.tipoUnidad = response.data
            })
            .catch((error) => {
                console.log(error);
            });
    },

    cambioUnidad(name){
      this.nombreUnidad = name
      alert(name)
    },

    Save(){
      let origen = this.origen //
      let destino = this.destino //
      let tipCarga = this.tipCarga
      let unidad = this.unidad
      let envia = this.envia
      let priceKilometros = this.priceKilometros
      let divisa = this.divisa

      if(origen <= 0 || origen == 0 || origen == ""){
        Swal.fire({
            title: 'Opcion no Valida',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(destino <= 0 || destino == 0 || destino == ""){
        Swal.fire({
            title: 'Opcion no Valida',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(tipCarga <= 0 || tipCarga == 0 || tipCarga == ""){
        Swal.fire({
            title: 'Opcion no Valida',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(unidad <= 0 || unidad == 0 || unidad == ""){
        Swal.fire({
            title: 'Opcion no Valida',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(envia <= 0 || envia == 0 || envia == ""){
        Swal.fire({
            title: 'Selecciona Tipo Envio',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(priceKilometros <= 0 || priceKilometros == 0){
        Swal.fire({
            title: 'Precio Debe ser Mayor a 0',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(divisa <= 0 || divisa == 0){
        Swal.fire({
            title: 'Seleccione Tipo Moneda',
            text: '',
            icon: 'Error',
            confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "post",
        url: `ajusteRuta/`,
        data: {
          origen: origen,
          destino: destino,
          tipoUnidad: unidad,
          tipoMercancia: tipCarga,
          tipoEnvio: envia,
          precioKilometros: priceKilometros,
          divisa: divisa,
          estatus: 0,
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

  }, // Final Methods

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">      
      <div class="col-md-12">

        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h5 class="header-title">Ajustes de Rutas</h5>

            <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                    <div class="form-row ">

                      <b-form-group class="col-md-3" label="Zona Origen" label-for="zona_origen">
                        <select
                          id="origin"
                          class="rounded form-control col-md-12"
                          v-model.trim="origen"
                        >
                          <option
                            v-for="zonao in zonaOrigen"
                            :key="zonao.id"
                            v-bind:value="zonao.value"
                          >
                            {{ zonao.value }}
                          </option>
                        </select>                        
                      </b-form-group>                      

                      <b-form-group class="col-md-3" label="Zona Destino" label-for="zona_destino">
                        <select
                          id="destino"
                          class="rounded form-control col-md-12"
                          v-model.trim="destino"
                        >
                          <option
                            v-for="zonad in zonaDestino"
                            :key="zonad.value"
                            v-bind:value="zonad.value"
                          >
                            {{ zonad.value }}
                          </option>
                        </select>
                      </b-form-group>

                      <b-form-group class="col-md-3" label="Tipo Carga" label-for="tipo_carga">
                        <b-form-select
                          id="carga"
                          class="rounded form-control col-md-12"
                          v-model.trim="tipCarga"
                          @change="selectTipoUnidad()"
                        >
                          <option
                            v-for="mercancia in tipoMercancia"
                            :key="mercancia.id"
                            v-bind:value="mercancia.value"
                          >
                            {{ mercancia.name }}
                          </option>
                        </b-form-select>
                      </b-form-group>

                      <b-form-group class="col-md-3" label="Tipo Unidad" label-for="tipo_unidad">
                        <b-form-select
                          id="unidad"
                          class="rounded form-control col-md-12"
                          v-model.trim="unidad"                  
                        >
                          <option
                            v-for="unit in tipoUnidad"
                            :key="unit.id"
                            v-bind:value="unit.id"
                            @change="cambioUnidad(/ + unit.code_name + /)"               
                          >
                            {{ unit.code_name }}
                          </option>
                        </b-form-select>
                      </b-form-group>

                    </div>
              </div>

              <div class="col-md-12">

                <div class="form-row ">

                  <b-form-group class="col-md-3" label="Tipo Envio" label-for="tipo_envio">
                    <select
                      id="envio"
                      class="rounded form-control col-md-12"
                      v-model.trim="envia"
                    >
                      <option
                        v-for="envio in tipoEnvio"
                        :key="envio.value"
                        v-bind:value="envio.value"
                      >
                        {{ envio.value }}
                      </option>
                    </select>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Precio X Kilometro" label-for="precio_kilometro">
                    <b-form-input
                      type="number"
                      id="cantidad"
                      class="rounded form-control col-12"
                      v-model.trim="priceKilometros"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" label="Moneda" label-for="moneda">
                    <select
                      id="moneda"
                      class="rounded form-control col-12"
                      v-model.trim="divisa"
                    >
                      <option
                        v-for="money in modena"
                        :key="money.id"
                        v-bind:value="money.id"
                        :selected:id=0
                      >
                        {{ money.value }}
                      </option>
                    </select>
                  </b-form-group>

                   <b-form-group class="col-md-3" label=" " label-for="moneda" style="margin-top: 21px;">
                      <b-button
                        class="width-md ml"
                        variant="primary"
                        @click="Save()"                              
                        >Confirmar</b-button>
                    </b-form-group>


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

</style>
