import { Figure } from './Figure'

// 第 01 节：泳池模型。进水口 = 吃，出水口 = 三项消耗，水位 = 体重；水里分脂肪和去脂体重两层。
export function Pool() {
  return (
    <Figure title="泳池模型" viewBox="0 0 480 300"
      caption="进水口是吃进的能量，出水口是消耗，水位是体重。水位越高，出水越快，所以水位最后会停在进出相等的地方。同样的水位，脂肪层可厚可薄，减重想放掉的是脂肪这一层。">
      {/* 进水口 */}
      <path d="M14 46 H110 V74" className="f-pipe" />
      <line x1="110" y1="78" x2="110" y2="110" className="f-flow" markerEnd="url(#fig-arrow)" />
      <text x="14" y="30" className="f-label">进水口：吃进的能量</text>

      {/* 池子 */}
      <path d="M60 96 V270 H320 V96" className="f-wall" />
      <rect x="62" y="186" width="256" height="82" className="f-deep" />
      <rect x="62" y="140" width="256" height="46" className="f-soft" />
      <text x="190" y="223" className="f-in f-center">去脂体重</text>
      <text x="190" y="245" className="f-in-small f-center">肌肉、骨骼、内脏、水分</text>
      <text x="190" y="169" className="f-label f-center">脂肪</text>

      {/* 水位线 */}
      <line x1="50" y1="140" x2="330" y2="140" className="f-dash" />
      <text x="190" y="130" className="f-strong f-center">水位 = 体重</text>

      {/* 出水口 */}
      <path d="M320 254 H340" className="f-pipe" />
      <line x1="344" y1="254" x2="366" y2="254" className="f-flow" markerEnd="url(#fig-arrow)" />
      <text x="344" y="170" className="f-label">出水口：消耗</text>
      <text x="344" y="194" className="f-small">基础代谢</text>
      <text x="344" y="214" className="f-small">日常活动</text>
      <text x="344" y="234" className="f-small">运动</text>
    </Figure>
  )
}
