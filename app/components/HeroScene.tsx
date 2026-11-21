"use client";

/**
 * Hero WebGL scene — thousands of scattered "bits" assemble into a single,
 * gently breathing sphere: the Vobits story of turning fragmented operations
 * into one connected system. Reacts to pointer + scroll, pauses off-screen.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMediaQuery } from "../lib/useMediaQuery";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uScroll;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vMix;
  varying float vAlpha;

  void main() {
    vec3 dir = normalize(position);
    float t = uTime * 0.35;
    float wave = sin(dir.x * 3.0 + t * 2.0) * cos(dir.y * 3.0 - t * 1.4) * sin(dir.z * 3.0 + t);

    // Sphere "breathes" and blooms outward as the user scrolls away
    vec3 sphere = position * (1.0 + wave * 0.16 + uScroll * 0.7 * aRandom);

    // Staggered assembly from chaos -> order
    float p = smoothstep(0.0, 1.0, clamp(uProgress * 1.4 - aRandom * 0.4, 0.0, 1.0));
    vec3 pos = mix(aScatter, sphere, p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom) * (1.0 / -mv.z);

    vMix = smoothstep(0.05, 0.75, wave * 0.8 + aRandom * 0.35);
    vAlpha = (0.3 + 0.7 * p) * (1.0 - clamp(uScroll * 0.85, 0.0, 0.92));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float a = smoothstep(0.5, 0.05, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha);
  }
`;

/** Small deterministic PRNG so geometry is stable and render stays pure. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Bits({ count, reduced }: { count: number; reduced: boolean }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const viewport = useThree((s) => s.viewport);
  const dpr = useThree((s) => s.viewport.dpr);

  const { positions, scatter, randoms } = useMemo(() => {
    const rand = mulberry32(7);
    const positions = new Float32Array(count * 3);
    const scatter = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const R = 1.7;

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere — even distribution
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const jitter = 1 + (rand() - 0.5) * 0.06;
      positions[i * 3] = Math.cos(theta) * r * R * jitter;
      positions[i * 3 + 1] = y * R * jitter;
      positions[i * 3 + 2] = Math.sin(theta) * r * R * jitter;

      scatter[i * 3] = (rand() - 0.5) * 14;
      scatter[i * 3 + 1] = (rand() - 0.5) * 9;
      scatter[i * 3 + 2] = (rand() - 0.5) * 8 - 1;

      randoms[i] = rand();
    }
    return { positions, scatter, randoms };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: reduced ? 1 : 0 },
      uScroll: { value: 0 },
      uSize: { value: 28 },
      uPixelRatio: { value: 1 },
      uColorA: { value: new THREE.Color("#6f7680") },
      uColorB: { value: new THREE.Color("#c8ff4d") },
    }),
    [reduced]
  );

  useEffect(() => {
    if (material.current) material.current.uniforms.uPixelRatio.value = dpr;
  }, [dpr]);

  useFrame((state, delta) => {
    const m = material.current;
    if (!m || !outer.current || !inner.current) return;
    const u = m.uniforms;
    const dt = Math.min(delta, 0.05);

    if (!reduced) u.uTime.value += dt;
    u.uProgress.value = Math.min(1, u.uProgress.value + dt * 0.42);

    const target = Math.min(window.scrollY / window.innerHeight, 1.5);
    u.uScroll.value += (target - u.uScroll.value) * 0.08;

    if (!reduced) inner.current.rotation.y += dt * 0.07;

    // Subtle pointer parallax
    const g = outer.current;
    g.rotation.x += (state.pointer.y * 0.25 - g.rotation.x) * 0.04;
    g.rotation.z += (-state.pointer.x * 0.12 - g.rotation.z) * 0.04;
  });

  // Desktop: sphere sits to the right of the headline. Mobile: above it.
  const wide = viewport.aspect > 1.05;
  const position: [number, number, number] = wide
    ? [viewport.width * 0.22, 0, 0]
    : [0, viewport.height * 0.16, 0];
  const scale = wide ? Math.min(1.15, viewport.height / 4.6) : Math.min(0.85, viewport.width / 4.4);

  return (
    <group ref={outer} position={position} scale={scale}>
      <points ref={inner}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[scatter, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 768px)");

  // Stop rendering when the hero is scrolled out of view
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, mobile ? 1.5 : 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
      >
        <Bits count={mobile ? 4500 : 9000} reduced={reduced} />
      </Canvas>
    </div>
  );
}
