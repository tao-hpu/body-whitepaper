import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KCAL_PER_KG_DAY } from './model'
import { Slider } from './Slider'

// 成人体脂率估算：BF% = 1.20 × BMI + 0.23 × 年龄 − 10.8 × 性别(男=1) − 5.4（Deurenberg 1991，SEE 4.1%）。
// 华人在相同体脂下 BMI 比白人低约 1.9（Deurenberg 1998），代入公式前先加回去。
const CHINESE_BMI_OFFSET = 1.9
// 中国成人超重线 BMI 24（Zhou 2002；WS/T 428-2013）。
const BMI_OVERWEIGHT = 24
const BMI_UNDER = 18.5
// 「四分之一规则」：节食减掉的体重里约 1/4 是去脂体重（Heymsfield 2014 综述）。
const LEAN_SHARE_DIET_ONLY = 0.25

type Sex = 'm' | 'f'

function bodyFat(bmi: number, age: number, sex: Sex): number {
  const s = sex === 'm' ? 1 : 0
  return (1.2 * (bmi + CHINESE_BMI_OFFSET) + 0.23 * age - 10.8 * s - 5.4) / 100
}

function bmiLabel(bmi: number): string {
  if (bmi < BMI_UNDER) return '偏瘦'
  if (bmi < BMI_OVERWEIGHT) return '正常'
  if (bmi < 28) return '超重'
  return '肥胖'
}

export function TargetWeight() {
  const [sex, setSex] = useState<Sex>('m')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(172)
  const [weight, setWeight] = useState(80)
  const [useScale, setUseScale] = useState(false)
  const [scaleBf, setScaleBf] = useState(30)
  const [gain, setGain] = useState(3)

  const h = height / 100
  const bmi = weight / (h * h)
  const bf = useScale ? scaleBf / 100 : bodyFat(bmi, age, sex)
  const fat = weight * bf
  const lean = weight - fat
  const target = bodyFat(BMI_OVERWEIGHT, age, sex)

  // 只节食：每减 1 kg，其中 1/4 是去脂体重，3/4 是脂肪。解 (fat − 3/4·Δ) / (weight − Δ) = target。
  const dietDrop = (fat - target * weight) / (1 - LEAN_SHARE_DIET_ONLY - target)
  const routes = [
    { name: '只节食，不练', note: '减掉的体重里约 1/4 是肌肉等去脂组织', w: weight - dietDrop },
    { name: '节食加抗阻训练，保住肌肉', note: '去脂体重不变', w: lean / (1 - target) },
    { name: `保住肌肉，再增加 ${gain} kg`, note: '去脂体重增加，体脂率相同', w: (lean + gain) / (1 - target) },
  ]
  const above = bf > target

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 推荐目标体重</div>

      <div className="w-row">
        <span className="w-label">性别</span>
        <span className="w-seg" role="radiogroup" aria-label="性别">
          {(['m', 'f'] as const).map((s) => (
            <button key={s} type="button" role="radio" aria-checked={sex === s}
              className={sex === s ? 'is-on' : ''} onClick={() => setSex(s)}>
              {s === 'm' ? '男' : '女'}
            </button>
          ))}
        </span>
        <span />
      </div>
      <Slider label="年龄" unit=" 岁" value={age} min={18} max={75} step={1} onChange={setAge} />
      <Slider label="身高" unit=" cm" value={height} min={145} max={200} step={1} onChange={setHeight} />
      <Slider label="现在稳定的体重" unit=" kg" value={weight} min={40} max={150} step={0.5} onChange={setWeight}
        hint="正常吃、不刻意控制时的体重" />
      <label className="w-check">
        <input type="checkbox" checked={useScale} onChange={(e) => setUseScale(e.target.checked)} />
        我有体脂秤读数（比按身高体重估算更准）
      </label>
      {useScale && (
        <Slider label="体脂率" unit="%" value={scaleBf} min={8} max={50} step={0.5} onChange={setScaleBf} />
      )}

      <div className="w-facts">
        <div><span>BMI</span><b>{bmi.toFixed(1)}</b><small>{bmiLabel(bmi)}</small></div>
        <div><span>体脂率{useScale ? '' : '（估算）'}</span><b>{(bf * 100).toFixed(1)}%</b><small>脂肪 {fat.toFixed(1)} kg</small></div>
        <div><span>去脂体重</span><b>{lean.toFixed(1)} kg</b><small>肌肉、骨骼、器官、水分</small></div>
        <div><span>目标体脂率</span><b>{(target * 100).toFixed(1)}%</b><small>BMI 24 对应的体脂</small></div>
      </div>

      {above ? (
        <div className="w-plans">
          {routes.map((r) => {
            const b = r.w / (h * h)
            const cut = (weight - r.w) * KCAL_PER_KG_DAY
            return (
              <div className="w-plan w-plan-2" key={r.name}>
                <div className="w-plan-name">{r.name}<small>{r.note}</small></div>
                <div className="w-plan-v is-main">
                  {r.w.toFixed(1)} kg
                  <small>BMI {b.toFixed(1)}{cut > 0 ? `，长期每天少吃约 ${Math.round(cut / 10) * 10} kcal` : ''}</small>
                  {cut > 0 && (
                    <Link className="w-go" to={`/ch/energy-balance?w=${weight}&t=${r.w.toFixed(1)}#算一算`}>
                      按这个目标算怎么做 →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="w-note">现在的体脂率已经在目标线以下，不需要减重。</p>
      )}

      <details className="w-more">
        <summary>调整增肌量</summary>
        <Slider label="打算增加的肌肉" unit=" kg" value={gain} min={0} max={8} step={0.5} onChange={setGain} />
      </details>

      <p className="w-foot">
        按身高体重估算体脂的误差约 ±4 个百分点，肥胖时偏高；有体脂秤读数时以读数为准。
        「每天少吃」按第 01 节的每 24 kcal/天 对应 1 kg 计算，没有计入运动；加上运动后的方案，点各路线下的链接到第 01 节看。
        身高 {height} cm 的 BMI 正常区间约 {(BMI_UNDER * h * h).toFixed(1)}–{(23.9 * h * h).toFixed(1)} kg。
      </p>
    </div>
  )
}
