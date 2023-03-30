import * as THREE from "three"
import cameraModule from "./camera"
import renderModule from "./renderer"
import controlModule from "./control"

const clock = new THREE.Clock()
class AnimateModule {
  private scene: THREE.Scene | undefined


  setScene(scene: THREE.Scene) {
    this.scene = scene
  }

  animate() {
    const delta = clock.getDelta()
    controlModule.activeControls?.update(delta)
    renderModule.renderer.setClearColor(0x428bca, 1)
    if (this.scene) {
      renderModule.renderer.render(this.scene, cameraModule.activeCamera)
    }
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default new AnimateModule()
