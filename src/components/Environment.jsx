import { useLoader } from '@react-three/fiber'
import { BackSide, TextureLoader } from 'three'

export default function Environment({url}) {
  const worldTexture = useLoader(TextureLoader, url)
  
  return (
      <mesh rotation={[0,Math.PI*.9,0]}>
        <sphereGeometry args={[200]} scale={[-1,1,1]} />
        <meshBasicMaterial map={worldTexture} side={BackSide} color={'lightblue'} />
      </mesh>

    )
}
