import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [debouncedPriceFilter, setDebouncedPriceFilter] = useState(priceFilter);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
    priceFilter: debouncedPriceFilter,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceFilter(priceFilter);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [priceFilter]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      dispatch(setProducts(filteredProductsQuery.data));
    }
  }, [filteredProductsQuery.data, dispatch]);

  const handleBrandClick = useCallback((brandname) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brandname === brandname
    );
    dispatch(setProducts(productsByBrand));
  }, [filteredProductsQuery.data, dispatch]);

  const handleCheck = useCallback((value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  }, [checked, dispatch]);

  const uniqueBrands = useMemo(() => [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brandname)
          .filter((brandname) => brandname !== undefined)
      )
    ),
  ], [filteredProductsQuery.data]);

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-secondary rounded-full mb-2">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-secondary rounded-full mb-2">
              Filter by Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brandname) => (
                <div key={brandname} className="flex items-enter mr-4 mb-5">
                  <input
                    type="radio"
                    id={`brand-${brandname}`}
                    name="brand"
                    onChange={() => handleBrandClick(brandname)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`brand-${brandname}`}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brandname}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-secondary rounded-full mb-2">
              Filter by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0 text-primary-content">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
