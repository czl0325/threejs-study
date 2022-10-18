import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const div = document.getElementById("div_png")
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, div.clientWidth/div.clientHeight, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(div.clientWidth, div.clientHeight)
renderer.setPixelRatio(window.devicePixelRatio)
div.append(renderer.domElement)

const loader = new THREE.CubeTextureLoader()
const texture = loader.load([
  "./texture/1.jpg",
  "./texture/2.jpg",
  "./texture/3.jpg",
  "./texture/4.jpg",
  "./texture/5.jpg",
  "./texture/6.jpg"
])
scene.background = texture
scene.environment = texture

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
