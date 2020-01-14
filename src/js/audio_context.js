const THREE = require('three');
const SimplexNoise = require('simplex-noise');

var green = new THREE.Color('#D9FFA3');
var purple = new THREE.Color('#7F25D9');
var burntorange = new THREE.Color('#F2784B');
var forestGreen = new THREE.Color('#516D73');

const noise = new SimplexNoise();

// function avg(arr) {
//     let sum = 0;

//     arr.forEach(num => {
//         sum += num;
//     });
//     return (sum / arr.length);
// }

// function render() {
//     analyzer.getByteFrequencyData(dataArr);

//     var lowerHalfArray = dataArr.slice(0, (dataArr.length / 2) - 1);
//     var upperHalfArray = dataArr.slice((dataArr.length / 2) - 1, dataArr.length - 1);

//     var overallAvg = avg(dataArr);
//     var lowerMax = Math.max(...lowerHalfArray);
//     var lowerAvg = avg(lowerHalfArray);
//     var upperMax = Math.max(...upperHalfArray);
//     var upperAvg = avg(upperHalfArray);

//     var lowerMaxFr = lowerMax / lowerHalfArray.length;
//     // var lowerAvgFr = lowerAvg / lowerHalfArray.length;
//     // var upperMaxFr = upperMax / upperHalfArray.length;
//     var upperAvgFr = upperAvg / upperHalfArray.length;

//     makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 2));
//     makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 2));

//     // makeRoughBall(sphere, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.5), modulate(upperAvgFr, 0, 1, 0, 0.5));
//     makeRoughBall(torus, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.5), modulate(upperAvgFr, 0, 1, 0, 0.5));
//     // group.rotation.y += 0.000;
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
// }



// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function makeRoughBall(mesh, bassFr, treFr) {
//     mesh.geometry.vertices.forEach(function (vertex, i) {
//         var offset = mesh.geometry.parameters.radius;
//         var amp = 7;
//         var time = window.performance.now();
//         vertex.normalize();
//         var rf = 0.00001;
//         var distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
//         vertex.multiplyScalar(distance);
//     });
//     mesh.geometry.verticesNeedUpdate = true;
//     mesh.geometry.normalsNeedUpdate = true;
//     mesh.geometry.computeVertexNormals();
//     mesh.geometry.computeFaceNormals();
// }

// function makeRoughGround(mesh, distortionFr) {
//     mesh.geometry.vertices.forEach(function (vertex, i) {
//         var amp = 2;
//         var time = Date.now();
//         var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
//         vertex.z = distance;
//     });
//     mesh.geometry.verticesNeedUpdate = true;
//     mesh.geometry.normalsNeedUpdate = true;
//     mesh.geometry.computeVertexNormals();
//     mesh.geometry.computeFaceNormals();
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// const listener = new THREE.AudioListener();
const group = new THREE.Group();
camera.position.set(0, 0, 100);
camera.lookAt(scene.position);
// camera.add( listener );
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
document.getElementById("container").appendChild(renderer.domElement);
renderer.domElement.className = "canvas-container";

const planeGeometry = new THREE.PlaneGeometry(400, 400, 20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: forestGreen,
    side: THREE.DoubleSide,
    wireframe: true
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 30, 0);


const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
plane2.rotation.x = -0.5 * Math.PI;
plane2.position.set(0, -30, 0);

var geometry = new THREE.IcosahedronGeometry(1, 3);
var material = new THREE.MeshBasicMaterial({
    color: forestGreen,
    wireframe: true
});

var geometry = new THREE.TorusGeometry(1.5, 1, 6, 100);
var material = new THREE.MeshBasicMaterial({ 
    color: forestGreen,
    wireframe: true
});
var torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 0);
geomClone = torus.geometry.clone();
console.log(geomClone);
group.add(torus);

var light = new THREE.AmbientLight(purple); // soft white light
group.add(light);



group.add(plane);
group.add(plane2);
scene.add(group);
camera.position.z = 5;
const animate = function () {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.007;
    torus.rotation.y += 0.007;
    renderer.render(scene, camera);
    group.rotation.y += 0.002;
};

function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

animate();

// render();

