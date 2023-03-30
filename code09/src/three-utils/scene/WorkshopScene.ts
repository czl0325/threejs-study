import * as THREE from "three"

const workshopScene = new THREE.Scene()
workshopScene.name = "workshop"
workshopScene.fog = new THREE.Fog(0x333333, 100, 1000)

export default workshopScene
