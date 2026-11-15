import { Figure } from './Figure'

// 第 03 节：计算器默认值（男，30 岁，172 cm，80 kg）下三条路线的脂肪与去脂体重。
// 算法与 src/widgets/TargetWeight.tsx 相同：Deurenberg 1991 公式，BMI 先加 1.9；目标体脂率 = BMI 24 对应值。
function bodyFat(bmi: number): number {
  return (1.2 * (bmi + 1.9) + 0.23 * 30 - 10.8 - 5.4) / 100
}
const WEIGHT = 80, H = 1.72, GAIN = 3
const fat0 = WEIGHT * bodyFat(WEIGHT / (H * H))
const lean0 = WEIGHT - fat0
const target = bodyFat(24)
const drop = (fat0 - target * WEIGHT) / (1 - 0.25 - target)
const keepW = lean0 / (1 - target)
const gainW = (lean0 + GAIN) / (1 - target)

const bars = [
  { name: '现在', fat: fat0, lean: lean0 },
  { name: '只节食', fat: fat0 - 0.75 * drop, lean: lean0 - 0.25 * drop },
  { name: '节食加训练', fat: keepW - lean0, lean: lean0 },
  { name: '再增肌 3 kg', fat: gainW - lean0 - GAIN, lean: lean0 + GAIN },
]

const BASE = 270, K = 2.4, BW = 76
const cx = (i: number) => 72 + i * 110

export function BodyParts() {
  return (
    <Figure title="三条路线的体重组成" viewBox="0 0 480 330"
      caption={`按计算器默认值（30 岁男性，172 cm，80 kg）计算。三个目标的体脂率都是 ${(target * 100).toFixed(1)}%，体重的差别来自去脂体重：只节食会丢一部分，加训练保住，再增肌就更多。`}>
      <rect x="24" y="12" width="16" height="16" className="f-soft" />
      <text x="48" y="25" className="f-small">脂肪</text>
      <rect x="110" y="12" width="16" height="16" className="f-deep" />
      <text x="134" y="25" className="f-small">去脂体重</text>

      <line x1="16" y1={BASE} x2="464" y2={BASE} className="f-axis" />
      {bars.map((b, i) => {
        const hl = b.lean * K, hf = b.fat * K
        const x = cx(i) - BW / 2
        const total = b.fat + b.lean
        return (
          <g key={b.name}>
            <rect x={x} y={BASE - hl} width={BW} height={hl} className="f-deep" />
            <rect x={x} y={BASE - hl - hf} width={BW} height={hf} className="f-soft" />
            <text x={cx(i)} y={BASE - hl / 2 + 6} className="f-in f-center">{b.lean.toFixed(1)}</text>
            <text x={cx(i)} y={BASE - hl - hf / 2 + 6} className="f-label f-center">{b.fat.toFixed(1)}</text>
            <text x={cx(i)} y={BASE - hl - hf - 8} className="f-strong f-center">{total.toFixed(1)} kg</text>
            <text x={cx(i)} y={BASE + 22} className="f-label f-center">{b.name}</text>
            <text x={cx(i)} y={BASE + 44} className="f-small f-center">
              体脂 {(b.fat / total * 100).toFixed(1)}%
            </text>
          </g>
        )
      })}
    </Figure>
  )
}
