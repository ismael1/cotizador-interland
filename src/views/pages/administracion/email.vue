<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'

export default {
  page: {
    title: "Envio de Correos",
    meta: [{ name: "Envio de Correos", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Envio de Correos",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Información de Envio de Correos",
          href: "/administracion/email",
          active: true,
        },
      ],
      id: 0,
      nombre: '',
      fecha: '',
      estatus : false,
      id: 0,
      idMenu: 0,
      isSubmenu: false,
      link: '',
      icon: '',

      idU:0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',
      permisos: [],
      menuItems: [],

      mostrarLista: 0,
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },
      ],

      idEmail: 0,
      correo: '',
      contra: '',
      host: '',
      puerto: 0,

    };
  },
  created() {
    this.dataSess();

    this.getDatosEmail();
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
      this.modulosUsuario();
    },

    modulosUsuario(){
      let agregar = {}
      
      agregar = {
        id: 0,
        label: 'Módulos',
        isTitle: true
      }
      
      this.menuItems.push(agregar)
      for (let i = 0; i < this.permisos.length; i++) {
        if(this.permisos[i].modulos_isSubmenu == false && this.permisos[i].modulos_idMenu == 0){
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            link: this.permisos[i].modulos_link  
          }
          this.menuItems.push(agregar)

        }else if (this.permisos[i].modulos_isSubmenu == true) {
          let idItem =  this.permisos[i].modulos_id
          let subItem = []
          let agreg = {}

          for (let e = 0; e < this.permisos.length; e++) {
            if(this.permisos[e].modulos_idMenu == idItem){
              agreg = {
                id: this.permisos[e].modulos_id,
                label: this.permisos[e].modulos_nombre,
                link: this.permisos[e].modulos_link,
              }
              subItem.push(agreg)
            }              
          }
                    
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            isMenuCollapsed: false,
            subItems: subItem,
          }
          this.menuItems.push(agregar)
        }
      }
    },

    getDatosEmail(){

      axios({
        method: "post",
        url: `/api/v1/getDatosEmail/`,
      }).then((response) => {
        this.idEmail = response.data[0].idEmail
        this.correo = response.data[0].correo
        this.contra = response.data[0].contra
        this.host = response.data[0].host
        this.puerto = response.data[0].port
      }).catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar generar el módulo. "+error,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
      });
    },

    Save() {
      if(this.correo == '' || this.correo == null){
        Swal.fire({
          title: 'Ingresa un correo electrónico valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.contra == '' || this.contra == null){
        Swal.fire({
          title: "El campo de contraseña no puede estar vacio",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.host == '' || this.host == null){
        Swal.fire({
          title: 'El campo de Host no puede estar vacio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.puerto == 0 || this.host == null || this.host == ''){
        Swal.fire({
          title: 'El campo de Puerto no puede estar vacio ni en 0',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/datosEmail/`,
        data: {
          idEmail: this.idEmail,
          correo: this.correo,
          contra: this.contra,
          host: this.host,
          puerto: this.puerto,
          usuario: this.username,
        },
      })
        .then((response) => {
          console.log(response.data.data)
          if(response.data.data){
            Swal.fire({
              title: "Datos actualizados correctamente",
              text: "",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonText: "Cerrar",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/administracion/email";
              }
            })
          }
        }).catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar actualizar la informacion del correo electrónico. "+error,
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
            <h5 class="header-title">Información General</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="3" sm="12">
                      <b-form-group label="Correo Electrónico:" label-for="correo" description="">
                        <b-form-input id="correo" v-model="correo" type="email" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="3" sm="12">
                      <b-form-group label="Contraseña:" label-for="contra" description="">
                        <b-form-input id="contra" v-model="contra" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="3" sm="12">
                      <b-form-group label="Host:" label-for="host" description="">
                        <b-form-input id="host" v-model="host" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="3" sm="12">
                      <b-form-group label="Puerto:" label-for="puerto" description="">
                        <b-form-input id="puerto" v-model="puerto" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col  sm="4"></b-col>
                    <b-col  sm="4">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Guardar Información</b-button>
                      </div>
                    </b-col>
                    <b-col  sm="4"></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12"></b-col>
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