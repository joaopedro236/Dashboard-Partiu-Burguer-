import "./orderSort.css"

const SORT_OPTIONS = [
  { value: "name-asc", label: "Nome: A a Z" },
  { value: "name-desc", label: "Nome: Z a A" },
  { value: "price-asc", label: "Preço: menor para maior" },
  { value: "price-desc", label: "Preço: maior para menor" },
]

export default function OrderSort({ value, onChange }) {
  return (
    <label className="orderSort">
      <span>Ordenar por</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
