import * as THREE from 'three'

export const createLight = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(100, 100, 100)
  light.castShadow = true
  scene.add(light)
}
