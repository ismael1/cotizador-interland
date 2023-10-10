<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import Templates from '../email/templates.vue';


export default {
  page: {
    title: "Productos",
    meta: [{ name: "Productos", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader
  },

  data() {
    return {

      buscador:'', //130621
      opcion:0,

      buscador2:'', //130621
      opcion2:0,

      buscador3:'', //130621
      opcion3:0,

      buscador4:'', //130621
      opcion4:0,

      page_list:[],
      //Autonomous paging
      total: 0,//Total number of products
      total2: 0,//Total number of products
      total3: 0,//Total number of products
      total4: 0,//Total number of products
      curpage: 1,//Current page
      all: 0,//Total number of pages
      all2: 0,//Total number of pages
      all3: 0,//Total number of pages
      all4: 0,//Total number of pages
      lastpage: 0,//previous page
      lastpage2: 0,//previous page
      lastpage3: 0,//previous page
      lastpage4: 0,//previous page
      nextpage: 0,//Next page
      nextpage2: 0,//Next page
      nextpage3: 0,//Next page
      nextpage4: 0,//Next page
      size: 8,//How much to display per page
      size2: 8,//How much to display per page
      size3: 8,//How much to display per page
      size4: 8,//How much to display per page

      title: "Productos",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Producto",
          href: "/",
          active: true,
        },
      ],

      all_data: [],     
      totalRows: 1,      
      currentPage: 1,
      perPage: 10,

      all_data2: [],
      totalRows2: 1,
      currentPage2: 1,
      perPage2: 10,
      
      all_data3: [],
      totalRows3: 1,
      currentPage3: 1,
      perPage3: 10,

      all_data4: [],
      totalRows4: 1,
      currentPage4: 1,
      perPage4: 10,

      // pageOptions: [10, 25, 50, 100],
      pageOptions: [5, 10, 15, 20],
      filter: null,
      filter2: null,
      filter3: null,
      filter4: null,
      filterOn: [],
      filterOn2: [],
      filterOn3: [],
      filterOn4: [],
      sortBy: "id",
      sortDesc: false,
      resConse: "",
      fields: [
        {
          key: "id",
          label: "ids",
          sortable: true,
        },
        {
          key: "folioConsecutivo",
          label: "Folio de Cotizacion",
          sortable: true,
        },
        {
          key: "servicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "proveedor",
          label: "Proveedor",
          sortable: true,
        },
        {
          key: "checkVentas",
          label: "A Venta",
          sortable: true,
        },
        {
          key: "dateInicio",
          label: "Fecha Generacion",
          sortable: true,
        },
        {
          key: "dateFin",
          label: "Fecha de Fin",
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
          key: "porcentajeVenta",
          label: "Venta",
          sortable: true,
        },
        {
          key: "porcentajeXpress",
          label: "Express",
          sortable: true,
        },
        {
          key: "estatusCompleto",
          label: "Estatus",
          tdClass: 'text-center',
          thClass: 'text-center',
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
          key: "id",
          label: "ids",
          sortable: true,
        },
        {
          key: "folioConsecutivo",
          label: "Folio de Cotizacion",
          sortable: true,
        },
        {
          key: "servicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "proveedor",
          label: "Proveedor",
          sortable: true,
        },
        {
          key: "checkVentas",
          label: "A Venta",
          sortable: true,
        },
        {
          key: "dateInicio",
          label: "Fecha Generacion",
          sortable: true,
        },
        {
          key: "dateFin",
          label: "Fecha de Fin",
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
          key: "porcentajeVenta",
          label: "Venta",
          sortable: true,
        },
        {
          key: "porcentajeXpress",
          label: "Express",
          sortable: true,
        },
        
        {
          key: "estatusCompleto",
          label: "Estatus",
          tdClass: 'text-center',
          thClass: 'text-center',
          sortable: true,
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],

      fields3: [
        {
          key: "id",
          label: "ids",
          sortable: true,
        },
        {
          key: "folioConsecutivo",
          label: "Folio de Cotizacion",
          sortable: true,
        },
        {
          key: "servicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "proveedor",
          label: "Proveedor",
          sortable: true,
        },
        {
          key: "checkVentas",
          label: "A Venta",
          sortable: true,
        },
        {
          key: "dateInicio",
          label: "Fecha Generacion",
          sortable: true,
        },
        {
          key: "dateFin",
          label: "Fecha de Fin",
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
          key: "porcentajeVenta",
          label: "Venta",
          sortable: true,
        },
        {
          key: "porcentajeXpress",
          label: "Express",
          sortable: true,
        },
        
        {
          key: "estatusCompleto",
          label: "Estatus",
          tdClass: 'text-center',
          thClass: 'text-center',
          sortable: true,
        },
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],
      
      fields4: [
        {
          key: "id",
          label: "ids",
          sortable: true,
        },
        {
          key: "folioConsecutivo",
          label: "Folio de Cotizacion",
          sortable: true,
        },
        {
          key: "servicio",
          label: "Servicio",
          sortable: true,
        },
        {
          key: "proveedor",
          label: "Proveedor",
          sortable: true,
        },
        {
          key: "checkVentas",
          label: "A Venta",
          sortable: true,
        },
        {
          key: "dateInicio",
          label: "Fecha Generacion",
          sortable: true,
        },
        {
          key: "dateFin",
          label: "Fecha de Fin",
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
          key: "porcentajeVenta",
          label: "Venta",
          sortable: true,
        },
        {
          key: "porcentajeXpress",
          label: "Express",
          sortable: true,
        },
        
        {
          key: "estatusCompleto",
          label: "Estatus",
          tdClass: 'text-center',
          thClass: 'text-center',
          sortable: true,
        },
        {
          key: "nota",
          label: "Notas",
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
      idModulo: 4,

    };
  },

  created: function () {
    
    this.get_Servicess(1);
    this.get_Servicess2(1);
    this.get_Servicess3(1);
    this.get_Servicess4(1);

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
    
    get_Servicess(mypage) {

      // event.preventDefault();     

      let caracter =''
      if(this.buscador=="" || this.buscador.length<3){
        caracter =''
      }else{
        caracter =this.buscador
      }

      axios
        .get('/api/v1/list-services-filtro/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter
          }
        })
        .then(res => {

            this.all_data = res.data.data;
            this.total=res.data.total
            

            //Judging the previous page
            if (mypage == 1) {
              this.lastpage = 0;
            } else {
              this.lastpage = mypage - 1
            }

                         // Calculate the total number of pages Math.ceil round up
            this.all = Math.ceil(res.data.total / this.size);

            // console.log(this.all)
                         //Judge the next page
            if (mypage == this.all) {
              this.nextpage = 0
            } else {
              this.nextpage = mypage + 1
            }
        });
   
    },

    get_Servicess2(mypage) {

      // event.preventDefault();     

      let caracter =''
      if(this.buscador2=="" || this.buscador2.length<3){
        caracter =''
      }else{
        caracter = this.buscador2
      }

      axios
        .get('/api/v1/list-services-filtro-incompleto/', {
          params: {
            page: mypage,
            size: this.size2,
            palabra: caracter
          }
        })
        .then(res => {

            this.all_data2 = res.data.data;
            this.total2=res.data.total
            //Judging the previous page
            if (mypage == 1) {
              this.lastpage2 = 0;
            } else {
              this.lastpage2 = mypage - 1
            }

                         // Calculate the total number of pages Math.ceil round up
            this.all2 = Math.ceil(res.data.total / this.size2);

            // console.log(this.all)
                         //Judge the next page
            if (mypage == this.all2) {
              this.nextpage2 = 0
            } else {
              this.nextpage2 = mypage + 1
            }
        });
   
    },

    get_Servicess3(mypage) {

      // event.preventDefault();     

      let caracter =''
      if(this.buscador3=="" || this.buscador3.length<3){
        caracter =''
      }else{
        caracter = this.buscador3
      }

      axios.get('/api/v1/list-services-filtro-expirado/', {
          params: {
            page: mypage,
            size: this.size3,
            palabra: caracter
          }
      }).then(res => {

        this.all_data3 = res.data.data;
        this.total3=res.data.total
        //Judging the previous page
        if (mypage == 1) {
          this.lastpage3 = 0;
        } else {
          this.lastpage3 = mypage - 1
        }

        // Calculate the total number of pages Math.ceil round up
        this.all3 = Math.ceil(res.data.total / this.size3);

        // console.log(this.all)
        //Judge the next page
        if (mypage == this.all3) {
          this.nextpage3 = 0
        } else {
          this.nextpage3 = mypage + 1
        }
      });
    },

    get_Servicess4(mypage) {

      // event.preventDefault();     

      let caracter =''
      if(this.buscador4=="" || this.buscador4.length<3){
        caracter =''
      }else{
        caracter = this.buscador4
      }

      axios.get('/api/v1/list-services-filtro-nocontestados/', {
          params: {
            page: mypage,
            size: this.size4,
            palabra: caracter
          }
      }).then(res => {

        this.all_data4 = res.data.data;
        console.log(this.all_data4)
        this.total4=res.data.total
        //Judging the previous page
        if (mypage == 1) {
          this.lastpage4 = 0;
        } else {
          this.lastpage4 = mypage - 1
        }

        // Calculate the total number of pages Math.ceil round up
        this.all4 = Math.ceil(res.data.total / this.size4);

        // console.log(this.all)
        //Judge the next page
        if (mypage == this.all4) {
          this.nextpage4 = 0
        } else {
          this.nextpage4 = mypage + 1
        }
      });
    },


    editFromServices(item) {
      this.$router.push(`/edit-service/${item.id}/`);
    },

   deleteServices(item) {

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

            axios({
              method: "delete",
              url: `servicioVenta/${item.id}/`,
              auth: {
                username: "admin",
                password: "123",
              },
            })
            .then((response) => {
              if (response) {
                this.get_Servicess();
              }
            })
            .catch((error) => {
              console.log(error);
            });            

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

    onFiltered4(filteredItems) {
      this.totalRows4 = filteredItems.length;
      this.currentPage4 = 1;
    },

    pulsar(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_Servicess(1)
      }
    },

    pulsar2(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_Servicess2(1)
      }
    },

    pulsar3(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_Servicess3(1)
      }
    },

    pulsar4(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        get_Servicess4(1)
      }
    },

    showServices(item) {
      this.$router.push(`/show-sale/${item.id}/`);
    },

    // async busqueda(event){

    //   let caracter = (event.target.value)

    //   await axios
    //     .post('/api/v1/search-Services/', {'query': caracter})
    //     .then(response => {
    //         this.products = response.data
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // },
    /*buscaFolio(item){

      let res;
      
        axios({
        method: "post",
        url: "/api/v1/getFolioServicio/",
        data: {
          id: item,
        }
      }).then((response) => {
        if(response.data[0].folioConsecutivo){
          res = response.data[0].folioConsecutivo
        }
        
      }).catch((error) => {
        console.log(error);
      });
      return `${res}`
      
    },*/
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

    rows() {
      return this.all_data4.length;
    },
    
      
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.totalRows2 = this.items.length;
    this.totalRows3 = this.items.length;
    this.totalRows4 = this.items.length;
  },
};
</script>



