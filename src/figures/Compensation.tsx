import { Figure } from './Figure'

// 第 02 节：运动多消耗的能量里，短期和长期各有多少被代偿抵消（Riou 2015：平均 18%，约 80 周的研究接近 84%）。
const X = 30, W = 420, H = 40

function Bar({ y, name, kept }: { y: number; name: string; kept: number }) {
  const wk = (W * kept) / 100
  return (
    <g>
      <text x={X} y={y - 10} className="f-label">{name}</text>
      <rect x={X} y={y} width={wk} height={H} className="f-deep" />
      <rect x={X + wk} y={y} width={W - wk} height={H} className="f-accent-soft" />
      <text x={X + wk / 2} y={y + 26} className="f-in f-center">{kept}%</text>
      <text x={X + wk + (W - wk) / 2} y={y + 26} className="f-label f-center">{100 - kept}%</text>
    </g>
  )
}

export function Compensation() {
  return (
    <Figure title="能量代偿：短期与长期" viewBox="0 0 480 250"
      caption="每条横条代表运动多消耗的全部能量。短期平均只有 18% 被多吃和少动抵消；持续约 80 周的研究里，抵消的部分接近 84%，留下来变成减重的只有 16%。">
      <Bar y={44} name="短期（全部研究平均）" kept={82} />
      <Bar y={136} name="长期（约 80 周）" kept={16} />
      <rect x={X} y={204} width="16" height="16" className="f-deep" />
      <text x={X + 24} y={217} className="f-small">留下，变成减重</text>
      <rect x={X + 190} y={204} width="16" height="16" className="f-accent-soft" />
      <text x={X + 214} y={217} className="f-small">被多吃、少动抵消</text>
    </Figure>
  )
}
