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

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // wireframe: true,
})

const texture = new THREE.TextureLoader().load('img/grid.png')
material.map = texture
const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
envTexture.mapping = THREE.CubeReflectionMapping
envTexture.mapping = THREE.CubeRefractionMapping
material.envMap = envTexture

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const cube2 = new THREE.Mesh(geometry, material)
cube2.position.z = 2
scene.add(cube2)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
}

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const materialFolder = gui.addFolder('material')
materialFolder.add(material, 'transparent').onChange(() =>(material.needsUpdate = true))
materialFolder.add(material, 'opacity', 0, 1, 0.1)
materialFolder.add(material, 'depthTest')
materialFolder.add(material, 'depthWrite')
materialFolder.add(material, 'alphaTest', 0, 1, 0.1).onChange(() => updateMaterial())
materialFolder.add(material, 'visible')
materialFolder.add(material, 'side', options.side).onChange(()=>updateMaterial())
// materialFolder.open()

function updateMaterial(){
    material.side = Number(material.side)
    material.needsUpdate = true
}

const cubeRotation = cubeFolder.addFolder('Rotation')
// const cubeRotation = gui.addFolder('Cube')
cubeRotation.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeRotation.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeRotation.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeRotation.open()
const positionFolder = cubeFolder.addFolder('Position')
positionFolder.add(cube.position, 'x', -10, 10)
positionFolder.add(cube.position, 'y', -10, 10)
positionFolder.add(cube.position, 'z', -10, 10)
positionFolder.open()
const scalingFolder = cubeFolder.addFolder('Scale')
scalingFolder.add(cube.scale, 'x', -10, 10, 0.1)
scalingFolder.add(cube.scale, 'y', -10, 10, 0.1)
scalingFolder.add(cube.scale, 'z', -10, 10, 0.1)
// scalingFolder.open()

const data = {color:material.color.getHex()}

const meshBasicMaterialFolder = gui.addFolder('MeshBasicMaterial')
meshBasicMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) })
meshBasicMaterialFolder.add(material, 'wireframe')
meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10)
meshBasicMaterialFolder.add(material, 'combine').onChange(()=> updateMaterial())
meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1)
meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1)
meshBasicMaterialFolder.open()

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()