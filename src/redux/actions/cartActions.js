import axios from 'axios';

export const LOAD_CART = 'LOAD_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

const BASE_URL = 'http://localhost:5000/api/cart';

export const CLEAR_CART = 'CLEAR_CART';

export const clearCart = () => ({
  type: CLEAR_CART,
});
// Завантаження кошика
export const loadCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Loading cart with token:', token); // Log the token being used for the request

    // Make the request to the API
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log the response from the server for debugging
    console.log('Cart loaded successfully:', response.data);

    // Dispatch the action to update the Redux store
    dispatch({ type: LOAD_CART, payload: response.data.data });

  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error loading cart:', error.response?.data || error.message);

    // Optional: You can add additional logging if needed for debugging
    if (error.response) {
      console.error('Response error details:', error.response);
    }

    throw error; // Rethrow the error to be handled by the caller
  }
};


export const addToCart = (item) => async (dispatch) => {
  try {
    console.log('Adding to cart:', item); // Додано для перевірки
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      BASE_URL,
      {
        itemId: item.id,
        quantity: item.quantity,
        selectedColor: item.selectedColor, // Передача кольору
        price: item.price,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: LOAD_CART, payload: response.data.data });
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error.message);
    throw error;
  }
};

// Видалення товару з кошика
export const removeFromCart = (id, selectedColor) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');

    // Запит на сервер для видалення товару
    await axios.post(
      `${BASE_URL}/remove`,
      { id, selectedColor },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Оновлення стану Redux після успішного запиту
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { id, selectedColor },
    });
  } catch (error) {
    console.error('Error removing item from cart:', error.response?.data || error.message);
    throw error;
  }
};


// Збільшення кількості товару
// Збільшення кількості товару
export const increaseQuantity = (id, selectedColor) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.put(
      `${BASE_URL}/quantity`,
      { id, selectedColor, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Локальне оновлення стану Redux
    const { cart } = getState();
    const updatedItems = cart.items.map((item) =>
      item.id === id && item.selectedColor === selectedColor
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    dispatch({
      type: LOAD_CART,
      payload: updatedItems,
    });
  } catch (error) {
    console.error('Error increasing quantity:', error.message);
  }
};

// Зменшення кількості товару
export const decreaseQuantity = (id, selectedColor) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.put(
      `${BASE_URL}/quantity`,
      { id, selectedColor, quantity: -1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Локальне оновлення стану Redux
    const { cart } = getState();
    const updatedItems = cart.items.map((item) =>
      item.id === id && item.selectedColor === selectedColor && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    dispatch({
      type: LOAD_CART,
      payload: updatedItems,
    });
  } catch (error) {
    console.error('Error decreasing quantity:', error.message);
  }
};
