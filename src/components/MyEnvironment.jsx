import { useLoader } from '@react-three/fiber'
import { BackSide, TextureLoader } from 'three'

export default function Environment() {
  const worldTexture = useLoader(TextureLoader, '/envMaps/room.jpg')
  
  return (
      <mesh>
            <sphereGeometry args={[100]} scale={[-1,1,1]} />
            <meshBasicMaterial map={worldTexture} side={BackSide} />
      </mesh>

    )
}
