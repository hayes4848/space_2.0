import * as THREE from 'three';
import { loadShip } from './load_ship';
import { createAsteroid } from './asteroids';
import { handleKeyDown, handleKeyUp } from './key_events';
import TWEEN from '@tweenjs/tween.js';
import { buildTunnel } from './tunnel';
import {buildSofiLogo } from './sofi_logo';
import { createShot } from './laser_beam';
import { createExplosion } from './explosion';
import { textGenerator } from './text_generator';
import '../styles.css';

let gameSpeed = 5;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
let spaceship;
let rotationX = 0;
let rotationY = 0;
let shotFired;
let counterArray1 = [...Array(10)];
let logos = [];
let asteroidsPromises = [];
let asteroids = [];
let shots = [];
let dirs = [];
let explosions = [];
let words = [];
let health = 100;
let score = 0;


camera.position.z = 200;
camera.position.y = 0;
camera.position.x = 0;
camera.lookAt(0,0,0);
camera.setLens(35);
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth -15, window.innerHeight -20);
renderer.setClearColor(0x0000022, 0.9);
document.body.appendChild( renderer.domElement );

let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); 
scene.add( directionalLight );

let ambLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
scene.add(ambLight);
scene.fog = new THREE.FogExp2(0x0000022, 0.0005)

let tunnels = buildTunnel(scene);

loadShip().then(result => {
  spaceship = result;
  scene.add(spaceship);
});

counterArray1.map((rock) => {rock = createAsteroid(); asteroidsPromises.push(rock)});

Promise.all(asteroidsPromises).then(result => {
  asteroids = result;
  asteroids.map(rock => {
    rock.position.set(randomNumber(-125, 125), randomNumber(-100, 100), randomNumber(-1000, -5000));
    scene.add(rock);
  })
});

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

counterArray1.map(logo => {
  logo = buildSofiLogo();
  logo.position.set(randomNumber(-150, 150), randomNumber(-125, 125), randomNumber(-1000, -5000));
  scene.add(logo);
  logos.push(logo);
});

const updateGameSpeed = score => {
  let speed = 5;
  if(score < 500){
  }else if(score < 1000){
    speed = 10;
  }else if(score < 1500){
    speed = 15
  }else {
    speed = 20;
  }
  return speed;
}

let animate = () => {
  requestAnimationFrame( animate );
  if(shotFired === true){
    let laser = createShot(spaceship);
    scene.add( laser );
    shots.push(laser);
  }

  shots.map( (shot, index) => {
    shot.position.z -= 10;
    shot.hitbox.setFromObject(shot);
    if(shot.position.z < -2500){
      shots.splice(index, 1);
      scene.remove(shot);
    }
    asteroids.map(rock => {
      if(rock.hitbox.intersectsBox(shot.hitbox)){
        let [explosion, directions] = createExplosion(rock.position.x, rock.position.y, rock.position.z);
        explosions.push(explosion);
        scene.add(explosion);
        dirs = directions;
        rock.position.set(randomNumber(-150, 150), randomNumber(-125, 125), -2500);
        shots.splice(index, 1);
        scene.remove(shot);
        console.log(explosions.length);
      }
    })
  })
  
  tunnels.map(t => {
    t.rotation.y += 0.01;
    t.position.z +=5;
    if(t.position.z - 2500 > camera.position.z){
      t.position.z -= 10000;
    }
  });

  logos.map(async (logo) => {
    if(logo !== undefined){
      logo.position.z += gameSpeed;
      logo.hitbox.setFromObject(logo);
      if(logo.position.z > camera.position.z){
        logo.position.set(randomNumber(-150, 150), randomNumber(-125, 125), -2500);
      }
    }
    if(!(spaceship === undefined)){
      if(logo.hitbox.intersectsBox(spaceship.hitbox)){
        logo.position.set(randomNumber(-150, 150), randomNumber(-125, 125), -2500);
        score += 25;
        document.getElementById('score-box').innerHTML = score;
        let text = textGenerator(spaceship.position.x, spaceship.position.y, spaceship.position.z, '+25');
        scene.add(text);
        words.push(text);
      } 
    }
  });

  asteroids.map(rock => {
    rock.position.z += gameSpeed;
    rock.rotation.x += randomNumber(1, 10) * 0.005;
    rock.rotation.y += randomNumber(1, 5) * 0.005;
    rock.hitbox.setFromObject(rock);
    if(rock.position.z > camera.position.z){
      rock.position.set(randomNumber(-150, 150), randomNumber(-125, 125), -2500);
    }

    if(rock.hitbox.intersectsBox(spaceship.hitbox)){
      spaceship.children[0].material.color.set(0xb80e06);
      spaceship.children[0].material.needsUpdate = true;
      rock.position.set(randomNumber(-150, 150), randomNumber(-125, 125), -2500);
      setTimeout(() => {
        spaceship.children[0].material.color.set(0xffffff);
      }, 200);
      health -=10;
      document.getElementById('health-box').innerHTML = health;
    }
  });

  if(explosions.length > 0){
    explosions.map(boom => {
      let particle = boom.geometry.vertices;
      particle.map((spec, index) => {
        spec.x += dirs[index].x;
        spec.y += dirs[index].y;
        spec.z += dirs[index].z;
      })
      boom.geometry.verticesNeedUpdate = true;
    });
  }

  if(explosions.length > 5){
    explosions.splice(0, 1);
  }

  words.map((text, index) => {
    text.position.z += gameSpeed;
    if(text.position.z > camera.position.z){
      words.splice(index, 1);
      scene.remove(text);
    } 
  })

  if(health === 0) {
    spaceship.position.set(0,0, -100);
    camera.position.set(0,0,200);
  }

  TWEEN.update();
  if(!(spaceship === undefined)){
    spaceship.position.x += rotationX;
    spaceship.position.y += rotationY;
    spaceship.hitbox.setFromObject(spaceship);
    camera.position.x += rotationX / 3;
    camera.position.y += rotationY / 3;
  }
  renderer.render( scene, camera );
  shotFired = false;
  gameSpeed = updateGameSpeed(score);
}

animate();



 window.addEventListener('keydown', (event) => {
   [rotationX, rotationY, shotFired] = handleKeyDown(event, spaceship)
  }, false);

 window.addEventListener('keyup', (event) => {
  [rotationX, rotationY, shotFired] = handleKeyUp(event, spaceship)
  }, false); 