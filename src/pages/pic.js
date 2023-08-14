import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Clock, DoubleSide, TextureLoader } from 'three'
import Flag from '@/components/Flag'
import { fbm } from '../../public/shaders'

export default function Wrapper() {
  return (
    <>
    <Suspense fallback={null} >
      <Canvas shadows style={{background:"black", height: '100vh'}}>
        <OrbitControls />

        <axesHelper args={[10]} />

        <Pic />

      </Canvas>
    </Suspense>

    </>

  )
}

const vert = `
${fbm}

varying vec2 vUv;
varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_wind;

uniform float time;

void main() {
  vUv = uv;

  vec3 finalPosition = position;

  vec3 wind = vec3(
    fbm(.3 * position + .1 * time),
    fbm(.2 * position + .2 * time),
    fbm(.1 * position + .3 * time)
  );

  float wave = mix(-2.0, 2.0, .1 * fbm(position + wind));

  vec2 peg1 = vec2(0.0, 1.0);
  vec2 peg2 = vec2(1.0,1.0);

  float tension = distance(uv, peg1) * distance(uv, peg2);
  
  float gravity = -0.2 * sin(uv.x);

  finalPosition.y += gravity;

  finalPosition.z +=  wave;

  vec4 modelPosition = vec4(finalPosition, 1.0);

  vec4 viewPosition = modelViewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;


  v_wind = wind;
}

`

const frag = `
uniform bool isTouched;
uniform sampler2D image;
uniform float time;
uniform vec2 mouse;
uniform vec2 touchPoint;

varying vec2 vUv;
varying vec3 v_wind;
varying vec3 v_position;
varying vec3 v_normal;


struct Light {
  vec3 position;
  vec3 color;
};

vec3 addLight(Light l) {
  // new normals
  vec3 dx = dFdx(v_position);
  vec3 dy = dFdy(v_position);
  vec3 newNormal = normalize(cross(dx, dy));

  // light direction
  vec3 L = normalize(l.position - v_position);

  // surface direction
  vec3 N = mix(v_normal, newNormal, 1.);

  // ambient lighting
  float ambientScore = 1.0;
  vec3 ambientColor = ambientScore * l.color;

  //diffuse lighting
  float diffuseScore = max(dot(L, N), 0.0);
  vec3 diffuseColor = diffuseScore * l.color;

  return ambientColor + diffuseColor;
}


void main() {

  vec4 img_color = texture2D(image, vUv);

  Light l = Light (
    vec3(0.0, 0.0, 0.0),
    vec3(1.0, 1.0, 1.0) 
  );

  vec3 rgb = addLight(l) * (img_color.rgb) - (v_wind) + .6;
  // vec4 final_color = vec4(rgb, 1.0);
  vec4 final_color = vec4(rgb, 1.0);

  if(distance(vUv, touchPoint) < .1) {
    final_color = vec4(rgb.r - .1 * touchPoint.x, rgb.b - .1 * touchPoint.y, 1.0, 1.0);
  }

  gl_FragColor = final_color;
}
`

function Pic() {
    const meshRef = useRef(null)

    let texture;
    let loader;
    if (typeof window !== 'undefined') {
      texture = useLoader(TextureLoader, '/images/ars.jpg')
      loader = new TextureLoader()
    }

    
    const uniforms = useMemo(
      () => ({
        image: {value: texture},
        time: {value: 0},
        mouse: {value: 0},
        touchPoint: {value: {x:0, y:0}},
      }),
      []
    );

    useFrame((state) => {
      const { clock, mouse, raycaster } = state;
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
      meshRef.current.material.uniforms.mouse.value = mouse;

      const intersects = raycaster.intersectObject(meshRef.current);
      if(intersects.length>0) {
        // console.log('inters-', intersects)
      meshRef.current.material.uniforms.touchPoint.value = intersects[0].uv
      }
    });  

   return (
    <>
        <mesh key={Math.random()} ref={meshRef}>
        <shaderMaterial side={DoubleSide}
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}
          // wireframe={true}
        />
          {/* <meshBasicMaterial color={'red'} side={DoubleSide} map={texture} /> */}
          <planeGeometry args={[3,3, 120, 120]} />
        </mesh>

    </>
  )
}
