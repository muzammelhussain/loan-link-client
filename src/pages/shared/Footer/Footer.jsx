import React from "react";
import { Link } from "react-router";
import logoImage from "../../../assets/logo2.png";
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 text-gray-300">
      {/* Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-lime-500/10 blur-3xl pointer-events-none" />

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-neutral-800/80 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Join the LoanLink Movement
            </h2>
            <p className="text-sm opacity-80 mt-1">
              Product updates, no spam.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="px-4 py-3 rounded-lg text-content-base w-full sm:w-64 border-amber-200"
            />
            <button className="px-6 py-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-primary-content  rounded-lg font-semibold hover:bg-lime-400 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2 text-center lg:text-left">
          <img src={logoImage} alt="LoanLink Logo" className="h-14 mb-4 mx-auto lg:mx-0" />
          <p className="text-sm opacity-80 max-w-sm mx-auto lg:mx-0">
            LoanLink provides transparent, secure, and ethical loan solutions
            for individuals and businesses.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-6 justify-center lg:justify-start">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/all-loan-page" className="hover:text-lime-400">All Loans</Link></li>
            <li><Link to="/loans/personal" className="hover:text-lime-400">Personal Loans</Link></li>
            <li><Link to="/loans/business" className="hover:text-lime-400">Business Loans</Link></li>
            <li><Link to="/loans/education" className="hover:text-lime-400">Education Loans</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about-us" className="hover:text-lime-400">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-lime-400">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-lime-400">Blog</Link></li>
            <li><Link to="/impact" className="hover:text-lime-400">Impact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-lime-400">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-lime-400">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-lime-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-lime-400">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800 py-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} LoanLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
