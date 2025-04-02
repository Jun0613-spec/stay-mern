import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t bg-neutral-50 dark:bg-neutral-800 py-6 md:py-10">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 tracking-tight">
            <Link to="/" className="cursor-pointer hover:!text-neutral-300">
              <p className="text-xl font-bold text-black dark:text-white hover:opacity-80">
                Stay
              </p>
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Terms</Link>
              </li>
              <li>
                <Link to="/">Privacy</Link>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="hover:opacity-80"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="hover:opacity-80"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              className="hover:opacity-80"
            >
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="hover:opacity-80"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="hover:opacity-80"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-300 flex justify-center space-x-4">
          <span>© Stay. All rights reserved.</span>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
