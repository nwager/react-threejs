import React, {Component} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './css/Renderer.css'

interface RendererProps {
  cameraDist: number;
  radius: number;
  omega: number;

  onScore(): void;
  onProgress(current: number): void;
  onLoad(): void;
}

class Renderer extends Component<RendererProps> {

  private mount: HTMLDivElement | null = null;
  private scene: THREE.Scene = new THREE.Scene();

	componentDidMount() {

    let manager = new THREE.LoadingManager();
    manager.onLoad = this.props.onLoad;
    manager.onProgress = (url, current, total) => {
      this.props.onProgress(current/total);
    }

    let renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);
    // use ref as a mount point of the Three.js scene instead of the document.body
    if (this.mount) {
      this.mount.appendChild(renderer.domElement);
    }
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = -this.props.cameraDist;
    camera.position.z = this.props.cameraDist;
    camera.position.y = this.props.cameraDist/2;
    camera.lookAt(0,0,0);
    renderer.render(this.scene, camera);
    
    const clock = new THREE.Clock();

    this.addLights();

    // Whale
    let whaleMesh: THREE.Object3D;
    let mixer: THREE.AnimationMixer;
    const loader = new GLTFLoader(manager);
    loader.load(this.pubURL('/models/bluewhale_textured.glb'), gltf => {
      whaleMesh = gltf.scene;
      whaleMesh.position.y = this.props.radius;
      this.scene.add(whaleMesh);
      
      mixer = new THREE.AnimationMixer(whaleMesh);
      mixer.clipAction(gltf.animations[7]).play(); // main animation
    }, undefined, error => {
      console.log("That's a whale of an error!");
      console.log(error);
    });

    // Torus
    const geometry = new THREE.TorusGeometry(8, 1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffcb2e });
    const torus = new THREE.Mesh(geometry, material);
    this.setTorusCircle(torus, Math.random() * 360);
    this.scene.add(torus);
    // array for fading tori animations
    const fadeTorusArray: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>[] = [];

    // Stars
    const stars = Array(250).fill(null).map(() => this.addStar(camera));

    // All animation
    var animate = () => {
      requestAnimationFrame(animate);
      if (mixer) { mixer.update(clock.getDelta()); }
      const t = clock.getElapsedTime();

      // all whale-related actions
      if (whaleMesh) {
        // move the whale in a circle
        this.moveWhale(whaleMesh, t);
        
        // move torus when whale goes through, and create fading effect
        const epsilon = 1; // tolerance for checking for equal positions
        if (whaleMesh.position.distanceTo(torus.position) < epsilon) {
          fadeTorusArray.push(this.createFadeTorus(torus));
          this.setTorusCircle(torus, Math.random() * 360);
          this.props.onScore();
        }
        // fade away score tori
        this.fadeTori(fadeTorusArray);

        // loosely follow the whale
        let lookVec = new THREE.Vector3().copy(whaleMesh.position);
        camera.lookAt(lookVec.normalize().multiplyScalar(2.3));
      }

      // update stars
      const starAmp = 0.01;
      const starOmega = 0.5;
      stars.forEach((star, i) => {
        // add a little randomness to the rotation axes
        star.rotateOnAxis(new THREE.Vector3(i,i*i,i*i).normalize(), 0.02);
        // vertical wave effect
        star.position.y += starAmp * Math.sin(starOmega*(t + (star.position.x / 10)));
      });

      renderer.render(this.scene, camera);
    };
    animate();
  }

  // adds all lights to the scene
  addLights() {
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 300, 0 );
    hemiLight.intensity = 2;
    this.scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight( 0xc300ff );
    dirLight.position.set( 75, 300, -75 );
    dirLight.intensity = 2;
    this.scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.intensity = 3;
    this.scene.add(ambientLight);
  }

  // moves whale along circlular path, given the curren time
  moveWhale(whale: any, t: number) {
    const phi = Math.PI / 2; // start at top of circle
    const y = this.props.radius * Math.sin(-this.props.omega * t + phi);
    const z = this.props.radius * Math.cos(-this.props.omega * t + phi);
    const period = 2 * Math.PI / this.props.omega;
    const frac = (t % period) / period;
    whale.position.set(0, y, z);
    whale.rotation.x = frac * Math.PI * 2;
  }

  // get torus position and rotation for a given angle on the circle path
  setTorusCircle(torus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>, deg: number) {
    const z = this.props.radius * Math.cos(THREE.MathUtils.degToRad(deg));
    const y = this.props.radius * Math.sin(THREE.MathUtils.degToRad(deg));

    const rx = THREE.MathUtils.degToRad(-deg + 90)
    torus.position.set(0, y, z);
    torus.rotation.set(rx, 0, 0);
  }

  // instantiates torus fade animation
  createFadeTorus(oldTorus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>): THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial> {
    const clone = oldTorus.clone();
    clone.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    clone.material.transparent = true;
    this.scene.add(clone);
    return clone;
  }

  // fades all active tori animations
  fadeTori(fadeTorusArray: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>[]) {
    const fadeAmount = 0.1;
    const sizeInc = 0.06;
    fadeTorusArray.forEach((torus, i) => {
      if (torus.material.opacity <= 0) {
        this.scene.remove(torus);
        fadeTorusArray.splice(i, 1);
      }
      torus.material.opacity -= fadeAmount;
      torus.scale.addScalar(sizeInc);
    })
  }

  // instantiates a star
  addStar = (camera: THREE.Camera) => {
    const geometry = new THREE.SphereGeometry(0.4, 4, 2);
    const material = new THREE.MeshStandardMaterial({
      // blue, purple
      color: Math.random() < 0.5 ? 0x42ebe5 : 0xd037db,
      transparent: true,
      opacity: 0.9
    });
    const star = new THREE.Mesh(geometry, material);
  
    let [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(200));
    // reroll if too close to camera
    while (new THREE.Vector3(x,y,z).distanceTo(camera.position) < 10) {
      [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(200));
    }
    const [rx, ry, rz] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(Math.PI));
  
    star.position.set(x, y, z);
    star.rotation.set(rx, ry, rz);
    this.scene.add(star);
    return star;
  }

  // adds public URL to beginning of path
  pubURL(path: string): string { return process.env.PUBLIC_URL + path }

  render() {
    return (
      <div className="Renderer" ref={mount => (this.mount = mount)} />
    )
  }
}

export default Renderer;