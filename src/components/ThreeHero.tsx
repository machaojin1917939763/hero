'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture, Text, Float, Stars, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// 增强版粒子系统组件
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const particleCount = 3000;
  
  // 创建粒子几何体
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(particleCount * 3);
  const colorArray = new Float32Array(particleCount * 3);
  const sizeArray = new Float32Array(particleCount);
  
  // 随机分布粒子在3D空间中并设置颜色和大小
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // 位置
    posArray[i3] = (Math.random() - 0.5) * 12;
    posArray[i3 + 1] = (Math.random() - 0.5) * 12;
    posArray[i3 + 2] = (Math.random() - 0.5) * 12;
    
    // 颜色 - 蓝紫色调
    colorArray[i3] = 0.3 + Math.random() * 0.3; // R
    colorArray[i3 + 1] = 0.3 + Math.random() * 0.3; // G
    colorArray[i3 + 2] = 0.5 + Math.random() * 0.5; // B
    
    // 大小变化
    sizeArray[i] = Math.random() * 0.03 + 0.01;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
  
  // 自定义着色器材质
  const particlesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mousePosition: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      varying vec3 vColor;
      uniform float time;
      uniform vec2 mousePosition;
      
      void main() {
        vColor = color;
        vec3 pos = position;
        
        // 添加一些波动效果
        pos.x += sin(pos.y * 0.5 + time) * 0.1;
        pos.y += cos(pos.x * 0.5 + time) * 0.1;
        
        // 鼠标交互效果
        float dist = distance(vec2(pos.x, pos.y), mousePosition);
        if(dist < 2.0) {
          pos.z += (2.0 - dist) * 0.2;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // 创建圆形粒子
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        // 添加发光效果
        float intensity = 1.0 - dist * 2.0;
        gl_FragColor = vec4(vColor, intensity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // 将鼠标坐标转换为归一化设备坐标 (-1 到 1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // 动画效果
  useFrame(({ clock, mouse }) => {
    if (particlesRef.current) {
      // 旋转效果
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      
      // 更新着色器uniforms
      (particlesRef.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
      (particlesRef.current.material as THREE.ShaderMaterial).uniforms.mousePosition.value = new THREE.Vector2(mouseRef.current.x * 5, mouseRef.current.y * 5);
    }
  });
  
  return (
    <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
  );
}

// 增强版3D文本组件
function FloatingName() {
  const [hovered, setHovered] = useState(false);
  
  // 使用react-spring添加悬停动画
  const { scale, color } = useSpring({
    scale: hovered ? 1.2 : 1,
    color: hovered ? '#00ffff' : '#ffffff',
    config: { mass: 2, tension: 300, friction: 30 }
  });
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={[0, 0, 0]}
    >
      <animated.group scale={scale}>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={0.5}
          color={color}
          anchorX="center"
          anchorY="middle"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          马超金
        </Text>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={0.15}
          color="#aaaaff"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.7, 0]}
        >
          点击探索我的作品集
        </Text>
      </animated.group>
    </Float>
  );
}

// 主场景组件
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  return (
    <>
      {/* 环境光照 */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <spotLight position={[-10, 5, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#0088ff" />
      
      {/* 背景星空 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 主要内容 */}
      <ParticleSystem />
      <FloatingName />
      
      {/* 环境效果 */}
      <Environment preset="night" />
    </>
  );
}

// 主组件
export default function ThreeHero() {
  return (
    <div className="w-full h-[80vh] relative">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black z-0"></div>
      
      {/* 3D场景 */}
      <Canvas dpr={[1, 2]} className="z-10" camera={{ fov: 75, near: 0.1, far: 1000 }}>
        <Scene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-opacity-70 flex flex-col items-center animate-bounce">
        <span className="text-sm mb-2">向下滚动</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}