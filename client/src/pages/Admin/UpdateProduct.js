import React from 'react'
import { Layout } from '../../components/Layout/Layout'
import { AdminMenu } from '../../components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select // For dropdown menu 

export const UpdateProduct = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("")

    const params = useParams();

    // Get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);
            setId(data.product._id);

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, [])

    // Getting all categories
    const getAllCategories = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data.category);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting categories")
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])


    // Handling Update Product function 
    const handleUpdate = async (e) => {
        e.preventDefault(); // For preventing default behaviour of form when we click on submit
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("category", category)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("shipping", shipping)

            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
                productData)

            if (data?.success) {
                setTimeout(() => { toast.success("Product updated successfully") }, 1000)
                navigate('/dashboard/admin/products')
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating product")

        }
    }

    // Handling deleting product 
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure, you want to delete this product?")

            if (!answer) return; // If answer is "No" return it

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            toast.success("Deleted product successfully")

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in deleting the product")

        }
    }

    return (
        <Layout title="Dashboard - Update Product">
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m1 w-75">
                            <Select bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}>

                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Image"}
                                    <input type="file"
                                        name="photo"
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                            alt="Product Photo"
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                            alt="Product Photo"
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={name}
                                    placeholder='Enter the name of the product'
                                    className='form-control'
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea type="text"
                                    value={description}
                                    placeholder='Enter the description about the product'
                                    className='form-control'
                                    onChange={(e) => { setDescription(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={price}
                                    placeholder='Enter the price of the product'
                                    className='form-control'
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={quantity}
                                    placeholder='Enter the quantity of the product'
                                    className='form-control'
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleUpdate}>
                                    Update Product
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={handleDelete}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
