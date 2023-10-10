<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

import ShowDivs from '@/components/show-divs'


export default {
  page: {
    title: "Ver Venta",
    meta: [{ name: "VerVenta", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
    ShowDivs,
  },

  data() {
    return {

        title: "Prueba Divs Dinamicos",
        items: [
            {
            text: "System",
            href: "/",
            },
            {
            text: "Servicios",
            href: "/cotizaciones/listVentas",
            },
            {
            text: "Nuevo",
            href: "/newServiceSale",
            active: true,
            },
        ], 
        
        idServicio:0,
    }
  },

  created() {
  },
  methods: {
            
  },  
  mounted() {
  },
};
</script>

<template>
  <Layout>
    <PageHeader />

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <!-- <ShowDivs v-bind:idService="" /> -->
            <ShowDivs v-bind:idService="this.$route.params.pkService"/>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!--- end row -->
  </Layout>
</template>

<style>

</style>