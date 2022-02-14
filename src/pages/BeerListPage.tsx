import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { beersSelector, loadingSelector } from "../store/reducer";
import { fetch_beers } from "../store/actionCreators";
import Card from "../components/card";
import { BeerDetail } from "../type";
import Layout from "../layouts";

const BeerListPage: React.FC = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(loadingSelector);
  const beers: BeerDetail[] | any = useSelector(beersSelector);

  const fetchbeers = () => {
    dispatch(fetch_beers());
  };

  useEffect(() => {
    fetchbeers();
  }, [isLoading]);

  return (
    <Layout>
      {isLoading ? (
        <h1>Hello</h1>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center mt-10 max-w-[90%] mx-auto">
          {beers ? (
            beers.map((beer: BeerDetail, index: number) => {
              const { id, name, image_url, volume } = beer;
              return (
                <Card
                  key={index}
                  name={name}
                  image_url={image_url}
                  volume={volume}
                  id={id}
                />
              );
            })
          ) : (
            <h1>isLoading ...</h1>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BeerListPage;
