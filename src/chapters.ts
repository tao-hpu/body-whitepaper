// 全站唯一的章节清单。首页大纲、顶栏、上一页/下一页、prerender 都从这里读。
// 正文在 content/*.md，这一份只负责顺序、标题、这一节回答什么。

export type ChapterStatus = 'live' | 'planned'

export interface Chapter {
  slug: string
  num: string
  title: string
  hook: string
  bridge: string
  status: ChapterStatus
  core?: boolean
  /** 本节带的计算器名称，首页大纲和工具区据此标注。 */
  tool?: string
  file: string
}

export interface Part {
  name: string
  blurb: string
  chapters: Chapter[]
}

export const parts: Part[] = [
  {
    name: '第一部分 · 机制',
    blurb: '体重由能量平衡决定，会停在摄入等于消耗的位置。',
    chapters: [
      { slug: 'energy-balance', num: '01', title: '能量平衡与自然体重', hook: '体重会漂到摄入等于消耗的位置', bridge: '自然体重带', status: 'live', tool: '自然体重落点', core: true, file: 'energy-balance.md' },
      { slug: 'compensation', num: '02', title: '食欲代偿', hook: '多动消耗的热量，会被吃回去多少', bridge: '最大误差源', status: 'live', file: 'compensation.md' },
    ],
  },
  {
    name: '第二部分 · 目标',
    blurb: '先定体成分，再定体重；先定阶段，再定指标。',
    chapters: [
      { slug: 'target-weight', num: '03', title: '目标体重怎么定', hook: '同样的体重，肌肉多少不同，胖瘦就不同', bridge: '推荐目标', status: 'live', tool: '推荐目标体重', core: true, file: 'target-weight.md' },
      { slug: 'abs', num: '04', title: '腹肌', hook: '腹肌看不看得见，取决于肌肉厚度和上面盖了多少脂肪', bridge: '可见度', status: 'live', file: 'abs.md' },
      { slug: 'two-phases', num: '05', title: '减脂期与维持期', hook: '减脂期用目标体重，维持期用目标行为', bridge: '全书主线', status: 'live', core: true, file: 'two-phases.md' },
    ],
  },
  {
    name: '第三部分 · 杠杆',
    blurb: '饮食、抗阻、日常活动、有氧、睡眠，各自管什么。',
    chapters: [
      { slug: 'levers', num: '06', title: '各项杠杆的比重', hook: '目标不同，比重不同', bridge: '排优先级', status: 'live', tool: '每天吃多少蛋白质', core: true, file: 'levers.md' },
    ],
  },
  {
    name: '第四部分 · 执行',
    blurb: '按最忙的那一周设计，不按最理想的那一周。',
    chapters: [
      { slug: 'home-training', num: '07', title: '居家抗阻训练', hook: '渐进超负荷不依赖健身房', bridge: '三分化', status: 'live', file: 'home-training.md' },
      { slug: 'busy-weeks', num: '08', title: '忙的时候怎么练', hook: '可以降档，不要断档', bridge: '三档方案', status: 'live', core: true, file: 'busy-weeks.md' },
      { slug: 'steps', num: '09', title: '步数与日常活动', hook: '从当前基线往上加，不从固定数字起步', bridge: 'NEAT', status: 'live', tool: '多走路能减多少', file: 'steps.md' },
    ],
  },
  {
    name: '第五部分 · 跑步入门',
    blurb: '鞋、落地点和加量节奏。',
    chapters: [
      { slug: 'running-shoes', num: '10', title: '跑鞋的结构', hook: '摇椅底和厚底换来什么，代价是什么', bridge: '新手选鞋', status: 'live', file: 'running-shoes.md' },
      { slug: 'running-form', num: '11', title: '跑姿与加量', hook: '落地点比落地部位重要，加量比姿势重要', bridge: '防伤', status: 'live', file: 'running-form.md' },
    ],
  },
  {
    name: '第六部分 · 测量',
    blurb: '区分信号和噪音，再用数字校准身体感觉。',
    chapters: [
      { slug: 'scale-noise', num: '12', title: '秤的读数与噪音', hook: '单日 0.4 kg 左右的变化在噪音范围内', bridge: '7 日均线', status: 'live', tool: '7 日均值', file: 'scale-noise.md' },
      { slug: 'interoception', num: '13', title: '身体感', hook: '先估再称，用数字校准感觉', bridge: '内感受', status: 'live', core: true, file: 'interoception.md' },
    ],
  },
  {
    name: '第七部分 · 吃',
    blurb: '落到每顿饭：几分饱、加餐、夜宵、标签和盐。',
    chapters: [
      { slug: 'eating', num: '14', title: '日常吃法', hook: '吃到几分饱、加餐和夜宵怎么处理、怎么读标签', bridge: '标签与钠', status: 'live', tool: '包装标签换算', file: 'eating.md' },
    ],
  },
  {
    name: '附录',
    blurb: '查词，以及全书和常见说法不一致的结论汇总。',
    chapters: [
      { slug: 'glossary', num: 'A', title: '名词表', hook: 'BMI、体脂率、大基数、NEAT 这些词是什么意思', bridge: '查词', status: 'live', file: 'glossary.md' },
      { slug: 'counterintuitive', num: 'B', title: '和常见说法不一样的地方', hook: '各章里和流行说法不一致的结论，一页看完', bridge: '汇总', status: 'live', file: 'counterintuitive.md' },
    ],
  },
]

export const allChapters: Chapter[] = parts.flatMap((p) => p.chapters)

export const chapterPath = (c: Chapter) => `/ch/${c.slug}`

export const toolChapters = (): Chapter[] => allChapters.filter((c) => c.tool)

export const firstLiveChapter = (): Chapter | undefined =>
  allChapters.find((c) => c.status === 'live')

export const findChapter = (slug: string): Chapter | undefined =>
  allChapters.find((c) => c.slug === slug)

export function neighbors(slug: string): { prev?: Chapter; next?: Chapter } {
  const i = allChapters.findIndex((c) => c.slug === slug)
  return {
    prev: i > 0 ? allChapters[i - 1] : undefined,
    next: i >= 0 && i < allChapters.length - 1 ? allChapters[i + 1] : undefined,
  }
}

// 正文里 [[标题]] 式的站内链接映射，按需补充。
export const WIKI_SLUG: Record<string, string> = {}
