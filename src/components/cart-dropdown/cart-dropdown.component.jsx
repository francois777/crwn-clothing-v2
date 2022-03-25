import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom'

import Button from '../button/button.component'
import './cart-dropdown.component.scss'
import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const gotoCheckoutHandler = () => {
    console.log("[CartDropdown] - gotoCheckoutHandler")
    navigate('/checkout')
  }

  console.log("[CartDropdown], cartItems: ", cartItems)

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        { cartItems.length ? (
            cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))
          ) : (
              <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
