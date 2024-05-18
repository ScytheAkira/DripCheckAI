import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;

const productSchema = mongoose.Schema({
    
    id:{ type: String, required: true},
    gender:{type: String, required: true},
    masterCategory:{type: ObjectId, ref:"Category", required: true},
    subCategory:{type: ObjectId, ref: "Category", required: true},
    articleType:{type: String, required: true},
    baseColour:{type: String, required: true},
    season:{type: String, required: true},
    year:{type: Number, required: true},
    usage:{type: String, required: true},
    productDisplayName:{type: String, required: true},
    brandname:{type: String, required: true},
    image_filenam:{type: String, required: true},
    image_url:{type: String, required: true},
    price:{type: Number, required: true , default: 0}

});

const Product = mongoose.model('Product', productSchema);
export default Product;