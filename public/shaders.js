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

//fractionsl brownian motion
export const fbm = `
#define NUM_OCTAVES 5

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}
`