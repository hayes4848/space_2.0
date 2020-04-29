import TWEEN from '@tweenjs/tween.js';
let rotationX = 0;
let rotationY = 0;
let shotFired = false;

export const handleKeyDown = (event, spaceship) => {
  shotFired = false;
  if(event.keyCode == 32){
    //
  }else if(event.keyCode == 37){ //left arrow
     rotationX = spaceship.position.x > -150 ? -3.5 : 0;
     new TWEEN.Tween(spaceship.rotation).to({z: 0.3}, 150).start();
   }else if(event.keyCode == 39){ //right arrow
     rotationX = spaceship.position.x < 150 ? 3.5 : 0;
     new TWEEN.Tween(spaceship.rotation).to({z: -0.3}, 150).start();
   }else if(event.keyCode == 38){ //up arrow
    rotationY = spaceship.position.y < 125 ? 3.5 : 0; 
     new TWEEN.Tween(spaceship.rotation).to({x: 0.35}, 150).start();
   }else if(event.keyCode == 40){ //down arrow
    rotationY = spaceship.position.y > -125 ? -3.5 : 0; 
     new TWEEN.Tween(spaceship.rotation).to({x: -0.35}, 150).start();
   }
   return [rotationX, rotationY, false];
}
  
export const handleKeyUp = (event, spaceship) => {
   if(event.keyCode == 32){ //spacebar
    shotFired = true;
   }else if(event.keyCode == 37){ //left arrow
     rotationX = 0;
     new TWEEN.Tween(spaceship.rotation).to({z: 0}, 150).start();
   }else if(event.keyCode == 39){ //right arrow
     rotationX = 0;
     new TWEEN.Tween(spaceship.rotation).to({z: 0}, 150).start();
   }else if(event.keyCode == 38){ //up arrow
     rotationY = 0;
     new TWEEN.Tween(spaceship.rotation).to({x: 0}, 150).start();
   }else if(event.keyCode == 40){ //down arrow
     rotationY = 0;
     new TWEEN.Tween(spaceship.rotation).to({x: 0}, 150).start();
   }
   return [rotationX, rotationY, shotFired];
}