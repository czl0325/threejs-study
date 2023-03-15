import * as THREE from 'three'
import gsap from "gsap"
import { ClampToEdgeWrapping } from "three/src/constants"

export default class FlyLine {
  public lineMesh: THREE.Mesh
  constructor() {
    const linePoint = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(10, 0, 0)
    ]
    const lineCurve = new THREE.CatmullRomCurve3(linePoint)
    const lineGeometry = new THREE.TubeGeometry(lineCurve, 256, 0.5, 8, false)
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load("/texture/z_11.png")
    texture.repeat.set(1, 2)
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })
    this.lineMesh = new THREE.Mesh(lineGeometry, material)
    gsap.to(texture.offset, {
      x: -1,
      duration: 3,
      repeat: -1,
      ease: "none",
    })
  }
}
