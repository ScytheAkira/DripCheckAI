// import { useAllProductsQuery } from "../../redux/api/productApiSlice";
// import Message from "../../components/Message";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { PIC_URL } from "../../redux/constants";
// import moment from "moment";
// import {
//   FaBox,
//   FaClock,
//   FaShoppingCart,
//   FaStar,
//   FaStore,
// } from "react-icons/fa";

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useAllProductsQuery();

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="mb-4 lg:block xl:block md:block">
//       {isLoading ? null : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <Slider
//           {...settings}
//           className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
//         >
//           {products.map(
//             ({
//               _id,
//               gender,
//               masterCategory,
//               subCategory,
//               articleType,
//               baseColour,
//               season,
//               year,
//               usage,
//               productDisplayName,
//               brandname,
//               image_filename,
//               image_url,
//               price
//             }) => (
//               <div key={_id}>
//                 <img
//                   src={`${PIC_URL}${image_url}`}
//                   alt={image_filename}
//                   className="w-full rounded-lg object-cover h-[30rem]"
//                 />

//                 <div className="mt-4 flex justify-between">
//                   <div className="one">
//                     <h2>{productDisplayName}</h2>
//                     <p> $ {price}</p> <br /> <br />
//                     <p className="w-[25rem]">
//                      <p>Collection: {gender}</p>
//                      <p>Category: {subCategory}</p>
//                      <p>Article: {articleType}</p>
//                     </p>
//                   </div>

//                   <div className="flex justify-between w-[20rem]">
//                     <div className="one">
//                       <h1 className="flex items-center mb-6">
//                         <FaStore className="mr-2 text-white" /> Brand: {brandname}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaStar className="mr-2 text-white" /> Season:
//                         {season}
//                       </h1>
//                     </div>

//                     {/* <div className="two">
//                       <h1 className="flex items-center mb-6">
//                         <FaStar className="mr-2 text-white" /> Ratings:{" "}
//                         {Math.round(rating)}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
//                         {quantity}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaBox className="mr-2 text-white" /> In Stock:{" "}
//                         {countInStock}
//                       </h1>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </Slider>
//       )}
//     </div>
//   );
// };

// export default ProductCarousel;

// import SmallProduct from "./SmallProduct";

// const ProductCarousel = ({ products }) => {
//     return (
//         <div className="carousel w-full h-screen glass rounded-full" style={{ width: '45%' }}>
//             {products.map((product, index) => (
//                 <div id={`slide${index + 1}`} className="carousel-item relative w-full h-full flex justify-center items-center" key={product._id}>
//                     <SmallProduct product={product} />
//                     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//                         <a href={`#slide${index === 0 ? products.length : index}`} className="btn btn-circle btn-accent">❮</a>
//                         <a href={`#slide${(index + 1) % products.length + 1}`} className="btn btn-circle btn-accent">❯</a>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductCarousel;


import CarouselProduct from "./CarouselProduct";

const ProductCarousel = ({ products }) => {
    return (
        <div className="carousel w-full h-screen bg-neutral rounded-full overflow-hidden" style={{ width: '45%' }}>
            {products.map((product, index) => (
                <div id={`slide${index + 1}`} className="carousel-item relative flex justify-center w-full h-full" key={product.id}>
                    <CarouselProduct product={product} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${index === 0 ? products.length : index}`} className="btn btn-circle btn-accent">❮</a>
                        <a href={`#slide${(index + 1) % products.length + 1}`} className="btn btn-circle btn-accent">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCarousel;

