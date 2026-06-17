import React, { useEffect, useRef } from 'react';

function ShaderCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main() {
  vec2 uv = v_texCoord;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;
  vec3 forest = vec3(0.137, 0.294, 0.263);
  vec3 sage = vec3(0.498, 0.608, 0.541);
  vec3 ivory = vec3(0.969, 0.965, 0.949);
  float n = snoise(p * 0.8 + u_time * 0.05);
  n += 0.5 * snoise(p * 1.5 - u_time * 0.08);
  float mask = smoothstep(-0.5, 1.5, n + p.y * 0.5);
  vec3 color = mix(forest, sage, mask);
  color = mix(color, ivory, pow(mask, 4.0) * 0.2);
  color += 0.02 * sin(u_time * 0.2);
  gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
        mouse.y = (1.0 - (event.clientY - rect.top) / rect.height) * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
  );
}

function ThreeJSOverlay() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.THREE) return;
    const THREE = window.THREE;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const cellGroup = new THREE.Group();
    scene.add(cellGroup);

    const cellCount = 12;
    const cells = [];
    const geometry = new THREE.IcosahedronGeometry(0.4, 2);

    for (let i = 0; i < cellCount; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xB79D5B,
        transparent: true,
        opacity: 0.6,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );
      mesh.position.copy(pos);
      mesh.userData.originalPos = pos.clone();
      mesh.userData.speed = 0.5 + Math.random();
      cellGroup.add(mesh);
      cells.push(mesh);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7F9B8A, transparent: true, opacity: 0.3 });
    const lineGeometry = new THREE.BufferGeometry();
    const initialPoints = [];
    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        if (cells[i].position.distanceTo(cells[j].position) < 3.0) {
          initialPoints.push(cells[i].position, cells[j].position);
        }
      }
    }
    lineGeometry.setFromPoints(initialPoints);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    cellGroup.add(lines);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let animId;
    function animate() {
      const time = performance.now() * 0.001;
      cells.forEach((cell) => {
        cell.position.y = cell.userData.originalPos.y + Math.sin(time * cell.userData.speed) * 0.2;
        cell.position.x = cell.userData.originalPos.x + Math.cos(time * cell.userData.speed * 0.8) * 0.1;
        cell.rotation.x += 0.01;
        cell.rotation.y += 0.01;
      });
      const newPoints = [];
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          if (cells[i].position.distanceTo(cells[j].position) < 3.0) {
            newPoints.push(cells[i].position, cells[j].position);
          }
        }
      }
      lines.geometry.setFromPoints(newPoints);
      lines.geometry.attributes.position.needsUpdate = true;
      cellGroup.rotation.y = Math.sin(time * 0.1) * 0.2;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

// Subtle small bubbles drifting upward
const bubbles = [
  { l: 8, s: 10, dur: 17, delay: 0, sway: 14, o: 0.30 },
  { l: 18, s: 6, dur: 21, delay: -6, sway: -10, o: 0.22 },
  { l: 27, s: 14, dur: 15, delay: -3, sway: 12, o: 0.28 },
  { l: 36, s: 7, dur: 23, delay: -10, sway: -16, o: 0.20 },
  { l: 45, s: 11, dur: 19, delay: -14, sway: 10, o: 0.26 },
  { l: 54, s: 8, dur: 16, delay: -2, sway: -12, o: 0.24 },
  { l: 63, s: 13, dur: 24, delay: -9, sway: 16, o: 0.26 },
  { l: 71, s: 6, dur: 18, delay: -5, sway: -8, o: 0.20 },
  { l: 79, s: 12, dur: 22, delay: -13, sway: 12, o: 0.28 },
  { l: 88, s: 8, dur: 20, delay: -7, sway: -14, o: 0.22 },
  { l: 94, s: 9, dur: 26, delay: -16, sway: 10, o: 0.24 },
];

function HeroBubbles() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none', overflow: 'hidden' }}>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.l}%`, width: `${b.s}px`, height: `${b.s}px`,
            animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`,
            '--sway': `${b.sway}px`, '--o': b.o,
          }}
        />
      ))}
      <style>{`
        .bubble {
          position: absolute; bottom: -24px; border-radius: 50%;
          background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.55), rgba(165,207,196,0.16));
          border: 1px solid rgba(74,100,85,0.16);
          opacity: 0;
          animation-name: bubble-rise; animation-timing-function: ease-in-out; animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes bubble-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: var(--o); }
          50%  { transform: translateY(-52vh) translateX(var(--sway)); }
          90%  { opacity: var(--o); }
          100% { transform: translateY(-105vh) translateX(0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .bubble { animation: none !important; opacity: 0; } }
      `}</style>
    </div>
  );
}

export default function Hero() {
  return (
    <header style={{
      position: 'relative', height: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '80px',
    }}>
      {/* Shader background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <ShaderCanvas />
      </div>

      {/* Aurora glow (top-left only) */}
      <div className="aurora" style={{ width: '420px', height: '420px', background: 'var(--color-primary-fixed)', top: '-80px', left: '-60px' }} />

      {/* Subtle rising bubbles */}
      <HeroBubbles />

      {/* Three.js overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <ThreeJSOverlay />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 20, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="enter enter-1 font-label-md" style={{
          display: 'inline-block', padding: '6px 24px', borderRadius: '9999px',
          background: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)',
          marginBottom: '24px', border: '1px solid rgba(74,100,85,0.18)',
        }}>
          ✦ Fermentation-Derived Bioactive Ingredients
        </div>

        <h1 className="enter enter-2 font-display-lg" style={{
          maxWidth: '960px', margin: '0 auto 24px',
        }}>
          Ingredients that don't just meet specifications —{' '}
          <span className="text-gradient">they anchor them</span>
        </h1>

        <p className="enter enter-3 font-body-lg" style={{
          color: 'var(--color-on-surface-variant)', maxWidth: '720px', margin: '0 auto 48px',
        }}>
          Through advanced fermentation of safe medicinal fungi and beneficial bacteria, we produce high-bioavailability bioactives that give formulators a verifiable edge — in efficacy, consistency, and regulatory confidence.
        </p>

        <div className="enter enter-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          <button className="btn-modern" style={{
            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
            padding: '24px 80px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600,
            letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 25px -8px rgba(8,52,45,0.4)',
          }}>
            Explore Our Ingredients
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>

          <button className="btn-modern" style={{
            background: 'rgba(255,255,255,0.45)', color: 'var(--color-secondary)',
            padding: '24px 80px', borderRadius: '8px',
            border: '1px solid var(--color-secondary)', cursor: 'pointer',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em',
          }}>
            Partner With Us
          </button>
        </div>

        {/* Trust badges */}
        <div className="enter enter-6" style={{
          marginTop: '56px', display: 'flex', flexWrap: 'wrap', gap: '14px 28px', justifyContent: 'center',
        }}>
          {['GRAS-Recognised', 'GMP Certified', 'Full CoA', 'FSSAI-Aligned'].map(label => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: 'var(--color-on-surface-variant)',
              fontFamily: 'Manrope, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>
                verified
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="enter enter-5 scroll-cue" style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        color: 'var(--color-on-surface-variant)', pointerEvents: 'none',
      }}>
        <span className="font-caption" style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </header>
  );
}
