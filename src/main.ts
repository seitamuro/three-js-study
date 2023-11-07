import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vertexShader.vert";
import fragmentShader from "./shader/fragmentShader.frag";
import "./style.css";
import { Box } from "./meshes/box";
import { Line } from "./meshes/line";
import { TextMesh } from "./meshes/text";
import { Model } from "./meshes/model";
import { PlayAnimation } from "./meshes/animation";
import { Sphere } from "./meshes/sphere";
import * as CANNON from "cannon";

/**
 * Setup Scene , Camera and etc
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#666666");
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
scene.add(camera);
const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
pointLight.color.setRGB(1, 1, 1);
pointLight.position.set(0, 100, 90);
scene.add(pointLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, 1).normalize();
scene.add(dirLight);

/**
 * Geometry
 */
//new Box(scene);
new Line(scene);
new TextMesh(scene, "Hello World!");
(async () => {
  const monkey = await new Model("models/monkey.glb").waitForLoad();
  monkey.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
      });
    }
  });
  scene.add(monkey);
})();
(async () => {
  const metric_monkey = await new Model(
    "models/metaric_monkey.glb"
  ).waitForLoad();
  metric_monkey.position.set(0.5, 0, 0);
  scene.add(metric_monkey);
})();
let animation_monkey: PlayAnimation;
(async () => {
  const model = new Model("models/animation_monkey.glb");
  const mesh = await model.waitForLoad();
  const monkey = model.gltf;
  monkey.scene.position.set(1.0, 0, 0);
  animation_monkey = new PlayAnimation(monkey);
  scene.add(mesh);
})();
const world = new CANNON.World();
world.gravity.set(0, -1, -1);
const sphere = new Sphere(world, scene);

/**
 * Animation
 */
const clock = new THREE.Clock();

let prev_time = 0;
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  const delta = elapsedTime - prev_time;

  world.step(delta);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  if (animation_monkey && animation_monkey.animate) {
    animation_monkey.animate(delta);
  }
  sphere.animate(delta);
  prev_time = elapsedTime;
};

animate();
