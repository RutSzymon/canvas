let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  60,
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

const createSphere = (r = 1, color = 0xffffff) => {
  const spehereMat = new THREE.MeshPhongMaterial({
    color,
    shininess: 30,
  });
  const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
  return new THREE.Mesh(sphereGeo, spehereMat);
};

const createPointLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, i);
};

const loop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

const nucleus = createSphere(3);
const l1 = createPointLight(0.5);
const l2 = createPointLight(0.2);
l1.position.set(30, 5, 10);
l2.position.set(-60, 0, 20);

scene.add(nucleus, l1, l2);

loop();
window.addEventListener("resize", handleResize);
