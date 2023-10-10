<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import $ from 'jquery'
/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'

export default {
  page: {
    title: "Editar Zona",
    meta: [{ name: "editZona", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Zona",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Zonas",
          href: "/catalogo/listZonas",
        },
        {
          text: "Editar Zona",
          href: "/editZona",
          active: true,
        },
      ],

      id: 0,
      idH: 0,
      clasificacion: "COMERCIAL",
      identificador: "",
      claveidentificador: "A",
      pais: 0,
      nomPais: "",
      paises: [],
      estado: 0,
      nomEstado: "",
      estados: [],
      ciudad: "0.0",
      cp: [],
      cps: [],
      municipio: [""],
      nomMun: [],
      municipios: [""],
      clasificaciones: [
        { value: "COMERCIAL", text: "Comercial" },
        { value: "PELIGROSA", text: "Peligrosa" },
        { value: "NO COMERCIAL", text: "No Comercial" },

      ],
      identificadores: [
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
        { value: "D", text: "D" },
        { value: "E", text: "E" },
        { value: "F", text: "F" },
        { value: "G", text: "G" },
        { value: "H", text: "H" },
        { value: "I", text: "I" },
        { value: "J", text: "J" },
        { value: "K", text: "K" },
        { value: "L", text: "L" },
        { value: "M", text: "M" },
        { value: "N", text: "N" },
        { value: "O", text: "O" },
        { value: "P", text: "P" },
        { value: "Q", text: "Q" },
        { value: "R", text: "R" },
        { value: "S", text: "S" },
        { value: "T", text: "T" },
        { value: "U", text: "U" },
        { value: "V", text: "V" },
        { value: "W", text: "W" },
        { value: "X", text: "X" },
        { value: "Y", text: "Y" },
        { value: "Z", text: "Z" },

      ],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

    };
  },

  created() {
    this.getZona();
    this.getContry();
    
  }, 

  methods: {
    Save() {
      if (this.identificador == '' || this.identificador == null) {
        Swal.fire({
          title: 'Ingresa el Identificador de la Zona',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.pais == '' || this.pais == null) {
        Swal.fire({
          title: "Selecciona un País",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.estado == '' || this.estado == null) {
        Swal.fire({
          title: "Selecciona un Estado despúes de seleccionar un país",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.municipio.length == 0 || this.municipio == null) {
        Swal.fire({
          title: "Selecciona un Municipio despúes de seleccionar un estado",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.cp.length == 0) {
        Swal.fire({
          title: "Selecciona al menos un Codigo Postal despúes de seleccionar un Municipio",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/nueva-zona/`,
        data: {
          id: this.id,
          clasificacion: this.clasificacion,
          claveidentificador: this.claveidentificador,
          identificador: this.identificador,
          pais: this.pais,
          municipio: this.municipio,
          estado: this.estado,
          nomEstado: this.nomEst,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        if(response.data.length > 0){

          axios({
            method: "post",
            url: `/api/v1/nueva-zona-hijos/`,
            data: {
              responseZonas: response,
              cps: this.cp
            },
            auth: {
              username: "admin",
              password: "123",
            },
          }).then((response) => {
            console.log(response.data)

            if(response.data.length > 0){
              Swal.fire({
                title: "Zona",
                text: "Agregada Correctamente",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Cerrar",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/new-zona";
                }
              })
            }else{
              Swal.fire({
                title: "Las o la Zona agregada ya existe, verificalo por favor.",
                text: "",
                icon: "info",
                confirmButtonText: "Cerrar",
              })
            }
          }).catch((error) => {
            console.log(error);
          });

        }else{
          Swal.fire({
            title: "Las o la Zona agregada ya existe, verificalo por favor.",
            text: "",
            icon: "info",
            confirmButtonText: "Cerrar",
          })
        }
      })

    },

    getZona() {
      
      const idS = this.$route.params.pkZona;
      console.log(idS)

      axios({
          method: "get",
          url: `/api/v1/get-zona/${idS}/`,
      })
      .then((response) => {

        console.log(response.data.zona[0])
        this.clasificacion = response.data.zona[0].clasificacion
        this.identificador = response.data.zona[0].identificador
        this.claveidentificador = response.data.zona[0].claveIde
        this.pais = response.data.zona[0].pais
        this.nomPais = ""
        this.estado = response.data.zona[0].estado
        this.nomEstado = response.data.zona[0].estado_n
        //this.municipio = response.data.
        this.nomMun = response.data.zona[0].municipio

       

      })
      .catch((error) => {
          console.log(error);
      });

    },
    getIdH() {
      axios({
        method: "post",
        url: `/api/v1/zonas-obteneridhijos/`,
        auth: {
          username: "admin",
          password: "123",
        },
        data: {
          id: 1,
        }
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.idH = response.data[0].idZonasHijo;
          } else {
            this.idH = 0
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getLabelProSer(item) {
      if (item) {
        this.nameProSer = item.descripcion
        this.claveProSer = item.clave_prodserv
        this.claveProSer2 = item.clave_prodserv
        return item.clave_prodserv
      } else {
        this.nameProSer = ''
      }
    },

    updateItemsProSer(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-proser/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_proser = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getLabelUnidad(item) {
      if (item) {
        this.claveUnit = item.claveUnidad + " - " + item.nombre
        this.claveUnit2 = item.claveUnidad
        return item.claveUnidad + " - " + item.nombre
      }
    },

    updateItemsUnidad(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-unidad/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_unidad = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getContry() {
      this.estado = ""
      this.estados = []
      this.municipio = []
      this.municipios = []
      this.cp = []
      this.cps = []
      axios.get(`/api/v1/list-country/`)
        .then((response) => {
          this.paises = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getEstado(event) {

      this.estado = ""
      this.estados = []
      this.municipio = []
      this.municipios = []
      this.cp = []
      this.cps = []

      let pkPais = this.pais;
      axios.get(`/api/v1/list-estates/${pkPais}/`)
        .then((response) => {
          this.estados = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMunicipios() {

      this.municipio = []
      this.cp = []
      this.cps = []

      let pais = this.pais;
      let estado = this.estado;

      let nomEst = $("#" + estado + "est").attr("data-name");
      this.nomEst = nomEst

      if (pais != "") {
        axios({
          method: "post",
          url: "/api/v1/municipio/",
          data: {
            estado: estado,
            pais: pais,
          },
        })
          .then((response) => {
            this.municipios = response.data
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getCodigoPostal(idMun) {

      let comprobar = document.getElementById(idMun + "-mun").checked;
      
      if (comprobar) {
        this.municipio.push(idMun)
      }else{
        var idMu = this.municipio.indexOf(idMun);
        if (idMu != -1){
          this.municipio.splice(idMu, 1);
        }
      }
      if (this.pais != "" && this.estado != "" && this.municipio.length > 0) {
        axios({
          method: "post",
          url: "/api/v1/cp/",
          data: {
            estado: this.estado,
            pais: this.pais,
            municipio: this.municipio,
          },
        })
          .then((response) => {
            
            this.cps = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        this.cps = []
      }
    },

    codigosSelecciona(cp) {

      let comprobar = document.getElementById(cp + "-cp").checked;
      
      if (comprobar) {
        this.cp.push(cp)
      }else{
        var idMu = this.cp.indexOf(cp);
        if (idMu != -1){
          this.cp.splice(idMu, 1);
        }
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
            <h5 class="header-title">Información de la Unidad</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Clasificacion de Zona:" label-for="clasificacion">
                        <b-form-select v-model="clasificacion" :options="clasificaciones"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Clave de Identificador:" label-for="claveidentificador">
                        <b-form-select v-model="claveidentificador" :options="identificadores"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Identificador:" label-for="identificador" description="">
                        <b-form-input id="identificador" v-model="identificador" type="text"
                          placeholder="Ingresa el Identificador" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6" sm="12">
                      <b-form-group label="Pais:" label-for="pais" description="">
                        <b-form-select v-model="pais" @change="getEstado($event.target.name, $event.target.value)" v-bind:id="'pais'">
                          <option v-for="pai in paises" :key="pai.id" v-bind:value="pai.id" v-bind:data-name="pai.name">
                            {{ pai.name }}
                          </option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                      <b-form-group label="Estado:" label-for="estado" description="">
                        <b-form-select v-model="estado" @change="getMunicipios()">
                          <option v-for="est in estados" :key="est.id" v-bind:value="est.id" v-bind:data-name="est.name"
                            v-bind:id="est.id + 'est'">
                            {{ est.name }}
                          </option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                      <b-form-group label="Municipios:" label-for="municipios" description="">
                        <div class="scroll">
                          <b-form-checkbox v-if="municipios.length > 0" name="municipios" v-bind:id="mun.id + '-mun'"
                            v-model="municipio" v-for="mun in municipios" :key="mun.id" v-bind:value="mun.municipio"
                            @change="getCodigoPostal(mun.id)" style="font-size: 12px"><b style="font-weight: bold">{{
                              mun.municipio
                            }}</b>
                          </b-form-checkbox>
                          <b-form-checkbox v-else style="font-size: 12px"><b style="font-weight: bold">Sin
                              Municipios</b>
                          </b-form-checkbox>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                      <b-form-group label="Códigos Postales - Colonias:" label-for="Codigos Postales" description="">
                        <div class="scroll">
                          <b-form-checkbox v-if="cps.length > 0" name="cps" v-bind:id="cod.id + '-cp'" v-model="cp"
                            v-for="cod in cps" :key="cod.id" v-bind:value="cod.id"
                            @change="codigosSelecciona(cod.id)" style="font-size: 12px">
                            <b style="font-weight: bold">[{{ cod.codigo_postal }}] - {{ cod.asentamiento }}</b>
                          </b-form-checkbox>
                          <b-form-checkbox v-else style="font-size: 12px"><b style="font-weight: bold">Sin
                              Municipios</b>
                          </b-form-checkbox>
                        </div>
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
                </b-tab>
                <!--b-tab title="Ejemplo">
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Ejemplo">
                  <b-row>
                    
                  </b-row>
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

.vr {
  border-right: 2px solid rgba(152, 166, 173, 0.2) !important
}

.scroll {
  position: relative;
  height: 150px;
  overflow-y: scroll;
  border: 1px solid #00786c;
  padding: 20px;
}
</style>
