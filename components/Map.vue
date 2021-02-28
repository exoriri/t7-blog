<template>
  <div>
    <div id="map" class="map"></div>
    <div id="info">&nbsp;</div>
  </div>
</template>

<script>
import Vue from "vue";

import "ol/ol.css";

import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style, Text } from "ol/style";

import * as constants from "../core/constants";

export default Vue.extend({
  props: ["data"],
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap() {
      var style = new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.6)",
        }),
        stroke: new Stroke({
          color: "#319FD3",
          width: 1,
        }),
        text: new Text({
          font: "12px Calibri,sans-serif",
          fill: new Fill({
            color: "#000",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 3,
          }),
        }),
      });

      var vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: constants.geoJsonUrl,
          format: new GeoJSON(),
        }),
        style: function (feature) {
          style.getText().setText(feature.get("name"));
          return style;
        },
      });

      var map = new Map({
        layers: [vectorLayer],
        target: "map",
        view: new View({
          center: [0, 0],
          zoom: 1,
        }),
      });

      var highlightStyle = new Style({
        stroke: new Stroke({
          color: "#f00",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.1)",
          cursor: "pointer"
        }),
        text: new Text({
          font: "12px Calibri,sans-serif",
          fill: new Fill({
            color: "#000",
          }),
          stroke: new Stroke({
            color: "#f00",
            width: 3,
          }),
        }),
      });

      var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function (feature) {
          highlightStyle.getText().setText(feature.get("name"));
          return highlightStyle;
        },
      });

      var highlight;
      var displayFeatureInfo = function (pixel) {
        var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
        var info = document.getElementById("info");
        if (feature) {
          info.innerHTML = feature.getId() + ": " + feature.get("name");
        } else {
          info.innerHTML = "&nbsp;";
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
          if (highlight) {
            console.log(highlight)
            highlight.style.cursor = 'pointer';
          }
        }
      };

      map.on("pointermove", function (evt) {
        const element = evt.map.getTargetElement();
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on("click", function (evt) {
        displayFeatureInfo(evt.pixel);
      });
    },
  },
});
</script>

<style scoped>
  .map {
        width: 1200px;
        height:500px;
      }
</style>