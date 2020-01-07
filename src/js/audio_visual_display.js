const THREE = require('three');

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const group = new THREE.Group();
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight);

// const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
// const planeMaterial = new THREE.MeshLambertMaterial({
//     color: 0x6904ce,
//     side: THREE.DoubleSide,
//     wireframe: true
// });

// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.set(0, 30, 0);
// scene.add(plane);
// scene.add(camera);

// function animate() {
//     requestAnimationFrame( animate );
//     renderer.render( scene, camera )
// }
// animate();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const group = new THREE.Group();
camera.position.set(0, 0, 100);
camera.lookAt(scene.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x6904ce,
    side: THREE.DoubleSide,
    wireframe: true
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 30, 0);

const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
plane2.rotation.x = -0.5 * Math.PI;
plane2.position.set(0, -30, 0);


// const sphereGeometry = new THREE.IcosahedronGeometry(1, 1, 1);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//     color: 0x6904ce,
//     wireframe: true
//   });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

var geometry = new THREE.SphereGeometry(1, 12, 12);
var material = new THREE.MeshBasicMaterial({
  color: 0x6904ce,
  wireframe: true
});
var sphere = new THREE.Mesh(geometry, material);

sphere.position.set(0, 0, 0);
// sphere.scale.set(2, 1, 1);

group.add(plane);
group.add(plane2);
group.add(sphere);
scene.add(group);
camera.position.z = 5;

// renderer.render(scene, camera);

const animate = function() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();


// var scene = new THREE.Scene();
// var group = new THREE.Group();
// var camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// camera.position.set(0, 0, 100);
// camera.lookAt(scene.position);
// scene.add(camera);

// var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);

// var planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
// var planeMaterial = new THREE.MeshLambertMaterial({
//     color: 0x6904ce,
//     side: THREE.DoubleSide,
//     wireframe: true
// });

// var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.set(0, 30, 0);
// group.add(plane);

// var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
// plane2.rotation.x = -0.5 * Math.PI;
// plane2.position.set(0, -30, 0);
// group.add(plane2);

// var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
// var lambertMaterial = new THREE.MeshLambertMaterial({
//     color: 0xff00ee,
//     wireframe: true
// });

// var ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
// ball.position.set(0, 0, 0);
// group.add(ball);

// var ambientLight = new THREE.AmbientLight(0xaaaaaa);
// scene.add(ambientLight);

// var spotLight = new THREE.SpotLight(0xffffff);
// spotLight.intensity = 0.9;
// spotLight.position.set(-10, 40, 20);
// spotLight.lookAt(ball);
// spotLight.castShadow = true;
// scene.add(spotLight);

// // var orbitControls = new THREE.OrbitControls(camera);
// // orbitControls.autoRotate = true;

// scene.add(group);

// const animate = function() {
//     requestAnimationFrame(animate);

//     ball.rotation.x += 0.01;
//     ball.rotation.y += 0.01;

//     renderer.render(scene, camera);
// };

// animate();