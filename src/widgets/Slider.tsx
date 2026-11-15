export function Slider({ label, unit, value, min, max, step, onChange, hint }: {
  label: string; unit: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; hint?: string
}) {
  return (
    <label className="w-row">
      <span className="w-label">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} />
      <span className="w-val">{value}{unit}</span>
      {hint && <span className="w-hint">{hint}</span>}
    </label>
  )
}
