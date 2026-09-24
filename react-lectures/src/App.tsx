import './App.css'
import Jsx from './components/1.JSX/Jsx'
import profilePicture from './assets/profile-picture.png'
import Comment from './components/2.ComponentsAndProps/comment/Comment'
import Card from './components/2.ComponentsAndProps/Card'
import Avatar from './components/2.ComponentsAndProps/comment/Avatar'

function App() {

  // Object belongs to lecture 1, "2. Components and Props"
  // const comment = {
  //   date: new Date(),
  //   text: 'I hope you enjoy learning React! Although it is pretty confusing at first',
  //   author: {
  //     name: 'Hello Kitty',
  //     avatarUrl: profilePicture,
  //   },
  // }

  return (
   <>
    {/* ===== Lecture 2: 5. useState hook ===== */}


    {/* ===== Lecture 2: 4. Event handlers ===== */}

    {/* ===== Lecture 2: 3. Conditional rendering ===== */}


    {/* ===== Lecture 1: 2. Components and props ===== */}
    {/* <Comment 
      author={comment.author} 
      text={comment.text} 
      date={comment.date} 
    /> */}

    {/* <Avatar author={comment.author} />
    <Avatar author={comment.author} />
    <Avatar author={comment.author} /> */}

    {/* <Card title="product 1">
      <p> Product description - through passing children down to sub component </p>
    </Card> */}


    {/* ===== Lecture 1: 1. JSX ===== */}
    {/* <Jsx /> */}
   </>
  )
}

export default App
