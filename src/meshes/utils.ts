import * as CANNON from "cannon";
import * as THREE from "three";

export const toTHREEQuaternion = (q: CANNON.Quaternion) => {
  return new THREE.Quaternion(q.x, q.y, q.z, q.w);
};

export const toCANNONQuaternion = (q: THREE.Quaternion) => {
  console.log(q);
  return new CANNON.Quaternion(q.x, q.y, q.z, q.w);
};
