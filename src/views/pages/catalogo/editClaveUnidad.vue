
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

//agregado 260621
import ItemTemplate from '@/components/ItemTemplateSearch'
import ItemTemplateService from '@/components/ItemTemplateService'
import ItemTemplateProveedor from '@/components/ItemTemplateProveedor'
import templateAduana from '@/components/ItemTemplateAduana'

/**
 * Basic Tables component
 */

export default {
  page: {
    title: "Editar Clave Producto/Servicio",
    meta: [{ name: "editClaveProSer", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      dates_search: [],
      template: ItemTemplate,

      title: "Editar Clave Producto/Servicio",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Clave Producto/Servicio",
          href: "/catalogo/listClaveProSer",
        },
        {
          text: "Editar Clave Producto/Servicio",
          href: "/editClaveProSer",
          active: true,
        },
      ],

      claveProSer: 0,
      description: "",
      dateIniVig: "",
      dateNow: "",
      dateFinVig: "",
      ivaTraslate: "",
      iepsTraslate: "",
      complementInclude: "",

    };
  },
  created() {
    this.fechaHoy()
    this.getClave()
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

    getClave(){

      const idCPS = this.$route.params.pkClaveProSer;

      axios({
          method: "get",
          url: `producto_servicio/${idCPS}/`,
      })
      .then((response) => {

        this.claveProSer = response.data.clave_prodserv
        this.description = response.data.descripcion
        this.dateIniVig = response.data.fechaInicioVigencia
        this.dateFinVig = response.data.fechaFinVigencia
        this.ivaTraslate = response.data.ivaTraslado
        this.iepsTraslate = response.data.iepsTraslado
        this.complementInclude = response.data.complementoIncluir

      })
      .catch((error) => {
          console.log(error);
      });

    },

    Save(){

      const idCPS = this.$route.params.pkClaveProSer;

      let claveps = this.claveProSer
      let description = this.description
      let dateInicio  = this.dateIniVig
      let dateFin  = this.dateFinVig

      if(claveps == 0 || claveps == ""){
        Swal.fire({
          title: 'Ingrese Clave Producto/Servicio',
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
        method: "put",
        url: `producto_servicio/${idCPS}/`,
        data: {

          clave_prodserv: this.claveProSer,
          descripcion: this.description,
          fechaInicioVigencia: this.dateIniVig,
          fechaFinVigencia: this.dateFinVig,
          ivaTraslado: this.ivaTraslate,
          iepsTraslado: this.iepsTraslate,
          complementoIncluir: this.complementInclude,

        },
        auth: {
            username: "admin",
            password: "123",
        },
      })
      .then((response) => {
        if(response){
          Swal.fire({
              title: 'Actualización Exitosa',
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
            <h5 class="header-title">Información Clave Producto/Servicio</h5>

            <div class="row mt-3" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <form class="form-horizontal" role="form">

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Clave Producto/Servicio</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="claveProSer"
                      placeholder="Clave Producto/Servicio..."
                      >
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Descripción</label>

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
                      placeholder="Descipción..."
                      ></b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >IVA Traslado</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="ivaTraslate"
                      placeholder="IVA..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >IEPS Traslado</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="iepsTraslate"
                      placeholder="IEPS..."
                      >                      
                      </b-form-input>
                    </div>

                  </div>

                  <div class="form-row form-group">
                    <label
                    class="col-md-4 col-form-label text-right"
                    >Complemento</label>

                    <div class="col-md-6">
                      <b-form-input
                      v-model.trim="complementInclude"
                      placeholder="Complemento..."
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