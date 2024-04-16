import React from 'react'
import { Layout } from './../components/Layout/Layout';
import { useSearch } from '../Context/Search';
import { useNavigate } from 'react-router-dom';

export const Search = () => {

    const navigate = useNavigate();

    const [values, setValues] = useSearch();

    return (
        <Layout title={"Search Results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h4>{values?.result.length < 1
                        ? "No products found"
                        : `Found ${values?.result.length} matching ${values?.result.length === 1 ? "product" : "products"}`} </h4>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.result.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} >
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button className="btn btn-primary ms-2"
                                        onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-success ms-2">Add to Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
