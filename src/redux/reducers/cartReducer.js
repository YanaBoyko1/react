import {
  LOAD_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART, // Import the new action
} from '../actions/cartActions';

const initialState = {
  items: [], // Масив товарів у кошику
  total: 0,  // Загальна сума кошика
};

// Функція для розрахунку загальної суми кошика
const calculateTotal = (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        items: action.payload.map((item) => ({
          ...item,
          selectedColor: item.selected_color, // Перетворюємо selected_color на selectedColor
        })),
        total: calculateTotal(action.payload),
      };

    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        total: calculateTotal([...state.items, action.payload]),
      };
    }

    case REMOVE_FROM_CART: {
      const filteredItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.selectedColor === action.payload.selectedColor)
      );

      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
      };
    }

    case INCREASE_QUANTITY: {
      const increasedItems = state.items.map((item) =>
        item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: increasedItems,
        total: calculateTotal(increasedItems),
      };
    }

    case DECREASE_QUANTITY: {
      const decreasedItems = state.items.map((item) =>
        item.id === action.payload.id &&
        item.selectedColor === action.payload.selectedColor &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return {
        ...state,
        items: decreasedItems,
        total: calculateTotal(decreasedItems),
      };
    }

    case CLEAR_CART: {  // Handle the CLEAR_CART action
      return {
        ...state,
        items: [],
        total: 0,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
