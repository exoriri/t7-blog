<template>
  <div class="container">
    <div>
      <Map />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { getData } from "../api/requests";
import { parseCSV } from "../core/utils";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

export default {
  data: function () {
    return {
      covidCSV: "",
    };
  },
  head() {
    return {
      script: [
        { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
      ],
    };
  },
  async mounted() {
    const res = await getData(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-25-2021.csv`
    );
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

@media screen and (max-width: 1024px) {
  /* Стили для экранов с размером до 1024px */
}

@media screen and (min-width: 1024px) {
  /* Стили для экранов с размером от 1024px */
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* Стили для экранов с размером от 768px и до 1024px */
}
</style>
