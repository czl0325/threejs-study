import * as THREE from "three"
import cameraModule from "../three-utils/camera"
import { Intersection } from "three/src/core/Raycaster"
export default function useMouseClick(scene: THREE.Scene, callback: (obj: Intersection) => void) {
  let timeStamp = 0
  const mouse = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()

  window.addEventListener("mousedown", (ev) => {
    ev.preventDefault()
    timeStamp = new Date().getTime()
  })
  window.addEventListener("mouseup", (ev) => {
    ev.preventDefault()
    const time = new Date().getTime() - timeStamp
    if (time < 200) {
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1
      mouse.y = -((ev.clientY / window.innerHeight) * 2 - 1)
      raycaster.setFromCamera(mouse, cameraModule.activeCamera);
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        callback(intersects[0])
      }
    }
  })
}
