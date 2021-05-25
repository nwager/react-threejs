import React, {Component} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './css/Renderer.css'
import skyURL from './resources/sky_bg.jpg';

interface RendererProps {
  onScore(): void;
}

const orbitControls = false;
const distance = 50;
const r = 30;
const omega = 1 / 0.5;
const epsilon = 1

class Renderer extends Component<RendererProps> {

  // change some of these to state?

  private mount: HTMLDivElement | null = null;
  private whaleMesh: THREE.Object3D | null = null;
  private mixer: THREE.AnimationMixer | null = null;

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

    camera.position.x = -distance;
    camera.position.z = distance;
    camera.position.y = distance/2;
    camera.rotation.x -= this.degToRad(26.56);
    camera.rotation.y = this.degToRad(-45);

    const clock = new THREE.Clock();

    renderer.render(scene, camera);

    // Lights

    this.addLights(scene);

    // Helpers

    const axesHelper = new THREE.AxesHelper(10);
    scene.add( axesHelper );

    // Torus

    const geometry = new THREE.TorusGeometry(8, 1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffcb2e });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = r;
    torus.rotation.x = this.degToRad(15);
    scene.add(torus);

    // Whale

    const loader = new GLTFLoader();
    loader.load(this.pubURL('/models/bluewhale_textured.glb'), gltf => {

      const mesh = gltf.scene;
      mesh.position.y = r;
      this.whaleMesh = mesh;

      this.mixer = new THREE.AnimationMixer(this.whaleMesh);
      this.mixer.clipAction(gltf.animations[7]).play(); // main animation

      scene.add(this.whaleMesh);

    }, undefined, error => {
      console.log("That's a whale of an error!");
      console.log(error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    const skyTexture = new THREE.TextureLoader().load(skyURL);
    scene.background = skyTexture;

    var animate = () => {
      requestAnimationFrame( animate );

      if (this.mixer) { this.mixer.update(clock.getDelta()); }

      if (this.whaleMesh) {
        const phi = Math.PI / 2; // start at top of circle
        const t = clock.getElapsedTime();
        const y = r * Math.sin(-omega * t + phi);
        const z = r * Math.cos(-omega * t + phi);
        this.whaleMesh.position.set(0, y, z);
        const period = 2 * Math.PI / omega;
        const frac = (t % period) / period;
        this.whaleMesh.rotation.x = frac * Math.PI * 2;

        if (this.whaleMesh.position.distanceTo(torus.position) < epsilon) {
          const yzRotX = this.torusCircleState(Math.random() * 360);
          torus.position.set(0, yzRotX[0], yzRotX[1]);
          torus.rotation.set(yzRotX[2], 0, 0);

          this.props.onScore();
        }
      }

      renderer.render( scene, camera );

      if (orbitControls) {controls.update();}
    };
    animate();
  }

  addLights(scene: THREE.Scene) {
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 300, 0 );
    hemiLight.intensity = 2;
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 75, 300, -75 );
    dirLight.intensity = 2;
    scene.add( dirLight );

    var ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.intensity = 3;
    scene.add(ambientLight);
  }

  pubURL(path: string): string { return process.env.PUBLIC_URL + path }

  degToRad(deg: number): number { return deg * (Math.PI / 180); }
  radToDeg(rad: number): number { return rad * (180 / Math.PI); }

  torusCircleState(deg: number): [number, number, number] {
    const z = r * Math.cos(this.degToRad(deg));
    const y = r * Math.sin(this.degToRad(deg));

    const rotX = this.degToRad(-deg + 90)
    return [y, z, rotX];
  }

  render() {
    return (
      <div ref={mount => (this.mount = mount)} />
    )
  }
}

export default Renderer;