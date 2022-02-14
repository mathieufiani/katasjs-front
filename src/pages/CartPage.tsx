import React, { useEffect, useState } from "react";
import Layout from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { beersSelector, cartSelector } from "../store/reducer";
import { BeerDetail, BeerState, CartItem } from "../type";
import {
  decrementCart,
  fetch_beers,
  incrementCart,
  removeCart,
} from "../store/actionCreators";
import CartObject from "../components/CartObject";

const CartPage: React.FC = () => {
  // fetch cart
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const cart: CartItem[] = useSelector(cartSelector);
  const beers: BeerDetail[] = useSelector(beersSelector);
  const [beersInCartState, setBeersInCartState] = useState<
    CartItem[] | undefined
  >([]);
  // iterate pour cartitem list
  useEffect(() => {
    dispatch(fetch_beers());
  }, []);

  const setBeersCart = () => {
    const beersFounded: CartItem[] = [];
    cart.map((item: CartItem) => {
      const beerfound: BeerDetail | undefined = beers.find(
        (beer: BeerDetail) => beer.id === item.id
      );
      if (beerfound)
        beersFounded.push({
          ...item,
          beer: beerfound,
        });
    });
    setBeersInCartState(beersFounded);
  };

  const renderQuantity = (beer: BeerDetail | undefined): number => {
    if (beer) {
      const item = cart.find((item: CartItem) => item.id === beer.id);
      if (item) return item.quantity;
    }
    return 0;
  };

  const totalNbOfItemsInCart = (): number => {
    let sum = 0;
    cart.map((item: CartItem) => {
      sum += item.quantity;
    });
    return sum;
  };
  useEffect(() => {
    setBeersCart();
  }, [beers, cart]);

  return (
    <Layout>
      <div className="flex flex-col justify-end" id="cart">
        <div
          className="w-full w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
          id="scroll"
        >
          <div className="mx-8">
            <h2 className="text-5xl font-black leading-10 text-gray-800 pt-3">
              Cart
            </h2>

            <div className="md:flex flex-col gap-5 items-center mt-14 py-8 border-t border-gray-200">
              {cart.length ? (
                beersInCartState ? (
                  beersInCartState.map((cartItem: CartItem, index: number) => {
                    const beer: BeerDetail | undefined = cartItem.beer;
                    return beer ? (
                      <div key={index} className={"flex items-center w-full"}>
                        <CartObject beer={beer} />
                      </div>
                    ) : (
                      "Beer not found"
                    );
                  })
                ) : (
                  ""
                )
              ) : (
                <h2>The Cart is empty</h2>
              )}
            </div>
          </div>
          <div className="flex flex-col px-8 py-20">
            <h2 className="text-4xl font-black leading-9 text-gray-800">
              Summary
            </h2>
            <div>
              <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                <p className="text-2xl leading-normal text-gray-800">Total</p>
                <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                  {totalNbOfItemsInCart()} Items
                </p>
              </div>
              <button
                onClick={() => setShow(!show)}
                className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
