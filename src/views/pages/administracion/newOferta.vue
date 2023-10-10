<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import qs from 'qs';

export default {
  page: {
    title: "Nueva Oferta",
    meta: [{ name: "Nueva Oferta", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nueva Oferta",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Ofertas",
          href: "/administracion/listOfertas",
        },
        {
          text: "Nueva Oferta",
          href: "/newOferta",
          active: true,
        },
      ],
      
      idO: 0,
      oferta: "",
      descripcion: "",
      delDia: false,
      rutaImg: "",
      inicio: "",
      fin: "",
      estatus: false,
      selectedFile: null,
      csrfToken: null,
      imgView: null,

      idU:0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',
      permisos: [],

      mostrarLista: 0,
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },

      ],
    };
  },
  created() {
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
        this.permisos = data[i].permisos;
      }
    },

    handleFileInputChange(event) {
      this.selectedFile = event.target.files[0];
      this.imgView = window.URL.createObjectURL(this.selectedFile)
    },

    generateUniqueImageName(originalName) {
      // Generar un nombre único para la imagen
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 15);
      const uniqueName = `${timestamp}_${randomString}_${originalName}`;
      return uniqueName;
    },

    getCSRF(){
      axios.get('/api/v1/getCSRF/')
      .then(response => {
        this.csrfToken = response.data.csrfToken;
        console.log(this.csrfToken)
        // Utiliza el token CSRF en tus solicitudes POST posteriores
      })
      .catch(error => {
        console.error('Error al obtener el token CSRF:', error);
      });
    },
    
    Save() {
      if(this.oferta == '' || this.oferta == null){
        Swal.fire({
          title: 'Ingresa el nombre de a Oferta',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.descripcion == '' || this.descripcion == null){
        Swal.fire({
          title: "Ingresa una descripción",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.inicio == '' || this.inicio == null){
        Swal.fire({
          title: 'Ingresa una fecha de Inicio valida.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.fin == '' || this.fin == null){
        Swal.fire({
          title: 'Ingresa una fecha final valida.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(!this.selectedFile){
        Swal.fire({
          title: 'Selecciona una imagen.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      /*const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
          const imageName = this.generateUniqueImageName(this.selectedFile.name);
          localStorage.setItem(imageName, imageData);
          console.log('Imagen guardada:', imageName);
        };
        let dt = reader.readAsDataURL(this.selectedFile);

        console.log(dt)*/
        this.getCSRF();

        const formData = new FormData();
        formData.append('image', this.selectedFile);
        // Agregar el token CSRF a la solicitud
        formData.append('csrfmiddlewaretoken', this.csrfToken);
        formData.append('oferta', this.oferta);
        formData.append('descripcion', this.descripcion);
        formData.append('delDia', this.delDia);
        formData.append('usuarioAlta', this.username);
        formData.append('inicio', this.inicio);
        formData.append('fin', this.fin);
        formData.append('estatus', this.estatus);
      axios({
        method: "post",
        url: `/api/v1/addOferta/`,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data[0])
        if(response.data[0].insert){
          Swal.fire({
            title: "Oferta creada correctamente",
            text: response.data[0].msg,
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/new-oferta";
            }
          })
        }else{
          Swal.fire({
          title: "Error"+error,
          text: response.data[0].msg + ' Error:' +error,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        }
      }).catch((error) => {
        Swal.fire({
          title: "Ocurrio un error al intentar guardar la oferta. "+error,
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      });

    },

  }, // Fin Methods
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <b-row>
      <b-container fluid>
        <b-card>
          <b-card-body>
            <b-row>
              <b-col md="4" sm="12">
                <h5 class="header-title">Información de la Oferta</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="../../administracion/listOfertas"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Oferta" label-for="oferta" description="">
                        <b-form-input id="oferta" v-model="oferta" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Descripción" label-for="descripcion" description="">
                        <b-form-input id="descripcion" v-model="descripcion" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="¿Es oferta del día?" label-for="delDia" description="">
                        <b-form-checkbox switch id="delDia" v-model="delDia">
                          <h4 style="margin: 0px;">
                            <b-badge v-if="delDia" variant="success">Es oferta del día</b-badge>
                            <b-badge v-else variant="danger">No es oferta del día</b-badge>
                          </h4>
                        </b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Fecha de Inicio de Oferta" label-for="fechaInicio" description="">
                        <b-form-input id="fechaInicio" v-model="inicio" type="date" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Fecha de Fin de Oferta" label-for="fechaFin" description="">
                        <b-form-input id="fechaFin" v-model="fin" type="date" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estatus" label-for="estatus" description="">
                        <b-form-checkbox switch id="estatus" v-model="estatus">
                          <h4 style="margin: 0px;">
                            <b-badge v-if="estatus" variant="success">Activo</b-badge>
                            <b-badge v-else variant="danger">Inactivo</b-badge>
                          </h4>
                        </b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Imagen" label-for="imagen" description="">
                        <b-form-file 
                          placeholder="Selecciona una imagen"
                          drop-placeholder="Arrastra una imagen aqui"
                          id="image"
                          ref="fileInput"
                          @change="handleFileInputChange">
                        </b-form-file>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12" style="text-align: center;">
                      <img v-if="selectedFile" :src="imgView" alt="Sin Imagen" style="width: 50%;">
                      <img v-else src="../../../assets/images/ofertas/no-image.png" alt="Sin Imagen" style="width: 50%;">
                    </b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Guardar Oferta</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
            </div>
          </b-card-body>
        </b-card>
      </b-container>
    </b-row>
  </Layout>
</template>

<style>
.nav-bordered a.active {
  border-bottom: 2px solid #00786c !important;
}

#boton {
  margin: auto;
  width: 50%;
  padding: 5px;
  border: thin solid black;
  
}
</style>