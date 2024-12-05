import { StressCategory, Question } from '../types/diagnosis'

export const stressCategories: StressCategory[] = [
  {
    id: 'self',
    title: '自分自身',
    description: '自分自身に関連するストレス'
  },
  {
    id: 'others',
    title: '他人',
    description: '他人との関係に関連するストレス'
  },
  {
    id: 'environment',
    title: '環境',
    description: '環境に関連するストレス'
  },
  {
    id: 'money',
    title: 'お金',
    description: '経済的なストレス'
  },
  {
    id: 'time',
    title: '時間',
    description: '時間管理に関連するストレス'
  }
]

export const questions: Question[] = [
  {
    id: '1',
    text: '自分の能力に自信が持てない',
    category: 'self',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '2',
    text: '周囲の人との関係に悩んでいる',
    category: 'others',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '3',
    text: '職場や学校の環境に不満がある',
    category: 'environment',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '4',
    text: '経済的な不安を感じている',
    category: 'money',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '5',
    text: '時間の使い方に満足できていない',
    category: 'time',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '6',
    text: '自分の将来に不安を感じている',
    category: 'self',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '7',
    text: '他人の期待に応えられないと感じる',
    category: 'others',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '8',
    text: '生活環境の変化にストレスを感じる',
    category: 'environment',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '9',
    text: '収入が不安定で心配である',
    category: 'money',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  },
  {
    id: '10',
    text: '時間に追われていると感じる',
    category: 'time',
    options: [
      { text: 'かなりそう思う', value: 4 },
      { text: 'そう思う', value: 3 },
      { text: 'わからない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: 'かなりそう思わない', value: 0 }
    ]
  }
]

