import HeartIcon from "./HeartIcon";

const CarouselProduct = ({ product }) => {
    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    };

    return (
        <div className="bg-neutral shadow-xl text-neutral-content w-fit">
            <div className="w-96">
                <img
                    src={product.image_url}
                    alt={product.image_filename}
                    className="rounded-t-xl w-full"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{truncateName(product.productDisplayName, 20)}</h2>
                <div className="flex justify-between items-center mb-2">
                    <div className="badge badge-accent">NEW</div>
                    <div className="badge badge-outline">{product.brandname}</div>
                    
                </div>
                <p className="text-sm">Collection: {product.gender}</p>
                <p className="text-sm">Season: {product.season}</p>
                <div className="flex justify-between items-center">
                    <div className="badge badge-secondary">Rs. {product.price}</div>
                    <HeartIcon product={product} />
                </div>
            </div>
        </div>
    );
};

export default CarouselProduct;
