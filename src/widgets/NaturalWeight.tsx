import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { COMP_LONG, COMP_SHORT, KCAL_PER_BOWL, KCAL_PER_KG_DAY, KCAL_PER_KG_PER_1000_STEPS } from './model'
import { Slider } from './Slider'

interface Plan {
  sessions: number
  kcalPerSession: number
  extraSteps: number
}

const DEFAULT_PLAN: Plan = { sessions: 3, kcalPerSession: 250, extraSteps: 5000 }

function exerciseKcal(p: Plan, weight: number): number {
  return (p.sessions * p.kcalPerSession) / 7
    + (p.extraSteps / 1000) * KCAL_PER_KG_PER_1000_STEPS * weight
}

// 只加运动、不改饮食时的落点。
function plateau(weight: number, p: Plan, comp: number): number {
  return weight - (exerciseKcal(p, weight) * (1 - comp)) / KCAL_PER_KG_DAY
}

// 要停在 target，每天需长期少吃多少；运动部分按代偿打折后先扣掉。
function cutNeeded(weight: number, target: number, exercise: number, comp: number): number {
  return Math.max(0, (weight - target) * KCAL_PER_KG_DAY - exercise * (1 - comp))
}

const kg = (n: number) => `${n.toFixed(1)} kg`

function Food({ kcal }: { kcal: number }) {
  if (kcal < 20) return <>不用少吃</>
  const bowls = Math.round((kcal / KCAL_PER_BOWL) * 2) / 2
  return (
    <>
      {Math.round(kcal / 10) * 10} kcal
      <small>{bowls < 0.5 ? '不到半碗米饭' : `约 ${bowls} 碗米饭`}</small>
    </>
  )
}

export function NaturalWeight() {
  // 从第 03 节带过来的 ?w=现在体重&t=目标体重，作为初始值。
  const [params] = useSearchParams()
  // 不合法（缺失、非数字、越界）时返回 undefined，用默认值，也不标「来自第 03 节」。
  const num = (k: string, lo: number, hi: number): number | undefined => {
    const raw = params.get(k)
    const v = raw === null || raw === '' ? NaN : Number(raw)
    return Number.isFinite(v) && v >= lo && v <= hi ? Math.round(v * 2) / 2 : undefined
  }
  const [initW] = useState(() => num('w', 45, 130))
  const [initT] = useState(() => num('t', 40, 130))
  const [weight, setWeight] = useState(initW ?? 80)
  // 没带目标时，默认比现在轻 4 kg。
  const [target, setTarget] = useState(initT ?? Math.max(40, (initW ?? 80) - 4))
  const fromTarget = initT !== undefined
  // 第 09 节带过来的 ?s=每天多走的步数。
  const [plan, setPlan] = useState<Plan>(() => {
    const raw = params.get('s')
    const s = raw === null || raw === '' ? NaN : Number(raw)
    return Number.isFinite(s) && s >= 0 && s <= 12000
      ? { ...DEFAULT_PLAN, extraSteps: Math.round(s / 500) * 500 }
      : DEFAULT_PLAN
  })
  const setP = (k: keyof Plan) => (v: number) => setPlan((p) => ({ ...p, [k]: v }))

  const t = Math.min(target, weight)
  const ex = exerciseKcal(plan, weight)
  const planText = `每周练 ${plan.sessions} 次、每天多走 ${plan.extraSteps} 步`

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 自然体重落点</div>
      <Slider label="现在稳定的体重" unit=" kg" value={weight} min={45} max={130} step={0.5} onChange={setWeight}
        hint="最近一两个月基本不动的体重" />
      <Slider label="目标体重" unit=" kg" value={t} min={40} max={weight} step={0.5} onChange={setTarget}
        hint={fromTarget ? '来自第 03 节的推荐目标' : undefined} />
      {!fromTarget && (
        <p className="w-lead">
          不知道定多少？<Link to="/ch/target-weight">到第 03 节按身高、年龄算一个推荐值 →</Link>
        </p>
      )}

      <div className="w-plans">
        <div className="w-plans-head">
          <span />
          <span>头半年左右</span>
          <span>长期（按这列做计划）</span>
        </div>
        <div className="w-plan">
          <div className="w-plan-name">只运动，不改饮食<small>{planText}，体重最终停在</small></div>
          <div className="w-plan-v">{kg(plateau(weight, plan, COMP_SHORT))}</div>
          <div className="w-plan-v is-main">{kg(plateau(weight, plan, COMP_LONG))}</div>
        </div>
        <div className="w-plan">
          <div className="w-plan-name">只改饮食<small>要停在 {t} kg，每天长期少吃</small></div>
          <div className="w-plan-v is-main is-span"><Food kcal={cutNeeded(weight, t, 0, 0)} /></div>
        </div>
        <div className="w-plan">
          <div className="w-plan-name">运动加饮食<small>{planText}，要停在 {t} kg，每天还需少吃</small></div>
          <div className="w-plan-v"><Food kcal={cutNeeded(weight, t, ex, COMP_SHORT)} /></div>
          <div className="w-plan-v is-main"><Food kcal={cutNeeded(weight, t, ex, COMP_LONG)} /></div>
        </div>
      </div>

      <p className="w-note">
        两列的差别是运动代偿：运动多消耗的能量，有一部分会被多吃和少动抵消。短期研究平均抵消 18%，
        持续约 80 周的研究接近 84%。饮食那一项不受代偿影响，只有一个数。
        「少吃」指相对现在稳定时的饮食，要长期保持。走完一半变化约需 1 年，走完 95% 约需 3 年。
      </p>

      <details className="w-more">
        <summary>自己调运动量</summary>
        <Slider label="每周训练" unit=" 次" value={plan.sessions} min={0} max={7} step={1} onChange={setP('sessions')} />
        <Slider label="每次训练消耗" unit=" kcal" value={plan.kcalPerSession} min={100} max={600} step={10}
          onChange={setP('kcalPerSession')} hint="不知道就用默认的 250" />
        <Slider label="每天多走" unit=" 步" value={plan.extraSteps} min={0} max={12000} step={500} onChange={setP('extraSteps')} />
      </details>

      <p className="w-foot">
        按每 24 kcal/天 对应 1 kg 估算，个体误差在几公斤量级。米饭按一小碗约 150 g 熟重、约 170 kcal 估算。
      </p>
    </div>
  )
}
