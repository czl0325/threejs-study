import * as CANNON from "cannon-es"

export default class PhysicalWorld {
  world = null
  boxArr = []
  constructor() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.8, 0)
    const floorGeometry = new CANNON.Plane()
    const floorMaterial = new CANNON.Material("floor")
    const floor = new CANNON.Body()
    floor.mass = 0  // 设置0为固定不动
    floor.material = floorMaterial
    floor.addShape(floorGeometry)
    floor.position.set(0, -3, 0)
    floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2)
    this.world.addBody(floor)

    this.world.defaultContactMaterial = new CANNON.ContactMaterial(
      new CANNON.Material(), floorMaterial, {
        friction: 0.1, //   摩擦力
        restitution: 0.7  // 弹性
      }
    )
  }

  createBoxes() {
    const boxGeometry = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    const boxMaterial = new CANNON.Material("box")
    const box = new CANNON.Body({
      shape: boxGeometry,
      material: boxMaterial,
      mass: 1,
      position: new CANNON.Vec3(0, 0, 0)
    })
    box.applyLocalForce(
      new CANNON.Vec3(Math.random()*200-100, 0, Math.random()*200-100), //添加的力的大小和方向
      new CANNON.Vec3(0, 0, 0) //施加的力所在的位置
    );
    this.world.addBody(box)
    this.boxArr.push(box)
  }
}
