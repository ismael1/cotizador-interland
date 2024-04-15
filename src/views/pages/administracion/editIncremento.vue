<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Editar Incremento",
    meta: [{ name: "Editar Incremento", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Incremento",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Incrementos",
          href: "/administracion/list-incrementos",
        },
        {
          text: "Editar Incremento",
          href: "/edit-incremento",
          active: true,
        },
      ],
      idU:0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',
      permisos: [],

      id_incremento: 0,
      mercancia: '',
      porcentaje: 0.0,
      estatus:false,
      tipoPorcentaje: 'i',
      vigencia_inicio: '',
      vigencia_fin: '',
      options_tipo: [
        { value: 'i', text: 'Incremento' },
        { value: 'd', text: 'Decremento' },
      ],

      mostrarLista: 0,
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },

      ],
    };
  },
  created() {
    this.dataSess();
    this.getIncremento();
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
      if(this.mercancia == ''){
        Swal.fire({
          title: 'Ingresa la información de Mercancias',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.porcentaje == 0 || this.porcentaje == null){
        Swal.fire({
          title: "Ingresa el Porcentaje",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }


      axios({
        method: "put",
        url: `/api/v1/edit-incremento/`,
        data: {
          id_incremento: this.id_incremento,
          mercancias: this.mercancia,
          porcentaje: this.porcentaje,
          estatus: this.estatus,
          usuario: this.username,
          tipoPorcentaje: this.tipoPorcentaje,
          vigencia_inicio: this.vigencia_inicio,
          vigencia_fin: this.vigencia_fin,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)
          let datos = response.data[0]
          if(datos.update){
            Swal.fire({
              title: datos.msg,
              text: "",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonText: "Cerrar",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/administracion/list-incrementos";
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
            title: "Ocurrio un error al intentar actaulizar el porcentaje. Error: "+error,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });

    },

    getIncremento(){
      const idI = this.$route.params.pkIncremento;

      axios({
          method: "get",
          url: `/api/v1/get-incremento/${idI}/`,
      }).then(res => {
        console.log(res.data)
        /*this.idO = res.data.idOferta
        this.oferta = res.data.oferta
        this.descripcion = res.data.descripcion
        this.delDia = res.data.delDia
        this.rutaImg = res.data.rutaImg
        this.nombreImg = res.data.nombreImg*/
        this.id_incremento = res.data.id_incremento
        this.mercancia = res.data.mercancia
        this.porcentaje = res.data.porcentaje
        this.tipoPorcentaje = res.data.tipo
        this.vigencia_inicio = res.data.vigencia_inicio
        this.vigencia_fin = res.data.vigencia_fin
        if(parseInt(res.data.estatus) > 0){
          this.estatus = true
        }
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
            <h5 class="header-title">Información de Incrementos</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Mercancias" label-for="mercancias" description="">
                        <b-form-input id="mercancias" v-model="mercancia" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Porcentaje" label-for="porcentaje" description="">
                        <b-form-input id="porcentaje" v-model="porcentaje" type="text" placeholder=""></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
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
                    <b-col md="4" sm="12">
                      <b-form-group label="Tipo de Porcentaje" label-for="isSubmenu" description="">
                        <b-form-select v-model="tipoPorcentaje" :options="options_tipo"></b-form-select>  
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Inicio de Vigencia" label-for="vigencia_inicio" description="">
                        <b-form-input v-model="vigencia_inicio" type="datetime-local"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Fin de Vigencia" label-for="vigencia_fin" description="">
                        <b-form-input v-model="vigencia_fin" type="datetime-local"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        
                      </div>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #2aab5c;" @click="Save"><i class="fe-save"></i> Guardar Rango</b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        
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