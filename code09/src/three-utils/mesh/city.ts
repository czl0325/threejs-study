import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export default class CityModule {
  public city: THREE.Object3D | undefined

  constructor(scene: THREE.Scene) {
    this.createCity(scene)
  }

  createCity(scene: THREE.Scene) {
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")
    dracoLoader.setDecoderConfig({ type: "js" })
    dracoLoader.preload()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load("/test.glb", (gltf) => {
      this.city = gltf.scene
      gltf.scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "平面002") {
            child.receiveShadow = true
          } else {
            child.castShadow = true
          }
          child.material.side = THREE.DoubleSide
        }
      })
      scene.add(gltf.scene)
    })
  }
}
