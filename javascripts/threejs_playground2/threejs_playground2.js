let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.0001,
  10000
);
camera.position.set(0, 0, 50);
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const handleResize = () => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

const loop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
window.addEventListener("resize", handleResize);
