<script>

import Swal from "sweetalert2";
import Auth from "../../layouts/auth-2";
import appConfig from "../../../../app.config";

import { required, email } from "vuelidate/lib/validators";

import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

//agregado 290621
import auth from "../../../auth";
import Vue from 'vue'
import VueCryptojs from 'vue-cryptojs'
import axios from "axios";
Vue.use(VueCryptojs)

/**
 * Login-2 component
 */
export default {
  page: {
    title: "Iniciar Sesión",
    meta: [{ name: "Iniciar Sesión", content: appConfig.description }],
  },
  data() {
    return {
      //email: "minton@themesbrand.com",
      //password: "123456",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      //agregado para el login
      email: "",
      password: "",
      error: false,
      c1: '',
      c2: '',

      showPassword: false,

      username: '',
      telefono: '',
      nombre: '',
      apellidos: '',

      emailInvitado: '',
      telefonoInvitado: '',
      nombreInvitado: '',
      apellidosInvitado: '',

      terms: false,
      validaUsername: false,
      textAccept: '',
      textDecline: '',
      botonDisabled: false,
      ladas: [],
      contacLada: 1,

      selectedtipoPersona: 0,
      optionstipoPersona: [
        { text: 'Física', value: 1 },
        { text: 'Moral', value: 2 },
      ],

      selectedtipoCliente: 0,
      optionstipoCliente: [
        { text: 'Nacional', value: 1 },
        { text: 'Extranjero', value: 2 },
      ],

      selectedtipoEmpresa: 0,
      optionstipoEmpresa:[
        {value:0, text:''},
        {value:1, text:'S.A de C.V.'},
        {value:2, text:'S de R.L. de C.V.'},
        {value:3, text:'S. de R.L.'},
        {value:4, text:'S. en C. por A.'},
        {value:5, text:'S. en C. S.'},
        {value:6, text:'S.A.'},
        {value:7, text:'S.C.'},
        {value:8, text:'SAS'},
        {value:14, text:'SAPI DE CV'},
        {value:15, text:'S.P.R DE R.L'},
        {value:9, text:'LLC'},
        {value:10, text:'INC'},
        {value:11, text:'LTD'},
        {value:12, text:'CO'},
        {value:13, text:'LP'},
        {value:16, text:'S.A.B. DE C.V.'},
      ],

      selectedregimenFiscal: 0,
      optionsregimenFiscal:[
        { value: 601, text: '601 General de Ley Personas Morales'},
        { value: 603, text: ' 603 Personas Morales con Fines no Lucrativos'},
        { value: 605, text: ' 605 Sueldos y Salarios e Ingresos Asimilados a Salarios'},
        { value: 606, text: ' 606 Arrendamiento'},
        { value: 607, text: ' 607 Régimen de Enajenación o Adquisición de Bienes'},
        { value: 608, text: ' 608 Demás ingresos'},
        { value: 609, text: ' 609 Consolidación'},
        { value: 610, text: ' 610 Residentes en el Extranjero sin Establecimiento Permanente en México'},
        { value: 611, text: ' 611 Ingresos por Dividendos (socios y accionistas)'},
        { value: 612, text: ' 612 Personas Físicas con Actividades Empresariales y Profesionales'},
        { value: 614, text: ' 614 Ingresos por intereses'},
        { value: 615, text: ' 615 Régimen de los ingresos por obtención de premios'},
        { value: 616, text: ' 616 Sin obligaciones fiscales'},
        { value: 620, text: ' 620 Sociedades Cooperativas de Producción que optan por diferir sus ingresos'},
        { value: 621, text: ' 621 Incorporación Fiscal'},
        { value: 622, text: ' 622 Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras'},
        { value: 624, text: ' 624 Coordinados'},
        { value: 625, text: ' 625 Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas'},
        { value: 626, text: ' 626 Régimen Simplificado de Confianza'},
        { value: 628, text: ' 628 Hidrocarburos'},
        { value: 629, text: ' 629 De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales'},
        { value: 630, text: ' 630 Enajenación de acciones en bolsa de valores'}
      ],

      selectedMetodoPago: 0,
      optionsMetodoPago:[
        { value: 1, text: 'PUE - Pago en una sola exhibición'},
        { value: 2, text: 'PPD - Pago en parcialidades o diferido'},
        
      ],

      selectedFormaPago: 0,
      optionsFormaPago:[
      
        {values: 1, text: '01 - Efectivo'},
        {values: 2, text: '02 - Cheque nominativo'},
        {values: 3, text: '03 - Transferencia electrónica de fondos'},
        {values: 4, text: '04 - Tarjeta de crédito'},
        {values: 5, text: '05 - Monedero electrónico'},
        {values: 6, text: '06 - Dinero electrónico'},
        {values: 7, text: '08 - Vales de despensa'},
        {values: 8, text: '12 - Dación en pago'},
        {values: 9, text: '13 - Pago por subrogación'},
        {values: 10, text: '14 - Pago por consignación'},
        {values: 11, text: '15 - Condonación'},
        {values: 12, text: '17 - Compensación'},
        {values: 13, text: '23 - Novación'},
        {values: 14, text: '24 - Confusión'},
        {values: 15, text: '25 - Remisión de deuda'},
        {values: 16, text: '26 - Prescripción o caducidad'},
        {values: 17, text: '27 - A satisfacción del acreedor'},
        {values: 18, text: '28 - Tarjeta de débito'},
        {values: 19, text: '29 - Tarjeta de servicios'},
        {values: 20, text: '30 - Aplicación de anticipos'},
        {values: 21, text: '99 - Por definir'},
      ],

    };
  },

  components: {
    Auth,
    FormWizard,
    TabContent,
  },

  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },

  created() {
    this.local()
    this.getLada();
  },

  methods: {

    local() {
      localStorage.removeItem('users')

    },

    async login() {
      try {
        await auth.login(this.email, this.password);
        this.$router.push(
          this.$route.query.redirectFrom || {
            path: "/",
          }
        );

      } catch (error) {
        console.log(error);
        this.error = true;
      }
    },

    //para el login
    async login5() {
      try {
        await auth_js.login(this.email, this.password)
        this.$router.push(
          this.$route.query.redirectFrom || {
            path: "/",
          }
        );

        // const { email, password } = this;
        // if (this.email && this.password) {
        //   this.$store.dispatch("authfack/login", {
        //     email,
        //     password,
        //   });
        // this.$store.dispatch("notification/clear");
        // }
      } catch (error) {
        this.tryingToLogIn = false;
        this.authError = error ? error : "";
        this.isAuthError = true;
      }
    },

    login3() {
      this.submitted = true;
      // stop here if form is invalid
      //this.$v.$touch();

      //if (this.$v.$invalid) {
      if (this.email == '' || this.password == '') {
        return;
      } else {

        try {
          auth_js.login(this.email, this.password);
          this.tryingToLogIn = false;
          this.isAuthError = false;
          // Redirect to the originally requested page, or to the home page
          this.$router.push(
            this.$route.query.redirectFrom || {
              path: "/",
            }
          );
        } catch (error) {
          this.tryingToLogIn = false;
          this.authError = error ? error : "";
          this.isAuthError = true;
        }

      }
    },

    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      let self = this;
      this.tryingToLogIn = true;
      this.authError = null;

      this.submitted = true;
      // stop here if form is invalid
      //this.$v.$touch();


      //if (this.$v.$invalid) {
      if (this.email == '' || this.password == '') {
        return;
      } else {
        axios.post('/api/v1/login/', {}, {
          auth: {
            username: this.email,
            password: this.password
          }
        }).then((response) => {
          let nmb = response.data.nameuser
          let tkn = response.data.token
          let eml = response.data.email
          let lgn = response.data.usuario
          let idu = response.data.id
          let pst = response.data.puesto
          let sts = response.data.estatus
          let per = response.data.permisos
          let adm = response.data.admin
          let url = ''
          if (response.data.urlImg != null && response.data.urlImg != '') {
            url = response.data.urlImg
          }

          let data = [{ "username": lgn, "email": eml, "token": tkn, "nombre": nmb, "id": idu, "puesto": pst, "estatus": sts, "permisos": per, "admin": adm, "urlImg": url }];
          localStorage.setItem('users', JSON.stringify(data));
          this.$store.dispatch("authfack/login", {
            eml,
            tkn,
          });
          this.$store.dispatch("notification/clear");


        }).catch((error) => {
          console.log(error);
        });
      }
    },

    showModal() {
      this.$refs['my-modal'].show()
      this.generatePassword()
    },

    hideModal() {
      this.$refs['my-modal'].hide()
    },

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    validaUsuario() {

      let usu = this.username

      if (usu.length > 3) {
        axios({
          method: "post",
          url: "/api/v1/validateUsername/",
          data: {
            username: usu,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {
          if (response.data[0].validate) {
            this.validaUsername = true
            this.textAccept = response.data[0].msg
            this.textDecline = ''
          } else {
            this.validaUsername = false
            this.textDecline = response.data[0].msg
            this.textAccept = ''
          }
        }).catch((error) => {
          Swal.fire({
            title: "Error Validación",
            text: "Surgio un error al intentar validar el usuario que elegiste, estamos trabajando para resolver el error." + error,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });
      }
    },

    onComplete() {

      if (!this.username) {
        Swal.fire({
          title: "Usuario Incorrecto",
          text: "El usuario no debe de quedar vacío.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (!this.validaUsername) {
        Swal.fire({
          title: "Usuario Ocupado",
          text: "Debes ingresar un usuario distinto, el ingresado ya esta en uso.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (!this.validaUsername) {
        Swal.fire({
          title: "Usuario Ocupado",
          text: "Debes ingresar un usuario distinto, el ingresado ya esta en uso.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (this.password == '') {
        Swal.fire({
          title: "Contraseña incorrecta",
          text: "La contraseña no puede estar vacía.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (this.nombre == '') {
        Swal.fire({
          title: "Nombre incorrecto",
          text: "El nombre no puede estar vacío",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (this.apellidos == '') {
        Swal.fire({
          title: "Apellidos incorrectos",
          text: "Los apellidos no pueden estar vacíos.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      if (this.email == '') {
        Swal.fire({
          title: "Correo Electrónico",
          text: "El correo electrónico no puede estar vacío.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      let email = this.email;
      let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(email);

      if (EmailValido == true) {
      } else {
        Swal.fire({
          title: "Email no Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let lada = this.contacLada;
      if (lada == "" || lada == null) {
        Swal.fire({
          title: "Seleccione Lada",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefono == "" || this.telefono == null) {
        Swal.fire({
          title: "Ingresa Telefono",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefono.length < 10) {
        Swal.fire({
          title: "Ingrese 10 Digitos Minimos",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefono.length > 15) {
        Swal.fire({
          title: "Ingrese 15 Digitos Maximo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      if (!this.terms) {
        Swal.fire({
          title: "Términos y Condiciones",
          text: "Para continuar debes aceptar los términos y condiciones.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });

        return false;
      }

      Swal.fire({
        title: "Guardando Información",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    
      axios({
        method: "post",
        url: "/api/v1/registerUser/",
        data: {
          validUsername: this.validaUsername,
          terms: this.terms,
          username: this.username,
          phone: this.telefono,
          name: this.nombre,
          lastname: this.apellidos,
          email: this.email,
          pass: this.password,
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        this.$refs['my-modal'].hide();
        this.validaUsername = false
        this.terms = false
        this.username = ''
        this.telefono = ''
        this.nombre = ''
        this.apellidos = ''
        this.email = ''
        this.password = ''
        this.textAccept = ''
        this.textDecline = ''

        Swal.close();

        Swal.fire({
          title: "Usuario Registrado",
          text: "Los datos de tu usuario fueron dados de alta con exito, ya puedes iniciar sesión,",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonText: "Cerrar",
        });
            
      });
      
    },

    generatePassword() {

      let num = 8
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let resultado = '';
      const caracteresLongitud = caracteres.length;
      for (let i = 0; i < num; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteresLongitud));
      }
      this.password = resultado
    },

    showModalInvitado() {
      this.$refs['modal-invitado'].show()
    },

    loginInvitado() {
      let self = this;
      this.tryingToLogIn = true;
      this.authError = null;

      this.submitted = true;

      if (this.nombreInvitado == '') {
        Swal.fire({
          title: "Nombre",
          text: "El nombre no puede estar vacío.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if (this.apellidosInvitado == '') {
        Swal.fire({
          title: "Apellidos",
          text: "Los apellidos no pueden estar vacíos.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if (this.emailInvitado == '') {
        Swal.fire({
          title: "Correo Electrónico",
          text: "El correo electrónico no puede estar vacío.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      let email = this.emailInvitado;
      let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(email);

      if (EmailValido == true) {
      } else {
        Swal.fire({
          title: "Email no Valido",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let lada = this.contacLada;
      if (lada == "" || lada == null) {
        Swal.fire({
          title: "Seleccione Lada",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefonoInvitado == "" || this.telefonoInvitado == null) {
        Swal.fire({
          title: "Ingresa Telefono",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefonoInvitado.length < 10) {
        Swal.fire({
          title: "Ingrese 10 Digitos Minimos",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      } else if (this.telefonoInvitado.length > 15) {
        Swal.fire({
          title: "Ingrese 15 Digitos Maximo",
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let datosIn = []
      datosIn.push(this.nombreInvitado)
      datosIn.push(this.apellidosInvitado)
      datosIn.push(this.emailInvitado)
      datosIn.push(this.telefonoInvitado)
      
      
      axios.post('/api/v1/loginInvitado/', {}, {
        auth: {
          username: this.nombreInvitado + '-' + this.apellidosInvitado,
          password: this.emailInvitado + '-' + this.telefonoInvitado,
        }
      }).then((response) => {
        console.log(response.data)
        let nmb = response.data.nameuser
        let tkn = response.data.token
        let eml = response.data.email
        let lgn = response.data.usuario
        let idu = response.data.id
        let pst = response.data.puesto
        let sts = response.data.estatus
        let per = response.data.permisos
        let adm = response.data.admin
        let url = ''
        if (response.data.urlImg != null && response.data.urlImg != '') {
          url = response.data.urlImg
        }

        let data = [{ "username": lgn, "email": eml, "token": tkn, "nombre": nmb, "id": idu, "puesto": pst, "estatus": sts, "permisos": per, "admin": adm, "urlImg": url }];
        localStorage.setItem('users', JSON.stringify(data));
        this.$store.dispatch("authfack/login", {
          eml,
          tkn,
        });
        this.$store.dispatch("notification/clear");

        }).catch((error) => {
          console.log(error);
        });
      
    },

    getLada() {
      axios
        .get(`/api/v1/list-ladas/`)
        .then((response) => {
          this.ladas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <Auth>
    <!-- Logo -->
    <div class="auth-brand text-center text-lg-left">
      <div class="auth-logo">
        <router-link to="/" class="logo logo-dark text-center">
          <span class="logo-lg">
            <img src="@/assets/images/logo_interland.png" alt="Logo Interland" height="50" />
          </span>
        </router-link>

        <router-link to="/" class="logo logo-light text-center">
          <span class="logo-lg">
            <img src="@/assets/images/logo_interland.png" alt="Logo Interland" height="50" />
          </span>
        </router-link>
      </div>
    </div>

    <!-- title-->
    <h4 class="mt-0">Iniciar Sesión</h4>
    <p class="text-muted mb-4">
      Introduzce tu usuario y contraseña para acceder al panel de administración.
    </p>

    <!-- form -->

    <form action="#" @submit.prevent="tryToLogIn">
      <b-alert :variant="notification.type" class="mt-3" v-if="notification.message" :show="notificationAutoCloseDuration"
        dismissible>{{ notification.message }}</b-alert>

      <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration" dismissible>{{
        authError }}</b-alert>

      <div class="form-group mb-3">
        <label for="emailaddress">Usuario</label>
        <input class="form-control" v-model="email" type="text" id="emailaddress" placeholder="Ingresa tu Usuario"
          required />
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <div class="input-group input-group-merge">
          <input v-model="password" type="password" id="password" class="form-control" placeholder="Ingresa tu Contraseña"
            required />
        </div>
      </div>

      <p v-if="error" class="error bg-danger text-center text-white">Has introducido mal el email o la contraseña.</p>

      <div class="form-group mb-0 text-center">
        <button class="btn btn-block" type="submit" value="Login"
          style="background-color: #056736; color: #ffffff;">Ingresar <i class="ri-login-box-line"></i></button>
      </div>
      <br>
      <div class="form-group mb-0 text-center">
        <p class="text-muted">
          ¿No tienes una cuenta?
          <a href="#" class="ml-1" @click="showModal" style="color: #056736;"><b>Crear Cuenta</b></a>
        </p>
      </div>
      <hr>
      <div class="form-group mb-0 text-center">
        <p class="text-muted">
          <a class="btn btn-block" style="background-color: #056736; color: #ffffff;" @click="showModalInvitado"><i
              class="ri-login-box-line"></i> Ingresar como invitado</a>

        </p>
      </div>
    </form>

    <b-modal ref="my-modal" size="xl" hide-footer no-close-on-esc no-close-on-backdrop title="Registro de Usuario">
      <div class="">
        <div class="card-body">
          <form-wizard color="#056736" @on-complete="onComplete" :back-button-text="'Regresar'"
            :next-button-text="'Siguiente'" :finishButtonText="'Registrar'" :defaultNextText="'Continuar'">
            <tab-content icon="mdi mdi-account-circle">
              <h4 class="header-title mb-3">Informacion de Cuenta</h4>
              <div class="row">
                <div class="col-12">
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="userName">Nombre de Usuario</label>
                    <div class="col-md-9">
                      <input id="username" type="text" class="form-control" name="username" placeholder="Usuario"
                        v-model="username" @change="validaUsuario" />
                      <sub v-if="textAccept != ''" style="color:#2aab5c">{{ textAccept }}<i class="fe-check"></i></sub>
                      <sub v-else-if="textDecline != ''" style="color:firebrick">{{ textDecline }}<i
                          class="fe-x"></i></sub>
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="password">Contraseña</label>
                    <div class="col-md-9">
                      <div class="input-group input-group-merge">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                          placeholder="c0ntr4$eña" />
                        <div class="input-group-append" data-password="false">
                          <div class="input-group-text" @click="toggleShowPassword">
                            <span class="password-eye"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="confirmpass">Número Telefónico</label>
                    <div class="col-md-9">
                      <div class="input-group">
                        <select id="lada" class="form-control col-md-3" v-model="contacLada">
                          <option v-for="marcado in ladas" :key="marcado.id" v-bind:value="marcado.id">
                            {{ marcado.alias }} + {{ marcado.code }}
                          </option>
                        </select>
                        <b-form-input class="col-md-9" placeholder="5500112233" id="telefono" type="number" v-model="telefono"></b-form-input>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </tab-content>
            <tab-content icon="mdi mdi-face-profile">
              <h4 class="header-title mb-3">Informacion del Usuario</h4>
              <div class="row">
                <div class="col-12">
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="name">Nombre</label>
                    <div class="col-md-9">
                      <input type="text" name="name" class="form-control" placeholder="Francisco" v-model="nombre" />
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="surname">Apellidos</label>
                    <div class="col-md-9">
                      <input type="text" name="surname" class="form-control" placeholder="Perez" v-model="apellidos" />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="email">Correo</label>
                    <div class="col-md-9">
                      <input type="email" name="email" class="form-control" placeholder="frankPerez@hotmail.com"
                        v-model="email" />
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </tab-content>
            <!--tab-content icon="mdi mdi-information-outline">
              <h4 class="header-title mb-3">Informacion Fiscal</h4>
              <div class="row">
                <div class="col-12">
                  <div class="form-group row mb-3">
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Tipo de Cliente:</b></label>
                        <b-form-radio-group
                          v-model="selectedtipoCliente"
                          :options="optionstipoCliente"
                        >
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Tipo de Persona:</b></label>
                        <b-form-radio-group
                          v-model="selectedtipoPersona"
                          :options="optionstipoPersona"
                        >
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Nombre de la Empresa:</b></label>
                        <input type="text" name="nombre_empresa" class="form-control" placeholder="Interland" v-model="nombre_empresa" />
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Tipo de Empresa:</b></label>
                        <b-form-select v-model="selectedtipoEmpresa" :options="optionstipoEmpresa"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group row mb-3">
                    <b-col md="3">
                      <b-form-group>
                        <label><b>RFC:</b></label>
                        <input type="text" name="rfc" class="form-control" placeholder="" v-model="rfc" />
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Regimen Fiscal:</b></label>
                        <b-form-select v-model="selectedregimenFiscal" :options="optionsregimenFiscal"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Método de Pago:</b></label>
                        <b-form-select v-model="selectedMetodoPago" :options="optionsMetodoPago"></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group>
                        <label><b>Forma de Pago:</b></label>
                        <b-form-select v-model="selectedFormaPago" :options="optionsFormaPago"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </div>
                </div>
              </div>
              
            </tab-content>
            <tab-content icon="mdi mdi-home-outline">
              <h4 class="header-title mb-3">Informacion de Domicilio Fiscal</h4>
              <div class="row">
                <div class="col-12">
                  <div class="_2ka8NZmhs89Mkk9ABZSXJM">
                          <div class="_1n4EOSyAk1BfVWnF_adPB9">
                            <div class="_23ovY8N9sx2ExP0NvytcpI">
                              <div class="_1cwBgi06GP5eqlDlfhrE9A">
                                <div class="_2tU2wKoG7YY564aace37OF" style="text-align:left; font-size:15px;">
                                  <b style="color: red">*</b> Ingresa el Origen
                                </div>
                              </div>
                              <div class="_12VTCAtCmgnF7JdGljsEapdo">
                                <div class="_3vCdC7UlpoMI8zyS9070Tm" style="width: 100% !important; border-radius: 10px !important;">
                                  <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                    <i class="fas fa-map-marker-alt"></i>
                                  </div>
                                  <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                    <template>
                                      <v-autocomplete
                                        :input-attrs="{autocomplete: 'none', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional',}"
                                        input-class="_1igQJzeY95hxUNao_yIXrr"
                                        :items="dates_search_address"
                                        :v-model="origen"
                                        :value="origen"
                                        @input="getLabelAddressO"
                                        :component-item="templateAddress"
                                        @update-items="buscaDireccion"
                                        :auto-select-one-item="false"
                                        return-object
                                      >
                                      </v-autocomplete>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br>
                          <b-row>
                            <b-col md="4">
                              <div class="_1cwBgi06GP5eqlDlfhrE9A">
                                <div class="_2tU2wKoG7YY564aace37OF" style="text-align:left; font-size:15px;">
                                  <b style="color: red">*</b> Calle
                                </div>
                              </div>
                              <div class="_12VTCAtCmgnF7JdGljsEapdo">
                                <div class="_3vCdC7UlpoMI8zyS9070Tm" style="width: 100% !important; border-radius: 10px !important;">
                                  <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                    <i class="fas fa-road"></i>
                                  </div>
                                  <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                    <template>
                                      <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="calleOrigen" type="text" placeholder="Calle"/>
                                    </template>
                                  </div>
                                </div>
                              </div>
                              
                            </b-col>
                            <b-col md="4">
                              <div class="_1cwBgi06GP5eqlDlfhrE9A">
                                <div class="_2tU2wKoG7YY564aace37OF" style="text-align:left; font-size:15px;">
                                  <b style="color: red">*</b> Número Exterior
                                </div>
                              </div>
                              <div class="_12VTCAtCmgnF7JdGljsEapdo">
                                <div class="_3vCdC7UlpoMI8zyS9070Tm" style="width: 100% !important; border-radius: 10px !important;">
                                  <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                    <i class="fas fa-hashtag"></i>
                                  </div>
                                  <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                    <template>
                                      <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="numExtOrigen" type="text" placeholder="Número Exterior"/>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </b-col>
                            <b-col md="4">
                              <div class="_1cwBgi06GP5eqlDlfhrE9A">
                                <div class="_2tU2wKoG7YY564aace37OF" style="text-align:left; font-size:15px;">
                                  Número Interior
                                </div>
                              </div>
                              <div class="_12VTCAtCmgnF7JdGljsEapdo">
                                <div class="_3vCdC7UlpoMI8zyS9070Tm" style="width: 100% !important; border-radius: 10px !important;">
                                  <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                    <i class="fas fa-hashtag"></i>
                                  </div>
                                  <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                    <template>
                                      <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="numIntOrigen" type="text" placeholder="Número Interior"/>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                </div>
              </div>
            </tab-content>
            <tab-content icon="mdi mdi-file-document-outline">
              <h4 class="header-title mb-3">Informacion de Documentos Vigentes</h4>
              <div class="row">
                <div class="col-12">
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="name">Nombre</label>
                    <div class="col-md-9">
                      <input type="text" name="name" class="form-control" placeholder="Francisco" v-model="nombre" />
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="surname">Apellidos</label>
                    <div class="col-md-9">
                      <input type="text" name="surname" class="form-control" placeholder="Perez" v-model="apellidos" />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-md-3 col-form-label" for="email">Correo</label>
                    <div class="col-md-9">
                      <input type="email" name="email" class="form-control" placeholder="frankPerez@hotmail.com"
                        v-model="email" />
                    </div>
                  </div>
                </div>
                
              </div>
              
            </tab-content-->
            <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
              
              <div class="row">
                <div class="col-12">
                  <div class="text-center">
                    <h2 class="mt-0" style="color:#056736">
                      <i class="mdi mdi-check-all"></i>
                    </h2>
                    <h3 class="mt-0">¡Gracias por registrarte en nuestra plataforma!</h3>

                    <p class="w-75 mb-2 mx-auto">
                      Estamos encantados de tenerte aquí. Si necesitas algo, ¡estamos aquí para ayudarte!
                      ¡Bienvenido(a) y diviértete explorando todo lo que tenemos para ti!

                      El equipo de Interland
                    </p>

                    <div class="mb-3">
                      <div class="custom-control custom-checkbox">
                        <input id="customCheck1" type="checkbox" class="custom-control-input" v-model="terms" />
                        <label class="custom-control-label" for="customCheck1">Acepto los Términos y Condiciones</label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </b-modal>

    <b-modal ref="modal-invitado" size="xl" hide-footer no-close-on-esc no-close-on-backdrop title="Datos de Invitado">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Información Basica</h4>
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="nombreInvitado">Nombre</label>
                  <input type="text" class="form-control" id="nombreInvitado" v-model="nombreInvitado" placeholder="Nombre">
                </div>
                <div class="form-group col-md-6">
                  <label for="apellidosInvitado">Apellidos</label>
                  <input type="text" class="form-control" id="apellidosInvitado" v-model="apellidosInvitado" placeholder="Apellidos">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="correoInvitado">Correo Electrónico</label>
                  <input type="email" class="form-control" id="correoInvitado" v-model="emailInvitado" placeholder="Correo Electrónico">
                </div>
                <div class="form-group col-md-6">
                  <label for="telefonoInvitado">Teléfono</label>
                  <div class="input-group">
                    <select id="lada" class="form-control col-md-3" v-model="contacLada">
                      <option v-for="marcado in ladas" :key="marcado.id" v-bind:value="marcado.id">
                        {{ marcado.alias }} + {{ marcado.code }}
                      </option>
                    </select>
                    <b-form-input class="col-md-9" placeholder="Teléfono" id="telefonoInvitado" type="number" v-model="telefonoInvitado"></b-form-input>
                  </div>
                </div>
              </div>
              <a class="btn" style="background-color: #056736; color: #ffffff;" @click="loginInvitado">Cotizar <i class="fe-fast-forward"></i></a>
            </form>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- Footer-->
    <footer class="footer footer-alt">
      {{ new Date().getFullYear() }} &copy; Interland
    </footer>
  </Auth>
</template>
<style>
.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
  background-color: #2aab5c;
  /* Cambia este valor para el color deseado */
  border-color: #2aab5c;
}

.custom-checkbox .custom-control-input:checked:focus~.custom-control-label::before {
  box-shadow: 0 0 0 1px #2aab5c, 0 0 0 0.2rem rgba(26, 188, 156, 0.25);
}

.custom-checkbox .custom-control-input:disabled~.custom-control-label {
  opacity: 0.65;
  /* Cambia este valor para el nivel de opacidad deseado */
}

.custom-checkbox .custom-control-input:disabled~.custom-control-label::before {
  background-color: #2aab5c;
  /* Cambia este valor para el color deseado */
  border-color: #2aab5c;
}

/*RADIO */

.custom-radio .custom-control-input:checked~.custom-control-label::before {
  background-color: #2aab5c;
  /* Cambia este valor para el color deseado */
  border-color: #2aab5c;
}

.custom-radio .custom-control-input:checked:focus~.custom-control-label::before {
  box-shadow: 0 0 0 1px #2aab5c, 0 0 0 0.2rem rgba(26, 188, 156, 0.25);
}

.custom-radio .custom-control-input:disabled~.custom-control-label {
  opacity: 0.65;
  /* Cambia este valor para el nivel de opacidad deseado */
}

 .custom-control-input:disabled~.custom-control-label::before {
  background-color: #2aab5c;
  /* Cambia este valor para el color deseado */
  border-color: #2aab5c;
}

/*ESTILO PRESTADOS */

body ._2ka8NZmhs89Mkk9ABZSXJM {
  margin: 0 auto;
  width: 100%;
  /*max-width: 1180px;*/
  border-radius: 10px;
  /*background-color: #e9f0f7;
  background-color: #eeeff3;*/
  padding: 10px 20px 16px 20px;
  animation: _37voVng3nKHA4uc-Tzq1vG 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body ._2ka8NZmhs89Mkk9ABZSXJM {
    box-shadow: none;
    border-radius: 0;
  }
}

body ._1n4EOSyAk1BfVWnF_adPB9 {
  display: flex;
  align-items: flex-end;
}

@media only screen and (max-width: 991px) {
  body ._1n4EOSyAk1BfVWnF_adPB9 {
    flex-wrap: wrap;
  }
}

body .YkNOjSwN0S7IrLX5OK2Hc {
  width: 24%;
  max-width: 192px;
}

@media only screen and (max-width: 991px) {
  body .YkNOjSwN0S7IrLX5OK2Hc {
    width: 100%;
    max-width: 100%;
    margin-bottom: 8px;
    border-radius: 5px;
  }
}

body .YkNOjSwN0S7IrLX5OK2Hc svg {
  width: 41px;
  height: 41px;
}

body .YkNOjSwN0S7IrLX5OK2Hc svg path {
  transition: color 0.2s ease 0.08s;
}

body ._1cwBgi06GP5eqlDlfhrE9A ._2tU2wKoG7YY564aace37OF {
  flex: 1;
}

body ._2tU2wKoG7YY564aace37OF {
  font-size: 10px;
  line-height: 14px;
  color: #9fb1c1;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0 0 6px 0;
}

@media only screen and (max-width: 991px) {
  body ._2tU2wKoG7YY564aace37OF {
    display: none;
  }
}

body .GDwblpm-PHJsqhSUenve5 {
  display: flex;
  position: relative;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
}

@media only screen and (max-width: 991px) {
  body .GDwblpm-PHJsqhSUenve5 {
    border-radius: 5px;
    justify-content: center;
  }
}

body ._3wHay473hXYPOlphbqvMW6 {
  position: relative;
  display: flex;
  height: 60px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #9fb1c1;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1;
}

@media only screen and (max-width: 991px) {
  body ._3wHay473hXYPOlphbqvMW6:nth-child(3)::after {
    display: none;
  }
}

body ._3wHay473hXYPOlphbqvMW6::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -1px;
  width: 2px;
  border-radius: 10px;
  height: 80%;
  background-color: #e9f0f7;
  transform: translate3d(0, -50%, 0);
}

@media only screen and (max-width: 991px) {
  body ._3wHay473hXYPOlphbqvMW6::after::after {
    display: none;
  }
}

body ._3wHay473hXYPOlphbqvMW6._1pk_-C20zpknwxqZLn_t9z svg path {
  stroke: #fff;
  transition: stroke 0.2s ease 0.08s;
}

body ._3wHay473hXYPOlphbqvMW6._1pk_-C20zpknwxqZLn_t9z svg + span {
  color: #fff;
  transition: color 0.2s ease 0.08s;
}

body .BzbyxjDnil5GvbUe8_1qF {
  color: #9fb1c1;
  margin-top: -10px;
  transition: color 0.2s ease 0.08s;
}

body .v-KSWjML0QpV66JYLjTgR {
  position: absolute;
  top: 50%;
  left: 8%;
  width: 84.4%;
  height: 84%;
  border-radius: 5px;
  z-index: -1;
  transform: translate3d(0, -50%, 0);
  transition: all 0.18s ease;
}

@media only screen and (max-width: 991px) {
  body .v-KSWjML0QpV66JYLjTgR {
    left: 2%;
    width: 96%;
  }
}

@media only screen and (max-width: 560px) {
  body .v-KSWjML0QpV66JYLjTgR {
    left: 5%;
    width: 90%;
  }
}

body ._23ovY8N9sx2ExP0NvytcpI {
  flex-grow: 1;
  width: calc(50% - 10px);
}

@media only screen and (max-width: 991px) {
  body ._23ovY8N9sx2ExP0NvytcpI {
    width: 100%;
  }
}

body ._1cwBgi06GP5eqlDlfhrE9A {
  display: flex;
  flex-direction: row;
}

body ._12VTCAtCmgnF7JdGljsEap {
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEap {
    flex-wrap: wrap;
  }
}

body ._12VTCAtCmgnF7JdGljsEap::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  border-radius: 10px;
  height: 80%;
  background-color: #e9f0f7;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEap::after {
    display: none;
  }
}

/* SEGUNDO */

body ._12VTCAtCmgnF7JdGljsEapdo {
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEapdo {
    flex-wrap: wrap;
  }
}

body ._12VTCAtCmgnF7JdGljsEapdo::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  border-radius: 10px;
  height: 80%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 991px) {
  body ._12VTCAtCmgnF7JdGljsEapdo::after {
    display: none;
  }
}

body ._3vCdC7UlpoMI8zyS9070Tm {
  position: relative;
  width: 50%;
  height: 60px;
  background: #fff;
  padding: 4px 6px;
  border-radius: 0px;
}

@media only screen and (max-width: 991px) {
  body ._3vCdC7UlpoMI8zyS9070Tm {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 4px;
  }
}

body ._2OKKnWa2I26FDFjQGrMlTi {
  position: absolute;
  top: 50%;
  left: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #0078e1;
  font-weight: 600;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  z-index: 2;
  transform: translate(0, -50%);
  pointer-events: none;
  transition: 0.2s ease;
}

._1AsJdz8ef0grzhKgIpVifh {
  position: relative;
}

body ._1igQJzeY95hxUNao_yIXrr {
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
  border: 1px solid #ced4da;
}

body ._1igQJzeY95hxUNao_yIXrr:focus {
  text-overflow: unset;
  padding-right: 0;
  box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
  transition: all 0.2s;
  z-index: 1;
}

body ._1igQJzeY95hxUNao_yIXrr::-moz-placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body ._1igQJzeY95hxUNao_yIXrr::placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body ._3Oe9vKBrFi5RVwWEswymkl {
  width: 14%;
  min-width: 150px;
  font-weight: 500;
}

@media only screen and (max-width: 991px) {
  body ._3Oe9vKBrFi5RVwWEswymkl {
    width: 50%;
    margin-bottom: 8px;
  }
}

body ._2Fk1Z0nKP1T6a1dr9C1FP_ {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #fff;
  font-weight: 500;
  font-size: 16px;
}

@media only screen and (max-width: 991px) {
  body ._2Fk1Z0nKP1T6a1dr9C1FP_ {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

body ._2Fk1Z0nKP1T6a1dr9C1FP_::after {
  left: -1px;
  right: auto;
}

@media only screen and (max-width: 991px) {
  body ._2Fk1Z0nKP1T6a1dr9C1FP_::after {
    display: none;
  }
}

body ._1Fv_I7ZFjrmFXYr-smGZqG {
  width: 25px;
  height: 18px;
  margin-left: 10px;
  margin-right: 5px;
}

body ._2FJfSi7htM3gHGbKFfAiX6 {
  width: 20%;
  min-width: 120px;
  max-width: 250px;
}

@media only screen and (max-width: 991px) {
  body ._2FJfSi7htM3gHGbKFfAiX6 {
    flex-grow: 1;
    margin-bottom: 8px;
    max-width: 100%;
  }
}

body ._3vjMsFU0d1YJalV9Qbqq {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 60px;
}

@media only screen and (max-width: 991px) {
  body ._3vjMsFU0d1YJalV9Qbqq {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

body ._3vjMsFU0d1YJalV9Qbqq::after {
  left: -1px;
  right: auto;
}

body .E5e3waHARVCVMF2JA93PS {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

body ._1N3bJ6D4JU95-nlvwuLuUG {
  margin-left: 10px;
  margin-right: 8px;
}

body ._3Asrt4xgZfhRSiH37EDtn4 {
  display: inline-block;
  font-size: 18px;
  text-transform: uppercase;
  color: #15354e;
  font-weight: 500;
}

body ._2-eTx56Mxj8udiynBFhn-1 {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-left: 2px solid #c7d3de;
  border-bottom: 2px solid #c7d3de;
  transform: translateY(-50%) rotate(-45deg);
}

body ._3QlnruSL5VqOlp6mJEr4-Z {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #fff;
  height: 60px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

@media only screen and (max-width: 991px) {
  body ._3QlnruSL5VqOlp6mJEr4-Z {
    border-radius: 5px;
    width: 100%;
  }
}

body .zTDkSCFjS5VtNrkEzKtJ5 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 100%;
  border-radius: 5px;
  border: none;
  background-color: #5a6268;
  box-shadow: none;
  background-image: url('data:image/svg+xml,%3Csvg fill="none" height="17" viewBox="0 0 17 17" width="17" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="m16.445 14.499-3.1979-3.1977c-.1444-.1443-.34-.2245-.5453-.2245h-.5228c.8852-1.13216 1.4113-2.5562 1.4113-4.10533 0-3.68518-2.9862-6.671177-6.67168-6.671177-3.68546 0-6.671672 2.985997-6.671672 6.671177 0 3.68523 2.986212 6.67123 6.671672 6.67123 1.54924 0 2.97338-.526 4.10568-1.4113v.5228c0 .2053.0801.4009.2245.5453l3.1979 3.1976c.3015.3015.789.3015 1.0873 0l.9078-.9076c.3015-.3015.3015-.789.0032-1.0905zm-9.52638-3.4222c-2.26773 0-4.10565-1.83456-4.10565-4.10533 0-2.26756 1.83471-4.10534 4.10565-4.10534 2.26772 0 4.10568 1.83458 4.10568 4.10534 0 2.26756-1.83475 4.10533-4.10568 4.10533z" fill="%23fff"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body .zTDkSCFjS5VtNrkEzKtJ5 {
    width: 100%;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 560px) {
  body .zTDkSCFjS5VtNrkEzKtJ5 {
    max-width: 100%;
  }
}

body .zTDkSCFjS5VtNrkEzKtJ5:active {
  box-shadow: 0 0 0 rgba(105, 126, 157, 0.3);
  transition: all 0.2s ease;
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .zTDkSCFjS5VtNrkEzKtJ5:hover {
    opacity: 0.9;
    transition: all 0.2s ease;
  }
}

body ._3GaS1vq0RCqjdAKKZ5HaLJ {
  height: 100%;
}

body .XnAvZ8kiGXiCA_sHNJc-d {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transform: translate3d(-50%, -50%, 0) scale(1);
  transition: all 0.2s ease;
}

@media only screen and (max-width: 991px) {
  body .XnAvZ8kiGXiCA_sHNJc-d {
    position: absolute;
    right: 20px;
    left: auto;
    transform: translate3d(0%, -60%, 0) scale(1.5);
  }
}

@media only screen and (max-width: 560px) {
  body .XnAvZ8kiGXiCA_sHNJc-d {
    transform: translate3d(0%, -65%, 0) scale(1.5);
    right: 10px;
  }
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover {
    transform: translate3d(-50%, -50%, 0) scale(1.1);
    transition: all 0.2s ease;
  }
}

@media only screen and (hover: hover) and (max-width: 991px),
  only screen and (-ms-high-contrast: none) and (max-width: 991px),
  only screen and (-ms-high-contrast: active) and (max-width: 991px) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover {
    transform: translate3d(0%, -60%, 0) scale(1.6);
  }
}

@media (hover: hover),
  all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  body .XnAvZ8kiGXiCA_sHNJc-d:hover ._19dtdOQCfyXKmKkLtvaUkM {
    transition: all 0.2s ease;
  }

  body .XnAvZ8kiGXiCA_sHNJc-d:hover ._2zAD7s046Fl3mpYGfgpZjK {
    transform: translateX(2px) scaleX(-1);
  }

  body .XnAvZ8kiGXiCA_sHNJc-d:hover .zcj_unEFDHcra9DrUB7t7 {
    transform: translateX(-2px) scale(1);
  }
}

body .fecha {
  font-weight: 500;
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

body .fecha:focus {
  text-overflow: unset;
  padding-right: 0;
  box-shadow: 0 0 0 2px #b7c6d3, 0 1px 8px 0 #b7c6d3;
  transition: all 0.2s;
  z-index: 1;
}

body .fecha::-moz-placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

body .fecha::placeholder {
  color: #a0b1be;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.input-group-prepend .input-group-text {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}

body ._19dtdOQCfyXKmKkLtvaUkM {
  fill: #5a6268;
  width: 13px;
  transition: all 0.2s ease;
}

body ._2zAD7s046Fl3mpYGfgpZjK {
  transform: translateX(0) scaleX(-1);
}

body .zcj_unEFDHcra9DrUB7t7 {
  transform: translateX(0) scale(1);
}
</style>