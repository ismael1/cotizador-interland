<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";
import Multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";


export default {
  page: {
    title: "Nueva Ejecutivo",
    meta: [{ name: "Nuevo Ejecutivo", content: appConfig.description }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevo Ejecutivo",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Ejecutivos",
          href: "/chatboot/numeros-agentes",
        },
        {
          text: "Nuevo Ejecutivo",
          href: "/chatboot/new-ejecutivo",
          active: true,
        },
      ],

      nombre: '',
      apellido: '',
      numero: '',
      ladas: [{'code':'MX','clave':'521'}],
      lada: '521',
      options_servicios:[{name:'Terrestre Nacional', id:1},
                        {name:'Terrestre CENAM', id:2},
                        {name:'Terrestre NOAM', id:3},
                        {name:'Marítimo y Áereo', id:4},
                        {name:'Almacén y Seguros', id:5},
                      ],
      servicio: [],
      es_gerente: false,

      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

      fields_table: [],
      items_table: [],

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
      }
    },

    addServicio (newTag) {
      
      Swal.fire({
        title: "El servicio: "+newTag+" no esta disponible, selecciona uno de la lista.",
        text: "",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return false;
    },

    save(){
      if(this.nombre == ''){
        Swal.fire({
          title: 'El nombre no puede estar vacío.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if(this.apellido == ''){
        Swal.fire({
          title: 'El apellido no puede estar vacío.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.numero == '') {
        Swal.fire({
          title: 'El numero no puede estar vacío.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.servicio.length == 0) {
        Swal.fire({
          title: 'Selecciona un servicio de la lista.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      let ejecutivo = {
        nombre: this.nombre,
        apellido: this.apellido,
        numero_agente: this.lada + this.numero,
        servicio: this.servicio.id,
        es_gerente:this.es_gerente,
        usuario_alta: this.username,
      };

      axios({
        method: "post",
        url: `/api/v1/chatboot-alta-numeros-agentes/`,
        data: {
          datos: ejecutivo
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)

        if(response.data.insert){
          Swal.fire({
            title: response.data.msg,
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/chatboot/new-ejecutivo";
            }
          })
        }else{
          Swal.fire({
            title: response.data.msg,
            text: "",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
        
      })
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
                <h5 class="header-title">Información del Ejecutivo</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="/chatboot/numeros-agentes"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-2" nav-class="nav-tabs nav-bordered">
                <b-tab title="Datos del Ejecutivo">
                  <b-row>
                    <b-col md="6" sm="12">
                      <label>Nombre</label>
                      <b-form-input
                        v-model="nombre"
                        type="text"
                        placeholder="Nombre del Ejecutivo"
                        required
                      ></b-form-input>
                    </b-col>
                    <b-col md="6" sm="12">
                      <label>Apellidos</label>
                      <b-form-input
                        v-model="apellido"
                        type="text"
                        placeholder="Apellido del Ejecutivo"
                        required
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <br>
                  <b-row>
                    <b-col md="4" sm="12">
                      <label>Número de Teléfono</label>
                      <div class="input-group">
                        <select class="custom-select" sm="4" disabled v-model="lada">
                          <option value="521" selected>521</option>
                        </select>
                        <input type="text" class="form-control" v-model="numero" placeholder="Teléfono (10 digitos)">
                      </div>
                      
                    </b-col>
                    <b-col md="4">
                        <label><b>Servicio</b></label>
                        <multiselect v-model="servicio" tag-placeholder="Selecciona un servicio" placeholder="Selecciona un servicio" label="name" track-by="id" :options="options_servicios" :multiple="false" :taggable="true" :close-on-select="true" @tag="addServicio">
                        
                      </multiselect>
                      </b-col>
                      <b-col md="4">
                        <div :style="'text-align: center;'">
                          <label><b>¿Es Gerente?</b></label>
                          <b-form-checkbox switch v-model="es_gerente">
                              <b-badge variant="success" v-if="es_gerente">Activo</b-badge>
                              <b-badge variant="warning" v-else>Inactivo</b-badge>
                          </b-form-checkbox>
                        </div>
                      </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="12">
                      <div :style="'text-align: center;'">
                        <label><b>&nbsp;</b></label>
                        <div class="text-center">
                          <b-button class="bg-primary btn-sm"  @click="save()"><b><i class="fas fa-file-alt"></i> Guardar</b></b-button>
                        </div>
                      </div>
                      
                    </b-col>
                    <b-col md="12">
                      
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

body .segundo-input-istyle-input {
    font-weight: 500;
    padding: 0 10px 0 45px;
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid rgba(0, 0, 0, 0);
    color: #15354e;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-shadow: none;
    outline: 0;
    transition: all 0.2s;
    }

    body .segundo-input-istyle-input:focus {
    text-overflow: unset;
    padding-right: 0;
    box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
    transition: all 0.2s;
    z-index: 1;
    }

    body .segundo-input-istyle-input::-moz-placeholder {
    color: #a0b1be;
    letter-spacing: 0.02em;
    font-weight: 500;
    }

    body .segundo-input-istyle-input::placeholder {
    color: #a0b1be;
    letter-spacing: 0.02em;
    font-weight: 500;
    }
</style>
