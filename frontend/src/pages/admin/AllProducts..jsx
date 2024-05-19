import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { PIC_URL } from "../../redux/constants";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[9rem] text-primary-content">
        <div className="flex flex-col  md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <div className="grid grid-cols-2 gap-7 p-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                <div className="card card-side w-130 bg-neutral transition-shadow p-4">
                    {console.log(product.image_url)}
                    {console.log(`${PIC_URL}${product.image_url}`)}
                    
                  <img
                    src={`${PIC_URL}${product.image_url}`}
                    alt={product.image_filename}
                    className="w-[10rem] object-cover"
                    />

                    <div className="card-body p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className=" card-title text-xl font-semibold mb-2">
                          {product?.productDisplayName}
                        </h5>
                      </div>

                      <p className="text-lg font-md mb-2">
                        {product?.brandname}
                      </p>

                      <div className="card-actions flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondary rounded-lg hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <span className="badge badge-accent hover:badge-secondary">Rs. {product?.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;