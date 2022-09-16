import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { gsap } from "gsap"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.y = 5
camera.position.z = 5
scene.add(camera)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

// const clock = new THREE.Clock()
gsap.to(cube.position, { x: 5, duration: 5, ease: "power1.inOut" })
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

function render() {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

render()
