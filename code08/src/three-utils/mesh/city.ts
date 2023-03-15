import * as THREE from "three"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import MeshLine from "./MeshLine"
import FlyLine from "./FlyLine"

export default function createCity(scene: THREE.Scene) {
  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("/draco/")
  dracoLoader.setDecoderConfig({ type: "js" })
  dracoLoader.preload()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoader.load("/city.glb", (gltf) => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        const childMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33),
        })
        child.material = childMaterial
        child.material.onBeforeCompile = (shader: THREE.Shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <dithering_fragment>",
            `
              #include <dithering_fragment>
              //#end#
            `
          );
          addGradColor(shader, child)
          addSpread(shader)
          addLightLine(shader)
          addToTopLine(shader)
        }
        if (child.name === "Layerbuildings") {
          const meshLine = new MeshLine(child.geometry)
          const size = child.scale.x
          meshLine.mesh.scale.set(size, size, size)
          scene.add(meshLine.mesh)
        }
      }
    })
    scene.add(gltf.scene)
    const flyLine = new FlyLine()
    scene.add(flyLine.lineMesh)
  })
}

function addGradColor(shader: THREE.Shader, mesh: THREE.Mesh) {
  mesh.geometry.computeBoundingBox()
  const { min, max } = mesh.geometry.boundingBox as THREE.Box3
  const uHeight = max.y - min.y;

  shader.uniforms.uTopColor = {
    value: new THREE.Color("#aaaeff"),
  };
  shader.uniforms.uHeight = {
    value: uHeight,
  };

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>
    varying vec3 vPosition;
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
      #include <begin_vertex>
      vPosition = position;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      vec4 distGradColor = gl_FragColor;
      // 设置混合的百分比
      float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
      // 计算出混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor,1);
      //#end#
      `
  )
}

function addSpread(shader: THREE.Shader, center = new THREE.Vector2(0, 0)) {
  shader.uniforms.uSpreadCenter = { value: center }
  shader.uniforms.uSpreadTime = { value: 0 }
  shader.uniforms.uSpreadWidth = { value: 200 }
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      // 计算出距离中心点的距离
      float spreadRadius = distance(vPosition.xz, uSpreadCenter);
      // 计算出距离中心点的距离
      float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;
      if (spreadIndex > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1,1,1,1), spreadIndex/uSpreadWidth);
      }
      //#end#
      `
  )
  gsap.to(shader.uniforms.uSpreadTime, {
    value: 1000,
    duration: 3,
    repeat: -1,
    ease: "none",
  })
}

function addLightLine(shader: THREE.Shader) {
  shader.uniforms.uLightTime = { value: -1000 }
  shader.uniforms.uLightWidth = { value: 200 }
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLightTime;
    uniform float uLightWidth;
  `)
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
       float LightLineMix = -(vPosition.x+vPosition.z-uLightTime)*(vPosition.x+vPosition.z-uLightTime)+uLightWidth;
       if (LightLineMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(0.8, 1, 1, 1), LightLineMix/uLightWidth);
       }
       //#end#
    `)
  gsap.to(shader.uniforms.uLightTime, {
    value: 1000,
    duration: 5,
    repeat: -1,
    ease: "none",
  })
}

function addToTopLine(shader: THREE.Shader) {
  shader.uniforms.uTopTime = { value: 0 }
  shader.uniforms.uTopWidth = { value: 50 }
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uTopTime;
    uniform float uTopWidth;
  `)
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
       float TopLineMix = -(vPosition.y-uTopTime)*(vPosition.y-uTopTime)+uTopWidth;
       if (TopLineMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(0.9, 0.9, 0.9, 1), TopLineMix/uTopWidth);
       }
       //#end#
    `)
  gsap.to(shader.uniforms.uTopTime, {
    value: 200,
    duration: 5,
    repeat: -1,
    ease: "none",
  })
}
