type ItemProps = {
    name: string,
    isPacked: boolean
}

const Item = ({name, isPacked}: ItemProps) => {


  // Version 1: if statement 
  // let itemJSX: ReactNode
  // if (isPacked) {
  //   itemJSX = <li>{name} {' ✅'} </li>
  // } else {
  //    itemJSX = <li>{name} </li>
  // }

  // return (
  //   {itemJSX}
  // )


  // Version 2: ternary operation
  // return (
  //   <li>
  //      {name} {isPacked ? ' ✅' : ''}
  //   </li>
  // )


  // Version 3: ternary operation

  // This works because In React the following doesn't get rendered: false, true, null, undefined, ''
  // Which makes some shorthand ternary operations with &&, 
  // more applicable in React than in vanilla JS
  return (
    <li>
        {name} {isPacked && ' ✅'}
    </li>
  )



  
}

export default Item