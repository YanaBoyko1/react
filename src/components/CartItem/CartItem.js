import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/actions/cartActions';
import Alert from '../Alert/Alert'; // Імпортуємо Alert
import {
  CartItemContainer,
  ItemImage,
  ItemDetails,
  ItemTitle,
  QuantityControls,
  QuantityButton,
  ItemPrice,
  ItemProperty,
  RemoveButton,
} from './CartItem.styles';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");  // Для зберігання повідомлення про помилку

  // Функція для збільшення кількості
  const handleIncrease = () => {
    if (item.quantity < item.maxQuantity) {
      dispatch(increaseQuantity(item.id, item.selectedColor));  // Передаємо id та selectedColor
      setError("");  // Очищаємо повідомлення про помилку
    } else {
      setError(`Maximum quantity for this product: ${item.maxQuantity}`);  // Якщо більше максимальної кількості
    }
  };

  // Функція для зменшення кількості
  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id, item.selectedColor));  // Передаємо id та selectedColor
      setError("");  // Очищаємо повідомлення про помилку
    }
  };

  // Функція для видалення товару
  const handleRemove = () => {
    dispatch(removeFromCart(item.id, item.selectedColor));
  };

  return (
    <CartItemContainer>
      <ItemImage src={item.image} alt={item.title} />
      <ItemDetails>
        <ItemTitle>{item.title}</ItemTitle>
        {item.selectedColor && <ItemProperty>Color: {item.selectedColor}</ItemProperty>}
      </ItemDetails>
      <QuantityControls>
        <QuantityButton onClick={handleDecrease}>-</QuantityButton>
        <span>{item.quantity}</span>
        <QuantityButton onClick={handleIncrease}>+</QuantityButton>
      </QuantityControls>
      <ItemPrice>${item.price * item.quantity}</ItemPrice>
      <RemoveButton onClick={handleRemove}>Remove</RemoveButton> {/* Кнопка для видалення товару */}

      {/* Виведення алерту, якщо є помилка */}
      {error && <Alert message={error} />}
    </CartItemContainer>
  );
}

export default CartItem;
