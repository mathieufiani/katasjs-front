import React from "react";
import { Link } from "react-router-dom";
import { BeerDetail } from "../type";
import AddToCart from "./addToCart";

/**
 * This Component render a card for a given beer in the list page
 * @param props props are composed of attributes of a given beer
 * @constructor
 */
const Card: React.FC<BeerDetail> = (props: BeerDetail) => {
  // This is one beer card
  const { name, image_url, volume, id } = props;
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md w-96">
      <Link to={`/beers/${id}`}>
        <div>
          <img
            className="p-8 rounded-t-lg max-h-96 h-full w-auto mx-auto"
            src={image_url}
            alt="product image"
          />
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/beers/${id}`}>
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 hover:underline">
            {name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-900">{`${
            volume ? `${volume.value} ${volume.unit}` : "Non given volume"
          }`}</span>
          <AddToCart id={id ? id : 0} isInACard={true} />
        </div>
      </div>
    </div>
  );
};

export default Card;
