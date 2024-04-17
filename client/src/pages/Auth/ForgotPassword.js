import { useState } from "react";
import React from "react";
import { Layout } from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../Styles/AuthStyles.css";


export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    // Handling onSubmit of form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, answer, newPassword });

            if (res.data.success) {
                toast.success(res.data.message)
                setTimeout(() => { navigate("/login") }, 2000)
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
        <Layout title="Forgot Password">
            <div className="form-container" style={{ minHeight: "95vh" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4 className="title">Forgot Password</h4>
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
                            <input type="text"
                                value={answer}
                                onChange={(e) => { setAnswer(e.target.value) }}
                                className="form-control"
                                id="exampleInputAnswer"
                                placeholder="Enter the name of your favourite player"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input type="password"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value) }}
                                className="form-control"
                                id="exampleInputNewPassword"
                                placeholder="Enter the new password"
                                required
                            />
                        </div>

                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </div>

                    </div>


                </form>
            </div >
        </Layout >
    )
}
