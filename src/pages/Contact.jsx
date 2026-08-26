import React, { useState } from 'react';

export default function Contact() {
  // 1. useState for Controlled Inputs
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Event Handling for Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 3. Basic Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  // 4. Form Submission Handling
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      
      setIsSubmitted(true);
      
    } else {
      
      setErrors(validationErrors);
    }
  };

  // 5. Responsive Design with Tailwind CSS
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
        
        
        {isSubmitted ? (
          <div className="bg-green-500/10 border border-green-500 text-green-400 p-6 rounded-lg text-center animate-pulse">
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-sm underline hover:text-green-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors`}
                placeholder="Moses"
              />
              
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors`}
                placeholder="Moses@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.message ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors resize-none`}
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}