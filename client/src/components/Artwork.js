import React, { useState } from 'react';
import LargeImage from './LargeImage';
import MoreInfo from './MoreInfo';

export default function Artwork({ artwork, setPauseTimer, imgTitle, imgSrc }) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div
      onClick={() => {
        setShowMoreInfo(true);
        setPauseTimer(true);
      }}
    >
      {imgTitle && imgTitle.length && <h2>{imgTitle}</h2>}
      <LargeImage imgSrc={imgSrc} imgTitle={imgTitle} />
      {showMoreInfo ? <MoreInfo artwork={artwork} closeInfo={() => {
        setShowMoreInfo(false);
        setPauseTimer(false);
      }} /> : <></>}
    </div>
  )
}
