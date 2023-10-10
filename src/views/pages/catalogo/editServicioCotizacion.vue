<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'

export default {
  page: {
    title: "Editar Servicio Cotización",
    meta: [{ name: "editServicioCotizacion", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Servicio Cotización",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Servicios Cotización",
          href: "/catalogo/listServicioCotizacion",
        },
        {
          text: "Editar Servicio",
          href: "/editServicioCotizacion",
          active: true,
        },
      ],

      codeproduct: "",
      nameproduct: "",
      status: 0,
      estatus: [
        { value: 0, text: "Inactivo" },
        { value: 1, text: "Activo" },

      ],
      unit: "",
      codeunit: "",
      type: "",
      description: "",
      id: 0,

    };
  },
  created() {
    this.getServicio()
  },

  methods: {

    getServicio(){

      const idS = this.$route.params.pkServicio;

      axios({
          method: "get",
          url: `/api/v1/services-get/${idS}/`,
      })
      .then((response) => {

        console.log(response.data)
        this.codeproduct = response.data.codeproduct;
        this.nameproduct = response.data.nameproduct;
        this.status = response.data.status;
        this.unit = response.data.unit;
        this.codeunit = response.data.codeunit;
        this.type = response.data.type;
        this.description = response.data.description;
        this.id = response.data.id;
       

      })
      .catch((error) => {
          console.log(error);
      });

    },

    Save() {
      if(this.codeproduct == '' || this.codeproduct == null){
        Swal.fire({
          title: 'Ingresa el código del servicio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.nameproduct == '' || this.nameproduct == null){
        Swal.fire({
          title: "Ingresa Nombre del Servicio",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      axios({
        method: "put",
        url: `/api/v1/services-update/`,
        data: {
          id: this.id,
          codeproduct: this.codeproduct,
          nameproduct: this.nameproduct,
          status: this.status,
          unit: this.unit,
          codeunit: this.codeunit,
          type: this.type,
          description: this.description,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          Swal.fire({
            title: "Servicio Actualizado",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/catalogo/listServicioCotizacion";
            }
          })
        })
        .catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar actualizar el servicio. "+error,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });

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
            <h5 class="header-title">Información del Servicio</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Codigo de Producto" label-for="codeproduct" description="">
                        <b-form-input id="codeproduct" v-model="codeproduct" placeholder="FLETE NACIONAL" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Nombre del Servicio" label-for="nameproduct" description="">
                        <b-form-input id="nameproduct" v-model="nameproduct" type="text" placeholder="FLETE NACIONAL" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estatus:" label-for="status">
                        <b-form-select v-model="status" :options="estatus"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Unidad:" label-for="unit" description="">
                        <b-form-input id="unit" v-model="unit" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Clave de Unidad:" label-for="codeunit" description="">
                        <b-form-input id="codeunit" v-model="codeunit" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Tipo:" label-for="type" description="">
                        <b-form-input id="type" v-model="type" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6" sm="12">
                      <b-form-group label="Descripción:" label-for="description" description="">
                        <b-form-input id="description" v-model="description" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Guardar</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
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