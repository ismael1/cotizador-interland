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
      prev_origenes_ftl: '',
      zona_origenes_ftl: '',
      
      destinos_ftl: [],
      options_destinos_ftl: [],
      datosDestinosFTLOcupar: [],
      info_destinos_ftl: [],
      prev_destinos_ftl: '',
      zona_destinos_ftl: '',

      km: '',

      verPrev: false,

      tipoGeocerca: [],
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

    Save() {
      if (Object.keys(this.origenes_ftl).length == 0) {
        Swal.fire({
          title: 'Selecciona un Origen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (Object.keys(this.destinos_ftl).length == 0) {
        Swal.fire({
          title: "Selecciona un Destino",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }


      axios({
        method: "post",
        url: `/api/v1/addZonaTarifa/`,
        data: {
          idGeoO: this.origenes_ftl.idGeocerca,
          idGeoD: this.destinos_ftl.idGeocerca,
          tipoZona: this.tipoGeocerca,
          km: this.km,
          usr: this.idU,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          console.log(response.data)
          Swal.fire({
            title: "Zona Agregada",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/newZonasTarifas";
            }
          })

        })
        .catch((error) => {
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
      this.prev_origenes_ftl = '';
      this.prev_destinos_ftl = '';
      this.km = '';
      this.tipoGeocerca = 0;
      let km_pet = '';
      this.verPrev = false
      if(Object.keys(this.origenes_ftl).length > 0 && Object.keys(this.destinos_ftl).length > 0){

        let org = await axios({
          method: "get",
          url: "/api/v1/get-datos-geocercas/",
          params: {
            idGeocerca: this.origenes_ftl.idGeocerca,
          },
        }).then((response) => {
          this.info_origenes_ftl = response.data[0]
        }).catch((error) => {
          console.log(error);
        });

        let des = await axios({
          method: "get",
          url: "/api/v1/get-datos-geocercas/",
          params: {
            idGeocerca: this.destinos_ftl.idGeocerca,
          },
        }).then((response) => {
          this.info_destinos_ftl = response.data[0]
        }).catch((error) => {
          console.log(error);
        });
        
        if(this.info_origenes_ftl.estatus_geocerca == 1 && this.info_destinos_ftl.estatus_geocerca == 1){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.tipoGeocerca = 1
        }else if(this.info_origenes_ftl.estatus_geocerca == 1 && this.info_destinos_ftl.estatus_geocerca == 2){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.tipoGeocerca = 5
        }else if(this.info_origenes_ftl.estatus_geocerca == 1 && this.info_destinos_ftl.estatus_geocerca == 3){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.tipoGeocerca = 4
        }else if(this.info_origenes_ftl.estatus_geocerca == 2 && this.info_destinos_ftl.estatus_geocerca == 1){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.tipoGeocerca = 6
        }else if(this.info_origenes_ftl.estatus_geocerca == 2 && this.info_destinos_ftl.estatus_geocerca == 2){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.tipoGeocerca = 2
        }else if(this.info_origenes_ftl.estatus_geocerca == 2 && this.info_destinos_ftl.estatus_geocerca == 3){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.tipoGeocerca = 7
        }else if(this.info_origenes_ftl.estatus_geocerca == 3 && this.info_destinos_ftl.estatus_geocerca == 1){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-success">Zona Comercial</span>'
          this.tipoGeocerca = 8
        }else if(this.info_origenes_ftl.estatus_geocerca == 3 && this.info_destinos_ftl.estatus_geocerca == 2){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-warning">Zona No Comercial</span>'
          this.tipoGeocerca = 9
        }else if(this.info_origenes_ftl.estatus_geocerca == 3 && this.info_destinos_ftl.estatus_geocerca == 3){
          this.prev_origenes_ftl = this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.prev_destinos_ftl = this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal + '. <span class="badge badge-soft-danger">Zona Peligrosa</span>'
          this.tipoGeocerca = 3
        }

        let dis = await axios({
          method: "get",
          url: "/api/v1/get-distancias-maps/",
          params: {
            org: this.info_origenes_ftl.pais + ', ' + this.info_origenes_ftl.estado + ', ' + this.info_origenes_ftl.ciudad + ', ' + this.info_origenes_ftl.codigoPostal,
            des: this.info_destinos_ftl.pais + ', ' + this.info_destinos_ftl.estado + ', ' + this.info_destinos_ftl.ciudad + ', ' + this.info_destinos_ftl.codigoPostal,

          },
        }).then((response) => {
          km_pet = response.data
          console.log(km_pet)
          this.km = km_pet
        }).catch((error) => {
          console.log(error);
        });

        this.verPrev = true
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

      }
    },
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
                      <label>Selecciona Origen</label>
                      <multiselect v-model="origenes_ftl" :options="options_origen_ftl" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Selecciona un Origen" label="name" track-by="idGeocerca" @input="defineZona"></multiselect>
                    </b-col>
                    <b-col md="4" sm="12">
                      <label>Selecciona Destino</label>
                      <multiselect v-model="destinos_ftl" :options="options_destinos_ftl" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Selecciona un Destino" label="name" track-by="idGeocerca" @input="defineZona"></multiselect>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="Save()"><b><i class="fas fa-file-alt"></i> Generar Tarifario</b></b-button>
                      </div>
                    </b-col>
                  </b-row>
                  <br>
                  <b-alert show variant="light">
                    <b-row v-if="verPrev">
                      <b-col md="12">
                        <label>Vista Previa</label>
                      </b-col>
                      <b-col md="5" sm="12" class="text-center">
                        <label>Origen</label>
                        <p v-html="prev_origenes_ftl"></p>
                      </b-col>
                      <b-col md="2" sm="12" class="text-center">
                        <label>Kilometraje</label>
                        <p>{{ km }} km</p>
                      </b-col>
                      <b-col md="5" sm="12" class="text-center">
                        <label>Destino</label>
                        <p v-html="prev_destinos_ftl"></p>
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
