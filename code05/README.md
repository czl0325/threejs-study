### shader绘制随风飘扬的国旗

* 1.需要创建两个shader文件<顶点着色器vertex.glsl>和<片圆着色器fragment.glsl>

vertex.glsl代码，其中position，uv，projectionMatrix，viewMatrix，modelMatrix五个对象是固定threejs传入的，position是点相对模型的坐标位置，而换算出的modelPosition是模型的绝对世界坐标位置。
```glsl
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    modelPosition.z = sin((modelPosition.x + uTime) * 4.0) * 0.05;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
```

vertex.glsl代码，接收一个外部传入的纹理uTexture和顶点着色器传入的uv，接着texture2D(uTexture, vUv)是固定写法，加载纹理
```glsl
precision highp float;

uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(uTexture, vUv);
}
```

* 2.创建一个平面plane，加载材质使用RawShaderMaterial，传入两个着色器
```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load("./texture/flag.jpeg")
const planeGeometry = new THREE.PlaneGeometry(5, 2.63, 64, 64)
const planeMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0.0
    },
    uTexture: {
      value: texture
    }
  },
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
```

* 3.在render函数中实时传入当前的时间
```javascript
function render() {
  control.update()
  renderer.render(scene, camera)
  planeMaterial.uniforms.uTime.value = clock.getElapsedTime()
  requestAnimationFrame(render)
}
```
