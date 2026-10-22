// Part 1: make this a controlled form 
const PunForm = () => {
  return (
    <form className="pun-form">
      <label>
        Your pun
        <textarea />
      </label>
      <div className="row">
        <label>
          Category
          <select>
            <option value="">Choose a category</option>
          </select>
        </label>
        <button className="primary">Add pun</button>
      </div>
    </form>
  )
}

export default PunForm
