import { Link } from 'react-router-dom'
import { parts, allChapters, chapterPath, findChapter, toolChapters } from '../chapters'

export function Home() {
  const count = allChapters.length
  const tools = toolChapters()
  const first = findChapter('energy-balance')
  const target = findChapter('target-weight')
  return (
    <div className="home">
      <header className="hero">
        <p className="hero-eyebrow">减脂与维持</p>
        <h1 className="hero-h1">
          体重是读数，<br />
          行为才是<span className="hl">旋钮</span>。
        </h1>
        <p className="hero-lede">
          体重会停在吃进的能量等于消耗的位置。能直接调的只有吃什么、练多少、走多少、睡多少；
          体重是这些行为的结果，要等它慢慢走过去。
        </p>
        <p className="hero-lede">
          这本书写给想减重、又不想反复反弹的普通人。它回答几个具体问题：
          <b>减到多少合适</b>，<b>照现在的做法最后会停在哪</b>，<b>要多久</b>，
          <b>忙起来怎么不断档</b>，以及<b>秤上的数字什么时候该在意</b>。
          书里的数字都标了出处，自己的估计会写明是估计。
        </p>

        <div className="hero-meta">
          <span>{count} 节</span>
          <span>{tools.length} 个计算器</span>
          <span>每个数字标出处</span>
          <span>免费阅读</span>
        </div>

        <div className="hero-cta">
          {target && (
            <Link className="start-cta" to={chapterPath(target)}>
              先算一个目标体重 <span className="arrow">→</span>
            </Link>
          )}
          {first && (
            <Link className="start-cta ghost" to={chapterPath(first)}>
              从第 {first.num} 节开始读
            </Link>
          )}
        </div>
      </header>

      <section className="home-tools">
        <h2 className="outline-title">计算器</h2>
        <p className="home-sub">输入自己的数，结果随之变化。每个计算器都在对应章节里，旁边就是它的算法和依据。</p>
        <div className="tool-grid">
          {tools.map((c) => (
            <Link className="tool-card" key={c.slug} to={`${chapterPath(c)}#tool`}>
              <span className="tool-name">{c.tool}</span>
              <span className="tool-from">第 {c.num} 节 · {c.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-how">
        <h2 className="outline-title">怎么读</h2>
        <ul className="how-list">
          <li><b>时间少：</b>按带 ★ 的六节读，这是全书主线：能量平衡 → 目标体重 → 两个阶段 → 杠杆比重 → 忙时降档 → 身体感。</li>
          <li><b>想先有个数：</b>到第 03 节输入身高、年龄、体重，得到推荐目标；再点结果下面的链接，到第 01 节看要少吃多少、要等多久。</li>
          <li><b>正在减、体重不动：</b>先看第 12 节，判断是正常波动还是真的停了。</li>
          <li><b>遇到不懂的词：</b>查附录 A 名词表。</li>
        </ul>
      </section>

      <section className="two-ideas">
        <div className="cardgrid">
          <div className="card">
            <span className="card-k">机制</span>
            <h4>自然体重是一个区间</h4>
            <p>行为定下来，体重会漂到对应的区间并停住。区间的位置由吃多少、活动量，以及运动后不自觉多吃的那部分共同决定。</p>
          </div>
          <div className="card">
            <span className="card-k">阶段</span>
            <h4>减脂期和维持期用不同的指标</h4>
            <p>减脂期有终点，看目标体重；维持期没有终点，看能不能一直这样过。反弹多发生在把前者的指标带进后者的时候。</p>
          </div>
        </div>
      </section>

      <section className="home-outline">
        <h2 className="outline-title">全书大纲 · {parts.length} 部分 {count} 节</h2>
        {parts.map((part) => (
          <div className="ol-part" key={part.name}>
            <div className="ol-part-head">
              <div className="ol-part-name">{part.name}</div>
              <div className="ol-part-blurb">{part.blurb}</div>
            </div>
            <ul className="ol-list">
              {part.chapters.map((c) => {
                const live = c.status === 'live'
                return (
                  <li key={c.slug}>
                    {live ? (
                      <Link className="ol-item" to={chapterPath(c)}>
                        <span className="ol-num">{c.num}</span>
                        <span className="ol-main">
                          <span className="ol-title">{c.title}{c.core && <span className="ol-star"> ★</span>}{c.tool && <span className="ol-tool">计算器</span>}</span>
                          <span className="ol-hook">{c.hook}</span>
                        </span>
                        <span className="ol-bridge">{c.bridge}</span>
                      </Link>
                    ) : (
                      <span className="ol-item is-planned">
                        <span className="ol-num">{c.num}</span>
                        <span className="ol-main">
                          <span className="ol-title">{c.title}</span>
                          <span className="ol-hook">{c.hook}</span>
                        </span>
                        <span className="ol-bridge">规划中</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <p className="outline-foot">
          ★ 全书主线　「计算器」：本节带可以输入自己数据的计算器
        </p>
      </section>
    </div>
  )
}
