import React from "react";

const PokemonThumbnails = ({ id, name, image, iconImage, type, jptype}) => {
  const className = `thumb-container ${type}`;
  return (
    <div className={className}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <img src={iconImage} alt={name} className="icon-image"/>
      <div className="detail-wrapper">
        <h4>{name}</h4>
        <h3>{jptype}</h3>
      </div>
    </div>
  );
}

export default PokemonThumbnails;