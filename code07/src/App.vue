<script setup lang="ts">
import * as Cesium from "cesium"
import { onMounted } from "vue"

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjRiZTc1Ni02MDkxLTQ0YzItYTEzZC0xYzllMTFmODcxYmYiLCJpZCI6MTEzMjA4LCJpYXQiOjE2NjcyOTMxMDJ9.uhAM8FUxsxdYBTXJWHI343g5xDS0-k4YH3u4mGyt4H4"
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
