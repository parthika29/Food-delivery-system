import React from "react";
import Navbar from "./Navbar";
import { FaUsers, FaUtensils, FaStar } from "react-icons/fa";

const About = () => {
  const aboutImg = "https://via.placeholder.com/500x400.png?text=About+Us";

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
          />
          <div className="space-y-4 md:w-1/2">
            <p className="text-gray-700 text-lg">
              Welcome to our food delivery service! We are committed to bringing you the
              freshest and most delicious meals straight to your door.
            </p>
            <p className="text-gray-700 text-lg">
              Our chefs are passionate about crafting every dish with care and precision.
            </p>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <FaUsers className="text-green-500 w-6 h-6" />
                <span>500+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUtensils className="text-green-500 w-6 h-6" />
                <span>100+ Dishes</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400 w-6 h-6" />
                <span>4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
