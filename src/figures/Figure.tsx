import type { ReactNode } from 'react'

// 正文配图的外框。图内一律用 viewBox 宽 480 左右，字号不小于 14（手机上约缩到 0.7 倍），保证手机宽度下还能读。
// 颜色只用 styles.css 里 .fig 下的类（f-*），不写死色值。
export function Figure({ title, caption, viewBox, children }: {
  title: string
  caption?: ReactNode
  viewBox: string
  children: ReactNode
}) {
  return (
    <figure className="fig">
      <svg viewBox={viewBox} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="fig-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="f-green" />
          </marker>
          <marker id="fig-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="f-muted" />
          </marker>
        </defs>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
