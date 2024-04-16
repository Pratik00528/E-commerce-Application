import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/CategoryProductStyles.css";
import { useCart } from '../Context/cart';
import { toast } from 'react-hot-toast';

export const CategoryProduct = () => {

    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (params?.slug) getProductsByCategory()
    }, [params?.slug])

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <Layout>
            <div className="container mt-3 category">
                <h2 className='text-center'>{category?.name}</h2>
                <h5 className='text-center'>{products?.length} products found</h5>
                <div className="row">
                    <div className="col-md-10 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <div className="card-name-price">
                                            <h5 className="card-title">{p.name}</h5>
                                            <h5 className="card-title card-price">
                                                {p.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </h5>
                                        </div>
                                        <p className="card-text">{p.description.substring(0, 60)}...</p>
                                        <div className="card-name-price">
                                            <button className="btn btn-primary ms-2"
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
                </div>
            </div>

        </Layout>
    )
}
