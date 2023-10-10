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
    title: "Nuevo Módulo",
    meta: [{ name: "Nuevo Módulo", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevo Módulo",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Módulos",
          href: "/administracion/listModulos",
        },
        {
          text: "Nuevo Módulo",
          href: "/newModulo",
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

    Save() {
      if(this.nombre == '' || this.nombre == null){
        Swal.fire({
          title: 'Ingresa el nombre del Módulo',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.icon == '' || this.icon == null){
        Swal.fire({
          title: "Selecciona el icono del módulo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.link == '' || this.link == null){
        Swal.fire({
          title: 'Ingresa un url válido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/addModulo/`,
        data: {
          nombre: this.nombre,
          icon: this.icon,
          link: this.link,
          estatus: this.estatus,
          isSubmenu: this.isSubmenu,
          usuario: this.username,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          if(response.data.id){
            Swal.fire({
              title: "Módulo creado correctamente",
              text: "",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonText: "Cerrar",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/new-modulo";
              }
            })
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar generar el módulo. "+error,
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
            <h5 class="header-title">Información del Módulo</h5>
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
                      <b-form-group label="Icono" label-for="icon" description="">
                        <b-form-input id="icon" v-model="icon" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="URL" label-for="link" description="">
                        <b-form-input id="link" v-model="link" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Tiene Submenú" label-for="isSubmenu" description="">
                        <b-form-checkbox switch id="moduloIsSubmenu" v-model="isSubmenu">
                          <h4>
                            <b-badge v-if="isSubmenu" variant="success">Tiene Submenú</b-badge>
                            <b-badge v-else variant="danger">Tiene Submenú</b-badge>
                          </h4>
                        </b-form-checkbox>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estatus" label-for="isSubmenu" description="">
                        <b-form-checkbox switch id="moduloEstatus" v-model="estatus">
                          <h4>
                            <b-badge v-if="estatus" variant="success">Modulo Activo</b-badge>
                            <b-badge v-else variant="danger">Modulo Inactivo</b-badge>
                          </h4>
                          
                        </b-form-checkbox>  
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Guardar Módulo</b-button>
                        </div>
                    </b-col>
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