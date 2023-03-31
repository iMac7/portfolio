import { Environment } from '@react-three/drei'
import React from 'react'

export default function MyEnvironment() {
  return (
    <Environment files={'/envMaps/night.hdr'} background blur={0} />
    )
}
