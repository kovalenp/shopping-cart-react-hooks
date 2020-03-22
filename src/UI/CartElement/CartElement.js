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
      <button className='button' onClick={removeHandler}>-</button>
      <p>{quantity}</p>
      <button className='button' onClick={addMoreHandler}>+</button>
    </div>
  );
};

export default CartElement;
