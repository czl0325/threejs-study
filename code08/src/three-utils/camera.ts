import * as THREE from "three"

export enum CameraType { PERSPECTIVE}

const perspectiveCamera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.1, 10000)
perspectiveCamera.position.set(0, 10, 10)

 class CameraModule {
  public activeCamera: THREE.Camera
  private cameraMap: Map<CameraType, THREE.Camera> = new Map()
  constructor() {
    this.activeCamera = perspectiveCamera
    this.cameraMap.set(CameraType.PERSPECTIVE, perspectiveCamera)
  }
  addCamera(type: CameraType, camera: THREE.Camera) {
    this.cameraMap.set(type, camera)
  }
  setActiveCamera(type: CameraType) {
    this.activeCamera = this.cameraMap.get(type) as THREE.Camera
  }
}

export default new CameraModule()
