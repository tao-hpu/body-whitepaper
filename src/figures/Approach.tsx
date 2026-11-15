import { Figure } from './Figure'

// 第 01 节「为什么要等很久」：行为改变后体重走向新落点的过程。
// 只用到 Hall 2011 的两个点：约 1 年走完一半，约 3 年走完 95%。中间用单调三次 Hermite 曲线平滑连接，形状是示意。
const XS = [0, 1, 3, 4]
const YS = [0, 0.5, 0.95, 0.99]
const MS = [0.7, 0.36, 0.1, 0.02]

function progress(t: number): number {
  let i = 0
  while (i < XS.length - 2 && t > XS[i + 1]) i++
  const h = XS[i + 1] - XS[i]
  const s = (t - XS[i]) / h
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1
  const h10 = s ** 3 - 2 * s ** 2 + s
  const h01 = -2 * s ** 3 + 3 * s ** 2
  const h11 = s ** 3 - s ** 2
  return h00 * YS[i] + h10 * h * MS[i] + h01 * YS[i + 1] + h11 * h * MS[i + 1]
}

const X0 = 70, X1 = 450, Y0 = 60, Y1 = 230
const px = (t: number) => X0 + (t / 4) * (X1 - X0)
const py = (p: number) => Y0 + p * (Y1 - Y0)

export function Approach() {
  const pts = Array.from({ length: 81 }, (_, k) => k / 20)
  const d = pts.map((t, k) => `${k ? 'L' : 'M'}${px(t).toFixed(1)} ${py(progress(t)).toFixed(1)}`).join(' ')
  const tMid = 0.375
  return (
    <Figure title="体重走向新落点" viewBox="0 0 480 290"
      caption="改变行为后，体重朝新落点移动：约 1 年走完总变化量的一半，约 3 年走完 95%。曲线形状为示意，只有这两个点来自研究。三到六个月时的体重还在中途。">
      {/* 坐标轴 */}
      <line x1={X0} y1={Y0 - 20} x2={X0} y2={Y1 + 12} className="f-axis" />
      <line x1={X0} y1={Y1 + 12} x2={X1} y2={Y1 + 12} className="f-axis" />
      {[0, 1, 2, 3, 4].map((t) => (
        <text key={t} x={px(t)} y={Y1 + 34} className="f-small f-center">{t === 0 ? '0' : `${t} 年`}</text>
      ))}

      {/* 起点与落点 */}
      <text x={X0 - 8} y={Y0 + 5} className="f-small f-end">现在</text>
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} className="f-dash" />
      <text x={X0 - 8} y={Y1 + 5} className="f-small f-end">新落点</text>

      <path d={d} className="f-curve" />

      {/* 1 年：一半 */}
      <line x1={px(1)} y1={py(0.5)} x2={px(1)} y2={Y1 + 12} className="f-line" />
      <circle cx={px(1)} cy={py(0.5)} r="5" className="f-green" />
      <text x={px(1) + 10} y={py(0.5) - 8} className="f-label">走完一半</text>

      {/* 3 年：95% */}
      <line x1={px(3)} y1={py(0.95)} x2={px(3)} y2={Y1 + 12} className="f-line" />
      <circle cx={px(3)} cy={py(0.95)} r="5" className="f-green" />
      <text x={px(3)} y={py(0.95) - 14} className="f-label f-center">走完 95%</text>

      {/* 三到六个月 */}
      <circle cx={px(tMid)} cy={py(progress(tMid))} r="5" className="f-accent" />
      <text x={px(tMid) - 6} y={Y0 - 26} className="f-small">3–6 个月：中途读数</text>
      <line x1={px(tMid)} y1={Y0 - 20} x2={px(tMid)} y2={py(progress(tMid)) - 7} className="f-line" />
    </Figure>
  )
}
