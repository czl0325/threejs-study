<template>
  <div class="container" ref="mapDiv"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as THREE from "three"
import scene from "./three-utils/scene"
import cameraModule from "./three-utils/camera"
import renderModule from "./three-utils/renderer"
import { createLight } from "./three-utils/light"
import { animate } from "./three-utils/animate"
import createCity from "./three-utils/mesh/city"
import { gsap } from "gsap"
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
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
let INTERSECTED: any = undefined
window.addEventListener("click", (ev: MouseEvent) => {
    mouse.x = (ev.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((ev.clientY / window.innerHeight) * 2 - 1)
    raycaster.setFromCamera(mouse, cameraModule.activeCamera);
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      const inObj = intersects[0].object
      if (inObj instanceof THREE.Mesh && inObj.name.startsWith("摄像头")) {
        const newMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000, // 可修改报警时的闪烁颜色
          transparent: true,
          opacity: 0.8, // 可修改报警闪烁是的透明度
          wireframe: false,
          side: THREE.DoubleSide,
        });
        inObj.material = newMaterial
      }
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
