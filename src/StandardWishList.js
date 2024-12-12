import './StandardWishList.css';
import wishlist from './data/wishlist-standard.json';

const StandardWishList = () => {
    return (
        <>
            {wishlist.sort((a, b) => a.id > b.id ? 1 : -1).map(wish =>
                <div key={wish.id} className='wishListItem'>
                    <div className='leftColumn'>
                        <span className='wishListMetaData'>{wish.name}</span>
                        <br />
                        <a href={wish.link}>Shop <i class="fa-solid fa-arrow-up-right-from-square" /></a>
                        {
                            wish.backupLink ? <>
                                <br/>
                                <a href={wish.backupLink}>Shop (Backup) <i class="fa-solid fa-arrow-up-right-from-square"/></a>
                            </> : null
                        }
                    </div>
                    <div className='rightColumn' onClick={() => window.open(wish.link, '_blank')}>
                        <img
                            className='wishListImage'
                            src={process.env.PUBLIC_URL + `/images/wishlist-standard/${wish.id}.png`}
                            alt={wish.name}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default StandardWishList;
