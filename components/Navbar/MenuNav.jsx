"use client";
import { memo } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import clsx from "clsx";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(() => import("./ThemeSwitch"), { ssr: false });
const linkStyles = "hover:text-primary  text-secondary-foreground";

const MenuNav = ({ onToggleMenuClick }) => {
  const toggleMenuNav = () => {
    onToggleMenuClick(false);
  };
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen fixed top-0  z-30 bg-background text-secondary-foreground">
      <Link href="/" className="font-semibold text-lg" onClick={toggleMenuNav}>
        Arun katoch
      </Link>
      <ul className="flex flex-col items-center justify-center gap-3 text-lg pt-14">
        <li>
          <Link
            className={clsx(linkStyles, {
              "text-destructive": pathname === "/",
            })}
            href="/"
            onClick={toggleMenuNav}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={clsx(linkStyles, {
              "text-destructive": pathname === "/blog",
            })}
            onClick={toggleMenuNav}
          >
            Blog
          </Link>
        </li>

        <div className="flex">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Link
              className={clsx(`${linkStyles}`, {
                "text-destructive": pathname === "/profile",
              })}
              href="/profile"
              onClick={toggleMenuNav}
            >
              Profile
            </Link>
          </SignedIn>
        </div>
        <ThemeSwitch />
      </ul>
      <div className="pt-10">
        <MdClose
          className="text-3xl cursor-pointer hover:text-black/50"
          onClick={toggleMenuNav}
        />
      </div>
    </div>
  );
};

export default memo(MenuNav);
