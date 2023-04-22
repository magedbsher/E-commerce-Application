import React from "react";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import Categories from "../Categories/Categories";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>

      <Categories />
      <FeatureProducts />
    </>
  );
}
