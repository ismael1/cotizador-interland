<script>
import Layout from "../../layouts/main";
import appConfig from "../../../../app.config";

import WidgetChart from "@/components/widgets/Widget-chart";
import PageHeader from "@/components/Page-header";
import RevenueReport from "@/components/widgets/Revenue-report";
import ProductsSales from "@/components/widgets/Products-sales";
import MarketingReports from "@/components/widgets/Marketing-reports";
import Portlet from "@/components/widgets/Portlet";
import RevenueHistory from "@/components/widgets/Revenue-history";
import Projections from "@/components/widgets/Projections";

/**
 * Sales-Dashboard component
 */
export default {
  page: {
    title: "Sales-Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout, //menu //importante
    WidgetChart, //graficas
    PageHeader, //pre menu superior
    RevenueReport, //elemento vista
    ProductsSales,
    MarketingReports,
    Portlet,
    RevenueHistory,
    Projections,
  },
  data() {
    return {
      title: "Bienvenido !",
      items: [
        {
          text: "Inicio",
        },
        {
          text: "Interland",
          active: true,
        },
      ],
      tableTitle: "Top Selling Products",
      productData: [
        {
          name: "ASOS Ridley High Waist",
          price: "$79.49",
          quantity: 82,
          amount: "$6,518.18",
          date: "Sep 1, 2018",
          sales: 54,
          productid: 200125,
        },
        {
          name: "Marco Lightweight Shirt",
          price: "$128.50",
          quantity: 37,
          amount: "$4,754.50",
          date: "Sep 15, 2018",
          sales: 28,
          productid: 200130,
        },
        {
          name: "Half Sleeve Shirt",
          price: "$39.99",
          quantity: 64,
          amount: "$2,559.36",
          date: "Nov 1, 2018",
          sales: 55,
          productid: 200140,
        },
        {
          name: "Lightweight Jacket",
          price: "$20.00",
          quantity: 184,
          amount: "$3,680.00",
          date: "Nov 15, 2018",
          sales: 85,
          productid: 200250,
        },
        {
          name: "Marco Shoes",
          price: "$28.49",
          quantity: 69,
          amount: "$1,965.81",
          date: "Jan 1, 2019",
          sales: 49,
          productid: 200256,
        },
        {
          name: "ASOS Ridley High Waist",
          price: "$79.49",
          quantity: 82,
          amount: "$6,518.18",
          date: "Sep 1, 2018",
          sales: 54,
          productid: 200125,
        },
        {
          name: "Half Sleeve Shirt",
          price: "$39.99",
          quantity: 64,
          amount: "$2,559.36",
          date: "Nov 1, 2018",
          sales: 55,
          productid: 200140,
        },
        {
          name: "Lightweight Jacket",
          price: "$20.00",
          quantity: 184,
          amount: "$3,680.00",
          date: "Nov 15, 2018",
          sales: 85,
          productid: 200250,
        },
      ],
      widgetData: [
        {
          number: "268",
          text: "New Customers",
          chartColor: "#1abc9c",
        },
        {
          number: "8574",
          text: "Online Orders",
          chartColor: "#3bafda",
        },
        {
          number: "$958.25",
          text: "Revenue",
          chartColor: "#f672a7",
        },
        {
          number: "$89.25",
          text: "Daily Average",
          chartColor: "#6c757d",
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div v-for="widget in widgetData" :key="widget.text" class="col-xl-3 col-md-6"></div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row bg-image">
      <img src="../../../assets/images/transportacion_interland.jpg" class="rounded mx-auto d-block img-fluid" alt="Interland" />
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="box-slider-text">
						<h3 class="box-slide-sub-title" style="color: white;">Interland<br> la ruta directa<br> Entre México y Centroamérica</h3>
					</div>
        </div>
        
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
<style>
.bg-image{
   position: relative;
}

.mask{
   position: absolute;
   width: 100%;
   height: 100%;
   left: 0px;
   top: 0px;
}
</style>
