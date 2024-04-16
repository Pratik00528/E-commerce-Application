import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { UserMenu } from '../../components/Layout/UserMenu'
import { useAuth } from '../../Context/Auth'
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const Profile = () => {

    // Context
    const [auth, setAuth] = useAuth();

    // State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Get user info using auth
    useEffect(() => {
        const { name, email, phone, address } = auth?.user
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])

    // Handling onSubmit of form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
                name,
                email,
                password,
                phone,
                address
            })

            if (data?.success === false) {
                toast.error(data?.message)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })

                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))

                toast.success("User Profile updated successfully")
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.")

        }

    }

    return (
        <Layout title="Your Profile">
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <div className="form-container" style={{ marginTop: "-40px" }}>
                            <form onSubmit={handleSubmit}>

                                <h4 className="title">User Profile</h4>
                                <div className="mb-3">
                                    <input type="text"
                                        value={name} // This will hold the input name value
                                        onChange={(e) => { setName(e.target.value) }} // Now set the input value with our useState variable
                                        className="form-control"
                                        id="exampleInputName"
                                        placeholder="Update your Name"
                                    />

                                </div>
                                <div className="mb-3">
                                    <input type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className="form-control"
                                        id="exampleInputEmail"
                                        placeholder="Update your Email"
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        className="form-control"
                                        id="exampleInputPassword"
                                        placeholder="Update your Password"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input type="text"
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        className="form-control"
                                        id="exampleInputPhone"
                                        placeholder="Update your Phone number"
                                    />

                                </div>
                                <div className="mb-3">
                                    <input type="text"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        className="form-control"
                                        id="exampleInputAddress"
                                        placeholder="Update your Address"
                                    />

                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
