<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";

import { required, email } from "vuelidate/lib/validators";


//agregado 290621
import auth from "../../../auth";
import Vue from 'vue'
import VueCryptojs from 'vue-cryptojs'
import axios from "axios";
Vue.use(VueCryptojs)


/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }],
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
    };
  },
  
  components: {
    Auth,
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
  },
 
  methods: {

    local(){
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
      if (this.email == '' || this.password == ''){
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
      if (this.email == '' || this.password == ''){
        return;
      } else {
        axios.post('api/v1/login/', {}, {
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

            let data = [{"username":lgn, "email":eml,"token":tkn,"nombre":nmb,"id":idu, "puesto":pst,"estatus":sts, "permisos":per}];
            localStorage.setItem('users', JSON.stringify(data));
            this.$store.dispatch("authfack/login", {
              eml,
              tkn,
            });
            this.$store.dispatch("notification/clear");
            
          
        }).catch((error) => {
          console.log(error);
        });

        /*if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {

          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.$store
              .dispatch("auth/logIn", {
                email: this.email,
                password: this.password,
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || {
                    path: "/",
                  }
                );
              })
              .catch((error) => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
              })
          );
        } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {

          const { email, password } = this;
          if (email && password) {

            this.$store.dispatch("authfack/login", {
              email,
              password,
            });
            this.$store.dispatch("notification/clear");
          }
        }*/
      }
    },



  },
};
</script>

<template>
  <Auth>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <div class="auth-logo">
                <router-link to="/" class="logo logo-dark text-center">
                  <span class="logo-lg">
                    <img src="@/assets/images/logo_interland.png" alt="" height="70" />
                  </span>
                </router-link>

                <router-link to="/" class="logo logo-light text-center">
                  <span class="logo-lg">
                    <img src="@/assets/images/logo_in.png" alt="" height="70" />
                  </span>
                </router-link>
              </div>
              <p class="text-muted mb-4 mt-3"></p>
            </div>

            <!-- @submit.prevent="tryToLogIn" -->
            <!-- login -->
            <form action="#" @submit.prevent="tryToLogIn">
              <b-alert :variant="notification.type" class="mt-3" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible >{{ notification.message }}</b-alert>

              <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration" dismissible >{{ authError }}</b-alert>

              <div class="form-group mb-3">
                <label for="emailaddress">Usuario</label>
                <!-- <input
                  class="form-control"
                  v-model="email"
                  type="email"
                  id="emailaddress"
                  placeholder="Enter your email"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                /> -->
                <input class="form-control" v-model="email" type="text" id="emailaddress" placeholder="Ingresa tu Usuario" required />
                <!-- :class="{ 'is-invalid': submitted && $v.email.$error }" -->
                <!-- <div
                  v-if="submitted && $v.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.email.required">Email is required.</span>
                  <span v-if="!$v.email.email">Please enter valid email.</span>
                </div> -->
              </div>

              <div class="form-group mb-3">
                <label for="password">Password</label>
                <div class="input-group input-group-merge">
                  <input v-model="password" type="password" id="password" class="form-control" placeholder="Ingresa tu Contraseña" required/>
                  <!-- :class="{ 'is-invalid': submitted && $v.password.$error }" -->


                  <!-- <div class="input-group-append" data-password="false">
                    <div class="input-group-text">
                      <span class="password-eye"></span>
                    </div>
                  </div>
                  <div
                    v-if="submitted && !$v.password.required"
                    class="invalid-feedback"
                  >
                    Password is required.
                  </div> -->
                </div>
              </div>

              <!-- <div class="form-group mb-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox-signin"
                    checked
                  />
                  <label class="custom-control-label" for="checkbox-signin"
                    >Remember me</label
                  >
                </div>
              </div> -->
              
              <p v-if="error" class="error bg-danger text-center text-white">Has introducido mal el email o la contraseña.</p>
              <!-- <b-alert v-if="error" class="error bg-danger"><a href="#" class="alert-link">Has introducido mal el email o la contraseña.</a></b-alert> -->

              <div class="form-group mb-0 text-center">
                <button class="btn btn-success btn-block" type="submit" value="Login"> Log In </button>
              </div>
            </form>

            <!-- <div class="text-center">
              <h5 class="mt-3 text-muted">Sign in with</h5>
              <ul class="social-list list-inline mt-3 mb-0">
                <li class="list-inline-item">
                  <a
                    href="javascript: void(0);"
                    class="social-list-item border-purple text-purple"
                    ><i class="mdi mdi-facebook"></i
                  ></a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript: void(0);"
                    class="social-list-item border-danger text-danger"
                    ><i class="mdi mdi-google"></i
                  ></a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript: void(0);"
                    class="social-list-item border-info text-info"
                    ><i class="mdi mdi-twitter"></i
                  ></a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript: void(0);"
                    class="social-list-item border-secondary text-secondary"
                    ><i class="mdi mdi-github"></i
                  ></a>
                </li>
              </ul>
            </div> -->

          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
          <div class="col-12 text-center">
            <!-- <p>
              <router-link to="/forgot-password" class="text-muted ml-1"
                >Forgot your password?</router-link
              >
            </p>
            -->
            <!--p class="text-muted">No tienes cuenta? <router-link to="/register" class="text-primary font-weight-medium ml-1">Sign Up</router-link>
            </p--> 
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Auth>
</template>
