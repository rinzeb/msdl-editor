<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { GlobeControl, Map as MlMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const emit = defineEmits(["ready"]);

const mapContainerElement = ref();
let mlMap: MlMap;

onMounted(async () => {
  mlMap = new MlMap({
    container: mapContainerElement.value,
    // style: "https://demotiles.maplibre.org/style.json", // style URL
    style: "https://tiles.openfreemap.org/styles/positron", // style URL
    // style: {
    //   version: 8,
    //   sources: {
    //     osm: {
    //       type: "raster",
    //       tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    //       tileSize: 256,
    //       attribution: "&copy; OpenStreetMap Contributors",
    //       maxzoom: 19,
    //     },
    //   },
    //   layers: [
    //     {
    //       id: "osm",
    //       type: "raster",
    //       source: "osm",
    //     },
    //   ],
    // },
    center: [0, 0], // starting position [lng, lat]
    zoom: 3, // starting zoom
  });
  mlMap.addControl(new GlobeControl());
  mlMap.addControl(
    new NavigationControl({
      visualizePitch: true,
      visualizeRoll: true,
      showZoom: true,
      showCompass: true,
    }),
  );

  mlMap.on("style.load", () => {
    mlMap.setProjection({
      type: "globe", // Set projection to globe
    });
  });

  mlMap.on("load", async () => {
    emit("ready", mlMap);
  });
});

onUnmounted(() => {
  mlMap?.remove();
});
</script>
<template>
  <div ref="mapContainerElement" class="h-full w-full" />
</template>
