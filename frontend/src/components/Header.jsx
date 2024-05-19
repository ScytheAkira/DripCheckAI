// import { useAllProductsQuery } from "../redux/api/productApiSlice";
// import Loader from "./Loader";
// import SmallProduct from "../pages/Products/SmallProduct";
// import ProductCarousel from "../pages/Products/ProductCarousel";

// const Header = () => {
//   const { data, isLoading, error } = useAllProductsQuery();

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <h1>ERROR</h1>;
//   }

//   return (
//     <>
//       <div className="flex justify-around">
//         <div className="xl:block lg:hidden md:hidden:sm:hidden">
//           <div className="grid grid-cols-2">
//             {data.map((product) => (
//               <div key={product._id}>
//                 <SmallProduct product={product} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <ProductCarousel />
//       </div>
//     </>
//   );
// };

// export default Header;


import { useAllProductsQuery, useGetNewProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetNewProductsQuery();
    console.log(data);
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <h1>ERROR</h1>;
    }
    return (
        <div className="flex justify-around m-4">
            <div className="xl:block lg:hidden md:hidden sm:hidden text-primary-content">
                <h1 className="font-bold text-xl mb-4">
                    New Products
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {data.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel products={data}/>
        </div>
    );
};

export default Header;
