import { useState } from "react";
import React from "react";
import { Layout } from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../Styles/AuthStyles.css";
import { useAuth } from "../../Context/Auth";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useAuth();

    // Handling onSubmit of form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password });

            if (res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/")
                setTimeout(() => toast.success(res.data.message), 1000)
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
        <Layout title="Login Page">
            <div className="form-container" style={{ minHeight: "95vh" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4 className="title">Login</h4>
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

                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>

                        <div className="text-center">
                            <button type="button" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>
                                Forgot Password
                            </button>

                        </div>
                    </div>


                </form>
            </div >
        </Layout >
    )
}
