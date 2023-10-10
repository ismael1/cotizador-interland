<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

//agregado 260621
import ItemTemplate from '@/components/ItemTemplateSearch'

/**
 * Basic Tables component
 */
export default {
  page: {
    title: "edit Customer",
    meta: [{ name: "editCustomer", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    
    return {

      dates_search: [],
      template_div: ItemTemplate,
      //agregado 280621
      dates_search_cpo:[],
      dates_search_cpd:[],

      
      title: "Editar Proveedor",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Proveedor",
          href: "/provider",
        },
        {
          text: "Editar",
          href: "/editProvider",
          active: true,
        },
      ],

      //agregado 280621
      cpModel:'',
      cp: "",
      activoCP: false,
      activoCP_2: true,


      valorCp:"",

      form: {
        email: "",
        lada: "",
        telefono: "",
        name: "",
        estatus: "",

        pais: "",
        estado: "",
        ciudad: "",
        localidad: "",
        calle: "",
        noInterior: "",
        noExterior: "",
        name: "",
        typeEmpresa: "",
        rfc: "",
        taxid: "",
        idCustomer: 0,

        usoCFDI: "",
        formaPago: "",
        metodoPago: "",
        area: "",

        nombreContacto: "",
        apellidosContacto: "",
        ladaContacto: "",
        telefonoContacto: "",
        emailContacto: "",
        estatus: "",
        slug: "",

        contFiscal: "",
        constSF: "",
        compDomcilio: "",
        compIdentificacion: "",
        statuspdf: "",

        noEmpleados: "",
        giroEmpresa: "",
        specification: "",
        conditions: "",
        paydaysweeks: "",
        generalnotesweeks: "",
        paydaysdate: "",
        generalnotesdate: "",
        creditdays: "",
        credit: "",
        amount: "",
        idComplementario: 0,

        //agregado ismael 020621
        paisRutaO: "",
        estadoRutaO: "",
        ciudadRutaO: "",
        paisRutaD: "",
        estadoRutaD: "",
        ciudadRutaD: "",
      },

      //modificado 280621
      cpRutaO: "",
      cpRutaD: "",


      countrys: [],
      estates: [],
      empresas: [],
      usosCFDI: [],
      formasPago: [],
      metodosPago: [],
      areas: [],
      all_contacts: [],

      all_files: [],
      fileDetails: "",
      customer: [],
      business: [],
      ladas: [],

      filesDiv: "",
      BASE64_MARKER: ";base64,",

      pBase: 0,
      pInformacion: 0,
      pDatosFiscales: 0,
      pArchivos: 0,
      countpdf: 0,
      pContactos: 0,
      pDatos: 0,

      idPDF: 0,
      idother: 0,
      vsolicitud: 1, //Cambiar a 1 para Mostrar Solicitud de Credito
      vcredit: 0,
      vaccept: 0,
      vpay: 0, //Muestra por Defecto Pago por Semana

      statusweek: "false", //Cambiar Estatus de Pago por Semana
      statusdate: "false", //Cambiar Estatus de Pago por Fecha

      palabra_a_buscar: "",
      zipcodes_search: {},
      all_routes: [], //agregado ismael 030621
      estatesRO: [],
      estatesRD: [],

      statuscredito: "false", // Cambiar Estado Solicitar Credito

    };
  },
  created() {
    this.getCustomer();
    this.getDatosComplementarios();
    // this.gettal();
    this.getContry();
    this.getTypeEmpresa();
    this.getUsoCFDI();
    this.getFormaPago();
    this.getMetodoPago();
    this.getAreas();
    this.listFiles();
    this.getBusiness();
    this.getLada();

    this.listRutas();
  },

  methods: {

    //agregar 280621    
    cambiarCodigoPostal(){
      this.activoCP=true
      this.activoCP_2=false
    },

    getLabel (item) {
      if(item){
        this.form.estado= item.estado_id
        this.form.ciudad = item.municipio
        this.cp=item.codigo_postal

        return item.codigo_postal        
      }else{
        this.form.estado= ''
        this.form.ciudad = ''
      }
    },
    updateItems (text) {
      let paisOD = this.form.pais
      let input= text

      if (paisOD > 0) {        
        axios({
          method: "post",
          url: "/api/v1/search-zipcode/",
          data: {
            data: input,
            pais: paisOD,
          },
        })
        .then((response) => {
          this.dates_search=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },

    //agregado 280621
    getLabel_cpo (item) {
      if(item){
        this.form.estadoRutaO= item.estado_id
        this.form.ciudadRutaO = item.municipio
        // this.cp=item.codigo_postal
        return item.codigo_postal        
      }else{
        this.form.estadoRutaO= ''
        this.form.ciudadRutaO = ''
      }
    },

    updateItems_cpo (text) {
      let paisOD = this.form.paisRutaO
      let input= text

      if (paisOD > 0) {        
        axios({
          method: "post",
          url: "/api/v1/search-zipcode/",
          data: {
            data: input,
            pais: paisOD,
          },
        })
        .then((response) => {
          this.dates_search_cpo=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },

    getLabel_cpd (item) {
      if(item){
        this.form.estadoRutaD= item.estado_id
        this.form.ciudadRutaD = item.municipio
        // this.cp=item.codigo_postal
        return item.codigo_postal        
      }else{
        this.form.estadoRutaD= ''
        this.form.ciudadRutaD = ''
      }
    },
    updateItems_cpd (text) {
      let paisOD = this.form.paisRutaD
      let input= text

      if (paisOD > 0) {        
        axios({
          method: "post",
          url: "/api/v1/search-zipcode/",
          data: {
            data: input,
            pais: paisOD,
          },
        })
        .then((response) => {
          this.dates_search_cpd=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },

    //para la pruena de imagenes
    // getImageFile:function(e) {
    //     let file = e.target.files[0];
    //     this.form.goods_image = file;
    // },
    subirFile(opt) {
      const idC = document.getElementById("idCustomer").value;
      if (idC == 0) {

        Swal.fire({
          title: 'No se a completado la Seccion Base',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const v1 = document.getElementById("Fiscal").value;
      const v2 = document.getElementById("SF").value;
      const v3 = document.getElementById("Domicilio").value;
      const v4 = document.getElementById("Identificacion").value;

      let propFile = "";
      let tipoFile = "";

      if (opt == 1) {
        const input = document.getElementById("contFiscal");
        if (input.files && input.files[0]) propFile = input.files[0];
        tipoFile = "AC";

        if (v1 > 0) {
          document.getElementById("contFiscal").value = "";
        
          Swal.fire({
            title: 'Solo puedes subir un archivo',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (opt == 2) {
        const input = document.getElementById("constSF");
        if (input.files && input.files[0]) propFile = input.files[0];
        tipoFile = "CSF";

        if (v2 > 0) {
          document.getElementById("constSF").value = "";
          
          Swal.fire({
            title: 'Solo puedes subir un archivo',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (opt == 3) {
        const input = document.getElementById("compDomcilio");
        if (input.files && input.files[0]) propFile = input.files[0];
        tipoFile = "CD";

        if (v3 > 0) {
          document.getElementById("compDomcilio").value = "";
          
          Swal.fire({
            title: 'Solo puedes subir un archivo',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (opt == 4) {
        const input = document.getElementById("compIdentificacion");
        if (input.files && input.files[0]) propFile = input.files[0];
        tipoFile = "CI";

        if (v4 > 0) {
          document.getElementById("compIdentificacion").value = "";
          
          Swal.fire({
            title: 'Solo puedes subir un archivo',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      event.preventDefault();

      if (propFile == "") {
        return false;
      }

      const pkCustom = this.form.idCustomer;
      let formData = new FormData();
      formData.append("files_", propFile);
      formData.append("idCustomer", pkCustom);
      formData.append("tipo", tipoFile);

      axios
        .post("/api/v1/provider/addFiles/", formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          if (opt == 1) {
            document.getElementById("contFiscal").value = "";
            document.getElementById("Fiscal").value = "1";
          }

          if (opt == 2) {
            document.getElementById("constSF").value = "";
            document.getElementById("SF").value = "1";
          }
          if (opt == 3) {
            document.getElementById("compDomcilio").value = "";
            document.getElementById("Domicilio").value = "1";
          }
          if (opt == 4) {
            document.getElementById("compIdentificacion").value = "";
            document.getElementById("Identificacion").value = "1";
          }

          this.listFiles();

          Swal.fire({
            title: 'Correcto',
            text: '',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getArchivos() {
      this.pArchivos = 0;
      let p = 0;
      let tipo = [];
      let valido = [];

      for (p = 0; p < this.all_files.length; p++) {
        tipo = this.all_files[p].tipo;
        valido = this.all_files[p].statuspdf;
        if (tipo == "AC" && valido == 1) {
          document.getElementById("Fiscal").value = "1";
          this.pArchivos = this.pArchivos + 25;
        } else if (tipo == "CSF" && valido == 1) {
          document.getElementById("SF").value = "1";
          this.pArchivos = this.pArchivos + 25;
        } else if (tipo == "CD" && valido == 1) {
          document.getElementById("Domicilio").value = "1";
          this.pArchivos = this.pArchivos + 25;
        } else if (tipo == "CI" && valido == 1) {
          document.getElementById("Identificacion").value = "1";
          this.pArchivos = this.pArchivos + 25;
        }
      }
    },

    getCustomer() {
      const pkCustom = this.$route.params.pkProvider;

      axios
        .get(`/api/v1/provider/${pkCustom}/`)
        .then((response) => {
          //agregado verificar 270521
          this.customer = response.data;
          this.form.email = response.data.email;
          this.form.lada = response.data.lada;
          this.form.telefono = response.data.phone;
          this.form.pais = response.data.pais;


          if(this.form.pais =="" || this.form.pais == null){
          }else{
            this.getEstado(response.data.pais, 2);
          }

          this.cp = response.data.cp;
          this.form.ciudad = response.data.ciudad;
          this.form.localidad = response.data.colonia;
          this.form.calle = response.data.calle;
          this.form.noInterior = response.data.noInterior;
          this.form.noExterior = response.data.noExterior;
          this.form.name = response.data.name;
          this.form.typeEmpresa = response.data.tipoEmpresa;
          this.form.rfc = response.data.rfc;
          this.form.taxid = response.data.taxID;
          this.form.usoCFDI = response.data.usoCfdi;
          this.form.formaPago = response.data.formaPago;
          this.form.metodoPago = response.data.metodoPago;

          this.form.idCustomer = response.data.id;
          this.form.estado = response.data.estado;

          //verificar datos
          this.form.estatus = response.data.estatus;
          this.form.slug = response.data.slug;
          this.pBase = 100;
          this.getPorcentajeInformation()
          this.getPorcentajeDatosFiscales()
          this.getPorcentajeComplementarios()
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getContry() {
      axios
        .get(`/api/v1/list-country/`)
        .then((response) => {
          this.countrys = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEstado(event, opt) {
      let pkPais = 0;

      if (opt == 1) {
        pkPais = event.target.value;
      }
      if (opt == 2) {
        pkPais = event;
      }

      if (pkPais == 2) {
        //mxn
        document.getElementById("rfc").readOnly = false;
        document.getElementById("div_taxid_1").style.display = "none";

        this.form.rfc = "";
        this.form.taxid = "";
      } else {
        //para otros paise
        document.getElementById("rfc").readOnly = true;
        document.getElementById("div_taxid_1").style.display = "inline-flex";
        this.form.rfc = "XEXX010101000";
        this.form.taxid = "";
      }

      axios
        .get(`/api/v1/list-estates/${pkPais}/`)
        .then((response) => {
          this.estates = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTypeEmpresa() {
      axios
        .get(`/api/v1/list-empresa/`)
        .then((response) => {
          this.empresas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsoCFDI() {
      axios
        .get(`/api/v1/list-usocfdi/`)
        .then((response) => {
          this.usosCFDI = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFormaPago() {
      axios
        .get(`/api/v1/list-formapago/`)
        .then((response) => {
          this.formasPago = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMetodoPago() {
      axios
        .get(`/api/v1/list-metodopago/`)
        .then((response) => {
          this.metodosPago = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAreas() {
      axios
        .get(`/api/v1/list-areas/`)
        .then((response) => {
          this.areas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    save1() {
      let vCorreo = this.form.email;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(vCorreo);
      let vLada = this.form.lada;
      let vTelefono = this.form.telefono;

      if (vCorreo == "" || vCorreo == null) {

        Swal.fire({
          title: 'Ingrese Email',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vLada == "" || vLada == null) {

        Swal.fire({
          title: 'Seleccione Lada',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefono == "" || vTelefono == null) {

        Swal.fire({
          title: 'Ingrese Telefono',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (EmailValido == true) {
      } else {

        Swal.fire({
          title: 'Email no Valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (vTelefono.length < 10) {

        Swal.fire({
          title: '10 Digitos Minimos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefono.length > 16) {

        Swal.fire({
          title: '16 Digitos Maximo',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const idC = document.getElementById("idCustomer").value;
      if (this.form.email) {
        event.preventDefault();

        axios({
          method: "put",
          url: `proveedores/${this.form.idCustomer}/`,
          data: {
            email: this.form.email,
            lada: this.form.lada,
            phone: this.form.telefono,
            name: this.form.name,
            estatus: this.form.estatus,
            slug: this.form.slug,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.form.email = response.data.email;
            this.form.lada = response.data.lada;
            this.form.telefono = response.data.phone;
            //   this.form.idCustomer= response.data.id
            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    save2() {
      let vPais = this.form.pais;
      let vEstado = this.form.estado;

      let vCP = this.cpModel.codigo_postal;
      // let vCP = document.getElementById("cp").value;
      let vCiudad = this.form.ciudad;
      let vCalle = this.form.calle;
      let vName = this.form.name;
      let vEmpresa = this.form.typeEmpresa;
      let vRFC = this.form.rfc;
      let vTaxid = this.form.taxid;

      if (vPais == "" || vPais == null) {

        Swal.fire({
          title: 'Seleccione Pais',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vEstado == "" || vEstado == null) {

        Swal.fire({
          title: 'Seleccione Estado',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vCP == "" || vCP == null) {

        Swal.fire({
          title: 'Ingrese Codigo Postal',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vCiudad == "" || vCiudad == null) {

        Swal.fire({
          title: 'Ingrese Ciudad/Municipio',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vCalle == "" || vCalle == null) {

        Swal.fire({
          title: 'Ingrese Calle',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vName == "" || vName == null) {

        Swal.fire({
          title: 'Ingrese Nombre o Razon Social',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vEmpresa == "" || vEmpresa == null) {

        Swal.fire({
          title: 'Selecciona Tipo de Empresa',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vRFC == "" || vRFC == null) {

        Swal.fire({
          title: 'Ingrese RFC',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vPais == 1) {

        if (vTaxid == "" || vTaxid == null) {

          Swal.fire({
            title: 'Ingrese Tax ID',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (vPais == 2) {
        
        if (vRFC.length < 12) {
          swal({
            title: "RFC minimo de 12 Digitos",
            text: "",
            icon: "error",
            button: "Cerrar",
          });
          return false;

        } else if (vRFC > 13) {

          Swal.fire({
            title: 'RFC maximo de 13 Digitos',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (vCP.length < 5) {

        Swal.fire({
          title: 'Minimo 5 Digitos para Codigo Postal',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const idC = document.getElementById("idCustomer").value;

      if (idC > 0) {
        if (this.form.name) {
          event.preventDefault();

          axios({
            method: "put",
            url: `proveedores/${this.form.idCustomer}/`,
            data: {
              pais: this.form.pais,
              estado: this.form.estado,
              // cp: this.cp,
              cp: vCP,

              ciudad: this.form.ciudad,
              colonia: this.form.localidad,
              calle: this.form.calle,
              noInterior: this.form.noInterior,
              noExterior: this.form.noExterior,
              name: this.form.name,
              tipoEmpresa: this.form.typeEmpresa,
              rfc: this.form.rfc,
              taxID: this.form.taxid,
              id: this.form.idCustomer,
              estatus: "vigente",
              slug: "slug",
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              this.form.pais = response.data.pais;
              this.form.estado = response.data.estado;

              //agregado 280621
              this.activoCP=false
              this.activoCP_2=true

              this.cp = response.data.cp;
              // document.getElementById("cp").value = response.data.cp;

              this.form.ciudad = response.data.ciudad;
              this.form.localidad = response.data.colonia;
              this.form.calle = response.data.calle;
              this.form.noInterior = response.data.noInterior;
              this.form.noExterior = response.data.noExterior;
              this.form.name = response.data.name;
              this.form.typeEmpresa = response.data.tipoEmpresa;
              this.form.rfc = response.data.rfc;
              this.form.taxid = response.data.taxID;

              this.getPorcentajeInformation()

              Swal.fire({
                title: 'Correcto',
                text: '',
                icon: 'success',
                confirmButtonText: 'Cerrar',
              })
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    save3() {
      let vCFDI = this.form.usoCFDI;
      let vFormaPago = this.form.formaPago;
      let vMetodoPago = this.form.metodoPago;

      if (vCFDI == "" || vCFDI == null) {

        Swal.fire({
          title: 'Seleccione CFDI',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false

      } else if (vFormaPago == "" || vFormaPago == null) {

        Swal.fire({
          title: 'Seleccione Forma de Pago',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false

      } else if (vMetodoPago == "" || vMetodoPago == null) {

        Swal.fire({
          title: 'Seleccione Metodo de Pago',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false

      }

      const idC = document.getElementById("idCustomer").value;

      if (idC > 0) {
        event.preventDefault();
        axios({
          method: "put",
          // url: 'customers/',
          url: `proveedores/${this.form.idCustomer}/`,
          data: {
            usoCfdi: this.form.usoCFDI,
            formaPago: this.form.formaPago,
            metodoPago: this.form.metodoPago,
            id: this.form.idCustomer,
            name: this.form.name,
            estatus: "vigente",
            slug: "slug",
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.form.usoCFDI = response.data.usoCfdi;
            this.form.formaPago = response.data.formaPago;
            this.form.metodoPago = response.data.metodoPago;

            getPorcentajeDatosFiscales()
            
            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })

            this.pDatosFiscales = 100;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    save5() {
      let vArea = this.form.area;
      let vNombre = this.form.nombreContacto;
      let vApellidoContacto = this.form.apellidosContacto;
      let vLadaContacto = this.form.ladaContacto;
      let vTelefonoContacto = this.form.telefonoContacto;
      let vEmailContacto = this.form.emailContacto;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(vEmailContacto);

      if (vArea == "" || vArea == null) {

        Swal.fire({
          title: 'Selecciona un Area',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vNombre == "" || vNombre == null) {

        Swal.fire({
          title: 'Ingrese Nombre de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vApellidoContacto == "" || vApellidoContacto == null) {

        Swal.fire({
          title: 'Ingrese Apellido de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vLadaContacto == "" || vLadaContacto == null) {

        Swal.fire({
          title: 'Seleccione Lada',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefonoContacto == "" || vTelefonoContacto == null) {

        Swal.fire({
          title: 'Ingrese Telefono de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vEmailContacto == "" || vEmailContacto == null) {

        Swal.fire({
          title: 'Ingrese Email de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (vTelefonoContacto.length < 10) {

        Swal.fire({
          title: '10 Digitos Minimos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefonoContacto.length > 16) {

        Swal.fire({
          title: '16 Digitos Maximo',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (EmailValido == true) {
      } else {

        Swal.fire({
          title: 'Email no Valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const idC = this.form.idCustomer;

      if (idC > 0) {
        event.preventDefault();
        axios({
          method: "post",
          url: "pcontacto/",
          data: {
            area: this.form.area,
            name: this.form.nombreContacto,
            lastname: this.form.apellidosContacto,
            lada: this.form.ladaContacto,
            phone: this.form.telefonoContacto,
            email: this.form.emailContacto,
            estatus: "1",
            customer_id: this.form.idCustomer.toString(),
            customer: this.form.idCustomer.toString(),
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.form.area = response.data.area;
            this.form.nombreContacto = response.data.name;
            this.form.apellidosContacto = response.data.lastname;
            this.form.ladaContacto = response.data.lada;
            this.form.telefonoContacto = response.data.phone;
            this.form.emailContacto = response.data.email;

            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })

            this.pContactos = 100;
            this.listContacto();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //funcion para listar contactos Ismael 260521
    listContacto() {
      this.form.area = 0;
      this.form.nombreContacto = "";
      this.form.apellidosContacto = "";
      this.form.telefonoContacto = "";
      this.form.emailContacto = "";
      this.form.idContact = 0;

      const parrafo = document.querySelector("#btnSave5");
      parrafo.style.display = "block";
      const parrafo2 = document.querySelector("#btnSave5_u");
      parrafo2.style.display = "none";

      const idC = this.$route.params.pkProvider;
      if (idC > 0) {
        axios
          .get(`/api/v1/provider-list-contacts/${idC}/`)
          .then((response) => {
            this.all_contacts = response.data;
            this.PorcentajeContactos();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //funcion editar Ismael 260521
    editContacto(id) {
      if (id > 0) {
        const parrafo = document.querySelector("#btnSave5");
        parrafo.style.display = "none";
        const parrafo2 = document.querySelector("#btnSave5_u");
        parrafo2.style.display = "block";

        axios
          .get(`/api/v1/contac-details/${id}/`)
          .then((response) => {
            // alert(response.area)
            console.log(response);
            this.form.area = response.data.area;
            this.form.nombreContacto = response.data.name;
            this.form.apellidosContacto = response.data.lastname;
            this.form.telefonoContacto = response.data.phone;
            this.form.emailContacto = response.data.email;
            this.form.idContact = response.data.id;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //funcion actualizar contacto Ismael 260521

    save5_update() {
      const parrafo = document.querySelector("#btnSave5");
      parrafo.style.display = "block";
      const parrafo2 = document.querySelector("#btnSave5_u");
      parrafo2.style.display = "none";

      let vArea = this.form.area;
      let vNombre = this.form.nombreContacto;
      let vApellidoContacto = this.form.apellidosContacto;
      let vLadaContacto = this.form.ladaContacto;
      let vTelefonoContacto = this.form.telefonoContacto;
      let vEmailContacto = this.form.emailContacto;
      let expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let EmailValido = expReg.test(vEmailContacto);

      if (vArea == "" || vArea == null) {

        Swal.fire({
          title: 'Selecciona un Area',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vNombre == "" || vNombre == null) {

        Swal.fire({
          title: 'Ingrese Nombre de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vApellidoContacto == "" || vApellidoContacto == null) {

        Swal.fire({
          title: 'Ingrese Apellido de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vLadaContacto == "" || vLadaContacto == null) {

        Swal.fire({
          title: 'Seleccione Lada',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefonoContacto == "" || vTelefonoContacto == null) {

        Swal.fire({
          title: 'Ingrese Telefono de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vEmailContacto == "" || vEmailContacto == null) {

        Swal.fire({
          title: 'Ingrese Email de Contacto',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (vTelefonoContacto.length < 10) {

        Swal.fire({
          title: '10 Digitos Minimos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      } else if (vTelefonoContacto.length > 16) {

        Swal.fire({
          title: '16 Digitos Maximo',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (EmailValido == true) {
      } else {

        Swal.fire({
          title: 'Email no Valido',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const idContact = this.form.idContact;

      event.preventDefault();
      axios({
        method: "put",
        url: `pcontacto/${this.form.idContact}/`,
        data: {
          id: this.form.idContact,
          area: this.form.area,
          name: this.form.nombreContacto,
          lastname: this.form.apellidosContacto,
          lada: this.form.ladaContacto,
          phone: this.form.telefonoContacto,
          email: this.form.emailContacto,
          estatus: "1",
          customer_id: this.form.idCustomer.toString(),
          customer: this.form.idCustomer.toString(),
        },
        auth: {
          username: "admin",
          password: "123",
        },
      })
        .then((response) => {
          this.form.area = "";
          this.form.nombreContacto = "";
          this.form.apellidosContacto = "";
          this.form.telefonoContacto = "";
          this.form.emailContacto = "";
          this.form.idContact = 0;

          this.listContacto();

          Swal.fire({
            title: 'Correcto',
            text: '',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //funcion para eliminar Ismael 260521
    deleteContact(id) {
      
      let contador = this.all_contacts.length;

      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro de Eliminar Contacto',
        text: "Al Eliminar Contacto no Podra ser Recuperado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {


          if (contador == 1) {
            this.pContactos = 0;
          }

          axios({
            method: "delete",
            url: `pcontacto/${id}/`,
            auth: {
              username: "admin",
              password: "123",
            },
          })
          .then((response) => {
            if (response) {
              this.listContacto();
              swal({
                title: "Contacto Eliminado",
                text: "",
                icon: "success",
                button: "Cerrar",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });

          swalWithBootstrapButtons.fire(
            'Eliminado',
            'Contacto Eliminado Exitosamente',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Eliminacion Cancelada',
            'error'
          )
        }
      })

    },

    //listado de archivos ismael 260521
    listFiles() {
      const idC = this.$route.params.pkProvider;
      axios
        .get(`/api/v1/provider-list-files/${idC}/`)
        .then((response) => {
          this.all_files = response.data;
          this.getArchivos();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteFiles(id) {

      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro de Eliminar Archivo',
        text: "Al Eliminar Archivo no Podra ser Recuperado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          axios({
            method: "delete",
            url: `pfiles/${id}/`,
            auth: {
              username: "admin",
              password: "123",
            },
          })
          .then((response) => {
            if (response) {
              this.listFiles();
            }
          })
          .catch((error) => {
            console.log(error);
          });

              swalWithBootstrapButtons.fire(
                'Eliminado',
                'Archivo Eliminado Exitosamente',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Eliminacion Cancelada',
                'error'
              )
            }
          })

    },

    showFiles(idFile) {

      let formData = new FormData();
      formData.append("idFile", idFile);

      axios
        .post("/api/v1/provider/showpDF/", formData, {
          responseType: "application/pdf"
        })
        .then((response) => {
          
          let routeUrl= response.data;
          window.open(routeUrl, '_blank')
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getConfirmarPDF(idFile) {
      let idFiles = idFile;
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Confirmar PDF',
        text: "Si Aceptas tu Archivo PDF ya no Podra Eliminarlo/Editarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar, PDF',
        cancelButtonText: 'Cancelar, PDF',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          axios({
            method: "put",
            url: `pfiles/${idFiles}/`,
            data: {
              statuspdf: 1,
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
            .then((response) => {
              if (response) {
                this.listFiles();
                this.pArchivos = this.pArchivos + 25;
              }
            })
            .catch((error) => {
              console.log(error);
            });

          swalWithBootstrapButtons.fire(
            'Confirmacion!',
            'Archivo PDF Confirmado Exitosamente',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Archivo PDF Cancelado Exitosamente',
            'error'
          )
        }
      })

    },

    getDatosComplementarios() {
      const idC = this.$route.params.pkProvider;
      axios
        .get(`/api/v1/provider-list-datacomplementary/${idC}/`)
        .then((response) => {
          this.form.idComplementario = response.data.id;
          this.form.noEmpleados = response.data.numbersemployes;
          this.form.giroEmpresa = response.data.business;
          this.form.business = response.data.id;
          this.form.idcustomer = response.data.customer;
          this.form.specification = response.data.specification;
          this.form.conditions = response.data.conditions;
          this.form.paydaysweeks = response.data.paydaysweeks;
          this.form.generalnotesweeks = response.data.generalnotesweeks;
          this.form.paydaysdate = response.data.paydaysdate;
          this.form.generalnotesdate = response.data.generalnotesdate;
          this.form.creditdays = response.data.creditdays;
          this.form.credit = response.data.credit;
          this.form.amount = response.data.amount;
          this.pDatos = 100;
          this.getPagos();
          this.Credit();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPagos() {
      const vPagoSemana = this.form.paydaysweeks;
      const vPagoFecha = this.form.paydaysdate;

      if (vPagoSemana > "") {
        this.vpay = 1;
        this.statusweek = true;
      }
      if (vPagoFecha > "") {
        this.vpay = 2;
        this.statusdate = true;
      }
    },

    save6(valor) {
      const idC = document.getElementById("idCustomer").value;

      let semana = this.statusweek;
      let fecha = this.statusdate;

      let opt = document.getElementById("other").value;
      let vNoEmpleados = this.form.noEmpleados;
      let vGiroEmpresa = this.form.giroEmpresa;
      let vSpecification = this.form.specification;
      let vConditions = this.form.conditions;
      let vFecha = this.form.paydaysdate;
      let vFechaNota = this.form.generalnotesdate;
      let vSemana = this.form.paydaysweeks;
      let vSemanaNota = this.form.generalnotesweeks;

      if (vNoEmpleados == "" || vNoEmpleados == null) {

        Swal.fire({
          title: 'Ingrese Número de Empleados',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if ((vGiroEmpresa = "" || vGiroEmpresa == null)) {

        Swal.fire({
          title: 'Seleccione el Giro de su Empresa',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if (opt == 35) {
        if (vSpecification == "" || vSpecification == null) {

          Swal.fire({
            title: 'Ingrese Especificaciones',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (vConditions == "" || vConditions == null) {

        Swal.fire({
          title: 'Ingrese Condiciones',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (semana == "true") {
        if (vSemana == "" || vSemana == null) {

          Swal.fire({
            title: 'Selecciona una Semana',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
        if (vSemanaNota == "" || vSemanaNota == null) {

          Swal.fire({
            title: 'Ingresa Nota General',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      if (fecha == "true") {
        if (vFecha == "" || vFecha == null) {

          Swal.fire({
            title: 'Selecciona una Fecha',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
        if (vFechaNota == "" || vFechaNota == null) {

          Swal.fire({
            title: 'Ingresa Nota General',
            text: '',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          })
          return false;

        }
      }

      const update = this.form.idComplementario;

      if (update > 0) {
        let aceptar = valor;
        event.preventDefault();
        axios({
          method: "put",
          url: `pdatacomplementary/${this.form.idComplementario}/`,
          data: {
            numbersemployes: this.form.noEmpleados,
            business: this.form.giroEmpresa,
            specification: this.form.specification,
            conditions: this.form.conditions,
            paydaysweeks: this.form.paydaysweeks,
            generalnotesweeks: this.form.generalnotesweeks,
            paydaysdate: this.form.paydaysdate,
            generalnotesdate: this.form.generalnotesdate,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.form.noEmpleados = response.data.numbersemployes;
            this.form.giroEmpresa = response.data.business;
            this.form.idcustomer = response.data.customer;
            this.form.specification = response.data.specification;
            this.form.conditions = response.data.conditions;
            this.form.paydaysweeks = response.data.paydaysweeks;
            this.form.generalnotesweeks = response.data.generalnotesweeks;
            this.form.paydaysdate = response.data.paydaysdate;
            this.form.generalnotesdate = response.data.generalnotesdate;
            this.form.creditdays = response.data.creditdays;
            this.form.credit = response.data.credit;
            this.form.amount = response.data.amount;

            Swal.fire({
              title: 'Completado',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
            this.vsolicitud = aceptar;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        let aceptar = valor;
        event.preventDefault();
        axios({
          method: "post",
          url: "pdatacomplementary/",
          data: {
            numbersemployes: this.form.noEmpleados,
            business: this.form.giroEmpresa,
            specification: this.form.specification,
            conditions: this.form.conditions,
            paydaysweeks: this.form.paydaysweeks,
            generalnotesweeks: this.form.generalnotesweeks,
            paydaysdate: this.form.paydaysdate,
            generalnotesdate: this.form.generalnotesdate,
            customer: idC,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.form.noEmpleados = response.data.numbersemployes;
            this.form.giroEmpresa = response.data.business;
            this.form.idcustomer = response.data.customer;
            this.form.specification = response.data.specification;
            this.form.conditions = response.data.conditions;
            this.form.paydaysweeks = response.data.paydaysweeks;
            this.form.generalnotesweeks = response.data.generalnotesweeks;
            this.form.paydaysdate = response.data.paydaysdate;
            this.form.generalnotesdate = response.data.generalnotesdate;
            this.form.creditdays = response.data.creditdays;
            this.form.credit = response.data.credit;
            this.form.amount = response.data.amount;
            this.form.idComplementario = response.data.id;

            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
            this.vsolicitud = aceptar;
            this.pDatos = 100;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    Others(event) {
      let opt = event.target.value;
      const otros = document.getElementById("other").value;

      if (opt == 35) {
        this.idother = otros;
      } else {
        this.idother = otros;
      }
    },

    selectPayWeek(vpay, statusweek) {
      let validar = vpay;
      let estado = statusweek;

      if (validar == 1 || estado == false) {
        this.vpay = 1;
        this.statusweek = "true";
        this.statusdate = "false";
        this.form.paydaysdate = "";
        this.form.generalnotesdate = "";
      } else if (validar == 1 || estado == true) {
        this.vpay = 2;
        this.statusdate = "true";
        this.statusweek = "false";
      }
    },

    selectPayDate(vpay, statusdate) {
      let validar = vpay;
      let estado = statusdate;

      if (validar == 2 || estado == false) {
        this.vpay = 2;
        this.statusdate = "true";
        this.statusweek = "false";
        this.form.paydaysweeks = "";
        this.form.generalnotesweeks = "";
      } else if (validar == 2 || estado == true) {
        this.vpay = 2;
        this.statusdate = "false";
        this.statusweek = "true";
      }
    },

    validateCredit(vcredit) {
      let validar = vcredit;

      if (validar == 0) {
        this.vcredit = 1;
      } else {
        this.vcredit = 0;
      }
    },

    Aceptar(vaccept) {
      let validar = vaccept;
      if (validar == 0) {
        this.vaccept = 1;
      } else {
        this.vaccept = 0;
      }
    },

    getBusiness() {
      axios
        .get(`/api/v1/list-business/`)
        .then((response) => {
          this.business = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Enviar() {
      // Funcion para Enviar Solicitud David 040621

      // const idC = document.getElementById("idCustomer").value;
      //150621
      const idComplementary = this.form.idComplementario
      if (idComplementary>0){
      }else{
        Swal.fire({
          title: 'Es necesario llenar la primera parte',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Aceptar Solicitud de Credito?',
        text: "Al Aceptar la Solicitud de Credito no Podra ser Eliminada/Modificada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar, Solicitud de Credito',
        cancelButtonText: 'No, Rechazar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          let vSolicitudCredito = this.vsolicitud;
          let vCreditdays = this.form.creditdays;
          let vCredit = this.form.credit;
          let vAmount = this.form.amount;

          if (vSolicitudCredito == 1) {
            if (vCreditdays == "" || vCreditdays == null || vCreditdays <= 0) {

              Swal.fire({
                title: 'Ingresa Dias de Credito',
                text: '',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              })
              return false;

            }
            if (vCredit == "" || vCredit == null) {

              Swal.fire({
                title: 'Selecciona Tipo de Modena',
                text: '',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              })
              return false;

            }
            if (vAmount == "" || vAmount == null || vAmount <= 0) {

              Swal.fire({
                title: 'Ingresa la Cantidad del Monto',
                text: '',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              })
              return false;

            }
          }

          event.preventDefault();
          axios({
            method: "put",
            url: `pdatacomplementary/${this.form.idComplementario}/`,
            data: {
              creditdays: this.form.creditdays,
              credit: this.form.credit,
              amount: this.form.amount,
            },
            auth: {
              username: "admin",
              password: "123",
            },
          })
          .then((response) => {
            this.form.creditdays = response.data.creditdays;
            this.form.credit = response.data.credit;
            this.form.amount = response.data.amount;

            //se agrgeao verificar
            console.log("Correcto")
            this.enviarCorreo(response.data.id)

            // document.getElementById("terminos").hidden = true
            // document.getElementById("btnSolicitud").hidden = true   

          })
          .catch((error) => {
            console.log(error);
          });

          swalWithBootstrapButtons.fire(
            'Confirmado',
            'Solicitud de Credito Enviada Exitosamente',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelada',
            'Solicitud de Credito Rechazada',
            'error'
          )
        }
      })

    },
    // /para elnviar el correo
    enviarCorreo(input) {

      axios({
        method: "post",
        url: "/api/v1/senEmail/",
        data: {
          id: input,
        },
      })
      .then((response) => {
        // this.zipcodes_search = response.data
        console.log(response.data.msg)
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //fin par aenviar el correo

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

    convertDataURIToBinary(dataURI) {
      let base64Index =
        dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
      let base64 = dataURI.substring(base64Index);
      let raw = atob(base64);
      let rawLength = raw.length;
      let array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    },

    getEstadoRutaO(event) {
      //agregado ismael 020621
      let pkPais_o = 0;
      pkPais_o = event.target.value;

      axios
        .get(`/api/v1/list-estates/${pkPais_o}/`)
        .then((response) => {
          this.estatesRO = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEstadoRutaD(event) {
      //agregado ismael 020621

      let pkPais_d = 0;
      pkPais_d = event.target.value;

      axios
        .get(`/api/v1/list-estates/${pkPais_d}/`)
        .then((response) => {
          this.estatesRD = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveRC() {
      //agregado ismael 020621

      let paisRutaO_ = this.form.paisRutaO;

      let cpRutaO = this.cpRutaO.codigo_postal;
      // let cpRutaO = document.getElementById("cpRutaO").value;

      let estadoRutaO_ = this.form.estadoRutaO;
      let ciudadRutaO = this.form.ciudadRutaO;

      let paisRutaD_ = this.form.paisRutaD;
      let cpRutaD = this.cpRutaD.codigo_postal;
      // let cpRutaD = document.getElementById("cpRutaD").value;
      let estadoRutaD_ = this.form.estadoRutaD;
      let ciudadRutaD = this.form.ciudadRutaD;

      if (paisRutaO_ == "" || paisRutaO_ == "0") {

        Swal.fire({
          title: 'Seleccione un Pais Origen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if (estadoRutaO_ == "" || estadoRutaO_ == "0") {

        Swal.fire({
          title: 'Seleccione un Estado Origen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if (ciudadRutaO == "") {

        Swal.fire({
          title: 'Ingrese Ciudad/Municipio Origen',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      if (paisRutaD_ == "" || paisRutaD_ == "0") {

        Swal.fire({
          title: 'Seleccione un Pais Destino',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if (estadoRutaD_ == "" || estadoRutaD_ == "0") {

        Swal.fire({
          title: 'Seleccione un Estado Destino',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }
      if (ciudadRutaD == "") {

        Swal.fire({
          title: 'Ingrese Ciudad/Municipio Destino',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;

      }

      const idC = this.form.idCustomer;

      if (idC > 0) {
        event.preventDefault();
        axios({
          method: "post",
          url: "/prutas/",
          data: {
            paisOrigen: this.form.paisRutaO,
            estadoOrigen: this.form.estadoRutaO,
            // cpOrigen: this.cpRutaO,
            cpOrigen: cpRutaO,
            ciudadOrigen: this.form.ciudadRutaO,
            paisDestino: this.form.paisRutaD,
            estadoDestino: this.form.estadoRutaD,
            // cpDestino: this.cpRutaD,
            cpDestino: cpRutaD,
            ciudadDestino: this.form.ciudadRutaD,
            estatus: "1",
            customer_id: this.form.idCustomer.toString(),
            customer: this.form.idCustomer.toString(),
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            console.log(response);

            this.form.paisRutaO = "2";
            this.cpRutaO = "";
            // document.getElementById("cpRutaO").value = "";
            // document.getElementById("cpRutaO").text = "";

            this.form.estadoRutaO = "1";
            this.form.ciudadRutaO = "";
            this.form.paisRutaD = "2";
            this.cpRutaD = "";
            // document.getElementById("cpRutaD").value = "";
            // document.getElementById("cpRutaD").text = "";

            this.form.estadoRutaD = "1";
            this.form.ciudadRutaD = "";

            Swal.fire({
              title: 'Correcto',
              text: '',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })

            //llamar funcion llenaod tabla Ismael 260521
            this.listRutas();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: 'No se a completado la Seccion Base',
          text: '',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
        return false;
      }
    },

    listRutas() {
      const idC = this.$route.params.pkProvider;
      if (idC > 0) {
        axios
          .get(`/api/v1/provider-list-rutas/${idC}/`)
          .then((response) => {
            this.all_routes = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteRouter(id) {
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
          title: 'Eliminar Registro',
          text: "Estas Seguro de Eliminar este Registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {

            axios({
              method: "delete",
              url: `/prutas/${id}/`,
              auth: {
                username: "admin",
                password: "123",
              },
            })
            .then((response) => {
              if (response) {
                this.listRutas();
              }
            })
            .catch((error) => {
              console.log(error);
            });

            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Registro Eliminado Exitosamente',
              'success'
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Eliminar Registro Cancelado',
              'error'
            )
          }
        })

    },

    getautocomplit_r1(input) {
      //funcion para el autocomplit

      return new Promise((resolve) => {
        let idPaisO = this.form.paisRutaO;

        if (idPaisO > 0) {
          if (input.length < 3) {
            return resolve([]);
          }
          // event.preventDefault()
          axios({
            method: "post",
            url: "/api/v1/search-zipcode/",
            data: {
              data: input,
              pais: idPaisO,
            },
          })
            .then((response) => {
              // this.zipcodes_search = response.data
              // console.log(response.data)
              // resolve(response.data)
              const results = response.data.map((result, index) => {
                return { ...result, index };
              });
              resolve(results);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    getResultValue_r1(result) {
      return result.codigo_postal;
    },
    onSubmit_r1(result) {
      this.form.estadoRutaO = result.estado_id;
      this.form.ciudadRutaO = result.municipio;
    },

    getautocomplit_r2(input) {
      //funcion para el autocomplit

      return new Promise((resolve2) => {
        let idPaisD = this.form.paisRutaD;

        if (idPaisD > 0) {
          if (input.length < 3) {
            return resolve2([]);
          }
          // event.preventDefault()
          axios({
            method: "post",
            url: "/api/v1/search-zipcode/",
            data: {
              data: input,
              pais: idPaisD,
            },
          })
            .then((response) => {
              // this.zipcodes_search = response.data
              // console.log(response.data)
              // resolve(response.data)
              const results = response.data.map((result, index) => {
                return { ...result, index };
              });
              resolve2(results);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    getResultValue_r2(result) {
      return result.codigo_postal;
    },
    onSubmit_r2(result) {
      this.form.estadoRutaD = result.estado_id;
      this.form.ciudadRutaD = result.municipio;
    },

    getautocomplit_i(input) {
      //funcion para el autocomplit

      return new Promise((resolve3) => {
        let paisid = this.form.pais;

        if (paisid > 0) {
          if (input.length < 3) {
            return resolve3([]);
          }
          // event.preventDefault()
          axios({
            method: "post",
            url: "/api/v1/search-zipcode/",
            data: {
              data: input,
              pais: paisid,
            },
          })
            .then((response) => {
              // this.zipcodes_search = response.data
              // console.log(response.data)
              // resolve(response.data)
              const results = response.data.map((result, index) => {
                return { ...result, index };
              });
              resolve3(results);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    getResultValue_i(result) {
      return result.codigo_postal;
    },
    onSubmit_i(result) {
      this.form.estado = result.estado_id;
      this.form.ciudad = result.municipio;
    },

  getPorcentajeInformation(){ //Agregado David 100621 Porcentajes de Informacion

        this.pInformacion = 0

        if(this.form.pais == "" || this.form.pais == null){  
        }else{
            this.pInformacion = this.pInformacion + 12
        }
        if(this.cp == "" || this.cp == null){
        }else{
             this.pInformacion = this.pInformacion + 12
        }
        if(this.form.estado == "" || this.form.estado == null){
        }else{
            this.pInformacion = this.pInformacion + 12
        }

        if(this.form.ciudad == "" || this.form.ciudad == null){
        }else{
            this.pInformacion = this.pInformacion + 12
        }

        if(this.form.calle == "" || this.form.calle == null){   
        }else{
             this.pInformacion = this.pInformacion + 13
        }

        if(this.form.name == "" || this.form.name == null){    
        }else{
            this.pInformacion = this.pInformacion + 13
        }

        if(this.form.typeEmpresa == "" || this.form.typeEmpresa == null){
        }else{
            this.pInformacion = this.pInformacion + 13
        }
        
        if(this.form.rfc == "" || this.form.rfc == null){
        }else{
            this.pInformacion = this.pInformacion + 13
        }

    },
    getPorcentajeDatosFiscales(){
        
        this.pDatosFiscales = 0

        if(this.form.usoCFDI == "" || this.form.usoCFDI == null){
        }else{
            this.pDatosFiscales = this.pDatosFiscales + 33
        }

        if(this.form.formaPago == "" || this.form.formaPago == null){
        }else{
            this.pDatosFiscales = this.pDatosFiscales + 33
        }

        if(this.form.metodoPago == "" || this.form.metodoPago == null){
        }else{
            this.pDatosFiscales = this.pDatosFiscales + 34
        }

    },

    PorcentajeContactos(){

      this.pContactos = 0;

      let contador = this.all_contacts.length;

      if(contador > 0){
        this.pContactos = 100
      }

    },

    getPorcentajeComplementarios(){

        this.pDatos = 0;

        if(this.form.noEmpleados == "" || this.form.noEmpleados == null){
        }else{
            this.pDatos = this.pDatos + 25;
        }

        if(this.form.giroEmpresa == "" || this.form.giroEmpresa == null){
        }else{
            if(this.form.giroEmpresa == 35){
                if(this.form.specification == "" || this.form.specification == null){
                }else{
                    this.pDatos = this.pDatos + 25;                    
                }
            }else{   
                this.pDatos = this.pDatos + 25;             
            }         
        }

        if(this.form.conditions == "" || this.form.conditions == null){
        }else{
            this.pDatos = this.pDatos + 25;
        }

        if(this.form.paydaysweeks == "" || this.form.paydaysweeks == null){
        }else{
            if(this.form.generalnotesweeks == "" || this.form.generalnotesweeks == null){
            }else{
                this.pDatos = this.pDatos + 25;
            }
        }

        if(this.form.paydaysdate == "" || this.form.paydaysdate == null){
        }else{
            if(this.form.generalnotesdate == "" || this.form.generalnotesdate == null){
            }else{
                this.pDatos = this.pDatos + 25;
            }
        }

    },

    Credit(){

      let days = this.form.creditdays
      if(days == "" || days == null){
      }else{
        this.statuscredito = "true"
        this.vcredit = 1
        this.vsolicitud = 1    
        document.getElementById("terminos").hidden = true        
      }

    },

    selectPayWeek(vpay, statusweek) {
      let validar = vpay;
      let estado = statusweek;

      if (validar == 1 || estado == false) {
        this.vpay = 1;
        this.statusweek = "true";
        this.statusdate = "false";
        this.form.paydaysdate = "";
        this.form.generalnotesdate = "";
      } else if (validar == 1 || estado == true) {
        this.vpay = 2;
        this.statusdate = "true";
        this.statusweek = "false";
      }
    },

  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body" style="padding: 10px">
            <h4 class="header-title">Informacion</h4>

            <div class="row">
              <div class="col-lg-12">
                <b-tabs justified nav-class="nav-tabs nav-bordered">
                  <b-tab active>
                    <template #title>
                      <strong>Base</strong>
                      <b-progress
                        :value="pBase"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <input
                      type="hidden"
                      id="idCustomer"
                      name="idCustomer"
                      v-model.trim="form.idCustomer"
                      class="form-control"
                    />
                    <div class="row">
                      <div class="col-2"></div>
                      <div class="col-8">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <b-form-group
                              id="email"
                              label-cols-sm="2"
                              label-cols-lg="2"
                              label="Email"
                              label-for="email"
                              style="text-align: right"
                            >
                              <b-form-input
                                for="email"
                                v-model.trim="form.email"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-row form-group">
                              <label
                                class="col-sm-2 col-form-label"
                                style="text-align: right"
                                >Telefono</label
                              >
                              <div class="col-sm-10">
                                <div class="input-group mb-1">
                                  <select
                                    id="lada"
                                    class="form-control col-3"
                                    v-model.trim="form.lada"
                                  >
                                    <option
                                      v-for="marcado in ladas"
                                      :key="marcado.id"
                                      v-bind:value="marcado.id"
                                    >
                                      {{ marcado.alias }} +{{ marcado.code }}
                                    </option>
                                  </select>
                                  <b-form-input
                                    placeholder=""
                                    type="number"
                                    v-model.trim="form.telefono"
                                  ></b-form-input>
                                </div>
                              </div>
                            </div>

                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button variant="primary" @click="save1()"
                                  >Save</b-button
                                >
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-2"></div>
                    </div>
                  </b-tab>

                  <b-tab>
                    <template #title>
                      <strong>Informacion</strong>
                      <b-progress
                        :value="pInformacion"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-10">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Pais</label
                              >
                              <div class="col-md-5">
                                <select
                                  id="pais"
                                  class="form-control"
                                  v-model.trim="form.pais"
                                  @change="getEstado($event,1)"
                                >
                                  <option
                                    v-for="paises in countrys"
                                    :key="paises.id"
                                    v-bind:value="paises.id"
                                  >
                                    {{ paises.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <b-form-group
                              id="cp_txt"
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="C.P"
                              label-for="cp"
                              style="text-align: right"
                              class="form-row form-group px-1"
                            >

                            <!-- ///agregado 280621 -->
                            <v-autocomplete 
                                :items="dates_search" 
                                v-model="cpModel" 
                                :get-label="getLabel" 
                                :component-item='template_div' 
                                @update-items="updateItems"
                                input-class="col-md-3 form-control px-3"
                                placeholder="buscar..."
                                item-text="cp"
                                item-value="cp"
                                v-show="activoCP == true" > 
                              </v-autocomplete>

                              

                              <div class="input-group" v-show="activoCP_2 == true">
                                <b-form-input class="col-md-3 px-1"  placeholder="" v-model.trim="cp" @input="form.cp = form.cp.toUpperCase()"></b-form-input>
                                <div class="input-group-append">
                                  <b-button
                                    id="btn-add-destino-m"
                                    v-b-tooltip.hover="{ variant: 'success' }"
                                    title="Cambiar"
                                    variant="secondary"
                                    style="padding: 7px"
                                    class="btn btn-secondary waves-effect waves-light"
                                    @click="cambiarCodigoPostal"                              
                                    ><i class="fe-refresh-ccw"></i
                                  ></b-button>
                                  </div>
                              </div>

                              <!-- return-object -->
                              
                              <!-- {{cp}} -->
                              <!-- <b-form-input
                                for="cp"
                                type="number"
                                v-model.trim="form.cp"
                                class="col-md-3"
                              ></b-form-input> -->
                                  <!-- :default-value="this.valorCp" -->

                              <!-- <autocomplete
                                  :search="getautocomplit_i"
                                  :get-result-value="getResultValue_i"                                  
                                  :debounce-time="500"
                                  @submit="onSubmit_i" 
                                  id="cp"
                                  class="col-5"
                                ></autocomplete> -->

                            </b-form-group>

                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Estado</label
                              >
                              <div class="col-md-5">
                                <select
                                  id="estado"
                                  class="form-control"
                                  v-model.trim="form.estado"
                                >
                                  <option
                                    v-for="estate in estates"
                                    :key="estate.id"
                                    v-bind:value="estate.id"
                                  >
                                    {{ estate.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Ciudad/Municipio"
                              label-for="ciudad"
                              style="text-align: right"
                            >
                              <b-form-input
                                placeholder=""
                                v-model.trim="form.ciudad"
                                @input="form.ciudad = form.ciudad.toUpperCase()"
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Colonia/Localidad"
                              label-for="localidad"
                              style="text-align: right"
                            >
                              <b-form-input
                                placeholder=""
                                v-model.trim="form.localidad"
                                @input="
                                  form.localidad = form.localidad.toUpperCase()
                                "
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Calle"
                              label-for="calle"
                              style="text-align: right"
                            >
                              <b-form-input
                                placeholder=""
                                v-model.trim="form.calle"
                                @input="form.calle = form.calle.toUpperCase()"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-group">
                              <b-form-group
                                label-cols-sm="6"
                                label-cols-lg="6"
                                label="No interior"
                                label-for="noInterior"
                                class="col-md-6"
                                style="text-align: right"
                              >
                                <b-form-input
                                  placeholder=""
                                  type="number"
                                  v-model.trim="form.noInterior"
                                ></b-form-input>
                              </b-form-group>

                              <b-form-group
                                label-cols-sm="6"
                                label-cols-lg="6"
                                label="No exterior"
                                label-for="noExterior"
                                class="col-md-6"
                                style="text-align: right"
                              >
                                <b-form-input
                                  placeholder=""
                                  type="number"
                                  v-model.trim="form.noExterior"
                                ></b-form-input>
                              </b-form-group>
                            </div>

                            <hr />

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Nombre o Razon Social"
                              label-for="name"
                              style="text-align: right"
                              class="form-row form-group"
                            >
                              <b-form-input
                                placeholder=""
                                v-model.trim="form.name"
                                @input="form.name = form.name.toUpperCase()"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Tipo Empresa</label
                              >
                              <div class="col-md-3">
                                <select
                                  id="typeEmpresa"
                                  class="form-control"
                                  v-model.trim="form.typeEmpresa"
                                >
                                  <option
                                    v-for="empresa in empresas"
                                    :key="empresa.id"
                                    v-bind:value="empresa.id"
                                  >
                                    {{ empresa.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group">
                              <b-form-group
                                label-cols-sm="6"
                                label-cols-lg="6"
                                label="RFC"
                                label-for="rfc"
                                class="col-md-6 px-3"
                                style="text-align: right"
                              >
                                <b-form-input
                                  class="ml-2"
                                  placeholder=""
                                  v-model.trim="form.rfc"
                                  id="rfc"
                                  :minlength="12"
                                  :maxlength="13"
                                  @input="form.rfc = form.rfc.toUpperCase()"
                                ></b-form-input>
                              </b-form-group>

                              <b-form-group
                                label-cols-sm="6"
                                label-cols-lg="6"
                                label="Tax ID"
                                label-for="taxid"
                                id="div_taxid_1"
                                class="col-md-6"
                                style="display: none; text-align: right"
                              >
                                <b-form-input
                                  placeholder=""
                                  v-model.trim="form.taxid"
                                  @input="form.rfc = form.rfc"
                                ></b-form-input>
                              </b-form-group>
                            </div>

                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button variant="primary" @click="save2()"
                                  >Save</b-button
                                >
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-1"></div>
                    </div>
                  </b-tab>

                  <b-tab>
                    <template #title>
                      <strong>Datos Fiscales</strong>
                      <b-progress
                        :value="pDatosFiscales"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-10">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <div class="form-group row">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Uso de CFDI</label
                              >
                              <div class="col-md-6">
                                <select
                                  v-model.trim="form.usoCFDI"
                                  class="form-control"
                                  name="usoCFDI"
                                  id="usoCFDI"
                                  style=""
                                >
                                  <option
                                    v-for="usocfdi in usosCFDI"
                                    :key="usocfdi.id"
                                    v-bind:value="usocfdi.code"
                                  >
                                    {{ usocfdi.code + " " + usocfdi.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Forma de Pago</label
                              >
                              <div class="col-md-6">
                                <select
                                  v-model.trim="form.formaPago"
                                  class="form-control"
                                  name="formaPago"
                                  id="formaPago"
                                >
                                  <option
                                    v-for="formaPago in formasPago"
                                    :key="formaPago.id"
                                    v-bind:value="formaPago.code"
                                  >
                                    {{ formaPago.code + " " + formaPago.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Metodo de Pago</label
                              >
                              <div class="col-md-6">
                                <select
                                  v-model.trim="form.metodoPago"
                                  class="form-control"
                                  name="metodoPago"
                                  id="metodoPago"
                                >
                                  <option
                                    v-for="metodoPago in metodosPago"
                                    :key="metodoPago.id"
                                    v-bind:value="metodoPago.code"
                                  >
                                    {{
                                      metodoPago.code + " " + metodoPago.name
                                    }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button variant="primary" @click="save3()"
                                  >Save</b-button
                                >
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-1"></div>
                    </div>
                  </b-tab>

                  <b-tab @click="listFiles">
                    <template #title>
                      <strong>Archivos</strong>
                      <b-progress
                        :value="pArchivos"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-10">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <div class="form-group row mb-0">
                              <label
                                class="col-md-5 col-form-label"
                                style="text-align: right"
                                >Acta Constitutiva(PDF)</label
                              >


                              <div class="col-sm-7">
                                <div class="input-group">
                                  <input
                                    name="contFiscal"
                                    id="contFiscal"
                                    accept="application/pdf"
                                    type="file"
                                    class="form-control-sm btn-light"
                                  />
                                  <input id="Fiscal" value="0" hidden />
                                  <div class="input-group-append">
                                    <b-button
                                      variant="dark btn-sm"
                                      @click="subirFile(1)"
                                      >Upload</b-button
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                            

                            <div class="form-group row mb-0">
                              <label
                                class="col-md-5 col-form-label"
                                style="text-align: right"
                                >Constancia de situación fiscal(PDF)</label
                              >
                              <div class="col-sm-7">
                                <div class="input-group">
                                  <input
                                    class="form-control-sm btn-light"
                                    type="file"
                                    name="constSF"
                                    id="constSF"
                                    accept="application/pdf"
                                  />
                                  <input id="SF" value="0" hidden />
                                  <div class="input-group-append">
                                    <b-button
                                      variant="dark btn-sm"
                                      @click="subirFile(2)"
                                      >Upload</b-button
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-group row mb-0">
                              <label
                                class="col-md-5 col-form-label"
                                style="text-align: right"
                                >Comprobante Domicilio(PDF)</label
                              >
                              <div class="col-sm-7">
                                <div class="input-group">
                                  <input
                                    class="form-control-sm btn-light"
                                    type="file"
                                    name="compDomcilio"
                                    id="compDomcilio"
                                    accept="application/pdf"
                                  />
                                  <input id="Domicilio" value="0" hidden />
                                  <div class="input-group-append">
                                    <b-button
                                      variant="dark btn-sm"
                                      @click="subirFile(3)"
                                      >Upload</b-button
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-group row mb-0">
                              <label
                                class="col-md-5 col-form-label"
                                style="text-align: right"
                                >Comprobante Identificacion(PDF)</label
                              >
                              <div class="col-sm-7">
                                <div class="input-group">
                                  <input
                                    class="form-control-sm btn-light"
                                    type="file"
                                    name="compIdentificacion"
                                    id="compIdentificacion"
                                    accept="application/pdf"
                                  />
                                  <input id="Identificacion" value="0" hidden />
                                  <div class="input-group-append">
                                    <b-button
                                      variant="dark btn-sm"
                                      @click="subirFile(4)"
                                      >Upload</b-button
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />

                            <div class="form-group row mb-0">
                              <div class="table-responsive">
                                <table
                                  class="table table-sm mb-0"
                                  v-if="all_files.length > 0"
                                >
                                  <thead>
                                    <tr>
                                      <th>Archivo</th>
                                      <th>Tipo</th>
                                      <th>Fecha</th>
                                      <th></th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr
                                      v-for="file in all_files"
                                      v-bind:key="file.id"
                                    >
                                      <td>{{ file.name }}</td>
                                      <!-- <td>{{file.tipo}}</td>  -->
                                      <td
                                        v-if="file.tipo == 'AC'"
                                        title="Acta Constitutiva"
                                      >
                                        AC
                                      </td>
                                      <td
                                        v-if="file.tipo == 'CSF'"
                                        title="Constancia de situación fiscal"
                                      >
                                        CSF
                                      </td>
                                      <td
                                        v-if="file.tipo == 'CD'"
                                        title="Comprobante Domicilio"
                                      >
                                        CD
                                      </td>
                                      <td
                                        v-if="file.tipo == 'CI'"
                                        title="Comprobante Identificacion"
                                      >
                                        CI
                                      </td>
                                      <td>{{ file.dateCreate }}</td>
                                      <td>
                                        <!-- <i
                                          v-if="file.statuspdf == 1"
                                          class="fas fa-eye"
                                          title="Visualizar Archivo"
                                          @click="showFiles2(file.id)"
                                        ></i> -->
                                          <!-- v-else -->

                                        <i class="fas fa-eye" title="Visualizar Archivo" @click="showFiles(file.id)"></i>&nbsp;&nbsp; 
                                        <i v-show="file.statuspdf == 0" class="fas fa-trash" title="Eliminar Archivo" @click="deleteFiles(file.id)"></i>&nbsp;&nbsp;
                                        <i v-show="file.statuspdf == 0" class="fas fa-check-circle" title="Confirmar Archivo" @click="getConfirmarPDF(file.id)"></i>

                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <p v-else>No hay archivos...</p>
                              </div>
                            </div>

                            <!-- <b-button v-b-modal.modal-lg variant="info">Large Modal</b-button> -->
                            <!-- <b-button @click="$bvModal.show('modal_lg')">Open</b-button> -->

                            <b-modal
                              id="modal_lg"
                              size="lg"
                              title="Large modal"
                              title-class="font-18"
                              body-class="p-4"
                            >
                              <div class="row">
                                <div class="col-md-6">
                                  <!-- <embed v-bind:src="`media/uploads/Anticipo_TRC-24.pdf`" width="100%" height="400" id="documentotxt_nc"> -->
                                  <!-- <embed v-bind:src="`http://localhost:8080/assets/images/logo-sm.png`" width="100%" height="400" id="documentotxt_nc"> -->

                                  <embed
                                    v-bind:src="fileDetails"
                                    width="100%"
                                    height="400"
                                    id="documento"
                                    type="application/pdf"
                                  />

                                  <!-- <div  id="filesDiv"  name ="filesDiv"></div> -->

                                  <!-- <pdf v-bind:src="fileDetails.ruta"></pdf> -->
                                  <!-- Files.get_image -->
                                  <!-- <iframe v-bind:src="`http://127.0.0.1:8000` + `/media/uploads/Anticipo_TRC-24.pdf`">
                                                    -->
                                  <!-- <iframe v-bind:src="fileDetails.ruta"></iframe> -->
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <b-button-group>
                                    <b-button
                                      class="mt-3"
                                      @click="$bvModal.hide('modal_lg')"
                                      >Cerrar</b-button
                                    >
                                    <b-button
                                      class="mt-3 margin-left"
                                      variant="info"
                                      @click="getConfirmarPDF()"
                                      >Confirmar</b-button
                                    >
                                  </b-button-group>
                                </div>
                              </div>
                            </b-modal>

                            <!-- <b-modal
                              id="modal_visualizar"
                              size="lg"
                              title="Visuzalizar Archivo"
                              title-class="font-18"
                              body-class="p-4"
                            >
                              <div class="row">
                                <div class="col-md-6">
                                  <embed
                                    v-bind:src="fileDetails"
                                    width="100%"
                                    height="400"
                                    id="documento"
                                    type="application/pdf"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <b-button-group>
                                    <b-button
                                      class="mt-3"
                                      @click="$bvModal.hide('modal_lg')"
                                      >Cerrar</b-button
                                    >
                                  </b-button-group>
                                </div>
                              </div>
                            </b-modal> -->
                          </form>
                        </div>
                      </div>
                      <div class="col-1"></div>
                    </div>
                  </b-tab>

                  <b-tab @click="listContacto">
                    <template #title>
                      <strong>Contactos</strong>
                      <b-progress
                        :value="pContactos"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-10">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <input
                              type="hidden"
                              id="idContact"
                              name="idContact"
                              v-model.trim="form.idContact"
                              class="form-control"
                            />

                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Area</label
                              >
                              <div class="col-md-5">
                                <select
                                  v-model.trim="form.area"
                                  class="form-control"
                                  name="area"
                                  id="area"
                                  style="text-align: right"
                                >
                                  <option
                                    v-for="area in areas"
                                    :key="area.id"
                                    v-bind:value="area.id"
                                  >
                                    {{ area.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <b-form-group
                              id="nombreContacto"
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Nombre"
                              label-for="nombreContacto"
                              style="text-align: right"
                            >
                              <b-form-input
                                for="nombreContacto"
                                v-model.trim="form.nombreContacto"
                                @input="
                                  form.nombreContacto =
                                    form.nombreContacto.toUpperCase()
                                "
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Apellidos"
                              label-for="Apellidos"
                              style="text-align: right"
                            >
                              <b-form-input
                                placeholder=""
                                v-model.trim="form.apellidosContacto"
                                @input="
                                  form.apellidosContacto =
                                    form.apellidosContacto.toUpperCase()
                                "
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Telefono</label
                              >
                              <div class="col-md-8">
                                <div class="input-group mb-1">
                                  <select
                                    id="ladaContacto"
                                    class="form-control col-md-3"
                                    v-model.trim="form.ladaContacto"
                                  >
                                    <option
                                      v-for="marcado in ladas"
                                      :key="marcado.id"
                                      v-bind:value="marcado.id"
                                    >
                                      {{ marcado.alias }} +{{ marcado.code }}
                                    </option>
                                  </select>
                                  <b-form-input
                                    class="col-md-4"
                                    placeholder=""
                                    type="number"
                                    v-model.trim="form.telefonoContacto"
                                    :minlength="10"
                                    :maxlength="16"
                                  ></b-form-input>
                                </div>
                              </div>
                            </div>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Email"
                              label-for="Email"
                              style="text-align: right"
                            >
                              <b-form-input
                                class="col-md-7"
                                placeholder=""
                                v-model.trim="form.emailContacto"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button
                                  variant="primary"
                                  @click="save5()"
                                  id="btnSave5"
                                  >Save</b-button
                                >
                                <b-button
                                  variant="primary"
                                  @click="save5_update()"
                                  id="btnSave5_u"
                                  style="display: none"
                                  >Update</b-button
                                >
                              </div>
                            </div>

                            <br />

                            <div class="form-group row mb-0">
                              <div class="table-responsive">
                                <table
                                  class="table table-sm mb-0"
                                  v-if="all_contacts.length > 0"
                                >
                                  <thead>
                                    <tr>
                                      <th>Nombre</th>
                                      <th>Area</th>
                                      <th>Telefono</th>
                                      <th>Correo</th>
                                      <th></th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr
                                      v-for="contact in all_contacts"
                                      v-bind:key="contact.id"
                                    >
                                      <td>
                                        {{
                                          contact.name + " " + contact.lastname
                                        }}
                                      </td>

                                      <td v-if="contact.area == 1">FINANZAS</td>
                                      <td v-if="contact.area == 2">
                                        FACTURACION
                                      </td>
                                      <td v-if="contact.area == 3">
                                        CONTABILIDAD
                                      </td>
                                      <td v-if="contact.area == 4">CXP</td>
                                      <td v-if="contact.area == 5">CXC</td>
                                      <td v-if="contact.area == 6">OTRO</td>

                                      <td>{{ contact.phone }}</td>
                                      <td>{{ contact.email }}</td>
                                      <td>
                                        <i
                                          class="fas fa-edit"
                                          @click="editContacto(contact.id)"
                                        ></i>
                                        ||
                                        <i
                                          class="fas fa-trash"
                                          @click="deleteContact(contact.id)"
                                        ></i>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <p v-else>No hay Contactos...</p>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-1"></div>
                    </div>
                  </b-tab>

                  <b-tab>
                    <template #title>
                      <strong>Complementarios</strong>
                      <b-progress
                        :value="pDatos"
                        show-value
                        :max="100"
                      ></b-progress>
                    </template>

                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-10">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <b-form-group
                              id="noEmpleados"
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="No. de empleados"
                              label-for="noEmpleados"
                              style="text-align: right"
                              class="form-row form-group"
                            >
                              <b-form-input
                                class="col-md-4"
                                for="noEmpleados"
                                type="number"
                                v-model.trim="form.noEmpleados"
                                oninput="if(value.length > 3)value = value.slice(0, 3)"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-row form-group">
                              <label
                                class="col-md-3 col-form-label"
                                style="text-align: right"
                                >Giro de la Empresa</label
                              >
                              <div class="col-md-5">
                                <select
                                  v-model.trim="form.giroEmpresa"
                                  id="other"
                                  class="form-control"
                                  @change="Others($event)"
                                >
                                  <option
                                    v-for="bisne in business"
                                    :key="bisne.id"
                                    v-bind:value="bisne.id"
                                  >
                                    {{ bisne.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <b-form-group
                              id="HideOthers"
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Especificaciones"
                              label-for="specification"
                              style="text-align: right"
                              v-show="idother == 35"
                            >
                              <b-form-input
                                for="specification"
                                id="specification"
                                v-model.trim="form.specification"
                                @input="
                                  form.specification =
                                    form.specification.toUpperCase()
                                "
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Condiciones"
                              label-for="conditions"
                              style="text-align: right"
                            >
                              <b-form-textarea
                                for="conditions"
                                v-model.trim="form.conditions"
                                @input="
                                  form.conditions =
                                    form.conditions.toUpperCase()
                                "
                              ></b-form-textarea>
                            </b-form-group>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label=""
                              label-for="vpay"
                              style="text-align: left"
                              class="form-row form-group"
                            >
                              <b-form-checkbox-group
                                id="checkbox-group-1"
                                name="model"
                              ></b-form-checkbox-group>
                              <b-form-checkbox
                                class="col-md-6"
                                v-model="statusweek"
                                value="true"
                                unchecked-value="false"
                                name="vpay1"
                                @change="selectPayWeek(1, statusweek)"
                                >Dias de Pago por Semana</b-form-checkbox
                              >
                              <b-form-checkbox
                                class="col-md-6"
                                v-model="statusdate"
                                value="true"
                                unchecked-value="false"
                                name="vpay2"
                                @change="selectPayDate(2, statusdate)"
                                >Dias de Pago por Fecha</b-form-checkbox
                              >
                            </b-form-group>

                            <div class="form-row form-group" v-show="vpay == 1">
                              <label
                                class="col-sm-3 col-form-label"
                                style="text-align: right"
                                >Dias de Pago por Semana</label
                              >
                              <div class="col-sm-8">
                                <div class="input-group mb-1">
                                  <div class="input-group mb-1">
                                    <select
                                      id="semanas"
                                      class="form-control col-md-4"
                                      v-model.trim="form.paydaysweeks"
                                    >
                                      <option value="1">LUNES</option>
                                      <option value="2">MARTES</option>
                                      <option value="3">MIERCOLES</option>
                                      <option value="4">JUEVES</option>
                                      <option value="4">VIERNES</option>
                                    </select>

                                    <select
                                      id="semanasnotas"
                                      class="form-control col-md-4"
                                      v-model.trim="form.generalnotesweeks"
                                    >
                                      <option value="1">SEMANA 1</option>
                                      <option value="2">SEMANA 2</option>
                                      <option value="3">SEMANA 3</option>
                                      <option value="4">SEMANA 4</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-row form-group" v-show="vpay == 2">
                              <label
                                class="col-sm-3 col-form-label"
                                style="text-align: right"
                                >Dias de Pago por Fecha</label
                              >
                              <div class="col-sm-8">
                                <div class="input-group mb-1">
                                  <!-- <b-form-datepicker id="fechas" class=" form-control col-md-6" placeholder="" v-model.trim="form.paydaysdate"></b-form-datepicker> -->
                                  <select
                                    id="fechas"
                                    class="form-control col-md-3"
                                    v-model.trim="form.paydaysdate"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                  </select>
                                  <b-form-input
                                    id="fechasnotas"
                                    class="col-md-10"
                                    placeholder="Notas Generales"
                                    v-model.trim="form.generalnotesdate"
                                    @input="
                                      form.generalnotesdate =
                                        form.generalnotesdate.toUpperCase()
                                    "
                                  ></b-form-input>
                                </div>
                              </div>
                            </div>

                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button
                                  variant="primary"
                                  @click="save6(1)"
                                  id="btnSave6"
                                  >Save</b-button
                                >
                              </div>
                            </div>

                            <br>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label=""
                              label-for="vcredit"
                              style="text-align: left: ;"
                              v-show="vsolicitud == 1"
                            >
                              <b-form-checkbox
                                name="vcredit"
                                value="true"
                                unchecked-value="false"
                                v-model="statuscredito"                                
                                @change="validateCredit(vcredit)"
                                >Solicitar Credito</b-form-checkbox
                              >
                            </b-form-group>

                            <b-form-group
                              class="form-row form-group"
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label="Dias de Credito"
                              label-for="creditdays"
                              style="text-align: right"
                              v-show="vcredit == 1"
                            >
                              <b-form-input
                                for="creditdays"
                                type="number"
                                v-model.trim="form.creditdays"
                                oninput="if(value.length > 2)value = value.slice(0, 2)"
                              ></b-form-input>
                            </b-form-group>

                            <div class="form-row form-group" v-show="vcredit == 1">
                              <label
                                class="col-sm-3 col-form-label"
                                style="text-align: right"
                                >Monto Credito</label
                              >
                              <div class="col-sm-8">
                                <div class="input-group mb-1">
                                  <select
                                    class="form-control col-md-2"
                                    v-model.trim="form.credit"
                                  >
                                    <option selected value="1">MXN</option>
                                    <option value="2">USD</option>
                                  </select>
                                  <b-form-input
                                    class="col-md-6"
                                    placeholder=""
                                    type="number"
                                    v-model.trim="form.amount"
                                  ></b-form-input>
                                </div>
                              </div>
                            </div>

                            <b-form-group
                              label-cols-sm="3"
                              label-cols-lg="3"
                              label=""
                              label-for="vaccept"
                              style="text-align: left: ;"
                              v-show="vcredit == 1"
                              id="terminos"
                            >
                              <b-form-checkbox name="vaccept" @change="Aceptar(vaccept)">Aceptar Terminos y Condiciones</b-form-checkbox
                              >
                            </b-form-group>

                            <div class="form-group mb-0" v-show="vaccept == 1">
                              <div
                                class="justify-content-center row"
                                v-show="vcredit == 1"
                              >
                                <b-button variant="primary"
                                @click="Enviar()"
                                id="btnSolicitud"
                                  >Enviar Solicitud</b-button
                                >
                              </div>
                            </div>


                          </form>
                        </div>
                      </div>
                      <div class="col-1"></div>
                    </div>
                  </b-tab>

                  <!-- //agregado ismael 020621 -->
                  <b-tab title="Rutas Comun">
                    <div class="row px-4">
                      <div class="col-6">
                        <div class="p-2" style="border: 1px solid #f9f9f9">
                          <form class="form-horizontal" role="form">
                            <label for="">Origen</label>
                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Pais</label
                              >
                              <div class="col-md-8">
                                <select
                                  class="form-control"
                                  v-model.trim="form.paisRutaO"
                                  @change="getEstadoRutaO($event)"
                                >
                                  <option
                                    v-for="paises in countrys"
                                    :key="paises.id"
                                    v-bind:value="paises.id"
                                  >
                                    {{ paises.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >C.P</label
                              >
                              <!-- <div class="col-md-8">
                                <b-form-input
                                  for="cpRutaO"
                                  v-model.trim="form.cpRutaO"
                                  class="col-md-5"
                                  v-model="palabra_a_buscar"
                                  v-on:keyup="getautocomplit"
                                ></b-form-input>
                              </div> -->
                              <div class="col-md-8">

                                <v-autocomplete 
                                  :items="dates_search_cpo" 
                                  v-model="cpRutaO" 
                                  :get-label="getLabel_cpo" 
                                  :component-item='template_div' 
                                  @update-items="updateItems_cpo"
                                  input-class="col-md-6 form-control"
                                  placeholder="buscar..."
                                  item-text="cpRutaO"
                                  item-value="cpRutaO"> 
                                </v-autocomplete>    
                                <!-- :search="search" -->
                                <!-- <autocomplete
                                  :search="getautocomplit_r1"
                                  :get-result-value="getResultValue_r1"
                                  :debounce-time="500"
                                  @submit="onSubmit_r1"
                                  id="cpRutaO"
                                ></autocomplete> -->
                                <!-- <ejs-autocomplete :dataSource='sportsData' :placeholder="waterMark" class="form-control"></ejs-autocomplete> -->
                                <!-- <ejs-autocomplete :dataSource='sportsData' @keypress.prevent="getautocomplit"></ejs-autocomplete> -->

                                <!-- <ejs-autocomplete :dataSource='sportsData'  @blur="getautocomplit" ref="my_input"></ejs-autocomplete> -->
                                <!-- <ejs-autocomplete v-model="palabra_a_buscar" v-on:keypress="getautocomplit"  :dataSource='sportsData' ></ejs-autocomplete> -->

                                <!-- <ejs-autocomplete :dataSource='sportsData' @keypress="getautocomplit($event)"></ejs-autocomplete> -->
                                <!-- @blur="getautocomplit($event)" -->
                                <!-- @change="getEstadoRutaO($event)" -->
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Estado</label
                              >
                              <div class="col-md-8">
                                <select
                                  id="estadoRutaO"
                                  class="form-control"
                                  v-model.trim="form.estadoRutaO"
                                >
                                  <option
                                    v-for="estate in estatesRO"
                                    :key="estate.id"
                                    v-bind:value="estate.id"
                                  >
                                    {{ estate.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Ciudad/Mpio.</label
                              >
                              <div class="col-md-8">
                                <b-form-input
                                  v-model.trim="form.ciudadRutaO"
                                ></b-form-input>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="p-2" style="border: 1px solid #f9f9f9">
                          <form class="form-horizontal" role="form">
                            <label for="">Destino</label>
                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Pais</label
                              >
                              <div class="col-md-8">
                                <select
                                  class="form-control"
                                  v-model.trim="form.paisRutaD"
                                  @change="getEstadoRutaD($event)"
                                >
                                  <option
                                    v-for="paises in countrys"
                                    :key="paises.id"
                                    v-bind:value="paises.id"
                                  >
                                    {{ paises.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >C.P</label
                              >
                              <div class="col-md-8">

                                <v-autocomplete 
                                  :items="dates_search_cpd" 
                                  v-model="cpRutaD" 
                                  :get-label="getLabel_cpd" 
                                  :component-item='template_div' 
                                  @update-items="updateItems_cpd"
                                  input-class="col-md-6 form-control"
                                  placeholder="buscar..."
                                  item-text="cpRutaD"
                                  item-value="cpRutaD"> 
                                </v-autocomplete>  
                                <!-- <autocomplete
                                  :search="getautocomplit_r2"
                                  :get-result-value="getResultValue_r2"
                                  :debounce-time="500"
                                  @submit="onSubmit_r2"
                                  id="cpRutaD"
                                ></autocomplete> -->

                                <!-- <b-form-input
                                  for="cpRutaD"
                                  v-model.trim="form.cpRutaD"
                                  class="col-md-5"
                                ></b-form-input> -->
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Estado</label
                              >
                              <div class="col-md-8">
                                <select
                                  id="estadoRutaD"
                                  class="form-control"
                                  v-model.trim="form.estadoRutaD"
                                >
                                  <option
                                    v-for="estate in estatesRD"
                                    :key="estate.id"
                                    v-bind:value="estate.id"
                                  >
                                    {{ estate.name }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                class="col-md-4 col-form-label"
                                style="text-align: right"
                                >Ciudad/Mpio.</label
                              >
                              <div class="col-md-8">
                                <b-form-input
                                  v-model.trim="form.ciudadRutaD"
                                ></b-form-input>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="p-2">
                          <form class="form-horizontal" role="form">
                            <div class="form-group mb-0">
                              <div class="justify-content-center row">
                                <b-button
                                  variant="primary"
                                  @click="saveRC()"
                                  id="btnSaveRC"
                                  >Guardar</b-button
                                >
                              </div>
                            </div>

                            <br />

                            <div class="form-group row mb-0">
                              <div class="table-responsive">
                                <table
                                  class="table table-sm mb-0"
                                  v-if="all_routes.length > 0"
                                >
                                  <thead>
                                    <tr>
                                      <th>Origen</th>
                                      <th>Destino</th>
                                      <th></th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr
                                      v-for="rutas in all_routes"
                                      v-bind:key="rutas.id"
                                    >
                                      <td v-if="rutas.paisOrigen !== null">
                                        {{
                                          rutas.paisOrigen.name +
                                          ", " +
                                          rutas.estadoOrigen.name +
                                          ", C.P. " +
                                          rutas.cpOrigen +
                                          ", " +
                                          rutas.ciudadOrigen
                                        }}
                                      </td>
                                      <td v-if="rutas.paisDestino !== null">
                                        {{
                                          rutas.paisDestino.name +
                                          ", " +
                                          rutas.estadoDestino.name +
                                          ", C.P. " +
                                          rutas.cpDestino +
                                          ", " +
                                          rutas.ciudadDestino
                                        }}
                                      </td>
                                      <td v-if="rutas.paisOrigen !== null">
                                        <i
                                          class="fas fa-trash"
                                          @click="deleteRouter(rutas.id)"
                                        ></i>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <p v-else>No hay rutas...</p>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </b-tab>

                </b-tabs>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!--- end row -->

    <b-modal
      id="modal-lg"
      size="lg"
      title="Confirmar"
      title-class="font-18"
      body-class="p-4"
    >
      <div class="row">
        <div class="col-md-6"></div>
      </div>
    </b-modal>

    <b-modal
      id="modal_Visualizar"
      size="lg"
      title="Visualizar PDF"
      title-class="font-18"
      body-class="p-4"
    >
      <div class="row">
        <div class="col-md-6"></div>
      </div>
    </b-modal>
  </Layout>
</template>
<style>
.autocomplete-input {
  padding: 10px 10px 10px 40px;
  font-size: 14px;
}
</style>
