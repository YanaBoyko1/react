import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import { loadCart } from '../../redux/actions/cartActions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import { CartContainer, CartTitle, TotalAmount, ButtonContainer, BackButton, ContinueButton } from './CartPage.styles';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ініціалізуємо useNavigate
  const cartItems = useSelector((state) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);

  // Завантаження даних корзини при монтуванні компонента
  useEffect(() => {
    dispatch(loadCart());  // Завантажити дані корзини
  }, [dispatch]);

  // Обчислення загальної суми корзини
  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(total);  // Обчислення суми
  }, [cartItems]);

  // Функція для повернення на каталог
  const handleBackToCatalog = () => {
    navigate('/catalog');  // Перехід до каталогу
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Перехід до сторінки Checkout
  };

  return (
    <>
      <Header />
      <CartContainer>
        <CartTitle>Shopping Cart</CartTitle>
        {cartItems.map((item) => (
          <CartItem key={`${item.id}-${item.selectedColor}`} item={item} />
        ))}
        <TotalAmount>Total amount: ${totalAmount}</TotalAmount>
        <ButtonContainer>
          <BackButton onClick={handleBackToCatalog}>Back to Catalog</BackButton>  {/* Кнопка повернення */}
          <ContinueButton onClick={handleCheckout}>Continue</ContinueButton>
        </ButtonContainer>
      </CartContainer>
      <Footer />
    </>
  );
}


export default CartPage;
