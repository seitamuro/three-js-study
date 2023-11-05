import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Model {
  geometry: THREE.Group<THREE.Object3DEventMap>;
  material: THREE.MeshPhongMaterial;
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  private _loaded: Promise<THREE.Group<THREE.Object3DEventMap>>;

  constructor(path: string) {
    const loader = new GLTFLoader();
    this.material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      flatShading: true,
    });
    this._loaded = new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf) => {
          this.geometry = gltf.scene;
          this.geometry.scale.set(0.1, 0.1, 0.1);
          this.geometry.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = this.material;
            }
          });
          resolve(this.geometry);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }

  async waitForLoad() {
    return this._loaded;
  }
}
