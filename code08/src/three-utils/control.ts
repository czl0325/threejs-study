import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FlyControls } from "three/examples/jsm/controls/FlyControls"
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls"
import cameraModule from "./camera"
import renderModule from "./renderer"

export enum ControlType { Orbit = "Orbit", Fly = "Fly", FirstPerson = "FirstPerson" }

class ControlModule {
  public activeControls: OrbitControls | FlyControls | FirstPersonControls | undefined
  constructor() {
    this.toggleControl(ControlType.Orbit)
  }

  toggleControl(type: ControlType) {
    this[`set${type}Controls`]()
  }

  setOrbitControls() {
    this.activeControls?.dispose()
    const controls = new OrbitControls(cameraModule.activeCamera, renderModule.renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.minDistance = 1
    controls.maxDistance = 10000
    controls.maxPolarAngle = Math.PI / 2
    this.activeControls = controls
  }

  setFlyControls() {
    this.activeControls?.dispose()
    const controls = new FlyControls(cameraModule.activeCamera, renderModule.renderer.domElement)
    controls.movementSpeed = 100
    controls.rollSpeed = Math.PI / 60
    this.activeControls = controls
  }

  setFirstPersonControls() {
    this.activeControls?.dispose()
    const controls = new FirstPersonControls(cameraModule.activeCamera, renderModule.renderer.domElement)
    controls.movementSpeed = 100
    controls.lookSpeed = 0.1
    this.activeControls = controls
  }
}

export default new ControlModule()
