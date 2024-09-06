<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

// import { tableData } from "./data";
/**
 * Basic Tables component
 */
export default {
  page: {
    title: "Chatboot",
    meta: [{ name: "Chatboot", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {

      buscador: '',

      page_list: [],
      total: 0,//Total number of products
      curpage: 1,//Current page
      all: 0,//Total number of pages
      lastpage: 0,//previous page
      nextpage: 0,//Next page
      size: 8,//How much to display per page

      title: "Chatboot",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Listado de Unidades",
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

      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "nombre_agente",
          label: "Nombre del Agente",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "numero_agente",
          label: "Número del Agente",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "nombre_usr",
          label: "Nombre de Cliente",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "numero_usr",
          label: "Número del Cliente",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "fecha",
          label: "Fecha",
          sortable: true,
          thClass: 'text-center bg-primary text-white',
        },
        {
          key: "actions",
          thClass: 'text-center bg-primary text-white',
          tdClass: 'text-center',
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
      idModulo: 41,

      fecha_ini: '',
      fecha_fin: '',

      numeroCliente: '',
      nombreCliente: '',
      numeroAgente: '',
      nombreAgente: '',
      mensaje: '',
      fecha: '',
    };
  },
  created: function () {
    this.get_leads(1);
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
    
    get_leads(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios
        .get('/api/v1/chatboot-reporte-leads/', {
          params: {
            page: mypage,
            size: this.size,
            palabra: caracter
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

    editServicio(item) {
      // const idR = this.$route.params.pkRuta;
      this.$router.push(`/edit-unidad/${item.id}/`);
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

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    reporte(){

      if(this.fecha_ini == ''){
        Swal.fire({
          title: 'La Fecha de inicio no puede estar vacío.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.fecha_fin == '') {
        Swal.fire({
          title: 'La fecha de Fin no puede estar vacío.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      let rango = {
        fecha_ini: this.fecha_ini,
        fecha_fin: this.fecha_fin,
      };

      axios({
        method: "post",
        url: `/api/v1/chatboot-leads-rango-reporte/`,
        data: {
          datos: rango
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        let jsonData = response.data;
        // Convertir el JSON a una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(jsonData);

        // Crear un libro de trabajo y agregar la hoja de cálculo
        const workbook = XLSX.utils.book_new();
        let nomLibro = 'Leads';
        XLSX.utils.book_append_sheet(workbook, worksheet, nomLibro);

        // Generar el archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Crear un enlace para descargar el archivo
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        let nomDoc = 'Reporte de '+this.fecha_ini+' al '+this.fecha_fin+'.xlsx';
        link.setAttribute('download', nomDoc);  // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      
    },

    verMas(dato){
      console.log(dato);

      this.numeroCliente = dato.numero_usr
      this.nombreCliente = dato.nombre_usr
      this.numeroAgente = dato.numero_agente
      this.nombreAgente = dato.nombre_agente
      this.mensaje = dato.mensaje_boot
      this.mensaje = this.mensaje.trim()
      this.fecha = dato.fecha
      this.$bvModal.show("detalleLead");
      
    },

    cerrarModal(){
      this.$bvModal.hide("detalleLead");
    }

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

              <div class="col-lg-3  ">
                <router-link v-if="permisos_agregar == 1" to="/chatboot/new-lead" class="button btn-primary btn-sm" style="float: left"><i class="fas fa-plus"></i> Nuevo Lead</router-link>
              </div>

              <div class="col-lg-5">
                <div class="input-group">
                  <b-form-input type="date" class="form-control" v-model="fecha_ini"></b-form-input>
                  <b-form-input type="date" class="form-control" v-model="fecha_fin"></b-form-input>
                  <b-button class="bg-primary btn-sm"  @click="reporte()"><b><i class="fas fa-file-alt"></i> Reporte</b></b-button>
                </div>
              </div>

              <!-- Search -->
              <div class="col-lg-4">
                <!-- <form> -->
                <b-input-group v-if="permisos_lectura == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                  <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_leads(1)"></b-form-input>
                  <b-input-group-append>
                    <b-button size="sm" text="Button" variant="secondary" @click="get_leads(1)"><i class="fa fa-search"></i> Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>

            </div>
            <hr>
            <div class="row">
              <div class="col-lg-12">
                <div class="table-responsive">

                  <b-table v-if="permisos_lectura == 1" class="table table-sm mb-0" :items="all_data" :fields="fields" small bordered responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" :selectable="true">
                    <template v-slot:cell(mostrarLista)="data">
                      <div class="text-center">
                        <span class="badge badge-soft-warning" v-if="data.item.mostrarLista === 0">Inactiva</span>
                        <span class="badge badge-soft-success" v-else>Activa</span>
                      </div>
                    </template>
                    <template #cell(actions)="row">
                      <i class="fas fa-eye " @click="verMas(row.item)"></i>
                    </template>
                  </b-table>

                </div>
              </div>
            </div>
            
            <div class="row">
              <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                <!-- v-show judges whether the current page number needs to display the previous or next page -->
                <b-button size="sm" v-show="lastpage" @click="get_leads(lastpage)" variant="outline-secondary">Previous page</b-button>
                <b-button size="sm" v-for="index in all" @click="get_leads(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
                <b-button size="sm" v-show="nextpage" @click="get_leads(nextpage)" variant="outline-secondary">Next page</b-button>
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

    <!-- INICIO MODAL VER DETALLE -->


    <b-modal
      id="detalleLead"
      title="Detalle Lead"
      header-bg-variant="primary"
      :header-text-variant="'light'"
      body-bg-variant="white"
      body-text-variant="dark"
      footer-bg-variant="white"
      footer-text-variant="dark"
    >
      <b-container fluid>
        <b-row class="mb-1">
          <b-col md="4" class="text-left">
            Mensaje de: <b>{{nombreCliente}}</b><br>
            Número Telefónico: <b>{{numeroCliente}}</b><br>
          </b-col>
          <b-col md="4" class="text-center">
            <b><i class="fas fa-arrow-right text-primary" style="font-size: 20px;"></i></b>
            
          </b-col>
          <b-col md="4" class="text-right">
            Para: <b>{{nombreAgente}}</b><br>
            Número Telefónico: <b>{{numeroAgente}}</b><br>

          </b-col>
          <b-col md=12 class="text-center">
            Mensaje: <br>
            <p v-if="mensaje.trim() != ''" style="text-align: justify;"><b>{{mensaje}}</b></p>
            <p v-else>Sin mensaje</p>
            
            
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="cerrarModal"
          >
            Cerrar
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- FIN MODAL VER DETALLE -->
  </Layout>

</template>

<style>
.text-light{
  color: #f1f5f7 !important;
}
</style>