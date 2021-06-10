import './style.css';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import {color} from "three/examples/jsm/libs/dat.gui.module";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(17, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xDD1010 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {

  const asteroidTexture = new THREE.TextureLoader().load('asteroid.jpg');
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map:asteroidTexture });
  const particle = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  particle.position.set(x, y, z);
  scene.add(particle);
}

Array(500).fill().forEach(addStar);

// Background

const backgroundColor = new THREE.Color(0xFAFAFA);
scene.background = backgroundColor;

// Cube
const textureLoader = new THREE.TextureLoader();

const texture0 = textureLoader.load( '3.png' );
const texture1 = textureLoader.load( '2.png' );
const texture2 = textureLoader.load( '5.png' );
const texture3 = textureLoader.load( '4.png' );
const texture4 = textureLoader.load( '1.png' );
const texture5 = textureLoader.load( '6.png' );

var codePictures = [
  new THREE.MeshStandardMaterial( { map: texture0 } ),
  new THREE.MeshStandardMaterial( { map: texture1 } ),
  new THREE.MeshStandardMaterial( { map: texture2 } ),
  new THREE.MeshStandardMaterial( { map: texture3 } ),
  new THREE.MeshStandardMaterial( { map: texture4 } ),
  new THREE.MeshStandardMaterial( { map: texture5 } ),
];




const boxCode = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), codePictures);

scene.add(boxCode);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);


const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalEarth = new THREE.TextureLoader().load('earthnormal.png');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(150, 32, 32),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: normalEarth,
    })
);

scene.add(earth);

earth.position.y=25;
earth.position.z=50;
earth.position.setX(-500);
earth.rotation.z= 0.9;
moon.position.z = 30;
moon.position.setX(-10);

boxCode.position.z = -5;
boxCode.position.x = 2;



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  boxCode.rotation.y += 0.01;
  boxCode.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0004;
  camera.rotation.y = t * -0.0004;
}


document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  boxCode.rotation.x += -0.001;
  boxCode.rotation.y += -0.001;
  boxCode.rotation.z += -0.001;

  moon.rotation.y += -0.005;
  earth.rotation.y += 0.002;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

//SmoothScroll

function smoothScroll(target, duration){
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top-120;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime){
    if(startTime===null){
      startTime = currentTime;
    }
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed,startPosition,distance,duration);
    window.scrollTo(0,run);
    if (timeElapsed < duration){
      requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t*t + b;
      t -= 2;
      return -c/2 * (t*t*t*t - 2) + b;
    }
  }
  requestAnimationFrame(animation);
}

var education = document.querySelector('.educationbtn');
var project = document.querySelector('.projectbtn');
var contact = document.querySelector('.contactbtn');
var about = document.querySelector('.aboutbtn');

education.addEventListener('click', function (){

  smoothScroll('.education', 4000);

});

project.addEventListener('click', function (){
  smoothScroll('.projects', 4000);
});

contact.addEventListener('click', function (){
  smoothScroll('.contact', 4000);
});

about.addEventListener('click', function (){
  smoothScroll('.about', 4000);
});