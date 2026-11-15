import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findChapter } from '../chapters'

const SITE = '体重白皮书'
const DEFAULT_DESC = '体重是读数，行为是旋钮。从能量平衡讲到目标设定、训练执行和测量。'

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useDocMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const slug = pathname.startsWith('/ch/') ? pathname.slice('/ch/'.length) : ''
    const c = slug ? findChapter(slug) : undefined

    const title = c ? `${c.num} ${c.title} · ${SITE}` : `${SITE} · 减脂与维持`
    const desc = c ? c.hook : DEFAULT_DESC

    document.title = title
    setMeta('description', desc)
    setProperty('og:title', title)
    setProperty('og:description', desc)
    setProperty('og:type', 'website')
    setProperty('og:url', `https://body.fim.ai${c ? `/ch/${slug}` : ''}`)
    setMeta('twitter:title', title)
    setMeta('twitter:description', desc)
  }, [pathname])
}
