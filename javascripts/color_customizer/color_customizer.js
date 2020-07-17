const scene = new THREE.Scene();
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

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
