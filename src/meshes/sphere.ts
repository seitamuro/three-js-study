import * as THREE from "three";
import * as CANNON from "cannon";
import { toCANNONQuaternion, toTHREEQuaternion } from "../utils";

export class Sphere {
  animate: (delta: number) => void;

  constructor(world: CANNON.World, scene: THREE.Scene) {
    // Three.jsのメッシュを作成
    const geo_sphere = new THREE.SphereGeometry(0.1, 20, 20);
    const sphere_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geo_sphere, sphere_material);
    sphere.position.set(0, 10, 0);
    scene.add(sphere);

    const geo_ground = new THREE.BoxGeometry(10, 10, 0.1);
    const ground_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const ground = new THREE.Mesh(geo_ground, ground_material);
    ground.rotateX(-Math.PI / 2);
    ground.position.set(0, -5, 0);
    scene.add(ground);

    // 剛体の作成
    const material_rigid_sphere = new CANNON.Material("sphere");
    const sphereBody = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(
        sphere.position.x,
        sphere.position.y,
        sphere.position.z
      ),
      shape: new CANNON.Sphere(sphere.geometry.parameters.radius),
      material: material_rigid_sphere,
    });
    world.addBody(sphereBody);

    const material_rigid_plane = new CANNON.Material("plane");
    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(
        new CANNON.Vec3(
          ground.geometry.parameters.width,
          ground.geometry.parameters.height,
          ground.geometry.parameters.depth
        )
      ),
      position: new CANNON.Vec3(
        ground.position.x,
        ground.position.y,
        ground.position.z
      ),
      material: material_rigid_plane,
    });
    groundBody.quaternion.copy(toCANNONQuaternion(ground.quaternion));
    console.log(groundBody.quaternion);
    world.addBody(groundBody);

    const contactMaterial = new CANNON.ContactMaterial(
      material_rigid_sphere,
      material_rigid_plane,
      {
        friction: 0.5,
        restitution: 0.7,
      }
    );
    world.addContactMaterial(contactMaterial);

    sphereBody.addEventListener("collide", (event: any) => {
      console.log("Sphere has collided with body", event.body);
    });

    this.animate = (delta: number) => {
      sphere.position.copy(sphereBody.position as any);
      sphere.rotation.setFromQuaternion(
        toTHREEQuaternion(sphereBody.quaternion)
      );
      ground.position.copy(groundBody.position as any);
      ground.rotation.setFromQuaternion(
        toTHREEQuaternion(groundBody.quaternion)
      );
    };
  }
}
