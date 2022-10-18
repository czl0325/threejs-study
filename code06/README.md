### 加载背景图片的两张方法

* 1.加载hdr图片。使用RGBELoader来加载，加载后设置scene的background和environment即可
```javascript
const loader = new RGBELoader()
loader.load("./texture/2k.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture
  scene.environment = texture
})
```

* 2.加载6张jpg图片。THREE.CubeTextureLoader，加载后设置scene的background和environment即可
```javascript
const loader = new THREE.CubeTextureLoader()
const texture = loader.load([
  "./texture/1.jpg",
  "./texture/2.jpg",
  "./texture/3.jpg",
  "./texture/4.jpg",
  "./texture/5.jpg",
  "./texture/6.jpg"
])
scene.background = texture
scene.environment = texture
```
