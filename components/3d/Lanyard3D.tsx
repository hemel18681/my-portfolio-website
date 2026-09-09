'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from '@react-three/rapier'
import * as THREE from 'three'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

// TypeScript declaration for custom Three.js elements
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: unknown
      meshLineMaterial: unknown
    }
  }
}

const CARD_GLB = '/assets/3d/card.glb'
const LANYARD_TEXTURE = '/assets/images/custom_lanyard.png'
const CARD_TEXTURE = '/assets/images/custom_card_texture.png'

useGLTF.preload(CARD_GLB)

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef<THREE.Mesh>(null!)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!)
  const j2 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)

  const vec = useRef(new THREE.Vector3())
  const ang = useRef(new THREE.Vector3())
  const rot = useRef(new THREE.Vector3())
  const dir = useRef(new THREE.Vector3())

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF(CARD_GLB) as any
  const texture = useTexture(LANYARD_TEXTURE)
  const cardTexture = useTexture(CARD_TEXTURE)
  cardTexture.flipY = false
  cardTexture.wrapS = cardTexture.wrapT = THREE.RepeatWrapping
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0.5, 3.5, 0),
        new THREE.Vector3(1, 3, 0),
        new THREE.Vector3(1.5, 2.5, 0),
      ])
  )
  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false)
  const [hovered, setHovered] = useState(false)
  const [isSmall, setIsSmall] = useState(false)

  // Physics joints linking the lanyard strap
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]])

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (band.current?.geometry) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geo = band.current.geometry as any
      if (geo.setPoints) {
        geo.setPoints(curve.getPoints(32))
      }
      band.current.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100)
    }
  }, [curve])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.current.copy(vec.current).sub(state.camera.position).normalize()
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z,
      })
    }

    if (fixed.current && card.current && j1.current && j2.current && j3.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        const currentTrans = ref.current?.translation()
        if (
          currentTrans &&
          Number.isFinite(currentTrans.x) &&
          Number.isFinite(currentTrans.y) &&
          Number.isFinite(currentTrans.z)
        ) {
          if (!ref.current.lerped) {
            ref.current.lerped = new THREE.Vector3(currentTrans.x, currentTrans.y, currentTrans.z)
          }
          const target = new THREE.Vector3(currentTrans.x, currentTrans.y, currentTrans.z)
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(target)))
          ref.current.lerped.lerp(
            target,
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          )
        }
      })

      const j3Pos = j3.current?.translation()
      const fixedPos = fixed.current?.translation()
      const l1 = j1.current?.lerped
      const l2 = j2.current?.lerped

      if (
        j3Pos &&
        Number.isFinite(j3Pos.x) &&
        Number.isFinite(j3Pos.y) &&
        Number.isFinite(j3Pos.z) &&
        fixedPos &&
        Number.isFinite(fixedPos.x) &&
        Number.isFinite(fixedPos.y) &&
        Number.isFinite(fixedPos.z) &&
        l1 &&
        Number.isFinite(l1.x) &&
        Number.isFinite(l1.y) &&
        Number.isFinite(l1.z) &&
        l2 &&
        Number.isFinite(l2.x) &&
        Number.isFinite(l2.y) &&
        Number.isFinite(l2.z)
      ) {
        curve.points[0].set(j3Pos.x, j3Pos.y, j3Pos.z)
        curve.points[1].copy(l2)
        curve.points[2].copy(l1)
        curve.points[3].set(fixedPos.x, fixedPos.y, fixedPos.z)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const geo = band.current.geometry as any
        if (geo?.setPoints) {
          const pts = curve.getPoints(32)
          const allFinite = pts.every(
            (p) => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)
          )
          if (allFinite) {
            geo.setPoints(pts)
            band.current.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100)
          }
        }
      }

      const cardAngVel = card.current.angvel()
      const cardRot = card.current.rotation()
      ang.current.set(cardAngVel.x, cardAngVel.y, cardAngVel.z)
      rot.current.set(cardRot.x, cardRot.y, cardRot.z)
      card.current.setAngvel(
        {
          x: ang.current.x,
          y: ang.current.y - rot.current.y * 0.25,
          z: ang.current.z,
        },
        true
      )
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(e.target as any).releasePointerCapture?.(e.pointerId)
              setDragged(false)
            }}
            onPointerDown={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(e.target as any).setPointerCapture?.(e.pointerId)
              const t = card.current.translation()
              setDragged(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.current.set(t.x, t.y, t.z))
              )
            }}
          >
            {nodes?.card && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardTexture}
                  map-anisotropy={16}
                  clearcoat={0.9}
                  clearcoatRoughness={0.2}
                  roughness={0.7}
                  metalness={0.3}
                />
              </mesh>
            )}
            {nodes?.clip && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal}
                material-roughness={0.3}
              />
            )}
            {nodes?.clamp && (
              <mesh geometry={nodes.clamp.geometry} material={materials?.metal} />
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band} frustumCulled={false}>
        {/* @ts-expect-error Custom meshline geometry */}
        <meshLineGeometry />
        {/* @ts-expect-error Custom meshline material */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

interface Lanyard3DProps {
  className?: string
}

export default function Lanyard3D({ className = '' }: Lanyard3DProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="p-6 rounded-2xl glass border border-white/10 text-center text-zinc-400 font-mono text-xs">
          3D Physics Simulation Ready
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-[450px] relative select-none ${className}`}>
      <Canvas
        camera={{ position: [0, -0.9, 13.5], fov: 24 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}
