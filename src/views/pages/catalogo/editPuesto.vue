<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Editar Puesto/Función",
    meta: [{ name: "editPuesto", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Puesto/Función",
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
          text: "Editar",
          href: "/editPuesto",
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
    this.getPuesto()
  },

  methods: {

    getPuesto(){

      const idP = this.$route.params.pkPuesto;

      axios({
          method: "get",
          url: `puesto/${idP}/`,
      })
      .then((response) => {

        console.log(response.data)

        this.nameTipo = response.data.tipo
        this.nombre = response.data.nombre
        this.descripcion = response.data.descripcion

      })
      .catch((error) => {
          console.log(error);
      });

    },

    Save(){

      const idP = this.$route.params.pkPuesto;

      axios({ 

        method: "put",
        url: `puesto/${idP}/`,
        data: {

          tipo: this.nameTipo,
          nombre: this.nombre,
          descripcion: this.descripcion,

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