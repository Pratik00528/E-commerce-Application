import React from 'react'
import { Layout } from '../../components/Layout/Layout'
import { AdminMenu } from '../../components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select // For dropdown menu 



export const CreateProduct = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState("");

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


    // Handling Create Product function 
    const handleCreate = async (e) => {
        e.preventDefault(); // For preventing default behaviour of form when we click on submit
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("category", category)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("shipping", shipping)

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)

            if (data?.success) {
                setTimeout(() => { toast.success("Product created successfully") }, 1000)
                navigate('/dashboard/admin/products')
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in creating Product")

        }
    }

    return (
        <Layout title="Dashboard - Create Product">
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m1 w-75">
                            <Select bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}>
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
                                        onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
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
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
