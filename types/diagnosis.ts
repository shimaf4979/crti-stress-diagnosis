export type StressCategory = {
  id: string
  title: string
  description: string
}

export type Question = {
  id: string
  text: string
  category: string
  options: {
    text: string
    value: number
  }[]
}

export type DiagnosisResult = {
  category: StressCategory
  score: number
  totalScore: number
  recommendations: string[]
}

