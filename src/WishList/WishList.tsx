import './WishList.css'
import { useState } from 'react';
import supabase from '../utils/supabase';

export interface Wish {
  hidden?: boolean;
  id?: number;
  name?: string;
  pieceCount?: number;
  link?: string;
  priority?: number;
  backupLink?: string;
  imageAddress?: string;
  totalWanted?: number;
  purchased?: number;
}

interface WishListItemProps {
  dataSource: Wish[];
}

const fulfilled = (wish: Wish) => {
  return wish.purchased && wish.totalWanted && wish.purchased >= wish.totalWanted;
}

const MAX_REASONABLE_PURCHASES = 100;

function WishList({ dataSource }: WishListItemProps) {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [purchaseCount, setPurchaseCount] = useState(0);

  return (
    <div className='wishlist-container'>
      {dataSource
        .filter(d => !d.hidden === true)
        .sort((a: Wish, b: Wish) => a.priority! - b.priority!)
        .map(o =>
          <div
            className={`wish-container ${fulfilled(o) ? 'completed' : ''}`}
            onClick={() =>
              (!o.link || !o.totalWanted || (o.totalWanted > 0 && o.purchased && o.purchased >= o.totalWanted))
                ? null
                : window.open(o.link, '_blank')
            }
            key={o.id}
          >
            <div className={`wish-image`}>
              <img className='image' src={o.imageAddress} />
            </div>
            <div className='wish-text'>
              <h2>{o.name}</h2>
            </div>
            <div className={fulfilled(o) ? 'quantity-fulfilled' : ''}>
              <span>{o.purchased || 0} of {o.totalWanted && o.totalWanted > 0 ? o.totalWanted : '∞'} purchased</span>
            </div>
            <div className='bought-button' onClick={(e) => {
              e.stopPropagation();
              setSelectedWish(o);
              setPurchaseCount(o.purchased || 0);
              setModalOpen(true);
            }}>Mark purchased</div>
          </div>
        )}
      {modalOpen && selectedWish && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you buying "{selectedWish.name}"?</h3>
            <p>Update the total purchased count:
              {(selectedWish && selectedWish.totalWanted && selectedWish.totalWanted > 0)
                ? ` (Maximum is ${selectedWish.totalWanted})`
                : ''}
            </p>

            <div className='purchase-count-input'>
              <input
                value={purchaseCount}
                onChange={(e) => {
                  setPurchaseCount(parseInt(e.target.value, 10));
                }}
                min={0}
                max={selectedWish.totalWanted && selectedWish.totalWanted > 0 ? selectedWish.totalWanted : MAX_REASONABLE_PURCHASES}
              />
              
              <div className='purchase-count-button' onClick={() => setPurchaseCount(prev => Math.min(selectedWish.totalWanted ? selectedWish.totalWanted : MAX_REASONABLE_PURCHASES, prev + 1))}>
                <i className='fa-solid fa-angle-up'></i>
              </div>
              <div className='purchase-count-button' onClick={() => setPurchaseCount(prev => Math.max(0, prev - 1))}>
                <i className='fa-solid fa-angle-down'></i>
              </div>
            </div>
            <div>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button onClick={() => {

                // Validate and update the purchased count.
                // When total wanted is zero, the quantity can never be exceeded
                if (
                  selectedWish &&
                  selectedWish.totalWanted !== undefined &&
                  purchaseCount >= 0 &&
                  (purchaseCount <= selectedWish.totalWanted || selectedWish.totalWanted === 0)
                ) {
                  selectedWish.purchased = purchaseCount;

                  supabase.from('wish_purchase')
                    .upsert({
                      id: selectedWish.id,
                      purchased: purchaseCount,
                    })
                    .then(({ data, error }) => {
                      if (error) {
                        console.error('Error updating purchase count:', error);
                      } else {
                        console.log('Purchase count updated successfully:', data);
                      }
                    });
                  setModalOpen(false);
                } else {
                  setPurchaseCount(selectedWish ? (selectedWish.purchased || 0) : 0);
                }
              }}
              >Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WishList;