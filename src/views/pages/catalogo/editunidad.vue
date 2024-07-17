<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Editar Unidad",
    meta: [{ name: "editUnidad", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Unidad",
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
          text: "Editar Servicio",
          href: "/editServicioCotizacion",
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
      precio_kilometraje: 0.0,
      mostrarLista: 0,
      mostrarListas: [
        { value: 0, text: "Inactiva" },
        { value: 1, text: "Activa" },

      ],
      capacidadMaxima: 0,
    };
  },
  created() {
    this.getServicio()
  },

  methods: {

    getServicio(){

      const idS = this.$route.params.pkUnidad;

      axios({
          method: "get",
          url: `/api/v1/catalogo-getUnidad/${idS}/`,
      }).then((response) => {
        console.log(response.data)

        this.code = response.data.code
        this.code_name = response.data.code_name
        this.description = response.data.description
        this.high = parseFloat(response.data.high)
        this.id = parseInt(response.data.id)
        this.long = parseFloat(response.data.long)
        this.modalidad = response.data.modalidad
        this.mostrarLista = parseInt(response.data.mostrarLista)
        this.name = response.data.name
        this.order_cot = response.data.order_cot
        this.orderg = response.data.orderg
        this.orderp = response.data.orderp
        this.peso_bruto_carga = parseFloat(response.data.peso_bruto_carga)
        this.peso_bruto_total = parseFloat(response.data.peso_bruto_total)
        this.width = parseFloat(response.data.width)
        this.capaciadad_vol = parseFloat(response.data.capacidad_vol)
        this.capacidadMaxima = parseInt(response.data.capacidadMaxima)
        this.precio_kilometraje = parseFloat(response.data.precio_kilometraje)

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
          capacidadMaxima: this.capacidadMaxima,
          precio_kilometraje: this.precio_kilometraje,

        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
          console.log(response)
          Swal.fire({
            title: "Unidad Actualizada",
            text: "",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/catalogo/listunidad";
            }
          })
        }).catch((error) => {
          Swal.fire({
            title: "Ocurrio un error al intentar actualizar el servicio. "+error,
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
            <h5 class="header-title">Información de la Unidad: <span class="badge badge-secondary badge-pill" style="font-size: 100%;">{{ name }}</span></h5>
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
                        <b-form-input id="description" v-model="description" type="text" placeholder=""
                          required></b-form-input>
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
                        <b-form-input id="modalidad" v-model="modalidad" type="text" placeholder=""
                          required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Capacidad Maxima de Embalaje" label-for="capacidadMaxima" description="">
                        <b-form-input id="capacidadMaxima" v-model="capacidadMaxima" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Precio por Kilometro" label-for="precioKilometro" description="">
                        <b-form-input id="precioKilometro" v-model="precio_kilometraje" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
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
                        <b-form-input id="peso_bruto_total" v-model="capaciadad_vol" type="number" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Largo(m)" label-for="long" description="">
                        <b-form-input id="long" v-model="long" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                      <b-form-group label="Ancho(m)" label-for="width" description="">
                        <b-form-input id="width" v-model="width" type="text" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4" sm="12">
                      <b-form-group label="Alto(m)" label-for="high" description="">
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
                        <b-button id="boton" style="background-color: #00786C;" class="lg" @click="Save"><i class="fe-save"></i> Actualizar</b-button>
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

              <div style="text-align: center; padding: 30px;">
                        <b-button href="../../catalogo/listunidad" style="background-color: #00786C;" class="sm"><i class="fe-save"></i> Regresar</b-button>
                      </div>

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