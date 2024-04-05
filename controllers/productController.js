import productModel from "../models/productModel.js"
import fs from "fs"
import slugify from "slugify";


export const createProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields; // contains non-file fields
        const { photo } = req.files; // contains files

        // Validation using switch statement

        switch (true) {
            case !name:
                return res.send({ message: "Name is required!" })
            case !description:
                return res.send({ message: "Description is required!" })
            case !price:
                return res.send({ message: "Price is required!" })
            case !category:
                return res.send({ message: "Category is required!" })
            case !quantity:
                return res.send({ message: "Quantity is required!" })
            case !shipping:
                return res.send({ message: "Shipping is required!" })
            case !photo || photo.size > 100000:
                return res.send({ message: "Photo is required and it should be less than 1 MB" })
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(200).send({
            success: true,
            message: "Product created successfully.",
            product
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in creating product.",
            error
        })

    }

}

export const getProductController = async (req, res) => {
    try {

        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "Fetched all products successfully.",
            totalCount: products.length,
            products
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in getting products",
            error
        })

    }
}

export const getSingleProductController = async (req, res) => {
    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Fetched the product successfully.",
            product
        })

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in getting single product.",
            error
        })

    }
}

export const productPhotoController = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.pid).select("photo")

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {

        console.log(error)
        res.send({
            success: false,
            message: "Error in getting product photo.",
            error
        })

    }
}

export const deleteProductController = async (req, res) => {
    try {

        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully.",
            product
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in deleting product.",
            error
        })

    }
}

export const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields; // contains non-file fields
        const { photo } = req.files; // contains files

        // Validation using switch statement

        switch (true) {
            case !name:
                return res.send({ message: "Name is required!" })
            case !description:
                return res.send({ message: "Description is required!" })
            case !price:
                return res.send({ message: "Price is required!" })
            case !category:
                return res.send({ message: "Category is required!" })
            case !quantity:
                return res.send({ message: "Quantity is required!" })
            case !shipping:
                return res.send({ message: "Shipping is required!" })
            case !photo || photo.size > 100000:
                return res.send({ message: "Photo is required and it should be less than 1 MB" })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(200).send({
            success: true,
            message: "Product updated successfully.",
            product
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in updating product.",
            error
        })

    }

}

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body

        let args = {}

        if (checked.length > 0) args.category = checked
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await productModel.find(args)

        res.status(200).send({
            success: true,
            message: "Filtered products fetched sucessfully",
            products
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while filtering products",
            error
        })

    }
}