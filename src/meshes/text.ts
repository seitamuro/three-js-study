import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";

export class TextMesh {
  geometry: TextGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  font: Font;
  text: string;
  group: THREE.Group;

  constructor(scene: THREE.Scene, text: string) {
    this.text = text;
    //this.createText();
    this.material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      flatShading: true,
    });
    this.loadFont();
    this.group = new THREE.Group();
    scene.add(this.group);
  }

  createText() {
    this.geometry = new TextGeometry(this.text, {
      font: this.font,
      size: 80,
      height: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    this.geometry.scale(0.005, 0.005, 0.005);
    //this.geometry.computeBoundingBox();
  }

  loadFont() {
    const loader = new FontLoader();
    loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
      this.font = font;
      this.refreshText();
    });
  }

  refreshText() {
    this.createText();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    if (this.group.getObjectById(this.mesh.id) !== undefined) {
      this.group.remove(this.mesh);
    }
    this.group.add(this.mesh);
  }
}
