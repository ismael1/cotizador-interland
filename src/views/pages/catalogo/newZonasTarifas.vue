<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";
import Multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";

/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'
import countTo from 'vue-count-to';

export default {
  page: {
    title: "Nueva Zona para Tarifas",
    meta: [{ name: "Nueva Zona para Tarifas", content: appConfig.description }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nueva Zona para Tarifas",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Zonas para Tarifarios",
          href: "/catalogo/listZonasTarifas",
        },
        {
          text: "Nueva Zona para Tarifas",
          href: "/newZonasTarifas",
          active: true,
        },
      ],

      origenes_ftl: [],
      options_origen_ftl: [],
      datosOrigenesFTLOcupar: [],
      info_origenes_ftl: [],
      zona_origenes_ftl: '',
      
      destinos_ftl: [],
      options_destinos_ftl: [],
      datosDestinosFTLOcupar: [],
      info_destinos_ftl: [],
      zona_destinos_ftl: '',

      prev_origenes_destinos_ftl: [],
      info_origenes_destinos_ftl: [],

      verPrev: false,

      options_geocerca: [
        { value: 1, text: 'Comercial' },
        { value: 2, text: 'No Comercial' },
        { value: 3, text: 'Peligrosa' },
        { value: 4, text: 'Comercial - Peligrosa' },
        { value: 5, text: 'Comercial - No Comercial' },
        { value: 6, text: 'No Comercial - Comercial' },
        { value: 7, text: 'No Comercial - Peligrosa' },
        { value: 8, text: 'Peligrosa - Comercial' },
        { value: 9, text: 'Peligrosa - No Comercial' },
      ],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

    };
  },

  created() {
    this.dataSess();
    this.cargaEstados ();
  },

  methods: {
    dataSess(){
      let data = JSON.parse(localStorage.getItem('users'))
      
      for (let i = 0; i < data.length; i++) {
        this.idU = data[i].id;
        this.emailU = data[i].email;
        this.nombreU = data[i].nombre;
        this.username = data[i].username;
        this.tokenU = data[i].token;
        this.puestoU = data[i].puesto;
      }
    },

    async Save() {
      if (this.origenes_ftl.length == 0) {
        Swal.fire({
          title: 'Selecciona un Origen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.destinos_ftl.length == 0) {
        Swal.fire({
          title: "Selecciona un Destino",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }


        let insert = await axios({
          method: "post",
          url: `/api/v1/addZonaTarifa/`,
          data: {
            info: this.prev_origenes_destinos_ftl,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {
          console.log(response.data)
          Swal.fire({
            title: "Zona Agregada",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            console.log(result.data)
            /*if (result.isConfirmed) {
              window.location.href = "/newZonasTarifas";
            }*/
          })
        }).catch((error) => {
          console.log(error);
        });
        
      

    },

    cargaEstados(){
      axios({
        method: "get",
        url: "/api/v1/get-estados-geocercas/",
        data: {},
      }).then((response) => {

        for (let i = 0; i < response.data.data.length; i++) {
          let data = {}

          if(response.data.data[i].nombre_corto != '')
            data = {name: response.data.data[i].nombre_corto, idGeocerca:response.data.data[i].idGeocerca};
          else{
            data = {name: response.data.data[i].estado + ', ' + response.data.data[i].ciudad + ', C.P.:' + response.data.data[i].codigoPostal, idGeocerca:response.data.data[i].idGeocerca};
          }
          
          this.options_origen_ftl.push(data);
          this.options_destinos_ftl.push(data);
        }

        const data = {name: "Zona Metropolitana", code:"Zona Metropolitana"};
          
        this.options_origen_ftl.push(data);
        this.options_destinos_ftl.push(data);
        
      }).catch((error) => {
        console.log(error);
      });
    },

    async defineZona(){
      this.info_origenes_ftl = [];
      this.info_destinos_ftl = [];
      this.prev_origenes_destinos_ftl = [];
      
      let km = '';
      let tipoGeocerca = 0;
      let km_pet = '';
      this.verPrev = false
      let data_o = {}
      let data_d = {}
      let data_des = {}
      console.log(this.origenes_ftl, 'ori');
      console.log(this.destinos_ftl, 'des');
      if(this.origenes_ftl.length > 0 && this.destinos_ftl.length > 0){
        for (let or = 0; or < this.origenes_ftl.length; or++) {
          
          for (let des = 0; des < this.destinos_ftl.length; des++) {
            let prev_origenes_ftl = '';
            let prev_destinos_ftl = '';
            
            let datos_org_des = await axios({
                method: "get",
                url: "/api/v1/get-datos-geocercas/",
                params: {
                  idGeocerca_o: this.origenes_ftl[or].idGeocerca,
                  idGeocerca_d: this.destinos_ftl[des].idGeocerca,
                },
              }).then((response) => {

                let valOrigen = parseInt(response.data.origen[0].idGeocerca)
                let valDestino = parseInt(response.data.destino[0].idGeocerca)
                  
                /*data_o = {
                  ciudad: response.data.origen[0].ciudad,
                  codigoPostal: response.data.origen[0].codigoPostal,
                  colonia: response.data.origen[0].colonia,
                  dateCreate: response.data.origen[0].dateCreate,
                  dateEdita: response.data.origen[0].dateEdita,
                  estado: response.data.origen[0].estado,
                  estatus: parseInt(response.data.origen[0].estatus),
                  estatus_geocerca: parseInt(response.data.origen[0].estatus_geocerca),
                  idGeocerca: response.data.origen[0].idGeocerca,
                  kilometros_redonda: parseInt(response.data.origen[0].kilometros_redonda),
                  lat: response.data.origen[0].lat,
                  lat_centro: response.data.origen[0].lat_centro,
                  lng: response.data.origen[0].lng,
                  lng_centro: response.data.origen[0].lng_centro,
                  nombre_corto: response.data.origen[0].nombre_corto,
                  orden: parseInt(response.data.origen[0].orden),
                  pais: response.data.origen[0].pais,
                  poligono: parseInt(response.data.origen[0].poligono),
                  porcentaje_incremento: parseFloat(response.data.origen[0].porcentaje_incremento),
                  usuarioAlta: response.data.origen[0].usuarioAlta,
                  usuarioModifica: response.data.origen[0].usuarioModifica,
                  identificador: response.data.origen[0].pais + ', '+response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ' - '+ response.data.destino[0].pais + ', '+ response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad,
                }

                data_d = {
                  ciudad: response.data.destino[0].ciudad,
                  codigoPostal: response.data.destino[0].codigoPostal,
                  colonia: response.data.destino[0].colonia,
                  dateCreate: response.data.destino[0].dateCreate,
                  dateEdita: response.data.destino[0].dateEdita,
                  estado: response.data.destino[0].estado,
                  estatus: parseInt(response.data.destino[0].estatus),
                  estatus_geocerca: parseInt(response.data.destino[0].estatus_geocerca),
                  idGeocerca: response.data.destino[0].idGeocerca,
                  kilometros_redonda: parseInt(response.data.destino[0].kilometros_redonda),
                  lat: response.data.destino[0].lat,
                  lat_centro: response.data.destino[0].lat_centro,
                  lng: response.data.destino[0].lng,
                  lng_centro: response.data.destino[0].lng_centro,
                  nombre_corto: response.data.destino[0].nombre_corto,
                  orden: parseInt(response.data.destino[0].orden),
                  pais: response.data.destino[0].pais,
                  poligono: parseInt(response.data.destino[0].poligono),
                  porcentaje_incremento: parseFloat(response.data.destino[0].porcentaje_incremento),
                  usuarioAlta: response.data.destino[0].usuarioAlta,
                  usuarioModifica: response.data.destino[0].usuarioModifica,
                  identificador: response.data.origen[0].pais + ', '+response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ' - '+ response.data.destino[0].pais + ', '+ response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad,
                }

                this.info_origenes_ftl.push(data_o) 
                this.info_destinos_ftl.push(data_d)*/

                if(response.data.origen[0].estatus_geocerca == 1 && response.data.destino[0].estatus_geocerca == 1){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  tipoGeocerca = 1
                }else if(response.data.origen[0].estatus_geocerca == 1 && response.data.destino[0].estatus_geocerca == 2){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  tipoGeocerca = 5
                }else if(response.data.origen[0].estatus_geocerca == 1 && response.data.destino[0].estatus_geocerca == 3){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  tipoGeocerca = 4
                }else if(response.data.origen[0].estatus_geocerca == 2 && response.data.destino[0].estatus_geocerca == 1){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  tipoGeocerca = 6
                }else if(response.data.origen[0].estatus_geocerca == 2 && response.data.destino[0].estatus_geocerca == 2){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  tipoGeocerca = 2
                }else if(response.data.origen[0].estatus_geocerca == 2 && response.data.destino[0].estatus_geocerca == 3){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  tipoGeocerca = 7
                }else if(response.data.origen[0].estatus_geocerca == 3 && response.data.destino[0].estatus_geocerca == 1){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
                  tipoGeocerca = 8
                }else if(response.data.origen[0].estatus_geocerca == 3 && response.data.destino[0].estatus_geocerca == 2){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
                  tipoGeocerca = 9
                }else if(response.data.origen[0].estatus_geocerca == 3 && response.data.destino[0].estatus_geocerca == 3){
                  prev_origenes_ftl = response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  prev_destinos_ftl = response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
                  tipoGeocerca = 3
                }

                axios({
                  method: "get",
                  url: "/api/v1/get-distancias-maps/",
                  params: {
                    org: response.data.origen[0].pais + ', ' + response.data.origen[0].estado + ', ' + response.data.origen[0].ciudad + ', ' + response.data.origen[0].codigoPostal,
                    des: response.data.destino[0].pais + ', ' + response.data.destino[0].estado + ', ' + response.data.destino[0].ciudad + ', ' + response.data.destino[0].codigoPostal,
                  },
                }).then((response) => {
                  

                  data_des = {
                    
                    origen:prev_origenes_ftl,
                    id_geocerca_o: valOrigen,
                    id_geocerca_d: valDestino,
                    destino:prev_destinos_ftl,
                    km:response.data,
                    tipoGeocerca: tipoGeocerca,
                    tipoUsuario: this.username,
                  }
                  this.prev_origenes_destinos_ftl.push(data_des)

                  prev_origenes_ftl = ''
                  prev_destinos_ftl = ''

                  
                }).catch((error) => {
                  console.log(error);
                });

              }).catch((error) => {
                console.log(error);
              });

              this.verPrev = true
          }
        }
      }
        
      /*
        { value: 1, text: 'Comercial' },
        { value: 2, text: 'No Comercial' },
        { value: 3, text: 'Peligrosa' },
        { value: 4, text: 'Comercial - Peligrosa' },
        { value: 5, text: 'Comercial - No Comercial' },
        { value: 6, text: 'No Comercial - Comercial' },
        { value: 7, text: 'No Comercial - Peligrosa' },
        { value: 8, text: 'Peligrosa - Comercial' },
        { value: 9, text: 'Peligrosa - No Comercial' },
      */
    },

    limpiarDatos(val){
      
      if(val == 1){
        this.origenes_ftl = []
      }

      if(val == 2){
        this.destinos_ftl = []
      }

      this.prev_origenes_destinos_ftl = []
      this.verPrev = false
    }
  }, // Fin Methods

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <b-row>
      <b-container fluid>
        <b-card>
          <b-card-body>
            <h5 class="header-title">Información de la Zona</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="limpiarDatos(1)"><b><i class="far fa-trash-alt"></i> Limpiar Datos Origen</b></b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="limpiarDatos(2)"><b><i class="far fa-trash-alt"></i> Limpiar Datos Destino</b></b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <label>Selecciona Origen</label>
                      <multiselect v-model="origenes_ftl" :options="options_origen_ftl" :multiple="true" :taggable="true" :searchable="true" :close-on-select="false" :show-labels="false" placeholder="Selecciona un Origen" label="name" track-by="idGeocerca" @input="defineZona"></multiselect>
                    </b-col>
                    <b-col md="4" sm="12">
                      <label>Selecciona Destino</label>
                      <multiselect v-model="destinos_ftl" :options="options_destinos_ftl" :multiple="true" :taggable="true" :searchable="true" :close-on-select="false" :show-labels="false" placeholder="Selecciona un Destino" label="name" track-by="idGeocerca" @input="defineZona"></multiselect>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="Save()"><b><i class="fas fa-file-alt"></i> Generar Tarifario</b></b-button>
                      </div>
                    </b-col>
                  </b-row>
                  <br>
                  <b-alert show variant="light" v-for="dato in prev_origenes_destinos_ftl" :style="'padding:1px;'">
                    <b-row v-if="verPrev">
                      <b-col md="12">
                        <label>Vista Previa</label>
                      </b-col>
                      <b-col md="5" sm="12" class="text-center">
                        <label>Origen</label>
                        <p v-html="dato.origen"></p>
                      </b-col>
                      <b-col md="2" sm="12" class="text-center">
                        <label>Kilometraje</label>
                        <p>{{ dato.km }} km</p>
                      </b-col>
                      <b-col md="5" sm="12" class="text-center">
                        <label>Destino</label>
                        <p v-html="dato.destino"></p>
                      </b-col>
                    </b-row>
                  </b-alert>
                </b-tab>
                <!--b-tab title="Pesos">
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Peso Bruto de Carga" label-for="peso_bruto_carga" description="">
                        <b-form-input id="peso_bruto_carga" v-model="peso_bruto_carga" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Peso Bruto Total" label-for="peso_bruto_total" description="">
                        <b-form-input id="peso_bruto_total" v-model="peso_bruto_total" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Medidas">
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Capacidad de Volumen" label-for="capaciadad_vol" description="">
                        <b-form-input id="peso_bruto_total" v-model="capaciadad_vol" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Longitud" label-for="long" description="">
                        <b-form-input id="long" v-model="long" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Ancho" label-for="width" description="">
                        <b-form-input id="width" v-model="width" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Alto" label-for="high" description="">
                        <b-form-input id="high" v-model="high" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Orderg" label-for="orderg" description="">
                        <b-form-input id="orderg" v-model="orderg" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Orderp" label-for="orderp" description="">
                        <b-form-input id="orderp" v-model="orderp" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i
                            class="fe-save"></i> Guardar</b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab-->
                <!--b-tab title="Second">
                  <p>Ejemplo</p>
                </b-tab-->
                <!--b-tab title="Disabled">
                  <p>Ejemplo</p>
                </b-tab-->
              </b-tabs>
            </div>
          </b-card-body>
        </b-card>
      </b-container>
    </b-row>
  </Layout>
</template>

<style>
.nav-bordered a.active {
  border-bottom: 2px solid #00786c !important;
}

#boton {
  margin: auto;
  width: 50%;
  padding: 5px;
  border: thin solid black;

}
</style>
