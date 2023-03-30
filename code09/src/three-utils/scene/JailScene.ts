import * as THREE from "three"

const jailScene = new THREE.Scene()
jailScene.name = "jail"
jailScene.fog = new THREE.Fog(0x333333, 100, 1000)

// 清空场景，包括 scene 场景下的动画，子物体，renderer,camera,control，以及自己使用过的变量置空处理 等


export default jailScene
