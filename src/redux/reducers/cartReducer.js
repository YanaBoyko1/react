import {
  LOAD_CART,
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actions/cartActions';

const initialState = {
  items: [],
  total: 0
};

// Функція для обчислення загальної суми корзини
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
      };
    case ADD_TO_CART:
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    case INCREASE_QUANTITY:
    case DECREASE_QUANTITY:
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id && item.selectedColor === action.payload.selectedColor 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
      };
    default:
      return state;
  }
}
