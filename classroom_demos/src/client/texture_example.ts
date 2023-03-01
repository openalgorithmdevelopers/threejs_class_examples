import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)
var mobileGeometry = new THREE.BoxGeometry(10, 20, 1);
        //var mobileMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: false});
var mobileMaterial = [
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/right.jpg')}),   // right
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/right.jpg')}),     // left
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/top.jpg')}),    // topt
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/bottom.jpg')}),    // bottom
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/front.jpg')}),    // front
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/myNokia/back.jpg')})   //back
];

var mobileModel = new THREE.Mesh(mobileGeometry, mobileMaterial);
scene.add(mobileModel);

function animate() {
    requestAnimationFrame(animate)

    //mobileModel.rotation.x += 0.01
    //mobileModel.rotation.y += 0.01

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()