import React from 'react'

const Row = ({ left, right }) => {
  return (
    <div className="container page">
      <div className="row">
        <div className="col-sm-12 col-md-9">{left}</div>
        <div className="col-sm-12 col-md-2">{right}</div>
      </div>
    </div>
  )
}

export default Row
