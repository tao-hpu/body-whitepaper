import { Figure } from './Figure'

// 第 08 节：三个档位。块的高度按每周次数画，最低一档就是行为地板。
const tiers = [
  { name: '正常周', n: '3 次', t: '35–45 分钟' },
  { name: '忙的周', n: '2 次', t: '约 20 分钟' },
  { name: '极限周', n: '1 次', t: '约 15 分钟' },
]
const BASE = 236
const UNIT = 52

export function BusyTiers() {
  return (
    <Figure title="三个档位" viewBox="0 36 480 238"
      caption="块的高度对应每周训练次数。忙的时候往下降一档，最低到每周一次 15 分钟，不降到零；忙完直接回到正常周。">
      {tiers.map((t, i) => {
        const h = (3 - i) * UNIT + 4
        const x = 24 + i * 148
        const top = BASE - h
        return (
          <g key={t.name}>
            <text x={x + 64} y={top - 12} className="f-label f-center">{t.name}</text>
            <rect x={x} y={top} width={128} height={h} rx={4} className={i === 0 ? 'f-deep' : i === 1 ? 'f-soft' : 'f-accent-soft'} />
            <text x={x + 64} y={top + 24} className={`${i === 0 ? 'f-in' : 'f-strong'} f-center`}>{t.n}</text>
            <text x={x + 64} y={top + 45} className={`${i === 0 ? 'f-in-small' : 'f-small'} f-center`}>{t.t}</text>
          </g>
        )
      })}
      <line x1="14" y1={BASE} x2="466" y2={BASE} className="f-axis" />
      <text x="24" y={BASE + 26} className="f-small">每周次数</text>
      <text x="456" y={BASE + 26} className="f-strong f-end">地板：每周 1 次</text>
    </Figure>
  )
}
