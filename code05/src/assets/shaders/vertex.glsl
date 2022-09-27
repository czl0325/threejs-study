precision mediump float;

//uniform float uTime;
//varying vec2 uVu;

//uniform vec4 projectionMatrix;
//uniform vec4 viewMatrix;
//uniform vec4 modelMatrix;
//uniform vec3 position;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
}
