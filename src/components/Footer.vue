<script>
/**
 * Footer Component
 */
 export default {
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
  created(){
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
        this.urlImg = data[i].urlImg;
      }
    },
  },
};
</script>

<template>
<!-- Footer Start -->
<footer class="footer" style="left: 0px !important;" v-if="username == 'Invitado'">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <p class="has-text-centered">Copyright (c) {{ new Date().getFullYear()}}</p>

                <!-- {{ new Date().getFullYear()}} &copy; Minton theme by <a href="">Themesbrand</a> -->
                <!-- {{ new Date().getFullYear()}} &copy; Minton theme by <a href="">Themesbrand</a> -->

            </div>
            <div class="col-md-6">
                <div class="text-md-right footer-links d-none d-sm-block">
                    <!-- <a href="javascript:void(0);">About Us</a> -->
                    <!-- <a href="javascript:void(0);">Help</a> -->
                    <!-- <a href="javascript:void(0);">Contact Us</a> -->
                </div>
            </div>
        </div>
    </div>
</footer>
<footer class="footer jeje" v-else>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <p class="has-text-centered">Copyright (c) {{ new Date().getFullYear()}}</p>

                <!-- {{ new Date().getFullYear()}} &copy; Minton theme by <a href="">Themesbrand</a> -->
                <!-- {{ new Date().getFullYear()}} &copy; Minton theme by <a href="">Themesbrand</a> -->

            </div>
            <div class="col-md-6">
                <div class="text-md-right footer-links d-none d-sm-block">
                    <!-- <a href="javascript:void(0);">About Us</a> -->
                    <!-- <a href="javascript:void(0);">Help</a> -->
                    <!-- <a href="javascript:void(0);">Contact Us</a> -->
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- end Footer -->
</template>
