import { v2 as cloudinary } from 'cloudinary';
import productModel from '../modals/productModel.js';
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Validate request body
        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Extract images safely
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary
        let imageUrls = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name, description, category, price: Number(price),
            subCategory, sizes: sizes ? JSON.parse(sizes) : [], bestseller:bestseller ==="true"?true:false,
             image:imageUrls,
             date:Date.now()
        }

        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imageUrls);

        // Respond with success
        res.json({ success: true, message: "Product added successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const listProduct = async (req, res) => {
    // Logic for listing products
    try {
        const product=await productModel.find({});
        console.log(product);
        if (!product.length) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        res.json({success:true,product});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};

const removeProduct = async (req, res) => {
    // Logic for removing a product
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
        
    }
};

const singleProduct = async (req, res) => {
    // Logic for fetching a single product
    try {
        const {productId}=req.body;
        const product=await productModel.findById(productId);
        res.json({success:true,product});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
        
    }
};

export { listProduct, addProduct, removeProduct, singleProduct };
