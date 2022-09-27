import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import vertexShader from "./assets/shaders/vertex.glsl"
import fragmentShader from "./assets/shaders/fragment.glsl"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.append(renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(5, 5)
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0.0
    }
  },
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

const control = new OrbitControls(plane, renderer.domElement)

function render() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
