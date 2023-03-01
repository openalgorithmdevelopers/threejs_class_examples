import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3 } from 'three'

let rotationY = 0
let rotationZ = 0

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2
camera2.position.z = 5
camera2.position.x = 5
camera2.position.y = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth/2, window.innerHeight/2)
document.body.appendChild(renderer.domElement)

const renderer2 = new THREE.WebGLRenderer()
renderer2.setSize(window.innerWidth/2, window.innerHeight/2)
document.body.appendChild(renderer2.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

const controls2 = new OrbitControls(camera2, renderer2.domElement)
controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

const light = new THREE.PointLight()
light.position.set(2.5, 7.5, 15)
scene.add(light)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const loader = new GLTFLoader();

let model = new THREE.Group
loader.load( './3dmodels/drone_gltf.glb', function ( gltf ) {
    model = gltf.scene
    model.scale.set(0.01, 0.01, 0.01)
	scene.add( model );
}, undefined, function ( error ) {
	console.error( error );
} );

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './audios/drone_sound2.wav', function( buffer ) {
// audioLoader.load( './audios/drone_sound.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
});

// finally add the sound to the mesh
model.add( sound );

model.position.z = -15
camera.position.z = 3
function animate() {
    requestAnimationFrame(animate)

    // model.position.z += 0.001
    model.position.z += 0.001
    model.rotation.y = rotationY
    model.rotation.z = rotationZ
    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
    renderer2.render(scene, camera2)
}

animate()

document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37:
            rotationY += 0.1
       break;
       case 38:
            rotationZ += 0.1
       break;
       case 39:
            rotationY -= 0.1
       break;
       case 40:
            rotationZ -= 0.1
       break;
    }
};