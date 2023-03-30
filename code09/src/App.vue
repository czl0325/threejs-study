<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as THREE from "three"
import JailScene from "./three-utils/scene/JailScene"
import WorkshopScene from "./three-utils/scene/WorkshopScene"
import cameraModule from "./three-utils/camera"
import renderModule from "./three-utils/renderer"
import animateModule from "./three-utils/animate"
import createAxis from "./three-utils/axis"
import { createLight } from "./three-utils/light"
import CityModule from "./three-utils/mesh/city"
import useMouseClick from "./hook/useMouseClick"
import HomeModule from "./three-utils/mesh/home"
import jailScene from "./three-utils/scene/JailScene"
import { clearScene } from "./three-utils/utils"
import { Intersection } from "three/src/core/Raycaster"
const mapDiv = ref<HTMLDivElement>()
JailScene.add(cameraModule.activeCamera)
WorkshopScene.add(cameraModule.activeCamera)
onMounted(() => {
  if (mapDiv.value) {
    mapDiv.value.appendChild(renderModule.renderer.domElement)
    animateModule.setScene(JailScene)
    animateModule.animate()
    createAxis(JailScene)
    createLight(JailScene)
    new CityModule(JailScene)
  }
  useMouseClick(JailScene, (obj: Intersection) => {
    console.log(obj)
    const mesh = obj.object as THREE.Mesh
    mesh.geometry.computeBoundingBox()
    const { min, max } = mesh.geometry.boundingBox as THREE.Box3
    console.log(max)
//    clearScene(JailScene)
//    createAxis(WorkshopScene)
//    createLight(WorkshopScene)
//    new HomeModule(WorkshopScene)
//    animateModule.setScene(WorkshopScene)
  })
})
</script>

<template>
  <div class="container" ref="mapDiv"></div>
</template>

<style scoped>

</style>
