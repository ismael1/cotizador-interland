<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Nuevo Usuario",
    meta: [{ name: "newUser", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,   
  },
  data() {
    return {

      title: "Nuevo Usuario",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Lista de Usuarios",
          href: "/users/",
        },
        {
          text: "Nuevo Usuario",
          href: "/newUser",
          active: true,
        },
      ],

      //Inicio Variables

      apellidos: "",
      nombre: "",
      all_puesto: [],
      puesto: "VENTAS",
      login: "",
      pass: "",
      nameAdmin: false,      
      admin: [
        {value: false, text: "NO"},
        {value: true, text: "SI"}
      ],
      telefono: "",
      movil: "",
      email: "",
      responsable: [],
      all_responsable: [],
      all_responsable2: [
        {id: 1, value: "V1", nombre: "Admin"},
        {id: 2, value: "V2", nombre: "Aguilar Garcia Arturo"},
        {id: 3, value: "V3", nombre: "Aguilar Rojas Angelica"},
        {id: 4, value: "V4", nombre: "Albino Cristian Ivan"},
        {id: 5, value: "V5", nombre: "Daniel"},
        {id: 6, value: "V6", nombre: "Ismael"},
        {id: 7, value: "V7", nombre: "Miguel"},
        {id: 8, value: "V8", nombre: "Carlos"},
        {id: 9, value: "V9", nombre: "Hugo"},
        {id: 10, value: "V10", nombre: "Pedro"},
        {id: 11, value: "V11", nombre: "Moises"},
        {id: 12, value: "V12", nombre: "Joel"},
        {id: 13, value: "V13", nombre: "Kevin"},
        {id: 14, value: "V14", nombre: "Arturo"},
        {id: 15, value: "V15", nombre: "Rogelio"},
        {id: 16, value: "V16", nombre: "Jorge"},
      ],
      nota: "",

      total: 0,

      //Fin Variables
     
    };
  },

  created() {
    this.fechaHoy();
    this.generatePassword();
    this.getPuesto();
    this.getResponsable();
  },

  methods: {

    fechaHoy(){
        let hoy = new Date()
        let dd = hoy.getDate()
        let mm = hoy.getMonth()+1 
        let yyyy = hoy.getFullYear()

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 
        hoy = yyyy+'-'+mm+'-'+dd
        this.dateNow=hoy
    },

    generatePassword(){

      let num = 8
      const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let resultado= '';
      const caracteresLongitud = caracteres.length;
      for ( let i = 0; i < num; i++ ) {
          resultado += caracteres.charAt(Math.floor(Math.random() * caracteresLongitud));
      }
      this.pass = resultado
    },

    getPuesto(){

      axios({
          method: "get",
          url: `puesto/`,
      })
      .then((response) => {
        this.all_puesto = response.data
      })
      .catch((error) => {
          console.log(error);
      });

    },

    getResponsable(){

      axios({
          method: "get",
          url: `usuarios/`,
      })
      .then((response) => {
        this.all_responsable = response.data
        console.log(this.all_responsable)
      })
      .catch((error) => {
          console.log(error);
      });

    },

    // addResponsable(idEnviado){
    //   let respon = this.responsable      
    // },

    verification(){
      
      axios({
        method: "post",
        url: "/api/v1/validar-usuario/",
        data: {
          apellido: this.apellido,
          login: this.login,
          pass: this.pass,
          email: this.email,
        }
      })
      .then((response) => {
        console.log(response.data)
        this.total = response.data.total
        alert(this.total)
      })
      .catch((error) => {
        console.log(error)
      });

    },

    Save(){

      //this.verification()
      //return false

      let apellidos = this.apellidos
      let nombre = this.nombre
      let puesto  = this.puesto

      let login = this.login
      let pass = this.pass
      let nameAdmin = this.nameAdmin

      let telefono = this.telefono
      let movil = this.movil
      let email = this.email

      // let responsable = this.responsable
      let responsable
      let nota = this.nota

      for(let a=0; a<this.responsable.length; a++){

        if(responsable > 0){
          responsable = responsable+", "+this.responsable[a]          
        }else{
          responsable = this.responsable[a]
        }

      }

       if(apellidos == "" || apellidos == 0 || apellidos == null){
         Swal.fire({
           title: 'Error',
           text: 'Ingresa Apellidos',
           icon: 'error',
           confirmButtonText: 'Cerrar',
         })
         return false
       }
       if(nombre == "" || nombre == 0 || nombre == null){
         Swal.fire({
           title: 'Error',
           text: 'Ingresa Nombre(s)',
           icon: 'error',
           confirmButtonText: 'Cerrar',
         })
         return false
       }
      // if(puesto == "" || puesto == 0 || puesto == null){
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'Ingresa Puesto/Función',
      //     icon: 'error',
      //     confirmButtonText: 'Cerrar',
      //   })
      //   return false
      // }
      // if(puesto == "" || puesto == 0 || puesto == null){
      //   responsable = "S/R"
      // }

      axios({
        method: "post",
        url: `usuarios/`,
        data: {

          apellidos: apellidos,
          nombre: nombre,
          //puesto_funcion: puesto,
           
          login: login,
          password: pass,
          administrador: nameAdmin,

          telefonoJob: telefono,
          movil: movil,
          email: email,
          responsable: responsable,
          nota: nota,
          estatus: 1,

        },
        auth: {
            username: "admin",
            password: "123",
        },
      })
      .then((response) => {
        if(response){
          Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
          })
        }
      })
      .catch((error) => {
          console.log(error);
      });
     

    },




  }, // Final Methods

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">      
      <div class="col-md-12">

        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h5 class="header-title">Registro de Usuario</h5>

            <div class="row mt-3" style="margin-right: 15px; margin-left: 15px;">
              <div class="col-md-12">

                <div class="row">

                  <div class="col-md-6">
                    <label for="" style="font-size:12px; font-weight: bold;">Apellidos</label>
                    <b-input v-model="apellidos" @input="apellidos = apellidos.toUpperCase()" placeholder="Apellidos..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">Nombre(s)</label>
                    <b-input v-model="nombre" @input="nombre = nombre.toUpperCase()" placeholder="Nombre..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">Puesto/Función</label>
                    <b-select
                    v-model="puesto"
                    >
                      <option
                      v-for="puestos in all_puesto"
                      :key="puestos.id"
                      v-bind:value="puestos.nombre"
                      > {{ puestos.nombre }} </option>
                    </b-select>

                    <!--  -->
                    <label class="mt-3" for="" style="font-size:12px; font-weight: bold;">Login</label>
                    <b-input v-model="login" @input="login = login.toUpperCase()" placeholder="Login..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">Contraseña</label>
                    <b-input v-model="pass" placeholder="Contraseña..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">Administrador</label>
                    <b-select
                    v-model="nameAdmin"
                    >
                      <option
                      v-for="adm in admin"
                      :key="adm.value"
                      v-bind:value="adm.value"
                      >{{ adm.text }}</option>
                    </b-select>

                  </div>

                  <div class="col-md-6">

                    <label for="" style="font-size:12px; font-weight: bold;">Teléfono Trabajo</label>
                    <b-input type="number" v-model="telefono" placeholder="Teléfono..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">Móvil</label>
                    <b-input v-model="movil" placeholder="Movil..."></b-input>

                    <label for="" style="font-size:12px; font-weight: bold;">E-Mail</label>
                    <b-input v-model="email" placeholder="E-Mail..."></b-input>

                    <!--  -->
                    <label class="mt-3" for="" style="font-size:12px; font-weight: bold;">Responsable Jerárquico</label>
                    <div class="col-md-6" style="font-size: 12px; height: 70px; overflow-y: auto;">
                      <b-form-group class="ml-1 mt-1">
                        <b-form-checkbox

                          name="responsable"
                          v-bind:id="resp.id+'responsable'"
                          v-model="responsable"

                          v-for="resp in all_responsable"
                          :key="resp.id"
                          v-bind:value="resp.id"
                          @change="addResponsable(resp.id)"
                        > {{ resp.nombre }} {{ resp.apellidos }} </b-form-checkbox>
                      </b-form-group>

                    </div>

                    

                    <label for="" style="font-size:12px; font-weight: bold;">Nota</label>
                    <b-input v-model="nota"  @input="nota = nota.toUpperCase()" placeholder="Nota..."></b-input>

                    <div class="col-md-6" style="margin-top: 4px; margin-left: -11px">
                      <b-button
                      class="mt-3"
                      variant="primary"
                      @click="Save"
                      >Guardar</b-button>                    
                    </div>

                  </div>

                </div>
                    
              </div>
            </div>

          </div>
        </div>

      </div>     
    </div>

  </Layout>
</template>

<style>

</style>
