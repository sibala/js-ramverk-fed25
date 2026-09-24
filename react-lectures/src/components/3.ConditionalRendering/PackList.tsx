import Item from "./Item";

const PackList = () => {

  // Imagine an array retrieved from DB or API fetch request
  const items: string[] = []

  return (
    <section>
      <ul>
          <Item name="Mac" isPacked={true} />
          <Item name="Lunchbox" isPacked={true} />
          <Item name="Coffe" isPacked={false} />
      </ul>

      {items.length === 0 ? <p>No items from the Items Array yet</p> : null}
    </section>
  )
}

export default PackList