import * as THREE from "three"

export default function createAxis(scene: THREE.Scene) {
  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)
}
