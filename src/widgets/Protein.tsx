import { useState } from 'react'
import { Slider } from './Slider'

// 配合抗阻训练时，蛋白质超过约 1.6 g/kg/天 后去脂体重不再继续增加（Morton 2018）。
const G_PER_KG = 1.6
const MEALS = 3

// 常见食物成分约数，本书取整。unit 为一份的说法，per 为一份的蛋白质克数。
interface Food { name: string; per: number; amount: number; unit: 'g' | 'ml' | '个'; round: number }
const FOODS: Food[] = [
  { name: '鸡胸肉', per: 24, amount: 100, unit: 'g', round: 10 },
  { name: '瘦牛肉', per: 20, amount: 100, unit: 'g', round: 10 },
  { name: '虾仁', per: 19, amount: 100, unit: 'g', round: 10 },
  { name: '北豆腐', per: 12, amount: 100, unit: 'g', round: 10 },
  { name: '鸡蛋', per: 6, amount: 1, unit: '个', round: 1 },
  { name: '牛奶', per: 8, amount: 250, unit: 'ml', round: 50 },
]

export function Protein() {
  const [weight, setWeight] = useState(80)
  const day = weight * G_PER_KG
  const meal = day / MEALS

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 每天吃多少蛋白质</div>
      <Slider label="体重" unit=" kg" value={weight} min={40} max={150} step={1} onChange={setWeight}
        hint="体重偏重的，可以按目标体重填" />

      <div className="w-out">
        <div className="w-big">
          <span className="w-big-num">{Math.round(day)}</span>
          <span className="w-big-unit">g / 天</span>
          <span className="w-big-sub">按 {G_PER_KG} g/kg 计算；分三餐，每餐约 {Math.round(meal)} g</span>
        </div>
      </div>

      <div className="w-sub">
        <div className="w-label">一餐的 {Math.round(meal)} g，只靠一种食物需要</div>
        <table className="w-table">
          <tbody>
            {FOODS.map((f) => {
              const n = Math.round((meal / f.per) * f.amount / f.round) * f.round
              return (
                <tr key={f.name}>
                  <td>{f.name}<small>{f.amount} {f.unit} 约 {f.per} g 蛋白质</small></td>
                  <td className="num">约 {n} {f.unit}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="w-note">
        {G_PER_KG} g/kg 是在配合抗阻训练的研究里测得的：超过这个量，多吃的蛋白质不再让去脂体重继续增加。
        实际一餐多是几样搭配，比如两个鸡蛋加一份肉或豆腐。
      </p>

      <p className="w-foot">
        食物的蛋白质含量为常见食物成分约数，本书取整；肉类按生重计。表中数量按只吃一种食物凑够一餐的量换算，肉类取整到 10 g，牛奶取整到 50 ml。
      </p>
    </div>
  )
}
