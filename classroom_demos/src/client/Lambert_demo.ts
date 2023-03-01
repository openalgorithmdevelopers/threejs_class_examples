// MeshLambertMaterial
// A material for non-shiny surfaces, without specular highlights

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff, 2)
light.position.set(10, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 8

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

const sphere = new THREE.SphereGeometry()
const Icohedran = new THREE.IcosahedronGeometry(1, 0)
const geometry = new THREE.BoxGeometry()

const material = new THREE.MeshLambertMaterial()

const cube = new THREE.Mesh(geometry, material)
const mySphere = new THREE.Mesh(sphere, material)
const myIcoHedra = new THREE.Mesh(Icohedran, material)

cube.position.z = 0
mySphere.position.z = 1.6
myIcoHedra.position.z = 3

scene.add(cube)
scene.add(mySphere)
scene.add(myIcoHedra)

const stats =  Stats()
document.body.appendChild(stats.dom)

const options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
    combine: {
        MultiplyOperation: THREE.MultiplyOperation,
        MixOperation: THREE.MixOperation,
        AddOperation: THREE.AddOperation,
    },
}

const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
}

const gui = new GUI()
const meshLambertMaterialFolder = gui.addFolder('THREE.MeshLambertMaterial')

meshLambertMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
meshLambertMaterialFolder.addColor(data, 'emissive').onChange(() => {
    material.emissive.setHex(
        Number(data.emissive.toString().replace('#', '0x'))
    )
})
meshLambertMaterialFolder.add(material, 'wireframe')
meshLambertMaterialFolder.add(material, 'wireframeLinewidth', 0, 10)
//meshLambertMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
meshLambertMaterialFolder
    .add(material, 'combine', options.combine)
    .onChange(() => updateMaterial())
meshLambertMaterialFolder.add(material, 'reflectivity', 0, 1)
meshLambertMaterialFolder.add(material, 'refractionRatio', 0, 1)
meshLambertMaterialFolder.open()

function updateMaterial() {
    material.side = Number(material.side)
    material.combine = Number(material.combine)
    material.needsUpdate = true
}

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