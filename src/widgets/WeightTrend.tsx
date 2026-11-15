import { useState } from 'react'

// 两个 7 日均值之差小于这个数时，当作噪音（本书估计）。
// 按第 12 节的估算，80 kg 的人两周均值之差的典型噪音约 0.16 kg，0.3 kg 约为它的两倍。
const NOISE_KG = 0.3
const MIN_COUNT = 8
const WINDOW = 7

const SAMPLE = [
  80.6, 80.9, 80.4, 80.7, 80.2, 80.5, 80.8,
  80.3, 80.0, 80.4, 79.9, 80.2, 80.5, 79.8,
].map((v) => v.toFixed(1)).join(' ')

// 按空格、逗号、顿号、分号、换行切开，只留像体重的数（20–300 kg），其余忽略。
function parse(text: string): number[] {
  return text.split(/[\s,，、;；]+/)
    .filter((s) => /^\d/.test(s))
    .map((s) => parseFloat(s))
    .filter((v) => Number.isFinite(v) && v >= 20 && v <= 300)
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

function Spark({ data, split }: { data: number[]; split: number }) {
  const w = 300
  const h = 56
  const lo = Math.min(...data)
  const hi = Math.max(...data)
  const span = hi - lo || 1
  const x = (i: number) => (i / (data.length - 1)) * (w - 8) + 4
  const y = (v: number) => h - 6 - ((v - lo) / span) * (h - 12)
  const avg = (from: number, to: number, v: number) =>
    <line x1={x(from)} x2={x(to)} y1={y(v)} y2={y(v)} className="w-spark-avg" />
  return (
    <svg className="w-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={data.map((v, i) => `${x(i)},${y(v)}`).join(' ')} className="w-spark-line" />
      {avg(Math.max(0, split - WINDOW), split - 1, mean(data.slice(Math.max(0, split - WINDOW), split)))}
      {avg(split, data.length - 1, mean(data.slice(split)))}
    </svg>
  )
}

export function WeightTrend() {
  const [text, setText] = useState(SAMPLE)
  const all = parse(text)

  let body
  if (all.length < MIN_COUNT) {
    body = (
      <p className="w-note">
        现在读到 {all.length} 个数，至少需要 {MIN_COUNT} 个：最近 7 天，加上之前至少 1 天。
      </p>
    )
  } else {
    const split = all.length - WINDOW
    const recent = all.slice(split)
    const prev = all.slice(Math.max(0, split - WINDOW), split)
    const rMean = mean(recent)
    const pMean = mean(prev)
    const diff = rMean - pMean
    const pct = (Math.abs(diff) / pMean) * 100
    let jump = 0
    const from = Math.max(0, split - WINDOW)
    let jumpAt = from + 1
    // 只在参与计算的最后 14 个数里找，和折线图一致；序号仍按输入里的位置。
    for (let i = from + 1; i < all.length; i++) {
      const d = Math.abs(all[i] - all[i - 1])
      if (d > jump) { jump = d; jumpAt = i }
    }
    const prevLabel = prev.length === WINDOW ? '之前 7 天均值' : `之前 ${prev.length} 天均值`

    body = (
      <>
        <Spark data={all.slice(from)} split={Math.min(split, WINDOW)} />
        <div className="w-facts">
          <div><span>最近 7 天均值</span><b>{rMean.toFixed(2)} kg</b></div>
          <div><span>{prevLabel}</span><b>{pMean.toFixed(2)} kg</b></div>
          <div><span>差值</span><b>{diff > 0 ? '+' : diff < 0 ? '−' : ''}{Math.abs(diff).toFixed(2)} kg</b>
            <small>约为体重的 {pct.toFixed(2)}%</small></div>
          <div><span>相邻两天最大跳动</span><b>{jump.toFixed(1)} kg</b>
            <small>第 {jumpAt} 到第 {jumpAt + 1} 个数</small></div>
        </div>
        <p className="w-note">
          {Math.abs(diff) < NOISE_KG
            ? '差别在单日波动的范围内，再看一周。'
            : `最近 7 天的均值比${prevLabel.replace('均值', '')}${diff < 0 ? '低' : '高'} ${Math.abs(diff).toFixed(2)} kg，`
              + `约为体重的 ${pct.toFixed(2)}%。连续两到三周同向，才算趋势。`}
          {' '}相邻两天最大跳了 {jump.toFixed(1)} kg，单看那一天，容易误以为体重在变。
        </p>
      </>
    )
  }

  return (
    <div className="widget">
      <div className="w-kicker">计算器 · 7 日均值</div>
      <label className="w-area">
        <span className="w-label">每天晨起的体重（kg）</span>
        <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
        <span className="w-hint">按日期从早到晚，一天一个数，用空格、逗号或换行隔开。框里是示例数据，可以换成自己的。</span>
      </label>
      {body}
      <p className="w-foot">
        只用最后 14 个数：最后 7 个算最近均值，再往前最多 7 个算之前的均值。
        差值小于 {NOISE_KG} kg 算作噪音，这条线是本书估计：按本节的估算，两个 7 日均值之差的典型噪音约 0.16 kg，{NOISE_KG} kg 约为它的两倍。
      </p>
    </div>
  )
}
