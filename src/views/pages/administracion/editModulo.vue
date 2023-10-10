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
                        <b-form-checkbox v-if="isSubmenu && checkboxIsLoaded" checked="true" switch v-bind:id="id+'-moduloSubmenu'" @change="verSubmenus()" v-bind:ref="id+'modulo'">
                          <h4><b-badge variant="success">Submodulos Activos</b-badge></h4>
                        </b-form-checkbox>
                        <b-form-checkbox v-else switch v-bind:id="id+'-moduloSubmenu'" @change="verSubmenus()" v-bind:ref="id+'modulo'">
                          <h4><b-badge variant="danger">Submodulos Inactivos</b-badge></h4>
                        </b-form-checkbox>
                      </b-form-group>
                      <b-col v-if="muestraModulos" md="12">
                        <label for="modulos" class="d-block" >Módulos:</label>
                        <div class="scroll">
                          <div v-for="mod in all_modulos"  >
                            <b-form-checkbox v-if="mod.idMenu == idModuloActual" checked="true" switch @change="agregaSubmenu(mod.id)" v-bind:id="mod.id+'-modulo'">
                              <h4><b-badge variant="success">{{ mod.nombre }}</b-badge></h4>
                            </b-form-checkbox>
                            <b-form-checkbox v-else switch @change="agregaSubmenu(mod.id)" v-bind:id="mod.id+'-modulo'">
                              <h4><b-badge variant="danger">{{ mod.nombre }}</b-badge></h4>
                            </b-form-checkbox>
                        
                          </div>
                        </div>
                      </b-col>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estatus" label-for="isSubmenu" description="">
                        <b-form-checkbox v-if="estatus == 1" checked="true" switch v-bind:id="id+'-moduloEstatus'">
                          <h4><b-badge variant="success">Modulo Activo</b-badge></h4>
                        </b-form-checkbox>
                        <b-form-checkbox v-else switch v-bind:id="id+'-moduloEstatus'">
                          <h4><b-badge variant="danger">Modulo Inactivo</b-badge></h4>
                        </b-form-checkbox>
                      </b-form-group>
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
    title: "Editar Módulo",
    meta: [{ name: "Editar Módulo", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Módulo",
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
          text: "Editar Módulo",
          href: "/editModulo",
          active: true,
        },
      ],
      id: 0,
      nombre: '',
      fecha: '',
      estatus : 0,
      id: 0,
      idMenu: 0,
      isSubmenu: false,
      link: '',
      icon: '',

      mostrarLista: 0,
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },

      ],
      muestraModulos: false,
      all_modulos: [],
      idModuloActual: this.$route.params.pkModulo,

      checkboxIsLoaded: false,
    };
  },
  mounted(){
    axios.get('/api/v1/lista-modulo/', { })
          .then(res => {
            this.all_modulos = res.data
            for (let i = 0; i < this.all_modulos.length; i++) {
              if(this.all_modulos[i].isSubmenu === true){

                this.$nextTick(() => {
                  this.checkboxIsLoaded = true
                  const check = document.getElementById(this.all_modulos[i].id + '-moduloSubmenu');
                  check.checked = true


                  if(check.checked){
                    this.muestraModulos = true
                    this.isSubmenu = true
                    
                  }else{
                    this.muestraModulos = false
                    this.isSubmenu = false
                  }

                });
              }
              
            }
          }
        );
    
    /*this.all_modulos.forEach((mod) => {
      const comprobar = this.$refs.checkboxes.find((ref) => ref.id === `${mod.id}moduloSubmenu`);
      console.log(comprobar)
      if (comprobar) {
        mod.isSubmenu = comprobar.checked;
        this.verSubmenus();
      }
    });*/
  },
  created() {
    
    this.getModulo()
  },
  methods: {

    getModulo(){
      
      const idS = this.$route.params.pkModulo;

      axios({
          method: "get",
          url: `/api/v1/infoModulo/${idS}/`,
      })
      .then((response) => {
        this.nombre = response.data[0].nombre
        this.id = response.data[0].id
        this.fecha = response.data[0].dateCreate
        this.estatus = response.data[0].estatus
        this.idMenu = response.data[0].idMenu
        this.isSubmenu = response.data[0].isSubmenu
        this.link = response.data[0].link
        this.icon = response.data[0].icon

      })
      .catch((error) => {
          console.log(error);
      });

    },

    Save() {
      if(this.name == '' || this.name == null){
        Swal.fire({
          title: 'Ingresa el nombre de la Unidad',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.code_name == '' || this.code_name == null){
        Swal.fire({
          title: "Ingresa la clave de nombre",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if(this.description == '' || this.description == null){
        Swal.fire({
          title: 'Ingresa la descripción de la unidad',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.peso_bruto_total == 0 || this.peso_bruto_total == null){
        Swal.fire({
          title: 'Ingresa el peso bruto total',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.capaciadad_vol == 0 || this.capaciadad_vol == null){
        Swal.fire({
          title: 'Ingresa la capacidad de volumen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      axios({
        method: "put",
        url: `/api/v1/catalogo-updateUnidad/`,
        data: {
          code: this.code,
          code_name: this.code_name,
          description: this.description,
          high: this.high,
          id: this.id,
          long: this.long,
          modalidad: this.modalidad,
          mostrarLista: this.mostrarLista,
          name: this.name,
          order_cot: this.order_cot,
          orderg: this.orderg,
          orderp: this.orderp,
          peso_bruto_carga: this.peso_bruto_carga,
          peso_bruto_total: this.peso_bruto_total,
          width: this.width,
          capacidad_vol: this.capaciadad_vol,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          console.log(response)
          /*Swal.fire({
            title: "Unidad Actualizada",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/catalogo/listServicioCotizacion";
            }
          })*/
        })
        .catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar actualizar el servicio. "+error,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });

    },

    verSubmenus(){
      
      let id = this.$route.params.pkModulo;

      let comprobar = document.getElementById(id + '-moduloSubmenu').checked

      console.log(comprobar)

      if(comprobar){
        this.muestraModulos = true
        this.isSubmenu = true
        
      }else{
        this.muestraModulos = false
        this.isSubmenu = false
      }
      console.log(comprobar)
    },

    agregaSubmenu(idModuloSelect){
      const idM = this.$route.params.pkModulo;
      const idMS = idModuloSelect

      console.log(idM, idMS)
    },

    getModulos(){
      
        setTimeout('',7000);
    },

  }, // Fin Methods
  
};
</script>
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

.vr {
  border-right: 2px solid rgba(152, 166, 173, 0.2) !important
}

.scroll {
  position: relative;
  height: 150px;
  overflow-y: scroll;
  border: 1px solid #00786c;
  padding: 20px;
}
</style>

</style>