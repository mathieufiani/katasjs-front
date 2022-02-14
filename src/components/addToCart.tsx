import React, { ChangeEvent, useEffect, useState } from "react";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../type";
import {
  add_to_cart,
  decrementCart,
  incrementCart,
  modifyCartQuantity,
  removeCart,
} from "../store/actionCreators";
import { cartSelector } from "../store/reducer";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";

type AddToCartProps = {
  id: number;
  isInACard: boolean;
};

/**
 * Component that allow to add beer to cart then modify quantity or delete item from cart
 * @param id id of the corresponding beer
 * @param isInACard checks weather the button is rendered on a full page or on a card from beer list
 * @constructor
 */
const AddToCart: React.FC<AddToCartProps> = ({ id, isInACard }) => {
  const dispatch = useDispatch();
  const cart: CartItem[] = useSelector(cartSelector);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartObj, setCartObj] = useState<CartItem | undefined>(undefined);

  // redux dispatcher
  const addToCart = () => {
    const item: CartItem = {
      id,
      quantity: 1,
    };
    dispatch(add_to_cart(item));
  };

  /**
   * Checks wether the item has been added to cart
   * @param cart total cart object from store
   */
  const isAddedToCart = (cart: CartItem[]): boolean => {
    return cart.some((el: CartItem) => el.id === id);
  };

  /**
   * Return the obj corresponding to id from cart store
   * @param cart is the cart store in the redux store
   */
  const getCartItem = (cart: CartItem[]): CartItem | undefined => {
    return cart.find((el: CartItem) => el.id === id);
  };

  // redux dispatcher
  const deleteCartItem = () => {
    dispatch(removeCart(id));
  };

  //redux dispatcher
  const incrementQuantity = () => {
    dispatch(incrementCart(id));
  };

  // redux dispatcher
  const decrementQuantity = () => {
    dispatch(decrementCart(id));
  };

  // This function allow to write on the input field the desired quantity of beers for each beer.
  const handleInputChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    dispatch(modifyCartQuantity(id, parseInt(value)));
  };

  // set local state values
  useEffect(() => {
    setIsInCart(isAddedToCart(cart));
    setCartObj(getCartItem(cart));
  }, [cart]);

  return isInCart && cartObj ? (
    <div className={`flex items-center ${isInACard ? "" : "mt-2 gap-2"}`}>
      {cartObj.quantity <= 1 ? (
        <button
          className={`card-button flex-1 ${isInACard ? "px-4" : ""}`}
          onClick={deleteCartItem}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      ) : (
        <button
          className={`card-button flex-1 ${isInACard ? "px-4" : ""}`}
          onClick={decrementQuantity}
        >
          -
        </button>
      )}

      <input
        className={`border-gray-100 flex-1 ${isInACard ? "p-0 w-20" : ""}`}
        type="number"
        value={cartObj.quantity ? cartObj.quantity : ""}
        onChange={handleInputChange}
        min="1"
      />

      <button
        className={`card-button flex-1 ${isInACard ? "px-4" : ""}`}
        onClick={incrementQuantity}
      >
        +
      </button>
    </div>
  ) : (
    <>
      <button
        className={`card-button ${isInACard ? "w-20" : ""}`}
        onClick={addToCart}
      >
        <CartIcon className={`h-4 w-4 ${isInACard ? "" : "mr-4"}`} />
        {isInACard ? "" : "Add to cart"}
      </button>
    </>
  );
};

export default AddToCart;
