import React, { useState } from 'react';
import Card from '../UI/Card/Card'
import CartElement from '../UI/CartElement/CartElement';
import '../index.css'


const Cart = () => {

  const data = [
    {
      id: 1,
      name: "Eggs",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/W1ymDizfe679XsfX9uP8A5bU/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 100,
    },
    {
      id: 2,
      name: "Milk",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/b1qEMnNGbwiwV5cWysofPoqz/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 20,
    },
    {
      id: 3,
      name: "Cheese",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/1avpwnxKAEqEpTf1k3VCbBbg/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 50,
    },
    {
      id: 4,
      name: "Chocolate",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/A6V76f1zeu3NWkf5seBERe6c/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 20,
    },
    {
      id: 5,
      name: "Yougurt",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/DW7VY421uYHJLnNgCUEMYYqH/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 20,
    },
    {
      id: 6,
      name: "Cottage cheese",
      image: "https://d17zv3ray5yxvp.cloudfront.net/variants/3DA8n1qQnuziMNBQjZCH2XKB/7b27a910a7194c812eacf34700e38dcab3abed02f30837d1dad313c5651bb5fa",
      price: 20,
    },
  ]

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
