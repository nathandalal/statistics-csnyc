import React from 'react'

const ListRenderer = ({ list }) => (
  <div className="columns" style={{margin: "auto"}}>
    {list.map((number, index) => (
      <div className="column" key={index} className="tag is-info is-large">{number}</div>
    ))}
  </div>
)

export default ListRenderer