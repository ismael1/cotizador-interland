<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Rango",
    meta: [{ name: "Nuevo Rango", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevo Rango",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Módulos",
          href: "/administracion/listRangoMercancias",
        },
        {
          text: "Nuevo Rango",
          href: "/newModulo",
          active: true,
        },
      ],
      min: 0,
      max: 0,
      orden: 0,
      estatus:false,
      porcentaje: 0.0,

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

    Save() {
      if(this.min == '' || this.min == null){
        Swal.fire({
          title: 'Ingresa el valor minimo',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.max == '' || this.max == null){
        Swal.fire({
          title: "Selecciona el valor maximo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.orden == '' || this.orden == null){
        Swal.fire({
          title: 'Ingresa un valor en orden',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.porcentaje == '' || this.porcentaje == null){
        Swal.fire({
          title: 'Ingresa un valor en porcentaje',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/new-rango-mercancia/`,
        data: {
          min: this.min,
          max: this.max,
          orden: this.orden,
          estatus: this.estatus,
          usuarioAlta: this.username,
          porcentaje: this.porcentaje,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          let datos = response.data[0]
          if(datos.insert){
            Swal.fire({
              title: datos.msg,
              text: "",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonText: "Cerrar",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/administracion/new-rango-mercancia";
              }
            })
          }else{
            Swal.fire({
              title: datos.msg,
              text: "",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          }
        }).catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar generar el rango. "+error,
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
                      <b-form-group label="Minimo" label-for="minimo" description="">
                        <b-form-input id="minimo" v-model="min" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Maximo" label-for="maximo" description="">
                        <b-form-input id="maximo" v-model="max" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Porcentaje" label-for="porcentaje" description="">
                        <b-form-input id="porcentaje" v-model="porcentaje" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6" sm="12">
                      <b-form-group label="Orden" label-for="orden" description="">
                        <b-form-input id="orden" v-model="orden" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                      <b-form-group label="Estatus" label-for="isSubmenu" description="">
                        <b-form-checkbox switch id="moduloEstatus" v-model="estatus">
                          <h4>
                            <b-badge v-if="estatus" variant="success">Rango Activo</b-badge>
                            <b-badge v-else variant="danger">Rango Inactivo</b-badge>
                          </h4>
                          
                        </b-form-checkbox>  
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #2aab5c;" @click="Save"><i class="fe-save"></i> Guardar Rango</b-button>
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