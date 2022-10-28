import React, { useEffect, useState } from "react";
import { Check, Star } from "react-feather";
import Radio from "../radio/radioButton";
import Checkbox from "../checkbox/checkBox";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import colors from "../../constants/colors";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { API_URL } from "../../config";

function ShopSideBar(props) {
  const [priceRange, setPriceRange] = useState([0, 9000]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ratingStars, setRatingStars] = useState(props.ratingStars);

  const getCategorys = async () => {
    try {
      const res = await fetch(`${API_URL}/api/category/`);
      const categorie = await res.json();
      setCategories(categorie);
    } catch (error) {
      console.log(error);
    }
  };
  const getBrands = async () => {
    try {
      const res = await fetch(`${API_URL}/api/brands/`);
      const apiResponse = await res.json();
      apiResponse = [...new Set(apiResponse.map((item) => item.brand))];
      setBrands(apiResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorys();
    getBrands();
  }, []);

  return (
    <PerfectScrollbar
      options={{
        wheelPropagation: false,
      }}
    >
      <div className="pt-3">
        <div className="m-3">
          <div className="mt-1">
            <h6 className="filter-title mb-0">Price range</h6>
          </div>
          <div className="mt-3">
            <p>
              {priceRange[0]} - {priceRange[1]} $
            </p>
            <Slider
              range
              trackStyle={{ backgroundColor: colors.primary2, height: 5 }}
              handleStyle={{
                borderColor: colors.primary2,
                backgroundColor: colors.white,
                opacity: 1,
              }}
              railStyle={{
                backgroundColor: colors.primary2,
                opacity: 0.2,
                height: 5,
              }}
              min={0}
              max={9000}
              defaultValue={[0, 9000]}
              onAfterChange={props.onRangeChange}
              onChange={(range) => setPriceRange(range)}
            />
          </div>
        </div>
        {categories.length > 0 && (
          <div className="m-3">
            <div className="product-category-title">
              <h6 className="filter-title mb-1">Categories</h6>
            </div>
            <ul className="list-unstyled mt-3">
              {categories.map((category) => (
                <li id={category.slug}>
                  <Radio
                    label={category.name}
                    value={category.slug}
                    defaultChecked={false}
                    name="categories-filter"
                    className="py-25"
                    onClick={props.onCategoryChange}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="m-3">
          <div className=" mt-1 pb-1">
            <h6 className=" mb-0">Brands</h6>
          </div>
          <div>
            <ul className="list-unstyled ">
              {brands.map((brand) => (
                <li
                  id={brand}
                  className="d-flex justify-content-between align-items-center py-25"
                >
                  <Checkbox
                    icon={<Check className="vx-icon" size={16} />}
                    label={brand}
                    value={brand}
                    defaultChecked={false}
                    onClick={props.onBrandChange}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-3">
          <div className=" mt-1 pb-75">
            <h6 className="filter-title mb-3">Ratings</h6>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Star
                size={23}
                color={ratingStars >= 1 ? colors.warning : colors.silver}
                onClick={() => {
                  setRatingStars(1);
                  props.onRatingStarsChange(1);
                }}
                style={{ cursor: "pointer" }}
              />
              <Star
                size={23}
                color={ratingStars >= 2 ? colors.warning : colors.silver}
                onClick={() => {
                  setRatingStars(2);
                  props.onRatingStarsChange(2);
                }}
                style={{ cursor: "pointer" }}
              />
              <Star
                size={23}
                color={ratingStars >= 3 ? colors.warning : colors.silver}
                onClick={() => {
                  setRatingStars(3);
                  props.onRatingStarsChange(3);
                }}
                style={{ cursor: "pointer" }}
              />
              <Star
                size={23}
                color={ratingStars >= 4 ? colors.warning : colors.silver}
                onClick={() => {
                  setRatingStars(4);
                  props.onRatingStarsChange(4);
                }}
                style={{ cursor: "pointer" }}
              />
              <Star
                size={23}
                color={ratingStars == 5 ? colors.warning : colors.silver}
                onClick={() => {
                  setRatingStars(5);
                  props.onRatingStarsChange(5);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p className="ml-3">& up</p>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  );
}

export default ShopSideBar;
