<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Ajustes de Rutas",
    meta: [{ name: "Ajuste de Rutas", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {

      buscador:'',
      opcion:0,

      page_list:[],
      total: 0,//Total number of products
      curpage: 1,//Current page
      all: 0,//Total number of pages
      lastpage: 0,//previous page
      nextpage: 0,//Next page
      size: 8,//How much to display per page

      title: "Ajustes de Rutas",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Ajustes de Rutas",
          href: "/",
          active: true,
        },
      ],

      all_data: [],
      all_data2: [],
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
          key:"origen",
          label: "Origen",
          sortable: true,
        },
        {
          key:"destino",
          label: "Destino",
          sortable: true,
        },
        {
          key:"tipoEnvio",
          label: "Tipo Envio",
          sortable: true,
        },
        {
          key:"tipoUnidad",
          label: "Tipo Unidad",
          sortable: true,
        },
        {
          key:"tipoMercancia",
          label: "Tipo Carga",
          sortable: true,
        },
        {
          key:"precioKilometros",
          label: "Precio x Kilometros",
          sortable: true,
        },
        {
          key:"divisa",
          label: "Moneda",
          sortable: true,
        },        
        {
          key: "actions",
          tdClass: 'text-center',
          thClass: 'text-center'
        },
      ],
    };
  },

  created: function () {
    console.log("Iniciando ...");
    this.get_customers(1);
  },

  methods: {

    get_customers(mypage) {

      let caracter =''
      if(this.buscador==""){
        caracter =''
      }else{
        caracter =this.buscador
      }

      axios
        .get('/api/v1/list-ruta-filtro/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter
          }
        })
        .then(res => {

            // this.all_data = res.data.data;
            
            this.total=res.data.total
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
            
            // this.cambioValores()
            this.all_data.length = 0
            
            let vid = ""
            let vorigen = ""
            let vdestino = ""
            let vtipoUnidad = ""
            let vtipoMercancia = ""
            let vtipoEnvio = ""
            let vprecioKilometros = ""
            let vdivisa = ""

            for(let a=0; a<res.data.data.length; a++){
              vid = res.data.data[a].id
              vorigen = res.data.data[a].origen
              vdestino = res.data.data[a].destino
              vtipoUnidad = res.data.data[a].tipoUnidad
              vtipoMercancia = res.data.data[a].tipoMercancia
              vtipoEnvio = res.data.data[a].tipoEnvio
              vprecioKilometros = res.data.data[a].precioKilometros
              vdivisa = res.data.data[a].divisa

              //Inicio Unidad 
              if(vtipoUnidad == 1){
                vtipoUnidad = "PICK UPS"
              }else if(vtipoUnidad == 2){
                vtipoUnidad = "UNIDAD 3 1/2"
              }else if(vtipoUnidad == 3){
                vtipoUnidad = "RABON"
              }else if(vtipoUnidad == 4){
                vtipoUnidad = "CAJA 48"
              }else if(vtipoUnidad == 5){
                vtipoUnidad = "CAJA 53"
              }else if(vtipoUnidad == 7){
                vtipoUnidad = "CAJA 48"
              }else if(vtipoUnidad == 8){
                vtipoUnidad = "CAJA 53"
              }else if(vtipoUnidad == 13){
                vtipoUnidad = "TORTON"
              }
              //Fin Unidad

              //Inicio Carga
              if(vtipoMercancia == "g"){
                vtipoMercancia = "General"
              }else if(vtipoMercancia == "h"){
                vtipoMercancia = "Peligrosa"
              }else if(vtipoMercancia == "e"){
                vtipoMercancia = "Especial"
              }else if(vtipoMercancia == "r"){
                vtipoMercancia = "Refrigerada"
              }
              //Fin Carga

              //Inicio Divisa
              if(vdivisa == 1){
                vdivisa = "USD"
              }else if(vdivisa == 2){
                vdivisa = "MXN"
              }
              //Fin Divisa

              let agrega = {'id': vid, 'origen': vorigen, 'destino': vdestino, 'tipoUnidad': vtipoUnidad, 'tipoMercancia': vtipoMercancia, 'tipoEnvio': vtipoEnvio, 'precioKilometros': vprecioKilometros, 'divisa': vdivisa}
              this.all_data.push(agrega)

            }
        });
   
    },

    viewCotizacion(item) {
      // this.$router.push(`/validate-cotizacion/${item.id}/`);
    },

    editRuta(item) {
      // const idR = this.$route.params.pkRuta;
      this.$router.push(`/edit-ruta/${item.id}/`);
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
          text: "Estas Seguro de Eliminar esta Ruta?",
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
            url: `ajusteRuta/${item.id}/`,
            data: {
              estatus: 3            
              },
              auth: {
                username: "admin",
                password: "123",
              },
            })
            .then((response) => {
              if(response){
                this.get_customers(1)
              }
            })
            .catch((error) => {
              console.log(error);
            });
            //Termina AXIOS

            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Ruta Eliminado Exitosamente',
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

    generatePDF(item){ // GeneraPDF David
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

    showRejected(item){
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
                <router-link
                to="/new-ruta"
                class="button btn-dark btn-sm"
                style="float: left"
                >Nueva Ruta</router-link>
              </div>

              <!-- Search -->
              <div class="col-lg-4">
                <!-- <form> -->
                  <b-input-group
                    v-for="size in ['sm']"
                    :key="size"
                    :size="size"
                    class="mb-2"                  
                  >
                    <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers(1)"></b-form-input>
                    <b-input-group-append>
                      <b-button size="sm" text="Button" variant="secondary" @click="get_customers(1)" ><i class="fa fa-search"></i> Search</b-button>
                    </b-input-group-append>
                  </b-input-group>
              </div>

            </div>
            
            <div class="row">
              <div class="col-lg-12">
                <div class="table-responsive">

                  <b-table
                    class="table table-sm mb-0"
                    :items="all_data"
                    :fields="fields"
                    small 
                    bordered
                    responsive="sm"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                    :selectable="true"
                  >
                    <template #cell(actions)="row">
                      <!-- <i
                        class="fas fa-eye"
                        @click="viewCotizacion(row.item)"
                      ></i>
                      || -->
                       <!-- <i
                        class="fas fa-file-pdf"
                        @click="generatePDF(row.item)"
                      ></i>                      
                      || -->
                      <i
                        class="fas fa-edit"
                        @click="editRuta(row.item)"
                      ></i>
                      ||
                      <i
                        class="fas fa-trash"
                        @click="deleteCotizacion(row.item)">
                      </i>
                    </template>                    
                  </b-table>

                  <!-- Inicio Modal -->                   
                    <div>
                      <b-modal id="modalStatus"
                      hide-footer>
                        <template #modal-title>
                          Motivo de Rechazo
                        </template>
                        <div class="d-block text-center">
                          <h3>{{rechazado}}</h3>
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
              <div class="col-lg-12" style="text-align:right">              
                <!-- v-show judges whether the current page number needs to display the previous or next page -->
                <b-button size="sm" v-show="lastpage" @click="get_customers(lastpage)" variant="outline-secondary">Previous page</b-button>
                <b-button size="sm" v-for="index in all" @click="get_customers(index)" v-bind:key="index" variant="outline-secondary">{{index}}</b-button>
                <b-button size="sm" v-show="nextpage" @click="get_customers(nextpage)" variant="outline-secondary">Next page</b-button>
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