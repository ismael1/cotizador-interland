<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Editar Usuarios",
    meta: [{ name: "editUser", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Editar Usuario",
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
          text: "Editar Usuario",
          href: "/editUser",
          active: true,
        },
      ],

      //Inicio Variables

      apellidos: "",
      nombre: "",
      all_puesto: [],
      puesto: "VENTAS",
      login: "",
      pass: '',
      nameAdmin: false,      
      admin: [
        {value: false, text: "NO"},
        {value: true, text: "SI"}
      ],
      tipo: "INTERNO",
      telefono: "",
      movil: "",
      fax: "",
      email: "",
      firma: "",
      responsable: [4],
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
      all_modulos: [],
      nota: "",
      permisos: [],
      respaldoModulos: [],
      emailU: '',
      nombreU: '',
      username: '',
      tokenU: '',
      puestoU: '',

      //Fin Variables


    };
  },
  created() {
    this.dataSess();
    this.getUsuario();
    this.getPuesto();
    this.getResponsable();
    
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
      }
    },

    getUsuario(){

      const idU = this.$route.params.pkUser;

      axios({
          method: "get",
          url: `usuarios/${idU}/`,
      })
      .then((response) => {

        this.apellidos = response.data.apellidos
        this.nombre = response.data.nombre
        this.puesto_funcion = response.data.puesto
        this.login = response.data.login
        this.pass = response.data.password
        //this.administrador = response.data.nameAdmin
        this.telefono = response.data.telefonoJob
        this.movil = response.data.movil
        this.email = response.data.email
        //this.responsable = response.data.responsable
        this.nota = response.data.nota

        // for(let a=0; a<response.data.responsable; a++){
        //   this.responsable =
        // }

        //alert(this.responsable)
        this.getModulos();

      })
      .catch((error) => {
          console.log(error);
      });

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

    getModulos(){
      axios({
        method: "get",
        url: '/api/v1/modulos/',
      }).then((response) => {
        this.all_modulos = response.data
      }).catch((error) => {
        console.log(error);
      });
      this.permisoUsr();
    },

    getResponsable(){

      axios({
          method: "get",
          url: `usuarios/`,
      }).then((response) => {
        this.all_responsable = response.data
      }).catch((error) => {
          console.log(error);
      });

    },

    addResponsable(idEnviado){
      let respon = this.responsable      
    },

    Save(){

      let apellidos = this.apellidos
      let nombre = this.nombre
      let puesto  = this.puesto

      let login = this.login
      let pass = this.pass
      let nameAdmin = this.nameAdmin

      let telefono = this.telefono
      let movil = this.movil
      let email = this.email

      let responsable = this.responsable
      let nota = this.nota

      // if(apellidos == "" || apellidos == 0 || apellidos == null){
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'Ingresa Apellidos',
      //     icon: 'error',
      //     confirmButtonText: 'Cerrar',
      //   })
      //   return false
      // }
      // if(nombre == "" || nombre == 0 || nombre == null){
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'Ingresa Nombre(s)',
      //     icon: 'error',
      //     confirmButtonText: 'Cerrar',
      //   })
      //   return false
      // }
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
          puesto_funcion: puesto,
           
          login: login,
          password: pass,
          administrador: nameAdmin,

          telefonoJob: telefono,
          movil: movil,
          email: email,
          // responsable: responsable,
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

    permisoUsr(){
      let id = this.$route.params.pkUser;
      
      axios({
        method: "post",
        url: '/api/v1/permisosUsuarios/',
        data:{
          id: id,
        }, 
      }).then((response) => {
        this.permisos = response.data
      }).catch((error) => {
        console.log(error);
      });
    },
    
    validaPermisos(){

      let agrega = {}
      let usrAplica = false 
      this.respaldoModulos = []
      let alta = 0
      let baja = 0
      let edit = 0
      let leer = 0
      let pdf = 0
      let excel = 0

      for (let i = 0; i < this.all_modulos.length; i++) {
        for (let j = 0; j < this.permisos.length; j++) {
          
          if(this.all_modulos[i].nombre == this.permisos[j].modulos_nombre){ 
            usrAplica = true //VALIDA SOLO LOS QUE EXISTEN DENTRO DE PERMISOS
            alta = this.permisos[j].permisos_agregar
            baja = this.permisos[j].permisos_eliminar
            edit = this.permisos[j].permisos_editar
            leer = this.permisos[j].permisos_lectura
            pdf = this.permisos[j].permisos_pdf
            excel = this.permisos[j].permisos_excel
          }
          
        }
        
        agrega = {
          estatus: this.all_modulos[i].estatus,
          icon: this.all_modulos[i].icon,
          id: this.all_modulos[i].id,
          idMenu: this.all_modulos[i].idMenu,
          isSubmenu: this.all_modulos[i].isSubmenu,
          link: this.all_modulos[i].link,
          nombre: this.all_modulos[i].nombre,
          usurioAplica: usrAplica,
          alta: alta,
          baja: baja,
          edit: edit,
          leer: leer,
          pdf: pdf,
          excel: excel,
        }
        console.log(agrega)
        this.respaldoModulos.push(agrega)
        usrAplica = false //VUELVE A ESTATUS DEFAULT
        alta = 0
        baja = 0
        edit = 0
        leer = 0
        pdf = 0
        excel = 0
      }

      this.all_modulos = this.respaldoModulos

      this.respaldoModulos = []

    },
    asignaPermiso(id, idM){
      let idUsuario = parseInt(this.$route.params.pkUser);
      let idModulo = id
      let idMenu = idM
      let comprobar = false

      comprobar = document.getElementById(idModulo + '-permiso').checked

      if(comprobar){
        axios({
          method: "post",
          url: '/api/v1/asignaPermisos/',
          data:{
            idUsr: idUsuario,
            idMod: idModulo,
            accio: 'add',
            idMen: idMenu,
            usrAs: this.username,
          }, 
        }).then((response) => {
          console.log(response)
          this.permisoUsr();
        }).catch((error) => {
          console.log(error);
        });
      }else{
        axios({
          method: "post",
          url: '/api/v1/asignaPermisos/',
          data:{
            idUsr: idUsuario,
            idMod: idModulo,
            accio: 'del',
            idMen: idMenu,
            usrAs: this.username,
          }, 
        }).then((response) => {
          console.log(response)
          this.permisoUsr();
        }).catch((error) => {
          console.log(error);
        });
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Permiso Actualizado correctamente'
      })
      setTimeout(this.validaPermisos, 500);

    },
    accionesPermiso(idMod, acc){
      let idUsuario = parseInt(this.$route.params.pkUser);
      let idModulo = parseInt(idMod);
      let accion = acc
      let comprobar = false
      
      if(accion == 'Alta'){
        comprobar = document.getElementById(idModulo + '-permisoAlta').checked
      }else if(accion == 'Baja'){
        comprobar = document.getElementById(idModulo + '-permisoBaja').checked
      }else if(accion == 'Editar'){
        comprobar = document.getElementById(idModulo + '-permisoEditar').checked
      }else if(accion == 'Leer'){
        comprobar = document.getElementById(idModulo + '-permisoLeer').checked
      }else if(accion == 'Pdf'){
        comprobar = document.getElementById(idModulo + '-permisoPdf').checked
      }else if(accion == 'Excel'){
        comprobar = document.getElementById(idModulo + '-permisoExcel').checked
      }
      

      axios({
        method: "post",
        url: '/api/v1/accionesPermisos/',
        data:{
          idUsr: idUsuario,
          idMod: idModulo,
          accio: accion,
          usrAs: this.username,
          activ: comprobar,
        }, 
      }).then((response) => {
        this.permisoUsr();
      }).catch((error) => {
        console.log(error);
      });

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Permiso Actualizado correctamente'
      })
      setTimeout(this.validaPermisos, 500);
    },
  }, // Fin Methods
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
            <b-tabs nav-class="nav-tabs nav-bordered">

              <b-tab title="Informacion Basica">

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
                        <b-select v-model="nameAdmin">
                          <option v-for="adm in admin" :key="adm.value" v-bind:value="adm.value" >{{ adm.text }}</option>
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
                        <div class="col-md-6">
                          <b-form-group class="ml-1 mt-1">
                            <b-form-checkbox name="responsable" v-bind:id="resp.id+'responsable'" v-model="responsable" v-for="resp in all_responsable" :key="resp.id" v-bind:value="resp.id" @change="addResponsable(resp.id)"
                            > {{ resp.nombre }} {{ resp.apellidos }} </b-form-checkbox>
                          </b-form-group>
                        </div>
                        

                        <label for="" style="font-size:12px; font-weight: bold;">Nota</label>
                        <b-input v-model="nota"  @input="nota = nota.toUpperCase()" placeholder="Nota..."></b-input>

                        <div class="col-md-6" style="margin-top: 4px; margin-left: -11px">
                          <b-button class="mt-3" variant="primary" @click="Save">Guardar</b-button>                    
                        </div>

                      </div>

                    </div>
                        
                  </div>
                </div>

              </b-tab>
              <!-- Fin Información Basica -->

              <b-tab v-bind:title="'Permisos de ' + nombre.toLowerCase().charAt(0).toUpperCase() + nombre.toLowerCase().slice(1) + ' ' + apellidos.toLowerCase().charAt(0).toUpperCase() + apellidos.toLowerCase().slice(1) " @click="validaPermisos()">
                <b-container fluid style="padding: 15px; margin: 0px;">
                  <!--h3>Lista de Módulos de </h3-->
                  <b-row>
                    <b-col colls="6">
                      <b-list-group>
                        <b-list-group-item v-for="mod in all_modulos" :key="mod.id" v-bind:value="mod.id" class="d-flex justify-content-between align-items-center">
                          <b v-if="mod.usurioAplica" block v-b-toggle="mod.id+'-operaciones'"><u>{{ mod.nombre }}</u></b>
                          <b v-else>{{ mod.nombre }}</b>
                          <b-collapse v-if="mod.usurioAplica" v-bind:id="mod.id+'-operaciones'" accordion="my-accordion" role="tabpanel">
                            Permisos del Módulo:
                            <b-row>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.alta == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Alta')" v-bind:id="mod.id+'-permisoAlta'">
                                  <h4><b-badge variant="success">Alta</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Alta')" v-bind:id="mod.id+'-permisoAlta'">
                                  <h4><b-badge variant="danger">Alta</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.baja == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Baja')" v-bind:id="mod.id+'-permisoBaja'">
                                  <h4><b-badge variant="success">Baja</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Baja')" v-bind:id="mod.id+'-permisoBaja'">
                                  <h4><b-badge variant="danger">Baja</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.edit == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Editar')" v-bind:id="mod.id+'-permisoEditar'">
                                  <h4><b-badge variant="success">Editar</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Editar')" v-bind:id="mod.id+'-permisoEditar'">
                                  <h4><b-badge variant="danger">Editar</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                            </b-row>

                            <b-row>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.leer == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Leer')" v-bind:id="mod.id+'-permisoLeer'">
                                  <h4><b-badge variant="success">Leer</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Leer')" v-bind:id="mod.id+'-permisoLeer'">
                                  <h4><b-badge variant="danger">Leer</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.pdf == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Pdf')" v-bind:id="mod.id+'-permisoPdf'">
                                  <h4><b-badge variant="success">PDF</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Pdf')" v-bind:id="mod.id+'-permisoPdf'">
                                  <h4><b-badge variant="danger">PDF</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                              <b-col cols="4">
                                <b-form-checkbox v-if="mod.excel == 1" checked="true" switch @change="accionesPermiso(mod.id, 'Excel')" v-bind:id="mod.id+'-permisoExcel'">
                                  <h4><b-badge variant="success">Excel</b-badge></h4>
                                </b-form-checkbox>
                                <b-form-checkbox v-else switch @change="accionesPermiso(mod.id, 'Excel')" v-bind:id="mod.id+'-permisoExcel'">
                                  <h4><b-badge variant="danger">Excel</b-badge></h4>
                                </b-form-checkbox>
                              </b-col>
                            </b-row>
                          </b-collapse>
                          
                          <b-form-checkbox v-if="mod.usurioAplica" checked="true" switch @change="asignaPermiso(mod.id, mod.idMenu)" v-bind:id="mod.id+'-permiso'">
                              <h4><b-badge variant="success">Activo</b-badge></h4>
                          </b-form-checkbox>
                          <b-form-checkbox v-else switch @change="asignaPermiso(mod.id, mod.idMenu)" v-bind:id="mod.id+'-permiso'">
                              <h4><b-badge variant="danger">Inactivo</b-badge></h4>
                          </b-form-checkbox>
                        </b-list-group-item>
                      </b-list-group>
                    </b-col>
                    <b-col colls="6"></b-col>
                  </b-row>
                </b-container>
              </b-tab>
              <!-- Fin Permisos -->

            </b-tabs>

            

          </div>
        </div>

      </div>     
    </div>

  </Layout>
</template>

<style>

</style>