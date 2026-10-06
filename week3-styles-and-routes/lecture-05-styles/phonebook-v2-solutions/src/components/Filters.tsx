import type { Filter } from '../types';

type FiltersProps = {
  setFilter: (filter: Filter) => void
}
const Filters = ({setFilter}: FiltersProps) => {
  console.log('Filters')
  
  return (
    <div>
      <button onClick={()=> setFilter('All')}>All</button>
      <button onClick={()=> setFilter('Personal')}>Personal</button>
      <button onClick={()=> setFilter('Business')}>Business</button>
      <button onClick={()=> setFilter('Favorites')}>Favorites</button>
    </div>
  )
}

export default Filters