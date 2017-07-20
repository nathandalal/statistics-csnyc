import React from 'react'
import bowser from 'bowser'

const NumberCircle = ({ n, active, size, type }) => {
  let getAnimation = () => {
    let animations = ["zoomIn", "bounce", "jackInTheBox", 
                    "fadeInDown", "bounceIn", "tada"]
    return animations[Math.floor(Math.random() * animations.length)];
  }

  return (
    <span className={`tag ${active ? `is-light animated ${getAnimation()}` : (type ? `is-${type}` : "is-info")} is-${size}`} 
      style={{padding:"10px"}}>
      {n >= 10 ? n : <span>&nbsp;{n}&nbsp;</span>}
    </span>
  )
}

const ListRenderer = ({ list, activeIndex, size="large", colorList }) => {
  return (
    <div className="columns is-mobile is-multiline" style={{margin: "0 auto", width: "100%"}}>
      {list.map((number, index) => (
        <div className="column" key={index}>
          <NumberCircle n={number} 
            active={index == activeIndex} size={size} 
            type={colorList && colorList[index] ? colorList[index] : ""}/>
        </div>))}
    </div>
  )
}

export default ListRenderer