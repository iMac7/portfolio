import { useLoader } from "@react-three/fiber"
import React from "react"
import { DoubleSide, TextureLoader } from "three"

export default function Floor() {
  const imgpaths = {
    colorMap: "/floor/Base.jpg",
    displacementMap: "/floor/Height.jpg",
    normalMap: "/floor/Normal.jpg",
    aoMap: "/floor/ao.jpg",
    roughnessMap: "/floor/Roughness.jpg",
  }

  let colorMap, displacementMap, normalMap, aoMap, roughnessMap
  if (typeof window !== "undefined") {
    ;[colorMap, displacementMap, normalMap, aoMap, roughnessMap] = useLoader(
      TextureLoader,
      [
        imgpaths.colorMap,
        imgpaths.displacementMap,
        imgpaths.normalMap,
        imgpaths.aoMap,
        imgpaths.roughnessMap,
      ]
    )
  }
  return (
    <>
      <mesh position={[-2, -5, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshPhysicalMaterial
          side={DoubleSide}
          map={colorMap}
          normalMap={normalMap}
          displacementMap={displacementMap}
          aoMap={aoMap}
          roughnessMap={roughnessMap}
        />
      </mesh>
    </>
  )
}
