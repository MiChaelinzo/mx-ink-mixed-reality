import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { MoleculeViewer } from '@/components/MoleculeViewer'
import { TrainingSimulator } from '@/components/TrainingSimulator'
import { PerformanceDashboard } from '@/components/PerformanceDashboard'
import { CaseLibrary } from '@/components/CaseLibrary'
import { AchievementSystem } from '@/components/AchievementSystem'
import { ComparisonTool } from '@/components/ComparisonTool'
import { ROICalculator } from '@/components/ROICalculator'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { PricingSection } from '@/components/PricingSection'
import { useKV } from '@github/spark/hooks'
import { 
  Atom, 
  CubeFocus, 
  ChartLine, 
  Users, 
  ArrowRight, 
  Sparkle,
  CheckCircle,
  Brain,
  Eye,
  Hand,
  Lightning,
  Target,
  Scissors,
  Trophy,
  BookOpen,
  Play,
  Calculator,
  ChartBar,
  UsersFour
} from '@phosphor-icons/react'

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, duration, value])

  return <span ref={ref}>{count}</span>
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 molecular-grid opacity-40" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
              <Sparkle className="mr-2" weight="fill" />
              Logitech MX Ink Innovation Challenge
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Surgery at the{' '}
              <span className="text-gradient">Molecular Scale</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              MolecuSculpt transforms medical education through mixed reality precision training. 
              Navigate nanoscale environments with the surgical accuracy of MX Ink.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg h-14 px-8"
                onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Live Simulator
                <Play className="ml-2" weight="fill" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8 border-2"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See 3D Demo
                <ArrowRight className="ml-2" weight="bold" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">$8.2B</div>
                <div className="text-sm text-muted-foreground">Market Size 2030</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Precision Accuracy</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div>
                <div className="text-3xl font-bold text-primary">60%</div>
                <div className="text-sm text-muted-foreground">Faster Training</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 animate-rotate-3d">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Atom size={240} weight="duotone" className="text-primary opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CubeFocus size={120} weight="duotone" className="text-accent animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 glass-effect rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} weight="fill" className="text-primary" />
                  <span className="text-sm font-semibold">MX Ink Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { label: 'Surgical Error Rate', value: 15, suffix: '%' },
    { label: 'Training Hours Required', value: 10000, suffix: '+' },
    { label: 'Limited Practice Scenarios', value: 75, suffix: '%' },
    { label: 'Cost per Training Session', value: 5000, prefix: '$' },
  ]

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              Critical Challenge
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Surgical Training Crisis
            </h2>
            <p className="text-xl text-muted-foreground">
              Modern surgical techniques are advancing faster than training methods can keep pace. 
              Traditional cadaver and simulator training falls short of real-world complexity.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <FadeInSection key={problem.label} delay={index * 0.1}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2">
                <div className="text-4xl font-bold text-destructive mb-2">
                  {problem.prefix}
                  <AnimatedCounter value={problem.value} />
                  {problem.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {problem.label}
                </div>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <Card className="p-8 md:p-12 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground border-0">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Scissors size={48} weight="duotone" className="mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl md:text-3xl font-bold">
                Surgeons need to practice complex procedures without risk
              </h3>
              <p className="text-lg opacity-90">
                But current training methods lack the precision, repeatability, and molecular-scale 
                accuracy required for modern microsurgical techniques. Patient safety demands better.
              </p>
            </div>
          </Card>
        </FadeInSection>
      </div>
    </section>
  )
}

function SimulatorSection() {
  return (
    <section id="simulator" className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Play className="mr-2" weight="fill" />
              Interactive Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Try the Training Simulator
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience MX Ink precision firsthand. Practice nanoscale surgical techniques 
              with real-time feedback and performance metrics.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <TrainingSimulator />
        </FadeInSection>
      </div>
    </section>
  )
}

