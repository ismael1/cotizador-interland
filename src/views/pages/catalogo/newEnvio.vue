<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Tipo Envío",
    meta: [{ name: "newEnvio", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {

      title: "Nuevo Tipo Envío",
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
          text: "Nuevo Tipo Envío",
          href: "/newEnvio",
          active: true,
        },
      ],

      nombre: "",

    };
  },

  created() {

  },

  methods: {

    Save(){

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
        method: "post",
        url: `envio/`,
        data: {

          nombre: this.nombre,
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
