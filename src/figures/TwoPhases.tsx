import { Figure } from './Figure'

// 第 05 节：减脂期有终点、看体重；维持期没有终点、看行为。上方体重线为示意。
export function TwoPhases() {
  return (
    <Figure title="减脂期与维持期" viewBox="0 0 480 250"
      caption="减脂期靠一段有起止的缺口，用目标体重检查进度。到达目标后进入维持期，撤掉缺口，只守一组行为，这一段不设结束。上方体重线为示意。">
      <text x="16" y="24" className="f-small">体重</text>
      <path d="M20 44 C80 50 150 96 206 104 L440 104" className="f-curve" />
      <line x1="440" y1="104" x2="468" y2="104" className="f-flow" markerEnd="url(#fig-arrow)" />
      <line x1="206" y1="34" x2="206" y2="232" className="f-dash" />
      <text x="214" y="56" className="f-small">到达目标</text>

      <rect x="16" y="126" width="182" height="106" rx="8" className="f-tint" />
      <text x="107" y="154" className="f-strong f-center">减脂期</text>
      <text x="107" y="180" className="f-small f-center">看目标体重</text>
      <text x="107" y="202" className="f-small f-center">有缺口</text>
      <text x="107" y="224" className="f-small f-center">有终点</text>

      <rect x="214" y="126" width="224" height="106" rx="8" className="f-panel" />
      <text x="326" y="154" className="f-strong f-center">维持期</text>
      <text x="326" y="180" className="f-small f-center">看目标行为</text>
      <text x="326" y="202" className="f-small f-center">不设缺口</text>
      <text x="326" y="224" className="f-small f-center">没有终点</text>
    </Figure>
  )
}
