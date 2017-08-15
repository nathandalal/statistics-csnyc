import React from 'react'

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

const ListRenderer = ({ list, activeIndex, size="large", colorList, dividerIndex }) => {
  return (
    <div className="columns is-mobile is-multiline" style={{margin: "0 auto", width: "100%"}}>
      {list.map((number, index) => (
        <div className="column is-3-mobile" style={{position: "relative"}} key={index}>
          <NumberCircle n={number} 
            active={index == activeIndex} size={size} 
            type={colorList && colorList[index] ? colorList[index] : ""}/>
          {(dividerIndex == 0 || dividerIndex) && index == dividerIndex ? 
            <hr style={{position: "absolute", height: "80%", width: 0, right: 15, top: -20, border: "1px solid black"}}/> : ""}
        </div>))}
    </div>
  )
}

export default ListRenderer