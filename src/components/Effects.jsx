import { Scanline } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { EffectComposer } from "@react-three/postprocessing"

export default function Effects() {
  return (
    <EffectComposer>

        <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.25}
        />
        
    </EffectComposer>
  )
}
 