import * as THREE from 'three'
export const clearScene = (scene: THREE.Scene) => {
  scene.traverse((child) => {
    if (child.children) {
      child.children.forEach((item) => {
        if (item instanceof THREE.Mesh) {
          if (item.geometry) {
            item.geometry.dispose()
            item.clear()
          }
          item.material.dispose()
          item.clear()
        }
      })
    }
    child.clear()
  });

//  renderer.forceContextLoss()
//  renderer.dispose()
  scene.clear()
  scene.removeFromParent()
}
