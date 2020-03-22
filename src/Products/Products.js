import React, { useState } from 'react';
import Card from '../UI/Card/Card'
import CartElement from '../UI/CartElement/CartElement';
import '../index.css'

// TODO: replace with Firebase and useEffect hook
import data from '../data/data'

const Cart = () => {

  const [cart, updateCart] = useState([]);

  const onAddProduct = (name, price) => {
    updateCart(existingProducts => {
      let isNewObj = true;
      const newProducts = existingProducts.map(i => {
        if (i.name === name) {
          isNewObj = false;
          return { ...i, quantity: i.quantity += 1 }
        } else {
          return i;
        }
      })
      if (isNewObj) newProducts.push({ name, price, quantity: 1 })
      return newProducts;
    })
  }

  const onRemoveProduct = (name) => {
    updateCart(existingProducts => {
      const newProducts = existingProducts.map(i => {
        if (i.name === name) {
          return { ...i, quantity: i.quantity -= 1 }
        } else {
          return i;
        }
      })
      return newProducts.filter(i => i.quantity > 0)
    })
  }

  const calculateTotalPrice = () => {
    return cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
  }

  return (
    <React.Fragment>
      <div className='layout-products'>
        <h1>Grocerries</h1>
        <section className='products'>
          {data.map(product =>
            (
              <li key={product.id}>
                <Card image={product.image} name={product.name} price={product.price} addProduct={onAddProduct} />
              </li>
            )
          )}
        </section>
      </div>
      <div className='layout-cart'>
        <h1>Shopping Cart</h1>
        {cart.map(el => (
          <li key={el.id}>
            <CartElement price={el.price} name={el.name} quantity={el.quantity} add={onAddProduct} remove={onRemoveProduct} />
          </li>
        ))}
        {calculateTotalPrice() > 0 ? <h2>Total: {calculateTotalPrice()}</h2> : <p>Cart is empty</p>}
      </div>
    </React.Fragment>
  );
}

export default Cart;
