import * as THREE from 'three';
import Background from '../assets/stars_background.jpg';

let tunnels = [];

export const buildTunnel = (scene) => {
  let plainStars = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(Background, 
	  null, function(tex) {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(5, 7)
      tex.needsUpdate = true
    }),
    
	side: THREE.BackSide});
  
  let tube = new THREE.CylinderGeometry(300, 300, 5000, 24, 24, true);
  let tunnel1 = new THREE.Mesh(tube, plainStars);	
  tunnel1.position.set(0,0,0);
  tunnel1.rotation.x = -Math.PI/2;
  scene.add(tunnel1);
  tunnels.push(tunnel1);

  let tunnel2 = new THREE.Mesh(tube, plainStars);	
  tunnel2.rotation.x = -Math.PI/2;
  tunnel2.position.set(0,0,-5000);
  scene.add(tunnel2);
  tunnels.push(tunnel2);

  return tunnels;
}