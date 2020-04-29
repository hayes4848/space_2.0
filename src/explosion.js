import * as THREE from 'three';

export const createExplosion = (x, y, z) => {
  let counterArray2 = [...Array(100)];
  let movementSpeed = 50;
  let geometry = new THREE.Geometry();
  let dirs = [];
  let explosions = [];
  
  counterArray2.map(() => {
    let vertex = new THREE.Vector3(x, y, z);
    geometry.vertices.push(vertex);
    
    dirs.push({
      x:(Math.random() * movementSpeed)-(movementSpeed/2),
      y:(Math.random() * movementSpeed)-(movementSpeed/2),
      z:(Math.random() * movementSpeed)-(movementSpeed/2)
    });
  });


  let material = new THREE.PointsMaterial( { size: 2,  color: 0xffffff });
  let particles = new THREE.Points( geometry, material );
  explosions.push(particles);
  return [particles, dirs];
}