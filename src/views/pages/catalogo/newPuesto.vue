<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Puesto/Función",
    meta: [{ name: "newPuesto", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {

      title: "Nuevo Puesto/Función",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Lista Puesto/Función",
          href: "/catalogo/listPuesto",
        },
        {
          text: "Nuevo Puesto/Función",
          href: "/newPuesto",
          active: true,
        },
      ],

      nombre: "",
      nameTipo: "Puesto",
      tipo: [
        {value: "Puesto", text: "Puesto"},
        {value: "Funcion", text: "Función"},
      ],
      descripcion: "",

    };
  },

  created() {

  },

  methods: {

    Save(){

      axios({
        method: "post",
        url: `puesto/`,
        data: {

          nombre: this.nombre,
          tipo: this.nameTipo,
          descripcion: this.descripcion,
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
            <h5 class="header-title">Registro Puesto/Función</h5>

            <div class="row mt-2" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <div class="row">

                  <div class="col-md-5">

                    <label for="" style="font-size:12px; font-weight: bold;">Tipo</label>
                    <b-select
                    v-model="nameTipo"                    
                    ><option
                      v-for="tip in tipo"
                      :key="tip.value"
                      v-bind:value="tip.value"
                      > {{ tip.text }} </option>
                    </b-select>

                    <label for="" style="font-size:12px; font-weight: bold;">Descripción</label>
                    <b-textarea v-model="descripcion" @input="descripcion = descripcion.toUpperCase()" placeholder="Descripción..."></b-textarea>                    
                  </div>

                  <div class="col-md-5">
                    <label for="" style="font-size:12px; font-weight: bold;">Nombre</label>
                    <b-input v-model="nombre" @input="nombre = nombre.toUpperCase()" placeholder="Nombre..."></b-input>

                    <b-button
                    class="mt-4"
                    style="margin-bottom: -74px;"
                    variant="primary"
                    @click="Save"
                    >Guardar</b-button>
                  </div>

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
