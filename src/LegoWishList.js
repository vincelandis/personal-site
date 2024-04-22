import './LegoWishList.css';
import wishlist from './data/wishlist-lego.json';

const LegoWishList = () => {
    return (
        <>
            {wishlist.map(wish =>
                <div key={wish.id} className='wishListItem'>
                    <div>
                        <span className='wishListMetaData'>{wish.name}</span>
                        <br/>
                        <span className='wishListMetaData'>{wish.id}</span>
                        <br />
                        <span className='wishListMetaData'>{wish.pieceCount} Pieces</span>
                        <br/>
                        <a href={wish.link}>Shop</a>
                    </div>
                    <div className='wishListImageColumn'>
                        <img
                            className='wishListImage'
                            src={process.env.PUBLIC_URL + wish.imageRef}
                            alt={wish.name}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default LegoWishList;
