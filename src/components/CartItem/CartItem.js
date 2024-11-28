import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../redux/actions/cartActions';
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

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  // Обробники для збільшення та зменшення кількості
  const handleIncrease = () => {
    if (item.quantity < 10) {  // Обмеження на кількість 10
      dispatch(increaseQuantity(item.id, item.selectedColor));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id, item.selectedColor));
    }
  };

  return (
    <CartItemContainer>
      {/* Формуємо правильний шлях до зображення */}
      <ItemImage 
        src={`http://localhost:5000/image/${item.image}`}  // Формуємо правильний шлях
        alt={item.title}
      />

      {/* Деталі товару */}
      <ItemDetails>
        <ItemTitle>{item.title}</ItemTitle>
        {item.selectedColor ? (
          <ItemProperty>Color: {item.selectedColor}</ItemProperty>
        ) : (
          <ItemProperty style={{ color: 'red' }}>No color selected</ItemProperty>
        )}
      </ItemDetails>

      {/* Кількість товару */}
      <QuantityControls>
        <QuantityButton
          onClick={handleDecrease}
          disabled={item.quantity <= 1} // Блокуємо кнопку, якщо кількість = 1
        >
          -
        </QuantityButton>
        <span>{item.quantity}</span>
        <QuantityButton
          onClick={handleIncrease}
          disabled={item.quantity >= 10} // Блокуємо кнопку, якщо кількість досягла 10
        >
          +
        </QuantityButton>
      </QuantityControls>

      {/* Ціна товару */}
      <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>

      {/* Кнопка видалення */}
      <RemoveButton onClick={() => onRemove(item.id, item.selectedColor)}>
        Remove
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
