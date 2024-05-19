import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
//   useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaGenderless,
//   FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
// import moment from "moment";
import HeartIcon from "./HeartIcon";


const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [brandname, setBrandname] = useState(1);
  const [gender, setGender] = useState(0);
  const [subCategory, setSubCategory] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);


  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap items-between mt-[2rem] ml-[10rem] text-primary-content">
  <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
    <img
      src={product.image_url}
      alt={product.image_filename}
      className="w-full"
    />
  </div>

  <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between pl-4">
    <h2 className="text-2xl font-semibold">{product.productDisplayName}</h2>
    <p className="text-2xl my-4 font-semibold">Category: {product.masterCategory}</p>
    <p className="text-2xl my-4 font-semibold">Sub-Category: {product.subCategory}</p>
    <p className="text-2xl my-4 font-semibold">Article-Type: {product.articleType}</p>
    <p className="text-2xl my-4 font-semibold">Year: {product.year}</p>
    <p className="badge badge-lg badge-secondary text-2xl my-4 font-seminold">Rs. {product.price}</p>
    <div className="flex items-center justify-between w-full">
      <div>
        <h1 className="flex items-center mb-6">
          <FaStore className="mr-2 text-white" /> Brand: {product.brandname}
        </h1>
        <h1 className="flex items-center mb-6">
          <FaGenderless className="mr-2 text-white" /> Collection: {product.gender}
        </h1>
        <h1 className="flex items-center mb-6">
          <FaClock className="mr-2 text-white" /> Reviews: {product.season}
        </h1>
      </div>
    </div>
    <div className="btn-container">
      <HeartIcon product={product} />
    </div>
  </div>
</div>

        </>
      )}
    </>
  );
};

export default ProductDetails;