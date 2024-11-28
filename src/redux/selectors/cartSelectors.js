import { createSelector } from 'reselect';

const selectCartState = (state) => state.cart;


export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartTotal = (state) => state.cart?.total || 0;
