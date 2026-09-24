import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <div id="container">
      <Header />

      <div id="content">
        <Sidebar />
        <Main title="Welcome to my site">
          <p>This content comes from App, through the children prop.</p>
        </Main>
      </div>

      <Footer author="Sibar Al-Ani" />
    </div>
  )
}

export default App
