import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import StandardWishList from './components/StandardWishList/StandardWishList'
import LegoWishList from './components/LegoWishList/LegoWishList'

function App() {
  // const [count, setCount] = useState(0)
  const [mode, setMode] = useState('standard')

  return (
    <>
      {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
      {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      {/* <div>
      </div> */}
      <h1>Vince Wish List</h1>
      <div className='card'>
        <button className={`button-left ${mode === 'standard' ? 'selected' : ''}`}
          onClick={() => setMode('standard')}
        >
          STANDARD
        </button>
        <button className={`button-right ${mode === 'lego' ? 'selected' : ''}`}
          onClick={() => setMode('lego')}
        >
          LEGO
        </button>
      </div>
      {mode === 'standard' && <StandardWishList/>}
      {mode === 'lego' && <LegoWishList/>}
    </>
  )
}

export default App
