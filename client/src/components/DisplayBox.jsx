import React from 'react'

const DisplayBox = ({ imgSrc, imgOrder, content, contentOrder }) => {
  return (
    <div>
      <img src={imgSrc} className={imgOrder} alt="sunflower" />
      <p className={contentOrder}>{JSON.stringify(content)}</p>
    </div>
  )
}

export default DisplayBox
