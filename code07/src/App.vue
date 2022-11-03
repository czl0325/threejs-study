<script setup lang="ts">
import * as Cesium from "cesium"
import { onMounted } from "vue"

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjRiZTc1Ni02MDkxLTQ0YzItYTEzZC0xYzllMTFmODcxYmYiLCJpZCI6MTEzMjA4LCJpYXQiOjE2NjcyOTMxMDJ9.uhAM8FUxsxdYBTXJWHI343g5xDS0-k4YH3u4mGyt4H4"
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
//    terrainProvider: Cesium.createWorldTerrain(),
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    }),
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
//  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(20, 110, 28, 126)
  var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(118.044584, 24.47918, 0), 0.0);
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
  });
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
