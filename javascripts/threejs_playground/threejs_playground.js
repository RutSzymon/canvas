const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  24,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorYellow = new THREE.Color("hsl(40, 100%, 60%)");
const colorPink = new THREE.Color("hsl(306, 100%, 60%)");
const colorLight = new THREE.Color("hsl(40, 100%, 95%)");

const cubeGeometry = new THREE.BoxGeometry(1, 1.5, 0.9);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: colorYellow });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const light = new THREE.PointLight(colorLight, 2);
const light2 = new THREE.PointLight(colorLight, 0.5);

light.position.set(-40, -20, 20);
light2.position.set(40, 20, 10);

scene.add(light);
scene.add(light2);
scene.add(cube);

camera.position.z = 15;

cube.rotation.x = 20;
cube.rotation.z = -20;

renderer.render(scene, camera);
