import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Model {
  private geometry: THREE.Group<THREE.Object3DEventMap>;
  private material: THREE.MeshPhongMaterial;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  private _loaded: Promise<THREE.Group<THREE.Object3DEventMap>>;
  gltf: GLTF;

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
          this.gltf = gltf;
          this.geometry = gltf.scene;
          this.gltf = gltf;
          this.geometry.scale.set(0.1, 0.1, 0.1);
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
