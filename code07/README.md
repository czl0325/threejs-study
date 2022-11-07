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
    infoBox: false,     // 是否显示信息框
    geocoder: false,    // 隐藏搜索框
    homeButton: false,  // 隐藏home按钮
    sceneModePicker: false, // 隐藏3D/2D选择按钮
    navigationHelpButton: false, // 隐藏帮助信息按钮
    baseLayerPicker: false, // 隐藏图层选择按钮
    timeline: false, // 隐藏时间线
    animation: false, // 隐藏动画
    fullscreenButton: false, // 隐藏全屏按钮
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
})
```

另外可以添加天空盒，需要传入6张图片
```javascript  
skyBox: new Cesium.SkyBox({
  sources: {
    positiveX: "./texture/sky/px.jpg",
    negativeX: "./texture/sky/nx.jpg",
    positiveY: "./texture/sky/ny.jpg",
    negativeY: "./texture/sky/py.jpg",
    positiveZ: "./texture/sky/pz.jpg",
    negativeZ: "./texture/sky/nz.jpg",
  },
}),
```

自定义地图，可以去[天地图](http://lbs.tianditu.gov.cn/home.html)申请key，然后在cesium中添加

地形图的加载，可以去[地理数据空间云](http://www.gscloud.cn)，数据资源->公开数据->DEM 数字高程数据
里面搜索到自己想要的地形图，下载后加载(其中 《GDEMV2 30M 分辨率数字高程数据》里面的数据是可以直接加载的 )

添加全球地图白模
```javascript
viewer.scene.primitives.add(new Cesium.createOsmBuildings())
```

鼠标拾取，找到点击的实体
```javascript
const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handle.setInputAction((movement: any) => {
    const pickedObject = viewer.scene.pick(movement.position)
    if (Cesium.defined(pickedObject)) {
      const entity = pickedObject.id
      if (entity instanceof Cesium.Entity) {
        console.log(entity)
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```
