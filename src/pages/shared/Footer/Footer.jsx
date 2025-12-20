import React from "react";
import logoImage from "../../../assets/logo2.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaDribbble, href: "#", label: "Dribbble" },
  ];

  const linkGroups = [
    {
      title: "Services",
      links: ["Personal Loans", "Business Loans", "Microfinance", "Education"],
    },
    {
      title: "About",
      links: ["Our Mission", "Careers", "Impact Reports", "Our Team"],
    },
    {
      title: "Support",
      links: ["FAQs", "Contact Us", "Live Chat", "Documentation"],
    },
  ];

  return (
    <footer
      className="bg-base-200 text-base-content
    "
    >
      <div className="w-full mx-auto px-4 py-16">
        {/* Newsletter */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Join the LoanLink Movement
          </h2>
          <p className="mt-2 opacity-70">
            Get our quarterly impact updates directly in your inbox.
          </p>

          <form className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>

        {/* Main Footer */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="text-center lg:text-left">
            <img
              src={logoImage}
              alt="LoanLink Logo"
              className="h-24 mx-auto lg:mx-0"
            />

            <p className="mt-4 max-w-md mx-auto lg:mx-0 opacity-80">
              LoanLink connects capital with underserved communities, enabling
              sustainable growth through ethical micro-loans.
            </p>

            <div className="mt-6 flex justify-center lg:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="btn btn-circle btn-outline"
                  aria-label={label}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-semibold">{group.title}</h4>
                <ul className="mt-4 space-y-2 opacity-80">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-primary">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-base-300 pt-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} LoanLink NGO — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
