// src/utils/calculations.ts
export interface Module {
  level: 5 | 6
  credits: number
  mark: number
  id: string
}

export const calculateIndicatorScore = (modules: Module[]) => {
  try {
    if (!modules || modules.length === 0) return 0

    // Clone and sort modules
    const sorted = [...modules]
      .sort((a, b) => (a.mark - b.mark) || (a.level - b.level))

    // Identify module to exclude
    const toExclude = sorted[0]
    const remaining = modules.filter(m => m !== toExclude)

    // Separate levels
    const l5 = remaining.filter(m => m.level === 5)
    const l6 = remaining.filter(m => m.level === 6)

    // Calculate weighted averages
    const l5Avg = l5.reduce((sum, m) => sum + (m.mark * m.credits), 0) 
                   / Math.max(1, l5.reduce((sum, m) => sum + m.credits, 0))
    
    const l6Avg = l6.reduce((sum, m) => sum + (m.mark * m.credits), 0) 
                   / Math.max(1, l6.reduce((sum, m) => sum + m.credits, 0))

    const weight = l5.length ? 1/3 : 0
    return (weight * l5Avg) + ((1 - weight) * l6Avg)
  } catch (error) {
    console.error("Calculation error:", error)
    return 0
  }
}

export const calculateClassification = (score: number) => {
  const rounded = Math.round(score)
  if (rounded >= 70) return '1st'
  if (rounded >= 60) return '2:1'
  if (rounded >= 50) return '2:2'
  if (rounded >= 40) return '3rd'
  return 'No Classification'
}