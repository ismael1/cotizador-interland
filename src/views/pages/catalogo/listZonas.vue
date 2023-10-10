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
    title: "Zonas",
    meta: [{ name: "Zonas", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {

      buscador: '',
      buscador2: '',
      opcion: 0,

      page_list: [],
      total: 0,//Total number of products
      tota2: 0,//Total number of products
      curpage: 1,//Current page
      all: 0,//Total number of pages
      all2: 0,
      lastpage: 0,//previous page
      nextpage: 0,//Next page
      lastpage2: 0,//previous page
      nextpage2: 0,//Next page
      size: 8,//How much to display per page
      size2: 8,

      title: "Zonas",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Listado de Zonas",
          href: "/",
          active: true,
        },
      ],

      all_data: [],
      all_data2: [],
      totalRows: 1,
      totalRows2: 1,
      currentPage: 1,
      currentPage2: 1,
      perPage: 10,
      perPage2: 10,
      pageOptions: [5, 10, 15, 20],
      pageOptions2: [5, 10, 15, 20],
      filter: null,
      filter2: null,
      filterOn: [],
      filterOn2: [],
      sortBy: "id",
      sortDesc: false,
      municipioHijo: "",
      llaveBusca: "",
      rechazado: "",

      fields: [
        {
          key: "idZona",
          label: "ID",
          sortable: true,
        },
        {
          key: "clasificacion",
          label: "Clasificación",
          sortable: true,
        },
        {
          key: "identificador",
          label: "Identificador",
          sortable: true,
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],

      fields2: [
        {
          key: "municipio",
          label: "Municipio",
          sortable: true,
        },
        {
          key: "colonia",
          label: "Colonia",
          sortable: true,
        },
        {
          key: "codigoPostal",
          label: "Codigo Postal",
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
      idModulo: 16,

    };
  },
  created: function () {
    this.get_customers(1);
    this.dataSess();

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
        .get('/api/v1/list-zonas-filtro/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter
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
      this.$router.push(`/edit-zona/${item.idZona}/`);
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

    mostrarZonas(item, mypage) {

      console.log(mypage)

      if(this.llaveBusca == ''){
        this.llaveBusca = item.llave
      }

      if(item.llave){
        if(this.llaveBusca != item.llave){
          this.llaveBusca = item.llave
        }
      }

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      
      axios.get('/api/v1/zonas-hijos-consulta/', {
        params: {
          page: mypage,
          size: this.size2,
          palabra: caracter,
          llave: this.llaveBusca
        }
      }).then(res => {
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

    pulsar(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_customers(1)
      }
    },

    pulsar2(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_customers(1)
      }
    },

    deleteZona(item) {

      Swal.fire({
        title: 'Eliminar Zona',
        text: "¿Estas Seguro de Eliminar esta Zona " + item.identificador + " junto con sus dependientes?",
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
            url: `/api/v1/eliminarZona/`,
            data: {
              idZona: item.idZona
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              if (response) {
                Swal.fire({
                  title: "Zona",
                  text: "Zona Eliminada Exitosamente",
                  icon: "success",
                  allowOutsideClick: false,
                  confirmButtonText: "Cerrar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/catalogo/listZonas";
                  }
                })
              } else {
                Swal.fire(
                  'Cancelado',
                  'Ocurrio un error al intentar eliminar la zona, contacta a sistemas.',
                  'error'
                )
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Swal.fire(
            'Cancelado',
            'Eliminar Registro Cancelado',
            'error'
          )
        }
      })
    },

    deleteHijo(item) {
      console.log(item)
      Swal.fire({
        title: 'Eliminar Dependiente',
        text: "¿Estas Seguro de Eliminar la colonia " + item.colonia + "</b>?",
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
            url: `/api/v1/eliminarHijo/`,
            data: {
              idZona: item.idZonasHijo
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              if (response) {
                Swal.fire({
                  title: "Zona",
                  text: "Colonia Eliminada Exitosamente",
                  icon: "success",
                  allowOutsideClick: false,
                  confirmButtonText: "Cerrar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/catalogo/listZonas";
                  }
                })
              } else {
                Swal.fire(
                  'Cancelado',
                  'Ocurrio un error al intentar eliminar la colonia, contacta a sistemas.',
                  'error'
                )
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Swal.fire(
            'Cancelado',
            'Eliminar Registro Cancelado',
            'error'
          )
        }
      })
    },


  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.all_data2.length;
    },
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
                <router-link v-if="permisos_agregar == 1" to="/new-zona" class="button btn-dark btn-sm" style="float: left">Nueva Zona</router-link>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-lg-6">
                <div class="table-responsive">
                  <!-- Search -->
                  <div class="col-lg-12">
                    <!-- <form> -->
                    <b-input-group v-if="permisos_lectura == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                      <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers(1)"></b-form-input>
                      <b-input-group-append>
                        <b-button size="sm" text="Button" variant="secondary" @click="get_customers(1)"><i class="fa fa-search"></i> Buscar</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data" :fields="fields" small bordered responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" :selectable="true">
                    <template v-slot:cell(mostrarLista)="data">
                      <div class="text-center">
                        <span class="badge badge-soft-warning" v-if="data.item.mostrarLista === 0">Inactiva</span>
                        <span class="badge badge-soft-success" v-else>Activa</span>
                      </div>
                    </template>
                    <template #cell(identificador)="row">
                      {{ row.item.identificador }} {{ row.item.claveIde }}
                    </template>
                    <template #cell(actions)="row">
                      <i v-if="permisos_lectura == 1" class="fas fa-list" @click="mostrarZonas(row.item, 1)" title="Mostrar Zonas"></i>
                      ||
                      <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editServicio(row.item)" title="Editar"></i>
                      ||
                      <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteZona(row.item)" title="Eliminar">
                      </i>
                    </template>
                  </b-table>
                  <br>
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage" @click="get_customers(lastpage)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="index in all" @click="get_customers(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
                    <b-button size="sm" v-show="nextpage" @click="get_customers(nextpage)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="table-responsive">
                  <!-- Search -->
                  <div class="col-lg-12">
                    <!-- <form> -->
                    <b-input-group v-if="permisos_lectura == 1" v-for="size2 in ['sm']" :key="size2" :size="size2" class="mb-2">
                      <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="mostrarZonas(llaveBusca,1)"></b-form-input>
                      <b-input-group-append>
                        <b-button size="sm" text="Button" variant="secondary" @click="mostrarZonas(llaveBusca,1)"><i class="fa fa-search"></i> Buscar</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data2" :fields="fields2" small bordered responsive="sm" :per-page="perPage2" :current-page="currentPage2" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter2" :filter-included-fields="filterOn2" @filtered="onFiltered2" :selectable="true">

                    <template #cell(actions)="row">
                      <!--i class="fas fa-file-pdf" @click="generatePDF(row.item)"></i-->
                      <!--i class="fas fa-edit" @click="editServicio(row.item)"></i-->
                      <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteHijo(row.item)"></i>
                    </template>
                  </b-table>
                  <br>
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage2" @click="mostrarZonas(llaveBusca, lastpage2)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="indexs in all2" @click="mostrarZonas(llaveBusca, indexs)" v-bind:key="indexs" variant="outline-secondary">{{ indexs }}</b-button>
                    <b-button size="sm" v-show="nextpage2" @click="mostrarZonas(llaveBusca, nextpage2)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>
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