<script>
import { layoutComputed } from "@/state/helpers";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Rightbar from "@/components/Rightbar";
import Footer from "@/components/Footer";

/**
 * Vertical layout
 */
export default {
  components: {
    Sidebar, //menu izquierdo
    Topbar, //menu superior
    Rightbar,  //menu derecto y configuraciones
    Footer,  //pei de la pagina
  },
  data() {
    return {
      isMenuCondensed: false,

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
  computed: {
    ...layoutComputed,
  },
  created(){
    this.dataSess();
  },
  mounted() {
    document.body.removeAttribute("data-layout-mode");
    document.body.removeAttribute("data-sidebar-showuser");
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
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
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

    <div class="content-page" style="margin-left: 0px !important;" v-if="username == 'Invitado'">
      <div class="content">
        <Topbar />
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>

    <div class="content-page" v-else>
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

<style>
/*  agregado ismael  */
.logo-box {
    /*background-color: #00786c;*/
    background-color: #056736;
}
.navbar-custom {
    /*background-color: #00786c;*/
    background-color: #056736;
}
.table {
  color: #363636;
}

#sidebar-menu .menu-title {
  color: #363636;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: #363636;
}
label {
  color: #363636;
  font-weight: 700;
  font-size: inherit;
}
body, button, input, optgroup, select, textarea {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.card{
  border-radius: 0px;
  background-color: white;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  color: #4a4a4a;
  display: block;
  /* padding: 1.25rem; */
}

</style>
