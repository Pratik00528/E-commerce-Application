import React from 'react'
import { Layout } from './../../components/Layout/Layout';
import { UserMenu } from '../../components/Layout/UserMenu';
import { useAuth } from '../../Context/Auth';

export const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title="Dashboard">
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <h1>User name: {auth?.user?.name}</h1>
                            <h1>User email: {auth?.user?.email}</h1>
                            <h1>User phone: {auth?.user?.phone}</h1>
                            <h1>User address: {auth?.user?.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
