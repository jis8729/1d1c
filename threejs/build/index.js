"use strict";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// setsize 3번째 false면 사이즈는 그대로, 해상도 변경됨, 레티나 디스플레이 위한 해상도 두배 설정
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 2, window.innerHeight * 2, false);
document.body.appendChild(renderer.domElement);
//
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
// requestanimationframe 은 유저가 브라우저 윈도우에서 벗어나면 멈춤. 전력 아낄 수 있음.
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
