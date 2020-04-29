import * as THREE from 'three';

export const buildSofiLogo = () => {
  let geometry = new THREE.TorusGeometry( 2.7, 0.5, 50, 50 );
  let materialWhite = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false } );
  let circleWhite = new THREE.Mesh( geometry, materialWhite );
  circleWhite.position.set(0, 0, -100);
  // scene.add( circleWhite );

  // Circle 1
  let material = new THREE.MeshPhongMaterial( { color: 0x00d0ff, flatShading: false } );
  let circle1 = new THREE.Mesh( geometry, material );
  circle1.position.set(-9, -9, 0);
  circleWhite.add( circle1 );

  // Circle 3
  let circle2 = new THREE.Mesh( geometry, material );
  circle2.position.set(9, 9, 0);
  circleWhite.add( circle2 );

  // Cylinder 1
  let cylinder = new THREE.CylinderGeometry( 3, 3, 2, 50 );
  let cylinder1 = new THREE.Mesh( cylinder, material );
  cylinder1.position.set(0, 9, 0);
  cylinder1.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder1 );

  // Cylinder 2
  let cylinder2 = new THREE.Mesh( cylinder, material );
  cylinder2.position.set(9, -9, 0);
  cylinder2.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder2 );

  // Cylinder 3
  let cylinder3 = new THREE.Mesh( cylinder, material );
  cylinder3.position.set(-9, 0, 0);
  cylinder3.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder3 );

  // Cylinder 4
  let cylinder4 = new THREE.Mesh( cylinder, material );
  cylinder4.position.set(9, 0, 0);
  cylinder4.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder4 );

  // Cylinder 5
  let cylinder5 = new THREE.Mesh( cylinder, material );
  cylinder5.position.set(-9, 9, 0);
  cylinder5.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder5 );

  // Cylinder 6
  let cylinder6 = new THREE.Mesh( cylinder, material );
  cylinder6.position.set(0, -9, 0);
  cylinder6.rotation.x = THREE.Math.degToRad(90);
  circleWhite.add( cylinder6 );

  circleWhite.hitbox = new THREE.Box3();

  return circleWhite;
}