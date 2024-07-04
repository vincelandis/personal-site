import './LegoWishList.css';
import wishlist from './data/wishlist-lego.json';

const LegoWishList = () => {
    return (
        <>
            {wishlist.map(wish =>
                <div key={wish.id} className='wishListItem'>
                    <div className='leftColumn'>
                        <span className='wishListMetaData'>{wish.name}</span>
                        <br/>
                        <code className='wishListMetaData'>Set id: {wish.id}</code>
                        <br />
                        <code className='wishListMetaData'>{wish.pieceCount} Pieces</code>
                        <br/>
                        <a href={wish.link}>Shop <i class="fa-solid fa-arrow-up-right-from-square"/></a>
                    </div>
                    <div className='rightColumn' onClick={() => window.open(wish.link, '_blank')}>
                        <img
                            className='wishListImage'
                            src={process.env.PUBLIC_URL + `/images/wishlist-lego/${wish.id}.png`}
                            alt={wish.name}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default LegoWishList;
