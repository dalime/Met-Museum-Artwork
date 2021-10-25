import React from 'react'

export default function LargeImage({ imgSrc, imgTitle }) {
  return (
    <img src={imgSrc} alt={imgTitle} style={{ width: 500, height: 500, }} width={500} height={500} />
  )
}
