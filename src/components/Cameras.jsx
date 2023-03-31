import { PerspectiveCamera } from "@react-three/drei"

function Cameras() {
  return (
    <PerspectiveCamera makeDefault fov={50} position={[0,0,20]} />
    )
}

export default Cameras