import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

const div = document.getElementById("div_hdr")
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, div.clientWidth/div.clientHeight, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(div.clientWidth, div.clientHeight)
renderer.setPixelRatio(window.devicePixelRatio)
div.append(renderer.domElement)

const loader = new RGBELoader()
loader.load("./texture/2k.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture
  scene.environment = texture
})

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
