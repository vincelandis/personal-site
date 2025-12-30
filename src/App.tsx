import { useState, useEffect } from 'react'
import './App.css'
import WishList from './WishList/WishList'
import supabase from './utils/supabase'

interface Wish {
  hidden?: boolean;
  id?: number;
  name?: string;
  link?: string;
  priority?: number;
  imageAddress?: string;
  totalWanted?: number;
  purchased?: number;
}

interface WishPurchase {
  id?: number;
  purchased?: number;
}

function App() {
  const [mode, setMode] = useState('lego')
  const [wishes, setWishes] = useState<Wish[]>([])
  const [purchases, setPurchases] = useState<WishPurchase[]>([])

  useEffect(() => {
    async function getPurchases() {
      const { data: purchases } = await supabase.from('wish_purchase').select('*')
      const { data: wishes } = await supabase.from('wish').select('*')

      if (purchases && purchases.length > 1) {
        setPurchases(purchases)
      }

      if (wishes && wishes.length > 1) {
        setWishes(wishes)
      }

      const orphaned = purchases?.filter(p => !wishes?.find(w => w.id === p.id))
      if (orphaned && orphaned.length > 0) {
        console.warn('Orphaned purchases found:', orphaned.map(o => o.id).join(', '))
      }
    }

    getPurchases()
  }, [])

  return (
    <>
      <h1>Vince Wishlist</h1>
      <div className='card'>
        <button className={`button-left ${mode === 'lego' ? 'selected' : ''}`}
          onClick={() => setMode('lego')}
        >
          LEGO
        </button>
        <button className={`button-right ${mode === 'standard' ? 'selected' : ''}`}
          onClick={() => setMode('standard')}
        >
          STANDARD
        </button>
      </div>
      <div>
        <WishList dataSource={wishes
          .filter(w => w.hidden !== true)
          .filter(w => mode === 'lego' ? w.id! > 1000 : w.id! <= 1000)
          .map(w => ({
            ...w,
            purchased: purchases.find(p => p.id === w.id)?.purchased,
          }))} />
      </div>
    </>
  )
}

export default App
