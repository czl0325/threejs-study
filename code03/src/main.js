import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.x = 30
camera.position.y = 10
camera.position.z = 0

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 5).normalize()
scene.add(light)

const renderer = new THREE.WebGLRenderer(scene, camera)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.append(renderer.domElement)

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

// const loader = new GLTFLoader()
// loader.load( 'model/A.glb', function ( gltf ) {
//   scene.add( gltf.scene )
//   console.log(gltf)
//
//   const object = new THREE.Mesh( gltf, new THREE.MeshBasicMaterial( 0xff0000 ) );
//   const box = new THREE.BoxHelper( object, 0xffff00 );
//   scene.add( box );
// } )

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('model/image_login_bg.jpg')

const loader = new GLTFLoader()
loader.load( 'model/A.glb', function ( gltf ) {
  gltf.scene.scale.set(0.1, 0.1, 0.1)
  // gltf.traverse( function ( child ) {
  //   if ( child instanceof THREE.Mesh ) {
  //     console.log(child)
  //     child.material.map = texture
  //     // child.material.color.set(0xff0000);
  //   }
  // } )
  scene.add( gltf.scene )

  // const sphere = new THREE.SphereGeometry(1, 20, 20);
  // const object = new THREE.Mesh( sphere, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) );
  // scene.add(object)
  const box = new THREE.BoxHelper( gltf.scene, 0x0000ff )
  scene.add( box )

} )

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

function render() {
  renderer.setClearColor(0xffffff)
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})
