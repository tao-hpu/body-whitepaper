import { Figure } from './Figure'

// 第 13 节：先估、再看、对账、再估，四步一圈。
const boxes = [
  { x: 165, y: 14, t: '先估', s: '猜一个数' },
  { x: 310, y: 112, t: '再看数字', s: '上秤、查表' },
  { x: 165, y: 210, t: '对账', s: '差多少' },
  { x: 20, y: 112, t: '下次再估', s: '带着这次的偏差' },
]
const W = 150, H = 58

export function Calibrate() {
  return (
    <Figure title="先估，再看，再对账" viewBox="0 0 480 284"
      caption="每次看数字之前先猜，看完记下差了多少，下次带着这个偏差再猜。重复几十次后，偏重还是偏轻、吃多还是吃少这类方向判断会先变准，具体数值后准。">
      {boxes.map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width={W} height={H} rx={8} className={i === 0 ? 'f-deep' : 'f-soft'} />
          <text x={b.x + W / 2} y={b.y + 25} className={`${i === 0 ? 'f-in' : 'f-label'} f-center`}>{b.t}</text>
          <text x={b.x + W / 2} y={b.y + 46} className={`${i === 0 ? 'f-in-small' : 'f-small'} f-center`}>{b.s}</text>
        </g>
      ))}
      <path d="M318 43 Q385 43 385 106" className="f-flow" fill="none" markerEnd="url(#fig-arrow)" />
      <path d="M385 174 Q385 239 321 239" className="f-flow" fill="none" markerEnd="url(#fig-arrow)" />
      <path d="M162 239 Q95 239 95 176" className="f-flow" fill="none" markerEnd="url(#fig-arrow)" />
      <path d="M95 108 Q95 43 159 43" className="f-flow" fill="none" markerEnd="url(#fig-arrow)" />
      <text x="240" y="136" className="f-strong f-center">方向先变准</text>
      <text x="240" y="160" className="f-small f-center">数值后变准</text>
    </Figure>
  )
}
