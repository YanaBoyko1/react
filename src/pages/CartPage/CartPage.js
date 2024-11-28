import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCart, removeFromCart } from '../../redux/actions/cartActions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import { selectCartItems, selectCartTotal } from '../../redux/selectors/cartSelectors';
import {
  CartContainer,
  CartTitle,
  TotalAmount,
  ButtonContainer,
  BackButton,
  ContinueButton,
} from './CartPage.styles';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);

  const [localCart, setLocalCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await dispatch(loadCart());
      } catch (err) {
        setError('Failed to load cart.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const handleRemoveItem = async (id, selectedColor) => {
    const updatedCart = localCart.filter(
      (item) => !(item.id === id && item.selectedColor === selectedColor)
    );
    setLocalCart(updatedCart);

    try {
      await dispatch(removeFromCart(id, selectedColor));
    } catch (err) {
      setError('Failed to remove item.');
      setLocalCart(cartItems);
    }
  };

  return (
    <>
      <Header />
      <CartContainer>
        <CartTitle>Your Cart</CartTitle>
        {isLoading ? (
          <p>Loading...</p>
        ) : localCart.length > 0 ? (
          localCart.map((item) => (
            <CartItem
              key={`${item.id}-${item.selectedColor}`}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {localCart.length > 0 && (
          <TotalAmount>Total Amount: ${totalAmount.toFixed(2)}</TotalAmount>
        )}
        <ButtonContainer>
          <BackButton onClick={() => navigate('/catalog')}>Back to Catalog</BackButton>
          <ContinueButton onClick={() => navigate('/checkout')}>Continue</ContinueButton>
        </ButtonContainer>
      </CartContainer>
      <Footer />
    </>
  );
};

export default CartPage;
