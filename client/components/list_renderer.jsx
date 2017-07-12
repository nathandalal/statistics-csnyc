import React from 'react'
import bowser from 'bowser'

const NumberCircle = ({ n }) => (
  <span className="tag is-info is-large" style={{padding:"10px"}}>
    {n >= 10 ? n : <span>&nbsp;{n}&nbsp;</span>}
  </span>
)

const ListRenderer = ({ list }) => {
  let getAnimation = () => {
    let animations = ["pulse", "zoomIn", "bounce", "jackInTheBox", 
                    "fadeInDown", "fadeInLeft", "bounceIn", "tada", "shake", "rubberBand"]
    return animations[Math.floor(Math.random()*animations.length)];
  }

  return (
    <div className={`columns is-mobile animated ${getAnimation()}`} style={{margin: "0 auto", width: "100%"}}>
      {list.map((number, index) => <div className="column" key={index}><NumberCircle n={number} /></div>)}
    </div>
  )
}

export default ListRenderer