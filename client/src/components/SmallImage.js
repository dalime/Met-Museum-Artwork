import React from 'react'

export default function LargeImage({ key, imgSrc, imgTitle }) {
  return (
    <img key={key} src={imgSrc} alt={imgTitle} style={{ width: 200, height: 200, }} width={200} height={200} />
  )
}
