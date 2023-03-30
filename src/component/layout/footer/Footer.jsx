import React from "react";
import './footer.scss';

const Footer = () => {
  return <footer className="footer mt-auto bg-dark text-white p-3"> PM Vault © {(new Date().getFullYear())}</footer>;
};

export default Footer;
