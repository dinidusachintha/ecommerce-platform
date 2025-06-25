import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-2xl p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg"> {/* Added mt-20 */}
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Contact Us</h1>
      <p className="mb-6 text-center text-gray-600">We’d love to hear from you! Please fill out the form below.</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition duration-300 bg-pink-900 rounded-lg hover:bg-pink-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;