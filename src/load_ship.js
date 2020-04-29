import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import ship from '../assets/xwing2.obj';
import skin from '../assets/Arc170_blinn1.png';

export const material = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture(skin),
  specular: 0xBDBEC7,
  shininess: 50,
}); 

export const loadShip = async () => {
  let loader = new OBJLoader();
  let promise = new Promise((resolve) => {
    loader.load(ship, (object) => {
      object.scale.set(0.5, 0.5, 0.5);
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

};