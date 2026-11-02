type CategoriesDropdownProps = {
    categories: string[],
    category: string,
    onChange: (category: string) => void,
    defaultOptions: string,
    htmlId: string
}

const CategoriesDropdown = ({categories, category, onChange, defaultOptions, htmlId}: CategoriesDropdownProps) => {
  
  return (
    <label htmlFor={htmlId}>Category 
      <select id={htmlId} value={category} onChange={(e) => onChange(e.target.value)}>
        <option value="">{defaultOptions}</option>
        {
          categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))
        }
      </select>
    </label>
  )
}

export default CategoriesDropdown