import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';
import { toast } from 'react-hot-toast';
import "../Styles/ProductDetailsStyles.css";
import { Prices } from './../components/Prices';

export const ProductDetails = () => {

    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Initial Product Details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    // get Product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)

        } catch (error) {
            console.log(error)

        }
    }

    // Get Similar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <Layout>
            <div className="row container product-details">
                <div className="col-md-6">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top" alt={product.name}

                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className='text-center'>Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button className="btn btn-dark ms-1"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem("cart", JSON.stringify([...cart, product]));
                            toast.success("Item added to cart");
                        }}>
                        Add to Cart

                    </button>
                </div>
            </div>
            <div className="row container similar-products">
                <h3>Similar Products</h3>
                {relatedProducts?.length < 1 && (<p className='text-center'>No similar products found.</p>)}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" key={p._id} >
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <div className='card-name-price'>
                                    <h5 className="card-title">{p.name}</h5>
                                    <h5 className="card-title card-price">
                                        {p.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </h5>
                                </div>
                                <p className="card-text ">
                                    {p.description.substring(0, 60)}...
                                </p>
                                <div className="card-name-price">
                                    <button className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                            toast.success("Item added to cart");
                                        }}>
                                        Add to Cart

                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout >
    )
}
