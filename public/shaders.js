export const vertexShader = `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;
//varying sends variable to fragment
varying vec2 vUv;
varying float vElevation;

void main(){
vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//separated the math below to access the total height coordinates
//note: sin ranges from -1 to +1
float elevation = sin(modelPosition.x*uFrequency.x + uTime)*.25;
elevation += sin(modelPosition.y*uFrequency.y)*.2;
modelPosition.z += elevation;

vec4 viewPosition = viewMatrix * modelPosition;

vec4 projectedPosition = projectionMatrix * viewPosition;


gl_Position = projectedPosition;

//send to fragment
vUv = uv;
vElevation = elevation;
}
`

export const fragmentShader = `
precision mediump float;

  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vElevation;


  void main(){
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 1.5 + 1.5;
    gl_FragColor = textureColor;
  }
`