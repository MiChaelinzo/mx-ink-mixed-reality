import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useKV } from '@github/spark/hooks'
import { 
  MagnifyingGlass,
  Funnel,
  Heart,
  HeartStraight,
  Brain,
  Eye,
  Scissors,
  Clock,
  ChartBar,
  BookOpen,
  Star
} from '@phosphor-icons/react'

interface Case {
  id: string
  title: string
  specialty: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  duration: string
  description: string
  objectives: string[]
  icon: React.ElementType
  rating: number
  completions: number
}

const cases: Case[] = [
  {
    id: '1',
    title: 'Microsurgical Anastomosis',
    specialty: 'Vascular',
    difficulty: 'Advanced',
    duration: '45-60 min',
    description: 'End-to-end vessel anastomosis using 10-0 sutures under high magnification',
    objectives: ['Vessel preparation', 'Suture placement', 'Knot tying precision', 'Leak testing'],
    icon: Heart,
    rating: 4.8,
    completions: 1243
  },
  {
    id: '2',
    title: 'Peripheral Nerve Repair',
    specialty: 'Neurosurgery',
    difficulty: 'Expert',
    duration: '60-75 min',
    description: 'Fascicular nerve repair with epineural coaptation technique',
    objectives: ['Fascicle identification', 'Tension-free alignment', 'Microsuturedge placement'],
    icon: Brain,
    rating: 4.9,
    completions: 891
  },
  {
    id: '3',
    title: 'Corneal Transplant',
    specialty: 'Ophthalmology',
    difficulty: 'Advanced',
    duration: '50-65 min',
    description: 'Penetrating keratoplasty with interrupted suture technique',
    objectives: ['Trephination', 'Donor button preparation', 'Suture placement', 'Wound closure'],
    icon: Eye,
    rating: 4.7,
    completions: 2156
  },
  {
    id: '4',
    title: 'Tissue Flap Dissection',
    specialty: 'Plastic Surgery',
    difficulty: 'Intermediate',
    duration: '35-45 min',
    description: 'Free flap elevation with pedicle preservation',
    objectives: ['Anatomical planning', 'Vessel preservation', 'Tissue handling', 'Hemostasis'],
    icon: Scissors,
    rating: 4.6,
    completions: 3421
  },
  {
    id: '5',
    title: 'Microvascular Bypass',
    specialty: 'Cardiac',
    difficulty: 'Expert',
    duration: '70-90 min',
    description: 'Coronary artery bypass with arterial graft anastomosis',
    objectives: ['Graft harvesting', 'Arteriotomy', 'Running suture technique', 'Flow assessment'],
    icon: HeartStraight,
    rating: 4.9,
    completions: 687
  },
  {
    id: '6',
    title: 'Laparoscopic Suturing',
    specialty: 'General Surgery',
    difficulty: 'Beginner',
    duration: '25-35 min',
    description: 'Basic laparoscopic suturing and knot tying fundamentals',
    objectives: ['Port placement', 'Needle handling', 'Intracorporeal knots', 'Tissue approximation'],
    icon: Scissors,
    rating: 4.5,
    completions: 5892
  },
]

export function CaseLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [favorites, setFavorites] = useKV<string[]>('case-favorites', [])

  const safeFavorites = favorites || []

  const filteredCases = cases.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || c.specialty === selectedSpecialty
    const matchesDifficulty = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty
    return matchesSearch && matchesSpecialty && matchesDifficulty
  })

  const toggleFavorite = (caseId: string) => {
    setFavorites((current) => {
      const list = current || []
      if (list.includes(caseId)) {
        return list.filter(id => id !== caseId)
      }
      return [...list, caseId]
    })
  }

  const specialties = ['all', ...Array.from(new Set(cases.map(c => c.specialty)))]
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'Intermediate': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'Advanced': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'Expert': return 'bg-red-500/10 text-red-600 border-red-500/20'
      default: return ''
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {specialties.map(s => (
                <option key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d === 'all' ? 'All Levels' : d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Funnel size={16} />
          <span>{filteredCases.length} procedures found</span>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseItem, index) => {
          const Icon = caseItem.icon
          const isFavorite = safeFavorites.includes(caseItem.id)
          
          return (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2 group relative h-full flex flex-col">
                <button
                  onClick={() => toggleFavorite(caseItem.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Star
                    size={20}
                    weight={isFavorite ? "fill" : "regular"}
                    className={isFavorite ? "text-primary" : "text-muted-foreground"}
                  />
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} weight="duotone" className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1 pr-8">{caseItem.title}</h3>
                    <div className="text-sm text-muted-foreground">{caseItem.specialty}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-1">{caseItem.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(caseItem.difficulty)}>
                      {caseItem.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{caseItem.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} weight="fill" className="text-primary" />
                      <span className="font-semibold">{caseItem.rating}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {caseItem.completions.toLocaleString()} completed
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <BookOpen className="mr-2" weight="fill" />
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredCases.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" weight="duotone" />
          <h3 className="text-xl font-bold mb-2">No procedures found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </Card>
      )}
    </div>
  )
}
