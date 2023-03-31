import React from 'react'

function Lights() {
  return (
    <>
        <spotLight 
        position={[0, 9, 0]}
        color={'skyblue'}
        intensity={1}
        angle={3}
        penumbra={.5}
        castShadow
        shadow-bias={-0.0001}
        />

        <spotLight 
        color={[1, .25, .7]}
        intensity={1.5}
        angle={.6}
        penumbra={.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        />

        <ambientLight intensity={1} color={'#ffffff'}/>



    </>
    )
}

export default Lights