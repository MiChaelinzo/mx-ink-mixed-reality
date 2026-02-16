import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  X,
  ArrowRight,
  Clock,
  CurrencyDollar,
  TrendUp,
  Users
} from '@phosphor-icons/react'

const comparisonData = [
  {
    metric: 'Training Time to Proficiency',
    traditional: '10,000+ hours',
    molecusculpt: '6,000 hours',
    improvement: '40% faster',
    icon: Clock
  },
  {
    metric: 'Cost per Trainee',
    traditional: '$125,000',
    molecusculpt: '$45,000',
    improvement: '64% savings',
    icon: CurrencyDollar
  },
  {
    metric: 'Practice Scenarios Available',
    traditional: '50-100 cases',
    molecusculpt: '5,000+ cases',
    improvement: '50x more',
    icon: TrendUp
  },
  {
    metric: 'Concurrent Trainees',
    traditional: '1-2 per session',
    molecusculpt: 'Unlimited',
    improvement: 'No limits',
    icon: Users
  },
]

const features = [
  { name: 'Unlimited Practice Sessions', traditional: false, molecusculpt: true },
  { name: 'Real-Time Performance Feedback', traditional: false, molecusculpt: true },
  { name: 'Rare Case Exposure', traditional: false, molecusculpt: true },
  { name: 'Risk-Free Environment', traditional: false, molecusculpt: true },
  { name: 'Molecular-Scale Precision', traditional: false, molecusculpt: true },
  { name: 'AI-Powered Coaching', traditional: false, molecusculpt: true },
  { name: 'Progress Tracking & Analytics', traditional: false, molecusculpt: true },
  { name: 'Multi-User Collaboration', traditional: false, molecusculpt: true },
  { name: 'Hands-On Experience', traditional: true, molecusculpt: true },
  { name: 'Anatomical Accuracy', traditional: true, molecusculpt: true },
  { name: 'Instructor Supervision', traditional: true, molecusculpt: true },
  { name: 'Certification Pathway', traditional: true, molecusculpt: true },
]

export function ComparisonTool() {
  return (
    <div className="space-y-6">
      <Card className="p-8 border-2">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div />
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">Traditional Methods</Badge>
            <h3 className="text-xl font-bold">Cadaver & Simulator</h3>
          </div>
          <div className="text-center">
            <Badge className="mb-2 bg-primary">Our Platform</Badge>
            <h3 className="text-xl font-bold">MolecuSculpt</h3>
          </div>
        </div>

        <div className="space-y-4">
          {comparisonData.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grid md:grid-cols-3 gap-6 items-center p-4 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} weight="duotone" className="text-primary" />
                  <span className="font-semibold">{item.metric}</span>
                </div>
                <div className="text-center">
                  <span className="text-muted-foreground">{item.traditional}</span>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">{item.molecusculpt}</div>
                  <div className="text-sm text-primary mt-1 flex items-center justify-center gap-1">
                    <TrendUp size={14} weight="bold" />
                    {item.improvement}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Card>

      <Card className="p-8 border-2">
        <h3 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6 pb-4 border-b">
          <div className="font-bold">Feature</div>
          <div className="text-center font-bold">Traditional</div>
          <div className="text-center font-bold">MolecuSculpt</div>
        </div>

        <div className="space-y-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="grid md:grid-cols-3 gap-4 items-center py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>{feature.name}</div>
              <div className="flex justify-center">
                {feature.traditional ? (
                  <CheckCircle size={24} weight="fill" className="text-muted-foreground" />
                ) : (
                  <X size={24} weight="bold" className="text-muted-foreground/30" />
                )}
              </div>
              <div className="flex justify-center">
                {feature.molecusculpt ? (
                  <CheckCircle size={24} weight="fill" className="text-primary" />
                ) : (
                  <X size={24} weight="bold" className="text-muted-foreground/30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-8 bg-gradient-to-br from-primary to-accent text-primary-foreground border-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">The Clear Choice for Modern Training</h3>
            <p className="text-primary-foreground/90 text-lg">
              Join leading institutions already using MolecuSculpt to train the next generation of surgeons
            </p>
          </div>
          <ArrowRight size={48} weight="bold" className="hidden lg:block" />
        </div>
      </Card>
    </div>
  )
}
