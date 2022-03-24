import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, stockItem) => {
  // find if cartItems contains productToAdd
  const result = cartItems.find(cartItem =>
    cartItem.id === stockItem.id
  )

  // If found, increment quantity
  if (result) {
    // increment quantity
    return cartItems.map((cartItem) => cartItem.id === stockItem.id ?
      {...cartItem, quantity: cartItem.quantity + 1 } :
      cartItem
    )
  }
  // else, include new item
  return [...cartItems, {...stockItem, quantity: 1}]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartItemCount, setCartCount] = useState(0)

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(count);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
    console.log("[CartProvider] addItemToCart")
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemCount }

  console.log("[CartProvider], about to render, cartItemCount: ", cartItemCount)

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
