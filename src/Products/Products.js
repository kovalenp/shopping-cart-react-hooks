import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card'
import CartElement from '../UI/CartElement/CartElement';
import '../index.css'

const Cart = () => {

  const [cart, updateCart] = useState([]);
  const [catalogue, getCatalogue] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('https://5e77a9a9e3fd85001601f9dd.mockapi.io/api/v1/catalogue')
        .then(response => response.json())
        .then(responseData => getCatalogue(responseData.data))
        .catch(err => console.error('Error pulling catalogue', err))
    }, 1000)
    return () => { clearTimeout(timer) }
  }, [])

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

  const catalogueRender = (
    <section className='products'>
      {catalogue.map(product =>
        (
          <li key={product.id}>
            <Card image={product.image} name={product.name} price={product.price} addProduct={onAddProduct} />
          </li>
        )
      )}
    </section>
  )

  const spinner = (
    <div className="loader">Loading...</div>
  )

  return (
    <React.Fragment>
      <div className='layout-products'>
        <h1>Grocerries</h1>
        {catalogue.length > 0 ? catalogueRender : spinner}
      </div>
      <div className='layout-cart'>
        <h1>Shopping Cart</h1>
        {cart.map(el => (
          <li key={el.name}>
            <CartElement price={el.price} name={el.name} quantity={el.quantity} add={onAddProduct} remove={onRemoveProduct} />
          </li>
        ))}
        {calculateTotalPrice() > 0 ? <h2 className='total'>Total: {calculateTotalPrice()}</h2> : <p>Cart is empty</p>}
      </div>
    </React.Fragment>
  );
}

export default Cart;
