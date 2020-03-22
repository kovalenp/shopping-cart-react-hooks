import React from 'react';

const CartElement = props => {

  const { name, quantity, add, remove, price } = props;

  const addMoreHandler = () => {
    add(name, price)
  }

  const removeHandler = () => {
    remove(name, price)
  }

  return (
    <div className='cart-element'>
      <h3>{name}</h3>
      <p>Pieces: {quantity}x</p>
      <p>Unit price: {price}</p>
      <button className='button' onClick={addMoreHandler}>+</button>
      <button className='button' onClick={removeHandler}>-</button>
    </div>
  );
};

export default CartElement;
