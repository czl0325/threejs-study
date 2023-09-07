import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.x = 20
camera.position.y = 20
camera.position.z = 20
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(100, 100, 100)
light.castShadow = true
scene.add(light)

const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco/")
dracoLoader.setDecoderConfig({ type: "js" })
dracoLoader.preload()
gltfLoader.setDRACOLoader(dracoLoader)
let mixer = null
gltfLoader.load("/airplane.glb", (gltf) => {
  scene.add(gltf.scene)
  const animations = gltf.animations
  mixer = new THREE.AnimationMixer(gltf.scene)
  const actions = [];
  for (let i = 0; i < animations.length; i++) {
    const action = mixer.clipAction(animations[i]);
    action.play()
    action.loop = THREE.LoopRepeat
    action.timeScale = 1
    actions.push(action)
  }
  console.log(gltf)
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

function render() {
  renderer.render(scene, camera)
  if (mixer) mixer.update(0.01)
  controls.update()
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})
