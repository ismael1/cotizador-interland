<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

// import { tableData } from "./data";
/**
 * Basic Tables component
 */
export default {
  page: {
    title: "Seleccion de Zonas",
    meta: [{ name: "Seleccion de Zonas", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {

      buscador: '',
      opcion: 0,

      page_list: [],
      total: 0,//Total number of products
      curpage: 1,//Current page
      all: 0,//Total number of pages
      lastpage: 0,//previous page
      nextpage: 0,//Next page
      size: 8,//How much to display per page

      title: "Seleccion de Zonas",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Seleccion de Zonas",
          href: "/",
          active: true,
        },
      ],

      options_estado: [],

      /*VARIABLES*/
      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',
      permisos: [],

      modulos_estatus: 0,
      modulos_icon: "",
      modulos_id: 0,
      modulos_idMenu: 0,
      modulos_isSubmenu: false,
      modulos_link: "",
      modulos_nombre: "",
      permisos_agregar: 0,
      permisos_editar: 0,
      permisos_eliminar: 0,
      permisos_lectura: 0,
      permisos_pdf: 0,
      permisos_excel: 0,
      permisos_usuarioAsigna: "",


      /*AGREGAR VARIABLE QUE GUARDARA EL ID DEL MODULO*/
      idModulo: 39,

    };
  },
  created: function () {
    this.dataSess();
    this.getEstados();
  },
  methods: {

    dataSess() {
      let data = JSON.parse(localStorage.getItem('users'))

      for (let i = 0; i < data.length; i++) {
        this.idU = data[i].id;
        this.emailU = data[i].email;
        this.nombreU = data[i].nombre;
        this.username = data[i].username;
        this.tokenU = data[i].token;
        this.puestoU = data[i].puesto;
      }

      this.permisoUsr();
    },

    permisoUsr() {
      let id = this.idU

      axios({
        method: "post",
        url: '/api/v1/permisosModuloUsuario/',
        data: {
          id: id,
          idModulo: this.idModulo,
        },
      }).then((response) => {

        this.modulos_estatus = response.data[0].modulos_estatus
        this.modulos_icon = response.data[0].modulos_icon
        this.modulos_id = response.data[0].modulos_id
        this.modulos_idMenu = response.data[0].modulos_idMenu
        this.modulos_isSubmenu = response.data[0].modulos_isSubmenu
        this.modulos_link = response.data[0].modulos_link
        this.modulos_nombre = response.data[0].modulos_nombre
        this.permisos_agregar = response.data[0].permisos_agregar
        this.permisos_editar = response.data[0].permisos_editar
        this.permisos_eliminar = response.data[0].permisos_eliminar
        this.permisos_lectura = response.data[0].permisos_lectura
        this.permisos_pdf = response.data[0].permisos_pdf
        this.permisos_excel = response.data[0].permisos_excel
        this.permisos_usuarioAsigna = response.data[0].permisos_usuarioAsigna
      }).catch((error) => {
        console.log(error);
      });
    },

    getEstados(d) {
      
      axios.get('/api/v1/get-select-zonas/', {
      }).then(res => {
        this.options_estado = res.data.zona
      });
    },

    accionesAplicaZona(id, tipo){
      let estatus = false

      if(tipo == 'c'){
        estatus = document.getElementById(id + '-registro_c').checked
      }

      if (tipo == 'nc') {
        estatus = document.getElementById(id + '-registro_nc').checked
      }

      if (tipo == 'p') {
        estatus = document.getElementById(id + '-registro_p').checked
      }
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      console.log(id, tipo);

      axios({
        method: "post",
        url: '/api/v1/update-select-zonas/',
        data: {
          id: id,
          tipo: tipo,
          estatus: estatus,
        },
      }).then((response) => {
        console.log(response.data);
        let indice = this.options_estado.map((busqueda) => busqueda.id).indexOf(id);

        if(tipo == 'c'){
          this.options_estado[indice].check_zona_c = estatus;
        }

        if(tipo == 'nc'){
          this.options_estado[indice].check_zona_nc = estatus;
        }

        if(tipo == 'p'){
          this.options_estado[indice].check_zona_p = estatus;
        }

      });

      Toast.fire({
        icon: 'success',
        title: 'Actualización Correcta!'
      })

    },

  },
  computed: {

  },
  mounted() {
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="header-title">List</h4> -->

            <!-- mb-md-2 -->
            <div class="row">

              <div class="col-lg-8">
                
              </div>

              <!-- Search -->
              <div class="col-lg-4">
              </div>

            </div>

            <template>

              <b-tabs nav-class="nav-tabs nav-bordered">
                <!-- Inicia Activas -->
                <b-tab title="Zonas Comerciales" active>
                  <b-alert show variant="success">
                    <b-row>
                      <b-col sm="12">
                        <h3>Selecciona las Zonas Comerciales:</h3>
                      </b-col>
                    </b-row>
                  </b-alert>
                  <b-alert show variant="light">
                    <b-row>
                      <b-col sm="12">
                        <span v-for="(item, index) in this.options_estado" :key="index">
                        <b-form-checkbox :checked="item.check_zona_c" switch @change="accionesAplicaZona(item.id, 'c')" v-bind:id="item.id+'-registro_c'">
                          <b-badge v-if="item.check_zona_c" variant="success">Zona Habilitada</b-badge>
                          <b-badge v-else variant="danger">Zona Deshabilitada</b-badge>
                          &nbsp;
                          <span style="font-size: 16px;"><b>{{ item.direccion }}</b></span>
                          <br/>
                          <br/>
                        </b-form-checkbox>
                      </span>
                      </b-col>
                    </b-row>
                  </b-alert>
                </b-tab>
                <b-tab title="Zonas No Comerciales">
                  <b-alert show variant="warning">
                    <b-row>
                      <b-col sm="12">
                        <h3>Selecciona las Zonas No Comerciales:</h3>
                      </b-col>
                    </b-row>
                  </b-alert>
                  <b-alert show variant="light">
                    <b-row>
                      <b-col sm="12">
                        <span v-for="(item, index) in this.options_estado" :key="index">
                        <b-form-checkbox :checked="item.check_zona_nc" switch @change="accionesAplicaZona(item.id, 'nc')" v-bind:id="item.id+'-registro_nc'">
                          <b-badge v-if="item.check_zona_nc" variant="success">Zona Habilitada</b-badge>
                          <b-badge v-else variant="danger">Zona Deshabilitada</b-badge>
                          &nbsp;
                          <span style="font-size: 16px;"><b>{{ item.direccion }}</b></span>
                          <br/>
                          <br/>
                        </b-form-checkbox>
                      </span>
                      </b-col>
                    </b-row>
                  </b-alert>
                </b-tab>
                <b-tab title="Zonas Peligrosas">
                  <b-alert show variant="danger">
                    <b-row>
                      <b-col sm="12">
                        <h3>Selecciona las Zonas Peligrosas:</h3>
                      </b-col>
                    </b-row>
                  </b-alert>
                  <b-alert show variant="light">
                    <b-row>
                      <b-col sm="12">
                        <span v-for="(item, index) in this.options_estado" :key="index">
                        <b-form-checkbox :checked="item.check_zona_p" switch @change="accionesAplicaZona(item.id, 'p')" v-bind:id="item.id+'-registro_p'">
                          <b-badge v-if="item.check_zona_p" variant="success">Zona Habilitada</b-badge>
                          <b-badge v-else variant="danger">Zona Deshabilitada</b-badge>
                          &nbsp;
                          <span style="font-size: 16px;"><b>{{ item.direccion }}</b></span>
                          <br/>
                          <br/>
                        </b-form-checkbox>
                      </span>
                      </b-col>
                    </b-row>
                  </b-alert>
                </b-tab>
              </b-tabs>

            </template>

            <template>
              <div>
                <div id="map" style="height: 700px"></div>
              </div>
            </template>

            <div class="row">

            </div>

          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!--- end row -->
  </Layout>
</template>

<style>
#map {
  height: 100%;
}
</style>