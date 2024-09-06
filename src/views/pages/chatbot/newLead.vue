<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";
import Multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";


export default {
  page: {
    title: "Nuevo Lead",
    meta: [{ name: "Nuevo Lead", content: appConfig.description }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevo Lead",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Leads",
          href: "/chatboot/reporte",
        },
        {
          text: "Nuevo Lead",
          href: "/chatboot/new-lead",
          active: true,
        },
      ],

      

      idU: 0,
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

      options_ejecutivos: [],
      options_ejecutivos_resp: [],
      ejecutivo: [],
      lada: '521',
      nombre:'',
      numero:'',
      mensaje:'',
      nombre_ejecutivo: '',
      numero_ejecutivo: '',
      lead:[],

    };
  },

  created() {
    this.dataSess();
    this.cargaEjecutivos();
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
    
    save() {

      if (this.ejecutivo.length == 0) {
        Swal.fire({
          title: 'Selecciona un ejecutivo de la lista.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.numero == '') {
        Swal.fire({
          title: "Ingresa el número telefonico del cliente",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (this.nombre == '') {
        Swal.fire({
          title: "Ingresa el Nombre del Cliente",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      for (let i = 0; i < this.options_ejecutivos_resp.length; i++) {
        if (this.ejecutivo.id == this.options_ejecutivos_resp[i].id) {
          
          this.nombre_ejecutivo = this.options_ejecutivos_resp[i].nombre + ' ' + this.options_ejecutivos_resp[i].apellido;
          this.numero_agente = this.options_ejecutivos_resp[i].numero_agente;
        }
      }

      let lead = {
        nombre_agente: this.nombre_ejecutivo,
        numero_agente: this.numero_agente,
        mensaje_boot: this.mensaje,
        numero_usr: this.lada + this.numero,
        nombre_usr: this.nombre,
        usuario_alta: this.username,
      };

      this.lead.push(lead);

      axios({
        method: "post",
        url: `/api/v1/chatboot-alta-lead/`,
        data: {
          datos: this.lead
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
              window.location.href = "/chatboot/new-lead";
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

    cargaEjecutivos(){

      this.options_ejecutivos = [];
      this.options_ejecutivos_resp = [];
  
      axios({
        method: "get",
        url: "/api/v1/chatboot-numeros-agentes-list/",
      }).then((response) => {
        let datos = {}
        this.options_ejecutivos_resp = response.data;
        for (let i = 0; i < response.data.length; i++) {
          datos = {name: response.data[i].nombre+' '+response.data[i].apellido+' - '+response.data[i].numero_agente, id:response.data[i].id}
          this.options_ejecutivos.push(datos)
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    addEjecutivo(newTag) {
      Swal.fire({
        title: "El ejecutivo: "+newTag+" no esta disponible, selecciona uno de la lista.",
        text: "",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return false;
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
                <h5 class="header-title">Información del Lead</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="/chatboot/reporte"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-2" nav-class="nav-tabs nav-bordered">
                <b-tab title="Datos del Lead">
                  <b-row>
                    <b-col md="4" sm="12">
                      <label>Selecciona Ejecutivo</label>
                      <multiselect v-model="ejecutivo" tag-placeholder="Selecciona un ejecutivo" placeholder="Selecciona un ejecutivo" label="name" track-by="id" :options="options_ejecutivos" :multiple="false" :taggable="true" :close-on-select="true" @tag="addEjecutivo"></multiselect>
                    </b-col>
                    <b-col md="4" sm="12">
                      <label>Número del Cliente</label>
                      <div class="input-group">
                        <select class="custom-select" sm="4" disabled v-model="lada">
                          <option value="521" selected>521</option>
                        </select>
                        <input type="text" class="form-control" v-model="numero" placeholder="Teléfono (10 digitos)">
                      </div>
                    </b-col>
                    <b-col md="4" sm="12">
                      <label>Nombre del Cliente/s</label>
                      <input type="text" class="form-control" v-model="nombre" placeholder="Nombre del Cliente">
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="12">
                      <label>Mensaje</label>
                      <b-form-textarea size="lg" placeholder="Mansaje del Boot" v-model="mensaje"></b-form-textarea>
                    </b-col>
                    <!--b-col md="3" sm="12">
                      <div class="text-center">
                        <b-button class="width-md ml-1" style="background-color: #2aab5c;" @click="generarTarifaFTL()"><b><i class="fas fa-file-alt"></i> Generar Tarifario</b></b-button>
                      </div>
                    </b-col-->
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
</style>
