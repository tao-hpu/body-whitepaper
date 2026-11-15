import { Figure } from './Figure'

// 第 04 节：腹部剖面示意。腹直肌厚度决定起伏，上面的脂肪厚度决定起伏能透出多少。
const BASE = 200, W = 130, N = 3

function bumps(x0: number, top: number, amp: number): string {
  const step = W / N
  let d = ''
  for (let i = 0; i < N; i++) {
    const a = x0 + i * step
    d += ` Q${a + step / 2} ${top - 2 * amp} ${a + step} ${top}`
  }
  return d
}

function Column({ x0, muscle, amp, fat, line1, result }: {
  x0: number; muscle: number; amp: number; fat: 'thin' | 'thick'; line1: string; result: string
}) {
  const mTop = BASE - muscle
  const surface = fat === 'thin'
    ? `M${x0} ${mTop - 8}${bumps(x0, mTop - 8, amp)}`
    : `M${x0} ${mTop - amp - 44} L${x0 + W} ${mTop - amp - 44}`
  const fatShape = `${surface} L${x0 + W} ${BASE} L${x0} ${BASE} Z`
  const muscleShape = `M${x0} ${BASE} L${x0} ${mTop}${bumps(x0, mTop, amp)} L${x0 + W} ${BASE} Z`
  return (
    <g>
      <path d={fatShape} className="f-soft" />
      <path d={muscleShape} className="f-deep" />
      <path d={surface} className="f-wall" />
      <text x={x0 + W / 2} y={BASE + 28} className="f-small f-center">{line1}</text>
      <text x={x0 + W / 2} y={BASE + 52} className="f-strong f-center">{result}</text>
    </g>
  )
}

export function Abs() {
  return (
    <Figure title="腹部剖面：肌肉厚度与脂肪覆盖" viewBox="0 0 480 270"
      caption="剖面示意，深色是腹直肌，浅色是脂肪，线条是皮肤表面。肌肉厚、脂肪薄，起伏透出来；脂肪厚，起伏被填平；肌肉薄，脂肪再少也只是平整的腹部。">
      <rect x="20" y="14" width="16" height="16" className="f-soft" />
      <text x="44" y="27" className="f-small">脂肪</text>
      <rect x="106" y="14" width="16" height="16" className="f-deep" />
      <text x="130" y="27" className="f-small">腹直肌</text>

      <Column x0={14} muscle={56} amp={10} fat="thin" line1="肌肉厚，脂肪薄" result="看得见分块" />
      <Column x0={175} muscle={56} amp={10} fat="thick" line1="肌肉厚，脂肪厚" result="看不出" />
      <Column x0={336} muscle={22} amp={3} fat="thin" line1="肌肉薄，脂肪薄" result="平整" />
    </Figure>
  )
}
