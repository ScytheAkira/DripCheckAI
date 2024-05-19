import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async(req,res)=>{
    try {
        const {gender, masterCategory, subCategory, articleType, baseColour, season, usage, productDisplayName, brandname, image_filename, image_url, price} = req.fields;
        // console.log(gender);
        // console.log(masterCategory);
        // console.log(subCategory);
        // console.log(articleType);
        // console.log(baseColour);
        // console.log(season);
        // console.log(usage);
        // console.log(productDisplayName);
        // console.log(brandname);
        // console.log(image_filename);
        // console.log(image_url);
        // console.log(price);


        //validation

        switch(true){
            case !gender:
                return res.json({error: "gender is required"});
            case !masterCategory :
                return res.json({error: "masterCategory is required"});
            case !subCategory :
                return res.json({error: "subCategory is required"});
            case !articleType :
                return res.json({error: "articleType is required"});
            case !baseColour :
                return res.json({error: "baseColour is required"});
            case !season :
                return res.json({error: "season is required"});
            case !usage :
                return res.json({error: "usage is required"});
            case !productDisplayName :
                return res.json({error: "productDisplayName is required"});
            case !brandname :
                return res.json({error: "brandname is required"});
            case !image_filename :
                return res.json({error: "image_filename is required"});
            case !image_url :
                return res.json({error: "image_url is required"});
            case !price :
                return res.json({error: "price is required"});
        }

        const product = new Product({...req.fields});
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(404).json(error.message);
    }
});

const updateProductDetails = asyncHandler(async(req, res)=> {
    try {
        const {gender, masterCategory, subCategory, articleType, baseColour, season, usage, productDisplayName, brandname, image_filename, image_url, price} = req.fields;


        //validation

        switch(true){
            case !gender:
                return res.json({error: "gender is required"});
            case !masterCategory :
                return res.json({error: "masterCategory is required"});
            case !subCategory :
                return res.json({error: "subCategory is required"});
            case !articleType :
                return res.json({error: "articleType is required"});
            case !baseColour :
                return res.json({error: "baseColour is required"});
            case !season :
                return res.json({error: "season is required"});
            case !usage :
                return res.json({error: "usage is required"});
            case !productDisplayName :
                return res.json({error: "productDisplayName is required"});
            case !brandname :
                return res.json({error: "brandname is required"});
            case !image_filename :
                return res.json({error: "image_filename is required"});
            case !image_url :
                return res.json({error: "image_url is required"});
            case !price :
                return res.json({error: "price is required"});
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
        res.json(product);
        await product.save();
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})
const removeProduct = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
const fetchProducts = asyncHandler(async (req, res) => {
    try {
      const pageSize = 6;
  
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
  
      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword }).limit(12);
  
      res.json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  const fetchProductById = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Product not found" });
    }
  }); 

  const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("masterCategory")
            .populate("subCategory")
            .limit(25)
            .sort({ _id: -1 });  // Sorting by _id in descending order

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

  const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find().sort({ _id: -1 }).limit(4);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const filterProducts = asyncHandler(async (req, res) => {
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.mastercategory = checked;
      if (checked.length > 0) args.subcategory = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
  
      const products = await Product.find(args);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
export{ addProduct, 
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    fetchNewProducts,
    filterProducts
 };