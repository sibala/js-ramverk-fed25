import './App.css'
import Jsx from './components/1.JSX/Jsx'
import profilePicture from './assets/profile-picture.png'
import Comment from './components/2.ComponentsAndProps/comment/Comment'
import Card from './components/2.ComponentsAndProps/Card'
import Avatar from './components/2.ComponentsAndProps/comment/Avatar'
import PackList from './components/3.ConditionalRendering/PackList';
import ClickEvent from './components/4.EventHandlers/ClickEvent';
import UseStateExample from './components/5.UseStateHook/UseStateExample';
import ToggleExample from './components/5.UseStateHook/ToggleExample';
import Blog from './components/6.ListsAndKeys/Blog';
import ShoppingList from './components/7.StateWithArraysAndObjects/ShoppingList';
import FormWithHooksBasics from './components/8.Forms/FormWithHooksBasics';
import RegisterForm from './components/8.Forms/RegisterForm';
import RegisterFormWithStyling from './components/9.Styling/RegisterFormWithStyling';
import TailwindExample from './components/9.Styling/TailwindExample';
import MotionBasics from './components/10.Animation/MotionBasics';
import AnimatePresenceExample from './components/10.Animation/AnimatePresenceExample';
import StaggerList from './components/10.Animation/StaggerList';

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
    {/* ===== Lecture 6: 10. Animation ===== */}
    <StaggerList />
    {/* <AnimatePresenceExample /> */}
    {/* <MotionBasics /> */}

    {/* ===== Lecture 5: 9. Styling ===== */}
    {/* <TailwindExample /> */}
    {/* <RegisterFormWithStyling /> */}

    {/* ===== Lecture 4: 8. Forms ===== */}
    {/* <RegisterForm /> */}
    {/* <FormWithHooksBasics /> */}
    


    {/* ===== Lecture 4: 7. State with arrays and objects - Further build on previous lecture ===== */}
    {/* ===== Lecture 3: 7. State with arrays and objects===== */}
    {/* <ShoppingList /> */}


    {/* ===== Lecture 3: 6. Lists and Keys ===== */}
    {/* <Blog /> */}

    {/* ===== Lecture 2: 5. useState hook ===== */}
    {/* <ToggleExample /> */}
    {/* <UseStateExample /> */}


    {/* ===== Lecture 2: 4. Event handlers ===== */}
    {/* <ClickEvent /> */}

    {/* ===== Lecture 2: 3. Conditional rendering ===== */}
    {/* <PackList /> */}


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
