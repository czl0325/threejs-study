<template>
  <div class="container" ref="mapDiv"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import scene from "./three-utils/scene"
import cameraModule from "./three-utils/camera"
import renderModule from "./three-utils/renderer"
import { createLight } from "./three-utils/light"
import { animate } from "./three-utils/animate"
import createCity from "./three-utils/mesh/city"
const mapDiv = ref<HTMLDivElement>()
scene.add(cameraModule.activeCamera)
onMounted(() => {
  if (mapDiv.value) {
    mapDiv.value.appendChild(renderModule.renderer.domElement)
    animate()
    createLight(scene)
    createCity(scene)
  }
})
window.onresize = () => {
  renderModule.renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
