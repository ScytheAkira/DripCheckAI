import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (

    <div className="p-4">
         {!keyword? <Header /> : null}
         {isLoading?<Loader /> : isError? (<Message variant='danger'>
         {isError?.data.message || isError.error}</Message>) : (
            <>
                <div className="flex bg-[#171718] min-h-6 h-14  justify-between items-center text-primary-content">
                    <h1 className="ml-[20rem] text-[3rem]">
                        Special Products
                    </h1>
                    <Link to='/shop' className="bg-secondary font-bold rounded-full py-2 px-10 mr-[18rem]  hover:bg-pink-500">
                        Visit
                    </Link>
                    
                </div>
                <div className="ml-[5rem]">
                    <span className="text-primary-content font-extrabold text-[3rem]">Products </span>
                    <div className="grid grid-cols-4 gap-2 p-2 m-2">
                    {data.products.map((product) => (
                        <div key={product._id}>
                        <Product product={product} />
                        </div>
                    ))}
                    </div>
                </div>
            </>
         )}

    </div>
  );
};

export default Home;