function SolutionSection() {
  const features = [
    {
      icon: CubeFocus,
      title: 'Nanoscale Precision',
      description: 'MX Ink delivers sub-millimeter accuracy for molecular-level surgical training',
    },
    {
      icon: Eye,
      title: 'Mixed Reality Vision',
      description: 'Meta Quest integration provides immersive 3D visualization of anatomical structures',
    },
    {
      icon: Hand,
      title: 'Haptic Feedback',
      description: 'Feel tissue resistance and tool interaction through advanced force simulation',
    },
    {
      icon: Brain,
      title: 'AI-Guided Learning',
      description: 'Real-time performance analysis and personalized skill development paths',
    },
    {
      icon: Lightning,
      title: 'Instant Replay',
      description: 'Review procedures from any angle with multi-perspective recording',
    },
    {
      icon: Target,
      title: 'Scenario Library',
      description: 'Thousands of rare and complex cases for comprehensive practice',
    },
  ]

  return (
    <section id="demo" className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <CheckCircle className="mr-2" weight="fill" />
              The Solution
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet MolecuSculpt
            </h2>
            <p className="text-xl text-muted-foreground">
              The world's first molecular-scale surgical training platform, powered by 
              Logitech MX Ink's unparalleled precision and Meta Quest's immersive capabilities.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
            <div className="aspect-video bg-gradient-to-br from-[oklch(0.15_0.05_240)] to-[oklch(0.08_0.03_220)] relative">
              <MoleculeViewer />
            </div>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeInSection key={feature.title} delay={index * 0.1}>
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2 group">
                <feature.icon 
                  size={40} 
                  weight="duotone" 
                  className="text-primary mb-4 group-hover:scale-110 transition-transform" 
                />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseLibrarySection() {
  return (
    <section id="cases" className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <BookOpen className="mr-2" weight="fill" />
              Training Content
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Case Library
            </h2>
            <p className="text-xl text-muted-foreground">
              Access thousands of surgical scenarios across specialties. From routine 
              procedures to rare emergency cases.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <CaseLibrary />
        </FadeInSection>
      </div>
    </section>
  )
}

function PerformanceSection() {
  return (
    <section id="performance" className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <ChartBar className="mr-2" weight="fill" />
              Training Analytics
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Measurable Skill Development
            </h2>
            <p className="text-xl text-muted-foreground">
              Track progress with comprehensive analytics. See improvement across precision, 
              speed, technique, and decision-making.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <PerformanceDashboard />
        </FadeInSection>
      </div>
    </section>
  )
}

function AchievementSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <Trophy className="mr-2" weight="fill" />
              Gamified Learning
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Progress That Motivates
            </h2>
            <p className="text-xl text-muted-foreground">
              Earn achievements, unlock advanced techniques, and compete on leaderboards. 
              Making surgical excellence engaging.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <AchievementSystem />
        </FadeInSection>
      </div>
    </section>
  )
}

function ComparisonSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <Target className="mr-2" weight="fill" />
              The Difference
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Traditional vs MolecuSculpt
            </h2>
            <p className="text-xl text-muted-foreground">
              See how our platform outperforms conventional training methods across 
              every critical metric.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <ComparisonTool />
        </FadeInSection>
      </div>
    </section>
  )
}

