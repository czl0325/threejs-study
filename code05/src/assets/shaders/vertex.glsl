precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    modelPosition.z = sin((modelPosition.x + uTime) * 4.0) * sin((modelPosition.y + uTime) * 4.0) * 0.05;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
