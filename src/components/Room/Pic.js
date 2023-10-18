import { useMemo, useRef } from "react"
import { fbm } from "../../../public/shaders"
import { DoubleSide, TextureLoader } from "three"
import { useFrame, useLoader } from "@react-three/fiber"

const vert = `
${fbm}

varying vec2 vUv;
varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_wind;

uniform float time;
uniform vec2 mouse;
uniform vec2 touchPoint;
uniform float touchStrength;

void main() {
  vUv = uv;

  vec3 finalPosition = position;

  vec3 wind = vec3(
    fbm(.1 * position + .1 * time),
    fbm(.2 * position + .2 * time),
    fbm(.1 * position + .1 * time)
  );

  float wave = mix(-2.0, 2.0, fbm(.1 * position + wind));

  vec2 peg1 = vec2(0.0, 1.0);
  vec2 peg2 = vec2(1.0,1.0);

  float tension = distance(uv, peg1) * distance(uv, peg2);
  
  float gravity = -0.2 * sin(uv.x);

  finalPosition.y += gravity;
  finalPosition.z +=  tension * wave;


  //touch depression
  float mouseDistance = distance(touchPoint, uv);
  float mouseScore = smoothstep(.2, 0.0, mouseDistance);
  finalPosition.z += mix(0.0, -1.0 * touchStrength, tension * mouseScore);

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
  // vec4 final_color = vec4(rgb.r - .2 * v_wind.r, rgb.g- .2 * v_wind.g, rgb.b- .2 * v_wind.b, 1.0);
  // vec4 final_color = vec4(v_wind, 1.0);

  // if(distance(vUv, touchPoint) < .1) {
  //   final_color = vec4(rgb.r - .1 * touchPoint.x, rgb.b - .1 * touchPoint.y, 1.0, 1.0);
  // }

  gl_FragColor = vec4(img_color.rgb, 1.0);
}
`

export default function Pic() {
  const meshRef = useRef(null)

  let texture
  let loader
  if (typeof window !== "undefined") {
    texture = useLoader(TextureLoader, "/images/ars.jpg")
    loader = new TextureLoader()
  }

  const uniforms = useMemo(
    () => ({
      image: { value: texture },
      time: { value: 0 },
      mouse: { value: 0 },
      touchPoint: { value: { x: 0, y: 0 } },
      touchStrength: { value: 0 },
      touchStrengthAim: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    const { clock, mouse, raycaster } = state
    const uniforms = meshRef.current.material.uniforms
    uniforms.time.value = clock.getElapsedTime()
    uniforms.mouse.value = mouse

    const intersects = raycaster.intersectObject(meshRef.current)
    if (intersects.length > 0) {
      uniforms.touchPoint.value = intersects[0].uv
      uniforms.touchStrengthAim.value = 1
    } else {
      uniforms.touchStrengthAim.value = 0
    }
    //fades out the touch depression
    const diffStrength =
      (uniforms.touchStrengthAim.value - uniforms.touchStrength.value) * 0.025
    uniforms.touchStrength.value = uniforms.touchStrength.value + diffStrength
  })

  return (
    <>
      <mesh position={[-2.5, 0.5, 4]} key={Math.random()} ref={meshRef}>
        <shaderMaterial
          side={DoubleSide}
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}
          //   wireframe={true}
        />
        <planeGeometry args={[6, 8, 120, 120]} />
      </mesh>
    </>
  )
}
