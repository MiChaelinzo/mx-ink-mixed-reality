import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  CheckCircle,
  X,
  Sparkle,
  Building,
  GraduationCap,
  Crown,
  ArrowRight
} from '@phosphor-icons/react'

interface PricingTier {
  name: string
  icon: React.ElementType
  price: { monthly: number; annual: number }
  description: string
  features: Array<{ name: string; included: boolean }>
  highlight?: boolean
  cta: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Academic',
    icon: GraduationCap,
    price: { monthly: 1499, annual: 14990 },
    description: 'For medical schools and universities',
    features: [
      { name: 'Up to 50 concurrent users', included: true },
      { name: 'Core procedure library (1,000+ cases)', included: true },
      { name: 'Basic analytics dashboard', included: true },
      { name: 'Email support', included: true },
      { name: 'MX Ink integration', included: true },
      { name: 'Advanced procedures', included: false },
      { name: 'Custom content creation', included: false },
      { name: 'API access', included: false },
      { name: 'Dedicated account manager', included: false }
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    icon: Building,
    price: { monthly: 3999, annual: 39990 },
    description: 'For teaching hospitals and training centers',
    features: [
      { name: 'Up to 200 concurrent users', included: true },
      { name: 'Complete procedure library (5,000+ cases)', included: true },
      { name: 'Advanced analytics & reporting', included: true },
      { name: 'Priority support (24/7)', included: true },
      { name: 'MX Ink integration', included: true },
      { name: 'Advanced & expert procedures', included: true },
      { name: 'Custom content creation tools', included: true },
      { name: 'API access', included: false },
      { name: 'Dedicated account manager', included: true }
    ],
    highlight: true,
    cta: 'Request Demo'
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: { monthly: 0, annual: 0 },
    description: 'For hospital systems and large institutions',
    features: [
      { name: 'Unlimited concurrent users', included: true },
      { name: 'Complete library + custom content', included: true },
      { name: 'Enterprise analytics & insights', included: true },
      { name: 'White-glove support', included: true },
      { name: 'MX Ink integration', included: true },
      { name: 'All procedure levels', included: true },
      { name: 'Full custom content platform', included: true },
      { name: 'Full API access & integrations', included: true },
      { name: 'Dedicated success team', included: true }
    ],
    cta: 'Contact Sales'
  }
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">
            <Sparkle className="mr-2" weight="fill" />
            Flexible Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Scalable solutions for institutions of all sizes. All plans include 
            MX Ink integration and core training features.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'font-bold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-bold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="default" className="ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon
            const price = isAnnual ? tier.price.annual : tier.price.monthly
            const priceDisplay = price === 0 
              ? 'Custom' 
              : `$${price.toLocaleString()}${isAnnual ? '/year' : '/month'}`

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <Card 
                  className={`p-8 flex flex-col h-full ${
                    tier.highlight 
                      ? 'border-2 border-primary shadow-2xl scale-105 relative' 
                      : 'border-2'
                  }`}
                >
                  {tier.highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}

                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-1">{priceDisplay}</div>
                    {price > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {isAnnual 
                          ? `$${Math.floor(price / 12).toLocaleString()}/month billed annually` 
                          : 'Billed monthly'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle 
                            size={20} 
                            weight="fill" 
                            className="text-primary flex-shrink-0 mt-0.5" 
                          />
                        ) : (
                          <X 
                            size={20} 
                            weight="bold" 
                            className="text-muted-foreground/30 flex-shrink-0 mt-0.5" 
                          />
                        )}
                        <span className={`text-sm ${
                          feature.included ? '' : 'text-muted-foreground'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg"
                    variant={tier.highlight ? "default" : "outline"}
                    className="w-full"
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2" weight="bold" />
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <CheckCircle size={32} weight="fill" className="text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">30-Day Free Trial</h4>
            <p className="text-sm text-muted-foreground">
              Test the platform risk-free with full feature access
            </p>
          </Card>

          <Card className="p-6 text-center">
            <CheckCircle size={32} weight="fill" className="text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">No Setup Fees</h4>
            <p className="text-sm text-muted-foreground">
              Get started immediately with zero upfront costs
            </p>
          </Card>

          <Card className="p-6 text-center">
            <CheckCircle size={32} weight="fill" className="text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Cancel Anytime</h4>
            <p className="text-sm text-muted-foreground">
              Flexible terms with no long-term commitment required
            </p>
          </Card>
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
              <p className="text-muted-foreground">
                We offer tailored packages for multi-institution partnerships, 
                government programs, and international deployments.
              </p>
            </div>
            <Button size="lg" variant="outline" className="whitespace-nowrap">
              Contact Sales Team
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
