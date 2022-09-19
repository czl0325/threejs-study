### 鼠标拾取使立方体变色

* 1. 在场景内随机生成2000个大小不一的立方体
```javascript
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
```

* 2.创建鼠标拾取器，并且在onMouseMove事件中获取鼠标的坐标。将鼠标的屏幕坐标转换为3d世界的归一化坐标，归一化坐标x和y必须介于-1到1之间
```javascript
const raycaster = new THREE.Raycaster()

function onMouseMove (event) {
  event.preventDefault()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
}
document.body.addEventListener("mousemove", onMouseMove, false)
```

* 3.通过摄像机到鼠标归一化坐标之间的直线，判断与哪几个物体相交，取出最近的一个物体，将他的颜色变为红色，并且将上一次的物体颜色恢复
```javascript
raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length > 0) {
    console.log(intersects)
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
```
