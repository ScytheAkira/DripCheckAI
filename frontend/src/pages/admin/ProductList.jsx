import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [masterCategory, setMasterCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [articleType, setArticleType] = useState("");
  const [baseColour, setBaseColour] = useState("");
  const [season, setSeason] = useState("");
  const [year, setYear] = useState(0);
  const [usage, setUsage] = useState("");
  const [productDisplayName, setProductDisplayName] = useState("");
  const [brandname, setBrandname] = useState("");
  const [image_filename, setImage_filename] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("gender", gender);
      productData.append("masterCategory", masterCategory);
      productData.append("subCategory", subCategory);
      productData.append("articleType", articleType);
      productData.append("baseColour", baseColour);
      productData.append("season", season);
      productData.append("year", year);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.productDisplayName} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-primary-content text-xl font-bold">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-primary-content px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-primary-content">Name</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={productDisplayName}
                onChange={(e) => setProductDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-primary-content">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-primary-content">Gender</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-primary-content">Brand</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={brandname}
                onChange={(e) => setBrandname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name " className="text-primary-content">BaseColour</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={baseColour}
                onChange={(e) => setBaseColour(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-primary-content">ArticleType</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-primary-content">Year</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="" className="text-primary-content">Master Category</label> <br />
              <select
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                onChange={(e) => setMasterCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="" className="text-primary-content">Sub Category</label> <br />
              <select
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-secondary hover:bg-pink-500 text-white"
            >
Submit
            </button>
            </div>
            </div>
        </div>
    );
};
            
            export default ProductList;
