import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export class TextMesh {
  geometry: TextGeometry;
  material: THREE.MeshBasicMaterial;
  text: THREE.Mesh;

  constructor(scene: THREE.Scene, text: string) {
    const loader = new FontLoader();
    loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
      this.geometry = new TextGeometry(text, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      });
    });
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.text = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.text);
  }
}
