import React, { useEffect, useState } from "react";
import { BeerDetail, Ingredient } from "../type";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { beersSelector, loadingSelector } from "../store/reducer";
import { fetch_beers } from "../store/actionCreators";
import AddToCart from "../components/addToCart";
import Layout from "../layouts";

const DetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // @ts-ignore
  const beer_id = parseInt(id);
  const isLoading: boolean = useSelector(loadingSelector);
  const beers: BeerDetail[] | any = useSelector(beersSelector);
  const [beer, setBeer]: BeerDetail | any = useState(false);

  /**
   * getting the beers object from store
   */
  const fetchbeers = async () => {
    dispatch(fetch_beers());
  };

  /**
   * This useEffect aim to always get to the top of the page on reload
   */
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchbeers();
  }, []);

  useEffect(() => {
    setBeer(getBeer());
  }, [beers]);

  /**
   * Get the beer depending on params
   */
  const getBeer = () => {
    const beer: BeerDetail = beers.find((el: BeerDetail) => el.id === beer_id);
    return beer;
  };

  return (
    <Layout>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : beer ? (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img
              className="h-96 w-auto mx-auto"
              alt={`bear-${beer.name}`}
              src={beer.image_url}
            />
          </div>
          <div className="md:hidden">
            <img
              className="h-96 w-auto mx-auto"
              alt={`bear-${beer.name}`}
              src={beer.image_url}
            />
          </div>
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div className="pb-4">
              <h1>{beer.name}</h1>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800">Volume</p>
              <div className="flex items-center justify-center">
                <p className="text-sm leading-none text-gray-600 mr-3">
                  {`${beer.volume.value} `}
                  {beer.volume.unit.charAt(0).toUpperCase() +
                    beer.volume.unit.slice(1)}
                </p>
              </div>
            </div>
            <AddToCart id={beer.id} isInACard={false} />
            <div>
              <p className="xl:pr-48 lg:leading-tight leading-normal mt-7">
                {beer.description}
              </p>
              <h2>Ingredients</h2>
              <p className="leading-4 mt-4">
                <span>Malt: </span>
                {beer.ingredients.malt.map((el: Ingredient, index: number) => {
                  if (index === beer.ingredients.malt.length - 1)
                    return `${el.name}.`;
                  return `${el.name}, `;
                })}
              </p>
              <p className="leading-4 mt-4">
                <span>Hops: </span>
                {beer.ingredients.hops.map((el: Ingredient, index: number) => {
                  if (index === beer.ingredients.hops.length - 1)
                    return `${el.name}.`;
                  return `${el.name}, `;
                })}
              </p>
              <p className="leading-4 mt-4">
                <span>Yeast: </span>
                {beer.ingredients.yeast}
              </p>
              <h2>Brewer's Tips</h2>
              <p className="text-base leading-4 mt-4 text-gray-600">
                {beer.brewers_tips}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Beer Not Found</h1>
      )}
    </Layout>
  );
};

export default DetailsPage;
