const BACKGROUND_COLOR = 0xf1f1f1;
const scene = new THREE.Scene();
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

document.body.appendChild(renderer.domElement);

var cameraFar = 5;
var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = cameraFar;
camera.position.x = 0;

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
