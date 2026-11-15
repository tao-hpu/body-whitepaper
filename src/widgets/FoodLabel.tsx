import { useState } from 'react'
import { KCAL_PER_BOWL } from './model'

const KJ_PER_KCAL = 4.184
// GB 28050-2011 的能量折算系数，kJ/g。
const KJ_PROTEIN = 17
const KJ_FAT = 37
const KJ_CARB = 17
// 验算差超过这个比例时提示（本书估计）。
const MISMATCH = 0.1
// 1 g 盐约含 0.4 g 钠；世界卫生组织建议每天盐低于 5 g。
const SALT_PER_SODIUM = 2.5
const SALT_DAY_G = 5

type Key = 'kj' | 'protein' | 'fat' | 'carb' | 'sodium' | 'pack'
const FIELDS: { key: Key; label: string; unit: string }[] = [
  { key: 'kj', label: '能量', unit: 'kJ' },
  { key: 'protein', label: '蛋白质', unit: 'g' },
  { key: 'fat', label: '脂肪', unit: 'g' },
  { key: 'carb', label: '碳水化合物', unit: 'g' },
  { key: 'sodium', label: '钠', unit: 'mg' },
  { key: 'pack', label: '一包多少', unit: 'g' },
]
const SAMPLE: Record<Key, string> = { kj: '2000', protein: '7', fat: '20', carb: '65', sodium: '400', pack: '100' }

export function FoodLabel() {
  const [v, setV] = useState(SAMPLE)
  const n = (k: Key) => {
    const x = parseFloat(v[k])
    return Number.isFinite(x) && x > 0 ? x : 0
  }

  const kcal100 = n('kj') / KJ_PER_KCAL
  const share = n('pack') / 100
  const kcalPack = kcal100 * share
  const bowls = Math.round((kcalPack / KCAL_PER_BOWL) * 2) / 2
  const calc = KJ_PROTEIN * n('protein') + KJ_FAT * n('fat') + KJ_CARB * n('carb')
  const gap = n('kj') > 0 ? (calc - n('kj')) / n('kj') : 0
  const salt = (n('sodium') * share * SALT_PER_SODIUM) / 1000

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 包装标签换算</div>
      <p className="w-note w-fields-lead">照包装上「每 100 g」那一列填，框里是一种饼干的示例。</p>
      <div className="w-fields">
        {FIELDS.map((f) => (
          <label className="w-field" key={f.key}>
            <span>{f.label}</span>
            <span className="w-field-box">
              <input className="w-num" type="number" inputMode="decimal" min={0} value={v[f.key]}
                onChange={(e) => setV((s) => ({ ...s, [f.key]: e.target.value }))} />
              <em>{f.unit}</em>
            </span>
          </label>
        ))}
      </div>

      <div className="w-sub">
        <table className="w-table">
          <tbody>
            <tr><td>每 100 g 的能量</td><td className="num">约 {Math.round(kcal100)} kcal</td></tr>
            <tr>
              <td>一包 {n('pack')} g 的能量</td>
              <td className="num">约 {Math.round(kcalPack)} kcal
                <small>{bowls < 0.5 ? '不到半碗米饭' : `约 ${bowls} 碗米饭`}</small></td>
            </tr>
            <tr>
              <td>按三大营养素验算<small>每 100 g，和标注的能量比</small></td>
              <td className="num">{Math.round(calc)} kJ
                <small>{gap >= 0 ? '+' : '−'}{Math.abs(gap * 100).toFixed(1)}%</small></td>
            </tr>
            <tr>
              <td>一包的盐</td>
              <td className="num">约 {salt.toFixed(1)} g
                <small>每天 {SALT_DAY_G} g 的 {Math.round((salt / SALT_DAY_G) * 100)}%</small></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="w-note">
        {n('kj') === 0
          ? '填上标注的能量才能验算。'
          : Math.abs(gap) > MISMATCH
            ? '和标注的能量差得较多，某一项可能标得不准。'
            : `验算结果和标注的能量相差在 ${MISMATCH * 100}% 以内。`}
      </p>

      <p className="w-foot">
        1 kcal ≈ 4.184 kJ。验算按蛋白质 17、脂肪 37、碳水 17 kJ/g（GB 28050-2011），差超过 {MISMATCH * 100}% 才提示，这条线是本书估计。
        盐按钠的毫克数 × 2.5 折算，每天 5 g 按世界卫生组织的建议。米饭按一小碗约 150 g 熟重、约 170 kcal 估算。
      </p>
    </div>
  )
}
