import { Html, useHelper } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState, Fragment } from "react"
import {
  DoubleSide,
  PointLightHelper,
  RectAreaLight,
  SpotLightHelper,
  TextureLoader,
} from "three"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"
const imgpaths = {
  colorMap: "/wall/wall.jpg",
  displacementMap: "/wall/DISP.jpg",
  normalMap: "/wall/NORM.jpg",
  specularMap: "/wall/SPECULAR.jpg",
}

export default function Walls() {
  let colorMap, displacementMap, normalMap, specularMap
  if (typeof window !== "undefined") {
    ;[colorMap, displacementMap, normalMap, specularMap] = useLoader(
      TextureLoader,
      [
        imgpaths.colorMap,
        imgpaths.displacementMap,
        imgpaths.normalMap,
        imgpaths.specularMap,
      ]
    )
  }

  const pointLightRef = useRef(null)
  useHelper(pointLightRef, PointLightHelper, 1, "pink")
  const spotLightRef = useRef(null)
  useHelper(spotLightRef, SpotLightHelper, 1, "yellow", 0.2)
  const rectLightRef = useRef(null)
  // useHelper(rectLightRef, RectAreaLightHelper)
  const rectLight2Ref = useRef(null)
  useHelper(rectLight2Ref, RectAreaLightHelper)

  const [intensity, setIntensity] = useState(0.5)

  // setInterval(() => {
  //   setIntensity(Math.abs(1 - Math.random() + 0.5))
  // }, 1500)

  return (
    <Fragment key={Math.random()}>
      {/* <ambientLight intensity={0.1} /> */}

      {/* Candle */}
      <pointLight
        ref={pointLightRef}
        color={"yellow"}
        position={[-2, 3, 4]}
        intensity={2}
        distance={10}
      />
      {/* <spotLight
        ref={spotLightRef}
        position={[1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color={"green"}
        intensity={3.0}
        angle={0.5}
      /> */}

      <rectAreaLight
        ref={rectLightRef}
        position={[-2, 0, 0]}
        color={"blue"}
        intensity={1.5}
      />
      {/* <rectAreaLight
        ref={rectLight2Ref}
        position={[-2, 0, -8]}
        rotation={[0, -Math.PI, 0]}
        color={"pink"}
        intensity={0.7}
      /> */}

      {/* <hemisphereLight groundColor={"purple"} color={"red"} /> */}

      <mesh position={[-2.5, 0, -10]}>
        <planeGeometry args={[16, 10, 1, 100, 100, 100]} />
        <meshPhysicalMaterial
          side={DoubleSide}
          map={colorMap}
          // clearcoatMap={colorMap}
          // reflectivity={0.9}
          // color={"white"}
          // normalMap={normalMap}
          // displacementMap={displacementMap}
          // displacementScale={0.2}
          color={"black"}
        />
        <Html occlude distanceFactor={1.5} position={[0, 0, 1]} transform>
          <div
            style={{
              border: "2px solid red",
              width: "10rem",
              height: "10rem",
              background: "white",
            }}
          >
            Hello
          </div>
        </Html>
      </mesh>
      <mesh position={[5, 0, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[14, 10, 1, 100, 100, 100]} />
        <meshStandardMaterial
          side={DoubleSide}
          // map={colorMap}
          // color={"black"}
          normalMap={normalMap}
          displacementMap={displacementMap}
          displacementScale={0.2}
        />
      </mesh>
      <mesh position={[-2, 0, 5]}>
        <planeGeometry args={[15, 10, 1, 100, 100, 100]} />
        <meshStandardMaterial
          side={DoubleSide}
          // map={colorMap}
          normalMap={normalMap}
          displacementMap={displacementMap}
          displacementScale={0.2}
        />
      </mesh>
      <mesh position={[-10, 0, -2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[15, 10, 1, 100, 100, 100]} />
        <meshStandardMaterial
          side={DoubleSide}
          // map={colorMap}
          // color={"purple"}
          normalMap={normalMap}
          displacementMap={displacementMap}
          displacementScale={0.2}
        />
      </mesh>
    </Fragment>
  )
}
