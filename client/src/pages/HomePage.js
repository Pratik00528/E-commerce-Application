import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../Context/Auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Checkbox, Radio } from 'antd'
import toast from 'react-hot-toast'
import { Prices } from './../components/Prices';

export const HomePage = () => {
  const [auth, setAuth] = useAuth();

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  // Getting all products
  const getAllProducts = async () => {
    try {

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      setProducts(data.products)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  // Getting All Categories
  const getAllCategories = async () => {
    try {

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data.category);
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in getting categories");
    }
  }

  useEffect(() => {
    if (!checked.length && !radio.length) getAllCategories();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio])

  // Handling Filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  // Get Filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="All Products">
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className='text-center'>Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => { handleFilter(e.target.checked, c._id) }}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Filter by prices */}
          <h4 className='text-center mt-4'>Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => { setRadio(e.target.value) }}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <Button className='btn btn-danger' onClick={() => { window.location.reload() }}>Clear all filters</Button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex wrap">
            {products?.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-2">More Details</button>
                  <button class="btn btn-success ms-2">Add to Cart</button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </Layout >
  )
}
