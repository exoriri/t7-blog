<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">t7-blog</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      {{covidCSV}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { getData } from '../api/requests';
import { parseCSV } from '../core/utils';

export default {
  data: function() {
    return {
      covidCSV: []
    }
  },
  head() {
    return {
      script: [
        { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
      ],
    };
  },
  async mounted() {
    const res = await getData(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/02-04-2021.csv`);
    this.covidCSV = parseCSV(res);
  }
};
</script>

<style>
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
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
