
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-[#f5f5f7] border-t border-gray-200 mt-auto">
      <div className="apple-container">
        <div className="flex justify-center items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Airport Guessr
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
