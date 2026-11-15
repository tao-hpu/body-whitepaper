import { Figure } from './Figure'

// 第 07 节：哑铃太轻时加难度的顺序，画成往上走的台阶。
const steps = [
  ['加次数', '25–30 次'],
  ['放慢下放', '3 秒'],
  ['停顿', '1–2 秒'],
  ['改单侧', '单腿'],
  ['换重哑铃', '最后一步'],
]

export function Harder() {
  const W = 88, H = 34, X0 = 12, Y0 = 220
  return (
    <Figure title="哑铃太轻时加难度的顺序" viewBox="0 0 480 250"
      caption="同一对哑铃，先用前四步把难度往上加；四步都用完还嫌轻，再换更重的哑铃。">
      {steps.map(([name, note], i) => {
        const x = X0 + i * (W + 4)
        const h = H * (i + 1.4)
        const y = Y0 - h
        const last = i === steps.length - 1
        return (
          <g key={name}>
            <rect x={x} y={y} width={W} height={h} rx="5" className={last ? 'f-accent-soft' : i % 2 ? 'f-soft' : 'f-tint'} />
            <text x={x + W / 2} y={y + 24} className="f-strong f-center">{i + 1}</text>
            <text x={x + W / 2} y={y + 46} className="f-label f-center">{name}</text>
            <text x={x + W / 2} y={Y0 + 22} className="f-small f-center">{note}</text>
          </g>
        )
      })}
      <line x1={X0} y1={Y0} x2={X0 + 5 * (W + 4) - 4} y2={Y0} className="f-axis" />
    </Figure>
  )
}
