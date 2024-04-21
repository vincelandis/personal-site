import './LegoWishList.css';
import wishlist from './data/wishlist-lego.json';

const LegoWishList = () => {
    return (
        <>
            {wishlist.map(wish =>
                <a href={wish.link} key={wish.id}>
                    <div className='wishListItem'>
                        <span>{wish.name}</span>
                        <br />
                        <span>{wish.id}</span>
                        <br />
                        <span>{wish.pieceCount} Pieces</span>
                        <img src={wish.imageRef} alt={wish.name}/>
                    </div>
                </a>
            )}
        </>
    );
}

export default LegoWishList;
