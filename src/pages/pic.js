import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Clock, DoubleSide, TextureLoader } from 'three'
import Flag from '@/components/Flag'

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
varying vec2 vUv;

uniform float time;

void main() {
  vUv = uv;

  vec4 modelPosition = vec4(position, 1.0);

  vec4 viewPosition = modelViewMatrix * modelPosition;
  
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`

const frag = `
uniform bool isTouched;
uniform sampler2D image;
uniform float time;

varying vec2 vUv;

void main() {

  vec4 img_color = texture2D(image, vUv);

  vec4 final_color = vec4(sin(time), img_color.g, img_color.b, 1.0);

  if (isTouched) {
    gl_FragColor = final_color;
  } else {
    gl_FragColor = vec4(0.5, 0, 0.5, 1.0);
  }
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

    const [isTouched, setIsTouched] = useState(false);
    
    const uniforms = useMemo(
      () => ({
        isTouched: {value: isTouched},
        image: {value: texture},
        time: {value: 0},
      }),
      [isTouched, texture]
    );

    useFrame((state) => {
      const { clock } = state;
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
    });  

    const handleClick = () => {
      console.log('clicked')
      setIsTouched(!isTouched);
    };

   return (
    <>
        {/* {console.log('rand-', Math.random())} */}
        <mesh onClick={handleClick} key={Math.random()} ref={meshRef}>
        <shaderMaterial side={DoubleSide}
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}

        />
          {/* <meshBasicMaterial color={'red'} side={DoubleSide} map={texture} /> */}
          <planeGeometry args={[3,3]}  />
        </mesh>

        {/* <Flag /> */}


    </>
  )
}
