import React from "react";
import logoImage from "../../../assets/logo2.png";
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaGithub, href: "#", label: "GitHub" },
  ];

  const linkGroups = [
    {
      title: "Services",
      links: ["Personal Loans", "Business Loans", "Microfinance", "Education"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "News", "Impact"],
    },
    {
      title: "Support",
      links: ["FAQs", "Contact", "Live Chat", "Documentation"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Top Gradient/Accent */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 opacity-20 -z-10 rounded-b-full"></div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center md:text-left">
        <div className="bg-gray-800 rounded-xl p-10 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Join the LoanLink Movement</h2>
            <p className="opacity-70">Get quarterly updates directly in your inbox.</p>
          </div>
          <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="px-4 py-3 rounded-lg outline-none flex-1 text-gray-900"
            />
            <button className="px-6 py-3 bg-lime-500 text-gray-900 font-semibold rounded-lg hover:bg-lime-400 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {/* Logo & Description */}
        <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start">
          <img src={logoImage} alt="LoanLink Logo" className="h-16 mb-4" />
          <p className="opacity-70 mb-6 max-w-sm text-center lg:text-left">
            LoanLink connects capital with underserved communities, enabling sustainable growth through ethical micro-loans.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="p-3 bg-gray-800 rounded-full hover:bg-lime-500 hover:text-gray-900 transition"
                aria-label={label}
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Link Groups */}
        {linkGroups.map((group) => (
          <div key={group.title}>
            <h4 className="text-white font-bold mb-4">{group.title}</h4>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-lime-500 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700 py-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} LoanLink — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
