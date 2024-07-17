<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
/**
 * Basic Tables component
 */
export default {
  page: {
    title: "Nueva Geocercas Google",
    meta: [{ name: "Nueva Geocerca Google", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {

      title: "Nueva Geocerca",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Nueva Geocerca",
          href: "/",
          active: true,
        },
      ],

      rechazado: "",

      estado: 'Ciudad de México',
      cp: '',
      options_estado: [],
      options_cp: [],

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

      idO: 0,
      oferta: "",
      description: "",
      delDia: "",
      rutaImg: "",
      inicio: "",
      fin: "",
      estatus: 0,
      km_redonda: 2,
      km_redonda_min: 2,
      km_redonda_max: 30,


      /*AGREGAR VARIABLE QUE GUARDARA EL ID DEL MODULO*/
      idModulo: 33,

      /* DATOS GOOGLE LAT Y LONG */

      all_geo: [],
      all_geo_resp: [],
      lat_centro: 0.0,
      lng_centro: 0.0,
      map: null,
      markers: [],
      addingMarker: false,
      geocoder: null,
      center: null,
      compara_cp: [],
      data_content: [],
      tipoGeocerca: 1,
      options_geocerca: [
        { value: 1, text: 'Comercial' },
        { value: 2, text: 'No Comercial' },
        { value: 3, text: 'Peligrosa' },
      ]
    };
  },
  created: function () {
    this.dataSess();
    //this.guardaGeocercaManual();
    //this.getGeocercas();
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

    getEstados() {
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

    getCp() {
      this.options_cp = []
      let estado = this.estado
      axios.get('/api/v1/geocercas-cp/', {
        params: {
          estado: estado,
        }
      }).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          let cp = { value: res.data.data[i], text: res.data.data[i] }
          this.options_cp.push(cp)
        }
      });
    },


    /* EL SIGUIENTE CODIGO SE USA PARA CARGAR GEOCERCAS DE MANERA MANUAL */
    /* LOS ELEMENTOS A USAR SON LATITUD Y LONGITUD, EXTRAIDOS DE UN ARCHIVO KML, ESTE SE PUEDE DESCARGAR DE LA PAGINA DE CORREOS DE MEXICO */
    /*async guardaGeocercaManual(){

      let cp = ""
      let geo = []

      for (let i = 0; i < geo.length; i++) {
        try {
          const auth = { username: "admin", password: "123", }
          const datosGeo = { codigoPostal: cp, lat: geo[i].lat, lng: geo[i].lng, orden: i+1, estatus: 1, poligono: 1, usuarioAlta: 'admin', estado: 'Chiapas' }
          const geocerca = await axios.post('geocercas/', datosGeo, { auth: auth });
          const resGeo = geocerca.data;
          console.log('Petición POST '+ i +':', resGeo);
        } catch (error) {
          console.error('Error en las peticiones:', error);
        }
      }
    },*/

    initMap() {
      const mapOptions = {
        center: { lat: 19.4326, lng: -99.1332 }, // Cambia a tus coordenadas
        zoom: 10,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          // Agrega más estilos de mapa según tus necesidades
        ],
      };

      // Crea el mapa
      this.map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      // Agrega el evento click para agregar marcadores
      this.map.addListener('click', (event) => {
        if (this.markers.length == 0) {
          this.addMarker(event.latLng);
        }
      });

      // Agrega el evento click para eliminar marcadores al dar doble clic
      this.map.addListener('click', (event) => {
        this.removeMarker(event.latLng);
      });
    },

    addMarker(location) {
      const marker = new window.google.maps.Marker({
        position: location,
        map: this.map,
      });

      // Agrega el marcador a la lista de marcadores

      this.markers.push(marker);

      // Agrega el evento click para eliminar el marcador al dar doble clic
      marker.addListener('click', () => {
        this.removeMarker(marker);
      });

      // Obtén las coordenadas del marcador
      const lat = marker.getPosition().lat();
      const lng = marker.getPosition().lng();

      let dato = { "orden": this.all_geo.length + 1, "poligono": 1, "lat": lat, "lng": lng }

      this.all_geo.push(dato)

    },

    removeMarker(marker) {
      const index = this.markers.indexOf(marker);
      if (index !== -1) {
        marker.setMap(null); // Elimina el marcador del mapa
        this.markers.splice(index, 1); // Elimina el marcador de la lista
      }

      if (index !== -1) {
        const lat = marker.getPosition().lat();
        const lng = marker.getPosition().lng();

        for (let i = 0; i < this.all_geo.length; i++) {
          if (this.all_geo[i].lat != lat) {
            let dato = { 'lat': this.all_geo[i].lat, 'lng': this.all_geo[i].lng, 'orden': this.all_geo_resp.length + 1, 'poligono': this.all_geo[i].poligono }

            this.all_geo_resp.push(dato)
          }
        }
        this.all_geo = this.all_geo_resp
        console.log(this.all_geo)
      }

    },

    async getCentroLatLng() {
      const geocoder = new window.google.maps.Geocoder();
      const address = this.estado + ', ' + this.cp;

      try {
        const results = await new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
              resolve(results);
            } else {
              reject(new Error('No se pudo convertir la dirección.'));
            }
          });
        });

        if (results.length > 0) {
          const location = results[0].geometry.location;
          //this.latLng = { lat: location.lat(), lng: location.lng() };
          this.lat_centro = location.lat()
          this.lng_centro = location.lng()

        } else {
          this.latLng = null;
        }
      } catch (error) {
        console.error('Error al convertir la dirección:', error);
        this.latLng = null;
      }
    },

    async Save() {

      if (this.all_geo.length > 0) {

        if (this.tipoGeocerca == 0) {
          Swal.fire({
            title: "Tipo de Zona.",
            text: "Debes seleccionar el tipo de Zona.",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        Swal.fire({
          title: 'Procesando Geocercas...',
          html: '<div class="loader"></div>',
          showConfirmButton: false, // Oculta el botón de confirmación
          showCancelButton: false,
          allowOutsideClick: false, // Evita cerrar la modal al hacer clic fuera de ella
        });

        let lat = 0.0
        let lng = 0.0
        let direccion = ''
        let pais = ''
        let estado = ''
        let ciudad = ''
        let cp = ''

        this.geocoder = new window.google.maps.Geocoder();

        for (let i = 0; i < this.all_geo.length; i++) {
          lat = this.all_geo[i].lat
          lng = this.all_geo[i].lng

          this.center = { 'lat': lat, 'lng': lng }

          const results = await this.geocoder.geocode({ location: this.center }, (results, status) => {
            this.data_content.push(results[0])
          });
        }

        for (let i = 0; i < this.data_content.length; i++) {

          const lastItem = this.data_content[i].address_components[this.data_content[i].address_components.length - 1];
          this.data_content[i].address_components.pop(); // Extrae el último elemento del array
          this.compara_cp.push(lastItem.long_name)
        }

        const countMap = {};
        this.compara_cp.forEach(value => {
          if (countMap[value]) {
            countMap[value]++;
          } else {
            countMap[value] = 1;
          }
        });

        const repeatedValues = [];
        for (const value in countMap) {
          if (countMap[value] > 1) {
            repeatedValues.push(value);
          }
        }

        let cp_gen = repeatedValues[0]

        for (let i = 0; i < this.data_content.length; i++) {
          for (let j = 0; j < this.data_content[i].address_components.length; j++) {
            for (let k = 0; k < this.data_content[i].address_components[j].types.length; k++) {
              const element = this.data_content[i].address_components[j].types[k];

              if (element == 'country') {
                pais = this.data_content[i].address_components[j].long_name
                pais = pais.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
              }

              if (element == 'administrative_area_level_1') {
                estado = this.data_content[i].address_components[j].long_name
                estado = estado.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
              }

              if (element == 'locality') {
                ciudad = this.data_content[i].address_components[j].long_name
                ciudad = ciudad.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
              }

              if (element == 'postal_code') {
                cp = this.data_content[i].address_components[j].long_name
              }

            }

          }

        }

        if (cp == '') {
          let cadenas = this.data_content[0].formatted_address
          let posCadena = 0;
          let procesaCP = "";
          let cpEncontrado = "";
          cadenas = cadenas.split(", ").map(elemento => elemento.trim());
          if (cadenas.some(cadena => cadena.includes(ciudad))) {
            posCadena = cadenas.findIndex(cadena => cadena.includes(ciudad))
          }

          procesaCP = cadenas[posCadena];
          procesaCP = procesaCP.split(" ");

          cpEncontrado = procesaCP[0];
          cp_gen = cpEncontrado;

        }

        cp_gen = cp_gen.slice(0, 5);
        this.estado = estado + ', ' + ciudad
        this.cp = cp_gen
        await this.getCentroLatLng()

        let cont = 0
        let dato = {}

        for (let i = 0; i < this.all_geo.length; i++) {

          try {
            cont++
            dato = { codigoPostal: cp_gen, lat: this.all_geo[i].lat, 'lng': this.all_geo[i].lng, orden: cont, estatus: 1, poligono: 1, usuarioAlta: 'admin', pais: pais, ciudad: ciudad, estado: estado, lat_centro: this.all_geo[i].lat, lng_centro: this.all_geo[i].lng, estatus_geocerca: this.tipoGeocerca, kilometros_redonda: this.km_redonda}
            const auth = { username: "admin", password: "123", }
            const geocerca = await axios.post('geocercas/', dato, { auth: auth });
            const resGeo = geocerca.data;

            Swal.close();

            const alertaExito = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });

            alertaExito.fire({
              title: "Crear Geocerca",
              text: "Geocerca creada con Exito",
              icon: "warning",
              showCancelButton: false,
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              } 
            });

          } catch (error) {
            console.error('Error en las peticiones:', error);
          }
        }

        
      } else {
        Swal.fire({
          title: "Debe de haber 1 marcador en el mapa.",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

    },

    async getAddressFromLatLng() {
      try {
        const results = await this.geocodeLocation(this.center);
        if (results.length > 0) {
          this.address = results[0].formatted_address;
        } else {
          this.address = 'No se pudo obtener la dirección.';
        }
      } catch (error) {
        console.error('Error al obtener la dirección:', error);
        this.address = 'Error al obtener la dirección.';
      }
    },

    activa_map(){

      axios.get('/api/v1/extraer-info-gmaps/', {
        params: {
          estado: '',
        }
      }).then(res => {
        console.log(res.data)
      });
    },

  },
  computed: {

  },
  mounted() {
    this.initMap();
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
              <b-button @click="activa_map">mapa</b-button>
            </div>

            <template>
              <b-alert show variant="light">
                <b-row>
                  <b-col md="4">
                    <h3>Selecciona la Geocerca</h3>
                  </b-col>
                  <b-col md="4"> </b-col>
                  <b-col md="4">
                    <b-button href="/administracion/geocercas" class="btn btn-sm" style="background-color: #2aab5c;"><i
                        class="fe-map-pin"></i> Regresar al Listado</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4" sm="12">
                    <p style="text-align: justify;">
                      En el mapa, selecciona un punto de partida y da clic sobre de ese punto para poder colocar un
                      marcador, una vez agregados todos los marcadores para tu geocerca, da clic en el boton Guardar
                      Geocerca.
                    </p>
                  </b-col>
                  <b-col md="4" sm="12">
                    <b-form-group label="Selecciona el tipo de Zona" label-for="tipoGeocerca" description="">
                      <b-form-select v-model="tipoGeocerca" :options="options_geocerca"></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md="4" sm="12">
                    <b-form-group label="Selecciona los Kilometros a la Redonda" label-for="tipoGeocerca" description="">
                      <b-form-input id="km_redonda" v-model="km_redonda" type="range" :min="km_redonda_min" :max="km_redonda_max"></b-form-input>
                      <b>{{ km_redonda }} kilometros a la redonda</b>
                    </b-form-group>
                  </b-col>
                  <!--b-col md="4" sm="12">
                      
                    </b-col-->
                </b-row>
              </b-alert>
            </template>

            <template>
              <b-row>
                <b-col md="12">
                  <div>
                    <div id="map" style="height: 700px"></div>
                  </div>
                </b-col>
              </b-row>
              <br>
              <b-row>
                <b-col md="4">

                </b-col>
                <b-col md="4">
                  <div style="text-align:center">
                    <b-button id="boton" style="background-color: #2aab5c;" class="lg" @click="Save"><i
                        class="fe-map-pin"></i> Guardar Geocerca</b-button>
                  </div>
                </b-col>
                <b-col md="4">

                </b-col>
              </b-row>
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

<style>#map {
  height: 100%;
}</style>