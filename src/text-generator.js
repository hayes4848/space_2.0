import * as THREE from 'three';

export const textGenerator = (x,y,z, inputText) => {
  const fontJS = require("../assets/Roboto/Roboto_Medium_Regular.json");
  const font = new THREE.Font(fontJS);
  let text = new THREE.TextGeometry(inputText, {size: 5, height: 5, font: font, weight: 'normal'});
  let material = new THREE.MeshBasicMaterial({color: 0xffff00});
  let word = new THREE.Mesh(text, material);
  word.position.set(x, y, z);
  return word;
}