import './StandardWishList.css';
import wishlist from './data/wishlist-standard.json';

const StandardWishList = () => {
    return (
        <>
            {wishlist
                .sort((a, b) => a.priority > b.priority ? 1 : -1)
                .filter(o => !o.hidden)
                .map(wish =>
                    <div key={wish.id} className='wishListItem'>
                        <div className='leftColumn'>
                            <span className='wishListMetaData'>{wish.name}</span>
                            <br />
                            {wish.link
                                ? <a href={wish.link}>Shop <i class="fa-solid fa-arrow-up-right-from-square" /></a>
                                : null
                            }
                            {wish.backupLink
                                ? <>
                                    <br />
                                    <a href={wish.backupLink}>Shop (Backup) <i class="fa-solid fa-arrow-up-right-from-square" /></a>
                                </>
                                : null
                            }
                            <img
                                onClick={wish.link ? () => window.open(wish.link, '_blank') : null}
                                className='wishListImage'
                                src={process.env.PUBLIC_URL + `/images/wishlist-standard/${wish.imageId}.png`}
                                alt={wish.name}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default StandardWishList;
