import React, {Component} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './css/Renderer.css'
import skyURL from './resources/sky_bg.jpg';

interface RendererState {
  mount: HTMLDivElement;
}

class Renderer extends Component<{}, RendererState> {

  private mount: HTMLDivElement | null = null;

	componentDidMount() {

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);
    // use ref as a mount point of the Three.js scene instead of the document.body
    if (this.mount) {
      this.mount.appendChild( renderer.domElement );
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render(scene, camera);

    // Torus

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Helpers

    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper)

    // Whale

    const loader = new GLTFLoader();
    loader.load('./models/basic_bluewhale.glb', gltf => {
      scene.add(gltf.scene);
    }, undefined, error => {
      console.log("That's a whale of an error!");
      console.log(error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    const skyTexture = new THREE.TextureLoader().load(skyURL);
    scene.background = skyTexture;

    var animate = function () {
      requestAnimationFrame( animate );

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      renderer.render( scene, camera );

      controls.update();
    };
    animate();
  }

  render() {
    return (
      <div ref={mount => (this.mount = mount)} />
    )
  }
}

export default Renderer;