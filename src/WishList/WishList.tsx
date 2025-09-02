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
  // const isDesktop = screenSize === 'desktop';

  return (
    <>
      {dataSource
        .filter(d => !d.hidden === true)
        .sort((a: Wish, b: Wish) => a.priority && b.priority && a.priority > b.priority ? 1 : -1)
        .map(o =>
          <div
            className={`wish-container-${isMobile ? 'mobile' : 'desktop'}`}
            onClick={() => window.open(o.link, '_blank')}
          >
            <div className={`wish-text`}>
              <h2>{o.name}</h2>
            </div>
            <div className={`wish-image`}>
              <img className={`image-v`} src={o.imageAddress} />
            </div>
          </div>
        )}
    </>
  )
}

export default WishList
