import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Atom as AtomIcon, Play, Pause, ArrowsClockwise, Plus, Minus } from '@phosphor-icons/react'

interface Atom {
  element: string
  position: [number, number, number]
  color: string
  radius: number
}

interface Bond {
  from: number
  to: number
  order: number
}

const DNA_MOLECULE: { atoms: Atom[]; bonds: Bond[] } = {
  atoms: [
    { element: 'C', position: [0, 0, 0], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [1.5, 0.5, 0.3], color: '#E94B3C', radius: 0.65 },
    { element: 'O', position: [-1.2, 0.8, -0.5], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [0.5, -1.5, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [2.5, 0, -0.5], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [1, 2, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'O', position: [-0.5, 1.8, 1], color: '#50C878', radius: 0.6 },
    { element: 'P', position: [0, -2.5, -0.3], color: '#FFA500', radius: 0.75 },
    { element: 'C', position: [3, 1.5, 0.5], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [-1.5, -0.5, 1.2], color: '#E94B3C', radius: 0.65 },
    { element: 'O', position: [2, -1, 1.5], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [-2, 0, -1], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [1.2, 2.8, -0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [3.5, -0.5, -1], color: '#E94B3C', radius: 0.65 },
    { element: 'O', position: [-1, -2, -1.5], color: '#50C878', radius: 0.6 },
  ],
  bonds: [
    { from: 0, to: 1, order: 1 },
    { from: 0, to: 2, order: 2 },
    { from: 0, to: 3, order: 1 },
    { from: 1, to: 4, order: 1 },
    { from: 1, to: 5, order: 1 },
    { from: 2, to: 6, order: 1 },
    { from: 3, to: 7, order: 1 },
    { from: 4, to: 8, order: 2 },
    { from: 3, to: 9, order: 1 },
    { from: 4, to: 13, order: 1 },
    { from: 7, to: 14, order: 1 },
    { from: 2, to: 11, order: 1 },
    { from: 5, to: 12, order: 2 },
    { from: 9, to: 10, order: 1 },
  ],
}

export function MoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const moleculeGroupRef = useRef<THREE.Group | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const [isRotating, setIsRotating] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.005)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e1a)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 8
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0x4A90E2, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    const pointLight = new THREE.PointLight(0x50C878, 0.6, 100)
    pointLight.position.set(0, 0, 10)
    scene.add(pointLight)

    const moleculeGroup = new THREE.Group()
    moleculeGroupRef.current = moleculeGroup
    scene.add(moleculeGroup)

    const atomMeshes: THREE.Mesh[] = []
    DNA_MOLECULE.atoms.forEach((atom) => {
      const geometry = new THREE.SphereGeometry(atom.radius, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: atom.color,
        shininess: 100,
        specular: 0x444444,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(...atom.position)
      moleculeGroup.add(sphere)
      atomMeshes.push(sphere)

      const glowGeometry = new THREE.SphereGeometry(atom.radius * 1.3, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: atom.color,
        transparent: true,
        opacity: 0.15,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.set(...atom.position)
      moleculeGroup.add(glow)
    })

    DNA_MOLECULE.bonds.forEach((bond) => {
      const from = DNA_MOLECULE.atoms[bond.from]
      const to = DNA_MOLECULE.atoms[bond.to]
      
      const start = new THREE.Vector3(...from.position)
      const end = new THREE.Vector3(...to.position)
      const direction = new THREE.Vector3().subVectors(end, start)
      const length = direction.length()
      
      const bondGeometry = new THREE.CylinderGeometry(0.08 * bond.order, 0.08 * bond.order, length, 8)
      const bondMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 50,
      })
      const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial)
      
      bondMesh.position.copy(start).add(direction.multiplyScalar(0.5))
      bondMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      )
      
      moleculeGroup.add(bondMesh)
    })

    const particleCount = 100
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4A90E2,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
      targetRotationX = mouseY * 0.3
      targetRotationY = mouseX * 0.3
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (isRotating && moleculeGroupRef.current) {
        moleculeGroupRef.current.rotation.y += rotationSpeed
        moleculeGroupRef.current.rotation.x += rotationSpeed * 0.5
      }

      if (moleculeGroupRef.current && !isRotating) {
        moleculeGroupRef.current.rotation.x += (targetRotationX - moleculeGroupRef.current.rotation.x) * 0.05
        moleculeGroupRef.current.rotation.y += (targetRotationY - moleculeGroupRef.current.rotation.y) * 0.05
      }

      atomMeshes.forEach((mesh, index) => {
        const time = Date.now() * 0.001
        mesh.position.y += Math.sin(time + index) * 0.002
      })

      particles.rotation.y += 0.0002

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      renderer.dispose()
    }
  }, [isRotating, rotationSpeed])

  const handleReset = () => {
    if (moleculeGroupRef.current) {
      moleculeGroupRef.current.rotation.set(0, 0, 0)
    }
  }

  const handleSpeedUp = () => {
    setRotationSpeed((prev) => Math.min(prev + 0.002, 0.02))
  }

  const handleSlowDown = () => {
    setRotationSpeed((prev) => Math.max(prev - 0.002, 0.001))
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden" />
      
      <div className="absolute top-4 left-4 space-y-2">
        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
          <AtomIcon className="mr-2" weight="fill" />
          DNA Fragment Visualization
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleSlowDown}
          className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
        >
          <Minus weight="bold" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsRotating(!isRotating)}
          className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
        >
          {isRotating ? <Pause weight="fill" /> : <Play weight="fill" />}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleSpeedUp}
          className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
        >
          <Plus weight="bold" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleReset}
          className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
        >
          <ArrowsClockwise weight="bold" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 space-y-1">
        <div className="backdrop-blur-sm bg-background/80 rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4A90E2' }} />
            <span>Carbon (C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E94B3C' }} />
            <span>Nitrogen (N)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#50C878' }} />
            <span>Oxygen (O)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFA500' }} />
            <span>Phosphorus (P)</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 backdrop-blur-sm bg-background/80 rounded-lg p-3 text-xs max-w-xs">
        <p className="text-muted-foreground">
          <strong>Hover to interact:</strong> Move your mouse to manually rotate the molecule. 
          Experience MX Ink precision at the molecular level.
        </p>
      </div>
    </div>
  )
}
