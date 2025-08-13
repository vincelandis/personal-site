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
}

interface WishListItemProps {
  dataSource: Wish[];
}

function WishList({ dataSource }: WishListItemProps) {

  function getScreenSize(width: number) {
    return width < 1200 ? 'mobile' : 'desktop';
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
  const isDesktop = screenSize === 'desktop';

  return (
    <>
      {dataSource.map(o =>
        <>
          {o.name}
        </>)}
      <br />
      {isMobile && <>mobile size detected</>}
      {isDesktop && <>desktop size detected</>}
    </>
  )
}

export default WishList
