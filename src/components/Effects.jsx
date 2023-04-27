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
          intensity={1.0}
          blurPass={undefined}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
          kernelSize={KernelSize.MEDIUM}
          luminanceThreshold={1}
          luminanceSmoothing={0.025}
        />

        <Glitch
        delay={[.5, 1]}
        duration={[0.1, 0.5]}
        strength={[0.1, .3]}
        mode={GlitchMode.SPORADIC}
        active={active}
        ratio={0.85}
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

