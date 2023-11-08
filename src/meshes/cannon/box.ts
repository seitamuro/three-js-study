import { CANNONBaseObject } from "./object";
import * as CANNON from "cannon";
import * as THREE from "three";

type BoxMesh = THREE.Mesh<THREE.BoxGeometry, any>;

export class BoxRigidBody extends CANNONBaseObject {
  public rigid_material: CANNON.Material;

  /**
   * THREE.jsのメッシュにCANNON.jsの物理演算を適用
   *
   * @param {CANNON.World} world
   * @param {THREE.Mesh} mesh
   */
  constructor(world: CANNON.World, mesh: THREE.Mesh<THREE.BoxGeometry, any>) {
    super(world);
    this.mesh = mesh;
    this.rigid_body = new CANNON.Body({
      mass: 5,
      shape: new CANNON.Box(
        new CANNON.Vec3(
          mesh.geometry.parameters.width,
          mesh.geometry.parameters.height,
          mesh.geometry.parameters.depth
        )
      ),
    });
    this.rigid_material = new CANNON.Material(mesh.id.toString());
    this._applyTHREEState();
    world.addBody(this.rigid_body);
  }
}
