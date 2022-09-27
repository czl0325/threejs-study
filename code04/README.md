### 鼠标拾取使立方体变色

* 1. 简单的在场景内创建一个地板和一个浮在空中的立方体
```javascript
const floorGeometry = new THREE.PlaneGeometry(10, 10)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI/2
floor.receiveShadow = true
scene.add(floor)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.set(0, 3, 0)
box.castShadow = true
scene.add(box)
```

* 2.添加阴影效果
    * 2.1 创建点光源，并且设置点光源的参数castShadow为true
    * 2.2 设置接收阴影的物体(此处为地板)的参数receiveShadow为true
    * 2.3 设置能产生阴影的物体的参数castShadow为true
    * 2.4 设置渲染器renderer.shadowMap.enabled为true

* 3. 创建物理世界，物理世界上所有物体与真实世界的物体一一对应
<br>真实世界有地面，也需要在物理世界创建出地面，真实世界每产生一个box，就需要在物理世界同时创建出一个box。并且在渲染的时候实时把物理世界的box位置和旋转角度赋值给真实世界的box。
<br> **注意：物理世界创建的box尺寸必须为真实世界box尺寸的一半**
