import Link from "next/link";
import React from "react";
const linkStyles = "text-xl hover:text-primary text-secondary-foreground";
const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row md:px-8">
      <ul className="w-full flex flex-col md:flex-row md:justify-start justify-center items-center gap-3 py-7">
        <li>&copy; 2025 - 2026</li>

        <li>
          <Link
            href="https://www.linkedin.com/in/arunkatochdev/"
            target="_blank"
            className={linkStyles}
          >
            LinkedIn
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/arunkatoch-dev"
            target="_blank"
            className={linkStyles}
          >
            Github
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center pb-7 md:hidden">
        <span>&copy;2025 - 2026</span>
      </div>
    </footer>
  );
};

export default Footer;
