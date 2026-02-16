import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ChartLine, 
  TrendUp, 
  TrendDown,
  Target,
  Clock,
  CheckCircle,
  Trophy
} from '@phosphor-icons/react'

const performanceData = {
  overallScore: 87,
  improvement: 23,
  totalSessions: 47,
  hoursTrainged: 128,
  skillBreakdown: [
    { skill: 'Incision Precision', score: 92, trend: 'up', change: 8 },
    { skill: 'Suture Technique', score: 85, trend: 'up', change: 12 },
    { skill: 'Tissue Handling', score: 89, trend: 'up', change: 5 },
    { skill: 'Instrument Control', score: 81, trend: 'up', change: 15 },
    { skill: 'Decision Speed', score: 78, trend: 'up', change: 18 },
    { skill: 'Error Recovery', score: 94, trend: 'up', change: 3 },
  ],
  recentSessions: [
    { date: 'Today', procedure: 'Microsurgical Anastomosis', score: 91, duration: '45 min' },
    { date: 'Yesterday', procedure: 'Nerve Repair', score: 88, duration: '52 min' },
    { date: '2 days ago', procedure: 'Vascular Graft', score: 85, duration: '48 min' },
    { date: '3 days ago', procedure: 'Tissue Excision', score: 89, duration: '41 min' },
  ]
}

export function PerformanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <Trophy weight="fill" className="text-primary" size={32} />
            <Badge variant="default">Overall</Badge>
          </div>
          <div className="text-4xl font-bold text-primary mb-1">{performanceData.overallScore}%</div>
          <div className="text-sm text-muted-foreground">Performance Score</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-primary">
            <TrendUp weight="bold" />
            +{performanceData.improvement}% this month
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Target weight="fill" className="text-accent" size={32} />
          </div>
          <div className="text-4xl font-bold mb-1">{performanceData.totalSessions}</div>
          <div className="text-sm text-muted-foreground">Training Sessions</div>
          <div className="text-sm text-muted-foreground mt-2">Last 30 days</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock weight="fill" className="text-accent" size={32} />
          </div>
          <div className="text-4xl font-bold mb-1">{performanceData.hoursTrainged}h</div>
          <div className="text-sm text-muted-foreground">Total Training Time</div>
          <div className="text-sm text-muted-foreground mt-2">Across all modules</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle weight="fill" className="text-accent" size={32} />
          </div>
          <div className="text-4xl font-bold mb-1">94%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
          <div className="text-sm text-muted-foreground mt-2">All procedures</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-2">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ChartLine weight="fill" className="text-primary" />
            Skill Breakdown
          </h3>
          <div className="space-y-4">
            {performanceData.skillBreakdown.map((skill) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{skill.score}%</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      skill.trend === 'up' ? 'text-primary' : 'text-destructive'
                    }`}>
                      {skill.trend === 'up' ? (
                        <TrendUp weight="bold" size={16} />
                      ) : (
                        <TrendDown weight="bold" size={16} />
                      )}
                      <span>+{skill.change}%</span>
                    </div>
                  </div>
                </div>
                <Progress value={skill.score} className="h-3" />
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Recent Sessions</h3>
          <div className="space-y-4">
            {performanceData.recentSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="pb-4 border-b last:border-0"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm text-muted-foreground">{session.date}</div>
                  <Badge 
                    variant={session.score >= 90 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {session.score}%
                  </Badge>
                </div>
                <div className="font-semibold text-sm mb-1">{session.procedure}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} weight="fill" />
                  {session.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <TrendUp weight="duotone" className="text-primary mt-1 flex-shrink-0" size={32} />
          <div>
            <h4 className="font-bold mb-2">Performance Insights</h4>
            <p className="text-sm text-muted-foreground">
              Your precision scores have improved by 23% over the last month. Focus on Decision Speed 
              to achieve expert-level proficiency. Consider advancing to Level 3 procedures.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
