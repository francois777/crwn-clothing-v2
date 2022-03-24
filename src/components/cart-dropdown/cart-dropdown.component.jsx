import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button.component'
import './cart-dropdown.component.scss'
import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  console.log("[CartDropdown] cartItems: ", cartItems)

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
        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  )
}

export default CartDropdown
