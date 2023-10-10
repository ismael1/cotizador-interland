<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Responsable Jerárquico",
    meta: [{ name: "newPuesto", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {

      title: "Nuevo Responsable Jerárquico",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Lista Responsable Jerárquico",
          href: "/catalogo/listResponsable",
        },
        {
          text: "Nuevo Responsable Jerárquico",
          href: "/newResponsable",
          active: true,
        },
      ],

      apellidos: "",
      nombre: "",

    };
  },

  created() {

  },

  methods: {

    Save(){

      let apellidos = this.apellidos
      let nombre = this.nombre

      if(apellidos == "" || apellidos == 0 || apellidos == null){
        Swal.fire({
          title: 'Error',
          text: 'Ingresa Apellido',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false
      }
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
        url: `responsable/`,
        data: {

          apellidos: this.apellidos,
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
            <h5 class="header-title">Responsable Jerárquico</h5>

            <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <div class="form-row">

                  <b-form-group class="col-md-4" label="Apellidos" label-for="input_apellidos">
                    <b-input v-model="apellidos" @input="apellidos = apellidos.toUpperCase()" placeholder="Apellidos..."></b-input>                   
                  </b-form-group>

                  <b-form-group class="col-md-4" label="Nombre(s)" label-for="input_nombre">
                    <b-input v-model="nombre" @input="nombre = nombre.toUpperCase()" placeholder="Nombre(s)..."></b-input>
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
