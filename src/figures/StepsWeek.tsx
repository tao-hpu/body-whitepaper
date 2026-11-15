import { Figure } from './Figure'

// 第 09 节：一周的消耗分布。每天多走 4000 步约 105 kcal，对比每周三次、每次 250 kcal 的有氧。
const days = ['一', '二', '三', '四', '五', '六', '日']
const K = 0.28 // 每 kcal 的像素高度
const rows = [
  { title: '每天多走 4000 步', base: 120, v: days.map(() => 105), total: '约 735', fill: 'f-deep' },
  { title: '每周三次有氧', base: 252, v: [250, 0, 250, 0, 250, 0, 0], total: '3 × 250', fill: 'f-accent' },
]

export function StepsWeek() {
  return (
    <Figure title="一周的消耗分布" viewBox="0 0 480 284"
      caption="单位是千卡，按 75 kg 估算。每天多走 4000 步，一周合计约 735 千卡，和每周三次、每次 250 千卡的有氧差不多；区别是步数分散在每一天，有氧集中在训练日。">
      {rows.map(r => (
        <g key={r.title}>
          <text x="20" y={r.base - 96} className="f-label">{r.title}</text>
          <line x1="14" y1={r.base} x2="360" y2={r.base} className="f-axis" />
          {r.v.map((v, i) => v > 0 && (
            <g key={i}>
              <rect x={22 + i * 48} y={r.base - v * K} width={34} height={v * K} rx={2} className={r.fill} />
              <text x={39 + i * 48} y={r.base - v * K - 7} className="f-small f-center">{v}</text>
            </g>
          ))}
          <text x="470" y={r.base - 6} className="f-strong f-end">{r.total}</text>
          <text x="470" y={r.base - 30} className="f-small f-end">每周</text>
        </g>
      ))}
      {days.map((d, i) => (
        <text key={d} x={39 + i * 48} y="274" className="f-small f-center">{d}</text>
      ))}
    </Figure>
  )
}
