import { useState } from "react";
import React from "react";
import { Layout } from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../Styles/AuthStyles.css";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // Handling onSubmit of form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer });

            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => navigate("/login"), 2000);
                // Once user is registered successfully navigate to login page
                // Since the toast notification was going away quickly as we navigated to login
                // page we are setting using Timeout function to navigate to login page after 2000ms
                // registration was successful
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.")

        }

    }

    return (
        <Layout title="Registration Page">
            <div className="form-container" style={{ minHeight: "95vh" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4 className="title">Registration Form</h4>
                        <div className="mb-3">
                            <input type="text"
                                value={name} // This will hold the input name value
                                onChange={(e) => { setName(e.target.value) }} // Now set the input value with our useState variable
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter your Name"
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <input type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder="Enter your Email"
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <input type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder="Enter your Password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input type="text"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder="Enter your Phone number"
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <input type="text"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder="Enter your Address"
                                required
                            />

                        </div>

                        <div className="mb-3">
                            <input type="text"
                                value={answer}
                                onChange={(e) => { setAnswer(e.target.value) }}
                                className="form-control"
                                id="exampleInputAnswer"
                                placeholder="Enter the name of your favourite player"
                                required
                            />

                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>

                    </div>

                </form>
            </div>
        </Layout>
    )
};
