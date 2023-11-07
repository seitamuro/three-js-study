import * as THREE from "three";
import * as CANNON from "cannon";

export class Sphere {
  animate: (delta: number) => void;

  constructor(world: CANNON.World, scene: THREE.Scene) {
    // Three.jsのメッシュを作成
    const geo_sphere = new THREE.SphereGeometry(1, 32, 32);
    const sphere_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geo_sphere, sphere_material);
    scene.add(sphere);

    const geo_ground = new THREE.PlaneGeometry(100, 100);
    const ground_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const ground = new THREE.Mesh(geo_ground, ground_material);
    scene.add(ground);

    // 剛体のマテリアルと接触マテリアルの設定
    const material_rigid_sphere = new CANNON.Material("sphere");
    const material_rigid_plane = new CANNON.Material("plane");
    const contactMaterial = new CANNON.ContactMaterial(
      material_rigid_sphere,
      material_rigid_plane,
      {
        friction: 0.5,
        restitution: 0.7,
      }
    );
    world.addContactMaterial(contactMaterial);

    // 剛体の作成
    const sphereBody = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, 0, 10),
      shape: new CANNON.Sphere(1),
      material: material_rigid_sphere,
    });
    world.addBody(sphereBody);

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: material_rigid_plane,
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), 0);
    world.addBody(groundBody);

    sphereBody.addEventListener("collide", (event: any) => {
      console.log("Sphere has collided with body", event.body);
    });

    this.animate = (delta: number) => {
      sphere.position.copy(sphereBody.position as any);
      sphere.rotation.copy(sphereBody.quaternion as any);
      ground.position.copy(groundBody.position as any);
      ground.rotation.copy(groundBody.quaternion as any);
    };
  }
}
