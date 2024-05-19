import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ikramsImage from './Ikram\'s Image.jpg';

const AdminBlog = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-8 ml-10 mr-10 text-primary-content">
      {/* Left section with picture and social links */}
      <div className=" card bg-neutral flex flex-col items-center justify-center lg:items-center lg:w-1/4 ml-[9rem] border border-accent shadow-accent-glow hover:shadow-pink-500 hover:border-pink-500">
      <div className="avatar m-4">
          <div className="w-[9rem] rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
            <img src={ikramsImage}
                  alt= "Ikram Ul Haq"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Ikram Ul Haq</h2>
        <div className="flex space-x-4 mt-2">
          <a href="https://www.linkedin.com/in/ikram-ul-haq-023a61218/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl text-accent hover:text-pink-500 transition-all duration-300" />
          </a>
          <a href="https://github.com/ScytheAkira" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-3xl text-accent hover:text-pink-500 transition-all duration-300" />
          </a>
        </div>
      </div>

      {/* Right section with descriptions */}
      <div className="lg:ml-12 mt-8 lg:mt-0 lg:w-3/4">
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-2">Why I Created DripCheck</h3>
          <p className="text-lg">
            I created DripCheck as a project to showcase my skills in developing a full-stack MERN application.
            My goal was to build a useful and engaging clothing wishlist app that allows users to keep track of
            their favorite fashion items. By working on DripCheck, I was able to apply my knowledge in MongoDB,
            Express.js, React, and Node.js to create a functional and visually appealing web application.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Future Features</h3>
          <p className="text-lg">
            In the future, I plan to add several features to enhance the user experience:
          </p>
          <ul className="list-disc list-inside text-lg mt-2">
            <li>Integration with social media to share wishlists with friends.</li>
            <li>Advanced search filters to help users find specific items quickly.</li>
            <li>User profiles with customization options.</li>
            <li>Notifications for price drops or new arrivals of favorite items.</li>
            <li>Option to follow favorite brands and get updates on their latest collections.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminBlog;
