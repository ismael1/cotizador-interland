<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';

export default {
  page: {
    title: "Mi Cuenta",
    meta: [{ name: "Mi Cuenta", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Mi Cuenta",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Mi cuenta",
          href: "/miCuenta",
          active: true,
        },
      ],
      
      idUs: 0,
      nombre: '',
      apellidos: '',
      usuario: '',
      passw: '',
      telJob: '',
      telefono: '',
      email: '',
      urlImg: '',
      nombreImg: '',


      imagen: '',
      selectedFile: null,
      csrfToken: null,
      imgView: null,
      rutaImg: '',

      showPassword: false,

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
    this.getUsuario();
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

    getUsuario(){
      const idU = this.idU

      axios({
          method: "get",
          url: `/api/v1/get-usuario/${idU}/`,
      }).then(res => {
        console.log(res.data)
        this.idUs = res.data.id
        this.nombre = res.data.nombre
        this.apellidos = res.data.apellidos
        this.usuario = res.data.login
        this.passw = res.data.password
        this.telJob = res.data.telefonoJob
        this.telefono = res.data.movil
        this.email = res.data.email
        
        if(res.data.urlImg === null){
          this.urlImg = ''  
        }else{
          this.urlImg = res.data.urlImg
        }

        if(res.data.nombreImg === null){
          this.nombreImg = ''
        }else{
          this.nombreImg = res.data.nombreImg
        }

      });
    },

    handleFileInputChange(event) {
      this.urlImg = ''
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
      if(this.nombre == '' || this.nombre == null){
        Swal.fire({
          title: 'Ingresa el nombre',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.apellidos == '' || this.apellidos == null){
        Swal.fire({
          title: "Ingresa los apellidos",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      
      if(this.usuario == '' || this.usuario == null){
        Swal.fire({
          title: 'Ingresa un nombre de usuario.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.passw == '' || this.passw == null){
        Swal.fire({
          title: 'Ingresa una fecha final valida.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.telefono == '' || this.telefono == null){
        Swal.fire({
          title: 'Ingresa un telefono válido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.email == '' || this.email == null){
        Swal.fire({
          title: 'Ingresa un correo válido.',
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

        const idU = this.idUs;
        const tok = this.csrfToken;
        const formData = new FormData();

        formData.append('idUs', idU);
        formData.append('image', this.selectedFile);
        formData.append('token', tok);
        formData.append('nombre', this.nombre);
        formData.append('apellidos', this.apellidos);
        formData.append('usuario', this.usuario);
        formData.append('passw', this.passw);
        formData.append('telJob', this.telJob);
        formData.append('telefono', this.telefono);
        formData.append('email', this.email);
        formData.append('nombreImg', this.nombreImg);
        formData.append('rutaImg', this.urlImg);

        /*if(this.urlImg == ''){
          formData.append('idUs', idU);
          formData.append('image', this.selectedFile);
          formData.append('csrfmiddlewaretoken', this.csrfToken);
          formData.append('nombre', this.nombre);
          formData.append('apellidos', this.apellidos);
          formData.append('usuario', this.usuario);
          formData.append('passw', this.passw);
          formData.append('telJob', this.telJob);
          formData.append('telefono', this.telefono);
          formData.append('email', this.email);
          formData.append('nombreImg', this.nombreImg);
        }else{
          formData.append('idUs', idU);
          formData.append('csrfmiddlewaretoken', this.csrfToken);
          formData.append('nombre', this.nombre);
          formData.append('apellidos', this.apellidos);
          formData.append('usuario', this.usuario);
          formData.append('passw', this.passw);
          formData.append('telJob', this.telJob);
          formData.append('telefono', this.telefono);
          formData.append('email', this.email);
          formData.append('urlImg', this.urlImg);
          formData.append('nombreImg', this.nombreImg);
        }*/
        
      
        axios({
        method: "post",
        url: `/api/v1/editUsuario/`,
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
              window.location.href = "/miCuenta";
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

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
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
                <h5 class="header-title">Información de Usuario</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="/"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Nombre" label-for="nombre" description="">
                        <b-form-input id="nombre" v-model="nombre" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Apellidos" label-for="apellidos" description="">
                        <b-form-input id="apellidos" v-model="apellidos" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Usuario" label-for="usuario" description="">
                        <b-form-input id="usuario" v-model="usuario" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Contraseña" label-for="passw" description="">
                        <div class="input-group input-group-merge">
                          <input v-model="passw" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="c0ntr4$eña" />
                          <div class="input-group-append" data-password="false">
                            <div class="input-group-text" @click="toggleShowPassword">
                              <span class="password-eye"></span>
                            </div>
                          </div>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Telefono de trabajo" label-for="telJob" description="">
                        <b-form-input id="telJob" v-model="telJob" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Telefono Movil" label-for="telefono" description="">
                        <b-form-input id="telefono" v-model="telefono" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                      <!--b-form-group label="Estatus" label-for="estatus" description="">
                        <b-form-checkbox switch id="estatus" v-model="estatus">
                          <h4 style="margin: 0px;">
                            <b-badge v-if="estatus" variant="success">Activo</b-badge>
                            <b-badge v-else variant="danger">Inactivo</b-badge>
                          </h4>
                        </b-form-checkbox>
                      </b-form-group-->
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Correo Electrónico" label-for="correo" description="">
                        <b-form-input id="correo" v-model="email" type="text" placeholder="" required></b-form-input>
                      </b-form-group>  
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Cambiar Imagen" label-for="imagen" description="">
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
                      <img v-if="urlImg" :src="urlImg" alt="Sin Imagen" style="width: 50%;">
                      <img v-if="imgView" :src="imgView" alt="Sin Imagen" style="width: 50%;">
                      <img v-else-if="imgView == ''" src="../../../assets/images/ofertas/no-image.png" alt="Sin Imagen" style="width: 50%;">
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786c;" class="lg" @click="Save"><i class="fe-save"></i> Actualizar Información</b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
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