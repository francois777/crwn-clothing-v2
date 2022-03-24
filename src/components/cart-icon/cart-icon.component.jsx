import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext)

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  console.log("[CartIcon] number of items: ", cartItemCount)

  return (
    <div className='cart-icon-container' onClick={toggleCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItemCount}</span>
    </div>
  )
}

export default CartIcon
