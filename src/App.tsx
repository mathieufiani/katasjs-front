import React from "react";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import BeerListPage from "./pages/BeerListPage";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={"/beers"} element={<BeerListPage />} />
      <Route path={"/beers/:id"} element={<DetailsPage />} />
      <Route path={"/cart"} element={<CartPage />} />
      <Route path={"*"} element={<Navigate to={"/beers"} />} />
    </Routes>
  );
};

export default App;
