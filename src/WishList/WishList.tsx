import './WishList.css'
import { useState, useEffect } from 'react';

export interface Wish {
  hidden?: boolean;
  id?: string;
  name?: string;
  pieceCount?: number;
  link?: string;
  priority?: number;
  backupLink?: string;
  imageAddress?: string;
}

interface WishListItemProps {
  dataSource: Wish[];
}

const MOBILE_SCREEN_SIZE_CUTOFF = 950;

function WishList({ dataSource }: WishListItemProps) {

  function getScreenSize(width: number) {
    return width < MOBILE_SCREEN_SIZE_CUTOFF ? 'mobile' : 'desktop';
  }

  const [screenSize, setScreenSize] = useState(getScreenSize(window.innerWidth));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newScreenSize = getScreenSize(window.innerWidth);
      setScreenSize(newScreenSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize === 'mobile';

  return (
    <div className='wishlist-container'>
      {dataSource
        .filter(d => !d.hidden === true)
        .sort((a: Wish, b: Wish) => a.priority! - b.priority!)
        .map(o =>
          <div
            className={`wish-container-${isMobile ? 'mobile' : 'desktop'}`}
            onClick={() => window.open(o.link, '_blank')}
          >
            <div className={`wish-image`}>
              <img className={`image`} src={o.imageAddress} />
            </div>
            <div className={`wish-text`}>
              <h2>{o.name}</h2>
            </div>
          </div>
        )}
    </div>
  )
}

export default WishList
