<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

/**
 * Basic Tables component
 */
//agregado 260621
import ItemTemplateProSer from '@/components/ItemTemplateSearchProSer'
import ItemTemplateUnidad from '@/components/ItemTemplateSearchUnidad'

export default {
  page: {
    title: "Nuevos Terminos",
    meta: [{ name: "newTermino", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nuevos Terminos",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Términos",
          href: "/catalogo/listUnidad",
        },
        {
          text: "Nueva Término",
          href: "/catalogo/newTermino",
          active: true,
        },
      ],

      id: 0,
       
      mostrarListas: [
        { value: LTL, text: "LTL" },
        { value: FTL, text: "FTL" },
        { value: FCL, text: "FCL" },

      ],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

      idU: 0,
      emailU: "",
      nombreU: "",
      username: "",
      tokenU: "",
      puestoU: "",
      admin: false,
      permisos: [],
      menuItems: [],

    };
  },

  created() {
    this.getId();
  },

  methods: {

    dataSess() {
      let data = JSON.parse(localStorage.getItem("users"));
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

    modulosUsuario() {
      let agregar = {};

      agregar = {
        id: 0,
        label: "Módulos",
        isTitle: true,
      };

      this.menuItems.push(agregar);
      for (let i = 0; i < this.permisos.length; i++) {
        if (
          this.permisos[i].modulos_isSubmenu == false &&
          this.permisos[i].modulos_idMenu == 0
        ) {
          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            link: this.permisos[i].modulos_link,
          };
          this.menuItems.push(agregar);
        } else if (this.permisos[i].modulos_isSubmenu == true) {
          let idItem = this.permisos[i].modulos_id;
          let subItem = [];
          let agreg = {};

          for (let e = 0; e < this.permisos.length; e++) {
            if (this.permisos[e].modulos_idMenu == idItem) {
              agreg = {
                id: this.permisos[e].modulos_id,
                label: this.permisos[e].modulos_nombre,
                link: this.permisos[e].modulos_link,
              };
              subItem.push(agreg);
            }
          }

          agregar = {
            id: this.permisos[i].modulos_id,
            label: this.permisos[i].modulos_nombre,
            icon: this.permisos[i].modulos_icon,
            isMenuCollapsed: false,
            subItems: subItem,
          };
          this.menuItems.push(agregar);
        }
      }
    },

    Save() {
      if (this.codeproduct == '' || this.codeproduct == null) {
        Swal.fire({
          title: 'Ingresa el código del servicio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      if (this.nameproduct == '' || this.nameproduct == null) {
        Swal.fire({
          title: "Ingresa Nombre del Servicio",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      axios({
        method: "post",
        url: `/api/v1/services-insert/`,
        data: {
          id: this.id + 1,
          codeproduct: this.codeproduct,
          nameproduct: this.nameproduct,
          status: this.status,
          unit: this.unit,
          codeunit: this.codeunit,
          type: this.type,
          description: this.description,
          capacidadMaxima: this.capacidadMaxima,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          Swal.fire({
            title: "Servicio Agregado",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/catalogo/listServicioCotizacion";
            }
          })

        })
        .catch((error) => {
          console.log(error);
        });

    },

    getId() {
      axios({
        method: "post",
        url: `/api/v1/services-obtenerid/`,
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          this.id = response.data[0].id;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getLabelProSer(item) {
      if (item) {
        this.nameProSer = item.descripcion
        this.claveProSer = item.clave_prodserv
        this.claveProSer2 = item.clave_prodserv
        return item.clave_prodserv
      } else {
        this.nameProSer = ''
      }
    },

    updateItemsProSer(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-proser/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_proser = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getLabelUnidad(item) {
      if (item) {
        this.claveUnit = item.claveUnidad + " - " + item.nombre
        this.claveUnit2 = item.claveUnidad
        return item.claveUnidad + " - " + item.nombre
      }
    },

    updateItemsUnidad(text) {
      let input = text
      axios({
        method: "post",
        url: "/api/v1/search-unidad/",
        data: {
          data: input,
        },
      })
        .then((response) => {
          this.dates_search_unidad = response.data
        })
        .catch((error) => {
          console.log(error);
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
            <h5 class="header-title">Información de la Unidad</h5>
            <br>
            <div>
              <b-tabs content-class="mt-3" nav-class="nav-tabs nav-bordered">
                <b-tab title="Carga Manual" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Condición" label-for="code" description="">
                        <b-form-textarea id="code" v-model="code" type="text" placeholder="" required></b-form-textarea>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Nombre de la Unidad" label-for="name" description="">
                        <b-form-input id="name" v-model="name" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Codigo de Nombre" label-for="code_name" description="">
                        <b-form-input id="code_name" v-model="code_name" type="text" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Order Cot" label-for="order_cot" description="">
                        <b-form-input id="order_cot" v-model="order_cot" type="text" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Descripción" label-for="description" description="">
                        <b-form-input id="description" v-model="description" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Estatus:" label-for="mostrarLista">
                        <b-form-select v-model="mostrarLista" :options="mostrarListas"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Modalidad" label-for="modalidad" description="">
                        <b-form-input id="modalidad" v-model="modalidad" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Capacidad Maxima de Embalaje" label-for="capacidadMaxima" description="">
                        <b-form-input id="capacidadMaxima" v-model="capacidadMaxima" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i
                            class="fe-save"></i> Guardar</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Carga Automática">
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Peso Bruto de Carga" label-for="peso_bruto_carga" description="">
                        <b-form-input id="peso_bruto_carga" v-model="peso_bruto_carga" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Peso Bruto Total" label-for="peso_bruto_total" description="">
                        <b-form-input id="peso_bruto_total" v-model="peso_bruto_total" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab>
                <!--b-tab title="Second">
                  <p>Ejemplo</p>
                </b-tab-->
                <!--b-tab title="Disabled">
                  <p>Ejemplo</p>
                </b-tab-->
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
