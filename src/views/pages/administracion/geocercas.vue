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
    title: "Geocercas Google",
    meta: [{ name: "Google", content: appConfig.description }],
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

      title: "Geocercas",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Detalle de Geocercas",
          href: "/",
          active: true,
        },
      ],

      estado: 'Ciudad de México',
      cp: '',
      options_estado: [],
      options_cp: [],

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

      idO: 0,
      oferta: "",
      description: "",
      delDia: "",
      rutaImg: "",
      inicio: "",
      fin: "",
      estatus: 0,
      

      /*AGREGAR VARIABLE QUE GUARDARA EL ID DEL MODULO*/
      idModulo: 33,

      /* DATOS GOOGLE LAT Y LONG */

      all_geo: [],
      lat_centro: 0.0,
      lng_centro: 0.0,

      map: null,
      marker: null,
      editing: false,
    };
  },
  created: function (){
    this.dataSess();
    this.get_oferta(1);
    //this.guardaGeocercaManual();
    //this.getGeocercas();
    this.getEstados();
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

    get_oferta(mypage) {

      let caracter = ''
      if (this.buscador == "") {
        caracter = ''
      } else {
        caracter = this.buscador
      }

      axios.get('/api/v1/list-oferta-filtro/', {
        params: {
          page: mypage,
          size: this.size,
          palabra: caracter,
          usuario: this.username
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
      this.$router.push(`/edit-oferta/${item.idOferta}/`);
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
        get_customers(1)
      }
    },

    initMap() {
      const map = new google.maps.Map(this.$el.querySelector("#map"), {
        zoom: 13,
        center: { lat: this.lat_centro, lng: this.lng_centro },
        mapTypeId: "terrain",
      });

      // Establece opciones para ocultar POIs
      const mapStyles = [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ];

      // Aplica los estilos al mapa
      map.setOptions({ styles: mapStyles });

      const interlandService = this.all_geo

      const interland = new google.maps.Polygon({
        paths: interlandService,
        strokeColor: "#2aab5b",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2aab5b",
        fillOpacity: 0.35,
      });
      // Agregar evento de clic al polígono
      interland.addListener('click', () => {
        this.handlePolygonClick();
      });
      interland.setMap(map);
    },

    getEstados(){
      this.options_estado = []
      axios.get('/api/v1/geocercas-estados/', {
        params: {
          
        }
      }).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          let est = { value: res.data.data[i], text: res.data.data[i] }
          this.options_estado.push(est)
        }
      });
      this.getCp();
    },

    getCp(){
      this.options_cp = []
      let estado = this.estado
      axios.get('/api/v1/geocercas-cp/', {
        params: {
          estado:estado,
        }
      }).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          let cp = { value: res.data.data[i], text: res.data.data[i] }
          this.options_cp.push(cp)
        }
      });
    },

    getCentro(){
      let estado = this.estado
      let cp = this.cp
      axios.get('/api/v1/geocercas-centro/', {
        params: {
          estado:estado,
          cp:cp,
        }
      }).then(res => {
        this.lat_centro = parseFloat(res.data.data[0].lat_centro)
        this.lng_centro = parseFloat(res.data.data[0].lng_centro)

        this.getGeocercas();
      });
    },

    getGeocercas(){

      let estado = this.estado
      let cp = this.cp

      axios.get('/api/v1/list-geocercas/', {
        params: {
          estado:estado,
          cp:cp,
        }
      }).then(res => {
        this.all_geo =  res.data.data
        this.initMap();
      });
    },

    handlePolygonClick() {
      if (!this.editing) {
        // Iniciar modo de edición
        this.editing = true;
        const interlandService = this.all_geo
        // Clonar el polígono para poder editarlo
        this.editingPolygon = new window.google.maps.Polygon({
          paths: interlandService,
          map: this.map,
          editable: true,
        });

        // Escuchar evento de clic fuera del polígono para finalizar la edición
        this.map.addListener('click', this.handleMapClick);
      }
    },
    handleMapClick() {
      if (this.editing) {
        // Finalizar modo de edición
        this.editing = false;

        // Remover el polígono de edición
        this.editingPolygon.setMap(null);

        // Realizar acciones de guardado y actualización aquí
        // Por ejemplo, puedes enviar los cambios a tu backend para guardarlos en la base de datos.
      }
    },
    /* EL SIGUIENTE CODIGO SE USA PARA CARGAR GEOCERCAS DE MANERA MANUAL */
    /* LOS ELEMENTOS A USAR SON LATITUD Y LONGITUD, EXTRAIDOS DE UN ARCHIVO KML, ESTE SE PUEDE DESCARGAR DE LA PAGINA DE CORREOS DE MEXICO */
    /* async guardaGeocercaManual(){

      let cp = ""
      let geo = []

      for (let i = 0; i < geo.length; i++) {
        try {
          const auth = { username: "admin", password: "123", }
          const datosGeo = { codigoPostal: cp, lat: geo[i].lat, lng: geo[i].lng, orden: i+1, estatus: 1, poligono: 1, usuarioAlta: 'admin' }
          const geocerca = await axios.post('geocercas/', datosGeo, { auth: auth });
          const resGeo = geocerca.data;
          console.log('Petición POST '+ i +':', resGeo);
        } catch (error) {
          console.error('Error en las peticiones:', error);
        }
      }
    }, */
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
                <router-link v-if="permisos_agregar == 1" to="/administracion/geocercas-new" class="button btn-dark btn-sm" style="float: left">Nueva Geocerca</router-link>
              </div>

              <!-- Search -->
              <div class="col-lg-4">
                <!-- <form> -->
                <b-input-group v-if="permisos_lectura == 1" v-for="size in ['sm']" :key="size" :size="size" class="mb-2">
                  <b-form-input placeholder="buscar..." v-model="buscador" @keyup.enter="get_customers(1)"></b-form-input>
                  <b-input-group-append>
                    <b-button size="sm" text="Button" variant="secondary" @click="get_customers(1)"><i class="fa fa-search"></i> Buscar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>

            </div>

            <template>
              <b-alert show variant="light">
                <h3>Filtros de Búsqueda</h3>
                <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estado" label-for="estado" description="">
                        <b-form-select v-model="estado" :options="options_estado" @change="getCp"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Código Postal" label-for="cp" description="">
                        <b-form-select v-model="cp" :options="options_cp" @change="getCentro"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      
                    </b-col>
                </b-row>
              </b-alert>
            </template>

            <template>
              <div>
                <div id="map" style="height: 700px"></div>
              </div>
            </template>
            
            <div class="row">
              <div v-if="permisos_lectura == 1" class="col-lg-12" style="text-align:right">
                <!-- v-show judges whether the current page number needs to display the previous or next page -->
                <b-button size="sm" v-show="lastpage" @click="get_customers(lastpage)" variant="outline-secondary">Previous page</b-button>
                <b-button size="sm" v-for="index in all" @click="get_customers(index)" v-bind:key="index" variant="outline-secondary">{{ index }}</b-button>
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
#map {
  height: 100%;
}
</style>