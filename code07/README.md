### 3d地图cesium的基本使用

* 1.使用vite创建项目 并安装相应的库
```shell
create-vite code07
# 选择vue 和 ts
cd code07
npm install
npm i cesium
npm i vite-plugin-cesium -D
```

* 2.配置
在vite.config.ts中添加如下配置
```javascript
import cesium from "vite-plugin-cesium"

export default defineConfig({
  plugins: [vue(), cesium()]
})
```

* 3.跑一个最基础的地图
```javascript
import * as Cesium from "cesium"
import { onMounted } from "vue"

onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
})
```
