import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  Calculator,
  TrendUp,
  Users,
  CurrencyDollar,
  Clock,
  Download,
  ChartLine
} from '@phosphor-icons/react'

export function ROICalculator() {
  const [students, setStudents] = useState(50)
  const [currentCost, setCurrentCost] = useState(125000)
  const [sessionsPerYear, setSessionsPerYear] = useState(200)

  const molecuSculptCost = students * 900
  const traditionalCostTotal = (currentCost / students) * students * (sessionsPerYear / 100)
  const savings = traditionalCostTotal - molecuSculptCost
  const savingsPercent = ((savings / traditionalCostTotal) * 100).toFixed(0)
  const timeReduction = 40
  const hoursServer = (10000 * timeReduction) / 100 * students
  const breakEvenMonths = Math.ceil((molecuSculptCost / (savings / 12)))

  return (
    <div className="space-y-6">
      <Card className="p-8 border-2">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator weight="fill" className="text-primary" />
                Calculate Your ROI
              </h3>
              <p className="text-muted-foreground mb-6">
                Enter your institution's details to see potential cost savings and efficiency gains
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="students" className="text-sm font-medium mb-2 block">
                  Number of Students/Residents
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="students"
                    value={[students]}
                    onValueChange={(value) => setStudents(value[0])}
                    min={10}
                    max={500}
                    step={10}
                    className="flex-1"
                  />
                  <div className="w-20 text-right">
                    <Input
                      type="number"
                      value={students}
                      onChange={(e) => setStudents(parseInt(e.target.value) || 10)}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="cost" className="text-sm font-medium mb-2 block">
                  Current Annual Training Budget ($)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="cost"
                    value={[currentCost]}
                    onValueChange={(value) => setCurrentCost(value[0])}
                    min={50000}
                    max={500000}
                    step={5000}
                    className="flex-1"
                  />
                  <div className="w-32 text-right">
                    <Input
                      type="number"
                      value={currentCost}
                      onChange={(e) => setCurrentCost(parseInt(e.target.value) || 50000)}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="sessions" className="text-sm font-medium mb-2 block">
                  Training Sessions per Year
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="sessions"
                    value={[sessionsPerYear]}
                    onValueChange={(value) => setSessionsPerYear(value[0])}
                    min={50}
                    max={500}
                    step={10}
                    className="flex-1"
                  />
                  <div className="w-20 text-right">
                    <Input
                      type="number"
                      value={sessionsPerYear}
                      onChange={(e) => setSessionsPerYear(parseInt(e.target.value) || 50)}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendUp weight="fill" className="text-primary" size={24} />
                <h4 className="font-bold text-lg">Projected Annual Savings</h4>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">
                ${savings.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {savingsPercent}% reduction in training costs
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <CurrencyDollar weight="fill" className="text-primary" size={20} />
                  <div className="text-xs text-muted-foreground">MolecuSculpt Cost</div>
                </div>
                <div className="text-2xl font-bold">${molecuSculptCost.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">First year</div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock weight="fill" className="text-primary" size={20} />
                  <div className="text-xs text-muted-foreground">Break-Even</div>
                </div>
                <div className="text-2xl font-bold">{breakEvenMonths} months</div>
                <div className="text-xs text-muted-foreground mt-1">Time to ROI</div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users weight="fill" className="text-primary" size={20} />
                  <div className="text-xs text-muted-foreground">Cost per Student</div>
                </div>
                <div className="text-2xl font-bold">${(molecuSculptCost / students).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Annual</div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <ChartLine weight="fill" className="text-primary" size={20} />
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-2xl font-bold">{hoursServer.toLocaleString()}h</div>
                <div className="text-xs text-muted-foreground mt-1">Training hours</div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-2">
        <h3 className="text-xl font-bold mb-6">3-Year Projection</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((year) => {
            const yearSavings = savings * year
            const yearCost = year === 1 ? molecuSculptCost : molecuSculptCost * 0.3
            const netBenefit = yearSavings - yearCost

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: year * 0.1 }}
              >
                <Card className={`p-6 ${year === 2 ? 'border-2 border-primary' : ''}`}>
                  <div className="text-sm text-muted-foreground mb-2">Year {year}</div>
                  <div className="text-3xl font-bold text-primary mb-4">
                    ${netBenefit.toLocaleString()}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Savings</span>
                      <span className="font-semibold">${yearSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investment</span>
                      <span className="font-semibold">${yearCost.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Net Benefit</span>
                        <span className="text-primary">${netBenefit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Download weight="duotone" className="text-primary mt-1 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold mb-2">Download Full Report</h4>
              <p className="text-sm text-muted-foreground">
                Get a detailed PDF analysis with custom projections for your institution
              </p>
            </div>
          </div>
          <Button>
            <Download className="mr-2" weight="bold" />
            Download
          </Button>
        </div>
      </Card>
    </div>
  )
}
