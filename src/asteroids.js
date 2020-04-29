import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import rock from '../assets/asteroid.obj';
import skin from '../assets/Metalness.jpg';

export const createAsteroid = () => {
  let loader = new OBJLoader();
  let material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(skin),
    specular: 0xBDBEC7,
    shininess: 50,
  }); 

  let promise = new Promise((resolve) => {
    loader.load(rock, (object) => {
      object.scale.set(12, 12, 12);
      object.position.set(0, 0, -100);
      object.traverse((child) => {
        if ( child instanceof THREE.Mesh ) {
          child.material = material;
        }
      });
      object.hitbox = new THREE.Box3();
      resolve(object);
    });
  })
  return promise;
}