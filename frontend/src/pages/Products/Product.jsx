import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const Product = ({ product }) => {


    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    };
  return (
    // <div className="w-[30rem] ml-[2rem] p-3 relative">
    //   <div className="relative">
    //     <img
    //       src={product.image_url}
    //       alt={product.productDisplayName}
    //       className="w-[30rem] rounded"
    //     />
    //     {/* <HeartIcon product={product} /> */}
    //   </div>

    //   <div className="p-4">
    //     <Link to={`/product/${product._id}`}>
    //       <h2 className="flex justify-between items-center">
    //         <div className="text-lg">{product.productDisplayNamename}</div>
    //         <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
    //           $ {product.price}
    //         </span>
    //       </h2>
    //     </Link>
    //   </div>
    // </div>



        <div className="card w-64 bg-neutral shadow-xl text-neutral-content">
            <figure><img
                    src={product.image_url}
                    alt={product.image_filename}
                    /></figure>
            
            <div className="card-body">
            <Link to={`/product/${product._id}`}>
                <h2 className="card-title">
                {truncateName(product.productDisplayName, 20)}
            
                <div className="badge badge-accent">NEW</div>
                    </h2>
            </Link>
                    <span>Collection: {product.gender}</span><span>Season: {product.season}</span>

                    <div className="flex flex-col card-actions justify-end">
                    <HeartIcon product= {product} />
                    <div className="badge badge-outline">{product.brandname}</div> 
                    <div className="badge badge-secondary">Rs. {product.price}</div>
                </div>
            </div>
            
        </div>
    // <div className="text=primary-content">
    //     product
    // </div>
  );
};

export default Product;