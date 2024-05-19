import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    // <div className="ml-[10rem]">
    //   <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
    //     FAVORITE PRODUCTS
    //   </h1>

    //   <div className="flex flex-wrap">
    //     {favorites.map((product) => (
    //       <Product key={product._id} product={product} />
    //     ))}
    //   </div>
    // </div>

        <div className="ml-[5rem]">
            <span className="text-primary-content font-extrabold text-[3rem]"> Favourite Products </span>
            <div className="grid grid-cols-4 gap-2 p-2 m-2">
            {favorites.map((product) => (
                <div key={product._id}>
                <Product key={product._id} product={product} />
                </div>
            ))}
            </div>
        </div>
  );
};

export default Favorites;