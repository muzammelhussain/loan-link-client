import React from "react";
// Import the image file (Logo now holds the image URL string)
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
      links: [
        { name: "Personal Loans", href: "#" },
        { name: "Business Loans", href: "#" },
        { name: "Microfinance", href: "#" },
        { name: "Lending Education", href: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Impact Reports", href: "#" },
        { name: "Our Team", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Live Chat", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl">
              Join the LoanLink Movement. Get our Quarterly Impact Update.
            </strong>

            <form className="mt-6">
              <div className="relative max-w-lg">
                <label className="sr-only" htmlFor="email-newsletter">
                  Email
                </label>

                <input
                  className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium"
                  id="email-newsletter"
                  type="email"
                  placeholder="name@example.com"
                  required
                />

                <button
                  type="submit"
                  className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
            <div className="mx-auto max-w-sm lg:max-w-none">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                {/* 💡 FIX: Use <img> tag with the imported URL */}
                <img
                  src={logoImage}
                  alt="LoanLink NGO Logo"
                  className="h-32 w-auto"
                />
              </div>

              <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg">
                LoanLink is a non-profit organization dedicated to connecting
                capital with underserved communities, fostering sustainable
                economic growth and dignity through ethical micro-loans.
              </p>

              <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    className="text-gray-700 transition hover:text-blue-600"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
              {linkGroups.map((group) => (
                <div key={group.title}>
                  <strong className="font-medium text-gray-900">
                    {group.title}
                  </strong>
                  <ul className="mt-6 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <a
                          className="text-gray-700 transition hover:text-blue-600/90"
                          href={link.href}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-gray-100 pt-8">
            <p className="text-center text-xs/relaxed text-gray-500">
              © Copyright {new Date().getFullYear()} **LoanLink NGO**. All
              rights reserved.
              <br />
              <a
                href="#"
                className="text-gray-700 transition hover:text-blue-600/90"
              >
                Privacy Policy
              </a>
              {" | "}
              <a
                href="#"
                className="text-gray-700 transition hover:text-blue-600/90"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
