import * as THREE from "three";

export class Line {
  points: THREE.Vector3[] = [];
  material: THREE.LineBasicMaterial;
  geometry: THREE.BufferGeometry;
  line: THREE.Line;

  constructor(scene: THREE.Scene) {
    this.points.push(new THREE.Vector3(-1, 0, 0));
    this.points.push(new THREE.Vector3(0, 1, 0));
    this.points.push(new THREE.Vector3(-1, 0, -1));
    this.material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.line = new THREE.Line(this.geometry, this.material);
    scene.add(this.line);
  }
}
