"use client";
import Link from "next/link";
import clsx from "clsx";
import { AiOutlineMenu } from "react-icons/ai";
import MenuNav from "./MenuNav";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(() => import("./ThemeSwitch"), { ssr: false });
const linkStyles = "hover:text-primary  text-secondary-foreground";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuNav = (value) => {
    setIsOpen(value);
  };
  const pathname = usePathname();

  return (
    <>
      <nav className="w-full py-5 px-5 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Arun Katoch
        </Link>

        <div className="flex gap-3 items-center md:hidden">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <AiOutlineMenu
            className="text-lg cursor-pointer hover:text-primary text-secondary-foreground "
            onClick={() => {
              toggleMenuNav(true);
            }}
          />
        </div>
        <ul className="hidden md:flex items-center justify-center gap-5 text-lg">
          <li>
            <Link
              className={clsx(linkStyles, {
                "text-destructive": pathname === "/",
              })}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={clsx(linkStyles, {
                "text-destructive": pathname === "/blog",
              })}
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <div className="flex px-3 gap-2">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Link
                className={clsx(`${linkStyles} pr-2`, {
                  "text-destructive": pathname === "/profile",
                })}
                href="/profile"
              >
                Profile
              </Link>
              <UserButton />
            </SignedIn>
          </div>
          <ThemeSwitch />
        </ul>
      </nav>
      {isOpen && <MenuNav onToggleMenuClick={toggleMenuNav} />}
    </>
  );
};

export default Navbar;
