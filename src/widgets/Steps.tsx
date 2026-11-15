import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMP_LONG, COMP_SHORT, KCAL_PER_KG_DAY, KCAL_PER_KG_PER_1000_STEPS } from './model'
import { Slider } from './Slider'

// 估计：中速步行每分钟约 100 步，步长约 0.7 m。
const STEPS_PER_MIN = 100
const STEP_M = 0.7

// 每天多走的消耗按代偿打折后，对应的长期体重变化（与第 01 节的算法相同）。
const drop = (kcal: number, comp: number) => (kcal * (1 - comp)) / KCAL_PER_KG_DAY

export function Steps() {
  const [weight, setWeight] = useState(80)
  const [steps, setSteps] = useState(4000)

  const kcal = (steps / 1000) * KCAL_PER_KG_PER_1000_STEPS * weight
  const minutes = steps / STEPS_PER_MIN
  const km = (steps * STEP_M) / 1000
  const cell = (comp: number) => {
    const d = drop(kcal, comp)
    return <>{d < 0.05 ? '0' : `−${d.toFixed(1)}`} kg<small>停在约 {(weight - d).toFixed(1)} kg</small></>
  }

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 多走路能减多少</div>
      <Slider label="体重" unit=" kg" value={weight} min={45} max={130} step={0.5} onChange={setWeight} />
      <Slider label="每天多走" unit=" 步" value={steps} min={0} max={12000} step={500} onChange={setSteps}
        hint="在现在的日均步数上多出来的部分" />

      <div className="w-facts w-facts-3">
        <div><span>每天多消耗</span><b>{Math.round(kcal)} kcal</b><small>一周约 {Math.round(kcal * 7)} kcal</small></div>
        <div><span>约多走</span><b>{Math.round(minutes)} 分钟</b><small>按每分钟约 {STEPS_PER_MIN} 步</small></div>
        <div><span>约多走</span><b>{km.toFixed(1)} km</b><small>按步长 {STEP_M} m</small></div>
      </div>

      <div className="w-plans">
        <div className="w-plans-head">
          <span />
          <span>头半年左右</span>
          <span>长期（按这列做计划）</span>
        </div>
        <div className="w-plan">
          <div className="w-plan-name">只多走，不改饮食<small>体重最终的变化</small></div>
          <div className="w-plan-v">{cell(COMP_SHORT)}</div>
          <div className="w-plan-v is-main">{cell(COMP_LONG)}</div>
        </div>
      </div>

      <p className="w-note">
        两列的差别是运动代偿：多走消耗的能量，有一部分会被多吃和少动抵消，短期研究平均抵消 18%，持续约 80 周的研究接近 84%。
        <Link to={`/ch/energy-balance?w=${weight}&s=${steps}#算一算`}>和饮食、训练一起算 →</Link>
      </p>

      <p className="w-foot">
        步行消耗按约 0.5 kcal/kg/km、步长 {STEP_M} m 估算，每分钟约 {STEPS_PER_MIN} 步为本书估计。
        体重变化按每 24 kcal/天 对应 1 kg 估算，个体误差在几公斤量级；多走的步数要长期保持。
      </p>
    </div>
  )
}
