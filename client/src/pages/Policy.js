import React from 'react'
import { Layout } from '../components/Layout/Layout'

export const Policy = () => {
  return (
    <Layout title="Privacy Policy">
      <div className="row contactus" style={{ minHeight: "90vh", marginTop: "20px" }}>
        <div className="col-md-6 ">
          <img
            src="/images/policy.jpg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-5">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <ul>
            <li>Your privacy is our priority; we do not sell or trade your personal information.</li>
            <li>Industry-standard security measures are in place to protect your data.</li>
            <li>We employ encryption technology to secure all transactions on our platform.</li>
            <li>Your data is stored securely on servers located in compliance with applicable regulations.</li>
            <li>Your browsing history is not sold or shared with third parties for advertising purposes.</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
