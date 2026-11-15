import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { ChapterShell } from '../components/ChapterShell'
import { loadMarkdown } from '../content'
import { findChapter, parts } from '../chapters'
import { renderMarkdown, type TocItem } from '../lib/renderMarkdown'
import { useOutline } from '../site/outline'
import { widgets } from '../widgets'

function partName(slug: string): string {
  for (const p of parts) {
    if (p.chapters.some((c) => c.slug === slug)) return p.name
  }
  return ''
}

// 进页时跳锚点用 instant：smooth 滚动会被随后挂载的计算器等布局变化打断。
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
}

export function MarkdownChapter({ slug }: { slug: string }) {
  const me = findChapter(slug)
  const { hash } = useLocation()
  const { setOutline, setActiveId } = useOutline()
  const [html, setHtml] = useState('')
  const [err, setErr] = useState('')
  const [toc, setToc] = useState<TocItem[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)
  const [slots, setSlots] = useState<{ el: Element; name: string }[]>([])

  useEffect(() => {
    if (!me) return
    let cancelled = false
    setHtml('')
    setSlots([])
    setErr('')
    setToc([])
    setOutline([])
    loadMarkdown(me.file)
      .then((raw) => {
        if (cancelled) return
        const next = renderMarkdown(raw)
        setHtml(next.html)
        setToc(next.outline)
        setOutline(next.outline)
      })
      .catch((e: Error) => {
        if (!cancelled) setErr(e.message)
      })
    return () => {
      cancelled = true
      setOutline([])
    }
  }, [me, setOutline])

  useEffect(() => {
    const root = bodyRef.current
    if (!html || !root) { setSlots([]); return }
    const found = [...root.querySelectorAll('[data-widget]')]
      .map((el) => ({ el, name: el.getAttribute('data-widget') ?? '' }))
      .filter((s) => s.name in widgets)
    // 首页计算器卡片链到 /ch/<slug>#tool，落在本节第一个计算器上。
    const firstTool = found.find((s) => !s.name.startsWith('fig-'))
    if (firstTool && !root.querySelector('#tool')) firstTool.el.id = 'tool'
    setSlots(found)
  }, [html])

  useEffect(() => {
    if (!html) return
    const id = decodeURIComponent(hash.replace(/^#/, ''))
    if (!id) return
    const t = window.setTimeout(() => scrollToId(id), 50)
    return () => window.clearTimeout(t)
  }, [html, hash])

  useEffect(() => {
    if (!html || toc.length === 0) return
    const root = document.querySelector('.content')
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const id = vis[0]?.target.id
        if (id) setActiveId(id)
      },
      { root, rootMargin: '0px 0px -65% 0px', threshold: 0.01 },
    )
    for (const it of toc) {
      const el = document.getElementById(it.id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [html, toc, setActiveId])

  if (!me) return <div className="page">未找到章节：{slug}</div>
  if (err) return <div className="page">{err}</div>

  return (
    <ChapterShell slug={slug} part={partName(slug)}>
      {html
        ? <>
            <div key={slug} className="md-body" ref={bodyRef} dangerouslySetInnerHTML={{ __html: html }} />
            {slots.map(({ el, name }, i) => {
              const W = widgets[name]
              return createPortal(<W />, el, `${name}-${i}`)
            })}
          </>
        : <p className="page-loading">加载中…</p>}
    </ChapterShell>
  )
}
