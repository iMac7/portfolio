import { PerspectiveCamera } from "@react-three/drei"

function Cameras() {
  return (
    <PerspectiveCamera makeDefault fov={50} position={[10,10,-100]} />
    )
}

export default Cameras