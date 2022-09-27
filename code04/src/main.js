import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import PhysicalWorld from "./physical"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0, 0, 10)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
document.body.append(renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const control = new OrbitControls(camera, renderer.domElement)
control.update()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(10, 10, 10)
dirLight.castShadow = true
scene.add(dirLight)

const floorGeometry = new THREE.PlaneGeometry(10, 10)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI/2
floor.position.set(0, -3, 0)
floor.receiveShadow = true
scene.add(floor)

const boxArr = []
function createBox() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.set(0, 0, 0)
  box.castShadow = true
  scene.add(box)
  boxArr.push(box)
}

const physicalWorld = new PhysicalWorld()
setInterval(() => {
  createBox()
  physicalWorld.createBoxes()
}, 5000)

createBox()
physicalWorld.createBoxes()

const clock = new THREE.Clock()
function render() {
  const delta = clock.getDelta()
  physicalWorld.world.step(1/120, delta)
  physicalWorld.boxArr.forEach((b, i) => {
    boxArr[i].position.copy(b.position)
    boxArr[i].quaternion.copy(b.quaternion)
  })
  renderer.render(scene, camera)
  control.update()
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = window.innerWidth/window.innerHeight
  control.update()
})
