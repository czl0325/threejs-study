import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import WaterShader from "./waterShader"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const light = new THREE.PointLight(0xFFFFFF, 1); // 第二个参数是光强度
light.position.set(100, 100, 100); // 设置光源位置
scene.add(light);

let uniforms = THREE.UniformsUtils.clone(WaterShader.uniforms);
uniforms.iResolution.value.x = window.innerWidth;
uniforms.iResolution.value.y = window.innerHeight;


const platformMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: WaterShader.fragmentShader,
  vertexShader: WaterShader.vertexShader,
})
platformMaterial.transparent = true
const platformGeometry = new THREE.PlaneGeometry(10, 10); // 平面几何，宽度和高度为10
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.rotation.x = -Math.PI / 2;
scene.add(platform)

let globalTime = 0.001

function render() {
  renderer.render(scene, camera)
  controls.update()
  platformMaterial.uniforms.iGlobalTime.value += globalTime
  if (platformMaterial.uniforms.iGlobalTime.value > 1 || platformMaterial.uniforms.iGlobalTime.value < 0) {
    globalTime = -globalTime
  }
  platformMaterial.uniforms.cameraPos.value.copy(camera.position)
  platformMaterial.uniforms.lightDir.value.copy(new THREE.Vector3().copy(light.position).normalize())
  console.log(platformMaterial.uniforms)
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})