function TechnologySection() {
  const capabilities = [
    {
      title: 'Pressure Sensitivity',
      spec: '8192 Levels',
      description: 'Detect the lightest touch to maximum force',
    },
    {
      title: 'Tilt Recognition',
      spec: '±60 Degrees',
      description: 'Natural angle detection for realistic tool handling',
    },
    {
      title: 'Latency',
      spec: '<5ms',
      description: 'Real-time response for surgical precision',
    },
    {
      title: 'Spatial Accuracy',
      spec: '0.1mm',
      description: 'Sub-millimeter positioning in 3D space',
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <Lightning className="mr-2" weight="fill" />
              Powered by MX Ink
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Precision Meets Innovation
            </h2>
            <p className="text-xl text-muted-foreground">
              Logitech MX Ink's advanced capabilities unlock surgical training possibilities 
              that were previously impossible in mixed reality.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <FadeInSection key={capability.title} delay={index * 0.1}>
              <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">
                  {capability.spec}
                </div>
                <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <div className="mt-16 glass-effect rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Meta Quest Integration
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Seamlessly blends MX Ink's precision with Quest's immersive environment, 
                  creating the most realistic surgical training experience available.
                </p>
                <ul className="space-y-3">
                  {['Hand tracking for natural interaction', '120Hz refresh rate', 'Spatial audio for immersion', 'Passthrough for hybrid training'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={24} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 absolute inset-0 blur-2xl animate-pulse-glow" />
                  <CubeFocus size={200} weight="duotone" className="text-primary relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

function ROISection() {
  return (
    <section id="roi" className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <Calculator className="mr-2" weight="fill" />
              Financial Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-muted-foreground">
              See how MolecuSculpt delivers measurable cost savings and training efficiency 
              gains for your institution.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <ROICalculator />
        </FadeInSection>
      </div>
    </section>
  )
}

function MarketSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <ChartLine className="mr-2" weight="fill" />
              Market Opportunity
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A Massive, Growing Market
            </h2>
            <p className="text-xl text-muted-foreground">
              The medical simulation market is exploding as healthcare systems demand 
              better training outcomes and patient safety.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FadeInSection delay={0.1}>
            <Card className="p-8 text-center border-2">
              <div className="text-5xl font-bold text-primary mb-4">
                $<AnimatedCounter value={8.2} duration={2000} />B
              </div>
              <h3 className="text-xl font-bold mb-2">TAM</h3>
              <p className="text-muted-foreground">
                Total medical simulation market by 2030
              </p>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <Card className="p-8 text-center border-2 border-primary shadow-lg">
              <div className="text-5xl font-bold text-primary mb-4">
                $<AnimatedCounter value={1.2} duration={2000} />B
              </div>
              <h3 className="text-xl font-bold mb-2">SAM</h3>
              <p className="text-muted-foreground">
                Serviceable available market in surgical training
              </p>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <Card className="p-8 text-center border-2">
              <div className="text-5xl font-bold text-primary mb-4">
                $<AnimatedCounter value={180} duration={2000} />M
              </div>
              <h3 className="text-xl font-bold mb-2">SOM</h3>
              <p className="text-muted-foreground">
                Serviceable obtainable market (first 3 years)
              </p>
            </Card>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.4}>
          <Card className="p-8 md:p-12 border-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Target Customer Segments
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Medical Schools', value: '450+', description: 'Accredited institutions in US alone' },
                { name: 'Teaching Hospitals', value: '1,200+', description: 'Major facilities with residency programs' },
                { name: 'Specialty Centers', value: '5,000+', description: 'Microsurgery and specialized training centers' },
                { name: 'Military Medical', value: '200+', description: 'Defense medical training facilities worldwide' },
              ].map((segment) => (
                <div key={segment.name} className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target size={32} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">{segment.name}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{segment.value}</div>
                    <div className="text-sm text-muted-foreground">{segment.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeInSection>
      </div>
    </section>
  )
}

function TeamSection() {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-Founder',
      credentials: 'Neurosurgeon, MIT Media Lab, 15 years surgical experience',
    },
    {
      name: 'Alex Kumar',
      role: 'CTO',
      credentials: 'Ex-Meta Reality Labs, Stanford HCI, 3 VR patents',
    },
    {
      name: 'Dr. James Morrison',
      role: 'Chief Medical Officer',
      credentials: 'Johns Hopkins Surgery Chair, Published 100+ papers',
    },
    {
      name: 'Maya Rodriguez',
      role: 'Head of Product',
      credentials: 'Ex-Apple Vision, Carnegie Mellon, Medical device expert',
    },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">
              <Users className="mr-2" weight="fill" />
              World-Class Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Leaders in Medicine & Technology
            </h2>
            <p className="text-xl text-muted-foreground">
              Our founding team combines decades of surgical expertise with cutting-edge 
              mixed reality development experience.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <FadeInSection key={member.name} delay={index * 0.1}>
              <Card className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <Users size={40} weight="duotone" className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <div className="text-sm text-primary font-semibold mb-3">{member.role}</div>
                <p className="text-sm text-muted-foreground">{member.credentials}</p>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <div className="mt-16 text-center">
            <Card className="inline-block p-6 border-2 border-primary/20">
              <div className="flex items-center gap-4">
                <Sparkle size={32} weight="fill" className="text-primary" />
                <div className="text-left">
                  <div className="font-bold">Advisors include:</div>
                  <div className="text-muted-foreground">
                    Former FDA Commissioner, Meta Reality Labs Director, Mayo Clinic Innovation Lead
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-br from-secondary via-primary/90 to-accent text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 molecular-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Badge className="bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20">
            <Sparkle className="mr-2" weight="fill" />
            Ready to Transform Surgical Training
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold">
            Let's Build the Future Together
          </h2>

          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We're seeking partners, investors, and early adopters who share our vision 
            for revolutionizing medical education through MX Ink precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 text-lg h-14 px-8"
            >
              Schedule a Demo
              <ArrowRight className="ml-2" weight="bold" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-lg h-14 px-8"
            >
              Download Pitch Deck
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div>📧 hello@molecusculpt.io</div>
            <div>📍 San Francisco, CA</div>
            <div>🏆 Meta Quest Developer Challenge Finalist</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SimulatorSection />
      <SolutionSection />
      <CaseLibrarySection />
      <PerformanceSection />
      <AchievementSection />
      <ComparisonSection />
      <TechnologySection />
      <TestimonialsSection />
      <PricingSection />
      <ROISection />
      <MarketSection />
      <TeamSection />
      <CTASection />
    </div>
  )
}

export default App
