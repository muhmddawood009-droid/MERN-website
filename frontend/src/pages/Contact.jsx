import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Map Image */}
      <div 
        className="w-full h-72 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?map,city')" }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Find Us</h1>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-700">📍 123 Food Street, Lahore, Pakistan</p>
            <p className="text-gray-700">📞 +92 300 1234567</p>
            <p className="text-gray-700">✉️ info@restaurant.com</p>
            <p className="text-gray-700">🕒 Mon–Sun: 11:00 AM – 11:00 PM</p>
          </div>
          <div>
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13622.123456789!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904123456789%3A0xabcdef123456789!2sLahore!5e0!3m2!1sen!2s!4v161234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
