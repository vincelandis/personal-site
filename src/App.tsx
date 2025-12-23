import { useState, useEffect } from 'react'
import './App.css'
import WishList from './WishList/WishList'
import legoWishes from './data/wishlist-lego.json'
import standardWishes from './data/wishlist-standard.json'
import supabase from './utils/supabase'

interface Purchase {
  id?: number;
  purchased?: number;
}

function App() {
  const [mode, setMode] = useState('standard')
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    async function getPurchases() {
      const { data: purchases } = await supabase.from('wish_purchase').select('*')

      if (purchases && purchases.length > 1) {
        setPurchases(purchases)
      }
    }

    getPurchases()
  }, [])

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
        <WishList dataSource={mode === 'lego'
          ? legoWishes.map(w => ({
            ...w,
            purchased: purchases.find(p => p.id === w.id)?.purchased,
          }))
          : standardWishes.map(w => ({
            ...w,
            purchased: purchases.find(p => p.id === w.id)?.purchased,
          }))} />
      </div>
    </>
  )
}

export default App
