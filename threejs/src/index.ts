WebGL.isWebGL2Available();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 2, window.innerHeight * 2, false);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.position.set(0, 0, 0);
gridHelper.rotation.set(Math.PI / 2, 0, 0);

const curve = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(0, 20),
    new THREE.Vector2(10, 0)
);
const path = new THREE.Path();

path.lineTo(0, 0.8);
path.quadraticCurveTo(0, 1, 0.2, 1);
path.lineTo(1, 1);

const points = path.getPoints();

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0x000000 });

const line = new THREE.Line(geometry, material);
scene.add(line);

renderer.render(scene, camera);
