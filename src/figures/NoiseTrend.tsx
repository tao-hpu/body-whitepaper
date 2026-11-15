import { Figure } from './Figure'

// 第 12 节：示意数据。真实体重从 80 kg 起每周降 0.25 kg（和正文的例子一致），每天叠加约 0.3 kg 的随机波动（固定种子生成后写死）。
const daily = [79.9, 80.1, 79.9, 79.8, 79.5, 79.8, 80.1, 79.8, 80.0, 79.7, 79.8, 79.7, 79.0, 79.8,
  79.7, 79.6, 78.9, 78.9, 79.0, 79.2, 79.4, 79.2, 79.4, 79.0, 79.3, 79.2, 78.8, 79.6]

const X0 = 54, X1 = 462, Y0 = 26, Y1 = 214
const MIN = 78.2, MAX = 80.4
const sx = (d: number) => X0 + (d / (daily.length - 1)) * (X1 - X0)
const sy = (w: number) => Y0 + ((MAX - w) / (MAX - MIN)) * (Y1 - Y0)

const mean = daily.map((_, i) => (i < 6 ? null : daily.slice(i - 6, i + 1).reduce((a, b) => a + b, 0) / 7))

export function NoiseTrend() {
  const line = mean.map((m, i) => (m == null ? '' : `${sx(i).toFixed(1)},${sy(m).toFixed(1)}`)).filter(Boolean).join(' ')
  return (
    <Figure title="每天读数与 7 日均值" viewBox="0 0 480 262"
      caption="示意数据：真实体重每周下降 0.25 kg，和上文的例子相同，每天的读数上下跳动，相邻两天的涨落常和趋势方向相反。7 日均值从第 7 天起才有，它的走向和真实趋势一致。">
      {[78.5, 79, 79.5, 80].map(w => (
        <g key={w}>
          <line x1={X0} y1={sy(w)} x2={X1} y2={sy(w)} className="f-line" />
          <text x={X0 - 8} y={sy(w) + 5} className="f-small f-end">{w}</text>
        </g>
      ))}
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} className="f-axis" />
      {[1, 7, 14, 21, 28].map(d => (
        <text key={d} x={sx(d - 1)} y={Y1 + 22} className="f-small f-center">{d}</text>
      ))}
      <text x={X1} y={Y1 + 44} className="f-small f-end">第几天</text>
      <text x={X0 - 8} y={14} className="f-small f-end">kg</text>
      {daily.map((w, i) => <circle key={i} cx={sx(i)} cy={sy(w)} r={4} className="f-accent" />)}
      <polyline points={line} className="f-curve" strokeLinejoin="round" />
      <circle cx={X0 + 8} cy={Y1 + 39} r={4} className="f-accent" />
      <text x={X0 + 18} y={Y1 + 44} className="f-small">每天读数</text>
      <line x1={X0 + 104} y1={Y1 + 39} x2={X0 + 128} y2={Y1 + 39} className="f-curve" />
      <text x={X0 + 134} y={Y1 + 44} className="f-small">7 日均值</text>
    </Figure>
  )
}
