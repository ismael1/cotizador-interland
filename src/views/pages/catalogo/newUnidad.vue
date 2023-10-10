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
    title: "Nueva Unidad",
    meta: [{ name: "newServicio", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Nueva Unidad",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Lista de Unidades",
          href: "/catalogo/listUnidad",
        },
        {
          text: "Nueva Unidad",
          href: "/newUnidad",
          active: true,
        },
      ],

      id: 0,
      code: '',
      name: "",
      code_name: "",
      order_cot: "",
      description: "",
      peso_bruto_carga: 0.0,
      peso_bruto_total: 0.0,
      capaciadad_vol: 0.0,
      long: "",
      width: "",
      high: "",
      orderg: "",
      orderp: "",
      modalidad: "",
      mostrarLista: 0,
      capacidadMaxima: 0, 
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },

      ],

      dates_search_proser: [],
      templateproser: ItemTemplateProSer,

      dates_search_unidad: [],
      templateunidad: ItemTemplateUnidad,

    };
  },

  created() {
    this.getId();
  },

  methods: {
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
                <b-tab title="Principal" active>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Codigo de Unidad" label-for="code" description="">
                        <b-form-input id="code" v-model="code" type="text" placeholder="" required></b-form-input>
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
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Pesos">
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
                <b-tab title="Medidas">
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Capacidad de Volumen" label-for="capaciadad_vol" description="">
                        <b-form-input id="peso_bruto_total" v-model="capaciadad_vol" type="number" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Longitud" label-for="long" description="">
                        <b-form-input id="long" v-model="long" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Ancho" label-for="width" description="">
                        <b-form-input id="width" v-model="width" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Alto" label-for="high" description="">
                        <b-form-input id="high" v-model="high" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Orderg" label-for="orderg" description="">
                        <b-form-input id="orderg" v-model="orderg" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Orderp" label-for="orderp" description="">
                        <b-form-input id="orderp" v-model="orderp" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center; padding: 30px;">
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i
                            class="fe-save"></i> Guardar</b-button>
                      </div>
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
