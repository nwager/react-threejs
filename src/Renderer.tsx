import React, {Component} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './css/Renderer.css'

interface RendererProps {
  cameraDist: number;
  radius: number;
  omega: number;
  onScore(): void;
}

class Renderer extends Component<RendererProps> {

  private orbitControls = false;
  private epsilon = 1;

  private mount: HTMLDivElement | null = null;
  private whaleMesh: THREE.Object3D | null = null;
  private mixer: THREE.AnimationMixer | null = null;

  private numStars = 200;  

	componentDidMount() {

    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);
    // use ref as a mount point of the Three.js scene instead of the document.body
    if (this.mount) {
      this.mount.appendChild( renderer.domElement );
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = -this.props.cameraDist;
    camera.position.z = this.props.cameraDist;
    camera.position.y = this.props.cameraDist/2;
    camera.lookAt(0,0,0);

    const clock = new THREE.Clock();

    renderer.render(scene, camera);

    // Lights

    this.addLights(scene);

    // Helpers



    // Torus

    const geometry = new THREE.TorusGeometry(8, 1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffcb2e });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = this.props.radius;
    scene.add(torus);

    // Stars

    const stars = Array(this.numStars).fill(null).map(() => this.addStar(scene));

    // Whale

    const loader = new GLTFLoader();
    loader.load(this.pubURL('/models/bluewhale_textured.glb'), gltf => {

      this.whaleMesh = gltf.scene;
      this.whaleMesh.position.y = this.props.radius;

      this.mixer = new THREE.AnimationMixer(this.whaleMesh);
      this.mixer.clipAction(gltf.animations[7]).play(); // main animation

      scene.add(this.whaleMesh);

    }, undefined, error => {
      console.log("That's a whale of an error!");
      console.log(error);
    });

    // Scene

    const controls = this.orbitControls ? new OrbitControls(camera, renderer.domElement) : null;

    var animate = () => {
      requestAnimationFrame(animate);

      if (this.mixer) { this.mixer.update(clock.getDelta()); }
      const t = clock.getElapsedTime();

      if (this.whaleMesh) {
        // move the whale in a circle
        const phi = Math.PI / 2; // start at top of circle
        const y = this.props.radius * Math.sin(-this.props.omega * t + phi);
        const z = this.props.radius * Math.cos(-this.props.omega * t + phi);
        this.whaleMesh.position.set(0, y, z);
        const period = 2 * Math.PI / this.props.omega;
        const frac = (t % period) / period;
        this.whaleMesh.rotation.x = frac * Math.PI * 2;
        
        if (this.whaleMesh.position.distanceTo(torus.position) < this.epsilon) {
          // move the torus to a random point in the whale's path when passed through
          const circleState = this.torusCircleState(Math.random() * 360);
          torus.position.set(circleState[0].x, circleState[0].y, circleState[0].z);
          torus.rotation.set(circleState[1].x, circleState[1].y, circleState[1].z);

          this.props.onScore();
        }
        // kinda follow the whale
        let lookVec = new THREE.Vector3().copy(this.whaleMesh.position);
        camera.lookAt(lookVec.normalize().multiplyScalar(2));
      }
      // update stars
      const starAmp = 0.04;
      const starOmega = 0.5;
      stars.forEach((star, i) => {
        const axis = new THREE.Vector3(i,i*i,i*i);
        star.rotateOnAxis(axis.normalize(), 0.02);
        // vertical wave effect
        star.position.y += starAmp * Math.sin(starOmega*t + (star.position.x*2*Math.PI/this.numStars));
      });

      renderer.render(scene, camera);

      if (controls) {controls.update();}
    };
    animate();
  }

  addLights(scene: THREE.Scene) {
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 300, 0 );
    hemiLight.intensity = 2;
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight( 0xc300ff );
    dirLight.position.set( 75, 300, -75 );
    dirLight.intensity = 2;
    scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.intensity = 3;
    scene.add(ambientLight);
  }

  pubURL(path: string): string { return process.env.PUBLIC_URL + path }

  degToRad(deg: number): number { return deg * (Math.PI / 180); }
  radToDeg(rad: number): number { return rad * (180 / Math.PI); }

  torusCircleState(deg: number): [THREE.Vector3, THREE.Vector3] {
    const z = this.props.radius * Math.cos(this.degToRad(deg));
    const y = this.props.radius * Math.sin(this.degToRad(deg));

    const rotX = this.degToRad(-deg + 90)
    return [new THREE.Vector3(0, y, z), new THREE.Vector3(rotX, 0, 0)];
  }

  addStar(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(0.4, 4, 2);
    const material = new THREE.MeshStandardMaterial({
      // blue, purple
      color: Math.random() < 0.5 ? 0x42ebe5 : 0xd037db,
      transparent: true,
      opacity: 0.9
    });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(150));
    const [rx, ry, rz] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(Math.PI));
  
    star.position.set(x, y, z);
    star.rotation.set(rx, ry, rz);
    scene.add(star);
    return star;
  }

  render() {
    return (
      <div className="Renderer" ref={mount => (this.mount = mount)} />
    )
  }
}

export default Renderer;