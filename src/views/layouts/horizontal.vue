<script>
import { layoutComputed } from "@/state/helpers";

import Topbar from "@/components/Topbar";
import HorizontalNavbar from "@/components/Horizontal-navbar";
import Rightbar from "@/components/Rightbar";
import Footer from "@/components/Footer";

/**
 * Horizontal layout
 */
export default {
  data() {
    return {
      idU: 0,
      emailU: "",
      nombreU: "",
      username: "",
      tokenU: "",
      puestoU: "",
      permisos: [],
      menuItems: [],
    };
  },
  components: {
    Topbar,
    HorizontalNavbar,
    Rightbar,
    Footer,
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    document.body.setAttribute("data-layout-mode", "horizontal");
  },
  created(){
    this.dataSess()
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    dataSess(){
      let data = JSON.parse(localStorage.getItem('users'))
      
      for (let i = 0; i < data.length; i++) {
        this.idU = data[i].id;
        this.emailU = data[i].email;
        this.nombreU = data[i].nombre;
        this.username = data[i].username;
        this.tokenU = data[i].token;
        this.puestoU = data[i].puesto;
        this.urlImg = data[i].urlImg;
      }
    },
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <Topbar />
    <HorizontalNavbar
      :type="topbar"
      :width="layoutWidth"
      :menu="menuPosition"
    />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <!-- content -->
      <Footer />
    </div>
    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
    <Rightbar />
  </div>
</template>
