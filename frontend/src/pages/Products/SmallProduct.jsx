import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { PIC_URL } from "../../redux/constants";

const SmallProduct = ({ product }) => {
    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    };
  return (

    <div className="card w-64 bg-neutral shadow-xl text-neutral-content">
  <figure><img
          src={`${PIC_URL}${product.image_url}`}
          alt={product.image_filename}
        /></figure>
  <div className="card-body">
    <h2 className="card-title">
    {truncateName(product.productDisplayName, 20)}
      <div className="badge badge-accent">NEW</div>
    </h2>
    <span>Collection: {product.gender}</span><span>Season: {product.season}</span>

    <div className="flex flex-col card-actions justify-end">
    <HeartIcon product={product}/>


      <div className="badge badge-outline">{product.brandname}</div> 
      <div className="badge badge-secondary">Rs. {product.price}</div>
    </div>
  </div>
</div>
  );
};

export default SmallProduct;