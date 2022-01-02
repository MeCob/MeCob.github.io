var drop = document.querySelector(".testObject");
var speed = document.querySelector(".speedIndicator");
var gravBox = document.querySelector(".gravityBox");

var vy = 0;
var vx = 0;
var y = gravBox.clientHeight - drop.clientHeight;
var x = drop.clientWidth*4;
var angle = 1;
deltaT = 250;
var g = 9.81;
var deltaY = 0;
var deltaX = 0;
var deltaAngle = 0;
var dampeningFactor = 0.8;
var offset;

function updateAnimation() {
  if (y > gravBox.clientHeight - drop.clientHeight) {
    deltaAngle = 0.2*deltaAngle;
    deltaX = 0.8*deltaX;
    y = gravBox.clientHeight - drop.clientHeight;
    deltaY = -dampeningFactor * deltaY;
    if (deltaX > 0) {
      deltaAngle += 0.2 * deltaX;
    } else {
      deltaAngle += -0.2 * deltaX;
    }
  }
  if (y < 0) {
    y = 0;
    deltaY = -dampeningFactor * deltaY;
  }
  if (x > gravBox.clientWidth - drop.clientHeight) {
    x = gravBox.clientWidth - drop.clientHeight;
    deltaX = -dampeningFactor * deltaX;
  }
  if (x < 0) {
    x = 0;
    deltaX = -dampeningFactor * deltaX;
  }
  deltaV = g;
  deltaY += deltaV * deltaT / 1000;
  y += deltaY * deltaT / 1000;
  x += deltaX * deltaT / 1000;
  deltaAngle = 0.9*deltaAngle;
  angle += deltaAngle * deltaT / 10;
  drop.style.top = y + "px";
  drop.style.left = x + "px";
  drop.style.transform = "rotate(" + angle + "deg)";
}

function fireEngine() {
  var impulse = Math.random() * 400;
  deltaX += Math.sin(angle)*impulse;
  deltaY += -Math.cos(angle)*impulse;
  drop.style.boxShadow = "-0.15em 1em 1em 0.1em yellow";
  setTimeout(fireEngine,Math.random()*20000)
  setTimeout(function(){drop.style.boxShadow = "none"},100)
}

(function init() {
  drop.style.transition = "all " + deltaT / 1000 + "s linear";
  setInterval(updateAnimation, deltaT);
})();