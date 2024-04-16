import React from 'react'
import reportWebVitals from '../../reportWebVitals';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { Layout } from '../../components/Layout/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const Products = () => {

    const [products, setProducts] = useState([]);

    // Get All Products
    const getAllProducts = async () => {

        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting products")
        }
    }

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title="All Products">
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
