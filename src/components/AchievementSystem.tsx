import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useKV } from '@github/spark/hooks'
import { 
  Trophy,
  Medal,
  Target,
  Lightning,
  CheckCircle,
  Star,
  Crown,
  Fire
} from '@phosphor-icons/react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ElementType
  progress: number
  total: number
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first training session',
    icon: CheckCircle,
    progress: 1,
    total: 1,
    unlocked: true,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Precision Master',
    description: 'Achieve 95% accuracy in 10 consecutive sessions',
    icon: Target,
    progress: 7,
    total: 10,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Speed Demon',
    description: 'Complete a procedure in under target time 5 times',
    icon: Lightning,
    progress: 3,
    total: 5,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: '4',
    title: 'Perfectionist',
    description: 'Score 100% in any advanced procedure',
    icon: Star,
    progress: 0,
    total: 1,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: '5',
    title: 'Endurance',
    description: 'Train for 100 total hours',
    icon: Fire,
    progress: 128,
    total: 100,
    unlocked: true,
    rarity: 'epic'
  },
  {
    id: '6',
    title: 'Master Surgeon',
    description: 'Unlock all expert-level procedures',
    icon: Crown,
    progress: 12,
    total: 15,
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: '7',
    title: 'Specialist',
    description: 'Complete all cases in a single specialty',
    icon: Medal,
    progress: 1,
    total: 1,
    unlocked: true,
    rarity: 'epic'
  },
  {
    id: '8',
    title: 'Marathon Runner',
    description: 'Train 7 days in a row',
    icon: Trophy,
    progress: 4,
    total: 7,
    unlocked: false,
    rarity: 'rare'
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-500/30 bg-gray-500/5'
    case 'rare': return 'border-blue-500/30 bg-blue-500/5'
    case 'epic': return 'border-purple-500/30 bg-purple-500/5'
    case 'legendary': return 'border-amber-500/30 bg-amber-500/5'
    default: return ''
  }
}

const getRarityBadgeColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    case 'rare': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'epic': return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    case 'legendary': return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    default: return ''
  }
}

export function AchievementSystem() {
  const [userLevel] = useKV<number>('user-level', 12)
  const [totalXP] = useKV<number>('total-xp', 8450)
  const [nextLevelXP] = useKV<number>('next-level-xp', 9000)

  const safeLevel = userLevel || 12
  const safeXP = totalXP || 8450
  const safeNextXP = nextLevelXP || 9000
  const progressToNext = ((safeXP % 1000) / 1000) * 100

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
              <span className="text-2xl font-bold">{safeLevel}</span>
            </div>
            <div>
              <div className="text-2xl font-bold">Level {safeLevel}</div>
              <div className="text-sm text-muted-foreground">Surgical Resident</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {safeLevel + 1}</span>
              <span className="font-bold">{Math.floor(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-2">
            <Trophy weight="fill" className="text-primary" size={40} />
            <div>
              <div className="text-3xl font-bold">{unlockedCount}/{achievements.length}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
          <div className="text-sm text-primary mt-4">
            {Math.floor((unlockedCount / achievements.length) * 100)}% Complete
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-2">
            <Star weight="fill" className="text-accent" size={40} />
            <div>
              <div className="text-3xl font-bold">{safeXP.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-4">
            {(safeNextXP - safeXP).toLocaleString()} XP to next level
          </div>
        </Card>
      </div>

      <Card className="p-6 border-2">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy weight="fill" className="text-primary" />
          Achievements
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            const progressPercent = (achievement.progress / achievement.total) * 100

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`p-4 transition-all ${
                    achievement.unlocked 
                      ? `border-2 ${getRarityColor(achievement.rarity)}` 
                      : 'border opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked 
                        ? 'bg-primary/10' 
                        : 'bg-muted'
                    }`}>
                      <Icon 
                        size={24} 
                        weight={achievement.unlocked ? "fill" : "regular"} 
                        className={achievement.unlocked ? "text-primary" : "text-muted-foreground"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-bold">{achievement.title}</h4>
                        {achievement.unlocked && (
                          <CheckCircle weight="fill" className="text-primary flex-shrink-0" size={20} />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <Badge className={getRarityBadgeColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold">{achievement.progress}/{achievement.total}</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <Fire weight="duotone" className="text-primary mt-1 flex-shrink-0" size={32} />
          <div>
            <h4 className="font-bold mb-2">Keep Your Streak Alive!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You're only 3 days away from the "Marathon Runner" achievement. 
              Train today to maintain your momentum!
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    day <= 4 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <CheckCircle size={16} weight="bold" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
