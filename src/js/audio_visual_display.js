// import "./audio_context.js";
// const THREE = require('three');

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     75, 
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// const group = new THREE.Group();
// camera.position.set(0, 0, 100);
// camera.lookAt(scene.position);
// scene.add(camera);

// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
// const planeMaterial = new THREE.MeshLambertMaterial({
//     color: 0x6904ce,
//     side: THREE.DoubleSide,
//     wireframe: true
// });

// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.set(0, 30, 0);

// const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
// plane2.rotation.x = -0.5 * Math.PI;
// plane2.position.set(0, -30, 0);

// var geometry = new THREE.SphereGeometry(1, 12, 12);
// var material = new THREE.MeshBasicMaterial({
//   color: 0x6904ce,
//   wireframe: true
// });
// var sphere = new THREE.Mesh(geometry, material);

// sphere.position.set(0, 0, 0);

// group.add(plane);
// group.add(plane2);
// group.add(sphere);
// scene.add(group);
// camera.position.z = 5;

// const animate = function() {
//     requestAnimationFrame(animate);

//     sphere.rotation.x += 0.01;
//     sphere.rotation.y += 0.01;

//     renderer.render(scene, camera);
// };

// animate();