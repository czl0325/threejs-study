import * as THREE from "three"

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
})
renderer.physicallyCorrectLights = true // 设置物理灯光模拟效果
renderer.setSize(window.innerWidth, window.innerHeight)
// 调节色调映射
renderer.toneMapping = THREE.ACESFilmicToneMapping
// 调节曝光
renderer.toneMappingExposure = 0.8
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true

export default { renderer }
