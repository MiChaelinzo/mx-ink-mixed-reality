import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Quotes,
  CaretLeft,
  CaretRight,
  Star,
  CheckCircle
} from '@phosphor-icons/react'

const testimonials = [
  {
    name: 'Dr. Michael Torres',
    role: 'Chief of Surgery',
    institution: 'Stanford Medical Center',
    quote: 'MolecuSculpt has transformed our residency program. The molecular-scale precision training has reduced surgical errors in our trainees by 40% in just six months.',
    rating: 5,
    image: '🩺'
  },
  {
    name: 'Dr. Emily Chen',
    role: 'Director of Surgical Education',
    institution: 'Johns Hopkins Hospital',
    quote: 'The MX Ink integration provides unprecedented haptic feedback. Our residents are now practicing procedures they would never have access to with traditional methods.',
    rating: 5,
    image: '👩‍⚕️'
  },
  {
    name: 'Dr. Robert Singh',
    role: 'Neurosurgery Department Head',
    institution: 'Mayo Clinic',
    quote: 'The cost savings alone justify the investment, but what truly matters is the quality of training. Our surgeons are entering the OR with confidence I\'ve never seen before.',
    rating: 5,
    image: '👨‍⚕️'
  },
  {
    name: 'Dr. Sarah Williams',
    role: 'Head of Medical Simulation',
    institution: 'Mass General Hospital',
    quote: 'We\'ve been using MolecuSculpt for a year now. The ability to practice rare cases repeatedly in a risk-free environment is invaluable. This is the future of surgical training.',
    rating: 5,
    image: '⚕️'
  },
  {
    name: 'Dr. James Park',
    role: 'Residency Program Director',
    institution: 'UCLA Medical Center',
    quote: 'The analytics dashboard gives us insights we never had before. We can identify skill gaps early and provide targeted training. Game-changing technology.',
    rating: 5,
    image: '🏥'
  }
]

const stats = [
  { value: '98%', label: 'User Satisfaction' },
  { value: '150+', label: 'Partner Institutions' },
  { value: '50K+', label: 'Surgeons Trained' },
  { value: '4.9/5', label: 'Average Rating' }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  }

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">
            <CheckCircle className="mr-2" weight="fill" />
            Trusted by Leading Institutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Experts Are Saying
          </h2>
          <p className="text-xl text-muted-foreground">
            Hear from surgical directors and educators who are revolutionizing 
            their training programs with MolecuSculpt
          </p>
        </div>

        <div className="mb-16">
          <Card className="p-8 md:p-12 border-2 relative overflow-hidden">
            <Quotes 
              size={80} 
              weight="fill" 
              className="absolute top-4 left-4 text-primary/10"
            />
            
            <div className="relative min-h-[300px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="text-6xl mb-6">{currentTestimonial.image}</div>
                    
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} size={24} weight="fill" className="text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    <div className="pt-6">
                      <div className="font-bold text-lg">{currentTestimonial.name}</div>
                      <div className="text-muted-foreground">{currentTestimonial.role}</div>
                      <div className="text-primary font-semibold">{currentTestimonial.institution}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <CaretLeft weight="bold" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <CaretRight weight="bold" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
