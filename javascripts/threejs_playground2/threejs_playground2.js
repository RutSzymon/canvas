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

const createSphere = (r = 1, color = 0xffffff) => {
  const spehereMat = new THREE.MeshPhongMaterial({
    color,
    shininess: 50,
  });
  const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
  return new THREE.Mesh(sphereGeo, spehereMat);
};

const createLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, i);
};

const loop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
window.addEventListener("resize", handleResize);
