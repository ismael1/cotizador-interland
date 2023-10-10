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
    title: "Términos y Condiciones",
    meta: [{ name: "Términos y Condiciones", content: appConfig.description }],
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

      total2: 0,//Total number of products
      curpage2: 1,//Current page
      all2: 0,//Total number of pages
      lastpage2: 0,//previous page
      nextpage2: 0,//Next page
      size2: 8,//How much to display per page

      total3: 0,//Total number of products
      curpage3: 1,//Current page
      all3: 0,//Total number of pages
      lastpage3: 0,//previous page
      nextpage3: 0,//Next page
      size3: 8,//How much to display per page

      title: "Términos y Condiciones",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Términos y Condiciones",
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

      all_data2: [],
      totalRows2: 1,
      currentPage2: 1,
      perPage2: 10,
      pageOptions2: [5, 10, 15, 20],
      filter2: null,
      filterOn2: [],
      sortBy2: "id",
      sortDesc2: false,

      all_data3: [],
      totalRows3: 1,
      currentPage3: 1,
      perPage3: 10,
      pageOptions3: [5, 10, 15, 20],
      filter3: null,
      filterOn3: [], 
      sortBy3: "id",
      sortDesc3: false,

      rechazado: "",
      tertipocarga: "",
      confirmarServices3: [],
      
      fields: [
        {
          key: "orden",
          label: "Orden",
          sortable: true,
        },
        {
          key: "condicion",
          label: "Condición",
          sortable: true,
        },
        {
          key: "aplica",
          label: "Modalidad",
          sortable: true,
        },
        {
          key: "estatus",
          label: "Estatus",
          sortable: true,
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],

      fields2: [
      {
          key: "orden",
          label: "Orden",
          sortable: true,
        },
        {
          key: "condicion",
          label: "Condición",
          sortable: true,
        },
        {
          key: "aplica",
          label: "Modalidad",
          sortable: true,
        },
        {
          key: "estatus",
          label: "Estatus",
          sortable: true,
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],

      fields3: [
      {
          key: "orden",
          label: "Orden",
          sortable: true,
        },
        {
          key: "condicion",
          label: "Condición",
          sortable: true,
        },
        {
          key: "aplica",
          label: "Modalidad",
          sortable: true,
        },
        {
          key: "estatus",
          label: "Estatus",
          sortable: true,
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],

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


      idModulo: 32,
    };
  },
  created: function () {
    this.dataSess();
    setTimeout('',5000)
    this.get_customers(1);
    this.get_customers2(1);
    this.get_customers3(1);
    
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
    
    get_customers(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios
        .get('/api/v1/list-terminos-filtro/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter,
            userSearch: this.username,

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

    get_customers2(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios
        .get('/api/v1/list-terminos-filtro-ftl/', {
          params: {
            page: mypage,
            size: this.size2,
            palabra: caracter,
            userSearch: this.username,
          }
        })
        .then(res => {

          this.all_data2 = res.data.data;
          this.total2 = res.data.total

          //Judging the previous page
          if (mypage == 1) {
            this.lastpage2 = 0;
          } else {
            this.lastpage2 = mypage - 1
          }
          this.all2 = Math.ceil(res.data.total / this.size2);
          if (mypage == this.all2) {
            this.nextpage2 = 0
          } else {
            this.nextpage2 = mypage + 1
          }
        });

    },

    get_customers3(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios
        .get('/api/v1/list-terminos-filtro-fcl/', {
          params: {
            page: mypage,
            size: this.size3,
            palabra: caracter,
            userSearch: this.username,
          }
        })
        .then(res => {

          this.all_data3 = res.data.data;
          this.total3 = res.data.total

          //Judging the previous page
          if (mypage == 1) {
            this.lastpage3 = 0;
          } else {
            this.lastpage3 = mypage - 1
          }
          this.all3 = Math.ceil(res.data.total / this.size3);
          if (mypage == this.all3) {
            this.nextpage3 = 0
          } else {
            this.nextpage3 = mypage + 1
          }
        });

    },

    viewCotizacion(item) {
      this.$router.push(`/validate-cotizacion/${item.id}/`);
    },

    deleteCotizacion(item) {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Eliminar Registro',
        text: "Estas Seguro de Eliminar este Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          //Inica AXIOS
          axios({
            method: "put",
            url: `servicioCotizaciones/${item.id}/`,
            data: {
              estatus: 3
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              if (response) {
                this.get_customers(1)
              }
            })
            .catch((error) => {
              console.log(error);
            });
          //Termina AXIOS

          swalWithBootstrapButtons.fire(
            'Eliminado',
            'Registro Eliminado Exitosamente',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Eliminar Registro Cancelado',
            'error'
          )
        }
      })

    },

    generatePDF(item) { // GeneraPDF David
      console.log(item)
      //let routeUrl = `http://127.0.0.1:8000/api/v1/cotiza-pdf/`;
      let routeUrl = `/api/v1/cotiza-pdf/${item.id}/`;
      //window.open(routeUrl, '_blank')

      axios({
        url: routeUrl,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Cotizacion-' + item.folioConsecutivo + '.pdf');
        document.body.appendChild(fileLink);
        fileLink.click();
      }
      );

      Swal.fire({
        title: 'Descargando PDF',
        text: '',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })

    },

    showRejected(item) {
      this.rechazado = item.rechazo
      this.$bvModal.show('modalStatus')
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    onFiltered2(filteredItems) {
      this.totalRows2 = filteredItems.length;
      this.currentPage2 = 1;
    },

    onFiltered3(filteredItems) {
      this.totalRows3 = filteredItems.length;
      this.currentPage3 = 1;
    },

    pulsar(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_customers(1)
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

    rows() {
      return this.all_data2.length;
    },

    rows() {
      return this.all_data3.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.totalRows2 = this.items.length;
    this.totalRows3 = this.items.length;
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
            <div class="row">
                <div class="col-lg-12">
                  <router-link v-if="permisos_agregar == 1" to="/catalogo/newTermino" class="button btn-dark btn-sm" style="float: left">Nueva Cotización</router-link>
                </div>
              </div>
            <b-tabs nav-class="nav-tabs nav-bordered">
              <!-- Inicia Activas -->
              
              <b-tab title="LTL" active>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="">
                      <div class="card-body">
                        <!-- <h4 class="header-title">List</h4> -->

                        <!-- mb-md-2 -->
                        <div class="row">

                          <div class="col-lg-8"></div>

                          <!-- Search -->
                          <div class="col-lg-4">
                            <!-- <form> -->
                            <b-input-group v-if="permisos_lectura == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                              <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers(1)"></b-form-input>
                              <b-input-group-append>
                                <b-button size="sm" text="Button" variant="secondary" @click="get_customers(1)"><i class="fa fa-search"></i> Search</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="table-responsive">

                              <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data" :fields="fields" small bordered
                                responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn"
                                @filtered="onFiltered" :selectable="true">

                                <template #cell(estatus)="row">
                                  <i v-show="row.item.estatus == 0" title="Pendiente" v-b-tooltip.hover="{ variant: 'warning' }" class="fas fa-clock" style="color: #f7b84b;"></i> <!--Pendiente-->
                                  <i v-show="row.item.estatus == 1" title="Aceptado" v-b-tooltip.hover="{ variant: 'success' }" class="fas fa-check-circle" style="color: #1abc9c;"></i> <!--Aceptado-->
                                </template>

                                <template #cell(actions)="row">
                                  <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editCotizacion(row.item)"></i>||
                                  <!--i class="fas fa-edit"></i-->
                                  <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteCotizacion(row.item)"></i>
                                </template>
                              </b-table>
                            </div>
                          </div>
                        </div>


                        <div class="row">
                          <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                            <!-- v-show judges whether the current page number needs to display the previous or next page -->
                            <b-button size="sm" v-show="lastpage" @click="get_customers(lastpage)"
                              variant="outline-secondary">Previous page</b-button>
                            <b-button size="sm" v-for="index in all" @click="get_customers(index)" v-bind:key="index"
                              variant="outline-secondary">{{ index }}</b-button>
                            <b-button size="sm" v-show="nextpage" @click="get_customers(nextpage)"
                              variant="outline-secondary">Next
                              page</b-button>
                          </div>
                        </div>

                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col -->
                </div>

              </b-tab>
              <!-- Fin Activas -->

              <!-- Inicia Contestados -->
              <b-tab title="FTL">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="">
                      <div class="card-body">
                        <!-- <h4 class="header-title">List</h4> -->

                        <!-- mb-md-2 -->
                        <div class="row">

                          <div class="col-lg-8">
                            
                          </div>

                          <!-- Search -->
                          <div class="col-lg-4">
                            <!-- <form> -->
                            <b-input-group v-if="permisos_lectura == 1" v-for="size2 in ['sm']" :key="size2" :size="size2" class="mb-2">
                              <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers2(1)"></b-form-input>
                              <b-input-group-append>
                                <b-button size="sm" text="Button" variant="secondary" @click="get_customers2(1)"><i class="fa fa-search"></i> Search</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="table-responsive">

                              <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data2" :fields="fields2" small bordered
                                responsive="sm" :per-page="perPage2" :current-page="currentPage2" :sort-by.sync="sortBy2"
                                :sort-desc.sync="sortDesc2" :filter="filter2" :filter-included-fields="filterOn2"
                                @filtered="onFiltered2" :selectable="true">

                                <template #cell(estatus)="row">
                                  <i v-show="row.item.estatus == 0" title="Pendiente" v-b-tooltip.hover="{ variant: 'warning' }" class="fas fa-clock" style="color: #f7b84b;"></i> <!--Pendiente-->
                                  <i v-show="row.item.estatus == 1" title="Aceptado" v-b-tooltip.hover="{ variant: 'success' }" class="fas fa-check-circle" style="color: #1abc9c;"></i> <!--Aceptado-->
                                </template>

                                <template #cell(actions)="row">
                                  <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editCotizacion(row.item)"></i>||
                                  <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteCotizacion(row.item)"></i>
                                </template>
                              </b-table>

                              <!-- Inicio Modal -->
                              <div>
                                <b-modal id="modalStatus" hide-footer>
                                  <template #modal-title>
                                    Motivo de Rechazo
                                  </template>
                                  <div class="d-block text-center">
                                    <h3>{{ rechazado }}</h3>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-12 text-right">
                                      <b-button class="mt-3" block @click="$bvModal.hide('modalStatus')">Cerrar</b-button>
                                    </div>
                                  </div>
                                </b-modal>
                              </div>
                              <!-- Fin Modal -->

                            </div>
                          </div>
                        </div>


                        <div class="row">
                          <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                            <!-- v-show judges whether the current page number needs to display the previous or next page -->
                            <b-button size="sm" v-show="lastpage2" @click="get_customers2(lastpage)" variant="outline-secondary">Previous page</b-button>
                            <b-button size="sm" v-for="index in all2" @click="get_customers2(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
                            <b-button size="sm" v-show="nextpage2" @click="get_customers2(nextpage)" variant="outline-secondary">Next page</b-button>
                          </div>
                        </div>

                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col -->
                </div>
              </b-tab>
              <!-- Fin Contestados -->

              <!-- Inicia Sin Contestar -->
              <b-tab title="FCL">

                <div class="row">
                  <div class="col-lg-12">
                    <div class="">
                      <div class="card-body">
                        <!-- <h4 class="header-title">List</h4> -->

                        <!-- mb-md-2 -->
                        <div class="row">

                          <div class="col-lg-8">
                            
                          </div>

                          <!-- Search -->
                          <div class="col-lg-4">
                            <!-- <form> -->
                            <b-input-group v-if="permisos_lectura == 1" v-for="size3 in ['sm']" :key="size3" :size="size3" class="mb-2">
                              <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers3(1)"></b-form-input>
                              <b-input-group-append>
                                <b-button size="sm" text="Button" variant="secondary" @click="get_customers3(1)"><i class="fa fa-search"></i> Search</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="table-responsive">

                              <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data3" :fields="fields3" small bordered
                                responsive="sm" :per-page="perPage3" :current-page="currentPage3" :sort-by.sync="sortBy3"
                                :sort-desc.sync="sortDesc3" :filter="filter3" :filter-included-fields="filterOn3"
                                @filtered="onFiltered3" :selectable="true">

                                <template #cell(estatus)="row">
                                  <i v-show="row.item.estatus == 0" title="Pendiente" v-b-tooltip.hover="{ variant: 'warning' }" class="fas fa-clock" style="color: #f7b84b;"></i> <!--Pendiente-->
                                  <i v-show="row.item.estatus == 1" title="Aceptado" v-b-tooltip.hover="{ variant: 'success' }" class="fas fa-check-circle" style="color: #1abc9c;"></i> <!--Aceptado-->
                                </template>

                                <template #cell(actions)="row">
                                  <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editCotizacion(row.item)"></i>||
                                  <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteCotizacion(row.item)"></i>
                                </template>

                              </b-table>

                              <!-- Inicio Modal -->
                              <div>
                                <b-modal id="modalStatus" hide-footer>
                                  <template #modal-title>
                                    Motivo de Rechazo
                                  </template>
                                  <div class="d-block text-center">
                                    <h3>{{ rechazado }}</h3>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-12 text-right">
                                      <b-button class="mt-3" block @click="$bvModal.hide('modalStatus')">Cerrar</b-button>
                                    </div>
                                  </div>
                                </b-modal>
                              </div>
                              <!-- Fin Modal -->

                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                            <!-- v-show judges whether the current page number needs to display the previous or next page -->
                            <b-button size="sm" v-show="lastpage3" @click="get_customers3(lastpage)" variant="outline-secondary">Previous page</b-button>
                            <b-button size="sm" v-for="index in all3" @click="get_customers3(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
                            <b-button size="sm" v-show="nextpage3" @click="get_customers3(nextpage)" variant="outline-secondary">Next page</b-button>
                          </div>
                        </div>

                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col -->
                </div>

              </b-tab>
              <!-- Sin Contestar -->
            </b-tabs>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
  </Layout>
</template>

<style>.swal-wide {
  width: 850px !important;
}</style>