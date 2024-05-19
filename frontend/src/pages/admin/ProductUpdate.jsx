import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

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
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState(0);

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData) {
      setImage(productData.image || "");
      setGender(productData.gender || "");
      setMasterCategory(productData.masterCategory || "");
      setSubCategory(productData.subCategory || "");
      setArticleType(productData.articleType || "");
      setBaseColour(productData.baseColour || "");
      setSeason(productData.season || "");
      setYear(productData.year || 0);
      setUsage(productData.usage || "");
      setProductDisplayName(productData.productDisplayName || "");
      setBrandname(productData.brandname || "");
      setImageUrl(productData.image || null);
      setPrice(productData.price || 0);
    }
  }, [productData]);

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
      productData.append("usage", usage);
      productData.append("productDisplayName", productDisplayName);
      productData.append("brandname", brandname);
      productData.append("price", price);

      const { data } = await updateProduct({ productId: params._id, productData });

      if (data.error) {
        toast.error("Product update failed. Try Again.");
      } else {
        toast.success(`${data.productDisplayName} is updated`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try Again.");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.productDisplayName}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed. Try Again.");
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
          <div className="h-12 text-primary-content text-xl font-bold">Update / Delete Product</div>

          {imageUrl && (
            <div className="text-center">
              <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
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
              <label htmlFor="productDisplayName" className="text-primary-content">Name</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={productDisplayName}
                onChange={(e) => setProductDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price" className="text-primary-content">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gender" className="text-primary-content">Gender</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brandname" className="text-primary-content">Brand</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={brandname}
                onChange={(e) => setBrandname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="baseColour" className="text-primary-content">Base Colour</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={baseColour}
                onChange={(e) => setBaseColour(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="articleType" className="text-primary-content">Article Type</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="year" className="text-primary-content">Year</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="masterCategory" className="text-primary-content">Master Category</label> <br />
              <select
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={masterCategory}
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
              <label htmlFor="subCategory" className="text-primary-content">Sub Category</label> <br />
              <select
                className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
                value={subCategory}
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
          <div>
            <label htmlFor="season" className="text-primary-content">Season</label> <br />
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="usage" className="text-primary-content">Usage</label> <br />
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-neutral text-neutral-content"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              className="bg-primary text-primary-content p-4 rounded-lg w-full font-bold"
            >
              Update Product
            </button>
            <button
              onClick={handleDelete}
              className="bg-error text-primary-content p-4 rounded-lg w-full mt-3 font-bold"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;

