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
    title: "Nueva Tarifa",
    meta: [{ name: "newTarifa", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nueva Tarifa",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Tarifas",
          href: "/cotizaciones/listTarifarios",
        },
        {
          text: "Nueva Tarifa",
          href: "/newTarifa",
          active: true,
        },
      ],

      origen: '',
      destino: '',
      factor_conversion: 350,
      recoleccion_tres_y_media: 0.0,
      recoleccion_rabon: 0.0,
      recoleccion_torton: 0.0,
      flete_nacional: 0.0,
      entrega_puerto_nissan: 0.0,
      entrega_puerto_tres_y_media: 0.0,
      entrega_rabon: 0.0,
      entrega_torton: 0.0,

      agregarTarifa: [],

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
    this.getId();
    this.getContry();
    this.dataSess();
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

      if (this.origen == '' || this.origen == null) {
        Swal.fire({
          title: 'Ingresa un Origen valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.destino == '' || this.destino == null) {
        Swal.fire({
          title: "Ingresa un Destino Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.factor_conversion == 0 || this.factor_conversion == "") {
        Swal.fire({
          title: "El factor de conversión debe der mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      if (this.recoleccion_tres_y_media == 0 || this.recoleccion_tres_y_media <= 0 || this.recoleccion_tres_y_media == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad 3 1/2 debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.recoleccion_rabon == 0 || this.recoleccion_rabon <= 0 || this.recoleccion_rabon == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad Rabon debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.recoleccion_torton == 0 || this.recoleccion_torton <= 0 || this.recoleccion_torton == "") {
        Swal.fire({
          title: "El Costo de Recolección para la unidad Torton debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.flete_nacional == 0 || this.flete_nacional <= 0 || this.flete_nacional == "") {
        Swal.fire({
          title: "El Costo del Flete Nacional debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_puerto_nissan == 0 || this.entrega_puerto_nissan <= 0 || this.entrega_puerto_nissan == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Nissan debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_puerto_tres_y_media == 0 || this.entrega_puerto_tres_y_media <= 0 || this.entrega_puerto_tres_y_media == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad 3 1/2 debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_rabon == 0 || this.entrega_rabon <= 0 || this.entrega_rabon == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Rabon debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.entrega_torton == 0 || this.entrega_torton <= 0 || this.entrega_torton == "") {
        Swal.fire({
          title: "El Costo del Servicio de Entrega en puerto para la unidad Torton debe ser mayor a 0",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let tarifa = {
        origen: this.origen,
        destino: this.destino,
        factor_conversion: this.factor_conversion,
        recoleccion_tres_y_media: this.recoleccion_tres_y_media,
        recoleccion_rabon: this.recoleccion_rabon,
        recoleccion_torton: this.recoleccion_torton,
        flete_nacional: this.flete_nacional,
        entrega_puerto_nissan: this.entrega_puerto_nissan,
        entrega_puerto_tres_y_media: this.entrega_puerto_tres_y_media,
        entrega_rabon: this.entrega_rabon,
        entrega_torton: this.entrega_torton,
        usuario: this.username,
      };

      this.agregarTarifa.push(tarifa);

      axios({
        method: "post",
        url: `/api/v1/nueva-tarifa/`,
        data: {

          datos: this.agregarTarifa

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)

        if(response.data[0].insert){
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/new-tarifa";
            }
          })
        }else{
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
        
      })

    },

    getId() {
      axios({
        method: "post",
        url: `/api/v1/zonas-obtenerid/`,
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
            this.id = response.data[0].idZona;
          } else {
            this.id = 0
          }
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

      let pkPais = event;
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
            <b-row>
              <b-col md="4" sm="12">
                <h5 class="header-title">Información de la Tarifa</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="../../cotizaciones/listTarifarios"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Manual" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Origen:" label-for="origen">
                        <b-form-input v-model="origen" id="origen"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Destino:" label-for="destino">
                        <b-form-input v-model="destino" id="destino"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Factor de Conversión:" label-for="factor" description="">
                        <b-form-input id="factor" v-model="factor_conversion" type="number" placeholder="Ingresa el Factor de Conversión" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Camioneta 3 1/2" label-for="servicio de recoleccion">
                        <b-form-input v-model="recoleccion_tres_y_media" id="recoleccion_tres_y_media" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Rabon" label-for="recoleccion_rabon">
                        <b-form-input v-model="recoleccion_rabon" id="recoleccion_rabon" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Recolección Torton" label-for="factor" description="">
                        <b-form-input id="recoleccion_torton" v-model="recoleccion_torton" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Flete Nacional" label-for="flete_nacional">
                        <b-form-input v-model="flete_nacional" id="flete_nacional" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Nissan" label-for="entrega_puerto_nissan">
                        <b-form-input v-model="entrega_puerto_nissan" id="entrega_puerto_nissan" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Camioneta 3 1/2" label-for="factor" description="">
                        <b-form-input id="entrega_puerto_tres_y_media" v-model="entrega_puerto_tres_y_media" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Rabon" label-for="entrega_rabon">
                        <b-form-input v-model="entrega_rabon" id="entrega_rabon" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Costo Servicio: Entrega en Puerto Torton" label-for="entrega_torton">
                        <b-form-input v-model="entrega_torton" id="entrega_torton" type="number" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #00786c" @click="Save()"><b><i class="fe-check"></i> Guardar</b></b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
                <!--b-tab title="Multiple">
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
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
