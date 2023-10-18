import { Suspense, useRef } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars, useHelper } from "@react-three/drei"
import Loader from "@/components/Loader/Loader"
import { TextureLoader } from "three"
import Walls from "@/components/Room/Walls"
import Floor from "@/components/Room/Floor"
import Pic from "@/components/Room/Pic"

export default function Intro() {
  return (
    <>
      <Suspense>
        <Canvas
          shadows
          style={{ background: "black", height: "100vh" }}
          // frameloop='demand'
        >
          <OrbitControls />
          <axesHelper args={[3]} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={5}
            saturation={0}
            fade
            speed={2}
          />
          <group>
            <Walls />
            <Floor />
            {/* <Pic /> */}
          </group>
        </Canvas>
      </Suspense>
    </>
  )
}
