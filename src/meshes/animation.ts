import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export class PlayAnimation {
  mesh: THREE.Mesh | THREE.Group<THREE.Object3DEventMap>;
  animate: (delta: number) => void;
  gltf: GLTF;
  private animation_framerate: number = 25.0;
  private browser_framerate: number = 60.0;

  constructor(gltf: GLTF) {
    this.mesh = gltf.scene;
    this.gltf = gltf;
    const clips = gltf.animations;
    if (clips && clips.length) {
      const mixer = new THREE.AnimationMixer(this.mesh);
      clips.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      this.animate = (elapsedTime: number) => {
        if (mixer) mixer.update(elapsedTime);
      };
    }
  }
}
