import * as THREE from 'three';

export const createShot = (spaceship) => {
  let material = new THREE.MeshPhongMaterial( { color: 0xf21707, flatShading: false, emissive: 0xf21707, emissiveIntensity: 0.9, shininess: 100 } );
  let cylinder = new THREE.CylinderGeometry( 0.5, 0.5, 20, 50 );
  let laser = new THREE.Mesh( cylinder, material );
  laser.hitbox = new THREE.Box3();
  laser.rotation.x = THREE.Math.degToRad(90);
  laser.position.set(spaceship.position.x, spaceship.position.y +3, spaceship.position.z -3);
  return laser;
}