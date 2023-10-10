<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import appConfig from "../../../../app.config";

import axios from "axios";
import Swal from "sweetalert2";

import ItemTemplateServ from "@/components/ItemTemplateServ";
/**
 * Basic Tables component
 */

export default {
  page: {
    title: "Cotizacion",
    meta: [{ name: "validateCotizacion", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Validar Cotizacion",
      items: [
        {
          text: "System",
          href: "/",
        },
        {
          text: "Cotizacion",
          href: "/cotizaciones/listCotizacion",
        },
        {
          text: "Validar Cotizacion",
          href: "/validateCotizacion",
          active: true,
        },
      ],
      templateServ: ItemTemplateServ,
      dataCotizacion: [], // Tabla Cotizacion
      data_search_services: [],
      new_servicio: 0,
      textNewService: '',
      new_servicios: [],

      idCotizacion: 0,
      tipoServicio: "",
      usuarioGenera: "",
      tipoEnvio: "",
      modoEnvio: "",
      paisOrigen: "",
      idpaisOrigen: 0,
      cpOrigen: "",
      estadoOrigen: "",
      idestadoOrigen: 0,
      ciudadOrigen: "",
      paisDestino: "",
      idpaisDestino: 0,
      cpDestino: "",
      estadoDestino: "",
      idestadoDestino: 0,
      ciudadDestino: "",
      dateCreate: "",
      fechaCarga: "",
      tipoOperacion: "",
      tipoCarga: "",
      tipoUnidad: "",
      precioTotalInicial: "",
      precioTotalFinal: "",
      divisaInicial: "",
      divisaFinal: "",
      serie: "",
      folio: "",
      folioConsecutivo: "",
      estatus: 0,
      usuario: "",
      nombrestatus: "",
      diasTransito: "",
      primerCambio: 0,
      cambiosConsecutivo: 0,

      dataServiciosAgregados: [], // Tabla ServiciosAgregados

      name: "",
      lada: "",
      phone: "",
      email: "",
      productname: "",
      description: "",

      showCotiza: 1,
      rechazado: "",
      velocidadEnvio: "",
      embalaje: "",
      estibable: "",
      clasificacion: 0,
      clasificacionText: "",
      cantidad: "",
      volumen: "",
      pesoTotal: 0,
      descrip: "",

      options: [
        { id: 0, value: 0 },
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 },
        { id: 6, value: 6 },
        { id: 7, value: 7 },
        { id: 8, value: 8 },
        { id: 9, value: 9 },
        { id: 10, value: 10 },
        { id: 11, value: 11 },
        { id: 12, value: 12 },
        { id: 13, value: 13 },
        { id: 14, value: 14 },
        { id: 15, value: 15 },
        { id: 16, value: 16 },
        { id: 17, value: 17 },
        { id: 18, value: 18 },
        { id: 19, value: 19 },
        { id: 20, value: 20 },
        { id: 21, value: 21 },
        { id: 22, value: 22 },
        { id: 23, value: 23 },
        { id: 24, value: 24 },
        { id: 25, value: 25 },
        { id: 26, value: 26 },
        { id: 27, value: 27 },
        { id: 28, value: 28 },
        { id: 29, value: 29 },
        { id: 30, value: 30 },
      ],

      serviciosResumen: [],
      impuestos: 0,
      priceFinal: 0,
      clasificacionZonaO: "",
      clasificacionZonaD: "",
      resClasificaZona: "",
      notColorZona:"",
      notTextoZona:"",
      zonaValidaCo: 0,
      arrayResp: [],
      valorDolar: 19.8532,
      divisa: 0,
      confirmarServices5: [],

      totalPrecioExp:0,
      totalIvaExp:0,
      totalRetExp:0,
      totalTotalExp:0,
      totalRetOpt: 0,
      totalRetExp: 0,
      totalIvaOpt: 0,
      totalIvaExp: 0,
      totalPrecioOpt: 0,
      totalPrecioExp: 0,
      totalTotalOpt: 0,
      totalTotalExp: 0,

      vBoton: false,
      
      cambios: [],
      controlCambios: [],
      nuevoServicio: false,
      //Fin Cotizacion
    };
  },

  created() {
    this.getCotizacion();
  },
  methods: {

    //Inicia methods

    getCotizacion() {

      const idC = this.$route.params.pkCotizacion;

      axios
        .get(`servicioCotizaciones/${idC}/`)
        .then((response) => {
          //console.log(response.data)
          // this.dataCotizacion = response.data;
          this.idCotizacion = response.data.id
          this.tipoServicio = response.data.tipoServicio
          this.tipoEnvio = response.data.tipoEnvio
          this.usuarioGenera = response.data.usuarioGenera
          this.modoEnvio = response.data.modoEnvio
          this.paisOrigen = response.data.paisOrigen
          this.idpaisOrige = response.data.idpaisOrige
          this.cpOrigen = response.data.cpOrigen
          this.estadoOrigen = response.data.estadoOrigen
          this.idestadoOrigen = response.data.idestadoOrigen
          this.ciudadOrigen = response.data.ciudadOrigen
          this.paisDestino = response.data.paisDestino
          this.idpaisDestino = response.data.idpaisDestino
          this.cpDestino = response.data.cpDestino
          this.estadoDestino = response.data.estadoDestino
          this.idestadoDestino = response.data.idestadoDestino
          this.ciudadDestino = response.data.ciudadDestino
          this.dateCreate = response.data.dateCreate
          this.fechaCarga = response.data.fechaCarga
          this.tipoOperacion = response.data.tipoOperacion
          this.tipoCarga = response.data.tipoCarga
          if (this.tipoCarga == "g") {
            this.tipoCarga = "General"
          } else if (this.tipoCarga == "h") {
            this.tipoCarga = "Peligrosa"
          } else if (this.tipoCarga == "r") {
            this.tipoCarga = "Refrigerada"
          } else if (this.tipoCarga == "e") {
            this.tipoCarga = "Especial"
          }
          this.tipoUnidad = response.data.tipoUnidad
          this.precioTotalInicial = response.data.precioTotalInicial
          this.precioTotalFinal = response.data.precioTotalFinal
          this.divisaInicial = response.data.divisaInicial
          this.divisaFinal = response.data.divisaFinal
          if (this.divisaFinal == "1") {
            this.divisa = 1
            this.divisaFinal = "USD"
          } else {
            this.divisa = 2
            this.divisaFinal = "MXN"
          }
          this.serie = response.data.serie
          this.folio = response.data.folio
          this.folioConsecutivo = response.data.folioConsecutivo
          this.estatus = response.data.estatus
          if (this.estatus == 0) {
            this.nombrestatus = "PENDIENTE"
          } else if (this.estatus == 1) {
            this.nombrestatus = "ACEPTADO"
          } else if (this.estatus == 2) {
            this.nombrestatus = "RECHAZADO"
          } else if (this.estatus == 4) {
            this.nombrestatus = "COTIZANDO"
          }
          this.usuario = response.data.usuario
          this.diasTransito = response.data.diasTransito
          this.velocidadEnvio = response.data.velocidadEnvio //Aqui hay algo
          this.embalaje = response.data.embalaje

          if (response.data.embalaje === "1") {
            this.embalaje = 'PALLETS'
          } else if (response.data.embalaje === "2") {
            this.embalaje = 'SACOS'
          } else if (response.data.embalaje === "3") {
            this.embalaje = 'BULTO'
          } else if (response.data.embalaje === "4") {
            this.embalaje = 'TAMBOS'
          } else if (response.data.embalaje === "5") {
            this.embalaje = 'ROLLOS'
          } else if (response.data.embalaje === "6") {
            this.embalaje = 'CAJAS'
          } else if (response.data.embalaje === "7") {
            this.embalaje = 'TUBOS'
          } else if (response.data.embalaje === "8") {
            this.embalaje = 'CARGA SUELTA'
          } else if (response.data.embalaje === "9") {
            this.embalaje = 'SUPER SACO'
          } else if (response.data.embalaje === "10") {
            this.embalaje = 'OTRO'
          } else if (response.data.embalaje === "11") {
            this.embalaje = 'BIDONES'
          } else if (response.data.embalaje === "12") {
            this.embalaje = 'CUÑETES'
          }
          this.estibable = response.data.estibable
          this.clasificacion = response.data.idclasificacion
          this.primerCambio = response.data.primerCambio
          this.cambiosConsecutivo = response.data.cambiosConsecutivo
          
            axios({
              method: "post",
              url: '/api/v1/detalleUnit/',
              data: {
                data: response.data.idclasificacion,
              },
            })
              .then((response) => {
                this.clasificacionText = response.data[0].descripcion
              })
              .catch((error) => {
                console.log(error);
              });
          this.cantidad = response.data.cantidad
          this.volumen = response.data.volumen
          this.pesoTotal = response.data.pesoTotal
          this.descrip = response.data.descrip
          this.getServicesAdd()
          this.getContacAdd()
          this.obtenerZona(response.data.cpOrigen, response.data.cpDestino);

        })
        .catch((error) => {
          console.log(error);
        });

    },

    getServicesAdd() {
      axios({
        method: "post",
        url: "/api/v1/consultar-servicios-agregados/",
        data: {
          idcotizacion: this.idCotizacion,
        },
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {

          let nombre = ''
          let subtotal = 0
          let basePorcOpt = 0
          let basePorcExp = 0
          let iva = 0
          let ret = 0
          let total = 0
          let porcentajeBaseOpt = 0
          let precioBaseOpt = 0
          let porcentajeIvaOpt = 0
          let totalOpt = 0
          let monedaOpt = 0
          let porcentajeBaseExp = 0
          let precioBaseExp = 0
          let porcentajeIvaExp = 0
          let totalExp = 0
          let monedaExp = 0

          subtotal = parseFloat(response.data[i].subtotal)
          basePorcOpt = parseFloat(response.data[i].porcentajeVenta)
          basePorcExp = parseFloat(response.data[i].porcentajeXpress)
          iva = parseFloat(response.data[i].iva)
            
          if(response.data[i].retencion === null){
            ret = 0
          }else{
            ret = parseFloat(response.data[i].retencion)
          }
            
          total = response.data[i].total

          /*------------------------------------INICIA OPTIMO------------------------------------*/

          porcentajeBaseOpt = subtotal * ((basePorcOpt) / 100); // 2000 * ((10+13)/100) = 460

          precioBaseOpt = subtotal + porcentajeBaseOpt; // 2000 + 460 = 2460

          porcentajeIvaOpt = precioBaseOpt * (iva / 100); // 2460 * (16 / 100) = 393.6

          totalOpt = precioBaseOpt + porcentajeIvaOpt;

          monedaOpt = totalOpt / parseFloat(this.valorDolar);      

          /*------------------------------------TERMINA OPTIMO------------------------------------*/

          /*------------------------------------INICIA EXPRESS------------------------------------*/

          porcentajeBaseExp = subtotal * ((basePorcExp ) / 100); // 2000 * ((10+13)/100) = 460

          precioBaseExp = subtotal + porcentajeBaseOpt + porcentajeBaseExp; // 2000 + 460 + 460 = 2920

          porcentajeIvaExp = precioBaseExp * (iva / 100); // 2460 * (16 / 100) = 467.20

          totalExp = precioBaseExp + porcentajeIvaExp; // 2920 + 467.20

          monedaExp = totalExp / parseFloat(this.valorDolar);

          /*------------------------------------TERMINA EXPRESS------------------------------------*/

          let agregar = {

            idService: response.data[i].idService,
            nameService: response.data[i].nameService,
            priceService: response.data[i].priceService,
            id:response.data[i].id,

            idcotizacion: response.data[i].idcotizacion,
            iva: response.data[i].iva,
            retencion: response.data[i].retencion,
            subtotal: response.data[i].subtotal,
            total: response.data[i].total,
            porcentajeXpress: response.data[i].porcentajeXpress,
            porcentajeVenta: response.data[i].porcentajeVenta,
            ajusteVenta: response.data[i].ajusteVenta,
            agregado: response.data[i].agregado,
            ajusteTotal: response.data[i].ajusteTotal,
            porcentaje : response.data[i].porcentaje,
            idVenta: response.data[i].idVenta,
            divisa: response.data[i].divisa,

            porcentajeBaseOpt: porcentajeBaseOpt,
            basePorcOpt: basePorcOpt,
            porcentajeIvaOpt: porcentajeIvaOpt,
            monedaOpt: monedaOpt,
            precioBaseOpt: precioBaseOpt,
            totalOpt: totalOpt,

            porcentajeBaseExp: porcentajeBaseExp,
            basePorcExp: basePorcExp,
            porcentajeIvaExp: porcentajeIvaExp,
            monedaExp: monedaExp,
            precioBaseExp: precioBaseExp,
            totalExp: totalExp,
              
            porcentajeBaseOptExt: response.data[i].porcentajeBaseOptExt,
            basePorcOptExt: response.data[i].basePorcOpt,
            porcentajeIvaOptExt: response.data[i].porcentajeIvaOpt,
            monedaOptExt: response.data[i].monedaOptExt,
            precioBaseOptExt: response.data[i].precioBaseOptExt,
            totalOptExt: response.data[i].totalOptExt,

            porcentajeBaseExpExt: response.data[i].porcentajeBaseExpExt,
            basePorcExpExt: response.data[i].basePorcExp,
            porcentajeIvaExpExt: response.data[i].porcentajeIvaExp,
            monedaExpExt: response.data[i].monedaExpExt,
            precioBaseExpExt: response.data[i].precioBaseExpExt,
            totalExpExt: response.data[i].totalExpExt,
            porcentajeExtra: response.data[i].porcentajeExtra,

            eliminar: 0,
          }
          
          this.dataServiciosAgregados.push(agregar)
          this.confirmarServices5.push(agregar) //SE RESPALDA LA INFORMACION DE dataServiciosAgregados PARA CONTROL DE CAMBIOS
          
        }
        
        this.validaBoton();
        this.Total();
        
      }).catch((error) => {
        console.log(error);
      });
    },

    getContacAdd() {
      let i
      axios({
        method: "post",
        url: "/api/v1/consultar-contacto-agregado/",
        data: {
          idcotizacion: this.idCotizacion,
        },
      })
        .then((response) => {
          for (i = 0; i < response.data.length; i++) {
            this.name = response.data[i].name
            this.lada = response.data[i].lada
            if (this.lada == 1) {
              this.lada = "+52"
            } else {
              this.lada = "1"
            }
            this.phone = response.data[i].phone
            this.email = response.data[i].email
            this.productname = response.data[i].productname
            this.description = response.data[i].description
          }

        })
        .catch((error) => {
          console.log(error);
        });
    },

    showRejectedAcepted(valor) {

      // Inicia Suma
      let vid = 0
      let agregado = 0
      let ajuste = ""
      let checar = ""
      let sumaV = 0
      let sumaF = 0
      let sumaFinal = 0

      let priceOriginal = 0

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        vid = this.dataServiciosAgregados[i].idService
        agregado = this.dataServiciosAgregados[i].ajusteTotal
        priceOriginal = this.dataServiciosAgregados[i].priceService

        checar = document.getElementById(vid + 'check').checked
        sumaV = document.getElementById(vid + 'sumaTotal').value
        ajuste = document.getElementById(vid + 'seleccionImpuesto').value

        if (checar == true) {
          if (ajuste == 0 || ajuste == "") {
            sumaFinal = this.trunc(sumaFinal) + this.trunc(parseFloat(agregado))
          } else {

            if (sumaV == 0 || sumaV == "") {
              sumaFinal = this.trunc(sumaFinal) + this.trunc(parseFloat(agregado))
            } else {
              sumaFinal = this.trunc(sumaFinal) + this.trunc(parseFloat(sumaV))
            }

          }

        } else if (checar == false) {
          sumaF = parseFloat(priceOriginal)
          sumaFinal = sumaFinal + parseFloat(sumaF)
          sumaFinal = this.trunc(sumaFinal)
        }

      }
      

      this.$bvModal.hide('modalCerrarCotizacion')
      const idC = this.$route.params.pkCotizacion;

      if (valor == 1) {
        this.$bvModal.show('modalStatus')
      } else if (valor == 2) {

        axios({
          method: "put",
          url: `servicioCotizaciones/${idC}/`,
          data: {
            estatus: 1,
            precioTotalFinal: sumaFinal
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.getCotizacion()
            //this.guardarServicios()
            Swal.fire({
              title: 'Correcto',
              text: 'Cotizacion Aceptada Exitosamente',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
          })
          .catch((error) => {
            console.log(error);
          });

      } else if (valor == 3) {
        this.$bvModal.hide('modalStatus')

        axios({
          method: "put",
          url: `servicioCotizaciones/${idC}/`,
          data: {
            estatus: 2,
            rechazo: this.rechazado
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
            this.getCotizacion()
            this.guardarServicios()
            Swal.fire({
              title: 'Correcto',
              text: 'Cotizacion Rechazada Exitosamente',
              icon: 'success',
              confirmButtonText: 'Cerrar',
            })
          })
          .catch((error) => {
            console.log(error);
          });

      }

    },

    guardarServicios() {

      let vid = 0
      ///////
      let totalFinal = 0
      let venta = ""
      let porcentajes = ""
      let agregados = 0
      ///////
      let totalFinal2 = 0
      let venta2 = ""
      let porcentajes2 = ""
      let agregados2 = 0
      ///////
      let checar = ""
      let sumaV = 0
      let ajuste = ""
      let agrega = 0
      ///////
      let priceOrigen = 0

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        vid = this.dataServiciosAgregados[i].id

        totalFinal = this.dataServiciosAgregados[i].ajusteTotal
        venta = this.dataServiciosAgregados[i].ajusteVenta
        porcentajes = this.dataServiciosAgregados[i].porcentaje
        agregados = this.dataServiciosAgregados[i].agregado
        priceOrigen = this.dataServiciosAgregados[i].priceService

        checar = document.getElementById(vid + 'check').checked
        sumaV = document.getElementById(vid + 'sumaTotal').value
        ajuste = document.getElementById(vid + 'seleccionImpuesto').value
        agrega = document.getElementById(vid + 'impuestoOculto').value

        if (checar == true) {

          if (porcentajes == ajuste) {
            totalFinal2 = totalFinal
            venta2 = venta
            porcentajes2 = porcentajes
            agregados2 = agregados
          } else {
            totalFinal2 = sumaV
            venta2 = checar
            porcentajes2 = ajuste
            agregados2 = agrega
          }

        } else if (checar == false) {

          totalFinal2 = priceOrigen
          venta2 = false
          porcentajes2 = 0
          agregados2 = 0

        }

        // Inicia Axios
        axios({
          method: "put",
          url: `servicioAgregados/${vid}/`,
          data: {
            ajusteTotal: totalFinal2,
            ajusteVenta: venta2,
            porcentaje: porcentajes2,
            agregado: agregados2,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
        // Fin Axios

      }

    },

    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    loadServices() {

      this.priceFinal = 0
      let suma = 0
      let ventaInicial = 0
      let mostrar = ""
      
      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        ventaInicial = this.dataServiciosAgregados[i].priceService
        suma = this.dataServiciosAgregados[i].ajusteTotal
        mostrar = this.dataServiciosAgregados[i].ajusteVenta

        if (mostrar == true) {
          this.priceFinal = this.priceFinal + parseFloat(suma)
        } else if (mostrar == false) {
          this.priceFinal = this.priceFinal + parseFloat(suma)
        }

      }

    },

    /*mostrarImpuesto(valor2) {

      let porcentaje = document.getElementById(valor2 + 'escondeImpuesto').value
      let total = document.getElementById(valor2 + 'ocultarSumaTotal').value

      let ids = 0
      let porcentajes = 0
      let priceOrigen = 0

      if (porcentaje == 0 && total == 0) {
        this.impuestos = 1
        document.getElementById(valor2 + 'escondeImpuesto').value = 1
        document.getElementById(valor2 + 'ocultarSumaTotal').value = 1
        document.getElementById(valor2 + 'seleccionImpuesto').hidden = false
        document.getElementById(valor2 + 'sumaTotal').hidden = false

        let comprobar = document.getElementById(valor2 + 'check').checked

        if (comprobar == true) {

          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
            ids = this.dataServiciosAgregados[i].id
            porcentajes = this.dataServiciosAgregados[i].porcentaje
            priceOrigen = this.dataServiciosAgregados[i].priceService

            if (valor2 == ids) {
              document.getElementById(valor2 + 'seleccionImpuesto').value = porcentajes
            }

          }
          this.Total()
          this.sumaFinal()
        } else if (comprobar == false) {

          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
            ids = this.dataServiciosAgregados[i].id
            porcentajes = this.dataServiciosAgregados[i].porcentaje

            if (valor2 == ids) {
              this.priceFinal
              document.getElementById(valor2 + 'sumaTotal').value = priceOrigen
              this.Total()
              this.sumaFinal()
            }

          }
          this.Total()
          this.sumaFinal()

        }

      } else if (porcentaje == 1 && total == 1) {
        document.getElementById(valor2 + 'escondeImpuesto').value = 0
        document.getElementById(valor2 + 'ocultarSumaTotal').value = 0

        document.getElementById(valor2 + 'seleccionImpuesto').hidden = true
        document.getElementById(valor2 + 'sumaTotal').hidden = true

        let comprobar = document.getElementById(valor2 + 'check').checked

        if (comprobar == false) {
          document.getElementById(valor2 + 'sumaTotal').value = 0
          document.getElementById(valor2 + 'impuestoOculto').value = 0
          document.getElementById(valor2 + 'seleccionImpuesto').value = 0
          this.Total()
          this.sumaFinal()
        }



      }

      this.Total()

    },*/

    mostrarImpuesto(valor2) {
      
      let porcentaje = document.getElementById(valor2 + 'escondeImpuesto').value
      let total = document.getElementById(valor2 + 'ocultarSumaTotal').value
      
      let ids = 0
      let porcentajes = 0
      let priceOrigen = 0

      let comprobar = document.getElementById(valor2 + 'check').checked

      this.generaCambios(valor2, 'Check', comprobar)

      if (porcentaje == 0 && total == 0) {

        this.impuestos = 1
        document.getElementById(valor2 + 'escondeImpuesto').value = 1
        document.getElementById(valor2 + 'ocultarSumaTotal').value = 1
        document.getElementById(valor2 + 'seleccionImpuesto').hidden = false
        document.getElementById(valor2 + 'sumaTotal').hidden = false
      
        if (comprobar == true) {

          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
            ids = this.dataServiciosAgregados[i].id
            porcentajes = this.dataServiciosAgregados[i].porcentaje
            priceOrigen = this.dataServiciosAgregados[i].priceService

            if (valor2 == ids) {
              document.getElementById(valor2 + 'seleccionImpuesto').value = porcentajes
            }

          }
        } else if (comprobar == false) {

          this.restauraExtra(valor2);
          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
            ids = this.dataServiciosAgregados[i].id
            porcentajes = this.dataServiciosAgregados[i].porcentaje

            if (valor2 == ids) {
              this.priceFinal
              document.getElementById(valor2 + 'sumaTotal').value = priceOrigen
              
            }

          }

        }

      } else if (porcentaje == 1 && total == 1) {
        document.getElementById(valor2 + 'escondeImpuesto').value = 0
        document.getElementById(valor2 + 'ocultarSumaTotal').value = 0

        document.getElementById(valor2 + 'seleccionImpuesto').hidden = true
        document.getElementById(valor2 + 'sumaTotal').hidden = true

        if (comprobar == false) {
          this.restauraExtra(valor2);
          document.getElementById(valor2 + 'sumaTotal').value = 0
          document.getElementById(valor2 + 'impuestoOculto').value = 0
          document.getElementById(valor2 + 'seleccionImpuesto').value = 0
        }
      }

    },

    Total(){
      this.totalRetOpt = 0;
      this.totalRetExp = 0;
      this.totalIvaOpt = 0;
      this.totalIvaExp = 0;
      this.totalPrecioOpt = 0;
      this.totalPrecioExp = 0;
      this.totalTotalOpt = 0;
      this.totalTotalExp = 0;

      if(this.dataServiciosAgregados.length > 0){
        if(this.velocidadEnvio.toUpperCase() == 'OPTIMO'){
          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
            if(this.dataServiciosAgregados[i].priceService > 0){
              if(parseFloat(this.dataServiciosAgregados[i].porcentajeExtra) > 0){

                this.totalPrecioOpt = this.totalPrecioOpt + parseFloat(this.dataServiciosAgregados[i].precioBaseOptExt)
                
                this.totalIvaOpt =  this.totalIvaOpt + parseFloat(this.dataServiciosAgregados[i].porcentajeIvaOptExt)
                
                this.totalRetOpt =  0 //this.totalRetOpt + parseFloat(this.dataServiciosAgregados[i].retencion)
                
              }else{
                this.totalPrecioOpt = this.totalPrecioOpt + parseFloat(this.dataServiciosAgregados[i].precioBaseOpt)
                
                this.totalIvaOpt =  this.totalIvaOpt + parseFloat(this.dataServiciosAgregados[i].porcentajeIvaOpt)
                
                this.totalRetOpt =  0 //this.totalRetOpt + parseFloat(this.dataServiciosAgregados[i].retencion)
                
              }
            }
          }
          
          this.totalTotalOpt = this.totalPrecioOpt + this.totalIvaOpt + this.totalRetOpt
          
        }else{
          for (let i = 0; i < this.dataServiciosAgregados.length; i++) {

            if(this.dataServiciosAgregados[i].priceService > 0){
              if(parseFloat(this.dataServiciosAgregados[i].porcentajeExtra) > 0){
                this.totalPrecioExp = this.totalPrecioExp + parseFloat(this.dataServiciosAgregados[i].precioBaseExpExt)
                this.totalIvaExp =  this.totalIvaExp + parseFloat(this.dataServiciosAgregados[i].porcentajeIvaExpExt)
                this.totalRetExp =  0 //this.totalRetExp + parseFloat(this.dataServiciosAgregados[i].ret)
              }else{
                this.totalPrecioExp = this.totalPrecioExp + parseFloat(this.dataServiciosAgregados[i].precioBaseExp)
                this.totalIvaExp =  this.totalIvaExp + parseFloat(this.dataServiciosAgregados[i].porcentajeIvaExp)
                this.totalRetExp =  0 //this.totalRetExp + parseFloat(this.dataServiciosAgregados[i].ret)
              }
            }
          
          }
          this.totalTotalExp = this.totalPrecioExp + this.totalIvaExp + this.totalRetExp
        }
      }
    },

    /*Total() {

      let vid = 0
      let agregado = 0
      let porcentajes = 0
      let precioInicial = 0
      let ajuste = ""
      let checar = ""
      let sumaV = 0

      this.priceFinal = 0

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {

        vid = this.dataServiciosAgregados[i].id
        agregado = this.dataServiciosAgregados[i].ajusteTotal
        porcentajes = this.dataServiciosAgregados[i].porcentaje
        precioInicial = this.dataServiciosAgregados[i].priceService

        checar = document.getElementById(vid + 'check').checked
        sumaV = document.getElementById(vid + 'sumaTotal').value
        ajuste = document.getElementById(vid + 'seleccionImpuesto').value

        if (checar == true) {

          if (sumaV == 0 || sumaV == "" || sumaV == null) {
            document.getElementById(vid + 'seleccionImpuesto').value = ajuste
            document.getElementById(vid + 'sumaTotal').value = agregado
            this.priceFinal = this.priceFinal + parseFloat(agregado)
          } else {
            this.priceFinal = this.priceFinal + parseFloat(sumaV)
          }

        } else if (checar == false) {

          if (sumaV == 0 || sumaV == "" || sumaV == null) {
            document.getElementById(vid + 'seleccionImpuesto').value = ajuste
            document.getElementById(vid + 'sumaTotal').value = precioInicial
            this.priceFinal = this.priceFinal + parseFloat(agregado)
          } else {
            this.priceFinal = this.priceFinal + parseFloat(sumaV)
          }

        }

        // if(checar == true){
        //   if(ajuste == 0 || ajuste == ""){
        //     this.priceFinal = this.priceFinal + parseFloat(agregado)            
        //   }else{

        //     if(sumaV == 0 || sumaV == ""){
        //     this.priceFinal = this.priceFinal + parseFloat(agregado)
        //     }else{
        //       this.priceFinal = this.priceFinal + parseFloat(sumaV)
        //     }

        //   }

        // }else if(checar == false){
        //   sumaF = parseFloat(agregado)
        //   this.priceFinal = this.priceFinal + parseFloat(sumaF)
        // }

      }
    },*/

    /*sumaImpuesto(event, id, precio) {

      let ids = id
      let precios = precio
      let porcentaje = 0

      porcentaje = event.target.value

      let precioInicial = 0
      let precioFinal = 0

      precioInicial = parseInt(porcentaje) / 100
      precioInicial = precioInicial * parseFloat(precios)
      precioInicial = this.trunc(precioInicial, 2)

      precioFinal = parseFloat(precios) + parseFloat(precioInicial)
      precioFinal = this.trunc(precioFinal, 2)

      document.getElementById(ids + 'sumaTotal').value = precioFinal
      document.getElementById(ids + 'impuestoOculto').value = precioInicial

      this.sumaFinal()
    },*/

    sumaImpuesto(event, id, precio){

      let ids = id;
      let precios = precio;
      let porcentaje = 0;

      let nombre = '';

      let precioInicial = 0;
      let precioFinal = 0;
      let subtotal = 0;
      let iva = 0;
      let ret = 0;

      let porcentajeBaseOpt = 0
      let precioBaseOpt = 0
      let porcentajeIvaOpt = 0
      let totalOpt = 0
      let monedaOpt = 0
      let porcentajeBaseExp = 0
      let precioBaseExp = 0
      let porcentajeIvaExp = 0
      let totalExp = 0
      let monedaExp = 0

      let porcentajeBaseOptExt = 0;
      let basePorcOpt = 0;
      let porcentajeIvaOptExt = 0;
      let monedaOptExt = 0;
      let precioBaseOptExt = 0;
      let totalOptExt = 0;

      let porcentajeBaseExpExt = 0;
      let basePorcExp = 0;
      let porcentajeIvaExpExt = 0;
      let monedaExpExt = 0;
      let precioBaseExpExt = 0;
      let totalExpExt = 0;


      porcentaje = parseFloat(event.target.value);

      this.generaCambios(id, 'Change', porcentaje)

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        if(this.dataServiciosAgregados[i].idService == ids){
          nombre = this.dataServiciosAgregados[i].nameService
          subtotal = parseFloat(this.dataServiciosAgregados[i].subtotal)
          basePorcOpt = parseFloat(this.dataServiciosAgregados[i].porcentajeVenta)
          basePorcExp = parseFloat(this.dataServiciosAgregados[i].porcentajeXpress)
          iva = parseFloat(this.dataServiciosAgregados[i].iva)
          if(this.dataServiciosAgregados[i].retencion === null){
            ret = 0
          }else{
            ret = parseFloat(this.dataServiciosAgregados[i].retencion)
          }
          
          
        }
      }

      /*------------------------------------INICIA OPTIMO------------------------------------*/

      porcentajeBaseOpt = subtotal * ((basePorcOpt) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseOpt = subtotal + porcentajeBaseOpt; // 2000 + 460 = 2460

      porcentajeIvaOpt = precioBaseOpt * (iva / 100); // 2460 * (16 / 100) = 393.6

      totalOpt = precioBaseOpt + porcentajeIvaOpt;

      monedaOpt = totalOpt / parseFloat(this.valorDolar);      

      /*------------------------------------TERMINA OPTIMO------------------------------------*/

      /*------------------------------------INICIA EXPRESS------------------------------------*/

      porcentajeBaseExp = subtotal * ((basePorcExp ) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseExp = subtotal + porcentajeBaseOpt + porcentajeBaseExp; // 2000 + 460 + 460 = 2920

      porcentajeIvaExp = precioBaseExp * (iva / 100); // 2460 * (16 / 100) = 467.20

      totalExp = precioBaseExp + porcentajeIvaExp; // 2920 + 467.20

      monedaExp = totalExp / parseFloat(this.valorDolar);

      /*------------------------------------TERMINA EXPRESS------------------------------------*/

      /*------------------------------------INICIA OPTIMO EXTRA------------------------------------*/

      porcentajeBaseOptExt = subtotal * ((basePorcOpt + porcentaje) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseOptExt = subtotal + porcentajeBaseOptExt; // 2000 + 460 = 2460

      porcentajeIvaOptExt = precioBaseOptExt * (iva / 100); // 2460 * (16 / 100) = 393.6

      totalOptExt = precioBaseOptExt + porcentajeIvaOptExt;

      monedaOptExt = totalOptExt / parseFloat(this.valorDolar);      

      /*------------------------------------TERMINA OPTIMO EXTRA------------------------------------*/

      /*------------------------------------INICIA EXPRESS EXTRA------------------------------------*/

      porcentajeBaseExpExt = subtotal * ((basePorcExp + porcentaje ) / 100); // 2000 * ((10+13)/100) = 460

      precioBaseExpExt = subtotal + porcentajeBaseOptExt + porcentajeBaseExpExt; // 2000 + 460 + 460 = 2920

      porcentajeIvaExpExt = precioBaseExpExt * (iva / 100); // 2460 * (16 / 100) = 467.20

      totalExpExt = precioBaseExpExt + porcentajeIvaExpExt; // 2920 + 467.20

      monedaExpExt = totalExpExt / parseFloat(this.valorDolar);

      /*------------------------------------TERMINA EXPRESS EXTRA------------------------------------*/

      if(this.velocidadEnvio.toUpperCase() == 'OPTIMO' && porcentaje > 0){      
        precioInicial = parseFloat(porcentajeBaseOptExt);
        precioFinal = parseFloat(totalOptExt);
      }else if(this.velocidadEnvio.toUpperCase() == 'OPTIMO' && porcentaje == 0){
        precioInicial = parseFloat(porcentajeBaseOpt);
        precioFinal = parseFloat(totalOpt);
      }else if (this.velocidadEnvio.toUpperCase() == 'EXPRESS' && porcentaje > 0){
        precioInicial = parseFloat(porcentajeBaseExpExt);
        precioFinal = parseFloat(totalExpExt);
      }else if (this.velocidadEnvio.toUpperCase() == 'EXPRESS' && porcentaje == 0){
        precioInicial = parseFloat(porcentajeBaseExp);
        precioFinal = parseFloat(totalExp);
      }

      
      if(this.divisa == 2 ){
        document.getElementById(ids + "sumaTotal").value = precioFinal;
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      }else{
        precioFinal = precioFinal / this.valorDolar
        precioFinal = this.trunc(precioFinal,2)
        document.getElementById(ids + "sumaTotal").value = precioFinal;

        precioInicial = precioInicial / this.valorDolar
        precioInicial = this.trunc(precioInicial,2)
        document.getElementById(ids + "impuestoOculto").value = precioInicial;
      }

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {

        if(this.dataServiciosAgregados[i].idService == ids){
          let agregado = {

            
            idService: this.dataServiciosAgregados[i].idService,
            nameService: this.dataServiciosAgregados[i].nameService,
            priceService: parseFloat(this.dataServiciosAgregados[i].priceService),
            iva: parseFloat(this.dataServiciosAgregados[i].iva),
            retencion: ret,
            subtotal: parseFloat(this.dataServiciosAgregados[i].subtotal),
            total: parseFloat(this.dataServiciosAgregados[i].total),
            porcentajeXpress: parseFloat(this.dataServiciosAgregados[i].porcentajeXpress),
            porcentajeVenta: parseFloat(this.dataServiciosAgregados[i].porcentajeVenta),
            ajusteVenta: this.dataServiciosAgregados[i].ajusteVenta,
            agregado: precioInicial,
            ajusteTotal: precioFinal,
            eliminar: this.dataServiciosAgregados[i].eliminar,
            idcotizacion: this.dataServiciosAgregados[i].idcotizacion,
            porcentaje: porcentaje,
            basePorcExpExt: basePorcExp,
            basePorcOptExt: basePorcOpt,
            idVenta: this.dataServiciosAgregados[i].idVenta,
            divisa: this.dataServiciosAgregados[i].divisa,
            id: this.dataServiciosAgregados[i].id,

            porcentajeBaseOpt: porcentajeBaseOpt,
            basePorcOpt: basePorcOpt,
            porcentajeIvaOpt: porcentajeIvaOpt,
            monedaOpt: monedaOpt,
            precioBaseOpt: precioBaseOpt,
            totalOpt: totalOpt,

            porcentajeBaseExp: porcentajeBaseExp,
            basePorcExp: basePorcExp,
            porcentajeIvaExp: porcentajeIvaExp,
            monedaExp: monedaExp,
            precioBaseExp: precioBaseExp,
            totalExp: totalExp,

            porcentajeBaseOptExt: porcentajeBaseOptExt,
            basePorcOpt: basePorcOpt,
            porcentajeIvaOptExt: porcentajeIvaOptExt,
            monedaOptExt: monedaOptExt,
            precioBaseOptExt: precioBaseOptExt,
            totalOptExt: totalOptExt,

            porcentajeBaseExpExt: porcentajeBaseExpExt,
            basePorcExp: basePorcExp,
            porcentajeIvaExpExt: porcentajeIvaExpExt,
            monedaExpExt: monedaExpExt,
            precioBaseExpExt: precioBaseExpExt,
            totalExpExt: totalExpExt,

            porcentajeExtra: porcentaje,

          };
            
            this.arrayResp.push(agregado)

          }else{

            this.arrayResp.push(this.dataServiciosAgregados[i])

          }
          
        }
        

      this.dataServiciosAgregados = []

      this.dataServiciosAgregados = this.arrayResp

      this.arrayResp = []

      this.validaBoton();

      this.Total();
    },

    sumaFinal() {

      this.Total()

      this.priceFinal = 0

      let vid = 0
      let agregado = 0

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        vid = this.dataServiciosAgregados[i].id
        agregado = document.getElementById(vid + 'sumaTotal').value
        agregado = parseFloat(agregado)
        this.priceFinal = this.priceFinal + parseFloat(agregado)
      }

    },

    trunc(x, posiciones = 0) {
      let s = x.toString()
      let l = s.length
      let decimalLength = s.indexOf('.') + 1

      if (l - decimalLength <= posiciones) {
        return x
      }
      // Parte decimal del número
      let isNeg = x < 0
      let decimal = x % 1
      let entera = isNeg ? Math.ceil(x) : Math.floor(x)
      // Parte decimal como número entero
      // Ejemplo: parte decimal = 0.77
      // decimalFormated = 0.77 * (10^posiciones)
      // si posiciones es 2 ==> 0.77 * 100
      // si posiciones es 3 ==> 0.77 * 1000
      let decimalFormated = Math.floor(
        Math.abs(decimal) * Math.pow(10, posiciones)
      )
      // Sustraemos del número original la parte decimal
      // y le sumamos la parte decimal que hemos formateado
      let finalNum = entera +
        ((decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1))

      return finalNum;
    },

    obtenerZona(cpO,cpD){

      let v1 = cpO
      let v2 = cpD

      if(v1 != '' && v2 != ''){

        axios({
          method: "post",
          url: "/api/v1/buscaZonaCP/",
          data: {
            codPosO: v1,
            codPosD: v2,
          },
          auth: {
            username: "admin",
            password: "123",
          },
        }).then((response) => {

          if(response.data.origen.length){
            this.clasificacionZonaO = response.data.origen[0].clasificacion
          }else{
            this.clasificacionZonaO = ""
          }

          if(response.data.destino.length){
            this.clasificacionZonaD = response.data.destino[0].clasificacion
          }else{
            this.clasificacionZonaD = ""
          }

          if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'COMERCIAL'
            this.notColorZona = 'success'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'PELIGROSA'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'NO COMERCIAL' || this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == 'PELIGROSA' || this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == 'PELIGROSA' || this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'COMERCIAL' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'COMERCIAL'){
            this.resClasificaZona = 'COMERCIAL'
            this.notColorZona = 'success'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Comercial</b>.'
          }else if(this.clasificacionZonaO == 'NO COMERCIAL' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'NO COMERCIAL'){
            this.resClasificaZona = 'NO COMERCIAL'
            this.notColorZona = 'warning'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>No Comercial</b>, tenga en cuenta posibles cambios en las tarifas.'
          }else if(this.clasificacionZonaO == 'PELIGROSA' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == 'PELIGROSA'){
            this.resClasificaZona = 'PELIGROSA'
            this.notColorZona = 'danger'
            this.notTextoZona = 'Se detecto que el servicio es para una zona <b>Peligrosa</b>, tenga en cuenta cambios en las tarifas.'
          }else if(this.clasificacionZonaO == '' && this.clasificacionZonaD == '' || this.clasificacionZonaO == '' && this.clasificacionZonaD == ''){
            this.resClasificaZona = 'NO ZONA'
            this.notColorZona = 'primary'
            this.notTextoZona = 'No existe Zona configurada para este servicio, <b>favor de realizar asignación</b>.'
          }

        }).catch((error) => {
          console.log(error);
        });
      }
    },

    restauraExtra(id){
      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {

        if(this.dataServiciosAgregados[i].idService == id){
          let agregado = {
            idService: this.dataServiciosAgregados[i].idService,
            nameService: this.dataServiciosAgregados[i].nameService,
            priceService: this.dataServiciosAgregados[i].priceService,
                      
            idcotizacion: this.dataServiciosAgregados[i].idcotizacion,
            iva: this.dataServiciosAgregados[i].iva,
            retencion: this.dataServiciosAgregados[i].retencion,
            subtotal: this.dataServiciosAgregados[i].subtotal,
            total: this.dataServiciosAgregados[i].total,
            porcentajeXpress: this.dataServiciosAgregados[i].porcentajeXpress,
            porcentajeVenta: this.dataServiciosAgregados[i].porcentajeVenta,
            ajusteVenta: this.dataServiciosAgregados[i].ajusteVenta,
            agregado: this.dataServiciosAgregados[i].agregado,
            ajusteTotal: this.dataServiciosAgregados[i].ajusteTotal,
            porcentaje : this.dataServiciosAgregados[i].porcentaje,
            idVenta: this.dataServiciosAgregados[i].idVenta,
            divisa: this.dataServiciosAgregados[i].divisa,
            id: this.dataServiciosAgregados[i].id,

            porcentajeBaseOpt: this.dataServiciosAgregados[i].porcentajeBaseOpt,
            basePorcOpt: this.dataServiciosAgregados[i].basePorcOpt,
            porcentajeIvaOpt: this.dataServiciosAgregados[i].porcentajeIvaOpt,
            monedaOpt: this.dataServiciosAgregados[i].monedaOpt,
            precioBaseOpt: this.dataServiciosAgregados[i].precioBaseOpt,
            totalOpt: this.dataServiciosAgregados[i].totalOpt,

            porcentajeBaseExp: this.dataServiciosAgregados[i].porcentajeBaseExp,
            basePorcExp: this.dataServiciosAgregados[i].basePorcExp,
            porcentajeIvaExp: this.dataServiciosAgregados[i].porcentajeIvaExp,
            monedaExp: this.dataServiciosAgregados[i].monedaExp,
            precioBaseExp: this.dataServiciosAgregados[i].precioBaseExp,
            totalExp: this.dataServiciosAgregados[i].totalExp,

            porcentajeBaseOptExt: 0,
            basePorcOptExt: 0,
            porcentajeIvaOptExt: 0,
            monedaOptExt: 0,
            precioBaseOptExt: 0,
            totalOptExt: 0,

            porcentajeBaseExpExt: 0,
            basePorcExp: 0,
            porcentajeIvaExpExt: 0,
            monedaExpExt: 0,
            precioBaseExpExt: 0,
            totalExpExt: 0,

            porcentajeExtra: 0,

            eliminar: this.dataServiciosAgregados[i].eliminar,

          };
          
          this.arrayResp.push(agregado)

        }else{

          this.arrayResp.push(this.dataServiciosAgregados[i])

        }
      }

      this.dataServiciosAgregados = []

      this.dataServiciosAgregados = this.arrayResp

      this.arrayResp = []

      this.Total();
    },
      
    getLabelServ(item) {
      if (item) {
        //this.idclasifica = item.clave_prodserv; //SE APROVECHA Y SE ASIGNA VALOR A VARIABLE
        this.textNewService = item.codeproduct 
          
        //this.clasificaText = item.descripcion; //SE APROVECHA Y SE ASIGNA VALOR A VARIABLE
        return item.codeproduct;
      }
    },

    servicios(text) {
      let input = text;
      
      axios({
        method: "post",
        url: "/api/v1/search-service/",
        data: {
          data: input,
        },
      }).then((response) => {
        this.data_search_services = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },

    cerrarModalServicio() {
      this.$refs['add-service'].hide()
    },
        
    guardaNuevoServicio() {

      let existeServ = false;

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        if(this.dataServiciosAgregados[i].nameService == this.new_servicio.nameproduct){
          existeServ = true
        }
        
      }

      if(existeServ){
        Swal.fire({
            title: "El servicio seleccionado ya está dentro de la cotización. Agrega uno distinto porfavor.",
            text: "",
            icon: "info",
            confirmButtonText: "Cerrar",
          });
      }else{
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
          title: "Agregar Servicio",
          text: "¿Estas seguro que quieres agregar el servicio " + this.new_servicio.nameproduct + "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {

            axios({
                method: "post",
                url: "/api/v1/consultar-servicios/",
                data: {
                  data: this.new_servicio.nameproduct,
                },
              }).then((response) => {

                if(response.data.length == 0){
                  Swal.fire({
                    title: "El servicio seleccionado no existe o esta vencido. Verificalo con Pricing porfavor.",
                    text: "",
                    icon: "info",
                    confirmButtonText: "Cerrar",
                  });
                }else{
                
                  let nombre = ''
                  let subtotal = 0
                  let basePorcOpt = 0
                  let basePorcExp = 0
                  let iva = 0
                  let ret = 0
                  let total = 0
                  let porcentajeBaseOpt = 0
                  let precioBaseOpt = 0
                  let porcentajeIvaOpt = 0
                  let totalOpt = 0
                  let monedaOpt = 0
                  let porcentajeBaseExp = 0
                  let precioBaseExp = 0
                  let porcentajeIvaExp = 0
                  let totalExp = 0
                  let monedaExp = 0
                  let idVenta = 0
                  let id = 0

                  for (let i = 0; i < response.data.length; i++) {
                    nombre = response.data[i].servicio
                    subtotal = parseFloat(response.data[i].subtotal)
                    basePorcOpt = parseFloat(response.data[i].porcentajeVenta)
                    basePorcExp = parseFloat(response.data[i].porcentajeXpress)
                    iva = parseFloat(response.data[i].iva)
                    id = response.data[i].id
                    if(response.data[i].retencion === null){
                      ret = 0
                    }else{
                      ret = parseFloat(response.data[i].retencion)
                    }
                    total = response.data[i].total
                  }

                  if(!isNaN(subtotal)){
                    /*------------------------------------INICIA OPTIMO------------------------------------*/

                    porcentajeBaseOpt = subtotal * ((basePorcOpt) / 100); // 2000 * ((10+13)/100) = 460

                    precioBaseOpt = subtotal + porcentajeBaseOpt; // 2000 + 460 = 2460

                    porcentajeIvaOpt = precioBaseOpt * (iva / 100); // 2460 * (16 / 100) = 393.6

                    totalOpt = precioBaseOpt + porcentajeIvaOpt;

                    monedaOpt = totalOpt / parseFloat(this.valorDolar);      

                    /*------------------------------------TERMINA OPTIMO------------------------------------*/

                    /*------------------------------------INICIA EXPRESS------------------------------------*/

                    porcentajeBaseExp = subtotal * ((basePorcExp ) / 100); // 2000 * ((10+13)/100) = 460

                    precioBaseExp = subtotal + porcentajeBaseOpt + porcentajeBaseExp; // 2000 + 460 + 460 = 2920

                    porcentajeIvaExp = precioBaseExp * (iva / 100); // 2460 * (16 / 100) = 467.20

                    totalExp = precioBaseExp + porcentajeIvaExp; // 2920 + 467.20

                    monedaExp = totalExp / parseFloat(this.valorDolar);

                    /*------------------------------------TERMINA EXPRESS------------------------------------*/

                    let agregado = {
                      idService: this.new_servicio.id,
                      nameService: nombre,
                      priceService: parseFloat(total),
                      
                      idcotizacion: this.idCotizacion,
                      iva: parseFloat(iva),
                      retencion: ret,
                      subtotal: parseFloat(subtotal),
                      total: parseFloat(total),
                      porcentajeXpress: parseFloat(basePorcExp),
                      porcentajeVenta: parseFloat(basePorcOpt),
                      idVenta: idVenta,
                      divisa: this.divisa,
                      id: id,
                      ajusteVenta: false,
                      agregado: 0,
                      ajusteTotal: 0,
                      porcentaje : 0,

                      porcentajeBaseOpt: porcentajeBaseOpt,
                      basePorcOpt: basePorcOpt,
                      porcentajeIvaOpt: porcentajeIvaOpt,
                      monedaOpt: monedaOpt,
                      precioBaseOpt: precioBaseOpt,
                      totalOpt: totalOpt,

                      porcentajeBaseExp: porcentajeBaseExp,
                      basePorcExp: basePorcExp,
                      porcentajeIvaExp: porcentajeIvaExp,
                      monedaExp: monedaExp,
                      precioBaseExp: precioBaseExp,
                      totalExp: totalExp,

                      porcentajeBaseOptExt: 0,
                      basePorcOptExt: 0,
                      porcentajeIvaOptExt: 0,
                      monedaOptExt: 0,
                      precioBaseOptExt: 0,
                      totalOptExt: 0,

                      porcentajeBaseExpExt: 0,
                      basePorcExp: 0,
                      porcentajeIvaExpExt: 0,
                      monedaExpExt: 0,
                      precioBaseExpExt: 0,
                      totalExpExt: 0,

                      porcentajeExtra: 0,

                      eliminar: 1,

                    };
                    this.generaCambios(this.new_servicio.id,'Add','Agregar')
                    
                    this.new_servicios.push(agregado)
                    this.new_servicio = 0
                    this.dataServiciosAgregados.push(agregado)

                    this.Total();

                    this.validaBoton();
                  }else{
                    let agregado = {
                      idService: this.new_servicio.id,
                      nameService: nombre,
                      priceService: parseFloat(total),
                      
                      idcotizacion: this.idCotizacion,
                      idVenta: idVenta,
                      divisa: this.divisa,
                      iva: 0,
                      retencion: 0,
                      subtotal: 0,
                      total: parseFloat(total),
                      porcentajeXpress: parseFloat(basePorcExp),
                      porcentajeVenta: parseFloat(basePorcOpt),
                      ajusteVenta: false,
                      agregado: 0,
                      ajusteTotal: 0,
                      porcentaje : 0,

                      porcentajeBaseOpt: 0,
                      basePorcOpt: 0,
                      porcentajeIvaOpt: 0,
                      monedaOpt: 0,
                      precioBaseOpt: 0,
                      totalOpt: 0,

                      porcentajeBaseExp: 0,
                      basePorcExp: 0,
                      porcentajeIvaExp: 0,
                      monedaExp: 0,
                      precioBaseExp: 0,
                      totalExp: 0,

                      porcentajeBaseOptExt: 0,
                      basePorcOptExt: 0,
                      porcentajeIvaOptExt: 0,
                      monedaOptExt: 0,
                      precioBaseOptExt: 0,
                      totalOptExt: 0,

                      porcentajeBaseExpExt: 0,
                      basePorcExp: 0,
                      porcentajeIvaExpExt: 0,
                      monedaExpExt: 0,
                      precioBaseExpExt: 0,
                      totalExpExt: 0,

                      porcentajeExtra: 0,

                      eliminar: 1,

                    };

                    this.generaCambios(this.new_servicio.id,'Add','Agregar')
                    this.new_servicios.push(agregado)
                    this.new_servicio = 0
                    this.dataServiciosAgregados.push(agregado)
                    this.validaBoton();
                  }
                }
              }).catch((error) => {
                console.log(error);
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Servicio",
              "Confirmacion Cancelada",
              "error"
            );
          }
        });
        this.$refs['add-service'].hide()
      }
    },
    
    eliminarServicio(id){

      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        if(this.dataServiciosAgregados[i].idService != id){
          this.arrayResp.push(this.dataServiciosAgregados[i])
        }
      }
      
      this.dataServiciosAgregados = []

      this.dataServiciosAgregados = this.arrayResp

      this.arrayResp = []

      for (let i = 0; i < this.new_servicios.length; i++) {
        if(this.new_servicios[i].idService != id){
          this.arrayResp.push(this.new_servicios)
        }
      }

      this.new_servicios = []

      this.new_servicios = this.arrayResp

      this.arrayResp = []

      this.generaCambios(id,'Add','Eliminar')

      this.validaBoton();

      this.Total();
      
    },

    validaBoton(){
      this.vBoton = false
      for (let i = 0; i < this.dataServiciosAgregados.length; i++) {
        if(parseFloat(this.dataServiciosAgregados[i].subtotal) == 0 || isNaN(this.dataServiciosAgregados[i].subtotal)){
          this.vBoton = true
        }
      }
    },

    generaCambios(id, evento, valorEvento){
      let tipoCambio = ''
      let respControl = []

      console.log(id, evento, valorEvento)
      if(evento == 'Check'){
        tipoCambio = 1
      }else if (evento == 'Change') {
        tipoCambio = 2
      } else if (evento == 'Add'){
        tipoCambio = 3
      }

      //BUSCA COINCIDENCIA
      if(tipoCambio == 1){
        for (let i = 0; i < this.confirmarServices5.length; i++) {
         
          if(this.confirmarServices5[i].idService == id && this.confirmarServices5[i].ajusteVenta != valorEvento){

            let cambio = {
              idService: id,
              evento: evento,
              valorCambio: valorEvento,
              valorOriginal: this.confirmarServices5[i].ajusteVenta,
            }
            this.controlCambios.push(cambio)
            break;

          }else if(this.confirmarServices5[i].idService == id && this.confirmarServices5[i].ajusteVenta == valorEvento){
            for (let e = 0; e < this.controlCambios.length; e++) {

              if(this.controlCambios[e].idService != id){
                this.cambios.push(this.controlCambios[e])
              }
            }
            this.controlCambios = []

            this.controlCambios = this.cambios

            this.cambios = []
          }
        }
      }else if(tipoCambio == 2){

        for (let i = 0; i < this.confirmarServices5.length; i++) {

          if(this.confirmarServices5[i].idService == id && this.confirmarServices5[i].porcentaje != valorEvento){
          
            for (let e = 0; e < this.controlCambios.length; e++) {
              if(this.controlCambios[e].evento != 'Change'){  
              
                respControl.push(this.controlCambios[e])

              }
            }
            this.controlCambios = []

            this.controlCambios = respControl

            respControl = []

            let cambio = {
              idService: id,
              evento: evento,
              valorCambio: valorEvento,
              valorOriginal: this.confirmarServices5[i].porcentaje,
            }
            this.controlCambios.push(cambio)
            break;

          }else if(this.confirmarServices5[i].idService == id && this.confirmarServices5[i].porcentaje == valorEvento){
            for (let e = 0; e < this.controlCambios.length; e++) {
              if(this.controlCambios[e].evento != 'Change'){  
                
                respControl.push(this.controlCambios[e])

              }
            }
            this.controlCambios = []

            this.controlCambios = respControl

            respControl = []
          }
        }
      }else if(tipoCambio == 3){

        if(valorEvento == 'Agregar'){
          let cambio = {
            idService: id,
            evento: evento,
            valorCambio: valorEvento,
            valorOriginal: '',
          }
          this.controlCambios.push(cambio)
          this.nuevoServicio = true;
          
        }else if(valorEvento == 'Eliminar'){
          for (let h = 0; h < this.controlCambios.length; h++) {
            if(this.controlCambios[h].idService != id){
              respControl.push(this.controlCambios[h])
            }
            this.controlCambios = []

            this.controlCambios = respControl

            respControl = []
          }
          this.nuevoServicio = false;
        }
      }
    },

    guardarCambios(){
      if(this.controlCambios.length > 0){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });


        if(this.primerCambio == 0){
          swalWithBootstrapButtons.fire({
            title: "Guardar Cambios",
            text: "¿Estas seguro que quieres guardar los cambios realizados? Esta acción no generará folios consecutivos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              axios({
                method: "post",
                url: "/api/v1/editarServicios/",
                data: {
                  data: this.dataServiciosAgregados,
                  consecutivo: 0,
                },
              }).then((response) => {
                Swal.fire({
                  title: "Servicios",
                  text: "Los cambios se guardaron exitosamente.",
                  confirmButtonText: 'Aceptar',
                  allowOutsideClick: false,
                  icon:"success",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    this.reloadPage()
                  } 
                })
              }).catch((error) => {
                console.log(error);
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Guardar Cambios",
                "Cambios cancelados correctamente",
                "error"
              );
            }
          });
        }else{
          if(this.cambiosConsecutivo == 4){
            swalWithBootstrapButtons.fire({
                title: "Guardar Cambios",
                html: 'Llegaste al limite de intentos para modificar una cotización ' + 
                  '<br>Cambios realizados: <b>'+ this.cambiosConsecutivo + ' de 4</b>.',
                icon: "error",
            });
          }else{
            swalWithBootstrapButtons.fire({
            title: "Guardar Cambios",
            html: '¿Estas seguro que quieres guardar los cambios realizados? ' + 
            'Esta acción <b>generará folios consecutivos</b>, lo anterior para mantener un control en los cambios realizados. ' +
            '<br>Cambios realizados: <b>'+ this.cambiosConsecutivo + ' de 4</b>.',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              axios({
                method: "post",
                url: "/api/v1/editarServicios/",
                data: {
                  data: this.dataServiciosAgregados,
                  consecutivo: 1,
                },
              }).then((response) => {
                Swal.fire({
                  title: "Servicios",
                  text: "Los cambios se guardaron exitosamente.",
                  confirmButtonText: 'Aceptar',
                  allowOutsideClick: false,
                  icon:"success",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    this.reloadPage()
                  } 
                })
              }).catch((error) => {
                console.log(error);
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Guardar Cambios",
                "Cambios cancelados correctamente",
                "error"
              );
            }
          });
          }
        }
        if(this.nuevoServicio){
          this.enviaCorreoPricing(this.idCotizacion, this.folioConsecutivo)
        }
      }
    },

    enviaCorreoPricing(idCotiza, folioCons){
      axios({
        method: "post",
        url: "api/v1/sendEmailNuevoServicio/",
        data: {
          idcotizacion: idCotiza,
          folio: folioCons,
        },
      }).then((response) => {
      }).catch((error) => {
        console.log('err' + error);
      });
    },

    reloadPage() {
      //setTimeout(() => window.location.reload(),7000);
      window.location.reload()
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <b-container fluid>
      <b-card>
        <b-card-body>
          <b-container fluid style="background-color: #ffffff">
            <b-row style="">
              <table style="border-bottom:2px solid #00786c; table-layout: fixed; width: 100%;">
                  <tr>
                    <td style="border-bottom:8px solid #00786c; width: 20%;">
                      <div style="display: flex; align-items: center;">
                        <img src="../../../assets/images/logo_interland.png" alt="Logo Interland" style="width: 100%;" />
                      </div>
                    </td>
                    <td style="width: 60%;">
                      <div style="align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto;">
                        <p style="color:#000000"><b>INTERLAND TRANSPORT SA DE CV</b></p>
                        <p>Jaime  Balmes  11  Edificio  C  Piso  7  Of.  701B  Col.  Los  MoralesPolanco  Del.  Miguel  Hidalgo,  Ciudad  de  Mexico,  C.P.  11510,Mexico.</p>
                        <p>RFC: ITR071117UD1</p>
                        <p>Regimen: 601 - General de Ley Personas Morales.</p>
                      </div>
                    </td>
                    <td style="width: 20%;">
                      <div v-if="cambiosConsecutivo == 0" style="border:2px solid #6c757d; width:150px; align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto;"><b style="font-weight: bold; color: #00786c;">COTIZACIÓN</b> <br><b style="font-weight: bold; color: #000000;">FOLIO ID:</b> <br><b style="font-weight: bold; color: #000000;">{{ folioConsecutivo }}</b></div>
                      <div v-else style="border:2px solid #6c757d; width:150px; align-items: center; padding-right: 20px; padding-left: 20px; margin-right: auto; margin-left: auto;"><b style="font-weight: bold; color: #00786c;">COTIZACIÓN</b> <br><b style="font-weight: bold; color: #000000;">FOLIO ID:</b> <br><b style="font-weight: bold; color: #000000;">{{ folioConsecutivo }}-{{ cambiosConsecutivo }} </b></div>
                    </td>
                  </tr>
              </table>
            </b-row>
            <br />
            <b-row style="background-color: #6c757d;" class="text-left">
              <b-col cols="12" style="">
                <label style="color:#ffffff; vertical-align: bottom;">INFORMACIÓN GENERAL</label>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>FOLIO: </label>
                  <p v-if="cambiosConsecutivo == 0" class="text-muted"><b style="color:#6c757d">{{ folioConsecutivo }}</b></p>
                  <p v-else class="text-muted"><b style="color:#6c757d">{{ folioConsecutivo }}-{{ cambiosConsecutivo }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>ORIGEN: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ paisOrigen.toUpperCase() }}, {{ cpOrigen }},
                      {{ estadoOrigen.toUpperCase() }}, {{ ciudadOrigen.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>DESTINO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ paisDestino.toUpperCase() }}, {{ cpDestino }},
                      {{ estadoDestino.toUpperCase() }}, {{ ciudadDestino.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <label>DIVISA: </label>
                <p class="text-muted"><b style="color:#6c757d">{{ divisaFinal.toUpperCase() }}</b></p>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>FECHA DE COTIZACIÓN: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ fechaCarga }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>TIPO DE OPERACION: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ tipoOperacion }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>TIPO DE CARGA: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ tipoCarga.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>ESTATUS COTIZACIÓN: </label> <br />
                  <p v-if="nombrestatus == 'PENDIENTE'" class="badge badge-info" style="font-weight: bold">
                    {{ nombrestatus }} </p>
                  <p v-if="nombrestatus == 'ACEPTADO'" class="badge badge-success" style="font-weight: bold">
                    {{ nombrestatus }} </p>
                  <p v-if="nombrestatus == 'RECHAZADO'" class="badge badge-danger" style="font-weight: bold">
                    {{ nombrestatus }} </p>
                  <p v-if="nombrestatus == 'COTIZANDO'" class="badge badge-secondary" style="font-weight: bold">
                    {{ nombrestatus }} </p>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <!--b-col cols="3">
                <b-form-group>
                  <label>DÍAS DE TRANSITO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ diasTransito }}</b></p>
                </b-form-group>
              </b-col-->
              <b-col cols="3">
                <b-form-group>
                  <label>TIPO DE SERVICIO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ tipoServicio.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>TIPO DE ENVIO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ tipoEnvio.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>USUARIO QUE GENERA: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ usuarioGenera }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3"></b-col>
              <!--b-col cols="3">
                <b-form-group>
                  <label>MODO DE ENVIO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ modoEnvio.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col-->
              <b-col cols="12">
                <div class="row" v-if="resClasificaZona != ''">
                  <div class="col-sm-12">
                    <b-alert show v-bind:variant="notColorZona">
                      <h4 class="alert-heading">Aviso de Ruta</h4>
                      <p v-html="notTextoZona"></p>
                    </b-alert>
                  </div>
                </div>
              </b-col>
            </b-row>
            <br />
            <b-row style="background-color: #6c757d;" class="text-left">
              <b-col cols="12" style="">
                <label style="color:#ffffff; vertical-align: bottom;">MERCANCÍAS</label>
              </b-col>
            </b-row>
            <br />

            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>ENVIO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ velocidadEnvio.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>EMBALAJE: </label>
                  <p class="text-muted" style="font-weight: bold"> {{ embalaje.toUpperCase() }} </p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>ESTIBABLE: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ estibable.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>CLASIFICACION: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ clasificacionText }}</b></p>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>CANTIDAD: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ cantidad }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>VOLUMEN(m3): </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ volumen }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>PESO TOTAL: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ pesoTotal }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <label>DESCRIPCIÓN: </label>
                <p class="text-muted"><b style="color:#6c757d">{{ descrip }}</b></p>
              </b-col>
            </b-row>
            <br />
            <b-row style="background-color: #6c757d;" class="text-left">
              <b-col cols="12" style="">
                <label style="color:#ffffff; vertical-align: bottom;">SERVICIOS</label>
              </b-col>
            </b-row>
            <br />

            <div class="row">
              <div class="col-md-12">
                <div class="form-group row mb-0">
                  <div class="table-responsive">
                    <table class="table table-sm mb-0" width="100%">
                      <thead>
                        <tr>
                          <th v-if="new_servicios.length > 0">ACCIÓN</th>
                          <th>DESCRIPCIÓN</th>
                          <th>DIVISA</th>
                          <th>SUBTOTAL</th>
                          <th>I.V.A.</th>
                          <th>RETENCIONES</th>
                          <th></th>
                          <th>TOTAL</th>
                          <th>AJUSTE DE VENTA</th>
                          <th>PORCENTAJE</th>
                          <th>TOTAL + AJUSTE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="servicios in dataServiciosAgregados" v-bind:key="servicios.id">
                          <td class="text-muted text-center" v-if="new_servicios.length > 0"> 
                            <div v-if="servicios.eliminar == 0 "><b></b>N/A</div>
                            <div v-else> <b-button variant="danger" size="sm" @click="eliminarServicio(servicios.idService)" ><b><i class="fe-trash-2"></i></b></b-button> </div>
                          </td>
                          <td class="text-muted"> {{ servicios.nameService }} </td>
                          <td class="text-muted"> {{ divisaFinal }} </td>
                          
                          <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseExpExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseExp))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseOptExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.precioBaseOpt))  }} </td>

                          <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaExpExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaExp))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaOptExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(parseFloat(servicios.porcentajeIvaOpt))  }} </td>

                          <td  style="text-right"> {{ formatMoney(servicios.retencion) }} </td>

                          <td v-if="servicios.priceService == 0" align="right" style="font-size:10px; font-weight: bold;"><h5><b-badge variant="warning">En Proceso de Cotización</b-badge></h5></td>
                          <td v-else  align="right" style="font-size:10px; font-weight: bold;"><h5><b-badge variant="success">Incluye Impuestos</b-badge></h5></td>

                          <td v-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalExpExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'EXPRESS' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(servicios.totalExp) }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra > 0" style="text-right"> {{ formatMoney(parseFloat(servicios.totalOptExt))  }} </td>
                          <td v-else-if="velocidadEnvio.toUpperCase() == 'OPTIMO' && servicios.porcentajeExtra == 0" style="text-right"> {{ formatMoney(servicios.totalOpt)  }} </td>

                          <td>
                            <input v-if="servicios.ajusteVenta == true && servicios.priceService > 0 && estatus == 0" class="form-control-input" type="checkbox" v-bind:id="servicios.idService + 'check'" value="" @change="mostrarImpuesto(servicios.idService)" checked>
                            <input v-if="servicios.ajusteVenta == false && servicios.priceService > 0 && estatus == 0" class="form-control-input" type="checkbox" v-bind:id="servicios.idService + 'check'" value="" @change="mostrarImpuesto(servicios.idService)">
                            
                          </td>
                          <td>
                            <select v-if="servicios.ajusteVenta == true" v-bind:id="servicios.idService + 'seleccionImpuesto'" class=" form-control-sm col-md-12 " @change="sumaImpuesto($event, servicios.idService, servicios.priceService)">
                              <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.value == servicios.porcentaje"> {{ opc.value }}% </option>
                            </select>

                            <select v-else hidden v-bind:id="servicios.idService + 'seleccionImpuesto'" class=" form-control-sm col-md-12 " @change="sumaImpuesto($event, servicios.idService, servicios.priceService)">
                              <option v-for="opc in options" :key="opc.id" v-bind:value="opc.id" :selected="opc.value == servicios.porcentaje"> {{ opc.value }}% </option>
                            </select>

                            <input hidden v-if="servicios.ajusteVenta == true" value="1" v-bind:id="servicios.idService + 'escondeImpuesto'">
                            <input hidden v-else value="0" v-bind:id="servicios.idService + 'escondeImpuesto'">
                          </td>
                          <td>
                            <input v-if="servicios.ajusteVenta == true" :placeholder="parseFloat(servicios.totalOptExt)" class="form-control form-control-sm text-center" type="text" value="" v-bind:id="servicios.idService + 'sumaTotal'" readonly>
                            <input v-else hidden :placeholder="parseFloat(0)" class="form-control form-control-sm text-center" type="text" value="" v-bind:id="servicios.idService + 'sumaTotal'" readonly>

                            <input v-if="servicios.ajusteVenta == true" hidden v-bind:value="servicios.porcentajeIvaOpt" v-bind:id="servicios.idService + 'impuestoOculto'">
                            <input v-else hidden value="0" v-bind:id="servicios.idService + 'impuestoOculto'">

                            <input v-if="servicios.ajusteVenta == true" hidden value="1" v-bind:id="servicios.idService + 'ocultarSumaTotal'">
                            <input v-else hidden value="0" v-bind:id="servicios.idService + 'ocultarSumaTotal'">

                          </td>
                        </tr>
                      </tbody>
                      <tfoot v-if="divisa == 2">
                        <tr>
                          <td colspan="2">
                            <b-button v-show="estatus == 0" style="background-color:#00786c;" v-b-modal.add-service data-toggle="modal" data-target="#add-service" ><b><i class="fe-plus"></i> Agregar Servicio</b></b-button>
                          </td>
                          <td></td>
                          <td v-if="new_servicios.length > 0 && servicios.eliminar == 1 "></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'" colspan="2">
                            <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(  totalPrecioOpt)) }}</p>
                            <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaOpt)) }}</p>
                            <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetOpt)) }}</p>
                            <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalOpt)) }}</p>
                          </td>
                          <td v-else colspan="2">
                            <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioExp)) }}</p>
                            <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaExp)) }}</p>
                            <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetExp)) }}</p>
                            <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalExp)) }}</p>
                          </td>
                        </tr>
                      </tfoot>  
                      <tfoot v-else>
                        <tr>
                          <td colspan="2">
                            <b-button v-show="estatus == 0" style="background-color:#00786c;" v-b-modal.add-service data-toggle="modal" data-target="#add-service" ><b><i class="fe-plus"></i> Agregar Servicio</b></b-button>
                          </td>
                          <td></td>
                          <td v-if="new_servicios.length > 0 && servicios.eliminar == 1 "></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td v-if="velocidadEnvio.toUpperCase() == 'OPTIMO'" colspan="2">
                            <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioOpt) / valorDolar)}}</p>
                            <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaOpt) / valorDolar) }}</p>
                            <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetOpt) / valorDolar) }}</p>
                            <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalOpt) / valorDolar) }}</p>
                          </td>
                          <td v-else colspan="2">
                            <p><b>SUBTOTAL:</b> {{ formatMoney(parseFloat(totalPrecioExp) / valorDolar) }}</p>
                            <p><b>I.V.A.:</b> {{ formatMoney(parseFloat(totalIvaExp) / valorDolar) }}</p>
                            <p><b>RETENCIONES:</b> {{ formatMoney(parseFloat(totalRetExp) / valorDolar) }}</p>
                            <p><b>TOTAL:</b> {{ formatMoney(parseFloat(totalTotalExp) / valorDolar) }}</p>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <b-row style="background-color: #6c757d;" class="text-left">
              <b-col cols="12" style="">
                <label style="color:#ffffff; vertical-align: bottom;">INFORMACIÓN DE CONTACTO</label>
              </b-col>
            </b-row>
            <br />

            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>NOMBRE: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ name.toUpperCase() }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>TELÉFONO: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ lada }} {{ phone }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>E-MAIL: </label>
                  <p class="text-muted"><b style="color:#6c757d">{{ email }}</b></p>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <label>DESCRIPCIÓN: </label>  
                <p class="text-muted"><b style="color:#6c757d">{{ description.toUpperCase() }}</b></p>
              </b-col>
            </b-row>

            <b-row >
              <b-col>
                <b-button href="../../cotizaciones/listCotizacion" style="background-color: #00786c;"><b><i class="fe-corner-down-left"></i> Regresar</b></b-button>
              </b-col>
              <b-col class="text-center">
                <b-button v-show="this.controlCambios.length > 0 && estatus == 0" style="background-color: #00786c;" @click="guardarCambios()"><b><i class="fe-save"></i> Guardar Cambios</b></b-button>
              </b-col>
              <b-col class="text-right" v-show="estatus == 0 && vBoton == false">
                <b-button v-b-modal.modalCerrarCotizacion style="background-color: #00786c;"><b><i class="fe-lock"></i> Cerrar Cotizacion</b></b-button>
              </b-col>
            </b-row>

          </b-container>
        </b-card-body>
      </b-card>
    </b-container>


    <!-- Inicio Modal -->
    <div>
      <b-modal id="add-service" ref="add-service" dialog-class="modal-xl" no-close-on-esc no-close-on-backdrop hide-footer title="Seleeciona Servicio">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div role="group">
                <label for="input-live">Servicio</label>
                  
                <b-form-group id="clasifica" v-model.trim="new_servicio">
                  <v-autocomplete :items="data_search_services" v-model="new_servicio" :get-label="getLabelServ" :component-item="templateServ" @update-items="servicios" input-class="form-control form-control-sm" placeholder="Buscar Servicios" item-text="new_servicio" item-value="new_servicio" return-object></v-autocomplete>
                </b-form-group>
              </div>
            </div>
          </div>
          <b-row class="text-right">
            <b-col cols="4"></b-col>
            <b-col cols="4"></b-col>
            <b-col cols="4">
              <b-button class="mt-3" variant="secondary"  @click="cerrarModalServicio">Cerrar</b-button>
              <b-button class="mt-3" style="background-color:#00786c;" @click="guardaNuevoServicio"><b><i class="fe-save"></i> Guarda</b></b-button>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal id="modalCerrarCotizacion" no-close-on-esc no-close-on-backdrop hide-footer centered>
        <template #modal-title><b><i class="fe-info"></i> Aviso Cotizacion</b></template>

        <div class="form-group text-center">
          <h3>¿Que deseas realizar?</h3>
          <br/>
          <b-button class="width-md ml-1" variant="secondary" @click="showRejectedAcepted(1)"><b><i class="fe-x"></i>Rechazar</b></b-button>
          <b-button class="width-md ml-1" style="background-color: #00786c;" @click="showRejectedAcepted(2)"><b><i class="fe-check"></i> Aceptar</b></b-button>
        </div>

      </b-modal>
    </div>

    <div>
      <b-modal id="modalStatus" hide-footer centered>
        <template #modal-title>
          Motivo de Rechazo
        </template>
        <div class="d-block text-center">
          <b-textarea class="" placeholder="Ingrese Motivo de Rechazo..." v-model="rechazado">
          </b-textarea>
        </div>

        <div class="form-group text-right">
          <b-button class="width-md ml-1 mt-2" variant="secondary" @click="showRejectedAcepted(3)">Confirmar</b-button>
        </div>
      </b-modal>
    </div>
    <!-- Fin Modal -->

  </Layout>
</template>

<style>

</style>