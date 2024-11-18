import axios from 'axios';

export const LOAD_CART = 'LOAD_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const URL = 'http://localhost:5000/api/cart';

// Завантаження корзини
export const loadCart = () => async (dispatch) => {
  try {
    const response = await axios.get(URL);
    dispatch({ type: LOAD_CART, payload: response.data });
  } catch (error) {
    console.error('Error loading cart:', error);
  }
};

// Додавання товару в корзину
export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await axios.post(URL, item);
    dispatch({ type: ADD_TO_CART, payload: response.data });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// Збільшення кількості товару
export const increaseQuantity = (id, selectedColor) => async (dispatch, getState) => {
  const cart = getState().cart.items;
  const item = cart.find((item) => item.id === id && item.selectedColor === selectedColor);

  if (item) {
    const newQuantity = item.quantity + 1;
    try {
      await axios.post(URL, { ...item, quantity: newQuantity });
      dispatch({ type: INCREASE_QUANTITY, payload: { id, selectedColor, quantity: newQuantity } });
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  }
};

// Зменшення кількості товару
export const decreaseQuantity = (id, selectedColor) => async (dispatch, getState) => {
  const cart = getState().cart.items;
  const item = cart.find((item) => item.id === id && item.selectedColor === selectedColor);

  if (item && item.quantity > 1) {
    const newQuantity = item.quantity - 1;
    try {
      await axios.post(URL, { ...item, quantity: newQuantity });
      dispatch({ type: DECREASE_QUANTITY, payload: { id, selectedColor, quantity: newQuantity } });
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  }
};

// Видалення товару з корзини
export const removeFromCart = (id, selectedColor) => async (dispatch, getState) => {
  const cart = getState().cart.items;
  const updatedCart = cart.filter(item => !(item.id === id && item.selectedColor === selectedColor));

  console.log('Updated Cart after removal:', updatedCart); // Логування для перевірки

  try {
    // Відправляємо запит на сервер для видалення товару
    await axios.post(`${URL}/remove`, { id, selectedColor });
    dispatch({ type: REMOVE_FROM_CART, payload: updatedCart });  // Оновлюємо стейт корзини в Redux
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};
