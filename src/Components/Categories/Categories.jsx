import React from "react";
import styles from "./Categories.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );

    //console.log(data.data);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="py-3 px-2">
            <img className="rounded " height={300} width={"100%"} src={category.image} alt="" />
            <h3 className="h6">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
