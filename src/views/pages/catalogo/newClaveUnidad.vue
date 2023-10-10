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
import ItemTemplate from '@/components/ItemTemplateSearch'


export default {
  page: {
    title: "Nueva Clave Unidad",
    meta: [{ name: "newClaveUnidad", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {
      // cpOD: '',
      dates_search: [],
      template: ItemTemplate,


      title: "Nueva Clave Unidad",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Clave Unidad",
          href: "/catalogo/listClaveUnidad",
        },
        {
          text: "Nueva Clave Unidad",
          href: "/newClaveUnidad",
          active: true,
        },
      ],

      claveUnidad: 0,
      name: "",
      description: "",
      note: "",
      dateIniVig: "",
      dateNow: "",
      dateFinVig: "",
      simbolo: "",

    };
  },

  created() {
    this.fechaHoy();    
  },

  methods: {
    
    fechaHoy(){
        let hoy = new Date()
        let dd = hoy.getDate()
        let mm = hoy.getMonth()+1 
        let yyyy = hoy.getFullYear()

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 
        hoy = yyyy+'-'+mm+'-'+dd
        this.dateIniVig = hoy
        this.dateNow = hoy
    },
    
    Save(){

      let unidad = this.claveUnidad
      let name = this.name
      let note = this.note
      let description = this.description
      let dateInicio  = this.dateIniVig
      let dateFin  = this.dateFinVig

      if(unidad == 0 || unidad == ""){
        Swal.fire({
          title: 'Ingrese Clave Unidad',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false        
      }
      if(name == "" || name == null){
        Swal.fire({
          title: 'Ingrese Nombre',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false 
      }
      if(note == "" || note == null){
        Swal.fire({
          title: 'Ingrese Nota',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false 
      }
      if(description == "" || description == null){
        Swal.fire({
          title: 'Ingrese Descripción',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false 
      }
      if(dateInicio == 0 || dateInicio == "" || dateInicio == null){
        Swal.fire({
          title: 'Ingrese Fecha Inicio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false 
      }
      if(dateFin == 0 || dateFin == ""){
      this.dateFinVig = dateInicio
      }
      

      axios({
        method: "post",
        url: `clave_unidad/`,
        data: {

          claveUnidad: this.claveUnidad,
          nombre: this.name,
          descripcion: this.description,
          nota: this.note,
          fechaInicioVigencia: this.dateIniVig,
          fechaFinVigencia: this.dateFinVig,
          simbolo: this.simbolo,

        },
        auth: {
            username: "admin",
            password: "123",
        },
      })
      .then((response) => {
        if(response){
          Swal.fire({
              title: 'Registro Correcto',
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
            <h5 class="header-title">Información Clave Unidad</h5>

            <div class="row mt-3" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <form class="form-horizontal" role="form">

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Clave Unidad</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="claveUnidad"
                      placeholder="Clave Unidad..."
                      >
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Nombre</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="name"
                      placeholder="Nombre..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Descipción</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="description"
                      placeholder="Descipción..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Nota</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="note"
                      placeholder="Nota..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Fecha Inicio Vigencia</label>

                    <div class="col-md-6">
                      <b-form-input
                        readonly
                        type="date"
                        :min="dateNow"
                        :value="dateNow"
                        v-model.trim="dateIniVig"
                      ></b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Fecha Fin Vigencia</label>

                    <div class="col-md-6">
                      <b-form-input
                      class="form-control"
                      type="date"
                      v-model.trim="dateFinVig"
                      ></b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Simbolo</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="simbolo"
                      placeholder="Simbolo..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="text-right">
                    <b-button
                    variant="primary"
                    @click="Save"
                    >Guardar</b-button>
                  </div>
                  
                </form>

              </div>
            </div>

          </div>
          <!-- Fin Car-dBody -->
        </div>

      </div>     
    </div>

  </Layout>
</template>

<style>

</style>
