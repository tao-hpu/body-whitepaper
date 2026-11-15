import type { ComponentType } from 'react'
import { Pool } from './Pool'
import { Abs } from './Abs'
import { Approach } from './Approach'
import { BodyParts } from './BodyParts'
import { BusyTiers } from './BusyTiers'
import { Calibrate } from './Calibrate'
import { Compensation } from './Compensation'
import { Landing } from './Landing'
import { Harder } from './Harder'
import { Levers } from './Levers'
import { NoiseTrend } from './NoiseTrend'
import { StepsWeek } from './StepsWeek'
import { TwoPhases } from './TwoPhases'

// 正文配图，md 里写 <div data-widget="fig-名字"></div>。
export const figures: Record<string, ComponentType> = {
  'fig-pool': Pool,
  'fig-approach': Approach,
  'fig-compensation': Compensation,
  'fig-body-parts': BodyParts,
  'fig-abs': Abs,
  'fig-two-phases': TwoPhases,
  'fig-levers': Levers,
  'fig-busy': BusyTiers,
  'fig-noise': NoiseTrend,
  'fig-calibrate': Calibrate,
  'fig-landing': Landing,
  'fig-steps': StepsWeek,
  'fig-harder': Harder,
}
