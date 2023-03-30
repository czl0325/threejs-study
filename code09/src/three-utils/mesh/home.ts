import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { ElLoading } from "element-plus"

export default class HomeModule {
  house: THREE.Object3D | undefined
  constructor(scene: THREE.Scene) {
    this.createHouse(scene)
  }

  createHouse(scene: THREE.Scene) {
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")
    dracoLoader.setDecoderConfig({ type: "js" })
    dracoLoader.preload()
    gltfLoader.setDRACOLoader(dracoLoader)
    const loading = ElLoading.service({ text: '请求中...', background: 'rgba(0, 0, 0, 0)', lock: true })
    gltfLoader.load("/workshop.glb", (gltf) => {
      if (loading) {
        loading.close()
      }
      this.house = gltf.scene
      gltf.scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = true
          child.castShadow = true
          child.material.side = THREE.DoubleSide
        }
      })
      scene.add(gltf.scene)
    })
  }
}
