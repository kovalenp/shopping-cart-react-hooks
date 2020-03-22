import React from 'react';


const Card = props => {

  const { image, name, price, addProduct } = props;

  const addProductHandler = () => {
    addProduct(name, price)
  }

  return (
    <div className="card" onClick={addProductHandler}>
      <img src={image} alt={name} width='100%' />
      <div className='card-container'>
        <h3>{name}</h3>
        <p>Price: {price}</p>
      </div>
    </div>
  );
};

export default Card;
