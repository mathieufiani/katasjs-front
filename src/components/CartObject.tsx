import React from "react";
import { BeerDetail, CartItem } from "../type";
import {
  decrementCart,
  incrementCart,
  removeCart,
} from "../store/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../store/reducer";
import { Link } from "react-router-dom";

type CartObjectType = {
  beer: BeerDetail;
};

/**
 * This is a cart item. Rendered dynamically depending on the cart.
 * @param beer object with properties of the beer
 * @param index index of the beer in the cart
 * @constructor
 */
const CartObject: React.FC<CartObjectType> = ({ beer }) => {
  const dispatch = useDispatch();
  const cart: CartItem[] = useSelector(cartSelector);

  /**
   * This function render for a given beer the quantity of items in the cart
   * @param beer beer object
   */
  const renderQuantity = (beer: BeerDetail | undefined): number => {
    if (beer) {
      const item = cart.find((item: CartItem) => item.id === beer.id);
      if (item) return item.quantity;
    }
    return 0;
  };

  return (
    <>
      <div className="w-20">
        <img
          alt={"beer image"}
          src={beer.image_url}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="md:pl-3 md:w-3/4 md:ml-4">
        {beer.volume ? (
          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
            {" "}
            {`${beer.volume.value} `}
            {/*Printing the unit measure with the first letter in uppercase*/}
            {beer.volume.unit.charAt(0).toUpperCase() +
              beer.volume.unit.slice(1)}
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between w-full pt-1">
          <Link to={`/beers/${beer.id}`}>
            <p className="text-base font-black leading-none text-gray-800 hover:underline">
              {beer.name}
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-between pt-5 pr-6">
          <div className="flex gap-2 items-center">
            <span
              className="cursor-pointer"
              onClick={() => {
                if (beer.id) dispatch(decrementCart(beer.id));
              }}
            >
              -
            </span>
            <p>Quantity : {renderQuantity(beer)}</p>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (beer.id) dispatch(incrementCart(beer.id));
              }}
            >
              +
            </span>
            <p
              className="text-xs leading-3 underline text-red-500 cursor-pointer pl-5"
              onClick={() => {
                if (beer.id) dispatch(removeCart(beer.id));
              }}
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartObject;
