<script setup lang="ts">
import maplibregl, { GeoJSONSource, Map as MlMap } from "maplibre-gl";
import { centroid } from "@turf/centroid";
import ms from "milsymbol";
import { computed, watch, watchEffect } from "vue";
import { combineSidesToJson, sortBy } from "@/utils.ts";
import { useLayerStore, useMapSettingsStore } from "@/stores/layerStore.ts";
import { useSelectStore } from "@/stores/selectStore.ts";
import { useScenarioStore } from "@/stores/scanarioStore.ts";

const props = defineProps<{ mlMap: MlMap }>();
const emit = defineEmits(["showContextMenu"]);
const { msdl } = useScenarioStore();

const store = useLayerStore();
const mapSettings = useMapSettingsStore();
const selectStore = useSelectStore();

const sides = computed(() => {
  return sortBy(msdl.value?.sides ?? [], "name").filter((side) => side.rootUnits.length > 0);
});

watchEffect(() => {
  const visibleSides = sides.value.filter((side) => store.layers.has(side.objectHandle));

  const featureCollection = combineSidesToJson(visibleSides, {
    includeUnits: store.showUnits,
    includeEquipment: store.showEquipment,
  });
  // console.log(featureCollection);
  const source = props.mlMap.getSource("sides") as GeoJSONSource;
  if (!source) return;
  source.setData(featureCollection as never);
  // try {
  //   const center = centroid(featureCollection as never);
  //   props.mlMap.flyTo({ center: center.geometry.coordinates as [number, number], zoom: 3 });
  // } catch {}
});

watchEffect(() => {
  const { mlMap } = props;
  mlMap.showCollisionBoxes = mapSettings.showCollisionBoxes;
  mlMap.showPadding = mapSettings.showPadding;
  mlMap.showTileBoundaries = mapSettings.showTileBoundaries;
  mlMap.showOverdrawInspector = mapSettings.showOverdrawInspector;
});

function setTextField() {
  const mlMap = props.mlMap;
  if (store.showLabels) {
    mlMap.setLayoutProperty("sides", "text-field", ["get", "label"]);
  } else {
    mlMap.setLayoutProperty("sides", "text-field", null);
  }
}

watch(
  () => store.showLabels,
  () => {
    setTextField();
  },
);

watch(
  () => store.showIconAnchors,
  (v) => {
    const mlMap = props.mlMap;
    const hasLayer = !!mlMap.getLayer("points");
    if (!v) {
      if (hasLayer) mlMap.removeLayer("points");
    } else {
      if (hasLayer) return;
      mlMap.addLayer({
        id: "points",
        type: "circle",
        source: "sides",
        paint: {
          "circle-radius": 5,
          "circle-color": "#3b4fe4",
        },
      });
    }
  },
);

function addSidesToMap(map: MlMap) {
  const featureCollection = combineSidesToJson(sides.value);
  map.addSource("sides", {
    type: "geojson",
    data: featureCollection as never,
  });
  try {
    const center = centroid(featureCollection as never);
    map.flyTo({ center: center.geometry.coordinates as [number, number], zoom: 3 });
  } catch {}

  map.on("styleimagemissing", function (e) {
    const symb = new ms.Symbol(e.id, { size: 20 });
    const { width, height } = symb.getSize();
    const data = symb
      .asCanvas(2)
      ?.getContext("2d")
      ?.getImageData(0, 0, 2 * width, 2 * height);
    if (data) {
      map.addImage(e.id, data, { pixelRatio: 2 });
    }
  });

  map.addLayer({
    id: "sides",
    type: "symbol",
    source: "sides",
    layout: {
      "icon-image": ["case", ["==", ["get", "sidc"], ""], "10011500002201000000", ["get", "sidc"]],
      "text-font": ["Noto Sans Italic"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
      "text-size": 12,
      "icon-allow-overlap": true,
      "text-allow-overlap": false,
      "text-optional": true,
    },
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "sides", (e) => {
    if (!e.features) return;

    if (e.features[0].geometry.type !== "Point") {
      return;
    }
    const coordinates = e.features[0].geometry.coordinates.slice();
    const labels = e.features.map((f) => f.properties.label).join(", ");

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new maplibregl.Popup({ className: "text-black" })
      .setLngLat(coordinates as [number, number])
      .setText(labels)
      .addTo(map);

    const activeItemId = e.features[0].properties.id as string;
    if (!activeItemId) return;
    selectStore.activeItem =
      (msdl.value?.getUnitById(activeItemId) || msdl.value?.getEquipmentById(activeItemId)) ?? null;
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "sides", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "sides", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("contextmenu", (ev) => {
    emit("showContextMenu", ev);
    ev.preventDefault();
  });

  setTextField();
}

addSidesToMap(props.mlMap);
</script>
<template><slot /></template>
