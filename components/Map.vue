<template>
  <div>
    <div id="mapid"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import L from "leaflet";

export default Vue.extend({
  mounted() {
    const map = L.map("mapid", {
      attributionControl: false,
    }).setView([37.8, -96], 1);
    
    var southWest = map.unproject([0, 4096], map.getMaxZoom());
    var northEast = map.unproject([4096, 0], map.getMaxZoom());

    var bounds = L.latLngBounds(southWest, northEast);

    const tiles = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        "pk.eyJ1IjoiZXhvcmlyaSIsImEiOiJja2xuZXVzN2UwaTl2MnBxcmFrNWxmeHRiIn0.ce2fdeg0LQPOGi1N26r5kw",
      {
        id: "mapbox/light-v9",
        tileSize: 542,
        maxZoom: 5,
        minZoom: 2,
        zoomOffset: -1,
      }
    ).addTo(map);
  },
});
</script>

<style scoped>
#mapid {
  height: 500px;
  width: 100%;
  min-width: 800px;
}
</style>