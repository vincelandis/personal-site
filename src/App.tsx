import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import WishList from './components/WishList/WishList'
import legoWishes from './data/wishlist-lego.json'
import standardWishes from './data/wishlist-standard.json'

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
      <div>
        <WishList dataSource={mode === 'lego' ? legoWishes : standardWishes}/>
      </div>
    </>
  )
}

export default App
