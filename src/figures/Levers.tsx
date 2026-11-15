import { Figure } from './Figure'

// 第 06 节：比重表的三行，各取区间中点，归一到 100%。
const parts = [
  { name: '饮食', fill: 'f-deep', text: 'f-in' },
  { name: '抗阻', fill: 'f-accent', text: 'f-in' },
  { name: '日常活动', fill: 'f-soft', text: 'f-label' },
  { name: '有氧', fill: 'f-accent-soft', text: 'f-label' },
]
const rows = [
  { goal: '秤上掉多少', v: [77.5, 2.5, 12.5, 7.5] },
  { goal: '减掉的是脂肪', v: [57.5, 22.5, 12.5, 5] },
  { goal: '减完守得住', v: [40, 27.5, 22.5, 10] },
]

const X0 = 20
const W = 440

export function Levers() {
  return (
    <Figure title="各项杠杆的比重" viewBox="0 0 480 262"
      caption="三行对应上表的三个目标，每段取表中区间的中点，再按总和 100% 换算。这些是本书估计，各项的先后顺序比具体百分比可靠。">
      {parts.map((p, i) => (
        <g key={p.name}>
          <rect x={X0 + i * 112} y={10} width={16} height={16} rx={3} className={p.fill} />
          <text x={X0 + i * 112 + 22} y={24} className="f-small">{p.name}</text>
        </g>
      ))}
      {rows.map((r, ri) => {
        const total = r.v.reduce((a, b) => a + b, 0)
        const y = 80 + ri * 66
        let x = X0
        return (
          <g key={r.goal}>
            <text x={X0} y={y - 10} className="f-label">{r.goal}</text>
            {r.v.map((v, i) => {
              const w = (v / total) * W
              const pct = Math.round((v / total) * 100)
              const cx = x + w / 2
              const seg = (
                <g key={i}>
                  <rect x={x} y={y} width={w} height={32} className={parts[i].fill} />
                  {w >= 28 && <text x={cx} y={y + 22} className={`${parts[i].text} f-center`}>{pct}%</text>}
                </g>
              )
              x += w
              return seg
            })}
          </g>
        )
      })}
    </Figure>
  )
}
