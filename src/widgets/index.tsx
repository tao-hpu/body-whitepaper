import type { ComponentType } from 'react'
import { figures } from '../figures'
import { FoodLabel } from './FoodLabel'
import { NaturalWeight } from './NaturalWeight'
import { Protein } from './Protein'
import { Steps } from './Steps'
import { TargetWeight } from './TargetWeight'
import { WeightTrend } from './WeightTrend'

// 正文里写 <div data-widget="名字"></div>，渲染时挂上对应组件。
// 名字以 fig- 开头的是配图，不算计算器。
export const widgets: Record<string, ComponentType> = {
  ...figures,
  'natural-weight': NaturalWeight,
  'target-weight': TargetWeight,
  'weight-trend': WeightTrend,
  'protein': Protein,
  'steps': Steps,
  'food-label': FoodLabel,
}
