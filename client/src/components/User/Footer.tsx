import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 p-8">
      <div className="flex justify-around">
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul>
            <li className="mb-2">Twitter</li>
            <li className="mb-2">Facebook</li>
            <li className="mb-2">Instagram</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul>
            <li className="mb-2">Email: skillswap@gmail.com</li>
            <li className="mb-2">Phone: 123-456-7890</li>
            <li className="mb-2">Address: 123 Main St, City</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
          <ul>
            <li className="mb-2">Privacy Policy</li>
            <li className="mb-2">Terms of Service</li>
            <li className="mb-2">Refund Policy</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Skill Swap . All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
