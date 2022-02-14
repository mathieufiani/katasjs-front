import axios, { AxiosResponse } from "axios";
import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  FETCH_BEERS_FAILURE,
  FETCH_BEERS_REQUEST,
  FETCH_BEERS_SUCCESS,
  INCREMENT_QUANTITY,
  MODIFY_QUANTITY,
  REMOVE_FROM_CART,
} from "./actionTypes";
import { Dispatch } from "react";
import { ActionCreator, BeerDetail, CartItem } from "../type";

const fetchBeersRequest = (): ActionCreator => {
  return {
    type: FETCH_BEERS_REQUEST,
  };
};

const fetchBeersSuccess = (beers: object[]): ActionCreator => {
  return {
    type: FETCH_BEERS_SUCCESS,
    payload: beers,
  };
};

const fetchBeersFailure = (error: string): ActionCreator => {
  return {
    type: FETCH_BEERS_FAILURE,
    payload: error,
  };
};

export const add_to_cart = (item: CartItem): ActionCreator => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const incrementCart = (id: number): ActionCreator => {
  return {
    type: INCREMENT_QUANTITY,
    payload: id,
  };
};

export const decrementCart = (id: number): ActionCreator => {
  return {
    type: DECREMENT_QUANTITY,
    payload: id,
  };
};

export const removeCart = (id: number): ActionCreator => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const modifyCartQuantity = (
  id: number,
  quantity: number
): ActionCreator => {
  return {
    type: MODIFY_QUANTITY,
    payload: { id, quantity },
  };
};

export const fetch_beers = () => (dispatch: Dispatch<any>) => {
  dispatch(fetchBeersRequest);
  axios
    .get("https://api.punkapi.com/v2/beers")
    .then((response: AxiosResponse<BeerDetail[]>) => {
      dispatch(fetchBeersSuccess(response.data));
    })
    .catch((error) => dispatch(fetchBeersFailure(error.message)));
};
