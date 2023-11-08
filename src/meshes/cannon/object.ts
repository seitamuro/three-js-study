import * as CANNON from "cannon";
import * as THREE from "three";

export class CANNONBaseObject {
  world: CANNON.World;
  rigid_material: CANNON.Material;
  rigid_body: CANNON.Body;
  mesh: THREE.Mesh;
  updateMesh: () => void;

  constructor(world: CANNON.World) {
    this.world = world;
    this.updateMesh = () => {
      this._applyCannonState();
    };
  }

  /**
   * THREE.jsのメッシュのpositionとrotationをCANNON.jsの剛体に適用する
   */
  _applyTHREEState = () => {
    this.rigid_body.position.copy(this.mesh.position as any);
    this.rigid_body.quaternion.copy(
      this._toCANNONQuaternion(this.mesh.quaternion)
    );
  };

  /**
   * CANNON.jsの剛体のpositionとrotationをTHREE.jsのメッシュに適用する
   */
  _applyCannonState = () => {
    this.mesh.position.copy(this.rigid_body.position as any);
    this.mesh.rotation.setFromQuaternion(
      this._toTHREEQuaternion(this.rigid_body.quaternion)
    );
  };

  private _toTHREEQuaternion = (q: CANNON.Quaternion) => {
    return new THREE.Quaternion(q.x, q.y, q.z, q.w);
  };

  private _toCANNONQuaternion = (q: THREE.Quaternion) => {
    return new CANNON.Quaternion(q.x, q.y, q.z, q.w);
  };
}
