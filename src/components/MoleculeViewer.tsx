import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Atom as AtomIcon, Play, Pause, ArrowsClockwise, Plus, Minus, Drop, Dna, Pill, Lightning } from '@phosphor-icons/react'

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

interface Molecule {
  name: string
  description: string
  icon: React.ElementType
  atoms: Atom[]
  bonds: Bond[]
  scale: number
}

const DNA_MOLECULE: Molecule = {
  name: 'DNA Fragment',
  description: 'Double helix structure showing base pairs and phosphate backbone',
  icon: Dna,
  scale: 1,
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

const HEMOGLOBIN_PROTEIN: Molecule = {
  name: 'Hemoglobin',
  description: 'Oxygen-carrying protein with iron-containing heme groups',
  icon: Drop,
  scale: 0.7,
  atoms: [
    { element: 'Fe', position: [0, 0, 0], color: '#B87333', radius: 0.8 },
    { element: 'N', position: [1.2, 0, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [0, 1.2, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [-1.2, 0, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [0, -1.2, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [1.8, 0.6, 0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [0.6, 1.8, 0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-1.8, 0.6, 0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.6, -1.8, 0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [2.4, 1.2, -0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [1.2, 2.4, -0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-2.4, 1.2, -0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-1.2, -2.4, -0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [0, 0, 1.5], color: '#E74C3C', radius: 0.65 },
    { element: 'C', position: [2.8, 0.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [0.8, 2.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-2.8, 0.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.8, -2.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [3.2, 1.5, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [1.5, 3.2, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [3.8, 2.0, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [2.0, 3.8, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'S', position: [3.5, 0.2, 1.5], color: '#FFD700', radius: 0.75 },
    { element: 'S', position: [0.2, 3.5, 1.5], color: '#FFD700', radius: 0.75 },
    { element: 'O', position: [4.2, 2.5, 0.2], color: '#50C878', radius: 0.6 },
    { element: 'O', position: [2.5, 4.2, 0.2], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [-3.5, -0.5, 0.5], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.5, -3.5, 0.5], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [-4.0, -1.2, -0.2], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [-1.2, -4.0, -0.2], color: '#E94B3C', radius: 0.65 },
  ],
  bonds: [
    { from: 0, to: 1, order: 1 },
    { from: 0, to: 2, order: 1 },
    { from: 0, to: 3, order: 1 },
    { from: 0, to: 4, order: 1 },
    { from: 0, to: 13, order: 1 },
    { from: 1, to: 5, order: 2 },
    { from: 2, to: 6, order: 2 },
    { from: 3, to: 7, order: 2 },
    { from: 4, to: 8, order: 2 },
    { from: 5, to: 9, order: 1 },
    { from: 6, to: 10, order: 1 },
    { from: 7, to: 11, order: 1 },
    { from: 8, to: 12, order: 1 },
    { from: 5, to: 14, order: 1 },
    { from: 6, to: 15, order: 1 },
    { from: 7, to: 16, order: 1 },
    { from: 8, to: 17, order: 1 },
    { from: 9, to: 18, order: 1 },
    { from: 10, to: 19, order: 1 },
    { from: 14, to: 22, order: 1 },
    { from: 15, to: 23, order: 1 },
    { from: 9, to: 20, order: 2 },
    { from: 10, to: 21, order: 2 },
    { from: 20, to: 24, order: 1 },
    { from: 21, to: 25, order: 1 },
    { from: 7, to: 26, order: 1 },
    { from: 8, to: 27, order: 1 },
    { from: 26, to: 28, order: 1 },
    { from: 27, to: 29, order: 1 },
  ],
}

const INSULIN_HORMONE: Molecule = {
  name: 'Insulin',
  description: 'Peptide hormone regulating glucose metabolism',
  icon: Pill,
  scale: 0.85,
  atoms: [
    { element: 'C', position: [0, 0, 0], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [1.4, 0.3, 0.2], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [2.6, 0.8, -0.4], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [3.2, 0.2, -1.2], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [0.8, -1.2, 0.6], color: '#4A90E2', radius: 0.7 },
    { element: 'S', position: [0.2, -2.5, 0.2], color: '#FFD700', radius: 0.75 },
    { element: 'S', position: [1.8, -1.8, 1.5], color: '#FFD700', radius: 0.75 },
    { element: 'C', position: [2.8, -2.8, 1.2], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [3.5, -3.2, 0.2], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [-1.2, 0.6, 0.4], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-2.3, 0.2, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [-3.5, 0.8, -0.2], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [3.2, 2.1, 0.1], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [4.3, 2.4, -0.3], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [2.5, 3.0, 1.0], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.8, -3.5, -0.5], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [-1.5, -4.5, 0.1], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [1.2, 3.8, 1.5], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [0.8, 4.8, 0.9], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [-4.5, 0.5, -1.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-5.6, 1.3, -1.0], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [4.5, -4.2, -0.3], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [5.2, -3.8, -1.4], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [4.8, -3.0, -2.2], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [-2.6, -5.2, -0.4], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [0.5, 3.5, 2.8], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [-0.6, 4.2, 3.2], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [6.5, -4.4, -1.6], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [7.2, -5.1, -0.8], color: '#50C878', radius: 0.6 },
  ],
  bonds: [
    { from: 0, to: 1, order: 1 },
    { from: 1, to: 2, order: 1 },
    { from: 2, to: 3, order: 2 },
    { from: 0, to: 4, order: 1 },
    { from: 4, to: 5, order: 1 },
    { from: 4, to: 6, order: 1 },
    { from: 6, to: 7, order: 1 },
    { from: 7, to: 8, order: 1 },
    { from: 0, to: 9, order: 1 },
    { from: 9, to: 10, order: 1 },
    { from: 10, to: 11, order: 1 },
    { from: 2, to: 12, order: 1 },
    { from: 12, to: 13, order: 2 },
    { from: 12, to: 14, order: 1 },
    { from: 5, to: 15, order: 1 },
    { from: 15, to: 16, order: 1 },
    { from: 14, to: 17, order: 1 },
    { from: 17, to: 18, order: 2 },
    { from: 11, to: 19, order: 1 },
    { from: 19, to: 20, order: 1 },
    { from: 8, to: 21, order: 1 },
    { from: 21, to: 22, order: 1 },
    { from: 22, to: 23, order: 2 },
    { from: 16, to: 24, order: 1 },
    { from: 17, to: 25, order: 1 },
    { from: 25, to: 26, order: 1 },
    { from: 22, to: 27, order: 1 },
    { from: 27, to: 28, order: 2 },
  ],
}

const CATALASE_ENZYME: Molecule = {
  name: 'Catalase Active Site',
  description: 'Enzyme that breaks down hydrogen peroxide into water and oxygen',
  icon: Lightning,
  scale: 0.8,
  atoms: [
    { element: 'Fe', position: [0, 0, 0], color: '#B87333', radius: 0.8 },
    { element: 'N', position: [1.1, 0, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [0, 1.1, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [-1.1, 0, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [0, -1.1, 0], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [1.9, 0.5, 0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [0.5, 1.9, 0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-1.9, 0.5, 0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.5, -1.9, 0.2], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [2.6, 1.2, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [1.2, 2.6, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-2.6, 1.2, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-1.2, -2.6, -0.3], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [0, 0, 1.8], color: '#E74C3C', radius: 0.65 },
    { element: 'O', position: [0, 0, 2.9], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [3.2, 0.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [0.8, 3.2, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-3.2, 0.8, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.8, -3.2, 0.8], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [3.9, 1.5, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [1.5, 3.9, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [-3.9, 1.5, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [-1.5, -3.9, 0.5], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [4.5, 2.2, -0.1], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [2.2, 4.5, -0.1], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [5.2, 2.8, 0.4], color: '#50C878', radius: 0.6 },
    { element: 'O', position: [2.8, 5.2, 0.4], color: '#50C878', radius: 0.6 },
    { element: 'C', position: [-4.5, 2.2, -0.1], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-2.2, -4.5, -0.1], color: '#4A90E2', radius: 0.7 },
    { element: 'N', position: [3.5, 0.2, 1.9], color: '#E94B3C', radius: 0.65 },
    { element: 'N', position: [0.2, 3.5, 1.9], color: '#E94B3C', radius: 0.65 },
    { element: 'C', position: [4.2, -0.5, 2.5], color: '#4A90E2', radius: 0.7 },
    { element: 'C', position: [-0.5, 4.2, 2.5], color: '#4A90E2', radius: 0.7 },
    { element: 'O', position: [4.8, -1.2, 1.8], color: '#50C878', radius: 0.6 },
    { element: 'O', position: [-1.2, 4.8, 1.8], color: '#50C878', radius: 0.6 },
  ],
  bonds: [
    { from: 0, to: 1, order: 1 },
    { from: 0, to: 2, order: 1 },
    { from: 0, to: 3, order: 1 },
    { from: 0, to: 4, order: 1 },
    { from: 0, to: 13, order: 1 },
    { from: 13, to: 14, order: 1 },
    { from: 1, to: 5, order: 2 },
    { from: 2, to: 6, order: 2 },
    { from: 3, to: 7, order: 2 },
    { from: 4, to: 8, order: 2 },
    { from: 5, to: 9, order: 1 },
    { from: 6, to: 10, order: 1 },
    { from: 7, to: 11, order: 1 },
    { from: 8, to: 12, order: 1 },
    { from: 5, to: 15, order: 1 },
    { from: 6, to: 16, order: 1 },
    { from: 7, to: 17, order: 1 },
    { from: 8, to: 18, order: 1 },
    { from: 15, to: 19, order: 1 },
    { from: 16, to: 20, order: 1 },
    { from: 17, to: 21, order: 1 },
    { from: 18, to: 22, order: 1 },
    { from: 19, to: 23, order: 1 },
    { from: 20, to: 24, order: 1 },
    { from: 23, to: 25, order: 2 },
    { from: 24, to: 26, order: 2 },
    { from: 21, to: 27, order: 1 },
    { from: 22, to: 28, order: 1 },
    { from: 15, to: 29, order: 1 },
    { from: 16, to: 30, order: 1 },
    { from: 29, to: 31, order: 1 },
    { from: 30, to: 32, order: 1 },
    { from: 31, to: 33, order: 2 },
    { from: 32, to: 34, order: 2 },
  ],
}

const MOLECULES = [DNA_MOLECULE, HEMOGLOBIN_PROTEIN, INSULIN_HORMONE, CATALASE_ENZYME]

export function MoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const moleculeGroupRef = useRef<THREE.Group | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const atomMeshesRef = useRef<THREE.Mesh[]>([])
  
  const [isRotating, setIsRotating] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.005)
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(DNA_MOLECULE)

  const createMoleculeStructure = (molecule: Molecule, group: THREE.Group) => {
    group.clear()
    atomMeshesRef.current = []

    const atomMeshes: THREE.Mesh[] = []
    molecule.atoms.forEach((atom) => {
      const geometry = new THREE.SphereGeometry(atom.radius * molecule.scale, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: atom.color,
        shininess: 100,
        specular: 0x444444,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(
        atom.position[0] * molecule.scale,
        atom.position[1] * molecule.scale,
        atom.position[2] * molecule.scale
      )
      group.add(sphere)
      atomMeshes.push(sphere)

      const glowGeometry = new THREE.SphereGeometry(atom.radius * molecule.scale * 1.3, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: atom.color,
        transparent: true,
        opacity: 0.15,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.set(
        atom.position[0] * molecule.scale,
        atom.position[1] * molecule.scale,
        atom.position[2] * molecule.scale
      )
      group.add(glow)
    })

    molecule.bonds.forEach((bond) => {
      const from = molecule.atoms[bond.from]
      const to = molecule.atoms[bond.to]
      
      const start = new THREE.Vector3(
        from.position[0] * molecule.scale,
        from.position[1] * molecule.scale,
        from.position[2] * molecule.scale
      )
      const end = new THREE.Vector3(
        to.position[0] * molecule.scale,
        to.position[1] * molecule.scale,
        to.position[2] * molecule.scale
      )
      const direction = new THREE.Vector3().subVectors(end, start)
      const length = direction.length()
      
      const bondGeometry = new THREE.CylinderGeometry(
        0.08 * bond.order * molecule.scale,
        0.08 * bond.order * molecule.scale,
        length,
        8
      )
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
      
      group.add(bondMesh)
    })

    atomMeshesRef.current = atomMeshes
  }

  useEffect(() => {
    if (!moleculeGroupRef.current) return
    createMoleculeStructure(selectedMolecule, moleculeGroupRef.current)
  }, [selectedMolecule])

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

    createMoleculeStructure(selectedMolecule, moleculeGroup)

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

      atomMeshesRef.current.forEach((mesh, index) => {
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
          {selectedMolecule.name}
        </Badge>
        <div className="backdrop-blur-sm bg-background/90 rounded-lg p-3 text-xs max-w-xs">
          <p className="text-muted-foreground">
            {selectedMolecule.description}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-md justify-end">
        {MOLECULES.map((molecule) => {
          const Icon = molecule.icon
          return (
            <Button
              key={molecule.name}
              size="sm"
              variant={selectedMolecule.name === molecule.name ? "default" : "secondary"}
              onClick={() => setSelectedMolecule(molecule)}
              className={`backdrop-blur-sm transition-all ${
                selectedMolecule.name === molecule.name 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background/80 hover:bg-background/90"
              }`}
            >
              <Icon className="mr-2" weight="fill" size={16} />
              {molecule.name}
            </Button>
          )
        })}
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
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700' }} />
            <span>Sulfur (S)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B87333' }} />
            <span>Iron (Fe)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
