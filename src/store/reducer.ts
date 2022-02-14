import * as actionTypes from "./actionTypes";
import { ActionCreator, BeerDetail, BeerState, CartItem } from "../type";

// ------------- REDUX STORE ----------
const initialState: BeerState = {
  loading: false,
  beers: [],
  error: "",
  cart: [],
};

// ------------- REDUCERS -------------
const reducer = (
  state: BeerState = initialState,
  action: ActionCreator
): BeerState => {
  switch (action.type) {
    case actionTypes.FETCH_BEERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_BEERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        beers: action.payload,
        error: "",
      });

    case actionTypes.FETCH_BEERS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        beers: action.payload,
        error: "",
      });
    case actionTypes.ADD_TO_CART:
      return Object.assign({}, state, {
        cart: [...state.cart, action.payload],
      });

    case actionTypes.INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(
          (item: CartItem): CartItem =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
        ),
      };

    case actionTypes.DECREMENT_QUANTITY:
      // If quantity decrement from one, the item is removed from the cart
      const itemToDecrement: CartItem | undefined = state.cart.find(
        (item: CartItem) => item.id === action.payload
      );
      if (itemToDecrement) {
        if (itemToDecrement.quantity === 1) {
          return {
            ...state,
            cart: state.cart.filter(
              (item: CartItem) => item.id !== action.payload
            ),
          };
        }
      }
      return {
        ...state,
        cart: state.cart.map(
          (item: CartItem): CartItem =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
        ),
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item: CartItem) => item.id !== action.payload),
      };

    case actionTypes.MODIFY_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item: CartItem) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      };
  }
  return state;
};

// --------- SELECTORS -----------

export const loadingSelector = (state: BeerState = initialState): boolean => {
  return state.loading;
};

export const beersSelector = (state = initialState): BeerDetail[] => {
  return state.beers;
};

export const cartSelector = (state: BeerState = initialState): CartItem[] => {
  return state.cart;
};

export const beerByIdSelector = (id: number) => {
  const beers = beersSelector();
  return beers.find((el: BeerDetail) => el.id === id);
};

export default reducer;
