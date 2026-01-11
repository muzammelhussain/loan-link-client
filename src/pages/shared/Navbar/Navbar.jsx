import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { gsap } from "gsap";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo2.png";
import ThemeToggle from "../../../components/theme/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const dropdownRef = useRef(null);
  const btnRef = useRef(null);
  const itemsRef = useRef([]);

  const [open, setOpen] = useState(false);

  const handleLogOut = () => logOut().catch(console.log);

  const links = [
    { to: "/", label: "Home" },
    { to: "/all-loan-page", label: "All Loan" },
    !user && { to: "/about-us", label: "About" },
    !user && { to: "/contact", label: "Contact" },
    user && { to: "/dashboard", label: "Dashboard" },
    { to: "/privacy", label: "Privacy/Terms" },
    { to: "/blog", label: "Blog" },
    { to: "/help", label: "Help" },
    
  ].filter(Boolean);

  // GSAP OPEN / CLOSE
  const toggleMenu = () => {
    if (!open) {
      setOpen(true);

      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -12, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );

      gsap.from(itemsRef.current, {
        opacity: 0,
        y: -8,
        stagger: 0.06,
        delay: 0.1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(btnRef.current, { rotate: 90, duration: 0.3 });
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    gsap.to(dropdownRef.current, {
      opacity: 0,
      y: -12,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });

    gsap.to(btnRef.current, { rotate: 0, duration: 0.3 });
  };

  // CLICK OUTSIDE
  useEffect(() => {
    const handler = (e) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // SCROLL BLUR EFFECT (with cleanup)
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector(".glass-nav");
      if (!nav) return;
      nav.style.backdropFilter =
        window.scrollY > 10 ? "blur(18px)" : "blur(12px)";
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 glass-nav">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-10 w-10" alt="logo" />
            <span className="font-semibold">Loan Link</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-2">
          <ThemeToggle />

          {/* DESKTOP AUTH */}
          {!user ? (
            <div className="hidden lg:flex gap-2">
              <Link className="btn btn-outline btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <img
                className="w-9 h-9 rounded-full ring ring-primary"
                src={user.photoURL || "https://i.ibb.co/2kR9p3R/user.png"}
                alt="user"
              />
              <button onClick={handleLogOut} className="btn btn-error btn-sm">
                Logout
              </button>
            </div>
          )}

          {/* MOBILE GSAP MENU */}
          <div className="relative lg:hidden">
            <button
              ref={btnRef}
              onClick={toggleMenu}
              className="btn btn-ghost text-xl"
            >
              ☰
            </button>

            {open && (
              <ul
                ref={dropdownRef}
                className="menu menu-sm absolute right-0 mt-3 p-3 w-52 rounded-xl shadow-lg glass-dropdown origin-top"
              >
                {links.map((l, i) => (
                  <li key={l.to} ref={(el) => (itemsRef.current[i] = el)}>
                    <NavLink to={l.to} onClick={closeMenu}>
                      {l.label}
                    </NavLink>
                  </li>
                ))}

                <div className="divider"></div>

                {!user ? (
                  <>
                    <li ref={(el) => (itemsRef.current[links.length] = el)}>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li ref={(el) => (itemsRef.current[links.length + 1] = el)}>
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  </>
                ) : (
                  <li ref={(el) => (itemsRef.current[links.length] = el)}>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
