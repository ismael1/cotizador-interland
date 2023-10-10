<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Editar Tipo Envío",
    meta: [{ name: "editEnvio", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Tipo Envío",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Lista Tipo Envío",
          href: "/catalogo/listEnvio",
        },
        {
          text: "Editar Tipo Envío",
          href: "/editEnvio",
          active: true,
        },
      ],

      apellidos: "",
      nombre: "",

    };
  },
  created() {
    this.getResponsable();
  },

  methods: {

    getResponsable(){

      const idE = this.$route.params.pkEnvio;

      axios({
          method: "get",
          url: `envio/${idE}/`,
      })
      .then((response) => {
        this.nombre = response.data.nombre
      })
      .catch((error) => {
          console.log(error);
      });

    },

    Save(){

      const idE = this.$route.params.pkEnvio;

      let nombre = this.nombre

      if(nombre == "" || nombre == 0 || nombre == null){
        Swal.fire({
          title: 'Error',
          text: 'Ingresa Nombre',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false
      }

      axios({ 

        method: "put",
        url: `envio/${idE}/`,
        data: {
          nombre: this.nombre,
        },
        auth: {
            username: "admin",
            password: "123",
        },
      })
      .then((response) => {
        if(response){
          Swal.fire({
              title: 'Actualizacion Exitosa',
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
            <h5 class="header-title">Información</h5>

            <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <div class="form-row">

                  <b-form-group class="col-md-4" label="Nombre" label-for="input_nombre">
                    <b-input v-model="nombre" @input="nombre = nombre.toUpperCase()" placeholder="Nombre..."></b-input>
                  </b-form-group>

                  <b-form-group class="col-md-4" style="margin-top: 5px" label="" label-for="">
                    <b-button
                    class="mt-3"
                    variant="primary"
                    @click="Save"
                    >Guardar</b-button>
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