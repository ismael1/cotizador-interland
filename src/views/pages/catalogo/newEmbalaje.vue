<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Embalaje",
    meta: [{ name: "Nuevo Embalaje", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevo Embalaje",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Embalajes",
          href: "/catalogo/listEmbalaje",
        },
        {
          text: "Nuevo Embalaje",
          href: "/new-embalaje",
          active: true,
        },
      ],
      id: 0,
      nombre: '',
      estatus : false,
      largo: 0,
      alto: 0,
      ancho: 0,
      cantMax: 0,

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

      menuItems: [],
    };
  },
  created() {
    this.dataSess();
  },

  methods: {
    dataSess(){        
      let data = JSON.parse(localStorage.getItem('users'))
      for (let i = 0; i < data.length; i++) {
        this.idU = parseInt(data[i].id)
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
            id: parseInt(this.permisos[i].modulos_id),
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            link: this.permisos[i].modulos_link  
          }
          this.menuItems.push(agregar)

        }else if (this.permisos[i].modulos_isSubmenu == true) {
          let idItem =  parseInt(this.permisos[i].modulos_id)
          let subItem = []
          let agreg = {}

          for (let e = 0; e < this.permisos.length; e++) {
            if(this.permisos[e].modulos_idMenu == idItem){
              agreg = {
                id: parseInt(this.permisos[e].modulos_id),
                label: this.permisos[e].modulos_nombre,
                link: this.permisos[e].modulos_link,
              }
              subItem.push(agreg)
            }              
          }
                    
          agregar = {
            id: parseInt(this.permisos[i].modulos_id),
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

      if(this.largo == '' || this.largo == null){
        Swal.fire({
          title: "Ingresa un largo válido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.ancho == '' || this.ancho == null){
        Swal.fire({
          title: 'Ingresa un ancho válido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.alto == '' || this.alto == null){
        Swal.fire({
          title: 'Ingresa un alto válido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.cantMax == '' || this.cantMax == null || this.cantMax == 0){
        Swal.fire({
          title: 'Ingresa una cantidad maxima',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/addEmbalaje/`,
        data: {
          nombre: this.nombre,
          estatus: this.estatus,
          largo: this.largo,
          alto: this.alto,
          ancho: this.ancho,
          cantidadMaxima: this.cantMax,
          usuario: this.username,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        if(response.data.idEmbalaje){
          Swal.fire({
            title: "Embalaje creado correctamente",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {

              window.location.href = "/new-embalaje";
            }
          })
        }
      }).catch((error) => {
        Swal.fire({
          title: "Ocurrio un error al intentar generar el módulo. "+error,
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      });
    },
    
    validaNumero(idCampo){
      
      let valor = parseFloat(document.getElementById(idCampo).value)

      if(valor < 0){
        valor = 0
        document.getElementById(idCampo).value = 0
      }

    }
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
                      <b-form-group label="Largo(m)" label-for="largo" description="">
                        <b-form-input id="largo" v-model="largo" type="number" step=".01" placeholder="" @change="validaNumero('largo')"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Alto(m)" label-for="alto" description="">
                        <b-form-input id="alto" v-model="alto" type="number" step=".01" placeholder="" required @change="validaNumero('alto')"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Ancho(m)" label-for="ancho" description="">
                        <b-form-input id="ancho" v-model="ancho" type="number" step=".01" placeholder="" required @change="validaNumero('ancho')"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Cantidad Maxima" label-for="cantMax" description="">
                        <b-form-input id="cantMax" v-model="cantMax" type="number" placeholder="" required @change="validaNumero('cantMax')"></b-form-input>
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
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Guardar Módulo</b-button>
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