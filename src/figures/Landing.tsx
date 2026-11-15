import { Figure } from './Figure'

// 第 11 节：侧面看落地瞬间。虚线是从髋部垂直向下的位置，圆点是落地的脚。
function Runner({ ox, over }: { ox: number; over: boolean }) {
  const hip = { x: ox, y: 110 }
  const knee = over ? { x: ox + 40, y: 160 } : { x: ox + 22, y: 158 }
  const foot = over ? { x: ox + 76, y: 214 } : { x: ox + 8, y: 214 }
  return (
    <g>
      <line x1={ox} y1={30} x2={ox} y2={222} className="f-dash" />
      <circle cx={ox + 10} cy={34} r={13} className="f-wall" />
      <line x1={hip.x} y1={hip.y} x2={ox + 8} y2={50} className="f-wall" />
      <polyline points={`${ox + 6},62 ${ox - 18},86 ${ox - 4},104`} className="f-wall" />
      <polyline points={`${ox + 6},62 ${ox + 28},80 ${ox + 42},64`} className="f-wall" />
      <polyline points={`${hip.x},${hip.y} ${ox - 18},150 ${ox - 50},164`} className="f-wall" />
      <polyline points={`${hip.x},${hip.y} ${knee.x},${knee.y} ${foot.x},${foot.y}`} className="f-wall" />
      <circle cx={hip.x} cy={hip.y} r={5} className="f-green" />
      <circle cx={foot.x} cy={foot.y} r={6} className="f-accent" />
    </g>
  )
}

export function Landing() {
  return (
    <Figure title="落地点" viewBox="0 0 480 294"
      caption="侧面看落地瞬间，虚线是从髋部垂直向下的位置。左边脚落在身体下方；右边脚伸到身体前方，每一步先刹车再前进。提高步频会让步子变短，落地点往回收。">
      <line x1="10" y1="220" x2="470" y2="220" className="f-axis" />
      <Runner ox={110} over={false} />
      <Runner ox={320} over={true} />
      <line x1="324" y1="234" x2="394" y2="234" className="f-flow" markerStart="url(#fig-arrow)" markerEnd="url(#fig-arrow)" />
      <text x="358" y="258" className="f-small f-center">离髋部太远</text>
      <text x="118" y="286" className="f-strong f-center">落在身体下方</text>
      <text x="358" y="286" className="f-strong f-center">跨到身体前方</text>
    </Figure>
  )
}
