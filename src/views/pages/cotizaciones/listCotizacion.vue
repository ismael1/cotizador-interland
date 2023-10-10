<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

// import { tableData } from "./data";
/**
 * Basic Tables component
 */
export default {
  page: {
    title: "Cotizaciones",
    meta: [{ name: "Cotizaciones", content: appConfig.description }],
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

      title: "Cotizaciones",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Cotizaciones",
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
          key: "folioConsecutivo",
          label: "Folio Cotización",
          sortable: true,
        },
        {
          key: "tipoServicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "tipoEnvio",
          label: "Envio",
          sortable: true,
        },
        {
          key: "modoEnvio",
          label: "Modo",
          sortable: true,
        },
        {
          key: "fechaCarga",
          label: "Fecha Carga",
          sortable: true,
        },
        {
          key: "ciudadOrigen",
          label: "Origen",
          sortable: true,
        },
        {
          key: "ciudadDestino",
          label: "Destino",
          sortable: true,
        },
        {
          key: "precioTotalFinal",
          label: "Precio",
          sortable: true,
        },
        {
          key: "usuarioGenera",
          label: "Usuario que Generó",
          sortable: true,
        },
        {
          key: "proceso",
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
          key: "folioConsecutivo",
          label: "Folio Cotización",
          sortable: true,
        },
        {
          key: "tipoServicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "tipoEnvio",
          label: "Envio",
          sortable: true,
        },
        {
          key: "modoEnvio",
          label: "Modo",
          sortable: true,
        },
        {
          key: "fechaCarga",
          label: "Fecha Carga",
          sortable: true,
        },
        {
          key: "ciudadOrigen",
          label: "Origen",
          sortable: true,
        },
        {
          key: "ciudadDestino",
          label: "Destino",
          sortable: true,
        },
        {
          key: "precioTotalFinal",
          label: "Precio",
          sortable: true,
        },
        {
          key: "usuarioGenera",
          label: "Usuario que Generó",
          sortable: true,
        },
        {
          key: "proceso",
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
          key: "folioConsecutivo",
          label: "Folio Cotización",
          sortable: true,
        },
        {
          key: "tipoServicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "tipoEnvio",
          label: "Envio",
          sortable: true,
        },
        {
          key: "modoEnvio",
          label: "Modo",
          sortable: true,
        },
        {
          key: "fechaCarga",
          label: "Fecha Carga",
          sortable: true,
        },
        {
          key: "ciudadOrigen",
          label: "Origen",
          sortable: true,
        },
        {
          key: "ciudadDestino",
          label: "Destino",
          sortable: true,
        },
        {
          key: "precioTotalFinal",
          label: "Precio",
          sortable: true,
        },
        {
          key: "usuarioGenera",
          label: "Usuario que Generó",
          sortable: true,
        },
        {
          key: "proceso",
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


      idModulo: 3,
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
        .get('/api/v1/list-cotizacion-filtro/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter,
            userSearch: this.username,

          }
        })
        .then(res => {

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
        .get('/api/v1/list-cotizacion-filtro-vig/', {
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
        .get('/api/v1/list-cotizacion-filtro-sn/', {
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

    formatFecha(fecha){
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(fecha).toLocaleDateString(undefined, options);
    },

    getImgServicios(tipoServicio){
      let src = ''
      if(tipoServicio == 'LTL'){
        src = "/img/ltl.png"
      }else if(tipoServicio == 'FTL'){
        src = "/img/ftl.png"
      }else if(tipoServicio == 'FCL'){
        src = "/img/fcl.png"
      }else{
        src = ""
      }
      return src
    },

    getImgPais(pais){
      
      let src = ''
      if(pais == 1){
        src = "/img/usa.png"
      }else if(pais == 2){
        src = "/img/mex.png"
      }else{
        src = ""
      }
      console.log(src)
      return src
    }

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
                  <router-link v-if="permisos_agregar == 1" to="/new-cotizacion" class="button btn-dark btn-sm" style="float: left">Nueva Cotización</router-link>
                </div>
              </div>
            <b-tabs nav-class="nav-tabs nav-bordered">
              <!-- Inicia Activas -->
              
              <b-tab title="Pendientes" active>

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

                                <template #cell(folioConsecutivo)="row">
                                  <div v-if="row.item.cambiosConsecutivo == 0">{{ row.item.folioConsecutivo }}</div>
                                  <div v-else>{{ row.item.folioConsecutivo }}-{{ row.item.cambiosConsecutivo }}</div>
                                </template>

                                <template #cell(proceso)="row">
                                  <i v-show="row.item.estatus == 0" title="Pendiente" v-b-tooltip.hover="{ variant: 'warning' }" class="fas fa-clock" style="color: #f7b84b;"></i> <!--Pendiente-->

                                  <i v-show="row.item.estatus == 1" title="Aceptado" v-b-tooltip.hover="{ variant: 'success' }" class="fas fa-check-circle" style="color: #1abc9c;"></i> <!--Aceptado-->

                                  <i v-show="row.item.estatus == 2" title="Rechazado" v-b-tooltip.hover="{ variant: 'danger' }" class="fas fa-window-close" style="color: #f1556c;" @click="showRejected(row.item)"></i>

                                  <i v-show="row.item.estatus == 4" title="Esperando Información" v-b-tooltip.hover="{ variant: 'primary' }" class="fas fa-info-circle" style="color: #17a2b8;" @click="showRejected(row.item)"></i>

                                  <!--Rechazado-->
                                </template>

                                <template #cell(actions)="row">
                                  <i v-if="permisos_editar == 1" class="fas fa-eye" @click="viewCotizacion(row.item)"></i>||
                                  <i v-if="permisos_pdf == 1" class="fas fa-file-pdf" @click="generatePDF(row.item)"></i> ||
                                  <!--i class="fas fa-edit"></i-->
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
              <b-tab title="Contestados">
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

                                <template #cell(folioConsecutivo)="row">
                                  <div v-if="row.item.cambiosConsecutivo == 0">{{ row.item.folioConsecutivo }}</div>
                                  <div v-else>{{ row.item.folioConsecutivo }}-{{ row.item.cambiosConsecutivo }}</div>
                                </template>

                                <template #cell(proceso)="row">
                                  <i v-show="row.item.estatus == 0" title="Pendiente"
                                    v-b-tooltip.hover="{ variant: 'warning' }" class="fas fa-clock"
                                    style="color: #f7b84b;"></i> <!--Pendiente-->

                                  <i v-show="row.item.estatus == 1" title="Aceptado"
                                    v-b-tooltip.hover="{ variant: 'success' }" class="fas fa-check-circle"
                                    style="color: #1abc9c;"></i> <!--Aceptado-->

                                  <i v-show="row.item.estatus == 2" title="Rechazado"
                                    v-b-tooltip.hover="{ variant: 'danger' }" class="fas fa-window-close"
                                    style="color: #f1556c;" @click="showRejected(row.item)"></i>

                                  <i v-show="row.item.estatus == 4" title="Esperando Información"
                                    v-b-tooltip.hover="{ variant: 'primary' }" class="fas fa-info-circle"
                                    style="color: #17a2b8;" @click="showRejected(row.item)"></i>


                                  <!--Rechazado-->
                                </template>

                                <template #cell(actions)="row">
                                  <i v-if="permisos_editar == 1" class="fas fa-eye" @click="viewCotizacion(row.item)"></i>||
                                  <i v-if="permisos_pdf == 1" class="fas fa-file-pdf" @click="generatePDF(row.item)"></i> ||
                                  <!--i class="fas fa-edit"></i-->
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
              <b-tab title="Sin Contestar">

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

                                <template #cell(folioConsecutivo)="row">
                                  <div v-if="row.item.cambiosConsecutivo == 0">{{ row.item.folioConsecutivo }}</div>
                                  <div v-else>{{ row.item.folioConsecutivo }}-{{ row.item.cambiosConsecutivo }}</div>
                                </template>

                                <template #cell(proceso)="row">

                                  <i title="Esperando Información" v-b-tooltip.hover="{ variant: 'primary' }" class="fas fa-times-circle" style="color: #17a2b8;"></i>


                                  <!--Rechazado-->
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
                <div v-for="cot in all_data3">
                  <b-container fluid>
                      <b-row style="text-align: left;">
                        <b-col md="12">
                          <div class="_32wbxviw4jD09LXcF-pnQO">
                            <div class="_3LJ4fDbIG0J_5aNiHEwuc3">
                              <div class="_67o1vdZ2Xm6t_iMWTvQHa" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">
                                <div class="Z1fmNdzEAyXQtR1VMeIoa" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">
                                  <div class="_1NZM-8YV57DYlim6UKZ2mi _21jbflRaWIEPbunbfKoK9h">
                                    <a class="_2f40ek0H0uloebYpv4FRdk" style="color: #2aab5c;">
                                      <span class="_3FbRmDEVea5PfNQp33MifH _2wbFrHOOE1HYbNDsvoGnWw">
                                        <span style="user-select: none;">
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">№:&nbsp;</font>
                                          </font>
                                        </span>
                                        <span>
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">{{ cot.folioConsecutivo }}</font>
                                          </font>
                                        </span>
                                      </span>
                                    </a>
                                    <p class="_2iEZ0hNVahRWlwyvnr1uk5">
                                      <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">{{ formatFecha(cot.fechaCarga) }}</font>
                                      </font>
                                    </p>
                                    <div class="_3zqKA9I0nkOVA-xzwQIgW4">
                                      <p class="_2SBupAxT7TNqc_BgsruNwV e7p-GSZxKrsx1uPEVUak9">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">{{ cot.tipoServicio }} {{ cot.tipoOperacion }}</font>
                                        </font>
                                      </p>
                                      <img class="_17DDisQoYGji6byXwU-ZaG " :src="getImgServicios(cot.tipoOperacion)" alt="ícono de envío">
                                      <p class="_2SBupAxT7TNqc_BgsruNwV RblHz7EqeGHgSKoEtsLDw">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">1 × 20 'estándar</font>
                                        </font>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="_1NZM-8YV57DYlim6UKZ2mi">
                                    <p class="_15MsTKTchmJyM8aXD4q4PR">
                                      <span class="_2s3g3bn7dg7AYfnBb8zqZZ">
                                        <span>
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">{{ cot.paisOrigen }}, {{ cot.estadoOrigen }}, {{ cot.ciudadOrigen }}</font>
                                          </font>
                                        </span>
                                        <img class="_1BRKfjrfQ9myX45VMbzv3f" src="../../../assets/images/route-icon.svg" alt="ícono de ruta">
                                        <span>
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">{{ cot.paisDestino }}, {{ cot.estadoDestino }}, {{ cot.ciudadDestino }}</font>
                                          </font>
                                        </span>
                                      </span>
                                      <i class="far fa-chevron-down _335sg2svZpVd3CsmC97TKK"></i>
                                    </p>
                                    <div class="_1PeiXwvCD-_mSSQ602IN0z ">
                                      <div>
                                        <div class="_3Hddm-0byyYNMQdHrwI1sR _1z1zu58QdM50oBghYtQ2wF">
                                          <div class="_2o8rZmKG7Y0enp4LpHAM2f">port of loading</div>
                                          <div class="_3RtWDd4H1Sgvyi1pF7lo74">
                                            <i class="flag-icon flag-icon-il _3z5QeUX6-KRy_byxQ6B9Cd" title="Israel"></i> Haifa, Israel
                                          </div>
                                        </div>
                                        <div class="_3Hddm-0byyYNMQdHrwI1sR UeEXeCJ9-z_Xv0s8GHICd">
                                          <div class="_2o8rZmKG7Y0enp4LpHAM2f">place of discharge</div>
                                          <div class="_3RtWDd4H1Sgvyi1pF7lo74">
                                            <i class="flag-icon flag-icon-il _3z5QeUX6-KRy_byxQ6B9Cd" title="Israel"></i> Haifa, Israel
                                          </div>
                                        </div>
                                      </div>
                                      <a href="/shipping/list/haifa_port_il/haifa_israel_il_1" target="_blank" class="_3M8Gu4JFEL02xLOjDieVVj">
                                        <i class="far fa-search cga9rTI2JHLcwsAmFpEo9"></i>
                                      </a>
                                      <p class="_3tvVF_V6tSa5unRi_GX6tx"></p>
                                      <p class="_1eQ_LoEbNw5Ux0Sx53lrDQ"></p>
                                      <div class="_1eQ_LoEbNw5Ux0Sx53lrDQ"></div>
                                    </div>
                                    <div class="_3OKC-foJAUYhSp0E1h9Lfb">
                                      <div class="_2zdmT-iCHmxuUZevOIb0FD">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">Peso de carga</font>
                                        </font>
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">:</font>
                                        </font>
                                      </div>
                                      <div class="WL6LC1gk59lboqGGmaha6">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">{{ cot.total_peso }} toneladas métricas</font>
                                        </font>
                                      </div>
                                    </div>
                                    <div class="_3OKC-foJAUYhSp0E1h9Lfb">
                                      <div class="_2zdmT-iCHmxuUZevOIb0FD">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">Listo para carga</font>
                                        </font>
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">:</font>
                                        </font>
                                      </div>
                                      <div class="WL6LC1gk59lboqGGmaha6">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">{{ formatFecha(cot.fechaCarga) }}</font>
                                        </font>
                                      </div>
                                    </div>
                                    <div class="_3OKC-foJAUYhSp0E1h9Lfb">
                                      <div class="_2zdmT-iCHmxuUZevOIb0FD">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">Producto</font>
                                        </font>
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">:</font>
                                        </font>
                                      </div>
                                      <div class="WL6LC1gk59lboqGGmaha6">
                                        <font style="vertical-align: inherit;">
                                          <font style="vertical-align: inherit;">{{ cot.descrip }}</font>
                                        </font>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="_1aPzvpVR8SYKYI5zqejGko " style="border-top-left-radius: 5px; border-top-right-radius: 5px;">
                                    <div class="_2sWvTbZXxRXNGXd_Ex44Pi">
                                      <div class="_17jVL24rkQV8DYDupBoJOm">
                                        <img class="_1BRKfjrfQ9myX45VMbzv3f" :src="getImgPais(cot.idpaisDestino)" :alt="cot.paisDestino" style="width: 35px;">
                                        
                                        <span>
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">{{ cot.paisDestino }}</font>
                                          </font>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="_2sWvTbZXxRXNGXd_Ex44Pi">
                                      <div class="_17jVL24rkQV8DYDupBoJOm">                                        
                                        <span>
                                          <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">Estatus: {{ cot.estatus }}
                                              <i title="Cotización Vencida" v-b-tooltip.hover="{ variant: 'primary' }" class="fas fa-times-circle" style="color: #17a2b8;"></i>
                                            </font>
                                          </font>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-col>
                        
                      </b-row>
                      <br>
                    </b-container>
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

<style>
  .swal-wide {
    width: 850px !important;
  }

  ._21jbflRaWIEPbunbfKoK9h {
    width: auto;
    min-width: 140px;
    margin-right: 40px;
  }
  ._1NZM-8YV57DYlim6UKZ2mi {
    max-width: 386px;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  ._2f40ek0H0uloebYpv4FRdk {
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    color: #15354e;
    margin-bottom: 10px;
    display: inline-block;
    vertical-align: top;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    cursor: default;
  }
  ._3FbRmDEVea5PfNQp33MifH {
    -webkit-user-select: initial;
    -moz-user-select: initial;
    user-select: initial;
    cursor: pointer;
  }

  ._2iEZ0hNVahRWlwyvnr1uk5 {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #9fb1c1;
    margin-bottom: 25px;
  }

  ._3zqKA9I0nkOVA-xzwQIgW4 {
    width: 100%;
  }
  .e7p-GSZxKrsx1uPEVUak9 {
    margin-bottom: 8px;
  }

._2SBupAxT7TNqc_BgsruNwV {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #15354e;
  }

  ._17DDisQoYGji6byXwU-ZaG {
    display: block;
    margin-bottom: 8px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    height: 30px;
  }
  .RblHz7EqeGHgSKoEtsLDw {
    line-height: 16px;
    margin-bottom: 0;
  }
  .Z1fmNdzEAyXQtR1VMeIoa {
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    padding-right: 15px;
    position: relative;
    z-index: 2;
  }
  ._15MsTKTchmJyM8aXD4q4PR {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    color: #15354e;
    cursor: pointer;
  }
  ._2s3g3bn7dg7AYfnBb8zqZZ {
    display: flex;
    max-width: calc(100% - 23px);
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  ._1BRKfjrfQ9myX45VMbzv3f {
    margin: 0 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  ._335sg2svZpVd3CsmC97TKK {
    margin-left: 10px;
    vertical-align: middle;
  }
  ._1PeiXwvCD-_mSSQ602IN0z {
    background-color: #f4f7fc;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    display: none;
    border-radius: 5px;
    position: relative;
  }
  ._3Hddm-0byyYNMQdHrwI1sR {
    margin-left: 24px;
    position: relative;
    padding-bottom: 13px;
  }
  ._2o8rZmKG7Y0enp4LpHAM2f {
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    text-transform: uppercase;
    color: #9fb1c1;
    margin-bottom: 2px;
  }
  ._3RtWDd4H1Sgvyi1pF7lo74 {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #15354e;
  }
  ._3z5QeUX6-KRy_byxQ6B9Cd {
    margin-right: 1px;
  }
  ._3M8Gu4JFEL02xLOjDieVVj {
    position: absolute;
    top: 10px;
    right: 10px;
    display: inline-block;
    color: #08f;
    font-weight: 600;
    font-size: 12px;
  }
  .cga9rTI2JHLcwsAmFpEo9 {
    font-size: 14px;
  }
  ._3tvVF_V6tSa5unRi_GX6tx {
    margin: 0;
  }
  ._1eQ_LoEbNw5Ux0Sx53lrDQ {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #15354e;
    margin-top: 10px;
    margin-left: 25px;
    padding-right: 10px;
  }
  ._3OKC-foJAUYhSp0E1h9Lfb {
    display: flex;
    flex-direction: row;
    min-height: 18px;
    align-items: baseline;
    width: 100%;
    margin-bottom: 3px;
  }
  ._2zdmT-iCHmxuUZevOIb0FD {
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: #9fb1c1;
    min-width: 140px;
    margin-right: 25px;
  }
  .WL6LC1gk59lboqGGmaha6 {
    font-size: 14px;
    color: #15354e;
    max-width: 100%;
    font-weight: 500;
  }
  ._1aPzvpVR8SYKYI5zqejGko {
    height: 100%;
    min-height: 180px;
    width: 30%;
    padding: 15px;
    padding-right: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;
  }
  ._2sWvTbZXxRXNGXd_Ex44Pi {
    color: #15354e;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    vertical-align: top;
  }
  ._17jVL24rkQV8DYDupBoJOm {
    margin-top: 5px;
  }
  .eM_X8WBDRNNaJjs3tidNQ {
    margin-right: 10px;
  }
  ._1P_KL9RmtEm0Hz3Bz0HySN {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  ._1c5_3nDRPEO5ZQXlpaia5X {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ._67o1vdZ2Xm6t_iMWTvQHa {
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
  }
  ._3LJ4fDbIG0J_5aNiHEwuc3 {
    display: flex;
    flex-direction: column;
  }
  ._32wbxviw4jD09LXcF-pnQO {
    background-color: #fff;
    box-shadow: 0 15px 30px rgba(42, 171, 92,.15);
    border-radius: 5px;
  }
</style>