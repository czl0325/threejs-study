<template>
  <div id="CesiumTdt">

  </div>
</template>

<script lang="ts" setup>
import * as Cesium from "cesium"
import { onMounted } from "vue"

defineOptions({
  name: "CesiumTdt"
})
const token = "9878daf6961145d8f2d317dc55657f1b"
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjRiZTc1Ni02MDkxLTQ0YzItYTEzZC0xYzllMTFmODcxYmYiLCJpZCI6MTEzMjA4LCJpYXQiOjE2NjcyOTMxMDJ9.uhAM8FUxsxdYBTXJWHI343g5xDS0-k4YH3u4mGyt4H4"
// 服务域名
const tdtUrl = 'https://t{s}.tianditu.gov.cn/'
// 服务负载子域
const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']

onMounted(() => {
  // cesium 初始化
  const viewer = new Cesium.Viewer("CesiumTdt", {
    infoBox: false,     // 是否显示信息框
    geocoder: false,    // 隐藏搜索框
    homeButton: false,  // 隐藏home按钮
    sceneModePicker: false, // 隐藏3D/2D选择按钮
    navigationHelpButton: false, // 隐藏帮助信息按钮
    baseLayerPicker: false, // 隐藏图层选择按钮
    timeline: false, // 隐藏时间线
    animation: false, // 隐藏动画
    fullscreenButton: false // 隐藏全屏按钮
  })
  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
  })
  // 叠加影像服务
  const imgMap = new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(imgMap)

//// 叠加国界服务
//  const iboMap = new Cesium.UrlTemplateImageryProvider({
//    url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
//    subdomains: subdomains,
//    tilingScheme : new Cesium.WebMercatorTilingScheme(),
//    maximumLevel : 10
//  });
//  viewer.imageryLayers.addImageryProvider(iboMap);
//
//// 叠加地形服务
//  const terrainUrls = new Array();
//
//  for (let i = 0; i < subdomains.length; i++){
//    const url = tdtUrl.replace('{s}', subdomains[i]) + 'DataServer?T=elv_c&tk=' + token;
//    terrainUrls.push(url);
//  }
//
//  const provider = new Cesium.GeoTerrainProvider({
//    urls: terrainUrls
//  })
//
//  viewer.terrainProvider = provider

// 将三维球定位到中国
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
    orientation: {
      heading: Cesium.Math.toRadians(348.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0)
    },
    complete: function callback() {
      // 定位完成之后的回调函数
    }
  })

// 叠加三维地名服务
  const wtfs = new Cesium.GeoWTFS({
    viewer,
    subdomains: subdomains,
    metadata: {
      boundBox: {
        minX: -180,
        minY: -90,
        maxX: 180,
        maxY: 90
      },
      minLevel: 1,
      maxLevel: 20
    },
    aotuCollide: true, //是否开启避让
    collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
    serverFirstStyle: true, //服务端样式优先
    labelGraphics: {
      font: "28px sans-serif",
      fontSize: 28,
      fillColor: Cesium.Color.WHITE,
      scale: 0.5,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 5,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      showBackground: false,
      backgroundColor: Cesium.Color.RED,
      backgroundPadding: new Cesium.Cartesian2(10, 10),
      horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      eyeOffset: Cesium.Cartesian3.ZERO,
      pixelOffset: new Cesium.Cartesian2(0, 8)
    },
    billboardGraphics: {
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      eyeOffset: Cesium.Cartesian3.ZERO,
      pixelOffset: Cesium.Cartesian2.ZERO,
      alignedAxis: Cesium.Cartesian3.ZERO,
      color: Cesium.Color.WHITE,
      rotation: 0,
      scale: 1,
      width: 18,
      height: 18
    }
  })

//三维地名服务，使用wtfs服务
  wtfs.getTileUrl = function () {
    return tdtUrl + 'mapservice/GetTiles?lxys={z},{x},{y}&tk=' + token
  }

  wtfs.getIcoUrl = function () {
    return tdtUrl + 'mapservice/GetIcon?id={id}&tk=' + token
  }

  wtfs.initTDT([{
    "x": 6,
    "y": 1,
    "level": 2,
    "boundBox": { "minX": 90, "minY": 0, "maxX": 135, "maxY": 45 }
  }, { "x": 7, "y": 1, "level": 2, "boundBox": { "minX": 135, "minY": 0, "maxX": 180, "maxY": 45 } }, {
    "x": 6,
    "y": 0,
    "level": 2,
    "boundBox": { "minX": 90, "minY": 45, "maxX": 135, "maxY": 90 }
  }, { "x": 7, "y": 0, "level": 2, "boundBox": { "minX": 135, "minY": 45, "maxX": 180, "maxY": 90 } }, {
    "x": 5,
    "y": 1,
    "level": 2,
    "boundBox": { "minX": 45, "minY": 0, "maxX": 90, "maxY": 45 }
  }, { "x": 4, "y": 1, "level": 2, "boundBox": { "minX": 0, "minY": 0, "maxX": 45, "maxY": 45 } }, {
    "x": 5,
    "y": 0,
    "level": 2,
    "boundBox": { "minX": 45, "minY": 45, "maxX": 90, "maxY": 90 }
  }, { "x": 4, "y": 0, "level": 2, "boundBox": { "minX": 0, "minY": 45, "maxX": 45, "maxY": 90 } }, {
    "x": 6,
    "y": 2,
    "level": 2,
    "boundBox": { "minX": 90, "minY": -45, "maxX": 135, "maxY": 0 }
  }, { "x": 6, "y": 3, "level": 2, "boundBox": { "minX": 90, "minY": -90, "maxX": 135, "maxY": -45 } }, {
    "x": 7,
    "y": 2,
    "level": 2,
    "boundBox": { "minX": 135, "minY": -45, "maxX": 180, "maxY": 0 }
  }, { "x": 5, "y": 2, "level": 2, "boundBox": { "minX": 45, "minY": -45, "maxX": 90, "maxY": 0 } }, {
    "x": 4,
    "y": 2,
    "level": 2,
    "boundBox": { "minX": 0, "minY": -45, "maxX": 45, "maxY": 0 }
  }, { "x": 3, "y": 1, "level": 2, "boundBox": { "minX": -45, "minY": 0, "maxX": 0, "maxY": 45 } }, {
    "x": 3,
    "y": 0,
    "level": 2,
    "boundBox": { "minX": -45, "minY": 45, "maxX": 0, "maxY": 90 }
  }, { "x": 2, "y": 0, "level": 2, "boundBox": { "minX": -90, "minY": 45, "maxX": -45, "maxY": 90 } }, {
    "x": 0,
    "y": 1,
    "level": 2,
    "boundBox": { "minX": -180, "minY": 0, "maxX": -135, "maxY": 45 }
  }, { "x": 1, "y": 0, "level": 2, "boundBox": { "minX": -135, "minY": 45, "maxX": -90, "maxY": 90 } }, {
    "x": 0,
    "y": 0,
    "level": 2,
    "boundBox": { "minX": -180, "minY": 45, "maxX": -135, "maxY": 90 }
  }])
})
</script>

<style scoped>
#CesiumTdt {
  width: 100vw;
  height: 100vh;
}
</style>
