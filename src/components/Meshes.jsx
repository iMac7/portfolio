import { DoubleSide } from "three"
import { MeshReflectorMaterial } from "@react-three/drei"

function Meshes() {
  return (
    <>
        <mesh position={[3,1,0]} castShadow receiveShadow >
          <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color={'red'}/>
        </mesh>

        <mesh castShadow receiveShadow rotation-x={-Math.PI * .5} position={-.1}>
          <planeGeometry args={[30, 30]} />
          <MeshReflectorMaterial
          //   normalMap={normal}
          side={DoubleSide}
            // roughnessMap={roughness}
            envMapIntensity={0}
            dithering={true}
            color={[.05,.05,.05]}
            roughness={.5}
            blur={[1000, 400]}
            mixBlur={30}
            mixStrength={80}
            mixContrast={1}
            mirror={0}
            depthScale={.01}
            minDepthThreshold={.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={.25}
            reflectorOffset={.2}
            debug={0}
            />
        </mesh>

    </>
  )
}

export default Meshes