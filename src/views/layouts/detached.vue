<script>
import { layoutComputed } from "@/state/helpers";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Rightbar from "@/components/Rightbar";
import Footer from "@/components/Footer";

/**
 * Detached layout
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
      admin: false,
      permisos: [],
      menuItems: [],
    };
  },
  components: {
    Sidebar,
    Topbar,
    Rightbar,
    Footer,
  },
  computed: {
    ...layoutComputed,
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      if (this.isMenuCondensed)
        document.body.setAttribute("data-sidebar-size", "condensed");
      else document.body.removeAttribute("data-sidebar-size", "condensed");
      if (window.screen.width >= 992) {
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
        document.body.classList.toggle("sidebar-enable");
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
      }
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
  mounted() {
    document.body.setAttribute("data-layout-mode", "detached");
    document.body.setAttribute("data-sidebar-showuser", "true");
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper" v-if="username != 'Invitado'">
    <Sidebar
      :type="leftSidebarType"
      :width="layoutWidth"
      :size="leftSidebarSize"
      :menu="menuPosition"
      :topbar="topbar"
    />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
      <div class="content">
        <Topbar />
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
    <Rightbar />
  </div>
</template>
