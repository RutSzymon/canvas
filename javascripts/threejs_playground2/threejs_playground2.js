let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  40,
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

const nucleus = createSphere(3);
const l1 = createPointLight(0.8);
const l2 = createPointLight(0.4);
l1.position.set(60, 20, 60);
l2.position.set(-30, 0, 20);

scene.add(nucleus, l1, l2);

const createElectron = (r = 0.4, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return {
    sphere,
    pivot,
  };
};

const e1 = createElectron(0.4);
const e2 = createElectron(0.4);
const e3 = createElectron(0.4);
const e4 = createElectron(0.4);
e1.sphere.position.set(10, 0, 0);
e2.sphere.position.set(5, 0, 0);
e3.sphere.position.set(-5, 0, 0);
e4.sphere.position.set(-10, 0, 0);
nucleus.add(e1.pivot, e2.pivot, e3.pivot, e4.pivot);

// scene.add(e1, e2, e3, e4);

const loop = () => {
  e1.pivot.rotation.z += 0.01;
  e2.pivot.rotation.z += 0.01;
  e3.pivot.rotation.z += 0.01;
  e4.pivot.rotation.z += 0.01;
  nucleus.rotation.z += 0.001;
  nucleus.rotation.x += 0.002;
  nucleus.rotation.y += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
window.addEventListener("resize", handleResize);
