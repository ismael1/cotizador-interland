<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';

import ItemTemplateAddres from "@/components/ItemTemplateAddress";

export default {
  page: {
    title: "Mi Cuenta",
    meta: [{ name: "Mi Cuenta", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {

      title: "Mi Cuenta",
      items: [
        {
          text: "Inicio",
          href: "/",
        },
        {
          text: "Mi cuenta",
          href: "/miCuenta",
          active: true,
        },
      ],

      idUs: 0,
      email: "",
      password: "",
      showPassword: false,
      username: '',
      telefono: '',
      nombre: '',
      apellidos: '',

      terms: false,
      validaUsername: false,
      textAccept: '',
      textDecline: '',
      botonDisabled: false,
      ladas: [],
      contacLada: 1,

      nombre_empresa: '',
      rfc: '',
      dates_search_address: [],
      direccion_fiscal: '',
      templateAddress: ItemTemplateAddres,

      pais_fiscal: 0,
      pais_nombre_fiscal: 0,
      estado_fiscal: '',
      ciudad_fiscal: '',
      cp_fiscal: '',
      calle_fiscal: '',
      numero_exterior_fiscal: '',
      numero_interior_fiscal: '',

      comprobante_domicilio_fiscal: null,
      comprobante_domicilio_fiscal_url: '',
      estado_cuenta: null,
      estado_cuenta_url: '',

      selectedtipoPersona: 0,
      optionstipoPersona: [],

      selectedtipoCliente: 0,
      optionstipoCliente: [],

      selectedtipoEmpresa: 0,
      optionstipoEmpresa: [],

      selectedregimenFiscal: 0,
      optionsregimenFiscal: [],

      selectedMetodoPago: 0,
      optionsMetodoPago: [],

      selectedFormaPago: 0,
      optionsFormaPago: [],
    };
  },
  created() {
    this.dataSess();
    this.getUsuario();
    this.getLada();
    this.getTipoCliente();
    this.getTipoPersona();
    this.getTipoEmpresa();
    this.getRegimenFiscal();
    this.getMetodoPago();
    this.getFormaPago();
  },

  methods: {
    dataSess() {
      let data = JSON.parse(localStorage.getItem('users'))
      for (let i = 0; i < data.length; i++) {
        this.idU = data[i].id;
        this.emailU = data[i].email;
        this.nombreU = data[i].nombre;
        this.username = data[i].username;
        this.tokenU = data[i].token;
        this.puestoU = data[i].puesto;
        this.permisos = data[i].permisos;
      }
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

    getTipoCliente() {
      axios.get(`/api/v1/tipo-cliente/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_tipo_cliente, text: response.data[i].descripcion }
            this.optionstipoCliente.push(dato)
          }

        }).catch((error) => {
          console.log(error);
        });
    },

    getTipoPersona() {
      axios.get(`/api/v1/tipo-persona/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_tipo_persona, text: response.data[i].descripcion }
            this.optionstipoPersona.push(dato)
          }

        }).catch((error) => {
          console.log(error);
        });
    },

    getTipoEmpresa() {
      axios
        .get(`/api/v1/tipo-empresa/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_tipo_empresa, text: response.data[i].descripcion }
            this.optionstipoEmpresa.push(dato)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getRegimenFiscal() {
      axios
        .get(`/api/v1/regimen-fiscal/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_regimen_fiscal, text: response.data[i].descripcion_completa }
            this.optionsregimenFiscal.push(dato)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMetodoPago() {
      axios
        .get(`/api/v1/metodo-pago/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_metodo_pago, text: response.data[i].descripcion_completa }
            this.optionsMetodoPago.push(dato)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getFormaPago() {
      axios
        .get(`/api/v1/forma-pago/`)
        .then((response) => {
          let dato = {}
          for (let i = 0; i < response.data.length; i++) {
            dato = { value: response.data[i].id_forma_pago, text: response.data[i].descripcion_completa }
            this.optionsFormaPago.push(dato)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUsuario() {
      const idU = this.idU

      axios({
        method: "get",
        url: `/api/v1/get-usuario/${idU}/`,
      }).then(res => {
        this.idUs = parseInt(res.data.id)
        this.nombre = res.data.nombre
        this.apellidos = res.data.apellidos
        this.usuario = res.data.login
        this.password = res.data.password
        this.telefono = res.data.movil
        this.email = res.data.email
        this.nombre_empresa = res.data.nombre_empresa
        this.rfc = res.data.rfc
        this.direccion_fiscal = res.data.direccion_fiscal
        this.pais_fiscal = parseInt(res.data.pais_fiscal)
        this.estado_fiscal = res.data.estado_fiscal
        this.ciudad_fiscal = res.data.ciudad_fiscal
        this.cp_fiscal = res.data.cp_fiscal
        this.calle_fiscal = res.data.calle_fiscal
        this.numero_exterior_fiscal = res.data.numero_exterior_fiscal
        this.numero_interior_fiscal = res.data.numero_interior_fiscal
        this.comprobante_domicilio_fiscal = res.data.comprobante_domicilio_fiscal
        this.estado_cuenta = res.data.estado_cuenta
        this.selectedtipoPersona = parseInt(res.data.tipo_persona)
        this.selectedtipoCliente = parseInt(res.data.tipo_cliente)
        this.selectedtipoEmpresa = parseInt(res.data.tipo_empresa)
        this.selectedregimenFiscal = parseInt(res.data.regimen_fiscal)
        this.selectedMetodoPago = parseInt(res.data.metodo_pago)
        this.selectedFormaPago = parseInt(res.data.forma_pago)

        if (this.pais_fiscal == 2) {
          this.pais_nombre_fiscal = 'México'
        } else {
          this.pais_nombre_fiscal = 'Estados Unidos'
        }

        this.direccion_fiscal = this.pais_nombre_fiscal + ", " + this.estado_fiscal + ", " + this.ciudad_fiscal + ", " + this.cp_fiscal

        if (res.data.comprobante_domicilio_fiscal != '') {
          this.comprobante_domicilio_fiscal_url = this.$store.state.myFiles + 'media/docs/' + res.data.id + '/' + res.data.comprobante_domicilio_fiscal
          axios({
            url: this.comprobante_domicilio_fiscal_url,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const pdfViewer = document.getElementById('comprobante_domicilio');
            pdfViewer.src = fileURL;
          });
        }

        if (res.data.estado_cuenta != '') {
          this.estado_cuenta_url = this.$store.state.myFiles + 'media/docs/' + res.data.id + '/' + res.data.estado_cuenta

          axios({
            url: this.estado_cuenta_url,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const pdfViewer = document.getElementById('estado_cuenta');
            pdfViewer.src = fileURL;
          });
        }

      });
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

    getLabelAddress(item) {
      if (item != null && item != "") {
        let idpais = parseInt(item.pais_id);
        let pais = item.pais_name;
        let idestado = parseInt(item.estado_id);
        let estado = item.estado_name;
        let ciudad = item.municipio;
        let colonia = item.asentamiento;
        let cp = item.codigo_postal;

        if (pais != undefined && pais != null && pais != "") {
          this.direccion_fiscal = "";

          this.pais_fiscal = pais
          this.estado_fiscal = estado
          this.ciudad_fiscal = ciudad
          this.cp_fiscal = cp
          this.direccion_fiscal = pais + ", " + estado + ", " + ciudad + ", " + cp;

        }
      }
    },

    buscaDireccion(text) {
      let input = text;

      if (input.length >= 5) {
        axios({
          method: "post",
          url: "/api/v1/search-address/",
          data: {
            data: input,
          },
        }).then((response) => {
          this.dates_search_address = response.data;
        }).catch((error) => {
          console.log(error);
        });
      }
    },

    handleFileInputChange(event) {
      this.urlImg = ''
      this.selectedFile = event.target.files[0];
      this.imgView = window.URL.createObjectURL(this.selectedFile)
    },

    generateUniqueImageName(originalName) {
      // Generar un nombre único para la imagen
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 15);
      const uniqueName = `${timestamp}_${randomString}_${originalName}`;
      return uniqueName;
    },

    getCSRF() {
      axios.get('/api/v1/getCSRF/')
        .then(response => {
          this.csrfToken = response.data.csrfToken;
          console.log(this.csrfToken)
          // Utiliza el token CSRF en tus solicitudes POST posteriores
        })
        .catch(error => {
          console.error('Error al obtener el token CSRF:', error);
        });
    },

    Save() {
      
      if (!this.username) {
        Swal.fire({
          title: "Usuario Incorrecto",
          text: "El usuario no debe de quedar vacío.",
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

      if (!EmailValido) {
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

      if(this.selectedtipoCliente <= 0 ){
        Swal.fire({
          title: "Tipo de Cliente",
          text: "Por favor selecciona que tipo de cliente eres.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.selectedtipoPersona <= 0 ){
        Swal.fire({
          title: "Tipo de Persona",
          text: "Por favor selecciona que tipo de persona fiscal eres.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.nombre_empresa == '' ){
        Swal.fire({
          title: "Nombre de la Empresa",
          text: "Por favor ingresa el nombre de la empresa.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.selectedtipoEmpresa <= 0 ){
        Swal.fire({
          title: "Tipo de Empresa",
          text: "Por favor selecciona el tipo de empresa.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.rfc == '' ){
        Swal.fire({
          title: "RFC",
          text: "El RFC no debe de ir vacío.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.selectedregimenFiscal <= 0 ){
        Swal.fire({
          title: "Regimen Fiscal",
          text: "Por favor selecciona un Régimen Fiscal.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.selectedMetodoPago <= 0 ){
        Swal.fire({
          title: "Método de Pago",
          text: "Por favor selecciona un Método de Pago.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.selectedFormaPago <= 0 ){
        Swal.fire({
          title: "Forma de Pago",
          text: "Por favor selecciona una Forma de Pago.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false
      }

      if(this.estado_cuenta == '' && this.comprobante_domicilio_fiscal == ''){
        Swal.fire({
          title: 'Debes seleccionar al menos un documento PDF.',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      Swal.fire({
        title: "Guardando Información",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      if(this.estado_cuenta == ''){
        this.estado_cuenta = null
      }

      if(this.comprobante_domicilio_fiscal == ''){
        this.comprobante_domicilio_fiscal = null
      }

      const formData = new FormData();

        formData.append('id', this.idUs);
        formData.append('phone', this.telefono);
        formData.append('name', this.nombre);
        formData.append('lastname', this.apellidos);
        formData.append('email', this.email);
        formData.append('pass', this.password);

        formData.append('tipo_cliente', this.selectedtipoCliente);
        formData.append('tipo_persona', this.selectedtipoPersona);
        formData.append('nombre_empresa', this.nombre_empresa);
        formData.append('tipo_empresa', this.selectedtipoEmpresa);
        formData.append('rfc', this.rfc);
        formData.append('regimen_fiscal', this.selectedregimenFiscal);
        formData.append('metodo_pago', this.selectedMetodoPago);
        formData.append('forma_pago', this.selectedFormaPago);

        formData.append('pais_fiscal', this.pais_fiscal);
        formData.append('estado_fiscal', this.estado_fiscal);
        formData.append('ciudad_fiscal', this.ciudad_fiscal);
        formData.append('cp_fiscal', this.cp_fiscal);
        formData.append('calle_fiscal', this.calle_fiscal);
        formData.append('numero_exterior_fiscal', this.numero_exterior_fiscal);
        formData.append('numero_interior_fiscal', this.numero_interior_fiscal);

        formData.append('estado_cuenta', this.estado_cuenta);
        formData.append('comprobante_domicilio_fiscal', this.comprobante_domicilio_fiscal);


      axios({
        method: "post",
        url: `/api/v1/editUsuario/`,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: "admin",
          password: "123",
        },
      }).then((response) => {
        console.log(response.data)
        if (response.data[0].validate) {
          Swal.fire({
            title: "Datos de Usuario",
            text: response.data[0].msg,
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/miCuenta";
            }
          })
        } else {
          Swal.fire({
            title: "Error" + error,
            text: response.data[0].msg + ' Error:' + error,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }).catch((error) => {
        Swal.fire({
          title: "Ocurrio un error al intentar guardar la oferta. " + error,
          text: "",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      });

    },

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    estadoCuentaPDF(event) {
      this.estado_cuenta = event.target.files[0];
    },

    comprobanteDomicilioPDF(event) {
      this.comprobante_domicilio_fiscal = event.target.files[0];
    }

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
            <b-row>
              <b-col md="4" sm="12">
                <h5 class="header-title">Información de Usuario</h5>
              </b-col>
              <b-col md="4" sm="12"></b-col>
              <b-col md="4" sm="12">
                <div class="text-center">
                  <b-button id="boton" class="sm secondary" href="/"><i class="fas fa-arrow-left"></i> Regresar</b-button>
                </div>
              </b-col>
            </b-row>
            <br>
            <div>
              <b-tabs content-class="mt-1" nav-class="nav-tabs nav-bordered">
                <b-tab title="Mi Cuenta" active>
                  <b-row>
                    <div class="col-12">
                      <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="userName">Nombre de Usuario</label>
                        <div class="col-md-9">
                          <input id="username" type="text" class="form-control" name="username" placeholder="Usuario"
                            v-model="username" @change="validaUsuario" autocomplete="off" />
                          <sub v-if="textAccept != ''" style="color:#2aab5c">{{ textAccept }}<i
                              class="fe-check"></i></sub>
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
                            <b-form-input class="col-md-9" placeholder="5500112233" id="telefono" type="number"
                              v-model="telefono"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Mis Datos">
                  <b-row>
                    <div class="col-12">
                      <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="name">Nombre</label>
                        <div class="col-md-9">
                          <input type="text" name="name" class="form-control" placeholder="Francisco" v-model="nombre"
                            autocomplete="off" />
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="surname">Apellidos</label>
                        <div class="col-md-9">
                          <input type="text" name="surname" class="form-control" placeholder="Perez" v-model="apellidos"
                            autocomplete="off" />
                        </div>
                      </div>

                      <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="email">Correo</label>
                        <div class="col-md-9">
                          <input type="email" name="email" class="form-control" placeholder="frankPerez@hotmail.com"
                            v-model="email" autocomplete="off" />
                        </div>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Mi Información Fiscal">
                  <b-row>
                    <div class="col-12">
                      <div class="form-group row mb-3">
                        <b-col md="3">
                          <b-form-group>
                            <label><b>Tipo de Cliente:</b></label>
                            <b-form-radio-group v-model="selectedtipoCliente" :options="optionstipoCliente">
                            </b-form-radio-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group>
                            <label><b>Tipo de Persona:</b></label>
                            <b-form-radio-group v-model="selectedtipoPersona" :options="optionstipoPersona">
                            </b-form-radio-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group>
                            <label><b>Nombre de la Empresa:</b></label>
                            <input type="text" name="nombre_empresa" class="form-control" placeholder="Interland"
                              v-model="nombre_empresa" autocomplete="off" />
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
                            <input type="text" name="rfc" class="form-control" placeholder="" v-model="rfc"
                              autocomplete="off" />
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group>
                            <label><b>Regimen Fiscal:</b></label>
                            <b-form-select v-model="selectedregimenFiscal"
                              :options="optionsregimenFiscal"></b-form-select>
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
                  </b-row>
                </b-tab>
                <b-tab title="Mi Domicilio Fiscal">
                  <b-row>
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
                              <div class="_3vCdC7UlpoMI8zyS9070Tm"
                                style="width: 100% !important; border-radius: 10px !important;">
                                <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                  <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                  <template>
                                    <v-autocomplete
                                      :input-attrs="{ autocomplete: 'none', placeholder: 'Pais, Estado, Ciudad, CP', id: 'origenAdicional', }"
                                      input-class="_1igQJzeY95hxUNao_yIXrr" :items="dates_search_address"
                                      :v-model="direccion_fiscal" :value="direccion_fiscal" @input="getLabelAddress"
                                      :component-item="templateAddress" @update-items="buscaDireccion"
                                      :auto-select-one-item="false" return-object>
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
                              <div class="_3vCdC7UlpoMI8zyS9070Tm"
                                style="width: 100% !important; border-radius: 10px !important;">
                                <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                  <i class="fas fa-road"></i>
                                </div>
                                <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                  <template>
                                    <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="calle_fiscal" type="text"
                                      placeholder="Calle" />
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
                              <div class="_3vCdC7UlpoMI8zyS9070Tm"
                                style="width: 100% !important; border-radius: 10px !important;">
                                <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                  <i class="fas fa-hashtag"></i>
                                </div>
                                <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                  <template>
                                    <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="numero_exterior_fiscal"
                                      type="text" placeholder="Número Exterior" />
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
                              <div class="_3vCdC7UlpoMI8zyS9070Tm"
                                style="width: 100% !important; border-radius: 10px !important;">
                                <div class="_2OKKnWa2I26FDFjQGrMlTi" style="color: #2aab5c">
                                  <i class="fas fa-hashtag"></i>
                                </div>
                                <div class="_1AsJdz8ef0grzhKgIpVifh _3GaS1vq0RCqjdAKKZ5HaLJ">
                                  <template>
                                    <input class="_1igQJzeY95hxUNao_yIXrr" v-model.trim="numero_interior_fiscal"
                                      type="text" placeholder="Número Interior" />
                                  </template>
                                </div>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Mis Documentos">
                  <b-row>
                    <div class="col-6">
                      <label class="col-md-12 col-form-label" for="surname">Estado de Cuenta</label>
                      <div style="padding-bottom:7px;">
                        <iframe v-if="estado_cuenta_url != ''" id="estado_cuenta" width="100%" height="500"></iframe>
                      </div>
                      <br>
                      <b-form-file placeholder="Selecciona un documento pdf o arrastralo aquí..."
                        drop-placeholder="Arrastra el pdf aquí..." @change="estadoCuentaPDF($event)" accept=".pdf"
                        browse-text="Buscar Archivo"></b-form-file>
                    </div>
                    <div class="col-6">
                      <label class="col-md-12 col-form-label" for="surname">Comprobante de Domicilio</label>
                      <div style="padding-bottom:7px;">
                        <iframe v-if="comprobante_domicilio_fiscal_url != ''" id="comprobante_domicilio" width="100%" height="500"></iframe>
                      </div>
                      <br>
                      <b-form-file placeholder="Selecciona un documento pdf o arrastralo aquí..."
                        drop-placeholder="Arrastra el pdf aquí..." @change="comprobanteDomicilioPDF($event)" accept=".pdf"
                        browse-text="Buscar Archivo"></b-form-file>
                    </div>
                  </b-row>
                </b-tab>
              </b-tabs>
              <br>
              <b-row>
                    <b-col md="4" sm="12"></b-col>
                    <b-col md="4" sm="12">
                      <div style="text-align: center;">
                        <b-button id="boton" style="background-color: #056736; color:white" class="btn-sm" @click="Save">
                          <i class="fe-save"></i> Guardar Información</b-button>
                      </div>
                    </b-col>
                    <b-col md="4" sm="12"></b-col>
                  </b-row>
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

body ._3wHay473hXYPOlphbqvMW6._1pk_-C20zpknwxqZLn_t9z svg+span {
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
}</style>