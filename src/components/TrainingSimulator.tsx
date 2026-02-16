import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { useKV } from '@github/spark/hooks'
import { 
  Target, 
  Timer, 
  Lightning, 
  CheckCircle, 
  Warning,
  Crosshair,
  Hand,
  Eye,
  TrendUp
} from '@phosphor-icons/react'

interface SimulatorMetrics {
  precision: number
  speed: number
  steadiness: number
  accuracy: number
}

export function TrainingSimulator() {
  const [isActive, setIsActive] = useState(false)
  const [currentTarget, setCurrentTarget] = useState({ x: 50, y: 50 })
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [hits, setHits] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [metrics, setMetrics] = useKV<SimulatorMetrics>('simulator-metrics', {
    precision: 0,
    speed: 0,
    steadiness: 0,
    accuracy: 0,
  })
  const [difficulty, setDifficulty] = useState(50)
  const [bestScore, setBestScore] = useKV<number>('simulator-best-score', 0)

  const safeMetrics = metrics || { precision: 0, speed: 0, steadiness: 0, accuracy: 0 }
  const safeBestScore = bestScore || 0

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          if (score > safeBestScore) {
            setBestScore(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, score, safeBestScore, setBestScore])

  useEffect(() => {
    if (!isActive) return

    const moveTarget = setInterval(() => {
      setCurrentTarget({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      })
    }, 2000 - difficulty * 10)

    return () => clearInterval(moveTarget)
  }, [isActive, difficulty])

  const handleStart = () => {
    setIsActive(true)
    setScore(0)
    setTimeRemaining(30)
    setHits(0)
    setAttempts(0)
  }

  const handleTargetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100
    const clickY = ((e.clientY - rect.top) / rect.height) * 100

    const distance = Math.sqrt(
      Math.pow(clickX - currentTarget.x, 2) + Math.pow(clickY - currentTarget.y, 2)
    )

    setAttempts((prev) => prev + 1)

    if (distance < 5) {
      const points = Math.max(100 - Math.floor(distance * 10), 10)
      setScore((prev) => prev + points)
      setHits((prev) => prev + 1)

      setMetrics((current) => {
        const base = current || { precision: 0, speed: 0, steadiness: 0, accuracy: 0 }
        return {
          precision: Math.min((base.precision + (100 - distance * 2)) / 2, 100),
          speed: Math.min((base.speed + 5) / 1.1, 100),
          steadiness: Math.min((base.steadiness + (distance < 2 ? 10 : 2)) / 1.1, 100),
          accuracy: ((hits + 1) / (attempts + 1)) * 100,
        }
      })

      setCurrentTarget({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      })
    } else {
      setScore((prev) => Math.max(prev - 10, 0))
      setMetrics((current) => {
        const base = current || { precision: 0, speed: 0, steadiness: 0, accuracy: 0 }
        return {
          ...base,
          accuracy: (hits / (attempts + 1)) * 100,
        }
      })
    }
  }

  const accuracy = attempts > 0 ? Math.floor((hits / attempts) * 100) : 0

  return (
    <Card className="p-8 border-2">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Precision Training Simulator</h3>
              <p className="text-muted-foreground">
                Click targets as accurately and quickly as possible
              </p>
            </div>
            <Badge variant={isActive ? "default" : "secondary"} className="text-lg px-4 py-2">
              {isActive ? (
                <>
                  <Timer className="mr-2" weight="fill" />
                  {timeRemaining}s
                </>
              ) : (
                'Ready'
              )}
            </Badge>
          </div>

          <div
            className="relative aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-dashed border-primary/30 cursor-crosshair overflow-hidden"
            onClick={handleTargetClick}
          >
            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                <div className="text-center space-y-4">
                  <Crosshair size={64} weight="duotone" className="mx-auto text-primary" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Ready to Begin?</h4>
                    <p className="text-muted-foreground mb-4">
                      Test your precision and reaction time
                    </p>
                    <Button size="lg" onClick={handleStart} className="mb-4">
                      <Target className="mr-2" weight="fill" />
                      Start Training
                    </Button>
                    {safeBestScore > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Best Score: <span className="font-bold text-primary">{safeBestScore}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isActive && (
              <motion.div
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${currentTarget.x}%`,
                  top: `${currentTarget.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 bg-primary rounded-full" />
                  <div className="absolute inset-2 bg-accent rounded-full" />
                  <div className="absolute inset-4 bg-primary-foreground rounded-full" />
                </div>
              </motion.div>
            )}

            {isActive && (
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="glass-effect rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold text-primary">{score}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="glass-effect rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Difficulty</Label>
              <span className="text-sm text-muted-foreground">
                {difficulty < 30 ? 'Beginner' : difficulty < 70 ? 'Intermediate' : 'Expert'}
              </span>
            </div>
            <Slider
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
              min={10}
              max={100}
              step={10}
              disabled={isActive}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Lightning weight="fill" className="text-primary" />
              Performance Metrics
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Precision</span>
                  <span className="text-sm font-bold">{Math.floor(safeMetrics.precision)}%</span>
                </div>
                <Progress value={safeMetrics.precision} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Speed</span>
                  <span className="text-sm font-bold">{Math.floor(safeMetrics.speed)}%</span>
                </div>
                <Progress value={safeMetrics.speed} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Steadiness</span>
                  <span className="text-sm font-bold">{Math.floor(safeMetrics.steadiness)}%</span>
                </div>
                <Progress value={safeMetrics.steadiness} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Accuracy</span>
                  <span className="text-sm font-bold">{Math.floor(safeMetrics.accuracy)}%</span>
                </div>
                <Progress value={safeMetrics.accuracy} className="h-2" />
              </div>
            </div>
          </div>

          <Card className="p-4 bg-muted/50">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Target weight="fill" className="text-primary" />
              Session Stats
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hits</span>
                <span className="font-bold">{hits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attempts</span>
                <span className="font-bold">{attempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-bold text-primary">{isActive ? hits : 0}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-3">
              <Eye weight="duotone" className="text-primary mt-1 flex-shrink-0" size={24} />
              <div className="text-sm">
                <p className="font-semibold mb-1">MX Ink Integration</p>
                <p className="text-muted-foreground text-xs">
                  This simulation mimics the precision control of the MX Ink stylus for surgical training
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
