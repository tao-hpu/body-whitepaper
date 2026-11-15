// 各计算器共用的换算规则。

// 长期每 100 kJ/天（约 24 kcal/天）的能量差对应约 1 kg 稳态体重变化（Hall 2011）。
export const KCAL_PER_KG_DAY = 24
// 估计：步行净消耗约 0.5 kcal/kg/km，步长约 0.7 m。
export const KCAL_PER_KG_PER_1000_STEPS = 0.35
// 运动代偿：短期研究均值 18%，约 80 周的研究接近 84%（Riou 2015）。
export const COMP_SHORT = 0.18
export const COMP_LONG = 0.84
// 估计：一小碗米饭约 150 g 熟重，约 170 kcal。
export const KCAL_PER_BOWL = 170
