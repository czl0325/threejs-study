<template>
  <div id="CesiumBase"></div>
</template>

<script lang="ts" setup>
import * as Cesium from "cesium"
import { onMounted } from "vue"
defineOptions({
  name: "CesiumBase"
})

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjRiZTc1Ni02MDkxLTQ0YzItYTEzZC0xYzllMTFmODcxYmYiLCJpZCI6MTEzMjA4LCJpYXQiOjE2NjcyOTMxMDJ9.uhAM8FUxsxdYBTXJWHI343g5xDS0-k4YH3u4mGyt4H4"
onMounted(() => {
  const viewer = new Cesium.Viewer("CesiumBase", {
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
  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
//  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(20, 110, 28, 126)
  const boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(118.044584, 24.47918, 0), 0.0);
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    duration: 2,
    maximumHeight: undefined,
    complete: function () {

    },
    cancel: function () {
      console.log('定位取消！');
    },
    offset: {
      heading: Cesium.Math.toRadians(30),
      pitch: Cesium.Math.toRadians(-45),
      range: 5000
    },
  })
  viewer.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
    url : 'https://a.tile.openstreetmap.org/'
  }))
  // @ts-ignore
  viewer.scene.primitives.add(new Cesium.createOsmBuildings())

  const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handle.setInputAction((movement: any) => {
    const pickedObject = viewer.scene.pick(movement.position)
    console.log(pickedObject)
    if (Cesium.defined(pickedObject)) {
      const entity = pickedObject.id
      if (entity instanceof Cesium.Entity) {
        console.log(entity)
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  // 关闭地表大气层，默认是 true
  viewer.scene.globe.showGroundAtmosphere = false;

//  // 相机设置到纽约
//  viewer.camera.setView({
//    destination:new Cesium.Cartesian3(1332761,-4662399,4137888),
//    orientation:{
//      heading:0.60,
//      pitch:-0.66
//    }
//  })
//// 添加纽约3D建筑，75343是资产ID
//  const city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//    url:Cesium.IonResource.fromAssetId(75343)
//  }))
//  // 定义3d样式
//  // 不同高度的建筑，使用不同颜色
//  const heightStyle = new Cesium.Cesium3DTileStyle({
//    color:{
//      // 条件判断具体的颜色
//      conditions : [
//        ['${Height} >= 300','rgba(45,0,75,0.5)'],
//        ['${Height} >= 200','rgb(102,71,151)'],
//        ['${Height} >= 100','rgba(170,162,204,0.5)'],
//        ['${Height} >= 50','rgba(224,226,238,0.5)'],
//        ['${Height} >= 25','rgba(252,230,200,0.5)'],
//        ['${Height} >= 10','rgba(248,176,87,0.5)'],
//        ['${Height} >= 5','rgba(198,106,11,0.5)'],
//        ["true","rgb(127,59,8)"]
//      ]
//    }
//  })
//  city.style = heightStyle
})
</script>

<style scoped>
#CesiumBase {
  width: 100vw;
  height: 100vh;
}
</style>
