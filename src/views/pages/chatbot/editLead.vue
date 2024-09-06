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
    title: "Actualizar Tarifa",
    meta: [{ name: "editTarifa", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Actualizar Tarifa",
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
          text: "Editar Tarifa",
          href: "/editTarifa",
          active: true,
        },
      ],

      idTarifa: 0,
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
      estatus: 0,

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
    this.dataSess();
    this.getTarifa();
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
    
    getTarifa() {

      this.idTarifa = this.$route.params.pkTarifa

      if (this.idTarifa > 0) {

        axios.get(`/api/v1/infoTarifa/${this.idTarifa}/`)
          .then((response) => {
            console.log(response.data)

            this.idTarifa = response.data[0].idTarifa
            this.origen = response.data[0].origen
            this.destino = response.data[0].destino
            this.factor_conversion = response.data[0].factor_conversion
            this.recoleccion_tres_y_media = response.data[0].recoleccion_tres_y_media
            this.recoleccion_rabon = response.data[0].recoleccion_rabon
            this.recoleccion_torton = response.data[0].recoleccion_torton
            this.flete_nacional = response.data[0].flete_nacional
            this.entrega_puerto_nissan = response.data[0].entrega_puerto_nissan
            this.entrega_puerto_tres_y_media = response.data[0].entrega_puerto_tres_y_media
            this.entrega_rabon = response.data[0].entrega_rabon
            this.entrega_torton = response.data[0].entrega_torton
            
            
            if(parseInt(response.data[0].estatus) == 1){
              this.estatus = true;
            }else{
              this.estatus = false;
            }

          }).catch((error) => {
            console.log(error);
          });
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

      if(this.estatus){
        this.estatus = 1
      }else{
        this.estatus = 2
      }

      let tarifa = {
        idTarifa: this.idTarifa,
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
        estatus: this.estatus,
        usuario: this.username,
      };

      this.agregarTarifa.push(tarifa);

      axios({
        method: "post",
        url: `/api/v1/actualiza-tarifa/`,
        data: {

          datos: this.agregarTarifa

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)

        if(response.data[0].update){
          Swal.fire({
            title: response.data[0].msg,
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              this.getTarifa();
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
                      <b-form-group label="Estatus" label-for="estatus">
                        <b-form-checkbox switch v-model="estatus" size="lg" v-if="estatus == true"><b-badge variant="success">Activo</b-badge></b-form-checkbox>
                        <b-form-checkbox switch v-model="estatus" size="lg" v-else><b-badge variant="danger">Inactivo</b-badge></b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #00786c" @click="Save()"><b><i class="fe-check"></i> Actualizar</b></b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
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
