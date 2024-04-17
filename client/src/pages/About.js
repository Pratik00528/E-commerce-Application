import React from "react";
import { Layout } from "../components/Layout/Layout";

export const About = () => {
  return (
    <Layout title="About Us">
      <div className="row contactus" style={{ minHeight: "90vh", marginTop: "30px" }}>
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            Welcome to Zecio, your premier destination for an
            exceptional online shopping experience specializing in cutting-edge gadgets and
            electronics. Our mission is to provide unparalleled convenience, quality, and
            customer service, offering a wide range of products including the latest tech
            innovations, gadgets, and accessories. We prioritize quality assurance through
            trusted partnerships and maintain a user-friendly platform for secure transactions.
            Join our vibrant community of tech enthusiasts,
            and stay updated on the newest releases and exclusive promotions through our social
            media channels and newsletter. Have feedback or inquiries? Get in touch with our
            dedicated customer support team. Thank you for choosing Zecio,
            your go-to destination for all things tech! Happy shopping!
          </p>
        </div>
      </div>
    </Layout>
  );
};
