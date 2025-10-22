import { useState } from 'react'
import './App.css'
import WishList from './WishList/WishList'
import legoWishes from './data/wishlist-lego.json'
import standardWishes from './data/wishlist-standard.json'

function App() {
  const [mode, setMode] = useState('standard')

  return (
    <>
      <h1>Vince Wishlist</h1>
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
