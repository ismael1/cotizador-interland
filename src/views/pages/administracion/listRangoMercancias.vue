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
    title: "Rango de Mercancias",
    meta: [{ name: "Rango de Mercancias", content: appConfig.description }],
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

      title: "Rangos de Mercancias",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Listado de Rangos",
          href: "/",
          active: true,
        },
      ],

      all_data: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,

      rechazado: "",

      fields: [
        {
          key: "min",
          label: "Rango Minimo",
          sortable: true,
        },
        {
          key: "max",
          label: "Rango Maximo",
          sortable: true,
        },
        {
          key: "orden",
          label: "Orden",
          sortable: true,
        },
        {
          key: "porcentaje",
          label: "Porcentaje",
          sortable: true,
        },
        {
          key: "estatus",
          label: "Estatus",
          sortable: true,
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],
      /*VARIABLES*/
      idU:0,
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
      idModulo: 37,
    };
  },
  created: function () {
    this.dataSess();
    this.get_rangos(1);
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

      this.permisoUsr();
    },

    permisoUsr(){
      let id = this.idU
      
      axios({
        method: "post",
        url: '/api/v1/permisosModuloUsuario/',
        data:{
          id: id,
          idModulo: this.idModulo,
        }, 
      }).then((response) => {
        //this.permisos = response.data

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

    get_rangos(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios
        .get('/api/v1/list-rango-mercancias/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter,
            usuario: this.username,
          }
        }).then(res => {

          this.all_data = res.data.data;
          this.total = res.data.total

          //Judging the previous page
          if (mypage == 1) {
            this.lastpage = 0;
          } else {
            this.lastpage = mypage - 1
          }
          this.all = Math.ceil(res.data.total / this.size);
          if (mypage == this.all) {
            this.nextpage = 0
          } else {
            this.nextpage = mypage + 1
          }
        });

    },

    viewCotizacion(item) {
      // this.$router.push(`/validate-cotizacion/${item.id}/`);
    },

    editServicio(item) {
      // const idR = this.$route.params.pkRuta;
      this.$router.push(`/edit-modulo/${item.id}/`);
    },

    deleteProducto(item) {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Eliminar Unidad',
        text: "¿Deseas eliminar esta unidad?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "put",
            url: `/api/v1/services-delete/${item.id}/`,
            data: {
              status: 3
            },
            auth: {
              username: "admin",
              password: "123",
            },
          }).then((response) => {
            Swal.fire({
              title: "Unidad Eliminada",
              text: "",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonText: "Cerrar",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/catalogo/listUnidad";
              }
            })
          }).catch((error) => {
            Swal.fire({
              title: "Ocurrio un error al intentar eliminar la unidad. " + error,
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          });
          //Termina AXIOS
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Eliminar Servicio Cancelado',
            'error'
          )
        }
      })
    },

    generatePDF(item) { // GeneraPDF David
      // let routeUrl = "http://127.0.0.1:8000/api/v1/cotiza-pdf/";
      // let routeUrl = `http://127.0.0.1:8000/api/v1/cotiza-pdf/${item.id}/`;
      // window.open(routeUrl, '_blank')

      // Swal.fire({
      //   title: 'Descargando PDF',
      //   text: '',
      //   icon: 'success',
      //   confirmButtonText: 'Cerrar',
      // })

    },

    showRejected(item) {
      this.rechazado = item.rechazo
      this.$bvModal.show('modalStatus')
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    pulsar(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_rangos(1)
      }
    },

  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.all_data.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
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
                <router-link v-if="permisos_agregar == 1" to="/administracion/new-rango-mercancia" class="button btn-primary btn-sm" style="float: left"><i class="fa fa-plus"></i> Nuevo Rango</router-link>
              </div>

              <!-- Search -->
              <div class="col-lg-4">
                <!-- <form> -->
                <b-input-group v-if="permisos_lectura == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                  <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_rangos(1)"></b-form-input>
                  <b-input-group-append>
                    <b-button size="sm" text="Button" variant="secondary" @click="get_rangos(1)"><i class="fa fa-search"></i> Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>

            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="table-responsive">

                  <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data" :fields="fields" small bordered responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" :selectable="true">
                    <template v-slot:cell(estatus)="data">
                      <div class="text-center">
                        <span class="badge badge-soft-warning" v-if="data.item.estatus === 0">Inactivo</span>
                        <span class="badge badge-soft-success" v-else>Activo</span>
                      </div>
                    </template>
                    <template #cell(actions)="row">
                      <!--i class="fas fa-file-pdf" @click="generatePDF(row.item)"></i-->
                      <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editServicio(row.item)"></i>
                      ||
                      <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteProducto(row.item)">
                      </i>
                    </template>
                  </b-table>

                </div>
              </div>
            </div>
            
            <div class="row">
              <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                <!-- v-show judges whether the current page number needs to display the previous or next page -->
                <b-button size="sm" v-show="lastpage" @click="get_rangos(lastpage)" variant="outline-secondary">Previous page</b-button>
                <b-button size="sm" v-for="index in all" @click="get_rangos(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
                <b-button size="sm" v-show="nextpage" @click="get_rangos(nextpage)" variant="outline-secondary">Next page</b-button>
              </div>
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

</style>