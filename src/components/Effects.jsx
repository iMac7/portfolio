import { Circle } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Noise, Vignette, HueSaturation, GodRays, Bloom, UnrealBloomPass, Scanline, Outline, ChromaticAberration, Glitch } from '@react-three/postprocessing'
import { BlendFunction, BlurPass, Resizer, KernelSize, GlitchMode } from 'postprocessing'
import React, { Suspense, forwardRef, useState, useRef, useMemo, useEffect } from 'react'
import { Mesh, Vector2 } from 'three'


export default function Effects() {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setActive(false)
    }, 6000);
  
    return () => clearTimeout(timeOut)
  }, [])
  
  
  

  return (<>
    <Suspense fallback={null}>

      <EffectComposer multisampling={0}>

        <Bloom
          intensity={1.0} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          width={Resizer.AUTO_SIZE} // render width
          height={Resizer.AUTO_SIZE} // render height
          kernelSize={KernelSize.MEDIUM} // blur kernel size
          luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />

        <Glitch
        delay={[.5, 1]} // min and max glitch delay
        duration={[0.1, 0.5]} // min and max glitch duration
        strength={[0.1, .3]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active={active} // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        chromaticAberrationOffset={new Vector2(.5, .5)}
        columns={.1}
        />

        {active && <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.25}
        />}        

      </EffectComposer>

    </Suspense>
    
    </>
  )
}

