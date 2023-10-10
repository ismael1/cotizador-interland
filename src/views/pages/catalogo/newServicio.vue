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
    title: "Nuevo Servicio",
    meta: [{ name: "newServicio", content: appConfig.description }],
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
          href: "/catalogo/listServicio",
        },
        {
          text: "Nuevo Servicio",
          href: "/newServicio",
          active: true,
        },
      ],

      claveProSer: "",
      claveProSer2: "",
      nameProSer: "",
      unit: 0,
      claveUnit: "",
      claveUnit2: "",
      numberIdentification: 0,
      stateSale: true,
      optStateSale: [
        { id: 1, value: true, text: "En Venta"},
        { id: 2, value: false, text: "Fuera de Venta"},
      ],
      stateBuy: true,
      optStateBuy: [
        { id: 1, value: true, text: "En Compra"},
        { id: 2, value: false, text: "Fuera de Compra"},
      ],
      description: "",
     
      duration: "",
      nameDuration: "",
      optDuration: [
        { id: 1, value: "Hora", text: "Hora"},
        { id: 2, value: "Dia", text: "Dia" },
        { id: 3, value: "Semana", text: "Semana" },
        { id: 4, value: "Mes", text: "Mes" },
        { id: 5, value: "Anio", text: "Año" },
      ],

      longitud: 0,
      nameLongitud: "mm",
      optLongitud: [
        { id: 1, value: "mm" },
        { id: 2, value: "cm" },
        { id: 3, value: "dm" },
        { id: 4, value: "m" },
        { id: 5, value: "Pie" },
        { id: 6, value: "Pulgada" },
      ],
      superficie: 0,
      nameSuperficie: "mm2",
      optSuperficie: [
        { id: 1, value: "mm2" },
        { id: 2, value: "cm2" },
        { id: 3, value: "dm2" },
        { id: 4, value: "m2" },
        { id: 5, value: "Pie2" },
        { id: 6, value: "Pulgada2" },
      ],
      volumen: 0,
      nameVolumen: "mm3 (µl)",
      optVolumen: [
        { id: 1, value: "mm3 (µl)" },
        { id: 2, value: "cm3 (ml)" },
        { id: 3, value: "dm3 (l)" },
        { id: 4, value: "m3" },
        { id: 5, value: "Pie3" },
        { id: 6, value: "Pulgada2" },
        { id: 7, value: "Onza" },
        { id: 8, value: "Galon" },
      ],
      codeAduanero: "",
      idPais: 0,
      namePais: "",
      countrys: [],
      nota: "",
      
      priceSale: 0,
      namePriceSale: "Sin IVA",
      optPriceSale: [
        { id: 1, value: "Sin IVA" },
        { id: 2, value: "IVA Incluido" },
      ],
      priceSaleMin: 0,
      nameDivisaBuy: 2,
      optDivisaBuy: [
        { id: 1, value: "USD" },
        { id: 2, value: "MXN" },
      ],
      ivaBuy: 16,
      optIvaBuy: [
        { id: 1, value:0},
        { id: 2, value:8},
        { id: 3, value:16},
      ],
      retentionBuy: 0,
      optRetentionBuy: [
        { id: 1, value:0},
        { id: 2, value:4},
      ],
      nameDivisaSale: 2,
      optDivisaSale:[
        { id: 1, value: "USD" },
        { id: 2, value: "MXN" },
      ],
      ivaSale: 16,
      optIvaSale: [
        { id: 1, value:0},
        { id: 2, value:8},
        { id: 3, value:16},
      ],
      retentionSale: 0,
      optRetentionSale: [
        { id: 1, value:0},
        { id: 2, value:4},
      ],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

    };
  },

  created() {
    this.getContry();
  },

  methods: {   

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

    Save(){

      axios({
        method: "post",
        url: `servicio/`,
        data: {

          claveProductoServicio: this.claveProSer2,
          nombreProductoServicios: this.nameProSer,
          unidad: this.unit,
          claveUnidad: this.claveUnit2,
          numeroIdentificacion: this.numberIdentification,
          // estadoVentas: this.stateSale,
          // estadoCompras: this.stateBuy,
          descripcion: this.description,
          // duracion: this.duration,
          // tiempo: this.nameDuration,
          // codigoAduanero: this.codeAduanero,
          // paisOrigen: this.namePais,
          // idPaisOrigen: this.idPais,
          // nota: this.nota,
          // precioVenta: this.priceSale,
          // precioVentaName: this.namePriceSale,
          // precioVentaMin: this.priceSaleMin,
          divisaCompra: this.nameDivisaBuy,
          tasaDivisaCompra: this.ivaBuy,
          tasaRetencionCompra: this.retentionBuy,
          divisaVenta: this.nameDivisaSale,
          tasaIvaVenta: this.ivaSale,
          tasaRetencionVenta: this.retentionSale

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

    getLabelProSer (item) {
      if(item){
        this.nameProSer= item.descripcion
        this.claveProSer = item.clave_prodserv
        this.claveProSer2 = item.clave_prodserv
        return item.clave_prodserv        
      }else{
        this.nameProSer= ''
      }
    },

    updateItemsProSer (text) {
      let input = text   
      axios({
        method: "post",
        url: "/api/v1/search-proser/",
        data: {
          data: input,
        },
      })
      .then((response) => {
        this.dates_search_proser=response.data
      })
      .catch((error) => {
        console.log(error);
      });
    },

    getLabelUnidad (item) {
      if(item){
        this.claveUnit = item.claveUnidad + " - " + item.nombre
        this.claveUnit2 = item.claveUnidad
        return item.claveUnidad + " - " + item.nombre
      }
    },

    updateItemsUnidad (text) {
      let input = text   
      axios({
        method: "post",
        url: "/api/v1/search-unidad/",
        data: {
          data: input,
        },
      })
      .then((response) => {
        this.dates_search_unidad=response.data
      })
      .catch((error) => {
        console.log(error);
      });
    },

  }, // Fin Methods

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">      
      <div class="col-md-12">

        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h5 class="header-title">Información del Servicio</h5>

            <b-tabs nav-class="nav-tabs nav-bordered">
              <b-tab title="Basica ">

                <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
                  <div class="col-md-12">
                    
                    <form class="form-horizontal" role="form">

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Clave del Producto/Servicio (Ref)</label>

                          <div class="col-md-6">

                            <v-autocomplete 
                            :items="dates_search_proser" 
                            v-model="claveProSer" 
                            :get-label="getLabelProSer" 
                            :component-item='templateproser' 
                            @update-items="updateItemsProSer"
                            input-class="form-control"
                            placeholder="buscar..."
                            item-text="claveProSer"
                            item-value="claveProSer"
                            return-object> 
                            </v-autocomplete>

                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Nombre del Producto/Servicio (Etiqueta)</label>

                          <div class="col-md-6">
                            <b-form-input
                            v-model.trim="nameProSer"
                            placeholder="Nombre Servicio..."
                            >

                            </b-form-input>
                          </div>
                      </div>                      

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Clave Unidad</label>

                          <div class="col-md-6">

                            <v-autocomplete 
                            :items="dates_search_unidad" 
                            v-model="claveUnit" 
                            :get-label="getLabelUnidad" 
                            :component-item='templateunidad' 
                            @update-items="updateItemsUnidad"
                            input-class="form-control"
                            placeholder="buscar..."
                            item-text="claveUnit"
                            item-value="claveUnit"
                            return-object> 
                            </v-autocomplete>

                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Unidad</label>

                          <div class="col-md-6">
                            <b-form-input
                            v-model.trim="unit"
                            >

                            </b-form-input>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Número de Identificación</label>

                          <div class="col-md-6">
                            <b-form-input
                            v-model.trim="numberIdentification"
                            >

                            </b-form-input>
                          </div>
                      </div>

                      <!-- <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Estado (Ventas)</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="stateSale"
                            >
                            <option

                            v-for="vent in optStateSale"
                            :key="vent.id"
                            v-bind:value="vent.value"
                            >
                            {{ vent.text }}
                            </option>

                            </b-form-select>
                          </div>
                      </div> -->

                      <!-- <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Estado (Compras)</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="stateBuy"
                            >
                            <option
                            v-for="sal in optStateBuy"
                            :key="sal.id"
                            v-bind:value="sal.value"
                            >
                            {{ sal.text }}
                            </option>

                            </b-form-select>
                          </div>
                      </div> -->

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Descripción</label>

                          <div class="col-md-6">
                            <b-form-textarea
                            v-model.trim="description"
                            ></b-form-textarea>
                          </div>
                      </div>

                    </form>
                        
                  </div>
                </div>

              </b-tab>
              <!-- Fin Basica -->

              <!-- <b-tab title="Especificaciones ">

                <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
                  <div class="col-md-12">
                    
                    <form class="form-horizontal" role="form">

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Duración</label>

                          <div class="col-md-6">
                            <div class="input-group">
                              <b-form-input
                              v-model.trim="duration"
                              class="form-control col-md-7"
                              >
                              </b-form-input>

                              <b-form-group v-slot="{ ariaDescribedby }" class="ml-1 mt-1">
                                <b-form-radio-group
                                  id="radio-group-1"
                                  v-model="nameDuration"
                                  :options="optDuration"
                                  :aria-describedby="ariaDescribedby"
                                  name="radio-options"
                                ></b-form-radio-group>
                              </b-form-group>

                            </div>
                            
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Código Aduanero</label>

                          <div class="col-md-6">
                            <b-form-input
                            v-model.trim="codeAduanero"
                            >

                            </b-form-input>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >País de Origen</label>

                          <div class="col-md-6">
                            <b-form-select
                              v-model.trim="idPais"
                              @change="nombrePais($event)"
                            >
                            <option
                            v-for="pays in countrys"
                            :key="pays.id"
                            v-bind:value="pays.id"                           
                            >
                            {{ pays.name }}
                            </option>
                            </b-form-select>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Nota (No Visible en las Facturas, etc.)</label>

                          <div class="col-md-6">
                            <b-form-textarea
                            v-model.trim="nota"
                            >

                            </b-form-textarea>
                          </div>
                      </div>                     	

                    </form>
                        
                  </div>
                </div>

              </b-tab> -->
              <!-- Fin Especificaciones -->

              <b-tab title="Precios">

                <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
                  <div class="col-md-12">
                    
                    <form class="form-horizontal" role="form">

                      <!-- <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Precio de Venta</label>

                          <div class="col-md-6">
                            <div class="input-group">
                              <b-form-input
                              v-model.trim="priceSale"
                              class="form-control col-md-6"
                              >
                              </b-form-input>

                              <b-form-select
                              v-model.trim="namePriceSale"
                              class="form-control col-md-6"
                              >
                              <option
                              v-for="pricesal in optPriceSale"
                              :key="pricesal.id"
                              v-bind:value="pricesal.value"                              
                              >
                              {{ pricesal.value }}
                              </option>                              
                              </b-form-select>
                            </div>
                            
                          </div>
                      </div> -->

                      <!-- <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Precio de Venta Min</label>

                          <div class="col-md-6">
                            <b-form-input
                            v-model.trim="priceSaleMin"
                            >
                            </b-form-input>                            
                          </div>
                      </div> -->

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Divisa Compra</label>

                          <div class="col-md-6">
                           <b-form-select
                            v-model.trim="nameDivisaBuy"
                            >
                            <option
                            v-for="divbuy in optDivisaBuy"
                            :key="divbuy.id"
                            v-bind:value="divbuy.id"
                            >
                            {{ divbuy.value }}
                            </option>
                            </b-form-select> 
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Tasa IVA Compra</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="ivaBuy"
                            >
                            <option
                            v-for="ivbuy in optIvaBuy"
                            :key="ivbuy.id"
                            v-bind:value="ivbuy.value"
                            >
                            {{ ivbuy.value }}%
                            </option>
                            </b-form-select>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Tasa Retención Compra</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="retentionBuy"
                            >
                            <option
                            v-for="retenbuy in optRetentionBuy"
                            :key="retenbuy.id"
                            v-bind:value="retenbuy.value"
                            >
                            {{ retenbuy.value }}%
                            </option>
                            </b-form-select>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Divisa Venta</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="nameDivisaSale"
                            >
                            <option

                            v-for="divsal in optDivisaSale"
                            :key="divsal.id"
                            v-bind:value="divsal.id"
                            >
                            {{ divsal.value }}
                            </option>

                            </b-form-select>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Tasa IVA Venta</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="ivaSale"
                            >
                            <option
                            v-for="ivsal in optIvaSale"
                            :key="ivsal.id"
                            v-bind:value="ivsal.value"
                            >
                            {{ ivsal.value }}%
                            </option>

                            </b-form-select>
                          </div>
                      </div>

                      <div class="form-row form-group">
                        <label
                          class="col-md-4 col-form-label text-right"
                          >Tasa Retencion Venta</label>

                          <div class="col-md-6">
                            <b-form-select
                            v-model.trim="retentionSale"
                            >
                            <option
                            v-for=" retensale in optRetentionSale"
                            :key="retensale.value"
                            v-bind:value="retensale.value"
                            >
                            {{ retensale.value }}%
                            </option>
                            </b-form-select>
                          </div>
                      </div>

                      <div class="text-right">
                        <b-button
                        variant="primary"
                        @click="Save"
                        >Guardar</b-button>
                      </div>                      

                    </form>
                        
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
