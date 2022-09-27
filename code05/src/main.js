import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import vertexShader from "./assets/shaders/vertex.glsl"
import fragmentShader from "./assets/shaders/fragment.glsl"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.append(renderer.domElement)

const loader = new THREE.TextureLoader();
const texture = loader.load("./texture/flag.jpeg")
const planeGeometry = new THREE.PlaneGeometry(5, 2.63, 64, 64)
const planeMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0.0
    },
    uTexture: {
      value: texture
    }
  },
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

const control = new OrbitControls(camera, renderer.domElement)
control.update()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function render() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  control.update()
})
