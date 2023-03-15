import * as THREE from "three"
import scene from "./scene"
import cameraModule from "./camera"
import renderModule from "./renderer"
import controlModule from "./control"


const clock = new THREE.Clock()

export function animate() {
  const delta = clock.getDelta()
  controlModule.activeControls?.update(delta)
  renderModule.renderer.setClearColor(0x428bca, 1)
  renderModule.renderer.render(scene, cameraModule.activeCamera)
  requestAnimationFrame(animate)
}