<template>

<!-- <router-link
to="/show-sale"
class="button btn-dark btn-sm"
style="float: left"
>Ver Servicio Ventas</router-link> -->

  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
                <div class="col-lg-8">                
                  <router-link v-if="permisos_agregar == 1" to="/new-sale-service" class="button btn-dark btn-sm" style="float: left">Nuevo Servicio</router-link>                    
                </div>
              </div>
            <b-tabs nav-class="nav-tabs nav-bordered">
              <!-- Inicia Vigentes -->
              
              <b-tab title="Vigentes" active>
                <div class="row">

                  <div class="col-lg-8"></div>

                  <!-- Search -->
                  <div class="col-lg-4">
                    <!-- <form> -->
                      <b-input-group v-if="permisos_agregar == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                        <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_Servicess(1)"></b-form-input>
                        <b-input-group-append>
                          <b-button size="sm" text="Button" variant="secondary" @click="get_Servicess(1)" ><i class="fa fa-search"></i> Search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                  </div>

                </div>
                
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">

                      <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data" :fields="fields" small bordered responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" :selectable="true">
                        <template #cell(estatusCompleto)="row" class="text-center"> 
                          <i v-show="row.item.estatusCompleto == 0" title="Vigente" v-b-tooltip.hover="{ variant: 'success' }" class="far fa-calendar-check fa-2x" style="color: #1abc9c;"></i>
                        </template>
                        <template #cell(actions)="row"> 
                          <i v-if="permisos_lectura == 1" class="fas fa-eye" @click="showServices(row.item)"></i>
                          ||
                          <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editFromServices(row.item)"></i>
                          ||
                          <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteServices(row.item)"></i>
                        </template>
                      </b-table>

                    </div>
                  </div>
                </div>        
                  
                
                <div class="row">
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">              
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage" @click="get_Servicess(lastpage)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="index in all" @click="get_Servicess(index)" v-bind:key="index" variant="outline-secondary">{{index}}</b-button>
                    <b-button size="sm" v-show="nextpage" @click="get_Servicess(nextpage)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>

              </b-tab>
              <!-- Fin Vigentes -->

              <!-- Inicia Pendientes -->
              <b-tab title="Pendientes">

                <div class="row">

                  <div class="col-lg-8"></div>

                  <!-- Search -->
                  <div class="col-lg-4">
                    <!-- <form> -->
                      <b-input-group v-if="permisos_lectura == 1" v-for="size2 in ['sm']" :key="size2" :size="size2" class="mb-2">
                        <b-form-input placeholder="buscar..." v-model="buscador2" @keyup.enter="get_Servicess2(1)"></b-form-input>
                        <b-input-group-append>
                          <b-button size="sm" text="Button" variant="secondary" @click="get_Servicess2(1)" ><i class="fa fa-search"></i> Search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                  </div>

                </div>
                
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">

                      <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data2" :fields="fields2" small bordered responsive="sm" :per-page="perPage2" :current-page="currentPage2" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter2" :filter-included-fields="filterOn2" @filtered="onFiltered2" :selectable="true">
                        <template #cell(estatusCompleto)="row" class="text-center"> 
                          <i v-show="row.item.estatusCompleto == 3" title="Pendiente" v-b-tooltip.hover="{ variant: 'info' }" class="far fa-calendar-minus fa-2x" style="color: #17a2b8;"></i>
                        </template>
                        <template #cell(actions)="row"> 
                          <i v-if="permisos_lectura == 1" class="fas fa-eye" @click="showServices(row.item)"></i>
                          ||
                          <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editFromServices(row.item)"></i>
                          ||
                          <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteServices(row.item)"></i>
                        </template>
                      </b-table>

                    </div>
                  </div>
                </div> 
                
                <div class="row">
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">              
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage2" @click="get_Servicess2(lastpage2)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="index in all2" @click="get_Servicess2(index)" v-bind:key="index" variant="outline-secondary">{{index}}</b-button>
                    <b-button size="sm" v-show="nextpage2" @click="get_Servicess2(nextpage2)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>


              </b-tab>
              <!-- Fin Pendientes -->

              <!-- Inicia Expirados -->
              <b-tab title="Expirados">

                <div class="row">

                  <div class="col-lg-8"></div>

                  <!-- Search -->
                  <div class="col-lg-4">
                    <!-- <form> -->
                      <b-input-group v-if="permisos_lectura == 1" v-for="size3 in ['sm']" :key="size3" :size="size3" class="mb-2">
                        <b-form-input placeholder="buscar..." v-model="buscador3" @keyup.enter="get_Servicess3(1)"></b-form-input>
                        <b-input-group-append>
                          <b-button size="sm" text="Button" variant="secondary" @click="get_Servicess3(1)" ><i class="fa fa-search"></i> Search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                  </div>

                </div>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">

                      <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data3" :fields="fields3" small bordered responsive="sm" :per-page="perPage3" :current-page="currentPage3" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter3" :filter-included-fields="filterOn3" @filtered="onFiltered3" :selectable="true">
                        <template #cell(estatusCompleto)="row" class="text-center"> 
                          <i v-show="row.item.estatusCompleto == 0 " title="Expirados" v-b-tooltip.hover="{ variant: 'warning' }" class="far fa-calendar-times fa-2x" style="color: #ffc107;"></i>
                        </template>
                        <template #cell(actions)="row"> 
                          <i v-if="permisos_lectura == 1" class="fas fa-eye" @click="showServices(row.item)"></i>
                          ||
                          <i v-if="permisos_editar == 1" class="fas fa-edit" @click="editFromServices(row.item)"></i>
                          ||
                          <i v-if="permisos_eliminar == 1" class="fas fa-trash" @click="deleteServices(row.item)"></i>
                        </template>
                      </b-table>

                    </div>
                  </div>
                </div> 

                <div class="row">
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">              
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage2" @click="get_Servicess3(lastpage3)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="index in all2" @click="get_Servicess3(index)" v-bind:key="index" variant="outline-secondary">{{index}}</b-button>
                    <b-button size="sm" v-show="nextpage2" @click="get_Servicess3(nextpage3)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>

              </b-tab>
              <!-- Fin Expirados -->

              <!-- Inicia No Contestados -->
              <b-tab title="No Contestados">

                <div class="row">

                  <div class="col-lg-8"></div>

                  <!-- Search -->
                  <div class="col-lg-4">
                    <!-- <form> -->
                      <b-input-group v-if="permisos_lectura == 1" v-for="size4 in ['sm']" :key="size4" :size="size4" class="mb-2">
                        <b-form-input placeholder="buscar..." v-model="buscador4" @keyup.enter="get_Servicess4(1)"></b-form-input>
                        <b-input-group-append>
                          <b-button size="sm" text="Button" variant="secondary" @click="get_Servicess4(1)" ><i class="fa fa-search"></i> Search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                  </div>

                </div>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">

                      <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data4" :fields="fields4" small bordered responsive="sm" :per-page="perPage4" :current-page="currentPage4" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter4" :filter-included-fields="filterOn4" @filtered="onFiltered4" :selectable="true">
                        <template #cell(estatusCompleto)="row" class="text-center"> 
                          <i v-show="row.item.estatusCompleto == 4 " title="No Contestados" v-b-tooltip.hover="{ variant: 'danger' }" class="fas fa-times-circle fa-2x" style="color: #dc3545;"></i>
                        </template>                      
                      </b-table>

                    </div>
                  </div>
                </div> 

                <div class="row">
                  <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">              
                    <!-- v-show judges whether the current page number needs to display the previous or next page -->
                    <b-button size="sm" v-show="lastpage4" @click="get_Servicess4(lastpage4)" variant="outline-secondary">Previous page</b-button>
                    <b-button size="sm" v-for="index in all4" @click="get_Servicess4(index)" v-bind:key="index" variant="outline-secondary">{{index}}</b-button>
                    <b-button size="sm" v-show="nextpage4" @click="get_Servicess4(nextpage4)" variant="outline-secondary">Next page</b-button>
                  </div>
                </div>

              </b-tab>
                <!-- Fin No Contestados -->

            </b-tabs>
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