import * as THREE from "three"

const scene = new THREE.Scene()
const mouse = new THREE.Vector2()
let INTERSECTED = undefined

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 20).normalize()
scene.add(light)

const geometry = new THREE.BoxGeometry(20, 20, 20)
for (let i=0; i< 2000; i++) {
  const obj = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }))

  obj.position.x = Math.random() * window.innerWidth - window.innerWidth / 2
  obj.position.y = Math.random() * window.innerHeight - window.innerHeight / 2
  obj.position.z = Math.random() * window.innerWidth - window.innerWidth / 2

  obj.rotation.x = Math.random() * 2 * Math.PI
  obj.rotation.y = Math.random() * 2 * Math.PI
  obj.rotation.z = Math.random() * 2 * Math.PI

  obj.scale.x = Math.random() + 0.5
  obj.scale.y = Math.random() + 0.5
  obj.scale.z = Math.random() + 0.5

  scene.add(obj)
}

const raycaster = new THREE.Raycaster()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.sortObjects = false
document.body.append(renderer.domElement)

function onMouseMove (event) {
  event.preventDefault()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
}
document.body.addEventListener("mousemove", onMouseMove, false)


let theta = 0, radius = 100
function render() {
  theta += 0.1
  camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad(theta))
  camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad(theta))
  camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad(theta))
  camera.lookAt(scene.position)
  camera.updateMatrixWorld()

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length > 0) {
    const inObj = intersects[0].object
    if (inObj instanceof THREE.Mesh) {
      if (INTERSECTED !== inObj) {
        if (INTERSECTED) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
        }
        INTERSECTED = inObj
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
        INTERSECTED.material.emissive.setHex(0xff0000)
      }
    }
  } else {
    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
    }
    INTERSECTED = undefined
  }

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})
