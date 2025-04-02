
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-ftusa-blue text-white border-t border-ftusa-darkblue mt-auto">
      <div className="ftusa-container">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Airport Guessr
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
