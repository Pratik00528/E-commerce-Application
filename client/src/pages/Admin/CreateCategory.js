import React from 'react'
import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { AdminMenu } from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CategoryForm } from '../../components/Form/CategoryForm'
import { Modal } from 'antd';

export const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const [visible, setVisible] = useState(false);

    const [selected, setSelected] = useState(null);

    const [updatedName, setUpdatedName] = useState("");

    // Handle form submit

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });

            if (data?.success) {
                toast.success(`${name} category created`);
                getAllCategories();
            }

            else {
                toast.success(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form")

        }
    }

    // Getting all categories

    const getAllCategories = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data.success) {
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

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} updated successfully.`)
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            }
            else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in handling update.")

        }
    }

    // Handle delete
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`)
            if (data.success) {
                toast.success(`Category is deleted successfully.`)
                getAllCategories(); // Calling all catergories
            }
            else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in handling delete.")

        }
    }

    return (
        <Layout title="Dashboard - Create Category">
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1> All Categories </h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Category Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td><button className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name)
                                                        setSelected(c)
                                                    }}>
                                                    Edit
                                                </button>
                                                </td>
                                                <td><button className="btn btn-danger ms-2"
                                                    onClick={() => handleDelete(c._id)}>
                                                    Delete
                                                </button></td>
                                            </tr >
                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
