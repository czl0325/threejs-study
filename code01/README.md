### 添加一个立方体和轨道控制器

* 1.场景
     创建场景
```javascript
const scene = new THREE.Scene()
```
* 2.摄像机
     创建摄像机，并设置摄像机的位置，把摄像机添加到场景里
```javascript
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.z = 5
scene.add(camera)
```
* 3.渲染器
     创建渲染器，设置渲染器的宽高，并把渲染器添加到你要渲染的div上，调用renderer的render函数把场景和摄像机渲染到屏幕上
```javascript
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)
renderer.render(scene, camera)
```
* 4.几何模型
     创建几何体，这里创建一个长宽高都为1的红色正方体
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
```

### three.js的其他辅助工具

* 1.坐标轴辅助器
     用于展示坐标轴
```javascript
const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );
```

* 2.轨道控制器
     用于鼠标移动可以让摄像头在物体左右环绕，控制器的导入注意是在`three/examples/jsm/controls`这个目录中
```javascript
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()
```

* 3.时钟
     可以显示每一帧的耗时
```javascript
const clock = new THREE.Clock()
function render() {
  console.log("一帧的时间", clock.getDelta())
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}
```
