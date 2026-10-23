import React from "react";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "@/components/HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavouriteButton from "./FavouriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, UserButton } from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="bg-white py-3 sm:py-4 md:py-5">
      <Container className="flex items-center justify-between gap-3">

        {/* Logo + Mobile Menu */}
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center">
          <HeaderMenu />
        </div>

        {/* Right Side */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-3 sm:gap-4 md:gap-5">
          <SearchBar />
          <CartIcon />
          <FavouriteButton />

          <ClerkLoaded>
            {user ? <UserButton /> : <SignIn />}
          </ClerkLoaded>
        </div>

      </Container>
    </header>
  );
};

export default Header;
